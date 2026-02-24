"use client";

interface AddToCartButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function AddToCartButton({ onClick, disabled }: AddToCartButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-brand-green text-brand-cream py-4 text-sm tracking-widest uppercase hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Ajouter au panier
    </button>
  );
}
