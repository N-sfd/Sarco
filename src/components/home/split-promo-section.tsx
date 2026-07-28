"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { imageFromLeft, imageFromRight, useRetailMotion } from "@/lib/motion";

type Background = "lightBlue" | "white";

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
  white: "bg-white",
};

// image-right -> bottom-left rounded; image-left -> bottom-right rounded.
// 28px below 640px, 40px 640-899px, 72px at 900px+.
const cornerClass = {
  left: "rounded-bl-none rounded-br-[28px] sm:rounded-br-[40px] min-[900px]:rounded-br-[72px]",
  right: "rounded-br-none rounded-bl-[28px] sm:rounded-bl-[40px] min-[900px]:rounded-bl-[72px]",
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

  const textPanel = (
    <div className={cn("flex items-center", bgMap[background])}>
      <div
        className={cn(
          "w-full max-w-[470px] px-7 py-[42px] min-[900px]:px-14 min-[900px]:py-16",
          imagePosition === "left" ? "min-[900px]:mr-auto" : "min-[900px]:ml-auto",
        )}
      >
        <h2 className="text-[28px] font-bold text-navy md:text-[32px]">{title}</h2>
        <p className="mt-4 text-[15px] leading-[1.7] text-muted md:text-[16px]">{description}</p>
        <Link
          href={href}
          className="btn btn-primary mt-6 w-full min-h-11 px-[22px] text-[14px] sm:w-fit"
        >
          {cta}
        </Link>
      </div>
    </div>
  );

  const imagePanel = (
    <div
      className={cn(
        "relative min-h-[320px] w-full overflow-hidden min-[900px]:min-h-[430px]",
        cornerClass[imagePosition],
      )}
    >
      {shouldReduceMotion ? (
        <Image
          src={image}
          alt=""
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
          variants={variant}
        >
          <Image
            src={image}
            alt=""
            fill
            className="object-cover object-center"
            sizes="(max-width: 899px) 100vw, 62vw"
          />
        </motion.div>
      )}
    </div>
  );

  return (
    <section className="w-full overflow-hidden bg-white">
      <div
        className={cn(
          "grid w-full grid-cols-1 items-stretch",
          imagePosition === "left"
            ? "min-[900px]:grid-cols-[62%_38%]"
            : "min-[900px]:grid-cols-[38%_62%]",
        )}
      >
        {imagePosition === "left" ? (
          <>
            {imagePanel}
            {textPanel}
          </>
        ) : (
          <>
            {textPanel}
            {imagePanel}
          </>
        )}
      </div>
    </section>
  );
}
