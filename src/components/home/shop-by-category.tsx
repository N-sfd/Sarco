"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { retailEase, useRetailMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";
import { shopCategories } from "@/data/homepage";

type CategoryItem = {
  title: string;
  href: string;
  image: string;
  objectPosition?: string;
  slug?: "refrigeration" | "cooking" | "dishwashers";
};

// shopCategories (src/data/homepage.ts) is the single source of truth for these
// images. The first 3 entries get the "featured" layout with custom framing;
// the remaining 5 render in the plain grid below.
const objectPositions: Record<string, string> = {
  Refrigeration: "center center",
  Cooking: "center 55%",
  Dishwashers: "center center",
};

const featuredCategories: CategoryItem[] = shopCategories.slice(0, 3).map((cat) => ({
  ...cat,
  objectPosition: objectPositions[cat.title],
  slug: cat.href.slice(1) as CategoryItem["slug"],
}));

const additionalCategories: CategoryItem[] = shopCategories.slice(3);

function FeaturedCategoryCard({
  title,
  href,
  image,
  objectPosition = "center center",
  className,
}: CategoryItem & { className?: string }) {
  return (
    <article className={cn("featured-category-card", className)}>
      <Link href={href} className="featured-category-card-link">
        <div className="featured-category-title">{title}</div>
        <div className="featured-category-image-wrapper">
          <Image
            src={image}
            alt={title}
            fill
            sizes="330px"
            className="featured-category-image"
            style={{ objectPosition }}
          />
        </div>
      </Link>
    </article>
  );
}

function AdditionalCategoryCard({ title, href, image }: CategoryItem) {
  return (
    <Link href={href} className="additional-category-card">
      <div className="additional-category-image-wrapper">
        <Image
          src={image}
          alt={title}
          fill
          sizes="(max-width: 680px) 100vw, (max-width: 1100px) 50vw, 240px"
          className="additional-category-image"
        />
      </div>
      <div className="additional-category-title">{title}</div>
    </Link>
  );
}

export function CategoryGrid() {
  const { shouldReduceMotion } = useRetailMotion();

  return (
    <>
      {/* Featured: Refrigeration / Cooking / Dishwashers only */}
      <section className="featured-category-section">
        {/* Desktop staggered composition */}
        <div className="featured-category-inner featured-category-desktop">
          <h2 className="featured-category-heading">Shop by Category</h2>

          <div className="kitchen-essentials-panel" aria-hidden>
            <p className="kitchen-essentials-label">Kitchen Essentials</p>
            <div className="kitchen-essentials-curve" />
          </div>

          <motion.div
            className="featured-category-card--refrigeration"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, ease: retailEase }}
          >
            <FeaturedCategoryCard {...featuredCategories[0]} className="h-full w-full" />
          </motion.div>

          <motion.div
            className="featured-category-card--cooking"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.08, ease: retailEase }}
          >
            <FeaturedCategoryCard {...featuredCategories[1]} className="h-full w-full" />
          </motion.div>

          <motion.div
            className="featured-category-card--dishwashers"
            initial={shouldReduceMotion ? false : { opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.55, delay: 0.16, ease: retailEase }}
          >
            <FeaturedCategoryCard {...featuredCategories[2]} className="h-full w-full" />
          </motion.div>
        </div>

        {/* Tablet / mobile featured grid — only the three cards */}
        <div className="featured-category-responsive">
          <h2 className="featured-category-heading-static">Shop by Category</h2>
          <div className="featured-category-responsive-grid">
            {featuredCategories.map((cat) => (
              <FeaturedCategoryCard
                key={cat.href}
                {...cat}
                className="featured-category-card--responsive"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Additional categories — separate section, never overlaps featured */}
      <section className="additional-category-section">
        <div className="additional-category-inner">
          <h2 className="additional-category-heading">Explore More Categories</h2>
          <div className="additional-category-grid">
            {additionalCategories.map((cat) => (
              <AdditionalCategoryCard key={cat.href} {...cat} />
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

export const ShopByCategory = CategoryGrid;
export function CategoryCard(props: CategoryItem & { index?: number }) {
  return <FeaturedCategoryCard {...props} className="h-[500px] max-w-[360px]" />;
}
