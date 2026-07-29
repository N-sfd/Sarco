"use client";

import Link from "next/link";
import { ChevronRight } from "lucide-react";
import type { MegaMenuItem } from "@/config/navigation";

type MegaMenuProps = {
  menu: MegaMenuItem;
};

function gridClass(menu: MegaMenuItem) {
  if (menu.type === "brands") return "mega-menu-grid mega-menu-grid--brands";
  if (menu.type === "compact" || menu.columns.length <= 2) {
    return "mega-menu-grid mega-menu-grid--compact";
  }
  return "mega-menu-grid";
}

/** Active submenu panel body — wrap with the animated `.mega-menu` shell in MainNav. */
export function MegaMenu({ menu }: MegaMenuProps) {
  const shopAllLabel =
    menu.key === "brands" ? "View All Brands" : `Shop All ${menu.label}`;

  return (
    <div
      id={`submenu-${menu.key}`}
      className="mega-menu-inner"
      role="region"
      aria-label={`${menu.label} submenu`}
    >
      <div className={gridClass(menu)}>
        {menu.columns.map((column, index) => (
          <div key={`${menu.key}-${column.title ?? index}`} className="mega-menu-column">
            {column.title ? (
              column.href ? (
                <Link href={column.href} className="mega-menu-heading">
                  {column.title}
                </Link>
              ) : (
                <h3 className="mega-menu-heading">{column.title}</h3>
              )
            ) : null}

            <ul className="mega-menu-list">
              {column.links.map((link) => (
                <li key={link.href + link.label}>
                  <Link href={link.href} className="mega-menu-link">
                    <span>{link.label}</span>
                    <ChevronRight
                      className="mega-menu-link-arrow"
                      size={14}
                      strokeWidth={2.25}
                      aria-hidden
                    />
                  </Link>
                </li>
              ))}
            </ul>

            {index === 0 ? (
              <Link href={menu.href} className="shop-all-link">
                {shopAllLabel}
                <ChevronRight size={14} strokeWidth={2.5} aria-hidden />
              </Link>
            ) : null}
          </div>
        ))}
      </div>
    </div>
  );
}
