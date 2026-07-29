"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type CartLine = {
  productId: string;
  slug: string;
  title: string;
  brand: string;
  image: string;
  price: number;
  salePrice?: number;
  quantity: number;
  addInstallation?: boolean;
  addHaulAway?: boolean;
  addProtection?: boolean;
};

type CartState = {
  items: CartLine[];
  savedItems: CartLine[];
  addItem: (item: Omit<CartLine, "quantity"> & { quantity?: number }) => void;
  removeItem: (productId: string) => void;
  updateQty: (productId: string, quantity: number) => void;
  toggleService: (productId: string, service: "addInstallation" | "addHaulAway" | "addProtection") => void;
  saveForLater: (productId: string) => void;
  moveToCart: (productId: string) => void;
  removeSaved: (productId: string) => void;
  clear: () => void;
  itemCount: () => number;
  subtotal: () => number;
};

export const useCart = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      savedItems: [],
      addItem: (item) => {
        const existing = get().items.find((i) => i.productId === item.productId);
        if (existing) {
          set({
            items: get().items.map((i) =>
              i.productId === item.productId
                ? { ...i, quantity: i.quantity + (item.quantity ?? 1) }
                : i,
            ),
          });
        } else {
          set({ items: [...get().items, { ...item, quantity: item.quantity ?? 1 }] });
        }
      },
      removeItem: (productId) =>
        set({ items: get().items.filter((i) => i.productId !== productId) }),
      updateQty: (productId, quantity) =>
        set({
          items:
            quantity <= 0
              ? get().items.filter((i) => i.productId !== productId)
              : get().items.map((i) =>
                  i.productId === productId ? { ...i, quantity } : i,
                ),
        }),
      toggleService: (productId, service) =>
        set({
          items: get().items.map((i) =>
            i.productId === productId ? { ...i, [service]: !i[service] } : i,
          ),
        }),
      saveForLater: (productId) => {
        const item = get().items.find((i) => i.productId === productId);
        if (!item) return;
        set({
          items: get().items.filter((i) => i.productId !== productId),
          savedItems: [...get().savedItems.filter((i) => i.productId !== productId), item],
        });
      },
      moveToCart: (productId) => {
        const item = get().savedItems.find((i) => i.productId === productId);
        if (!item) return;
        set({
          savedItems: get().savedItems.filter((i) => i.productId !== productId),
          items: [...get().items.filter((i) => i.productId !== productId), item],
        });
      },
      removeSaved: (productId) =>
        set({ savedItems: get().savedItems.filter((i) => i.productId !== productId) }),
      clear: () => set({ items: [] }),
      itemCount: () => get().items.reduce((n, i) => n + i.quantity, 0),
      subtotal: () =>
        get().items.reduce(
          (sum, i) => sum + (i.salePrice ?? i.price) * i.quantity,
          0,
        ),
    }),
    { name: "sarco-cart", skipHydration: true },
  ),
);
