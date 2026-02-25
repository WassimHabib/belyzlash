"use client";

import Image from "next/image";
import { CartItem as CartItemType } from "@/lib/types";
import { useCart } from "./cart-provider";

export function CartItem({ item, index }: { item: CartItemType; index: number }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div
      className="group flex gap-5 sm:gap-6 py-6 border-b border-brand-beige/50 animate-fade-in-up"
      style={{ animationDelay: `${index * 0.06}s` }}
    >
      {/* Image */}
      <div className="w-24 sm:w-28 aspect-[3/4] relative rounded-xl overflow-hidden bg-brand-beige/30 flex-shrink-0">
        {item.image && (
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="112px" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 flex flex-col justify-between min-w-0 py-1">
        <div>
          <div className="flex items-start justify-between gap-3">
            <h3 className="font-serif text-lg text-brand-green leading-tight truncate">{item.name}</h3>
            <button
              onClick={() => removeItem(item.productId, item.size, item.color)}
              aria-label={`Supprimer ${item.name}`}
              className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-brand-black/20 hover:text-red-500 hover:bg-red-50 transition-all duration-300"
            >
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
              </svg>
            </button>
          </div>
          <div className="flex items-center gap-3 mt-1.5">
            {item.size && (
              <span className="text-[11px] tracking-wide text-brand-black/40 bg-brand-beige/30 px-2.5 py-0.5 rounded-full">
                {item.size}
              </span>
            )}
            {item.color && (
              <span className="text-[11px] tracking-wide text-brand-black/40 bg-brand-beige/30 px-2.5 py-0.5 rounded-full">
                {item.color}
              </span>
            )}
          </div>
        </div>

        <div className="flex items-center justify-between mt-4">
          {/* Quantity */}
          <div className="flex items-center rounded-full border border-brand-beige/60 bg-white overflow-hidden">
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
              className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center text-brand-black/40 hover:text-brand-green hover:bg-brand-beige/20 active:bg-brand-beige/30 transition-all duration-300 text-base sm:text-sm"
            >
              -
            </button>
            <span className="w-9 sm:w-8 text-center text-sm font-medium text-brand-green">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
              className="w-10 h-10 sm:w-9 sm:h-9 flex items-center justify-center text-brand-black/40 hover:text-brand-green hover:bg-brand-beige/20 active:bg-brand-beige/30 transition-all duration-300 text-base sm:text-sm"
            >
              +
            </button>
          </div>

          {/* Price */}
          <p className="text-brand-gold font-bold text-base">
            {(item.price * item.quantity).toFixed(2)}&nbsp;&euro;
          </p>
        </div>
      </div>
    </div>
  );
}
