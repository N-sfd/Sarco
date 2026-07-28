"use client";

import { useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star } from "lucide-react";
import { products, availabilityLabel } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { AddToCartButton } from "@/components/catalog/add-to-cart-button";
import { useUiStore } from "@/stores/wishlist";

export function QuickViewModal() {
  const slug = useUiStore((s) => s.quickViewSlug);
  const close = () => useUiStore.getState().setQuickViewSlug(null);
  const product = slug ? products.find((p) => p.slug === slug) : undefined;

  useEffect(() => {
    if (!slug) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [slug]);

  if (!product) return null;

  const savings = product.salePrice != null ? product.price - product.salePrice : 0;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-navy/50 px-4 py-10">
      <div className="absolute inset-0" onClick={close} aria-hidden />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        className="relative z-10 w-full max-w-3xl border border-border bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 id="quick-view-title" className="text-base font-bold text-navy">
            Quick View
          </h2>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center hover:bg-surface"
            aria-label="Close"
            onClick={close}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="grid gap-6 p-4 sm:grid-cols-2 sm:p-6">
          <div className="relative aspect-square overflow-hidden border border-border bg-surface">
            <Image src={product.image} alt={product.title} fill className="object-cover" sizes="50vw" />
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted">{product.brand}</p>
            <h3 className="mt-1 text-xl font-bold text-navy">{product.title}</h3>
            <p className="mt-1 text-xs text-muted">
              Model {product.model} · SKU {product.sku}
            </p>

            <div className="mt-2 flex items-center gap-1.5 text-sm">
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
                  <span className="text-2xl font-bold text-accent">
                    {formatCurrency(product.salePrice)}
                  </span>
                  <span className="text-base text-muted line-through">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="text-sm font-semibold text-success">
                    Save {formatCurrency(savings)}
                  </span>
                </div>
              ) : (
                <span className="text-2xl font-bold text-navy">{formatCurrency(product.price)}</span>
              )}
              <p className="mt-1 text-sm text-muted">
                or {formatCurrency(product.financingMonthly)}/mo with financing
              </p>
            </div>

            <p className="mt-3 text-sm font-semibold text-success">
              {availabilityLabel(product.availability)}
            </p>

            <div className="mt-6 flex flex-wrap gap-3">
              <AddToCartButton product={product} />
              <Link href={`/products/${product.slug}`} className="btn btn-outline" onClick={close}>
                View Full Details
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
