"use client";

import { useCallback, useMemo, useState } from "react";
import Link from "next/link";
import { Phone, SlidersHorizontal, X } from "lucide-react";
import { ProductCard } from "@/components/catalog/product-card";
import { catalogCategories, type CatalogSuggestion } from "@/lib/catalog";
import type { FuelType, LoadType, Product } from "@/data/products";
import { useDialog } from "@/lib/use-dialog";
import { cn } from "@/lib/utils";

type SortKey = "featured" | "price-asc" | "price-desc" | "rating";

const sortOptions: { value: SortKey; label: string }[] = [
  { value: "featured", label: "Featured" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Customer Rating" },
];

const FUEL_OPTIONS: FuelType[] = ["Electric", "Gas", "Dual-Fuel", "Induction"];
const WIDTH_OPTIONS = [24, 27, 30, 36];
const FEATURE_OPTIONS = ["Convection", "Smart/Wi-Fi", "Self-Cleaning"];
const LOAD_OPTIONS: LoadType[] = ["Top Load", "Front Load"];
const NOISE_BANDS = [
  { id: "ultra", label: "Under 44 dBA (Ultra-Quiet)", test: (n: number) => n <= 44 },
  { id: "quiet", label: "45–48 dBA", test: (n: number) => n >= 45 && n <= 48 },
  { id: "standard", label: "49+ dBA", test: (n: number) => n >= 49 },
] as const;
const CONTROL_OPTIONS = ["Top Control", "Front Control", "Panel Ready"] as const;
const DISHWASHER_TYPES = ['Built-In 24"', 'Compact 18"', "Portable / Countertop"] as const;
const DISHWASHER_FEATURES = [
  "3rd Rack",
  "Adjustable Upper Rack",
  "Built-In Water Softener",
  "Smart/Wi-Fi",
] as const;

const LAUNDRY_FACETS: { id: string; label: string; match: (p: Product) => boolean }[] = [
  {
    id: "washers",
    label: "Washers",
    match: (p) => /washer/i.test(p.subcategory) && !/pair|center/i.test(p.subcategory),
  },
  {
    id: "dryers",
    label: "Dryers",
    match: (p) => /dryer/i.test(p.subcategory) && !/pair|center/i.test(p.subcategory),
  },
  {
    id: "pairs",
    label: "Laundry Pairs",
    match: (p) => /pair/i.test(p.subcategory),
  },
  {
    id: "stacked",
    label: "Stacked Centers",
    match: (p) => /stacked|center/i.test(p.subcategory),
  },
];

type ActivePill = { id: string; label: string; onClear: () => void };

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="border-b border-border py-4 last:border-b-0">
      <p className="mb-2 text-[12px] font-bold uppercase tracking-wide text-navy">{title}</p>
      <div className="space-y-2">{children}</div>
    </div>
  );
}

function InStockToggle({
  checked,
  onChange,
  locked,
}: {
  checked: boolean;
  onChange: (next: boolean) => void;
  locked?: boolean;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      disabled={locked}
      onClick={() => onChange(!checked)}
      className={cn(
        "flex w-full items-center justify-between gap-3 border px-3 py-2.5 text-left transition",
        checked ? "border-success/40 bg-[#E8F6EC]" : "border-border bg-white",
        locked && "cursor-default",
      )}
    >
      <span className="text-[13px] font-bold text-navy">
        In Stock Only
        {locked ? <span className="mt-0.5 block text-[11px] font-semibold text-success">Default for this page</span> : null}
      </span>
      <span
        className={cn(
          "relative h-6 w-11 shrink-0 rounded-full transition-colors",
          checked ? "bg-success" : "bg-[#cbd5e1]",
        )}
        aria-hidden
      >
        <span
          className={cn(
            "absolute top-0.5 left-0.5 h-5 w-5 rounded-full bg-white shadow transition-transform",
            checked && "translate-x-5",
          )}
        />
      </span>
    </button>
  );
}

export function CatalogListing({
  products,
  categorySlug,
  note,
  suggestion,
}: {
  products: Product[];
  categorySlug: string;
  note?: string;
  suggestion?: CatalogSuggestion;
}) {
  const isInStockPage = categorySlug === "in-stock";
  const isLaundry = categorySlug === "laundry";
  const isDishwashers = categorySlug === "dishwashers";

  const [brand, setBrand] = useState("All");
  const [inStockOnly, setInStockOnly] = useState(isInStockPage);
  const [sort, setSort] = useState<SortKey>("featured");
  const [fuel, setFuel] = useState("All");
  const [width, setWidth] = useState("All");
  const [finish, setFinish] = useState("All");
  const [feature, setFeature] = useState("All");
  const [loadType, setLoadType] = useState("All");
  const [subFacet, setSubFacet] = useState("All");
  const [capacityMin, setCapacityMin] = useState<number | null>(null);
  const [capacityMax, setCapacityMax] = useState<number | null>(null);
  const [noiseBand, setNoiseBand] = useState("All");
  const [controlType, setControlType] = useState("All");
  const [dishwasherType, setDishwasherType] = useState("All");
  const [dishwasherFeature, setDishwasherFeature] = useState("All");
  const [mobileFiltersOpen, setMobileFiltersOpen] = useState(false);

  const closeMobileFilters = useCallback(() => setMobileFiltersOpen(false), []);
  const drawerRef = useDialog<HTMLElement>(mobileFiltersOpen, closeMobileFilters);

  const brands = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.brand))).sort()],
    [products],
  );

  const finishes = useMemo(
    () => ["All", ...Array.from(new Set(products.map((p) => p.finish).filter(Boolean) as string[])).sort()],
    [products],
  );

  const availableFuels = useMemo(() => {
    const present = new Set(products.map((p) => p.fuelType).filter(Boolean));
    return FUEL_OPTIONS.filter((f) => present.has(f));
  }, [products]);

  const availableWidths = useMemo(() => {
    const present = new Set(products.map((p) => p.widthInches).filter(Boolean));
    return WIDTH_OPTIONS.filter((w) => present.has(w));
  }, [products]);

  const availableFeatures = useMemo(() => {
    const present = new Set(products.flatMap((p) => p.features ?? []));
    return FEATURE_OPTIONS.filter((f) => present.has(f));
  }, [products]);

  const availableLoads = useMemo(() => {
    const present = new Set(products.map((p) => p.loadType).filter(Boolean));
    return LOAD_OPTIONS.filter((l) => present.has(l));
  }, [products]);

  const capacityBounds = useMemo(() => {
    const values = products.map((p) => p.capacityCuFt).filter((v): v is number => v != null);
    if (values.length === 0) return null;
    return { min: Math.floor(Math.min(...values) * 10) / 10, max: Math.ceil(Math.max(...values) * 10) / 10 };
  }, [products]);

  const laundryFacets = useMemo(
    () => LAUNDRY_FACETS.filter((facet) => products.some(facet.match)),
    [products],
  );

  const hasNoise = useMemo(
    () => isDishwashers || products.some((p) => p.noiseDba != null),
    [products, isDishwashers],
  );
  const hasControls = useMemo(
    () => isDishwashers || products.some((p) => p.controlType),
    [products, isDishwashers],
  );
  const hasDishwasherTypes = useMemo(
    () => isDishwashers || products.some((p) => p.dishwasherType),
    [products, isDishwashers],
  );
  const availableDishwasherFeatures = useMemo(() => {
    if (!isDishwashers) {
      const present = new Set(products.flatMap((p) => p.features ?? []));
      return DISHWASHER_FEATURES.filter((f) => present.has(f));
    }
    const present = new Set(products.flatMap((p) => p.features ?? []));
    const matched = DISHWASHER_FEATURES.filter((f) => present.has(f));
    return matched.length > 0 ? matched : [...DISHWASHER_FEATURES];
  }, [products, isDishwashers]);

  const clearFilters = () => {
    setBrand("All");
    setInStockOnly(isInStockPage);
    setFuel("All");
    setWidth("All");
    setFinish("All");
    setFeature("All");
    setLoadType("All");
    setSubFacet("All");
    setCapacityMin(null);
    setCapacityMax(null);
    setNoiseBand("All");
    setControlType("All");
    setDishwasherType("All");
    setDishwasherFeature("All");
  };

  const activePills = useMemo(() => {
    const pills: ActivePill[] = [];
    if (brand !== "All") pills.push({ id: "brand", label: brand, onClear: () => setBrand("All") });
    if (inStockOnly && !isInStockPage) {
      pills.push({ id: "stock", label: "In Stock Only", onClear: () => setInStockOnly(false) });
    }
    if (loadType !== "All") pills.push({ id: "load", label: loadType, onClear: () => setLoadType("All") });
    if (noiseBand !== "All") {
      const band = NOISE_BANDS.find((b) => b.id === noiseBand);
      pills.push({
        id: "noise",
        label: band?.label ?? noiseBand,
        onClear: () => setNoiseBand("All"),
      });
    }
    if (controlType !== "All") {
      pills.push({ id: "control", label: controlType, onClear: () => setControlType("All") });
    }
    if (dishwasherType !== "All") {
      pills.push({ id: "dtype", label: dishwasherType, onClear: () => setDishwasherType("All") });
    }
    if (dishwasherFeature !== "All") {
      pills.push({
        id: "dfeat",
        label: dishwasherFeature,
        onClear: () => setDishwasherFeature("All"),
      });
    }
    if (fuel !== "All") pills.push({ id: "fuel", label: fuel, onClear: () => setFuel("All") });
    if (width !== "All") pills.push({ id: "width", label: `${width}"`, onClear: () => setWidth("All") });
    if (finish !== "All") pills.push({ id: "finish", label: finish, onClear: () => setFinish("All") });
    if (feature !== "All") pills.push({ id: "feature", label: feature, onClear: () => setFeature("All") });
    if (subFacet !== "All") {
      const facet = LAUNDRY_FACETS.find((f) => f.id === subFacet);
      pills.push({
        id: "subfacet",
        label: facet?.label ?? subFacet,
        onClear: () => setSubFacet("All"),
      });
    }
    if (capacityBounds && (capacityMin != null || capacityMax != null)) {
      const min = capacityMin ?? capacityBounds.min;
      const max = capacityMax ?? capacityBounds.max;
      if (min !== capacityBounds.min || max !== capacityBounds.max) {
        pills.push({
          id: "capacity",
          label: `${min}–${max} cu. ft.`,
          onClear: () => {
            setCapacityMin(null);
            setCapacityMax(null);
          },
        });
      }
    }
    return pills;
  }, [
    brand,
    inStockOnly,
    isInStockPage,
    loadType,
    noiseBand,
    controlType,
    dishwasherType,
    dishwasherFeature,
    fuel,
    width,
    finish,
    feature,
    subFacet,
    capacityMin,
    capacityMax,
    capacityBounds,
  ]);

  const filtered = useMemo(() => {
    let list = products;
    if (subFacet !== "All") {
      const facet = LAUNDRY_FACETS.find((f) => f.id === subFacet);
      if (facet) list = list.filter(facet.match);
    }
    if (brand !== "All") list = list.filter((p) => p.brand === brand);
    if (inStockOnly) list = list.filter((p) => p.availability === "in_stock");
    if (fuel !== "All") list = list.filter((p) => p.fuelType === fuel);
    if (width !== "All") list = list.filter((p) => p.widthInches === Number(width));
    if (finish !== "All") list = list.filter((p) => p.finish === finish);
    if (feature !== "All") list = list.filter((p) => p.features?.includes(feature));
    if (loadType !== "All") list = list.filter((p) => p.loadType === loadType);
    if (capacityMin != null) list = list.filter((p) => (p.capacityCuFt ?? 0) >= capacityMin);
    if (capacityMax != null) list = list.filter((p) => (p.capacityCuFt ?? Infinity) <= capacityMax);
    if (noiseBand !== "All") {
      const band = NOISE_BANDS.find((b) => b.id === noiseBand);
      if (band) list = list.filter((p) => p.noiseDba != null && band.test(p.noiseDba));
    }
    if (controlType !== "All") list = list.filter((p) => p.controlType === controlType);
    if (dishwasherType !== "All") list = list.filter((p) => p.dishwasherType === dishwasherType);
    if (dishwasherFeature !== "All") {
      list = list.filter((p) => p.features?.includes(dishwasherFeature));
    }

    const sorted = [...list];
    switch (sort) {
      case "price-asc":
        sorted.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
        break;
      case "price-desc":
        sorted.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
        break;
      case "rating":
        sorted.sort((a, b) => b.rating - a.rating);
        break;
      default:
        sorted.sort((a, b) => Number(b.featured) - Number(a.featured));
    }
    return sorted;
  }, [
    products,
    brand,
    inStockOnly,
    sort,
    fuel,
    width,
    finish,
    feature,
    loadType,
    subFacet,
    capacityMin,
    capacityMax,
    noiseBand,
    controlType,
    dishwasherType,
    dishwasherFeature,
  ]);

  if (products.length === 0) {
    return (
      <div className="mt-8 space-y-4">
        {suggestion && <SuggestionBox suggestion={suggestion} />}
        <div className="border border-border bg-surface p-8 text-center">
          <p className="text-sm text-muted">
            We don&apos;t have models listed online in this exact configuration right now — our online
            selection changes daily. Call us, or browse a related category below.
          </p>
          <div className="mt-5 flex flex-wrap justify-center gap-2">
            {catalogCategories
              .filter((c) => c.slug !== categorySlug)
              .map((c) => (
                <Link key={c.slug} href={`/${c.slug}`} className="btn btn-outline btn-sm">
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </div>
    );
  }

  const filterFields = (
    <>
      <FilterGroup title="Availability">
        <InStockToggle
          checked={inStockOnly}
          locked={isInStockPage}
          onChange={(next) => {
            if (!isInStockPage) setInStockOnly(next);
          }}
        />
      </FilterGroup>

      <FilterGroup title="Brand">
        <div className="flex flex-wrap gap-1.5">
          {brands.map((b) => (
            <button
              key={b}
              type="button"
              onClick={() => setBrand(b)}
              className={cn(
                "border px-2.5 py-1 text-[11px] font-semibold transition",
                brand === b
                  ? "border-navy bg-navy text-white"
                  : "border-border bg-white text-navy hover:border-navy",
              )}
            >
              {b}
            </button>
          ))}
        </div>
      </FilterGroup>

      {availableLoads.length > 0 && (
        <FilterGroup title="Load Type">
          <select
            value={loadType}
            onChange={(e) => setLoadType(e.target.value)}
            className="input-retail w-full rounded-none py-2 text-xs font-semibold"
            aria-label="Load type"
          >
            <option value="All">All load types</option>
            {availableLoads.map((l) => (
              <option key={l} value={l}>
                {l}
              </option>
            ))}
          </select>
        </FilterGroup>
      )}

      {hasNoise && (
        <FilterGroup title="Noise Level (dBA)">
          <select
            value={noiseBand}
            onChange={(e) => setNoiseBand(e.target.value)}
            className="input-retail w-full rounded-none py-2 text-xs font-semibold"
            aria-label="Noise level"
          >
            <option value="All">All noise levels</option>
            {NOISE_BANDS.map((band) => (
              <option key={band.id} value={band.id}>
                {band.label}
              </option>
            ))}
          </select>
        </FilterGroup>
      )}

      {hasControls && (
        <FilterGroup title="Controls & Design">
          <select
            value={controlType}
            onChange={(e) => setControlType(e.target.value)}
            className="input-retail w-full rounded-none py-2 text-xs font-semibold"
            aria-label="Controls and design"
          >
            <option value="All">All control styles</option>
            {CONTROL_OPTIONS.map((c) => (
              <option key={c} value={c}>
                {c === "Top Control" ? "Top Control (Hidden Buttons)" : c}
              </option>
            ))}
          </select>
        </FilterGroup>
      )}

      {hasDishwasherTypes && (
        <FilterGroup title="Type">
          <select
            value={dishwasherType}
            onChange={(e) => setDishwasherType(e.target.value)}
            className="input-retail w-full rounded-none py-2 text-xs font-semibold"
            aria-label="Dishwasher type"
          >
            <option value="All">All types</option>
            {DISHWASHER_TYPES.map((t) => (
              <option key={t} value={t}>
                {t === 'Built-In 24"'
                  ? 'Built-In (Standard 24")'
                  : t === 'Compact 18"'
                    ? 'Compact (18")'
                    : t}
              </option>
            ))}
          </select>
        </FilterGroup>
      )}

      {isDishwashers && availableDishwasherFeatures.length > 0 && (
        <FilterGroup title="Racks & Features">
          <select
            value={dishwasherFeature}
            onChange={(e) => setDishwasherFeature(e.target.value)}
            className="input-retail w-full rounded-none py-2 text-xs font-semibold"
            aria-label="Dishwasher features"
          >
            <option value="All">All features</option>
            {availableDishwasherFeatures.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </FilterGroup>
      )}

      {availableFuels.length > 0 && (
        <FilterGroup title={isLaundry ? "Fuel Type (Dryers)" : "Fuel Type"}>
          <select
            value={fuel}
            onChange={(e) => setFuel(e.target.value)}
            className="input-retail w-full rounded-none py-2 text-xs font-semibold"
            aria-label="Fuel type"
          >
            <option value="All">All fuel types</option>
            {availableFuels.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </FilterGroup>
      )}

      {capacityBounds && (
        <FilterGroup title="Capacity (cu. ft.)">
          <div className="space-y-2 text-[12px] text-navy">
            <div className="flex items-center justify-between font-semibold">
              <span>{capacityMin ?? capacityBounds.min}+</span>
              <span>up to {capacityMax ?? capacityBounds.max}</span>
            </div>
            <label className="block">
              <span className="sr-only">Minimum capacity</span>
              <input
                type="range"
                min={capacityBounds.min}
                max={capacityBounds.max}
                step={0.1}
                value={capacityMin ?? capacityBounds.min}
                onChange={(e) => setCapacityMin(Number(e.target.value))}
                className="w-full accent-navy"
              />
            </label>
            <label className="block">
              <span className="sr-only">Maximum capacity</span>
              <input
                type="range"
                min={capacityBounds.min}
                max={capacityBounds.max}
                step={0.1}
                value={capacityMax ?? capacityBounds.max}
                onChange={(e) => setCapacityMax(Number(e.target.value))}
                className="w-full accent-navy"
              />
            </label>
            <p className="text-muted">
              Showing {capacityMin ?? capacityBounds.min} – {capacityMax ?? capacityBounds.max} cu. ft.
            </p>
          </div>
        </FilterGroup>
      )}

      {availableWidths.length > 0 && !isDishwashers && (
        <FilterGroup title="Width / Size">
          <select
            value={width}
            onChange={(e) => setWidth(e.target.value)}
            className="input-retail w-full rounded-none py-2 text-xs font-semibold"
            aria-label="Width"
          >
            <option value="All">All widths</option>
            {availableWidths.map((w) => (
              <option key={w} value={String(w)}>
                {w}&quot;
              </option>
            ))}
          </select>
        </FilterGroup>
      )}

      {finishes.length > 1 && (
        <FilterGroup title="Color / Finish">
          <select
            value={finish}
            onChange={(e) => setFinish(e.target.value)}
            className="input-retail w-full rounded-none py-2 text-xs font-semibold"
            aria-label="Finish"
          >
            {finishes.map((f) => (
              <option key={f} value={f}>
                {f === "All" ? "All finishes" : f}
              </option>
            ))}
          </select>
        </FilterGroup>
      )}

      {!isDishwashers && availableFeatures.length > 0 && (
        <FilterGroup title="Features">
          <select
            value={feature}
            onChange={(e) => setFeature(e.target.value)}
            className="input-retail w-full rounded-none py-2 text-xs font-semibold"
            aria-label="Features"
          >
            <option value="All">All features</option>
            {availableFeatures.map((f) => (
              <option key={f} value={f}>
                {f}
              </option>
            ))}
          </select>
        </FilterGroup>
      )}
    </>
  );

  const sortSelect = (
    <select
      value={sort}
      onChange={(e) => setSort(e.target.value as SortKey)}
      className="input-retail w-full rounded-none py-2 text-xs font-semibold md:w-auto"
      aria-label="Sort by"
    >
      {sortOptions.map((o) => (
        <option key={o.value} value={o.value}>
          {o.label}
        </option>
      ))}
    </select>
  );

  return (
    <div className="mt-8">
      {suggestion && <SuggestionBox suggestion={suggestion} className="mb-5" />}

      {note && (
        <p className="mb-5 border border-border bg-surface px-4 py-3 text-sm text-muted">{note}</p>
      )}

      {/* Mobile sticky Filter & Sort trigger */}
      <div className="sticky top-16 z-30 -mx-4 mb-4 border-y border-border bg-white/95 px-4 py-2.5 backdrop-blur md:hidden">
        <button
          type="button"
          className="btn btn-outline btn-sm inline-flex w-full items-center justify-center gap-2"
          onClick={() => setMobileFiltersOpen(true)}
          aria-haspopup="dialog"
        >
          <SlidersHorizontal className="h-4 w-4" />
          Filter &amp; Sort
          {activePills.length > 0 ? (
            <span className="bg-navy px-1.5 py-0.5 text-[10px] font-bold text-white">
              {activePills.length}
            </span>
          ) : null}
        </button>
      </div>

      <div className="gap-8 md:grid md:grid-cols-[260px_minmax(0,1fr)] md:items-start">
        {/* Desktop filter sidebar */}
        <aside className="relative z-10 hidden max-h-[calc(100vh-8.5rem)] overflow-y-auto border border-border bg-white p-4 shadow-[0_1px_0_rgba(15,23,42,0.04)] md:sticky md:top-32 md:block md:self-start">
          <div className="mb-3 flex items-center justify-between border-b border-border pb-3">
            <p className="text-sm font-bold text-navy">Filters</p>
            <button
              type="button"
              onClick={clearFilters}
              className="text-[12px] font-semibold text-accent hover:underline"
            >
              Clear all
            </button>
          </div>
          {filterFields}
        </aside>

        <div className="min-w-0">
          <div className="mb-4 hidden items-center justify-between gap-3 md:flex">
            <p className="text-sm text-muted">
              {filtered.length} result{filtered.length === 1 ? "" : "s"}
            </p>
            {sortSelect}
          </div>

          {laundryFacets.length > 0 && (
            <div className="mb-4 flex flex-wrap gap-2">
              <button
                type="button"
                onClick={() => setSubFacet("All")}
                className={cn(
                  "border px-3 py-1.5 text-xs font-semibold transition",
                  subFacet === "All"
                    ? "border-navy bg-navy text-white"
                    : "border-border bg-white text-navy hover:border-navy",
                )}
              >
                All Laundry
              </button>
              {laundryFacets.map((facet) => (
                <button
                  key={facet.id}
                  type="button"
                  onClick={() => setSubFacet(facet.id)}
                  className={cn(
                    "border px-3 py-1.5 text-xs font-semibold transition",
                    subFacet === facet.id
                      ? "border-navy bg-navy text-white"
                      : "border-border bg-white text-navy hover:border-navy",
                  )}
                >
                  {facet.label}
                </button>
              ))}
            </div>
          )}

          {activePills.length > 0 && (
            <div className="mb-4 flex flex-wrap items-center gap-2" aria-label="Active filters">
              {activePills.map((pill) => (
                <button
                  key={pill.id}
                  type="button"
                  onClick={pill.onClear}
                  className="inline-flex items-center gap-1.5 border border-navy/20 bg-[#E0F2FE] px-2.5 py-1 text-[12px] font-semibold text-navy transition hover:border-accent hover:bg-accent-50"
                >
                  {pill.label}
                  <X className="h-3 w-3" aria-hidden />
                  <span className="sr-only">Remove {pill.label} filter</span>
                </button>
              ))}
              <button
                type="button"
                onClick={clearFilters}
                className="text-[12px] font-semibold text-accent hover:underline"
              >
                Clear all
              </button>
            </div>
          )}

          <p className="mb-3 text-sm text-muted md:hidden">
            {filtered.length} result{filtered.length === 1 ? "" : "s"}
          </p>

          <div className="grid grid-cols-2 items-stretch gap-3 lg:grid-cols-3">
            {filtered.map((product, i) => (
              <ProductCard key={product.id} product={product} index={i} />
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="mt-6 text-sm text-muted">
              No models match these filters.{" "}
              <button type="button" onClick={clearFilters} className="font-semibold text-accent hover:underline">
                Clear filters
              </button>
            </p>
          )}
        </div>
      </div>

      {/* Mobile Filter & Sort drawer */}
      {mobileFiltersOpen ? (
        <div className="fixed inset-0 z-[80] md:hidden">
          <button
            type="button"
            className="absolute inset-0 bg-navy/50"
            aria-label="Close filters"
            onClick={closeMobileFilters}
          />
          <aside
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label="Filter and sort"
            tabIndex={-1}
            className="absolute inset-x-0 bottom-0 flex max-h-[85vh] flex-col border-t border-border bg-white shadow-xl outline-none"
          >
            <div className="flex items-center justify-between border-b border-border px-4 py-3">
              <p className="text-sm font-bold text-navy">Filter &amp; Sort</p>
              <button
                type="button"
                className="grid h-9 w-9 place-items-center border border-border"
                aria-label="Close"
                onClick={closeMobileFilters}
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto px-4 py-3">
              <FilterGroup title="Sort by">{sortSelect}</FilterGroup>
              {filterFields}
            </div>

            <div className="grid grid-cols-2 gap-2 border-t border-border p-4">
              <button type="button" className="btn btn-outline" onClick={clearFilters}>
                Clear
              </button>
              <button type="button" className="btn btn-navy" onClick={closeMobileFilters}>
                Show {filtered.length} results
              </button>
            </div>
          </aside>
        </div>
      ) : null}
    </div>
  );
}

function SuggestionBox({
  suggestion,
  className,
}: {
  suggestion: CatalogSuggestion;
  className?: string;
}) {
  return (
    <div className={cn("border border-[#2563EB]/25 bg-[#E0F2FE] p-4 text-sm text-navy", className)}>
      <p className="font-bold">{suggestion.title}</p>
      <p className="mt-1 leading-relaxed text-navy/85">{suggestion.body}</p>
      <div className="mt-3 flex flex-wrap gap-3">
        <a href={suggestion.phoneHref} className="btn btn-primary btn-sm inline-flex items-center gap-1.5">
          <Phone className="h-3.5 w-3.5" /> Call {suggestion.phoneDisplay}
        </a>
        {suggestion.relatedHref && suggestion.relatedLabel && (
          <Link href={suggestion.relatedHref} className="btn btn-outline btn-sm">
            {suggestion.relatedLabel}
          </Link>
        )}
      </div>
    </div>
  );
}
