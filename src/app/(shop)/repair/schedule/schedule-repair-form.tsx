"use client";

import { useId, useState } from "react";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import {
  CheckCircle2,
  ChevronDown,
  ChevronRight,
  Mail,
  MapPin,
  Phone,
  Sun,
  Sunrise,
  Sunset,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { businessConfig } from "@/config/business";
import { checkServiceAvailability, isValidUsZip, normalizeZip, type AvailabilityResult } from "@/config/serviceAreas";
import { useRetailMotion } from "@/lib/motion";
import { FileDropzone } from "@/components/repair/file-dropzone";
import { StepIndicator } from "@/components/repair/step-indicator";
import { services } from "@/lib/data";
import { brands } from "@/data/products";

const STEPS = ["Service", "Appliance", "Problem", "Schedule", "Contact"];

const TIME_WINDOWS = [
  { id: "morning", label: "Morning", range: "8AM – 12PM", icon: Sunrise },
  { id: "afternoon", label: "Afternoon", range: "12PM – 4PM", icon: Sun },
  { id: "evening", label: "Evening", range: "4PM – 7PM", icon: Sunset },
] as const;

type FormState = {
  zip: string;
  applianceType: string;
  brand: string;
  model: string;
  problem: string;
  photos: File[];
  date: string;
  timeWindow: string;
  fullName: string;
  phone: string;
  email: string;
  address: string;
  city: string;
  state: string;
};

const initialState: FormState = {
  zip: "",
  applianceType: "",
  brand: "",
  model: "",
  problem: "",
  photos: [],
  date: "",
  timeWindow: "",
  fullName: "",
  phone: "",
  email: "",
  address: "",
  city: "",
  state: "",
};

type Errors = Partial<Record<keyof FormState, string>>;

const inputClass =
  "h-14 w-full rounded-[14px] border border-[#D8E2EE] bg-white px-[18px] text-[16px] text-ink outline-none transition-colors duration-[250ms] placeholder:text-muted hover:border-[#17438F] focus:border-[#17438F] focus:shadow-[0_0_0_4px_rgba(23,67,143,0.12)]";

function generateRepairReference() {
  const year = new Date().getFullYear();
  const num = Math.floor(Math.random() * 999999)
    .toString()
    .padStart(6, "0");
  return `SR-${year}-${num}`;
}

function Field({
  label,
  htmlFor,
  required,
  error,
  className,
  children,
}: {
  label: string;
  htmlFor: string;
  required?: boolean;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={className}>
      <label htmlFor={htmlFor} className="mb-1.5 block text-[14px] font-semibold text-navy">
        {label} {required && <span className="text-[#C0392B]">*</span>}
      </label>
      {children}
      {error && (
        <p id={`${htmlFor}-error`} role="alert" className="mt-1.5 text-[13px] font-semibold text-[#C0392B]">
          {error}
        </p>
      )}
    </div>
  );
}

function Select({
  id,
  value,
  onChange,
  required,
  error,
  children,
}: {
  id: string;
  value: string;
  onChange: (value: string) => void;
  required?: boolean;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        id={id}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        aria-invalid={!!error}
        aria-describedby={error ? `${id}-error` : undefined}
        className={cn(inputClass, "appearance-none pr-11")}
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted" />
    </div>
  );
}

export function ScheduleRepairForm() {
  const { shouldReduceMotion } = useRetailMotion();
  const [step, setStep] = useState(0);
  const [data, setData] = useState<FormState>(initialState);
  const [errors, setErrors] = useState<Errors>({});
  const [availability, setAvailability] = useState<AvailabilityResult | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [reference, setReference] = useState("");
  const formTopId = useId();

  function set<K extends keyof FormState>(key: K, value: FormState[K]) {
    setData((d) => ({ ...d, [key]: value }));
    setErrors((e) => ({ ...e, [key]: undefined }));
  }

  function validateStep(index: number): Errors {
    const next: Errors = {};
    if (index === 0) {
      if (!isValidUsZip(data.zip)) next.zip = "Enter a valid 5-digit ZIP code.";
    }
    if (index === 1) {
      if (!data.applianceType) next.applianceType = "Select an appliance type.";
      if (!data.brand) next.brand = "Select a brand.";
    }
    if (index === 2) {
      if (data.problem.trim().length < 10) next.problem = "Tell us a bit more about the issue.";
    }
    if (index === 3) {
      if (!data.date) next.date = "Choose a preferred date.";
      if (!data.timeWindow) next.timeWindow = "Choose a time window.";
    }
    if (index === 4) {
      if (!data.fullName.trim()) next.fullName = "Full name is required.";
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) next.email = "Enter a valid email address.";
      if (data.phone.trim().length < 7) next.phone = "Enter a valid phone number.";
      if (!data.address.trim()) next.address = "Street address is required.";
      if (!data.city.trim()) next.city = "City is required.";
      if (!data.state.trim()) next.state = "State is required.";
    }
    return next;
  }

  function goNext() {
    const stepErrors = validateStep(step);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    if (step === 0) {
      setAvailability(checkServiceAvailability(data.zip, "repair"));
    }
    setStep((s) => Math.min(s + 1, STEPS.length - 1));
    document.getElementById(formTopId)?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth", block: "start" });
  }

  function goPrev() {
    setStep((s) => Math.max(s - 1, 0));
    document.getElementById(formTopId)?.scrollIntoView({ behavior: shouldReduceMotion ? "auto" : "smooth", block: "start" });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const stepErrors = validateStep(4);
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      return;
    }
    setReference(generateRepairReference());
    setSubmitted(true);
  }

  function resetForm() {
    setData(initialState);
    setErrors({});
    setAvailability(null);
    setStep(0);
    setSubmitted(false);
  }

  if (submitted) {
    return <SuccessCard reference={reference} onScheduleAnother={resetForm} />;
  }

  const slideVariants = {
    enter: { opacity: 0, x: shouldReduceMotion ? 0 : 24 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: shouldReduceMotion ? 0 : -24 },
  };

  return (
    <form id={formTopId} onSubmit={handleSubmit} noValidate>
      <StepIndicator steps={STEPS} currentIndex={step} />

      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          key={step}
          variants={slideVariants}
          initial="enter"
          animate="center"
          exit="exit"
          transition={{ duration: shouldReduceMotion ? 0.15 : 0.3, ease: [0.22, 1, 0.36, 1] }}
        >
          {step === 0 && (
            <div className="space-y-6">
              <Field label="ZIP code" htmlFor="zip" required error={errors.zip}>
                <input
                  id="zip"
                  inputMode="numeric"
                  maxLength={5}
                  required
                  value={data.zip}
                  onChange={(e) => {
                    set("zip", normalizeZip(e.target.value));
                    setAvailability(null);
                  }}
                  placeholder="e.g. 21740"
                  pattern="\d{5}"
                  autoComplete="postal-code"
                  aria-invalid={!!errors.zip}
                  aria-describedby={errors.zip ? "zip-error" : undefined}
                  className={inputClass}
                />
              </Field>
              {availability && availability.status !== "invalid" && (
                <div
                  className={cn(
                    "rounded-[14px] border p-4 text-[14px]",
                    availability.available
                      ? "border-[#BEE3C6] bg-[#F2FBF4] text-[#1F7A3F]"
                      : "border-[#F3D3CC] bg-[#FDF3F1] text-[#8A3B2C]",
                  )}
                >
                  {availability.available
                    ? `Great news — Sarco Appliances services ${availability.zip}.`
                    : `We don't currently list ${availability.zip} as a standard service area — you can still submit a request and our team will confirm.`}
                </div>
              )}
            </div>
          )}

          {step === 1 && (
            <div className="grid gap-6 sm:grid-cols-2">
              <Field label="Appliance type" htmlFor="applianceType" required error={errors.applianceType}>
                <Select id="applianceType" value={data.applianceType} onChange={(v) => set("applianceType", v)} required error={errors.applianceType}>
                  <option value="" disabled>
                    Select appliance type
                  </option>
                  {services.map((s) => (
                    <option key={s.name} value={s.name}>
                      {s.name}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Brand" htmlFor="brand" required error={errors.brand}>
                <Select id="brand" value={data.brand} onChange={(v) => set("brand", v)} required error={errors.brand}>
                  <option value="" disabled>
                    Select brand
                  </option>
                  {brands.map((b) => (
                    <option key={b} value={b}>
                      {b}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Model number (if known)" htmlFor="model" className="sm:col-span-2">
                <input
                  id="model"
                  value={data.model}
                  onChange={(e) => set("model", e.target.value)}
                  placeholder="e.g. WRF555SDFZ"
                  className={inputClass}
                />
              </Field>
            </div>
          )}

          {step === 2 && (
            <div className="space-y-6">
              <Field label="Describe the issue" htmlFor="problem" required error={errors.problem}>
                <textarea
                  id="problem"
                  required
                  value={data.problem}
                  onChange={(e) => set("problem", e.target.value)}
                  placeholder="What's happening with your appliance? Include any error codes, noises, or symptoms."
                  aria-invalid={!!errors.problem}
                  aria-describedby={errors.problem ? "problem-error" : undefined}
                  className="min-h-[140px] w-full resize-y rounded-2xl border border-[#D8E2EE] bg-white p-[18px] text-[16px] text-ink outline-none transition-colors duration-[250ms] placeholder:text-muted hover:border-[#17438F] focus:border-[#17438F] focus:shadow-[0_0_0_4px_rgba(23,67,143,0.12)]"
                />
              </Field>
              <FileDropzone files={data.photos} onFilesChange={(files) => setData((d) => ({ ...d, photos: files }))} />
            </div>
          )}

          {step === 3 && (
            <div className="space-y-8">
              <Field label="Preferred date" htmlFor="date" required error={errors.date}>
                <input
                  id="date"
                  type="date"
                  required
                  value={data.date}
                  min={new Date().toISOString().slice(0, 10)}
                  onChange={(e) => set("date", e.target.value)}
                  aria-invalid={!!errors.date}
                  aria-describedby={errors.date ? "date-error" : undefined}
                  className={inputClass}
                />
              </Field>

              <fieldset>
                <legend className="mb-3 text-[14px] font-semibold text-navy">
                  Preferred time window <span className="text-[#C0392B]">*</span>
                </legend>
                <div className="grid gap-4 sm:grid-cols-3" role="radiogroup" aria-describedby={errors.timeWindow ? "timeWindow-error" : undefined}>
                  {TIME_WINDOWS.map((w) => {
                    const selected = data.timeWindow === w.id;
                    const Icon = w.icon;
                    return (
                      <button
                        key={w.id}
                        type="button"
                        role="radio"
                        aria-checked={selected}
                        onClick={() => set("timeWindow", w.id)}
                        className={cn(
                          "flex flex-col items-center gap-2 rounded-[16px] border-2 px-4 py-6 text-center transition-colors duration-200",
                          selected ? "border-[#17438F] bg-[#EAF1FB]" : "border-[#D8E2EE] bg-white hover:border-[#17438F]/50",
                        )}
                      >
                        <Icon className={cn("h-6 w-6", selected ? "text-[#17438F]" : "text-muted")} />
                        <span className={cn("text-[15px] font-bold", selected ? "text-[#17438F]" : "text-navy")}>{w.label}</span>
                        <span className="text-[13px] text-muted">{w.range}</span>
                      </button>
                    );
                  })}
                </div>
                {errors.timeWindow && (
                  <p id="timeWindow-error" role="alert" className="mt-2 text-[13px] font-semibold text-[#C0392B]">
                    {errors.timeWindow}
                  </p>
                )}
              </fieldset>
            </div>
          )}

          {step === 4 && (
            <div className="space-y-8">
              <div className="grid gap-6 sm:grid-cols-2">
                <Field label="Full name" htmlFor="fullName" required error={errors.fullName} className="sm:col-span-2">
                  <input
                    id="fullName"
                    required
                    value={data.fullName}
                    onChange={(e) => set("fullName", e.target.value)}
                    aria-invalid={!!errors.fullName}
                    aria-describedby={errors.fullName ? "fullName-error" : undefined}
                    className={inputClass}
                  />
                </Field>
                <Field label="Phone number" htmlFor="phone" required error={errors.phone}>
                  <input
                    id="phone"
                    type="tel"
                    required
                    value={data.phone}
                    onChange={(e) => set("phone", e.target.value)}
                    aria-invalid={!!errors.phone}
                    aria-describedby={errors.phone ? "phone-error" : undefined}
                    className={inputClass}
                  />
                </Field>
                <Field label="Email address" htmlFor="email" required error={errors.email}>
                  <input
                    id="email"
                    type="email"
                    required
                    value={data.email}
                    onChange={(e) => set("email", e.target.value)}
                    aria-invalid={!!errors.email}
                    aria-describedby={errors.email ? "email-error" : undefined}
                    className={inputClass}
                  />
                </Field>
                <Field label="Street address" htmlFor="address" required error={errors.address} className="sm:col-span-2">
                  <input
                    id="address"
                    required
                    value={data.address}
                    onChange={(e) => set("address", e.target.value)}
                    aria-invalid={!!errors.address}
                    aria-describedby={errors.address ? "address-error" : undefined}
                    className={inputClass}
                  />
                </Field>
                <Field label="City" htmlFor="city" required error={errors.city}>
                  <input
                    id="city"
                    required
                    value={data.city}
                    onChange={(e) => set("city", e.target.value)}
                    aria-invalid={!!errors.city}
                    aria-describedby={errors.city ? "city-error" : undefined}
                    className={inputClass}
                  />
                </Field>
                <Field label="State" htmlFor="state" required error={errors.state}>
                  <input
                    id="state"
                    required
                    value={data.state}
                    onChange={(e) => set("state", e.target.value)}
                    aria-invalid={!!errors.state}
                    aria-describedby={errors.state ? "state-error" : undefined}
                    className={inputClass}
                  />
                </Field>
              </div>

              <div className="rounded-[16px] border border-[#D8E2EE] bg-[#FAFBFD] p-5">
                <p className="mb-2 text-[13px] font-bold uppercase tracking-wide text-muted">Review your request</p>
                <dl className="grid gap-x-6 gap-y-1.5 text-[14px] text-ink sm:grid-cols-2">
                  <ReviewRow label="Appliance" value={[data.applianceType, data.brand].filter(Boolean).join(" · ") || "—"} />
                  <ReviewRow label="ZIP code" value={data.zip || "—"} />
                  <ReviewRow
                    label="Appointment"
                    value={
                      data.date && data.timeWindow
                        ? `${data.date} · ${TIME_WINDOWS.find((w) => w.id === data.timeWindow)?.label ?? ""}`
                        : "—"
                    }
                  />
                  <ReviewRow label="Photos attached" value={String(data.photos.length)} />
                </dl>
              </div>

              <p className="text-[13px] text-muted">
                By submitting, you&apos;re requesting an appointment for review. We&apos;ll confirm the exact date
                and time window before any technician is dispatched.
              </p>
            </div>
          )}
        </motion.div>
      </AnimatePresence>

      <div className="mt-12 flex flex-col gap-4 sm:flex-row">
        {step > 0 && (
          <button
            type="button"
            onClick={goPrev}
            className="h-[58px] rounded-[14px] border-2 border-[#D8E2EE] px-8 text-[15px] font-bold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:border-[#17438F] hover:text-[#17438F] sm:order-1"
          >
            Previous
          </button>
        )}
        {step < STEPS.length - 1 ? (
          <button
            type="button"
            onClick={goNext}
            className="flex h-[58px] items-center justify-center gap-1.5 rounded-[14px] bg-[#17438F] text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#123469] sm:order-2 sm:flex-1"
          >
            Next
            <ChevronRight className="h-4 w-4" />
          </button>
        ) : (
          <button
            type="submit"
            className="h-[58px] rounded-[14px] bg-[#17438F] text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#123469] sm:order-2 sm:flex-1"
          >
            Submit Request
          </button>
        )}
      </div>
    </form>
  );
}

function ReviewRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex justify-between gap-3 sm:block">
      <dt className="text-muted">{label}</dt>
      <dd className="font-semibold text-navy">{value}</dd>
    </div>
  );
}

function SuccessCard({ reference, onScheduleAnother }: { reference: string; onScheduleAnother: () => void }) {
  return (
    <div className="flex flex-col items-center py-6 text-center">
      <motion.div
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18 }}
        className="grid h-20 w-20 place-items-center rounded-full bg-[#F2FBF4]"
      >
        <CheckCircle2 className="h-11 w-11 text-[#1F7A3F]" />
      </motion.div>
      <h2 className="mt-6 text-2xl font-bold text-navy">Request Submitted</h2>
      <p className="mt-2 text-[15px] font-semibold text-[#17438F]">{reference}</p>
      <p className="mx-auto mt-3 max-w-sm text-[15px] text-muted">
        Our team will review your request and contact you shortly to confirm your appointment window.
      </p>

      <div className="mx-auto mt-6 w-full max-w-sm space-y-2 rounded-[16px] border border-[#D8E2EE] bg-[#FAFBFD] p-4 text-left text-[13px] text-muted">
        <p className="flex items-center gap-2">
          <Phone className="h-3.5 w-3.5 shrink-0 text-[#17438F]" />
          <a href={businessConfig.primaryContact.phoneHref} className="font-semibold text-navy hover:text-[#17438F]">
            {businessConfig.primaryContact.phoneDisplay}
          </a>
        </p>
        <p className="flex items-center gap-2">
          <Mail className="h-3.5 w-3.5 shrink-0 text-[#17438F]" />
          <a href={businessConfig.primaryContact.emailHref} className="font-semibold text-navy hover:text-[#17438F]">
            {businessConfig.primaryContact.email}
          </a>
        </p>
        <p className="flex items-center gap-2">
          <MapPin className="h-3.5 w-3.5 shrink-0 text-[#17438F]" />
          {businessConfig.primaryContact.addressLines.join(", ")}
        </p>
      </div>

      <div className="mt-8 flex w-full max-w-sm flex-col gap-3 sm:flex-row">
        <Link href="/" className="h-[52px] flex-1 rounded-[14px] border-2 border-[#D8E2EE] text-[15px] font-bold text-navy transition-all duration-200 hover:-translate-y-0.5 hover:border-[#17438F] hover:text-[#17438F] flex items-center justify-center">
          Return Home
        </Link>
        <button
          type="button"
          onClick={onScheduleAnother}
          className="h-[52px] flex-1 rounded-[14px] bg-[#17438F] text-[15px] font-bold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#123469]"
        >
          Schedule Another Service
        </button>
      </div>
    </div>
  );
}
