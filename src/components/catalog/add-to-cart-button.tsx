"use client";

import type { Product } from "@/data/products";
import { useCart } from "@/stores/cart";

export function AddToCartButton({ product }: { product: Product }) {
  const addItem = useCart((s) => s.addItem);
  return (
    <button
      type="button"
      className="btn btn-primary btn-lg"
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
  );
}
