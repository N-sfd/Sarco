/**
 * Centralized image inventory. Every hero, category, and promo image should be
 * referenced through this file rather than hardcoded per-component, so reuse is
 * visible in one place and accidental duplication (the same photo used for two
 * unrelated sections) is easy to catch. See `checkForDuplicateImages` below.
 */
export const siteImages = {
  heroInStock: "/images/hero-kitchen-suite.jpg",
  heroPackages: "/images/product-microwave.jpg",
  heroFinancing: "/images/promo-finance.jpg",
  heroRepair: "/images/promo-bundle.jpg",

  categoryRefrigeration: "/images/product-fridge.jpg",
  categoryCooking: "/images/package-6.jpg",
  categoryDishwashers: "/images/cat-dishwasher.jpg",
  categoryLaundry: "/images/cat-laundry.jpg",
  categoryKitchenPackages: "/images/package-2.jpg",
  categoryGrills: "/images/package-3.jpg",
  categorySmallAppliances: "/images/cat-small.jpg",
  categoryClearance: "/images/promo-stock.jpg",

  serviceDelivery: "/images/value-delivery.jpg",
  serviceHaulAway: "/images/value-haul.jpg",
  serviceRepair: "/images/value-repair.jpg",
  serviceProtection: "/images/value-warranty.jpg",

  // Dedicated promo-section images, kept distinct from the category cards
  // above so the same photo doesn't appear twice on the homepage.
  promoLaundry: "/images/product-washer.jpg",
  promoKitchenPackages: "/images/package-1.jpg",
} as const;

export type SiteImageKey = keyof typeof siteImages;

/**
 * Dev-only guard: warns in the console (never in production) when two different
 * keys point at the same file, so a copy-paste reuse doesn't silently ship.
 * Known intentional reuse (e.g. a hero slide and its matching category card
 * sharing one photo) can be listed in `allowedDuplicates` to avoid noise.
 */
export function checkForDuplicateImages(
  images: Record<string, string> = siteImages,
  allowedDuplicates: [string, string][] = [],
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
