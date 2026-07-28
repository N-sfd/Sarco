"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { BadgeCheck, Phone, ShieldCheck } from "lucide-react";
import { siteConfig } from "@/config/site";
import { repairServices } from "@/data/homepage";

export function RepairPromoSection() {
  const [zip, setZip] = useState("");
  const [result, setResult] = useState<string | null>(null);

  return (
    <section className="border-b border-border bg-surface">
      <div className="container-retail grid gap-0 py-8 lg:grid-cols-2 lg:gap-8">
        <div className="relative min-h-[280px] overflow-hidden border border-border">
          <Image src="/images/value-repair.jpg" alt="Appliance technician at work" fill className="object-cover" sizes="50vw" />
        </div>
        <div className="flex flex-col justify-center py-6 lg:py-0">
          <h2 className="text-2xl font-bold text-navy md:text-3xl">Expert Appliance Repair</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
            Our trained technicians diagnose and repair refrigerators, washers, dryers, ranges, ovens, dishwashers, and other major appliances.
          </p>

          <div className="mt-4 flex flex-wrap gap-3">
            <span className="inline-flex items-center gap-1.5 border border-border bg-white px-2.5 py-1 text-xs font-semibold text-navy">
              <BadgeCheck className="h-3.5 w-3.5 text-success" /> Factory-trained
            </span>
            <span className="inline-flex items-center gap-1.5 border border-border bg-white px-2.5 py-1 text-xs font-semibold text-navy">
              <ShieldCheck className="h-3.5 w-3.5 text-success" /> Repair warranty
            </span>
          </div>

          <p className="mt-4 text-sm font-semibold text-navy">
            Brands serviced: KitchenAid, Whirlpool, LG, Samsung, GE, Bosch, Maytag, and more.
          </p>
          <p className="mt-1 text-xs text-muted">
            Common services: {repairServices.slice(0, 6).join(", ")}, and more.
          </p>

          <form
            className="mt-4 flex flex-wrap gap-2"
            onSubmit={(e) => {
              e.preventDefault();
              const z = zip.trim();
              setResult(
                z.length >= 5
                  ? `Service available near ${z}. Schedule online or call ${siteConfig.phone}.`
                  : "Enter a valid 5-digit ZIP code.",
              );
            }}
          >
            <input
              value={zip}
              onChange={(e) => setZip(e.target.value)}
              placeholder="Service-area ZIP"
              className="input-retail max-w-[160px]"
              aria-label="Service area ZIP code"
            />
            <button type="submit" className="btn btn-outline">
              Check ZIP
            </button>
          </form>
          {result && <p className="mt-2 text-xs text-navy">{result}</p>}

          <div className="mt-5 flex flex-wrap gap-3">
            <Link href="/repair/schedule" className="btn btn-accent">
              Schedule Service
            </Link>
            <a href={`tel:${siteConfig.phoneTel}`} className="btn btn-primary">
              <Phone className="h-4 w-4" /> Call for Repair
            </a>
          </div>
          <p className="mt-2 text-sm font-semibold text-navy">{siteConfig.phone}</p>
        </div>
      </div>
    </section>
  );
}
