"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

export function HeroSection() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  return (
    <section className="relative h-screen min-h-[750px] bg-brand-green overflow-hidden grain">
      {/* Animated gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/3 -right-1/4 w-[900px] h-[900px] rounded-full bg-gradient-to-br from-brand-gold/10 to-transparent animate-pulse-glow" />
        <div className="absolute -bottom-1/3 -left-1/4 w-[700px] h-[700px] rounded-full bg-gradient-to-tr from-brand-cream/5 to-transparent animate-pulse-glow animation-delay-200" />
        <div className="absolute top-1/4 right-1/3 w-[300px] h-[300px] rounded-full bg-brand-gold/5 blur-[100px] animate-float" />

        {/* Rotating decorative ring */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] sm:w-[800px] sm:h-[800px] animate-rotate-slow">
          <div className="w-full h-full rounded-full border border-brand-gold/[0.07]" />
        </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] sm:w-[550px] sm:h-[550px] animate-rotate-slow" style={{ animationDirection: "reverse", animationDuration: "30s" }}>
          <div className="w-full h-full rounded-full border border-brand-cream/[0.05]" />
        </div>
      </div>

      <div className={`relative z-10 h-full flex flex-col items-center justify-center text-center text-brand-cream px-4 transition-all duration-1000 ${mounted ? "opacity-100" : "opacity-0"}`}>
        <p className={`text-brand-gold/90 text-[11px] sm:text-xs tracking-[0.4em] uppercase mb-8 transition-all duration-700 delay-300 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Produits professionnels pour extension de cils
        </p>

        <h1 className={`font-serif text-7xl sm:text-[120px] lg:text-[150px] tracking-wide leading-[0.85] mb-6 transition-all duration-1000 delay-100 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"}`}>
          <span className="block">Belyz</span>
          <span className="block text-gradient-gold">Lash</span>
        </h1>

        <div className={`w-20 h-[1px] bg-gradient-to-r from-transparent via-brand-gold to-transparent mx-auto mb-8 transition-all duration-700 delay-500 ${mounted ? "opacity-100 scale-x-100" : "opacity-0 scale-x-0"}`} />

        <p className={`text-base sm:text-lg tracking-[0.1em] mb-14 text-brand-cream/60 max-w-lg font-light transition-all duration-700 delay-500 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          Des produits sur-mesure pour sublimer chaque regard
        </p>

        <div className={`flex flex-col sm:flex-row gap-4 transition-all duration-700 delay-700 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}>
          <Link
            href="/shop"
            className="group relative inline-flex items-center justify-center px-10 py-4 rounded-full bg-brand-gold text-brand-black text-xs tracking-[0.2em] uppercase font-semibold overflow-hidden transition-all duration-500 hover:shadow-[0_0_30px_rgba(198,168,107,0.3)] hover:scale-105"
          >
            <span className="relative z-10">Notre Boutique</span>
            <div className="absolute inset-0 bg-gradient-to-r from-brand-gold via-[#E8D5A3] to-brand-gold bg-[length:200%_100%] opacity-0 group-hover:opacity-100 transition-opacity duration-500 animate-shimmer" />
          </Link>
          <Link
            href="#formations"
            className="inline-flex items-center justify-center px-10 py-4 rounded-full border border-brand-cream/20 text-xs tracking-[0.2em] uppercase hover:bg-brand-cream/10 hover:border-brand-cream/40 transition-all duration-500"
          >
            Nos Formations
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className={`absolute bottom-10 left-1/2 -translate-x-1/2 transition-all duration-700 delay-1000 ${mounted ? "opacity-100" : "opacity-0"}`}>
          <div className="flex flex-col items-center gap-2">
            <span className="text-[10px] tracking-[0.3em] uppercase text-brand-cream/30">Scroll</span>
            <div className="w-[1px] h-8 bg-gradient-to-b from-brand-cream/40 to-transparent animate-float" />
          </div>
        </div>
      </div>
    </section>
  );
}
