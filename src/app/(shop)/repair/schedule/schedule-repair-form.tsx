"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { generateReference } from "@/lib/utils";
import { services } from "@/lib/data";
import { brands } from "@/data/products";

const TIME_WINDOWS = ["Morning (8am – 12pm)", "Afternoon (12pm – 4pm)", "Evening (4pm – 7pm)"];

export function ScheduleRepairForm() {
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setReference(generateReference("SR"));
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-border bg-surface p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
        <h2 className="mt-4 text-xl font-bold text-navy">Repair Request Received</h2>
        <p className="mt-2 text-sm text-muted">
          Reference <span className="font-semibold text-navy">{reference}</span> has been created. A
          scheduling specialist will call to confirm your appointment window shortly.
        </p>
        <div className="mt-6 flex flex-wrap justify-center gap-3">
          <Link href="/repair/track" className="btn btn-primary">
            Track This Repair
          </Link>
          <Link href="/" className="btn btn-outline">
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset className="border border-border p-4">
        <legend className="px-1 text-sm font-bold text-navy">Contact Information</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input required placeholder="Full name" className="input-retail sm:col-span-2" />
          <input required type="tel" placeholder="Phone number" className="input-retail" />
          <input required type="email" placeholder="Email address" className="input-retail" />
          <input required placeholder="ZIP code" inputMode="numeric" className="input-retail sm:col-span-2" />
        </div>
      </fieldset>

      <fieldset className="border border-border p-4">
        <legend className="px-1 text-sm font-bold text-navy">Appliance Details</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <select required defaultValue="" className="input-retail">
            <option value="" disabled>
              Appliance type
            </option>
            {services.map((service) => (
              <option key={service.name} value={service.name}>
                {service.name}
              </option>
            ))}
          </select>
          <select required defaultValue="" className="input-retail">
            <option value="" disabled>
              Brand
            </option>
            {brands.map((brand) => (
              <option key={brand} value={brand}>
                {brand}
              </option>
            ))}
          </select>
          <input placeholder="Model number (if known)" className="input-retail sm:col-span-2" />
        </div>
      </fieldset>

      <fieldset className="border border-border p-4">
        <legend className="px-1 text-sm font-bold text-navy">Appointment Preferences</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input required type="date" className="input-retail" />
          <select required defaultValue="" className="input-retail">
            <option value="" disabled>
              Preferred time window
            </option>
            {TIME_WINDOWS.map((window) => (
              <option key={window} value={window}>
                {window}
              </option>
            ))}
          </select>
        </div>
      </fieldset>

      <fieldset className="border border-border p-4">
        <legend className="px-1 text-sm font-bold text-navy">Describe the Issue</legend>
        <textarea
          required
          rows={4}
          placeholder="What's happening with your appliance? Include any error codes, noises, or symptoms."
          className="input-retail mt-3"
        />
      </fieldset>

      <button type="submit" className="btn btn-accent w-full">
        Request Appointment
      </button>
    </form>
  );
}
