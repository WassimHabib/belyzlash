"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { CartItem } from "@/lib/types";

function getCartKey(item: {
  productId: number;
  size?: string;
  color?: string;
}): string {
  return `${item.productId}-${item.size ?? ""}-${item.color ?? ""}`;
}

interface CartContextType {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (productId: number, size?: string, color?: string) => void;
  updateQuantity: (
    productId: number,
    size: string | undefined,
    quantity: number
  ) => void;
  clearCart: () => void;
  drawerOpen: boolean;
  openDrawer: () => void;
  closeDrawer: () => void;
}

const CartContext = createContext<CartContextType | null>(null);

const STORAGE_KEY = "belyzlash-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [drawerOpen, setDrawerOpen] = useState(false);

  const openDrawer = useCallback(() => setDrawerOpen(true), []);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) setItems(JSON.parse(stored));
    } catch {
      // Ignore localStorage errors (e.g. SSR, corrupted data)
    }
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
    setDrawerOpen(true);
  }, []);

  const removeItem = useCallback(
    (productId: number, size?: string, color?: string) => {
      setItems((prev) =>
        prev.filter(
          (item) => getCartKey(item) !== getCartKey({ productId, size, color })
        )
      );
    },
    []
  );

  const updateQuantity = useCallback(
    (productId: number, size: string | undefined, quantity: number) => {
      if (quantity <= 0) {
        setItems((prev) =>
          prev.filter(
            (item) => getCartKey(item) !== getCartKey({ productId, size })
          )
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
  const totalPrice = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <CartContext.Provider
      value={{
        items,
        totalItems,
        totalPrice,
        addItem,
        removeItem,
        updateQuantity,
        clearCart,
        drawerOpen,
        openDrawer,
        closeDrawer,
      }}
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
