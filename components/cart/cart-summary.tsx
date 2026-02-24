"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";

export function CartSummary() {
  const { totalPrice } = useCart();

  return (
    <div className="bg-white p-6 border border-brand-beige">
      <h2 className="font-serif text-xl text-brand-green mb-6">Resume</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-brand-black/70">Sous-total</span>
          <span>{totalPrice.toFixed(2)} &euro;</span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-black/70">Livraison</span>
          <span className="text-brand-black/50">Calcule au checkout</span>
        </div>
        <div className="pt-3 border-t border-brand-beige flex justify-between font-medium text-base">
          <span>Total</span>
          <span className="text-brand-gold">{totalPrice.toFixed(2)} &euro;</span>
        </div>
      </div>
      <Link
        href="/checkout"
        className="mt-6 block text-center bg-brand-green text-brand-cream py-4 text-sm tracking-widest uppercase hover:bg-brand-green/90 transition-colors"
      >
        Passer la commande
      </Link>
    </div>
  );
}
