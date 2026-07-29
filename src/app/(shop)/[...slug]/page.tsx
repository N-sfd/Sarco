import type { Metadata } from "next";
import Link from "next/link";
import { StubPage } from "@/components/layout/stub-page";
import { PageContainer } from "@/components/layout/page-container";
import { CatalogListing } from "@/components/catalog/catalog-listing";
import { CategoryLanding } from "@/components/catalog/category-landing";
import { matchCatalogSlug, titleFromSlugSegment } from "@/lib/catalog";
import { categoryImages } from "@/data/categoryImages";

type Props = { params: Promise<{ slug: string[] }> };

function titleFromSlug(slug: string[]) {
  return slug.map(titleFromSlugSegment).join(" · ");
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const match = matchCatalogSlug(slug);
  if (match) {
    const title = match.subcategoryLabel ?? titleFromSlug(slug);
    return { title: `${title} | ${match.category.name}` };
  }
  return { title: titleFromSlug(slug) };
}

/** Hero + subtype-card landing section for the 3 highest-traffic category roots. */
function getCategoryLanding(categorySlug: string, slug: string[]) {
  if (categorySlug === "refrigeration" && slug.length === 2 && slug[1] === "refrigerators") {
    const img = categoryImages.refrigeration;
    return (
      <CategoryLanding
        title="Refrigeration"
        description="French-door, side-by-side, counter-depth, built-in, and compact refrigerators — in stock for local delivery."
        heroImage={img.hero}
        heroHref="/refrigeration/refrigerators"
        heroCta="Shop All Refrigerators"
        cards={[
          { label: "French Door", href: "/refrigeration/refrigerators/french-door-refrigerators", image: img.frenchDoor },
          { label: "Side-by-Side", href: "/refrigeration/refrigerators/side-by-side-refrigerators", image: img.sideBySide },
          { label: "Top Freezer", href: "/refrigeration/refrigerators/top-freezer-refrigerators", image: img.topFreezer },
          { label: "Bottom Freezer", href: "/refrigeration/refrigerators/bottom-freezer-refrigerators", image: img.bottomFreezer },
          { label: "Built-In", href: "/refrigeration/refrigerators/built-in-refrigerators", image: img.builtIn },
          { label: "Counter-Depth", href: "/refrigeration/refrigerators/counter-depth-refrigerators", image: img.counterDepth },
        ]}
      />
    );
  }

  if (categorySlug === "laundry" && slug.length === 1) {
    const img = categoryImages.laundry;
    return (
      <CategoryLanding
        title="Laundry"
        description="Front-load and top-load pairs, laundry centers, combos, and commercial-grade laundry."
        heroImage={img.hero}
        heroHref="/laundry"
        heroCta="Shop All Laundry"
        cards={[
          { label: "Front Load", href: "/laundry/laundry-pairs/front-load", image: img.frontLoad },
          { label: "Top Load", href: "/laundry/laundry-pairs/top-load", image: img.topLoad },
          { label: "Laundry Centers", href: "/laundry/laundry-centers", image: img.laundryCenters },
          { label: "Washer Dryer Combo", href: "/laundry/washer-dryer-combos", image: img.washerDryerCombo },
          { label: "Commercial Laundry", href: "/laundry/commercial", image: img.commercialLaundry },
        ]}
      />
    );
  }

  if (categorySlug === "dishwashers" && slug.length === 1) {
    const img = categoryImages.dishwashers;
    return (
      <CategoryLanding
        title="Dishwashers"
        description="Top-control, front-control, panel-ready, and drawer dishwashers built for quiet, reliable cleaning."
        heroImage={img.hero}
        heroHref="/dishwashers"
        heroCta="Shop All Dishwashers"
        cards={[
          { label: "Top-Control", href: "/dishwashers/top-control", image: img.topControl },
          { label: "Front-Control", href: "/dishwashers/front-control", image: img.frontControl },
          { label: "Panel-Ready", href: "/dishwashers/panel-ready", image: img.panelReady },
          { label: "Drawer", href: "/dishwashers/drawer", image: img.drawer },
          { label: "Portable", href: "/dishwashers/portable", image: img.portable },
        ]}
      />
    );
  }

  return null;
}

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;
  const match = matchCatalogSlug(slug);

  if (!match) {
    const title = titleFromSlug(slug);
    return <StubPage title={title} />;
  }

  const { category, subcategoryLabel, products, matchedSubcategory, suggestion } = match;
  const leafLabel = slug.length > 1 ? titleFromSlugSegment(slug[slug.length - 1]) : undefined;
  const heading = subcategoryLabel ?? leafLabel ?? category.name;
  const landing = getCategoryLanding(category.slug, slug);

  // Breadcrumb trail from URL segments when browsing a deep path
  const crumbs = slug.slice(1, -1).map((segment, i) => ({
    label: titleFromSlugSegment(segment),
    href: `/${[category.slug, ...slug.slice(1, i + 2)].join("/")}`,
  }));

  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <Link href={`/${category.slug}`} className="hover:text-accent">
          {category.name}
        </Link>
        {crumbs.map((crumb) => (
          <span key={crumb.href}>
            <span className="mx-1">/</span>
            <Link href={crumb.href} className="hover:text-accent">
              {crumb.label}
            </Link>
          </span>
        ))}
        {slug.length > 1 && (
          <>
            <span className="mx-1">/</span>
            <span className="text-navy">{heading}</span>
          </>
        )}
      </nav>

      {landing ?? (
        <>
          <h1 className="text-2xl font-bold text-navy md:text-3xl">{heading}</h1>
          <p className="mt-2 max-w-2xl text-sm text-muted">{category.description}</p>
        </>
      )}

      <CatalogListing
        products={products}
        categorySlug={category.slug}
        suggestion={suggestion}
        note={
          // Only surface a soft note when we literally could not resolve the path facet.
          // Matched empty facets use the suggestion box instead of dumping unrelated SKUs.
          slug.length > 1 && !matchedSubcategory
            ? `Showing all ${category.name} models online — no exact web listings for "${heading}" yet. Call us to check availability for this specific type.`
            : undefined
        }
      />
    </PageContainer>
  );
}
