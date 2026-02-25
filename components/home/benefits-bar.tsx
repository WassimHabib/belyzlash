"use client";

import { useScrollAnimation } from "@/lib/use-scroll-animation";

const benefits = [
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z" />
      </svg>
    ),
    title: "Paiement Securise",
    description: "3x ou 4x sans frais disponible sur toutes vos commandes",
    badge: "SSL",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 01-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 01-3 0m3 0a1.5 1.5 0 00-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 00-3.213-9.193 2.056 2.056 0 00-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 00-10.026 0 1.106 1.106 0 00-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    title: "Livraison Rapide",
    description: "Expedition sous 24h a 72h, directement chez vous des 4,50\u20ac",
    badge: "24H",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 10.5a3 3 0 11-6 0 3 3 0 016 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 10.5c0 7.142-7.5 11.25-7.5 11.25S4.5 17.642 4.5 10.5a7.5 7.5 0 1115 0z" />
      </svg>
    ),
    title: "Click & Collect",
    description: "Commandez en ligne et recuperez votre colis pret en 2 heures",
    badge: "2H",
  },
  {
    icon: (
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor" className="w-7 h-7">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
      </svg>
    ),
    title: "Qualite Pro",
    description: "Produits haut de gamme selectionnes et testes par des professionnelles",
    badge: "PRO",
  },
];

export function BenefitsBar() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-14 sm:py-16 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#EDF4F0] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#EDF4F0] to-transparent" />

      {/* Decorative orbs */}
      <div className="absolute -top-20 left-1/4 w-80 h-80 rounded-full bg-brand-gold/[0.03] blur-[100px]" />
      <div className="absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-brand-green/[0.03] blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section header */}
        <div className={`text-center mb-10 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase mb-4 font-bold">
            Nos Engagements
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-green font-bold">
            Pourquoi nous faire <span className="text-gradient-gold">confiance</span>
          </h2>
        </div>

        {/* Benefits grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit, i) => (
            <div
              key={benefit.title}
              className={`group relative rounded-3xl bg-white border border-brand-beige/60 p-8 transition-all duration-500 hover:border-brand-gold/40 hover:shadow-[0_20px_60px_-12px_rgba(198,168,107,0.15)] hover:-translate-y-2 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${i * 0.12}s` }}
            >
              {/* Corner accent */}
              <div className="absolute top-0 right-0 w-20 h-20 overflow-hidden rounded-tr-3xl">
                <div className="absolute top-0 right-0 w-[1px] h-12 bg-gradient-to-b from-brand-gold/40 to-transparent group-hover:h-16 transition-all duration-500" />
                <div className="absolute top-0 right-0 w-12 h-[1px] bg-gradient-to-l from-brand-gold/40 to-transparent group-hover:w-16 transition-all duration-500" />
              </div>

              {/* Badge */}
              <div className="absolute top-5 right-5">
                <span className="text-[9px] tracking-[0.2em] font-bold text-brand-gold/40 group-hover:text-brand-gold/70 transition-colors duration-500">
                  {benefit.badge}
                </span>
              </div>

              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-16 h-16 rounded-2xl bg-brand-green flex items-center justify-center text-brand-gold shadow-lg shadow-brand-green/20 group-hover:shadow-brand-green/30 group-hover:scale-105 transition-all duration-500">
                  {benefit.icon}
                </div>
                {/* Glow behind icon */}
                <div className="absolute inset-0 w-16 h-16 rounded-2xl bg-brand-gold/0 group-hover:bg-brand-gold/20 blur-xl transition-all duration-700" />
              </div>

              {/* Text */}
              <h3 className="font-semibold text-brand-green text-base tracking-wide mb-2">
                {benefit.title}
              </h3>
              <p className="text-brand-black/40 text-sm leading-relaxed">
                {benefit.description}
              </p>

              {/* Bottom line accent */}
              <div className="mt-6 w-0 group-hover:w-full h-[2px] rounded-full bg-gradient-to-r from-brand-gold to-brand-gold/30 transition-all duration-700" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
