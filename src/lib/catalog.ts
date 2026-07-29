import { products, brands, type Product } from "@/data/products";
import { businessConfig } from "@/config/business";

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

export type CatalogSuggestion = {
  title: string;
  body: string;
  phoneDisplay: string;
  phoneHref: string;
  relatedHref?: string;
  relatedLabel?: string;
};

export type CatalogMatch = {
  category: CatalogCategory;
  /** True subcategory / facet label when the deep-linked path matched a catalog facet. */
  subcategoryLabel?: string;
  products: Product[];
  /**
   * True when the URL path resolved to a specific facet (even if zero products).
   * False only for the root category page (e.g. /cooking).
   */
  matchedSubcategory: boolean;
  suggestion?: CatalogSuggestion;
};

export function titleFromSlugSegment(segment: string) {
  return segment
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join(" ");
}

/** Explicit path → subcategory label for mega-menu leaf URLs. */
const PATH_SUBCATEGORY_ALIASES: Record<string, string> = {
  "wall-ovens/single": "Single Wall Ovens",
  "wall-ovens/double": "Double Wall Ovens",
  "wall-ovens/microwave-combo": "Microwave Combination Ovens",
  "wall-ovens/speed": "Speed Ovens",
  "wall-ovens/steam": "Steam Ovens",
  "ranges/gas": "Gas Ranges",
  "ranges/electric": "Electric Ranges",
  "ranges/induction": "Induction Ranges",
  "ranges/dual-fuel": "Dual-Fuel Ranges",
  "ranges/professional": "Professional Ranges",
  "cooktops/gas": "Gas Cooktops",
  "cooktops/electric": "Electric Cooktops",
  "cooktops/induction": "Induction Cooktops",
  "cooktops/downdraft": "Downdraft Cooktops",
  "microwaves/built-in": "Built-In Microwaves",
  "microwaves/countertop": "Countertop Microwaves",
  "microwaves/over-the-range": "Over-the-Range Microwaves",
  "microwaves/drawer": "Microwave Drawers",
  "ventilation/under-cabinet": "Under-Cabinet Hoods",
  "ventilation/wall-mount": "Wall-Mount Hoods",
  "ventilation/island": "Island Hoods",
  "ventilation/inserts": "Hood Inserts",
  "ventilation/downdraft": "Downdraft Ventilation",
};

/** Dishwasher mega-menu paths → product facet filters (control / type). */
const DISHWASHER_PATH_FILTERS: Record<
  string,
  { label: string; match: (p: Product) => boolean }
> = {
  "top-control": {
    label: "Top-Control Dishwashers",
    match: (p) => p.controlType === "Top Control",
  },
  "front-control": {
    label: "Front-Control Dishwashers",
    match: (p) => p.controlType === "Front Control",
  },
  "panel-ready": {
    label: "Panel-Ready Dishwashers",
    match: (p) =>
      p.controlType === "Panel Ready" || /panel-ready/i.test(p.subcategory),
  },
  "built-in": {
    label: "Built-In Dishwashers",
    match: (p) => p.dishwasherType === 'Built-In 24"' || /built-in/i.test(p.subcategory),
  },
  portable: {
    label: "Portable Dishwashers",
    match: (p) =>
      p.dishwasherType === "Portable / Countertop" || /portable/i.test(p.subcategory),
  },
  drawer: {
    label: "Drawer Dishwashers",
    match: (p) => /drawer/i.test(p.subcategory) || /drawer/i.test(p.title),
  },
};

/** Parent path segment → related browse link used in empty/special-order suggestions. */
const RELATED_BROWSE: Record<string, { href: string; label: string }> = {
  "wall-ovens/double": {
    href: "/cooking/wall-ovens/single",
    label: "Browse single wall ovens",
  },
  "wall-ovens/single": {
    href: "/cooking/wall-ovens/double",
    label: "Browse double wall ovens",
  },
};

function productsForSubcategoryLabel(categoryProducts: Product[], label: string): Product[] {
  const target = slugify(label);
  return categoryProducts.filter((p) => slugify(p.subcategory) === target);
}

function productsForParentGroup(categoryProducts: Product[], parentSegment: string): Product[] {
  const needle = parentSegment.replace(/s$/, "");
  return categoryProducts.filter((p) => {
    const s = slugify(p.subcategory);
    return s.includes(parentSegment) || s.includes(needle);
  });
}

function resolvePathProducts(
  rest: string[],
  categoryProducts: Product[],
): { label: string; products: Product[] } | null {
  const pathKey = rest.join("/");

  const dishwasherFacet = DISHWASHER_PATH_FILTERS[pathKey];
  if (dishwasherFacet) {
    return {
      label: dishwasherFacet.label,
      products: categoryProducts.filter(dishwasherFacet.match),
    };
  }

  const aliased = PATH_SUBCATEGORY_ALIASES[pathKey];
  if (aliased) {
    return { label: aliased, products: productsForSubcategoryLabel(categoryProducts, aliased) };
  }

  // Constructed leaf + parent, e.g. double + wall-ovens → "Double Wall Ovens"
  if (rest.length >= 2) {
    const parent = rest[rest.length - 2];
    const leaf = rest[rest.length - 1];
    const constructed = `${titleFromSlugSegment(leaf)} ${titleFromSlugSegment(parent)}`;
    const byConstructed = productsForSubcategoryLabel(categoryProducts, constructed);
    if (byConstructed.length > 0 || PATH_SUBCATEGORY_ALIASES[`${parent}/${leaf}`]) {
      return { label: constructed, products: byConstructed };
    }

    // Exact subcategory slug match on last segment (e.g. french-door-refrigerators)
    const byLast = categoryProducts.filter((p) => slugify(p.subcategory) === leaf);
    if (byLast.length > 0) {
      return { label: byLast[0].subcategory, products: byLast };
    }
  }

  // Parent-only path, e.g. /cooking/wall-ovens
  if (rest.length === 1) {
    const byExact = categoryProducts.filter((p) => slugify(p.subcategory) === rest[0]);
    if (byExact.length > 0) {
      return { label: byExact[0].subcategory, products: byExact };
    }
    const byGroup = productsForParentGroup(categoryProducts, rest[0]);
    if (byGroup.length > 0) {
      return { label: titleFromSlugSegment(rest[0]), products: byGroup };
    }
  }

  // Last-segment exact subcategory (legacy deep links)
  const lastSegment = rest[rest.length - 1];
  const bySubcategory = categoryProducts.filter((p) => slugify(p.subcategory) === lastSegment);
  if (bySubcategory.length > 0) {
    return { label: bySubcategory[0].subcategory, products: bySubcategory };
  }

  return null;
}

function buildSuggestion(
  pathKey: string,
  label: string,
  matchedProducts: Product[],
): CatalogSuggestion | undefined {
  const related = RELATED_BROWSE[pathKey];
  const hasInStock = matchedProducts.some((p) => p.availability === "in_stock");
  const needsSpecialOrderPrompt =
    matchedProducts.length === 0 ||
    !hasInStock ||
    matchedProducts.every((p) => p.availability === "special_order" || p.availability === "call");

  if (!needsSpecialOrderPrompt && !related) return undefined;

  const phone = businessConfig.primaryContact;
  return {
    title: `Looking for ${label.toLowerCase()}?`,
    body: `We can special order any model. Call us at ${phone.phoneDisplay}${
      related ? ` or ${related.label.toLowerCase()}` : ""
    }.`,
    phoneDisplay: phone.phoneDisplay,
    phoneHref: phone.phoneHref,
    relatedHref: related?.href,
    relatedLabel: related?.label,
  };
}

/** Maps a nav/catalog URL (e.g. ["cooking","wall-ovens","double"]) to matching products. */
export function matchCatalogSlug(slug: string[]): CatalogMatch | null {
  const [root, ...rest] = slug;
  const category = findCatalogCategory(root);
  if (!category) return null;

  const categoryProducts = products.filter((p) => p.category === category.name);

  if (rest.length === 0) {
    return { category, products: categoryProducts, matchedSubcategory: false };
  }

  const resolved = resolvePathProducts(rest, categoryProducts);
  if (resolved) {
    const pathKey = rest.join("/");
    return {
      category,
      subcategoryLabel: resolved.label,
      products: resolved.products,
      matchedSubcategory: true,
      suggestion: buildSuggestion(pathKey, resolved.label, resolved.products),
    };
  }

  // Unrecognized deep path — keep category context but do not dump unrelated SKUs.
  return {
    category,
    subcategoryLabel: titleFromSlugSegment(rest[rest.length - 1]),
    products: [],
    matchedSubcategory: true,
    suggestion: buildSuggestion(rest.join("/"), titleFromSlugSegment(rest[rest.length - 1]), []),
  };
}

export const brandSlugs: { slug: string; name: string }[] = brands.map((name) => ({
  slug: slugify(name),
  name,
}));

export function findBrandBySlug(slug: string) {
  return brandSlugs.find((b) => b.slug === slug)?.name;
}
