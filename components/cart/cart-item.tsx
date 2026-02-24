"use client";

import Image from "next/image";
import { CartItem as CartItemType } from "@/lib/types";
import { useCart } from "./cart-provider";

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-6 py-6 border-b border-brand-beige">
      <div className="w-24 h-32 relative bg-brand-beige flex-shrink-0">
        {item.image && (
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-lg text-brand-green">{item.name}</h3>
          {item.size && <p className="text-sm text-brand-black/60">Taille: {item.size}</p>}
          {item.color && <p className="text-sm text-brand-black/60">Couleur: {item.color}</p>}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
              className="w-8 h-8 border border-brand-beige flex items-center justify-center hover:border-brand-green transition-colors"
            >
              -
            </button>
            <span className="text-sm w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
              className="w-8 h-8 border border-brand-beige flex items-center justify-center hover:border-brand-green transition-colors"
            >
              +
            </button>
          </div>
          <p className="text-brand-gold font-medium">
            {(item.price * item.quantity).toFixed(2)} &euro;
          </p>
        </div>
      </div>
      <button
        onClick={() => removeItem(item.productId, item.size, item.color)}
        aria-label={`Supprimer ${item.name}`}
        className="self-start text-brand-black/30 hover:text-brand-black transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
