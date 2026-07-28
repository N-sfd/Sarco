"use client";

import { useState } from "react";
import { MapPin, Search, CheckCircle2, Navigation } from "lucide-react";
import { serviceAreas } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function ServiceAreas() {
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState(false);

  return (
    <section id="areas" className="relative overflow-hidden bg-navy py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.12]" />
      <div className="pointer-events-none absolute -right-32 top-10 h-96 w-96 rounded-full bg-royal/25 blur-3xl" />

      <div className="relative mx-auto grid max-w-7xl items-center gap-12 px-5 sm:px-6 lg:grid-cols-2 lg:px-12">
        <div>
          <SectionHeading
            light
            align="left"
            eyebrow="Service Areas"
            title="Fast, local service near you"
            description="We proudly serve the Maryland, Virginia, and Washington DC metro area with a 50-mile coverage radius."
          />

          <Reveal className="mt-8">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setChecked(true);
              }}
              className="flex max-w-md gap-2"
            >
              <div className="flex flex-1 items-center gap-2 rounded-full bg-white px-4 py-3">
                <MapPin className="h-5 w-5 text-royal" />
                <input
                  value={zip}
                  onChange={(e) => {
                    setZip(e.target.value);
                    setChecked(false);
                  }}
                  placeholder="Enter your ZIP code"
                  inputMode="numeric"
                  className="w-full bg-transparent text-navy placeholder:text-ink/40 focus:outline-none"
                  aria-label="ZIP code"
                />
              </div>
              <button className="flex items-center gap-1.5 rounded-full bg-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-accent-600">
                <Search className="h-4 w-4" /> Check
              </button>
            </form>
          </Reveal>

          {checked && zip && (
            <div className="mt-4 flex items-center gap-2 rounded-2xl bg-success/15 px-4 py-3 text-sm font-medium text-white">
              <CheckCircle2 className="h-5 w-5 text-success-400" />
              Great news — we service {zip}! Same-day appointments available.
            </div>
          )}

          <div className="mt-8 flex flex-wrap gap-2">
            {serviceAreas.map((area) => (
              <span
                key={area}
                className="rounded-full border border-white/15 bg-white/5 px-3.5 py-1.5 text-sm text-white/80 transition hover:border-accent/50 hover:text-white"
              >
                {area}
              </span>
            ))}
          </div>
        </div>

        {/* Stylized map */}
        <Reveal direction="left">
          <div className="relative aspect-square overflow-hidden rounded-[2rem] border border-white/10 bg-white/5 backdrop-blur-sm">
            <div className="absolute inset-0 bg-grid opacity-30" />
            {/* radius rings */}
            <div className="absolute left-1/2 top-1/2 h-3/4 w-3/4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-royal/30" />
            <div className="absolute left-1/2 top-1/2 h-1/2 w-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-accent/40" />
            <div className="absolute left-1/2 top-1/2 h-1/4 w-1/4 -translate-x-1/2 -translate-y-1/2 rounded-full border border-white/20" />

            {/* pins */}
            {[
              { top: "30%", left: "40%" },
              { top: "50%", left: "62%" },
              { top: "62%", left: "35%" },
              { top: "42%", left: "55%" },
              { top: "68%", left: "58%" },
            ].map((p, i) => (
              <span
                key={i}
                className="absolute -translate-x-1/2 -translate-y-full text-accent"
                style={{ top: p.top, left: p.left }}
              >
                <MapPin className="h-6 w-6 fill-accent/30" />
              </span>
            ))}

            {/* center HQ */}
            <div className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1">
              <span className="grid h-12 w-12 place-items-center rounded-full bg-accent text-white shadow-lift">
                <Navigation className="h-6 w-6" />
              </span>
              <span className="rounded-full bg-white px-2.5 py-0.5 text-xs font-bold text-navy shadow-card">
                HQ · Springfield
              </span>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
