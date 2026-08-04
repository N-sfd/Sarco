"use client";

import { useEffect, useState } from "react";
import { UtilityHeader } from "@/components/layout/utility-header";
import { SearchHeader } from "@/components/search/search-header";
import { MainNav } from "@/components/layout/main-nav";
import { cn } from "@/lib/utils";

/**
 * Two-bar header:
 * 1) Utility — Location / Support / Account
 * 2) Main — Logo, Search, Cart icons + category navigation
 */
export function SiteHeader() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={cn(
        "sticky top-0 z-40 bg-white transition-[padding] duration-200",
        scrolled && "header-scrolled",
      )}
      data-scrolled={scrolled ? "true" : "false"}
    >
      <div className={cn(scrolled && "hidden nav:block nav:[&_.header-compact-hide]:hidden")}>
        <UtilityHeader />
      </div>
      <SearchHeader compact={scrolled} />
      <MainNav />
    </header>
  );
}
