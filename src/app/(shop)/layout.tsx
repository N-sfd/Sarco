import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";
import { MobileBottomNav } from "@/components/layout/mobile-bottom-nav";
import { HydrateStores } from "@/components/providers/hydrate-stores";
import { CompareBar } from "@/components/catalog/compare-bar";
import { UIProvider } from "@/lib/ui-store";

export default function ShopLayout({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      <HydrateStores />
      <SiteHeader />
      <main id="main" className="flex-1 pb-16 lg:pb-0">
        {children}
      </main>
      <SiteFooter />
      <MobileBottomNav />
      <CompareBar />
    </UIProvider>
  );
}
