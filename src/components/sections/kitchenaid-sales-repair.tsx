"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  ArrowRight,
  BadgeCheck,
  Clock3,
  ShieldCheck,
  ShoppingBag,
  Sparkles,
  Wrench,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { SectionHeading } from "@/components/ui/section-heading";
import { siteImages } from "@/lib/data";
import { EASE } from "@/lib/utils";

const salesHighlights = [
  {
    title: "Premium KitchenAid lineups",
    description: "Ranges, refrigerators, dishwashers, and built-in appliances in top finishes.",
  },
  {
    title: "Flexible financing",
    description: "Budget-friendly monthly options with fast approvals and transparent terms.",
  },
  {
    title: "Professional installation",
    description: "Factory-trained crews handle delivery, setup, and hookup with care.",
  },
  {
    title: "Warranty-backed confidence",
    description: "Every purchase comes with dependable coverage and expert post-sale support.",
  },
];

const repairHighlights = [
  "Same-day or next-day appointments for urgent appliance issues",
  "Certified technicians with genuine KitchenAid replacement parts",
  "Upfront diagnostics and transparent repair estimates",
  "90-day labor and parts guarantee on completed repairs",
];

export function KitchenAidSalesRepair() {
  return (
    <section id="kitchenaid-sales-repair" className="relative overflow-hidden bg-gradient-to-br from-mist via-white to-royal/8 py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.22]" />
      <div className="pointer-events-none absolute left-[-8rem] top-[-4rem] h-72 w-72 rounded-full bg-royal/10 blur-3xl" />
      <div className="pointer-events-none absolute bottom-[-4rem] right-[-4rem] h-80 w-80 rounded-full bg-accent/10 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <SectionHeading
          eyebrow="KitchenAid Sales & Repair"
          title="From showroom quality to long-term reliability"
          description="Discover premium KitchenAid appliances for your home and rely on fast, trusted service when something needs attention."
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.55, ease: EASE }}
          className="relative mt-10 aspect-[21/9] overflow-hidden rounded-[2rem] shadow-card sm:mt-12"
        >
          <Image
            src={siteImages.kitchenaid}
            alt="KitchenAid appliances in a modern kitchen"
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy/70 via-navy/30 to-transparent" />
          <div className="absolute bottom-5 left-5 right-5 sm:bottom-8 sm:left-8">
            <p className="font-display text-xl font-bold text-white sm:text-2xl">
              Premium KitchenAid · Sales &amp; Service
            </p>
          </div>
        </motion.div>

        <div className="mt-6 grid gap-6 lg:grid-cols-[1.15fr_0.85fr]">
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.55, ease: EASE }}
            className="rounded-[2rem] border border-navy/10 bg-white p-7 shadow-card sm:p-8"
          >
            <div className="flex items-center gap-3">
              <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-royal to-navy text-white shadow-card">
                <ShoppingBag className="h-6 w-6" />
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-[0.24em] text-royal">Sales</p>
                <h3 className="font-display text-2xl font-bold text-navy">Buy KitchenAid with confidence</h3>
              </div>
            </div>

            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {salesHighlights.map((item) => (
                <div key={item.title} className="rounded-2xl border border-navy/10 bg-mist p-4">
                  <h4 className="font-display text-base font-semibold text-navy">{item.title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">{item.description}</p>
                </div>
              ))}
            </div>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <ButtonLink href="#sales" variant="primary" size="md">
                Shop KitchenAid appliances
              </ButtonLink>
              <ButtonLink href="#contact" variant="outline" size="md">
                Schedule an install
              </ButtonLink>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
            className="relative overflow-hidden rounded-[2rem] border border-white/15 bg-gradient-to-br from-navy via-navy-600 to-royal p-7 text-white shadow-card sm:p-8"
          >
            <div className="absolute inset-0 bg-grid opacity-[0.12]" />
            <div className="relative">
              <div className="flex items-center gap-3">
                <div className="grid h-12 w-12 shrink-0 place-items-center rounded-2xl border border-white/20 bg-white/10 text-white">
                  <Wrench className="h-6 w-6" />
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-accent-400">Repair</p>
                  <h3 className="font-display text-2xl font-bold">Expert service for every KitchenAid appliance</h3>
                </div>
              </div>

              <div className="mt-8 space-y-3">
                {repairHighlights.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-2xl border border-white/12 bg-white/10 p-3 backdrop-blur-sm">
                    <BadgeCheck className="mt-0.5 h-5 w-5 shrink-0 text-accent-400" />
                    <p className="text-sm leading-relaxed text-white/80">{item}</p>
                  </div>
                ))}
              </div>

              <div className="mt-8 flex flex-wrap gap-3">
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white/90">
                  <Clock3 className="h-4 w-4 text-accent-400" /> Same-day appointments
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white/90">
                  <ShieldCheck className="h-4 w-4 text-accent-400" /> 90-day guarantee
                </span>
                <span className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-3 py-2 text-sm font-medium text-white/90">
                  <Sparkles className="h-4 w-4 text-accent-400" /> Genuine parts
                </span>
              </div>

              <ButtonLink href="#services" variant="accent" size="md" className="mt-8">
                Request repair service <ArrowRight className="h-4 w-4" />
              </ButtonLink>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
