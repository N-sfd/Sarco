"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { CheckCircle2 } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/stores/cart";

const DELIVERY_FEE = 79;
const TAX_RATE = 0.06;

export default function CheckoutPage() {
  const items = useCart((s) => s.items);
  const clear = useCart((s) => s.clear);
  const [placed, setPlaced] = useState(false);
  const [orderNumber, setOrderNumber] = useState("");

  const subtotal = items.reduce((sum, i) => sum + (i.salePrice ?? i.price) * i.quantity, 0);
  const delivery = items.length > 0 ? DELIVERY_FEE : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + delivery + tax;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setOrderNumber(`SP-${Math.floor(100000 + Math.random() * 900000)}`);
    setPlaced(true);
    clear();
  };

  if (placed) {
    return (
      <PageContainer className="py-16">
        <div className="mx-auto max-w-lg border border-border bg-surface p-8 text-center">
          <CheckCircle2 className="mx-auto h-12 w-12 text-success" />
          <h1 className="mt-4 text-2xl font-bold text-navy">Order Confirmed</h1>
          <p className="mt-2 text-sm text-muted">
            Order <span className="font-semibold text-navy">{orderNumber}</span> has been placed.
            A confirmation email with delivery scheduling details is on its way.
          </p>
          <Link href="/" className="btn btn-primary mt-6">
            Back to Home
          </Link>
        </div>
      </PageContainer>
    );
  }

  if (items.length === 0) {
    return (
      <PageContainer className="py-8">
        <h1 className="text-2xl font-bold text-navy">Checkout</h1>
        <div className="mt-6 border border-border bg-surface p-6">
          <p className="text-sm text-muted">Your cart is empty.</p>
          <Link href="/" className="btn btn-primary mt-4">
            Continue Shopping
          </Link>
        </div>
      </PageContainer>
    );
  }

  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/cart" className="hover:text-accent">
          Cart
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Checkout</span>
      </nav>
      <h1 className="text-2xl font-bold text-navy">Checkout</h1>

      <div className="mt-6 grid gap-8 lg:grid-cols-[1fr_340px]">
        <form onSubmit={handleSubmit} className="space-y-6">
          <fieldset className="border border-border p-4">
            <legend className="px-1 text-sm font-bold text-navy">Contact Information</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input required placeholder="First name" className="input-retail" />
              <input required placeholder="Last name" className="input-retail" />
              <input required type="email" placeholder="Email address" className="input-retail sm:col-span-2" />
              <input required type="tel" placeholder="Phone number" className="input-retail sm:col-span-2" />
            </div>
          </fieldset>

          <fieldset className="border border-border p-4">
            <legend className="px-1 text-sm font-bold text-navy">Delivery Address</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input required placeholder="Street address" className="input-retail sm:col-span-2" />
              <input required placeholder="City" className="input-retail" />
              <input required placeholder="State" className="input-retail" />
              <input required placeholder="ZIP code" inputMode="numeric" className="input-retail" />
            </div>
          </fieldset>

          <fieldset className="border border-border p-4">
            <legend className="px-1 text-sm font-bold text-navy">Payment</legend>
            <div className="mt-3 grid gap-3 sm:grid-cols-2">
              <input required placeholder="Card number" inputMode="numeric" className="input-retail sm:col-span-2" />
              <input required placeholder="MM / YY" className="input-retail" />
              <input required placeholder="CVC" inputMode="numeric" className="input-retail" />
            </div>
          </fieldset>

          <button type="submit" className="btn btn-accent w-full">
            Place Order — {formatCurrency(total)}
          </button>
        </form>

        <aside className="h-fit border border-border bg-surface p-4">
          <h2 className="text-sm font-bold text-navy">Order Summary</h2>
          <ul className="mt-3 space-y-3">
            {items.map((item) => (
              <li key={item.productId} className="flex gap-3">
                <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-border bg-white">
                  <Image src={item.image} alt="" fill className="object-cover" sizes="56px" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="line-clamp-2 text-xs font-semibold text-navy">{item.title}</p>
                  <p className="text-xs text-muted">Qty {item.quantity}</p>
                </div>
                <p className="shrink-0 text-xs font-bold text-navy">
                  {formatCurrency((item.salePrice ?? item.price) * item.quantity)}
                </p>
              </li>
            ))}
          </ul>
          <div className="mt-4 space-y-1.5 border-t border-border pt-3 text-sm">
            <div className="flex justify-between text-muted">
              <span>Subtotal</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Delivery</span>
              <span>{formatCurrency(delivery)}</span>
            </div>
            <div className="flex justify-between text-muted">
              <span>Estimated tax</span>
              <span>{formatCurrency(tax)}</span>
            </div>
            <div className="flex justify-between border-t border-border pt-1.5 text-base font-bold text-navy">
              <span>Total</span>
              <span>{formatCurrency(total)}</span>
            </div>
          </div>
        </aside>
      </div>
    </PageContainer>
  );
}
