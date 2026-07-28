"use client";

import { useRef } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { ProductCard } from "@/components/catalog/product-card";
import { PageContainer } from "@/components/layout/page-container";
import { featuredProducts } from "@/data/products";

export function FeaturedProducts() {
  const scroller = useRef<HTMLDivElement>(null);

  const scroll = (dir: -1 | 1) => {
    const el = scroller.current;
    if (!el) return;
    el.scrollBy({ left: dir * (el.clientWidth * 0.85), behavior: "smooth" });
  };

  return (
    <section className="border-b border-border bg-white py-[72px]">
      <PageContainer>
        <div className="mb-10 flex items-end justify-between gap-4">
          <h2 className="text-[28px] font-bold text-navy md:text-[34px]">Featured Products</h2>
          <div className="flex items-center gap-3">
            <Link
              href="/in-stock"
              className="hidden text-[14px] font-semibold text-navy hover:text-accent hover:underline sm:inline"
            >
              View All Products →
            </Link>
            <button
              type="button"
              aria-label="Previous"
              className="btn btn-secondary btn-sm"
              onClick={() => scroll(-1)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label="Next"
              className="btn btn-secondary btn-sm"
              onClick={() => scroll(1)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
        <div
          ref={scroller}
          className="flex snap-x snap-mandatory gap-5 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
        >
          {featuredProducts.map((product, index) => (
            <div
              key={product.id}
              className="w-[85%] min-w-[280px] shrink-0 snap-start sm:w-[calc(50%-10px)] sm:min-w-0 lg:w-[calc(33.333%-14px)] xl:w-[calc(25%-15px)]"
            >
              <ProductCard product={product} index={index} animate />
            </div>
          ))}
        </div>
        <Link href="/in-stock" className="btn btn-secondary mt-6 w-full sm:hidden">
          View All Products
        </Link>
      </PageContainer>
    </section>
  );
}

export const FeaturedProductsCarousel = FeaturedProducts;
