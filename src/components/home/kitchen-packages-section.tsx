"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { imageFromRight, useRetailMotion } from "@/lib/motion";

/**
 * Kitchen Packages — light-blue text panel (left), image fills the
 * remaining width and bleeds to the right viewport edge, bottom-left
 * rounded corner only.
 */
export function KitchenPackagesSection() {
  const { shouldReduceMotion } = useRetailMotion();

  return (
    <section className="kitchen-packages-section w-full overflow-hidden bg-white">
      <div className="kitchen-packages-inner grid w-full grid-cols-1 items-stretch min-[900px]:grid-cols-[38%_62%]">
        <div className="kitchen-packages-copy flex items-center bg-[#DCE9F3]">
          <div className="w-full max-w-[470px] px-7 py-[42px] min-[900px]:ml-auto min-[900px]:px-14 min-[900px]:py-16">
            <h2 className="text-[28px] font-bold leading-[1.15] text-[#10283F] md:text-[34px]">
              Kitchen Packages
            </h2>
            <p className="mt-4 text-[15px] leading-[1.7] text-[#526274] md:text-[16px]">
              Create a coordinated kitchen with matching refrigeration, cooking, dishwashing, and
              ventilation appliances.
            </p>
            <Link
              href="/kitchen-packages"
              className="mt-[26px] inline-flex h-[46px] w-full items-center justify-center rounded-[3px] bg-[#E96A50] px-6 text-[14px] font-bold text-white hover:bg-[#D9583E] sm:w-auto"
            >
              Shop Kitchen Packages
            </Link>
          </div>
        </div>

        <div className="kitchen-packages-image-wrapper relative min-h-[320px] w-full overflow-hidden rounded-bl-[28px] sm:rounded-bl-[40px] min-[900px]:min-h-[430px] min-[900px]:rounded-bl-[72px]">
          {shouldReduceMotion ? (
            <Image
              src="/images/package-1.jpg"
              alt=""
              fill
              className="kitchen-packages-image object-cover object-center"
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
                src="/images/package-1.jpg"
                alt=""
                fill
                className="kitchen-packages-image object-cover object-center"
                sizes="(max-width: 899px) 100vw, 62vw"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
