"use client";

import Link from "next/link";
import type { Product } from "@/data/products";
import { businessConfig } from "@/config/business";
import { useCart } from "@/stores/cart";
import { useUI } from "@/lib/ui-store";

export function AddToCartButton({
  product,
  quantity = 1,
  addInstallation = false,
  addHaulAway = false,
}: {
  product: Product;
  quantity?: number;
  addInstallation?: boolean;
  addHaulAway?: boolean;
}) {
  const addItem = useCart((s) => s.addItem);
  const { showToast } = useUI();

  if (product.availability === "call") {
    return (
      <a
        href={businessConfig.primaryContact.phoneHref}
        className="btn btn-navy btn-lg text-center"
      >
        Call {businessConfig.primaryContact.phoneDisplay}
      </a>
    );
  }

  if (product.availability === "special_order") {
    return (
      <Link href="/contact" className="btn btn-navy btn-lg">
        Inquire / Special Order
      </Link>
    );
  }

  return (
    <button
      type="button"
      className="btn btn-primary btn-lg"
      onClick={() => {
        addItem({
          productId: product.id,
          slug: product.slug,
          title: product.title,
          brand: product.brand,
          image: product.image,
          price: product.price,
          salePrice: product.salePrice,
          quantity,
          addInstallation,
          addHaulAway,
        });
        showToast(`${product.title} added to cart`);
      }}
    >
      Add to Cart
    </button>
  );
}
