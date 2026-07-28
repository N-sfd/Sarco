"use client";

import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import {
  Heart,
  BarChart3,
  Eye,
  ShoppingCart,
  Star,
  Leaf,
  ShieldCheck,
  Zap,
  X,
  ArrowRight,
  BadgeCheck,
} from "lucide-react";
import { products, type Product } from "@/lib/data";
import { formatCurrency, EASE } from "@/lib/utils";
import { useUI } from "@/lib/ui-store";
import { SectionHeading } from "@/components/ui/section-heading";
import { ButtonLink } from "@/components/ui/button";

const filters = ["All", "Refrigeration", "Laundry", "Cooking", "Dishwashers"];

export function Sales() {
  const [active, setActive] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const { openQuote } = useUI();

  const filtered =
    active === "All"
      ? products
      : products.filter((p) => p.category.toLowerCase().includes(active.toLowerCase()));

  const openProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  const requestQuote = (product: Product) => {
    setSelectedProduct(null);
    openQuote({ type: "product", id: product.id, name: product.name });
  };

  return (
    <section id="sales" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-12 lg:py-24">
      <div className="flex flex-col items-start justify-between gap-6 lg:flex-row lg:items-end">
        <SectionHeading
          align="left"
          eyebrow="Featured Products"
          title="In-stock appliances with everyday value"
          description="Shop the latest energy-efficient models with financing, warranties, free expert installation, and our Price Match Guarantee."
        />
        <div className="flex shrink-0 flex-col items-start gap-3 sm:flex-row sm:items-center">
          <span className="inline-flex items-center gap-2 rounded-full border border-royal/20 bg-royal/5 px-4 py-2 text-sm font-semibold text-royal">
            <BadgeCheck className="h-4 w-4" /> Price Match Guarantee
          </span>
          <ButtonLink href="#sales" variant="outline">
            View all products
          </ButtonLink>
        </div>
      </div>

      <div className="mt-8 flex flex-wrap gap-2">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setActive(f)}
            className={`rounded-full px-4 py-2 text-sm font-semibold transition-all ${
              active === f
                ? "bg-navy text-white shadow-card"
                : "border border-navy/12 bg-white text-navy/70 hover:border-royal hover:text-royal"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.map((product, i) => (
          <ProductCard key={product.id} product={product} index={i} onQuickView={openProduct} onRequestQuote={requestQuote} />
        ))}
      </div>

      <AnimatePresence>
        {selectedProduct && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] flex items-center justify-center bg-navy/70 px-4 py-6 backdrop-blur-sm"
            onClick={() => setSelectedProduct(null)}
          >
            <motion.div
              initial={{ y: 24, opacity: 0, scale: 0.98 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              exit={{ y: 16, opacity: 0, scale: 0.98 }}
              transition={{ duration: 0.25, ease: EASE }}
              onClick={(e) => e.stopPropagation()}
              className="relative w-full max-w-2xl overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-lift"
            >
              <button
                onClick={() => setSelectedProduct(null)}
                className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-mist text-navy transition hover:bg-royal/8"
                aria-label="Close preview"
              >
                <X className="h-5 w-5" />
              </button>

              <div className="grid gap-0 md:grid-cols-[0.9fr_1.1fr]">
                <div className="relative min-h-[280px]">
                  <Image
                    src={selectedProduct.image}
                    alt={selectedProduct.name}
                    fill
                    sizes="(max-width: 768px) 100vw, 40vw"
                    className="object-cover"
                  />
                </div>

                <div className="p-6 sm:p-8">
                  <p className="text-xs font-semibold uppercase tracking-[0.24em] text-royal">Product preview</p>
                  <h3 className="mt-2 font-display text-2xl font-bold text-navy">{selectedProduct.name}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-ink/65">
                    {selectedProduct.brand} • {selectedProduct.category}
                  </p>

                  <div className="mt-5 flex items-end gap-3">
                    <span className="text-3xl font-bold text-navy">{formatCurrency(selectedProduct.price)}</span>
                    {selectedProduct.compareAt && (
                      <span className="mb-1 text-base text-ink/40 line-through">{formatCurrency(selectedProduct.compareAt)}</span>
                    )}
                  </div>

                  <p className="mt-3 text-sm leading-relaxed text-ink/65">
                    Includes free installation, financing options from {formatCurrency(selectedProduct.financing)}/mo, and a {selectedProduct.warranty}.
                  </p>

                  <div className="mt-6 flex flex-wrap gap-3">
                    <button
                      onClick={() => requestQuote(selectedProduct)}
                      className="inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-accent-600"
                    >
                      Request a quote <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setSelectedProduct(null)}
                      className="rounded-full border border-navy/15 px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-royal hover:text-royal"
                    >
                      Continue shopping
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function ProductCard({
  product,
  index,
  onQuickView,
  onRequestQuote,
}: {
  product: Product;
  index: number;
  onQuickView: (product: Product) => void;
  onRequestQuote: (product: Product) => void;
}) {
  const [wish, setWish] = useState(false);
  const [compare, setCompare] = useState(false);
  const discount = product.compareAt
    ? Math.round(((product.compareAt - product.price) / product.compareAt) * 100)
    : 0;

  return (
    <motion.article
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.1 }}
      transition={{ duration: 0.5, delay: (index % 4) * 0.08, ease: EASE }}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-navy/8 bg-white shadow-soft transition-all duration-500 hover:-translate-y-1.5 hover:shadow-lift"
    >
      {/* Media */}
      <div className="relative aspect-square overflow-hidden bg-mist">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
          className="object-cover transition-transform duration-700 group-hover:scale-110"
        />

        {/* badges */}
        <div className="absolute left-3 top-3 z-10 flex flex-col gap-1.5">
          {product.badge && (
            <span className="rounded-full bg-accent px-2.5 py-1 text-[0.65rem] font-bold uppercase tracking-wide text-white shadow-sm">
              {product.badge}
            </span>
          )}
          {discount > 0 && (
            <span className="rounded-full bg-success px-2.5 py-1 text-[0.65rem] font-bold text-white shadow-sm">
              -{discount}%
            </span>
          )}
        </div>

        {/* quick actions */}
        <div className="absolute right-3 top-3 z-10 flex flex-col gap-2 opacity-0 transition-all duration-300 group-hover:opacity-100">
          <IconToggle active={wish} onClick={() => setWish((v) => !v)} label="Wishlist">
            <Heart className={`h-4 w-4 ${wish ? "fill-accent text-accent" : ""}`} />
          </IconToggle>
          <IconToggle active={compare} onClick={() => setCompare((v) => !v)} label="Compare">
            <BarChart3 className={`h-4 w-4 ${compare ? "text-royal" : ""}`} />
          </IconToggle>
          <IconToggle label="Quick view" onClick={() => onQuickView(product)}>
            <Eye className="h-4 w-4" />
          </IconToggle>
        </div>

        {product.energyStar && (
          <span className="absolute bottom-3 left-3 z-10 flex items-center gap-1 rounded-full bg-white/90 px-2.5 py-1 text-[0.65rem] font-semibold text-success shadow-sm">
            <Leaf className="h-3 w-3" /> Energy Star
          </span>
        )}
      </div>

      {/* Body */}
      <div className="flex flex-1 flex-col p-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-semibold uppercase tracking-wider text-royal">{product.brand}</span>
          <span className="flex items-center gap-1 text-xs font-medium text-ink/60">
            <Star className="h-3.5 w-3.5 fill-gold text-gold" />
            {product.rating} <span className="text-ink/40">({product.reviews})</span>
          </span>
        </div>

        <h3 className="mt-2 line-clamp-2 font-display text-sm font-bold leading-snug text-navy">
          {product.name}
        </h3>

        <div className="mt-3 flex items-end gap-2">
          <span className="text-xl font-bold text-navy">{formatCurrency(product.price)}</span>
          {product.compareAt && (
            <span className="mb-0.5 text-sm text-ink/40 line-through">{formatCurrency(product.compareAt)}</span>
          )}
        </div>
        <p className="mt-1 text-xs text-ink/55">
          or <span className="font-semibold text-royal">{formatCurrency(product.financing)}/mo</span> with financing
        </p>

        <div className="mt-3 flex flex-wrap gap-1.5">
          <Tag icon={ShieldCheck}>{product.warranty}</Tag>
          <Tag icon={Zap}>Free Install</Tag>
        </div>

        <div className="mt-auto flex gap-2 pt-4">
          <button
            onClick={() => onQuickView(product)}
            className="flex flex-1 items-center justify-center gap-1.5 rounded-full bg-navy px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-navy-600"
          >
            <ShoppingCart className="h-4 w-4" /> Preview
          </button>
          <button
            onClick={() => onRequestQuote(product)}
            className="flex-1 rounded-full bg-accent px-3 py-2.5 text-xs font-semibold text-white transition hover:bg-accent-600"
          >
            Request Quote
          </button>
        </div>
      </div>
    </motion.article>
  );
}

function IconToggle({
  children,
  onClick,
  active,
  label,
}: {
  children: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  label: string;
}) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      aria-pressed={active}
      className={`grid h-9 w-9 place-items-center rounded-full bg-white text-navy shadow-card transition hover:scale-110 ${
        active ? "ring-2 ring-royal/40" : ""
      }`}
    >
      {children}
    </button>
  );
}

function Tag({ children, icon: Icon }: { children: React.ReactNode; icon: typeof Star }) {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-mist px-2 py-1 text-[0.65rem] font-medium text-ink/60">
      <Icon className="h-3 w-3 text-royal" /> {children}
    </span>
  );
}
