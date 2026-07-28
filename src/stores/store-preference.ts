"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

export type StoreLocation = {
  id: string;
  name: string;
  city: string;
  state: string;
  address: string;
  zip: string;
  phone: string;
  hours: string;
  lat: number;
  lng: number;
};

type StoreState = {
  preferredStore: StoreLocation | null;
  zipCode: string | null;
  setPreferredStore: (store: StoreLocation, zip?: string) => void;
  setZipCode: (zip: string) => void;
  clearStore: () => void;
};

export const useStorePreference = create<StoreState>()(
  persist(
    (set) => ({
      preferredStore: null,
      zipCode: null,
      setPreferredStore: (store, zip) =>
        set({ preferredStore: store, zipCode: zip ?? store.zip }),
      setZipCode: (zip) => set({ zipCode: zip }),
      clearStore: () => set({ preferredStore: null, zipCode: null }),
    }),
    { name: "sarco-store-preference", skipHydration: true },
  ),
);
