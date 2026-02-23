# belyzlash Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Build a luxury fashion e-commerce frontend with Next.js that consumes a headless WooCommerce API.

**Architecture:** Next.js 15 App Router with TypeScript and Tailwind CSS. Products served via ISR from WooCommerce REST API. Cart managed client-side with React Context + localStorage. Checkout creates WooCommerce orders then redirects to Stripe.

**Tech Stack:** Next.js 15, TypeScript, Tailwind CSS 4, Vitest, React Testing Library, Playfair Display + Inter (Google Fonts)

---

## Task 1: Project Scaffolding

**Files:**
- Create: `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `app/layout.tsx`, `app/page.tsx`, `app/globals.css`, `.env.local.example`, `.gitignore`

**Step 1: Scaffold Next.js project**

Run: `npx create-next-app@latest . --typescript --tailwind --eslint --app --src=no --import-alias="@/*" --turbopack`

Expected: Project files created in current directory.

**Step 2: Install test dependencies**

Run: `npm install -D vitest @vitejs/plugin-react @testing-library/react @testing-library/jest-dom jsdom`

**Step 3: Create Vitest config**

Create `vitest.config.ts`:

```ts
import { defineConfig } from "vitest/config";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  test: {
    environment: "jsdom",
    setupFiles: ["./vitest.setup.ts"],
    globals: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "."),
    },
  },
});
```

Create `vitest.setup.ts`:

```ts
import "@testing-library/jest-dom/vitest";
```

**Step 4: Add test script to package.json**

Add to `"scripts"`: `"test": "vitest", "test:run": "vitest run"`

**Step 5: Create .env.local.example**

```
NEXT_PUBLIC_SITE_URL=http://localhost:3000
WOOCOMMERCE_URL=https://your-wordpress-site.com
WOOCOMMERCE_CONSUMER_KEY=ck_xxx
WOOCOMMERCE_CONSUMER_SECRET=cs_xxx
```

**Step 6: Run dev server to verify scaffold works**

Run: `npm run dev` (verify it starts on localhost:3000, then stop)

**Step 7: Run tests to verify test setup works**

Create a trivial test `__tests__/setup.test.ts`:

```ts
import { describe, it, expect } from "vitest";

describe("setup", () => {
  it("works", () => {
    expect(true).toBe(true);
  });
});
```

Run: `npm run test:run`
Expected: 1 test passes.

**Step 8: Commit**

```bash
git add -A
git commit -m "chore: scaffold Next.js project with Tailwind, TypeScript, Vitest"
```

---

## Task 2: Tailwind Config & Global Styles

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `app/layout.tsx` (add fonts)

**Step 1: Configure Tailwind with belyzlash palette**

Update `tailwind.config.ts`:

```ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "brand-green": "#1F3A34",
        "brand-cream": "#F4F2EE",
        "brand-beige": "#D8CFC6",
        "brand-black": "#0E0E0E",
        "brand-gold": "#C6A86B",
      },
      fontFamily: {
        serif: ["var(--font-playfair)", "serif"],
        sans: ["var(--font-inter)", "sans-serif"],
      },
    },
  },
  plugins: [],
};
export default config;
```

**Step 2: Set up Google Fonts in layout**

Update `app/layout.tsx`:

```tsx
import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-playfair",
});

export const metadata: Metadata = {
  title: "belyzlash",
  description: "Mode & elegance",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr" className={`${inter.variable} ${playfair.variable}`}>
      <body className="bg-brand-cream text-brand-black font-sans antialiased">
        {children}
      </body>
    </html>
  );
}
```

**Step 3: Set up global styles**

Replace `app/globals.css`:

```css
@import "tailwindcss";

@theme {
  --color-brand-green: #1F3A34;
  --color-brand-cream: #F4F2EE;
  --color-brand-beige: #D8CFC6;
  --color-brand-black: #0E0E0E;
  --color-brand-gold: #C6A86B;

  --font-serif: var(--font-playfair), serif;
  --font-sans: var(--font-inter), sans-serif;
}
```

**Step 4: Clear default page content**

Replace `app/page.tsx`:

```tsx
export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center">
      <h1 className="font-serif text-5xl text-brand-green">belyzlash</h1>
    </main>
  );
}
```

**Step 5: Verify visually**

Run: `npm run dev`
Expected: Page shows "belyzlash" in Playfair Display, green text on cream background.

**Step 6: Commit**

```bash
git add -A
git commit -m "style: configure Tailwind palette, fonts, and global styles"
```

---

## Task 3: WooCommerce API Client & Types

**Files:**
- Create: `lib/woocommerce.ts`
- Create: `lib/types.ts`
- Create: `lib/mock-data.ts`
- Test: `__tests__/lib/woocommerce.test.ts`

**Step 1: Define product types**

Create `lib/types.ts`:

```ts
export interface ProductImage {
  id: number;
  src: string;
  alt: string;
}

export interface ProductAttribute {
  id: number;
  name: string;
  options: string[];
}

export interface ProductVariation {
  id: number;
  attributes: { name: string; option: string }[];
  price: string;
  stock_status: string;
}

export interface Product {
  id: number;
  name: string;
  slug: string;
  price: string;
  regular_price: string;
  sale_price: string;
  description: string;
  short_description: string;
  images: ProductImage[];
  attributes: ProductAttribute[];
  variations: number[];
  categories: { id: number; name: string; slug: string }[];
  stock_status: string;
}

export interface ProductCategory {
  id: number;
  name: string;
  slug: string;
  count: number;
}

export interface CartItem {
  productId: number;
  variationId?: number;
  name: string;
  price: number;
  image: string;
  size?: string;
  color?: string;
  quantity: number;
}

export interface OrderLineItem {
  product_id: number;
  variation_id?: number;
  quantity: number;
}

export interface OrderBilling {
  first_name: string;
  last_name: string;
  email: string;
  phone: string;
  address_1: string;
  city: string;
  postcode: string;
  country: string;
}

export interface CreateOrderPayload {
  payment_method: string;
  payment_method_title: string;
  set_paid: boolean;
  billing: OrderBilling;
  shipping: OrderBilling;
  line_items: OrderLineItem[];
}
```

**Step 2: Create mock data for development**

Create `lib/mock-data.ts`:

```ts
import { Product, ProductCategory } from "./types";

export const mockProducts: Product[] = [
  {
    id: 1,
    name: "Manteau Cachemire Noir",
    slug: "manteau-cachemire-noir",
    price: "389.00",
    regular_price: "389.00",
    sale_price: "",
    description: "<p>Manteau en cachemire d'exception, coupe droite et elegante.</p>",
    short_description: "Cachemire, coupe droite",
    images: [
      { id: 1, src: "/placeholder/coat-1.jpg", alt: "Manteau cachemire noir" },
      { id: 2, src: "/placeholder/coat-2.jpg", alt: "Manteau cachemire noir dos" },
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
    description: "<p>Robe fluide en soie naturelle, tombee impeccable.</p>",
    short_description: "Soie naturelle, coupe fluide",
    images: [
      { id: 3, src: "/placeholder/dress-1.jpg", alt: "Robe soie ivoire" },
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
      { id: 4, src: "/placeholder/pants-1.jpg", alt: "Pantalon lin beige" },
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
      { id: 5, src: "/placeholder/shirt-1.jpg", alt: "Chemise coton blanc" },
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
```

**Step 3: Write failing tests for WooCommerce client**

Create `__tests__/lib/woocommerce.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";
import { getProducts, getProductBySlug, getCategories } from "@/lib/woocommerce";

const mockFetch = vi.fn();
global.fetch = mockFetch;

describe("WooCommerce API client", () => {
  beforeEach(() => {
    vi.resetAllMocks();
    process.env.WOOCOMMERCE_URL = "https://test.com";
    process.env.WOOCOMMERCE_CONSUMER_KEY = "ck_test";
    process.env.WOOCOMMERCE_CONSUMER_SECRET = "cs_test";
  });

  describe("getProducts", () => {
    it("fetches products from WooCommerce API", async () => {
      const mockProducts = [{ id: 1, name: "Test" }];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProducts),
      });

      const result = await getProducts();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/wp-json/wc/v3/products"),
        expect.objectContaining({ next: { revalidate: 60 } })
      );
      expect(result).toEqual(mockProducts);
    });

    it("passes category filter as query param", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      });

      await getProducts({ category: 5 });

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("category=5"),
        expect.any(Object)
      );
    });
  });

  describe("getProductBySlug", () => {
    it("fetches a single product by slug", async () => {
      const mockProduct = [{ id: 1, slug: "test-product" }];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      });

      const result = await getProductBySlug("test-product");

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("slug=test-product"),
        expect.any(Object)
      );
      expect(result).toEqual(mockProduct[0]);
    });

    it("returns null if no product found", async () => {
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve([]),
      });

      const result = await getProductBySlug("nonexistent");
      expect(result).toBeNull();
    });
  });

  describe("getCategories", () => {
    it("fetches categories from WooCommerce API", async () => {
      const mockCategories = [{ id: 1, name: "Robes" }];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      });

      const result = await getCategories();

      expect(mockFetch).toHaveBeenCalledWith(
        expect.stringContaining("/wp-json/wc/v3/products/categories"),
        expect.objectContaining({ next: { revalidate: 300 } })
      );
      expect(result).toEqual(mockCategories);
    });
  });
});
```

**Step 4: Run tests to verify they fail**

Run: `npm run test:run`
Expected: FAIL — cannot resolve `@/lib/woocommerce`.

**Step 5: Implement WooCommerce client**

Create `lib/woocommerce.ts`:

```ts
import { Product, ProductCategory, CreateOrderPayload } from "./types";

const BASE_URL = process.env.WOOCOMMERCE_URL;
const CONSUMER_KEY = process.env.WOOCOMMERCE_CONSUMER_KEY;
const CONSUMER_SECRET = process.env.WOOCOMMERCE_CONSUMER_SECRET;

function buildUrl(endpoint: string, params?: Record<string, string | number>): string {
  const url = new URL(`/wp-json/wc/v3${endpoint}`, BASE_URL!);
  url.searchParams.set("consumer_key", CONSUMER_KEY!);
  url.searchParams.set("consumer_secret", CONSUMER_SECRET!);
  if (params) {
    for (const [key, value] of Object.entries(params)) {
      url.searchParams.set(key, String(value));
    }
  }
  return url.toString();
}

export async function getProducts(options?: {
  category?: number;
  per_page?: number;
  page?: number;
  orderby?: string;
}): Promise<Product[]> {
  const params: Record<string, string | number> = {};
  if (options?.category) params.category = options.category;
  if (options?.per_page) params.per_page = options.per_page;
  if (options?.page) params.page = options.page;
  if (options?.orderby) params.orderby = options.orderby;

  const res = await fetch(buildUrl("/products", params), {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
  return res.json();
}

export async function getProductBySlug(slug: string): Promise<Product | null> {
  const res = await fetch(buildUrl("/products", { slug }), {
    next: { revalidate: 60 },
  });

  if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
  const products: Product[] = await res.json();
  return products[0] ?? null;
}

export async function getCategories(): Promise<ProductCategory[]> {
  const res = await fetch(buildUrl("/products/categories"), {
    next: { revalidate: 300 },
  });

  if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
  return res.json();
}

export async function createOrder(order: CreateOrderPayload): Promise<{ id: number }> {
  const res = await fetch(buildUrl("/orders"), {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(order),
    cache: "no-store",
  });

  if (!res.ok) throw new Error(`WooCommerce API error: ${res.status}`);
  return res.json();
}
```

**Step 6: Run tests to verify they pass**

Run: `npm run test:run`
Expected: All tests PASS.

**Step 7: Commit**

```bash
git add -A
git commit -m "feat: add WooCommerce API client, types, and mock data"
```

---

## Task 4: Cart Provider (Context + localStorage)

**Files:**
- Create: `components/cart/cart-provider.tsx`
- Test: `__tests__/components/cart/cart-provider.test.tsx`

**Step 1: Write failing tests for CartProvider**

Create `__tests__/components/cart/cart-provider.test.tsx`:

```tsx
import { describe, it, expect, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "@/components/cart/cart-provider";
import { CartItem } from "@/lib/types";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const mockItem: CartItem = {
  productId: 1,
  name: "Test Product",
  price: 99.99,
  image: "/test.jpg",
  size: "M",
  quantity: 1,
};

describe("CartProvider", () => {
  beforeEach(() => {
    localStorage.clear();
  });

  it("starts with an empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });
    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it("adds an item to the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].name).toBe("Test Product");
    expect(result.current.totalItems).toBe(1);
    expect(result.current.totalPrice).toBe(99.99);
  });

  it("increments quantity when adding same item+variant", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem(mockItem);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
    expect(result.current.totalItems).toBe(2);
  });

  it("treats different sizes as different items", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem({ ...mockItem, size: "S" });
      result.current.addItem({ ...mockItem, size: "L" });
    });

    expect(result.current.items).toHaveLength(2);
  });

  it("removes an item from the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockItem);
    });

    act(() => {
      result.current.removeItem(1, "M");
    });

    expect(result.current.items).toHaveLength(0);
  });

  it("updates item quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockItem);
    });

    act(() => {
      result.current.updateQuantity(1, "M", 5);
    });

    expect(result.current.items[0].quantity).toBe(5);
    expect(result.current.totalPrice).toBe(499.95);
  });

  it("removes item when quantity set to 0", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockItem);
    });

    act(() => {
      result.current.updateQuantity(1, "M", 0);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it("clears the cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(mockItem);
      result.current.addItem({ ...mockItem, productId: 2, name: "Other" });
    });

    act(() => {
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `npm run test:run`
Expected: FAIL — cannot resolve `@/components/cart/cart-provider`.

**Step 3: Implement CartProvider**

Create `components/cart/cart-provider.tsx`:

```tsx
"use client";

import { createContext, useContext, useState, useEffect, useCallback } from "react";
import { CartItem } from "@/lib/types";

function getCartKey(item: { productId: number; size?: string; color?: string }): string {
  return `${item.productId}-${item.size ?? ""}-${item.color ?? ""}`;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: number, size?: string, color?: string) => void;
  updateQuantity: (productId: number, size: string | undefined, quantity: number) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "belyzlash-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {}
  }, []);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
  }, [items]);

  const addItem = useCallback((newItem: CartItem) => {
    setItems((prev) => {
      const key = getCartKey(newItem);
      const existing = prev.find((item) => getCartKey(item) === key);
      if (existing) {
        return prev.map((item) =>
          getCartKey(item) === key
            ? { ...item, quantity: item.quantity + newItem.quantity }
            : item
        );
      }
      return [...prev, newItem];
    });
  }, []);

  const removeItem = useCallback(
    (productId: number, size?: string, color?: string) => {
      setItems((prev) =>
        prev.filter((item) => getCartKey(item) !== getCartKey({ productId, size, color }))
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: number, size: string | undefined, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) =>
          prev.filter((item) => getCartKey(item) !== getCartKey({ productId, size }))
        );
        return;
      }
      setItems((prev) =>
        prev.map((item) =>
          getCartKey(item) === getCartKey({ productId, size })
            ? { ...item, quantity }
            : item
        )
      );
    },
    []
  );

  const clearCart = useCallback(() => setItems([]), []);

  const totalItems = items.reduce((sum, item) => sum + item.quantity, 0);
  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ items, totalItems, totalPrice, addItem, removeItem, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart(): CartContextType {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
```

**Step 4: Run tests to verify they pass**

Run: `npm run test:run`
Expected: All tests PASS.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add CartProvider with React Context and localStorage persistence"
```

---

## Task 5: Layout Components (Header, Footer, MobileMenu)

**Files:**
- Create: `components/layout/header.tsx`
- Create: `components/layout/footer.tsx`
- Create: `components/layout/mobile-menu.tsx`
- Modify: `app/layout.tsx` (add Header, Footer, CartProvider)
- Test: `__tests__/components/layout/header.test.tsx`

**Step 1: Write failing test for Header**

Create `__tests__/components/layout/header.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { Header } from "@/components/layout/header";
import { CartProvider } from "@/components/cart/cart-provider";

function renderHeader() {
  return render(
    <CartProvider>
      <Header />
    </CartProvider>
  );
}

describe("Header", () => {
  it("renders the brand name", () => {
    renderHeader();
    expect(screen.getByText("belyzlash")).toBeInTheDocument();
  });

  it("renders navigation links", () => {
    renderHeader();
    expect(screen.getByRole("link", { name: /shop/i })).toHaveAttribute("href", "/shop");
  });

  it("renders cart link with item count", () => {
    renderHeader();
    expect(screen.getByLabelText(/panier/i)).toBeInTheDocument();
  });
});
```

**Step 2: Run tests to verify they fail**

Run: `npm run test:run`
Expected: FAIL — cannot resolve `@/components/layout/header`.

**Step 3: Implement Header**

Create `components/layout/header.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useState } from "react";
import { useCart } from "@/components/cart/cart-provider";
import { MobileMenu } from "./mobile-menu";

export function Header() {
  const { totalItems } = useCart();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className="bg-brand-green text-brand-cream">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20">
          <Link href="/" className="font-serif text-2xl sm:text-3xl tracking-wide">
            belyzlash
          </Link>

          <nav className="hidden md:flex items-center gap-8 text-sm tracking-widest uppercase">
            <Link href="/shop" className="hover:text-brand-gold transition-colors">
              Shop
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            <Link
              href="/cart"
              aria-label="Panier"
              className="relative hover:text-brand-gold transition-colors"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.75 10.5V6a3.75 3.75 0 10-7.5 0v4.5m11.356-1.993l1.263 12c.07.665-.45 1.243-1.119 1.243H4.25a1.125 1.125 0 01-1.12-1.243l1.264-12A1.125 1.125 0 015.513 7.5h12.974c.576 0 1.059.435 1.119 1.007zM8.625 10.5a.375.375 0 11-.75 0 .375.375 0 01.75 0zm7.5 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
                />
              </svg>
              {totalItems > 0 && (
                <span className="absolute -top-2 -right-2 bg-brand-gold text-brand-black text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {totalItems}
                </span>
              )}
            </Link>

            <button
              className="md:hidden"
              onClick={() => setMenuOpen(true)}
              aria-label="Menu"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="currentColor"
                className="w-6 h-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} />
    </header>
  );
}
```

**Step 4: Implement MobileMenu**

Create `components/layout/mobile-menu.tsx`:

```tsx
"use client";

import Link from "next/link";

interface MobileMenuProps {
  open: boolean;
  onClose: () => void;
}

export function MobileMenu({ open, onClose }: MobileMenuProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 md:hidden">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-64 bg-brand-green p-6">
        <button
          onClick={onClose}
          aria-label="Fermer"
          className="absolute top-4 right-4 text-brand-cream"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
        <nav className="mt-12 flex flex-col gap-6 text-brand-cream text-lg tracking-widest uppercase">
          <Link href="/shop" onClick={onClose} className="hover:text-brand-gold transition-colors">
            Shop
          </Link>
          <Link href="/cart" onClick={onClose} className="hover:text-brand-gold transition-colors">
            Panier
          </Link>
        </nav>
      </div>
    </div>
  );
}
```

**Step 5: Implement Footer**

Create `components/layout/footer.tsx`:

```tsx
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
```

**Step 6: Update layout to include Header, Footer, CartProvider**

Update `app/layout.tsx` to wrap children with CartProvider, add Header above and Footer below `{children}`.

**Step 7: Run tests to verify they pass**

Run: `npm run test:run`
Expected: All tests PASS.

**Step 8: Verify visually**

Run: `npm run dev`
Expected: Green header with "belyzlash" logo, nav, cart icon. Green footer. Cream background.

**Step 9: Commit**

```bash
git add -A
git commit -m "feat: add Header, Footer, MobileMenu layout components"
```

---

## Task 6: Home Page

**Files:**
- Create: `components/home/hero-section.tsx`
- Create: `components/home/featured-products.tsx`
- Create: `components/home/brand-banner.tsx`
- Create: `components/shop/product-card.tsx` (shared with shop page)
- Modify: `app/page.tsx`
- Test: `__tests__/components/shop/product-card.test.tsx`

**Step 1: Write failing test for ProductCard**

Create `__tests__/components/shop/product-card.test.tsx`:

```tsx
import { describe, it, expect } from "vitest";
import { render, screen } from "@testing-library/react";
import { ProductCard } from "@/components/shop/product-card";

const mockProduct = {
  id: 1,
  name: "Manteau Test",
  slug: "manteau-test",
  price: "389.00",
  images: [{ id: 1, src: "/test.jpg", alt: "Manteau" }],
};

describe("ProductCard", () => {
  it("renders product name and price", () => {
    render(<ProductCard product={mockProduct as any} />);
    expect(screen.getByText("Manteau Test")).toBeInTheDocument();
    expect(screen.getByText("389.00 €")).toBeInTheDocument();
  });

  it("links to product page", () => {
    render(<ProductCard product={mockProduct as any} />);
    expect(screen.getByRole("link")).toHaveAttribute("href", "/shop/manteau-test");
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:run`
Expected: FAIL — cannot resolve `@/components/shop/product-card`.

**Step 3: Implement ProductCard**

Create `components/shop/product-card.tsx`:

```tsx
import Link from "next/link";
import Image from "next/image";
import { Product } from "@/lib/types";

export function ProductCard({ product }: { product: Product }) {
  const image = product.images[0];

  return (
    <Link href={`/shop/${product.slug}`} className="group block">
      <div className="aspect-[3/4] relative overflow-hidden bg-brand-beige">
        {image ? (
          <Image
            src={image.src}
            alt={image.alt || product.name}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-brand-black/30 font-serif text-xl">
            {product.name[0]}
          </div>
        )}
      </div>
      <div className="mt-4 space-y-1">
        <h3 className="font-serif text-lg text-brand-black group-hover:text-brand-green transition-colors">
          {product.name}
        </h3>
        <p className="text-brand-gold font-medium">{product.price} &euro;</p>
      </div>
    </Link>
  );
}
```

**Step 4: Implement HeroSection**

Create `components/home/hero-section.tsx`:

```tsx
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
```

**Step 5: Implement FeaturedProducts**

Create `components/home/featured-products.tsx`:

```tsx
import { Product } from "@/lib/types";
import { ProductCard } from "@/components/shop/product-card";

export function FeaturedProducts({ products }: { products: Product[] }) {
  return (
    <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
      <h2 className="font-serif text-3xl sm:text-4xl text-center mb-12 text-brand-green">
        Selection
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
        {products.slice(0, 4).map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </section>
  );
}
```

**Step 6: Implement BrandBanner**

Create `components/home/brand-banner.tsx`:

```tsx
export function BrandBanner() {
  return (
    <section className="bg-brand-green text-brand-cream py-20">
      <div className="max-w-3xl mx-auto px-4 text-center">
        <p className="font-serif text-2xl sm:text-3xl leading-relaxed">
          Des pieces intemporelles, confectionnees avec soin pour sublimer votre elegance naturelle.
        </p>
      </div>
    </section>
  );
}
```

**Step 7: Wire up Home page**

Update `app/page.tsx`:

```tsx
import { HeroSection } from "@/components/home/hero-section";
import { FeaturedProducts } from "@/components/home/featured-products";
import { BrandBanner } from "@/components/home/brand-banner";
import { getProducts } from "@/lib/woocommerce";
import { mockProducts } from "@/lib/mock-data";

export default async function Home() {
  let products;
  try {
    products = await getProducts({ per_page: 4 });
  } catch {
    products = mockProducts;
  }

  return (
    <main>
      <HeroSection />
      <FeaturedProducts products={products} />
      <BrandBanner />
    </main>
  );
}
```

**Step 8: Run tests to verify they pass**

Run: `npm run test:run`
Expected: All tests PASS.

**Step 9: Commit**

```bash
git add -A
git commit -m "feat: add Home page with HeroSection, FeaturedProducts, BrandBanner"
```

---

## Task 7: Shop Page (Catalogue)

**Files:**
- Create: `components/shop/product-grid.tsx`
- Create: `components/shop/filters.tsx`
- Create: `app/shop/page.tsx`

**Step 1: Implement ProductGrid**

Create `components/shop/product-grid.tsx`:

```tsx
import { Product } from "@/lib/types";
import { ProductCard } from "./product-card";

export function ProductGrid({ products }: { products: Product[] }) {
  if (products.length === 0) {
    return (
      <p className="text-center text-brand-black/50 py-12">
        Aucun produit trouve.
      </p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
```

**Step 2: Implement Filters**

Create `components/shop/filters.tsx`:

```tsx
"use client";

import { ProductCategory } from "@/lib/types";
import { useRouter, useSearchParams } from "next/navigation";

export function Filters({ categories }: { categories: ProductCategory[] }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const activeCategory = searchParams.get("category");

  function handleCategory(slug: string | null) {
    const params = new URLSearchParams(searchParams.toString());
    if (slug) {
      params.set("category", slug);
    } else {
      params.delete("category");
    }
    router.push(`/shop?${params.toString()}`);
  }

  return (
    <div className="flex flex-wrap gap-3 mb-10">
      <button
        onClick={() => handleCategory(null)}
        className={`px-4 py-2 text-sm tracking-widest uppercase border transition-colors ${
          !activeCategory
            ? "bg-brand-green text-brand-cream border-brand-green"
            : "border-brand-beige text-brand-black hover:border-brand-green"
        }`}
      >
        Tout
      </button>
      {categories.map((cat) => (
        <button
          key={cat.id}
          onClick={() => handleCategory(cat.slug)}
          className={`px-4 py-2 text-sm tracking-widest uppercase border transition-colors ${
            activeCategory === cat.slug
              ? "bg-brand-green text-brand-cream border-brand-green"
              : "border-brand-beige text-brand-black hover:border-brand-green"
          }`}
        >
          {cat.name}
        </button>
      ))}
    </div>
  );
}
```

**Step 3: Create Shop page**

Create `app/shop/page.tsx`:

```tsx
import { Suspense } from "react";
import { getProducts, getCategories } from "@/lib/woocommerce";
import { mockProducts, mockCategories } from "@/lib/mock-data";
import { ProductGrid } from "@/components/shop/product-grid";
import { Filters } from "@/components/shop/filters";

export const metadata = {
  title: "Shop — belyzlash",
  description: "Decouvrez notre collection",
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>;
}) {
  const { category } = await searchParams;

  let products, categories;
  try {
    [products, categories] = await Promise.all([getProducts(), getCategories()]);
  } catch {
    products = mockProducts;
    categories = mockCategories;
  }

  const filtered = category
    ? products.filter((p) => p.categories.some((c) => c.slug === category))
    : products;

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl text-brand-green mb-8">Collection</h1>
      <Suspense fallback={null}>
        <Filters categories={categories} />
      </Suspense>
      <ProductGrid products={filtered} />
    </main>
  );
}
```

**Step 4: Verify visually**

Run: `npm run dev`, navigate to `/shop`.
Expected: Page title "Collection", filter buttons, product grid with mock products.

**Step 5: Run tests**

Run: `npm run test:run`
Expected: All tests PASS.

**Step 6: Commit**

```bash
git add -A
git commit -m "feat: add Shop page with ProductGrid and category Filters"
```

---

## Task 8: Product Detail Page

**Files:**
- Create: `components/product/image-gallery.tsx`
- Create: `components/product/product-info.tsx`
- Create: `components/product/variant-selector.tsx`
- Create: `components/product/add-to-cart-button.tsx`
- Create: `app/shop/[slug]/page.tsx`
- Test: `__tests__/components/product/add-to-cart-button.test.tsx`

**Step 1: Write failing test for AddToCartButton**

Create `__tests__/components/product/add-to-cart-button.test.tsx`:

```tsx
import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { AddToCartButton } from "@/components/product/add-to-cart-button";

describe("AddToCartButton", () => {
  it("renders the button", () => {
    render(<AddToCartButton onClick={vi.fn()} disabled={false} />);
    expect(screen.getByRole("button", { name: /ajouter au panier/i })).toBeInTheDocument();
  });

  it("calls onClick when clicked", () => {
    const onClick = vi.fn();
    render(<AddToCartButton onClick={onClick} disabled={false} />);
    fireEvent.click(screen.getByRole("button"));
    expect(onClick).toHaveBeenCalledOnce();
  });

  it("is disabled when disabled prop is true", () => {
    render(<AddToCartButton onClick={vi.fn()} disabled={true} />);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:run`
Expected: FAIL.

**Step 3: Implement AddToCartButton**

Create `components/product/add-to-cart-button.tsx`:

```tsx
"use client";

interface AddToCartButtonProps {
  onClick: () => void;
  disabled: boolean;
}

export function AddToCartButton({ onClick, disabled }: AddToCartButtonProps) {
  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className="w-full bg-brand-green text-brand-cream py-4 text-sm tracking-widest uppercase hover:bg-brand-green/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Ajouter au panier
    </button>
  );
}
```

**Step 4: Implement ImageGallery**

Create `components/product/image-gallery.tsx`:

```tsx
"use client";

import Image from "next/image";
import { useState } from "react";
import { ProductImage } from "@/lib/types";

export function ImageGallery({ images }: { images: ProductImage[] }) {
  const [selected, setSelected] = useState(0);

  if (images.length === 0) {
    return (
      <div className="aspect-[3/4] bg-brand-beige flex items-center justify-center text-brand-black/30">
        Pas d&apos;image
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="aspect-[3/4] relative overflow-hidden bg-brand-beige">
        <Image
          src={images[selected].src}
          alt={images[selected].alt}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          priority
        />
      </div>
      {images.length > 1 && (
        <div className="flex gap-3">
          {images.map((img, i) => (
            <button
              key={img.id}
              onClick={() => setSelected(i)}
              className={`aspect-square w-20 relative overflow-hidden border-2 transition-colors ${
                i === selected ? "border-brand-green" : "border-transparent"
              }`}
            >
              <Image
                src={img.src}
                alt={img.alt}
                fill
                className="object-cover"
                sizes="80px"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
```

**Step 5: Implement VariantSelector**

Create `components/product/variant-selector.tsx`:

```tsx
"use client";

import { ProductAttribute } from "@/lib/types";

interface VariantSelectorProps {
  attributes: ProductAttribute[];
  selected: Record<string, string>;
  onChange: (name: string, value: string) => void;
}

export function VariantSelector({ attributes, selected, onChange }: VariantSelectorProps) {
  return (
    <div className="space-y-6">
      {attributes.map((attr) => (
        <div key={attr.id}>
          <label className="block text-sm tracking-widest uppercase mb-3 text-brand-black/70">
            {attr.name}
          </label>
          <div className="flex flex-wrap gap-2">
            {attr.options.map((option) => (
              <button
                key={option}
                onClick={() => onChange(attr.name, option)}
                className={`px-4 py-2 text-sm border transition-colors ${
                  selected[attr.name] === option
                    ? "bg-brand-green text-brand-cream border-brand-green"
                    : "border-brand-beige text-brand-black hover:border-brand-green"
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}
```

**Step 6: Implement ProductInfo (client wrapper for product page)**

Create `components/product/product-info.tsx`:

```tsx
"use client";

import { useState } from "react";
import { Product } from "@/lib/types";
import { useCart } from "@/components/cart/cart-provider";
import { VariantSelector } from "./variant-selector";
import { AddToCartButton } from "./add-to-cart-button";

export function ProductInfo({ product }: { product: Product }) {
  const { addItem } = useCart();
  const [selected, setSelected] = useState<Record<string, string>>({});
  const [added, setAdded] = useState(false);

  const hasVariants = product.attributes.length > 0;
  const allSelected = product.attributes.every((attr) => selected[attr.name]);
  const canAdd = !hasVariants || allSelected;

  function handleAddToCart() {
    addItem({
      productId: product.id,
      name: product.name,
      price: parseFloat(product.price),
      image: product.images[0]?.src ?? "",
      size: selected["Taille"],
      color: selected["Couleur"],
      quantity: 1,
    });
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  }

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-serif text-3xl sm:text-4xl text-brand-green mb-2">
          {product.name}
        </h1>
        <p className="text-xl text-brand-gold font-medium">{product.price} &euro;</p>
      </div>

      {product.short_description && (
        <p className="text-brand-black/70 leading-relaxed">{product.short_description}</p>
      )}

      {hasVariants && (
        <VariantSelector
          attributes={product.attributes}
          selected={selected}
          onChange={(name, value) => setSelected((prev) => ({ ...prev, [name]: value }))}
        />
      )}

      <AddToCartButton onClick={handleAddToCart} disabled={!canAdd} />

      {added && (
        <p className="text-sm text-brand-green text-center">Ajoute au panier !</p>
      )}

      {product.description && (
        <div className="pt-8 border-t border-brand-beige">
          <h2 className="text-sm tracking-widest uppercase mb-4 text-brand-black/70">
            Description
          </h2>
          <div
            className="prose prose-sm text-brand-black/70"
            dangerouslySetInnerHTML={{ __html: product.description }}
          />
        </div>
      )}
    </div>
  );
}
```

**Step 7: Create product detail page**

Create `app/shop/[slug]/page.tsx`:

```tsx
import { notFound } from "next/navigation";
import { getProductBySlug, getProducts } from "@/lib/woocommerce";
import { mockProducts } from "@/lib/mock-data";
import { ImageGallery } from "@/components/product/image-gallery";
import { ProductInfo } from "@/components/product/product-info";

export async function generateStaticParams() {
  let products;
  try {
    products = await getProducts();
  } catch {
    products = mockProducts;
  }
  return products.map((p) => ({ slug: p.slug }));
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  let product;
  try {
    product = await getProductBySlug(slug);
  } catch {
    product = mockProducts.find((p) => p.slug === slug) ?? null;
  }

  if (!product) notFound();

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        <ImageGallery images={product.images} />
        <ProductInfo product={product} />
      </div>
    </main>
  );
}
```

**Step 8: Run tests to verify they pass**

Run: `npm run test:run`
Expected: All tests PASS.

**Step 9: Commit**

```bash
git add -A
git commit -m "feat: add product detail page with gallery, variants, and add-to-cart"
```

---

## Task 9: Cart Page

**Files:**
- Create: `components/cart/cart-item.tsx`
- Create: `components/cart/cart-summary.tsx`
- Create: `app/cart/page.tsx`

**Step 1: Implement CartItem component**

Create `components/cart/cart-item.tsx`:

```tsx
"use client";

import Image from "next/image";
import { CartItem as CartItemType } from "@/lib/types";
import { useCart } from "./cart-provider";

export function CartItem({ item }: { item: CartItemType }) {
  const { updateQuantity, removeItem } = useCart();

  return (
    <div className="flex gap-6 py-6 border-b border-brand-beige">
      <div className="w-24 h-32 relative bg-brand-beige flex-shrink-0">
        {item.image && (
          <Image src={item.image} alt={item.name} fill className="object-cover" sizes="96px" />
        )}
      </div>
      <div className="flex-1 flex flex-col justify-between">
        <div>
          <h3 className="font-serif text-lg text-brand-green">{item.name}</h3>
          {item.size && <p className="text-sm text-brand-black/60">Taille: {item.size}</p>}
          {item.color && <p className="text-sm text-brand-black/60">Couleur: {item.color}</p>}
        </div>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.quantity - 1)}
              className="w-8 h-8 border border-brand-beige flex items-center justify-center hover:border-brand-green transition-colors"
            >
              -
            </button>
            <span className="text-sm w-6 text-center">{item.quantity}</span>
            <button
              onClick={() => updateQuantity(item.productId, item.size, item.quantity + 1)}
              className="w-8 h-8 border border-brand-beige flex items-center justify-center hover:border-brand-green transition-colors"
            >
              +
            </button>
          </div>
          <p className="text-brand-gold font-medium">
            {(item.price * item.quantity).toFixed(2)} &euro;
          </p>
        </div>
      </div>
      <button
        onClick={() => removeItem(item.productId, item.size, item.color)}
        aria-label={`Supprimer ${item.name}`}
        className="self-start text-brand-black/30 hover:text-brand-black transition-colors"
      >
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>
  );
}
```

**Step 2: Implement CartSummary**

Create `components/cart/cart-summary.tsx`:

```tsx
"use client";

import Link from "next/link";
import { useCart } from "./cart-provider";

export function CartSummary() {
  const { totalPrice } = useCart();

  return (
    <div className="bg-white p-6 border border-brand-beige">
      <h2 className="font-serif text-xl text-brand-green mb-6">Resume</h2>
      <div className="space-y-3 text-sm">
        <div className="flex justify-between">
          <span className="text-brand-black/70">Sous-total</span>
          <span>{totalPrice.toFixed(2)} &euro;</span>
        </div>
        <div className="flex justify-between">
          <span className="text-brand-black/70">Livraison</span>
          <span className="text-brand-black/50">Calcule au checkout</span>
        </div>
        <div className="pt-3 border-t border-brand-beige flex justify-between font-medium text-base">
          <span>Total</span>
          <span className="text-brand-gold">{totalPrice.toFixed(2)} &euro;</span>
        </div>
      </div>
      <Link
        href="/checkout"
        className="mt-6 block text-center bg-brand-green text-brand-cream py-4 text-sm tracking-widest uppercase hover:bg-brand-green/90 transition-colors"
      >
        Passer la commande
      </Link>
    </div>
  );
}
```

**Step 3: Create Cart page**

Create `app/cart/page.tsx`:

```tsx
"use client";

import { useCart } from "@/components/cart/cart-provider";
import { CartItem } from "@/components/cart/cart-item";
import { CartSummary } from "@/components/cart/cart-summary";
import Link from "next/link";

export default function CartPage() {
  const { items } = useCart();

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-serif text-4xl text-brand-green mb-6">Panier</h1>
        <p className="text-brand-black/60 mb-8">Votre panier est vide.</p>
        <Link
          href="/shop"
          className="inline-block border border-brand-green text-brand-green px-8 py-3 text-sm tracking-widest uppercase hover:bg-brand-green hover:text-brand-cream transition-colors"
        >
          Continuer le shopping
        </Link>
      </main>
    );
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl text-brand-green mb-8">Panier</h1>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          {items.map((item) => (
            <CartItem key={`${item.productId}-${item.size}-${item.color}`} item={item} />
          ))}
        </div>
        <CartSummary />
      </div>
    </main>
  );
}
```

**Step 4: Run tests**

Run: `npm run test:run`
Expected: All tests PASS.

**Step 5: Commit**

```bash
git add -A
git commit -m "feat: add Cart page with CartItem, CartSummary components"
```

---

## Task 10: Checkout Page & API Route

**Files:**
- Create: `components/checkout/shipping-form.tsx`
- Create: `components/checkout/order-summary.tsx`
- Create: `app/checkout/page.tsx`
- Create: `app/api/checkout/route.ts`
- Create: `app/checkout/success/page.tsx`
- Create: `app/checkout/cancel/page.tsx`
- Test: `__tests__/app/api/checkout/route.test.ts`

**Step 1: Write failing test for checkout API route**

Create `__tests__/app/api/checkout/route.test.ts`:

```ts
import { describe, it, expect, vi, beforeEach } from "vitest";

const mockCreateOrder = vi.fn();
vi.mock("@/lib/woocommerce", () => ({
  createOrder: (...args: any[]) => mockCreateOrder(...args),
}));

describe("POST /api/checkout", () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it("creates a WooCommerce order and returns order id", async () => {
    mockCreateOrder.mockResolvedValueOnce({ id: 123 });

    const { POST } = await import("@/app/api/checkout/route");
    const body = {
      billing: {
        first_name: "Jean",
        last_name: "Dupont",
        email: "jean@test.com",
        phone: "0600000000",
        address_1: "1 rue de Paris",
        city: "Paris",
        postcode: "75001",
        country: "FR",
      },
      items: [{ product_id: 1, quantity: 2 }],
    };

    const request = new Request("http://localhost/api/checkout", {
      method: "POST",
      body: JSON.stringify(body),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    const data = await response.json();

    expect(response.status).toBe(200);
    expect(data.orderId).toBe(123);
    expect(mockCreateOrder).toHaveBeenCalledOnce();
  });

  it("returns 400 if billing info is missing", async () => {
    const { POST } = await import("@/app/api/checkout/route");
    const request = new Request("http://localhost/api/checkout", {
      method: "POST",
      body: JSON.stringify({ items: [] }),
      headers: { "Content-Type": "application/json" },
    });

    const response = await POST(request);
    expect(response.status).toBe(400);
  });
});
```

**Step 2: Run test to verify it fails**

Run: `npm run test:run`
Expected: FAIL.

**Step 3: Implement checkout API route**

Create `app/api/checkout/route.ts`:

```ts
import { NextResponse } from "next/server";
import { createOrder } from "@/lib/woocommerce";

export async function POST(request: Request) {
  const body = await request.json();

  if (!body.billing || !body.billing.email) {
    return NextResponse.json({ error: "Billing info required" }, { status: 400 });
  }

  const order = await createOrder({
    payment_method: "stripe",
    payment_method_title: "Carte bancaire",
    set_paid: false,
    billing: body.billing,
    shipping: body.billing,
    line_items: body.items,
  });

  return NextResponse.json({ orderId: order.id });
}
```

**Step 4: Implement ShippingForm**

Create `components/checkout/shipping-form.tsx`:

```tsx
"use client";

import { useState } from "react";
import { OrderBilling } from "@/lib/types";

interface ShippingFormProps {
  onSubmit: (billing: OrderBilling) => void;
  loading: boolean;
}

export function ShippingForm({ onSubmit, loading }: ShippingFormProps) {
  const [form, setForm] = useState<OrderBilling>({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    address_1: "",
    city: "",
    postcode: "",
    country: "FR",
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement>) {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    onSubmit(form);
  }

  const inputClass =
    "w-full border border-brand-beige px-4 py-3 text-sm focus:outline-none focus:border-brand-green transition-colors bg-white";

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-2 gap-4">
        <input name="first_name" placeholder="Prenom" value={form.first_name} onChange={handleChange} required className={inputClass} />
        <input name="last_name" placeholder="Nom" value={form.last_name} onChange={handleChange} required className={inputClass} />
      </div>
      <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} required className={inputClass} />
      <input name="phone" type="tel" placeholder="Telephone" value={form.phone} onChange={handleChange} required className={inputClass} />
      <input name="address_1" placeholder="Adresse" value={form.address_1} onChange={handleChange} required className={inputClass} />
      <div className="grid grid-cols-2 gap-4">
        <input name="city" placeholder="Ville" value={form.city} onChange={handleChange} required className={inputClass} />
        <input name="postcode" placeholder="Code postal" value={form.postcode} onChange={handleChange} required className={inputClass} />
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-brand-green text-brand-cream py-4 text-sm tracking-widest uppercase hover:bg-brand-green/90 transition-colors disabled:opacity-50"
      >
        {loading ? "Traitement..." : "Confirmer la commande"}
      </button>
    </form>
  );
}
```

**Step 5: Implement OrderSummary**

Create `components/checkout/order-summary.tsx`:

```tsx
"use client";

import { useCart } from "@/components/cart/cart-provider";

export function OrderSummary() {
  const { items, totalPrice } = useCart();

  return (
    <div className="bg-white p-6 border border-brand-beige">
      <h2 className="font-serif text-xl text-brand-green mb-6">Votre commande</h2>
      <div className="space-y-4">
        {items.map((item) => (
          <div key={`${item.productId}-${item.size}`} className="flex justify-between text-sm">
            <div>
              <p>{item.name} x{item.quantity}</p>
              {item.size && <p className="text-brand-black/50">Taille: {item.size}</p>}
            </div>
            <p className="text-brand-gold">{(item.price * item.quantity).toFixed(2)} &euro;</p>
          </div>
        ))}
        <div className="pt-4 border-t border-brand-beige flex justify-between font-medium">
          <span>Total</span>
          <span className="text-brand-gold">{totalPrice.toFixed(2)} &euro;</span>
        </div>
      </div>
    </div>
  );
}
```

**Step 6: Create Checkout page**

Create `app/checkout/page.tsx`:

```tsx
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useCart } from "@/components/cart/cart-provider";
import { ShippingForm } from "@/components/checkout/shipping-form";
import { OrderSummary } from "@/components/checkout/order-summary";
import { OrderBilling } from "@/lib/types";
import Link from "next/link";

export default function CheckoutPage() {
  const { items, clearCart } = useCart();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (items.length === 0) {
    return (
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
        <h1 className="font-serif text-4xl text-brand-green mb-6">Checkout</h1>
        <p className="text-brand-black/60 mb-8">Votre panier est vide.</p>
        <Link
          href="/shop"
          className="inline-block border border-brand-green text-brand-green px-8 py-3 text-sm tracking-widest uppercase hover:bg-brand-green hover:text-brand-cream transition-colors"
        >
          Continuer le shopping
        </Link>
      </main>
    );
  }

  async function handleSubmit(billing: OrderBilling) {
    setLoading(true);
    setError(null);

    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          billing,
          items: items.map((item) => ({
            product_id: item.productId,
            variation_id: item.variationId,
            quantity: item.quantity,
          })),
        }),
      });

      if (!res.ok) throw new Error("Erreur lors de la commande");

      clearCart();
      router.push("/checkout/success");
    } catch (err) {
      setError("Une erreur est survenue. Veuillez reessayer.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <h1 className="font-serif text-4xl text-brand-green mb-8">Checkout</h1>
      {error && (
        <div className="mb-6 p-4 bg-red-50 text-red-700 text-sm border border-red-200">
          {error}
        </div>
      )}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2">
          <h2 className="font-serif text-xl text-brand-green mb-6">Adresse de livraison</h2>
          <ShippingForm onSubmit={handleSubmit} loading={loading} />
        </div>
        <OrderSummary />
      </div>
    </main>
  );
}
```

**Step 7: Create success/cancel pages**

Create `app/checkout/success/page.tsx`:

```tsx
import Link from "next/link";

export default function CheckoutSuccess() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-20 text-center">
      <div className="mb-8 text-brand-gold text-6xl">&#10003;</div>
      <h1 className="font-serif text-4xl text-brand-green mb-4">Merci pour votre commande !</h1>
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
```

Create `app/checkout/cancel/page.tsx`:

```tsx
import Link from "next/link";

export default function CheckoutCancel() {
  return (
    <main className="max-w-2xl mx-auto px-4 py-20 text-center">
      <h1 className="font-serif text-4xl text-brand-green mb-4">Commande annulee</h1>
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
```

**Step 8: Run tests to verify they pass**

Run: `npm run test:run`
Expected: All tests PASS.

**Step 9: Verify full flow visually**

Run: `npm run dev`
- Navigate through: Home -> Shop -> Product -> Add to cart -> Cart -> Checkout
Expected: Complete flow works with mock data.

**Step 10: Commit**

```bash
git add -A
git commit -m "feat: add Checkout page, API route, success/cancel pages"
```

---

## Task 11: Final Polish & Configuration

**Files:**
- Modify: `next.config.ts` (image domains)
- Create: `public/placeholder/` (placeholder images)
- Modify: `app/layout.tsx` (metadata)

**Step 1: Configure next.config.ts for external images**

Update `next.config.ts`:

```ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**.woocommerce.com",
      },
      {
        protocol: "https",
        hostname: "**.wp.com",
      },
    ],
  },
};

export default nextConfig;
```

Note: Update the hostname when the actual WooCommerce domain is known.

**Step 2: Add placeholder SVG images**

Create simple placeholder SVGs in `public/placeholder/` for each mock product so the dev experience is complete without a WooCommerce backend.

**Step 3: Run full test suite**

Run: `npm run test:run`
Expected: All tests PASS.

**Step 4: Run build to verify no errors**

Run: `npm run build`
Expected: Build succeeds with no errors.

**Step 5: Commit**

```bash
git add -A
git commit -m "chore: final config, placeholder images, build verification"
```
