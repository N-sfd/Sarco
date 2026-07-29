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

      <SplitPromoSection
        title="Factory-Trained Appliance Repair & Maintenance"
        description="Fast diagnostics, genuine replacement parts, and certified service for all major appliance brands across Hagerstown."
        cta="Schedule Service"
        href="/repair/schedule"
        image={siteImages.promoRepair}
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
