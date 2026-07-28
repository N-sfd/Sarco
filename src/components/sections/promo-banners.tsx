"use client";

import Image from "next/image";
import { ArrowRight, BadgeCheck, Package, Percent } from "lucide-react";
import { siteImages } from "@/lib/data";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";

const banners = [
  {
    eyebrow: "In-Stock Appliances",
    title: "Get Our Price Match Guarantee",
    desc: "Shop thousands of ready-to-deliver models — and never overpay.",
    href: "#sales",
    cta: "Shop In-Stock",
    icon: BadgeCheck,
    image: siteImages.promoStock,
  },
  {
    eyebrow: "Buy More, Save More",
    title: "Bundle More — Save More",
    desc: "Pair kitchen packages and laundry sets for bigger automatic savings.",
    href: "#packages",
    cta: "View Packages",
    icon: Package,
    image: siteImages.promoBundle,
  },
  {
    eyebrow: "Buy Now, Pay Later",
    title: "$0 Down · 12-Month Special",
    desc: "Take it home today with special financing and fast approval.",
    href: "#financing",
    cta: "See Financing",
    icon: Percent,
    image: siteImages.promoFinance,
  },
];

export function PromoBanners() {
  return (
    <section aria-label="Featured offers" className="mx-auto max-w-7xl px-5 py-10 sm:px-6 lg:px-12">
      <StaggerGroup className="grid gap-4 lg:grid-cols-3">
        {banners.map((b) => (
          <StaggerItem key={b.title}>
            <a
              href={b.href}
              className="group relative flex h-full min-h-[240px] flex-col overflow-hidden rounded-[1.75rem] shadow-card transition-all duration-500 hover:-translate-y-1 hover:shadow-lift"
            >
              <Image
                src={b.image}
                alt={b.title}
                fill
                sizes="(max-width: 1024px) 100vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-700/95 via-navy/70 to-navy/35" />

              <div className="relative flex h-full flex-col p-7 text-white">
                <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[0.65rem] font-bold uppercase tracking-[0.16em] text-white/90 backdrop-blur-sm">
                  <b.icon className="h-3.5 w-3.5" />
                  {b.eyebrow}
                </span>

                <h3 className="mt-5 font-display text-2xl font-bold leading-tight sm:text-[1.65rem]">
                  {b.title}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-white/75">{b.desc}</p>

                <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold">
                  {b.cta}
                  <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                </span>
              </div>
            </a>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
