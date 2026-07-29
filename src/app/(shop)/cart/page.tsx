"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Minus, Plus } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { estimateMonthlyPayment, formatCurrency } from "@/lib/utils";
import { useCart, type CartLine } from "@/stores/cart";

const SERVICE_FEES = {
  addInstallation: 129,
  addHaulAway: 49,
  addProtection: 199,
} as const;

const FULFILLMENT_OPTIONS = [
  { value: "delivery", label: "Delivery" },
  { value: "installation", label: "Scheduled Installation" },
  { value: "consultation", label: "Service Consultation" },
] as const;

export default function CartPage() {
  const items = useCart((s) => s.items);
  const savedItems = useCart((s) => s.savedItems);
  const updateQty = useCart((s) => s.updateQty);
  const removeItem = useCart((s) => s.removeItem);
  const toggleService = useCart((s) => s.toggleService);
  const saveForLater = useCart((s) => s.saveForLater);
  const moveToCart = useCart((s) => s.moveToCart);
  const removeSaved = useCart((s) => s.removeSaved);

  const [fulfillment, setFulfillment] = useState<(typeof FULFILLMENT_OPTIONS)[number]["value"]>("delivery");
  const [couponInput, setCouponInput] = useState("");
  const [couponStatus, setCouponStatus] = useState<"idle" | "applied" | "invalid">("idle");
  const [couponDiscount, setCouponDiscount] = useState(0);

  const itemsSubtotal = items.reduce((sum, i) => sum + (i.salePrice ?? i.price) * i.quantity, 0);
  const servicesTotal = items.reduce((sum, i) => {
    let lineServices = 0;
    if (i.addInstallation) lineServices += SERVICE_FEES.addInstallation;
    if (i.addHaulAway) lineServices += SERVICE_FEES.addHaulAway;
    if (i.addProtection) lineServices += SERVICE_FEES.addProtection;
    return sum + lineServices;
  }, 0);
  const subtotal = itemsSubtotal + servicesTotal - couponDiscount;
  const monthlyEstimate = useMemo(() => estimateMonthlyPayment(Math.max(subtotal, 0), 12), [subtotal]);

  const applyCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    const code = couponInput.trim().toUpperCase();
    if (code === "SARCO10") {
      setCouponDiscount(Math.round(itemsSubtotal * 0.1));
      setCouponStatus("applied");
    } else {
      setCouponDiscount(0);
      setCouponStatus("invalid");
    }
  };

  return (
    <PageContainer className="py-8">
      <h1 className="text-2xl font-bold text-navy">Shopping Cart</h1>
      {items.length === 0 && savedItems.length === 0 ? (
        <div className="mt-6 border border-border bg-surface p-6">
          <p className="text-sm text-muted">Your cart is empty.</p>
          <Link href="/" className="btn btn-primary mt-4">
            Continue Shopping
          </Link>
        </div>
      ) : (
        <div className="mt-6 grid gap-6 lg:grid-cols-[1fr_320px]">
          <div className="space-y-8">
            {items.length > 0 ? (
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

                      <div className="mt-2 flex flex-wrap items-center gap-3">
                        <div className="flex items-center border border-border">
                          <button
                            type="button"
                            aria-label={`Decrease quantity for ${item.title}`}
                            className="grid h-8 w-8 place-items-center text-navy hover:bg-surface"
                            onClick={() => updateQty(item.productId, item.quantity - 1)}
                          >
                            <Minus className="h-3.5 w-3.5" />
                          </button>
                          <span className="w-9 text-center text-sm font-semibold text-navy">{item.quantity}</span>
                          <button
                            type="button"
                            aria-label={`Increase quantity for ${item.title}`}
                            className="grid h-8 w-8 place-items-center text-navy hover:bg-surface"
                            onClick={() => updateQty(item.productId, item.quantity + 1)}
                          >
                            <Plus className="h-3.5 w-3.5" />
                          </button>
                        </div>
                        <button
                          type="button"
                          className="text-xs font-semibold text-navy hover:text-accent hover:underline"
                          onClick={() => saveForLater(item.productId)}
                        >
                          Save for later
                        </button>
                        <button
                          type="button"
                          className="text-xs font-semibold text-accent hover:underline"
                          onClick={() => removeItem(item.productId)}
                        >
                          Remove
                        </button>
                      </div>

                      <div className="mt-3 flex flex-wrap gap-x-4 gap-y-1.5 text-xs text-navy">
                        <ServiceCheckbox
                          label={`Installation (+${formatCurrency(SERVICE_FEES.addInstallation)})`}
                          checked={!!item.addInstallation}
                          onChange={() => toggleService(item.productId, "addInstallation")}
                        />
                        <ServiceCheckbox
                          label={`Haul Away (+${formatCurrency(SERVICE_FEES.addHaulAway)})`}
                          checked={!!item.addHaulAway}
                          onChange={() => toggleService(item.productId, "addHaulAway")}
                        />
                        <ServiceCheckbox
                          label={`Protection Plan (+${formatCurrency(SERVICE_FEES.addProtection)})`}
                          checked={!!item.addProtection}
                          onChange={() => toggleService(item.productId, "addProtection")}
                        />
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-sm text-muted">Your cart is empty, but you have items saved for later below.</p>
            )}

            {savedItems.length > 0 && (
              <div>
                <h2 className="text-sm font-bold uppercase tracking-wide text-navy">Saved for Later</h2>
                <ul className="mt-3 space-y-3">
                  {savedItems.map((item: CartLine) => (
                    <li key={item.productId} className="flex gap-3 border border-border p-3">
                      <div className="relative h-16 w-16 shrink-0 overflow-hidden border border-border bg-surface">
                        <Image src={item.image} alt="" fill className="object-cover" sizes="64px" />
                      </div>
                      <div className="min-w-0 flex-1">
                        <Link href={`/products/${item.slug}`} className="text-sm font-semibold text-navy hover:text-accent">
                          {item.title}
                        </Link>
                        <p className="mt-1 text-sm font-bold text-navy">
                          {formatCurrency(item.salePrice ?? item.price)}
                        </p>
                        <div className="mt-2 flex gap-3">
                          <button
                            type="button"
                            className="text-xs font-semibold text-navy hover:text-accent hover:underline"
                            onClick={() => moveToCart(item.productId)}
                          >
                            Move to cart
                          </button>
                          <button
                            type="button"
                            className="text-xs font-semibold text-accent hover:underline"
                            onClick={() => removeSaved(item.productId)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <aside className="h-fit space-y-4 border border-border bg-surface p-4">
            <div>
              <p className="mb-2 text-xs font-bold uppercase tracking-wide text-navy">Fulfillment</p>
              <div className="space-y-1.5">
                {FULFILLMENT_OPTIONS.map((option) => (
                  <label key={option.value} className="flex items-center gap-2 text-sm text-navy">
                    <input
                      type="radio"
                      name="fulfillment"
                      value={option.value}
                      checked={fulfillment === option.value}
                      onChange={() => setFulfillment(option.value)}
                      className="h-4 w-4 accent-navy"
                    />
                    {option.label}
                  </label>
                ))}
              </div>
            </div>

            <form onSubmit={applyCoupon} className="border-t border-border pt-4">
              <label htmlFor="coupon" className="mb-1 block text-xs font-bold uppercase tracking-wide text-navy">
                Coupon code
              </label>
              <div className="flex gap-2">
                <input
                  id="coupon"
                  value={couponInput}
                  onChange={(e) => {
                    setCouponInput(e.target.value);
                    setCouponStatus("idle");
                  }}
                  placeholder="Enter code"
                  className="input-retail"
                />
                <button type="submit" className="btn btn-outline btn-sm shrink-0">
                  Apply
                </button>
              </div>
              {couponStatus === "applied" && (
                <p className="mt-1.5 text-xs font-semibold text-success">Coupon applied — {formatCurrency(couponDiscount)} off.</p>
              )}
              {couponStatus === "invalid" && (
                <p className="mt-1.5 text-xs font-semibold text-accent">That code isn&apos;t valid.</p>
              )}
            </form>

            <div className="border-t border-border pt-4">
              <div className="flex items-center justify-between text-sm text-muted">
                <span>Items</span>
                <span>{formatCurrency(itemsSubtotal)}</span>
              </div>
              {servicesTotal > 0 && (
                <div className="mt-1 flex items-center justify-between text-sm text-muted">
                  <span>Services</span>
                  <span>{formatCurrency(servicesTotal)}</span>
                </div>
              )}
              {couponDiscount > 0 && (
                <div className="mt-1 flex items-center justify-between text-sm text-success">
                  <span>Coupon</span>
                  <span>-{formatCurrency(couponDiscount)}</span>
                </div>
              )}
              <div className="mt-2 flex items-center justify-between border-t border-border pt-2">
                <span className="text-sm font-bold text-navy">Subtotal</span>
                <span className="text-2xl font-bold text-navy">{formatCurrency(Math.max(subtotal, 0))}</span>
              </div>
              <p className="mt-1 text-xs text-muted">
                or as low as {formatCurrency(monthlyEstimate)}/mo with financing
              </p>
              <p className="mt-2 text-xs text-muted">Tax calculated at checkout.</p>
            </div>

            <Link href="/checkout" className="btn btn-accent w-full">
              Secure Checkout
            </Link>
            <Link href="/" className="btn btn-outline w-full">
              Continue Shopping
            </Link>
          </aside>
        </div>
      )}
    </PageContainer>
  );
}

function ServiceCheckbox({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: () => void;
}) {
  return (
    <label className="flex items-center gap-1.5">
      <input type="checkbox" checked={checked} onChange={onChange} className="h-3.5 w-3.5 accent-navy" />
      {label}
    </label>
  );
}
