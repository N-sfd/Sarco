"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { imageFromLeft, imageFromRight, useRetailMotion } from "@/lib/motion";

type Background = "lightBlue" | "skin" | "white";

type Props = {
  title: string;
  description: string;
  cta: string;
  href: string;
  image: string;
  /** Which side the image sits on. Text takes the opposite side. */
  imagePosition?: "left" | "right";
  background?: Background;
};

const bgMap: Record<Background, string> = {
  lightBlue: "bg-[#DCE9F3]",
  skin: "bg-[#FBF3EE]",
  white: "bg-white",
};

const imageCornerClass = {
  left: "rounded-br-[28px] sm:rounded-br-[40px] min-[900px]:rounded-br-[72px]",
  right: "rounded-bl-[28px] sm:rounded-bl-[40px] min-[900px]:rounded-bl-[72px]",
};

/**
 * One semantic section — responsive layout via CSS, not duplicate DOM trees.
 */
export function SplitPromoSection({
  title,
  description,
  cta,
  href,
  image,
  imagePosition = "right",
  background = "white",
}: Props) {
  const { shouldReduceMotion } = useRetailMotion();
  const variant = imagePosition === "left" ? imageFromLeft : imageFromRight;
  const imageOnRight = imagePosition === "right";

  return (
    <section className="mb-10 w-full bg-transparent md:mb-14">
      <div className="relative flex flex-col min-[900px]:block">
        <div
          className={cn(
            "order-1 px-7 py-7",
            bgMap[background],
            "min-[900px]:relative min-[900px]:flex min-[900px]:min-h-[290px] min-[900px]:w-[60%] min-[900px]:items-center min-[900px]:px-0 min-[900px]:py-0",
            imageOnRight ? "min-[900px]:mr-auto" : "min-[900px]:ml-auto",
          )}
        >
          <div
            className={cn(
              "w-full min-[900px]:py-8",
              imageOnRight
                ? "min-[900px]:px-10 min-[1100px]:px-14"
                : "min-[900px]:pl-[30%] min-[900px]:pr-10 min-[1100px]:pl-[32%] min-[1100px]:pr-14",
            )}
          >
            <h2 className="text-[22px] font-bold text-navy md:text-[26px]">{title}</h2>
            <p className="mt-3 max-w-[420px] text-[13px] leading-[1.65] text-muted md:text-[14px]">
              {description}
            </p>
            <Link
              href={href}
              className="btn btn-navy mt-5 w-full min-h-10 px-5 text-[13px] sm:w-fit"
            >
              {cta}
            </Link>
          </div>
        </div>

        <div
          className={cn(
            "relative order-2 mt-3 h-[240px] w-full overflow-hidden",
            imageCornerClass[imagePosition],
            "min-[900px]:absolute min-[900px]:z-10 min-[900px]:mt-0",
            "min-[900px]:top-[36px] min-[900px]:-bottom-4 min-[900px]:h-auto min-[900px]:w-[54%]",
            imageOnRight ? "min-[900px]:right-0" : "min-[900px]:left-0",
          )}
        >
          {shouldReduceMotion ? (
            <Image
              src={image}
              alt=""
              fill
              className="object-cover object-center"
              sizes="(max-width: 899px) 100vw, 54vw"
            />
          ) : (
            <motion.div
              className="absolute inset-0 min-[900px]:inset-[-3%]"
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.3 }}
              variants={variant}
            >
              <Image
                src={image}
                alt=""
                fill
                className="object-cover object-center"
                sizes="(max-width: 899px) 100vw, 54vw"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
