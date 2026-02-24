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
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-green mb-2">
          {product.name}
        </h1>
        <p className="text-xl text-brand-gold font-medium">{product.price} &euro;</p>
      </div>

      {product.short_description && (
        <p className="text-brand-black/70 leading-relaxed">{product.short_description}</p>
      )}

      {hasVariants && (
        <VariantSelector
          attributes={product.attributes}
          selected={selected}
          onChange={(name, value) => setSelected((prev) => ({ ...prev, [name]: value }))}
        />
      )}

      <AddToCartButton onClick={handleAddToCart} disabled={!canAdd} />

      {added && (
        <p className="text-sm text-brand-green text-center">Ajoute au panier !</p>
      )}

      {product.description && (
        <div className="pt-8 border-t border-brand-beige">
          <h2 className="text-sm tracking-widest uppercase mb-4 text-brand-black/70">
            Description
          </h2>
          <div
            className="prose prose-sm text-brand-black/70"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      )}
    </div>
  );
}
