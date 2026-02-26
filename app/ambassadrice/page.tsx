"use client";

import Link from "next/link";
import Image from "next/image";
import { useScrollAnimation } from "@/lib/use-scroll-animation";
import { useState } from "react";

const benefits = [
  {
    number: "01",
    title: "Produits offerts",
    description:
      "Recevez nos nouveautes en avant-premiere pour les tester et partager votre experience avec votre communaute.",
    image: "/images/products/kit-volume.jpg",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M21 11.25v8.25a1.5 1.5 0 01-1.5 1.5H5.25a1.5 1.5 0 01-1.5-1.5v-8.25M12 4.875A2.625 2.625 0 109.375 7.5H12m0-2.625V7.5m0-2.625A2.625 2.625 0 1114.625 7.5H12m0 0V21m-8.625-9.75h18c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125h-18c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
      </svg>
    ),
  },
  {
    number: "02",
    title: "Remises exclusives",
    description:
      "Profitez de reductions allant jusqu'a 30% sur l'ensemble de notre catalogue, reservees exclusivement a nos ambassadrices.",
    image: "/images/products/cils-naturel.jpg",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.568 3H5.25A2.25 2.25 0 003 5.25v4.318c0 .597.237 1.17.659 1.591l9.581 9.581c.699.699 1.78.872 2.607.33a18.095 18.095 0 005.223-5.223c.542-.827.369-1.908-.33-2.607L11.16 3.66A2.25 2.25 0 009.568 3z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M6 6h.008v.008H6V6z" />
      </svg>
    ),
  },
  {
    number: "03",
    title: "Code promo personnel",
    description:
      "Obtenez un code promo unique a partager avec votre communaute et gagnez une commission sur chaque vente generee.",
    image: "/images/products/cils-glamour.jpg",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 18.75a60.07 60.07 0 0115.797 2.101c.727.198 1.453-.342 1.453-1.096V18.75M3.75 4.5v.75A.75.75 0 013 6h-.75m0 0v-.375c0-.621.504-1.125 1.125-1.125H20.25M2.25 6v9m18-10.5v.75c0 .414.336.75.75.75h.75m-1.5-1.5h.375c.621 0 1.125.504 1.125 1.125v9.75c0 .621-.504 1.125-1.125 1.125h-.375m1.5-1.5H21a.75.75 0 00-.75.75v.75m0 0H3.75m0 0h-.375a1.125 1.125 0 01-1.125-1.125V15m1.5 1.5v-.75A.75.75 0 003 15h-.75M15 10.5a3 3 0 11-6 0 3 3 0 016 0zm3 0h.008v.008H18V10.5zm-12 0h.008v.008H6V10.5z" />
      </svg>
    ),
  },
  {
    number: "04",
    title: "Communaute privee",
    description:
      "Rejoignez un groupe exclusif de passionnees pour echanger conseils, techniques et retours d'experience entre professionnelles.",
    image: "/images/products/colle-pro.jpg",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m.94 3.198l.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0112 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 016 18.719m12 0a5.971 5.971 0 00-.941-3.197m0 0A5.995 5.995 0 0012 12.75a5.995 5.995 0 00-5.058 2.772m0 0a3 3 0 00-4.681 2.72 8.986 8.986 0 003.74.477m.94-3.197a5.971 5.971 0 00-.94 3.197M15 6.75a3 3 0 11-6 0 3 3 0 016 0zm6 3a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0zm-13.5 0a2.25 2.25 0 11-4.5 0 2.25 2.25 0 014.5 0z" />
      </svg>
    ),
  },
  {
    number: "05",
    title: "Visibilite & repost",
    description:
      "Vos creations seront mises en avant sur nos reseaux sociaux et beneficierez d'une visibilite aupres de milliers de passionnees.",
    image: "/images/products/pince-volume.jpg",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.827 6.175A2.31 2.31 0 015.186 7.23c-.38.054-.757.112-1.134.175C2.999 7.58 2.25 8.507 2.25 9.574V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18V9.574c0-1.067-.75-1.994-1.802-2.169a47.865 47.865 0 00-1.134-.175 2.31 2.31 0 01-1.64-1.055l-.822-1.316a2.192 2.192 0 00-1.736-1.039 48.774 48.774 0 00-5.232 0 2.192 2.192 0 00-1.736 1.039l-.821 1.316z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M16.5 12.75a4.5 4.5 0 11-9 0 4.5 4.5 0 019 0zM18.75 10.5h.008v.008h-.008V10.5z" />
      </svg>
    ),
  },
  {
    number: "06",
    title: "Formations gratuites",
    description:
      "Acces prioritaire a nos formations et masterclasses pour perfectionner vos techniques et developper votre activite.",
    image: "/images/products/cils-optimal.jpg",
    icon: (
      <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.26 10.147a60.436 60.436 0 00-.491 6.347A48.627 48.627 0 0112 20.904a48.627 48.627 0 018.232-4.41 60.46 60.46 0 00-.491-6.347m-15.482 0a50.57 50.57 0 00-2.658-.813A59.905 59.905 0 0112 3.493a59.902 59.902 0 0110.399 5.84c-.896.248-1.783.52-2.658.814m-15.482 0A50.697 50.697 0 0112 13.489a50.702 50.702 0 017.74-3.342M6.75 15a.75.75 0 100-1.5.75.75 0 000 1.5zm0 0v-3.675A55.378 55.378 0 0112 8.443m-7.007 11.55A5.981 5.981 0 006.75 15.75v-1.5" />
      </svg>
    ),
  },
];

const steps = [
  {
    step: "1",
    title: "Postulez",
    description: "Remplissez le formulaire de candidature avec votre parcours et vos reseaux sociaux.",
  },
  {
    step: "2",
    title: "Echange",
    description: "Notre equipe vous contacte pour un echange personnalise et repond a toutes vos questions.",
  },
  {
    step: "3",
    title: "Bienvenue",
    description: "Vous recevez votre kit de bienvenue et votre code promo personnel. C'est parti !",
  },
];

const faqs = [
  {
    q: "Qui peut devenir ambassadrice ?",
    a: "Toute professionnelle ou passionnee des extensions de cils avec une presence active sur les reseaux sociaux (Instagram, TikTok, etc.) peut postuler.",
  },
  {
    q: "Combien de followers faut-il ?",
    a: "Il n'y a pas de minimum requis. Nous valorisons l'engagement et la qualite de votre contenu plutot que le nombre de followers.",
  },
  {
    q: "Le programme est-il gratuit ?",
    a: "Oui, le programme est entierement gratuit. Aucun achat minimum n'est requis pour devenir ambassadrice.",
  },
  {
    q: "Quelles sont les obligations ?",
    a: "Nous demandons un minimum de 2 publications par mois mentionnant BelyzLash sur vos reseaux sociaux.",
  },
];

export default function AmbassadricePage() {
  const { ref: heroRef, isVisible: heroVisible } = useScrollAnimation();
  const { ref: benefitsRef, isVisible: benefitsVisible } = useScrollAnimation();
  const { ref: stepsRef, isVisible: stepsVisible } = useScrollAnimation();
  const { ref: faqRef, isVisible: faqVisible } = useScrollAnimation();
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <main className="min-h-screen bg-brand-cream">
      {/* Hero */}
      <div className="bg-brand-green grain relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-1/3 -right-1/4 w-[600px] h-[600px] rounded-full bg-brand-gold/5 blur-[120px]" />
          <div className="absolute -bottom-1/4 -left-1/4 w-[400px] h-[400px] rounded-full bg-brand-cream/5 blur-[100px]" />
        </div>
        <div ref={heroRef} className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-28 sm:pt-36 pb-16 sm:pb-24 text-center">
          <div className={`flex items-center justify-center gap-4 mb-6 ${heroVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <div className="w-10 h-px bg-brand-gold" />
            <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase font-bold">
              Programme Ambassadrice
            </p>
            <div className="w-10 h-px bg-brand-gold" />
          </div>
          <h1 className={`font-serif text-5xl sm:text-6xl lg:text-8xl text-brand-cream leading-tight font-bold mb-6 ${heroVisible ? "animate-fade-in-up animation-delay-100" : "opacity-0"}`}>
            Devenez <span className="text-gradient-gold">Ambassadrice</span>
          </h1>
          <p className={`text-brand-cream/50 text-sm sm:text-base leading-relaxed max-w-xl mx-auto mb-10 ${heroVisible ? "animate-fade-in-up animation-delay-200" : "opacity-0"}`}>
            Rejoignez notre communaute de passionnees et representez BelyzLash. Partagez votre talent, inspirez d&apos;autres techniciennes et profitez d&apos;avantages exclusifs.
          </p>
          <div className={heroVisible ? "animate-fade-in-up animation-delay-300" : "opacity-0"}>
            <a
              href="mailto:lash.belyz@gmail.com?subject=Candidature%20Ambassadrice%20BelyzLash"
              className="group inline-flex items-center gap-3 bg-brand-gold text-brand-black px-10 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-semibold hover:shadow-[0_0_30px_rgba(198,168,107,0.3)] hover:scale-105 transition-all duration-500"
            >
              Postuler maintenant
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-6 bg-brand-cream rounded-t-[2rem]" />
      </div>

      {/* Benefits grid */}
      <section ref={benefitsRef} className="py-14 sm:py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-14 ${benefitsVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase mb-4 font-bold">
            Avantages
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl text-brand-green font-bold mb-4">
            Vos <span className="text-gradient-gold">privileges</span>
          </h2>
          <p className="text-brand-black/40 text-sm max-w-md mx-auto">
            En tant qu&apos;ambassadrice BelyzLash, vous beneficiez d&apos;avantages exclusifs
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {benefits.map((b, i) => (
            <div
              key={b.number}
              className={`group relative rounded-3xl overflow-hidden hover:-translate-y-1 transition-all duration-500 ${
                benefitsVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.1 + i * 0.08}s` }}
            >
              {/* Top image area */}
              <div className="relative h-52 sm:h-60 overflow-hidden">
                <Image
                  src={b.image}
                  alt={b.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                {/* Light overlay for depth */}
                <div className="absolute inset-0 bg-gradient-to-t from-brand-green via-brand-green/20 to-transparent" />

                {/* Number badge */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full w-10 h-10 flex items-center justify-center shadow-lg">
                  <span className="text-brand-green font-serif text-sm font-bold">{b.number}</span>
                </div>

                {/* Icon floating at bottom */}
                <div className="absolute bottom-4 left-6">
                  <div className="w-11 h-11 rounded-xl bg-white/90 backdrop-blur-sm flex items-center justify-center text-brand-green shadow-lg">
                    {b.icon}
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="relative bg-brand-green p-6 sm:p-8">
                <h3 className="font-serif text-xl text-brand-cream mb-2">{b.title}</h3>
                <p className="text-brand-cream/50 text-sm leading-relaxed">{b.description}</p>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-16 h-16 overflow-hidden">
                <div className="absolute top-0 left-0 w-[1px] h-10 bg-gradient-to-b from-brand-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-10 h-[1px] bg-gradient-to-r from-brand-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section ref={stepsRef} className="py-14 sm:py-20 bg-brand-green grain relative overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute -top-1/4 -left-1/4 w-[500px] h-[500px] rounded-full bg-brand-gold/5 blur-[120px]" />
        </div>

        <div className="relative z-10 max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className={`text-center mb-14 ${stepsVisible ? "animate-fade-in-up" : "opacity-0"}`}>
            <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase mb-4 font-bold">
              Comment ca marche
            </p>
            <h2 className="font-serif text-5xl sm:text-6xl text-brand-cream font-bold mb-4">
              3 etapes <span className="text-gradient-gold">simples</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {steps.map((s, i) => (
              <div
                key={s.step}
                className={`relative text-center ${stepsVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${0.2 + i * 0.15}s` }}
              >
                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-[60%] w-[80%] h-px bg-gradient-to-r from-brand-gold/30 to-transparent" />
                )}

                <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-brand-gold/10 flex items-center justify-center">
                  <span className="font-serif text-3xl text-brand-gold font-bold">{s.step}</span>
                </div>
                <h3 className="font-serif text-2xl text-brand-cream mb-3">{s.title}</h3>
                <p className="text-brand-cream/40 text-sm leading-relaxed max-w-xs mx-auto">
                  {s.description}
                </p>
              </div>
            ))}
          </div>

          {/* CTA */}
          <div className={`text-center mt-14 ${stepsVisible ? "animate-fade-in-up animation-delay-500" : "opacity-0"}`}>
            <a
              href="mailto:lash.belyz@gmail.com?subject=Candidature%20Ambassadrice%20BelyzLash"
              className="group inline-flex items-center gap-3 bg-brand-gold text-brand-black px-10 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-semibold hover:shadow-[0_0_30px_rgba(198,168,107,0.3)] hover:scale-105 transition-all duration-500"
            >
              Rejoindre le programme
              <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </a>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section ref={faqRef} className="py-14 sm:py-20 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className={`text-center mb-12 ${faqVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase mb-4 font-bold">
            FAQ
          </p>
          <h2 className="font-serif text-5xl sm:text-6xl text-brand-green font-bold">
            Questions <span className="text-gradient-gold">frequentes</span>
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, i) => {
            const isOpen = openFaq === i;
            return (
              <div
                key={i}
                className={`bg-white rounded-2xl border border-brand-beige/60 overflow-hidden transition-all duration-300 ${
                  isOpen ? "border-brand-gold/30 shadow-sm" : "hover:border-brand-beige"
                } ${faqVisible ? "animate-fade-in-up" : "opacity-0"}`}
                style={{ animationDelay: `${0.1 + i * 0.08}s` }}
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : i)}
                  className="flex items-center justify-between w-full px-6 py-5 text-left"
                >
                  <span className="text-brand-green font-semibold text-sm pr-4">{faq.q}</span>
                  <svg
                    className={`w-4 h-4 text-brand-gold flex-shrink-0 transition-transform duration-300 ${isOpen ? "rotate-180" : ""}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    strokeWidth={2}
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
                  </svg>
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${
                    isOpen ? "max-h-40 opacity-100" : "max-h-0 opacity-0"
                  }`}
                >
                  <p className="px-6 pb-5 text-brand-black/40 text-sm leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Final CTA banner */}
      <section className="py-14 sm:py-20 bg-white relative overflow-hidden">
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />
        <div className="absolute -top-20 right-1/3 w-64 h-64 rounded-full bg-brand-gold/5 blur-[100px]" />

        <div className="relative z-10 max-w-2xl mx-auto px-4 sm:px-6 text-center">
          <div className="w-16 h-16 mx-auto mb-6 rounded-full bg-brand-green/5 flex items-center justify-center">
            <svg className="w-7 h-7 text-brand-green" fill="none" viewBox="0 0 24 24" strokeWidth={1.2} stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.455 2.456L21.75 6l-1.036.259a3.375 3.375 0 00-2.455 2.456z" />
            </svg>
          </div>
          <h2 className="font-serif text-4xl sm:text-5xl text-brand-green font-bold mb-4">
            Prete a nous rejoindre ?
          </h2>
          <p className="text-brand-black/40 text-sm leading-relaxed mb-8 max-w-md mx-auto">
            Envoyez-nous votre candidature par email avec votre parcours et vos liens vers vos reseaux sociaux. Nous vous repondons sous 48h.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <a
              href="mailto:lash.belyz@gmail.com?subject=Candidature%20Ambassadrice%20BelyzLash"
              className="group inline-flex items-center gap-3 bg-brand-green text-brand-cream px-8 py-4 rounded-full text-xs tracking-[0.2em] uppercase font-semibold hover:shadow-[0_0_30px_rgba(31,58,52,0.25)] hover:scale-105 transition-all duration-500 relative overflow-hidden"
            >
              <span className="relative z-10 inline-flex items-center gap-3">
                Envoyer ma candidature
                <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700" />
            </a>
            <Link
              href="/shop"
              className="inline-flex items-center gap-2 text-brand-green text-xs tracking-[0.15em] uppercase font-bold hover:text-brand-gold transition-colors duration-300"
            >
              Decouvrir nos produits
              <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
