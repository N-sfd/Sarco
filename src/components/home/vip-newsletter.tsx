"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";

export function NewsletterSignup() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <section className="border-b border-border bg-navy text-white">
      <PageContainer className="grid gap-8 py-16 md:grid-cols-[1fr_1.1fr] md:items-center md:py-20">
        <div>
          <h2 className="text-[28px] font-bold text-white md:text-[34px]">Join Our VIP List</h2>
          <p className="mt-3 text-[15px] leading-[1.7] text-white/85 md:text-[16px]">
            Get exclusive offers, appliance rebates, local sales, and service updates.
          </p>
        </div>

        {submitted ? (
          <p className="border border-white/20 bg-white/10 p-5 text-[15px]">
            Thanks for signing up! Watch your inbox for savings and service updates.
          </p>
        ) : (
          <form
            className="grid gap-3 sm:grid-cols-2"
            onSubmit={(e) => {
              e.preventDefault();
              setSubmitted(true);
            }}
          >
            <input
              required
              name="firstName"
              placeholder="First name"
              className="input-retail h-12 border-transparent"
            />
            <input
              required
              type="email"
              name="email"
              placeholder="Email address"
              className="input-retail h-12 border-transparent"
            />
            <input
              required
              name="zip"
              placeholder="ZIP code"
              className="input-retail h-12 border-transparent"
              maxLength={10}
            />
            <button type="submit" className="btn btn-primary h-12 w-full sm:w-auto">
              Sign Up for Savings
            </button>
          </form>
        )}
      </PageContainer>
    </section>
  );
}

export const VipNewsletter = NewsletterSignup;
