import type { Metadata } from "next";
import Link from "next/link";
import { CalendarCheck, PackageCheck, PlugZap, Ruler, Truck } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";

export const metadata: Metadata = { title: "Delivery & Installation" };

const steps = [
  {
    icon: CalendarCheck,
    title: "Pick Your Window",
    desc: "Choose a delivery date at checkout and get a 2-hour arrival window the day before, plus a call when your crew is on the way.",
  },
  {
    icon: Truck,
    title: "White-Glove Delivery",
    desc: "Our own delivery teams — not a third-party carrier — bring your appliance in carefully, protecting floors, walls, and doorways.",
  },
  {
    icon: Ruler,
    title: "Professional Installation",
    desc: "Every appliance is leveled, secured, and installed to manufacturer spec, including built-in and counter-depth fits.",
  },
  {
    icon: PlugZap,
    title: "Connections Made",
    desc: "Water lines, gas lines, and electrical connections are hooked up by trained installers where applicable, code-compliant every time.",
  },
  {
    icon: PackageCheck,
    title: "Tested & Demonstrated",
    desc: "We power on and test every unit before we leave, and walk you through the basic controls and settings.",
  },
];

export default function DeliveryInstallationPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Delivery &amp; Installation</span>
      </nav>

      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-navy md:text-3xl">Delivery &amp; Installation</h1>
        <p className="mt-3 text-sm text-muted md:text-base">
          Buying a new appliance is only half the job — getting it into your home and running
          correctly is the other half. Our in-house delivery and installation teams handle both, so
          your new refrigerator, range, washer, or dishwasher is ready to use the same day it
          arrives.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {steps.map((step) => (
          <div key={step.title} className="flex gap-4 border border-border bg-white p-5">
            <step.icon className="h-8 w-8 shrink-0 text-accent" />
            <div>
              <p className="font-bold text-navy">{step.title}</p>
              <p className="mt-1 text-sm text-muted">{step.desc}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-10 border border-border bg-surface p-6">
        <h2 className="font-bold text-navy">Old Appliance in the Way?</h2>
        <p className="mt-2 text-sm text-muted">
          Ask about haul-away when you schedule delivery — our crew can remove and responsibly
          recycle your old unit in the same visit, along with all delivery packaging.
        </p>
        <Link href="/services/haul-away" className="mt-4 inline-block font-semibold text-accent hover:underline">
          Learn about Haul Away →
        </Link>
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/track-delivery" className="btn btn-accent">
          Track Your Delivery
        </Link>
        <Link href="/in-stock" className="btn btn-outline">
          Shop In Stock
        </Link>
      </div>
    </PageContainer>
  );
}
