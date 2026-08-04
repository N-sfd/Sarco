import { SplitPromoSection } from "@/components/home/split-promo-section";
import { siteImages } from "@/data/site-images";

export function GrillsPromo() {
  return (
    <SplitPromoSection
      title="Grills"
      description="Elevate your craft and take your outdoor space to the next level with grills and smokers that boast superior craftsmanship."
      cta="Shop Grills"
      href="/grills"
      image={siteImages.promoGrills}
      imagePosition="right"
      background="lightBlue"
    />
  );
}
