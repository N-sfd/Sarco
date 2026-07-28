import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Privacy Policy" };

export default function PrivacyPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Privacy Policy</span>
      </nav>

      <h1 className="text-2xl font-bold text-navy md:text-3xl">Privacy Policy</h1>
      <p className="mt-2 text-xs text-muted">Last updated: January 1, 2026</p>

      <div className="mt-8 max-w-3xl space-y-8 border border-border bg-white p-6 text-sm leading-relaxed text-muted md:p-8">
        <section>
          <h2 className="text-base font-bold text-navy">Introduction</h2>
          <p className="mt-2">
            {siteConfig.name} (&quot;we,&quot; &quot;us,&quot; or &quot;our&quot;) respects your privacy and is
            committed to protecting the personal information you share with us. This Privacy Policy explains what
            information we collect, how we use it, and the choices you have when you shop with us online, visit
            one of our stores, or use our repair and delivery services.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Information We Collect</h2>
          <p className="mt-2">We may collect the following categories of information:</p>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>
              <span className="font-semibold text-navy">Contact information</span> — name, mailing address, email
              address, and phone number provided when you create an account, place an order, or contact us.
            </li>
            <li>
              <span className="font-semibold text-navy">Order and service information</span> — purchase history,
              delivery address, appliance model and serial numbers, and repair or installation service records.
            </li>
            <li>
              <span className="font-semibold text-navy">Payment information</span> — processed securely through our
              payment providers; we do not store full credit card numbers on our servers.
            </li>
            <li>
              <span className="font-semibold text-navy">Device and usage information</span> — IP address, browser
              type, pages visited, and referring URLs, collected automatically through cookies and similar
              technologies.
            </li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Cookies &amp; Similar Technologies</h2>
          <p className="mt-2">
            We use cookies and similar technologies to keep items in your cart, remember your preferred store
            location, understand how visitors use our site, and personalize the products and promotions we show
            you. You can control cookies through your browser settings; disabling cookies may limit some site
            features, such as saved carts or store preferences.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">How We Use Your Information</h2>
          <ul className="mt-2 list-disc space-y-1.5 pl-5">
            <li>To process orders, schedule delivery and installation, and coordinate repair appointments.</li>
            <li>To communicate with you about orders, service appointments, and warranty registrations.</li>
            <li>To respond to customer service inquiries and support requests.</li>
            <li>To send promotional offers and updates, where you have opted in to receive them.</li>
            <li>To improve our website, products, and in-store experience.</li>
            <li>To comply with legal obligations and enforce our terms and conditions.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">How We Share Information</h2>
          <p className="mt-2">
            We do not sell your personal information. We may share information with trusted third parties who help
            us operate our business — including payment processors, delivery and installation partners, and
            manufacturers for warranty registration purposes — solely to fulfill the services you&apos;ve requested.
            We may also disclose information when required by law or to protect the rights, property, or safety of
            {" "}{siteConfig.name}, our customers, or others.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Your Choices</h2>
          <p className="mt-2">
            You may opt out of marketing emails at any time using the unsubscribe link included in those messages.
            You may also request access to, correction of, or deletion of your personal information by contacting
            us using the information below, subject to applicable legal requirements.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Data Security</h2>
          <p className="mt-2">
            We maintain reasonable administrative, technical, and physical safeguards designed to protect your
            personal information from unauthorized access, disclosure, alteration, or destruction. No method of
            transmission or storage is completely secure, and we cannot guarantee absolute security.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Children&apos;s Privacy</h2>
          <p className="mt-2">
            Our website and services are intended for adults and are not directed to children under the age of 13.
            We do not knowingly collect personal information from children.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Changes to This Policy</h2>
          <p className="mt-2">
            We may update this Privacy Policy from time to time to reflect changes in our practices or for legal
            reasons. The &quot;Last updated&quot; date at the top of this page reflects the most recent revision.
          </p>
        </section>

        <section>
          <h2 className="text-base font-bold text-navy">Contact Us</h2>
          <p className="mt-2">
            If you have questions about this Privacy Policy or how we handle your personal information, please
            contact us at{" "}
            <a href={`mailto:${siteConfig.email}`} className="font-semibold text-accent hover:underline">
              {siteConfig.email}
            </a>{" "}
            or call {siteConfig.phone}.
          </p>
        </section>
      </div>
    </PageContainer>
  );
}
