"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";
import { useScrollAnimation } from "@/lib/use-scroll-animation";

function FeaturedCard({ product, index }: { product: Product; index: number }) {
  const image = product.images[0];

  return (
    <Link
      href={`/shop/${product.slug}`}
      className="group block"
    >
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-brand-beige/40 border border-brand-beige/60 hover:border-brand-gold/30 transition-all duration-500 hover:shadow-[0_20px_60px_-12px_rgba(31,58,52,0.12)]">
        {/* Image */}
        <div className="aspect-square sm:aspect-[3/4] relative overflow-hidden">
          {image ? (
            <Image
              src={image.src}
              alt={image.alt || product.name}
              fill
              className="object-cover transition-all duration-700 ease-out group-hover:scale-110"
              sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center bg-brand-beige">
              <span className="font-serif text-2xl sm:text-4xl text-brand-green/20">{product.name[0]}</span>
            </div>
          )}

          {/* Sale badge */}
          {product.sale_price && (
            <div className="absolute top-2 left-2 sm:top-4 sm:left-4 z-10">
              <div className="bg-brand-gold text-brand-black text-[8px] sm:text-[10px] tracking-[0.15em] uppercase px-2.5 py-1 sm:px-4 sm:py-1.5 rounded-full font-bold shadow-lg">
                Promo
              </div>
            </div>
          )}

          {/* Hover CTA */}
          <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-5 flex justify-center translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
            <span className="inline-flex items-center gap-2 bg-white text-brand-green text-[10px] sm:text-[11px] tracking-[0.15em] uppercase px-4 py-2.5 sm:px-6 sm:py-3 rounded-full font-semibold shadow-xl">
              Voir
              <svg className="w-3 h-3 sm:w-3.5 sm:h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </span>
          </div>
        </div>

        {/* Info */}
        <div className="p-3 sm:p-5">
          <div className="min-w-0">
            {product.categories?.[0] && (
              <p className="text-brand-gold text-[8px] sm:text-[10px] tracking-[0.25em] uppercase mb-1 font-medium">
                {product.categories[0].name}
              </p>
            )}
            <h3 className="text-brand-green font-medium text-xs sm:text-base leading-tight truncate group-hover:text-brand-gold transition-colors duration-300">
              {product.name}
            </h3>
          </div>
          <div className="mt-1.5">
            {product.sale_price ? (
              <div className="flex items-center gap-2">
                <p className="text-brand-gold font-bold text-sm sm:text-base">{product.sale_price}&nbsp;&euro;</p>
                <p className="text-brand-black/25 line-through text-[10px] sm:text-[11px]">{product.regular_price}&nbsp;&euro;</p>
              </div>
            ) : (
              <p className="text-brand-gold font-bold text-sm sm:text-base">{product.price}&nbsp;&euro;</p>
            )}
          </div>
        </div>
      </div>
    </Link>
  );
}

export function FeaturedProducts({ products }: { products: Product[] }) {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-14 sm:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#EDF4F0] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#EDF4F0] to-transparent" />

      {/* Decorative */}
      <div className="absolute -top-40 right-0 w-[500px] h-[500px] rounded-full bg-brand-gold/[0.02] blur-[120px]" />
      <div className="absolute -bottom-40 left-0 w-[400px] h-[400px] rounded-full bg-brand-green/[0.02] blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`flex flex-col sm:flex-row sm:items-end sm:justify-between mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <div>
            <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase mb-3 font-bold">
              Nos Produits
            </p>
            <h2 className="font-serif text-3xl sm:text-6xl lg:text-7xl text-brand-green leading-tight font-bold">
              Selection <span className="text-gradient-gold">Premium</span>
            </h2>
          </div>
          <Link
            href="/shop"
            className="mt-6 sm:mt-0 inline-flex items-center gap-3 bg-brand-green text-brand-cream px-7 py-3.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-brand-green/90 hover:shadow-lg transition-all duration-500 group"
          >
            Tout voir
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>

        {/* Divider */}
        <div className={`w-full h-px bg-gradient-to-r from-brand-gold/30 via-brand-beige to-transparent mb-10 ${isVisible ? "animate-line-grow" : "opacity-0"}`} />

        {/* Products grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {products.slice(0, 6).map((product, i) => (
            <div
              key={product.id}
              className={isVisible ? "animate-fade-in-up" : "opacity-0"}
              style={{ animationDelay: `${0.15 + i * 0.08}s` }}
            >
              <FeaturedCard product={product} index={i} />
            </div>
          ))}
        </div>

        {/* Bottom CTA mobile */}
        <div className={`mt-10 text-center sm:hidden ${isVisible ? "animate-fade-in-up animation-delay-600" : "opacity-0"}`}>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-brand-green text-brand-cream px-8 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold"
          >
            Voir tous les produits
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
