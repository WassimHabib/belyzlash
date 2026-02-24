"use client";

import { useCart } from "@/components/cart/cart-provider";

export function OrderSummary() {
  const { items, totalPrice } = useCart();

  return (
    <div className="bg-white p-6 border border-brand-beige">
      <h2 className="font-serif text-xl text-brand-green mb-6">
        Votre commande
      </h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div
            key={`${item.productId}-${item.size}`}
            className="flex justify-between text-sm"
          >
            <div>
              <p>
                {item.name} x{item.quantity}
              </p>
              {item.size && (
                <p className="text-brand-black/50">Taille: {item.size}</p>
              )}
            </div>
            <p className="text-brand-gold">
              {(item.price * item.quantity).toFixed(2)} &euro;
            </p>
          </div>
        ))}
        <div className="pt-4 border-t border-brand-beige flex justify-between font-medium">
          <span>Total</span>
          <span className="text-brand-gold">{totalPrice.toFixed(2)} &euro;</span>
        </div>
      </div>
    </div>
  );
}
