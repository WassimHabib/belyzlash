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
    <div className="flex items-center justify-center overflow-x-auto gap-1.5 mb-6 px-4">
      <button
        onClick={() => handleCategory(null)}
        className={`text-[11px] sm:text-[13px] rounded-full font-semibold py-2 px-3 sm:px-4 whitespace-nowrap border transition-all duration-300 ${
          !activeCategory
            ? "bg-brand-green text-white border-brand-green"
            : "bg-white text-brand-black/60 border-brand-black/15 hover:border-brand-green/40 hover:text-brand-green"
        }`}
      >
        Tout
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleCategory(cat.slug)}
          className={`text-[11px] sm:text-[13px] rounded-full font-semibold py-2 px-3 sm:px-4 whitespace-nowrap border transition-all duration-300 ${
            activeCategory === cat.slug
              ? "bg-brand-green text-white border-brand-green"
              : "bg-white text-brand-black/60 border-brand-black/15 hover:border-brand-green/40 hover:text-brand-green"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
