import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Accessibility Statement" };

export default function AccessibilityPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Accessibility Statement</span>
      </nav>

      <h1 className="text-2xl font-bold text-navy md:text-3xl">Accessibility Statement</h1>
      <p className="mt-2 text-xs text-muted">Last updated: January 1, 2026</p>

      <div className="mt-8 max-w-3xl space-y-8 border border-border bg-white p-6 text-sm leading-relaxed text-muted md:p-8">
        <section>
          <h2 className="text-base font-bold text-navy">Our Commitment</h2>
          <p className="mt-2">
            {siteConfig.name} is committed to ensuring our website is accessible to everyone, including people with
            disabilities. We are actively working to conform our site to the Web Content Accessibility Guidelines
            (WCAG) 2.1, Level AA, which help make web content more accessible for people with a wide range of
            disabilities, including visual, auditory, physical, speech, cognitive, and neurological conditions.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">What We&apos;re Doing</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>Structuring pages with semantic HTML and clear heading hierarchy for screen readers.</li>
            <li>Providing sufficient color contrast between text and background throughout the site.</li>
            <li>Ensuring interactive elements — links, buttons, and form fields — are keyboard-navigable with visible focus states.</li>
            <li>Labeling form fields and controls so assistive technologies can identify their purpose.</li>
            <li>Reviewing new pages and features against accessibility best practices before they launch.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Ongoing Effort</h2>
          <p className="mt-2">
            Accessibility is an ongoing effort, and we recognize that some areas of our website may not yet fully
            meet every guideline. We are continually testing, updating, and improving our site to remove barriers
            and provide an equal experience for all visitors.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Need Help Using This Site?</h2>
          <p className="mt-2">
            If you use assistive technology and experience any difficulty accessing information on our website, or
            if you&apos;d like to complete a purchase or repair booking by phone instead, our team is ready to help.
            For assistance using this website, call{" "}
            <a href={`tel:${siteConfig.supportPhoneTel}`} className="font-semibold text-accent hover:underline">
              {siteConfig.supportPhone}
            </a>
            .
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Feedback</h2>
          <p className="mt-2">
            We welcome your feedback on the accessibility of the {siteConfig.name} website. If you encounter an
            accessibility barrier, please let us know the web page, the nature of the issue, and your contact
            information by emailing{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-accent hover:underline">
              {siteConfig.email}
            </a>{" "}
            or calling{" "}
            <a href={`tel:${siteConfig.supportPhoneTel}`} className="font-semibold text-accent hover:underline">
              {siteConfig.supportPhone}
            </a>
            . We try to respond to accessibility feedback within a few business days.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
