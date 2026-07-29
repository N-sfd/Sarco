import type { Metadata } from "next";
import Link from "next/link";
import { BadgeDollarSign, HeartHandshake, TrendingUp, Truck, Users, Wrench } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Careers" };

const openRoles = [
  {
    title: "Delivery Driver",
    type: "Full-Time",
    icon: Truck,
    desc: "Deliver and install major appliances at customer homes. CDL not required for most routes; a clean driving record and the ability to safely lift and maneuver heavy appliances are a must.",
  },
  {
    title: "Appliance Technician",
    type: "Full-Time",
    icon: Wrench,
    desc: "Diagnose and repair refrigerators, washers, dryers, ranges, and dishwashers in customers' homes. Factory training provided for the right candidate; EPA 608 certification a plus.",
  },
  {
    title: "Online Sales Associate",
    type: "Full-Time / Part-Time",
    icon: Users,
    desc: "Help customers find the right refrigerator, laundry pair, or full kitchen package by phone, chat, and email. Product training provided — we're looking for people who genuinely like helping people.",
  },
  {
    title: "Warehouse Associate",
    type: "Full-Time",
    icon: BadgeDollarSign,
    desc: "Receive, inspect, and stage inbound appliance shipments, and load delivery trucks each morning. Forklift experience preferred but not required — we'll train.",
  },
];

const benefits = [
  { title: "Competitive Pay", desc: "Hourly and commission structures that reward hard work, plus regular performance reviews.", icon: BadgeDollarSign },
  { title: "Room to Grow", desc: "Most of our team leads and lead technicians started in sales or the warehouse.", icon: TrendingUp },
  { title: "Real Team Culture", desc: "Small enough that leadership knows your name, established enough to offer real stability.", icon: HeartHandshake },
];

export default function CareersPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Careers</span>
      </nav>

      <h1 className="text-2xl font-bold text-navy md:text-3xl">Careers at {siteConfig.name}</h1>
      <p className="mt-3 max-w-3xl text-sm text-muted md:text-base">
        We&apos;re a locally-owned online appliance retailer serving the Hagerstown, Maryland region — and
        we&apos;re always looking for people who take pride in doing a job right. Whether you&apos;re on the
        phone with a customer, behind the wheel of a delivery truck, or diagnosing a stubborn dryer, your work
        directly shows up in how our customers feel about us.
      </p>

      {/* Benefits */}
      <div className="mt-8 grid gap-4 sm:grid-cols-3">
        {benefits.map((benefit) => (
          <div key={benefit.title} className="border border-border bg-surface p-5">
            <benefit.icon className="h-6 w-6 text-accent" />
            <p className="mt-3 text-sm font-bold text-navy">{benefit.title}</p>
            <p className="mt-1 text-xs text-muted">{benefit.desc}</p>
          </div>
        ))}
      </div>

      {/* Open roles */}
      <section className="mt-12">
        <h2 className="text-xl font-bold text-navy">Open Roles</h2>
        <p className="mt-2 text-sm text-muted">
          Don&apos;t see a fit today? We&apos;re happy to keep your information on file for future openings — reach out
          using the general application link below.
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-2">
          {openRoles.map((role) => (
            <div key={role.title} className="flex flex-col border border-border bg-white p-5">
              <div className="flex items-start justify-between gap-3">
                <div className="flex items-center gap-2">
                  <role.icon className="h-5 w-5 text-navy" />
                  <p className="text-sm font-bold text-navy">{role.title}</p>
                </div>
                <span className="shrink-0 border border-border bg-surface px-2 py-0.5 text-[11px] font-semibold text-muted">
                  {role.type}
                </span>
              </div>
              <p className="mt-3 flex-1 text-xs text-muted">{role.desc}</p>
              <a
                href={`mailto:${siteConfig.email}?subject=${encodeURIComponent(`Application: ${role.title}`)}`}
                className="btn btn-outline btn-sm mt-4 self-start"
              >
                Apply for This Role
              </a>
            </div>
          ))}
        </div>
      </section>

      <div className="mt-12 border border-border bg-navy p-8 text-center">
        <h2 className="text-xl font-bold text-white">Don&apos;t See the Right Role?</h2>
        <p className="mt-2 text-sm text-white/70">
          Send us your resume and tell us what you&apos;re interested in — we review general applications on
          an ongoing basis.
        </p>
        <a
          href={`mailto:${siteConfig.email}?subject=${encodeURIComponent("General Application")}`}
          className="btn btn-accent mt-4"
        >
          Send General Application
        </a>
      </div>
    </PageContainer>
  );
}
