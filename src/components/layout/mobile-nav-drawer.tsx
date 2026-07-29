"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ChevronDown, MapPin, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { mainNavigation, companyLinks } from "@/config/navigation";
import { useUiStore } from "@/stores/wishlist";
import { useDialog } from "@/lib/use-dialog";

export function MobileNavDrawer() {
  const open = useUiStore((s) => s.mobileNavOpen);
  const setOpen = useUiStore((s) => s.setMobileNavOpen);
  const setServiceModalOpen = useUiStore((s) => s.setServiceModalOpen);
  const [openMobileMenu, setOpenMobileMenu] = useState<string | null>(null);
  const [openNested, setOpenNested] = useState<string | null>(null);
  const pathname = usePathname();
  const [menuPath, setMenuPath] = useState(pathname);

  // Close accordion when the route changes (adjust state during render).
  if (pathname !== menuPath) {
    setMenuPath(pathname);
    if (openMobileMenu !== null) setOpenMobileMenu(null);
    if (openNested !== null) setOpenNested(null);
  }

  const resetMenus = () => {
    setOpenMobileMenu(null);
    setOpenNested(null);
  };

  const close = () => {
    resetMenus();
    setOpen(false);
  };

  const dialogRef = useDialog<HTMLElement>(open, close);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[70] nav:hidden">
      <button
        type="button"
        className="absolute inset-0 bg-navy/50"
        aria-label="Close menu"
        onClick={close}
      />
      <aside
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-label="Site navigation"
        tabIndex={-1}
        className="absolute left-0 top-0 flex h-full w-[88%] max-w-sm flex-col bg-white shadow-xl outline-none"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <Logo />
          <button
            type="button"
            className="grid h-11 w-11 place-items-center border border-border"
            aria-label="Close"
            onClick={close}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <button
          type="button"
          className="flex items-center gap-2 border-b border-border bg-surface px-4 py-3 text-left text-sm font-semibold text-navy"
          onClick={() => {
            close();
            setServiceModalOpen(true);
          }}
        >
          <MapPin className="h-4 w-4 shrink-0 text-accent" />
          Check Service Availability
        </button>

        <div className="flex-1 overflow-y-auto">
          {mainNavigation.map((item) => {
            const isOpen = openMobileMenu === item.key;
            return (
              <div key={item.key} className="mobile-nav-section">
                <button
                  type="button"
                  className="mobile-nav-trigger"
                  data-open={isOpen ? "true" : "false"}
                  aria-expanded={isOpen}
                  aria-controls={`mobile-submenu-${item.key}`}
                  onClick={() => {
                    setOpenMobileMenu(isOpen ? null : item.key);
                    setOpenNested(null);
                  }}
                >
                  <span>{item.label}</span>
                  <ChevronDown
                    className={`h-4 w-4 transition-transform duration-[180ms] ${isOpen ? "rotate-180" : ""}`}
                    aria-hidden
                  />
                </button>

                {isOpen ? (
                  <div id={`mobile-submenu-${item.key}`} className="mobile-nav-panel">
                    <Link
                      href={item.href}
                      className="mobile-nav-shop-all"
                      onClick={close}
                    >
                      {item.key === "brands" ? "View All Brands" : `Shop All ${item.label}`}
                    </Link>

                    {item.columns.map((col, i) => {
                      const nestedKey = `${item.key}-${col.title ?? i}`;
                      const nestedOpen = openNested === nestedKey;
                      const hasNestedToggle = item.columns.length > 1;

                      if (!hasNestedToggle) {
                        return (
                          <div key={nestedKey} className="mobile-nav-nested">
                            {col.title ? (
                              <p className="mobile-nav-nested-heading px-[28px] py-2">{col.title}</p>
                            ) : null}
                            <ul className="mobile-nav-nested-list">
                              {col.links.map((link) => (
                                <li key={link.href + link.label}>
                                  <Link
                                    href={link.href}
                                    className="mobile-nav-link"
                                    onClick={close}
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                        );
                      }

                      return (
                        <div key={nestedKey} className="mobile-nav-nested">
                          <button
                            type="button"
                            className="mobile-nav-nested-trigger"
                            aria-expanded={nestedOpen}
                            onClick={() =>
                              setOpenNested(nestedOpen ? null : nestedKey)
                            }
                          >
                            <span className="mobile-nav-nested-heading">{col.title}</span>
                            <ChevronDown
                              className={`h-3.5 w-3.5 transition-transform duration-[180ms] ${nestedOpen ? "rotate-180" : ""}`}
                              aria-hidden
                            />
                          </button>
                          {nestedOpen ? (
                            <ul className="mobile-nav-nested-list">
                              {col.links.map((link) => (
                                <li key={link.href + link.label}>
                                  <Link
                                    href={link.href}
                                    className="mobile-nav-link"
                                    onClick={close}
                                  >
                                    {link.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          ) : null}
                        </div>
                      );
                    })}
                  </div>
                ) : null}
              </div>
            );
          })}

          <div className="mobile-nav-section">
            <button
              type="button"
              className="mobile-nav-trigger"
              data-open={openMobileMenu === "company" ? "true" : "false"}
              aria-expanded={openMobileMenu === "company"}
              onClick={() =>
                setOpenMobileMenu(openMobileMenu === "company" ? null : "company")
              }
            >
              <span>Company</span>
              <ChevronDown
                className={`h-4 w-4 transition-transform duration-[180ms] ${openMobileMenu === "company" ? "rotate-180" : ""}`}
                aria-hidden
              />
            </button>
            {openMobileMenu === "company" ? (
              <div className="mobile-nav-panel">
                <ul className="mobile-nav-nested-list">
                  {companyLinks.map((link) => (
                    <li key={link.href}>
                      <Link
                        href={link.href}
                        className="mobile-nav-link"
                        onClick={close}
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : null}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-2 border-t border-border p-4">
          <Link href="/account" className="btn btn-outline" onClick={close}>
            Account
          </Link>
          <Link href="/cart" className="btn btn-primary" onClick={close}>
            Cart
          </Link>
        </div>
      </aside>
    </div>
  );
}
