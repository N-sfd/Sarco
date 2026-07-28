"use client";

import Image from "next/image";
import Link from "next/link";
import { Heart } from "lucide-react";
import { products } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { useCart } from "@/stores/cart";
import { useWishlist } from "@/stores/wishlist";

export default function FavoritesPage() {
  const productIds = useWishlist((s) => s.productIds);
  const toggle = useWishlist((s) => s.toggle);
  const addItem = useCart((s) => s.addItem);
  const items = products.filter((p) => productIds.includes(p.id));

  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Favorites</span>
      </nav>
      <h1 className="text-2xl font-bold text-navy">Favorites</h1>

      {items.length === 0 ? (
        <div className="mt-6 border border-border bg-surface p-6">
          <p className="text-sm text-muted">
            You haven&apos;t saved any favorites yet. Tap the heart icon on a product to save it here.
          </p>
          <Link href="/in-stock" className="btn btn-primary mt-4">
            Shop In Stock
          </Link>
        </div>
      ) : (
        <ul className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((product) => (
            <li key={product.id} className="flex flex-col border border-border bg-white p-4">
              <div className="relative h-[180px] overflow-hidden bg-surface">
                <Image
                  src={product.image}
                  alt={product.title}
                  fill
                  sizes="(max-width: 768px) 100vw, 320px"
                  className="object-contain p-2"
                />
                <button
                  type="button"
                  aria-label="Remove from favorites"
                  onClick={() => toggle(product.id)}
                  className="absolute right-2 top-2 grid h-9 w-9 place-items-center border border-border bg-white"
                >
                  <Heart className="h-4 w-4 fill-accent text-accent" />
                </button>
              </div>
              <div className="mt-3 flex flex-1 flex-col">
                <p className="text-[12px] font-bold uppercase tracking-wide text-muted">
                  {product.brand}
                </p>
                <Link
                  href={`/products/${product.slug}`}
                  className="mt-1 line-clamp-2 text-sm font-semibold text-navy hover:text-accent"
                >
                  {product.title}
                </Link>
                <p className="mt-2 text-lg font-bold text-navy">
                  {formatCurrency(product.salePrice ?? product.price)}
                </p>
                <button
                  type="button"
                  className="btn btn-primary btn-sm mt-4"
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
            </li>
          ))}
        </ul>
      )}
    </PageContainer>
  );
}
