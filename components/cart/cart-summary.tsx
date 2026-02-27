"use client";

import { useState } from "react";
import { useCart } from "./cart-provider";

export function CartSummary() {
  const { items, totalPrice, totalItems } = useCart();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleCheckout() {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          items: items.map((item) => ({
            variantId: item.variantGid,
            quantity: item.quantity,
          })),
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la creation du checkout");

      const data = await res.json();
      window.location.href = data.checkoutUrl;
    } catch {
      setError("Une erreur est survenue. Veuillez reessayer.");
      setLoading(false);
    }
  }

  return (
    <>
      {/* Desktop summary card */}
      <div className="hidden lg:block lg:sticky lg:top-28">
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

          {error && (
            <p className="mt-4 text-red-600 text-sm text-center">{error}</p>
          )}

          <button
            onClick={handleCheckout}
            disabled={loading}
            className="group mt-8 w-full flex items-center justify-center gap-3 bg-brand-green text-brand-cream py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-[0_0_30px_rgba(31,58,52,0.25)] hover:scale-[1.02] transition-all duration-500 relative overflow-hidden disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            <span className="relative z-10">
              {loading ? "Redirection..." : "Passer la commande"}
            </span>
            {!loading && (
              <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            )}
            {loading && (
              <svg className="relative z-10 w-4 h-4 animate-spin" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
              </svg>
            )}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
          </button>

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

      {/* Mobile summary card (inline) */}
      <div className="lg:hidden pb-28">
        <div className="rounded-3xl border border-brand-beige/60 bg-white p-6">
          <h2 className="font-serif text-lg text-brand-green mb-4">Resume</h2>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span className="text-brand-black/50">Sous-total ({totalItems} article{totalItems !== 1 ? "s" : ""})</span>
              <span className="text-brand-green font-medium">{totalPrice.toFixed(2)}&nbsp;&euro;</span>
            </div>
            <div className="flex justify-between">
              <span className="text-brand-black/50">Livraison</span>
              <span className="text-brand-black/30 text-xs">Calcule apres</span>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile sticky bottom bar */}
      <div className="fixed bottom-0 left-0 right-0 z-30 lg:hidden bg-white/95 backdrop-blur-xl border-t border-brand-beige/40 safe-bottom">
        <div className="px-4 py-3 flex items-center gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-brand-black/40 text-[11px] tracking-wide">{totalItems} article{totalItems !== 1 ? "s" : ""}</p>
            <p className="text-brand-gold font-bold text-xl">{totalPrice.toFixed(2)}&nbsp;&euro;</p>
          </div>
          <button
            onClick={handleCheckout}
            disabled={loading}
            className="flex-shrink-0 flex items-center gap-2 bg-brand-green text-brand-cream px-6 py-3.5 rounded-full text-[11px] tracking-[0.15em] uppercase font-bold active:scale-95 transition-transform duration-200 disabled:opacity-60 disabled:active:scale-100"
          >
            {loading ? "Redirection..." : "Commander"}
            {!loading && (
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            )}
          </button>
        </div>
      </div>
    </>
  );
}
