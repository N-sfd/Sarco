"use client";

import Link from "next/link";
import { Heart, MapPin, Phone, ShoppingCart, User } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { siteConfig } from "@/config/site";
import { useCart } from "@/stores/cart";
import { useStorePreference } from "@/stores/store-preference";
import { useUiStore, useWishlist } from "@/stores/wishlist";

export function UtilityHeader() {
  const preferredStore = useStorePreference((s) => s.preferredStore);
  const zipCode = useStorePreference((s) => s.zipCode);
  const setStoreModalOpen = useUiStore((s) => s.setStoreModalOpen);
  const items = useCart((s) => s.items);
  const itemCount = items.reduce((n, i) => n + i.quantity, 0);
  const wishlistCount = useWishlist((s) => s.productIds.length);

  return (
    <div className="header-compact-hide hidden h-12 border-b border-[#E6EAF0] bg-white text-[13px] text-ink nav:block">
      <PageContainer className="flex h-full items-center justify-between gap-8 px-2">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <button
            type="button"
            onClick={() => setStoreModalOpen(true)}
            className="inline-flex items-center gap-[6px] font-semibold text-[#083B82] transition-colors duration-200 hover:text-accent"
          >
            <MapPin className="h-[18px] w-[18px]" strokeWidth={1.75} />
            My Store
          </button>
          <button
            type="button"
            onClick={() => setStoreModalOpen(true)}
            className="font-semibold text-[#083B82] transition-colors duration-200 hover:text-accent"
          >
            {preferredStore
              ? preferredStore.name.replace("Sarco Appliances — ", "")
              : "Select a Store"}
          </button>
          <button
            type="button"
            onClick={() => setStoreModalOpen(true)}
            className="font-semibold text-navy underline-offset-2 transition-colors duration-200 hover:text-accent hover:underline"
          >
            {zipCode ? `ZIP ${zipCode}` : "Add ZIP Code"}
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <Link
            href="/account"
            className="inline-flex items-center gap-[6px] font-semibold transition-colors duration-200 hover:text-accent"
          >
            <User className="h-[18px] w-[18px]" strokeWidth={1.75} /> Account
          </Link>
          <Link
            href="/account/favorites"
            className="inline-flex items-center gap-[6px] font-semibold transition-colors duration-200 hover:text-accent"
          >
            <Heart className="h-[18px] w-[18px]" strokeWidth={1.75} /> Favorites ({wishlistCount})
          </Link>
          <Link
            href="/locations"
            className="font-semibold transition-colors duration-200 hover:text-accent"
          >
            Store Locations
          </Link>
          <a
            href={`tel:${siteConfig.phoneTel}`}
            className="inline-flex items-center gap-[6px] font-semibold text-navy transition-colors duration-200 hover:text-accent"
          >
            <Phone className="h-[18px] w-[18px]" strokeWidth={1.75} /> {siteConfig.phone}
          </a>
          <Link
            href="/cart"
            className="inline-flex items-center gap-[6px] font-semibold text-navy transition-colors duration-200 hover:text-accent"
          >
            <ShoppingCart className="h-[18px] w-[18px]" strokeWidth={1.75} /> Cart ({itemCount})
          </Link>
        </div>
      </PageContainer>
    </div>
  );
}
