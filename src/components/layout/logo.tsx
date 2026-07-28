import Link from "next/link";
import { siteConfig } from "@/config/site";
import { cn } from "@/lib/utils";

/**
 * Sarco mark — solid navy block with opposite rounded corners
 * and a four-point spark cut out of the center (Spichers-style).
 */
function SarcoMark({ className, color = "#10283F" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 52 56"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Outer shape + spark cutout (evenodd) */}
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        fill={color}
        d="
          M0 22
          C0 9.849 9.849 0 22 0
          H48
          C50.209 0 52 1.791 52 4
          V34
          C52 46.151 42.151 56 30 56
          H4
          C1.791 56 0 54.209 0 52
          V22
          Z
          M26 21.2
          L28.35 26.1
          L33.5 28.5
          L28.35 30.9
          L26 35.8
          L23.65 30.9
          L18.5 28.5
          L23.65 26.1
          Z
        "
      />
    </svg>
  );
}

export function Logo({
  light = false,
  compact = false,
}: {
  light?: boolean;
  compact?: boolean;
}) {
  const color = light ? "#FFFFFF" : "#10283F";

  return (
    <Link
      href="/"
      className={cn(
        "logo-animate inline-flex max-w-full shrink-0 items-center gap-3 transition-transform duration-200",
        compact && "origin-left scale-[0.92]",
      )}
      aria-label={`${siteConfig.shortName} home`}
    >
      <SarcoMark
        color={color}
        className={cn("shrink-0", compact ? "h-9 w-[34px]" : "h-11 w-[41px]")}
      />
      <span
        className={cn(
          "select-none font-extrabold uppercase leading-none tracking-[-0.05em]",
          compact ? "text-[26px]" : "text-[34px]",
          light ? "text-white" : "text-[#10283F]",
        )}
      >
        SARCO
        <sup
          className={cn(
            "ml-0.5 text-[0.28em] font-bold tracking-normal",
            light ? "text-white/70" : "text-[#10283F]/60",
          )}
        >
          TM
        </sup>
      </span>
    </Link>
  );
}
