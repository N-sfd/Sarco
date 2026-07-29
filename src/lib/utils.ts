import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

/** Shared "out expo" easing curve, typed as a cubic-bezier tuple for framer-motion. */
export const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

/** 0% promotional financing estimate — same formula used by the financing calculator. */
export function estimateMonthlyPayment(amount: number, months: number) {
  return amount / months;
}

/** Simple deterministic string hash — same input always yields the same mock status. */
function hashString(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash;
}

export const DELIVERY_STAGES = [
  "Order Confirmed",
  "Preparing Order",
  "Delivery Scheduled",
  "Out for Delivery",
  "Delivered",
] as const;

export type DeliveryStatus = {
  stageIndex: number;
  stage: (typeof DELIVERY_STAGES)[number];
  eta: Date;
};

/** Deterministic mock delivery status keyed off the order id — no backend involved. */
export function getMockDeliveryStatus(orderId: string): DeliveryStatus {
  const stageIndex = hashString(orderId.trim().toUpperCase() || "ORDER") % DELIVERY_STAGES.length;
  const eta = new Date();
  eta.setDate(eta.getDate() + (DELIVERY_STAGES.length - 1 - stageIndex));
  return { stageIndex, stage: DELIVERY_STAGES[stageIndex], eta };
}

/** Generates a human-friendly reference code, e.g. "Q-4F8K2C". */
export function generateReference(prefix: string) {
  const chars = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let code = "";
  for (let i = 0; i < 6; i++) {
    code += chars[Math.floor(Math.random() * chars.length)];
  }
  return `${prefix}-${code}`;
}
