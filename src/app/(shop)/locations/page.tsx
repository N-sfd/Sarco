import type { Metadata } from "next";
import Link from "next/link";
import { Clock, MapPin, Navigation, Phone } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { stores } from "@/data/stores";

export const metadata: Metadata = { title: "Store Locations" };

export default function LocationsPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Locations</span>
      </nav>

      <h1 className="text-2xl font-bold text-navy md:text-3xl">Store Locations</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted md:text-base">
        Four full-service showrooms across Maryland, West Virginia, and Virginia — stop in to see appliances in
        person, talk to a real salesperson, and schedule delivery or repair service.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        {stores.map((store) => {
          const fullAddress = `${store.address}, ${store.city}, ${store.state} ${store.zip}`;
          const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(fullAddress)}`;
          const telHref = `tel:${store.phone.replace(/[^\d+]/g, "")}`;

          return (
            <div key={store.id} className="border border-border bg-white p-6">
              <h2 className="text-lg font-bold text-navy">
                {store.city}, {store.state}
              </h2>

              <div className="mt-4 flex items-start gap-2.5 text-sm text-muted">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
                <span>
                  {store.address}
                  <br />
                  {store.city}, {store.state} {store.zip}
                </span>
              </div>

              <div className="mt-2.5 flex items-center gap-2.5 text-sm text-muted">
                <Phone className="h-4 w-4 shrink-0 text-navy" />
                <a href={telHref} className="hover:text-accent">
                  {store.phone}
                </a>
              </div>

              <div className="mt-2.5 flex items-start gap-2.5 text-sm text-muted">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
                <span>{store.hours}</span>
              </div>

              <div className="mt-5 flex flex-wrap gap-3">
                <a href={mapsHref} target="_blank" rel="noreferrer" className="btn btn-outline btn-sm">
                  <Navigation className="h-3.5 w-3.5" />
                  Get Directions
                </a>
                <a href={telHref} className="btn btn-primary btn-sm">
                  Call Store
                </a>
              </div>
            </div>
          );
        })}
      </div>

      <div className="mt-10 border border-border bg-surface p-6 text-center">
        <p className="text-sm font-bold text-navy">Not sure which store has what you need?</p>
        <p className="mt-1 text-sm text-muted">
          Give us a call or send a message — we can check availability across all four locations for you.
        </p>
        <Link href="/contact" className="btn btn-primary mt-4">
          Contact Us
        </Link>
      </div>
    </PageContainer>
  );
}
