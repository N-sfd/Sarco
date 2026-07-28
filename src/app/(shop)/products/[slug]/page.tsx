import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { products, availabilityLabel } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { AddToCartButton } from "@/components/catalog/add-to-cart-button";
import { PageContainer } from "@/components/layout/page-container";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return { title: product?.title ?? "Product" };
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const savings = product.salePrice != null ? product.price - product.salePrice : 0;

  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span className="mx-1">/</span>
        <Link href={`/${product.category.toLowerCase().replace(/\s+/g, "-")}`} className="hover:text-accent">
          {product.category}
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">{product.title}</span>
      </nav>

      <div className="grid gap-8 lg:grid-cols-2">
        <div className="relative aspect-square overflow-hidden border border-border bg-surface">
          <Image src={product.image} alt={product.title} fill className="object-cover" sizes="50vw" priority />
        </div>
        <div>
          <p className="text-xs font-bold uppercase tracking-wide text-muted">{product.brand}</p>
          <h1 className="mt-1 text-2xl font-bold text-navy md:text-3xl">{product.title}</h1>
          <p className="mt-1 text-sm text-muted">Model {product.model} · SKU {product.sku}</p>
          <p className="mt-2 text-sm">
            ★ {product.rating} · {product.reviewCount} reviews
          </p>

          <div className="mt-4">
            {product.salePrice != null ? (
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-accent">{formatCurrency(product.salePrice)}</span>
                <span className="text-lg text-muted line-through">{formatCurrency(product.price)}</span>
                <span className="text-sm font-semibold text-success">Save {formatCurrency(savings)}</span>
              </div>
            ) : (
              <span className="text-3xl font-bold text-navy">{formatCurrency(product.price)}</span>
            )}
            <p className="mt-1 text-sm text-muted">
              or {formatCurrency(product.financingMonthly)}/mo with financing
            </p>
          </div>

          <p className="mt-3 text-sm font-semibold text-success">
            {availabilityLabel(product.availability)}
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <AddToCartButton product={product} />
            <Link href="/financing" className="btn btn-outline">
              View Financing
            </Link>
          </div>

          <ul className="mt-6 space-y-2 border-t border-border pt-4 text-sm text-muted">
            <li>Free local delivery options on qualifying orders</li>
            <li>Professional installation and haul-away available</li>
            <li>Protection plans offered at checkout</li>
            <li>Finish: {product.finish ?? "See specifications"}</li>
          </ul>
        </div>
      </div>
    </PageContainer>
  );
}
