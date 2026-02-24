"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductImage } from "@/lib/types";

export function ImageGallery({ images }: { images: ProductImage[] }) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-brand-beige flex items-center justify-center text-brand-black/30">
        Pas d&apos;image
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-[3/4] relative overflow-hidden bg-brand-beige">
        <Image
          src={images[selected].src}
          alt={images[selected].alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={`aspect-square w-20 relative overflow-hidden border-2 transition-colors ${
                i === selected ? "border-brand-green" : "border-transparent"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
