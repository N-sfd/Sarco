"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { heroSlides } from "@/data/homepage";
import { useRetailMotion } from "@/lib/motion";

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const slide = heroSlides[index];
  const { shouldReduceMotion } = useRetailMotion();
  const touchStartX = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const paused = hovered || userPaused || shouldReduceMotion;

  const goTo = (i: number) => setIndex((i + heroSlides.length) % heroSlides.length);
  const next = () => goTo(index + 1);
  const prev = () => goTo(index - 1);

  useEffect(() => {
    if (paused) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % heroSlides.length);
    }, 8000);
    return () => window.clearInterval(id);
  }, [paused]);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowLeft") {
      e.preventDefault();
      prev();
    } else if (e.key === "ArrowRight") {
      e.preventDefault();
      next();
    }
  };

  const onTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const onTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current == null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 40) {
      if (delta < 0) next();
      else prev();
    }
    touchStartX.current = null;
  };

  return (
    <section
      ref={sectionRef}
      className="relative overflow-hidden bg-[#071828]"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Promotional banners"
    >
      <div className="relative h-[clamp(500px,45vw,650px)] w-full overflow-hidden">
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
            <div className="pointer-events-auto max-w-[640px] overflow-visible pl-12 text-white sm:pl-14 lg:pl-10">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1
                    className="overflow-visible font-bold !text-white"
                    style={{
                      fontSize: "clamp(40px, 3.4vw, 58px)",
                      fontWeight: 700,
                      lineHeight: 1.05,
                      maxWidth: "620px",
                      letterSpacing: "-0.025em",
                      whiteSpace: "normal",
                      textWrap: "balance",
                    }}
                  >
                    {slide.title}
                  </h1>
                  <p
                    className="mt-4 text-white/94"
                    style={{ fontSize: "18px", lineHeight: 1.6, maxWidth: "540px" }}
                  >
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
          onClick={prev}
        >
          <ChevronLeft className="h-6 w-6" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          className="absolute right-5 top-1/2 z-[4] grid h-12 w-12 -translate-y-1/2 place-items-center border border-white/40 bg-white/95 text-navy shadow-md transition hover:bg-white sm:right-7"
          onClick={next}
        >
          <ChevronRight className="h-6 w-6" />
        </button>

        <div className="absolute bottom-5 left-1/2 z-[4] flex -translate-x-1/2 items-center gap-3">
          <button
            type="button"
            aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
            aria-pressed={userPaused}
            className="grid h-7 w-7 place-items-center rounded-full border border-white/50 bg-white/10 text-white transition hover:bg-white/20"
            onClick={() => setUserPaused((p) => !p)}
          >
            {userPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          </button>
          <div className="flex gap-2.5">
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
              onClick={() => goTo(i)}
            />
          ))}
          </div>
        </div>
      </div>
    </section>
  );
}
