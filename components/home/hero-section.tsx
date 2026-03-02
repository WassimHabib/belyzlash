import Image from "next/image";

export function HeroSection() {
  return (
    <section className="relative h-[30vh] min-h-[180px] sm:h-[40vh] sm:min-h-[280px] lg:h-[50vh] lg:min-h-[400px] bg-brand-green overflow-hidden">
      <div className="absolute inset-0">
        <Image
          src="/images/hero/hero-banner.jpg"
          alt="BelyzLash"
          fill
          className="object-cover"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand-green/40" />
      </div>
    </section>
  );
}
