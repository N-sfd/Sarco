"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import {
  Star,
  ShieldCheck,
  BadgeCheck,
  ArrowRight,
  Truck,
  Percent,
} from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { siteImages } from "@/lib/data";
import { EASE } from "@/lib/utils";

const container = {
  hidden: {},
  show: { transition: { staggerChildren: 0.12, delayChildren: 0.08 } },
};
const item = {
  hidden: { opacity: 0, y: 28 },
  show: { opacity: 1, y: 0, transition: { duration: 0.7, ease: EASE } },
};

export function Hero() {
  return (
    <section className="relative overflow-hidden bg-mist pt-8 pb-14 sm:pt-12 lg:pt-16 lg:pb-20">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.45]" />
      <div className="pointer-events-none absolute -left-40 top-0 h-[30rem] w-[30rem] rounded-full bg-royal/10 blur-3xl" />
      <div className="pointer-events-none absolute -right-40 top-40 h-[32rem] w-[32rem] rounded-full bg-steel/10 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:gap-10 lg:px-12">
        <motion.div variants={container} initial="hidden" animate="show" className="max-w-xl">
          <motion.div variants={item} className="flex flex-wrap items-center gap-2">
            <span className="inline-flex items-center gap-2 rounded-full border border-royal/20 bg-white px-3.5 py-1.5 text-xs font-semibold text-royal shadow-soft">
              <BadgeCheck className="h-3.5 w-3.5" />
              Price Match Guarantee
            </span>
            <span className="inline-flex items-center gap-1.5 rounded-full border border-navy/10 bg-white px-3.5 py-1.5 text-xs font-semibold text-navy/70 shadow-soft">
              <span className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-3 w-3 fill-current" />
                ))}
              </span>
              4.9 · 2,100+ reviews
            </span>
          </motion.div>

          <motion.h1
            variants={item}
            className="mt-6 font-display text-4xl font-bold leading-[1.05] text-navy sm:text-5xl lg:text-[3.35rem]"
          >
            Save on kitchen &amp; home{" "}
            <span className="text-gradient">appliances</span>
          </motion.h1>

          <motion.p variants={item} className="mt-5 text-lg leading-relaxed text-ink/65">
            Shop in-stock brands, bundle kitchen packages, and get delivery, installation, and
            factory-trained repair — all from one local team you can trust.
          </motion.p>

          <motion.div variants={item} className="mt-8 flex flex-wrap items-center gap-3">
            <ButtonLink href="#sales" variant="primary" size="lg" className="group">
              Shop Appliances
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
            </ButtonLink>
            <ButtonLink href="#packages" variant="accent" size="lg">
              Kitchen Packages
            </ButtonLink>
            <ButtonLink href="#contact" variant="outline" size="lg">
              Book Repair
            </ButtonLink>
          </motion.div>

          <motion.div variants={item} className="mt-9 grid grid-cols-1 gap-3 sm:grid-cols-3">
            {[
              { icon: BadgeCheck, label: "Price Match", sub: "Guaranteed" },
              { icon: Truck, label: "Free Delivery*", sub: "& Install" },
              { icon: Percent, label: "$0 Down", sub: "12-Mo Financing" },
            ].map((f) => (
              <div
                key={f.label}
                className="flex items-center gap-3 rounded-2xl border border-navy/8 bg-white/80 px-3.5 py-3 shadow-soft"
              >
                <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-royal/10 text-royal">
                  <f.icon className="h-5 w-5" />
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold leading-tight text-navy">{f.label}</p>
                  <p className="text-xs text-ink/55">{f.sub}</p>
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: EASE, delay: 0.15 }}
          className="relative mx-auto w-full max-w-lg"
        >
          <div className="relative aspect-[4/5] overflow-hidden rounded-[2rem] shadow-lift">
            <Image
              src={siteImages.hero}
              alt="Modern kitchen with stainless steel appliances"
              fill
              priority
              sizes="(max-width: 1024px) 100vw, 520px"
              className="object-cover [transform:scale(1.3)_translateY(-16%)]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy-700/85 via-navy/20 to-transparent" />

            <div className="absolute left-5 top-5 right-5 flex items-start justify-between gap-3">
              <div className="rounded-2xl bg-white/95 p-3 pr-4 shadow-card backdrop-blur-sm">
                <p className="text-[0.65rem] font-bold uppercase tracking-[0.16em] text-royal">
                  In Stock Today
                </p>
                <p className="mt-0.5 text-sm font-bold text-navy">Ready for delivery</p>
              </div>
              <div className="flex items-center gap-2 rounded-2xl bg-accent px-3 py-2 text-xs font-bold text-white shadow-card">
                <ShieldCheck className="h-4 w-4" />
                Price Match
              </div>
            </div>

            <div className="absolute bottom-5 left-5 right-5 rounded-2xl bg-white/95 p-4 shadow-card backdrop-blur">
              <div className="flex items-center justify-between gap-3">
                <div className="relative h-12 w-12 overflow-hidden rounded-xl">
                  <Image
                    src={siteImages.heroSide}
                    alt="Featured appliance package"
                    fill
                    sizes="48px"
                    className="object-cover"
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-bold text-navy">Bundle &amp; Save</p>
                  <p className="text-xs text-ink/55">Kitchen packages from $2,199</p>
                </div>
                <a
                  href="#packages"
                  className="shrink-0 rounded-full bg-navy px-3.5 py-2 text-xs font-semibold text-white transition hover:bg-navy-600"
                >
                  View deals
                </a>
              </div>
            </div>
          </div>

          <motion.div
            className="absolute -bottom-4 left-1/2 hidden -translate-x-1/2 sm:block"
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          >
            <div className="glass flex items-center gap-3 rounded-2xl px-4 py-3 shadow-lift">
              <div className="flex text-gold">
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-current" />
                ))}
              </div>
              <div className="text-left">
                <p className="text-sm font-bold leading-none text-navy">4.9 / 5.0</p>
                <p className="text-xs text-ink/55">Google Reviews</p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
