import { Suspense } from "react";
import { PageContainer } from "@/components/layout/page-container";
import SearchClient from "./search-client";

export default function SearchPage() {
  return (
    <Suspense
      fallback={
        <PageContainer className="py-8 text-sm text-muted">Loading search…</PageContainer>
      }
    >
      <SearchClient />
    </Suspense>
  );
}
