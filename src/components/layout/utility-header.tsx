"use client";

import Link from "next/link";
import { MapPin, Phone, User } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { businessConfig } from "@/config/business";
import { useUiStore } from "@/stores/wishlist";

/** Slim top bar: Location · Support · Account (cart lives in the main header). */
export function UtilityHeader() {
  const setServiceModalOpen = useUiStore((s) => s.setServiceModalOpen);

  return (
    <div className="header-compact-hide hidden h-10 border-b border-[#E6EAF0] bg-[#F8F9FB] text-[13px] text-ink nav:block">
      <PageContainer className="flex h-full items-center justify-between gap-6 px-2">
        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <span className="inline-flex items-center gap-[6px] font-semibold text-navy">
            <MapPin className="h-4 w-4" strokeWidth={1.75} />
            Hagerstown, MD &amp; surrounding areas
          </span>
          <button
            type="button"
            onClick={() => setServiceModalOpen(true)}
            className="font-semibold text-[#2563EB] underline-offset-2 transition-colors duration-200 hover:text-navy hover:underline"
          >
            Check Service Availability
          </button>
        </div>

        <div className="flex flex-wrap items-center gap-x-5 gap-y-1">
          <Link
            href="/contact"
            className="font-semibold text-navy transition-colors duration-200 hover:text-[#2563EB]"
          >
            Support
          </Link>
          <Link
            href="/account"
            className="inline-flex items-center gap-[6px] font-semibold text-navy transition-colors duration-200 hover:text-[#2563EB]"
          >
            <User className="h-4 w-4" strokeWidth={1.75} /> Account
          </Link>
          <a
            href={businessConfig.primaryContact.phoneHref}
            className="inline-flex items-center gap-[6px] font-semibold text-navy transition-colors duration-200 hover:text-[#2563EB]"
          >
            <Phone className="h-4 w-4" strokeWidth={1.75} />{" "}
            {businessConfig.primaryContact.phoneDisplay}
          </a>
        </div>
      </PageContainer>
    </div>
  );
}
