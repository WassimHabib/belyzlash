"use client";

import Image from "next/image";
import { useCart } from "@/components/cart/cart-provider";

export function OrderSummary() {
  const { items, totalPrice } = useCart();

  return (
    <div className="lg:sticky lg:top-28">
      <div className="rounded-3xl border border-brand-beige/60 bg-white p-7 sm:p-8">
        <h2 className="font-serif text-xl text-brand-green mb-6">Votre commande</h2>

        <div className="space-y-4 mb-6">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.size}`}
              className="flex items-center gap-4"
            >
              {/* Thumbnail */}
              <div className="w-14 h-14 rounded-xl overflow-hidden bg-brand-beige/30 flex-shrink-0 relative">
                {item.image && (
                  <Image src={item.image} alt={item.name} fill className="object-cover" sizes="56px" />
                )}
                {item.quantity > 1 && (
                  <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-brand-green text-brand-cream text-[9px] font-bold flex items-center justify-center shadow">
                    {item.quantity}
                  </div>
                )}
              </div>
              {/* Info */}
              <div className="flex-1 min-w-0">
                <p className="text-sm text-brand-green font-medium truncate">{item.name}</p>
                {item.size && (
                  <p className="text-[11px] text-brand-black/40">{item.size}</p>
                )}
              </div>
              {/* Price */}
              <p className="text-sm text-brand-gold font-semibold flex-shrink-0">
                {(item.price * item.quantity).toFixed(2)}&nbsp;&euro;
              </p>
            </div>
          ))}
        </div>

        <div className="w-full h-px bg-gradient-to-r from-brand-beige via-brand-beige/50 to-transparent mb-4" />

        <div className="space-y-3 text-sm">
          <div className="flex justify-between">
            <span className="text-brand-black/50">Sous-total</span>
            <span className="text-brand-green font-medium">{totalPrice.toFixed(2)}&nbsp;&euro;</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-black/50">Livraison</span>
            <span className="text-brand-black/30 text-xs">Selon adresse</span>
          </div>
        </div>

        <div className="w-full h-px bg-gradient-to-r from-brand-beige via-brand-beige/50 to-transparent my-4" />

        <div className="flex justify-between items-center">
          <span className="text-brand-green font-semibold text-base">Total</span>
          <span className="text-xl font-bold text-gradient-gold">{totalPrice.toFixed(2)}&nbsp;&euro;</span>
        </div>
      </div>
    </div>
  );
}
