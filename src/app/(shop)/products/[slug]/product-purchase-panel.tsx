"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { availabilityLabel, type Product } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { AddToCartButton } from "@/components/catalog/add-to-cart-button";

export function ProductPurchasePanel({ product }: { product: Product }) {
  const [selectedColor, setSelectedColor] = useState(
    product.colorOptions?.find((c) => c.name === product.finish)?.name ??
      product.colorOptions?.[0]?.name ??
      product.finish,
  );
  const [galleryIndex, setGalleryIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [addInstallation, setAddInstallation] = useState(false);
  const [addHaulAway, setAddHaulAway] = useState(false);

  const activeColor = product.colorOptions?.find((c) => c.name === selectedColor);
  const images = activeColor?.image
    ? [activeColor.image]
    : product.galleryImages && product.galleryImages.length > 0
      ? product.galleryImages
      : [product.image];
  const activeImage = images[Math.min(galleryIndex, images.length - 1)] ?? images[0];

  const savings = product.salePrice != null ? product.price - product.salePrice : 0;
  const needsProSetup =
    product.category === "Dishwashers" ||
    product.category === "Cooking" ||
    product.category === "Laundry" ||
    product.category === "Refrigeration";
  const canAddToCart = product.availability !== "call" && product.availability !== "special_order";

  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <div>
        <div className="relative aspect-square overflow-hidden border border-border bg-[#FAFBFC]">
          <Image
            src={activeImage}
            alt={product.title}
            fill
            className="object-contain p-6"
            sizes="(max-width: 1024px) 100vw, 50vw"
            priority
          />
        </div>
        {images.length > 1 && (
          <div className="mt-2 flex gap-2">
            {images.map((src, i) => (
              <button
                key={src}
                type="button"
                onClick={() => setGalleryIndex(i)}
                aria-label={i === 0 ? "Exterior view" : `View ${i + 1}`}
                aria-current={i === galleryIndex}
                className={`relative h-16 w-16 overflow-hidden border ${
                  i === galleryIndex ? "border-navy" : "border-border"
                }`}
              >
                <Image src={src} alt="" fill className="object-contain p-1.5" sizes="64px" />
              </button>
            ))}
          </div>
        )}
      </div>

      <div>
        <p className="text-xs font-bold uppercase tracking-wide text-muted">{product.brand}</p>
        <h1 className="mt-1 text-2xl font-bold text-navy md:text-3xl">{product.title}</h1>
        <p className="mt-1 text-sm text-muted">
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
          <span className="text-muted">
            {product.rating} · {product.reviewCount} reviews
          </span>
        </div>

        <div className="mt-4">
          {product.salePrice != null ? (
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-navy">{formatCurrency(product.salePrice)}</span>
              <span className="text-lg text-muted line-through">{formatCurrency(product.price)}</span>
              <span className="text-sm font-semibold text-success">Save {formatCurrency(savings)}</span>
            </div>
          ) : (
            <span className="text-3xl font-bold text-navy">{formatCurrency(product.price)}</span>
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

        {product.colorOptions && product.colorOptions.length > 1 && (
          <div className="mt-4">
            <p className="text-xs font-bold uppercase tracking-wide text-navy">
              Finish: <span className="font-semibold normal-case text-muted">{selectedColor}</span>
            </p>
            <div className="mt-2 flex flex-wrap gap-2" role="group" aria-label="Available finishes">
              {product.colorOptions.map((color) => {
                const selected = color.name === selectedColor;
                return (
                  <button
                    key={color.name}
                    type="button"
                    title={color.name}
                    aria-label={color.name}
                    aria-pressed={selected}
                    onClick={() => {
                      setSelectedColor(color.name);
                      setGalleryIndex(0);
                    }}
                    className={`h-7 w-7 rounded-full border transition ${
                      selected ? "border-navy ring-2 ring-navy/30 ring-offset-1" : "border-border hover:border-navy"
                    }`}
                    style={{ backgroundColor: color.hex }}
                  />
                );
              })}
            </div>
          </div>
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
                <span className="block text-xs text-muted">Professional hookup, leveling, and testing.</span>
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
                <span className="block text-xs text-muted">Remove and responsibly dispose of your old unit.</span>
              </span>
            </label>
          </div>
        )}

        {canAddToCart && (
          <div className="mt-4 flex items-center gap-3">
            <span className="text-xs font-semibold text-navy">Quantity</span>
            <div className="flex items-center border border-border">
              <button
                type="button"
                aria-label="Decrease quantity"
                className="grid h-9 w-9 place-items-center text-navy hover:bg-surface"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              >
                −
              </button>
              <span className="w-10 text-center text-sm font-semibold text-navy">{quantity}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                className="grid h-9 w-9 place-items-center text-navy hover:bg-surface"
                onClick={() => setQuantity((q) => q + 1)}
              >
                +
              </button>
            </div>
          </div>
        )}

        <div className="mt-6 flex flex-wrap gap-3">
          <AddToCartButton
            product={product}
            quantity={quantity}
            addInstallation={addInstallation}
            addHaulAway={addHaulAway}
          />
          <Link href="/financing" className="btn btn-outline">
            View Financing
          </Link>
        </div>

        <ul className="mt-6 space-y-2 border-t border-border pt-4 text-sm text-muted">
          <li>Free local delivery options on qualifying orders</li>
          <li>Professional installation and haul-away available</li>
          <li>Protection plans offered at checkout</li>
        </ul>
      </div>
    </div>
  );
}
