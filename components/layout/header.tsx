"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-brand-green text-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="font-serif text-2xl sm:text-3xl tracking-wide">
            belyzlash
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
            <Link href="/shop" className="hover:text-brand-gold transition-colors">
              Shop
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              aria-label="Panier"
              className="relative hover:text-brand-gold transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              className="md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
