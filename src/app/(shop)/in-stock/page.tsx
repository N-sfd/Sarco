import Link from "next/link";
import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { CatalogListing } from "@/components/catalog/catalog-listing";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "In Stock & On Sale" };

export default function InStockPage() {
  const inStock = products.filter((p) => p.availability === "in_stock");

  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">In Stock</span>
      </nav>
      <h1 className="text-2xl font-bold text-navy md:text-3xl">In Stock &amp; On Sale</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Major appliances ready for fast local delivery — no special order wait.
      </p>

      <CatalogListing products={inStock} categorySlug="in-stock" />
    </PageContainer>
  );
}
