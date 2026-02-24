import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/woocommerce";
import { mockProducts, mockCategories } from "@/lib/mock-data";
import { ProductGrid } from "@/components/shop/product-grid";
import { Filters } from "@/components/shop/filters";

export const metadata = {
  title: "Shop — belyzlash",
  description: "Decouvrez notre collection",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  let products, categories;
  try {
    [products, categories] = await Promise.all([getProducts(), getCategories()]);
  } catch {
    products = mockProducts;
    categories = mockCategories;
  }

  const filtered = category
    ? products.filter((p) => p.categories.some((c) => c.slug === category))
    : products;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl text-brand-green mb-8">Collection</h1>
      <Suspense fallback={null}>
        <Filters categories={categories} />
      </Suspense>
      <ProductGrid products={filtered} />
    </main>
  );
}
