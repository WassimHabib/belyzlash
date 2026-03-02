export function MarqueeBanner() {
  const items = [
    "Qualite Professionnelle",
    "Livraison 24h-72h",
    "Paiement 3x 4x Sans Frais",
    "Click & Collect",
    "Cils Premium",
    "Formations Certifiees",
  ];

  const repeated = [...items, ...items];

  return (
    <div className="bg-white border-y border-brand-gold/10 py-4 overflow-hidden lg:sticky lg:top-[84px] lg:z-30">
      <div className="animate-marquee flex whitespace-nowrap">
        {repeated.map((item, i) => (
          <span key={i} className="mx-8 text-[11px] tracking-[0.3em] uppercase text-brand-green/50 flex items-center gap-8">
            {item}
            <span className="text-brand-gold/40 text-lg">&diams;</span>
          </span>
        ))}
      </div>
    </div>
  );
}
