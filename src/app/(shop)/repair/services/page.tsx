import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { services, processSteps } from "@/lib/data";

export const metadata: Metadata = { title: "Repair Services" };

export default function RepairServicesPage() {
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
        <span className="text-navy">Repair Services</span>
      </nav>

      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-navy md:text-3xl">Repair Services</h1>
        <p className="mt-3 text-sm text-muted md:text-base">
          Our factory-trained technicians diagnose and repair every major residential and commercial
          appliance, using genuine OEM parts backed by manufacturer warranty. Every visit includes an
          upfront quote before any work begins and a 90-day parts &amp; labor guarantee.
        </p>
      </div>

      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {services.map((service) => (
          <div key={service.name} className="border border-border bg-white p-5">
            <div className="flex items-start gap-4">
              <service.icon className="h-9 w-9 shrink-0 text-accent" />
              <div className="min-w-0">
                <h2 className="font-bold text-navy">{service.name}</h2>
                <p className="mt-1 text-sm text-muted">{service.desc}</p>
                <p className="mt-2 text-sm font-semibold text-navy">Starting at ${service.from}</p>
              </div>
            </div>
            <Link href="/repair/schedule" className="btn btn-outline btn-sm mt-4 w-full">
              Schedule This Repair
            </Link>
          </div>
        ))}
      </div>

      <h2 className="mt-14 text-lg font-bold text-navy md:text-xl">How It Works</h2>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        From booking to warranty, here&apos;s what to expect when you schedule a repair with us.
      </p>
      <ol className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {processSteps.map((item) => (
          <li key={item.step} className="border border-border bg-surface p-5">
            <div className="flex items-center gap-3">
              <span className="text-2xl font-bold text-accent">{item.step}</span>
              <item.icon className="h-6 w-6 text-navy" />
            </div>
            <p className="mt-3 font-bold text-navy">{item.title}</p>
            <p className="mt-1 text-sm text-muted">{item.desc}</p>
          </li>
        ))}
      </ol>

      <div className="mt-10 flex flex-wrap gap-3">
        <Link href="/repair/schedule" className="btn btn-accent">
          Schedule Repair
        </Link>
        <Link href="/repair/faqs" className="btn btn-outline">
          Repair FAQs
        </Link>
      </div>
    </PageContainer>
  );
}
