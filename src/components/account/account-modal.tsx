"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, UserRound, LogOut, Package, Truck, BadgeCheck, Bell } from "lucide-react";
import { useUI } from "@/lib/ui-store";
import { products, rebates } from "@/lib/data";
import { EASE, formatCurrency, getMockDeliveryStatus } from "@/lib/utils";

const mockOrders = [
  { id: "ABC-10294", product: products[0] },
  { id: "ABC-10176", product: products[2] },
];

const savedRebateIds = [rebates[0], rebates[2]];

function nameFromEmail(email: string) {
  const local = email.split("@")[0] ?? "";
  const cleaned = local.replace(/[._\d]+/g, " ").trim();
  return cleaned
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0]!.toUpperCase() + w.slice(1))
    .join(" ") || "Friend";
}

export function AccountModal() {
  const { accountOpen, closeAccount, session, signIn, signOut, openTracking } = useUI();
  const [mode, setMode] = useState<"signin" | "create">("signin");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleSignIn(e: React.FormEvent) {
    e.preventDefault();
    signIn({ name: nameFromEmail(email), email });
    setPassword("");
  }

  function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    signIn({ name: name || nameFromEmail(email), email });
    setPassword("");
  }

  return (
    <AnimatePresence>
      {accountOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[90] flex items-center justify-center bg-navy/70 px-4 py-6 backdrop-blur-sm"
          onClick={closeAccount}
        >
          <motion.div
            initial={{ y: 24, opacity: 0, scale: 0.98 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: 16, opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.25, ease: EASE }}
            onClick={(e) => e.stopPropagation()}
            className="relative flex max-h-[90vh] w-full max-w-lg flex-col overflow-hidden rounded-[2rem] border border-white/10 bg-white shadow-lift"
          >
            <button
              onClick={closeAccount}
              className="absolute right-4 top-4 z-10 grid h-10 w-10 place-items-center rounded-full bg-mist text-navy transition hover:bg-royal/8"
              aria-label="Close account panel"
            >
              <X className="h-5 w-5" />
            </button>

            <div className="border-b border-navy/8 bg-mist/60 px-6 py-5 sm:px-8">
              <p className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.24em] text-royal">
                <UserRound className="h-3.5 w-3.5" /> My Account
              </p>
              <h3 className="mt-1 font-display text-xl font-bold text-navy">
                {session ? `Welcome back, ${session.name.split(" ")[0]}` : "Sign in to your account"}
              </h3>
            </div>

            <div className="flex-1 overflow-y-auto px-6 py-6 sm:px-8">
              {!session ? (
                <div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => setMode("signin")}
                      className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                        mode === "signin" ? "bg-navy text-white shadow-card" : "border border-navy/12 text-navy/70"
                      }`}
                    >
                      Sign In
                    </button>
                    <button
                      onClick={() => setMode("create")}
                      className={`flex-1 rounded-full px-4 py-2 text-sm font-semibold transition ${
                        mode === "create" ? "bg-navy text-white shadow-card" : "border border-navy/12 text-navy/70"
                      }`}
                    >
                      Create Account
                    </button>
                  </div>

                  {mode === "signin" ? (
                    <form onSubmit={handleSignIn} className="mt-5 flex flex-col gap-4">
                      <Field label="Email">
                        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="jane@email.com" />
                      </Field>
                      <Field label="Password">
                        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} placeholder="••••••••" />
                      </Field>
                      <button type="submit" className="mt-1 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600">
                        Sign In
                      </button>
                    </form>
                  ) : (
                    <form onSubmit={handleCreate} className="mt-5 flex flex-col gap-4">
                      <Field label="Full name">
                        <input required value={name} onChange={(e) => setName(e.target.value)} className={inputCls} placeholder="Jane Doe" />
                      </Field>
                      <Field label="Email">
                        <input required type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputCls} placeholder="jane@email.com" />
                      </Field>
                      <Field label="Password">
                        <input required type="password" value={password} onChange={(e) => setPassword(e.target.value)} className={inputCls} placeholder="••••••••" />
                      </Field>
                      <button type="submit" className="mt-1 rounded-full bg-accent px-6 py-3 text-sm font-semibold text-white transition hover:bg-accent-600">
                        Create Account
                      </button>
                    </form>
                  )}

                  <p className="mt-4 text-center text-xs text-ink/40">
                    Demo login — any email &amp; password work. Nothing is sent to a server, this only lives in your browser.
                  </p>
                </div>
              ) : (
                <div className="flex flex-col gap-6">
                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-navy/60">Order History</h4>
                    <div className="mt-3 flex flex-col gap-3">
                      {mockOrders.map(({ id, product }) => {
                        const status = getMockDeliveryStatus(id);
                        return (
                          <div key={id} className="flex items-center justify-between gap-3 rounded-2xl border border-navy/8 p-4">
                            <div className="flex items-center gap-3">
                              <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-royal/8 text-royal">
                                <Package className="h-5 w-5" />
                              </span>
                              <div>
                                <p className="text-sm font-semibold text-navy">{product.name}</p>
                                <p className="text-xs text-ink/55">
                                  Order {id} · {formatCurrency(product.price)} · {status.stage}
                                </p>
                              </div>
                            </div>
                            <button
                              onClick={() => openTracking(id)}
                              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-navy/15 px-3 py-2 text-xs font-semibold text-navy transition hover:border-royal hover:text-royal"
                            >
                              <Truck className="h-3.5 w-3.5" /> Track
                            </button>
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div>
                    <h4 className="text-sm font-semibold uppercase tracking-wide text-navy/60">Saved Rebates</h4>
                    <div className="mt-3 flex flex-col gap-3">
                      {savedRebateIds.map((rebate) => (
                        <div key={rebate.id} className="flex items-center justify-between gap-3 rounded-2xl border border-navy/8 p-4">
                          <div className="flex items-center gap-3">
                            <span className="grid h-11 w-11 shrink-0 place-items-center rounded-xl bg-success/10 text-success">
                              <BadgeCheck className="h-5 w-5" />
                            </span>
                            <div>
                              <p className="text-sm font-semibold text-navy">{rebate.title}</p>
                              <p className="text-xs text-ink/55">
                                {rebate.brand} · {rebate.amount} · Expires {rebate.expires}
                              </p>
                            </div>
                          </div>
                          <span className="inline-flex shrink-0 items-center gap-1.5 rounded-full bg-mist px-3 py-2 text-xs font-semibold text-navy/60">
                            <Bell className="h-3.5 w-3.5" /> Reminder set
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={signOut}
                    className="mt-1 inline-flex items-center justify-center gap-2 self-start rounded-full border border-navy/15 px-5 py-2.5 text-sm font-semibold text-navy transition hover:border-accent hover:text-accent"
                  >
                    <LogOut className="h-4 w-4" /> Sign Out
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-sm font-semibold text-navy">{label}</span>
      {children}
    </label>
  );
}

const inputCls =
  "w-full rounded-xl border border-navy/12 bg-white px-4 py-3 text-sm text-navy placeholder:text-ink/40 transition focus:border-royal focus:outline-none focus:ring-2 focus:ring-royal/20";
