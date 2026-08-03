"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight, Pause, Play } from "lucide-react";
import { heroSlides } from "@/data/homepage";
import { useRetailMotion } from "@/lib/motion";
import { useUiStore } from "@/stores/wishlist";

const OVERLAY_STRENGTH = {
  light: { start: 0.72, mid: 0.4 },
  medium: { start: 0.88, mid: 0.58 },
  strong: { start: 0.94, mid: 0.78 },
} as const;

export function HeroCarousel() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [userPaused, setUserPaused] = useState(false);
  const slide = heroSlides[index];
  const { shouldReduceMotion } = useRetailMotion();
  const setServiceModalOpen = useUiStore((s) => s.setServiceModalOpen);
  const touchStartX = useRef<number | null>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const paused = hovered || focused || userPaused || shouldReduceMotion;

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

  const overlay = OVERLAY_STRENGTH[slide.overlay];

  return (
    <section
      ref={sectionRef}
      className="hero-carousel"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      onFocus={() => setFocused(true)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setFocused(false);
      }}
      onKeyDown={onKeyDown}
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      aria-roledescription="carousel"
      aria-label="Promotional banners"
    >
      <div className="absolute inset-0 overflow-hidden">
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
                quality={90}
                className="hero-slide-image"
                style={{ objectPosition: slide.objectPosition }}
                sizes="100vw"
              />
            </motion.div>
          </motion.div>
        </AnimatePresence>

        {/* Overlay — readable left, open right; strength varies per slide */}
        <div
          className="hero-overlay"
          aria-hidden="true"
          style={
            {
              "--hero-overlay-start": overlay.start,
              "--hero-overlay-mid": overlay.mid,
            } as React.CSSProperties
          }
        />

        {/* Vertically centered copy */}
        <div className="absolute inset-0 z-[3] flex items-center">
          <div className="hero-content-container">
            <div className="hero-copy">
              <AnimatePresence mode="wait">
                <motion.div
                  key={slide.id}
                  initial={shouldReduceMotion ? false : { opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={shouldReduceMotion ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                >
                  <h1 className="hero-heading">{slide.title}</h1>
                  <p className="hero-description">{slide.text}</p>
                  <div className="hero-cta-row">
                    <Link href={slide.href} className="hero-primary-cta">
                      {slide.cta}
                    </Link>
                    {slide.secondaryCta ? (
                      slide.secondaryCta.action === "service-modal" ? (
                        <button
                          type="button"
                          className="hero-secondary-cta"
                          onClick={() => setServiceModalOpen(true)}
                        >
                          {slide.secondaryCta.label}
                        </button>
                      ) : (
                        <Link href={slide.secondaryCta.href ?? "#"} className="hero-secondary-cta">
                          {slide.secondaryCta.label}
                        </Link>
                      )
                    ) : null}
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>

        <button
          type="button"
          aria-label="Previous slide"
          className="hero-arrow hero-arrow--prev"
          onClick={prev}
        >
          <ChevronLeft className="h-5 w-5" />
        </button>
        <button
          type="button"
          aria-label="Next slide"
          className="hero-arrow hero-arrow--next"
          onClick={next}
        >
          <ChevronRight className="h-5 w-5" />
        </button>

        <div className="hero-controls">
          <button
            type="button"
            aria-label={userPaused ? "Play slideshow" : "Pause slideshow"}
            aria-pressed={userPaused}
            className="hero-pause"
            onClick={() => setUserPaused((p) => !p)}
          >
            {userPaused ? <Play className="h-3.5 w-3.5" /> : <Pause className="h-3.5 w-3.5" />}
          </button>
          <div className="hero-dots">
            {heroSlides.map((s, i) => (
              <button
                key={s.id}
                type="button"
                aria-label={`Go to slide ${i + 1}: ${s.title.replace("\n", " ")}`}
                aria-current={i === index}
                data-active={i === index ? "true" : "false"}
                className="hero-dot"
                onClick={() => goTo(i)}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
