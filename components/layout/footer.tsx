import Link from "next/link";
import Image from "next/image";

const navigation = [
  { label: "Nos Produits", href: "/shop" },
  { label: "Formations", href: "#formations" },
  { label: "Panier", href: "/cart" },
];

const legal = [
  { label: "Mentions legales", href: "#" },
  { label: "Confidentialite", href: "#" },
  { label: "CGV", href: "#" },
];

export function Footer() {
  return (
    <footer className="relative bg-brand-green overflow-hidden">
      {/* Top accent line */}
      <div className="w-full h-px bg-gradient-to-r from-transparent via-brand-gold/30 to-transparent" />

      {/* Decorative orbs */}
      <div className="absolute -bottom-40 -left-40 w-[500px] h-[500px] rounded-full bg-brand-gold/[0.03] blur-[120px]" />
      <div className="absolute -top-40 -right-40 w-[400px] h-[400px] rounded-full bg-brand-cream/[0.03] blur-[100px]" />

      {/* Newsletter / CTA banner */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-10">
        <div className="relative rounded-3xl border border-white/10 bg-white/[0.04] backdrop-blur-sm p-8 sm:p-12 mb-14 overflow-hidden">
          <div className="absolute -top-20 -right-20 w-60 h-60 rounded-full bg-brand-gold/10 blur-[80px]" />
          <div className="relative z-10 flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
            <div>
              <h3 className="font-serif text-2xl sm:text-3xl text-brand-cream mb-2">
                Restez <span className="text-gradient-gold">informee</span>
              </h3>
              <p className="text-brand-cream/40 text-sm max-w-md">
                Nouveautes, offres exclusives et conseils pro directement dans votre boite mail.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-3 sm:items-center">
              <div className="relative">
                <input
                  type="email"
                  placeholder="Votre email"
                  className="w-full sm:w-72 bg-white/[0.06] border border-white/10 rounded-full px-6 py-3.5 text-sm text-brand-cream placeholder:text-brand-cream/30 focus:outline-none focus:border-brand-gold/50 focus:bg-white/[0.08] transition-all duration-300"
                />
              </div>
              <button className="inline-flex items-center justify-center gap-2 bg-brand-gold text-brand-black px-7 py-3.5 rounded-full text-[11px] tracking-[0.2em] uppercase font-bold hover:shadow-[0_0_30px_rgba(198,168,107,0.3)] hover:scale-105 transition-all duration-500">
                S&apos;inscrire
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Main footer grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-4">
            <Link href="/" className="inline-block -ml-8">
              <Image
                src="/images/logo/Belyzlashlogo2-Blanc.png"
                alt="BelyzLash"
                width={320}
                height={90}
                className="h-[10rem] w-auto -my-8"
              />
            </Link>
            <p className="-mt-6 text-sm text-brand-cream/50 leading-relaxed max-w-xs">
              Specialisee dans les produits professionnels pour extension de cils. Qualite, passion et excellence au service de votre art.
            </p>
            {/* Social */}
            <div className="flex gap-3 mt-6">
              <a
                href="https://www.instagram.com/belyzlash"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-cream/50 hover:border-brand-gold/50 hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-300"
                aria-label="Instagram"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>
              </a>
              <a
                href="https://www.tiktok.com/@elysza"
                target="_blank"
                rel="noopener noreferrer"
                className="w-10 h-10 rounded-full border border-white/10 flex items-center justify-center text-brand-cream/50 hover:border-brand-gold/50 hover:text-brand-gold hover:bg-brand-gold/10 transition-all duration-300"
                aria-label="TikTok"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1v-3.5a6.37 6.37 0 00-.79-.05A6.34 6.34 0 003.15 15.2a6.34 6.34 0 0010.86 4.48v-7.15a8.16 8.16 0 005.58 2.19V11.2a4.85 4.85 0 01-3.77-1.74V6.69h3.77z"/></svg>
              </a>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 lg:col-start-6">
            <h3 className="text-[11px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-5">
              Navigation
            </h3>
            <nav className="flex flex-col gap-3">
              {navigation.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-brand-cream/50 hover:text-brand-cream hover:translate-x-1 transition-all duration-300 w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Legal */}
          <div className="lg:col-span-2">
            <h3 className="text-[11px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-5">
              Informations
            </h3>
            <nav className="flex flex-col gap-3">
              {legal.map((item) => (
                <Link
                  key={item.label}
                  href={item.href}
                  className="text-sm text-brand-cream/50 hover:text-brand-cream hover:translate-x-1 transition-all duration-300 w-fit"
                >
                  {item.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 lg:col-start-10">
            <h3 className="text-[11px] tracking-[0.3em] uppercase text-brand-gold font-semibold mb-5">
              Contact
            </h3>
            <div className="flex flex-col gap-4">
              <a
                href="tel:0652766583"
                className="group flex items-center gap-3 text-sm text-brand-cream/50 hover:text-brand-cream transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:border-brand-gold/30 group-hover:bg-brand-gold/10 transition-all duration-300">
                  <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 6.75c0 8.284 6.716 15 15 15h2.25a2.25 2.25 0 002.25-2.25v-1.372c0-.516-.351-.966-.852-1.091l-4.423-1.106c-.44-.11-.902.055-1.173.417l-.97 1.293c-.282.376-.769.542-1.21.38a12.035 12.035 0 01-7.143-7.143c-.162-.441.004-.928.38-1.21l1.293-.97c.363-.271.527-.734.417-1.173L6.963 3.102a1.125 1.125 0 00-1.091-.852H4.5A2.25 2.25 0 002.25 4.5v2.25z" />
                  </svg>
                </div>
                06.52.76.65.83
              </a>
              <a
                href="mailto:lash.belyz@gmail.com"
                className="group flex items-center gap-3 text-sm text-brand-cream/50 hover:text-brand-cream transition-all duration-300"
              >
                <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/10 flex items-center justify-center group-hover:border-brand-gold/30 group-hover:bg-brand-gold/10 transition-all duration-300">
                  <svg className="w-4 h-4 text-brand-gold" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                  </svg>
                </div>
                lash.belyz@gmail.com
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-14 pt-6 border-t border-white/[0.06]">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[11px] text-brand-cream/30 tracking-wide">
              &copy; {new Date().getFullYear()} BelyzLash. Tous droits reserves.
            </p>
            <a
              href="https://wevlap.fr"
              target="_blank"
              rel="noopener noreferrer"
              className="group inline-flex items-center gap-2 px-4 py-2 rounded-full border border-brand-gold/20 bg-brand-gold/[0.06] hover:border-brand-gold/40 hover:bg-brand-gold/[0.12] transition-all duration-300"
            >
              <span className="text-[11px] text-brand-cream/40 tracking-wide">Concu par</span>
              <span className="text-xs font-bold tracking-[0.15em] uppercase text-brand-gold group-hover:text-brand-gold transition-colors duration-300">
                Wevlap
              </span>
              <svg className="w-3 h-3 text-brand-gold/50 group-hover:text-brand-gold group-hover:translate-x-0.5 transition-all duration-300" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6.75-6.75M19.5 12l-6.75 6.75" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
