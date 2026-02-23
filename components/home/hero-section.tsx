import Link from "next/link";

export function HeroSection() {
  return (
    <section className="relative h-[80vh] min-h-[600px] bg-brand-green flex items-center justify-center">
      <div className="text-center text-brand-cream px-4">
        <h1 className="font-serif text-5xl sm:text-7xl lg:text-8xl tracking-wide mb-6">
          belyzlash
        </h1>
        <p className="text-lg sm:text-xl tracking-widest uppercase mb-10 text-brand-cream/80">
          Mode &amp; elegance
        </p>
        <Link
          href="/shop"
          className="inline-block border border-brand-cream px-10 py-4 text-sm tracking-widest uppercase hover:bg-brand-cream hover:text-brand-green transition-colors"
        >
          Decouvrir la collection
        </Link>
      </div>
    </section>
  );
}
