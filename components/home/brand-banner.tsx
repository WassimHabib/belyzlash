"use client";

import { useScrollAnimation } from "@/lib/use-scroll-animation";

export function BrandBanner() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-28 sm:py-36 overflow-hidden">
      {/* Background split */}
      <div className="absolute inset-0 bg-gradient-to-b from-brand-cream via-brand-beige/20 to-brand-cream" />

      <div className="relative z-10 max-w-4xl mx-auto px-4 text-center">
        <div className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
          <p className="text-brand-gold text-[11px] tracking-[0.4em] uppercase mb-8">
            Notre Mission
          </p>
          <p className="font-serif text-3xl sm:text-4xl lg:text-5xl leading-snug text-brand-green mb-8">
            Offrir des produits sur-mesure de qualite professionnelle, accessibles a toutes les techniciennes passionnees.
          </p>
          <div className="w-20 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-6" />
          <p className="text-brand-black/40 text-xs tracking-[0.2em] uppercase">
            Elysza &mdash; Fondatrice de BelyzLash
          </p>
        </div>
      </div>
    </section>
  );
}
