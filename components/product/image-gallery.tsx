"use client";

import Image from "next/image";
import { useState, useRef, useCallback, useEffect } from "react";
import { ProductImage } from "@/lib/types";

export function ImageGallery({ images }: { images: ProductImage[] }) {
  const [selected, setSelected] = useState(0);
  const scrollRef = useRef<HTMLDivElement>(null);

  // Sync dots with scroll position on mobile
  const handleScroll = useCallback(() => {
    const el = scrollRef.current;
    if (!el) return;
    const slideWidth = el.offsetWidth;
    const index = Math.round(el.scrollLeft / slideWidth);
    setSelected(index);
  }, []);

  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;
    el.addEventListener("scroll", handleScroll, { passive: true });
    return () => el.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

  // Scroll to slide when dot is clicked
  function scrollToSlide(index: number) {
    const el = scrollRef.current;
    if (!el) return;
    el.scrollTo({ left: index * el.offsetWidth, behavior: "smooth" });
    setSelected(index);
  }

  if (images.length === 0) {
    return (
      <div className="aspect-[4/5] rounded-[20px] bg-brand-beige/50 flex items-center justify-center text-brand-black/20 font-serif text-2xl">
        Pas d&apos;image
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-3 lg:sticky lg:top-28">
      {/* Mobile: horizontal scroll-snap carousel */}
      <div className="sm:hidden relative">
        <div
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide gap-3"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none", WebkitOverflowScrolling: "touch" }}
        >
          {images.map((img, i) => (
            <div
              key={img.id}
              className="flex-shrink-0 w-full snap-center"
            >
              <div className="aspect-square relative overflow-hidden rounded-[20px]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority={i === 0}
                />
              </div>
            </div>
          ))}
        </div>

        {/* Dots */}
        {images.length > 1 && (
          <div className="flex justify-center gap-1.5 mt-3">
            {images.map((_, i) => (
              <button
                key={i}
                onClick={() => scrollToSlide(i)}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  i === selected ? "w-5 bg-brand-green" : "w-1.5 bg-brand-black/20"
                }`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Desktop: main image with fade + thumbnails */}
      <div className="hidden sm:block">
        <div className="aspect-[4/5] relative overflow-hidden rounded-2xl bg-brand-beige/20">
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
                sizes="50vw"
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
        </div>

        {/* Thumbnails */}
        {images.length > 1 && (
          <div className="flex gap-2 mt-3 overflow-x-auto">
            {images.map((img, i) => (
              <button
                key={img.id}
                onClick={() => setSelected(i)}
                className={`relative aspect-square w-20 rounded-xl overflow-hidden border-2 transition-all duration-300 flex-shrink-0 ${
                  i === selected
                    ? "border-brand-green"
                    : "border-transparent opacity-50 hover:opacity-80"
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
    </div>
  );
}
