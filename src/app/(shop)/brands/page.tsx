import Link from "next/link";
import type { Metadata } from "next";
import { PageContainer } from "@/components/layout/page-container";
import { brandSlugs } from "@/lib/catalog";
import { products } from "@/data/products";

export const metadata: Metadata = { title: "Shop by Brand" };

export default function BrandsPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Brands</span>
      </nav>
      <h1 className="text-2xl font-bold text-navy md:text-3xl">Shop by Brand</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Factory authorized for every major manufacturer we sell — genuine parts, expert service, and full
        manufacturer warranties.
      </p>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {brandSlugs.map(({ slug, name }) => {
          const count = products.filter((p) => p.brand === name).length;
          return (
            <Link
              key={slug}
              href={`/brands/${slug}`}
              className="flex h-28 flex-col items-center justify-center gap-1 border border-border bg-white px-4 text-center transition hover:border-navy"
            >
              <span className="font-bold text-navy">{name}</span>
              <span className="text-xs text-muted">{count > 0 ? `${count} models online` : "Call for selection"}</span>
            </Link>
          );
        })}
      </div>

      <p className="mt-8 text-sm text-muted">
        Don&apos;t see your brand?{" "}
        <Link href="/contact" className="font-semibold text-accent hover:underline">
          Ask our team
        </Link>
        .
      </p>
    </PageContainer>
  );
}
