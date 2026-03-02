"use client";

import { useState } from "react";
import Link from "next/link";
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

  function getVariantGid(): string {
    const variants = product.variantNodes;
    if (!variants.length) return "";
    if (!hasVariants || variants.length === 1) return variants[0].gid;
    return (
      variants.find((v) =>
        v.selectedOptions.every(
          (opt) => selected[opt.name] === opt.value
        )
      )?.gid ?? variants[0].gid
    );
  }

  function handleAddToCart() {
    addItem({
      productId: product.id,
      variantGid: getVariantGid(),
      name: product.name,
      price: parseFloat(product.price),
      image: product.images[0]?.src ?? "",
      size: selected["Taille"],
      color: selected["Couleur"],
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 3500);
  }

  const displayPrice = product.sale_price || product.price;

  return (
    <>
    <div className="lg:sticky lg:top-28 space-y-3 sm:space-y-8 pb-28 lg:pb-0">
      {/* Category */}
      {product.categories?.[0] && (
        <p className="text-brand-gold text-[10px] tracking-[0.3em] uppercase font-semibold">
          {product.categories[0].name}
        </p>
      )}

      {/* Title */}
      <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-green leading-tight">
        {product.name}
      </h1>

      {/* Price */}
      <div className="flex items-center gap-3">
        {product.sale_price ? (
          <>
            <p className="text-2xl font-bold text-brand-green">{product.sale_price}&nbsp;&euro;</p>
            <p className="text-brand-black/30 line-through text-lg">{product.regular_price}&nbsp;&euro;</p>
            <span className="bg-brand-gold/10 text-brand-gold text-[10px] tracking-[0.15em] uppercase font-bold px-2.5 py-0.5 rounded-full">
              Promo
            </span>
          </>
        ) : (
          <p className="text-2xl font-bold text-brand-green">{product.price}&nbsp;&euro;</p>
        )}
      </div>

      {/* Short description */}
      {product.short_description && (
        <p className="text-brand-black/50 text-[15px] leading-relaxed">{product.short_description}</p>
      )}

      {/* Divider */}
      <div className="w-full h-px bg-brand-beige/60" />

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

      {/* Description */}
      {product.description && (
        <div className="pt-6 border-t border-brand-beige/40">
          <p className="text-[11px] tracking-[0.2em] uppercase font-semibold text-brand-green mb-4">Description</p>
          <div
            className="prose prose-sm text-brand-black/50 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      )}
    </div>

    {/* Mobile sticky bottom bar */}
    <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden">
      {/* Cart added notification */}
      <div
        className={`transition-all duration-500 ease-out overflow-hidden ${
          added ? "max-h-20 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <Link
          href="/cart"
          className="flex items-center justify-between px-5 py-3 bg-brand-green text-brand-cream"
        >
          <div className="flex items-center gap-2.5">
            <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            <span className="text-sm font-medium">Produit ajoute !</span>
          </div>
          <span className="flex items-center gap-1.5 text-brand-gold text-xs font-bold tracking-wide uppercase">
            Voir le panier
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </span>
        </Link>
      </div>

      {/* Sticky add-to-cart bar */}
      <div className="bg-white/95 backdrop-blur-xl border-t border-brand-beige/40 px-4 py-3 safe-bottom">
        <div className="flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-brand-green font-serif text-sm truncate">{product.name}</p>
            <p className="text-brand-green font-bold text-lg">{displayPrice}&nbsp;&euro;</p>
          </div>
          <button
            onClick={handleAddToCart}
            disabled={!canAdd}
            className={`flex-shrink-0 flex items-center gap-2 rounded-full px-6 py-3 text-[11px] tracking-[0.15em] uppercase font-bold transition-all duration-300 ${
              added
                ? "bg-brand-green text-brand-cream"
                : !canAdd
                ? "bg-brand-beige/50 text-brand-black/30"
                : "bg-brand-green text-brand-cream active:scale-95"
            }`}
          >
            {added ? (
              <>
                <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                Ajoute
              </>
            ) : (
              <>
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
                </svg>
                Ajouter
              </>
            )}
          </button>
        </div>
      </div>
    </div>
    </>
  );
}
