"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

export function StepIndicator({
  steps,
  currentIndex,
}: {
  steps: string[];
  currentIndex: number;
}) {
  return (
    <ol className="mb-10 flex items-start" aria-label="Booking progress">
      {steps.map((step, i) => {
        const isComplete = i < currentIndex;
        const isCurrent = i === currentIndex;
        return (
          <li key={step} className="flex flex-1 flex-col items-center last:flex-none">
            <div className="flex w-full items-center">
              <span
                aria-current={isCurrent ? "step" : undefined}
                className={cn(
                  "grid h-9 w-9 shrink-0 place-items-center rounded-full border-2 text-[13px] font-bold transition-colors duration-300",
                  isComplete && "border-[#17438F] bg-[#17438F] text-white",
                  isCurrent && "border-[#17438F] bg-white text-[#17438F]",
                  !isComplete && !isCurrent && "border-[#D8E2EE] bg-white text-[#9AA9BD]",
                )}
              >
                {isComplete ? <Check className="h-4 w-4" /> : i + 1}
              </span>
              {i < steps.length - 1 && (
                <span className="mx-1 h-[2px] flex-1 bg-[#D8E2EE]">
                  <span
                    className="block h-full bg-[#17438F] transition-all duration-500"
                    style={{ width: isComplete ? "100%" : "0%" }}
                  />
                </span>
              )}
            </div>
            <span
              className={cn(
                "mt-2 hidden text-center text-[12px] font-semibold sm:block",
                isCurrent ? "text-[#17438F]" : isComplete ? "text-navy" : "text-[#9AA9BD]",
              )}
            >
              {step}
            </span>
          </li>
        );
      })}
    </ol>
  );
}
