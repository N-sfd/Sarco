"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Star, Quote, ChevronLeft, ChevronRight, BadgeCheck } from "lucide-react";
import { reviews } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { EASE } from "@/lib/utils";

const sourceColor: Record<string, string> = {
  Google: "text-royal",
  Yelp: "text-accent",
  Facebook: "text-royal-600",
};

export function Reviews() {
  const [page, setPage] = useState(0);
  const [dir, setDir] = useState(1);
  const perPage = 3;
  const pages = Math.ceil(reviews.length / perPage);

  const paginate = (d: number) => {
    setDir(d);
    setPage((p) => (p + d + pages) % pages);
  };

  const current = reviews.slice(page * perPage, page * perPage + perPage);

  return (
    <section id="reviews" className="relative overflow-hidden bg-mist py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="Customer Reviews"
            title="Loved by thousands of homeowners"
            description="Real, verified reviews from Google, Yelp, and Facebook. See why we're the region's top-rated appliance team."
          />
          <div className="flex items-center gap-3">
            <button
              onClick={() => paginate(-1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-navy/12 bg-white text-navy transition hover:border-royal hover:text-royal"
              aria-label="Previous reviews"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={() => paginate(1)}
              className="grid h-11 w-11 place-items-center rounded-full border border-navy/12 bg-white text-navy transition hover:border-royal hover:text-royal"
              aria-label="Next reviews"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <div className="relative mt-12 min-h-[20rem]">
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={page}
              custom={dir}
              initial={{ opacity: 0, x: dir * 60 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: dir * -60 }}
              transition={{ duration: 0.5, ease: EASE }}
              className="grid grid-cols-1 gap-5 md:grid-cols-3"
            >
              {current.map((r) => (
                <article
                  key={r.name}
                  className="flex flex-col rounded-3xl border border-navy/8 bg-white p-6 shadow-soft"
                >
                  <div className="flex items-center justify-between">
                    <Quote className="h-8 w-8 text-royal/20" />
                    <span className={`text-sm font-bold ${sourceColor[r.source]}`}>{r.source}</span>
                  </div>
                  <div className="mt-3 flex text-gold">
                    {Array.from({ length: r.rating }).map((_, i) => (
                      <Star key={i} className="h-4 w-4 fill-current" />
                    ))}
                  </div>
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-ink/70">&ldquo;{r.text}&rdquo;</p>
                  <div className="mt-5 flex items-center gap-3 border-t border-navy/8 pt-4">
                    <span className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-navy to-royal text-sm font-bold text-white">
                      {r.initials}
                    </span>
                    <div>
                      <p className="flex items-center gap-1 text-sm font-bold text-navy">
                        {r.name}
                        {r.verified && <BadgeCheck className="h-4 w-4 text-success" />}
                      </p>
                      <p className="text-xs text-ink/50">{r.location}</p>
                    </div>
                  </div>
                </article>
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex justify-center gap-2">
          {Array.from({ length: pages }).map((_, i) => (
            <button
              key={i}
              onClick={() => {
                setDir(i > page ? 1 : -1);
                setPage(i);
              }}
              className={`h-2 rounded-full transition-all ${i === page ? "w-8 bg-accent" : "w-2 bg-navy/20"}`}
              aria-label={`Go to review page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
