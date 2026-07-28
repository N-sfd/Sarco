"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";
import { MegaMenu } from "@/components/layout/mega-menu";
import { megaMenus } from "@/data/navigation";
import { cn } from "@/lib/utils";

export function MainNavigation() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <nav
      className="relative hidden min-h-[58px] bg-[#10283f] text-white shadow-[0_2px_10px_rgba(0,0,0,.06)] nav:block"
      aria-label="Primary"
    >
      <PageContainer className="flex min-h-[58px] items-stretch gap-0.5 nav:gap-1.5 2xl:gap-3">
        {megaMenus.map((item) => {
          const navLabel = item.navLabel ?? item.label;
          const isActive = active === item.label;
          return (
            <div
              key={item.label}
              className="relative shrink-0"
              onMouseEnter={() => setActive(item.label)}
              onMouseLeave={() => setActive(null)}
            >
              <Link
                href={item.href}
                className={cn(
                  "group relative flex h-[58px] items-center justify-center gap-1 whitespace-nowrap px-1.5 text-center text-[12px] font-semibold uppercase tracking-[0.02em] transition-colors duration-200 nav:px-2 2xl:px-2.5 2xl:text-[13px]",
                  isActive ? "text-white" : "hover:text-white/95",
                )}
              >
                <span className="whitespace-nowrap">{navLabel}</span>
                <ChevronDown className="hidden h-3.5 w-3.5 shrink-0 opacity-70 2xl:inline" />
                <span
                  className={cn(
                    "absolute inset-x-2 bottom-0 mx-auto h-[3px] bg-[#E96A50] transition-all duration-200",
                    isActive ? "w-[calc(100%-16px)]" : "w-0 group-hover:w-[calc(100%-16px)]",
                  )}
                />
              </Link>
              {isActive && <MegaMenu item={item} />}
            </div>
          );
        })}
      </PageContainer>
    </nav>
  );
}

export const MainNav = MainNavigation;
