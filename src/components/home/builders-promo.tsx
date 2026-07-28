import { SplitPromoSection } from "@/components/home/split-promo-section";

export function BuildersPromo() {
  return (
    <SplitPromoSection
      title="Builder and Contractor Sales"
      description="Receive volume pricing, dedicated account support, appliance packages, project scheduling, delivery coordination, and installation services for projects of any size."
      cta="Open a Trade Account"
      href="/builders/trade-account"
      image="/images/value-delivery.jpg"
      imagePosition="left"
      background="lightBlue"
    />
  );
}
