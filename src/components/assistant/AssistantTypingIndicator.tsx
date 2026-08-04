"use client";

import { useRetailMotion } from "@/lib/motion";
import { cn } from "@/lib/utils";

export function AssistantTypingIndicator() {
  const { shouldReduceMotion } = useRetailMotion();

  return (
    <div className="flex items-start" aria-hidden="true">
      <div className="flex items-center gap-1 rounded-2xl bg-light-blue px-4 py-3">
        <span className={cn("h-1.5 w-1.5 rounded-full bg-navy/60", !shouldReduceMotion && "animate-bounce [animation-delay:-0.2s]")} />
        <span className={cn("h-1.5 w-1.5 rounded-full bg-navy/60", !shouldReduceMotion && "animate-bounce [animation-delay:-0.1s]")} />
        <span className={cn("h-1.5 w-1.5 rounded-full bg-navy/60", !shouldReduceMotion && "animate-bounce")} />
      </div>
    </div>
  );
}
