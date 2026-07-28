"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { ProductCard } from "@/components/catalog/product-card";
import { catalogCategories } from "@/lib/catalog";
import type { Product } from "@/data/products";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
];

export function CatalogListing({
  products,
  categorySlug,
  note,
}: {
  products: Product[];
  categorySlug: string;
  note?: string;
}) {
  const [brand, setBrand] = useState<string>("All");
  const [inStockOnly, setInStockOnly] = useState(false);
  const [sort, setSort] = useState<SortKey>("featured");

  const brands = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.brand))).sort()],
    [products],
  );

  const filtered = useMemo(() => {
    let list = products;
    if (brand !== "All") list = list.filter((p) => p.brand === brand);
    if (inStockOnly) list = list.filter((p) => p.availability === "in_stock");

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "price-desc":
        sorted.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return sorted;
  }, [products, brand, inStockOnly, sort]);

  if (products.length === 0) {
    return (
      <div className="mt-8 border border-border bg-surface p-8 text-center">
        <p className="text-sm text-muted">
          We don&apos;t have models listed online in this exact configuration right now — our in-store
          selection changes daily. Call or visit a store, or browse a related category below.
        </p>
        <div className="mt-5 flex flex-wrap justify-center gap-2">
          {catalogCategories
            .filter((c) => c.slug !== categorySlug)
            .map((c) => (
              <Link key={c.slug} href={`/${c.slug}`} className="btn btn-outline btn-sm">
                {c.name}
              </Link>
            ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mt-6">
      {note && (
        <p className="mb-4 border border-border bg-surface px-4 py-3 text-sm text-muted">{note}</p>
      )}

      <div className="flex flex-col gap-3 border-b border-border pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-wrap gap-2">
          {brands.map((b) => (
            <button
              key={b}
              onClick={() => setBrand(b)}
              className={`rounded-none border px-3 py-1.5 text-xs font-semibold transition ${
                brand === b
                  ? "border-navy bg-navy text-white"
                  : "border-border bg-white text-navy hover:border-navy"
              }`}
            >
              {b}
            </button>
          ))}
        </div>
        <div className="flex shrink-0 items-center gap-4">
          <label className="flex items-center gap-2 text-xs font-semibold text-navy">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={(e) => setInStockOnly(e.target.checked)}
              className="h-4 w-4 accent-navy"
            />
            In Stock Only
          </label>
          <select
            value={sort}
            onChange={(e) => setSort(e.target.value as SortKey)}
            className="input-retail w-auto rounded-none py-2 text-xs font-semibold"
            aria-label="Sort by"
          >
            {sortOptions.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <p className="mt-4 text-sm text-muted">
        {filtered.length} result{filtered.length === 1 ? "" : "s"}
      </p>

      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="mt-6 text-sm text-muted">
          No models match these filters.{" "}
          <button onClick={() => { setBrand("All"); setInStockOnly(false); }} className="font-semibold text-accent hover:underline">
            Clear filters
          </button>
        </p>
      )}
    </div>
  );
}
