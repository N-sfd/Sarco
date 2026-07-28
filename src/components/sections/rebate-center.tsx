"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Search, Mail, CheckCircle2 } from "lucide-react";
import { rebates } from "@/lib/data";
import { EASE } from "@/lib/utils";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";

const REBATE_STEPS = ["Submitted", "Processing", "Approved", "Mailed"] as const;

function hashRebateStatus(input: string) {
  let hash = 0;
  for (let i = 0; i < input.length; i++) hash = (hash * 31 + input.charCodeAt(i)) >>> 0;
  return hash % REBATE_STEPS.length;
}

export function RebateCenter() {
  const [rebateId, setRebateId] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [statusIndex, setStatusIndex] = useState<number | null>(null);

  return (
    <section id="rebates" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-12 lg:py-24">
      <SectionHeading
        eyebrow="Rebate Center"
        title="Manufacturer rebates, simplified"
        description="Stack these rebates on top of our everyday pricing — mail-in, instant, and online rebates from every major brand we carry."
      />

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rebates.map((rebate) => (
          <StaggerItem key={rebate.id}>
            <div className="flex h-full flex-col gap-3 rounded-3xl border border-navy/8 bg-white p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift">
              <div className="flex items-start justify-between gap-3">
                <span className="text-xs font-semibold uppercase tracking-wider text-royal">{rebate.brand}</span>
                <span className="rounded-full bg-accent px-3 py-1 text-xs font-bold text-white">{rebate.method}</span>
              </div>
              <h3 className="font-display text-lg font-bold text-navy">{rebate.title}</h3>
              <p className="text-2xl font-bold text-accent">{rebate.amount}</p>
              <p className="flex-1 text-sm leading-relaxed text-ink/60">{rebate.qualifying}</p>
              <div className="flex items-center justify-between border-t border-navy/8 pt-3 text-xs text-ink/50">
                <span>{rebate.category}</span>
                <span>Expires {rebate.expires}</span>
              </div>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>

      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: EASE }}
        className="mx-auto mt-14 max-w-2xl rounded-3xl border border-navy/8 bg-mist p-6 sm:p-8"
      >
        <h3 className="flex items-center gap-2 font-display text-lg font-bold text-navy">
          <Search className="h-5 w-5 text-royal" /> Check your rebate status
        </h3>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            setStatusIndex(hashRebateStatus(`${rebateId}${emailInput}`.toUpperCase() || "RB"));
          }}
          className="mt-4 flex flex-col gap-3 sm:flex-row"
        >
          <input
            required
            value={rebateId}
            onChange={(e) => setRebateId(e.target.value)}
            placeholder="Rebate ID (e.g. RB-4000)"
            className="w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/40 focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20"
          />
          <input
            required
            type="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
            placeholder="Email used at purchase"
            className="w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/40 focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20"
          />
          <button
            type="submit"
            className="inline-flex shrink-0 items-center justify-center gap-2 rounded-full bg-navy px-6 py-3 text-sm font-semibold text-white transition hover:bg-navy-600"
          >
            Check status
          </button>
        </form>

        {statusIndex !== null && (
          <div className="mt-6 flex items-center gap-2">
            {REBATE_STEPS.map((step, i) => (
              <div key={step} className="flex flex-1 items-center gap-2">
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full text-xs font-bold ${
                    i <= statusIndex ? "bg-royal text-white" : "bg-navy/10 text-navy/40"
                  }`}
                >
                  {i < statusIndex ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </span>
                <span className={`hidden text-xs font-semibold sm:block ${i === statusIndex ? "text-navy" : "text-ink/45"}`}>
                  {step}
                </span>
                {i < REBATE_STEPS.length - 1 && <span className="h-px flex-1 bg-navy/10" />}
              </div>
            ))}
          </div>
        )}
        <p className="mt-4 flex items-center gap-1.5 text-xs text-ink/40">
          <Mail className="h-3.5 w-3.5" /> Demo lookup for preview purposes — real rebate questions go to rebates@abcappliance.com.
        </p>
      </motion.div>
    </section>
  );
}
