"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { megaMenus } from "@/data/navigation";
import { useUiStore } from "@/stores/wishlist";
import { useStorePreference } from "@/stores/store-preference";

export function MobileNavDrawer() {
  const open = useUiStore((s) => s.mobileNavOpen);
  const setOpen = useUiStore((s) => s.setMobileNavOpen);
  const setStoreModalOpen = useUiStore((s) => s.setStoreModalOpen);
  const preferredStore = useStorePreference((s) => s.preferredStore);
  const [expanded, setExpanded] = useState<string | null>(null);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] nav:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-navy/50"
        aria-label="Close menu"
        onClick={() => setOpen(false)}
      />
      <aside className="absolute left-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-xl">
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <Logo />
          <button
            type="button"
            className="grid h-9 w-9 place-items-center border border-border"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          className="border-b border-border bg-surface px-4 py-3 text-left text-sm font-semibold text-navy"
          onClick={() => {
            setOpen(false);
            setStoreModalOpen(true);
          }}
        >
          {preferredStore
            ? `My Store: ${preferredStore.city}`
            : "Select store / ZIP code"}
        </button>

        <div className="flex-1 overflow-y-auto">
          {megaMenus.map((item) => {
            const isOpen = expanded === item.label;
            return (
              <div key={item.label} className="border-b border-border">
                <button
                  type="button"
                  className="flex w-full items-center justify-between px-4 py-3 text-left text-sm font-semibold text-navy"
                  onClick={() => setExpanded(isOpen ? null : item.label)}
                >
                  {item.label}
                  <ChevronDown className={`h-4 w-4 transition ${isOpen ? "rotate-180" : ""}`} />
                </button>
                {isOpen && (
                  <div className="bg-surface px-4 pb-3">
                    <Link
                      href={item.href}
                      className="mb-2 block text-xs font-bold uppercase text-accent"
                      onClick={() => setOpen(false)}
                    >
                      Shop all {item.label}
                    </Link>
                    {item.columns.map((col) => (
                      <div key={col.title} className="mb-3">
                        <p className="mb-1 text-[11px] font-bold uppercase text-muted">{col.title}</p>
                        <ul className="space-y-1">
                          {col.links.map((link) => (
                            <li key={link.href}>
                              <Link
                                href={link.href}
                                className="block py-1 text-sm text-navy"
                                onClick={() => setOpen(false)}
                              >
                                {link.label}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-border p-4">
          <Link href="/account" className="btn btn-outline" onClick={() => setOpen(false)}>
            Account
          </Link>
          <Link href="/cart" className="btn btn-primary" onClick={() => setOpen(false)}>
            Cart
          </Link>
        </div>
      </aside>
    </div>
  );
}
