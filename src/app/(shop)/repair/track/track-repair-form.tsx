"use client";

import { useState } from "react";
import { Ticket } from "lucide-react";
import { useUI } from "@/lib/ui-store";

export function TrackRepairForm() {
  const { openTracking } = useUI();
  const [ticketId, setTicketId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openTracking(ticketId);
  };

  return (
    <form onSubmit={handleSubmit} className="border border-border bg-surface p-5">
      <label className="text-sm font-bold text-navy" htmlFor="ticket-id">
        Repair Reference or Ticket ID
      </label>
      <div className="mt-3 flex gap-2">
        <input
          id="ticket-id"
          required
          value={ticketId}
          onChange={(e) => setTicketId(e.target.value)}
          placeholder="e.g. SR-4F8K2C"
          className="input-retail"
        />
        <button type="submit" className="btn btn-accent shrink-0">
          <Ticket className="h-4 w-4" /> Track
        </button>
      </div>
      <p className="mt-3 text-xs text-muted">
        We use the same live tracker for repairs and deliveries — your status will open in a pop-up
        window.
      </p>
    </form>
  );
}
