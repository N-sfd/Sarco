"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Truck, ClipboardCheck, PackageCheck, CalendarClock, CheckCircle2, Phone, AlertCircle } from "lucide-react";
import { useUI } from "@/lib/ui-store";
import { siteConfig } from "@/config/site";
import { DELIVERY_STAGES, EASE, getMockDeliveryStatus } from "@/lib/utils";

const stageIcons = [ClipboardCheck, PackageCheck, CalendarClock, Truck, CheckCircle2];

export function TrackDeliveryModal() {
  const { trackingOpen, trackingOrderId, closeTracking } = useUI();

  return (
    <AnimatePresence>
      {trackingOpen && <TrackingPanel initialOrderId={trackingOrderId} onClose={closeTracking} />}
    </AnimatePresence>
  );
}

// Mounted fresh each time the modal opens, so it always starts from the right state
// (pre-submitted when opened with an order id, blank otherwise) with no reset effect needed.
function TrackingPanel({ initialOrderId, onClose }: { initialOrderId: string; onClose: () => void }) {
  const [orderId, setOrderId] = useState(initialOrderId);
  const [contact, setContact] = useState("");
  const [submitted, setSubmitted] = useState(Boolean(initialOrderId));
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const status = submitted && orderId ? getMockDeliveryStatus(orderId) : null;

  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmed = orderId.trim();
    if (trimmed.length < 5) {
      setError("Enter a valid order number (at least 5 characters).");
      return;
    }
    setError(null);
    setLoading(true);
    window.setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 500);
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[90] flex items-center justify-center bg-navy/70 px-4 py-6 backdrop-blur-sm"
      onClick={onClose}
    >
      <motion.div
        initial={{ y: 24, opacity: 0, scale: 0.98 }}
        animate={{ y: 0, opacity: 1, scale: 1 }}
        exit={{ y: 16, opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.25, ease: EASE }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-lg overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-lift"
      >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-mist text-navy transition hover:bg-royal/8"
              aria-label="Close delivery tracker"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="border-b border-navy/8 bg-mist/60 px-6 py-5 sm:px-8">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-royal">
                <Truck className="h-3.5 w-3.5" /> Track My Delivery
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-navy">Where&apos;s my order?</h3>
            </div>

            <div className="px-6 py-6 sm:px-8">
              {!status ? (
                <form onSubmit={handleTrack} className="flex flex-col gap-4">
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-semibold text-navy">
                      Order number <span className="text-accent">*</span>
                    </span>
                    <input
                      required
                      value={orderId}
                      onChange={(e) => {
                        setOrderId(e.target.value);
                        setError(null);
                      }}
                      placeholder="e.g. SARCO-10294"
                      className="w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/40 transition focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20"
                    />
                  </label>
                  <label className="flex flex-col gap-1.5">
                    <span className="text-sm font-semibold text-navy">ZIP code or email</span>
                    <input
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      placeholder="21701 or jane@email.com"
                      className="w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/40 transition focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20"
                    />
                  </label>
                  {error && (
                    <p className="flex items-center gap-1.5 text-sm font-semibold text-accent">
                      <AlertCircle className="h-4 w-4 shrink-0" /> {error}
                    </p>
                  )}
                  <button
                    type="submit"
                    disabled={loading}
                    className="mt-1 flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-card transition hover:bg-accent-600 disabled:opacity-60"
                  >
                    <Truck className="h-4 w-4" /> {loading ? "Looking up order…" : "Track order"}
                  </button>
                </form>
              ) : (
                <div className="flex flex-col gap-6">
                  <div className="rounded-2xl bg-mist px-4 py-3 text-sm text-ink/70">
                    Order <span className="font-semibold text-navy">{orderId}</span> · Estimated{" "}
                    {status.stageIndex === DELIVERY_STAGES.length - 1 ? "delivered" : "arrival"}{" "}
                    <span className="font-semibold text-navy">
                      {status.eta.toLocaleDateString("en-US", { month: "short", day: "numeric" })}
                    </span>
                  </div>

                  <ol className="flex flex-col gap-0">
                    {DELIVERY_STAGES.map((stage, i) => {
                      const Icon = stageIcons[i];
                      const done = i <= status.stageIndex;
                      const current = i === status.stageIndex;
                      return (
                        <li key={stage} className="flex gap-4">
                          <div className="flex flex-col items-center">
                            <span
                              className={`grid h-10 w-10 shrink-0 place-items-center rounded-full ${
                                done ? "bg-royal text-white" : "bg-navy/10 text-navy/40"
                              } ${current ? "ring-4 ring-royal/20" : ""}`}
                            >
                              <Icon className="h-5 w-5" />
                            </span>
                            {i < DELIVERY_STAGES.length - 1 && (
                              <span className={`w-0.5 flex-1 ${i < status.stageIndex ? "bg-royal" : "bg-navy/10"}`} style={{ minHeight: "1.5rem" }} />
                            )}
                          </div>
                          <div className="pb-6">
                            <p className={`text-sm font-semibold ${done ? "text-navy" : "text-ink/40"}`}>{stage}</p>
                            {current && <p className="text-xs text-royal">Current status</p>}
                          </div>
                        </li>
                      );
                    })}
                  </ol>

                  <div className="flex flex-col gap-3 sm:flex-row">
                    <button
                      onClick={() => setSubmitted(false)}
                      className="flex-1 rounded-full border border-navy/15 px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-royal hover:text-royal"
                    >
                      Track another order
                    </button>
                    <a
                      href={`tel:${siteConfig.phoneTel}`}
                      className="flex flex-1 items-center justify-center gap-2 rounded-full bg-navy px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-600"
                    >
                      <Phone className="h-4 w-4" /> Call for help
                    </a>
                  </div>
                  <p className="text-center text-xs text-ink/40">
                    Demo tracker for preview purposes — for real order status, call {siteConfig.phone}.
                  </p>
                </div>
              )}
            </div>
      </motion.div>
    </motion.div>
  );
}
