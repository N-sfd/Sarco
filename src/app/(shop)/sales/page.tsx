import Link from "next/link";
import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { CatalogListing } from "@/components/catalog/catalog-listing";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Sales" };

export default function SalesPage() {
  const onSale = products.filter((p) => p.salePrice != null);

  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Sales</span>
      </nav>
      <h1 className="text-2xl font-bold text-navy md:text-3xl">Sales</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Markdowns across every category — in-stock savings on top brands, updated regularly.
      </p>

      <CatalogListing products={onSale} categorySlug="sales" />
    </PageContainer>
  );
}
