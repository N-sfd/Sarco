"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { imageFromRight, useRetailMotion } from "@/lib/motion";

/**
 * Grills — steel-blue text panel (left), image fills the remaining
 * width and bleeds to the right viewport edge, bottom-left rounded
 * corner only.
 */
export function GrillsPromo() {
  const { shouldReduceMotion } = useRetailMotion();

  return (
    <section className="grills-section w-full overflow-hidden bg-white">
      <div className="grid w-full grid-cols-1 items-stretch min-[900px]:grid-cols-[38%_62%]">
        <div className="flex items-center bg-[#B9CBE2]">
          <div className="w-full max-w-[470px] px-7 py-[42px] min-[900px]:ml-auto min-[900px]:px-14 min-[900px]:py-16">
            <h2 className="text-[22px] font-bold leading-tight !text-white">Grills</h2>
            <p className="mt-3 max-w-[230px] text-[14px] leading-[1.6] text-white/95">
              Build a better outdoor space with premium grills, smokers, and outdoor cooking accessories.
            </p>
            <Link
              href="/grills"
              className="mt-5 inline-flex h-10 items-center gap-2 bg-[#E96A50] px-4 text-[13px] font-bold text-white hover:bg-[#D9583E]"
            >
              Shop Grills
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>

        <div className="relative min-h-[320px] w-full overflow-hidden rounded-bl-[28px] sm:rounded-bl-[40px] min-[900px]:min-h-[430px] min-[900px]:rounded-bl-[72px]">
          {shouldReduceMotion ? (
            <Image
              src="/images/package-3.jpg"
              alt="Outdoor grill"
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
              variants={imageFromRight}
            >
              <Image
                src="/images/package-3.jpg"
                alt="Outdoor grill"
                fill
                className="object-cover object-center"
                sizes="(max-width: 899px) 100vw, 62vw"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
