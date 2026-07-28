"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { heroSlides } from "@/data/homepage";
import { useRetailMotion } from "@/lib/motion";

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const slide = heroSlides[index];
  const { shouldReduceMotion } = useRetailMotion();

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 8000);
    return () => window.clearInterval(id);
  }, [paused]);

  return (
    <section
      className="relative overflow-hidden bg-[#071828]"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      aria-roledescription="carousel"
      aria-label="Promotional banners"
    >
      <div className="relative h-[clamp(480px,40vw,620px)] w-full overflow-hidden">
        {/* Crossfade slides */}
        <AnimatePresence mode="sync" initial={false}>
          <motion.div
            key={`slide-layer-${index}`}
            className="absolute inset-0 overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.15 : 0.55 }}
          >
            <motion.div
              key={`hero-image-${index}`}
              className="absolute inset-[-8%] will-change-transform"
              initial={
                shouldReduceMotion ? { y: 0, scale: 1 } : { y: -20, scale: 1.06 }
              }
              animate={
                shouldReduceMotion ? { y: 0, scale: 1 } : { y: 20, scale: 1.06 }
              }
              transition={
                shouldReduceMotion
                  ? { duration: 0 }
                  : { duration: 8, ease: "linear", repeat: 0 }
              }
            >
              <Image
                src={slide.image}
                alt=""
                fill
                priority
                className="h-full w-full object-cover"
                style={{ objectPosition: "center 50%" }}
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Overlay — readable left, open right */}
        <div
          className="pointer-events-none absolute inset-0 z-[2]"
          style={{
            background:
              "linear-gradient(90deg, rgba(7, 24, 40, 0.88) 0%, rgba(7, 24, 40, 0.68) 32%, rgba(7, 24, 40, 0.28) 62%, rgba(7, 24, 40, 0.06) 100%)",
          }}
        />

        {/* Vertically centered copy */}
        <div className="pointer-events-none absolute inset-0 z-[3] flex items-center">
          <div className="page-container w-full">
            <div className="pointer-events-auto max-w-[640px] overflow-visible pl-12 text-white sm:pl-14 lg:pl-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1
                    className="max-w-[640px] overflow-visible font-bold !text-white"
                    style={{
                      fontSize: "clamp(36px, 3.6vw, 56px)",
                      fontWeight: 700,
                      lineHeight: 1.06,
                      letterSpacing: "-0.025em",
                      whiteSpace: "normal",
                      textWrap: "balance",
                    }}
                  >
                    {slide.title}
                  </h1>
                  <p className="mt-4 max-w-[500px] text-[16px] leading-[1.65] text-white/94 sm:text-[18px]">
                    {slide.text}
                  </p>
                  <Link
                    href={slide.href}
                    className="btn btn-primary mt-7 h-12 w-full rounded-[2px] px-7 text-[15px] font-bold sm:w-auto"
                  >
                    {slide.cta}
                  </Link>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          className="absolute left-5 top-1/2 z-[4] grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/40 bg-white/95 text-navy shadow-md transition hover:bg-white sm:left-7"
          onClick={() => setIndex((i) => (i - 1 + heroSlides.length) % heroSlides.length)}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          className="absolute right-5 top-1/2 z-[4] grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/40 bg-white/95 text-navy shadow-md transition hover:bg-white sm:right-7"
          onClick={() => setIndex((i) => (i + 1) % heroSlides.length)}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute bottom-5 left-1/2 z-[4] flex -translate-x-1/2 gap-2.5">
          {heroSlides.map((s, i) => (
            <button
              key={s.id}
              type="button"
              aria-label={`Go to slide ${i + 1}`}
              aria-current={i === index}
              className="h-2.5 w-2.5 rounded-full transition-colors"
              style={{
                background: i === index ? "#E96A50" : "rgba(255,255,255,0.75)",
              }}
              onClick={() => setIndex(i)}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
