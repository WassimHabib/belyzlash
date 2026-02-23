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
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-black/30 font-serif text-xl">
            {product.name[0]}
          </div>
        )}
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-serif text-lg text-brand-black group-hover:text-brand-green transition-colors">
          {product.name}
        </h3>
        <p className="text-brand-gold font-medium">{product.price} &euro;</p>
      </div>
    </Link>
  );
}
