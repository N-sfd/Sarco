import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { brands } from "@/data/products";

export const metadata: Metadata = { title: "Brands We Service" };

export default function RepairBrandsPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <Link href="/repair" className="hover:text-accent">
          Repair &amp; Services
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Brands We Service</span>
      </nav>

      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-navy md:text-3xl">Brands We Service</h1>
        <p className="mt-3 text-sm text-muted md:text-base">
          As a factory-authorized service center, our technicians are trained and certified on every
          brand we sell. Our repair coverage doesn&apos;t stop at our own inventory, though — we also
          service most major appliance brands you may have purchased elsewhere, using genuine
          manufacturer parts wherever possible.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
        {brands.map((brand) => (
          <Link
            key={brand}
            href="/repair/schedule"
            className="flex h-24 flex-col items-center justify-center gap-2 border border-border bg-white px-4 text-center transition hover:border-navy"
          >
            <BadgeCheck className="h-5 w-5 text-accent" />
            <span className="font-bold text-navy">{brand}</span>
          </Link>
        ))}
      </div>

      <div className="mt-10 border border-border bg-surface p-6">
        <h2 className="font-bold text-navy">Don&apos;t see your brand?</h2>
        <p className="mt-2 text-sm text-muted">
          We regularly service additional brands and models beyond what we sell online.
          Schedule an appointment or give us a call and we&apos;ll confirm coverage for your specific
          appliance before dispatching a technician.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <Link href="/repair/schedule" className="btn btn-accent">
            Schedule Repair
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Ask Our Team
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
