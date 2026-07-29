import Link from "next/link";
import { SearchX } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { businessConfig } from "@/config/business";

export default function NotFound() {
  return (
    <PageContainer className="flex flex-col items-center py-20 text-center">
      <SearchX className="h-12 w-12 text-accent" />
      <h1 className="mt-4 text-2xl font-bold text-navy md:text-3xl">Page Not Found</h1>
      <p className="mt-3 max-w-md text-sm text-muted md:text-base">
        We couldn&apos;t find the page you were looking for. It may have moved, or the link may be out of
        date.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <Link href="/" className="btn btn-primary">
          Back to Home
        </Link>
        <Link href="/search" className="btn btn-outline">
          Search Products
        </Link>
        <a href={businessConfig.primaryContact.phoneHref} className="btn btn-outline">
          Call {businessConfig.primaryContact.phoneDisplay}
        </a>
      </div>
    </PageContainer>
  );
}
