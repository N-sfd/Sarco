import { SplitPromoSection } from "@/components/home/split-promo-section";
import { siteImages } from "@/data/site-images";

export function KitchenPackagesSection() {
  return (
    <SplitPromoSection
      title="Bundle & Save: Complete Coordinated Kitchen Suites"
      description="Match your refrigeration, cooking, dishwasher, and ventilation units while taking advantage of multi-appliance package discounts."
      cta="Shop Kitchen Packages"
      href="/kitchen-packages"
      image={siteImages.promoKitchenPackages}
      imagePosition="right"
      background="lightBlue"
    />
  );
}
