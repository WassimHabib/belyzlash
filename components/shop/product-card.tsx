import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];

  return (
    <Link href={`/shop/${product.slug}`} className="group block card-hover">
      <div className="aspect-[3/4] relative overflow-hidden rounded-2xl bg-brand-beige">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            className="object-cover transition-all duration-700 ease-out group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-black/20 font-serif text-2xl">
            {product.name[0]}
          </div>
        )}
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-green/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500 rounded-2xl" />
        {/* Quick view label */}
        <div className="absolute bottom-4 left-4 right-4 flex justify-center">
          <span className="bg-brand-cream/90 backdrop-blur-sm text-brand-green text-[11px] tracking-[0.15em] uppercase px-6 py-2.5 rounded-full opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-400 font-medium">
            Voir le produit
          </span>
        </div>
        {/* Sale badge */}
        {product.sale_price && (
          <div className="absolute top-4 left-4 bg-brand-gold text-brand-black text-[10px] tracking-[0.15em] uppercase px-3.5 py-1.5 rounded-full font-semibold">
            Promo
          </div>
        )}
      </div>
      <div className="mt-5 space-y-1.5 px-1">
        <h3 className="text-sm font-medium text-brand-black tracking-wide group-hover:text-brand-green transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          {product.sale_price ? (
            <>
              <p className="text-brand-gold font-semibold text-sm">{product.sale_price} &euro;</p>
              <p className="text-brand-black/30 line-through text-xs">{product.regular_price} &euro;</p>
            </>
          ) : (
            <p className="text-brand-gold font-semibold text-sm">{product.price} &euro;</p>
          )}
        </div>
      </div>
    </Link>
  );
}
