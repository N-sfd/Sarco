export type NavLink = { label: string; href: string };
export type NavColumn = { title: string; href?: string; links: NavLink[] };
export type MegaMenuItem = {
  label: string;
  /** Short label for desktop nav bar; full `label` stays in mega menus */
  navLabel?: string;
  href: string;
  columns: NavColumn[];
  promo?: { title: string; text: string; href: string; image: string; cta: string };
};

export const megaMenus: MegaMenuItem[] = [
  {
    label: "Refrigeration",
    href: "/refrigeration",
    promo: {
      title: "Counter-Depth French Doors",
      text: "Premium cooling with a built-in look — in stock for local delivery.",
      href: "/refrigeration/refrigerators/french-door-refrigerators",
      image: "/images/product-fridge.jpg",
      cta: "Shop French Door",
    },
    columns: [
      {
        title: "Refrigerators",
        href: "/refrigeration/refrigerators",
        links: [
          { label: "Shop All Refrigerators", href: "/refrigeration/refrigerators" },
          { label: "French Door Refrigerators", href: "/refrigeration/refrigerators/french-door-refrigerators" },
          { label: "Side-by-Side Refrigerators", href: "/refrigeration/refrigerators/side-by-side-refrigerators" },
          { label: "Top Freezer Refrigerators", href: "/refrigeration/refrigerators/top-freezer-refrigerators" },
          { label: "Bottom Freezer Refrigerators", href: "/refrigeration/refrigerators/bottom-freezer-refrigerators" },
          { label: "Built-In Refrigerators", href: "/refrigeration/refrigerators/built-in-refrigerators" },
          { label: "Counter-Depth Refrigerators", href: "/refrigeration/refrigerators/counter-depth-refrigerators" },
          { label: "Freezerless Refrigerators", href: "/refrigeration/refrigerators/freezerless-refrigerators" },
          { label: "Column Refrigerators", href: "/refrigeration/refrigerators/column-refrigerators" },
          { label: "Compact Refrigerators", href: "/refrigeration/refrigerators/compact-refrigerators" },
          { label: "Under-Counter Refrigerators", href: "/refrigeration/refrigerators/under-counter-refrigerators" },
        ],
      },
      {
        title: "Beverage Centers",
        href: "/refrigeration/beverage-centers",
        links: [
          { label: "Shop All Beverage Centers", href: "/refrigeration/beverage-centers" },
          { label: "Built-In Beverage Centers", href: "/refrigeration/beverage-centers/built-in" },
          { label: "Freestanding Beverage Centers", href: "/refrigeration/beverage-centers/freestanding" },
          { label: "Under-Counter Beverage Centers", href: "/refrigeration/beverage-centers/under-counter" },
        ],
      },
      {
        title: "Wine Storage",
        href: "/refrigeration/wine-storage",
        links: [
          { label: "Shop All Wine Coolers", href: "/refrigeration/wine-storage" },
          { label: "Built-In Wine Coolers", href: "/refrigeration/wine-storage/built-in" },
          { label: "Freestanding Wine Coolers", href: "/refrigeration/wine-storage/freestanding" },
          { label: "Under-Counter Wine Coolers", href: "/refrigeration/wine-storage/under-counter" },
          { label: "Wine Columns", href: "/refrigeration/wine-storage/columns" },
        ],
      },
      {
        title: "Freezers",
        href: "/refrigeration/freezers",
        links: [
          { label: "Shop All Freezers", href: "/refrigeration/freezers" },
          { label: "Upright Freezers", href: "/refrigeration/freezers/upright" },
          { label: "Chest Freezers", href: "/refrigeration/freezers/chest" },
          { label: "Column Freezers", href: "/refrigeration/freezers/column" },
          { label: "Freezer Drawers", href: "/refrigeration/freezers/drawers" },
        ],
      },
      {
        title: "Ice Makers",
        href: "/refrigeration/ice-makers",
        links: [
          { label: "Shop All Ice Makers", href: "/refrigeration/ice-makers" },
          { label: "Countertop Ice Makers", href: "/refrigeration/ice-makers/countertop" },
          { label: "Freestanding Ice Makers", href: "/refrigeration/ice-makers/freestanding" },
          { label: "Under-Counter Ice Makers", href: "/refrigeration/ice-makers/under-counter" },
        ],
      },
      {
        title: "Refrigeration Accessories",
        href: "/parts/refrigeration",
        links: [
          { label: "Water Filters", href: "/parts/refrigeration/water-filters" },
          { label: "Ice Makers", href: "/parts/refrigeration/ice-makers" },
          { label: "Handles", href: "/parts/refrigeration/handles" },
          { label: "Supply Lines", href: "/parts/refrigeration/supply-lines" },
          { label: "Panel Kits", href: "/parts/refrigeration/panel-kits" },
          { label: "Organizers", href: "/parts/refrigeration/organizers" },
          { label: "Power Cords", href: "/parts/refrigeration/power-cords" },
          { label: "Cleaners", href: "/parts/refrigeration/cleaners" },
        ],
      },
    ],
  },
  {
    label: "Laundry",
    href: "/laundry",
    promo: {
      title: "Front-Load Laundry Pairs",
      text: "Quiet, efficient washers and dryers matched for performance.",
      href: "/laundry/laundry-pairs",
      image: "/images/cat-laundry.jpg",
      cta: "Shop Laundry Pairs",
    },
    columns: [
      {
        title: "Laundry Pairs",
        href: "/laundry/laundry-pairs",
        links: [
          { label: "Shop All Laundry Pairs", href: "/laundry/laundry-pairs" },
          { label: "Front Load Laundry Pairs", href: "/laundry/laundry-pairs/front-load" },
          { label: "Top Load Laundry Pairs", href: "/laundry/laundry-pairs/top-load" },
        ],
      },
      {
        title: "Washers",
        href: "/laundry/washers",
        links: [
          { label: "Shop All Washers", href: "/laundry/washers" },
          { label: "Top Load Washers", href: "/laundry/washers/top-load" },
          { label: "Front Load Washers", href: "/laundry/washers/front-load" },
          { label: "Compact Washers", href: "/laundry/washers/compact" },
          { label: "Portable Washers", href: "/laundry/washers/portable" },
        ],
      },
      {
        title: "Dryers",
        href: "/laundry/dryers",
        links: [
          { label: "Shop All Dryers", href: "/laundry/dryers" },
          { label: "Electric Dryers", href: "/laundry/dryers/electric" },
          { label: "Gas Dryers", href: "/laundry/dryers/gas" },
          { label: "Vented Dryers", href: "/laundry/dryers/vented" },
          { label: "Ventless Dryers", href: "/laundry/dryers/ventless" },
        ],
      },
      {
        title: "Additional Laundry",
        href: "/laundry/more",
        links: [
          { label: "Laundry Centers", href: "/laundry/laundry-centers" },
          { label: "Washer Dryer Combos", href: "/laundry/washer-dryer-combos" },
          { label: "Drying Cabinets", href: "/laundry/drying-cabinets" },
          { label: "Commercial Laundry", href: "/laundry/commercial" },
        ],
      },
      {
        title: "Laundry Accessories",
        href: "/parts/laundry",
        links: [
          { label: "Pedestals", href: "/parts/laundry/pedestals" },
          { label: "Stacking Kits", href: "/parts/laundry/stacking-kits" },
          { label: "Washer Hoses", href: "/parts/laundry/washer-hoses" },
          { label: "Dryer Power Cords", href: "/parts/laundry/dryer-power-cords" },
          { label: "Dryer Vent Kits", href: "/parts/laundry/dryer-vent-kits" },
          { label: "Drying Racks", href: "/parts/laundry/drying-racks" },
          { label: "Detergents", href: "/parts/laundry/detergents" },
          { label: "Appliance Cleaners", href: "/parts/laundry/cleaners" },
        ],
      },
    ],
  },
  {
    label: "Dishwashers",
    href: "/dishwashers",
    columns: [
      {
        title: "Dishwashers",
        href: "/dishwashers",
        links: [
          { label: "Shop All Dishwashers", href: "/dishwashers" },
          { label: "Built-In Dishwashers", href: "/dishwashers/built-in" },
          { label: "Top-Control Dishwashers", href: "/dishwashers/top-control" },
          { label: "Front-Control Dishwashers", href: "/dishwashers/front-control" },
          { label: "Panel-Ready Dishwashers", href: "/dishwashers/panel-ready" },
          { label: "Drawer Dishwashers", href: "/dishwashers/drawer" },
          { label: "Portable Dishwashers", href: "/dishwashers/portable" },
        ],
      },
      {
        title: "Parts & Accessories",
        href: "/parts/dishwashers",
        links: [
          { label: "Dishwasher Installation Kits", href: "/parts/dishwashers/installation-kits" },
          { label: "Dishwasher Hoses", href: "/parts/dishwashers/hoses" },
          { label: "Dishwasher Power Cords", href: "/parts/dishwashers/power-cords" },
          { label: "Dishwasher Cleaners", href: "/parts/dishwashers/cleaners" },
          { label: "Replacement Racks and Parts", href: "/parts/dishwashers/racks" },
        ],
      },
    ],
  },
  {
    label: "Cooking",
    href: "/cooking",
    promo: {
      title: "Induction Ranges On Sale",
      text: "Precise heat, easier cleanup, and Energy Star efficiency.",
      href: "/cooking/ranges/induction",
      image: "/images/cat-cooking.jpg",
      cta: "Shop Induction",
    },
    columns: [
      {
        title: "Ranges",
        href: "/cooking/ranges",
        links: [
          { label: "Gas Ranges", href: "/cooking/ranges/gas" },
          { label: "Electric Ranges", href: "/cooking/ranges/electric" },
          { label: "Induction Ranges", href: "/cooking/ranges/induction" },
          { label: "Dual-Fuel Ranges", href: "/cooking/ranges/dual-fuel" },
          { label: "Professional Ranges", href: "/cooking/ranges/professional" },
        ],
      },
      {
        title: "Cooktops and Rangetops",
        href: "/cooking/cooktops",
        links: [
          { label: "Gas Cooktops", href: "/cooking/cooktops/gas" },
          { label: "Electric Cooktops", href: "/cooking/cooktops/electric" },
          { label: "Induction Cooktops", href: "/cooking/cooktops/induction" },
          { label: "Downdraft Cooktops", href: "/cooking/cooktops/downdraft" },
          { label: "Rangetops", href: "/cooking/rangetops" },
        ],
      },
      {
        title: "Wall Ovens",
        href: "/cooking/wall-ovens",
        links: [
          { label: "Single Wall Ovens", href: "/cooking/wall-ovens/single" },
          { label: "Double Wall Ovens", href: "/cooking/wall-ovens/double" },
          { label: "Microwave Combination Ovens", href: "/cooking/wall-ovens/microwave-combo" },
          { label: "Speed Ovens", href: "/cooking/wall-ovens/speed" },
          { label: "Steam Ovens", href: "/cooking/wall-ovens/steam" },
          { label: "Warming Drawers", href: "/cooking/warming-drawers" },
        ],
      },
      {
        title: "Microwaves",
        href: "/cooking/microwaves",
        links: [
          { label: "Built-In Microwaves", href: "/cooking/microwaves/built-in" },
          { label: "Countertop Microwaves", href: "/cooking/microwaves/countertop" },
          { label: "Over-the-Range Microwaves", href: "/cooking/microwaves/over-the-range" },
          { label: "Microwave Drawers", href: "/cooking/microwaves/drawer" },
        ],
      },
      {
        title: "Ventilation",
        href: "/cooking/ventilation",
        links: [
          { label: "Under-Cabinet Hoods", href: "/cooking/ventilation/under-cabinet" },
          { label: "Wall-Mount Hoods", href: "/cooking/ventilation/wall-mount" },
          { label: "Island Hoods", href: "/cooking/ventilation/island" },
          { label: "Hood Inserts", href: "/cooking/ventilation/inserts" },
          { label: "Downdraft Ventilation", href: "/cooking/ventilation/downdraft" },
        ],
      },
      {
        title: "Cooking Accessories",
        href: "/parts/cooking",
        links: [
          { label: "Griddles", href: "/parts/cooking/griddles" },
          { label: "Knobs", href: "/parts/cooking/knobs" },
          { label: "Grates", href: "/parts/cooking/grates" },
          { label: "Oven Racks", href: "/parts/cooking/oven-racks" },
          { label: "Trim Kits", href: "/parts/cooking/trim-kits" },
          { label: "Power Cords", href: "/parts/cooking/power-cords" },
          { label: "Gas Conversion Kits", href: "/parts/cooking/gas-conversion" },
          { label: "Temperature Probes", href: "/parts/cooking/probes" },
        ],
      },
    ],
  },
  {
    label: "BBQ Grills",
    navLabel: "Grills",
    href: "/grills",
    columns: [
      {
        title: "Grills",
        href: "/grills",
        links: [
          { label: "Freestanding Grills", href: "/grills/freestanding" },
          { label: "Built-In Grills", href: "/grills/built-in" },
          { label: "Portable Grills", href: "/grills/portable" },
          { label: "Tabletop Grills", href: "/grills/tabletop" },
          { label: "Gas Grills", href: "/grills/gas" },
          { label: "Charcoal Grills", href: "/grills/charcoal" },
          { label: "Pellet Grills", href: "/grills/pellet" },
          { label: "Electric Grills", href: "/grills/electric" },
          { label: "Smokers", href: "/grills/smokers" },
          { label: "Outdoor Kitchens", href: "/grills/outdoor-kitchens" },
        ],
      },
      {
        title: "Grill Accessories",
        href: "/parts/grills",
        links: [
          { label: "Grill Covers", href: "/parts/grills/covers" },
          { label: "Rotisserie Accessories", href: "/parts/grills/rotisserie" },
          { label: "Grill Carts", href: "/parts/grills/carts" },
          { label: "Drip Pans", href: "/parts/grills/drip-pans" },
          { label: "Fuel Accessories", href: "/parts/grills/fuel" },
        ],
      },
    ],
  },
  {
    label: "Kitchen Packages",
    navLabel: "Packages",
    href: "/kitchen-packages",
    columns: [
      {
        title: "Packages",
        href: "/kitchen-packages",
        links: [
          { label: "Shop All Kitchen Packages", href: "/kitchen-packages" },
          { label: "KitchenAid Packages", href: "/kitchen-packages/kitchenaid" },
          { label: "GE Profile Packages", href: "/kitchen-packages/ge-profile" },
          { label: "Bosch Packages", href: "/kitchen-packages/bosch" },
          { label: "LG Packages", href: "/kitchen-packages/lg" },
          { label: "Samsung Packages", href: "/kitchen-packages/samsung" },
          { label: "Whirlpool Packages", href: "/kitchen-packages/whirlpool" },
          { label: "Café Packages", href: "/kitchen-packages/cafe" },
        ],
      },
    ],
  },
  {
    label: "More Appliances",
    navLabel: "More",
    href: "/more-appliances",
    columns: [
      {
        title: "Home Appliances",
        links: [
          { label: "Garbage Disposals", href: "/more-appliances/garbage-disposals" },
          { label: "Trash Compactors", href: "/more-appliances/trash-compactors" },
          { label: "Air Purifiers", href: "/more-appliances/air-purifiers" },
          { label: "Vacuum Cleaners", href: "/more-appliances/vacuums" },
          { label: "Dehumidifiers", href: "/more-appliances/dehumidifiers" },
          { label: "Heating and Cooling", href: "/more-appliances/hvac" },
        ],
      },
      {
        title: "Small Appliances",
        links: [
          { label: "Shop All Small Appliances", href: "/small-appliances" },
          { label: "Mixers", href: "/small-appliances/mixers" },
          { label: "Blenders", href: "/small-appliances/blenders" },
          { label: "Coffee and Espresso Makers", href: "/small-appliances/coffee" },
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
          { label: "Parts and Accessories", href: "/parts" },
        ],
      },
    ],
  },
  {
    label: "Repair & Services",
    navLabel: "Services",
    href: "/repair",
    columns: [
      {
        title: "Repair",
        links: [
          { label: "Schedule Repair", href: "/repair/schedule" },
          { label: "Repair Services", href: "/repair/services" },
          { label: "Brands We Service", href: "/repair/brands" },
          { label: "Service Areas", href: "/repair/service-areas" },
          { label: "Track Repair", href: "/repair/track" },
          { label: "Repair FAQs", href: "/repair/faqs" },
        ],
      },
      {
        title: "Delivery & Install",
        links: [
          { label: "Delivery & Installation", href: "/services/delivery-installation" },
          { label: "Haul Away", href: "/services/haul-away" },
          { label: "Protection Plans", href: "/services/protection-plans" },
          { label: "Track Your Delivery", href: "/track-delivery" },
        ],
      },
    ],
  },
  {
    label: "Promotions & Rebates",
    navLabel: "Promotions",
    href: "/promotions",
    columns: [
      {
        title: "Savings",
        links: [
          { label: "Current Promotions", href: "/promotions" },
          { label: "Manufacturer Rebates", href: "/rebates" },
          { label: "Clearance", href: "/clearance" },
          { label: "In Stock Specials", href: "/in-stock" },
          { label: "Sales", href: "/sales" },
        ],
      },
    ],
  },
  {
    label: "Brands",
    href: "/brands",
    columns: [
      {
        title: "Shop by Brand",
        links: [
          { label: "KitchenAid", href: "/brands/kitchenaid" },
          { label: "Whirlpool", href: "/brands/whirlpool" },
          { label: "Maytag", href: "/brands/maytag" },
          { label: "Bosch", href: "/brands/bosch" },
          { label: "GE Appliances", href: "/brands/ge" },
          { label: "Café", href: "/brands/cafe" },
          { label: "Frigidaire", href: "/brands/frigidaire" },
          { label: "Electrolux", href: "/brands/electrolux" },
          { label: "LG", href: "/brands/lg" },
          { label: "Samsung", href: "/brands/samsung" },
          { label: "Miele", href: "/brands/miele" },
          { label: "Thermador", href: "/brands/thermador" },
          { label: "Sub-Zero", href: "/brands/sub-zero" },
          { label: "Wolf", href: "/brands/wolf" },
          { label: "Viking", href: "/brands/viking" },
          { label: "Speed Queen", href: "/brands/speed-queen" },
        ],
      },
    ],
  },
  {
    label: "Financing",
    href: "/financing",
    columns: [
      {
        title: "Financing",
        links: [
          { label: "Financing Options", href: "/financing" },
          { label: "Payment Calculator", href: "/financing#calculator" },
          { label: "Apply Now", href: "/financing#apply" },
          { label: "FAQs", href: "/financing#faqs" },
        ],
      },
    ],
  },
  {
    label: "Company",
    href: "/about",
    columns: [
      {
        title: "About Sarco",
        links: [
          { label: "About Us", href: "/about" },
          { label: "Our Story", href: "/about/story" },
          { label: "Locations", href: "/locations" },
          { label: "Contact Us", href: "/contact" },
          { label: "Careers", href: "/careers" },
          { label: "Builder Sales", href: "/builders" },
          { label: "Privacy Policy", href: "/privacy" },
          { label: "Terms and Conditions", href: "/terms" },
          { label: "Accessibility", href: "/accessibility" },
        ],
      },
    ],
  },
];

export const quickLinks: NavLink[] = [
  { label: "In Stock", href: "/in-stock" },
  { label: "Sales", href: "/sales" },
  { label: "Clearance", href: "/clearance" },
  { label: "Track Your Delivery", href: "/track-delivery" },
];
