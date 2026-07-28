"use client";

import Image from "next/image";
import Link from "next/link";
import { X } from "lucide-react";
import { products, availabilityLabel } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { PageContainer } from "@/components/layout/page-container";
import { useCart } from "@/stores/cart";
import { useCompare } from "@/stores/wishlist";

const rows: { label: string; render: (p: (typeof products)[number]) => React.ReactNode }[] = [
  { label: "Brand", render: (p) => p.brand },
  { label: "Model", render: (p) => p.model },
  { label: "SKU", render: (p) => p.sku },
  {
    label: "Price",
    render: (p) => (
      <span className="font-bold text-navy">{formatCurrency(p.salePrice ?? p.price)}</span>
    ),
  },
  { label: "Rating", render: (p) => `${p.rating} ★ (${p.reviewCount} reviews)` },
  { label: "Availability", render: (p) => availabilityLabel(p.availability) },
  { label: "Finish", render: (p) => p.finish ?? "—" },
  { label: "Energy Star", render: (p) => (p.energyStar ? "Yes" : "No") },
];

export default function ComparePage() {
  const productIds = useCompare((s) => s.productIds);
  const toggle = useCompare((s) => s.toggle);
  const clear = useCompare((s) => s.clear);
  const addItem = useCart((s) => s.addItem);
  const items = products.filter((p) => productIds.includes(p.id));

  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Compare</span>
      </nav>

      <div className="flex flex-wrap items-center justify-between gap-3">
        <h1 className="text-2xl font-bold text-navy">Compare Products</h1>
        {items.length > 0 && (
          <button type="button" className="text-xs font-semibold text-accent hover:underline" onClick={clear}>
            Clear all
          </button>
        )}
      </div>

      {items.length === 0 ? (
        <div className="mt-6 border border-border bg-surface p-6">
          <p className="text-sm text-muted">
            You haven&apos;t added any products to compare yet. Check the &ldquo;Compare&rdquo; box on a
            product card to add up to 4 items here.
          </p>
          <Link href="/in-stock" className="btn btn-primary mt-4">
            Shop In Stock
          </Link>
        </div>
      ) : (
        <div className="mt-6 overflow-x-auto">
          <table className="w-full min-w-[640px] border-collapse text-left text-sm">
            <thead>
              <tr>
                <th className="w-40 border-b border-border pb-4 align-bottom" />
                {items.map((p) => (
                  <th key={p.id} className="min-w-[200px] border-b border-border px-3 pb-4 align-bottom">
                    <div className="relative mb-3 flex justify-end">
                      <button
                        type="button"
                        aria-label={`Remove ${p.title} from compare`}
                        onClick={() => toggle(p.id)}
                        className="grid h-8 w-8 place-items-center border border-border bg-white hover:bg-surface"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                    <div className="relative h-[140px] overflow-hidden border border-border bg-white">
                      <Image
                        src={p.image}
                        alt={p.title}
                        fill
                        sizes="200px"
                        className="object-contain p-2"
                      />
                    </div>
                    <Link
                      href={`/products/${p.slug}`}
                      className="mt-3 block text-sm font-semibold text-navy hover:text-accent"
                    >
                      {p.title}
                    </Link>
                    <button
                      type="button"
                      className="btn btn-primary btn-sm mt-3 w-full"
                      onClick={() =>
                        addItem({
                          productId: p.id,
                          slug: p.slug,
                          title: p.title,
                          brand: p.brand,
                          image: p.image,
                          price: p.price,
                          salePrice: p.salePrice,
                        })
                      }
                    >
                      Add to Cart
                    </button>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row) => (
                <tr key={row.label}>
                  <th className="border-b border-border py-3 pr-3 text-xs font-bold uppercase tracking-wide text-muted">
                    {row.label}
                  </th>
                  {items.map((p) => (
                    <td key={p.id} className="border-b border-border px-3 py-3 text-navy">
                      {row.render(p)}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </PageContainer>
  );
}
