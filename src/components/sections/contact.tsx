"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Phone,
  Mail,
  Clock,
  MapPin,
  Upload,
  CheckCircle2,
  CalendarCheck,
  ShieldCheck,
} from "lucide-react";
import { brands } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";

const timeSlots = ["8AM – 10AM", "10AM – 12PM", "12PM – 2PM", "2PM – 4PM", "4PM – 6PM"];

export function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [fileName, setFileName] = useState("");

  return (
    <section id="contact" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-12 lg:py-24">
      <SectionHeading
        eyebrow="Book an Appointment"
        title="Schedule your service in minutes"
        description="Tell us what's going on and pick a time that works. A certified technician will confirm shortly."
      />

      <div className="mt-14 grid gap-8 lg:grid-cols-[1fr_1.4fr]">
        {/* Info column */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="flex flex-col gap-4"
        >
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-navy to-royal p-7 text-white shadow-card">
            <div className="pointer-events-none absolute -right-10 -top-10 h-40 w-40 rounded-full bg-accent/20 blur-2xl" />
            <h3 className="font-display text-xl font-bold">Get in touch</h3>
            <p className="mt-1 text-sm text-white/70">We&apos;re here 7 days a week to help.</p>

            <div className="mt-6 space-y-4">
              {[
                { icon: Phone, label: "Call or text", value: "1-800-555-0199", href: "tel:+18005550199" },
                { icon: Mail, label: "Email", value: "hello@abcappliance.com", href: "mailto:hello@abcappliance.com" },
                { icon: MapPin, label: "Visit", value: "1200 Commerce Dr, Springfield, MD" },
                { icon: Clock, label: "Hours", value: "Mon–Fri 7–7 · Sat 8–5" },
              ].map((c) => (
                <div key={c.label} className="flex items-center gap-3">
                  <span className="grid h-10 w-10 shrink-0 place-items-center rounded-xl bg-white/12 text-accent-400">
                    <c.icon className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/50">{c.label}</p>
                    {c.href ? (
                      <a href={c.href} className="text-sm font-semibold transition hover:text-accent-400">
                        {c.value}
                      </a>
                    ) : (
                      <p className="text-sm font-semibold">{c.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3">
            {[
              { icon: CalendarCheck, label: "Same-Day" },
              { icon: ShieldCheck, label: "Warranty" },
              { icon: CheckCircle2, label: "Licensed" },
            ].map((b) => (
              <div key={b.label} className="flex flex-col items-center gap-1.5 rounded-2xl border border-navy/8 bg-white p-4 text-center shadow-soft">
                <b.icon className="h-6 w-6 text-royal" />
                <span className="text-xs font-semibold text-navy">{b.label}</span>
              </div>
            ))}
          </div>
        </motion.div>

        {/* Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-3xl border border-navy/8 bg-white p-6 shadow-card sm:p-8"
        >
          {submitted ? (
            <div className="flex h-full min-h-[24rem] flex-col items-center justify-center gap-4 text-center">
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ type: "spring", damping: 12 }}
                className="grid h-20 w-20 place-items-center rounded-full bg-success/12 text-success"
              >
                <CheckCircle2 className="h-11 w-11" />
              </motion.span>
              <h3 className="font-display text-2xl font-bold text-navy">Request received!</h3>
              <p className="max-w-sm text-ink/60">
                Thanks for booking with ABC Appliance. A certified technician will confirm your appointment by
                phone or text within the hour.
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="mt-2 rounded-full border-2 border-navy/15 px-6 py-2.5 text-sm font-semibold text-navy transition hover:border-royal hover:text-royal"
              >
                Book another
              </button>
            </div>
          ) : (
            <form
              onSubmit={(e) => {
                e.preventDefault();
                setSubmitted(true);
              }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              <Field label="Full name" required>
                <input required className={inputCls} placeholder="Jane Doe" />
              </Field>
              <Field label="Phone" required>
                <input required type="tel" className={inputCls} placeholder="(555) 123-4567" />
              </Field>
              <Field label="Email" required>
                <input required type="email" className={inputCls} placeholder="jane@email.com" />
              </Field>
              <Field label="ZIP code" required>
                <input required inputMode="numeric" className={inputCls} placeholder="21701" />
              </Field>
              <Field label="Brand">
                <select className={inputCls} defaultValue="">
                  <option value="" disabled>
                    Select brand
                  </option>
                  {brands.map((b) => (
                    <option key={b}>{b}</option>
                  ))}
                </select>
              </Field>
              <Field label="Model number">
                <input className={inputCls} placeholder="e.g. WRF535SWHZ" />
              </Field>
              <Field label="Preferred date">
                <input type="date" className={inputCls} />
              </Field>
              <Field label="Preferred time">
                <select className={inputCls} defaultValue="">
                  <option value="" disabled>
                    Select a window
                  </option>
                  {timeSlots.map((t) => (
                    <option key={t}>{t}</option>
                  ))}
                </select>
              </Field>
              <Field label="Describe the issue" className="sm:col-span-2">
                <textarea
                  rows={4}
                  className={`${inputCls} resize-none`}
                  placeholder="Tell us what's happening with your appliance…"
                />
              </Field>

              <div className="sm:col-span-2">
                <label className="flex cursor-pointer items-center justify-center gap-3 rounded-xl border-2 border-dashed border-navy/15 bg-mist px-4 py-5 text-sm text-ink/60 transition hover:border-royal hover:bg-royal/5">
                  <Upload className="h-5 w-5 text-royal" />
                  {fileName || "Upload a photo of your appliance (optional)"}
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setFileName(e.target.files?.[0]?.name ?? "")}
                  />
                </label>
              </div>

              <button
                type="submit"
                className="group mt-2 flex items-center justify-center gap-2 rounded-full bg-accent px-8 py-4 text-base font-semibold text-white shadow-card transition hover:bg-accent-600 hover:shadow-lift sm:col-span-2"
              >
                <CalendarCheck className="h-5 w-5" />
                Submit Booking Request
              </button>
              <p className="text-center text-xs text-ink/45 sm:col-span-2">
                By submitting, you agree to our Terms & Privacy Policy. No spam, ever.
              </p>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}

const inputCls =
  "w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/40 transition focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20";

function Field({
  label,
  children,
  required,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-sm font-semibold text-navy">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}
