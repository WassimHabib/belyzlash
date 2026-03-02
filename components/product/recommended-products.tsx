"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { Product } from "@/lib/types";

function RecommendedCard({ product }: { product: Product }) {
  const image = product.images[0];

  return (
    <Link href={`/shop/${product.slug}`} className="group block flex-shrink-0 w-[45vw] sm:w-[220px] lg:w-[250px]">
      <div className="relative aspect-square sm:aspect-[4/5] overflow-hidden rounded-[15px] bg-brand-beige/20">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 45vw, 250px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-beige/30">
            <span className="font-serif text-2xl text-brand-green/20">{product.name[0]}</span>
          </div>
        )}

        {product.sale_price && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
            <span className="bg-brand-green text-white text-[9px] sm:text-[11px] font-semibold px-2.5 py-1 sm:px-3 sm:py-1 rounded-full">
              Promo
            </span>
          </div>
        )}
      </div>

      <div className="mt-2.5 sm:mt-3">
        <h3 className="text-brand-green font-serif font-bold text-sm sm:text-base leading-tight truncate">
          {product.name}
        </h3>
        <div className="mt-1">
          {product.sale_price ? (
            <div className="flex items-center gap-2">
              <p className="text-brand-green font-semibold text-sm sm:text-base">{product.sale_price}&nbsp;&euro;</p>
              <p className="text-brand-black/25 line-through text-[10px] sm:text-xs">{product.regular_price}&nbsp;&euro;</p>
            </div>
          ) : (
            <p className="text-brand-green font-semibold text-sm sm:text-base">{product.price}&nbsp;&euro;</p>
          )}
        </div>
      </div>
    </Link>
  );
}

export function RecommendedProducts({ products }: { products: Product[] }) {
  const scrollRef = useRef<HTMLDivElement>(null);

  if (products.length === 0) return null;

  function scroll(dir: "left" | "right") {
    if (!scrollRef.current) return;
    const amount = dir === "left" ? -280 : 280;
    scrollRef.current.scrollBy({ left: amount, behavior: "smooth" });
  }

  return (
    <section className="py-10 sm:py-16 border-t border-brand-beige/40">
      <div className="flex items-center justify-between mb-6 sm:mb-8">
        <h2 className="font-serif font-bold text-lg sm:text-2xl text-brand-green">
          Produits complementaires
        </h2>

        {/* Arrows — desktop only */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-brand-beige/60 flex items-center justify-center text-brand-green/50 hover:text-brand-green hover:border-brand-green/30 transition-all duration-300"
            aria-label="Precedent"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border border-brand-beige/60 flex items-center justify-center text-brand-green/50 hover:text-brand-green hover:border-brand-green/30 transition-all duration-300"
            aria-label="Suivant"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
          </button>
        </div>
      </div>

      {/* Carousel */}
      <div
        ref={scrollRef}
        className="flex gap-3 sm:gap-5 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0"
      >
        {products.slice(0, 8).map((product) => (
          <div key={product.id} className="snap-start">
            <RecommendedCard product={product} />
          </div>
        ))}
      </div>
    </section>
  );
}
