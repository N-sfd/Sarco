"use client";

import { useEffect } from "react";
import { useCart } from "@/stores/cart";
import { useWishlist, useCompare } from "@/stores/wishlist";
import { useServiceZip } from "@/stores/service-zip";

/**
 * Persisted zustand stores use `skipHydration: true` so the first client
 * render matches the server (avoiding a hydration mismatch), then rehydrate
 * from localStorage here, once, after mount.
 */
export function HydrateStores() {
  useEffect(() => {
    useCart.persist.rehydrate();
    useWishlist.persist.rehydrate();
    useCompare.persist.rehydrate();
    useServiceZip.persist.rehydrate();
  }, []);

  return null;
}
