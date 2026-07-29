import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Terms and Conditions" };

export default function TermsPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Terms and Conditions</span>
      </nav>

      <h1 className="text-2xl font-bold text-navy md:text-3xl">Terms and Conditions</h1>
      <p className="mt-2 text-xs text-muted">Last updated: January 1, 2026</p>

      <div className="mt-8 max-w-3xl space-y-8 border border-border bg-white p-6 text-sm leading-relaxed text-muted md:p-8">
        <section>
          <h2 className="text-base font-bold text-navy">Agreement to Terms</h2>
          <p className="mt-2">
            These Terms and Conditions (&quot;Terms&quot;) govern your use of the {siteConfig.name} website and the
            purchase of products and services from any {siteConfig.name} store or through our website. By using our
            site or placing an order, you agree to be bound by these Terms. If you do not agree, please do not use
            our website or services.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Use of Our Website</h2>
          <p className="mt-2">
            You agree to use our website only for lawful purposes and in a manner that does not infringe the rights
            of, or restrict or inhibit the use and enjoyment of, this site by any third party. You may not attempt
            to gain unauthorized access to any portion of the website, other accounts, or computer systems connected
            to our services.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Pricing &amp; Product Availability</h2>
          <p className="mt-2">
            We make every effort to display accurate pricing, product descriptions, and availability. However,
            errors may occasionally occur. We reserve the right to correct any pricing or typographical errors and
            to cancel or refuse any order arising from such an error, even after an order has been submitted or
            confirmed. Product availability, specifications, and images are subject to change without notice.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Orders, Delivery &amp; Installation</h2>
          <p className="mt-2">
            Estimated delivery and installation windows are provided in good faith but are not guaranteed and may be
            affected by manufacturer supply, weather, or other circumstances outside our control. Delivery and
            installation services are subject to a site inspection at time of delivery; additional charges may apply
            for services outside the standard scope (e.g., utility modifications, non-standard installations).
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Returns &amp; Warranties</h2>
          <p className="mt-2">
            Returns are subject to our posted return policy at the time of purchase. Manufacturer warranties apply
            to products as described by the manufacturer; any extended service plans purchased through {siteConfig.name} are governed by the separate terms of that plan.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Intellectual Property</h2>
          <p className="mt-2">
            All content on this website, including text, graphics, logos, and images, is the property of{" "}
            {siteConfig.name} or its licensors and is protected by applicable copyright and trademark laws. You may
            not reproduce, distribute, or create derivative works from this content without our prior written
            consent.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Limitation of Liability</h2>
          <p className="mt-2">
            To the fullest extent permitted by law, {siteConfig.name} shall not be liable for any indirect,
            incidental, special, or consequential damages arising out of or related to your use of our website or
            purchase of our products or services. Our total liability for any claim shall not exceed the amount you
            paid for the product or service giving rise to the claim.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Governing Law</h2>
          <p className="mt-2">
            These Terms shall be governed by and construed in accordance with the laws of the State of Maryland,
            without regard to its conflict of law provisions.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Changes to These Terms</h2>
          <p className="mt-2">
            We may revise these Terms from time to time. The updated version will be effective as soon as it is
            posted on this page. Your continued use of our website after any changes constitutes acceptance of the
            revised Terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Contact Us</h2>
          <p className="mt-2">
            Questions about these Terms can be directed to{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-accent hover:underline">
              {siteConfig.email}
            </a>{" "}
            or {siteConfig.phone}.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
