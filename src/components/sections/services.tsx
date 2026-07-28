import { ArrowRight } from "lucide-react";
import { services } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { formatCurrency } from "@/lib/utils";

export function Services() {
  return (
    <section id="services" className="relative overflow-hidden bg-navy py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-[0.15]" />
      <div className="pointer-events-none absolute -left-32 top-20 h-96 w-96 rounded-full bg-royal/25 blur-3xl" />
      <div className="pointer-events-none absolute -right-32 bottom-0 h-96 w-96 rounded-full bg-accent/15 blur-3xl" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <SectionHeading
          light
          eyebrow="Appliance Repair Services"
          title="Expert repairs for every appliance"
          description="Certified technicians, genuine parts, transparent pricing — with a 90-day guarantee on every job."
        />

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service) => (
            <StaggerItem key={service.name}>
              <div className="group relative flex h-full items-start gap-4 overflow-hidden rounded-3xl border border-white/10 bg-white/5 p-5 backdrop-blur-sm transition-all duration-500 hover:-translate-y-1 hover:border-accent/40 hover:bg-white/10">
                <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-royal to-navy-600 text-white shadow-card transition-transform duration-500 group-hover:scale-110">
                  <service.icon className="h-7 w-7" strokeWidth={1.6} />
                </div>
                <div className="min-w-0 flex-1">
                  <div className="flex items-center justify-between gap-2">
                    <h3 className="font-display text-base font-bold text-white">{service.name}</h3>
                    <span className="shrink-0 text-xs font-semibold text-accent-400">
                      from {formatCurrency(service.from)}
                    </span>
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-white/60">{service.desc}</p>
                  <a
                    href="#contact"
                    className="mt-3 inline-flex items-center gap-1.5 text-sm font-semibold text-white transition group-hover:text-accent-400"
                  >
                    Book Service
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </a>
                </div>
              </div>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
