"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/catalog/product-card";
import { PageContainer } from "@/components/layout/page-container";
import { products } from "@/data/products";

export default function SearchClient() {
  const params = useSearchParams();
  const q = params.get("q") ?? "";
  const [query, setQuery] = useState(q);

  const results = useMemo(() => {
    const needle = (query || q).trim().toLowerCase();
    if (!needle) return products.slice(0, 12);
    return products.filter(
      (p) =>
        p.title.toLowerCase().includes(needle) ||
        p.brand.toLowerCase().includes(needle) ||
        p.model.toLowerCase().includes(needle) ||
        p.sku.toLowerCase().includes(needle) ||
        p.category.toLowerCase().includes(needle) ||
        p.subcategory.toLowerCase().includes(needle),
    );
  }, [query, q]);

  return (
    <PageContainer className="py-8">
      <h1 className="text-2xl font-bold text-navy">Search Results</h1>
      <form
        className="mt-4 flex max-w-xl"
        onSubmit={(e) => {
          e.preventDefault();
          const value = new FormData(e.currentTarget).get("q") as string;
          setQuery(value);
          window.history.replaceState(null, "", `/search?q=${encodeURIComponent(value)}`);
        }}
      >
        <input
          name="q"
          defaultValue={q}
          className="input-retail rounded-none"
          placeholder="What can we help you find?"
        />
        <button type="submit" className="btn btn-accent rounded-none">
          Search
        </button>
      </form>
      <p className="mt-3 text-sm text-muted">
        {results.length} result{results.length === 1 ? "" : "s"}
        {query || q ? ` for “${query || q}”` : ""}
      </p>
      <div className="mt-6 grid grid-cols-2 gap-3 md:grid-cols-3 lg:grid-cols-4">
        {results.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
      {results.length === 0 && (
        <p className="mt-6 text-sm text-muted">
          No products found. Try another brand, model, or category.{" "}
          <Link href="/" className="font-semibold text-accent hover:underline">
            Return home
          </Link>
        </p>
      )}
    </PageContainer>
  );
}
