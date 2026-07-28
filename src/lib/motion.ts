"use client";

import { useReducedMotion, type Transition } from "framer-motion";

export const retailEase = [0.22, 1, 0.36, 1] as const;

export function useRetailMotion() {
  const shouldReduceMotion = useReducedMotion();

  return {
    shouldReduceMotion: !!shouldReduceMotion,
    fadeOnly: (duration = 0.35): Transition => ({
      duration: shouldReduceMotion ? 0.25 : duration,
      ease: retailEase,
    }),
  };
}

export const iconReveal = {
  hidden: { y: 24, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
    transition: { duration: 0.8, ease: retailEase },
  },
};

export const imageFromLeft = {
  hidden: { x: -42, opacity: 0, scale: 1.03 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1.03,
    transition: { duration: 1.1, ease: retailEase },
  },
};

export const imageFromRight = {
  hidden: { x: 42, opacity: 0, scale: 1.03 },
  visible: {
    x: 0,
    opacity: 1,
    scale: 1.03,
    transition: { duration: 1.1, ease: retailEase },
  },
};
