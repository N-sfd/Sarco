import { SplitPromoSection } from "@/components/home/split-promo-section";
import { siteImages } from "@/data/site-images";

export function BuildersPromo() {
  return (
    <SplitPromoSection
      title="Commercial & Trade Accounts: Preferred Pricing & Dedicated Support"
      description="Tailored appliance packages, volume pricing, scheduled project deliveries, and dedicated account management for builders and contractors."
      cta="Open a Trade Account"
      href="/builders/trade-account"
      image={siteImages.promoBuilders}
      imagePosition="left"
      background="lightBlue"
    />
  );
}
