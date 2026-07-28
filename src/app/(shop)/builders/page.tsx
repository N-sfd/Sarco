import type { Metadata } from "next";
import Link from "next/link";
import { BadgeDollarSign, ClipboardList, FileText, Truck, UserCheck } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Builder & Contractor Sales" };

const offerings = [
  {
    title: "Volume Pricing",
    icon: BadgeDollarSign,
    desc: "Tiered pricing on multi-unit and whole-development orders across every major brand we carry — the more units, the better the number.",
  },
  {
    title: "Dedicated Account Manager",
    icon: UserCheck,
    desc: "One point of contact who knows your projects, tracks your orders, and can get you a straight answer without four phone transfers.",
  },
  {
    title: "Job-Site Delivery Windows",
    icon: Truck,
    desc: "Scheduled delivery windows coordinated around your construction timeline, with staged or phased delivery for multi-unit builds.",
  },
  {
    title: "Spec Sheet & Model Matching",
    icon: FileText,
    desc: "Send us your architectural spec sheet and we'll match, substitute, or source equivalent models to keep your project on schedule and on budget.",
  },
  {
    title: "Order Management",
    icon: ClipboardList,
    desc: "Consolidated invoicing and order tracking across every unit in a development, so your paperwork stays as organized as your job site.",
  },
];

export default function BuildersPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Builder &amp; Contractor Sales</span>
      </nav>

      <h1 className="text-2xl font-bold text-navy md:text-3xl">Builder &amp; Contractor Sales</h1>
      <p className="mt-3 max-w-3xl text-sm text-muted md:text-base">
        {siteConfig.name} works with home builders, remodelers, and property managers throughout Maryland, West
        Virginia, and Virginia to keep appliance packages on schedule and on budget — from a single spec home to a
        multi-phase development. Our builder sales team handles the logistics so you can focus on the build.
      </p>

      <div className="mt-8 flex flex-wrap gap-3">
        <Link href="/contact" className="btn btn-accent">
          Talk to Our Builder Sales Team
        </Link>
        <a href={`tel:${siteConfig.phoneTel}`} className="btn btn-outline">
          Call {siteConfig.phone}
        </a>
      </div>

      <section className="mt-12">
        <h2 className="text-xl font-bold text-navy">What We Offer</h2>
        <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {offerings.map((item) => (
            <div key={item.title} className="border border-border bg-white p-5">
              <item.icon className="h-6 w-6 text-accent" />
              <p className="mt-3 text-sm font-bold text-navy">{item.title}</p>
              <p className="mt-1 text-xs text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="mt-12 border border-border bg-surface p-6">
        <h2 className="text-lg font-bold text-navy">How It Works</h2>
        <ol className="mt-4 space-y-3 text-sm text-muted">
          <li>
            <span className="font-bold text-navy">1. Send us your spec.</span> Share your project scope, unit
            count, and appliance spec sheet or builder package requirements.
          </li>
          <li>
            <span className="font-bold text-navy">2. Get a builder quote.</span> Your dedicated account manager
            returns volume pricing and lead-time estimates across every unit or model needed.
          </li>
          <li>
            <span className="font-bold text-navy">3. Schedule delivery.</span> We coordinate job-site delivery
            windows around your framing and rough-in schedule, staged by phase if needed.
          </li>
          <li>
            <span className="font-bold text-navy">4. Stay stocked through closeout.</span> We track your order
            through final walkthrough and handle any warranty registration or service needs after move-in.
          </li>
        </ol>
      </section>

      <div className="mt-12 border border-border bg-navy p-8 text-center">
        <h2 className="text-xl font-bold text-white">Ready to Talk Volume Pricing?</h2>
        <p className="mt-2 text-sm text-white/70">
          Reach out with your project details and our builder sales team will follow up within one business day.
        </p>
        <Link href="/contact" className="btn btn-accent mt-4">
          Contact Builder Sales
        </Link>
      </div>
    </PageContainer>
  );
}
