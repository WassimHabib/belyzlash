import { Product } from "@/lib/types";
import { ProductCard } from "@/components/shop/product-card";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="font-serif text-3xl sm:text-4xl text-center mb-12 text-brand-green">
        Selection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
