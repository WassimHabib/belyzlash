"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/components/cart/cart-provider";
import { VariantSelector } from "./variant-selector";
import { AddToCartButton } from "./add-to-cart-button";

export function ProductInfo({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [added, setAdded] = useState(false);

  const hasVariants = product.attributes.length > 0;
  const allSelected = product.attributes.every((attr) => selected[attr.name]);
  const canAdd = !hasVariants || allSelected;

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.images[0]?.src ?? "",
      size: selected["Taille"],
      color: selected["Couleur"],
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2500);
  }

  return (
    <div className="lg:sticky lg:top-28 space-y-8">
      {/* Category */}
      {product.categories?.[0] && (
        <p className="text-brand-gold text-[11px] tracking-[0.3em] uppercase font-semibold">
          {product.categories[0].name}
        </p>
      )}

      {/* Title & price */}
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-green mb-4 leading-tight">
          {product.name}
        </h1>
        <div className="flex items-center gap-4">
          {product.sale_price ? (
            <>
              <p className="text-2xl font-bold text-gradient-gold">{product.sale_price}&nbsp;&euro;</p>
              <p className="text-brand-black/30 line-through text-lg">{product.regular_price}&nbsp;&euro;</p>
              <span className="bg-brand-gold/10 text-brand-gold text-[10px] tracking-[0.15em] uppercase font-bold px-3 py-1 rounded-full">
                Promo
              </span>
            </>
          ) : (
            <p className="text-2xl font-bold text-gradient-gold">{product.price}&nbsp;&euro;</p>
          )}
        </div>
      </div>

      {/* Divider */}
      <div className="w-full h-px bg-gradient-to-r from-brand-beige via-brand-beige/50 to-transparent" />

      {/* Short description */}
      {product.short_description && (
        <p className="text-brand-black/60 leading-relaxed">{product.short_description}</p>
      )}

      {/* Variants */}
      {hasVariants && (
        <VariantSelector
          attributes={product.attributes}
          selected={selected}
          onChange={(name, value) => setSelected((prev) => ({ ...prev, [name]: value }))}
        />
      )}

      {/* Add to cart */}
      <AddToCartButton onClick={handleAddToCart} disabled={!canAdd} added={added} />

      {/* Reassurance */}
      <div className="grid grid-cols-2 gap-4">
        {[
          { icon: "M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z", text: "Paiement securise" },
          { icon: "M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12", text: "Livraison rapide" },
          { icon: "M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z", text: "Qualite pro" },
          { icon: "M15 10.5a3 3 0 11-6 0 3 3 0 016 0z M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z", text: "Click & Collect" },
        ].map((item) => (
          <div key={item.text} className="flex items-center gap-2.5 p-3 rounded-xl bg-brand-beige/20">
            <svg className="w-4 h-4 text-brand-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d={item.icon} />
            </svg>
            <span className="text-brand-black/50 text-[11px] tracking-wide">{item.text}</span>
          </div>
        ))}
      </div>

      {/* Description */}
      {product.description && (
        <div className="pt-6 border-t border-brand-beige/50">
          <details className="group">
            <summary className="flex items-center justify-between cursor-pointer">
              <h2 className="text-[11px] tracking-[0.2em] uppercase font-semibold text-brand-green">
                Description
              </h2>
              <svg className="w-4 h-4 text-brand-black/30 transition-transform duration-300 group-open:rotate-180" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
              </svg>
            </summary>
            <div
              className="mt-4 prose prose-sm text-brand-black/60 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: product.description }}
            />
          </details>
        </div>
      )}
    </div>
  );
}
