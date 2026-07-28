"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type WishlistState = {
  productIds: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggle: (productId) => {
        const has = get().productIds.includes(productId);
        set({
          productIds: has
            ? get().productIds.filter((id) => id !== productId)
            : [...get().productIds, productId],
        });
      },
      has: (productId) => get().productIds.includes(productId),
    }),
    { name: "sarco-wishlist", skipHydration: true },
  ),
);

type CompareState = {
  productIds: string[];
  toggle: (productId: string) => void;
  has: (productId: string) => boolean;
  clear: () => void;
};

export const useCompare = create<CompareState>()(
  persist(
    (set, get) => ({
      productIds: [],
      toggle: (productId) => {
        const ids = get().productIds;
        if (ids.includes(productId)) {
          set({ productIds: ids.filter((id) => id !== productId) });
          return;
        }
        if (ids.length >= 4) return;
        set({ productIds: [...ids, productId] });
      },
      has: (productId) => get().productIds.includes(productId),
      clear: () => set({ productIds: [] }),
    }),
    { name: "sarco-compare", skipHydration: true },
  ),
);

type UiState = {
  storeModalOpen: boolean;
  mobileNavOpen: boolean;
  mobileSearchOpen: boolean;
  quickViewSlug: string | null;
  setStoreModalOpen: (open: boolean) => void;
  setMobileNavOpen: (open: boolean) => void;
  setMobileSearchOpen: (open: boolean) => void;
  setQuickViewSlug: (slug: string | null) => void;
};

export const useUiStore = create<UiState>((set) => ({
  storeModalOpen: false,
  mobileNavOpen: false,
  mobileSearchOpen: false,
  quickViewSlug: null,
  setStoreModalOpen: (open) => set({ storeModalOpen: open }),
  setMobileNavOpen: (open) => set({ mobileNavOpen: open }),
  setMobileSearchOpen: (open) => set({ mobileSearchOpen: open }),
  setQuickViewSlug: (slug) => set({ quickViewSlug: slug }),
}));
