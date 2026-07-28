import { whyChooseUs } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";

export function WhyChooseUs() {
  return (
    <section id="why" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-12 lg:py-24">
      <SectionHeading
        eyebrow="Why Choose Us"
        title="The trusted choice for 25+ years"
        description="Ten reasons customers across the region rely on ABC Appliance for sales and service."
      />

      <StaggerGroup className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-5">
        {whyChooseUs.map((item) => (
          <StaggerItem key={item.title}>
            <div className="group flex h-full flex-col items-center gap-3 rounded-3xl border border-navy/8 bg-white p-6 text-center shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:border-royal/25 hover:shadow-card">
              <span className="grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-navy to-royal text-white shadow-card transition-all duration-500 group-hover:scale-110 group-hover:from-accent group-hover:to-accent-600">
                <item.icon className="h-7 w-7" strokeWidth={1.6} />
              </span>
              <h3 className="font-display text-sm font-bold text-navy">{item.title}</h3>
              <p className="text-xs leading-relaxed text-ink/55">{item.desc}</p>
            </div>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
