import { SplitPromoSection } from "@/components/home/split-promo-section";
import { siteImages } from "@/data/site-images";

export function SecuringYourHomePromo() {
  return (
    <SplitPromoSection
      title="Securing Your Home"
      description="Grant yourself peace of mind against leaks, surges, and unexpected repairs with smart monitoring and extended protection."
      cta="Learn More"
      href="/services/protection-plans"
      image={siteImages.promoSmartHome}
      imagePosition="right"
      background="lightBlue"
    />
  );
}
