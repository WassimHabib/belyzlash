"use client";

import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";

function FeaturedCard({ product }: { product: Product }) {
  const image = product.images[0];

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      {/* Image */}
      <div className="relative aspect-square sm:aspect-[4/5] overflow-hidden rounded-[15px] bg-brand-beige/20">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 50vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-brand-beige/30">
            <span className="font-serif text-2xl sm:text-4xl text-brand-green/20">{product.name[0]}</span>
          </div>
        )}

        {/* Sale badge — top right */}
        {product.sale_price && (
          <div className="absolute top-2 right-2 sm:top-3 sm:right-3 z-10">
            <span className="bg-brand-green text-white text-[9px] sm:text-[11px] font-semibold px-2.5 py-1 sm:px-3 sm:py-1 rounded-full">
              Promo
            </span>
          </div>
        )}
      </div>

      {/* Info */}
      <div className="mt-2.5 sm:mt-3">
        <h3 className="text-brand-green font-serif font-bold text-sm sm:text-base leading-tight truncate">
          {product.name}
        </h3>
        {product.categories?.[0] && (
          <p className="text-brand-black/40 text-[9px] sm:text-[11px] tracking-[0.1em] uppercase mt-0.5">
            {product.categories[0].name}
          </p>
        )}
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

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-14">
        {/* Title */}
        <h2 className="font-serif font-bold text-xl sm:text-3xl lg:text-4xl text-brand-green mb-6 sm:mb-10 text-center">
          Nos Bestsellers
        </h2>

        {/* Products grid */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-6 lg:gap-8">
          {products.slice(0, 6).map((product) => (
            <FeaturedCard key={product.id} product={product} />
          ))}
        </div>

        {/* CTA */}
        <div className="mt-8 sm:mt-12 text-center">
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-brand-green text-brand-cream px-8 py-3.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-semibold hover:bg-brand-green/90 hover:shadow-lg transition-all duration-500 group"
          >
            Voir tous les produits
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
        </div>
      </div>
    </section>
  );
}
