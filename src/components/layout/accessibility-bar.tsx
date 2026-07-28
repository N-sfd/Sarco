import Link from "next/link";
import { siteConfig } from "@/config/site";
import { PageContainer } from "@/components/layout/page-container";

export function AccessibilityBar() {
  return (
    <div className="header-compact-hide h-[30px] border-b border-[#E6EAF0] bg-[#F8F9FB] text-[12px] leading-[30px] text-[#4A5568]">
      <PageContainer className="relative flex h-full items-center justify-center">
        <p className="truncate px-4 text-center sm:px-28">
          For assistance using this website, call{" "}
          <a
            href={`tel:${siteConfig.supportPhoneTel}`}
            className="font-semibold text-[#4A5568] underline-offset-2 transition-colors duration-200 hover:text-navy hover:underline"
          >
            {siteConfig.supportPhone}
          </a>
          .
        </p>
        <Link
          href="/accessibility"
          className="absolute right-5 hidden shrink-0 text-[#4A5568] transition-colors duration-200 hover:text-navy hover:underline sm:block md:right-8 lg:right-12"
        >
          Accessibility Statement
        </Link>
      </PageContainer>
    </div>
  );
}
