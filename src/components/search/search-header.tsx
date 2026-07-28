"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, MapPin, Search, ShoppingCart, User } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { PageContainer } from "@/components/layout/page-container";
import { brands, products } from "@/data/products";
import { megaMenus } from "@/data/navigation";
import { popularSearches } from "@/data/homepage";
import { useCart } from "@/stores/cart";
import { useUiStore, useWishlist } from "@/stores/wishlist";
import { cn } from "@/lib/utils";

export function SearchHeader({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const items = useCart((s) => s.items);
  const itemCount = items.reduce((n, i) => n + i.quantity, 0);
  const wishlistCount = useWishlist((s) => s.productIds.length);
  const setStoreModalOpen = useUiStore((s) => s.setStoreModalOpen);
  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen);

  const suggestions = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return null;
    return {
      products: products
        .filter(
          (p) =>
            p.title.toLowerCase().includes(q) ||
            p.brand.toLowerCase().includes(q) ||
            p.model.toLowerCase().includes(q) ||
            p.sku.toLowerCase().includes(q) ||
            p.category.toLowerCase().includes(q),
        )
        .slice(0, 5),
      categories: megaMenus
        .filter((m) => m.label.toLowerCase().includes(q) || (m.navLabel ?? "").toLowerCase().includes(q))
        .slice(0, 4)
        .map((m) => ({ label: m.label, href: m.href })),
      brands: brands.filter((b) => b.toLowerCase().includes(q)).slice(0, 4),
      popular: popularSearches.filter((s) => s.toLowerCase().includes(q)).slice(0, 4),
    };
  }, [query]);

  const submit = (value?: string) => {
    const q = (value ?? query).trim();
    if (!q) return;
    setOpen(false);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  return (
    <div
      className={cn(
        "bg-white transition-[min-height,padding] duration-200",
        compact ? "min-h-[78px]" : "min-h-[86px]",
      )}
    >
      {/* Mobile / tablet */}
      <PageContainer className="flex min-h-[86px] flex-wrap items-center gap-3 py-3 nav:hidden">
        <button
          type="button"
          className="grid h-11 w-11 place-items-center rounded-full text-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F5F7FA]"
          aria-label="Open menu"
          onClick={() => setMobileNavOpen(true)}
        >
          <span className="text-lg leading-none">☰</span>
        </button>
        <div className="hidden sm:block">
          <Logo compact={compact} />
        </div>
        <Link href="/" className="text-[22px] font-bold uppercase tracking-[-0.04em] text-[#10283F] sm:hidden">
          SARCO
        </Link>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex w-full overflow-hidden rounded-[4px] shadow-[0_2px_6px_rgba(0,0,0,.05)]"
        >
          <input
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setOpen(true);
            }}
            onFocus={() => setOpen(true)}
            onBlur={() => setTimeout(() => setOpen(false), 150)}
            placeholder="What can we help you find?"
            className="h-[52px] flex-1 border border-r-0 border-[#D6DCE5] px-4 text-[16px] text-ink outline-none focus:border-navy"
            aria-label="Search products"
          />
          <button
            type="submit"
            className="flex h-[52px] w-[120px] items-center justify-center gap-2 bg-[#E96A50] text-[15px] font-bold text-white transition-transform duration-200 hover:scale-[1.02] hover:bg-[#D9583E]"
          >
            <Search className="h-5 w-5" />
            Search
          </button>
        </form>
      </PageContainer>

      {/* Desktop */}
      <PageContainer
        className={cn(
          "hidden items-center transition-[padding] duration-200 nav:grid nav:grid-cols-[auto_minmax(480px,1fr)_auto] nav:gap-7",
          compact ? "min-h-[78px] py-2" : "min-h-[86px] py-3",
        )}
      >
        <Logo compact={compact} />

        <div className="relative min-w-0">
          <form
            onSubmit={(e) => {
              e.preventDefault();
              submit();
            }}
            className="flex overflow-hidden rounded-[4px] shadow-[0_2px_6px_rgba(0,0,0,.05)]"
          >
            <input
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
                setOpen(true);
              }}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              placeholder="What can we help you find?"
              className="h-[52px] min-w-0 flex-1 border border-r-0 border-[#D6DCE5] px-4 text-[16px] text-ink outline-none focus:border-navy"
              aria-label="Search products"
            />
            <button
              type="submit"
              className="flex h-[52px] w-[120px] shrink-0 items-center justify-center gap-2 bg-[#E96A50] text-[15px] font-bold text-white transition-transform duration-200 hover:scale-[1.02] hover:bg-[#D9583E]"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
          </form>

          {open && suggestions && (
            <div className="absolute left-0 right-0 top-full z-50 mt-1 rounded-[4px] border border-[#E6EAF0] bg-white shadow-[0_8px_24px_rgba(0,0,0,.08)]">
              <div className="grid gap-0 md:grid-cols-2">
                <SuggestionGroup title="Products">
                  {suggestions.products.length === 0 && (
                    <p className="px-3 py-2 text-sm text-muted">No matching products</p>
                  )}
                  {suggestions.products.map((p) => (
                    <Link
                      key={p.id}
                      href={`/products/${p.slug}`}
                      className="flex items-center gap-3 px-3 py-2.5 transition-colors duration-200 hover:bg-surface"
                      onMouseDown={(e) => e.preventDefault()}
                    >
                      <span className="relative h-12 w-12 shrink-0 overflow-hidden border border-border bg-surface">
                        <Image src={p.image} alt="" fill className="object-cover" sizes="48px" />
                      </span>
                      <span className="min-w-0">
                        <span className="block truncate text-sm font-semibold text-navy">{p.title}</span>
                        <span className="block text-xs text-muted">
                          {p.brand} · {p.model}
                        </span>
                      </span>
                    </Link>
                  ))}
                </SuggestionGroup>
                <div>
                  <SuggestionGroup title="Categories">
                    {suggestions.categories.map((c) => (
                      <Link
                        key={c.href}
                        href={c.href}
                        className="block px-3 py-2 text-sm transition-colors duration-200 hover:bg-surface"
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {c.label}
                      </Link>
                    ))}
                  </SuggestionGroup>
                  <SuggestionGroup title="Brands">
                    {suggestions.brands.map((b) => (
                      <Link
                        key={b}
                        href={`/brands/${b.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                        className="block px-3 py-2 text-sm transition-colors duration-200 hover:bg-surface"
                        onMouseDown={(e) => e.preventDefault()}
                      >
                        {b}
                      </Link>
                    ))}
                  </SuggestionGroup>
                  <SuggestionGroup title="Popular searches">
                    {(suggestions.popular.length ? suggestions.popular : popularSearches.slice(0, 4)).map(
                      (s) => (
                        <button
                          key={s}
                          type="button"
                          className="block w-full px-3 py-2 text-left text-sm transition-colors duration-200 hover:bg-surface"
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => {
                            setQuery(s);
                            submit(s);
                          }}
                        >
                          {s}
                        </button>
                      ),
                    )}
                  </SuggestionGroup>
                </div>
              </div>
            </div>
          )}
        </div>

        <div className="flex items-center gap-3 justify-self-end">
          <IconLink href="/account" label="Account">
            <User className="h-6 w-6" strokeWidth={1.75} />
          </IconLink>
          <IconLink href="/account/favorites" label="Favorites">
            <span className="relative">
              <Heart className="h-6 w-6" strokeWidth={1.75} />
              {wishlistCount > 0 && (
                <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </span>
          </IconLink>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center rounded-full text-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F5F7FA]"
            aria-label="Store location"
            onClick={() => setStoreModalOpen(true)}
          >
            <MapPin className="h-6 w-6" strokeWidth={1.75} />
          </button>
          <IconLink href="/cart" label="Cart">
            <span className="relative">
              <ShoppingCart className="h-6 w-6" strokeWidth={1.75} />
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-accent px-1 text-[11px] font-bold text-white">
                {itemCount}
              </span>
            </span>
          </IconLink>
        </div>
      </PageContainer>
    </div>
  );
}

function IconLink({
  href,
  label,
  children,
}: {
  href: string;
  label: string;
  children: React.ReactNode;
}) {
  return (
    <Link
      href={href}
      aria-label={label}
      className="grid h-11 w-11 place-items-center rounded-full text-navy transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#F5F7FA]"
    >
      {children}
    </Link>
  );
}

function SuggestionGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-[#E6EAF0] md:border-b-0 md:border-r">
      <p className="bg-[#F8F9FB] px-3 py-2 text-xs font-bold uppercase tracking-wide text-muted">
        {title}
      </p>
      <div className="py-1">{children}</div>
    </div>
  );
}
