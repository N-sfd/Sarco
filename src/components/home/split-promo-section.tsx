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

// Image sits in front; one large rounded corner toward the text box.
const imageCornerClass = {
  left: "rounded-br-[28px] sm:rounded-br-[40px] min-[900px]:rounded-br-[72px]",
  right: "rounded-bl-[28px] sm:rounded-bl-[40px] min-[900px]:rounded-bl-[72px]",
};

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
      {/* Mobile: stacked */}
      <div className="min-[900px]:hidden">
        <div className={cn("px-7 py-7", bgMap[background])}>
          <h2 className="text-[22px] font-bold text-navy">{title}</h2>
          <p className="mt-3 text-[13px] leading-[1.65] text-muted">{description}</p>
          <Link
            href={href}
            className="btn btn-navy mt-5 w-full min-h-10 px-5 text-[13px] sm:w-fit"
          >
            {cta}
          </Link>
        </div>
        <div
          className={cn(
            "relative mt-3 h-[240px] w-full overflow-hidden",
            imageCornerClass[imagePosition],
          )}
        >
          <Image
            src={image}
            alt=""
            fill
            className="object-cover object-center"
            sizes="100vw"
          />
        </div>
      </div>

      {/* Desktop: text box behind, image in front (shifted slightly down) */}
      <div className="relative hidden min-[900px]:block">
        {/* Backend text box — taller so it peeks above & below the image */}
        <div
          className={cn(
            "relative flex min-h-[290px] w-[60%] items-center",
            bgMap[background],
            imageOnRight ? "mr-auto" : "ml-auto",
          )}
        >
          <div
            className={cn(
              "w-full py-8",
              imageOnRight
                ? "px-10 min-[1100px]:px-14"
                : // Clear image overlap when image is on the left
                  "pl-[30%] pr-10 min-[1100px]:pl-[32%] min-[1100px]:pr-14",
            )}
          >
            <h2 className="text-[22px] font-bold text-navy md:text-[26px]">{title}</h2>
            <p className="mt-3 max-w-[420px] text-[13px] leading-[1.65] text-muted md:text-[14px]">
              {description}
            </p>
            <Link
              href={href}
              className="btn btn-navy mt-5 w-fit min-h-10 px-5 text-[13px]"
            >
              {cta}
            </Link>
          </div>
        </div>

        {/* Frontend image — extends a little past the text box bottom */}
        <div
          className={cn(
            "absolute z-10 overflow-hidden",
            "top-[36px] -bottom-4 w-[54%]",
            imageOnRight ? "right-0" : "left-0",
            imageCornerClass[imagePosition],
          )}
        >
          {shouldReduceMotion ? (
            <Image
              src={image}
              alt=""
              fill
              className="object-cover object-center"
              sizes="54vw"
            />
          ) : (
            <motion.div
              className="absolute inset-[-3%]"
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
                sizes="54vw"
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  );
}
