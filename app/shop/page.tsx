import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/shopify";
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
    <main className="min-h-screen bg-brand-cream">
      {/* Hero banner */}
      <div className="relative bg-brand-green grain overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-1/3 -right-1/4 w-[600px] h-[600px] rounded-full bg-brand-gold/5 blur-[120px]" />
          <div className="absolute -bottom-1/3 -left-1/4 w-[400px] h-[400px] rounded-full bg-brand-cream/5 blur-[100px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 sm:pt-36 pb-14 sm:pb-16">
          <div className="flex items-center gap-4 mb-4">
            <div className="w-10 h-px bg-brand-gold" />
            <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase font-bold">
              Nos Produits
            </p>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-brand-cream leading-tight font-bold">
            Notre <span className="text-gradient-gold">Collection</span>
          </h1>
          <p className="mt-4 text-brand-cream/50 text-sm sm:text-base max-w-lg">
            Decouvrez notre selection de produits professionnels pour sublimer chaque regard.
          </p>
        </div>
        {/* Bottom curve */}
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-brand-cream rounded-t-[2rem]" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        <Suspense fallback={null}>
          <Filters categories={categories} />
        </Suspense>

        {/* Results count */}
        <div className="flex items-center justify-between mb-8">
          <p className="text-brand-black/40 text-sm">
            {filtered.length} produit{filtered.length !== 1 ? "s" : ""}
          </p>
          <div className="w-20 h-px bg-gradient-to-r from-brand-gold/30 to-transparent" />
        </div>

        <ProductGrid products={filtered} />
      </div>
    </main>
  );
}
