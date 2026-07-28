"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Clock, Mail, MapPin, Phone } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { siteConfig } from "@/config/site";
import { businessConfig } from "@/config/business";
import { stores } from "@/data/stores";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Contact Us</span>
      </nav>

      <h1 className="text-2xl font-bold text-navy md:text-3xl">Contact Us</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted md:text-base">
        Questions about a product, an order, or scheduling repair service? Send us a message and a team member will
        get back to you, or reach out directly using the information below.
      </p>

      <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">
        {submitted ? (
          <div className="border border-border bg-surface p-8 text-center">
            <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
            <h2 className="mt-4 text-xl font-bold text-navy">Message Sent</h2>
            <p className="mt-2 text-sm text-muted">
              Thanks for reaching out. A member of our team will respond within one business day.
            </p>
            <Link href="/" className="btn btn-primary mt-6">
              Back to Home
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <fieldset className="border border-border p-4">
              <legend className="px-1 text-sm font-bold text-navy">Your Information</legend>
              <div className="mt-3 grid gap-3 sm:grid-cols-2">
                <input required placeholder="First name" className="input-retail" />
                <input required placeholder="Last name" className="input-retail" />
                <input required type="email" placeholder="Email address" className="input-retail sm:col-span-2" />
                <input required type="tel" placeholder="Phone number" className="input-retail sm:col-span-2" />
              </div>
            </fieldset>

            <fieldset className="border border-border p-4">
              <legend className="px-1 text-sm font-bold text-navy">Your Message</legend>
              <div className="mt-3 space-y-3">
                <select required defaultValue="" className="input-retail">
                  <option value="" disabled>
                    Select a subject
                  </option>
                  <option value="sales">Product / Sales Question</option>
                  <option value="order">Existing Order</option>
                  <option value="repair">Repair Service</option>
                  <option value="delivery">Delivery / Installation</option>
                  <option value="other">Other</option>
                </select>
                <textarea
                  required
                  placeholder="How can we help?"
                  rows={6}
                  className="input-retail resize-none"
                />
              </div>
            </fieldset>

            <button type="submit" className="btn btn-accent w-full">
              Send Message
            </button>
          </form>
        )}

        <aside className="h-fit space-y-6">
          <div className="border border-border bg-surface p-4">
            <h2 className="text-sm font-bold text-navy">{businessConfig.primaryContact.label}</h2>
            <div className="mt-3 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-navy" />
                <a href={`tel:${siteConfig.phoneTel}`} className="text-muted hover:text-accent">
                  {siteConfig.phone}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-navy" />
                <a href={`mailto:${siteConfig.email}`} className="text-muted hover:text-accent">
                  {siteConfig.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
                <span className="text-muted">
                  {businessConfig.primaryContact.addressLines.join(", ")}
                </span>
              </div>
              <div className="flex items-start gap-2">
                <Clock className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
                <span className="text-muted">Mon–Fri 9–7 · Sat 9–6 · Sun hours vary by store</span>
              </div>
            </div>
          </div>

          <div className="border border-border bg-surface p-4">
            <h2 className="text-sm font-bold text-navy">{businessConfig.ashburnOffice.label}</h2>
            <div className="mt-3 space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 shrink-0 text-navy" />
                <a href={businessConfig.ashburnOffice.phoneHref} className="text-muted hover:text-accent">
                  {businessConfig.ashburnOffice.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-navy" />
                <a href={businessConfig.ashburnOffice.emailHref} className="text-muted hover:text-accent">
                  {businessConfig.ashburnOffice.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
                <span className="text-muted">
                  {businessConfig.ashburnOffice.addressLines.join(", ")}
                </span>
              </div>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessConfig.ashburnOffice.addressLines.join(", "))}`}
                target="_blank"
                rel="noreferrer"
                className="inline-block text-xs font-semibold text-accent hover:underline"
              >
                Get Directions
              </a>
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-sm font-bold text-navy">Our Stores</h2>
            <div className="space-y-3">
              {stores.map((store) => (
                <div key={store.id} className="border border-border bg-white p-3">
                  <p className="text-xs font-bold text-navy">
                    {store.city}, {store.state}
                  </p>
                  <div className="mt-1.5 flex items-start gap-1.5 text-xs text-muted">
                    <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
                    <span>
                      {store.address}, {store.city}, {store.state} {store.zip}
                    </span>
                  </div>
                  <div className="mt-1 flex items-center gap-1.5 text-xs text-muted">
                    <Phone className="h-3 w-3 shrink-0" />
                    <a href={`tel:${store.phone.replace(/[^\d+]/g, "")}`} className="hover:text-accent">
                      {store.phone}
                    </a>
                  </div>
                  <p className="mt-1 text-xs text-muted">{store.hours}</p>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
