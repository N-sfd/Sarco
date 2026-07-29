import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";

export function RebateBar() {
  return (
    <div
      className="min-h-[42px] text-white"
      style={{
        background: "linear-gradient(90deg, #E96A50, #F07A5D)",
      }}
    >
      <PageContainer className="flex min-h-[42px] items-center justify-center gap-3 py-2 text-[14px] sm:justify-between">
        <p className="hidden font-semibold sm:block">
          Save Up to $1,000+ with Limited-Time Manufacturer Rebates on Top Brands
        </p>
        <p className="font-semibold sm:hidden">Save up to $1,000+ with limited-time rebates</p>
        <Link
          href="/rebates"
          className="group inline-flex shrink-0 items-center gap-1.5 font-bold transition-colors duration-200 hover:text-white"
        >
          Shop Rebates
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </PageContainer>
    </div>
  );
}

export const RebateAnnouncementBar = RebateBar;
