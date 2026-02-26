"use client";

import Link from "next/link";
import { useState, useEffect } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { useAuth } from "@/components/auth/auth-provider";
import { MobileMenu } from "./mobile-menu";

const navLinks = [
  { label: "Nos Produits", href: "/shop" },
  { label: "Formations", href: "#formations" },
  { label: "Contact", href: "mailto:lash.belyz@gmail.com" },
];

export function Header() {
  const { totalItems } = useCart();
  const { user } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-40 transition-all duration-500 ${
        scrolled
          ? "bg-brand-green/95 backdrop-blur-xl shadow-[0_4px_30px_rgba(0,0,0,0.15)]"
          : "bg-transparent"
      }`}
    >
      {/* Top accent line */}
      <div
        className={`w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent transition-opacity duration-500 ${
          scrolled ? "opacity-100" : "opacity-0"
        }`}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            scrolled ? "h-16" : "h-20 sm:h-24"
          }`}
        >
          {/* Logo */}
          <Link href="/" className="group relative font-serif text-2xl sm:text-3xl tracking-wide text-brand-cream">
            Belyz<span className="text-brand-gold group-hover:text-brand-cream transition-colors duration-300">Lash</span>
            <span className="absolute -bottom-1 left-0 w-0 group-hover:w-full h-px bg-gradient-to-r from-brand-gold to-transparent transition-all duration-500" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="relative px-5 py-2 text-[11px] tracking-[0.2em] uppercase text-brand-cream/70 hover:text-brand-cream transition-all duration-300 group"
              >
                {link.label}
                <span className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 group-hover:w-5 h-px bg-brand-gold transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* User account */}
            <Link
              href={user ? "/account" : "/login"}
              aria-label="Mon compte"
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-brand-cream/70 hover:text-brand-cream hover:bg-white/[0.06] transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[18px] h-[18px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z"
                />
              </svg>
              {user && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-brand-gold shadow-lg" />
              )}
            </Link>

            {/* Cart */}
            <Link
              href="/cart"
              aria-label="Panier"
              className="relative w-10 h-10 rounded-full flex items-center justify-center text-brand-cream/70 hover:text-brand-cream hover:bg-white/[0.06] transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-[18px] h-[18px]"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute top-0.5 right-0.5 bg-brand-gold text-brand-black text-[9px] w-[18px] h-[18px] rounded-full flex items-center justify-center font-bold shadow-lg animate-fade-in-scale">
                  {totalItems}
                </span>
              )}
            </Link>

            {/* Mobile menu button */}
            <button
              className="lg:hidden w-10 h-10 rounded-full flex items-center justify-center text-brand-cream/70 hover:text-brand-cream hover:bg-white/[0.06] transition-all duration-300"
              onClick={() => setMenuOpen(true)}
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
