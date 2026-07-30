import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { MobileNavDrawer } from "@/components/layout/mobile-nav-drawer";
import { ServiceAvailabilityModal } from "@/components/service/service-availability-modal";
import { QuickViewModal } from "@/components/catalog/quick-view-modal";
import { HydrateStores } from "@/components/providers/hydrate-stores";
import { CompareBar } from "@/components/catalog/compare-bar";
import { ShopMain } from "@/components/catalog/shop-main";
import { UIProvider } from "@/lib/ui-store";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      <HydrateStores />
      <SiteHeader />
      <ShopMain>{children}</ShopMain>
      <SiteFooter />
      <MobileBottomNav />
      <CompareBar />
      {/* Rendered outside the sticky header so their z-index isn't
          trapped inside its stacking context (position: sticky + z-index
          on the header creates one; see MobileBottomNav's z-50). */}
      <MobileNavDrawer />
      <ServiceAvailabilityModal />
      <QuickViewModal />
    </UIProvider>
  );
}
