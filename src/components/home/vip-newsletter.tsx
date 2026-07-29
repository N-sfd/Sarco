"use client";

import { useState } from "react";
import { PageContainer } from "@/components/layout/page-container";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function NewsletterSignup() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    if (typeof email === "string" && EMAIL_PATTERN.test(email)) {
      setStatus("success");
    } else {
      setStatus("error");
    }
  };

  return (
    <section className="border-b border-border bg-navy text-white">
      <PageContainer className="grid gap-8 py-16 md:grid-cols-[1fr_1.1fr] md:items-center md:py-20">
        <div>
          <h2 className="text-[28px] font-bold text-white md:text-[34px]">
            Get Exclusive Savings & Local Appliance Rebates Delivered
          </h2>
          <p className="mt-3 text-[15px] leading-[1.7] text-white/85 md:text-[16px]">
            Sign up for VIP access to unadvertised sales, manufacturer price drops, and seasonal maintenance tips.
          </p>
        </div>

        {status === "success" ? (
          <p className="border border-white/20 bg-white/10 p-5 text-[15px]">
            Thanks for signing up! Watch your inbox for savings and service updates.
          </p>
        ) : (
          <form className="grid gap-3 sm:grid-cols-2" onSubmit={handleSubmit}>
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
              onChange={() => status === "error" && setStatus("idle")}
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
            {status === "error" && (
              <p className="text-[13px] font-semibold text-accent-400 sm:col-span-2">
                Please enter a valid email address and try again.
              </p>
            )}
          </form>
        )}
      </PageContainer>
    </section>
  );
}

export const VipNewsletter = NewsletterSignup;
