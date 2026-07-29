"use client";

import { useCompare } from "@/stores/wishlist";
import { cn } from "@/lib/utils";

/** Adds bottom padding when the sticky compare tray is visible. */
export function ShopMain({ children }: { children: React.ReactNode }) {
  const compareCount = useCompare((s) => s.productIds.length);

  return (
    <main
      id="main"
      className={cn(
        "flex-1 pb-16 transition-[padding] duration-200 lg:pb-0",
        compareCount > 0 && "pb-52 lg:pb-40",
      )}
    >
      {children}
    </main>
  );
}
