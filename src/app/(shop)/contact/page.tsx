"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Mail, MapPin, Navigation, Phone, Wrench } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { businessConfig } from "@/config/business";
import { useUiStore } from "@/stores/wishlist";

const topics = [
  { value: "product", label: "Product Question" },
  { value: "delivery", label: "Delivery" },
  { value: "installation", label: "Installation" },
  { value: "repair", label: "Repair" },
  { value: "builder", label: "Builder Sales" },
  { value: "financing", label: "Financing" },
  { value: "general", label: "General Inquiry" },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const setServiceModalOpen = useUiStore((s) => s.setServiceModalOpen);

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
                    Select a topic
                  </option>
                  {topics.map((topic) => (
                    <option key={topic.value} value={topic.value}>
                      {topic.label}
                    </option>
                  ))}
                </select>
                <textarea
                  required
                  placeholder="How can we help?"
                  rows={6}
                  className="input-retail resize-none"
                />
                <div>
                  <label htmlFor="contact-image" className="mb-1 block text-xs font-semibold text-navy">
                    Attach a photo (optional)
                  </label>
                  <input id="contact-image" type="file" accept="image/*" className="input-retail" />
                </div>
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
                <a href={businessConfig.primaryContact.phoneHref} className="text-muted hover:text-accent">
                  {businessConfig.primaryContact.phoneDisplay}
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 shrink-0 text-navy" />
                <a href={businessConfig.primaryContact.emailHref} className="text-muted hover:text-accent">
                  {businessConfig.primaryContact.email}
                </a>
              </div>
              <div className="flex items-start gap-2">
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-navy" />
                <span className="text-muted">
                  {businessConfig.primaryContact.addressLines.join(", ")}
                </span>
              </div>
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a href={businessConfig.primaryContact.phoneHref} className="btn btn-outline btn-sm">
                Call
              </a>
              <a href={businessConfig.primaryContact.emailHref} className="btn btn-outline btn-sm">
                Email
              </a>
              <Link href="/repair/schedule" className="btn btn-primary btn-sm">
                <Wrench className="h-3.5 w-3.5" /> Schedule Repair
              </Link>
              <button type="button" className="btn btn-accent btn-sm" onClick={() => setServiceModalOpen(true)}>
                Check Availability
              </button>
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
            </div>
            <div className="mt-4 grid grid-cols-2 gap-2">
              <a href={businessConfig.ashburnOffice.phoneHref} className="btn btn-outline btn-sm">
                Call
              </a>
              <a href={businessConfig.ashburnOffice.emailHref} className="btn btn-outline btn-sm">
                Email
              </a>
              <a
                href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(businessConfig.ashburnOffice.addressLines.join(", "))}`}
                target="_blank"
                rel="noreferrer"
                className="btn btn-outline btn-sm col-span-2"
              >
                <Navigation className="h-3.5 w-3.5" /> Get Directions
              </a>
            </div>
          </div>

          <p className="border border-border bg-white p-4 text-xs leading-relaxed text-muted">
            Sarco Appliances is currently an online sales and scheduled service business. We do not operate a
            public walk-in showroom at this time.
          </p>
        </aside>
      </div>
    </PageContainer>
  );
}
