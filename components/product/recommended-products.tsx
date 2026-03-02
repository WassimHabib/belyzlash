"use client";

import Link from "next/link";
import Image from "next/image";
import { useRef } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/components/cart/cart-provider";

function RecommendedCard({ product }: { product: Product }) {
  const image = product.images[0];
  const { addItem } = useCart();

  function handleQuickAdd(e: React.MouseEvent) {
    e.preventDefault();
    e.stopPropagation();
    addItem({
      productId: product.id,
      variantGid: product.variantNodes?.[0]?.gid ?? "",
      name: product.name,
      price: parseFloat(product.sale_price || product.price),
      image: image?.src ?? "",
      quantity: 1,
    });
  }

  return (
    <Link href={`/shop/${product.slug}`} className="group block flex-shrink-0 w-[42vw] sm:w-[220px] lg:w-[240px]">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-brand-beige/20">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 42vw, 240px"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-beige/30">
            <span className="font-serif text-2xl text-brand-green/20">{product.name[0]}</span>
          </div>
        )}

        {/* Promo badge */}
        {product.sale_price && (
          <div className="absolute top-2.5 left-2.5 z-10">
            <span className="bg-brand-gold text-brand-black text-[9px] sm:text-[10px] font-bold px-2.5 py-1 rounded-full tracking-wide uppercase">
              Promo
            </span>
          </div>
        )}

        {/* Quick add button */}
        <button
          onClick={handleQuickAdd}
          className="absolute bottom-2.5 right-2.5 z-10 w-9 h-9 sm:w-10 sm:h-10 rounded-full bg-brand-green text-brand-cream flex items-center justify-center opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 hover:bg-brand-green/90 hover:scale-110 shadow-lg"
          aria-label="Ajouter au panier"
        >
          <svg className="w-4 h-4 sm:w-[18px] sm:h-[18px]" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </button>

        {/* Hover overlay */}
        <div className="absolute inset-0 bg-brand-green/0 group-hover:bg-brand-green/5 transition-colors duration-500" />
      </div>

      <div className="mt-3 px-0.5">
        <h3 className="text-brand-green font-semibold text-[13px] sm:text-sm leading-tight truncate">
          {product.name}
        </h3>
        <div className="mt-1 flex items-center gap-2">
          {product.sale_price ? (
            <>
              <p className="text-brand-green font-bold text-sm sm:text-base">{product.sale_price}&nbsp;&euro;</p>
              <p className="text-brand-black/25 line-through text-[10px] sm:text-xs">{product.regular_price}&nbsp;&euro;</p>
            </>
          ) : (
            <p className="text-brand-green font-bold text-sm sm:text-base">{product.price}&nbsp;&euro;</p>
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
    <section className="py-8 sm:py-14">
      {/* Header */}
      <div className="flex items-center justify-between mb-5 sm:mb-8">
        <div>
          <p className="text-brand-gold text-[10px] sm:text-[11px] tracking-[0.3em] uppercase font-bold mb-1">
            A decouvrir
          </p>
          <h2 className="font-serif font-bold text-xl sm:text-2xl text-brand-green">
            Completez votre routine
          </h2>
        </div>

        {/* Arrows */}
        <div className="hidden sm:flex items-center gap-2">
          <button
            onClick={() => scroll("left")}
            className="w-10 h-10 rounded-full border border-brand-green/10 flex items-center justify-center text-brand-green/40 hover:text-brand-green hover:border-brand-green/30 hover:bg-brand-green/[0.03] transition-all duration-300"
            aria-label="Precedent"
          >
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
            </svg>
          </button>
          <button
            onClick={() => scroll("right")}
            className="w-10 h-10 rounded-full border border-brand-green/10 flex items-center justify-center text-brand-green/40 hover:text-brand-green hover:border-brand-green/30 hover:bg-brand-green/[0.03] transition-all duration-300"
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
        className="flex gap-3 sm:gap-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0 pb-2"
      >
        {products.slice(0, 8).map((product) => (
          <div key={product.id} className="snap-start">
            <RecommendedCard product={product} />
          </div>
        ))}
      </div>

      {/* Mobile scroll indicator */}
      <div className="flex sm:hidden justify-center mt-4 gap-1">
        <div className="w-8 h-0.5 rounded-full bg-brand-green/20" />
        <div className="w-2 h-0.5 rounded-full bg-brand-green/10" />
        <div className="w-2 h-0.5 rounded-full bg-brand-green/10" />
      </div>
    </section>
  );
}
