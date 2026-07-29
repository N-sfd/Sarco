import type { Metadata } from "next";
import Link from "next/link";
import { Mail, MapPin, Navigation, Phone } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { businessConfig } from "@/config/business";

export const metadata: Metadata = { title: "Service & Operations" };

const offices = [
  {
    label: "Sarco Service & Operations",
    contact: businessConfig.primaryContact,
    note: "Delivery, installation, and repair dispatch for the Hagerstown, MD region.",
  },
  {
    label: businessConfig.ashburnOffice.label,
    contact: businessConfig.ashburnOffice,
    note: "Business administration and builder/contractor account management.",
  },
];

export default function LocationsPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Service &amp; Operations</span>
      </nav>

      <h1 className="text-2xl font-bold text-navy md:text-3xl">Sarco Service &amp; Operations</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted md:text-base">
        Sarco Appliances is an online sales and scheduled service business — we do not operate a public
        walk-in showroom at this time. Appointments and service visits are scheduled in advance from the
        locations below.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {offices.map((office) => {
          const fullAddress = office.contact.addressLines.join(", ");
          const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;

          return (
            <div key={office.label} className="border border-border bg-white p-6">
              <h2 className="text-lg font-bold text-navy">{office.label}</h2>
              <p className="mt-1 text-sm text-muted">{office.note}</p>

              <div className="mt-4 flex items-start gap-2.5 text-sm text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
                <span>
                  {office.contact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </span>
              </div>

              <div className="mt-2.5 flex items-center gap-2.5 text-sm text-muted">
                <Phone className="h-4 w-4 shrink-0 text-navy" />
                <a href={office.contact.phoneHref} className="hover:text-accent">
                  {office.contact.phoneDisplay}
                </a>
              </div>

              <div className="mt-2.5 flex items-center gap-2.5 text-sm text-muted">
                <Mail className="h-4 w-4 shrink-0 text-navy" />
                <a href={office.contact.emailHref} className="hover:text-accent">
                  {office.contact.email}
                </a>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a href={mapsHref} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                  <Navigation className="h-3.5 w-3.5" />
                  Get Directions
                </a>
                <a href={office.contact.phoneHref} className="btn btn-primary btn-sm">
                  Call
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 border border-border bg-surface p-6 text-center">
        <p className="text-sm font-bold text-navy">Ready to schedule delivery, installation, or repair?</p>
        <p className="mt-1 text-sm text-muted">
          Check whether we service your ZIP code, then book online in minutes.
        </p>
        <div className="mt-4 flex flex-wrap justify-center gap-3">
          <Link href="/repair/schedule" className="btn btn-primary">
            Schedule Repair
          </Link>
          <Link href="/contact" className="btn btn-outline">
            Contact Us
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
