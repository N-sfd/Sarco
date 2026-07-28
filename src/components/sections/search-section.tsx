"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, TrendingUp, Wrench, Package, Tag } from "lucide-react";
import { brands, products, services } from "@/lib/data";
import { EASE } from "@/lib/utils";

type Suggestion = { label: string; type: "Brand" | "Appliance" | "Service" | "Model"; icon: typeof Search };

export function SearchSection() {
  const [query, setQuery] = useState("");
  const [focused, setFocused] = useState(false);

  const pool: Suggestion[] = useMemo(() => {
    return [
      ...brands.map((b) => ({ label: b, type: "Brand" as const, icon: Tag })),
      ...products.map((p) => ({ label: p.name, type: "Appliance" as const, icon: Package })),
      ...services.map((s) => ({ label: s.name, type: "Service" as const, icon: Wrench })),
      { label: "Model # WRF535SWHZ", type: "Model" as const, icon: Search },
      { label: "Model # WM4000HWA", type: "Model" as const, icon: Search },
    ];
  }, []);

  const results = useMemo(() => {
    if (!query.trim()) return [];
    const q = query.toLowerCase();
    return pool.filter((s) => s.label.toLowerCase().includes(q)).slice(0, 6);
  }, [query, pool]);

  const popular = ["Refrigerator Repair", "LG Washer", "Same-Day Service", "Dishwasher Parts", "Bosch"];

  const handleSelect = (value: string) => {
    setQuery(value);
    setFocused(false);

    const normalized = value.toLowerCase();
    if (normalized.includes("repair") || normalized.includes("service")) {
      document.getElementById("services")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    if (normalized.includes("washer") || normalized.includes("refrigerator") || normalized.includes("dishwasher") || normalized.includes("range") || normalized.includes("oven")) {
      document.getElementById("sales")?.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }

    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section className="relative z-20 -mt-8 px-5 sm:px-6 lg:px-12">
      <div className="mx-auto max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: EASE }}
          className="glass rounded-3xl p-3 shadow-lift"
        >
          <div className="relative">
            <div className="flex items-center gap-3 rounded-2xl bg-white px-4 py-3 shadow-soft">
              <Search className="h-5 w-5 shrink-0 text-royal" />
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onFocus={() => setFocused(true)}
                onBlur={() => setTimeout(() => setFocused(false), 150)}
                placeholder="Search appliances, brands, model numbers or repair services…"
                className="w-full bg-transparent text-base text-navy placeholder:text-ink/40 focus:outline-none"
                aria-label="Search"
              />
              <button className="hidden shrink-0 rounded-xl bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-600 sm:block">
                Search
              </button>
            </div>

            <AnimatePresence>
              {focused && results.length > 0 && (
                <motion.ul
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  className="absolute left-0 right-0 top-full z-30 mt-2 overflow-hidden rounded-2xl bg-white p-2 shadow-lift"
                >
                  {results.map((r) => (
                    <li key={r.label + r.type}>
                      <button
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => handleSelect(r.label)}
                        className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left transition hover:bg-royal/6"
                      >
                        <span className="grid h-8 w-8 place-items-center rounded-lg bg-royal/8 text-royal">
                          <r.icon className="h-4 w-4" />
                        </span>
                        <span className="flex-1 text-sm font-medium text-navy">{r.label}</span>
                        <span className="rounded-full bg-mist px-2 py-0.5 text-[0.65rem] font-semibold uppercase tracking-wide text-ink/50">
                          {r.type}
                        </span>
                      </button>
                    </li>
                  ))}
                </motion.ul>
              )}
            </AnimatePresence>
          </div>

          <div className="flex flex-wrap items-center gap-2 px-3 pb-1 pt-3">
            <span className="flex items-center gap-1.5 text-xs font-semibold text-ink/50">
              <TrendingUp className="h-3.5 w-3.5" /> Popular:
            </span>
            {popular.map((p) => (
              <button
                key={p}
                onClick={() => handleSelect(p)}
                className="rounded-full border border-navy/10 bg-white px-3 py-1 text-xs font-medium text-navy/70 transition hover:border-royal hover:text-royal"
              >
                {p}
              </button>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
