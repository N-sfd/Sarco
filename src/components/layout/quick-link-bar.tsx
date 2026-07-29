import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { quickLinks } from "@/config/navigation";

export function QuickLinkBar() {
  return (
    <div className="header-compact-hide hidden h-10 bg-[#F8F9FB] nav:block">
      <PageContainer className="flex h-full items-center gap-9 text-[13px] font-semibold uppercase tracking-[0.04em] text-navy">
        {quickLinks.map((link) => (
          <Link
            key={link.href}
            href={link.href}
            className="group relative py-1 transition-colors duration-200 hover:text-accent"
          >
            {link.label}
            <span className="absolute inset-x-0 -bottom-0.5 mx-auto h-[2px] w-0 bg-accent transition-all duration-200 group-hover:w-full" />
          </Link>
        ))}
      </PageContainer>
    </div>
  );
}
