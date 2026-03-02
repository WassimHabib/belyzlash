"use client";

import Image from "next/image";
import { useScrollAnimation } from "@/lib/use-scroll-animation";

const testimonials = [
  {
    name: "Emma",
    text: "Les cils BelyzLash sont d'une qualite exceptionnelle. Mes clientes adorent le resultat naturel et la tenue est incroyable !",
    role: "Technicienne certifiee",
    image: "/images/testimonials/client-01.jpg",
    rating: 5,
  },
  {
    name: "Camille",
    text: "J'ai teste beaucoup de marques et BelyzLash est de loin la meilleure. Les eventails se font tout seuls avec ces cils, un vrai bonheur.",
    role: "Formatrice extensions",
    image: "/images/testimonials/client-02.jpg",
    rating: 5,
  },
  {
    name: "Sarah",
    text: "La colle est parfaite, sechage rapide et zero irritation. Mes poses tiennent 5 a 6 semaines sans probleme. Je recommande a 100% !",
    role: "Lash Artist",
    image: "/images/testimonials/client-03.jpg",
    rating: 5,
  },
];

function StarRating({ count }: { count: number }) {
  return (
    <div className="flex gap-0.5">
      {[...Array(count)].map((_, j) => (
        <svg key={j} className="w-4 h-4 text-brand-gold fill-current" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export function Testimonials() {
  const { ref, isVisible } = useScrollAnimation();

  return (
    <section ref={ref} className="relative py-14 sm:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-white" />
      <div className="absolute top-0 left-0 right-0 h-20 bg-gradient-to-b from-[#EDF4F0] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-20 bg-gradient-to-t from-[#EDF4F0] to-transparent" />
      <div className="absolute -top-20 left-1/4 w-80 h-80 rounded-full bg-brand-gold/[0.03] blur-[100px]" />
      <div className="absolute -bottom-20 right-1/4 w-80 h-80 rounded-full bg-brand-green/[0.03] blur-[100px]" />

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className={`text-center mb-12 ${isVisible ? "animate-fade-in-up" : "opacity-0"}`}>
          <p className="text-brand-gold text-xs sm:text-sm tracking-[0.4em] uppercase mb-4 font-bold">
            Temoignages
          </p>
          <h2 className="font-serif text-3xl sm:text-6xl lg:text-7xl text-brand-green mb-4 font-bold">
            Elles nous font <span className="text-gradient-gold">confiance</span>
          </h2>
          <p className="text-brand-black/40 text-sm max-w-md mx-auto">
            Decouvrez pourquoi les professionnelles choisissent BelyzLash
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {testimonials.map((t, i) => (
            <div
              key={t.name}
              className={`group relative bg-white rounded-3xl border border-brand-beige/60 overflow-hidden hover:border-brand-gold/30 hover:shadow-[0_20px_60px_-12px_rgba(198,168,107,0.15)] hover:-translate-y-2 transition-all duration-500 ${
                isVisible ? "animate-fade-in-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${0.2 + i * 0.12}s` }}
            >
              {/* Top image */}
              <div className="relative h-48 overflow-hidden">
                <Image
                  src={t.image}
                  alt={t.name}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-white via-white/20 to-transparent" />

                {/* Rating floating */}
                <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm rounded-full px-3 py-1.5 shadow-lg">
                  <div className="flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-brand-gold fill-current" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                    <span className="text-brand-green text-[11px] font-bold">5.0</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-7 sm:p-8">
                {/* Stars */}
                <div className="mb-5">
                  <StarRating count={t.rating} />
                </div>

                {/* Quote */}
                <div className="relative mb-8">
                  <svg className="absolute -top-1 -left-1 w-8 h-8 text-brand-gold/10" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10H14.017zM0 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151C7.546 6.068 5.983 8.789 5.983 11h4v10H0z" />
                  </svg>
                  <p className="relative text-brand-black/60 leading-relaxed text-[15px]">
                    &ldquo;{t.text}&rdquo;
                  </p>
                </div>

                {/* Divider */}
                <div className="w-full h-px bg-gradient-to-r from-brand-gold/20 via-brand-beige/40 to-transparent mb-6" />

                {/* Author */}
                <div className="flex items-center gap-4">
                  <div className="relative w-12 h-12 rounded-full overflow-hidden ring-2 ring-brand-gold/20 ring-offset-2 ring-offset-white flex-shrink-0">
                    <Image
                      src={t.image}
                      alt={t.name}
                      fill
                      className="object-cover"
                    />
                  </div>
                  <div>
                    <p className="text-brand-green font-semibold text-sm">{t.name}</p>
                    <p className="text-brand-gold text-[11px] tracking-[0.15em] uppercase">{t.role}</p>
                  </div>
                </div>
              </div>

              {/* Corner accent */}
              <div className="absolute top-0 left-0 w-20 h-20 overflow-hidden">
                <div className="absolute top-0 left-0 w-[1px] h-12 bg-gradient-to-b from-brand-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                <div className="absolute top-0 left-0 w-12 h-[1px] bg-gradient-to-r from-brand-gold/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
