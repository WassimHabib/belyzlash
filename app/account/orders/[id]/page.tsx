"use client";

import { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
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

export default function OrderDetailPage() {
  const params = useParams();
  const id = params.id as string;

  const [order, setOrder] = useState<ShopifyOrder | null>(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    async function fetchOrder() {
      try {
        const res = await fetch("/api/account/orders");
        if (res.ok) {
          const data = await res.json();
          const found = (data.orders as ShopifyOrder[])?.find(
            (o) => String(o.orderNumber) === id
          );
          if (found) {
            setOrder(found);
          } else {
            setNotFound(true);
          }
        } else {
          setNotFound(true);
        }
      } catch {
        setNotFound(true);
      } finally {
        setLoading(false);
      }
    }
    fetchOrder();
  }, [id]);

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

  if (notFound || !order) {
    return (
      <div className="flex flex-col items-center justify-center py-32 text-center px-4">
        <div className="w-16 h-16 rounded-full bg-brand-beige/20 flex items-center justify-center mb-6">
          <svg className="w-7 h-7 text-brand-black/20" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z"
            />
          </svg>
        </div>
        <p className="text-brand-green font-serif text-xl font-bold mb-2">Commande introuvable</p>
        <p className="text-sm text-brand-black/40 max-w-xs mb-8">
          Nous n&apos;avons pas trouve cette commande dans votre historique.
        </p>
        <Link
          href="/account/orders"
          className="inline-flex items-center gap-2 bg-brand-green text-brand-cream py-3 px-8 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-lg transition-all duration-500"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Mes commandes
        </Link>
      </div>
    );
  }

  const fin = financialBadge(order.financialStatus);
  const ful = fulfillmentBadge(order.fulfillmentStatus);
  const addr = order.shippingAddress;

  return (
    <div className="space-y-6">
      {/* Back link */}
      <Link
        href="/account/orders"
        className="inline-flex items-center gap-2 text-sm text-brand-black/40 hover:text-brand-green transition-colors duration-300"
      >
        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
        </svg>
        Mes commandes
      </Link>

      {/* Header card */}
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-brand-beige/30 p-6 sm:p-8">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="font-serif text-2xl sm:text-3xl font-bold text-brand-green">
              Commande #{order.orderNumber}
            </h1>
            <p className="text-[10px] tracking-[0.15em] uppercase text-brand-black/30 font-semibold mt-1">
              {formatDate(order.processedAt)}
            </p>
          </div>
          <div className="flex items-center gap-2">
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
        </div>
      </div>

      {/* Articles */}
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-brand-beige/30 overflow-hidden">
        <div className="px-6 sm:px-8 pt-6 sm:pt-8 pb-4">
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-brand-gold font-bold">Articles</h2>
        </div>

        <div className="divide-y divide-brand-beige/20">
          {order.lineItems.map((item, idx) => (
            <div key={idx} className="flex items-center gap-4 px-6 sm:px-8 py-4">
              {/* Image */}
              {item.variant?.image?.url ? (
                <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0 bg-brand-cream">
                  <Image
                    src={item.variant.image.url}
                    alt={item.variant.image.altText ?? item.title}
                    fill
                    className="object-cover"
                    sizes="64px"
                  />
                </div>
              ) : (
                <div className="w-16 h-16 rounded-xl bg-brand-beige/20 flex items-center justify-center flex-shrink-0">
                  <svg className="w-6 h-6 text-brand-black/10" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909M3.75 21h16.5A2.25 2.25 0 0022.5 18.75V5.25A2.25 2.25 0 0020.25 3H3.75A2.25 2.25 0 001.5 5.25v13.5A2.25 2.25 0 003.75 21z"
                    />
                  </svg>
                </div>
              )}

              {/* Title + quantity */}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-brand-green truncate">{item.title}</p>
                <p className="text-[10px] tracking-[0.15em] uppercase text-brand-black/30 font-semibold mt-0.5">
                  x{item.quantity}
                </p>
              </div>

              {/* Price */}
              {item.variant && (
                <p className="text-sm font-bold text-brand-green tabular-nums flex-shrink-0">
                  {formatPrice(item.variant.price.amount)}
                </p>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Recapitulatif */}
      <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-brand-beige/30 p-6 sm:p-8">
        <h2 className="text-[10px] tracking-[0.2em] uppercase text-brand-gold font-bold mb-6">Recapitulatif</h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <p className="text-[10px] tracking-[0.15em] uppercase text-brand-black/30 font-semibold">Sous-total</p>
            <p className="text-sm text-brand-green tabular-nums">{formatPrice(order.subtotalPrice.amount)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[10px] tracking-[0.15em] uppercase text-brand-black/30 font-semibold">Livraison</p>
            <p className="text-sm text-brand-green tabular-nums">{formatPrice(order.totalShippingPrice.amount)}</p>
          </div>
          <div className="flex items-center justify-between">
            <p className="text-[10px] tracking-[0.15em] uppercase text-brand-black/30 font-semibold">Taxes</p>
            <p className="text-sm text-brand-green tabular-nums">{formatPrice(order.totalTax.amount)}</p>
          </div>

          <div className="border-t border-brand-beige/30 pt-3 mt-3">
            <div className="flex items-center justify-between">
              <p className="text-xs tracking-[0.15em] uppercase text-brand-green font-bold">Total</p>
              <p className="text-base font-bold text-brand-green tabular-nums">{formatPrice(order.totalPrice.amount)}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Adresse de livraison */}
      {addr && (
        <div className="bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] border border-brand-beige/30 p-6 sm:p-8">
          <h2 className="text-[10px] tracking-[0.2em] uppercase text-brand-gold font-bold mb-6">
            Adresse de livraison
          </h2>

          <div className="space-y-1 text-sm text-brand-green">
            <p className="font-semibold">
              {addr.firstName} {addr.lastName}
            </p>
            {addr.company && <p>{addr.company}</p>}
            <p>{addr.address1}</p>
            {addr.address2 && <p>{addr.address2}</p>}
            <p>
              {addr.zip} {addr.city}
            </p>
            {addr.province && <p>{addr.province}</p>}
            <p>{addr.country}</p>
            {addr.phone && (
              <p className="text-brand-black/40 mt-2">{addr.phone}</p>
            )}
          </div>
        </div>
      )}

      {/* Suivre ma commande */}
      {order.statusUrl && (
        <a
          href={order.statusUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="group relative flex items-center justify-center gap-2 w-full bg-brand-green text-brand-cream py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-lg hover:shadow-brand-green/20 transition-all duration-500 overflow-hidden"
        >
          <span className="absolute inset-0 bg-gradient-to-r from-brand-gold/0 via-brand-gold/10 to-brand-gold/0 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
          <span className="relative z-10 inline-flex items-center gap-2">
            Suivre ma commande
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M13.5 6H5.25A2.25 2.25 0 003 8.25v10.5A2.25 2.25 0 005.25 21h10.5A2.25 2.25 0 0018 18.75V10.5m-10.5 6L21 3m0 0h-5.25M21 3v5.25"
              />
            </svg>
          </span>
        </a>
      )}
    </div>
  );
}
