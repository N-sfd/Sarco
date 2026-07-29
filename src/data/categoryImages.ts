import { catalogImages } from "@/data/products";

/**
 * Per-category-page image inventory (hero + subtype cards + mega-menu promo).
 * Distinct from `src/data/site-images.ts` (homepage-only) and `catalogImages`
 * (per-SKU product photos). Values within each category must be unique from
 * each other; prefer assets that are not the primary photo of a SKU shown in
 * the listing grid on the same page.
 */
export const categoryImages = {
  refrigeration: {
    hero: "/images/hero-kitchen-suite.jpg",
    frenchDoor: catalogImages.fridgeFrenchDoor,
    sideBySide: catalogImages.fridgeSideBySide,
    topFreezer: catalogImages.fridgeTopFreezer,
    bottomFreezer: catalogImages.fridgeLifestyle,
    builtIn: catalogImages.fridgeAlt,
    counterDepth: catalogImages.fridgeBlack,
    megaMenu: "/images/promo-bundle.jpg",
  },

  laundry: {
    hero: "/images/cat-laundry.jpg",
    frontLoad: catalogImages.washerFrontLoad,
    topLoad: catalogImages.washerTopLoad,
    laundryCenters: catalogImages.laundryStacked,
    washerDryerCombo: catalogImages.laundryPair,
    commercialLaundry: catalogImages.washerCommercial,
  },

  dishwashers: {
    hero: catalogImages.dishwasherInterior,
    topControl: catalogImages.dishwasherTopControl,
    frontControl: catalogImages.dishwasher,
    panelReady: catalogImages.dishwasherPanelReady,
    drawer: catalogImages.dishwasherDrawer,
    portable: catalogImages.dishwasherPortable,
    megaMenu: "/images/promo-stock.jpg",
  },

  cooking: {
    hero: "/images/cat-cooking.jpg",
    ranges: catalogImages.range,
    cooktops: catalogImages.cooktop,
    wallOvens: catalogImages.wallOven,
    microwaves: catalogImages.microwave,
    megaMenu: "/images/blog-2.jpg",
  },
} as const;

export type CategoryImageKey = keyof typeof categoryImages;
