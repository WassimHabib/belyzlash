"use client";

interface AddToCartButtonProps {
  onClick: () => void;
  disabled: boolean;
  added?: boolean;
}

export function AddToCartButton({ onClick, disabled, added }: AddToCartButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`group relative w-full overflow-hidden rounded-full py-4 text-[11px] tracking-[0.2em] uppercase font-bold transition-all duration-500 ${
        added
          ? "bg-brand-green text-brand-cream"
          : disabled
          ? "bg-brand-beige/50 text-brand-black/30 cursor-not-allowed"
          : "bg-brand-green text-brand-cream hover:shadow-[0_0_30px_rgba(31,58,52,0.25)] hover:scale-[1.02] active:scale-[0.98]"
      }`}
    >
      <span className={`inline-flex items-center gap-2 transition-all duration-300 ${added ? "translate-y-0 opacity-100" : ""}`}>
        {added ? (
          <>
            <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
            Ajoute au panier !
          </>
        ) : (
          <>
            <svg className="w-5 h-5 transition-transform duration-300 group-hover:-translate-y-0.5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z" />
            </svg>
            Ajouter au panier
          </>
        )}
      </span>
      {/* Shine effect on hover */}
      {!disabled && !added && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
      )}
    </button>
  );
}
