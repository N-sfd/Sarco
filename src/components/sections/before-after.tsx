"use client";

import Image from "next/image";
import { useCallback, useRef, useState } from "react";
import { MoveHorizontal, Sparkles, Wrench } from "lucide-react";
import { SectionHeading } from "@/components/ui/section-heading";
import { Reveal } from "@/components/ui/reveal";
import { siteImages } from "@/lib/data";

export function BeforeAfter() {
  const [pos, setPos] = useState(50);
  const containerRef = useRef<HTMLDivElement>(null);
  const dragging = useRef(false);

  const updateFromClientX = useCallback((clientX: number) => {
    const el = containerRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const pct = ((clientX - rect.left) / rect.width) * 100;
    setPos(Math.min(100, Math.max(0, pct)));
  }, []);

  return (
    <section id="before-after" className="mx-auto max-w-7xl px-5 py-16 sm:px-6 lg:px-12 lg:py-24">
      <SectionHeading
        eyebrow="Before & After"
        title="See the difference we make"
        description="Drag the slider to compare a worn-out appliance with the same unit after our expert restoration."
      />

      <Reveal className="mt-14">
        <div
          ref={containerRef}
          className="relative mx-auto aspect-[16/9] w-full max-w-4xl select-none overflow-hidden rounded-[2rem] shadow-lift"
          onMouseMove={(e) => dragging.current && updateFromClientX(e.clientX)}
          onMouseUp={() => (dragging.current = false)}
          onMouseLeave={() => (dragging.current = false)}
          onTouchMove={(e) => updateFromClientX(e.touches[0].clientX)}
        >
          {/* After (restored) */}
          <div className="absolute inset-0">
            <Image
              src={siteImages.after}
              alt="Restored refrigerator after professional repair"
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-navy/40 to-transparent" />
            <span className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-success px-3 py-1.5 text-sm font-semibold text-white shadow-card">
              <Sparkles className="h-4 w-4" /> Restored
            </span>
            <span className="absolute right-4 top-4 rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-success shadow-sm">
              AFTER
            </span>
          </div>

          {/* Before (worn) */}
          <div
            className="absolute inset-0 overflow-hidden"
            style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}
          >
            <Image
              src={siteImages.before}
              alt="Appliance needing repair"
              fill
              sizes="(max-width: 896px) 100vw, 896px"
              className="object-cover brightness-75 contrast-110 saturate-50"
            />
            <div className="absolute inset-0 bg-navy/35" />
            <span className="absolute bottom-4 left-1/2 flex -translate-x-1/2 items-center gap-1.5 rounded-full bg-white/15 px-3 py-1.5 text-sm font-semibold text-white backdrop-blur-sm">
              <Wrench className="h-4 w-4" /> Needs Repair
            </span>
            <span className="absolute left-4 top-4 rounded-full bg-black/40 px-3 py-1 text-xs font-bold text-white shadow-sm">
              BEFORE
            </span>
          </div>

          {/* Handle */}
          <div
            className="absolute inset-y-0 z-10 w-1 -translate-x-1/2 cursor-ew-resize bg-white shadow-[0_0_20px_rgba(0,0,0,0.3)]"
            style={{ left: `${pos}%` }}
            onMouseDown={() => (dragging.current = true)}
            onTouchStart={() => (dragging.current = true)}
          >
            <span className="absolute left-1/2 top-1/2 grid h-12 w-12 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full bg-white text-navy shadow-lift">
              <MoveHorizontal className="h-5 w-5" />
            </span>
          </div>

          <input
            type="range"
            min={0}
            max={100}
            value={pos}
            onChange={(e) => setPos(Number(e.target.value))}
            className="absolute bottom-3 left-1/2 z-20 w-2/3 -translate-x-1/2 accent-white opacity-0 focus-visible:opacity-100"
            aria-label="Before and after comparison slider"
          />
        </div>
      </Reveal>
    </section>
  );
}
