import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

type LogoVariant = "header" | "footer";

const LOGO = {
  header: { src: "/images/sarco-logo.png", width: 913, height: 524 },
  footer: { src: "/images/sarco-logo-light.png", width: 913, height: 524 },
} as const;

/**
 * Shared approved Sarco lockup (stacked S mark + SARCO wordmark).
 * Header / footer differ only by color asset and size — not geometry or type.
 */
export function Logo({
  variant = "header",
  compact = false,
  className,
}: {
  variant?: LogoVariant;
  compact?: boolean;
  className?: string;
}) {
  const asset = LOGO[variant];
  const isFooter = variant === "footer";

  return (
    <Link
      href="/"
      className={cn(
        "logo-animate inline-flex max-w-full shrink-0 items-center transition-transform duration-200",
        !isFooter && compact && "origin-left scale-[0.92]",
        isFooter ? "footer-logo" : "logo-header",
        className,
      )}
      aria-label={`${siteConfig.name} home`}
    >
      <Image
        src={asset.src}
        alt={siteConfig.name}
        width={asset.width}
        height={asset.height}
        unoptimized
        priority={!isFooter}
        draggable={false}
        className={cn(
          "h-auto w-auto max-w-full object-contain",
          isFooter
            ? "h-[58px] w-auto object-left"
            : cn("object-left", compact ? "h-11 sm:h-12" : "h-12 sm:h-14"),
        )}
      />
    </Link>
  );
}
