import { catalogImages } from "@/data/products";

/**
 * Centralized image inventory. Every hero, category, and promo image should be
 * referenced through this file rather than hardcoded per-component, so reuse is
 * visible in one place and accidental duplication (the same photo used for two
 * unrelated sections) is easy to catch. See `checkForDuplicateImages` below.
 *
 * Every key here is also checked against the 5 "featured" product photos
 * (fridge/washer/range/dishwasher/microwave — see `catalogImages` in
 * src/data/products.ts) that the homepage's Featured Products carousel
 * surfaces, since those are just as visible on the homepage as any key here.
 */
export const siteImages = {
  heroInStock: "/images/hero-kitchen-suite.jpg",
  heroRefrigeration: "/images/cat-refrigeration.jpg",
  heroLaundry: "/images/cat-laundry.jpg",
  heroCooking: "/images/cat-cooking.jpg",
  heroRepair: "/images/value-repair.jpg",

  categoryRefrigeration: "/images/category-refrigeration.jpg",
  categoryCooking: "/images/category-cooking.jpg",
  categoryDishwashers: "/images/category-dishwashers.jpg",
  categoryLaundry: "/images/cat-commercial.jpg",
  categoryKitchenPackages: "/images/kitchenaid.jpg",
  categoryGrills: "/images/package-3.jpg",
  categorySmallAppliances: "/images/cat-small.jpg",
  categoryClearance: "/images/promo-stock.jpg",

  serviceDelivery: "/images/value-delivery.jpg",
  serviceHaulAway: "/images/value-haul.jpg",
  serviceRepair: "/images/cat-parts.jpg",
  serviceProtection: "/images/value-warranty.jpg",

  // Dedicated promo-section images, kept distinct from the category cards
  // above so the same photo doesn't appear twice on the homepage.
  promoLaundry: "/images/blog-2.jpg",
  promoKitchenPackages: "/images/package-1.jpg",
  promoGrills: "/images/package-3.jpg",
  promoRepair: "/images/promo-repair-technician.jpg",
  promoBuilders: "/images/builders.jpg",
  promoFinance: "/images/promo-finance.jpg",
  promoSales: "/images/promo-bundle.jpg",
  promoSmartHome: "/images/promo-smart-protection.jpg",
} as const;

export type SiteImageKey = keyof typeof siteImages;

/**
 * The 5 catalog photos the homepage's Featured Products carousel actually
 * surfaces — checked against every siteImages entry below so a
 * hero/category/promo section never silently reuses the same photo as a
 * featured product card on the same page. Sourced from `catalogImages`
 * (src/data/products.ts) rather than re-typed here, so there's one place
 * that owns each file path.
 */
const featuredProductImages: Record<string, string> = {
  featuredFridge: catalogImages.fridge,
  featuredWasher: catalogImages.washer,
  featuredRange: catalogImages.range,
  featuredDishwasher: catalogImages.dishwasher,
  featuredMicrowave: catalogImages.microwave,
};

/**
 * Dev-only guard: warns in the console (never in production) when two different
 * keys point at the same file, so a copy-paste reuse doesn't silently ship.
 * Known intentional reuse (e.g. a hero slide and its matching category card
 * sharing one photo) can be listed in `allowedDuplicates` to avoid noise —
 * keep this list as short as possible; each entry represents an actual asset
 * gap, not a preference.
 */
export function checkForDuplicateImages(
  images: Record<string, string> = { ...siteImages, ...featuredProductImages },
  allowedDuplicates: [string, string][] = [
    // Only one primary grill photo — category tile and Outdoor Living promo share it.
    ["categoryGrills", "promoGrills"],
    // Dishwasher category tile intentionally mirrors the primary product photo
    // until a distinct lifestyle/category asset is available.
    ["categoryDishwashers", "featuredDishwasher"],
  ],
) {
  if (process.env.NODE_ENV === "production") return;

  const allowed = new Set(
    allowedDuplicates.map(([a, b]) => [a, b].sort().join("|")),
  );
  const bySource = new Map<string, string[]>();
  for (const [key, src] of Object.entries(images)) {
    bySource.set(src, [...(bySource.get(src) ?? []), key]);
  }

  for (const [src, keys] of bySource) {
    if (keys.length < 2) continue;
    for (let i = 0; i < keys.length; i++) {
      for (let j = i + 1; j < keys.length; j++) {
        const pairKey = [keys[i], keys[j]].sort().join("|");
        if (allowed.has(pairKey)) continue;
        console.warn(
          `Duplicate image source detected: ${keys[i]} and ${keys[j]} both use ${src}`,
        );
      }
    }
  }
}
