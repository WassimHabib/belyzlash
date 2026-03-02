"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useCart } from "@/components/cart/cart-provider";

export default function CheckoutSuccess() {
  const { clearCart } = useCart();

  // Vider le panier apres un achat reussi
  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <main className="min-h-screen bg-white">
      {/* Top green bar */}
      <div className="bg-brand-green h-2" />

      <div className="max-w-lg mx-auto px-4 pt-28 sm:pt-36 pb-20 text-center">
        {/* Animated success icon */}
        <div className="relative w-20 h-20 sm:w-24 sm:h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-brand-gold/10 animate-ping" style={{ animationDuration: "2s" }} />
          <div className="absolute -inset-3 rounded-full border border-brand-gold/20" />
          <div className="relative w-full h-full rounded-full bg-brand-green flex items-center justify-center shadow-xl shadow-brand-green/20">
            <svg className="w-8 h-8 sm:w-10 sm:h-10 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>

        <h1 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-green mb-4 font-bold">
          Merci pour votre commande !
        </h1>
        <p className="text-brand-black/50 leading-relaxed mb-4 max-w-sm mx-auto text-sm sm:text-base">
          Votre commande a bien ete enregistree. Vous recevrez un email de confirmation avec le suivi de livraison.
        </p>

        {/* Info cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10 max-w-md mx-auto">
          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-green/[0.03] border border-brand-green/[0.06]">
            <div className="w-9 h-9 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-brand-green font-semibold text-xs">Confirmation</p>
              <p className="text-brand-black/40 text-[11px]">Par email sous peu</p>
            </div>
          </div>
          <div className="flex items-center gap-3 p-4 rounded-xl bg-brand-green/[0.03] border border-brand-green/[0.06]">
            <div className="w-9 h-9 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
              </svg>
            </div>
            <div className="text-left">
              <p className="text-brand-green font-semibold text-xs">Livraison</p>
              <p className="text-brand-black/40 text-[11px]">24h a 72h</p>
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <Link
            href="/shop"
            className="group inline-flex items-center gap-3 bg-brand-green text-brand-cream px-8 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-[0_0_30px_rgba(31,58,52,0.25)] hover:scale-105 transition-all duration-500"
          >
            Continuer le shopping
            <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
            </svg>
          </Link>
          <Link
            href="/account/orders"
            className="inline-flex items-center gap-2 text-brand-green/60 hover:text-brand-green text-[11px] tracking-[0.15em] uppercase font-semibold transition-colors duration-300 px-4 py-4"
          >
            Voir mes commandes
          </Link>
        </div>
      </div>
    </main>
  );
}
