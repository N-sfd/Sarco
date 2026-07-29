import { PrismaClient, AvailabilityStatus } from "@prisma/client";
import { products, brands } from "../src/data/products";
import { promotions, reviews, repairServices } from "../src/data/homepage";
import { businessConfig } from "../src/config/business";

const prisma = new PrismaClient();

// Sarco has no public retail locations — this seeds a single internal
// dispatch record (delivery/installation/repair operations base), not a
// customer-facing store.
const operationsBase = {
  slug: "hagerstown-operations",
  name: businessConfig.primaryContact.label,
  city: "Hagerstown",
  state: "MD",
  address: businessConfig.primaryContact.addressLines[0],
  zip: "21740",
  phone: businessConfig.primaryContact.phoneDisplay,
  lat: 39.6418,
  lng: -77.72,
};

const serviceAreaZips = [
  { zip: "21740", city: "Hagerstown", state: "MD" },
  { zip: "21701", city: "Frederick", state: "MD" },
  { zip: "25401", city: "Martinsburg", state: "WV" },
  { zip: "22601", city: "Winchester", state: "VA" },
  { zip: "21742", city: "Hagerstown", state: "MD" },
  { zip: "22602", city: "Winchester", state: "VA" },
];

async function main() {
  console.log("Seeding Sarco Appliances…");

  await prisma.store.upsert({
    where: { slug: operationsBase.slug },
    update: {},
    create: {
      ...operationsBase,
      hours: {
        create: [1, 2, 3, 4, 5].map((d) => ({
          dayOfWeek: d,
          openTime: "09:00",
          closeTime: "17:00",
        })),
      },
    },
  });

  for (const name of brands) {
    const slug = name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    await prisma.brand.upsert({
      where: { slug },
      update: { name },
      create: { slug, name, description: `${name} appliances available at Sarco.` },
    });
  }

  const topCategories = [
    { slug: "refrigeration", name: "Refrigeration", imageUrl: "/images/cat-refrigeration.jpg" },
    { slug: "laundry", name: "Laundry", imageUrl: "/images/cat-laundry.jpg" },
    { slug: "dishwashers", name: "Dishwashers", imageUrl: "/images/cat-dishwasher.jpg" },
    { slug: "cooking", name: "Cooking", imageUrl: "/images/cat-cooking.jpg" },
    { slug: "grills", name: "BBQ Grills", imageUrl: "/images/package-3.jpg" },
    { slug: "kitchen-packages", name: "Kitchen Packages", imageUrl: "/images/package-1.jpg" },
    { slug: "small-appliances", name: "Small Appliances", imageUrl: "/images/cat-small.jpg" },
    { slug: "more-appliances", name: "More Appliances", imageUrl: "/images/cat-commercial.jpg" },
  ];

  for (const cat of topCategories) {
    await prisma.category.upsert({
      where: { slug: cat.slug },
      update: {},
      create: cat,
    });
  }

  const subcats = [
    ["refrigeration", "french-door-refrigerators", "French Door Refrigerators"],
    ["refrigeration", "side-by-side-refrigerators", "Side-by-Side Refrigerators"],
    ["refrigeration", "top-freezer-refrigerators", "Top Freezer Refrigerators"],
    ["refrigeration", "column-freezers", "Column Freezers"],
    ["refrigeration", "chest-freezers", "Chest Freezers"],
    ["refrigeration", "compact-refrigerators", "Compact Refrigerators"],
    ["laundry", "front-load-washers", "Front Load Washers"],
    ["laundry", "top-load-washers", "Top Load Washers"],
    ["laundry", "electric-dryers", "Electric Dryers"],
    ["laundry", "gas-dryers", "Gas Dryers"],
    ["laundry", "commercial-laundry", "Commercial Laundry"],
    ["laundry", "top-load-laundry-pairs", "Top Load Laundry Pairs"],
    ["dishwashers", "built-in-dishwashers", "Built-In Dishwashers"],
    ["dishwashers", "panel-ready-dishwashers", "Panel-Ready Dishwashers"],
    ["cooking", "induction-ranges", "Induction Ranges"],
    ["cooking", "gas-ranges", "Gas Ranges"],
    ["cooking", "professional-ranges", "Professional Ranges"],
    ["cooking", "gas-cooktops", "Gas Cooktops"],
    ["cooking", "induction-cooktops", "Induction Cooktops"],
    ["cooking", "single-wall-ovens", "Single Wall Ovens"],
    ["cooking", "over-the-range-microwaves", "Over-the-Range Microwaves"],
    ["cooking", "microwave-drawers", "Microwave Drawers"],
    ["cooking", "wall-mount-hoods", "Wall-Mount Hoods"],
    ["grills", "freestanding-grills", "Freestanding Grills"],
    ["kitchen-packages", "kitchenaid-packages", "KitchenAid Packages"],
    ["kitchen-packages", "ge-profile-packages", "GE Profile Packages"],
    ["small-appliances", "mixers", "Mixers"],
    ["more-appliances", "garbage-disposals", "Garbage Disposals"],
    ["more-appliances", "heating-and-cooling", "Heating and Cooling"],
  ] as const;

  for (const [parentSlug, slug, name] of subcats) {
    const parent = await prisma.category.findUnique({ where: { slug: parentSlug } });
    if (!parent) continue;
    await prisma.category.upsert({
      where: { slug },
      update: {},
      create: { slug, name, parentId: parent.id },
    });
  }

  const availMap: Record<string, AvailabilityStatus> = {
    in_stock: AvailabilityStatus.IN_STOCK,
    limited: AvailabilityStatus.LIMITED,
    delivery: AvailabilityStatus.DELIVERY,
    call: AvailabilityStatus.CALL,
    special_order: AvailabilityStatus.SPECIAL_ORDER,
  };

  for (const product of products) {
    const brandSlug = product.brand.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
    const brand = await prisma.brand.findUnique({ where: { slug: brandSlug } });
    const categorySlug = product.subcategory
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");
    let category = await prisma.category.findUnique({ where: { slug: categorySlug } });
    if (!category) {
      const parentSlug = product.category.toLowerCase().replace(/[^a-z0-9]+/g, "-");
      const parent = await prisma.category.findUnique({ where: { slug: parentSlug } });
      category = parent ?? (await prisma.category.findFirst());
    }
    if (!brand || !category) continue;

    await prisma.product.upsert({
      where: { slug: product.slug },
      update: {},
      create: {
        slug: product.slug,
        title: product.title,
        model: product.model,
        sku: product.sku,
        brandId: brand.id,
        categoryId: category.id,
        featured: !!product.featured,
        energyStar: !!product.energyStar,
        finish: product.finish,
        availability: availMap[product.availability],
        images: { create: [{ url: product.image, alt: product.title, sortOrder: 0 }] },
        prices: {
          create: [{ amount: product.price, saleAmount: product.salePrice ?? null }],
        },
        inventory: { create: { quantity: product.availability === "in_stock" ? 12 : 3 } },
      },
    });
  }

  for (const promo of promotions) {
    const slug = promo.title.toLowerCase().replace(/[^a-z0-9]+/g, "-");
    await prisma.promotion.upsert({
      where: { slug },
      update: {},
      create: {
        slug,
        title: promo.title,
        description: promo.desc,
        href: promo.href,
        active: true,
      },
    });
  }

  const reviewCount = await prisma.review.count();
  if (reviewCount === 0) {
    await prisma.review.createMany({
      data: reviews.map((r) => ({
        authorName: r.name,
        rating: r.rating,
        text: r.text,
        source: r.source,
        verified: r.verified,
      })),
    });
  }

  for (const area of serviceAreaZips) {
    await prisma.serviceArea.upsert({
      where: { zip: area.zip },
      update: {},
      create: area,
    });
  }

  await prisma.installationService.createMany({
    data: [
      { name: "Standard Installation", description: "Delivery, placement, and basic connection.", price: 129 },
      { name: "Built-In Installation", description: "Built-in appliance install with testing.", price: 249 },
    ],
    skipDuplicates: true,
  });

  await prisma.haulAwayService.createMany({
    data: [{ name: "Appliance Haul Away", description: "Remove and recycle old unit.", price: 49 }],
    skipDuplicates: true,
  });

  await prisma.protectionPlan.createMany({
    data: [
      { name: "3-Year Protection", description: "Parts and labor beyond manufacturer warranty.", termMonths: 36, price: 199 },
      { name: "5-Year Protection", description: "Extended coverage for major appliances.", termMonths: 60, price: 299 },
    ],
    skipDuplicates: true,
  });

  console.log(`Seeded ${products.length} products, ${brands.length} brands, 1 operations base.`);
  console.log(`Repair service types documented: ${repairServices.length}`);
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
