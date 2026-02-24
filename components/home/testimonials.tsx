"use client";

import { useScrollAnimation } from "@/lib/use-scroll-animation";

const testimonials = [
  {
    name: "Emma",
    text: "Les cils BelyzLash sont d'une qualite exceptionnelle. Mes clientes adorent le resultat naturel et la tenue est incroyable !",
    role: "Technicienne certifiee",
    initials: "E",
  },
  {
    name: "Camille",
    text: "J'ai teste beaucoup de marques et BelyzLash est de loin la meilleure. Les eventails se font tout seuls avec ces cils, un vrai bonheur.",
    role: "Formatrice extensions",
    initials: "C",
  },
  {
    name: "Sarah",
    text: "La colle est parfaite, sechage rapide et zero irritation. Mes poses tiennent 5 a 6 semaines sans probleme. Je recommande a 100% !",
    role: "Lash Artist",
    initials: "S",
  },
];

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="py-24 sm:py-32 bg-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
          <p className="text-brand-gold text-[11px] tracking-[0.4em] uppercase text-center mb-4">
            Temoignages
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-center mb-4 text-brand-green">
            Nos Clientes <span className="text-gradient-gold">Temoignent</span>
          </h2>
          <p className="text-center text-brand-black/40 text-sm max-w-md mx-auto mb-16">
            Decouvrez pourquoi les professionnelles choisissent BelyzLash
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`group relative bg-white rounded-3xl p-8 sm:p-10 card-hover ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.2 + i * 0.12}s` }}
            >
              {/* Big quote mark */}
              <div className="absolute top-6 right-8 font-serif text-7xl text-brand-beige/60 leading-none select-none">&ldquo;</div>

              <div className="relative">
                <div className="flex gap-1 mb-6">
                  {[...Array(5)].map((_, j) => (
                    <svg key={j} className="w-4 h-4 text-brand-gold fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <p className="text-brand-black/70 leading-relaxed mb-8 text-[15px]">
                  {t.text}
                </p>
                <div className="flex items-center gap-4">
                  <div className="w-11 h-11 rounded-full bg-brand-green flex items-center justify-center text-brand-cream text-sm font-semibold">
                    {t.initials}
                  </div>
                  <div>
                    <p className="text-brand-black font-medium text-sm">{t.name}</p>
                    <p className="text-brand-gold text-xs tracking-wide">{t.role}</p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
