"use client";

import { useState } from "react";
import { AlertCircle, CheckCircle2, MapPin, Phone, Mail, X, XCircle } from "lucide-react";
import { businessConfig } from "@/config/business";
import {
  serviceTypeLabels,
  checkServiceAvailability,
  normalizeZip,
  type ServiceType,
  type AvailabilityResult,
} from "@/config/serviceAreas";
import { useUiStore } from "@/stores/wishlist";
import { useServiceZip } from "@/stores/service-zip";
import { useDialog } from "@/lib/use-dialog";

const serviceTypes = Object.keys(serviceTypeLabels) as ServiceType[];

export function ServiceAvailabilityModal() {
  const open = useUiStore((s) => s.serviceModalOpen);
  const close = () => useUiStore.getState().setServiceModalOpen(false);
  const savedZip = useServiceZip((s) => s.zip);
  const setSavedZip = useServiceZip((s) => s.setZip);

  const [zip, setZip] = useState(savedZip ?? "");
  const [serviceType, setServiceType] = useState<ServiceType>("delivery");
  const [result, setResult] = useState<AvailabilityResult | null>(null);
  const dialogRef = useDialog<HTMLDivElement>(open, close);

  // Reset the form each time the modal opens — adjusted during render (not
  // an effect) per React's guidance for resetting state on prop change.
  const [prevOpen, setPrevOpen] = useState(open);
  if (open !== prevOpen) {
    setPrevOpen(open);
    if (open) {
      setZip(savedZip ?? "");
      setResult(null);
    }
  }

  if (!open) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const checked = checkServiceAvailability(zip, serviceType);
    setResult(checked);
    if (checked.valid) setSavedZip(checked.zip);
  };

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center overflow-y-auto bg-navy/50 px-4 py-10">
      <div className="absolute inset-0" onClick={close} aria-hidden />
      <div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby="service-modal-title"
        tabIndex={-1}
        className="relative z-10 w-full max-w-md border border-border bg-white shadow-xl outline-none"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 id="service-modal-title" className="text-base font-bold text-navy">
            Check Delivery or Repair Availability
          </h2>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center hover:bg-surface"
            aria-label="Close"
            onClick={close}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4 p-4">
          <div>
            <label htmlFor="service-zip" className="mb-1 block text-xs font-semibold text-navy">
              ZIP code
            </label>
            <input
              id="service-zip"
              value={zip}
              onChange={(e) => {
                setZip(normalizeZip(e.target.value));
                setResult(null);
              }}
              placeholder="e.g. 21740"
              inputMode="numeric"
              pattern="\d{5}"
              maxLength={5}
              autoComplete="postal-code"
              required
              aria-invalid={result?.status === "invalid" || undefined}
              aria-describedby={result?.status === "invalid" ? "service-zip-error" : undefined}
              className="input-retail"
            />
          </div>

          <div>
            <label htmlFor="service-type" className="mb-1 block text-xs font-semibold text-navy">
              Service type
            </label>
            <select
              id="service-type"
              value={serviceType}
              onChange={(e) => {
                setServiceType(e.target.value as ServiceType);
                setResult(null);
              }}
              className="input-retail"
            >
              {serviceTypes.map((type) => (
                <option key={type} value={type}>
                  {serviceTypeLabels[type]}
                </option>
              ))}
            </select>
          </div>

          <button type="submit" className="btn btn-primary w-full">
            Check Availability
          </button>

          {result?.status === "invalid" && (
            <div
              id="service-zip-error"
              className="flex items-start gap-2 border border-accent/30 bg-accent/5 p-3 text-sm text-navy"
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
            <div className="flex items-start gap-2 border border-success/30 bg-success/5 p-3 text-sm text-navy">
              <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
              <p>
                Great news — Sarco Appliances serves{" "}
                <span className="font-semibold">{result.zip}</span> for{" "}
                {serviceTypeLabels[result.serviceType].toLowerCase()}.
              </p>
            </div>
          )}

          {result?.status === "unavailable" && (
            <div className="space-y-3 border border-accent/30 bg-accent/5 p-3 text-sm text-navy">
              <div className="flex items-start gap-2">
                <XCircle className="mt-0.5 h-4 w-4 shrink-0 text-accent" />
                <p>
                  We do not currently service ZIP{" "}
                  <span className="font-semibold">{result.zip}</span>. Contact us and our team will confirm
                  whether special arrangements are available.
                </p>
              </div>
              <div className="space-y-1.5 pl-6 text-xs">
                <a href={businessConfig.primaryContact.phoneHref} className="flex items-center gap-1.5 font-semibold text-navy hover:text-accent">
                  <Phone className="h-3.5 w-3.5" /> Call {businessConfig.primaryContact.phoneDisplay}
                </a>
                <a href={businessConfig.primaryContact.emailHref} className="flex items-center gap-1.5 font-semibold text-navy hover:text-accent">
                  <Mail className="h-3.5 w-3.5" /> Email {businessConfig.primaryContact.email}
                </a>
              </div>
            </div>
          )}

          <p className="flex items-start gap-1.5 text-xs text-muted">
            <MapPin className="mt-0.5 h-3 w-3 shrink-0" />
            Service area: Hagerstown, MD and surrounding regions.
          </p>
        </form>
      </div>
    </div>
  );
}
