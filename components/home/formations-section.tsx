"use client";

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
    <section ref={ref} id="formations" className="py-24 sm:py-32 bg-brand-green grain relative overflow-hidden">
      {/* Background orbs */}
      <div className="absolute inset-0">
        <div className="absolute -top-1/4 -right-1/4 w-[600px] h-[600px] rounded-full bg-brand-gold/5 blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
            <p className="text-brand-gold text-[11px] tracking-[0.4em] uppercase mb-4">
              Formations
            </p>
            <h2 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-brand-cream mb-6 leading-tight">
              BelyzLash<br />vous <span className="text-gradient-gold">forme</span>
            </h2>
            <p className="text-brand-cream/50 leading-relaxed mb-10 max-w-md">
              Nos formations vous accompagnent dans la maitrise des techniques d&apos;extension de cils, du classique au mega volume.
            </p>
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

          <div className={`grid grid-cols-2 gap-4 ${isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
            {techniques.map((t, i) => (
              <div
                key={t.title}
                className="glass rounded-2xl p-6 sm:p-8 group hover:bg-white/10 transition-all duration-500"
                style={i === 1 ? { transform: "translateY(20px)" } : i === 2 ? { transform: "translateY(-20px)" } : {}}
              >
                <div className="w-10 h-10 rounded-xl bg-brand-gold/10 flex items-center justify-center mb-4 group-hover:bg-brand-gold/20 transition-colors duration-500">
                  <svg className="w-5 h-5 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                  </svg>
                </div>
                <p className="text-brand-cream font-medium text-sm mb-1">{t.title}</p>
                <p className="text-brand-cream/40 text-xs">{t.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
