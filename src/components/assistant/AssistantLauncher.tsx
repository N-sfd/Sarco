"use client";

import { MessageCircle } from "lucide-react";
import { cn } from "@/lib/utils";

type AssistantLauncherProps = {
  open: boolean;
  onClick: () => void;
};

/** Clears mobile bottom nav (~56px) and carousel corner controls. */
export function AssistantLauncher({ open, onClick }: AssistantLauncherProps) {
  return (
    <button
      type="button"
      aria-label="Open Sarco Smart Assist"
      aria-expanded={open}
      onClick={onClick}
      className={cn(
        "fixed z-40 grid place-items-center rounded-full bg-icon-blue text-white",
        "shadow-lg transition-all duration-200 hover:-translate-y-1 hover:shadow-xl",
        "h-13 w-13 bottom-24 right-5",
        "nav:h-14 nav:w-14 nav:bottom-8 nav:right-8",
      )}
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}
