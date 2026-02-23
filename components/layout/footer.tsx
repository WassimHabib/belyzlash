import Link from "next/link";

export function Footer() {
  return (
    <footer className="bg-brand-green text-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <Link href="/" className="font-serif text-2xl tracking-wide">
            belyzlash
          </Link>
          <nav className="flex gap-8 text-sm tracking-widest uppercase">
            <Link href="/shop" className="hover:text-brand-gold transition-colors">
              Shop
            </Link>
          </nav>
        </div>
        <div className="mt-8 pt-8 border-t border-brand-cream/20 text-center text-sm text-brand-cream/60">
          &copy; {new Date().getFullYear()} belyzlash. Tous droits reserves.
        </div>
      </div>
    </footer>
  );
}
