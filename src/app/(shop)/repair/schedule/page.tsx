import type { Metadata } from "next";
import Link from "next/link";
import { BadgeCheck, Clock3, Mail, Phone, ShieldCheck, Sparkles, Wrench } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { businessConfig } from "@/config/business";
import { ScheduleRepairForm } from "./schedule-repair-form";

export const metadata: Metadata = { title: "Schedule Repair" };

const highlights = [
  { icon: BadgeCheck, text: "Factory-trained technicians" },
  { icon: Clock3, text: "Fast scheduling" },
  { icon: ShieldCheck, text: "Genuine replacement parts" },
  { icon: Sparkles, text: "Warranty support" },
  { icon: Wrench, text: "Transparent pricing" },
];

export default function ScheduleRepairPage() {
  return (
    <>
      <PageContainer className="pt-6">
        <nav className="text-xs text-muted">
          <Link href="/" className="hover:text-accent">
            Home
          </Link>
          <span className="mx-1">/</span>
          <Link href="/repair" className="hover:text-accent">
            Repair &amp; Services
          </Link>
          <span className="mx-1">/</span>
          <span className="text-navy">Schedule Repair</span>
        </nav>
      </PageContainer>

      <div
        className="px-5 pb-16 pt-10 sm:px-6 lg:px-6 lg:pb-20 lg:pt-12"
        style={{ maxWidth: "1280px", margin: "0 auto" }}
      >
        <div className="grid gap-10 lg:grid-cols-[35%_65%] lg:items-start lg:gap-12">
          {/* Left info panel */}
          <section className="rounded-[32px] bg-[#EAF1FB] p-8 lg:sticky lg:top-24 lg:p-10">
            <p className="inline-flex items-center gap-1.5 text-[13px] font-bold uppercase tracking-[0.08em] text-[#17438F]">
              <Wrench className="h-3.5 w-3.5" /> Schedule Repair
            </p>
            <h1 className="mt-3 text-[30px] font-bold leading-[1.15] text-navy md:text-[34px]">
              Need appliance repair?
            </h1>
            <p className="mt-3 text-[15px] leading-relaxed text-muted">
              Professional diagnosis and repair by certified technicians.
            </p>

            <ul className="mt-7 space-y-3">
              {highlights.map((item) => (
                <li key={item.text} className="flex items-center gap-2.5 text-[14px] font-semibold text-navy">
                  <span className="grid h-6 w-6 shrink-0 place-items-center rounded-full bg-white text-[#17438F]">
                    <item.icon className="h-3.5 w-3.5" />
                  </span>
                  {item.text}
                </li>
              ))}
            </ul>

            <div className="mt-8 rounded-[20px] border border-white bg-white/70 p-5">
              <p className="text-[14px] font-bold text-navy">Need immediate assistance?</p>
              <div className="mt-3 space-y-2 text-[14px]">
                <a
                  href={businessConfig.primaryContact.phoneHref}
                  className="flex items-center gap-2 font-semibold text-[#17438F] hover:underline"
                >
                  <Phone className="h-4 w-4 shrink-0" /> {businessConfig.primaryContact.phoneDisplay}
                </a>
                <a
                  href={businessConfig.primaryContact.emailHref}
                  className="flex items-center gap-2 font-semibold text-[#17438F] hover:underline"
                >
                  <Mail className="h-4 w-4 shrink-0" /> {businessConfig.primaryContact.email}
                </a>
              </div>
            </div>
          </section>

          {/* Right form card */}
          <section>
            <div
              className="mx-auto w-full rounded-[32px] border border-[#E6ECF4] bg-white p-6 shadow-[0_18px_60px_rgba(0,0,0,0.08)] sm:p-9 lg:p-12"
              style={{ maxWidth: "760px" }}
            >
              <div className="mb-10 text-center">
                <h2 className="text-2xl font-bold text-navy md:text-[28px]">Schedule Your Service</h2>
                <p className="mx-auto mt-2 max-w-md text-[15px] text-muted">
                  Complete the form below and our team will contact you to confirm your appointment.
                </p>
              </div>

              <ScheduleRepairForm />
            </div>
          </section>
        </div>
      </div>
    </>
  );
}
