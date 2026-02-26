"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { ShopifyOrder } from "@/lib/types";

function financialBadge(status: string) {
  switch (status) {
    case "PAID":
      return { label: "Paye", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    case "PENDING":
      return { label: "En attente", cls: "bg-amber-50 text-amber-700 border-amber-200" };
    case "REFUNDED":
      return { label: "Rembourse", cls: "bg-blue-50 text-blue-700 border-blue-200" };
    case "VOIDED":
      return { label: "Annule", cls: "bg-red-50 text-red-700 border-red-200" };
    default:
      return { label: status, cls: "bg-gray-50 text-gray-600 border-gray-200" };
  }
}

function fulfillmentBadge(status: string) {
  switch (status) {
    case "FULFILLED":
      return { label: "Expediee", cls: "bg-emerald-50 text-emerald-700 border-emerald-200" };
    case "UNFULFILLED":
      return { label: "En preparation", cls: "bg-amber-50 text-amber-700 border-amber-200" };
    case "PARTIALLY_FULFILLED":
      return { label: "Partielle", cls: "bg-blue-50 text-blue-700 border-blue-200" };
    default:
      return { label: status, cls: "bg-gray-50 text-gray-600 border-gray-200" };
  }
}

function formatDate(dateStr: string) {
  return new Intl.DateTimeFormat("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  }).format(new Date(dateStr));
}

function formatPrice(amount: string) {
  return `${parseFloat(amount).toFixed(2)} \u20AC`;
}

export default function OrdersPage() {
  const [orders, setOrders] = useState<ShopifyOrder[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchOrders() {
      try {
        const res = await fetch("/api/account/orders");
        if (res.ok) {
          const data = await res.json();
          setOrders(data.orders ?? []);
        }
      } catch {
        // silently fail
      } finally {
        setLoading(false);
      }
    }
    fetchOrders();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center py-32">
        <svg className="w-8 h-8 animate-spin text-brand-green/30" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
          <path
            className="opacity-75"
            fill="currentColor"
            d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
          />
        </svg>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-brand-beige/20 flex items-center justify-center mb-6">
          <svg className="w-7 h-7 text-brand-black/20" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
            />
          </svg>
        </div>
        <p className="text-brand-green font-serif text-xl font-bold mb-2">Aucune commande</p>
        <p className="text-sm text-brand-black/40 max-w-xs">
          Vous n&apos;avez pas encore passe de commande. Decouvrez notre collection pour trouver votre bonheur.
        </p>
        <Link
          href="/shop"
          className="mt-8 inline-flex items-center gap-2 bg-brand-green text-brand-cream py-3 px-8 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-lg transition-all duration-500"
        >
          Decouvrir la boutique
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    );
  }

  return (
    <div>
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-brand-beige/30 overflow-hidden">
        <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-brand-gold font-bold">
            Mes commandes
          </h2>
        </div>

        <div className="divide-y divide-brand-beige/20">
          {orders.map((order) => {
            const fin = financialBadge(order.financialStatus);
            const ful = fulfillmentBadge(order.fulfillmentStatus);

            return (
              <Link
                key={order.id}
                href={`/account/orders/${order.orderNumber}`}
                className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-6 px-6 sm:px-8 py-5 hover:bg-brand-cream/40 transition-colors duration-300 group"
              >
                {/* Order number + date */}
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-bold text-brand-green group-hover:text-brand-gold transition-colors duration-300">
                    #{order.orderNumber}
                  </p>
                  <p className="text-[10px] tracking-[0.15em] uppercase text-brand-black/30 font-semibold mt-0.5">
                    {formatDate(order.processedAt)}
                  </p>
                </div>

                {/* Badges */}
                <div className="flex items-center gap-2 flex-shrink-0">
                  <span
                    className={`inline-block text-[10px] tracking-[0.15em] uppercase font-bold px-3 py-1 rounded-full border ${fin.cls}`}
                  >
                    {fin.label}
                  </span>
                  <span
                    className={`inline-block text-[10px] tracking-[0.15em] uppercase font-bold px-3 py-1 rounded-full border ${ful.cls}`}
                  >
                    {ful.label}
                  </span>
                </div>

                {/* Total */}
                <div className="flex items-center gap-3 flex-shrink-0">
                  <p className="text-sm font-bold text-brand-green tabular-nums">
                    {formatPrice(order.totalPrice.amount)}
                  </p>
                  <svg
                    className="w-4 h-4 text-brand-black/20 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
                  </svg>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}
