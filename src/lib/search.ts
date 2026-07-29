import { brands, products, type Product } from "@/data/products";
import { mainNavigation } from "@/config/navigation";
import { popularSearches } from "@/data/homepage";

/** Single shared product filter — matches name, brand, model, SKU, category, and appliance type. */
export function filterProducts(query: string, limit?: number): Product[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  const matches = products.filter(
    (p) =>
      p.title.toLowerCase().includes(q) ||
      p.brand.toLowerCase().includes(q) ||
      p.model.toLowerCase().includes(q) ||
      p.sku.toLowerCase().includes(q) ||
      p.category.toLowerCase().includes(q) ||
      p.subcategory.toLowerCase().includes(q),
  );
  return typeof limit === "number" ? matches.slice(0, limit) : matches;
}

export type SearchSuggestions = {
  products: Product[];
  categories: { label: string; href: string }[];
  brands: string[];
  popular: string[];
};

/** Grouped autocomplete suggestions for the header search — Products / Categories / Brands / Popular Searches. */
export function getSuggestions(query: string): SearchSuggestions {
  const q = query.trim().toLowerCase();
  return {
    products: filterProducts(q, 5),
    categories: mainNavigation
      .filter((m) => m.label.toLowerCase().includes(q))
      .slice(0, 4)
      .map((m) => ({ label: m.label, href: m.href })),
    brands: brands.filter((b) => b.toLowerCase().includes(q)).slice(0, 4),
    popular: popularSearches.filter((s) => s.toLowerCase().includes(q)).slice(0, 4),
  };
}

const RECENT_SEARCHES_KEY = "sarco-recent-searches";
const MAX_RECENT = 5;

export function getRecentSearches(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENT_SEARCHES_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export function addRecentSearch(query: string) {
  if (typeof window === "undefined") return;
  const trimmed = query.trim();
  if (!trimmed) return;
  const next = [trimmed, ...getRecentSearches().filter((s) => s.toLowerCase() !== trimmed.toLowerCase())].slice(
    0,
    MAX_RECENT,
  );
  window.localStorage.setItem(RECENT_SEARCHES_KEY, JSON.stringify(next));
}

export function clearRecentSearches() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(RECENT_SEARCHES_KEY);
}
