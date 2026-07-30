"use client";

import Link from "next/link";
import { products, type Product } from "@/data/products";
import { businessConfig } from "@/config/business";
import { useUiStore } from "@/stores/wishlist";
import { cn } from "@/lib/utils";
import type { AssistantMessage as AssistantMessageType } from "./types";
import { AssistantProductCard } from "./AssistantProductCard";

type AssistantMessageProps = {
  message: AssistantMessageType;
  failed: boolean;
  onRetry: (id: string) => void;
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
}

export function AssistantMessage({ message, failed, onRetry }: AssistantMessageProps) {
  const setServiceModalOpen = useUiStore((s) => s.setServiceModalOpen);
  const isUser = message.role === "user";

  return (
    <div className={cn("flex flex-col", isUser ? "items-end" : "items-start")}>
      <div
        className={cn(
          "max-w-[85%] whitespace-pre-line rounded-2xl px-4 py-2.5 text-sm leading-relaxed",
          isUser ? "bg-navy text-white" : "bg-light-blue text-navy",
        )}
      >
        {message.content}
      </div>
      <span className="mt-1 px-1 text-[11px] text-muted">{formatTime(message.createdAt)}</span>

      {failed && (
        <div className="mt-1 flex items-center gap-2 px-1 text-[11px]">
          <span className="text-red-600">Failed to send</span>
          <button type="button" onClick={() => onRetry(message.id)} className="font-semibold text-accent hover:underline">
            Retry
          </button>
        </div>
      )}

      {message.metadata?.action === "product-results" && (
        <div className="mt-3 flex w-full flex-col gap-2">
          {(message.metadata.productIds ?? [])
            .map((id) => products.find((p) => p.id === id))
            .filter((p): p is Product => Boolean(p))
            .slice(0, 3)
            .map((p) => (
              <AssistantProductCard key={p.id} product={p} />
            ))}
          {message.metadata.route && (
            <Link
              href={message.metadata.route}
              className="inline-flex min-h-11 items-center justify-center border border-navy px-3 text-[13px] font-semibold text-navy hover:bg-surface"
            >
              View More Results
            </Link>
          )}
        </div>
      )}

      {message.metadata?.action === "escalation" && (
        <div className="mt-3 flex w-full flex-col gap-2">
          <a
            href={businessConfig.primaryContact.phoneHref}
            className="inline-flex min-h-11 items-center justify-center border border-navy px-3 text-[13px] font-semibold text-navy hover:bg-surface"
          >
            Call {businessConfig.primaryContact.phoneDisplay}
          </a>
          <a
            href={businessConfig.primaryContact.emailHref}
            className="inline-flex min-h-11 items-center justify-center border border-navy px-3 text-[13px] font-semibold text-navy hover:bg-surface"
          >
            Email {businessConfig.primaryContact.email}
          </a>
          <Link
            href="/repair/schedule"
            className="inline-flex min-h-11 items-center justify-center bg-icon-blue px-3 text-[13px] font-semibold text-white"
          >
            Schedule Repair
          </Link>
          <button
            type="button"
            onClick={() => setServiceModalOpen(true)}
            className="inline-flex min-h-11 items-center justify-center border border-border px-3 text-[13px] font-semibold text-navy hover:border-navy"
          >
            Check Service Availability
          </button>
        </div>
      )}
    </div>
  );
}
