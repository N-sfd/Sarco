"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Check, Heart, Star } from "lucide-react";
import { availabilityLabel, products, type Availability, type Product } from "@/data/products";
import { businessConfig } from "@/config/business";
import { cn, estimateMonthlyPayment, formatCurrency } from "@/lib/utils";
import { retailEase, useRetailMotion } from "@/lib/motion";
import { useCart } from "@/stores/cart";
import { useCompare, useUiStore, useWishlist } from "@/stores/wishlist";
import { useUI } from "@/lib/ui-store";

const FINANCE_TERMS = [12, 24, 36] as const;

function purchaseAction(availability: Availability): "cart" | "inquire" | "call" {
  if (availability === "special_order") return "inquire";
  if (availability === "call") return "call";
  return "cart";
}

function RatingStars({ rating, reviewCount }: { rating: number; reviewCount: number }) {
  const filled = Math.max(0, Math.min(5, Math.round(rating)));
  return (
    <div className="flex min-h-[1.25rem] items-center gap-1.5 text-[13px]" aria-label={`${rating} out of 5 stars, ${reviewCount} reviews`}>
      <span className="flex shrink-0 gap-0.5" aria-hidden>
        {Array.from({ length: 5 }).map((_, i) => {
          const isFilled = i < filled;
          return (
            <Star
              key={i}
              className={cn(
                "h-3.5 w-3.5",
                isFilled ? "fill-[#d4a017] text-[#d4a017]" : "fill-transparent text-[#cbd5e1]",
              )}
              strokeWidth={1.75}
            />
          );
        })}
      </span>
      <span className="tabular-nums text-muted">({reviewCount})</span>
    </div>
  );
}

export function ProductCard({
  product,
  index = 0,
  animate = true,
}: {
  product: Product;
  index?: number;
  animate?: boolean;
}) {
  const { shouldReduceMotion } = useRetailMotion();
  const addItem = useCart((s) => s.addItem);
  const wishlistToggle = useWishlist((s) => s.toggle);
  const wishlisted = useWishlist((s) => s.has(product.id));
  const compareToggle = useCompare((s) => s.toggle);
  const compared = useCompare((s) => s.has(product.id));
  const comparedIds = useCompare((s) => s.productIds);
  const setQuickViewSlug = useUiStore((s) => s.setQuickViewSlug);
  const { showToast } = useUI();

  const [selectedColor, setSelectedColor] = useState(
    product.colorOptions?.find((c) => c.name === product.finish)?.name ??
      product.colorOptions?.[0]?.name ??
      product.finish,
  );
  const [financeOpen, setFinanceOpen] = useState(false);

  const activeColor = product.colorOptions?.find((c) => c.name === selectedColor);
  const displayImage = activeColor?.image ?? product.image;
  const displayFinish = selectedColor ?? product.finish;
  const price = product.salePrice ?? product.price;
  const savings = product.salePrice != null ? product.price - product.salePrice : 0;
  const action = purchaseAction(product.availability);
  const showInStockBadge =
    product.availability === "in_stock" || product.availability === "limited";

  const comparedCategory = products.find((p) => p.id === comparedIds[0])?.category;
  const compareDisabled =
    !compared &&
    (comparedIds.length >= 4 || (comparedCategory != null && product.category !== comparedCategory));
  const compareTitle = compareDisabled
    ? comparedIds.length >= 4
      ? "You can compare up to 4 products at a time"
      : `Only ${comparedCategory} products can be compared together`
    : undefined;

  const availabilityTone =
    product.availability === "in_stock" || product.availability === "limited"
      ? "text-success"
      : product.availability === "delivery"
        ? "text-[#2563EB]"
        : "text-muted";

  const card = (
    <article
      className={cn(
        "flex h-full flex-col border border-border bg-white p-3 transition-shadow duration-300 sm:p-4",
        animate && !shouldReduceMotion && "hover:shadow-md",
      )}
    >
      <div className="relative aspect-[4/3] w-full shrink-0 overflow-hidden border border-border/70 bg-[#FAFBFC]">
        <Image
          src={displayImage}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 50vw, 280px"
          className={cn(
            "object-contain p-4 transition-transform duration-300 sm:p-5",
            animate && !shouldReduceMotion && "group-hover:scale-[1.025]",
          )}
        />

        {showInStockBadge ? (
          <span className="absolute left-2 top-2 inline-flex items-center gap-1 bg-[#1f7a3f] px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-white shadow-sm sm:text-[11px]">
            <Check className="h-3 w-3 stroke-[3]" aria-hidden />
            In Stock
          </span>
        ) : null}

        {savings > 0 ? (
          <span className="absolute bottom-2 left-2 inline-flex items-center bg-success px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-white sm:text-[11px]">
            Save {formatCurrency(savings)}
          </span>
        ) : null}

        <button
          type="button"
          aria-label="Favorite"
          onClick={() => wishlistToggle(product.id)}
          className="absolute right-2 top-2 grid h-9 w-9 place-items-center border border-border bg-white/95 backdrop-blur-sm"
        >
          <Heart className={cn("h-4 w-4", wishlisted ? "fill-navy text-navy" : "text-navy")} />
        </button>
      </div>

      <div className="mt-3 flex min-h-0 flex-1 flex-col">
        <p className="text-[12px] font-bold uppercase tracking-wide text-muted">{product.brand}</p>
        <Link
          href={`/products/${product.slug}`}
          className="mt-1 line-clamp-2 min-h-[2.7em] text-[15px] font-semibold leading-[1.35] text-navy hover:text-[#2563EB] sm:text-[16px]"
        >
          {product.title}
        </Link>

        <div className="mt-1.5">
          <RatingStars rating={product.rating} reviewCount={product.reviewCount} />
        </div>

        <p className="mt-1.5 truncate text-[12px] text-muted">
          Model {product.model}
          {displayFinish ? ` · ${displayFinish}` : ""}
        </p>

        <div className="mt-2 flex min-h-[1.25rem] flex-wrap items-center gap-1.5" role="group" aria-label="Available finishes">
          {product.colorOptions && product.colorOptions.length > 1
            ? product.colorOptions.map((color) => {
                const selected = color.name === selectedColor;
                return (
                  <button
                    key={color.name}
                    type="button"
                    title={color.name}
                    aria-label={color.name}
                    aria-pressed={selected}
                    onClick={() => setSelectedColor(color.name)}
                    className={cn(
                      "h-5 w-5 rounded-full border transition",
                      selected ? "border-navy ring-2 ring-navy/30 ring-offset-1" : "border-border hover:border-navy",
                    )}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })
            : null}
        </div>

        <div className="mt-2 min-h-[3.6em]">
          {product.quickSpecs && product.quickSpecs.length > 0 ? (
            <ul className="space-y-0.5 text-[12px] leading-snug text-muted">
              {product.quickSpecs.slice(0, 3).map((spec) => (
                <li key={spec} className="flex gap-1.5">
                  <span className="mt-[0.45em] h-1 w-1 shrink-0 rounded-full bg-navy/40" aria-hidden />
                  <span className="line-clamp-1">{spec}</span>
                </li>
              ))}
            </ul>
          ) : null}
        </div>

        <div className="mt-3">
          <div className="flex flex-wrap items-baseline gap-2">
            <span className="text-[24px] font-extrabold tracking-tight text-navy sm:text-[26px]">
              {formatCurrency(price)}
            </span>
            {product.salePrice != null && (
              <span className="text-[13px] text-muted line-through">{formatCurrency(product.price)}</span>
            )}
          </div>

          <div className="relative mt-0.5">
            <button
              type="button"
              className="text-left text-[12px] font-normal text-muted underline-offset-2 hover:text-navy hover:underline"
              aria-expanded={financeOpen}
              onClick={() => setFinanceOpen((o) => !o)}
              onMouseEnter={() => setFinanceOpen(true)}
              onMouseLeave={() => setFinanceOpen(false)}
              onFocus={() => setFinanceOpen(true)}
              onBlur={() => setFinanceOpen(false)}
            >
              or {formatCurrency(product.financingMonthly)}/mo with financing
            </button>
            {financeOpen && (
              <div
                className="absolute left-0 z-20 mt-1 w-[220px] border border-border bg-white p-3 text-[12px] text-navy shadow-md"
                role="tooltip"
              >
                <p className="font-bold">Estimated monthly payments</p>
                <p className="mt-1 text-muted">0% promotional financing example on {formatCurrency(price)}</p>
                <ul className="mt-2 space-y-1">
                  {FINANCE_TERMS.map((months) => (
                    <li key={months} className="flex justify-between gap-3">
                      <span>{months} months</span>
                      <span className="font-semibold">
                        {formatCurrency(Math.round(estimateMonthlyPayment(price, months)))}/mo
                      </span>
                    </li>
                  ))}
                </ul>
                <Link href="/financing" className="mt-2 inline-block font-semibold text-[#2563EB] hover:underline">
                  View financing options →
                </Link>
              </div>
            )}
          </div>
        </div>

        <p className={cn("mt-2 text-[13px] font-semibold", availabilityTone)}>
          {availabilityLabel(product.availability)}
        </p>

        <label
          className={cn(
            "mt-2 flex items-center gap-2 text-[13px]",
            compareDisabled ? "text-muted/50" : "text-muted",
          )}
          title={compareTitle}
        >
          <input
            type="checkbox"
            checked={compared}
            disabled={compareDisabled}
            onChange={() => compareToggle(product.id)}
            className="h-4 w-4 accent-navy disabled:cursor-not-allowed"
          />
          Compare
        </label>

        <div className="mt-auto grid grid-cols-2 gap-2 pt-4">
          <button
            type="button"
            className="btn btn-outline btn-sm"
            onClick={() => setQuickViewSlug(product.slug)}
          >
            Quick View
          </button>
          {action === "cart" ? (
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => {
                addItem({
                  productId: product.id,
                  slug: product.slug,
                  title: product.title,
                  brand: product.brand,
                  image: displayImage,
                  price: product.price,
                  salePrice: product.salePrice,
                });
                showToast(`${product.title} added to cart`);
              }}
            >
              Add to Cart
            </button>
          ) : action === "call" ? (
            <a
              href={businessConfig.primaryContact.phoneHref}
              className="btn btn-navy btn-sm text-center leading-tight"
            >
              Call {businessConfig.primaryContact.phoneDisplay}
            </a>
          ) : (
            <Link href="/contact" className="btn btn-navy btn-sm text-center leading-tight">
              Inquire / Special Order
            </Link>
          )}
        </div>
      </div>
    </article>
  );

  if (!animate) return card;

  return (
    <motion.div
      className="group flex h-full"
      initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{
        duration: shouldReduceMotion ? 0.25 : 0.5,
        delay: shouldReduceMotion ? 0 : index * 0.06,
        ease: retailEase,
      }}
      whileHover={shouldReduceMotion ? undefined : { y: -4 }}
    >
      {card}
    </motion.div>
  );
}
