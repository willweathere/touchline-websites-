"use client";

import { createContext, useContext, useEffect, useRef, useState } from "react";

const STORAGE_KEY = "touchline_cart_v1";
const CartContext = createContext(null);

export function CartProvider({ children }) {
  const [items, setItems] = useState([]);
  const hydrated = useRef(false);

  // Load once on mount.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {
      /* ignore */
    }
    hydrated.current = true;
  }, []);

  // Persist on change.
  useEffect(() => {
    if (!hydrated.current) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items]);

  const add = (pkg) =>
    setItems((prev) =>
      prev.some((i) => i.value === pkg.value)
        ? prev
        : [...prev, { value: pkg.value, name: pkg.name, setup: pkg.setup, monthly: pkg.monthly }]
    );
  const remove = (value) => setItems((prev) => prev.filter((i) => i.value !== value));
  const clear = () => setItems([]);
  const has = (value) => items.some((i) => i.value === value);

  const setupTotal = items.reduce((s, i) => s + i.setup, 0);
  const monthlyTotal = items.reduce((s, i) => s + i.monthly, 0);

  return (
    <CartContext.Provider
      value={{ items, add, remove, clear, has, count: items.length, setupTotal, monthlyTotal }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
