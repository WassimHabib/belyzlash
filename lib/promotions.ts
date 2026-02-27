// Configuration des promotions actives
// Modifie ce fichier pour mettre a jour les offres affichees sur le site

export interface Promotion {
  id: string;
  text: string;
  /** Seuil minimum en euros (null = pas de seuil) */
  threshold: number | null;
  type: "free_shipping" | "percentage" | "fixed" | "info";
}

export const activePromotions: Promotion[] = [
  // Decommente et modifie pour activer une promo :
  // {
  //   id: "free-shipping-150",
  //   text: "Livraison offerte des 150€ d'achat",
  //   threshold: 150,
  //   type: "free_shipping",
  // },
];

/** Retourne la promo de livraison offerte active (s'il y en a une) */
export function getFreeShippingPromo(): Promotion | null {
  return activePromotions.find((p) => p.type === "free_shipping") ?? null;
}
