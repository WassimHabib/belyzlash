"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";

export function CartSummary() {
  const { totalPrice, totalItems } = useCart();

  return (
    <div className="lg:sticky lg:top-28">
      <div className="rounded-3xl border border-brand-beige/60 bg-white p-7 sm:p-8">
        <h2 className="font-serif text-xl text-brand-green mb-6">Resume de la commande</h2>

        <div className="space-y-4 text-sm">
          <div className="flex justify-between">
            <span className="text-brand-black/50">Sous-total ({totalItems} article{totalItems !== 1 ? "s" : ""})</span>
            <span className="text-brand-green font-medium">{totalPrice.toFixed(2)}&nbsp;&euro;</span>
          </div>
          <div className="flex justify-between">
            <span className="text-brand-black/50">Livraison</span>
            <span className="text-brand-black/30 text-xs">Calcule a l&apos;etape suivante</span>
          </div>

          <div className="w-full h-px bg-gradient-to-r from-brand-beige via-brand-beige/50 to-transparent" />

          <div className="flex justify-between items-center pt-1">
            <span className="text-brand-green font-semibold text-base">Total</span>
            <span className="text-xl font-bold text-gradient-gold">{totalPrice.toFixed(2)}&nbsp;&euro;</span>
          </div>
        </div>

        <Link
          href="/checkout"
          className="group mt-8 w-full flex items-center justify-center gap-3 bg-brand-green text-brand-cream py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-[0_0_30px_rgba(31,58,52,0.25)] hover:scale-[1.02] transition-all duration-500 relative overflow-hidden"
        >
          <span className="relative z-10">Passer la commande</span>
          <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
        </Link>

        {/* Trust badges */}
        <div className="mt-6 flex items-center justify-center gap-4">
          <div className="flex items-center gap-1.5 text-brand-black/30">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z" />
            </svg>
            <span className="text-[10px] tracking-wide">SSL</span>
          </div>
          <div className="w-px h-3 bg-brand-beige" />
          <span className="text-brand-black/30 text-[10px] tracking-wide">Paiement securise</span>
          <div className="w-px h-3 bg-brand-beige" />
          <span className="text-brand-black/30 text-[10px] tracking-wide">3x/4x sans frais</span>
        </div>
      </div>
    </div>
  );
}
