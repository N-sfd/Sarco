import { siteImages } from "@/data/site-images";
import { RebateBar } from "@/components/home/rebate-announcement-bar";
import { HeroCarousel } from "@/components/home/hero-carousel";
import { ServiceBenefits } from "@/components/home/service-benefit-cards";
import { PromoBannerGrid } from "@/components/home/promo-banner-grid";
import { SplitPromoSection } from "@/components/home/split-promo-section";
import { KitchenPackagesSection } from "@/components/home/kitchen-packages-section";
import { FeaturedProducts } from "@/components/home/featured-products-carousel";
import { CategoryGrid } from "@/components/home/shop-by-category";
import { GrillsPromo } from "@/components/home/grills-promo";
import { SecuringYourHomePromo } from "@/components/home/securing-your-home-promo";
import { BuildersPromo } from "@/components/home/builders-promo";
import { ReviewCarousel } from "@/components/home/reviews-slider";
import { NewsletterSignup } from "@/components/home/vip-newsletter";

/**
 * Homepage order (1–5 in SiteHeader):
 * 6 Rebate · 7 Hero · 8 Services · 9 Financing/Security promos
 * 10 Kitchen Packages · 11 Featured · 12 Laundry · 13 Categories
 * 14 Grills · 15 Repair · 16 Securing Your Home · 17 Builders
 * 18 Reviews · 19 Newsletter · 20 Footer
 */
export default function HomePage() {
  return (
    <>
      <RebateBar />
      <HeroCarousel />
      <ServiceBenefits />
      <PromoBannerGrid />

      <KitchenPackagesSection />

      <FeaturedProducts />

      <SplitPromoSection
        title="Lighten Your Workload"
        description="Discover washers, dryers, laundry pairs, and smart laundry solutions designed to simplify every load."
        cta="Shop Laundry"
        href="/laundry"
        image={siteImages.promoLaundry}
        imagePosition="left"
        background="white"
      />

      <CategoryGrid />

      <GrillsPromo />

      <SplitPromoSection
        title="Expert Appliance Repair"
        description="Our trained technicians diagnose and repair refrigerators, washers, dryers, ranges, ovens, dishwashers, and other major appliances."
        cta="Schedule Service"
        href="/repair/schedule"
        image="/images/value-repair.jpg"
        imagePosition="left"
        background="white"
      />

      <SecuringYourHomePromo />

      <BuildersPromo />
      <ReviewCarousel />
      <NewsletterSignup />
    </>
  );
}
