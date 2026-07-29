/**
 * Dev-only page-level check: pass every image `src` rendered on a page and
 * get a console warning if any repeat. Complements the key-pair check in
 * `src/data/site-images.ts` — that one catches accidental reuse across the
 * *data*, this one catches it across whatever a given page actually renders
 * (including per-SKU catalog photos), which is what a visitor sees.
 */
export function warnDuplicateImages(imageSources: string[], context?: string) {
  if (process.env.NODE_ENV !== "development") return;

  const duplicates = imageSources.filter((src, index) => imageSources.indexOf(src) !== index);

  if (duplicates.length) {
    console.warn(
      `Duplicate category images found${context ? ` on ${context}` : ""}:`,
      [...new Set(duplicates)],
    );
  }
}
