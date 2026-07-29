import { readFileSync, writeFileSync } from "fs";
import path from "path";

const file = path.resolve("src/data/products.ts");
let src = readFileSync(file, "utf8");

/** Every SKU gets a distinct image path (catalogImages key or absolute /images path). */
const map = {
  "bosch-36-french-door-refrigerator": "fridgeFrenchDoor",
  "lg-front-load-steam-washer": "washerFrontLoad",
  "samsung-smart-induction-range": "range",
  "kitchenaid-44dba-dishwasher": "dishwasherPanelReady",
  "ge-otr-convection-microwave": "microwave",
  "wolf-48-dual-fuel-range": "proRange",
  "speed-queen-top-load-commercial-washer": "washerCommercial",
  "subzero-30-column-freezer": "freezer",
  "whirlpool-side-by-side-refrigerator": "fridgeSideBySide",
  "maytag-top-load-washer": "washerTopLoad",
  "frigidaire-gas-range": "rangeGas",
  "bosch-500-dishwasher": "dishwasherTopControl",
  "cafe-french-door-refrigerator": "fridgeLifestyle",
  "electrolux-front-load-washer": "commercialWasher",
  "thermador-induction-cooktop": "cooktop",
  "miele-dishwasher": "dishwasher",
  "lg-electric-dryer": "dryerElectric",
  "samsung-gas-dryer": "dryerStainless",
  "ge-profile-wall-oven": "wallOven",
  "bosch-benchmark-double-wall-oven": "wallOvenDouble",
  "cafe-double-wall-oven": "/images/hero-kitchen.jpg",
  "kitchenaid-double-wall-oven": "/images/package-6.jpg",
  "thermador-double-wall-oven": "/images/blog-2.jpg",
  "kitchenaid-stand-mixer": "mixer",
  "viking-professional-range": "/images/package-4.jpg",
  "frigidaire-top-freezer": "fridgeTopFreezer",
  "whirlpool-dishwasher": "dishwasherInterior",
  "bosch-18-compact-dishwasher": "dishwasherDrawer",
  "ge-portable-dishwasher": "dishwasherPortable",
  "bosch-benchmark-range": "cookingAlt",
  "lg-instaview-refrigerator": "fridge",
  "maytag-gas-dryer": "dryerBlack",
  "samsung-bespoke-fridge": "fridgeBlack",
  "kitchenaid-gas-cooktop": "cooking",
  "ge-compact-refrigerator": "fridgeCompact",
  "whirlpool-laundry-pair": "laundryPair",
  "lg-stacked-laundry-center": "laundryStacked",
  "frigidaire-chest-freezer": "freezerAlt",
  "bosch-wall-hood": "rangeHood",
  "lg-portable-ac": "smallAppliance",
  "insinkerator-disposal": "kitchen",
  "napoleon-gas-grill": "grill",
  "cafe-induction-range": "/images/package-5.jpg",
  "samsung-microwave-drawer": "/images/package-2.jpg",
  "kitchenaid-refrigerator-package": "package1",
  "ge-profile-kitchen-package": "/images/promo-bundle.jpg",
  "speed-queen-dryer": "washerLegacy",
};

const used = new Set();
for (const [slug, img] of Object.entries(map)) {
  const value = img.startsWith("/") ? `"${img}"` : `catalogImages.${img}`;
  const resolved = img.startsWith("/") ? img : `key:${img}`;
  if (used.has(resolved)) {
    console.warn("DUPLICATE VALUE", img, "for", slug);
  }
  used.add(resolved);

  const re = new RegExp(`(slug:\\s*"${slug}"[\\s\\S]*?\\n\\s*image:\\s*)[^,\\n]+`, "m");
  if (!re.test(src)) {
    console.warn("No match for", slug);
    continue;
  }
  src = src.replace(re, `$1${value}`);
  console.log("OK", slug);
}

writeFileSync(file, src);
console.log("Assigned", used.size, "unique images");
