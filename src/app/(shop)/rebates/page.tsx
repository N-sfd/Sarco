import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Mail } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { rebates } from "@/lib/data";
import { siteConfig } from "@/config/site";
import { RebateStatusLookup } from "./rebate-status-lookup";

export const metadata: Metadata = { title: "Manufacturer Rebates" };

const methodStyles: Record<string, string> = {
  "Instant": "bg-success text-white",
  "Mail-In": "bg-navy text-white",
  "Online": "bg-accent text-white",
};

export default function RebatesPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Manufacturer Rebates</span>
      </nav>

      <h1 className="text-2xl font-bold text-navy md:text-3xl">Rebate Center</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted md:text-base">
        Stack manufacturer rebates on top of everyday {siteConfig.name} pricing. Some rebates apply instantly
        at checkout, while others require a quick mail-in or online submission after your purchase — every
        card below spells out exactly what to expect.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {rebates.map((rebate) => (
          <div key={rebate.id} className="flex flex-col border border-border bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <span className="text-xs font-bold uppercase tracking-wide text-muted">{rebate.brand}</span>
              <span
                className={`px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${
                  methodStyles[rebate.method] ?? "bg-mist text-navy"
                }`}
              >
                {rebate.method}
              </span>
            </div>
            <h2 className="mt-2 text-base font-bold text-navy">{rebate.title}</h2>
            <p className="mt-1 text-2xl font-extrabold text-accent">{rebate.amount}</p>
            <p className="mt-2 flex-1 text-sm text-muted">{rebate.qualifying}</p>
            <div className="mt-4 flex items-center justify-between border-t border-border pt-3 text-xs text-muted">
              <span>{rebate.category}</span>
              <span>Expires {rebate.expires}</span>
            </div>
            <p className="mt-2 text-[11px] text-muted">Rebate ID: {rebate.id}</p>
          </div>
        ))}
      </div>

      <div className="mt-12">
        <RebateStatusLookup />
      </div>

      <div className="mt-8 flex items-start gap-2 border border-border bg-surface p-4 text-sm text-muted">
        <BadgeCheck className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
        <p>
          Rebate terms, amounts, and deadlines are set by each manufacturer and are subject to change without
          notice. For questions about a submitted rebate, required documentation, or a rebate not listed
          here, email{" "}
          <a href={`mailto:${siteConfig.email}`} className="font-semibold text-navy hover:text-accent">
            {siteConfig.email}
          </a>{" "}
          or ask any sales associate in-store.
        </p>
      </div>

      <div className="mt-6 flex items-center gap-2 text-xs text-muted">
        <Mail className="h-3.5 w-3.5" />
        <span>
          Looking for more ways to save? Check out our{" "}
          <Link href="/promotions" className="font-semibold text-navy hover:text-accent">
            current promotions
          </Link>{" "}
          and{" "}
          <Link href="/financing" className="font-semibold text-navy hover:text-accent">
            financing options
          </Link>
          .
        </span>
      </div>
    </PageContainer>
  );
}
