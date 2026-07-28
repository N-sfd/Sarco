"use client";

import { useState } from "react";
import { Calculator } from "lucide-react";
import { formatCurrency } from "@/lib/utils";

export function FinancingCalculator() {
  const [amount, setAmount] = useState(2500);
  const [months, setMonths] = useState(12);
  const monthly = amount / months;

  return (
    <div className="border border-border bg-white p-6 sm:p-8">
      <div className="flex items-center gap-2 text-navy">
        <Calculator className="h-5 w-5 text-accent" />
        <h3 className="text-lg font-bold">Financing Payment Calculator</h3>
      </div>
      <p className="mt-1 text-sm text-muted">
        Drag the sliders to estimate your monthly payment. This is an estimate only — your actual rate and
        term depend on credit approval.
      </p>

      <div className="mt-6 grid gap-6 sm:grid-cols-2 sm:items-start">
        <div className="space-y-6">
          <div>
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="amount" className="font-semibold text-navy">
                Purchase amount
              </label>
              <span className="font-bold text-navy">{formatCurrency(amount)}</span>
            </div>
            <input
              id="amount"
              type="range"
              min={500}
              max={15000}
              step={100}
              value={amount}
              onChange={(e) => setAmount(Number(e.target.value))}
              className="mt-3 w-full accent-accent"
            />
            <div className="mt-1 flex justify-between text-xs text-muted">
              <span>$500</span>
              <span>$15,000</span>
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between text-sm">
              <label htmlFor="months" className="font-semibold text-navy">
                Term length
              </label>
              <span className="font-bold text-navy">{months} months</span>
            </div>
            <input
              id="months"
              type="range"
              min={6}
              max={36}
              step={6}
              value={months}
              onChange={(e) => setMonths(Number(e.target.value))}
              className="mt-3 w-full accent-navy"
            />
            <div className="mt-1 flex justify-between text-xs text-muted">
              <span>6 mo</span>
              <span>36 mo</span>
            </div>
          </div>
        </div>

        <div className="border border-border bg-surface p-5 text-center">
          <p className="text-sm font-medium text-muted">Estimated monthly payment</p>
          <p className="mt-1 text-4xl font-extrabold text-navy">
            {formatCurrency(monthly)}
            <span className="text-base font-semibold text-muted">/mo</span>
          </p>
          <p className="mt-2 text-xs font-semibold text-success">
            0% APR promotional financing available on qualifying purchases
          </p>
          <p className="mt-3 text-xs text-muted">
            {formatCurrency(amount)} over {months} months, no interest, no hidden fees.
          </p>
        </div>
      </div>
    </div>
  );
}
