"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductImage } from "@/lib/types";

export function ImageGallery({ images }: { images: ProductImage[] }) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] rounded-3xl bg-brand-beige/50 flex items-center justify-center text-brand-black/20 font-serif text-2xl">
        Pas d&apos;image
      </div>
    );
  }

  return (
    <div className="flex flex-col-reverse sm:flex-row gap-4 sticky top-28">
      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex sm:flex-col gap-3 sm:w-20">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={`relative aspect-square w-16 sm:w-full rounded-xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                i === selected
                  ? "border-brand-gold shadow-lg shadow-brand-gold/10"
                  : "border-transparent opacity-50 hover:opacity-100"
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

      {/* Main image */}
      <div className="flex-1 relative">
        <div className="aspect-[3/4] relative overflow-hidden rounded-3xl bg-brand-beige/30">
          {images.map((img, i) => (
            <div
              key={img.id}
              className={`absolute inset-0 transition-all duration-500 ${
                i === selected ? "opacity-100 scale-100" : "opacity-0 scale-105"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority={i === 0}
              />
            </div>
          ))}

          {/* Navigation arrows */}
          {images.length > 1 && (
            <>
              <button
                onClick={() => setSelected(selected === 0 ? images.length - 1 : selected - 1)}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-brand-green hover:bg-white transition-all duration-300 shadow-lg"
                aria-label="Image precedente"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
                </svg>
              </button>
              <button
                onClick={() => setSelected(selected === images.length - 1 ? 0 : selected + 1)}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 backdrop-blur-sm flex items-center justify-center text-brand-green hover:bg-white transition-all duration-300 shadow-lg"
                aria-label="Image suivante"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                </svg>
              </button>
            </>
          )}

          {/* Image counter */}
          {images.length > 1 && (
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/80 backdrop-blur-sm rounded-full px-3 py-1 shadow-lg">
              <span className="text-[11px] text-brand-green font-semibold">
                {selected + 1} / {images.length}
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
