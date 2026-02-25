"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative h-screen min-h-[700px] max-h-[1100px] bg-brand-green overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-banner.jpg"
          alt="BelyzLash"
          fill
          className={`object-cover transition-all duration-[2s] ease-out ${
            mounted ? "scale-100 opacity-100" : "scale-110 opacity-0"
          }`}
          priority
          sizes="100vw"
        />
        {/* Overlays */}
        <div className="absolute inset-0 bg-brand-green/60" />
        <div className="absolute inset-0 bg-gradient-to-b from-brand-green/80 via-transparent to-brand-green/90" />
        <div className="absolute inset-0 bg-gradient-to-r from-brand-green/70 via-transparent to-transparent" />
      </div>

      {/* Grain texture */}
      <div className="absolute inset-0 grain" />

      {/* Animated orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full bg-gradient-to-br from-brand-gold/8 to-transparent animate-pulse-glow" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full bg-gradient-to-tr from-brand-cream/5 to-transparent animate-pulse-glow animation-delay-200" />
      </div>

      {/* Decorative rings */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] sm:w-[700px] sm:h-[700px] animate-rotate-slow">
          <div className="w-full h-full rounded-full border border-brand-gold/[0.06]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] h-[350px] sm:w-[500px] sm:h-[500px] animate-rotate-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }}>
          <div className="w-full h-full rounded-full border border-brand-cream/[0.04]" />
        </div>
      </div>

      {/* Side decorative line */}
      <div className={`absolute left-8 sm:left-12 top-1/3 bottom-1/3 w-px transition-all duration-1000 delay-700 ${mounted ? "opacity-100" : "opacity-0"}`}>
        <div className="w-full h-full bg-gradient-to-b from-transparent via-brand-gold/30 to-transparent" />
      </div>

      {/* Content */}
      <div className="relative z-10 h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
        <div className="max-w-3xl">
          {/* Tagline */}
          <div className={`flex items-center gap-4 mb-8 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <div className="w-10 h-px bg-brand-gold" />
            <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase font-bold">
              Produits professionnels pour extension de cils
            </p>
          </div>

          {/* Title */}
          <h1 className={`font-serif leading-[0.9] mb-8 transition-all duration-1000 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
            <span className="block text-brand-cream text-6xl sm:text-8xl lg:text-9xl tracking-wide">
              Belyz
            </span>
            <span className="block text-gradient-gold text-7xl sm:text-[110px] lg:text-[140px] tracking-wide -mt-1">
              Lash
            </span>
          </h1>

          {/* Divider */}
          <div className={`w-24 h-px bg-gradient-to-r from-brand-gold via-brand-gold/50 to-transparent mb-8 transition-all duration-700 delay-500 origin-left ${mounted ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`} />

          {/* Description */}
          <p className={`text-lg sm:text-xl tracking-wide text-brand-cream/60 max-w-lg font-light leading-relaxed mb-12 transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            Des produits sur-mesure de qualite professionnelle pour <span className="text-brand-cream/80">sublimer chaque regard</span>
          </p>

          {/* CTAs */}
          <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-6"}`}>
            <Link
              href="/shop"
              className="group relative inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full bg-brand-gold text-brand-black text-[11px] tracking-[0.2em] uppercase font-bold overflow-hidden transition-all duration-500 hover:shadow-[0_0_40px_rgba(198,168,107,0.35)] hover:scale-105"
            >
              <span className="relative z-10">Notre Boutique</span>
              <svg className="relative z-10 w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
              <div className="absolute inset-0 bg-gradient-to-r from-brand-gold via-[#E8D5A3] to-brand-gold bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
            </Link>
            <Link
              href="#formations"
              className="group inline-flex items-center justify-center gap-3 px-10 py-4 rounded-full border border-brand-cream/20 text-[11px] tracking-[0.2em] uppercase text-brand-cream hover:bg-white/[0.06] hover:border-brand-cream/40 transition-all duration-500"
            >
              Nos Formations
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>

        {/* Right side floating card */}
        <div className={`hidden lg:block absolute right-8 xl:right-16 bottom-32 transition-all duration-1000 delay-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}>
          <div className="relative w-64 rounded-3xl overflow-hidden border border-white/10 bg-white/[0.05] backdrop-blur-md p-5">
            <div className="flex items-center gap-4 mb-4">
              <div className="w-12 h-12 rounded-2xl overflow-hidden relative">
                <Image
                  src="/images/products/cils-glamour.jpg"
                  alt="Produit"
                  fill
                  className="object-cover"
                />
              </div>
              <div>
                <p className="text-brand-cream text-sm font-medium">Best-seller</p>
                <p className="text-brand-cream/40 text-[11px]">Cils Glamour</p>
              </div>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3 h-3 text-brand-gold fill-current" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <span className="text-brand-gold font-bold text-sm">4.9/5</span>
            </div>
            {/* Decorative glow */}
            <div className="absolute -top-10 -right-10 w-24 h-24 rounded-full bg-brand-gold/10 blur-[40px]" />
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className={`absolute bottom-8 left-1/2 -translate-x-1/2 z-10 transition-all duration-700 delay-[1200ms] ${mounted ? "opacity-100" : "opacity-0"}`}>
        <div className="flex flex-col items-center gap-3">
          <span className="text-[10px] tracking-[0.3em] uppercase text-brand-cream/30">Decouvrir</span>
          <div className="w-5 h-9 rounded-full border border-brand-cream/20 flex justify-center pt-2">
            <div className="w-0.5 h-2 rounded-full bg-brand-gold animate-float" />
          </div>
        </div>
      </div>

      {/* Bottom gradient transition */}
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-brand-green to-transparent" />
    </section>
  );
}
