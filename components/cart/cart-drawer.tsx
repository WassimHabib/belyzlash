"use client";

import Link from "next/link";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useCart } from "./cart-provider";
import type { ActiveDiscount } from "@/lib/shopify";

function useDiscounts() {
  const [discounts, setDiscounts] = useState<ActiveDiscount[]>([]);
  useEffect(() => {
    fetch("/api/promotions")
      .then((r) => r.json())
      .then((d) => setDiscounts(d))
      .catch(() => {});
  }, []);
  return discounts;
}

function calcDiscounts(subtotal: number, discounts: ActiveDiscount[]) {
  let totalReduction = 0;
  const lines: { label: string; amount: number }[] = [];

  for (const d of discounts) {
    if (d.type === "free_shipping") continue;
    const qualified = !d.minimumAmount || subtotal >= d.minimumAmount;
    if (!qualified) continue;

    if (d.type === "percentage" && d.value) {
      const amount = subtotal * (d.value / 100);
      lines.push({ label: d.title, amount });
      totalReduction += amount;
    } else if (d.type === "fixed" && d.value) {
      lines.push({ label: d.title, amount: d.value });
      totalReduction += d.value;
    }
  }

  return { lines, totalReduction, finalTotal: Math.max(subtotal - totalReduction, 0) };
}

function ProgressBar({ discount, totalPrice }: { discount: ActiveDiscount; totalPrice: number }) {
  const threshold = discount.minimumAmount;
  if (!threshold) return null;

  const remaining = threshold - totalPrice;
  const progress = Math.min((totalPrice / threshold) * 100, 100);
  const qualified = remaining <= 0;

  return (
    <div>
      <div className="mb-1.5">
        {qualified ? (
          <p className="text-xs font-semibold text-brand-green flex items-center gap-1.5">
            <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            {discount.title}
          </p>
        ) : (
          <p className="text-[11px] text-brand-black/50">
            Plus que <span className="font-bold text-brand-green">{remaining.toFixed(2)}&nbsp;&euro;</span> — {discount.title}
          </p>
        )}
      </div>
      <div className="h-1.5 rounded-full bg-brand-beige/40 overflow-hidden">
        <div
          className={`h-full rounded-full transition-all duration-700 ease-out ${qualified ? "bg-brand-green" : "bg-brand-gold"}`}
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

function DrawerItem({ item }: { item: import("@/lib/types").CartItem }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-3 py-4 border-b border-brand-beige/30">
      {/* Image */}
      <div className="w-20 h-20 relative rounded-xl overflow-hidden bg-brand-beige/20 flex-shrink-0">
        {item.image && (
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="80px" />
        )}
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex items-start justify-between gap-2">
            <h4 className="font-serif text-sm text-brand-green leading-tight truncate">{item.name}</h4>
            <button
              onClick={() => removeItem(item.productId, item.size, item.color)}
              aria-label="Supprimer"
              className="flex-shrink-0 w-6 h-6 flex items-center justify-center text-brand-black/20 hover:text-red-500 transition-colors"
            >
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          {(item.size || item.color) && (
            <div className="flex gap-1.5 mt-1">
              {item.size && <span className="text-[10px] text-brand-black/40 bg-brand-beige/30 px-2 py-0.5 rounded-full">{item.size}</span>}
              {item.color && <span className="text-[10px] text-brand-black/40 bg-brand-beige/30 px-2 py-0.5 rounded-full">{item.color}</span>}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between mt-2">
          {/* Quantity */}
          <div className="flex items-center rounded-full border border-brand-beige/50 overflow-hidden">
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
              className="w-7 h-7 flex items-center justify-center text-brand-black/40 hover:text-brand-green text-xs"
            >
              -
            </button>
            <span className="w-6 text-center text-xs font-medium text-brand-green">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
              className="w-7 h-7 flex items-center justify-center text-brand-black/40 hover:text-brand-green text-xs"
            >
              +
            </button>
          </div>

          <p className="text-brand-green font-semibold text-sm">{(item.price * item.quantity).toFixed(2)}&nbsp;&euro;</p>
        </div>
      </div>
    </div>
  );
}

export function CartDrawer() {
  const { items, totalItems, totalPrice, drawerOpen, closeDrawer } = useCart();
  const discounts = useDiscounts();
  const { lines, totalReduction, finalTotal } = calcDiscounts(totalPrice, discounts);

  const withThreshold = discounts.filter((d) => d.minimumAmount);
  const withoutThreshold = discounts.filter((d) => !d.minimumAmount && d.type !== "free_shipping");
  const freeShipping = discounts.find(
    (d) => d.type === "free_shipping" && d.minimumAmount && totalPrice >= d.minimumAmount
  );

  // Lock body scroll when open
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [drawerOpen]);

  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[60] bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${
          drawerOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={closeDrawer}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[70] w-full max-w-md bg-white shadow-2xl transition-transform duration-300 ease-out flex flex-col ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-5 py-4 border-b border-brand-beige/30">
          <h2 className="font-serif text-lg text-brand-green font-bold">Mon panier</h2>
          <button
            onClick={closeDrawer}
            aria-label="Fermer"
            className="w-9 h-9 rounded-full flex items-center justify-center text-brand-black/40 hover:text-brand-green hover:bg-brand-beige/20 transition-all"
          >
            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Progress bars */}
        {discounts.length > 0 && (
          <div className="px-5 py-3 border-b border-brand-beige/30 space-y-3">
            {withoutThreshold.map((d, i) => (
              <p key={i} className="text-xs font-semibold text-brand-green flex items-center gap-1.5">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {d.title}
              </p>
            ))}
            {withThreshold.map((d, i) => (
              <ProgressBar key={i} discount={d} totalPrice={totalPrice} />
            ))}
          </div>
        )}

        {/* Items */}
        <div className="flex-1 overflow-y-auto px-5">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center py-10">
              <div className="w-16 h-16 rounded-full bg-brand-beige/30 flex items-center justify-center mb-4">
                <svg className="w-7 h-7 text-brand-black/15" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
                </svg>
              </div>
              <p className="font-serif text-brand-green mb-1">Votre panier est vide</p>
              <p className="text-brand-black/40 text-xs mb-4">Decouvrez notre collection</p>
              <button
                onClick={closeDrawer}
                className="text-brand-green text-xs font-semibold tracking-wide uppercase hover:underline"
              >
                Continuer le shopping
              </button>
            </div>
          ) : (
            <div>
              {items.map((item) => (
                <DrawerItem key={`${item.productId}-${item.size}-${item.color}`} item={item} />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t border-brand-beige/30 px-5 py-4 space-y-3">
            {/* Subtotal & discounts */}
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-brand-black/50">Sous-total ({totalItems} article{totalItems !== 1 ? "s" : ""})</span>
                <span className="text-brand-green font-medium">{totalPrice.toFixed(2)}&nbsp;&euro;</span>
              </div>
              {lines.map((line, i) => (
                <div key={i} className="flex justify-between">
                  <span className="text-brand-green/70 text-xs">{line.label}</span>
                  <span className="text-brand-green font-semibold text-xs">-{line.amount.toFixed(2)}&nbsp;&euro;</span>
                </div>
              ))}
              {freeShipping && (
                <div className="flex justify-between">
                  <span className="text-brand-black/50">Livraison</span>
                  <span className="text-brand-green text-xs font-semibold">Offerte</span>
                </div>
              )}
              {totalReduction > 0 && (
                <div className="flex justify-between items-center pt-1 border-t border-brand-beige/30">
                  <span className="text-brand-green font-semibold">Total</span>
                  <div className="text-right">
                    <p className="text-brand-black/25 line-through text-xs">{totalPrice.toFixed(2)}&nbsp;&euro;</p>
                    <span className="text-lg font-bold text-brand-green">{finalTotal.toFixed(2)}&nbsp;&euro;</span>
                  </div>
                </div>
              )}
              {totalReduction === 0 && (
                <div className="flex justify-between items-center pt-1 border-t border-brand-beige/30">
                  <span className="text-brand-green font-semibold">Total</span>
                  <span className="text-lg font-bold text-brand-green">{finalTotal.toFixed(2)}&nbsp;&euro;</span>
                </div>
              )}
            </div>

            {/* Checkout button */}
            <Link
              href="/checkout"
              onClick={closeDrawer}
              className="w-full flex items-center justify-center gap-2 bg-brand-green text-brand-cream py-3.5 rounded-full text-[11px] tracking-[0.15em] uppercase font-bold hover:bg-brand-green/90 transition-all duration-300"
            >
              Valider ma commande
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>

            {/* Trust */}
            <p className="text-center text-brand-black/30 text-[10px] tracking-wide">
              Paiement securise &middot; 3x/4x sans frais
            </p>
          </div>
        )}
      </div>
    </>
  );
}
