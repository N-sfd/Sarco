"use client";

import { useState } from "react";
import { Truck } from "lucide-react";
import { useUI } from "@/lib/ui-store";

export function TrackDeliveryForm() {
  const { openTracking } = useUI();
  const [orderId, setOrderId] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    openTracking(orderId);
  };

  return (
    <form onSubmit={handleSubmit} className="border border-border bg-surface p-5">
      <label className="text-sm font-bold text-navy" htmlFor="order-id">
        Order Number
      </label>
      <div className="mt-3 flex gap-2">
        <input
          id="order-id"
          required
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          placeholder="e.g. SP-482910"
          className="input-retail"
        />
        <button type="submit" className="btn btn-accent shrink-0">
          <Truck className="h-4 w-4" /> Track
        </button>
      </div>
      <p className="mt-3 text-xs text-muted">
        Your live status will open in a pop-up window with stage-by-stage delivery progress.
      </p>
    </form>
  );
}
