"use client";

import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { valueProps } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";

export function ValueProps() {
  return (
    <section id="store-services" className="bg-mist">
      <div className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-12 lg:py-24">
        <SectionHeading
          eyebrow="We Service What We Sell"
          title="From delivery to repair — handled end to end"
          description="Shop local with confidence. Our team delivers, installs, hauls away, and services the brands you trust."
        />

        <StaggerGroup className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {valueProps.map((item) => (
            <StaggerItem key={item.title}>
              <a
                href={item.href}
                className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-navy/8 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={item.image}
                    alt={item.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-navy/50 to-transparent" />
                  <span className="absolute left-4 bottom-4 grid h-12 w-12 place-items-center rounded-2xl bg-white text-navy shadow-card">
                    <item.icon className="h-6 w-6" strokeWidth={1.75} />
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-lg font-bold text-navy">{item.title}</h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/60">{item.desc}</p>
                  <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold text-royal">
                    Learn more
                    <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </span>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
