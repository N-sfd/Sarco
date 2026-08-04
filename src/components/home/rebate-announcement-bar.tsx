import Link from "next/link";
import { ArrowRight } from "lucide-react";

export function RebateBar() {
  return (
    <div className="rebate-bar">
      <div className="rebate-bar-inner text-[14px]">
        <p className="hidden font-semibold sm:block">
          Save Up to $1,000+ with Limited-Time Manufacturer Rebates on Top Brands
        </p>
        <p className="font-semibold sm:hidden">Save up to $1,000+ with limited-time rebates</p>
        <Link
          href="/rebates"
          className="group inline-flex shrink-0 items-center gap-1.5 font-bold text-white transition-colors duration-200 hover:text-[#38BDF8]"
        >
          Shop Rebates
          <ArrowRight className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </div>
  );
}

export const RebateAnnouncementBar = RebateBar;
