import { siteConfig } from "@/config/site";

export function organizationSchema() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: siteConfig.name,
    url: siteConfig.url,
  };
}

export function breadcrumbSchema(items: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: items.map((item, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: item.name,
      item: `${siteConfig.url}${item.href}`,
    })),
  };
}

export function productSchema(product: {
  title: string;
  brand: string;
  sku: string;
  image: string;
  price: number;
  salePrice?: number;
  rating: number;
  reviewCount: number;
  availability: string;
  slug: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    brand: { "@type": "Brand", name: product.brand },
    sku: product.sku,
    image: `${siteConfig.url}${product.image}`,
    url: `${siteConfig.url}/products/${product.slug}`,
    aggregateRating:
      product.reviewCount > 0
        ? {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          }
        : undefined,
    offers: {
      "@type": "Offer",
      priceCurrency: "USD",
      price: product.salePrice ?? product.price,
      availability:
        product.availability === "in_stock"
          ? "https://schema.org/InStock"
          : "https://schema.org/LimitedAvailability",
      url: `${siteConfig.url}/products/${product.slug}`,
    },
  };
}

export function serviceSchema({
  name,
  description,
  areaServed,
}: {
  name: string;
  description: string;
  areaServed: string[];
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Service",
    serviceType: name,
    name,
    description,
    provider: { "@type": "Organization", name: siteConfig.name, url: siteConfig.url },
    areaServed,
  };
}

export function faqSchema(faqs: { q: string; a: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: faqs.map((faq) => ({
      "@type": "Question",
      name: faq.q,
      acceptedAnswer: { "@type": "Answer", text: faq.a },
    })),
  };
}
