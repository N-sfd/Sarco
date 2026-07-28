"use client";

import { useState } from "react";
import { Search, Mail, CheckCircle2 } from "lucide-react";
import { siteConfig } from "@/config/site";

const REBATE_STAGES = ["Submitted", "Processing", "Approved", "Mailed"] as const;

/** Simple deterministic string hash — same input always yields the same mock stage. */
function hashRebateInput(value: string) {
  let hash = 0;
  for (let i = 0; i < value.length; i++) {
    hash = (hash * 31 + value.charCodeAt(i)) >>> 0;
  }
  return hash % REBATE_STAGES.length;
}

export function RebateStatusLookup() {
  const [rebateId, setRebateId] = useState("");
  const [email, setEmail] = useState("");
  const [stageIndex, setStageIndex] = useState<number | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setStageIndex(hashRebateInput(`${rebateId}${email}`.trim().toUpperCase() || "REBATE"));
  };

  return (
    <div className="border border-border bg-surface p-6 sm:p-8">
      <h2 className="flex items-center gap-2 text-lg font-bold text-navy">
        <Search className="h-5 w-5 text-accent" /> Check Your Rebate Status
      </h2>
      <p className="mt-1 text-xs text-muted">
        Demo lookup for preview purposes — this tool generates a sample status from whatever you type in and
        is not connected to a real rebate processor. For real rebate questions, contact{" "}
        <a href={`mailto:${siteConfig.email}`} className="font-semibold text-navy hover:text-accent">
          {siteConfig.email}
        </a>
        .
      </p>

      <form onSubmit={handleSubmit} className="mt-4 flex flex-col gap-3 sm:flex-row">
        <input
          required
          value={rebateId}
          onChange={(e) => setRebateId(e.target.value)}
          placeholder="Rebate ID (e.g. RB-4000)"
          className="input-retail"
        />
        <input
          required
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email used at purchase"
          className="input-retail"
        />
        <button type="submit" className="btn btn-navy shrink-0">
          Check Status
        </button>
      </form>

      {stageIndex !== null && (
        <div className="mt-6">
          <div className="flex items-center gap-2">
            {REBATE_STAGES.map((stage, i) => (
              <div key={stage} className="flex flex-1 items-center gap-2">
                <span
                  className={`grid h-8 w-8 shrink-0 place-items-center text-xs font-bold ${
                    i <= stageIndex ? "bg-navy text-white" : "bg-mist text-muted"
                  }`}
                >
                  {i < stageIndex ? <CheckCircle2 className="h-4 w-4" /> : i + 1}
                </span>
                {i < REBATE_STAGES.length - 1 && (
                  <span className={`h-px flex-1 ${i < stageIndex ? "bg-navy" : "bg-border"}`} />
                )}
              </div>
            ))}
          </div>
          <div className="mt-2 flex justify-between text-[11px] font-semibold text-muted sm:text-xs">
            {REBATE_STAGES.map((stage, i) => (
              <span key={stage} className={i === stageIndex ? "text-navy" : undefined}>
                {stage}
              </span>
            ))}
          </div>
          <p className="mt-4 flex items-start gap-1.5 text-xs text-muted">
            <Mail className="mt-0.5 h-3.5 w-3.5 shrink-0" />
            Rebate <span className="font-semibold text-navy">{rebateId || "—"}</span> is currently marked{" "}
            <span className="font-semibold text-navy">{REBATE_STAGES[stageIndex]}</span> in this demo. Real
            rebate processing times vary by manufacturer, typically 6-10 weeks for mail-in rebates.
          </p>
        </div>
      )}
    </div>
  );
}
