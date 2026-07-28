import type { Metadata } from "next";
import Link from "next/link";
import { Leaf, Package, ShieldCheck, Truck } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";

export const metadata: Metadata = { title: "Haul Away" };

export default function HaulAwayPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Haul Away</span>
      </nav>

      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-navy md:text-3xl">Haul Away</h1>
        <p className="mt-3 text-sm text-muted md:text-base">
          Don&apos;t let your old refrigerator, washer, or range become a hassle. When we deliver your
          new appliance, our crew can remove the old one from your home the same day — no separate
          trip, no lifting, no curb-side guessing games with your city&apos;s bulk pickup schedule.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-3">
        <div className="border border-border bg-white p-5">
          <Truck className="h-8 w-8 text-accent" />
          <p className="mt-3 font-bold text-navy">Same-Visit Removal</p>
          <p className="mt-1 text-sm text-muted">
            Add haul-away when you schedule delivery and your old unit leaves in the same trip your
            new one arrives.
          </p>
        </div>
        <div className="border border-border bg-white p-5">
          <Leaf className="h-8 w-8 text-accent" />
          <p className="mt-3 font-bold text-navy">Responsible Recycling</p>
          <p className="mt-1 text-sm text-muted">
            Old appliances are broken down for parts and scrap through certified recyclers, keeping
            refrigerants and metals out of landfills.
          </p>
        </div>
        <div className="border border-border bg-white p-5">
          <ShieldCheck className="h-8 w-8 text-accent" />
          <p className="mt-3 font-bold text-navy">Handled Safely</p>
          <p className="mt-1 text-sm text-muted">
            Our delivery teams are trained to disconnect and move heavy appliances without damaging
            floors, doorways, or stairwells.
          </p>
        </div>
      </div>

      <h2 className="mt-12 text-lg font-bold text-navy md:text-xl">Eligibility</h2>
      <div className="mt-4 border border-border bg-surface p-6">
        <ul className="space-y-3 text-sm text-muted">
          <li className="flex gap-3">
            <Package className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            Haul-away is available with the purchase and delivery of a new like-for-like appliance
            (e.g., trading in an old refrigerator for a new refrigerator).
          </li>
          <li className="flex gap-3">
            <Package className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            The old unit must be disconnected from water, gas, and power, and emptied of contents
            before our crew arrives.
          </li>
          <li className="flex gap-3">
            <Package className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
            Units located in a basement, upper floor, or otherwise requiring more than standard
            access may carry an additional haul-away fee — ask your delivery coordinator for details.
          </li>
        </ul>
      </div>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/services/delivery-installation" className="btn btn-accent">
          Delivery &amp; Installation
        </Link>
        <Link href="/contact" className="btn btn-outline">
          Ask Our Team
        </Link>
      </div>
    </PageContainer>
  );
}
