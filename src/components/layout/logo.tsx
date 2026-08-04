import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Header: full lockup PNG.
 * Footer (`light`): provided metallic S icon + same SARCO wordmark (vector text).
 */
export function Logo({
  light = false,
  compact = false,
  tagline = false,
}: {
  light?: boolean;
  compact?: boolean;
  /** Kept for call-site compatibility. */
  tagline?: boolean;
}) {
  void tagline;

  if (light) {
    return (
      <Link
        href="/"
        className="logo-animate footer-logo inline-flex max-w-full shrink-0 flex-col items-center gap-1.5 transition-transform duration-200"
        aria-label={`${siteConfig.shortName} home`}
      >
        <Image
          src="/images/sarco-mark.png"
          alt=""
          width={654}
          height={656}
          unoptimized
          draggable={false}
          className="h-10 w-auto object-contain sm:h-11"
        />
        <span className="select-none text-[13px] font-extrabold uppercase leading-none tracking-[0.2em] text-white sm:text-sm">
          SARCO
        </span>
      </Link>
    );
  }

  return (
    <Link
      href="/"
      className={cn(
        "logo-animate inline-flex max-w-full shrink-0 items-center transition-transform duration-200",
        compact && "origin-left scale-[0.92]",
      )}
      aria-label={`${siteConfig.shortName} home`}
    >
      <Image
        src="/images/sarco-logo.png"
        alt={siteConfig.name}
        width={913}
        height={524}
        unoptimized
        priority
        draggable={false}
        className={cn(
          "h-auto w-auto max-w-full object-contain object-left",
          compact ? "h-11 sm:h-12" : "h-12 sm:h-14",
        )}
      />
    </Link>
  );
}
