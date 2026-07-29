import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Phone } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { services, whyChooseUs } from "@/lib/data";
import { siteConfig } from "@/config/site";
import { JsonLd } from "@/components/ui/json-ld";
import { serviceSchema } from "@/lib/structured-data";

export const metadata: Metadata = { title: "Repair & Services" };

const subPages = [
  { title: "Schedule Repair", desc: "Book a certified technician online in minutes.", href: "/repair/schedule" },
  { title: "Repair Services", desc: "Full breakdown of every appliance we fix.", href: "/repair/services" },
  { title: "Brands We Service", desc: "Factory-authorized for 30+ manufacturers.", href: "/repair/brands" },
  { title: "Service Areas", desc: "Check coverage in your ZIP code.", href: "/repair/service-areas" },
  { title: "Track Repair", desc: "Look up the status of an open ticket.", href: "/repair/track" },
  { title: "Repair FAQs", desc: "Answers to the questions we hear most.", href: "/repair/faqs" },
];

export default function RepairHubPage() {
  return (
    <PageContainer className="py-8">
      <JsonLd
        data={serviceSchema({
          name: "Appliance Repair",
          description:
            "Factory-authorized appliance diagnosis and repair with a 90-day parts and labor guarantee.",
          areaServed: ["Hagerstown, MD", "Maryland", "Virginia", "West Virginia"],
        })}
      />
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Repair &amp; Services</span>
      </nav>

      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-navy md:text-3xl">Appliance Repair &amp; Services</h1>
        <p className="mt-3 text-sm text-muted md:text-base">
          Factory-authorized repair for every major appliance brand — same-day availability, upfront
          pricing, and a 90-day parts &amp; labor guarantee on every job. Our certified technicians
          service what we sell and most of what we don&apos;t.
        </p>
      </div>

      <div className="mt-6 flex flex-wrap gap-3">
        <Link href="/repair/schedule" className="btn btn-accent">
          Schedule Repair
        </Link>
        <a href={`tel:${siteConfig.phoneTel}`} className="btn btn-outline">
          <Phone className="h-4 w-4" /> {siteConfig.phone}
        </a>
      </div>

      <h2 className="mt-12 text-lg font-bold text-navy md:text-xl">What We Repair</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service) => (
          <Link
            key={service.name}
            href="/repair/schedule"
            className="flex gap-4 border border-border bg-white p-4 transition hover:border-navy"
          >
            <service.icon className="h-8 w-8 shrink-0 text-accent" />
            <div className="min-w-0">
              <p className="font-bold text-navy">{service.name}</p>
              <p className="mt-1 text-xs text-muted">{service.desc}</p>
              <p className="mt-2 text-xs font-semibold text-navy">From ${service.from}</p>
            </div>
          </Link>
        ))}
      </div>

      <h2 className="mt-12 text-lg font-bold text-navy md:text-xl">Why Sarco Appliances</h2>
      <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
        {whyChooseUs.map((item) => (
          <div key={item.title} className="border border-border bg-surface p-4 text-center">
            <item.icon className="mx-auto h-6 w-6 text-navy" />
            <p className="mt-2 text-xs font-bold text-navy">{item.title}</p>
            <p className="mt-1 text-xs text-muted">{item.desc}</p>
          </div>
        ))}
      </div>

      <h2 className="mt-12 text-lg font-bold text-navy md:text-xl">Explore Repair &amp; Services</h2>
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {subPages.map((page) => (
          <Link
            key={page.href}
            href={page.href}
            className="flex items-center justify-between gap-3 border border-border bg-white p-4 transition hover:border-navy"
          >
            <div>
              <p className="font-bold text-navy">{page.title}</p>
              <p className="mt-1 text-xs text-muted">{page.desc}</p>
            </div>
            <ArrowRight className="h-4 w-4 shrink-0 text-muted" />
          </Link>
        ))}
      </div>
    </PageContainer>
  );
}
