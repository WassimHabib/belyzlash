import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <main className="min-h-screen bg-brand-cream">
      <div className="bg-brand-green">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-32 pb-12" />
        <div className="h-6 bg-brand-cream rounded-t-[2rem]" />
      </div>

      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        {/* Success icon */}
        <div className="relative w-24 h-24 mx-auto mb-8">
          <div className="absolute inset-0 rounded-full bg-brand-gold/10 animate-pulse-glow" />
          <div className="relative w-full h-full rounded-full bg-brand-green flex items-center justify-center shadow-xl shadow-brand-green/20">
            <svg className="w-10 h-10 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
            </svg>
          </div>
        </div>

        <h1 className="font-serif text-4xl sm:text-5xl text-brand-green mb-4">
          Merci pour votre <span className="text-gradient-gold">commande</span> !
        </h1>
        <p className="text-brand-black/50 leading-relaxed mb-10 max-w-sm mx-auto">
          Votre commande a bien ete enregistree. Vous recevrez un email de confirmation sous peu.
        </p>

        <Link
          href="/shop"
          className="inline-flex items-center gap-3 bg-brand-green text-brand-cream px-8 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-lg hover:scale-105 transition-all duration-500 group"
        >
          Continuer le shopping
          <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
          </svg>
        </Link>
      </div>
    </main>
  );
}
