import { cn } from "@/lib/utils";
import { Reveal } from "./reveal";

export function Eyebrow({ children, className }: { children: React.ReactNode; className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2 rounded-full border border-royal/20 bg-royal/5 px-4 py-1.5 text-xs font-semibold uppercase tracking-[0.18em] text-royal",
        className,
      )}
    >
      {children}
    </span>
  );
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = "center",
  className,
  light = false,
}: {
  eyebrow?: string;
  title: React.ReactNode;
  description?: string;
  align?: "center" | "left";
  className?: string;
  light?: boolean;
}) {
  return (
    <Reveal
      className={cn(
        "flex flex-col gap-4",
        align === "center" ? "items-center text-center mx-auto max-w-2xl" : "items-start text-left max-w-2xl",
        className,
      )}
    >
      {eyebrow && <Eyebrow className={light ? "border-white/25 bg-white/10 text-white/90" : ""}>{eyebrow}</Eyebrow>}
      <h2
        className={cn(
          "text-3xl sm:text-4xl lg:text-[2.75rem] font-bold leading-[1.08]",
          light ? "text-white" : "text-navy",
        )}
      >
        {title}
      </h2>
      {description && (
        <p className={cn("text-base sm:text-lg leading-relaxed", light ? "text-white/70" : "text-ink/65")}>
          {description}
        </p>
      )}
    </Reveal>
  );
}
