"use client";

import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  X,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  ClipboardList,
  ShoppingBag,
  CookingPot,
  Wrench,
} from "lucide-react";
import { useUI, type QuoteItem } from "@/lib/ui-store";
import { products, kitchenPackages, services } from "@/lib/data";
import { formatCurrency, generateReference, EASE } from "@/lib/utils";

type Selectable = {
  type: QuoteItem["type"];
  id: string;
  name: string;
  meta: string;
  price?: number;
};

const TABS: { key: QuoteItem["type"]; label: string; icon: typeof ShoppingBag }[] = [
  { key: "product", label: "Products", icon: ShoppingBag },
  { key: "package", label: "Kitchen Packages", icon: CookingPot },
  { key: "service", label: "Repair Service", icon: Wrench },
];

const contactMethods = ["Phone", "Email", "Text"] as const;

function keyOf(type: QuoteItem["type"], id: string) {
  return `${type}:${id}`;
}

export function QuoteBuilderModal() {
  const { quoteOpen, quoteItem, closeQuote } = useUI();

  return (
    <AnimatePresence>
      {quoteOpen && <QuoteWizard preselect={quoteItem} onClose={closeQuote} />}
    </AnimatePresence>
  );
}

// Mounted fresh each time the modal opens, so the wizard state below always starts clean —
// no reset effect needed.
function QuoteWizard({ preselect, onClose }: { preselect: QuoteItem | null; onClose: () => void }) {
  const [step, setStep] = useState(1);
  const [tab, setTab] = useState<QuoteItem["type"]>(preselect?.type ?? "product");
  const [selected, setSelected] = useState<Set<string>>(() =>
    preselect?.id ? new Set([keyOf(preselect.type, preselect.id)]) : new Set(),
  );
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [zip, setZip] = useState("");
  const [contactMethod, setContactMethod] = useState<(typeof contactMethods)[number]>("Phone");
  const [reference, setReference] = useState("");

  const options = useMemo<Record<QuoteItem["type"], Selectable[]>>(
    () => ({
      product: products.map((p) => ({
        type: "product",
        id: p.id,
        name: p.name,
        meta: `${p.brand} • ${p.category}`,
        price: p.price,
      })),
      package: kitchenPackages.map((pkg) => ({
        type: "package",
        id: pkg.name,
        name: pkg.name,
        meta: `${pkg.brand} • ${pkg.pieces}`,
        price: pkg.from,
      })),
      service: services.map((s) => ({
        type: "service",
        id: s.name,
        name: s.name,
        meta: s.desc,
        price: s.from,
      })),
    }),
    [],
  );

  const allOptions = useMemo(() => [...options.product, ...options.package, ...options.service], [options]);
  const selectedItems = allOptions.filter((o) => selected.has(keyOf(o.type, o.id)));
  const estimatedTotal = selectedItems.reduce((sum, o) => sum + (o.price ?? 0), 0);

  function toggle(item: Selectable) {
    setSelected((prev) => {
      const next = new Set(prev);
      const k = keyOf(item.type, item.id);
      if (next.has(k)) next.delete(k);
      else next.add(k);
      return next;
    });
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setReference(generateReference("Q"));
    setStep(4);
  }

  const canContinue =
    (step === 1 && selectedItems.length > 0) || (step === 2 && Boolean(name && phone && email && zip));

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
            className="relative flex max-h-[90vh] w-full max-w-2xl flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-lift"
          >
            <button
              onClick={onClose}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-mist text-navy transition hover:bg-royal/8"
              aria-label="Close quote builder"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="border-b border-navy/8 bg-mist/60 px-6 py-5 sm:px-8">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-royal">
                <ClipboardList className="h-3.5 w-3.5" /> Request a Quote
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-navy">
                {step < 4 ? "Let's build your custom quote" : "Quote request received!"}
              </h3>

              {step < 4 && (
                <div className="mt-4 flex items-center gap-2">
                  {["Select items", "Your details", "Review"].map((label, i) => (
                    <div key={label} className="flex flex-1 items-center gap-2">
                      <span
                        className={`grid h-7 w-7 shrink-0 place-items-center rounded-full text-xs font-bold ${
                          step === i + 1
                            ? "bg-accent text-white"
                            : step > i + 1
                              ? "bg-success text-white"
                              : "bg-navy/10 text-navy/50"
                        }`}
                      >
                        {step > i + 1 ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                      </span>
                      <span className={`hidden text-xs font-semibold sm:block ${step === i + 1 ? "text-navy" : "text-ink/45"}`}>
                        {label}
                      </span>
                      {i < 2 && <span className="h-px flex-1 bg-navy/10" />}
                    </div>
                  ))}
                </div>
              )}
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              {step === 1 && (
                <div>
                  <div className="flex flex-wrap gap-2">
                    {TABS.map((t) => (
                      <button
                        key={t.key}
                        onClick={() => setTab(t.key)}
                        className={`inline-flex items-center gap-1.5 rounded-full px-4 py-2 text-sm font-semibold transition ${
                          tab === t.key
                            ? "bg-navy text-white shadow-card"
                            : "border border-navy/12 text-navy/70 hover:border-royal hover:text-royal"
                        }`}
                      >
                        <t.icon className="h-4 w-4" /> {t.label}
                      </button>
                    ))}
                  </div>

                  <div className="mt-4 grid max-h-72 gap-2 overflow-y-auto pr-1">
                    {options[tab].map((item) => {
                      const active = selected.has(keyOf(item.type, item.id));
                      return (
                        <button
                          key={keyOf(item.type, item.id)}
                          onClick={() => toggle(item)}
                          className={`flex items-center justify-between gap-3 rounded-2xl border px-4 py-3 text-left transition ${
                            active ? "border-royal bg-royal/5" : "border-navy/10 hover:border-royal/40"
                          }`}
                        >
                          <span>
                            <span className="block text-sm font-semibold text-navy">{item.name}</span>
                            <span className="block text-xs text-ink/55">{item.meta}</span>
                          </span>
                          <span className="flex shrink-0 items-center gap-3">
                            {item.price !== undefined && (
                              <span className="text-sm font-semibold text-navy">
                                {tab === "service" ? "from " : ""}
                                {formatCurrency(item.price)}
                              </span>
                            )}
                            <span
                              className={`grid h-5 w-5 place-items-center rounded-md border-2 ${
                                active ? "border-royal bg-royal text-white" : "border-navy/20"
                              }`}
                            >
                              {active && <CheckCircle2 className="h-3.5 w-3.5" />}
                            </span>
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  <div className="mt-5 flex items-center justify-between rounded-2xl bg-mist px-4 py-3">
                    <span className="text-sm font-semibold text-navy">
                      {selectedItems.length} item{selectedItems.length === 1 ? "" : "s"} selected
                    </span>
                    <span className="text-sm font-semibold text-royal">
                      Est. starting total {formatCurrency(estimatedTotal)}
                    </span>
                  </div>
                </div>
              )}

              {step === 2 && (
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                  <QField label="Full name" required>
                    <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Jane Doe" />
                  </QField>
                  <QField label="Phone" required>
                    <input required type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className={inputCls} placeholder="(555) 123-4567" />
                  </QField>
                  <QField label="Email" required>
                    <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="jane@email.com" />
                  </QField>
                  <QField label="ZIP code" required>
                    <input required inputMode="numeric" value={zip} onChange={(e) => setZip(e.target.value)} className={inputCls} placeholder="21701" />
                  </QField>
                  <QField label="Preferred contact method" className="sm:col-span-2">
                    <div className="flex gap-2">
                      {contactMethods.map((m) => (
                        <button
                          type="button"
                          key={m}
                          onClick={() => setContactMethod(m)}
                          className={`flex-1 rounded-xl border px-3 py-2.5 text-sm font-semibold transition ${
                            contactMethod === m ? "border-royal bg-royal/8 text-royal" : "border-navy/12 text-navy/60 hover:border-royal/40"
                          }`}
                        >
                          {m}
                        </button>
                      ))}
                    </div>
                  </QField>
                </div>
              )}

              {step === 3 && (
                <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                  <div>
                    <h4 className="text-sm font-semibold text-navy">Items ({selectedItems.length})</h4>
                    <ul className="mt-2 space-y-1.5">
                      {selectedItems.map((item) => (
                        <li key={keyOf(item.type, item.id)} className="flex items-center justify-between text-sm text-ink/70">
                          <span>{item.name}</span>
                          {item.price !== undefined && <span className="font-semibold text-navy">{formatCurrency(item.price)}</span>}
                        </li>
                      ))}
                      {selectedItems.length === 0 && (
                        <li className="text-sm text-ink/50">No items selected — we&apos;ll follow up to scope your needs.</li>
                      )}
                    </ul>
                  </div>
                  <div className="rounded-2xl bg-mist p-4 text-sm text-ink/70">
                    <p className="font-semibold text-navy">{name || "—"}</p>
                    <p>
                      {phone} · {email}
                    </p>
                    <p>
                      ZIP {zip} · Prefers {contactMethod}
                    </p>
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 rounded-full bg-accent px-6 py-3.5 text-sm font-semibold text-white shadow-card transition hover:bg-accent-600"
                  >
                    Submit quote request <ArrowRight className="h-4 w-4" />
                  </button>
                </form>
              )}

              {step === 4 && (
                <div className="flex flex-col items-center gap-4 py-6 text-center">
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    transition={{ type: "spring", damping: 12 }}
                    className="grid h-20 w-20 place-items-center rounded-full bg-success/12 text-success"
                  >
                    <CheckCircle2 className="h-11 w-11" />
                  </motion.span>
                  <p className="text-sm font-semibold uppercase tracking-wide text-royal">Reference {reference}</p>
                  <p className="max-w-sm text-ink/60">
                    Thanks{name ? `, ${name.split(" ")[0]}` : ""}! Our sales team will follow up by {contactMethod.toLowerCase()} within
                    one business day with your custom quote.
                  </p>
                  <button
                    onClick={onClose}
                    className="mt-1 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-600"
                  >
                    Done
                  </button>
                </div>
              )}
            </div>

            {step < 4 && (
              <div className="flex items-center justify-between gap-3 border-t border-navy/8 px-6 py-4 sm:px-8">
                <button
                  onClick={() => setStep((s) => Math.max(1, s - 1))}
                  disabled={step === 1}
                  className="inline-flex items-center gap-1.5 rounded-full border border-navy/15 px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-royal hover:text-royal disabled:pointer-events-none disabled:opacity-40"
                >
                  <ArrowLeft className="h-4 w-4" /> Back
                </button>
                {step < 3 && (
                  <button
                    onClick={() => setStep((s) => Math.min(3, s + 1))}
                    disabled={!canContinue}
                    className="inline-flex items-center gap-1.5 rounded-full bg-navy px-6 py-2.5 text-sm font-semibold text-white transition hover:bg-navy-600 disabled:pointer-events-none disabled:opacity-40"
                  >
                    Continue <ArrowRight className="h-4 w-4" />
                  </button>
                )}
              </div>
            )}
          </motion.div>
    </motion.div>
  );
}

function QField({
  label,
  children,
  required,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  required?: boolean;
  className?: string;
}) {
  return (
    <label className={`flex flex-col gap-1.5 ${className}`}>
      <span className="text-sm font-semibold text-navy">
        {label} {required && <span className="text-accent">*</span>}
      </span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/40 transition focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20";
