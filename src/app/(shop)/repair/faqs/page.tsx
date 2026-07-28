import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { faqs } from "@/lib/data";

export const metadata: Metadata = { title: "Repair FAQs" };

export default function RepairFaqsPage() {
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
        <span className="text-navy">Repair FAQs</span>
      </nav>

      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-navy md:text-3xl">Repair FAQs</h1>
        <p className="mt-3 text-sm text-muted md:text-base">
          Answers to the questions we hear most about scheduling, pricing, and warranty coverage.
          Still have a question? Our team is happy to help.
        </p>
      </div>

      <div className="mt-8 max-w-2xl divide-y divide-border border border-border bg-white">
        {faqs.map((faq) => (
          <details key={faq.q} className="group p-4">
            <summary className="cursor-pointer list-none font-bold text-navy marker:content-none">
              <span className="flex items-center justify-between gap-3">
                {faq.q}
                <span className="shrink-0 text-lg text-muted group-open:hidden">+</span>
                <span className="hidden shrink-0 text-lg text-muted group-open:inline">−</span>
              </span>
            </summary>
            <p className="mt-3 text-sm text-muted">{faq.a}</p>
          </details>
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/repair/schedule" className="btn btn-accent">
          Schedule Repair
        </Link>
        <Link href="/contact" className="btn btn-outline">
          Contact Us
        </Link>
      </div>
    </PageContainer>
  );
}
