"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { imageFromLeft, useRetailMotion } from "@/lib/motion";

/**
 * Securing Your Home — image fills the left side and bleeds to the
 * left viewport edge (bottom-right rounded corner only), white text
 * panel on the right.
 */
export function SecuringYourHomePromo() {
  const { shouldReduceMotion } = useRetailMotion();

  return (
    <section className="security-section w-full overflow-hidden bg-white">
      <div className="grid w-full grid-cols-1 items-stretch min-[900px]:grid-cols-[62%_38%]">
        <div className="relative min-h-[320px] w-full overflow-hidden rounded-br-[28px] sm:rounded-br-[40px] min-[900px]:min-h-[430px] min-[900px]:rounded-br-[72px]">
          {shouldReduceMotion ? (
            <Image
              src="/images/hero-appliances.jpg"
              alt="Smart home security"
              fill
              className="object-cover object-center"
              sizes="(max-width: 899px) 100vw, 62vw"
            />
          ) : (
            <motion.div
              className="absolute inset-[-3%]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={imageFromLeft}
            >
              <Image
                src="/images/hero-appliances.jpg"
                alt="Smart home security"
                fill
                className="object-cover object-center"
                sizes="(max-width: 899px) 100vw, 62vw"
              />
            </motion.div>
          )}
        </div>

        <div className="flex items-center bg-white">
          <div className="w-full max-w-[470px] px-7 py-[42px] min-[900px]:mr-auto min-[900px]:px-14 min-[900px]:py-16">
            <h2 className="text-[22px] font-bold leading-tight text-[#252525]">
              Securing Your Home
            </h2>
            <p className="mt-3 text-[14px] leading-[1.6] text-[#555555]">
              Explore smart-home monitoring, appliance protection, leak detection, cameras, and
              connected-home packages.
            </p>
            <Link
              href="/smart-home"
              className="mt-5 inline-flex h-10 items-center gap-2 bg-[#E96A50] px-4 text-[13px] font-bold text-white hover:bg-[#D9583E]"
            >
              Learn More
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
