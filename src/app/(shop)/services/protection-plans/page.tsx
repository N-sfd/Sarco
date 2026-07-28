import type { Metadata } from "next";
import Link from "next/link";
import { CheckCircle2, ShieldCheck } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";

export const metadata: Metadata = { title: "Protection Plans" };

const plans = [
  {
    name: "2-Year Protection",
    tagline: "Solid coverage beyond the manufacturer warranty.",
    features: [
      "Parts & labor coverage for mechanical and electrical failures",
      "Power surge protection",
      "No deductibles, no hidden fees",
      "Transferable if you sell your home",
    ],
  },
  {
    name: "4-Year Protection",
    tagline: "Our most popular plan for major kitchen and laundry appliances.",
    features: [
      "Everything in 2-Year Protection",
      "Accidental damage from handling coverage",
      "Priority scheduling — jump the standard repair queue",
      "One free annual maintenance check-up",
    ],
    popular: true,
  },
  {
    name: "5-Year Total Protection",
    tagline: "Maximum peace of mind for premium and luxury appliances.",
    features: [
      "Everything in 4-Year Protection",
      "No Lemon Guarantee — 3 failed repairs on the same issue means full replacement",
      "24/7 priority repair line",
      "Full reimbursement for food loss due to refrigerator/freezer failure",
    ],
  },
];

export default function ProtectionPlansPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Protection Plans</span>
      </nav>

      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-navy md:text-3xl">Protection Plans</h1>
        <p className="mt-3 text-sm text-muted md:text-base">
          Manufacturer warranties typically cover the first year — after that, you&apos;re on your
          own. Our extended protection plans pick up where the factory warranty leaves off, covering
          mechanical failures, power surges, and more, all serviced by the same certified technicians
          who install your appliances.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 lg:grid-cols-3">
        {plans.map((plan) => (
          <div
            key={plan.name}
            className={`flex flex-col border p-6 ${
              plan.popular ? "border-navy bg-surface" : "border-border bg-white"
            }`}
          >
            {plan.popular && (
              <span className="mb-3 inline-block w-fit bg-navy px-2.5 py-1 text-xs font-bold uppercase tracking-wide text-white">
                Most Popular
              </span>
            )}
            <ShieldCheck className="h-8 w-8 text-accent" />
            <h2 className="mt-3 text-lg font-bold text-navy">{plan.name}</h2>
            <p className="mt-1 text-sm text-muted">{plan.tagline}</p>
            <ul className="mt-4 flex-1 space-y-2.5">
              {plan.features.map((feature) => (
                <li key={feature} className="flex gap-2 text-sm text-muted">
                  <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
                  {feature}
                </li>
              ))}
            </ul>
            <Link href="/contact" className={`btn mt-6 w-full ${plan.popular ? "btn-accent" : "btn-outline"}`}>
              Enroll Now
            </Link>
          </div>
        ))}
      </div>

      <div className="mt-10 border border-border bg-surface p-6">
        <h2 className="font-bold text-navy">Have Questions About Coverage?</h2>
        <p className="mt-2 text-sm text-muted">
          Plans can be added at the time of purchase or within 90 days after delivery. Our team can
          help you pick the right tier based on your appliance mix and household needs.
        </p>
        <Link href="/contact" className="mt-4 inline-block font-semibold text-accent hover:underline">
          Contact us to enroll →
        </Link>
      </div>
    </PageContainer>
  );
}
