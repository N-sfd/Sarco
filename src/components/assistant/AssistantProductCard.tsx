"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { availabilityLabel, type Product } from "@/data/products";
import { useCart } from "@/stores/cart";
import { useCompare } from "@/stores/wishlist";
import { cn, formatCurrency } from "@/lib/utils";

export function AssistantProductCard({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  const compareToggle = useCompare((s) => s.toggle);
  const compared = useCompare((s) => s.has(product.id));
  const [added, setAdded] = useState(false);
  const price = product.salePrice ?? product.price;

  return (
    <div className="flex gap-3 border border-border bg-white p-3">
      <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-border/70 bg-[#FAFBFC]">
        <Image src={product.image} alt={product.title} fill sizes="64px" className="object-contain p-1.5" />
      </div>
      <div className="min-w-0 flex-1">
        <p className="text-[11px] font-bold uppercase tracking-wide text-muted">{product.brand}</p>
        <p className="line-clamp-2 text-[13px] font-semibold leading-snug text-navy">{product.title}</p>
        <p className="mt-0.5 truncate text-[11px] text-muted">Model {product.model}</p>
        <div className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-0.5">
          <span className="text-[14px] font-bold text-navy">{formatCurrency(price)}</span>
          <span className="text-[11px] font-semibold text-success">{availabilityLabel(product.availability)}</span>
        </div>
        <div className="mt-2 flex flex-wrap gap-2">
          <Link
            href={`/products/${product.slug}`}
            className="inline-flex min-h-11 items-center border border-navy px-2.5 text-[11px] font-semibold text-navy hover:bg-surface"
          >
            View Product
          </Link>
          <button
            type="button"
            onClick={() => compareToggle(product.id)}
            className={cn(
              "inline-flex min-h-11 items-center border px-2.5 text-[11px] font-semibold",
              compared ? "border-navy bg-navy text-white" : "border-border text-navy hover:border-navy",
            )}
          >
            {compared ? "Comparing" : "Compare"}
          </button>
          <button
            type="button"
            onClick={() => {
              addItem({
                productId: product.id,
                slug: product.slug,
                title: product.title,
                brand: product.brand,
                image: product.image,
                price: product.price,
                salePrice: product.salePrice,
              });
              setAdded(true);
              window.setTimeout(() => setAdded(false), 1500);
            }}
            className="inline-flex min-h-11 items-center bg-icon-blue px-2.5 text-[11px] font-semibold text-white"
          >
            {added ? "Added" : "Add to Cart"}
          </button>
        </div>
      </div>
    </div>
  );
}
