"use client";

import { createContext, useCallback, useContext, useState } from "react";
import { QuoteBuilderModal } from "@/components/quote/quote-builder-modal";
import { AccountModal } from "@/components/account/account-modal";
import { TrackDeliveryModal } from "@/components/delivery/track-delivery-modal";

export type QuoteItem = {
  type: "product" | "package" | "service";
  id: string;
  name: string;
};

export type Session = { name: string; email: string };

const SESSION_KEY = "sarco_appliances_session";

type UIContextValue = {
  quoteOpen: boolean;
  quoteItem: QuoteItem | null;
  openQuote: (item?: QuoteItem) => void;
  closeQuote: () => void;

  accountOpen: boolean;
  openAccount: () => void;
  closeAccount: () => void;
  session: Session | null;
  signIn: (session: Session) => void;
  signOut: () => void;

  trackingOpen: boolean;
  trackingOrderId: string;
  openTracking: (orderId?: string) => void;
  closeTracking: () => void;
};

const UIContext = createContext<UIContextValue | null>(null);

export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) throw new Error("useUI must be used within a UIProvider");
  return ctx;
}

export function UIProvider({ children }: { children: React.ReactNode }) {
  const [quoteOpen, setQuoteOpen] = useState(false);
  const [quoteItem, setQuoteItem] = useState<QuoteItem | null>(null);

  const [accountOpen, setAccountOpen] = useState(false);
  // Lazy initializer reads localStorage directly — matches the source the browser would apply
  // before hydration, rather than syncing it in afterward with an effect.
  const [session, setSession] = useState<Session | null>(() => {
    if (typeof window === "undefined") return null;
    const raw = window.localStorage.getItem(SESSION_KEY);
    if (!raw) return null;
    try {
      return JSON.parse(raw) as Session;
    } catch {
      window.localStorage.removeItem(SESSION_KEY);
      return null;
    }
  });

  const [trackingOpen, setTrackingOpen] = useState(false);
  const [trackingOrderId, setTrackingOrderId] = useState("");

  const openQuote = useCallback((item?: QuoteItem) => {
    setQuoteItem(item ?? null);
    setQuoteOpen(true);
  }, []);
  const closeQuote = useCallback(() => setQuoteOpen(false), []);

  const openAccount = useCallback(() => setAccountOpen(true), []);
  const closeAccount = useCallback(() => setAccountOpen(false), []);

  const signIn = useCallback((next: Session) => {
    setSession(next);
    window.localStorage.setItem(SESSION_KEY, JSON.stringify(next));
  }, []);

  const signOut = useCallback(() => {
    setSession(null);
    window.localStorage.removeItem(SESSION_KEY);
  }, []);

  const openTracking = useCallback((orderId?: string) => {
    setTrackingOrderId(orderId ?? "");
    setTrackingOpen(true);
  }, []);
  const closeTracking = useCallback(() => setTrackingOpen(false), []);

  return (
    <UIContext.Provider
      value={{
        quoteOpen,
        quoteItem,
        openQuote,
        closeQuote,
        accountOpen,
        openAccount,
        closeAccount,
        session,
        signIn,
        signOut,
        trackingOpen,
        trackingOrderId,
        openTracking,
        closeTracking,
      }}
    >
      {children}
      <QuoteBuilderModal />
      <AccountModal />
      <TrackDeliveryModal />
    </UIContext.Provider>
  );
}
