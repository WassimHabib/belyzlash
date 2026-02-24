"use client";

import { useScrollAnimation } from "@/lib/use-scroll-animation";

const testimonials = [
  {
    name: "Emma",
    text: "Les cils BelyzLash sont d'une qualite exceptionnelle. Mes clientes adorent le resultat naturel et la tenue est incroyable !",
    role: "Technicienne certifiee",
  },
  {
    name: "Camille",
    text: "J'ai teste beaucoup de marques et BelyzLash est de loin la meilleure. Les eventails se font tout seuls avec ces cils, un vrai bonheur.",
    role: "Formatrice extensions",
  },
  {
    name: "Sarah",
    text: "La colle est parfaite, sechage rapide et zero irritation. Mes poses tiennent 5 a 6 semaines sans probleme. Je recommande a 100% !",
    role: "Lash Artist",
  },
];

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="bg-brand-green py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
          <p className="text-brand-gold text-sm tracking-[0.3em] uppercase text-center mb-3">
            Temoignages
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-center mb-4 text-brand-cream">
            Nos Clientes Temoignent
          </h2>
          <div className="w-16 h-px bg-brand-gold mx-auto mb-16" />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`bg-brand-cream/5 backdrop-blur border border-brand-cream/10 p-8 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.3 + i * 0.15}s` }}
            >
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, j) => (
                  <svg key={j} className="w-4 h-4 text-brand-gold fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-brand-cream/80 leading-relaxed mb-6 italic">
                &ldquo;{t.text}&rdquo;
              </p>
              <div>
                <p className="text-brand-cream font-medium">{t.name}</p>
                <p className="text-brand-gold text-sm">{t.role}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
