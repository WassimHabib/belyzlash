"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import { ShippingForm } from "@/components/checkout/shipping-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { OrderBilling } from "@/lib/types";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

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

  async function handleSubmit(billing: OrderBilling) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billing,
          items: items.map((item) => ({
            product_id: item.productId,
            variation_id: item.variationId,
            quantity: item.quantity,
          })),
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la commande");

      clearCart();
      router.push("/checkout/success");
    } catch {
      setError("Une erreur est survenue. Veuillez reessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Header */}
      <div className="bg-brand-green grain relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-1/3 -right-1/4 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px]" />
        </div>
        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12 sm:pb-14">
          {/* Steps */}
          <div className="flex items-center gap-3 mb-6 text-[11px] tracking-[0.15em] uppercase">
            <Link href="/cart" className="text-brand-cream/40 hover:text-brand-cream transition-colors">
              Panier
            </Link>
            <svg className="w-3 h-3 text-brand-cream/20" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
            </svg>
            <span className="text-brand-gold">Livraison & Paiement</span>
          </div>
          <h1 className="font-serif text-5xl sm:text-6xl text-brand-cream leading-tight font-bold">
            Finaliser <span className="text-gradient-gold">la commande</span>
          </h1>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-brand-cream rounded-t-[2rem]" />
      </div>

      {/* Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 sm:py-14">
        {error && (
          <div className="mb-8 p-4 rounded-2xl bg-red-50 border border-red-200/60 flex items-center gap-3">
            <svg className="w-5 h-5 text-red-500 flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
            </svg>
            <p className="text-red-700 text-sm">{error}</p>
          </div>
        )}

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10 lg:gap-14">
          <div className="lg:col-span-2">
            <div className="rounded-3xl border border-brand-beige/60 bg-white p-7 sm:p-10">
              <h2 className="font-serif text-xl text-brand-green mb-2">Adresse de livraison</h2>
              <p className="text-brand-black/40 text-sm mb-8">Renseignez vos informations pour la livraison.</p>
              <ShippingForm onSubmit={handleSubmit} loading={loading} />
            </div>
          </div>
          <OrderSummary />
        </div>
      </div>
    </main>
  );
}
