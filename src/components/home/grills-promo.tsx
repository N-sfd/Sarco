import { SplitPromoSection } from "@/components/home/split-promo-section";
import { siteImages } from "@/data/site-images";

export function GrillsPromo() {
  return (
    <SplitPromoSection
      title="Elevate Your Outdoor Living with Built-In & Freestanding Grills"
      description="Premium grills, smokers, and outdoor kitchen appliances designed for performance and durability."
      cta="Shop Grills"
      href="/grills"
      image={siteImages.promoGrills}
      imagePosition="right"
      background="lightBlue"
    />
  );
}
