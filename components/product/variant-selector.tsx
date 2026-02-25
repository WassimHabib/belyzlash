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
          <div className="flex items-center justify-between mb-3">
            <label className="text-[11px] tracking-[0.2em] uppercase font-semibold text-brand-green">
              {attr.name}
            </label>
            {selected[attr.name] && (
              <span className="text-brand-black/40 text-xs">
                {selected[attr.name]}
              </span>
            )}
          </div>
          <div className="flex flex-wrap gap-2">
            {attr.options.map((option) => (
              <button
                key={option}
                onClick={() => onChange(attr.name, option)}
                className={`px-5 py-2.5 rounded-full text-sm font-medium border-2 transition-all duration-300 ${
                  selected[attr.name] === option
                    ? "bg-brand-green text-brand-cream border-brand-green shadow-lg shadow-brand-green/20"
                    : "border-brand-beige text-brand-black/60 hover:border-brand-green/40 hover:text-brand-green bg-white"
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
