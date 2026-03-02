"use client";

import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";

export default function CheckoutCancel() {
  const { openDrawer } = useCart();

  return (
    <main className="min-h-screen bg-white">
      {/* Top accent bar */}
      <div className="bg-brand-beige/40 h-2" />

      <div className="max-w-lg mx-auto px-4 pt-28 sm:pt-36 pb-20 text-center">
        {/* Cancel icon */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8">
          <div className="absolute -inset-3 rounded-full border border-brand-beige/40" />
          <div className="relative w-full h-full rounded-full bg-brand-beige/30 flex items-center justify-center">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-brand-black/30" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-green mb-4 font-bold">
          Commande annulee
        </h1>
        <p className="text-brand-black/50 leading-relaxed mb-4 max-w-sm mx-auto text-sm sm:text-base">
          Pas d&apos;inquietude, votre panier est toujours disponible. Vous pouvez reprendre votre commande a tout moment.
        </p>

        {/* Reassurance */}
        <div className="flex items-center justify-center gap-6 mb-10 text-brand-black/30">
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span className="text-[11px] tracking-wide">Paiement securise</span>
          </div>
          <div className="flex items-center gap-2">
            <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
            </svg>
            <span className="text-[11px] tracking-wide">Panier sauvegarde</span>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={openDrawer}
            className="group inline-flex items-center gap-3 bg-brand-green text-brand-cream px-8 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-[0_0_30px_rgba(31,58,52,0.25)] hover:scale-105 transition-all duration-500"
          >
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Voir mon panier
          </button>
          <Link
            href="/shop"
            className="inline-flex items-center gap-2 text-brand-green/60 hover:text-brand-green text-[11px] tracking-[0.15em] uppercase font-semibold transition-colors duration-300 px-4 py-4"
          >
            Continuer le shopping
          </Link>
        </div>
      </div>
    </main>
  );
}
