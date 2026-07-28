import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { siteConfig } from "@/config/site";

export function StubPage({
  title,
  description,
}: {
  title: string;
  description?: string;
}) {
  return (
    <PageContainer className="py-10">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">{title}</span>
      </nav>
      <h1 className="text-2xl font-bold text-navy md:text-3xl">{title}</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted md:text-base">
        {description ??
          `This ${title.toLowerCase()} page is part of the ${siteConfig.name} catalog experience and will be expanded in the next development phase. Navigation, search, store selection, and cart remain fully available.`}
      </p>
      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
        <Link href="/in-stock" className="btn btn-outline">
          Shop In Stock
        </Link>
        <Link href="/repair/schedule" className="btn btn-accent">
          Schedule Repair
        </Link>
      </div>
    </PageContainer>
  );
}
