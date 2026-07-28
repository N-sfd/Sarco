"use client";

import Image from "next/image";
import { Building2, CheckCircle2, HardHat, Ruler } from "lucide-react";
import { ButtonLink } from "@/components/ui/button";
import { Reveal } from "@/components/ui/reveal";
import { siteImages } from "@/lib/data";

const perks = [
  "Volume pricing for multi-unit & remodel projects",
  "Dedicated builder account manager",
  "Job-site delivery windows that fit your schedule",
  "Spec sheets, model matching & substitution support",
];

export function Builders() {
  return (
    <section id="builders" className="mx-auto max-w-7xl px-5 py-14 sm:px-6 lg:px-12 lg:py-20">
      <div className="relative overflow-hidden rounded-[2.5rem] border border-navy/8 bg-white shadow-soft">
        <div className="grid lg:grid-cols-2">
          <Reveal className="relative min-h-[320px] overflow-hidden lg:min-h-full">
            <Image
              src={siteImages.builders}
              alt="Builders and contractors reviewing appliance plans"
              fill
              sizes="(max-width: 1024px) 100vw, 50vw"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-navy/90 via-navy/75 to-royal/70" />

            <div className="relative flex h-full flex-col justify-end p-8 sm:p-12 lg:p-14">
              <span className="inline-flex w-fit items-center gap-2 rounded-full border border-white/25 bg-white/10 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-white/90 backdrop-blur-sm">
                <HardHat className="h-3.5 w-3.5" />
                Builders & Contractors
              </span>

              <h2 className="mt-5 font-display text-3xl font-bold leading-tight text-white sm:text-4xl">
                Appliance selection made hassle-free for projects of any size
              </h2>
              <p className="mt-4 max-w-md text-white/70">
                Partner with our builder desk for kitchens, laundry rooms, multi-family builds, and
                commercial fit-outs — from spec to install.
              </p>

              <div className="mt-8 flex flex-wrap gap-4">
                {[
                  { icon: Building2, label: "Multi-family" },
                  { icon: Ruler, label: "Remodels" },
                  { icon: HardHat, label: "New construction" },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3.5 py-2 text-sm font-medium text-white backdrop-blur-sm"
                  >
                    <item.icon className="h-4 w-4 text-silver" />
                    {item.label}
                  </div>
                ))}
              </div>
            </div>
          </Reveal>

          <Reveal direction="left" className="flex flex-col justify-center p-8 sm:p-12 lg:p-14">
            <ul className="space-y-4">
              {perks.map((perk) => (
                <li key={perk} className="flex items-start gap-3 text-ink/75">
                  <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-success" />
                  <span className="text-sm leading-relaxed sm:text-base">{perk}</span>
                </li>
              ))}
            </ul>

            <div className="mt-8 flex flex-wrap gap-3">
              <ButtonLink href="#contact" variant="accent" size="lg">
                Contact builder sales
              </ButtonLink>
              <ButtonLink href="#sales" variant="outline" size="lg">
                Browse catalog
              </ButtonLink>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
