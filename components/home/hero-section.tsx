import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-screen min-h-[700px] bg-brand-green overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-1/4 -right-1/4 w-[800px] h-[800px] rounded-full border border-brand-gold/10 animate-float" />
        <div className="absolute -bottom-1/4 -left-1/4 w-[600px] h-[600px] rounded-full border border-brand-cream/5 animate-float animation-delay-400" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] rounded-full bg-brand-gold/5 blur-3xl" />
      </div>

      <div className="relative z-10 h-full flex flex-col items-center justify-center text-center text-brand-cream px-4">
        <p className="text-brand-gold text-sm tracking-[0.3em] uppercase mb-6 animate-fade-in">
          Produits professionnels pour extension de cils
        </p>
        <h1 className="font-serif text-6xl sm:text-8xl lg:text-9xl tracking-wide mb-4 animate-fade-in-up">
          Belyz<span className="text-brand-gold">Lash</span>
        </h1>
        <div className="w-24 h-px bg-brand-gold mx-auto mb-6 animate-fade-in animation-delay-200" />
        <p className="text-lg sm:text-xl tracking-wide mb-12 text-brand-cream/70 max-w-xl animate-fade-in-up animation-delay-200">
          Des produits sur-mesure pour sublimer chaque regard
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
          <Link
            href="/shop"
            className="group relative inline-flex items-center justify-center px-10 py-4 bg-brand-gold text-brand-black text-sm tracking-widest uppercase font-medium overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-brand-gold/20 hover:scale-105"
          >
            Notre Boutique
          </Link>
          <Link
            href="#formations"
            className="inline-flex items-center justify-center px-10 py-4 border border-brand-cream/30 text-sm tracking-widest uppercase hover:bg-brand-cream hover:text-brand-green transition-all duration-300"
          >
            Nos Formations
          </Link>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-float">
          <div className="w-6 h-10 border-2 border-brand-cream/30 rounded-full flex justify-center pt-2">
            <div className="w-1 h-2 bg-brand-cream/50 rounded-full" />
          </div>
        </div>
      </div>
    </section>
  );
}
