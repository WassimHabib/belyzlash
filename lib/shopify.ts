import { Product, ProductCategory, ShopifyCustomer, AuthUser, ShopifyOrder, ShopifyOrderLineItem, ShopifyMailingAddress, ShopifyAddressInput } from "./types";

const domain = process.env.SHOPIFY_STORE_DOMAIN!;
const storefrontToken = process.env.SHOPIFY_STOREFRONT_ACCESS_TOKEN!;

async function shopifyFetch<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://${domain}/api/2025-10/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": storefrontToken,
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
    variantNodes: variants.map((v: any) => ({
      gid: v.id,
      selectedOptions: v.selectedOptions ?? [],
    })),
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
                node { id selectedOptions { name value } }
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
  lineItems: { variantId: string; quantity: number }[],
  shippingAddress?: {
    firstName?: string;
    lastName?: string;
    address1?: string;
    city?: string;
    province?: string;
    zip?: string;
    country?: string;
    phone?: string;
  },
  email?: string
): Promise<{ checkoutUrl: string; id: string }> {
  const input: Record<string, unknown> = {
    lineItems: lineItems.map((item) => ({
      variantId: item.variantId,
      quantity: item.quantity,
    })),
  };

  if (email) input.email = email;
  if (shippingAddress) input.shippingAddress = shippingAddress;

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
  `, { input });

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

// ------- Mutations (no cache) -------

async function shopifyMutate<T>(query: string, variables?: Record<string, unknown>): Promise<T> {
  const res = await fetch(`https://${domain}/api/2025-10/graphql.json`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "Shopify-Storefront-Private-Token": storefrontToken,
    },
    body: JSON.stringify({ query, variables }),
    cache: "no-store",
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

// ------- Customer API -------

export async function customerCreate(input: {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}): Promise<{ accessToken: string; expiresAt: string }> {
  const data = await shopifyMutate<any>(`
    mutation CustomerCreate($input: CustomerCreateInput!) {
      customerCreate(input: $input) {
        customer { id }
        customerUserErrors { field message }
      }
    }
  `, { input });

  const errors = data.customerCreate.customerUserErrors;
  if (errors?.length > 0) {
    throw new Error(errors[0].message);
  }

  // Auto-login after registration
  return customerAccessTokenCreate(input.email, input.password);
}

export async function customerAccessTokenCreate(
  email: string,
  password: string
): Promise<{ accessToken: string; expiresAt: string }> {
  const data = await shopifyMutate<any>(`
    mutation CustomerAccessTokenCreate($input: CustomerAccessTokenCreateInput!) {
      customerAccessTokenCreate(input: $input) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors { field message }
      }
    }
  `, { input: { email, password } });

  const errors = data.customerAccessTokenCreate.customerUserErrors;
  if (errors?.length > 0) {
    throw new Error(errors[0].message);
  }

  const token = data.customerAccessTokenCreate.customerAccessToken;
  if (!token) {
    throw new Error("Email ou mot de passe incorrect.");
  }

  return {
    accessToken: token.accessToken,
    expiresAt: token.expiresAt,
  };
}

export async function customerAccessTokenDelete(accessToken: string): Promise<void> {
  await shopifyMutate(`
    mutation CustomerAccessTokenDelete($customerAccessToken: String!) {
      customerAccessTokenDelete(customerAccessToken: $customerAccessToken) {
        deletedAccessToken
        userErrors { field message }
      }
    }
  `, { customerAccessToken: accessToken });
}

export async function customerAccessTokenRenew(
  accessToken: string
): Promise<{ accessToken: string; expiresAt: string }> {
  const data = await shopifyMutate<any>(`
    mutation CustomerAccessTokenRenew($customerAccessToken: String!) {
      customerAccessTokenRenew(customerAccessToken: $customerAccessToken) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        userErrors { field message }
      }
    }
  `, { customerAccessToken: accessToken });

  const token = data.customerAccessTokenRenew.customerAccessToken;
  if (!token) {
    throw new Error("Token renewal failed");
  }

  return {
    accessToken: token.accessToken,
    expiresAt: token.expiresAt,
  };
}

export async function getCustomer(accessToken: string): Promise<AuthUser> {
  const data = await shopifyMutate<any>(`
    query GetCustomer($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        id
        firstName
        lastName
        email
        phone
      }
    }
  `, { customerAccessToken: accessToken });

  if (!data.customer) {
    throw new Error("Customer not found");
  }

  return {
    firstName: data.customer.firstName,
    lastName: data.customer.lastName,
    email: data.customer.email,
    phone: data.customer.phone ?? null,
  };
}

// ------- Customer Orders -------

export async function getCustomerOrders(
  accessToken: string,
  first: number = 20
): Promise<ShopifyOrder[]> {
  const data = await shopifyMutate<any>(`
    query GetCustomerOrders($customerAccessToken: String!, $first: Int!) {
      customer(customerAccessToken: $customerAccessToken) {
        orders(first: $first, sortKey: PROCESSED_AT, reverse: true) {
          edges {
            node {
              id
              orderNumber
              processedAt
              financialStatus
              fulfillmentStatus
              totalPrice { amount currencyCode }
              subtotalPrice { amount currencyCode }
              totalShippingPrice { amount currencyCode }
              totalTax { amount currencyCode }
              statusUrl
              shippingAddress {
                id
                firstName
                lastName
                company
                address1
                address2
                city
                province
                zip
                country
                phone
              }
              lineItems(first: 50) {
                edges {
                  node {
                    title
                    quantity
                    variant {
                      image { url altText }
                      price { amount currencyCode }
                    }
                  }
                }
              }
            }
          }
        }
      }
    }
  `, { customerAccessToken: accessToken, first });

  if (!data.customer) throw new Error("Customer not found");

  return data.customer.orders.edges.map((e: any) => {
    const node = e.node;
    return {
      id: node.id,
      orderNumber: node.orderNumber,
      processedAt: node.processedAt,
      financialStatus: node.financialStatus,
      fulfillmentStatus: node.fulfillmentStatus,
      totalPrice: node.totalPrice,
      subtotalPrice: node.subtotalPrice,
      totalShippingPrice: node.totalShippingPrice,
      totalTax: node.totalTax,
      statusUrl: node.statusUrl,
      shippingAddress: node.shippingAddress ?? null,
      lineItems: node.lineItems.edges.map((le: any) => le.node),
    } as ShopifyOrder;
  });
}

// ------- Customer Addresses -------

export async function getCustomerAddresses(
  accessToken: string
): Promise<{ addresses: ShopifyMailingAddress[]; defaultAddressId: string | null }> {
  const data = await shopifyMutate<any>(`
    query GetCustomerAddresses($customerAccessToken: String!) {
      customer(customerAccessToken: $customerAccessToken) {
        defaultAddress { id }
        addresses(first: 20) {
          edges {
            node {
              id
              firstName
              lastName
              company
              address1
              address2
              city
              province
              zip
              country
              phone
            }
          }
        }
      }
    }
  `, { customerAccessToken: accessToken });

  if (!data.customer) throw new Error("Customer not found");

  return {
    addresses: data.customer.addresses.edges.map((e: any) => e.node),
    defaultAddressId: data.customer.defaultAddress?.id ?? null,
  };
}

// ------- Customer Update -------

export async function customerUpdate(
  accessToken: string,
  input: { firstName?: string; lastName?: string; phone?: string }
): Promise<AuthUser> {
  const data = await shopifyMutate<any>(`
    mutation CustomerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
        customer {
          firstName
          lastName
          email
          phone
        }
        customerUserErrors { field message }
      }
    }
  `, { customerAccessToken: accessToken, customer: input });

  const errors = data.customerUpdate.customerUserErrors;
  if (errors?.length > 0) throw new Error(errors[0].message);

  const c = data.customerUpdate.customer;
  return { firstName: c.firstName, lastName: c.lastName, email: c.email, phone: c.phone ?? null };
}

// ------- Customer Password Update -------

export async function customerPasswordUpdate(
  accessToken: string,
  password: string
): Promise<{ accessToken: string; expiresAt: string }> {
  const data = await shopifyMutate<any>(`
    mutation CustomerUpdate($customerAccessToken: String!, $customer: CustomerUpdateInput!) {
      customerUpdate(customerAccessToken: $customerAccessToken, customer: $customer) {
        customerAccessToken {
          accessToken
          expiresAt
        }
        customerUserErrors { field message }
      }
    }
  `, { customerAccessToken: accessToken, customer: { password } });

  const errors = data.customerUpdate.customerUserErrors;
  if (errors?.length > 0) throw new Error(errors[0].message);

  const token = data.customerUpdate.customerAccessToken;
  if (!token) throw new Error("Password update failed");

  return { accessToken: token.accessToken, expiresAt: token.expiresAt };
}

// ------- Customer Address CRUD -------

export async function customerAddressCreate(
  accessToken: string,
  address: ShopifyAddressInput
): Promise<ShopifyMailingAddress> {
  const data = await shopifyMutate<any>(`
    mutation CustomerAddressCreate($customerAccessToken: String!, $address: MailingAddressInput!) {
      customerAddressCreate(customerAccessToken: $customerAccessToken, address: $address) {
        customerAddress {
          id firstName lastName company address1 address2 city province zip country phone
        }
        customerUserErrors { field message }
      }
    }
  `, { customerAccessToken: accessToken, address });

  const errors = data.customerAddressCreate.customerUserErrors;
  if (errors?.length > 0) throw new Error(errors[0].message);

  return data.customerAddressCreate.customerAddress;
}

export async function customerAddressUpdate(
  accessToken: string,
  addressId: string,
  address: ShopifyAddressInput
): Promise<ShopifyMailingAddress> {
  const data = await shopifyMutate<any>(`
    mutation CustomerAddressUpdate($customerAccessToken: String!, $id: ID!, $address: MailingAddressInput!) {
      customerAddressUpdate(customerAccessToken: $customerAccessToken, id: $id, address: $address) {
        customerAddress {
          id firstName lastName company address1 address2 city province zip country phone
        }
        customerUserErrors { field message }
      }
    }
  `, { customerAccessToken: accessToken, id: addressId, address });

  const errors = data.customerAddressUpdate.customerUserErrors;
  if (errors?.length > 0) throw new Error(errors[0].message);

  return data.customerAddressUpdate.customerAddress;
}

export async function customerAddressDelete(
  accessToken: string,
  addressId: string
): Promise<void> {
  const data = await shopifyMutate<any>(`
    mutation CustomerAddressDelete($customerAccessToken: String!, $id: ID!) {
      customerAddressDelete(customerAccessToken: $customerAccessToken, id: $id) {
        deletedCustomerAddressId
        customerUserErrors { field message }
      }
    }
  `, { customerAccessToken: accessToken, id: addressId });

  const errors = data.customerAddressDelete.customerUserErrors;
  if (errors?.length > 0) throw new Error(errors[0].message);
}

export async function customerDefaultAddressUpdate(
  accessToken: string,
  addressId: string
): Promise<void> {
  const data = await shopifyMutate<any>(`
    mutation CustomerDefaultAddressUpdate($customerAccessToken: String!, $addressId: ID!) {
      customerDefaultAddressUpdate(customerAccessToken: $customerAccessToken, addressId: $addressId) {
        customer { id }
        customerUserErrors { field message }
      }
    }
  `, { customerAccessToken: accessToken, addressId });

  const errors = data.customerDefaultAddressUpdate.customerUserErrors;
  if (errors?.length > 0) throw new Error(errors[0].message);
}

// ------- Customer Recover (forgot password) -------

export async function customerRecover(email: string): Promise<void> {
  const data = await shopifyMutate<any>(`
    mutation CustomerRecover($email: String!) {
      customerRecover(email: $email) {
        customerUserErrors { field message }
      }
    }
  `, { email });

  const errors = data.customerRecover.customerUserErrors;
  if (errors?.length > 0) throw new Error(errors[0].message);
}
