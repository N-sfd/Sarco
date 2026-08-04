"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Truck, Recycle, Wrench, ShieldCheck } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { serviceCards } from "@/data/homepage";
import { retailEase, useRetailMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

const icons = [Truck, Recycle, Wrench, ShieldCheck];

export function ServiceBenefits() {
  const { shouldReduceMotion } = useRetailMotion();

  return (
    <section className="border-b border-border bg-white pt-12 pb-14">
      <PageContainer>
        <div className="grid grid-cols-1 gap-0 sm:grid-cols-2 lg:grid-cols-4">
          {serviceCards.map((card, i) => {
            const Icon = icons[i] ?? ShieldCheck;
            const isLast = i === serviceCards.length - 1;
            return (
              <article
                key={card.title}
                className={cn(
                  "service-benefit-card flex min-h-[170px] flex-col items-center px-2 py-6 text-center sm:px-5",
                  !isLast && "border-b border-border sm:border-b-0",
                  i % 2 === 0 && "sm:border-r sm:border-border",
                  i < 3 && "lg:border-r lg:border-border",
                  i >= 3 && "lg:border-r-0",
                  i < 2 && "sm:border-b sm:border-border lg:border-b-0",
                )}
              >
                <motion.div
                  className="service-icon-wrapper mx-auto mb-[18px] flex h-14 w-14 items-center justify-center rounded-full bg-[#2563EB]"
                  initial={
                    shouldReduceMotion
                      ? { y: 0, opacity: 1, x: 0 }
                      : { y: 20, opacity: 0, x: 0 }
                  }
                  whileInView={{ y: 0, opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{
                    duration: shouldReduceMotion ? 0.2 : 0.75,
                    delay: shouldReduceMotion ? 0 : i * 0.1,
                    ease: retailEase,
                  }}
                  whileHover={
                    shouldReduceMotion
                      ? undefined
                      : {
                          y: -4,
                          x: 0,
                          transition: { duration: 0.2 },
                        }
                  }
                >
                  <Icon className="h-[25px] w-[25px] text-white" strokeWidth={1.75} color="#FFFFFF" />
                </motion.div>
                <h2 className="text-[16px] font-semibold text-navy">{card.title}</h2>
                <p className="mt-2 max-w-[260px] text-[14px] leading-[1.55] text-muted">
                  {card.description}
                </p>
                <Link
                  href={card.href}
                  className="mt-auto pt-3 text-[14px] font-semibold text-navy hover:text-accent hover:underline"
                >
                  Learn More →
                </Link>
              </article>
            );
          })}
        </div>
      </PageContainer>
    </section>
  );
}

export const ServiceBenefitCards = ServiceBenefits;
