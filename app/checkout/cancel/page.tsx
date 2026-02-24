import Link from "next/link";

export default function CheckoutCancel() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="font-serif text-4xl text-brand-green mb-4">
        Commande annulee
      </h1>
      <p className="text-brand-black/60 mb-8">
        Votre commande a ete annulee. Votre panier est toujours disponible.
      </p>
      <Link
        href="/cart"
        className="inline-block border border-brand-green text-brand-green px-8 py-3 text-sm tracking-widest uppercase hover:bg-brand-green hover:text-brand-cream transition-colors"
      >
        Retour au panier
      </Link>
    </main>
  );
}
