"use client";

import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { products } from "@/data/products";
import { useCompare } from "@/stores/wishlist";

export function CompareBar() {
  const productIds = useCompare((s) => s.productIds);
  const toggle = useCompare((s) => s.toggle);
  const clear = useCompare((s) => s.clear);
  const items = products.filter((p) => productIds.includes(p.id));

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-0 bottom-16 z-[70] border-t border-border bg-white shadow-[0_-4px_16px_rgba(0,0,0,.08)] lg:bottom-0"
        >
          <div className="mx-auto flex max-w-[1440px] flex-wrap items-center gap-3 px-4 py-3 sm:px-8">
            <div className="flex flex-1 flex-wrap items-center gap-2">
              {items.map((p) => (
                <div
                  key={p.id}
                  className="relative h-12 w-12 shrink-0 overflow-hidden border border-border bg-surface"
                >
                  <Image src={p.image} alt={p.title} fill sizes="48px" className="object-contain p-1" />
                  <button
                    type="button"
                    aria-label={`Remove ${p.title} from compare`}
                    onClick={() => toggle(p.id)}
                    className="absolute -right-1 -top-1 grid h-4 w-4 place-items-center rounded-full bg-navy text-white"
                  >
                    <X className="h-2.5 w-2.5" />
                  </button>
                </div>
              ))}
              <span className="text-xs text-muted">{items.length} of 4 selected</span>
            </div>
            <div className="flex shrink-0 items-center gap-3">
              <button
                type="button"
                className="text-xs font-semibold text-muted hover:text-accent hover:underline"
                onClick={clear}
              >
                Clear
              </button>
              <Link href="/compare" className="btn btn-primary btn-sm">
                Compare ({items.length})
              </Link>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
