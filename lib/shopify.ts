import { Product, ProductCategory } from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://${domain}/api/2024-01/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Shopify-Storefront-Access-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    throw new Error(`Shopify API error: ${res.status}`);
  }

  const json = await res.json();

  if (json.errors) {
    throw new Error(json.errors[0]?.message ?? "Shopify GraphQL error");
  }

  return json.data;
}

// ------- Mappers: Shopify → our types -------

function mapProduct(node: any): Product {
  const variants = node.variants?.edges?.map((e: any) => e.node) ?? [];
  const options = node.options ?? [];

  // Build attributes from Shopify options
  const attributes = options
    .filter((o: any) => o.name !== "Title")
    .map((o: any, i: number) => ({
      id: i + 1,
      name: o.name,
      options: o.values,
    }));

  // Build category from first collection
  const collections = node.collections?.edges?.map((e: any) => e.node) ?? [];
  const categories = collections.map((c: any) => ({
    id: parseInt(c.id.replace(/\D/g, "").slice(-8), 10) || 0,
    name: c.title,
    slug: c.handle,
  }));

  const priceRange = node.priceRange;
  const compareAtPrice = node.compareAtPriceRange?.minVariantPrice?.amount;
  const price = priceRange?.minVariantPrice?.amount ?? "0";

  return {
    id: parseInt(node.id.replace(/\D/g, "").slice(-12), 10) || 0,
    name: node.title,
    slug: node.handle,
    price: parseFloat(price).toFixed(2),
    regular_price: compareAtPrice
      ? parseFloat(compareAtPrice).toFixed(2)
      : parseFloat(price).toFixed(2),
    sale_price: compareAtPrice && parseFloat(compareAtPrice) > parseFloat(price)
      ? parseFloat(price).toFixed(2)
      : "",
    description: node.descriptionHtml ?? "",
    short_description: node.description?.slice(0, 120) ?? "",
    images: (node.images?.edges ?? []).map((e: any, i: number) => ({
      id: i + 1,
      src: e.node.url,
      alt: e.node.altText ?? node.title,
    })),
    attributes,
    variations: variants.map((v: any) =>
      parseInt(v.id.replace(/\D/g, "").slice(-12), 10) || 0
    ),
    categories,
    stock_status: node.availableForSale ? "instock" : "outofstock",
  };
}

function mapCategory(node: any): ProductCategory {
  return {
    id: parseInt(node.id.replace(/\D/g, "").slice(-8), 10) || 0,
    name: node.title,
    slug: node.handle,
    count: node.productsCount?.count ?? 0,
  };
}

// ------- Public API (same interface as woocommerce.ts) -------

export async function getProducts(options?: {
  category?: number;
  per_page?: number;
  page?: number;
  orderby?: string;
}): Promise<Product[]> {
  const first = options?.per_page ?? 20;

  const data = await shopifyFetch<any>(`
    query GetProducts($first: Int!) {
      products(first: $first, sortKey: BEST_SELLING) {
        edges {
          node {
            id
            title
            handle
            description
            descriptionHtml
            availableForSale
            priceRange {
              minVariantPrice { amount currencyCode }
            }
            compareAtPriceRange {
              minVariantPrice { amount currencyCode }
            }
            images(first: 5) {
              edges {
                node { url altText }
              }
            }
            options {
              name
              values
            }
            variants(first: 30) {
              edges {
                node { id }
              }
            }
            collections(first: 3) {
              edges {
                node { id title handle }
              }
            }
          }
        }
      }
    }
  `, { first });

  return data.products.edges.map((e: any) => mapProduct(e.node));
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const data = await shopifyFetch<any>(`
    query GetProductByHandle($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        descriptionHtml
        availableForSale
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        compareAtPriceRange {
          minVariantPrice { amount currencyCode }
        }
        images(first: 10) {
          edges {
            node { url altText }
          }
        }
        options {
          name
          values
        }
        variants(first: 30) {
          edges {
            node { id }
          }
        }
        collections(first: 3) {
          edges {
            node { id title handle }
          }
        }
      }
    }
  `, { handle: slug });

  if (!data.productByHandle) return null;
  return mapProduct(data.productByHandle);
}

export async function getCategories(): Promise<ProductCategory[]> {
  const data = await shopifyFetch<any>(`
    query GetCollections {
      collections(first: 20) {
        edges {
          node {
            id
            title
            handle
            productsCount {
              count
            }
          }
        }
      }
    }
  `);

  return data.collections.edges.map((e: any) => mapCategory(e.node));
}

export async function createCheckout(
  lineItems: { variantId: string; quantity: number }[]
): Promise<{ checkoutUrl: string; id: string }> {
  const data = await shopifyFetch<any>(`
    mutation CreateCheckout($input: CheckoutCreateInput!) {
      checkoutCreate(input: $input) {
        checkout {
          id
          webUrl
        }
        checkoutUserErrors {
          message
          field
        }
      }
    }
  `, {
    input: {
      lineItems: lineItems.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      })),
    },
  });

  const checkout = data.checkoutCreate.checkout;
  if (!checkout) {
    const errors = data.checkoutCreate.checkoutUserErrors;
    throw new Error(errors?.[0]?.message ?? "Checkout creation failed");
  }

  return {
    checkoutUrl: checkout.webUrl,
    id: checkout.id,
  };
}
