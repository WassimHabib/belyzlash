import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="relative rounded-2xl sm:rounded-3xl overflow-hidden bg-brand-beige/40 border border-brand-beige/60 hover:border-brand-gold/30 transition-all duration-500 hover:shadow-[0_20px_60px_-12px_rgba(31,58,52,0.12)] hover:-translate-y-1">
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
