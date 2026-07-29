"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { businessConfig } from "@/config/business";

export default function ShopError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <PageContainer className="flex flex-col items-center py-20 text-center">
      <AlertTriangle className="h-12 w-12 text-accent" />
      <h1 className="mt-4 text-2xl font-bold text-navy md:text-3xl">Something Went Wrong</h1>
      <p className="mt-3 max-w-md text-sm text-muted md:text-base">
        We hit an unexpected error loading this page. You can try again, or reach out if the problem
        continues.
      </p>
      <div className="mt-6 flex flex-wrap justify-center gap-3">
        <button type="button" onClick={reset} className="btn btn-primary">
          Try Again
        </button>
        <Link href="/" className="btn btn-outline">
          Back to Home
        </Link>
        <a href={businessConfig.primaryContact.phoneHref} className="btn btn-outline">
          Call {businessConfig.primaryContact.phoneDisplay}
        </a>
      </div>
    </PageContainer>
  );
}
