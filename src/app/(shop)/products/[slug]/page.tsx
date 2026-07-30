import Link from "next/link";
import { notFound } from "next/navigation";
import { products, type Product } from "@/data/products";
import { ProductCard } from "@/components/catalog/product-card";
import { PageContainer } from "@/components/layout/page-container";
import { JsonLd } from "@/components/ui/json-ld";
import { breadcrumbSchema, productSchema } from "@/lib/structured-data";
import { ProductPurchasePanel } from "./product-purchase-panel";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return products.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  return { title: product?.title ?? "Product" };
}

type SpecRow = { label: string; value: string };

function buildSpecs(product: Product): SpecRow[] {
  const rows: SpecRow[] = [
    { label: "Brand", value: product.brand },
    { label: "Model Number", value: product.model },
    { label: "SKU", value: product.sku },
    { label: "Category", value: product.subcategory },
  ];
  if (product.finish) rows.push({ label: "Finish / Color", value: product.finish });
  if (product.fuelType) rows.push({ label: "Fuel Type", value: product.fuelType });
  if (product.widthInches) rows.push({ label: "Width", value: `${product.widthInches}"` });
  if (product.capacityCuFt) rows.push({ label: "Capacity", value: `${product.capacityCuFt} cu. ft.` });
  if (product.loadType) rows.push({ label: "Load Type", value: product.loadType });
  if (product.noiseDba) rows.push({ label: "Noise Level", value: `${product.noiseDba} dBA` });
  if (product.controlType) rows.push({ label: "Control Type", value: product.controlType });
  if (product.dishwasherType) rows.push({ label: "Dishwasher Type", value: product.dishwasherType });
  if (product.cycleCount) rows.push({ label: "Wash Cycles", value: String(product.cycleCount) });
  rows.push({ label: "ENERGY STAR® Certified", value: product.energyStar ? "Yes" : "No" });
  return rows;
}

export default async function ProductPage({ params }: Props) {
  const { slug } = await params;
  const product = products.find((p) => p.slug === slug);
  if (!product) notFound();

  const categoryHref = `/${product.category.toLowerCase().replace(/\s+/g, "-")}`;
  const specs = buildSpecs(product);
  const related = products
    .filter((p) => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <PageContainer className="py-8">
      <JsonLd data={productSchema(product)} />
      <JsonLd
        data={breadcrumbSchema([
          { name: "Home", href: "/" },
          { name: product.category, href: categoryHref },
          { name: product.title, href: `/products/${product.slug}` },
        ])}
      />
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">Home</Link>
        <span className="mx-1">/</span>
        <Link href={categoryHref} className="hover:text-accent">
          {product.category}
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">{product.title}</span>
      </nav>

      <ProductPurchasePanel product={product} />

      <div className="mt-14 grid gap-10 lg:grid-cols-[1fr_1.4fr]">
        {product.features && product.features.length > 0 && (
          <section>
            <h2 className="text-lg font-bold text-navy">Key Features</h2>
            <ul className="mt-4 space-y-2.5 text-sm text-navy">
              {product.features.map((feature) => (
                <li key={feature} className="flex gap-2.5">
                  <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-accent" aria-hidden />
                  {feature}
                </li>
              ))}
            </ul>
          </section>
        )}

        <section>
          <h2 className="text-lg font-bold text-navy">Specifications</h2>
          <dl className="mt-4 divide-y divide-border border-y border-border text-sm">
            {specs.map((row) => (
              <div key={row.label} className="flex justify-between gap-4 py-2.5">
                <dt className="text-muted">{row.label}</dt>
                <dd className="text-right font-semibold text-navy">{row.value}</dd>
              </div>
            ))}
          </dl>
        </section>
      </div>

      {related.length > 0 && (
        <section className="mt-14 border-t border-border pt-10">
          <h2 className="text-lg font-bold text-navy">You May Also Like</h2>
          <div className="mt-6 grid grid-cols-2 gap-3 lg:grid-cols-4">
            {related.map((p, i) => (
              <ProductCard key={p.id} product={p} index={i} />
            ))}
          </div>
        </section>
      )}
    </PageContainer>
  );
}
