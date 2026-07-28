"use client";

import { Phone, Mail, MapPin, Star, ShieldCheck, ArrowRight } from "lucide-react";
import { useUI } from "@/lib/ui-store";
import { Logo } from "./logo";

const socials: { label: string; path: string }[] = [
  {
    label: "Facebook",
    path: "M22 12a10 10 0 1 0-11.56 9.88v-6.99H7.9V12h2.54V9.8c0-2.5 1.49-3.89 3.77-3.89 1.09 0 2.24.2 2.24.2v2.46h-1.26c-1.24 0-1.63.77-1.63 1.56V12h2.78l-.44 2.89h-2.34v6.99A10 10 0 0 0 22 12Z",
  },
  {
    label: "Instagram",
    path: "M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 0 1-1.38-.9 3.7 3.7 0 0 1-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16Zm0 3.18A6.66 6.66 0 1 0 18.66 12 6.66 6.66 0 0 0 12 5.34Zm0 10.99A4.33 4.33 0 1 1 16.33 12 4.33 4.33 0 0 1 12 16.33Zm6.92-11.25a1.56 1.56 0 1 1-1.56-1.56 1.56 1.56 0 0 1 1.56 1.56Z",
  },
  {
    label: "YouTube",
    path: "M23.5 6.2a3.02 3.02 0 0 0-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.51A3.02 3.02 0 0 0 .5 6.2 31.4 31.4 0 0 0 0 12a31.4 31.4 0 0 0 .5 5.8 3.02 3.02 0 0 0 2.12 2.14c1.88.51 9.38.51 9.38.51s7.5 0 9.38-.51a3.02 3.02 0 0 0 2.12-2.14A31.4 31.4 0 0 0 24 12a31.4 31.4 0 0 0-.5-5.8ZM9.6 15.6V8.4l6.2 3.6Z",
  },
  {
    label: "LinkedIn",
    path: "M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05a3.75 3.75 0 0 1 3.37-1.85c3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.55V9h3.57Z",
  },
];

type FooterLink = { label: string; href?: string; action?: "account" | "tracking" };

const columns: { title: string; links: FooterLink[] }[] = [
  {
    title: "Shop",
    links: [
      { label: "Kitchen Appliances" },
      { label: "Laundry" },
      { label: "Refrigeration" },
      { label: "Cooking" },
      { label: "Dishwashers" },
      { label: "Parts & Accessories" },
    ],
  },
  {
    title: "Repair Services",
    links: [
      { label: "Refrigerator Repair" },
      { label: "Washer Repair" },
      { label: "Dryer Repair" },
      { label: "Oven Repair" },
      { label: "Dishwasher Repair" },
      { label: "Commercial" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us" },
      { label: "Careers" },
      { label: "Service Areas", href: "#areas" },
      { label: "Financing", href: "#financing" },
      { label: "Rebate Center", href: "#rebates" },
      { label: "Reviews", href: "#reviews" },
      { label: "Blog", href: "#blog" },
    ],
  },
  {
    title: "Support",
    links: [
      { label: "Book Service", href: "#contact" },
      { label: "Track Technician", href: "#areas" },
      { label: "Track My Delivery", action: "tracking" },
      { label: "Warranty Registration" },
      { label: "Order History", action: "account" },
      { label: "FAQ", href: "#faq" },
      { label: "Contact", href: "#contact" },
    ],
  },
];

export function Footer() {
  const { openAccount, openTracking } = useUI();

  return (
    <footer className="relative overflow-hidden bg-navy text-white">
      <div className="pointer-events-none absolute inset-0 bg-radial-royal opacity-60" />
      <div className="pointer-events-none absolute -top-24 right-0 h-72 w-72 rounded-full bg-royal/20 blur-3xl" />

      {/* Newsletter */}
      <div className="relative border-b border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-start justify-between gap-6 px-6 py-12 md:flex-row md:items-center">
          <div>
            <h3 className="font-display text-2xl font-bold">Save on your next appliance</h3>
            <p className="mt-1 text-white/65">Join 40,000+ subscribers for exclusive deals, rebates & repair tips.</p>
          </div>
          <form className="flex w-full max-w-md gap-2" aria-label="Newsletter signup">
            <input
              type="email"
              required
              placeholder="Enter your email"
              className="w-full rounded-full border border-white/15 bg-white/10 px-5 py-3 text-sm text-white placeholder:text-white/50 focus:border-accent focus:outline-none"
            />
            <button
              type="submit"
              className="flex shrink-0 items-center gap-1.5 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-600"
            >
              Subscribe <ArrowRight className="h-4 w-4" />
            </button>
          </form>
        </div>
      </div>

      {/* Main */}
      <div className="relative mx-auto grid max-w-7xl grid-cols-2 gap-8 px-6 py-14 md:grid-cols-3 lg:grid-cols-6">
        <div className="col-span-2">
          <Logo light />
          <p className="mt-4 max-w-xs text-sm leading-relaxed text-white/65">
            Professional appliance sales and expert repair for residential and commercial customers since 2001.
            Licensed, insured, and factory authorized.
          </p>
          <div className="mt-5 space-y-2 text-sm text-white/75">
            <a href="tel:+18005550199" className="flex items-center gap-2 transition hover:text-accent-400">
              <Phone className="h-4 w-4 text-accent" /> 1-800-555-0199
            </a>
            <a href="mailto:hello@abcappliance.com" className="flex items-center gap-2 transition hover:text-accent-400">
              <Mail className="h-4 w-4 text-accent" /> hello@abcappliance.com
            </a>
            <p className="flex items-center gap-2">
              <MapPin className="h-4 w-4 text-accent" /> 1200 Commerce Drive, Springfield, MD
            </p>
          </div>
          <div className="mt-5 flex gap-2">
            {socials.map((s) => (
              <a
                key={s.label}
                href="#"
                className="grid h-9 w-9 place-items-center rounded-lg border border-white/15 bg-white/5 text-white/80 transition hover:border-accent hover:bg-accent hover:text-white"
                aria-label={s.label}
              >
                <svg viewBox="0 0 24 24" className="h-4 w-4" fill="currentColor" aria-hidden="true">
                  <path d={s.path} />
                </svg>
              </a>
            ))}
          </div>
        </div>

        {columns.map((col) => (
          <div key={col.title}>
            <h4 className="font-display text-sm font-semibold uppercase tracking-wider text-white/90">{col.title}</h4>
            <ul className="mt-4 space-y-2.5">
              {col.links.map((link) =>
                link.action ? (
                  <li key={link.label}>
                    <button
                      onClick={link.action === "account" ? openAccount : () => openTracking()}
                      className="text-sm text-white/60 transition hover:translate-x-0.5 hover:text-accent-400"
                    >
                      {link.label}
                    </button>
                  </li>
                ) : (
                  <li key={link.label}>
                    <a
                      href={link.href ?? "#"}
                      className="text-sm text-white/60 transition hover:translate-x-0.5 hover:text-accent-400"
                    >
                      {link.label}
                    </a>
                  </li>
                ),
              )}
            </ul>
          </div>
        ))}
      </div>

      {/* Trust badges */}
      <div className="relative border-t border-white/10">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-6 py-6 md:flex-row">
          <div className="flex flex-wrap items-center gap-5 text-sm text-white/70">
            <span className="flex items-center gap-2">
              <span className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </span>
              4.9 Google Rating
            </span>
            <span className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" /> BBB Accredited A+
            </span>
            <span className="rounded-md border border-white/15 px-2.5 py-1 text-xs font-semibold">Licensed & Insured</span>
          </div>
          <p className="text-xs text-white/50">
            © {new Date().getFullYear()} ABC Appliance Sales & Repair. All rights reserved. &nbsp;·&nbsp;
            <a href="#" className="hover:text-white">Privacy</a> ·{" "}
            <a href="#" className="hover:text-white">Terms</a>
          </p>
        </div>
      </div>
    </footer>
  );
}
