"use client";

import Image from "next/image";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/stores/cart";

export default function CartPage() {
  const items = useCart((s) => s.items);
  const updateQty = useCart((s) => s.updateQty);
  const removeItem = useCart((s) => s.removeItem);
  const subtotal = items.reduce((sum, i) => sum + (i.salePrice ?? i.price) * i.quantity, 0);

  return (
    <PageContainer className="py-8">
      <h1 className="text-2xl font-bold text-navy">Shopping Cart</h1>
      {items.length === 0 ? (
        <div className="mt-6 border border-border bg-surface p-6">
          <p className="text-sm text-muted">Your cart is empty.</p>
          <Link href="/" className="btn btn-primary mt-4">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_280px]">
          <ul className="space-y-3">
            {items.map((item) => (
              <li key={item.productId} className="flex gap-3 border border-border p-3">
                <div className="relative h-20 w-20 shrink-0 overflow-hidden border border-border bg-surface">
                  <Image src={item.image} alt="" fill className="object-cover" sizes="80px" />
                </div>
                <div className="min-w-0 flex-1">
                  <Link href={`/products/${item.slug}`} className="text-sm font-semibold text-navy hover:text-accent">
                    {item.title}
                  </Link>
                  <p className="text-xs text-muted">{item.brand}</p>
                  <p className="mt-1 text-sm font-bold text-navy">
                    {formatCurrency(item.salePrice ?? item.price)}
                  </p>
                  <div className="mt-2 flex items-center gap-2">
                    <label className="text-xs text-muted">
                      Qty{" "}
                      <input
                        type="number"
                        min={1}
                        value={item.quantity}
                        onChange={(e) => updateQty(item.productId, Number(e.target.value))}
                        className="input-retail ml-1 w-16 py-1"
                      />
                    </label>
                    <button
                      type="button"
                      className="text-xs font-semibold text-accent hover:underline"
                      onClick={() => removeItem(item.productId)}
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>
          <aside className="h-fit border border-border bg-surface p-4">
            <p className="text-sm text-muted">Subtotal</p>
            <p className="text-2xl font-bold text-navy">{formatCurrency(subtotal)}</p>
            <p className="mt-2 text-xs text-muted">
              Delivery, installation, haul-away, and tax calculated at checkout.
            </p>
            <Link href="/checkout" className="btn btn-accent mt-4 w-full">
              Secure Checkout
            </Link>
            <Link href="/" className="btn btn-outline mt-2 w-full">
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </PageContainer>
  );
}
