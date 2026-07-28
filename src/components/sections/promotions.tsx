import { ArrowUpRight } from "lucide-react";
import { promotions } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";

export function Promotions() {
  return (
    <section id="promotions" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-12 lg:py-24">
      <SectionHeading
        eyebrow="Featured Promotions"
        title="Deals worth celebrating"
        description="Stackable savings, rebates, and exclusive programs to help you save more on every purchase and repair."
      />

      <StaggerGroup className="mt-14 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {promotions.map((promo, i) => (
          <StaggerItem key={promo.title}>
            <a
              href="#contact"
              className={`group relative flex h-full flex-col overflow-hidden rounded-3xl p-6 shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift ${
                i % 4 === 0
                  ? "bg-gradient-to-br from-navy to-royal text-white"
                  : "border border-navy/8 bg-white text-navy"
              }`}
            >
              <div className="flex items-start justify-between">
                <span
                  className={`grid h-12 w-12 place-items-center rounded-2xl transition-transform duration-500 group-hover:scale-110 ${
                    i % 4 === 0 ? "bg-white/15 text-white" : "bg-accent/10 text-accent"
                  }`}
                >
                  <promo.icon className="h-6 w-6" />
                </span>
                <span
                  className={`rounded-full px-3 py-1 text-xs font-bold ${
                    i % 4 === 0 ? "bg-accent text-white" : "bg-navy text-white"
                  }`}
                >
                  {promo.tag}
                </span>
              </div>
              <h3 className="mt-5 font-display text-lg font-bold">{promo.title}</h3>
              <p className={`mt-1.5 flex-1 text-sm leading-relaxed ${i % 4 === 0 ? "text-white/70" : "text-ink/55"}`}>
                {promo.desc}
              </p>
              <span className="mt-4 inline-flex items-center gap-1 text-sm font-semibold">
                Claim offer <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </span>
            </a>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
