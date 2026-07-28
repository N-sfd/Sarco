import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";

const promos = [
  {
    title: "Buy Now, Pay Later",
    text: "Flexible financing with approved credit on qualifying appliances.",
    href: "/financing",
    cta: "View Financing",
    image: "/images/promo-finance.jpg",
  },
  {
    title: "Protect & Connect Your Home",
    text: "Appliance protection, leak detection, and connected-home packages.",
    href: "/smart-home",
    cta: "Learn More",
    image: "/images/hero-appliances.jpg",
  },
];

export function PromoBannerGrid() {
  return (
    <section className="bg-white pb-16">
      <PageContainer>
        <div className="grid gap-6 md:grid-cols-2">
          {promos.map((promo) => (
            <Link
              key={promo.title}
              href={promo.href}
              className="group relative min-h-[190px] overflow-hidden rounded-[4px]"
              style={{ aspectRatio: "2.8 / 1" }}
            >
              <Image
                src={promo.image}
                alt=""
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-navy/80 via-navy/55 to-navy/20" />
              <div className="absolute inset-0 flex flex-col justify-center p-6 text-white md:p-8">
                <h2 className="text-[22px] font-bold text-white md:text-[26px]">{promo.title}</h2>
                <p className="mt-2 max-w-sm text-[14px] leading-relaxed text-white/90 md:text-[15px]">
                  {promo.text}
                </p>
                <span className="mt-4 inline-flex w-fit items-center bg-accent px-5 py-2.5 text-[14px] font-bold">
                  {promo.cta}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </PageContainer>
    </section>
  );
}
