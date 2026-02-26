"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useAuth } from "@/components/auth/auth-provider";
import { ShopifyOrder } from "@/lib/types";

export default function AccountPage() {
  const { user } = useAuth();
  const [orders, setOrders] = useState<ShopifyOrder[]>([]);
  const [loadingOrders, setLoadingOrders] = useState(true);

  useEffect(() => {
    fetch("/api/account/orders")
      .then((res) => res.json())
      .then((data) => setOrders(data.orders ?? []))
      .catch(() => setOrders([]))
      .finally(() => setLoadingOrders(false));
  }, []);

  const recentOrders = orders.slice(0, 3);

  function formatDate(dateStr: string) {
    return new Intl.DateTimeFormat("fr-FR", {
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date(dateStr));
  }

  const financialLabels: Record<string, string> = {
    PAID: "Paye",
    PENDING: "En attente",
    REFUNDED: "Rembourse",
    VOIDED: "Annule",
  };

  return (
    <div className="space-y-6">
      {/* Profile card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-brand-beige/30 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-brand-gold font-bold">
            Mon profil
          </h2>
          <Link
            href="/account/profile"
            className="text-[10px] tracking-[0.15em] uppercase font-bold text-brand-green hover:text-brand-gold transition-colors duration-300"
          >
            Modifier
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-brand-black/30 font-semibold mb-1">
              Prenom
            </p>
            <p className="text-sm text-brand-green font-medium">
              {user?.firstName}
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-brand-black/30 font-semibold mb-1">
              Nom
            </p>
            <p className="text-sm text-brand-green font-medium">
              {user?.lastName}
            </p>
          </div>
          <div>
            <p className="text-[10px] tracking-[0.15em] uppercase text-brand-black/30 font-semibold mb-1">
              Email
            </p>
            <p className="text-sm text-brand-green font-medium">
              {user?.email}
            </p>
          </div>
          {user?.phone && (
            <div>
              <p className="text-[10px] tracking-[0.15em] uppercase text-brand-black/30 font-semibold mb-1">
                Telephone
              </p>
              <p className="text-sm text-brand-green font-medium">
                {user.phone}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Recent orders card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-brand-beige/30 p-6 sm:p-8">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-brand-gold font-bold">
            Dernieres commandes
          </h2>
          {orders.length > 0 && (
            <Link
              href="/account/orders"
              className="text-[10px] tracking-[0.15em] uppercase font-bold text-brand-green hover:text-brand-gold transition-colors duration-300"
            >
              Tout voir
            </Link>
          )}
        </div>

        {loadingOrders ? (
          <div className="flex justify-center py-8">
            <svg
              className="w-6 h-6 animate-spin text-brand-green/30"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              />
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              />
            </svg>
          </div>
        ) : recentOrders.length === 0 ? (
          <div className="text-center py-8">
            <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-brand-beige/20 flex items-center justify-center">
              <svg
                className="w-5 h-5 text-brand-black/20"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m8.25 3v6.75m0 0l-3-3m3 3l3-3M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z"
                />
              </svg>
            </div>
            <p className="text-sm text-brand-black/40">
              Aucune commande pour le moment.
            </p>
            <Link
              href="/shop"
              className="inline-block mt-4 text-[10px] tracking-[0.15em] uppercase font-bold text-brand-green hover:text-brand-gold transition-colors duration-300"
            >
              Decouvrir la boutique
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-brand-beige/20">
            {recentOrders.map((order) => (
              <Link
                key={order.id}
                href={`/account/orders/${order.orderNumber}`}
                className="flex items-center justify-between py-4 first:pt-0 last:pb-0 group"
              >
                <div className="min-w-0">
                  <p className="text-sm font-semibold text-brand-green group-hover:text-brand-gold transition-colors duration-300">
                    #{order.orderNumber}
                  </p>
                  <p className="text-xs text-brand-black/40 mt-0.5">
                    {formatDate(order.processedAt)}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[10px] tracking-[0.1em] uppercase font-bold px-2 py-1 rounded-full bg-brand-green/10 text-brand-green">
                    {financialLabels[order.financialStatus] ??
                      order.financialStatus}
                  </span>
                  <span className="text-sm font-semibold text-brand-green">
                    {parseFloat(order.totalPrice.amount).toFixed(2)} &euro;
                  </span>
                  <svg
                    className="w-4 h-4 text-brand-black/20 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all duration-300"
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M8.25 4.5l7.5 7.5-7.5 7.5"
                    />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
