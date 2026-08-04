"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Heart, Mail, Search, ShoppingCart, User, X } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { PageContainer } from "@/components/layout/page-container";
import { popularSearches } from "@/data/homepage";
import { useCart } from "@/stores/cart";
import { useUiStore, useWishlist } from "@/stores/wishlist";
import { cn } from "@/lib/utils";
import { getSuggestions, getRecentSearches, addRecentSearch, clearRecentSearches } from "@/lib/search";

type FlatItem = { type: "product" | "category" | "brand" | "popular" | "recent"; href?: string; label: string; onSelect: () => void };

export function SearchHeader({ compact = false }: { compact?: boolean }) {
  const router = useRouter();
  const [query, setQuery] = useState("");
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  // Lazy initializer reads localStorage directly on first client render —
  // safe because the dropdown starts closed, so nothing visible depends on
  // this value until the user interacts, avoiding any hydration mismatch.
  const [recent, setRecent] = useState<string[]>(() => getRecentSearches());
  const debounceRef = useRef<number | undefined>(undefined);
  const items = useCart((s) => s.items);
  const itemCount = items.reduce((n, i) => n + i.quantity, 0);
  const wishlistCount = useWishlist((s) => s.productIds.length);
  const setMobileNavOpen = useUiStore((s) => s.setMobileNavOpen);

  const [debouncedQuery, setDebouncedQuery] = useState("");

  // Reset debounced state synchronously when the query is cleared — adjusted
  // during render (not an effect) per React's guidance for this pattern.
  const [prevQuery, setPrevQuery] = useState(query);
  if (query !== prevQuery) {
    setPrevQuery(query);
    if (!query.trim()) {
      setDebouncedQuery("");
      setLoading(false);
    } else {
      setLoading(true);
    }
  }

  useEffect(() => {
    const q = query.trim();
    if (!q) return;
    window.clearTimeout(debounceRef.current);
    debounceRef.current = window.setTimeout(() => {
      setDebouncedQuery(q);
      setLoading(false);
    }, 200);
    return () => window.clearTimeout(debounceRef.current);
  }, [query]);

  const suggestions = useMemo(() => {
    if (!debouncedQuery) return null;
    return getSuggestions(debouncedQuery);
  }, [debouncedQuery]);

  const submit = (value?: string) => {
    const q = (value ?? query).trim();
    if (!q) return;
    addRecentSearch(q);
    setRecent(getRecentSearches());
    setOpen(false);
    setActiveIndex(-1);
    router.push(`/search?q=${encodeURIComponent(q)}`);
  };

  const flatItems: FlatItem[] = useMemo(() => {
    if (!suggestions) {
      return recent.map((r) => ({ type: "recent", label: r, onSelect: () => submit(r) }));
    }
    const out: FlatItem[] = [];
    suggestions.products.forEach((p) =>
      out.push({ type: "product", label: p.title, href: `/products/${p.slug}`, onSelect: () => router.push(`/products/${p.slug}`) }),
    );
    suggestions.categories.forEach((c) =>
      out.push({ type: "category", label: c.label, href: c.href, onSelect: () => router.push(c.href) }),
    );
    suggestions.brands.forEach((b) =>
      out.push({
        type: "brand",
        label: b,
        href: `/brands/${b.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`,
        onSelect: () => router.push(`/brands/${b.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`),
      }),
    );
    (suggestions.popular.length ? suggestions.popular : popularSearches.slice(0, 4)).forEach((s) =>
      out.push({ type: "popular", label: s, onSelect: () => submit(s) }),
    );
    return out;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [suggestions, recent]);

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      setOpen(false);
      setActiveIndex(-1);
      return;
    }
    if (!open || flatItems.length === 0) return;
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (i + 1) % flatItems.length);
    } else if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (i - 1 + flatItems.length) % flatItems.length);
    } else if (e.key === "Enter" && activeIndex >= 0) {
      e.preventDefault();
      flatItems[activeIndex].onSelect();
    }
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
        <Link href="/" className="text-[22px] font-bold uppercase tracking-[-0.04em] text-[#0F172A] sm:hidden">
          SARCO
        </Link>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit();
          }}
          className="flex w-full overflow-hidden rounded-[4px] shadow-[0_2px_6px_rgba(0,0,0,.05)]"
        >
          <div className="relative flex-1">
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onFocus={() => setOpen(true)}
              onBlur={() => setTimeout(() => setOpen(false), 150)}
              placeholder="What can we help you find?"
              className="h-[52px] w-full border border-r-0 border-[#D6DCE5] px-4 pr-9 text-[16px] text-ink outline-none focus:border-navy"
              aria-label="Search products"
            />
            {query && (
              <button
                type="button"
                aria-label="Clear search"
                className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center text-muted hover:text-navy"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => setQuery("")}
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
          <button
            type="submit"
            className="flex h-[52px] w-[120px] items-center justify-center gap-2 bg-navy text-[15px] font-bold text-white transition-transform duration-200 hover:scale-[1.02] hover:bg-[#183A58]"
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
            <div className="relative min-w-0 flex-1">
              <input
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(-1);
                }}
                onFocus={() => setOpen(true)}
                onBlur={() => setTimeout(() => setOpen(false), 150)}
                onKeyDown={onKeyDown}
                placeholder="What can we help you find?"
                className="h-[52px] w-full min-w-0 border border-r-0 border-[#D6DCE5] px-4 pr-9 text-[16px] text-ink outline-none focus:border-navy"
                role="combobox"
                aria-label="Search products"
                aria-autocomplete="list"
                aria-expanded={open}
                aria-controls="search-suggestions"
                aria-activedescendant={activeIndex >= 0 ? `search-item-${activeIndex}` : undefined}
              />
              {query && (
                <button
                  type="button"
                  aria-label="Clear search"
                  className="absolute right-2 top-1/2 grid h-6 w-6 -translate-y-1/2 place-items-center text-muted hover:text-navy"
                  onMouseDown={(e) => e.preventDefault()}
                  onClick={() => {
                    setQuery("");
                    setActiveIndex(-1);
                  }}
                >
                  <X className="h-4 w-4" />
                </button>
              )}
            </div>
            <button
              type="submit"
              className="flex h-[52px] w-[120px] shrink-0 items-center justify-center gap-2 bg-navy text-[15px] font-bold text-white transition-transform duration-200 hover:scale-[1.02] hover:bg-[#183A58]"
            >
              <Search className="h-5 w-5" />
              Search
            </button>
          </form>

          {open && (
            <div
              id="search-suggestions"
              role="listbox"
              className="absolute left-0 right-0 top-full z-50 mt-1 rounded-[4px] border border-[#E6EAF0] bg-white shadow-[0_8px_24px_rgba(0,0,0,.08)]"
            >
              {loading && (
                <p className="px-3 py-2.5 text-sm text-muted">Searching…</p>
              )}

              {!loading && !suggestions && (
                <div>
                  <div className="flex items-center justify-between bg-[#F8F9FB] px-3 py-2">
                    <p className="text-xs font-bold uppercase tracking-wide text-muted">Recent searches</p>
                    {recent.length > 0 && (
                      <button
                        type="button"
                        className="text-xs font-semibold text-accent hover:underline"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => {
                          clearRecentSearches();
                          setRecent([]);
                        }}
                      >
                        Clear
                      </button>
                    )}
                  </div>
                  {recent.length === 0 ? (
                    <p className="px-3 py-2.5 text-sm text-muted">No recent searches yet</p>
                  ) : (
                    <div className="py-1">
                      {recent.map((r, i) => (
                        <button
                          key={r}
                          id={`search-item-${i}`}
                          type="button"
                          role="option"
                          aria-selected={activeIndex === i}
                          className={cn(
                            "block w-full px-3 py-2 text-left text-sm transition-colors duration-200 hover:bg-surface",
                            activeIndex === i && "bg-surface",
                          )}
                          onMouseDown={(e) => e.preventDefault()}
                          onClick={() => submit(r)}
                        >
                          {r}
                        </button>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {!loading && suggestions && (
                <div className="grid gap-0 md:grid-cols-2">
                  <SuggestionGroup title="Products">
                    {suggestions.products.length === 0 && (
                      <p className="px-3 py-2 text-sm text-muted">No matching products</p>
                    )}
                    {suggestions.products.map((p) => {
                      const flatIndex = flatItems.findIndex((f) => f.type === "product" && f.label === p.title);
                      return (
                        <Link
                          key={p.id}
                          id={`search-item-${flatIndex}`}
                          role="option"
                          aria-selected={activeIndex === flatIndex}
                          href={`/products/${p.slug}`}
                          className={cn(
                            "flex items-center gap-3 px-3 py-2.5 transition-colors duration-200 hover:bg-surface",
                            activeIndex === flatIndex && "bg-surface",
                          )}
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
                      );
                    })}
                  </SuggestionGroup>
                  <div>
                    <SuggestionGroup title="Categories">
                      {suggestions.categories.length === 0 && (
                        <p className="px-3 py-2 text-sm text-muted">No matching categories</p>
                      )}
                      {suggestions.categories.map((c) => {
                        const flatIndex = flatItems.findIndex((f) => f.type === "category" && f.label === c.label);
                        return (
                          <Link
                            key={c.href}
                            id={`search-item-${flatIndex}`}
                            role="option"
                            aria-selected={activeIndex === flatIndex}
                            href={c.href}
                            className={cn(
                              "block px-3 py-2 text-sm transition-colors duration-200 hover:bg-surface",
                              activeIndex === flatIndex && "bg-surface",
                            )}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {c.label}
                          </Link>
                        );
                      })}
                    </SuggestionGroup>
                    <SuggestionGroup title="Brands">
                      {suggestions.brands.length === 0 && (
                        <p className="px-3 py-2 text-sm text-muted">No matching brands</p>
                      )}
                      {suggestions.brands.map((b) => {
                        const flatIndex = flatItems.findIndex((f) => f.type === "brand" && f.label === b);
                        return (
                          <Link
                            key={b}
                            id={`search-item-${flatIndex}`}
                            role="option"
                            aria-selected={activeIndex === flatIndex}
                            href={`/brands/${b.toLowerCase().replace(/[^a-z0-9]+/g, "-")}`}
                            className={cn(
                              "block px-3 py-2 text-sm transition-colors duration-200 hover:bg-surface",
                              activeIndex === flatIndex && "bg-surface",
                            )}
                            onMouseDown={(e) => e.preventDefault()}
                          >
                            {b}
                          </Link>
                        );
                      })}
                    </SuggestionGroup>
                    <SuggestionGroup title="Popular searches">
                      {(suggestions.popular.length ? suggestions.popular : popularSearches.slice(0, 4)).map((s) => {
                        const flatIndex = flatItems.findIndex((f) => f.type === "popular" && f.label === s);
                        return (
                          <button
                            key={s}
                            id={`search-item-${flatIndex}`}
                            type="button"
                            role="option"
                            aria-selected={activeIndex === flatIndex}
                            className={cn(
                              "block w-full px-3 py-2 text-left text-sm transition-colors duration-200 hover:bg-surface",
                              activeIndex === flatIndex && "bg-surface",
                            )}
                            onMouseDown={(e) => e.preventDefault()}
                            onClick={() => submit(s)}
                          >
                            {s}
                          </button>
                        );
                      })}
                    </SuggestionGroup>
                  </div>
                </div>
              )}
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
                <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-navy px-1 text-[11px] font-bold text-white">
                  {wishlistCount}
                </span>
              )}
            </span>
          </IconLink>
          <IconLink href="/contact" label="Contact">
            <Mail className="h-6 w-6" strokeWidth={1.75} />
          </IconLink>
          <IconLink href="/cart" label="Cart">
            <span className="relative">
              <ShoppingCart className="h-6 w-6" strokeWidth={1.75} />
              <span className="absolute -right-2 -top-2 grid h-5 min-w-5 place-items-center rounded-full bg-navy px-1 text-[11px] font-bold text-white">
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
