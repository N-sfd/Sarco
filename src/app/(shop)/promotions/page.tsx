import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { promotions } from "@/lib/data";

export const metadata: Metadata = { title: "Current Promotions" };

const crossLinks = [
  { label: "Manufacturer Rebates", href: "/rebates", desc: "Stackable brand rebates, instant and mail-in." },
  { label: "Clearance", href: "/clearance", desc: "Discontinued and open-box models at steep discounts." },
  { label: "Sales", href: "/sales", desc: "Everyday markdowns across every category." },
  { label: "Financing", href: "/financing", desc: "0% APR plans and a payment calculator." },
];

export default function PromotionsPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Current Promotions</span>
      </nav>

      <h1 className="text-2xl font-bold text-navy md:text-3xl">Current Promotions</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted md:text-base">
        From seasonal markdowns to trade-in credit, here&apos;s every way to save on your next appliance
        purchase right now. Promotions can be combined with manufacturer rebates and financing where noted —
        ask your sales associate for the current stacking rules on any purchase.
      </p>

      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {promotions.map((promo) => (
          <div key={promo.title} className="flex flex-col border border-border bg-white p-5">
            <div className="flex items-start justify-between gap-3">
              <promo.icon className="h-6 w-6 text-accent" />
              <span className="bg-mist px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-navy">
                {promo.tag}
              </span>
            </div>
            <h2 className="mt-3 text-sm font-bold text-navy">{promo.title}</h2>
            <p className="mt-1 flex-1 text-xs text-muted">{promo.desc}</p>
          </div>
        ))}
      </div>

      <div className="mt-14 border-t border-border pt-10">
        <h2 className="text-xl font-bold text-navy md:text-2xl">Explore More Ways to Save</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Promotions are just one piece of the picture. See how rebates, clearance pricing, and financing can
          work together to bring your total down further.
        </p>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {crossLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="border border-border bg-surface p-5 transition-colors hover:border-navy hover:bg-white"
            >
              <h3 className="text-sm font-bold text-navy">{link.label}</h3>
              <p className="mt-1 text-xs text-muted">{link.desc}</p>
            </Link>
          ))}
        </div>
      </div>
    </PageContainer>
  );
}
