"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollAnimation } from "@/lib/use-scroll-animation";

const techniques = [
  { title: "Technique classique", desc: "Cil a cil" },
  { title: "Volume russe", desc: "2D - 6D" },
  { title: "Mega volume", desc: "Techniques avancees" },
  { title: "Accompagnement", desc: "Suivi personnalise" },
];

export function FormationsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} id="formations" className="py-14 sm:py-20 bg-brand-green grain relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-brand-gold/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
            <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase mb-4 font-bold">
              Formations
            </p>
            <h2 className="font-serif text-5xl sm:text-6xl lg:text-7xl text-brand-cream mb-6 leading-tight font-bold">
              BelyzLash<br />vous <span className="text-gradient-gold">forme</span>
            </h2>
            <p className="text-brand-cream/50 leading-relaxed mb-8 max-w-md">
              Nos formations vous accompagnent dans la maitrise des techniques d&apos;extension de cils, du classique au mega volume.
            </p>
            <div className="grid grid-cols-2 gap-3 mb-10">
              {techniques.map((t) => (
                <div key={t.title} className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-brand-gold flex-shrink-0" />
                  <span className="text-brand-cream/70 text-sm">{t.title}</span>
                </div>
              ))}
            </div>
            <Link
              href="mailto:lash.belyz@gmail.com"
              className="inline-flex items-center gap-3 bg-brand-gold text-brand-black px-8 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-semibold hover:shadow-[0_0_30px_rgba(198,168,107,0.3)] hover:scale-105 transition-all duration-500"
            >
              Contactez-nous
              <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>

          <div className={`relative ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
            <div className="relative aspect-[3/4] max-w-md mx-auto">
              {/* Decorative border */}
              <div className="absolute -inset-3 rounded-3xl border border-brand-gold/20" />
              <div className="absolute -inset-6 rounded-3xl border border-brand-gold/10" />
              {/* Image */}
              <div className="relative h-full w-full rounded-2xl overflow-hidden">
                <Image
                  src="/images/products/cils-optimal.jpg"
                  alt="Fondatrice de BelyzLash"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {/* Gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green/80 via-transparent to-transparent" />
              </div>
              {/* Caption */}
              <div className="absolute bottom-6 left-6 right-6">
                <p className="text-brand-gold text-[10px] tracking-[0.3em] uppercase mb-1">Fondatrice</p>
                <p className="text-brand-cream font-serif text-xl">BelyzLash</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
