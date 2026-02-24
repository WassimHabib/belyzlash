"use client";

import { ProductAttribute } from "@/lib/types";

interface VariantSelectorProps {
  attributes: ProductAttribute[];
  selected: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

export function VariantSelector({ attributes, selected, onChange }: VariantSelectorProps) {
  return (
    <div className="space-y-6">
      {attributes.map((attr) => (
        <div key={attr.id}>
          <label className="block text-sm tracking-widest uppercase mb-3 text-brand-black/70">
            {attr.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {attr.options.map((option) => (
              <button
                key={option}
                onClick={() => onChange(attr.name, option)}
                className={`px-4 py-2 text-sm border transition-colors ${
                  selected[attr.name] === option
                    ? "bg-brand-green text-brand-cream border-brand-green"
                    : "border-brand-beige text-brand-black hover:border-brand-green"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
