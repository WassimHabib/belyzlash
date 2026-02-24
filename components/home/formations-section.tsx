"use client";

import Link from "next/link";
import { useScrollAnimation } from "@/lib/use-scroll-animation";

export function FormationsSection() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} id="formations" className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <div className={isVisible ? "animate-fade-in-up" : "opacity-0"}>
          <p className="text-brand-gold text-sm tracking-[0.3em] uppercase mb-3">
            Formations
          </p>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-green mb-6">
            BelyzLash vous forme
          </h2>
          <div className="w-16 h-px bg-brand-gold mb-8" />
          <p className="text-brand-black/70 leading-relaxed mb-6">
            Besoin d&apos;un professionnel pour vous conseiller ? Nos formations vous accompagnent dans la maitrise des techniques d&apos;extension de cils, du classique au mega volume.
          </p>
          <ul className="space-y-3 mb-8">
            {["Technique classique cil a cil", "Volume russe 2D-6D", "Mega volume et techniques avancees", "Accompagnement personnalise"].map((item) => (
              <li key={item} className="flex items-center gap-3 text-brand-black/70">
                <svg className="w-5 h-5 text-brand-gold flex-shrink-0" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12.75l6 6 9-13.5" />
                </svg>
                {item}
              </li>
            ))}
          </ul>
          <Link
            href="mailto:lash.belyz@gmail.com"
            className="inline-flex items-center gap-2 bg-brand-green text-brand-cream px-8 py-4 text-sm tracking-widest uppercase hover:bg-brand-green/90 transition-all duration-300 hover:shadow-lg"
          >
            Contactez-nous
          </Link>
        </div>
        <div
          className={`aspect-square bg-brand-beige/50 border border-brand-beige flex items-center justify-center ${
            isVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"
          }`}
        >
          <div className="text-center p-8">
            <div className="text-brand-gold mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1} stroke="currentColor" className="w-20 h-20 mx-auto">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.438 60.438 0 00-.491 6.347A48.62 48.62 0 0112 20.904a48.62 48.62 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.636 50.636 0 00-2.658-.813A59.906 59.906 0 0112 3.493a59.903 59.903 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.717 50.717 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
              </svg>
            </div>
            <p className="font-serif text-2xl text-brand-green mb-2">Formez-vous</p>
            <p className="text-brand-black/50 text-sm">avec BelyzLash</p>
          </div>
        </div>
      </div>
    </section>
  );
}
