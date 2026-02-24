import { Product, ProductCategory } from "./types";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Manteau Cachemire Noir",
    slug: "manteau-cachemire-noir",
    price: "389.00",
    regular_price: "389.00",
    sale_price: "",
    description:
      "<p>Manteau en cachemire d'exception, coupe droite et elegante.</p>",
    short_description: "Cachemire, coupe droite",
    images: [
      { id: 1, src: "/placeholder/coat-1.svg", alt: "Manteau cachemire noir" },
      {
        id: 2,
        src: "/placeholder/coat-2.svg",
        alt: "Manteau cachemire noir dos",
      },
    ],
    attributes: [
      { id: 1, name: "Taille", options: ["XS", "S", "M", "L", "XL"] },
      { id: 2, name: "Couleur", options: ["Noir"] },
    ],
    variations: [101, 102, 103, 104, 105],
    categories: [{ id: 1, name: "Manteaux", slug: "manteaux" }],
    stock_status: "instock",
  },
  {
    id: 2,
    name: "Robe Soie Ivoire",
    slug: "robe-soie-ivoire",
    price: "259.00",
    regular_price: "259.00",
    sale_price: "",
    description:
      "<p>Robe fluide en soie naturelle, tombee impeccable.</p>",
    short_description: "Soie naturelle, coupe fluide",
    images: [
      { id: 3, src: "/placeholder/dress-1.svg", alt: "Robe soie ivoire" },
    ],
    attributes: [
      { id: 1, name: "Taille", options: ["XS", "S", "M", "L"] },
    ],
    variations: [201, 202, 203, 204],
    categories: [{ id: 2, name: "Robes", slug: "robes" }],
    stock_status: "instock",
  },
  {
    id: 3,
    name: "Pantalon Lin Beige",
    slug: "pantalon-lin-beige",
    price: "149.00",
    regular_price: "149.00",
    sale_price: "",
    description: "<p>Pantalon en lin leger, coupe decontractee.</p>",
    short_description: "Lin, coupe decontractee",
    images: [
      { id: 4, src: "/placeholder/pants-1.svg", alt: "Pantalon lin beige" },
    ],
    attributes: [
      { id: 1, name: "Taille", options: ["S", "M", "L", "XL"] },
    ],
    variations: [301, 302, 303, 304],
    categories: [{ id: 3, name: "Pantalons", slug: "pantalons" }],
    stock_status: "instock",
  },
  {
    id: 4,
    name: "Chemise Coton Blanc",
    slug: "chemise-coton-blanc",
    price: "119.00",
    regular_price: "119.00",
    sale_price: "",
    description: "<p>Chemise en coton egyptien, coupe ajustee.</p>",
    short_description: "Coton egyptien, coupe ajustee",
    images: [
      { id: 5, src: "/placeholder/shirt-1.svg", alt: "Chemise coton blanc" },
    ],
    attributes: [
      { id: 1, name: "Taille", options: ["XS", "S", "M", "L", "XL"] },
    ],
    variations: [401, 402, 403, 404, 405],
    categories: [{ id: 4, name: "Chemises", slug: "chemises" }],
    stock_status: "instock",
  },
];

export const mockCategories: ProductCategory[] = [
  { id: 1, name: "Manteaux", slug: "manteaux", count: 1 },
  { id: 2, name: "Robes", slug: "robes", count: 1 },
  { id: 3, name: "Pantalons", slug: "pantalons", count: 1 },
  { id: 4, name: "Chemises", slug: "chemises", count: 1 },
];
