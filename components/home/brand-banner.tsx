"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/lib/use-scroll-animation";

const values = [
  {
    number: "01",
    title: "Qualite professionnelle",
    description:
      "Des produits rigoureusement selectionnes et testes pour garantir un resultat impeccable a chaque pose.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Accessibilite",
    description:
      "Rendre l'excellence accessible a toutes les techniciennes, quel que soit leur niveau d'experience.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Accompagnement",
    description:
      "Un suivi personnalise et des formations pour vous aider a developper votre expertise et votre activite.",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
];

const stats = [
  { value: "500+", label: "Techniciennes formees" },
  { value: "100%", label: "Produits testes" },
  { value: "4.9", label: "Note moyenne" },
];

export function BrandBanner() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-16 sm:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#EDF4F0] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#EDF4F0] to-transparent" />
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
      <div className="absolute top-20 -left-32 w-64 h-64 rounded-full bg-brand-gold/5 blur-[100px]" />
      <div className="absolute bottom-20 -right-32 w-64 h-64 rounded-full bg-brand-green/5 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-14 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase mb-6 font-bold">
            Notre Mission
          </p>
          <h2 className="font-serif text-3xl sm:text-6xl lg:text-7xl text-brand-green leading-tight max-w-3xl mx-auto mb-8 font-bold">
            L&apos;excellence au service de votre <span className="text-gradient-gold">passion</span>
          </h2>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto" />
        </div>

        {/* Main content: quote + image */}
        <div className={`grid grid-cols-1 lg:grid-cols-5 gap-12 lg:gap-16 items-center mb-16 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
          {/* Quote side */}
          <div className="lg:col-span-3">
            <div className="relative pl-8 border-l-2 border-brand-gold/30">
              <svg className="absolute -top-2 -left-4 w-8 h-8 text-brand-gold/20" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
              </svg>
              <p className="font-serif text-2xl sm:text-3xl lg:text-4xl text-brand-green leading-relaxed mb-6">
                Offrir des produits sur-mesure de qualite professionnelle, accessibles a toutes les techniciennes passionnees.
              </p>
              <div className="flex items-center gap-4">
                <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-gold/30 ring-offset-2 ring-offset-brand-cream">
                  <Image
                    src="/images/products/cils-optimal.jpg"
                    alt="Elysza - Fondatrice"
                    fill
                    className="object-cover"
                  />
                </div>
                <div>
                  <p className="text-brand-green font-semibold text-sm">Elysza</p>
                  <p className="text-brand-black/40 text-xs tracking-[0.15em] uppercase">
                    Fondatrice de BelyzLash
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* Stats side */}
          <div className="lg:col-span-2">
            <div className="grid grid-cols-1 gap-6">
              {stats.map((stat, i) => (
                <div
                  key={stat.label}
                  className={`relative p-6 rounded-2xl bg-white/60 border border-brand-gold/10 group hover:border-brand-gold/30 hover:shadow-lg transition-all duration-500 ${
                    isVisible ? `animate-fade-in-up animation-delay-${(i + 3) * 100}` : "opacity-0"
                  }`}
                >
                  <div className="flex items-center gap-5">
                    <p className="font-serif text-2xl sm:text-5xl text-gradient-gold font-bold">
                      {stat.value}
                    </p>
                    <div className="w-px h-10 bg-brand-gold/20" />
                    <p className="text-brand-green/60 text-sm leading-tight">
                      {stat.label}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {values.map((v, i) => (
            <div
              key={v.number}
              className={`group relative p-8 sm:p-10 rounded-3xl bg-brand-green grain overflow-hidden transition-all duration-500 hover:shadow-2xl hover:-translate-y-1 ${
                isVisible ? `animate-fade-in-up animation-delay-${(i + 4) * 100}` : "opacity-0"
              }`}
            >
              {/* Hover glow */}
              <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-brand-gold/0 group-hover:bg-brand-gold/10 blur-[60px] transition-all duration-700" />

              <div className="relative z-10">
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-brand-gold/10 flex items-center justify-center text-brand-gold group-hover:bg-brand-gold/20 transition-colors duration-500">
                    {v.icon}
                  </div>
                  <span className="text-brand-cream/10 font-serif text-5xl font-bold group-hover:text-brand-cream/20 transition-colors duration-500">
                    {v.number}
                  </span>
                </div>
                <h3 className="font-serif text-xl sm:text-2xl text-brand-cream mb-3">
                  {v.title}
                </h3>
                <p className="text-brand-cream/50 text-sm leading-relaxed">
                  {v.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
