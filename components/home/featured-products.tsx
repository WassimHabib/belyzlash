"use client";

import { Product } from "@/lib/types";
import { ProductCard } from "@/components/shop/product-card";
import { useScrollAnimation } from "@/lib/use-scroll-animation";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
        <p className="text-brand-gold text-sm tracking-[0.3em] uppercase text-center mb-3">
          Nos Produits
        </p>
        <h2 className="font-serif text-4xl sm:text-5xl text-center mb-4 text-brand-green">
          Selection Premium
        </h2>
        <div className="w-16 h-px bg-brand-gold mx-auto mb-16" />
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-10">
        {products.slice(0, 6).map((product, i) => (
          <div
            key={product.id}
            className={isVisible ? "animate-fade-in-up" : "opacity-0"}
            style={{ animationDelay: `${0.2 + i * 0.1}s` }}
          >
            <ProductCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
