import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";

export function RebateBar() {
  return (
    <div
      className="h-[42px] text-white"
      style={{
        background: "linear-gradient(90deg, #E96A50, #F07A5D)",
      }}
    >
      <PageContainer className="flex h-full items-center justify-between gap-3 text-[14px]">
        <p className="truncate font-semibold">
          Save hundreds with manufacturer rebates from top appliance brands.
        </p>
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
