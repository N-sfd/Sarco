"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useCompare, useUiStore } from "@/stores/wishlist";
import { filterProducts } from "@/lib/search";
import type { Product } from "@/data/products";
import { AssistantLauncher } from "./AssistantLauncher";
import { AssistantPanel } from "./AssistantPanel";
import {
  ASSISTANT_QUICK_ACTIONS,
  APPLIANCE_TYPES,
  APPLIANCE_SEARCH_TERMS,
  ORDER_DELIVERY_OPTIONS,
  TROUBLESHOOT_QUESTIONS,
  type ActiveFlow,
  type AssistantMessage,
} from "./types";

const SESSION_KEY = "sarco-smart-assist-conversation";
const GREETING_TEXT =
  "Hi! I\u2019m Sarco Smart Assist. I can help you choose an appliance, compare products, troubleshoot basic issues, check service availability, or schedule a repair. What can I help you with today?";

const SAFETY_KEYWORDS = [
  "gas smell", "smell gas", "smell of gas", "smoke", "sparking", "spark",
  "burning smell", "electrical burning", "exposed wire", "exposed wiring",
  "water near electrical", "overheating", "overheat", "carbon monoxide", "co alarm", "co detector",
];

const SAFETY_RESPONSE = [
  "For your safety, please:",
  "1. Stop using the appliance.",
  "2. Disconnect power only if it is safe to do so.",
  "3. Leave the area for gas or carbon-monoxide concerns.",
  "4. Contact emergency services when appropriate.",
  "5. Contact Sarco Appliances for professional service.",
].join("\n");

let nextId = 1;
const newId = () => `msg-${Date.now()}-${nextId++}`;

function makeGreeting(): AssistantMessage {
  return { id: "greeting", role: "assistant", content: GREETING_TEXT, createdAt: new Date().toISOString() };
}

function loadStoredMessages(): AssistantMessage[] {
  if (typeof window === "undefined") return [makeGreeting()];
  try {
    const raw = window.sessionStorage.getItem(SESSION_KEY);
    if (!raw) return [makeGreeting()];
    const parsed = JSON.parse(raw) as AssistantMessage[];
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : [makeGreeting()];
  } catch {
    return [makeGreeting()];
  }
}

function detectSafetyRisk(text: string) {
  const t = text.toLowerCase();
  return SAFETY_KEYWORDS.some((k) => t.includes(k));
}

// Placeholder responder — replace with a real API call in a later step.
async function getAssistantReply(userText: string): Promise<string> {
  await new Promise((resolve) => setTimeout(resolve, 900 + Math.random() * 600));
  if (Math.random() < 0.15) throw new Error("network");
  return `Thanks \u2014 I'll help with "${userText}" once I'm connected to live data.`;
}

export function AiAssistant() {
  const router = useRouter();
  const setServiceModalOpen = useUiStore((s) => s.setServiceModalOpen);
  const compareToggle = useCompare((s) => s.toggle);
  const compareHas = useCompare((s) => s.has);

  const [open, setOpen] = useState(false);
  const [minimized, setMinimized] = useState(false);
  const [draft, setDraft] = useState("");
  const [messages, setMessages] = useState<AssistantMessage[]>(loadStoredMessages);
  const [sending, setSending] = useState(false);
  const [failedIds, setFailedIds] = useState<Set<string>>(new Set());
  const [activeFlow, setActiveFlow] = useState<ActiveFlow>(null);

  useEffect(() => {
    window.sessionStorage.setItem(SESSION_KEY, JSON.stringify(messages));
  }, [messages]);

  function pushMessage(partial: Omit<AssistantMessage, "id" | "createdAt">) {
    const message: AssistantMessage = { ...partial, id: newId(), createdAt: new Date().toISOString() };
    setMessages((prev) => [...prev, message]);
    return message;
  }

  async function requestReply(userText: string, userMessageId: string) {
    setSending(true);
    try {
      const reply = await getAssistantReply(userText);
      setFailedIds((prev) => {
        const next = new Set(prev);
        next.delete(userMessageId);
        return next;
      });
      pushMessage({ role: "assistant", content: reply });
    } catch {
      setFailedIds((prev) => new Set(prev).add(userMessageId));
    } finally {
      setSending(false);
    }
  }

  function retry(id: string) {
    if (sending) return;
    const target = messages.find((m) => m.id === id);
    if (!target) return;
    setFailedIds((prev) => {
      const next = new Set(prev);
      next.delete(id);
      return next;
    });
    void requestReply(target.content, id);
  }

  function resolveFindAppliance(applianceType: string) {
    setActiveFlow(null);
    const term = APPLIANCE_SEARCH_TERMS[applianceType] ?? applianceType;
    const matches = filterProducts(term, 4);
    if (matches.length === 0) {
      pushMessage({
        role: "assistant",
        content: `I couldn't find matches for "${applianceType}" yet — try our full catalog search or ask our team directly.`,
      });
      return;
    }
    const shown = matches.slice(0, 3);
    pushMessage({
      role: "assistant",
      content: `Here are a few ${applianceType.toLowerCase()} options to start with:`,
      metadata: {
        action: "product-results",
        productIds: shown.map((p) => p.id),
        route: matches.length > 3 ? `/search?q=${encodeURIComponent(term)}` : undefined,
      },
    });
  }

  function resolveCompare(text: string) {
    setActiveFlow(null);
    const terms = text.split(",").map((t) => t.trim()).filter(Boolean).slice(0, 4);
    const matched = terms.map((term) => filterProducts(term, 1)[0]).filter((p): p is Product => Boolean(p));

    if (matched.length === 0) {
      pushMessage({ role: "assistant", content: "I couldn't match any of those to a product — try a model number or product name." });
      return;
    }
    matched.forEach((p) => {
      if (!compareHas(p.id)) compareToggle(p.id);
    });
    pushMessage({
      role: "assistant",
      content: `Added ${matched.length} product${matched.length > 1 ? "s" : ""} to compare:`,
      metadata: { action: "product-results", productIds: matched.map((p) => p.id), route: "/compare" },
    });
  }

  function advanceTroubleshoot() {
    const nextStep = (activeFlow?.step ?? 0) + 1;
    if (nextStep < TROUBLESHOOT_QUESTIONS.length) {
      setActiveFlow({ id: "troubleshoot", step: nextStep });
      pushMessage({ role: "assistant", content: TROUBLESHOOT_QUESTIONS[nextStep] });
      return;
    }
    setActiveFlow(null);
    pushMessage({
      role: "assistant",
      content: "Thanks \u2014 I've got what I need. A member of our service team can follow up with next steps, or you can reach us directly:",
      metadata: { action: "escalation" },
    });
  }

  function startTopLevelFlow(label: string) {
    switch (label) {
      case "Find an Appliance":
        setActiveFlow({ id: "find-appliance", step: 0 });
        pushMessage({ role: "assistant", content: "What type of appliance are you shopping for?" });
        break;
      case "Compare Products":
        setActiveFlow({ id: "compare-products", step: 0 });
        pushMessage({
          role: "assistant",
          content: "Type up to four product names, models, or SKUs separated by commas, and I'll pull them up to compare.",
        });
        break;
      case "Troubleshoot a Problem":
        setActiveFlow({ id: "troubleshoot", step: 0 });
        pushMessage({ role: "assistant", content: TROUBLESHOOT_QUESTIONS[0] });
        break;
      case "Schedule Repair":
        pushMessage({ role: "assistant", content: "Opening our repair scheduling page\u2026", metadata: { route: "/repair/schedule" } });
        router.push("/repair/schedule");
        break;
      case "Check Service Availability":
        pushMessage({ role: "assistant", content: "Opening service availability\u2026" });
        setServiceModalOpen(true);
        break;
      case "Order and Delivery Help":
        setActiveFlow({ id: "order-delivery", step: 0 });
        pushMessage({ role: "assistant", content: "What do you need help with?" });
        break;
    }
  }

  function resolveOrderDelivery(label: string) {
    setActiveFlow(null);
    switch (label) {
      case "Track Delivery":
        pushMessage({ role: "assistant", content: "Opening delivery tracking\u2026", metadata: { route: "/track-delivery" } });
        router.push("/track-delivery");
        break;
      case "Installation Help":
        pushMessage({
          role: "assistant",
          content:
            "Our team includes trained installation technicians for most major appliance categories. Installation can be added at checkout, or our service team can confirm details for your specific appliance.",
        });
        break;
      case "Haul-Away Information":
        pushMessage({
          role: "assistant",
          content:
            "We offer haul-away of your old appliance at the time of delivery in most service areas. Let us know during checkout, or ask our team to confirm availability for your address.",
        });
        break;
      case "Contact Customer Service":
        pushMessage({ role: "assistant", content: "Here's how to reach us directly:", metadata: { action: "escalation" } });
        break;
    }
  }

  function handleOptionSelect(label: string) {
    pushMessage({ role: "user", content: label });
    if (activeFlow === null) {
      startTopLevelFlow(label);
      return;
    }
    if (activeFlow.id === "find-appliance") {
      resolveFindAppliance(label);
      return;
    }
    if (activeFlow.id === "order-delivery") {
      resolveOrderDelivery(label);
    }
  }

  function send(text: string) {
    const trimmed = text.trim();
    if (!trimmed || sending) return;

    const userMessage = pushMessage({ role: "user", content: trimmed });

    if (detectSafetyRisk(trimmed)) {
      setActiveFlow(null);
      pushMessage({ role: "assistant", content: SAFETY_RESPONSE, metadata: { action: "escalation" } });
      return;
    }

    if (activeFlow?.id === "troubleshoot") {
      advanceTroubleshoot();
      return;
    }
    if (activeFlow?.id === "compare-products") {
      resolveCompare(trimmed);
      return;
    }

    void requestReply(trimmed, userMessage.id);
  }

  function clear() {
    setActiveFlow(null);
    setFailedIds(new Set());
    setMessages([makeGreeting()]);
  }

  const hasUserMessage = messages.some((m) => m.role === "user");
  const pendingOptions: string[] | null =
    activeFlow === null
      ? hasUserMessage
        ? null
        : [...ASSISTANT_QUICK_ACTIONS]
      : activeFlow.id === "find-appliance"
        ? [...APPLIANCE_TYPES]
        : activeFlow.id === "order-delivery"
          ? [...ORDER_DELIVERY_OPTIONS]
          : null;

  return (
    <>
      <AssistantLauncher
        open={open && !minimized}
        onClick={() => {
          setMinimized(false);
          setOpen((v) => !v);
        }}
      />
      {open && !minimized && (
        <AssistantPanel
          messages={messages}
          sending={sending}
          failedIds={failedIds}
          draft={draft}
          onDraftChange={setDraft}
          onSend={() => {
            send(draft);
            setDraft("");
          }}
          onRetry={retry}
          onClear={clear}
          pendingOptions={pendingOptions}
          onOptionSelect={handleOptionSelect}
          onClose={() => setOpen(false)}
          onMinimize={() => setMinimized(true)}
        />
      )}
    </>
  );
}
