import Link from "next/link";
import { cn } from "@/lib/utils";
import type { ComponentProps } from "react";

type Variant = "primary" | "secondary" | "accent" | "ghost" | "outline";
type Size = "sm" | "md" | "lg";

const base =
  "inline-flex items-center justify-center gap-2 font-semibold rounded-full transition-all duration-300 ease-out will-change-transform focus-visible:outline-2 focus-visible:outline-offset-2 disabled:opacity-60 disabled:pointer-events-none select-none";

const variants: Record<Variant, string> = {
  primary:
    "bg-navy text-white shadow-card hover:bg-navy-600 hover:shadow-lift hover:-translate-y-0.5 active:translate-y-0",
  secondary:
    "bg-royal text-white shadow-card hover:bg-royal-600 hover:shadow-glow hover:-translate-y-0.5 active:translate-y-0",
  accent:
    "bg-accent text-white shadow-card hover:bg-accent-600 hover:shadow-lift hover:-translate-y-0.5 active:translate-y-0",
  outline:
    "border-2 border-navy/15 bg-white/70 text-navy backdrop-blur hover:border-royal hover:text-royal hover:-translate-y-0.5",
  ghost: "text-navy hover:bg-navy/5",
};

const sizes: Record<Size, string> = {
  sm: "text-sm px-4 py-2",
  md: "text-sm px-6 py-3",
  lg: "text-base px-8 py-4",
};

type CommonProps = {
  variant?: Variant;
  size?: Size;
  className?: string;
};

export function Button({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<"button">) {
  return (
    <button
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}

export function ButtonLink({
  variant = "primary",
  size = "md",
  className,
  ...props
}: CommonProps & ComponentProps<typeof Link>) {
  return (
    <Link
      className={cn(base, variants[variant], sizes[size], className)}
      {...props}
    />
  );
}
