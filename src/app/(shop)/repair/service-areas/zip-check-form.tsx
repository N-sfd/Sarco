"use client";

import { useState } from "react";
import Link from "next/link";
import { CheckCircle2, Search } from "lucide-react";

export function ZipCheckForm() {
  const [zip, setZip] = useState("");
  const [checked, setChecked] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (zip.trim().length >= 5) {
      setChecked(zip.trim());
    }
  };

  return (
    <div className="border border-border bg-surface p-5">
      <p className="text-sm font-bold text-navy">Check Coverage in Your ZIP Code</p>
      <form onSubmit={handleSubmit} className="mt-3 flex gap-2">
        <input
          required
          value={zip}
          onChange={(e) => {
            setZip(e.target.value);
            setChecked(null);
          }}
          placeholder="Enter ZIP code"
          inputMode="numeric"
          maxLength={5}
          className="input-retail"
        />
        <button type="submit" className="btn btn-accent shrink-0">
          <Search className="h-4 w-4" /> Check
        </button>
      </form>
      {checked && (
        <div className="mt-4 flex items-start gap-2 border border-success/30 bg-white p-3 text-sm text-navy">
          <CheckCircle2 className="mt-0.5 h-4 w-4 shrink-0 text-success" />
          <p>
            Great news, we service <span className="font-semibold">{checked}</span>! Ready to book a
            technician?{" "}
            <Link href="/repair/schedule" className="font-semibold text-accent hover:underline">
              Schedule a repair
            </Link>
            .
          </p>
        </div>
      )}
    </div>
  );
}
