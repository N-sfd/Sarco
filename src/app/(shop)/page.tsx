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
 * 1 Hero · 2 Service benefits · 3 Financing/sales banners
 * 4 Kitchen Packages · 5 Top Deals · 6 Lighten Your Workload
 * 7 Shop by Category · 8 Explore More Categories
 * 9 Grills · 10 Appliance Repair · 11 Securing Your Home
 * 12 Builders · 13 Customer Reviews · 14 Footer
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
        description="Explore washers, dryers, laundry pairs, and smart laundry appliances designed to simplify every load."
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
