"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Menu, X, Phone, ChevronDown, UserRound, Truck } from "lucide-react";
import { cn } from "@/lib/utils";
import { useUI } from "@/lib/ui-store";
import { Logo } from "./logo";
import { ButtonLink } from "@/components/ui/button";

const nav = [
  { label: "Shop", href: "#sales", children: ["Kitchen", "Laundry", "Refrigeration", "Cooking"] },
  { label: "Packages", href: "#packages" },
  { label: "Repair Services", href: "#services", children: ["Refrigerator", "Washer & Dryer", "Dishwasher", "Oven & Range"] },
  { label: "Builders", href: "#builders" },
  { label: "Promotions", href: "#promotions" },
  { label: "Rebates", href: "#rebates" },
  { label: "Contact", href: "#contact" },
];

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { openAccount, openTracking, session } = useUI();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <>
      {/* Top utility bar */}
      <div className="hidden bg-navy text-white lg:block">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-2 text-xs">
          <p className="flex items-center gap-2 text-white/80">
            <span className="inline-block h-2 w-2 animate-pulse rounded-full bg-success" />
            Price Match Guarantee • Same-Day Service • Licensed & Insured • Factory Authorized
          </p>
          <div className="flex items-center gap-5 text-white/80">
            <a href="tel:+18005550199" className="flex items-center gap-1.5 font-semibold text-white transition hover:text-accent-400">
              <Phone className="h-3.5 w-3.5" /> 1-800-555-0199
            </a>
            <span className="text-white/30">|</span>
            <a href="#areas" className="transition hover:text-accent-400">Track Technician</a>
            <button onClick={() => openTracking()} className="flex items-center gap-1 transition hover:text-accent-400">
              <Truck className="h-3.5 w-3.5" /> Track Delivery
            </button>
            <button onClick={openAccount} className="flex items-center gap-1 transition hover:text-accent-400">
              <UserRound className="h-3.5 w-3.5" /> {session ? session.name.split(" ")[0] : "Customer Login"}
            </button>
          </div>
        </div>
      </div>

      {/* Main header */}
      <header
        id="top"
        className={cn(
          "sticky top-0 z-50 transition-all duration-500",
          scrolled ? "glass shadow-soft" : "bg-white/60 backdrop-blur-sm",
        )}
      >
        <div className="mx-auto flex max-w-7xl items-center justify-between gap-4 px-5 py-3 sm:px-6">
          <Logo />

          <nav className="hidden items-center gap-1 lg:flex" aria-label="Primary">
            {nav.map((item) => (
              <div key={item.label} className="group relative">
                <a
                  href={item.href}
                  className="flex items-center gap-1 rounded-full px-4 py-2 text-sm font-semibold text-navy/80 transition-colors hover:bg-navy/5 hover:text-navy"
                >
                  {item.label}
                  {item.children && <ChevronDown className="h-3.5 w-3.5 opacity-60 transition-transform group-hover:rotate-180" />}
                </a>
                {item.children && (
                  <div className="invisible absolute left-0 top-full w-52 translate-y-2 pt-2 opacity-0 transition-all duration-200 group-hover:visible group-hover:translate-y-0 group-hover:opacity-100">
                    <div className="glass rounded-2xl p-2 shadow-lift">
                      {item.children.map((c) => (
                        <a
                          key={c}
                          href={item.href}
                          className="block rounded-xl px-4 py-2.5 text-sm font-medium text-navy/75 transition hover:bg-royal/8 hover:text-royal"
                        >
                          {c}
                        </a>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          <div className="hidden items-center gap-3 lg:flex">
            <ButtonLink href="#sales" variant="outline" size="sm">
              Shop
            </ButtonLink>
            <ButtonLink href="#packages" variant="accent" size="sm">
              Kitchen Packages
            </ButtonLink>
          </div>

          <button
            onClick={() => setOpen(true)}
            className="grid h-11 w-11 place-items-center rounded-xl border border-navy/10 bg-white/70 text-navy lg:hidden"
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5" />
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              className="fixed inset-0 z-[60] bg-navy/40 backdrop-blur-sm lg:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
            />
            <motion.aside
              className="fixed right-0 top-0 z-[70] flex h-full w-[86%] max-w-sm flex-col bg-white shadow-lift lg:hidden"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
            >
              <div className="flex items-center justify-between border-b border-navy/10 px-5 py-4">
                <Logo />
                <button
                  onClick={() => setOpen(false)}
                  className="grid h-10 w-10 place-items-center rounded-xl border border-navy/10 text-navy"
                  aria-label="Close menu"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-5" aria-label="Mobile">
                {nav.map((item) => (
                  <a
                    key={item.label}
                    href={item.href}
                    onClick={() => setOpen(false)}
                    className="rounded-xl px-4 py-3.5 text-base font-semibold text-navy transition hover:bg-navy/5"
                  >
                    {item.label}
                  </a>
                ))}
              </nav>
              <div className="flex flex-col gap-3 border-t border-navy/10 p-5">
                <ButtonLink href="#packages" variant="accent" size="lg" onClick={() => setOpen(false)}>
                  Kitchen Packages
                </ButtonLink>
                <button
                  onClick={() => {
                    setOpen(false);
                    openAccount();
                  }}
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-navy/15 py-3 font-semibold text-navy"
                >
                  <UserRound className="h-4 w-4" /> {session ? session.name.split(" ")[0] : "My Account"}
                </button>
                <a
                  href="tel:+18005550199"
                  className="flex items-center justify-center gap-2 rounded-full border-2 border-navy/15 py-3 font-semibold text-navy"
                >
                  <Phone className="h-4 w-4" /> 1-800-555-0199
                </a>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
