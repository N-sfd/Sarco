import { products, brands, type Product } from "@/data/products";

export type CatalogCategory = {
  slug: string;
  name: string;
  description: string;
};

export const catalogCategories: CatalogCategory[] = [
  {
    slug: "refrigeration",
    name: "Refrigeration",
    description: "Refrigerators, freezers, ice makers, and wine and beverage storage.",
  },
  {
    slug: "laundry",
    name: "Laundry",
    description: "Washers, dryers, laundry pairs, and laundry centers.",
  },
  {
    slug: "dishwashers",
    name: "Dishwashers",
    description: "Built-in, drawer, panel-ready, and portable dishwashers.",
  },
  {
    slug: "cooking",
    name: "Cooking",
    description: "Ranges, cooktops, wall ovens, microwaves, and ventilation.",
  },
  {
    slug: "grills",
    name: "BBQ Grills",
    description: "Gas, charcoal, and pellet grills, smokers, and outdoor kitchens.",
  },
  {
    slug: "kitchen-packages",
    name: "Kitchen Packages",
    description: "Matched appliance suites bundled for savings.",
  },
  {
    slug: "more-appliances",
    name: "More Appliances",
    description: "Disposals, compactors, air quality, and heating and cooling.",
  },
  {
    slug: "small-appliances",
    name: "Small Appliances",
    description: "Countertop cooking, mixers, blenders, and more.",
  },
];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

export function findCatalogCategory(rootSlug: string): CatalogCategory | undefined {
  return catalogCategories.find((c) => c.slug === rootSlug);
}

export type CatalogMatch = {
  category: CatalogCategory;
  /** True subcategory label when the deep-linked slug matched real product data. */
  subcategoryLabel?: string;
  products: Product[];
  /** False when we fell back to the full category because the exact subcategory had no listed products. */
  matchedSubcategory: boolean;
};

/** Maps a nav/catalog URL (e.g. ["refrigeration","refrigerators","french-door-refrigerators"]) to matching products. */
export function matchCatalogSlug(slug: string[]): CatalogMatch | null {
  const [root, ...rest] = slug;
  const category = findCatalogCategory(root);
  if (!category) return null;

  const categoryProducts = products.filter((p) => p.category === category.name);

  if (rest.length === 0) {
    return { category, products: categoryProducts, matchedSubcategory: false };
  }

  const lastSegment = rest[rest.length - 1];
  const bySubcategory = categoryProducts.filter((p) => slugify(p.subcategory) === lastSegment);

  if (bySubcategory.length > 0) {
    return {
      category,
      subcategoryLabel: bySubcategory[0].subcategory,
      products: bySubcategory,
      matchedSubcategory: true,
    };
  }

  return { category, products: categoryProducts, matchedSubcategory: false };
}

export const brandSlugs: { slug: string; name: string }[] = brands.map((name) => ({
  slug: slugify(name),
  name,
}));

export function findBrandBySlug(slug: string) {
  return brandSlugs.find((b) => b.slug === slug)?.name;
}

export function titleFromSlugSegment(segment: string) {
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}
