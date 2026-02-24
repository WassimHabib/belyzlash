"use client";

import Link from "next/link";
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/shop/product-card";
import { useScrollAnimation } from "@/lib/use-scroll-animation";

export function FeaturedProducts({ products }: { products: Product[] }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 sm:py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between mb-16">
            <div>
              <p className="text-brand-gold text-[11px] tracking-[0.4em] uppercase mb-4">
                Nos Produits
              </p>
              <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-green leading-tight">
                Selection<br />
                <span className="text-gradient-gold">Premium</span>
              </h2>
            </div>
            <Link
              href="/shop"
              className="mt-6 sm:mt-0 inline-flex items-center gap-2 text-xs tracking-[0.2em] uppercase text-brand-green hover-underline group"
            >
              Tout voir
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          {products.slice(0, 6).map((product, i) => (
            <div
              key={product.id}
              className={isVisible ? "animate-fade-in-up" : "opacity-0"}
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              <ProductCard product={product} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
