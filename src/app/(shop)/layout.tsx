import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
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
    </UIProvider>
  );
}
