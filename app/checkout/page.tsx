"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/cart-provider";
import { ShippingForm } from "@/components/checkout/shipping-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { OrderBilling } from "@/lib/types";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-serif text-4xl text-brand-green mb-6">Checkout</h1>
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
    } catch (err) {
      setError("Une erreur est survenue. Veuillez reessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl text-brand-green mb-8">Checkout</h1>
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm border border-red-200">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="font-serif text-xl text-brand-green mb-6">
            Adresse de livraison
          </h2>
          <ShippingForm onSubmit={handleSubmit} loading={loading} />
        </div>
        <OrderSummary />
      </div>
    </main>
  );
}
