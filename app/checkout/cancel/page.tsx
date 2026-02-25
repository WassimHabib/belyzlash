import Link from "next/link";

export default function CheckoutCancel() {
  return (
    <main className="min-h-screen bg-brand-cream">
      <div className="bg-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12" />
        <div className="h-6 bg-brand-cream rounded-t-[2rem]" />
      </div>

      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        {/* Cancel icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="relative w-full h-full rounded-full bg-brand-beige/40 flex items-center justify-center">
            <svg className="w-10 h-10 text-brand-black/30" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </div>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl text-brand-green mb-4">
          Commande annulee
        </h1>
        <p className="text-brand-black/50 leading-relaxed mb-10 max-w-sm mx-auto">
          Votre commande a ete annulee. Pas d&apos;inquietude, votre panier est toujours disponible.
        </p>

        <Link
          href="/cart"
          className="inline-flex items-center gap-3 bg-brand-green text-brand-cream px-8 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-lg hover:scale-105 transition-all duration-500 group"
        >
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:-translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          Retour au panier
        </Link>
      </div>
    </main>
  );
}
