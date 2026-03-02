"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/lib/use-scroll-animation";

const perks = [
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
    title: "Produits offerts",
    desc: "Recevez nos nouveautes en avant-premiere",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
    title: "Remises exclusives",
    desc: "Jusqu'a 30% sur toute la boutique",
  },
  {
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
    title: "Communaute privee",
    desc: "Rejoignez un reseau de passionnees",
  },
];

export function AmbassadriceSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-14 sm:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#EDF4F0] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#EDF4F0] to-transparent" />
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      <div className="absolute -top-20 right-1/4 w-80 h-80 rounded-full bg-brand-gold/[0.03] blur-[100px]" />
      <div className="absolute -bottom-20 left-1/4 w-80 h-80 rounded-full bg-brand-green/[0.03] blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          {/* Left: visual */}
          <div className={`relative ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="relative max-w-md mx-auto lg:mx-0">
              {/* Decorative borders */}
              <div className="absolute -inset-3 rounded-3xl border border-brand-gold/15" />
              <div className="absolute -inset-6 rounded-3xl border border-brand-gold/8" />

              {/* Main card */}
              <div className="relative rounded-2xl bg-brand-green grain overflow-hidden aspect-[4/5]">
                {/* Decorative orbs */}
                <div className="absolute -top-1/4 -right-1/4 w-[400px] h-[400px] rounded-full bg-brand-gold/8 blur-[100px]" />
                <div className="absolute -bottom-1/4 -left-1/4 w-[300px] h-[300px] rounded-full bg-brand-cream/5 blur-[80px]" />

                {/* Content */}
                <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-8 sm:px-12">
                  {/* Crown icon */}
                  <div className="w-20 h-20 rounded-full bg-brand-gold/10 flex items-center justify-center mb-8">
                    <svg className="w-10 h-10 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75l3.75-6 4.5 4.5 3-6 4.5 6 3.75-6v6a2.25 2.25 0 01-2.25 2.25H4.5a2.25 2.25 0 01-2.25-2.25v-1.5z" />
                      <path strokeLinecap="round" strokeLinejoin="round" d="M6 12l-3.75 6M10.5 10.5L6 12M13.5 4.5l-3 6M18 10.5l-4.5-6M18 10.5l3.75 6" />
                    </svg>
                  </div>

                  <p className="text-brand-gold text-[10px] tracking-[0.4em] uppercase font-bold mb-4">
                    Programme exclusif
                  </p>
                  <p className="font-serif text-2xl sm:text-5xl text-brand-cream font-bold leading-tight mb-4">
                    Devenez<br />
                    <span className="text-gradient-gold">Ambassadrice</span>
                  </p>
                  <div className="w-12 h-[1px] bg-brand-gold/40 mb-4" />
                  <p className="text-brand-cream/40 text-sm leading-relaxed max-w-xs">
                    Representez BelyzLash et profitez d&apos;avantages exclusifs reserves a notre communaute.
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Right: text + perks */}
          <div className={isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}>
            <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase mb-4 font-bold">
              Ambassadrices
            </p>
            <h2 className="font-serif text-3xl sm:text-6xl lg:text-7xl text-brand-green leading-tight font-bold mb-6">
              Rejoignez la <span className="text-gradient-gold">famille</span>
            </h2>
            <p className="text-brand-black/40 leading-relaxed mb-10 max-w-md">
              Vous etes passionnee par les extensions de cils et vous souhaitez partager votre expertise ? Notre programme ambassadrice vous offre des avantages uniques et une visibilite aupres de notre communaute.
            </p>

            {/* Perks */}
            <div className="space-y-4 mb-10">
              {perks.map((perk, i) => (
                <div
                  key={perk.title}
                  className={`flex items-start gap-4 p-4 rounded-2xl bg-brand-cream/40 border border-brand-beige/30 hover:border-brand-gold/20 hover:shadow-sm transition-all duration-500 ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-xl bg-brand-green/5 flex items-center justify-center text-brand-green flex-shrink-0">
                    {perk.icon}
                  </div>
                  <div>
                    <p className="text-brand-green font-semibold text-sm mb-0.5">{perk.title}</p>
                    <p className="text-brand-black/40 text-xs leading-relaxed">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/ambassadrice"
              className="group inline-flex items-center gap-3 bg-brand-green text-brand-cream px-8 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-semibold hover:shadow-[0_0_30px_rgba(31,58,52,0.25)] hover:scale-105 transition-all duration-500 relative overflow-hidden"
            >
              <span className="relative z-10 inline-flex items-center gap-3">
                En savoir plus
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
