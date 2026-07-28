import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { TrackRepairForm } from "./track-repair-form";

export const metadata: Metadata = { title: "Track Repair" };

export default function TrackRepairPage() {
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
        <span className="text-navy">Track Repair</span>
      </nav>

      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-navy md:text-3xl">Track Your Repair</h1>
        <p className="mt-3 text-sm text-muted md:text-base">
          Enter the reference number you received when you scheduled your repair (for example,
          <span className="font-semibold text-navy"> SR-4F8K2C</span>) to check its status — from
          confirmed appointment through completed repair.
        </p>
      </div>

      <div className="mt-8 max-w-md">
        <TrackRepairForm />
      </div>
    </PageContainer>
  );
}
