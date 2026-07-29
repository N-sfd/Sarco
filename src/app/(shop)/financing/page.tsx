import type { Metadata } from "next";
import Link from "next/link";
import { Percent, Zap, ShieldCheck, CalendarClock } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { siteConfig } from "@/config/site";
import { FinancingCalculator } from "./financing-calculator";
import { FinancingApplyForm } from "./financing-apply-form";

export const metadata: Metadata = { title: "Financing" };

const features = [
  {
    icon: Percent,
    title: "0% Interest Available",
    desc: "Promotional 0% APR financing on qualifying purchases for up to 12 months.",
  },
  {
    icon: Zap,
    title: "Fast Approval",
    desc: "Apply online and get a decision in minutes, not days.",
  },
  {
    icon: ShieldCheck,
    title: "No Hidden Fees",
    desc: "The payment you see in your approval is the payment you pay. No surprise charges.",
  },
  {
    icon: CalendarClock,
    title: "Flexible Terms",
    desc: "Choose a repayment term from 6 to 36 months to fit your budget.",
  },
];

const faqs = [
  {
    q: "How do I apply for financing?",
    a: `Fill out the application in the "Apply Now" section on this page with your contact information and desired purchase amount. A financing specialist will follow up with your approval decision and available terms — you can also apply in person at any ${siteConfig.name} store.`,
  },
  {
    q: "Will applying affect my credit score?",
    a: "Checking your eligibility is a soft inquiry and does not affect your credit score. A hard inquiry only occurs if you choose to move forward with a specific financing offer.",
  },
  {
    q: "What credit score do I need to qualify?",
    a: "We work with multiple financing partners to offer options across a range of credit profiles. There's no fixed minimum score — your specific rate and terms depend on the lender's review of your application.",
  },
  {
    q: "Is the payment calculator on this page a real quote?",
    a: "No. The calculator gives a simplified, interest-free estimate (purchase amount divided by term length) so you can compare monthly payments at a glance. Your actual approved rate, term, and payment will be confirmed during the application process.",
  },
  {
    q: "Can I pay off my financing early?",
    a: "Yes. All of our financing plans allow early payoff with no prepayment penalty, and paying off a promotional 0% plan before it ends never costs you anything extra.",
  },
];

export default function FinancingPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Financing</span>
      </nav>

      {/* Hero */}
      <div className="border border-border bg-navy px-6 py-10 text-white sm:px-10 sm:py-14">
        <p className="text-xs font-bold uppercase tracking-widest text-accent-400">Financing Made Easy</p>
        <h1 className="mt-3 max-w-2xl text-3xl font-bold leading-tight md:text-4xl">
          $0 Down &amp; 12-Month Special Financing
        </h1>
        <p className="mt-4 max-w-xl text-sm text-white/75 md:text-base">
          Take home the appliances you need today with $0 down and 0% interest for up to 12 months on
          qualifying purchases. Fast approval, flexible terms, and no hidden fees — that&apos;s our promise.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link href="#calculator" className="btn btn-accent">
            Estimate My Payment
          </Link>
          <Link href="#apply" className="btn btn-outline border-white text-white hover:bg-white/10">
            Apply Now
          </Link>
        </div>
      </div>

      {/* Feature list */}
      <div className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {features.map((f) => (
          <div key={f.title} className="border border-border bg-surface p-5">
            <f.icon className="h-6 w-6 text-accent" />
            <h2 className="mt-3 text-sm font-bold text-navy">{f.title}</h2>
            <p className="mt-1 text-xs text-muted">{f.desc}</p>
          </div>
        ))}
      </div>

      {/* Calculator */}
      <section id="calculator" className="mt-12 scroll-mt-24">
        <h2 className="text-xl font-bold text-navy md:text-2xl">Estimate Your Monthly Payment</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Use the calculator below to see roughly what your monthly payment could look like on a 0%
          promotional plan.
        </p>
        <div className="mt-5">
          <FinancingCalculator />
        </div>
      </section>

      {/* Apply */}
      <section id="apply" className="mt-14 scroll-mt-24">
        <h2 className="text-xl font-bold text-navy md:text-2xl">Apply Now</h2>
        <p className="mt-2 max-w-2xl text-sm text-muted">
          Ready to get started? Submit a quick application below. This is a preview experience — no real
          credit application is transmitted. For an actual financing application, call{" "}
          <a href={`tel:${siteConfig.phoneTel}`} className="font-semibold text-navy hover:text-accent">
            {siteConfig.phone}
          </a>
          .
        </p>
        <div className="mt-5 max-w-2xl">
          <FinancingApplyForm />
        </div>
      </section>

      {/* FAQs */}
      <section id="faqs" className="mt-14 scroll-mt-24 border-t border-border pt-10">
        <h2 className="text-xl font-bold text-navy md:text-2xl">Financing FAQs</h2>
        <div className="mt-5 max-w-3xl divide-y divide-border border border-border bg-white">
          {faqs.map((item) => (
            <details key={item.q} className="group p-4">
              <summary className="cursor-pointer list-none text-sm font-bold text-navy marker:content-none">
                <span className="flex items-center justify-between gap-4">
                  {item.q}
                  <span className="shrink-0 text-muted group-open:rotate-45">+</span>
                </span>
              </summary>
              <p className="mt-2 text-sm text-muted">{item.a}</p>
            </details>
          ))}
        </div>
      </section>
    </PageContainer>
  );
}
