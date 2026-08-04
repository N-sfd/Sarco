"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { X, Star, Minus, Plus } from "lucide-react";
import { products, availabilityLabel } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { AddToCartButton } from "@/components/catalog/add-to-cart-button";
import { useUiStore } from "@/stores/wishlist";
import { useDialog } from "@/lib/use-dialog";

export function QuickViewModal() {
  const slug = useUiStore((s) => s.quickViewSlug);
  const close = () => useUiStore.getState().setQuickViewSlug(null);
  const product = slug ? products.find((p) => p.slug === slug) : undefined;
  const [quantity, setQuantity] = useState(1);
  const [addInstallation, setAddInstallation] = useState(false);
  const [addHaulAway, setAddHaulAway] = useState(false);
  const [galleryIndex, setGalleryIndex] = useState(0);
  const dialogRef = useDialog<HTMLDivElement>(!!product, close);

  const [prevSlug, setPrevSlug] = useState(slug);
  if (slug !== prevSlug) {
    setPrevSlug(slug);
    setQuantity(1);
    setAddInstallation(false);
    setAddHaulAway(false);
    setGalleryIndex(0);
  }

  if (!product) return null;

  const savings = product.salePrice != null ? product.price - product.salePrice : 0;
  const gallery =
    product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : [product.image];
  const needsProSetup =
    product.category === "Dishwashers" ||
    product.category === "Cooking" ||
    product.category === "Laundry" ||
    product.category === "Refrigeration";

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-navy/50 px-4 py-10">
      <div className="absolute inset-0" onClick={close} aria-hidden />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="quick-view-title"
        tabIndex={-1}
        className="relative z-10 w-full max-w-3xl border border-border bg-white shadow-xl outline-none"
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
          <div>
            <div className="relative aspect-square overflow-hidden border border-border bg-[#FAFBFC]">
              <Image
                src={gallery[galleryIndex] ?? product.image}
                alt={product.title}
                fill
                className="object-contain p-4"
                sizes="50vw"
              />
            </div>
            {gallery.length > 1 && (
              <div className="mt-2 flex gap-2">
                {gallery.map((src, i) => (
                  <button
                    key={src}
                    type="button"
                    onClick={() => setGalleryIndex(i)}
                    className={`relative h-14 w-14 overflow-hidden border ${
                      i === galleryIndex ? "border-navy" : "border-border"
                    }`}
                    aria-label={i === 0 ? "Exterior view" : "Interior view"}
                  >
                    <Image src={src} alt="" fill className="object-contain p-1" sizes="56px" />
                  </button>
                ))}
              </div>
            )}
          </div>

          <div>
            <p className="text-xs font-bold uppercase tracking-wide text-muted">{product.brand}</p>
            <h3 className="mt-1 text-xl font-bold text-navy">{product.title}</h3>
            <p className="mt-1 text-xs text-muted">
              Model {product.model} · SKU {product.sku}
            </p>

            <div className="mt-2 flex items-center gap-1.5 text-sm">
              <span className="flex gap-0.5" aria-hidden>
                {Array.from({ length: 5 }).map((_, i) => (
                  <Star
                    key={i}
                    className={`h-3.5 w-3.5 ${
                      i < Math.round(product.rating)
                        ? "fill-[#d4a017] text-[#d4a017]"
                        : "fill-transparent text-[#cbd5e1]"
                    }`}
                    strokeWidth={1.75}
                  />
                ))}
              </span>
              <span className="text-muted">({product.reviewCount})</span>
            </div>

            <div className="mt-3">
              {product.salePrice != null ? (
                <div className="flex flex-wrap items-baseline gap-2">
                  <span className="text-2xl font-bold text-navy">
                    {formatCurrency(product.salePrice)}
                  </span>
                  <span className="text-base text-muted line-through">
                    {formatCurrency(product.price)}
                  </span>
                  <span className="bg-success px-2 py-0.5 text-xs font-bold uppercase text-white">
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

            {product.quickSpecs && product.quickSpecs.length > 0 && (
              <ul className="mt-3 space-y-1 text-sm text-muted">
                {product.quickSpecs.map((spec) => (
                  <li key={spec}>• {spec}</li>
                ))}
              </ul>
            )}

            {needsProSetup && (
              <div className="mt-4 space-y-2 border border-border bg-surface p-3">
                <p className="text-xs font-bold uppercase tracking-wide text-navy">
                  Professional setup options
                </p>
                {product.availability === "call" ? (
                  <p className="text-xs text-muted">
                    Installation and haul-away can be arranged when you call — tell us which options you need.
                  </p>
                ) : null}
                <label className="flex items-start gap-2 text-sm text-navy">
                  <input
                    type="checkbox"
                    checked={addInstallation}
                    onChange={(e) => setAddInstallation(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-navy"
                  />
                  <span>
                    <span className="font-semibold">Delivery &amp; Installation</span>
                    <span className="block text-xs text-muted">
                      Professional hookup, leveling, and testing.
                    </span>
                  </span>
                </label>
                <label className="flex items-start gap-2 text-sm text-navy">
                  <input
                    type="checkbox"
                    checked={addHaulAway}
                    onChange={(e) => setAddHaulAway(e.target.checked)}
                    className="mt-0.5 h-4 w-4 accent-navy"
                  />
                  <span>
                    <span className="font-semibold">Old Appliance Haul-Away</span>
                    <span className="block text-xs text-muted">
                      Remove and responsibly dispose of your old unit.
                    </span>
                  </span>
                </label>
              </div>
            )}

            {product.availability !== "call" && product.availability !== "special_order" && (
              <div className="mt-4 flex items-center gap-3">
                <span className="text-xs font-semibold text-navy">Quantity</span>
                <div className="flex items-center border border-border">
                  <button
                    type="button"
                    aria-label="Decrease quantity"
                    className="grid h-9 w-9 place-items-center text-navy hover:bg-surface"
                    onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  >
                    <Minus className="h-3.5 w-3.5" />
                  </button>
                  <span className="w-10 text-center text-sm font-semibold text-navy">{quantity}</span>
                  <button
                    type="button"
                    aria-label="Increase quantity"
                    className="grid h-9 w-9 place-items-center text-navy hover:bg-surface"
                    onClick={() => setQuantity((q) => q + 1)}
                  >
                    <Plus className="h-3.5 w-3.5" />
                  </button>
                </div>
              </div>
            )}

            <div className="mt-4 flex flex-wrap gap-3">
              <AddToCartButton
                product={product}
                quantity={quantity}
                addInstallation={addInstallation}
                addHaulAway={addHaulAway}
              />
              {product.availability === "call" && (
                <Link href="/contact" className="btn btn-outline" onClick={close}>
                  Request a Callback
                </Link>
              )}
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
