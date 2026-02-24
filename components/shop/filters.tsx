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
    <div className="flex flex-wrap gap-3 mb-10">
      <button
        onClick={() => handleCategory(null)}
        className={`px-4 py-2 text-sm tracking-widest uppercase border transition-colors ${
          !activeCategory
            ? "bg-brand-green text-brand-cream border-brand-green"
            : "border-brand-beige text-brand-black hover:border-brand-green"
        }`}
      >
        Tout
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleCategory(cat.slug)}
          className={`px-4 py-2 text-sm tracking-widest uppercase border transition-colors ${
            activeCategory === cat.slug
              ? "bg-brand-green text-brand-cream border-brand-green"
              : "border-brand-beige text-brand-black hover:border-brand-green"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
