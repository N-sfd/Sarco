"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Percent, CalendarClock, Zap, Calculator } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { formatCurrency } from "@/lib/utils";

export function Financing() {
  const [amount, setAmount] = useState(2500);
  const [months, setMonths] = useState(12);
  const monthly = amount / months;

  return (
    <section id="financing" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-12 lg:py-24">
      <div className="relative overflow-hidden rounded-[2.5rem] bg-gradient-to-br from-navy via-navy-600 to-royal p-8 shadow-lift sm:p-12 lg:p-16">
        <div className="pointer-events-none absolute inset-0 bg-grid opacity-20" />
        <div className="pointer-events-none absolute -right-20 -top-20 h-80 w-80 rounded-full bg-royal-400/25 blur-3xl" />

        <div className="relative grid items-center gap-10 lg:grid-cols-2">
          <Reveal>
            <span className="inline-flex items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90">
              Financing Made Easy
            </span>
            <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
              <span className="text-accent-400">$0 Down</span> &amp; 12-Month Special Financing
            </h2>
            <p className="mt-4 max-w-md text-white/70">
              Take it home today with $0 down and 0% interest for 12 months. Flexible monthly payments,
              fast approval in minutes, and no hidden fees.
            </p>

            <div className="mt-7 flex flex-wrap gap-5">
              {[
                { icon: Percent, label: "0% Interest" },
                { icon: CalendarClock, label: "Monthly Payments" },
                { icon: Zap, label: "Fast Approval" },
              ].map((f) => (
                <div key={f.label} className="flex items-center gap-2 text-sm font-medium text-white">
                  <span className="grid h-9 w-9 place-items-center rounded-xl bg-white/12 text-accent-400">
                    <f.icon className="h-4 w-4" />
                  </span>
                  {f.label}
                </div>
              ))}
            </div>

            <div className="mt-8">
              <ButtonLink href="#contact" variant="accent" size="lg">
                Apply Now
              </ButtonLink>
            </div>
          </Reveal>

          {/* Calculator card */}
          <Reveal direction="left">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="rounded-3xl bg-white/95 p-7 shadow-lift backdrop-blur"
            >
              <div className="flex items-center gap-2 text-navy">
                <Calculator className="h-5 w-5 text-royal" />
                <h3 className="font-display text-lg font-bold">Financing Calculator</h3>
              </div>

              <div className="mt-6 space-y-6">
                <div>
                  <div className="flex items-center justify-between text-sm">
                    <label htmlFor="amount" className="font-medium text-ink/70">
                      Purchase amount
                    </label>
                    <span className="font-bold text-navy">{formatCurrency(amount)}</span>
                  </div>
                  <input
                    id="amount"
                    type="range"
                    min={500}
                    max={12000}
                    step={100}
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    className="mt-3 w-full accent-accent"
                  />
                </div>

                <div>
                  <div className="flex items-center justify-between text-sm">
                    <label htmlFor="months" className="font-medium text-ink/70">
                      Term length
                    </label>
                    <span className="font-bold text-navy">{months} months</span>
                  </div>
                  <input
                    id="months"
                    type="range"
                    min={6}
                    max={36}
                    step={6}
                    value={months}
                    onChange={(e) => setMonths(Number(e.target.value))}
                    className="mt-3 w-full accent-royal"
                  />
                </div>

                <div className="rounded-2xl bg-mist p-5 text-center">
                  <p className="text-sm font-medium text-ink/55">Estimated monthly payment</p>
                  <p className="mt-1 font-display text-4xl font-extrabold text-navy">
                    {formatCurrency(monthly)}
                    <span className="text-base font-semibold text-ink/50">/mo</span>
                  </p>
                  <p className="mt-1 text-xs text-success">0% APR · No prepayment penalty</p>
                </div>
              </div>
            </motion.div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
