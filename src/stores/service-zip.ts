"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";

type ServiceZipState = {
  zip: string | null;
  setZip: (zip: string) => void;
};

/** Last ZIP code checked in the service-availability modal, reused to prefill delivery/repair forms. */
export const useServiceZip = create<ServiceZipState>()(
  persist(
    (set) => ({
      zip: null,
      setZip: (zip) => set({ zip }),
    }),
    { name: "sarco-service-zip", skipHydration: true },
  ),
);
