"use client";

import { ProductCategory } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

export function Filters({ categories }: { categories: ProductCategory[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  function handleCategory(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-2 mb-8">
      <button
        onClick={() => handleCategory(null)}
        className={`px-5 py-2.5 rounded-full text-[11px] tracking-[0.15em] uppercase font-semibold border transition-all duration-300 ${
          !activeCategory
            ? "bg-brand-green text-brand-cream border-brand-green shadow-lg shadow-brand-green/20"
            : "border-brand-beige/80 text-brand-black/60 hover:border-brand-green/40 hover:text-brand-green bg-white"
        }`}
      >
        Tout
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleCategory(cat.slug)}
          className={`px-5 py-2.5 rounded-full text-[11px] tracking-[0.15em] uppercase font-semibold border transition-all duration-300 ${
            activeCategory === cat.slug
              ? "bg-brand-green text-brand-cream border-brand-green shadow-lg shadow-brand-green/20"
              : "border-brand-beige/80 text-brand-black/60 hover:border-brand-green/40 hover:text-brand-green bg-white"
          }`}
        >
          {cat.name}
          {cat.count > 0 && (
            <span className={`ml-1.5 text-[10px] ${
              activeCategory === cat.slug ? "text-brand-cream/60" : "text-brand-black/30"
            }`}>
              ({cat.count})
            </span>
          )}
        </button>
      ))}
    </div>
  );
}
