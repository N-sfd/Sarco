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
import { RepairPromo } from "@/components/home/repair-promo";
import { SecuringYourHomePromo } from "@/components/home/securing-your-home-promo";
import { BuildersPromo } from "@/components/home/builders-promo";
import { ReviewCarousel } from "@/components/home/reviews-slider";

/**
 * Homepage order:
 * Rebate · Hero · Services · Financing/Security promos
 * Kitchen Packages · Featured · Laundry · Categories
 * Grills · Repair · Securing Your Home · Builders
 * Reviews · Footer
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
        title="Simplify Laundry Day with Smart & Efficient Washers & Dryers"
        description="Discover high-capacity front-loaders, stackable units, and smart laundry pairs built to save time and energy."
        cta="Shop Laundry"
        href="/laundry"
        image={siteImages.promoLaundry}
        imagePosition="left"
        background="white"
      />

      <CategoryGrid />

      <GrillsPromo />
      <RepairPromo />
      <SecuringYourHomePromo />
      <BuildersPromo />

      <ReviewCarousel />
    </>
  );
}
