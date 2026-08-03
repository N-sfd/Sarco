import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { siteImages } from "@/data/site-images";

// "Securing Your Home" (smart-home protection) already has its own dedicated
// promo section further down the homepage — this grid only carries topics
// that don't appear elsewhere, so no two sections repeat the same offer.
const promos = [
  {
    title: "Buy Now, Pay Later",
    text: "Flexible financing with approved credit on qualifying appliances.",
    href: "/financing",
    cta: "View Financing",
    image: siteImages.promoFinance,
  },
  {
    title: "Save Big on Top Appliance Brands",
    text: "Explore limited-time sales and manufacturer rebates on refrigerators, washers, ranges, and more.",
    href: "/sales",
    cta: "Shop Sales",
    image: siteImages.promoSales,
  },
];

export function PromoBannerGrid() {
  return (
    <section className="bg-white pb-16">
      <PageContainer>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          {promos.map((promo) => (
            <Link
              key={promo.title}
              href={promo.href}
              className="group relative w-full min-h-[190px] overflow-hidden rounded-[4px]"
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
                <span className="mt-4 inline-flex w-fit items-center border border-white/80 bg-white/10 px-5 py-2.5 text-[14px] font-bold backdrop-blur-sm">
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
