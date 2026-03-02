"use client";

import { useScrollAnimation } from "@/lib/use-scroll-animation";
import { useEffect, useState } from "react";

function AnimatedNumber({ target, suffix = "", duration = 2000 }: { target: number; suffix?: string; duration?: number }) {
  const [count, setCount] = useState(0);
  const { ref, isVisible } = useScrollAnimation();

  useEffect(() => {
    if (!isVisible) return;
    const start = Date.now();
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * target));
      if (progress >= 1) clearInterval(timer);
    }, 16);
    return () => clearInterval(timer);
  }, [isVisible, target, duration]);

  return <span ref={ref}>{count}{suffix}</span>;
}

const stats = [
  {
    value: 2500, suffix: "+", label: "Clientes satisfaites",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12z" />
      </svg>
    ),
  },
  {
    value: 98, suffix: "%", label: "Taux de satisfaction",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
      </svg>
    ),
  },
  {
    value: 6, suffix: " sem", label: "Tenue moyenne",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
  {
    value: 150, suffix: "+", label: "Produits disponibles",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5M10 11.25h4M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
];

export function StatsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-16 sm:py-20 bg-white overflow-hidden">
      {/* Subtle background pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #1B3D2F 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {stats.map((stat, i) => (
            <div
              key={stat.label}
              className={`group relative text-center p-6 sm:p-8 rounded-2xl bg-brand-green/[0.03] border border-brand-green/[0.06] hover:bg-brand-green hover:border-brand-green transition-all duration-500 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${i * 0.1}s` }}
            >
              {/* Icon */}
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-brand-gold/10 text-brand-gold mb-4 group-hover:bg-brand-gold/20 transition-colors duration-500">
                {stat.icon}
              </div>

              {/* Number */}
              <p className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-green group-hover:text-brand-cream font-bold mb-1 transition-colors duration-500">
                <AnimatedNumber target={stat.value} suffix={stat.suffix} />
              </p>

              {/* Label */}
              <p className="text-[10px] sm:text-[11px] tracking-[0.2em] uppercase text-brand-green/40 group-hover:text-brand-cream/50 transition-colors duration-500">
                {stat.label}
              </p>

              {/* Decorative corner accent */}
              <div className="absolute top-3 right-3 w-6 h-6 border-t border-r border-brand-gold/0 group-hover:border-brand-gold/30 rounded-tr-lg transition-all duration-500" />
              <div className="absolute bottom-3 left-3 w-6 h-6 border-b border-l border-brand-gold/0 group-hover:border-brand-gold/30 rounded-bl-lg transition-all duration-500" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
