"use client";

import Link from "next/link";
import { Heart, MapPin, Phone, ShoppingCart, User } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { businessConfig } from "@/config/business";
import { useCart } from "@/stores/cart";
import { useUiStore, useWishlist } from "@/stores/wishlist";

export function UtilityHeader() {
  const setServiceModalOpen = useUiStore((s) => s.setServiceModalOpen);
  const items = useCart((s) => s.items);
  const itemCount = items.reduce((n, i) => n + i.quantity, 0);
  const wishlistCount = useWishlist((s) => s.productIds.length);

  return (
    <div className="header-compact-hide hidden h-12 border-b border-[#E6EAF0] bg-white text-[13px] text-ink nav:block">
      <PageContainer className="flex h-full items-center justify-between gap-8 px-2">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <span className="inline-flex items-center gap-[6px] font-semibold text-navy">
            <MapPin className="h-[18px] w-[18px]" strokeWidth={1.75} />
            Service Area: Hagerstown, MD and surrounding regions
          </span>
          <button
            type="button"
            onClick={() => setServiceModalOpen(true)}
            className="font-semibold text-[#083B82] underline-offset-2 transition-colors duration-200 hover:text-accent hover:underline"
          >
            Check Service Availability
          </button>
          <Link
            href="/track-delivery"
            className="font-semibold text-navy transition-colors duration-200 hover:text-accent"
          >
            Track Delivery
          </Link>
          <Link
            href="/repair/schedule"
            className="font-semibold text-navy transition-colors duration-200 hover:text-accent"
          >
            Schedule Repair
          </Link>
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
            href="/contact"
            className="font-semibold transition-colors duration-200 hover:text-accent"
          >
            Contact
          </Link>
          <a
            href={businessConfig.primaryContact.phoneHref}
            className="inline-flex items-center gap-[6px] font-semibold text-navy transition-colors duration-200 hover:text-accent"
          >
            <Phone className="h-[18px] w-[18px]" strokeWidth={1.75} /> {businessConfig.primaryContact.phoneDisplay}
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
