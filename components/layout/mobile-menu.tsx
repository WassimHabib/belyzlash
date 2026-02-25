"use client";

import Link from "next/link";
import { useEffect } from "react";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

const navLinks = [
  { label: "Accueil", href: "/", number: "01" },
  { label: "Nos Produits", href: "/shop", number: "02" },
  { label: "Formations", href: "#formations", number: "03" },
  { label: "Contact", href: "mailto:lash.belyz@gmail.com", number: "04" },
  { label: "Panier", href: "/cart", number: "05" },
];

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <div
      className={`fixed inset-0 z-50 lg:hidden transition-all duration-500 ${
        open ? "visible" : "invisible"
      }`}
    >
      {/* Backdrop */}
      <div
        className={`absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-500 ${
          open ? "opacity-100" : "opacity-0"
        }`}
        onClick={onClose}
      />

      {/* Panel */}
      <div
        className={`absolute right-0 top-0 h-full w-full max-w-sm bg-brand-green transition-transform duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] ${
          open ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Decorative */}
        <div className="absolute -bottom-40 -left-40 w-[400px] h-[400px] rounded-full bg-brand-gold/[0.04] blur-[120px]" />
        <div className="absolute top-0 left-0 w-px h-full bg-gradient-to-b from-transparent via-brand-gold/20 to-transparent" />

        <div className="relative z-10 h-full flex flex-col p-8">
          {/* Header */}
          <div className="flex justify-between items-center mb-16">
            <span className="font-serif text-2xl text-brand-cream">
              Belyz<span className="text-brand-gold">Lash</span>
            </span>
            <button
              onClick={onClose}
              aria-label="Fermer"
              className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-cream/60 hover:text-brand-cream hover:border-brand-gold/30 transition-all duration-300"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-5 h-5"
              >
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>

          {/* Nav links */}
          <nav className="flex flex-col gap-2 flex-1">
            {navLinks.map((link, i) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={onClose}
                className={`group flex items-center gap-4 py-4 border-b border-white/[0.04] hover:border-brand-gold/20 transition-all duration-300 ${
                  open ? "animate-fade-in-up" : "opacity-0"
                }`}
                style={{ animationDelay: `${0.1 + i * 0.06}s` }}
              >
                <span className="text-brand-gold/30 text-[11px] font-mono group-hover:text-brand-gold/60 transition-colors duration-300">
                  {link.number}
                </span>
                <span className="text-brand-cream text-lg tracking-wide group-hover:text-brand-gold group-hover:translate-x-2 transition-all duration-300">
                  {link.label}
                </span>
                <svg
                  className="w-4 h-4 text-brand-cream/0 group-hover:text-brand-gold ml-auto transition-all duration-300"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth={2}
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </Link>
            ))}
          </nav>

          {/* Bottom */}
          <div
            className={`pt-6 border-t border-white/[0.06] ${
              open ? "animate-fade-in-up animation-delay-500" : "opacity-0"
            }`}
          >
            {/* Social */}
            <div className="flex gap-3 mb-6">
              <a
                href="https://www.instagram.com/belyzlash"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-cream/40 hover:text-brand-gold hover:border-brand-gold/30 hover:bg-brand-gold/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href="https://www.tiktok.com/@elysza"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-cream/40 hover:text-brand-gold hover:border-brand-gold/30 hover:bg-brand-gold/10 transition-all duration-300"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48v-7.15a8.16 8.16 0 005.58 2.19V11.2a4.85 4.85 0 01-3.77-1.74V6.69h3.77z"/></svg>
              </a>
            </div>
            <p className="text-[11px] text-brand-cream/20 tracking-wide">
              &copy; {new Date().getFullYear()} BelyzLash
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
