"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Star } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { reviews } from "@/data/homepage";

export function ReviewCarousel() {
  const [index, setIndex] = useState(0);
  const review = reviews[index];

  return (
    <section className="border-b border-border bg-white py-16 md:py-20">
      <PageContainer className="max-w-3xl text-center">
        <h2 className="text-[28px] font-bold text-navy md:text-[34px]">Customer Reviews</h2>
        <p className="mt-3 text-[15px] text-muted md:text-[16px]">
          See why local homeowners trust us for appliance sales, delivery, installation, and repair.
        </p>

        <div className="relative mt-10 border border-border bg-surface p-6 text-left md:p-10">
          <div className="flex text-gold">
            {Array.from({ length: review.rating }).map((_, i) => (
              <Star key={i} className="h-5 w-5 fill-current" />
            ))}
          </div>
          <p className="mt-4 text-[15px] leading-[1.7] text-ink md:text-[18px]">
            &ldquo;{review.text}&rdquo;
          </p>
          <div className="mt-5 flex flex-wrap items-center gap-2 text-[14px]">
            <span className="font-bold text-navy">{review.name}</span>
            <span className="text-muted">· {review.source}</span>
            {review.verified && (
              <span className="bg-success/10 px-2 py-1 text-[12px] font-semibold text-success">
                Verified customer
              </span>
            )}
          </div>

          <div className="mt-6 flex items-center justify-between">
            <button
              type="button"
              aria-label="Previous review"
              className="btn btn-secondary btn-sm"
              onClick={() => setIndex((i) => (i - 1 + reviews.length) % reviews.length)}
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-[13px] text-muted">
              {index + 1} / {reviews.length}
            </span>
            <button
              type="button"
              aria-label="Next review"
              className="btn btn-secondary btn-sm"
              onClick={() => setIndex((i) => (i + 1) % reviews.length)}
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>

        <Link href="/reviews" className="btn btn-secondary mt-8">
          Read More Reviews
        </Link>
      </PageContainer>
    </section>
  );
}

export const ReviewsSlider = ReviewCarousel;
