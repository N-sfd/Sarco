import type { Metadata } from "next";
import Link from "next/link";
import { MapPin, Phone } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { serviceAreas as citiesServed } from "@/lib/data";
import { businessConfig } from "@/config/business";
import { ZipCheckForm } from "./zip-check-form";

export const metadata: Metadata = { title: "Service Areas" };

export default function ServiceAreasPage() {
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
        <span className="text-navy">Service Areas</span>
      </nav>

      <div className="max-w-2xl">
        <h1 className="text-2xl font-bold text-navy md:text-3xl">Service Areas</h1>
        <p className="mt-3 text-sm text-muted md:text-base">
          Our technician fleet dispatches from Hagerstown, Maryland and covers the surrounding Cumberland
          Valley region. Check your ZIP code below or browse the cities we serve.
        </p>
      </div>

      <div className="mt-8 max-w-md">
        <ZipCheckForm />
      </div>

      <h2 className="mt-12 text-lg font-bold text-navy md:text-xl">Cities We Serve</h2>
      <div className="mt-4 flex flex-wrap gap-2">
        {citiesServed.map((city) => (
          <span
            key={city}
            className="border border-border bg-surface px-3 py-1.5 text-sm font-semibold text-navy"
          >
            {city}
          </span>
        ))}
      </div>

      <h2 className="mt-12 text-lg font-bold text-navy md:text-xl">Dispatch Hub</h2>
      <div className="mt-4 max-w-md border border-border bg-white p-5">
        <p className="font-bold text-navy">{businessConfig.primaryContact.label}</p>
        <p className="mt-2 flex items-start gap-2 text-sm text-muted">
          <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          {businessConfig.primaryContact.addressLines.join(", ")}
        </p>
        <p className="mt-1 flex items-center gap-2 text-sm text-muted">
          <Phone className="h-4 w-4 shrink-0 text-accent" />
          {businessConfig.primaryContact.phoneDisplay}
        </p>
        <p className="mt-1 text-xs text-muted">Appointments and service visits are scheduled in advance.</p>
      </div>
    </PageContainer>
  );
}
