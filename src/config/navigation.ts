export type NavLink = { label: string; href: string };
export type NavColumn = { title?: string; href?: string; links: NavLink[] };

export type NavKey =
  | "refrigeration"
  | "laundry"
  | "dishwashers"
  | "cooking"
  | "grills"
  | "packages"
  | "home-appliances"
  | "services"
  | "promotions"
  | "brands"
  | "financing";

export type NavLayout = "mega" | "compact" | "brands";

export type MegaMenuItem = {
  key: NavKey;
  label: string;
  href: string;
  type: NavLayout;
  columns: NavColumn[];
};

/**
 * Single source of truth for primary navigation — desktop mega menu and
 * mobile accordion both render from this array.
 */
export const mainNavigation: MegaMenuItem[] = [
  {
    key: "refrigeration",
    label: "Refrigeration",
    href: "/refrigeration",
    type: "mega",
    columns: [
      {
        title: "Refrigerators",
        href: "/refrigeration/refrigerators",
        links: [
          { label: "French Door", href: "/refrigeration/refrigerators/french-door-refrigerators" },
          { label: "Side-by-Side", href: "/refrigeration/refrigerators/side-by-side-refrigerators" },
          { label: "Top Freezer", href: "/refrigeration/refrigerators/top-freezer-refrigerators" },
          { label: "Bottom Freezer", href: "/refrigeration/refrigerators/bottom-freezer-refrigerators" },
          { label: "Built-In", href: "/refrigeration/refrigerators/built-in-refrigerators" },
          { label: "Counter-Depth", href: "/refrigeration/refrigerators/counter-depth-refrigerators" },
        ],
      },
      {
        title: "Freezers & Ice",
        href: "/refrigeration/freezers",
        links: [
          { label: "Upright Freezers", href: "/refrigeration/freezers/upright" },
          { label: "Chest Freezers", href: "/refrigeration/freezers/chest" },
          { label: "Column Freezers", href: "/refrigeration/freezers/column" },
          { label: "Ice Makers", href: "/refrigeration/ice-makers" },
        ],
      },
      {
        title: "Specialty Refrigeration",
        links: [
          { label: "Beverage Centers", href: "/refrigeration/beverage-centers" },
          { label: "Wine Coolers", href: "/refrigeration/wine-storage" },
          { label: "Compact Refrigerators", href: "/refrigeration/refrigerators/compact-refrigerators" },
          { label: "Under-Counter Refrigeration", href: "/refrigeration/refrigerators/under-counter-refrigerators" },
          { label: "Refrigerator Accessories", href: "/parts/refrigeration" },
        ],
      },
    ],
  },
  {
    key: "laundry",
    label: "Laundry",
    href: "/laundry",
    type: "mega",
    columns: [
      {
        title: "Laundry Pairs",
        href: "/laundry/laundry-pairs",
        links: [
          { label: "Front Load Pairs", href: "/laundry/laundry-pairs/front-load" },
          { label: "Top Load Pairs", href: "/laundry/laundry-pairs/top-load" },
          { label: "Stackable Laundry", href: "/laundry/laundry-centers" },
          { label: "Compact Laundry", href: "/laundry/washers/compact" },
        ],
      },
      {
        title: "Washers & Dryers",
        links: [
          { label: "Front Load Washers", href: "/laundry/washers/front-load" },
          { label: "Top Load Washers", href: "/laundry/washers/top-load" },
          { label: "Electric Dryers", href: "/laundry/dryers/electric" },
          { label: "Gas Dryers", href: "/laundry/dryers/gas" },
          { label: "Ventless Dryers", href: "/laundry/dryers/ventless" },
        ],
      },
    ],
  },
  {
    key: "dishwashers",
    label: "Dishwashers",
    href: "/dishwashers",
    type: "compact",
    columns: [
      {
        title: "Dishwashers",
        href: "/dishwashers",
        links: [
          { label: "Top-Control", href: "/dishwashers/top-control" },
          { label: "Front-Control", href: "/dishwashers/front-control" },
          { label: "Built-In", href: "/dishwashers/built-in" },
          { label: "Panel-Ready", href: "/dishwashers/panel-ready" },
          { label: "Drawer Dishwashers", href: "/dishwashers/drawer" },
          { label: "Compact / Portable", href: "/dishwashers/portable" },
        ],
      },
      {
        title: "Accessories",
        links: [
          { label: "Installation Kits", href: "/parts/dishwashers/installation-kits" },
          { label: "Dishwasher Hoses", href: "/parts/dishwashers/hoses" },
          { label: "Power Cords", href: "/parts/dishwashers/power-cords" },
          { label: "Cleaners", href: "/parts/dishwashers/cleaners" },
          { label: "Replacement Parts", href: "/parts/dishwashers/racks" },
        ],
      },
    ],
  },
  {
    key: "cooking",
    label: "Cooking",
    href: "/cooking",
    type: "mega",
    columns: [
      {
        title: "Ranges & Cooktops",
        href: "/cooking/ranges",
        links: [
          { label: "Gas Ranges", href: "/cooking/ranges/gas" },
          { label: "Electric Ranges", href: "/cooking/ranges/electric" },
          { label: "Induction Ranges", href: "/cooking/ranges/induction" },
          { label: "Dual-Fuel Ranges", href: "/cooking/ranges/dual-fuel" },
          { label: "Cooktops", href: "/cooking/cooktops" },
        ],
      },
      {
        title: "Ovens & Microwaves",
        links: [
          { label: "Wall Ovens", href: "/cooking/wall-ovens/single" },
          { label: "Double Wall Ovens", href: "/cooking/wall-ovens/double" },
          { label: "Microwave Ovens", href: "/cooking/microwaves" },
          { label: "Over-the-Range Microwaves", href: "/cooking/microwaves/over-the-range" },
          { label: "Speed Ovens", href: "/cooking/wall-ovens/speed" },
        ],
      },
      {
        title: "Ventilation & Accessories",
        links: [
          { label: "Range Hoods", href: "/cooking/ventilation/wall-mount" },
          { label: "Downdraft Ventilation", href: "/cooking/ventilation/downdraft" },
          { label: "Warming Drawers", href: "/cooking/warming-drawers" },
          { label: "Cooking Accessories", href: "/parts/cooking" },
          { label: "Installation Parts", href: "/parts/cooking/trim-kits" },
        ],
      },
    ],
  },
  {
    key: "grills",
    label: "Grills",
    href: "/grills",
    type: "mega",
    columns: [
      {
        title: "Grills",
        href: "/grills",
        links: [
          { label: "Freestanding Grills", href: "/grills/freestanding" },
          { label: "Built-In Grills", href: "/grills/built-in" },
          { label: "Portable Grills", href: "/grills/portable" },
          { label: "Gas Grills", href: "/grills/gas" },
          { label: "Charcoal Grills", href: "/grills/charcoal" },
        ],
      },
      {
        title: "Outdoor Cooking",
        links: [
          { label: "Pellet Grills", href: "/grills/pellet" },
          { label: "Smokers", href: "/grills/smokers" },
          { label: "Outdoor Kitchens", href: "/grills/outdoor-kitchens" },
          { label: "Outdoor Refrigeration", href: "/more-appliances/outdoor" },
          { label: "Side Burners", href: "/grills/side-burners" },
        ],
      },
      {
        title: "Accessories",
        links: [
          { label: "Grill Covers", href: "/parts/grills/covers" },
          { label: "Rotisserie Kits", href: "/parts/grills/rotisserie" },
          { label: "Grill Tools", href: "/parts/grills/tools" },
          { label: "Replacement Parts", href: "/parts/grills" },
          { label: "Fuel Accessories", href: "/parts/grills/fuel" },
        ],
      },
    ],
  },
  {
    key: "packages",
    label: "Packages",
    href: "/kitchen-packages",
    type: "compact",
    columns: [
      {
        title: "Appliance Packages",
        links: [
          { label: "Kitchen Packages", href: "/kitchen-packages" },
          { label: "Laundry Packages", href: "/laundry/laundry-pairs" },
          { label: "Refrigerator Packages", href: "/refrigeration/refrigerators" },
          { label: "Cooking Packages", href: "/kitchen-packages/ge-profile" },
        ],
      },
      {
        title: "Special Packages",
        links: [
          { label: "Builder Packages", href: "/builders" },
          { label: "Current Bundle Savings", href: "/promotions" },
        ],
      },
    ],
  },
  {
    key: "home-appliances",
    label: "Home Appliances",
    href: "/more-appliances",
    type: "mega",
    columns: [
      {
        title: "Home Appliances",
        links: [
          { label: "Garbage Disposals", href: "/more-appliances/garbage-disposals" },
          { label: "Trash Compactors", href: "/more-appliances/trash-compactors" },
          { label: "Air Purifiers", href: "/more-appliances/air-purifiers" },
          { label: "Vacuum Cleaners", href: "/more-appliances/vacuums" },
          { label: "Dehumidifiers", href: "/more-appliances/dehumidifiers" },
          { label: "Heating & Cooling", href: "/more-appliances/hvac" },
        ],
      },
      {
        title: "Small Appliances",
        links: [
          { label: "Mixers", href: "/small-appliances/mixers" },
          { label: "Blenders", href: "/small-appliances/blenders" },
          { label: "Coffee & Espresso", href: "/small-appliances/coffee" },
          { label: "Food Processors", href: "/small-appliances/food-processors" },
          { label: "Toasters", href: "/small-appliances/toasters" },
          { label: "Countertop Ovens", href: "/small-appliances/countertop-ovens" },
        ],
      },
      {
        title: "Specialty",
        links: [
          { label: "Outdoor Appliances", href: "/more-appliances/outdoor" },
          { label: "Commercial Appliances", href: "/more-appliances/commercial" },
          { label: "Parts & Accessories", href: "/parts" },
        ],
      },
    ],
  },
  {
    key: "services",
    label: "Services",
    href: "/repair",
    type: "compact",
    columns: [
      {
        title: "Appliance Services",
        links: [
          { label: "Schedule Repair", href: "/repair/schedule" },
          { label: "Appliance Installation", href: "/services/delivery-installation" },
          { label: "Delivery", href: "/services/delivery-installation" },
          { label: "Haul Away", href: "/services/haul-away" },
          { label: "Protection Plans", href: "/services/protection-plans" },
          { label: "Check Service Availability", href: "/repair/service-areas" },
        ],
      },
      {
        title: "Service Support",
        links: [
          { label: "Track Repair", href: "/repair/track" },
          { label: "Track Delivery", href: "/track-delivery" },
          { label: "Service Areas", href: "/repair/service-areas" },
          { label: "Repair FAQs", href: "/repair/faqs" },
          { label: "Contact Service", href: "/contact" },
          { label: "Warranty Support", href: "/services/protection-plans" },
        ],
      },
    ],
  },
  {
    key: "promotions",
    label: "Promotions",
    href: "/promotions",
    type: "compact",
    columns: [
      {
        title: "Current Offers",
        links: [
          { label: "Current Promotions", href: "/promotions" },
          { label: "Manufacturer Rebates", href: "/rebates" },
          { label: "In-Stock Specials", href: "/in-stock" },
          { label: "Clearance", href: "/clearance" },
          { label: "Bundle Savings", href: "/promotions" },
        ],
      },
      {
        title: "Ways to Save",
        links: [
          { label: "Financing Offers", href: "/financing" },
          { label: "Builder Discounts", href: "/builders" },
          { label: "Seasonal Sales", href: "/sales" },
          { label: "Protection Plan Offers", href: "/services/protection-plans" },
          { label: "Newsletter Offers", href: "/#newsletter" },
        ],
      },
    ],
  },
  {
    key: "brands",
    label: "Brands",
    href: "/brands",
    type: "brands",
    columns: [
      {
        title: "Whirlpool Family",
        links: [
          { label: "KitchenAid", href: "/brands/kitchenaid" },
          { label: "Whirlpool", href: "/brands/whirlpool" },
          { label: "Maytag", href: "/brands/maytag" },
          { label: "Amana", href: "/brands/amana" },
        ],
      },
      {
        title: "GE Family",
        links: [
          { label: "GE Appliances", href: "/brands/ge" },
          { label: "Café", href: "/brands/cafe" },
          { label: "Monogram", href: "/brands/monogram" },
          { label: "Hotpoint", href: "/brands/hotpoint" },
        ],
      },
      {
        title: "European",
        links: [
          { label: "Bosch", href: "/brands/bosch" },
          { label: "Thermador", href: "/brands/thermador" },
          { label: "Miele", href: "/brands/miele" },
          { label: "Electrolux", href: "/brands/electrolux" },
        ],
      },
      {
        title: "More Brands",
        links: [
          { label: "LG", href: "/brands/lg" },
          { label: "Samsung", href: "/brands/samsung" },
          { label: "Frigidaire", href: "/brands/frigidaire" },
          { label: "Speed Queen", href: "/brands/speed-queen" },
        ],
      },
    ],
  },
  {
    key: "financing",
    label: "Financing",
    href: "/financing",
    type: "compact",
    columns: [
      {
        title: "Financing",
        links: [
          { label: "Financing Overview", href: "/financing" },
          { label: "Apply for Financing", href: "/financing#apply" },
          { label: "Monthly Payment Options", href: "/financing" },
          { label: "Buy Now, Pay Later", href: "/financing" },
        ],
      },
      {
        title: "Help",
        links: [
          { label: "Financing Calculator", href: "/financing#calculator" },
          { label: "Financing FAQs", href: "/financing#faqs" },
          { label: "Terms & Conditions", href: "/terms" },
          { label: "Contact Sales", href: "/contact" },
        ],
      },
    ],
  },
];

/**
 * Company-related links, intentionally kept out of the desktop mega-nav bar.
 * Rendered in the mobile drawer and footer Company column.
 */
export const companyLinks: NavLink[] = [
  { label: "About Sarco", href: "/about" },
  { label: "Contact", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Service Areas", href: "/repair/service-areas" },
  { label: "Privacy", href: "/privacy" },
  { label: "Terms", href: "/terms" },
];

export const quickLinks: NavLink[] = [
  { label: "In Stock", href: "/in-stock" },
  { label: "Sales", href: "/sales" },
  { label: "Clearance", href: "/clearance" },
  { label: "Track Your Delivery", href: "/track-delivery" },
];
