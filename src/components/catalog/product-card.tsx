"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, Star } from "lucide-react";
import { availabilityLabel, type Product } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { retailEase, useRetailMotion } from "@/lib/motion";
import { useCart } from "@/stores/cart";
import { useCompare, useUiStore, useWishlist } from "@/stores/wishlist";
import { useStorePreference } from "@/stores/store-preference";

export function ProductCard({
  product,
  index = 0,
  animate = true,
}: {
  product: Product;
  index?: number;
  /** Enable scroll-reveal + hover motion (homepage carousel) */
  animate?: boolean;
}) {
  const { shouldReduceMotion } = useRetailMotion();
  const addItem = useCart((s) => s.addItem);
  const wishlistToggle = useWishlist((s) => s.toggle);
  const wishlisted = useWishlist((s) => s.has(product.id));
  const compareToggle = useCompare((s) => s.toggle);
  const compared = useCompare((s) => s.has(product.id));
  const store = useStorePreference((s) => s.preferredStore);
  const setQuickViewSlug = useUiStore((s) => s.setQuickViewSlug);
  const savings = product.salePrice != null ? product.price - product.salePrice : 0;

  const card = (
    <article
      className={`flex h-full min-w-[280px] flex-col border border-border bg-white p-5 transition-shadow duration-300 ${
        animate && !shouldReduceMotion ? "hover:shadow-md" : ""
      }`}
    >
      <div className="relative h-[240px] overflow-hidden bg-white">
        <Image
          src={product.image}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 80vw, 280px"
          className={`object-contain p-2 transition-transform duration-300 ${
            animate && !shouldReduceMotion ? "group-hover:scale-[1.025]" : ""
          }`}
        />
        <div className="absolute left-0 top-0 flex flex-col gap-1">
          {savings > 0 && (
            <span className="bg-accent px-2 py-1 text-[12px] font-bold uppercase text-white">
              Save {formatCurrency(savings)}
            </span>
          )}
        </div>
        <button
          type="button"
          aria-label="Favorite"
          onClick={() => wishlistToggle(product.id)}
          className="absolute right-0 top-0 grid h-11 w-11 place-items-center border border-border bg-white"
        >
          <Heart className={`h-5 w-5 ${wishlisted ? "fill-accent text-accent" : "text-navy"}`} />
        </button>
      </div>

      <div className="mt-4 flex flex-1 flex-col">
        <p className="text-[13px] font-bold uppercase tracking-wide text-muted">{product.brand}</p>
        <Link
          href={`/products/${product.slug}`}
          className="mt-1 line-clamp-3 text-[16px] font-semibold leading-snug text-navy hover:text-accent"
        >
          {product.title}
        </Link>
        <p className="mt-1 text-[12px] text-muted">Model {product.model}</p>

        <div className="mt-2 flex items-center gap-1.5 text-[14px]">
          <span className="flex text-gold">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className={`h-3.5 w-3.5 ${i < Math.round(product.rating) ? "fill-current" : "text-border"}`}
              />
            ))}
          </span>
          <span className="text-muted">({product.reviewCount})</span>
        </div>

        <div className="mt-3">
          {product.salePrice != null ? (
            <div className="flex flex-wrap items-baseline gap-2">
              <span className="text-[24px] font-bold text-navy">{formatCurrency(product.salePrice)}</span>
              <span className="text-[14px] text-muted line-through">{formatCurrency(product.price)}</span>
            </div>
          ) : (
            <span className="text-[24px] font-bold text-navy">{formatCurrency(product.price)}</span>
          )}
          <p className="mt-1 text-[13px] text-muted">
            or {formatCurrency(product.financingMonthly)}/mo with financing
          </p>
        </div>

        <p className="mt-2 text-[13px] font-semibold text-success">
          {availabilityLabel(product.availability, store?.city ?? null)}
        </p>

        <label className="mt-3 flex items-center gap-2 text-[13px] text-muted">
          <input
            type="checkbox"
            checked={compared}
            onChange={() => compareToggle(product.id)}
            className="h-4 w-4 accent-navy"
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
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() =>
              addItem({
                productId: product.id,
                slug: product.slug,
                title: product.title,
                brand: product.brand,
                image: product.image,
                price: product.price,
                salePrice: product.salePrice,
              })
            }
          >
            Add to Cart
          </button>
        </div>
      </div>
    </article>
  );

  if (!animate) return card;

  return (
    <motion.div
      className="group h-full"
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
