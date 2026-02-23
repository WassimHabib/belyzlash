import { Product, ProductCategory, CreateOrderPayload } from "./types";

function buildUrl(
  endpoint: string,
  params?: Record<string, string | number>
): string {
  const baseUrl = process.env.WOOCOMMERCE_URL;
  const consumerKey = process.env.WOOCOMMERCE_CONSUMER_KEY;
  const consumerSecret = process.env.WOOCOMMERCE_CONSUMER_SECRET;

  const url = new URL(`/wp-json/wc/v3${endpoint}`, baseUrl!);
  url.searchParams.set("consumer_key", consumerKey!);
  url.searchParams.set("consumer_secret", consumerSecret!);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

export async function getProducts(options?: {
  category?: number;
  per_page?: number;
  page?: number;
  orderby?: string;
}): Promise<Product[]> {
  const params: Record<string, string | number> = {};
  if (options?.category) params.category = options.category;
  if (options?.per_page) params.per_page = options.per_page;
  if (options?.page) params.page = options.page;
  if (options?.orderby) params.orderby = options.orderby;

  const res = await fetch(buildUrl("/products", params), {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
  return res.json();
}

export async function getProductBySlug(
  slug: string
): Promise<Product | null> {
  const res = await fetch(buildUrl("/products", { slug }), {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
  const products: Product[] = await res.json();
  return products[0] ?? null;
}

export async function getCategories(): Promise<ProductCategory[]> {
  const res = await fetch(buildUrl("/products/categories"), {
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
  return res.json();
}

export async function createOrder(
  order: CreateOrderPayload
): Promise<{ id: number }> {
  const res = await fetch(buildUrl("/orders"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
  return res.json();
}
