import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { ScheduleRepairForm } from "./schedule-repair-form";

export const metadata: Metadata = { title: "Schedule Repair" };

export default function ScheduleRepairPage() {
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
        <span className="text-navy">Schedule Repair</span>
      </nav>

      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-navy md:text-3xl">Schedule a Repair</h1>
        <p className="mt-3 text-sm text-muted md:text-base">
          Tell us about your appliance and pick a time that works for you. A certified technician will
          confirm your appointment and arrive within the selected window — diagnostic fees are always
          applied toward the repair if you proceed.
        </p>
      </div>

      <div className="mt-8 max-w-2xl">
        <ScheduleRepairForm />
      </div>
    </PageContainer>
  );
}
