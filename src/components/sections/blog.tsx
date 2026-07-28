import Image from "next/image";
import { ArrowUpRight, Clock } from "lucide-react";
import { posts } from "@/lib/data";
import { SectionHeading } from "@/components/ui/section-heading";
import { StaggerGroup, StaggerItem } from "@/components/ui/reveal";
import { ButtonLink } from "@/components/ui/button";

export function Blog() {
  return (
    <section id="blog" className="relative overflow-hidden bg-mist py-16 lg:py-24">
      <div className="pointer-events-none absolute inset-0 bg-grid opacity-40" />
      <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-12">
        <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
          <SectionHeading
            align="left"
            eyebrow="From the Blog"
            title="Tips, guides & appliance insights"
            description="Expert advice to help you buy smart, save energy, and keep your appliances running longer."
          />
          <ButtonLink href="#blog" variant="outline" className="shrink-0">
            View all articles
          </ButtonLink>
        </div>

        <StaggerGroup className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {posts.map((post) => (
            <StaggerItem key={post.title}>
              <a
                href="#blog"
                className="group flex h-full flex-col overflow-hidden rounded-3xl border border-navy/8 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <span className="absolute left-3 top-3 rounded-full bg-white/90 px-3 py-1 text-xs font-semibold text-navy shadow-sm backdrop-blur-sm">
                    {post.category}
                  </span>
                </div>
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="font-display text-base font-bold leading-snug text-navy transition-colors group-hover:text-royal">
                    {post.title}
                  </h3>
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-ink/55">{post.excerpt}</p>
                  <div className="mt-4 flex items-center justify-between border-t border-navy/8 pt-3">
                    <span className="flex items-center gap-1.5 text-xs text-ink/50">
                      <Clock className="h-3.5 w-3.5" /> {post.readTime}
                    </span>
                    <ArrowUpRight className="h-4 w-4 text-royal transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                  </div>
                </div>
              </a>
            </StaggerItem>
          ))}
        </StaggerGroup>
      </div>
    </section>
  );
}
