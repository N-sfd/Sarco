import { SplitPromoSection } from "@/components/home/split-promo-section";
import { siteImages } from "@/data/site-images";

export function RepairPromo() {
  return (
    <SplitPromoSection
      title="Appliance Repair"
      description="Fast diagnostics, genuine replacement parts, and certified service for all major appliance brands across Hagerstown."
      cta="Schedule Service"
      href="/repair/schedule"
      image={siteImages.promoRepair}
      imagePosition="left"
      background="skin"
    />
  );
}
