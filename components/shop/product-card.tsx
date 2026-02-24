import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="aspect-[3/4] relative overflow-hidden bg-brand-beige">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            className="object-cover transition-all duration-700 group-hover:scale-110"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-black/30 font-serif text-xl">
            {product.name[0]}
          </div>
        )}
        {/* Overlay on hover */}
        <div className="absolute inset-0 bg-brand-green/0 group-hover:bg-brand-green/20 transition-all duration-500" />
        {/* Quick view label */}
        <div className="absolute bottom-0 left-0 right-0 bg-brand-green/90 text-brand-cream text-center py-3 text-xs tracking-widest uppercase translate-y-full group-hover:translate-y-0 transition-transform duration-300">
          Voir le produit
        </div>
        {/* Sale badge */}
        {product.sale_price && (
          <div className="absolute top-3 left-3 bg-brand-gold text-brand-black text-xs tracking-wider uppercase px-3 py-1 font-medium">
            Promo
          </div>
        )}
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-serif text-lg text-brand-black group-hover:text-brand-green transition-colors duration-300">
          {product.name}
        </h3>
        <div className="flex items-center gap-2">
          {product.sale_price ? (
            <>
              <p className="text-brand-gold font-medium">{product.sale_price} &euro;</p>
              <p className="text-brand-black/40 line-through text-sm">{product.regular_price} &euro;</p>
            </>
          ) : (
            <p className="text-brand-gold font-medium">{product.price} &euro;</p>
          )}
        </div>
      </div>
    </Link>
  );
}
