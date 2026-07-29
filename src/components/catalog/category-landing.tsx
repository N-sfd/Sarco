"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { warnDuplicateImages } from "@/lib/duplicate-images";

type SubtypeCard = { label: string; href: string; image: string };

export function CategoryLanding({
  title,
  description,
  heroImage,
  heroHref,
  heroCta,
  cards,
}: {
  title: string;
  description: string;
  heroImage: string;
  heroHref: string;
  heroCta: string;
  cards: SubtypeCard[];
}) {
  useEffect(() => {
    warnDuplicateImages([heroImage, ...cards.map((c) => c.image)], `${title} category page`);
  }, [heroImage, cards, title]);

  return (
    <div className="mb-10 border-b border-border pb-8">
      <div className="category-image-card">
        <Image src={heroImage} alt={title} fill priority sizes="(max-width: 768px) 100vw, 1200px" />
        <div className="absolute inset-0 flex flex-col justify-end bg-gradient-to-t from-navy/85 via-navy/25 to-transparent p-6 sm:p-8">
          <h1 className="text-2xl font-bold text-white sm:text-3xl">{title}</h1>
          <p className="mt-2 max-w-xl text-sm text-white/85 sm:text-base">{description}</p>
          <Link href={heroHref} className="btn btn-accent mt-4 w-fit">
            {heroCta}
          </Link>
        </div>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {cards.map((card) => (
          <Link key={card.href} href={card.href} className="group block">
            <div className="category-image-card rounded-sm">
              <Image
                src={card.image}
                alt={card.label}
                fill
                sizes="200px"
                className="object-contain bg-[#FAFBFC] p-3 transition-transform duration-300 group-hover:scale-105"
              />
            </div>
            <p className="mt-2 text-center text-[13px] font-semibold text-navy">{card.label}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}
