"use client";

import { useCart } from "@/components/cart/cart-provider";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import Link from "next/link";

export default function CartPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-serif text-4xl text-brand-green mb-6">Panier</h1>
        <p className="text-brand-black/60 mb-8">Votre panier est vide.</p>
        <Link
          href="/shop"
          className="inline-block border border-brand-green text-brand-green px-8 py-3 text-sm tracking-widest uppercase hover:bg-brand-green hover:text-brand-cream transition-colors"
        >
          Continuer le shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl text-brand-green mb-8">Panier</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={`${item.productId}-${item.size}-${item.color}`} item={item} />
          ))}
        </div>
        <CartSummary />
      </div>
    </main>
  );
}
