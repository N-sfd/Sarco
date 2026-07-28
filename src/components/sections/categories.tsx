import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { categories } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";

export function Categories() {
  return (
    <section id="categories" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-12 lg:py-24">
      <SectionHeading
        eyebrow="Shop by Category"
        title="Find the right appliance for every room"
        description="Browse refrigeration, laundry, cooking, dishwashers, outdoor, and more — plus parts and commercial equipment."
      />

      <StaggerGroup className="mt-14 grid grid-cols-2 gap-4 sm:gap-5 md:grid-cols-3 lg:grid-cols-4">
        {categories.map((cat) => (
          <StaggerItem key={cat.name}>
            <a
              href="#sales"
              className="group relative flex h-full flex-col overflow-hidden rounded-3xl border border-navy/8 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                <Image
                  src={cat.image}
                  alt={cat.name}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy/70 via-navy/10 to-transparent" />
                <span
                  className={`absolute left-3 top-3 grid h-10 w-10 place-items-center rounded-xl bg-gradient-to-br ${cat.accent} text-white shadow-card`}
                >
                  <cat.icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
              </div>
              <div className="flex flex-1 flex-col p-4 sm:p-5">
                <h3 className="font-display text-base font-bold leading-snug text-navy">{cat.name}</h3>
                <p className="mt-1 text-sm text-ink/55">{cat.count}</p>
                <span className="mt-3 flex items-center gap-1 text-sm font-semibold text-royal opacity-0 transition-all duration-300 group-hover:opacity-100">
                  Explore <ArrowUpRight className="h-4 w-4" />
                </span>
              </div>
            </a>
          </StaggerItem>
        ))}
      </StaggerGroup>
    </section>
  );
}
