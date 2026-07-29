"use client";

import { useState } from "react";
import Link from "next/link";
import { AlertCircle, CheckCircle2, Search, XCircle } from "lucide-react";
import { businessConfig } from "@/config/business";
import {
  checkServiceAvailability,
  normalizeZip,
  type AvailabilityResult,
} from "@/config/serviceAreas";
import { useServiceZip } from "@/stores/service-zip";

export function ZipCheckForm() {
  const savedZip = useServiceZip((s) => s.zip);
  const setSavedZip = useServiceZip((s) => s.setZip);
  const [zip, setZip] = useState(savedZip ?? "");
  const [result, setResult] = useState<AvailabilityResult | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const checked = checkServiceAvailability(zip, "repair");
    setResult(checked);
    if (checked.valid) setSavedZip(checked.zip);
  };

  return (
    <div className="border border-border bg-surface p-5">
      <p className="text-sm font-bold text-navy">Check Repair Coverage in Your ZIP Code</p>
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          required
          value={zip}
          onChange={(e) => {
            setZip(normalizeZip(e.target.value));
            setResult(null);
          }}
          placeholder="Enter ZIP code"
          inputMode="numeric"
          pattern="\d{5}"
          maxLength={5}
          autoComplete="postal-code"
          aria-invalid={result?.status === "invalid" || undefined}
          aria-describedby={result?.status === "invalid" ? "zip-check-error" : undefined}
          className="input-retail"
        />
        <button type="submit" className="btn btn-accent shrink-0">
          <Search className="h-4 w-4" /> Check
        </button>
      </form>

      {result?.status === "invalid" && (
        <div
          id="zip-check-error"
          className="mt-4 flex items-start gap-2 border border-accent/30 bg-white p-3 text-sm text-navy"
          role="alert"
        >
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p>
            <span className="font-semibold">Invalid ZIP code.</span> Enter a valid 5-digit US ZIP
            code (for example, 21740).
          </p>
        </div>
      )}

      {result?.status === "available" && (
        <div className="mt-4 flex items-start gap-2 border border-success/30 bg-white p-3 text-sm text-navy">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
          <p>
            Great news — we service <span className="font-semibold">{result.zip}</span>. Ready to book a
            technician?{" "}
            <Link href="/repair/schedule" className="font-semibold text-accent hover:underline">
              Schedule a repair
            </Link>
            .
          </p>
        </div>
      )}

      {result?.status === "unavailable" && (
        <div className="mt-4 flex items-start gap-2 border border-accent/30 bg-white p-3 text-sm text-navy">
          <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
          <p>
            We do not currently service <span className="font-semibold">{result.zip}</span>. Contact us and our
            team will confirm whether special arrangements are available — call{" "}
            <a href={businessConfig.primaryContact.phoneHref} className="font-semibold text-accent hover:underline">
              {businessConfig.primaryContact.phoneDisplay}
            </a>{" "}
            or email{" "}
            <a href={businessConfig.primaryContact.emailHref} className="font-semibold text-accent hover:underline">
              {businessConfig.primaryContact.email}
            </a>
            .
          </p>
        </div>
      )}
    </div>
  );
}
