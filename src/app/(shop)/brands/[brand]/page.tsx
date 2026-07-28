import Link from "next/link";
import { notFound } from "next/navigation";
import { PageContainer } from "@/components/layout/page-container";
import { CatalogListing } from "@/components/catalog/catalog-listing";
import { brandSlugs, findBrandBySlug } from "@/lib/catalog";
import { products } from "@/data/products";

type Props = { params: Promise<{ brand: string }> };

export async function generateStaticParams() {
  return brandSlugs.map((b) => ({ brand: b.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { brand } = await params;
  const name = findBrandBySlug(brand);
  return { title: name ? `${name} Appliances` : "Brand" };
}

export default async function BrandPage({ params }: Props) {
  const { brand } = await params;
  const name = findBrandBySlug(brand);
  if (!name) notFound();

  const brandProducts = products.filter((p) => p.brand === name);

  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <Link href="/brands" className="hover:text-accent">
          Brands
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">{name}</span>
      </nav>
      <h1 className="text-2xl font-bold text-navy md:text-3xl">{name} Appliances</h1>
      <p className="mt-2 max-w-2xl text-sm text-muted">
        Factory authorized {name} sales, delivery, installation, and repair.
      </p>

      <CatalogListing products={brandProducts} categorySlug="" note={undefined} />
    </PageContainer>
  );
}
