"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";

export function FinancingApplyForm() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="border border-border bg-surface p-8 text-center">
        <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
        <h3 className="mt-4 text-xl font-bold text-navy">Application Received</h3>
        <p className="mt-2 text-sm text-muted">
          Thanks for applying. A financing specialist will follow up by phone or email, usually within one
          business day, with your approval decision and available terms.
        </p>
        <Link href="/" className="btn btn-primary mt-6">
          Back to Home
        </Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <fieldset className="border border-border p-4">
        <legend className="px-1 text-sm font-bold text-navy">Applicant Information</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input required placeholder="First name" className="input-retail" />
          <input required placeholder="Last name" className="input-retail" />
          <input required type="email" placeholder="Email address" className="input-retail sm:col-span-2" />
          <input required type="tel" placeholder="Phone number" className="input-retail" />
          <input required placeholder="ZIP code" inputMode="numeric" className="input-retail" />
        </div>
      </fieldset>

      <fieldset className="border border-border p-4">
        <legend className="px-1 text-sm font-bold text-navy">Purchase Details</legend>
        <div className="mt-3 grid gap-3 sm:grid-cols-2">
          <input
            required
            placeholder="Desired purchase amount (e.g. $2,500)"
            inputMode="numeric"
            className="input-retail sm:col-span-2"
          />
          <select required defaultValue="" className="input-retail sm:col-span-2">
            <option value="" disabled>
              What are you financing?
            </option>
            <option value="kitchen">Kitchen appliance(s)</option>
            <option value="laundry">Laundry pair</option>
            <option value="package">Full kitchen package</option>
            <option value="other">Other appliance purchase</option>
          </select>
        </div>
      </fieldset>

      <p className="text-xs text-muted">
        Submitting this form is a soft inquiry only and does not affect your credit score. By applying, you
        agree to be contacted about your financing options.
      </p>

      <button type="submit" className="btn btn-accent w-full">
        Submit Application
      </button>
    </form>
  );
}
