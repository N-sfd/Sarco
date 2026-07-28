import type { Metadata } from "next";
import Link from "next/link";
import { StubPage } from "@/components/layout/stub-page";
import { PageContainer } from "@/components/layout/page-container";
import { CatalogListing } from "@/components/catalog/catalog-listing";
import { matchCatalogSlug, titleFromSlugSegment } from "@/lib/catalog";

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

export default async function CatchAllPage({ params }: Props) {
  const { slug } = await params;
  const match = matchCatalogSlug(slug);

  if (!match) {
    const title = titleFromSlug(slug);
    return <StubPage title={title} />;
  }

  const { category, subcategoryLabel, products, matchedSubcategory } = match;
  const leafLabel = slug.length > 1 ? titleFromSlugSegment(slug[slug.length - 1]) : undefined;
  const heading = subcategoryLabel ?? leafLabel ?? category.name;
  const showFallbackNote = slug.length > 1 && !matchedSubcategory;

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
        {slug.length > 1 && (
          <>
            <span className="mx-1">/</span>
            <span className="text-navy">{heading}</span>
          </>
        )}
      </nav>
      <h1 className="text-2xl font-bold text-navy md:text-3xl">{heading}</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">{category.description}</p>

      <CatalogListing
        products={products}
        categorySlug={category.slug}
        note={
          showFallbackNote
            ? `Showing all ${category.name} models online — no exact web listings for "${heading}" yet. Call or visit a store to check in-store availability for this specific type.`
            : undefined
        }
      />
    </PageContainer>
  );
}
