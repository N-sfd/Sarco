"use client";

import Image from "next/image";
import { ArrowRight, Sparkles } from "lucide-react";
import { kitchenPackages } from "@/lib/data";
import { formatCurrency, EASE } from "@/lib/utils";
import { useUI } from "@/lib/ui-store";
import { SectionHeading } from "@/components/ui/section-heading";
import { motion } from "framer-motion";

export function KitchenPackages() {
  const { openQuote } = useUI();

  return (
    <section id="packages" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-12 lg:py-24">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading
          align="left"
          eyebrow="Kitchen Packages"
          title="Bundle more, save more — simple as that"
          description="Complete brand suites designed to match. Free delivery, expert install, and package pricing that beats buying piece by piece."
        />
        <button
          onClick={() => openQuote({ type: "package", id: "", name: "" })}
          className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white shadow-card transition hover:bg-navy-600 hover:shadow-lift hover:-translate-y-0.5"
        >
          Build my package
        </button>
      </div>

      <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {kitchenPackages.map((pkg, i) => (
          <motion.article
            key={pkg.name}
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.5, delay: (i % 3) * 0.08, ease: EASE }}
            className="group relative flex flex-col overflow-hidden rounded-[1.75rem] border border-navy/8 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
          >
            <div className="relative aspect-[16/10] overflow-hidden">
              <Image
                src={pkg.image}
                alt={`${pkg.brand} ${pkg.name}`}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-navy-700/80 via-navy/20 to-transparent" />

              {pkg.popular && (
                <span className="absolute left-4 top-4 inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white shadow-sm">
                  <Sparkles className="h-3 w-3" /> Most Popular
                </span>
              )}

              <div className="absolute inset-x-0 bottom-0 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/70">{pkg.brand}</p>
                <h3 className="mt-1 font-display text-xl font-bold text-white">{pkg.name}</h3>
              </div>
            </div>

            <div className="flex flex-1 flex-col p-5">
              <p className="text-sm leading-relaxed text-ink/60">{pkg.pieces}</p>

              <div className="mt-4 flex items-end justify-between gap-3">
                <div>
                  <p className="text-xs font-semibold text-accent">{pkg.save}</p>
                  <p className="mt-0.5 text-sm text-ink/50">
                    From <span className="text-lg font-bold text-navy">{formatCurrency(pkg.from)}</span>
                  </p>
                </div>
                <button
                  onClick={() => openQuote({ type: "package", id: pkg.name, name: pkg.name })}
                  className="inline-flex items-center gap-1.5 rounded-full bg-navy px-4 py-2.5 text-xs font-semibold text-white transition hover:bg-navy-600"
                >
                  Get quote <ArrowRight className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
