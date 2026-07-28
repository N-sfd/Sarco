import { brands } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";

export function Brands() {
  return (
    <section id="brands" className="relative overflow-hidden bg-mist py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <SectionHeading
          eyebrow="Shop by Brand"
          title="Factory authorized for the brands you trust"
          description="Genuine parts, expert service, and full warranties across every major manufacturer."
        />

        <Reveal className="mt-14">
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-4">
            {brands.map((brand, i) => (
              <div
                key={brand}
                className="group relative flex h-24 items-center justify-center overflow-hidden rounded-2xl border border-navy/8 bg-white shadow-soft transition-all duration-400 hover:-translate-y-1 hover:border-royal/30 hover:shadow-card"
                style={{ transitionDelay: `${(i % 4) * 30}ms` }}
              >
                <span className="pointer-events-none absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-royal/5 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                <span className="font-display text-lg font-bold tracking-tight text-navy/40 grayscale transition-all duration-400 group-hover:text-navy group-hover:grayscale-0">
                  {brand}
                </span>
              </div>
            ))}
          </div>
        </Reveal>

        <p className="mt-8 text-center text-sm text-ink/55">
          ...and 15+ more. Don&apos;t see your brand?{" "}
          <a href="#contact" className="font-semibold text-royal hover:underline">
            Ask our team
          </a>
        </p>
      </div>
    </section>
  );
}
