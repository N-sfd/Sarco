import { SplitPromoSection } from "@/components/home/split-promo-section";
import { siteImages } from "@/data/site-images";

export function BuildersPromo() {
  return (
    <SplitPromoSection
      title="Builders & Contractor Sales"
      description="Turning that dream kitchen into a reality doesn't have to be so hard. We work with builders, contractors and designers to make appliance selection a hassle-free experience."
      cta="Learn More"
      href="/builders"
      image={siteImages.promoBuilders}
      imagePosition="left"
      background="skin"
    />
  );
}
