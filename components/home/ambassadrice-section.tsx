"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollAnimation } from "@/lib/use-scroll-animation";

const images = [
  "/images/products/cils-glamour.jpg",
  "/images/products/kit-volume.jpg",
  "/images/products/colle-pro.jpg",
  "/images/products/cils-naturel.jpg",
];

const perks = [
  { title: "Produits offerts", desc: "Recevez nos nouveautes en avant-premiere" },
  { title: "Remises exclusives", desc: "Jusqu'a 30% sur toute la boutique" },
  { title: "Communaute privee", desc: "Rejoignez un reseau de passionnees" },
];

export function AmbassadriceSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-14 sm:py-24 overflow-hidden bg-brand-green">
      {/* Grain */}
      <div className="absolute inset-0 grain" />

      {/* Decorative */}
      <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-brand-gold/5 blur-[120px]" />
      <div className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full bg-brand-cream/5 blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
          {/* Left: Image mosaic */}
          <div className={`relative ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="grid grid-cols-2 gap-3 sm:gap-4">
              {images.map((src, i) => (
                <div
                  key={i}
                  className={`relative overflow-hidden rounded-2xl ${
                    i === 0 ? "aspect-[3/4]" : i === 1 ? "aspect-square mt-8" : i === 2 ? "aspect-square -mt-8" : "aspect-[3/4]"
                  }`}
                >
                  <Image
                    src={src}
                    alt="BelyzLash produit"
                    fill
                    className="object-cover hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 1024px) 45vw, 250px"
                  />
                  <div className="absolute inset-0 bg-brand-green/10" />
                </div>
              ))}
            </div>

            {/* Floating badge */}
            <div className={`absolute -bottom-4 -right-2 sm:bottom-4 sm:right-4 bg-white rounded-2xl px-5 py-3 shadow-xl ${isVisible ? "animate-fade-in-scale animation-delay-500" : "opacity-0"}`}>
              <p className="text-brand-green font-serif font-bold text-sm">+200</p>
              <p className="text-brand-black/40 text-[10px] tracking-wide">Ambassadrices</p>
            </div>
          </div>

          {/* Right: Content */}
          <div className={isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}>
            <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase mb-4 font-bold">
              Programme exclusif
            </p>
            <h2 className="font-serif text-3xl sm:text-5xl lg:text-6xl text-brand-cream leading-tight font-bold mb-6">
              Devenez <span className="text-gradient-gold">Ambassadrice</span>
            </h2>
            <p className="text-brand-cream/50 leading-relaxed mb-8 max-w-md text-sm sm:text-base">
              Vous etes passionnee par les extensions de cils ? Rejoignez notre programme ambassadrice et profitez d&apos;avantages exclusifs.
            </p>

            {/* Perks */}
            <div className="space-y-3 mb-10">
              {perks.map((perk, i) => (
                <div
                  key={perk.title}
                  className={`flex items-center gap-4 p-4 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm ${
                    isVisible ? "animate-fade-in-up" : "opacity-0"
                  }`}
                  style={{ animationDelay: `${0.3 + i * 0.1}s` }}
                >
                  <div className="w-10 h-10 rounded-full bg-brand-gold/10 flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-brand-cream font-semibold text-sm">{perk.title}</p>
                    <p className="text-brand-cream/40 text-xs">{perk.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA */}
            <Link
              href="/ambassadrice"
              className="group inline-flex items-center gap-3 bg-brand-gold text-brand-black px-8 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-[0_0_40px_rgba(150,201,173,0.3)] hover:scale-105 transition-all duration-500"
            >
              Rejoindre le programme
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
