"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { X } from "lucide-react";
import { products } from "@/data/products";
import { useCompare } from "@/stores/wishlist";

function quickSpecLine(p: (typeof products)[number]) {
  const bits: string[] = [];
  if (p.noiseDba != null) bits.push(`${p.noiseDba} dBA`);
  if (p.capacityCuFt != null) bits.push(`${p.capacityCuFt} cu. ft.`);
  if (p.cycleCount != null) bits.push(`${p.cycleCount} cycles`);
  if (p.controlType) bits.push(p.controlType);
  if (p.features?.includes("3rd Rack")) bits.push("3rd Rack");
  if (bits.length === 0 && p.quickSpecs?.[0]) bits.push(p.quickSpecs[0]);
  return bits.slice(0, 3).join(" · ") || p.subcategory;
}

export function CompareBar() {
  const pathname = usePathname();
  const productIds = useCompare((s) => s.productIds);
  const toggle = useCompare((s) => s.toggle);
  const clear = useCompare((s) => s.clear);
  const items = products.filter((p) => productIds.includes(p.id));

  // Redundant (and visually overlaps the table) on the compare page itself,
  // where the user is already looking at the full side-by-side specs.
  if (pathname === "/compare") return null;

  return (
    <AnimatePresence>
      {items.length > 0 && (
        <motion.div
          initial={{ y: 80, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 80, opacity: 0 }}
          transition={{ duration: 0.25 }}
          className="fixed inset-x-0 bottom-16 z-[70] border-t-2 border-navy/15 bg-white shadow-[0_-8px_28px_rgba(15,23,42,.14)] lg:bottom-0"
          role="region"
          aria-label="Compare products"
        >
          <div className="mx-auto flex max-w-[1440px] flex-col gap-3 px-4 py-3 sm:px-8">
            <div className="flex flex-wrap items-center justify-between gap-2">
              <div>
                <p className="text-sm font-bold text-navy">
                  Compare ({items.length} of 4)
                </p>
                <p className="text-[11px] text-muted">
                  Side-by-side noise, capacity, cycles, and features
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  className="text-xs font-semibold text-muted hover:text-accent hover:underline"
                  onClick={clear}
                >
                  Clear
                </button>
                <Link href="/compare" className="btn btn-primary btn-sm">
                  View Side-by-Side Specs
                </Link>
              </div>
            </div>

            <div className="grid gap-2 sm:grid-cols-2 lg:grid-cols-4">
              {items.map((p) => (
                <div
                  key={p.id}
                  className="flex items-center gap-3 border border-border bg-surface/60 p-2"
                >
                  <div className="relative h-14 w-14 shrink-0 overflow-hidden border border-border bg-white">
                    <Image src={p.image} alt="" fill sizes="56px" className="object-contain p-1" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[12px] font-bold uppercase text-muted">{p.brand}</p>
                    <p className="truncate text-[13px] font-semibold text-navy">{p.title}</p>
                    <p className="truncate text-[11px] text-muted">{quickSpecLine(p)}</p>
                  </div>
                  <button
                    type="button"
                    aria-label={`Remove ${p.title} from compare`}
                    onClick={() => toggle(p.id)}
                    className="grid h-7 w-7 shrink-0 place-items-center border border-border bg-white hover:bg-white"
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
