"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Plus, MessageCircleQuestion } from "lucide-react";
import { faqs } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";
import { EASE } from "@/lib/utils";

export function FAQ() {
  const [open, setOpen] = useState<number | null>(0);

  return (
    <section id="faq" className="mx-auto max-w-4xl px-5 py-16 sm:px-6 lg:px-12 lg:py-24">
      <SectionHeading
        eyebrow="FAQ"
        title="Questions? We've got answers"
        description="Everything you need to know about our sales, repairs, warranties, and service."
      />

      <div className="mt-12 space-y-3">
        {faqs.map((faq, i) => {
          const isOpen = open === i;
          return (
            <motion.div
              key={faq.q}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.04 }}
              className={`overflow-hidden rounded-2xl border transition-colors ${
                isOpen ? "border-royal/30 bg-white shadow-card" : "border-navy/8 bg-white shadow-soft"
              }`}
            >
              <button
                onClick={() => setOpen(isOpen ? null : i)}
                className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left"
                aria-expanded={isOpen}
              >
                <span className="font-display text-base font-semibold text-navy">{faq.q}</span>
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center rounded-full transition-all duration-300 ${
                    isOpen ? "rotate-45 bg-accent text-white" : "bg-mist text-navy"
                  }`}
                >
                  <Plus className="h-4 w-4" />
                </span>
              </button>
              <AnimatePresence initial={false}>
                {isOpen && (
                  <motion.div
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: EASE }}
                  >
                    <p className="px-5 pb-5 text-sm leading-relaxed text-ink/65">{faq.a}</p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          );
        })}
      </div>

      <div className="mt-10 flex flex-col items-center gap-4 rounded-3xl bg-mist p-8 text-center">
        <span className="grid h-12 w-12 place-items-center rounded-2xl bg-royal/10 text-royal">
          <MessageCircleQuestion className="h-6 w-6" />
        </span>
        <p className="font-display text-lg font-bold text-navy">Still have questions?</p>
        <p className="-mt-2 text-sm text-ink/60">Our friendly team is here to help 7 days a week.</p>
        <ButtonLink href="#contact" variant="primary">
          Contact Support
        </ButtonLink>
      </div>
    </section>
  );
}
