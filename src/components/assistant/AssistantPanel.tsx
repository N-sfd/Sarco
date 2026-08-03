"use client";

import { useEffect, useRef } from "react";
import { MessageCircle, Minus, Paperclip, Send, Trash2, X } from "lucide-react";
import { useDialog } from "@/lib/use-dialog";
import { cn } from "@/lib/utils";
import type { AssistantMessage as AssistantMessageType } from "./types";
import { AssistantMessage } from "./AssistantMessage";
import { AssistantTypingIndicator } from "./AssistantTypingIndicator";
import { AssistantQuickActions } from "./AssistantQuickActions";

type AssistantPanelProps = {
  messages: AssistantMessageType[];
  sending: boolean;
  failedIds: Set<string>;
  draft: string;
  onDraftChange: (value: string) => void;
  onSend: () => void;
  onRetry: (id: string) => void;
  onClear: () => void;
  pendingOptions: string[] | null;
  onOptionSelect: (label: string) => void;
  onClose: () => void;
  onMinimize: () => void;
};

export function AssistantPanel({
  messages,
  sending,
  failedIds,
  draft,
  onDraftChange,
  onSend,
  onRetry,
  onClear,
  pendingOptions,
  onOptionSelect,
  onClose,
  onMinimize,
}: AssistantPanelProps) {
  const dialogRef = useDialog<HTMLDivElement>(true, onClose);
  const bottomRef = useRef<HTMLDivElement>(null);
  const liveRegionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
  }, [messages, sending, pendingOptions]);

  useEffect(() => {
    const last = messages[messages.length - 1];
    if (last?.role === "assistant" && liveRegionRef.current) {
      liveRegionRef.current.textContent = last.content;
    }
  }, [messages]);

  const canSend = draft.trim().length > 0 && !sending;

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      if (canSend) onSend();
    }
  };

  const autoGrow = (e: React.FormEvent<HTMLTextAreaElement>) => {
    const el = e.currentTarget;
    el.style.height = "auto";
    el.style.height = `${Math.min(el.scrollHeight, 128)}px`;
  };

  return (
    <div
      ref={dialogRef}
      role="dialog"
      aria-label="Sarco Smart Assist"
      tabIndex={-1}
      className={cn(
        "fixed z-40 flex flex-col overflow-hidden border border-[#E1E7EE] bg-white outline-none",
        "shadow-[0_24px_70px_rgba(15,23,42,0.22)]",
        "inset-0 h-full w-full rounded-none", // phone: full screen
        // tablet (≥640px): floating card above launcher
        // (launcher: bottom-24/right-5, 52px → 96+52+12 = 160px ≈ bottom-40)
        "sm:inset-auto sm:bottom-40 sm:right-5 sm:h-[min(680px,calc(100vh-48px))] sm:w-[min(440px,calc(100vw-32px))] sm:rounded-3xl",
        // desktop (≥1320px): above desktop launcher slot
        // (launcher: bottom-8/right-8, 56px → 32+56+12 = 100px ≈ bottom-25)
        "nav:bottom-25 nav:right-8",
      )}
    >
      <div className="flex h-18 shrink-0 items-center justify-between gap-3 bg-navy px-5 text-white">
        <div className="flex min-w-0 items-center gap-3">
          <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-white/15">
            <MessageCircle className="h-5 w-5" />
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold">Sarco Smart Assist</p>
            <p className="truncate text-xs text-white/70">Online appliance and service assistant</p>
          </div>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <button type="button" aria-label="Minimize" onClick={onMinimize} className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10">
            <Minus className="h-4 w-4" />
          </button>
          <button type="button" aria-label="Close" onClick={onClose} className="grid h-11 w-11 place-items-center rounded-full hover:bg-white/10">
            <X className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="@container flex-1 overflow-y-auto bg-surface p-4">
        <div className="flex flex-col gap-4">
          {messages.map((message) => (
            <AssistantMessage key={message.id} message={message} failed={failedIds.has(message.id)} onRetry={onRetry} />
          ))}

          {sending && <AssistantTypingIndicator />}

          {pendingOptions && !sending && (
            <AssistantQuickActions options={pendingOptions} onSelect={onOptionSelect} />
          )}

          <div ref={bottomRef} />
        </div>
      </div>

      <div aria-live="polite" className="sr-only" ref={liveRegionRef} />

      <div className="shrink-0 border-t border-border bg-white p-3">
        <div className="flex items-end gap-2">
          <button
            type="button"
            disabled
            aria-label="Attach a file (coming soon)"
            title="Attachments coming soon"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full text-muted disabled:cursor-not-allowed disabled:opacity-40"
          >
            <Paperclip className="h-4 w-4" />
          </button>

          <textarea
            rows={1}
            value={draft}
            onChange={(e) => onDraftChange(e.target.value)}
            onInput={autoGrow}
            onKeyDown={handleKeyDown}
            placeholder="Ask about appliances, repairs, delivery, or installation…"
            aria-label="Message Sarco Smart Assist"
            className="max-h-32 min-h-11 flex-1 resize-none border border-border px-3 py-2 text-sm text-ink outline-none focus:border-navy"
          />

          <button
            type="button"
            onClick={onSend}
            disabled={!canSend}
            aria-label="Send message"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full bg-icon-blue text-white disabled:cursor-not-allowed disabled:opacity-40"
          >
            {sending ? (
              <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/40 border-t-white" />
            ) : (
              <Send className="h-4 w-4" />
            )}
          </button>
        </div>

        <button type="button" onClick={onClear} className="mt-2 flex min-h-11 items-center gap-1 text-xs font-medium text-muted hover:text-ink">
          <Trash2 className="h-3.5 w-3.5" />
          Clear conversation
        </button>
      </div>
    </div>
  );
}
