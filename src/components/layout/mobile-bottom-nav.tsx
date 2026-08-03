"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, Search, ShoppingCart, Wrench } from "lucide-react";
import { useCart } from "@/stores/cart";
import { useUiStore } from "@/stores/wishlist";
import { cn } from "@/lib/utils";

const items = [
  { href: "/", label: "Home", icon: Home },
  { href: "#categories", label: "Categories", icon: LayoutGrid, action: "categories" as const },
  { href: "#search", label: "Search", icon: Search, action: "search" as const },
  { href: "/repair", label: "Repair", icon: Wrench },
  { href: "/cart", label: "Cart", icon: ShoppingCart },
];

export function MobileBottomNav() {
  const pathname = usePathname();
  const cartItems = useCart((s) => s.items);
  const itemCount = cartItems.reduce((n, i) => n + i.quantity, 0);
  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen);

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 border-t border-border bg-white nav:hidden"
      aria-label="Mobile bottom"
    >
      <ul className="grid grid-cols-5">
        {items.map((item) => {
          const active =
            item.href === "/"
              ? pathname === "/"
              : item.href.startsWith("/") &&
                !item.href.startsWith("#") &&
                pathname.startsWith(item.href);
          const Icon = item.icon;
          if (item.action === "categories") {
            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => setMobileNavOpen(true)}
                  className="flex min-h-11 w-full flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold text-muted"
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              </li>
            );
          }
          if (item.action === "search") {
            return (
              <li key={item.label}>
                <button
                  type="button"
                  onClick={() => {
                    const el = document.querySelector<HTMLInputElement>('input[aria-label="Search products"]');
                    el?.focus();
                    window.scrollTo({ top: 0, behavior: "smooth" });
                  }}
                  className="flex min-h-11 w-full flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold text-muted"
                >
                  <Icon className="h-5 w-5" />
                  {item.label}
                </button>
              </li>
            );
          }
          return (
            <li key={item.label}>
              <Link
                href={item.href}
                className={cn(
                  "relative flex min-h-11 flex-col items-center justify-center gap-0.5 py-2 text-[10px] font-semibold",
                  active ? "text-navy" : "text-muted",
                )}
              >
                <Icon className="h-5 w-5" />
                {item.label}
                {item.href === "/cart" && itemCount > 0 && (
                  <span className="absolute right-1/4 top-1 grid h-4 min-w-4 place-items-center bg-navy px-0.5 text-[9px] text-white">
                    {itemCount}
                  </span>
                )}
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}
