"use client";

import Image from "next/image";
import Link from "next/link";
import { useScrollAnimation } from "@/lib/use-scroll-animation";

const formations = [
  {
    title: "Classique",
    desc: "Technique cil a cil pour un regard naturel et elegant",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    title: "Volume Russe",
    desc: "Bouquets 2D a 6D pour un effet dense et glamour",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z" />
      </svg>
    ),
  },
  {
    title: "Mega Volume",
    desc: "Techniques avancees pour un rendu spectaculaire",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.362 5.214A8.252 8.252 0 0112 21 8.25 8.25 0 016.038 7.048 8.287 8.287 0 009 9.6a8.983 8.983 0 013.361-6.867 8.21 8.21 0 003 2.48z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 18a3.75 3.75 0 00.495-7.467 5.99 5.99 0 00-1.925 3.546 5.974 5.974 0 01-2.133-1.001A3.75 3.75 0 0012 18z" />
      </svg>
    ),
  },
  {
    title: "Suivi Pro",
    desc: "Accompagnement personnalise apres formation",
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
];

export function FormationsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} id="formations" className="py-14 sm:py-20 bg-white relative overflow-hidden">
      {/* Subtle dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: "radial-gradient(circle at 1px 1px, #1B3D2F 1px, transparent 0)", backgroundSize: "32px 32px" }} />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-10 sm:mb-14 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase mb-3 font-bold">
            Formations
          </p>
          <h2 className="font-serif text-3xl sm:text-4xl lg:text-5xl text-brand-green leading-tight font-bold mb-4">
            BelyzLash vous <span className="text-brand-gold">forme</span>
          </h2>
          <p className="text-brand-black/50 leading-relaxed max-w-lg mx-auto text-sm sm:text-base">
            Nos formations vous accompagnent dans la maitrise des techniques d&apos;extension de cils, du classique au mega volume.
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-5 mb-10 sm:mb-14">
          {formations.map((f, i) => (
            <div
              key={f.title}
              className={`group relative p-5 sm:p-6 rounded-2xl bg-brand-green/[0.03] border border-brand-green/[0.06] hover:bg-brand-green hover:border-brand-green transition-all duration-500 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}
              style={{ animationDelay: `${0.1 + i * 0.1}s` }}
            >
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-brand-gold/10 text-brand-gold flex items-center justify-center mb-4 group-hover:bg-brand-gold/20 transition-colors duration-500">
                {f.icon}
              </div>
              <h3 className="font-serif text-base sm:text-lg text-brand-green font-bold mb-1 group-hover:text-brand-cream transition-colors duration-500">
                {f.title}
              </h3>
              <p className="text-brand-black/40 text-xs sm:text-sm leading-relaxed group-hover:text-brand-cream/60 transition-colors duration-500">
                {f.desc}
              </p>

              {/* Corner accents on hover */}
              <div className="absolute top-3 right-3 w-5 h-5 border-t border-r border-brand-gold/0 group-hover:border-brand-gold/30 rounded-tr-lg transition-all duration-500" />
              <div className="absolute bottom-3 left-3 w-5 h-5 border-b border-l border-brand-gold/0 group-hover:border-brand-gold/30 rounded-bl-lg transition-all duration-500" />
            </div>
          ))}
        </div>

        {/* Bottom: image + CTA */}
        <div className={`flex flex-col sm:flex-row items-center gap-6 sm:gap-10 ${isVisible ? "animate-fade-in-up animation-delay-500" : "opacity-0"}`}>
          <div className="relative w-full sm:w-80 aspect-[16/9] rounded-2xl overflow-hidden flex-shrink-0">
            <Image
              src="/images/products/cils-optimal.jpg"
              alt="Formation BelyzLash"
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, 320px"
            />
            <div className="absolute inset-0 bg-brand-green/30" />
            <div className="absolute bottom-4 left-4">
              <p className="text-brand-gold text-[10px] tracking-[0.3em] uppercase font-bold">Certification</p>
              <p className="text-brand-cream font-serif text-lg">Incluse</p>
            </div>
          </div>
          <div className="text-center sm:text-left">
            <p className="text-brand-black/50 text-sm leading-relaxed mb-5 max-w-md">
              Formation en presentiel avec pratique sur modele. Certificat delivre a l&apos;issue de la formation. Kits de depart inclus.
            </p>
            <Link
              href="mailto:lash.belyz@gmail.com"
              className="group inline-flex items-center gap-3 bg-brand-green text-brand-cream px-8 py-4 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-[0_0_30px_rgba(31,58,52,0.25)] hover:scale-105 transition-all duration-500"
            >
              Contactez-nous
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
