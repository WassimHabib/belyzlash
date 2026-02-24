import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="mb-8 text-brand-gold text-6xl">&#10003;</div>
      <h1 className="font-serif text-4xl text-brand-green mb-4">
        Merci pour votre commande !
      </h1>
      <p className="text-brand-black/60 mb-8">
        Vous recevrez un email de confirmation sous peu.
      </p>
      <Link
        href="/shop"
        className="inline-block border border-brand-green text-brand-green px-8 py-3 text-sm tracking-widest uppercase hover:bg-brand-green hover:text-brand-cream transition-colors"
      >
        Continuer le shopping
      </Link>
    </main>
  );
}
