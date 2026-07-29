import type { Metadata } from "next";
import Link from "next/link";
import { ShieldCheck } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { siteConfig } from "@/config/site";
import { whyChooseUs } from "@/lib/data";

export const metadata: Metadata = { title: "About Us" };

export default function AboutPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">About Us</span>
      </nav>

      <h1 className="text-2xl font-bold text-navy md:text-3xl">About {siteConfig.name}</h1>
      <p className="mt-3 max-w-3xl text-sm text-muted md:text-base">
        {siteConfig.name} is a locally-owned online appliance retailer serving Hagerstown, Maryland and the
        surrounding region since 2001. We sell major appliances online with fast delivery, professional
        installation, haul-away, and factory-trained repair — no walk-in showroom, just straightforward pricing
        and a service department that stands behind everything we sell.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/about/story" className="btn btn-outline">
          Read Our Story
        </Link>
        <Link href="/locations" className="btn btn-outline">
          Service &amp; Operations
        </Link>
        <Link href="/careers" className="btn btn-outline">
          Careers
        </Link>
        <Link href="/contact" className="btn btn-primary">
          Contact Us
        </Link>
      </div>

      {/* Trust badges */}
      <div className="mt-10 grid gap-4 border border-border bg-surface p-6 sm:grid-cols-3">
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-6 w-6 shrink-0 text-navy" />
          <div>
            <p className="text-sm font-bold text-navy">Licensed &amp; Insured</p>
            <p className="text-xs text-muted">Fully bonded delivery, install, and repair teams.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-6 w-6 shrink-0 text-navy" />
          <div>
            <p className="text-sm font-bold text-navy">Factory Authorized</p>
            <p className="text-xs text-muted">Authorized sales and service for 30+ major brands.</p>
          </div>
        </div>
        <div className="flex items-start gap-3">
          <ShieldCheck className="h-6 w-6 shrink-0 text-navy" />
          <div>
            <p className="text-sm font-bold text-navy">Locally Owned</p>
            <p className="text-xs text-muted">Independent, family-run since 2001 — not a national chain.</p>
          </div>
        </div>
      </div>

      {/* Why choose us */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-navy">Why Shoppers Choose Us</h2>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
          {whyChooseUs.slice(0, 5).map((item) => (
            <div key={item.title} className="border border-border bg-white p-4">
              <item.icon className="h-6 w-6 text-accent" />
              <p className="mt-3 text-sm font-bold text-navy">{item.title}</p>
              <p className="mt-1 text-xs text-muted">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 border border-border bg-navy p-8 text-center">
        <h2 className="text-xl font-bold text-white">Have a question before you buy?</h2>
        <p className="mt-2 text-sm text-white/70">
          Call {siteConfig.phone} or reach out online — our team is happy to help you find the right appliance.
        </p>
        <Link href="/contact" className="btn btn-accent mt-4">
          Contact Us
        </Link>
      </div>
    </PageContainer>
  );
}
