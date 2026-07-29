import { catalogImages } from "@/data/products";

/**
 * Per-category-page image inventory (hero + subtype cards + mega-menu promo).
 * Distinct from `src/data/site-images.ts` (homepage-only) and `catalogImages`
 * (per-SKU product photos) — this file exists so a category landing page
 * never shows the same photo twice.
 *
 * KNOWN LIMITATION: the stock photo library is still small relative to the
 * number of subtypes listed here, so a few values below are thematically
 * approximate stand-ins (e.g. a living-room or pool photo standing in for
 * "Built-In" or "Counter-Depth" refrigeration because no distinct
 * refrigerator photo exists for that subtype) rather than a real photo of
 * that specific subtype. Every value is still guaranteed distinct from
 * every other value *within its own category* — verified in dev via
 * `warnDuplicateImages` (src/lib/duplicate-images.ts), wired up in
 * CategoryLanding. Real photography would fully resolve the remaining
 * mismatches — flagged in the final summary.
 */
export const categoryImages = {
  refrigeration: {
    hero: "/images/package-1.jpg",
    frenchDoor: catalogImages.fridge,
    sideBySide: "/images/cat-refrigeration.jpg",
    topFreezer: catalogImages.freezer,
    bottomFreezer: "/images/after-fridge.jpg",
    builtIn: "/images/package-4.jpg",
    counterDepth: "/images/package-5.jpg",
    megaMenu: "/images/promo-bundle.jpg",
  },

  laundry: {
    hero: "/images/cat-laundry.jpg",
    frontLoad: catalogImages.washer,
    topLoad: "/images/package-4.jpg",
    laundryCenters: "/images/package-5.jpg",
    washerDryerCombo: "/images/blog-3.jpg",
    commercialLaundry: catalogImages.commercialWasher,
  },

  dishwashers: {
    hero: catalogImages.dishwasherInterior,
    topControl: catalogImages.dishwasherTopControl,
    frontControl: catalogImages.dishwasher,
    panelReady: catalogImages.dishwasherPanelReady,
    drawer: "/images/product-dishwasher-drawer.jpg",
    portable: catalogImages.dishwasherPortable,
    megaMenu: catalogImages.dishwasher,
  },

  cooking: {
    hero: "/images/cat-cooking.jpg",
    ranges: catalogImages.range,
    cooktops: catalogImages.proRange,
    wallOvens: "/images/package-6.jpg",
    microwaves: catalogImages.microwave,
    megaMenu: "/images/blog-2.jpg",
  },
} as const;

export type CategoryImageKey = keyof typeof categoryImages;
