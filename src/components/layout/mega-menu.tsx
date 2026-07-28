import Image from "next/image";
import Link from "next/link";
import type { MegaMenuItem, NavLink } from "@/data/navigation";

/** Dev-only: drops duplicate labels within a column and warns so a copy-paste repeat is caught early. */
function uniqueLinks(items: NavLink[], columnTitle: string, menuLabel: string): NavLink[] {
  const seen = new Map<string, NavLink>();
  for (const item of items) {
    const key = item.label.trim().toLowerCase();
    if (seen.has(key) && process.env.NODE_ENV !== "production") {
      console.warn(
        `Duplicate mega-menu link "${item.label}" in "${menuLabel} → ${columnTitle}"`,
      );
    }
    seen.set(key, item);
  }
  return Array.from(seen.values());
}

export function MegaMenu({ item }: { item: MegaMenuItem }) {
  return (
    <div className="absolute left-1/2 top-full z-50 w-[min(92vw,1280px)] min-w-[340px] -translate-x-1/2 rounded-b-[4px] bg-white text-ink shadow-[0_12px_32px_rgba(0,0,0,.12)]">
      <div className={`grid gap-0 ${item.promo ? "lg:grid-cols-[1fr_240px]" : ""}`}>
        <div className="grid gap-6 p-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
          {item.columns.map((col) => (
            <div key={col.title}>
              {col.href ? (
                <Link
                  href={col.href}
                  className="mb-2 block text-[13px] font-bold uppercase tracking-wide text-navy transition-colors duration-200 hover:text-accent"
                >
                  {col.title}
                </Link>
              ) : (
                <p className="mb-2 text-[13px] font-bold uppercase tracking-wide text-navy">{col.title}</p>
              )}
              <ul className="space-y-1.5">
                {uniqueLinks(col.links, col.title, item.label).map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="block text-[13px] text-muted transition-colors duration-200 hover:text-accent hover:underline"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        {item.promo && (
          <div className="relative min-h-[240px] overflow-hidden">
            <Image src={item.promo.image} alt="" fill className="object-cover" sizes="240px" />
            <div className="absolute inset-0 bg-navy/70 p-6 text-white">
              <p className="text-base font-bold">{item.promo.title}</p>
              <p className="mt-2 text-sm text-white/85">{item.promo.text}</p>
              <Link href={item.promo.href} className="btn btn-primary btn-sm mt-4">
                {item.promo.cta}
              </Link>
            </div>
          </div>
        )}
      </div>
      <div className="bg-[#F8F9FB] px-6 py-3 text-right">
        <Link
          href={item.href}
          className="text-sm font-semibold text-navy transition-colors duration-200 hover:text-accent"
        >
          Shop all {item.label} →
        </Link>
      </div>
    </div>
  );
}
