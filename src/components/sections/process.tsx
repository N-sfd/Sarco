import { processSteps } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";

export function Process() {
  return (
    <section id="process" className="relative overflow-hidden bg-mist py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-radial-royal" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <SectionHeading
          eyebrow="Our Repair Process"
          title="Simple, transparent, and stress-free"
          description="From booking to warranty, here's exactly what to expect when you work with us."
        />

        <div className="relative mt-16">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-9 hidden h-0.5 bg-gradient-to-r from-royal/20 via-royal/40 to-accent/30 lg:block" />

          <StaggerGroup className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-6 lg:gap-4">
            {processSteps.map((step) => (
              <StaggerItem key={step.step}>
                <div className="group relative flex flex-col items-center text-center">
                  <div className="relative z-10 grid h-[4.5rem] w-[4.5rem] place-items-center rounded-2xl border border-navy/8 bg-white shadow-card transition-all duration-500 group-hover:-translate-y-1.5 group-hover:shadow-lift">
                    <step.icon className="h-8 w-8 text-royal transition-colors group-hover:text-accent" strokeWidth={1.6} />
                    <span className="absolute -right-2 -top-2 grid h-6 w-6 place-items-center rounded-full bg-accent text-[0.65rem] font-bold text-white shadow-sm">
                      {step.step}
                    </span>
                  </div>
                  <h3 className="mt-4 font-display text-sm font-bold text-navy">{step.title}</h3>
                  <p className="mt-1.5 text-xs leading-relaxed text-ink/55">{step.desc}</p>
                </div>
              </StaggerItem>
            ))}
          </StaggerGroup>
        </div>
      </div>
    </section>
  );
}
