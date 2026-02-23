"use client";

import Link from "next/link";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-64 bg-brand-green p-6">
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 text-brand-cream"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="mt-12 flex flex-col gap-6 text-brand-cream text-lg tracking-widest uppercase">
          <Link href="/shop" onClick={onClose} className="hover:text-brand-gold transition-colors">
            Shop
          </Link>
          <Link href="/cart" onClick={onClose} className="hover:text-brand-gold transition-colors">
            Panier
          </Link>
        </nav>
      </div>
    </div>
  );
}
