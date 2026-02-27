"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";

export default function CheckoutPage() {
  const { items } = useCart();
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (items.length === 0) return;

    async function redirect() {
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

        if (!res.ok) throw new Error("Erreur");

        const data = await res.json();
        window.location.href = data.checkoutUrl;
      } catch {
        setError("Une erreur est survenue. Veuillez reessayer.");
      }
    }

    redirect();
  }, [items]);

  if (items.length === 0) {
    return (
      <main className="min-h-screen bg-brand-cream">
        <div className="bg-brand-green">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12" />
          <div className="h-6 bg-brand-cream rounded-t-[2rem]" />
        </div>
        <div className="flex flex-col items-center justify-center py-16 text-center px-4">
          <div className="w-20 h-20 rounded-full bg-brand-beige/40 flex items-center justify-center mb-6">
            <svg className="w-9 h-9 text-brand-black/15" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
          </div>
          <h2 className="font-serif text-2xl text-brand-green mb-2">Votre panier est vide</h2>
          <p className="text-brand-black/40 text-sm mb-8">Ajoutez des produits avant de passer commande.</p>
          <Link
            href="/shop"
            className="inline-flex items-center gap-3 bg-brand-green text-brand-cream px-8 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-lg transition-all duration-500"
          >
            Decouvrir la boutique
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-brand-cream">
      <div className="bg-brand-green grain relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-1/3 -right-1/4 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12 sm:pb-14">
          <h1 className="font-serif text-5xl sm:text-6xl text-brand-cream leading-tight font-bold">
            Redirection <span className="text-gradient-gold">en cours...</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-brand-cream rounded-t-[2rem]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 flex flex-col items-center text-center">
        {error ? (
          <>
            <div className="w-16 h-16 rounded-full bg-red-50 flex items-center justify-center mb-6">
              <svg className="w-7 h-7 text-red-400" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>
            </div>
            <p className="text-red-600 text-sm mb-6">{error}</p>
            <Link
              href="/cart"
              className="inline-flex items-center gap-2 bg-brand-green text-brand-cream px-8 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-lg transition-all duration-500"
            >
              Retour au panier
            </Link>
          </>
        ) : (
          <>
            <svg className="w-10 h-10 text-brand-gold animate-spin mb-6" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            <p className="text-brand-black/50 text-sm">Redirection vers le paiement securise...</p>
          </>
        )}
      </div>
    </main>
  );
}
