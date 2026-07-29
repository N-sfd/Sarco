import { SplitPromoSection } from "@/components/home/split-promo-section";
import { siteImages } from "@/data/site-images";

export function SecuringYourHomePromo() {
  return (
    <SplitPromoSection
      title="Protect Your Investment: Smart Monitoring & Home Protection"
      description="Guard against costly leaks and power surges with smart-home monitoring, leak detection, and extended protection plans."
      cta="Learn More"
      href="/smart-home"
      image={siteImages.promoSmartHome}
      imagePosition="left"
      background="white"
    />
  );
}
