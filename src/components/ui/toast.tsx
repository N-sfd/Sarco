"use client";

import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

export function Toast({ message }: { message: string | null }) {
  return (
    <div className="pointer-events-none fixed inset-x-0 bottom-20 z-[90] flex justify-center nav:bottom-6" aria-live="polite">
      <AnimatePresence>
        {message && (
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 12 }}
            transition={{ duration: 0.2 }}
            className="flex items-center gap-2 rounded-full bg-navy px-5 py-3 text-sm font-semibold text-white shadow-lift"
          >
            <CheckCircle2 className="h-4 w-4 shrink-0 text-success" />
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
