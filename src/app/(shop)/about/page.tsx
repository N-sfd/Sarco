import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone, ShieldCheck } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { siteConfig } from "@/config/site";
import { stores } from "@/data/stores";
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
        {siteConfig.name} has been the region&apos;s trusted, locally-owned appliance retailer since 2001. What
        started as a single storefront has grown into four full-service showrooms across Maryland, West Virginia,
        and Virginia — but we&apos;ve never lost the neighborhood-dealer approach: real advice from people who
        actually use this equipment, straightforward pricing, and a service department that stands behind
        everything we sell.
      </p>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/about/story" className="btn btn-outline">
          Read Our Story
        </Link>
        <Link href="/locations" className="btn btn-outline">
          View Locations
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

      {/* Store locations */}
      <section className="mt-12">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-navy">Our Locations</h2>
          <Link href="/locations" className="text-xs font-semibold text-accent hover:underline">
            View all locations
          </Link>
        </div>
        <div className="mt-5 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {stores.map((store) => (
            <div key={store.id} className="border border-border bg-white p-4">
              <p className="text-sm font-bold text-navy">
                {store.city}, {store.state}
              </p>
              <div className="mt-2 flex items-start gap-2 text-xs text-muted">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                <span>
                  {store.address}
                  <br />
                  {store.city}, {store.state} {store.zip}
                </span>
              </div>
              <div className="mt-2 flex items-center gap-2 text-xs text-muted">
                <Phone className="h-3.5 w-3.5 shrink-0" />
                <a href={`tel:${store.phone.replace(/[^\d+]/g, "")}`} className="hover:text-accent">
                  {store.phone}
                </a>
              </div>
              <p className="mt-2 text-xs text-muted">{store.hours}</p>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 border border-border bg-navy p-8 text-center">
        <h2 className="text-xl font-bold text-white">Have a question before you visit?</h2>
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
