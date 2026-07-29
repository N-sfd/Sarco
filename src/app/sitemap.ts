import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { products } from "@/data/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const base = siteConfig.url;
  const staticPaths = [
    "",
    "/refrigeration",
    "/laundry",
    "/dishwashers",
    "/cooking",
    "/grills",
    "/kitchen-packages",
    "/small-appliances",
    "/clearance",
    "/in-stock",
    "/sales",
    "/repair",
    "/repair/schedule",
    "/repair/services",
    "/repair/brands",
    "/repair/service-areas",
    "/repair/track",
    "/repair/faqs",
    "/services/delivery-installation",
    "/services/haul-away",
    "/services/protection-plans",
    "/track-delivery",
    "/financing",
    "/promotions",
    "/rebates",
    "/brands",
    "/parts",
    "/compare",
    "/locations",
    "/builders",
    "/about",
    "/about/story",
    "/contact",
    "/careers",
    "/privacy",
    "/terms",
    "/accessibility",
    "/search",
  ];

  return [
    ...staticPaths.map((path) => ({
      url: `${base}${path}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: path === "" ? 1 : 0.7,
    })),
    ...products.map((p) => ({
      url: `${base}/products/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: "weekly" as const,
      priority: 0.6,
    })),
  ];
}
