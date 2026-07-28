import Link from "next/link";
import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { CatalogListing } from "@/components/catalog/catalog-listing";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Clearance" };

export default function ClearancePage() {
  const clearance = products.filter((p) => {
    if (p.salePrice == null) return false;
    const discount = (p.price - p.salePrice) / p.price;
    return discount >= 0.15;
  });

  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Clearance</span>
      </nav>
      <h1 className="text-2xl font-bold text-navy md:text-3xl">Clearance</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Deepest discounts on discontinued models, floor samples, and open-box units — quantities limited,
        first come first served.
      </p>

      <CatalogListing products={clearance} categorySlug="clearance" />
    </PageContainer>
  );
}
