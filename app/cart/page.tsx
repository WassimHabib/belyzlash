"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";

export default function CartPage() {
  const { items } = useCart();

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-brand-green grain relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-1/3 -right-1/4 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12 sm:pb-14">
          <div className="flex items-center gap-4 mb-3">
            <div className="w-10 h-px bg-brand-gold" />
            <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase font-bold">Mon Panier</p>
          </div>
          <div className="flex items-end justify-between">
            <h1 className="font-serif text-5xl sm:text-6xl text-brand-cream leading-tight font-bold">
              Votre <span className="text-gradient-gold">Panier</span>
            </h1>
            {items.length > 0 && (
              <p className="text-brand-cream/40 text-sm hidden sm:block">
                {items.length} article{items.length !== 1 ? "s" : ""}
              </p>
            )}
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-brand-cream rounded-t-[2rem]" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {items.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 rounded-full bg-brand-beige/40 flex items-center justify-center mb-6">
              <svg className="w-9 h-9 text-brand-black/15" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
              </svg>
            </div>
            <h2 className="font-serif text-2xl text-brand-green mb-2">Votre panier est vide</h2>
            <p className="text-brand-black/40 text-sm mb-8 max-w-xs">
              Decouvrez notre collection et trouvez les produits parfaits pour votre activite.
            </p>
            <Link
              href="/shop"
              className="inline-flex items-center gap-3 bg-brand-green text-brand-cream px-8 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-lg hover:scale-105 transition-all duration-500 group"
            >
              Decouvrir la boutique
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
            {/* Items */}
            <div className="lg:col-span-2">
              <div className="space-y-0">
                {items.map((item, i) => (
                  <CartItem key={`${item.productId}-${item.size}-${item.color}`} item={item} index={i} />
                ))}
              </div>
              {/* Continue shopping */}
              <Link
                href="/shop"
                className="mt-8 inline-flex items-center gap-2 text-brand-black/40 text-sm hover:text-brand-green transition-colors duration-300 group"
              >
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
                </svg>
                Continuer le shopping
              </Link>
            </div>

            {/* Summary */}
            <CartSummary />
          </div>
        )}
      </div>
    </main>
  );
}
