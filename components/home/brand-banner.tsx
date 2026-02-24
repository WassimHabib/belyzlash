"use client";

import { useScrollAnimation } from "@/lib/use-scroll-animation";

export function BrandBanner() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="bg-brand-beige/30 py-24">
      <div className="max-w-4xl mx-auto px-4 text-center">
        <div className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
          <p className="text-brand-gold text-sm tracking-[0.3em] uppercase mb-6">
            Notre Mission
          </p>
          <p className="font-serif text-3xl sm:text-4xl leading-relaxed text-brand-green mb-6">
            Offrir des produits sur-mesure de qualite professionnelle, accessibles a toutes les techniciennes passionnees.
          </p>
          <div className="w-16 h-px bg-brand-gold mx-auto mb-6" />
          <p className="text-brand-black/50 text-sm tracking-wide uppercase">
            Elysza, Fondatrice de BelyzLash
          </p>
        </div>
      </div>
    </section>
  );
}
