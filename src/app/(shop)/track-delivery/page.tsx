import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { TrackDeliveryForm } from "./track-delivery-form";

export const metadata: Metadata = { title: "Track Your Delivery" };

export default function TrackDeliveryPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Track Your Delivery</span>
      </nav>

      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-navy md:text-3xl">Track Your Delivery</h1>
        <p className="mt-3 text-sm text-muted md:text-base">
          Enter your order number to see real-time delivery status — from order confirmed through
          out-for-delivery and installed. You&apos;ll find your order number in your confirmation
          email or on your receipt.
        </p>
      </div>

      <div className="mt-8 max-w-md">
        <TrackDeliveryForm />
      </div>
    </PageContainer>
  );
}
