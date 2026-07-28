import type { Metadata } from "next";
import Link from "next/link";
import { PageContainer } from "@/components/layout/page-container";
import { siteConfig } from "@/config/site";
import { stats } from "@/lib/data";

export const metadata: Metadata = { title: "Our Story" };

export default function OurStoryPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <Link href="/about" className="hover:text-accent">
          About Us
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Our Story</span>
      </nav>

      <h1 className="text-2xl font-bold text-navy md:text-3xl">Our Story</h1>
      <p className="mt-3 max-w-3xl text-sm text-muted md:text-base">
        A quarter-century of straight talk, fair prices, and appliances that get fixed right the first time.
      </p>

      {/* Stat strip */}
      <div className="mt-8 grid grid-cols-2 gap-4 border border-border bg-surface p-6 sm:grid-cols-4">
        {stats.map((stat) => (
          <div key={stat.label} className="text-center">
            <div className="flex items-center justify-center gap-1.5 text-2xl font-bold text-navy">
              <stat.icon className="h-5 w-5 text-accent" />
              {stat.value}
              {stat.suffix}
            </div>
            <p className="mt-1 text-xs text-muted">{stat.label}</p>
          </div>
        ))}
      </div>

      <div className="mt-10 max-w-3xl space-y-8">
        <section>
          <h2 className="text-lg font-bold text-navy">How We Started</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            {siteConfig.name} opened its doors in 2001 as a single storefront with a simple idea: sell quality
            appliances at honest prices, and stand behind every one of them with real, local repair service. No
            outsourced call centers, no vague warranties — just a small crew who knew the equipment inside and out
            and treated every customer like a neighbor, because most of them were.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy">Growing With Our Communities</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Word travels fast when you do right by people. As demand grew across the Cumberland Valley and
            Shenandoah region, we expanded from our original Hagerstown, Maryland location into Frederick,
            Martinsburg, and Winchester — four full-service showrooms today, each stocked with the major brands
            households and builders rely on, and each backed by our own delivery trucks and service vans rather
            than a subcontracted network. Every store we&apos;ve opened has been staffed by local hires, because we
            believe the best service comes from people who live in the community they serve.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy">What We Believe</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Big-box retailers can move volume, but they can&apos;t always give you a straight answer about which
            dryer will actually fit your closet, or send the same technician back if something isn&apos;t right. We
            can. Our sales floor is staffed by people who&apos;ve sold and serviced these exact machines for years,
            and our repair techs are factory-certified on the brands we carry. That combination — sales and service
            under one roof — is what has kept customers coming back to {siteConfig.name} for over two decades.
          </p>
        </section>

        <section>
          <h2 className="text-lg font-bold text-navy">Our Mission Today</h2>
          <p className="mt-2 text-sm leading-relaxed text-muted">
            Our mission hasn&apos;t changed since day one: make it easy to buy the right appliance, get it
            delivered and installed correctly, and keep it running for years to come. Whether you&apos;re
            replacing a single refrigerator or outfitting a new-construction kitchen, our team is here to help you
            get it right the first time.
          </p>
        </section>
      </div>

      <div className="mt-12 flex flex-wrap gap-3 border border-border bg-surface p-6">
        <div className="flex-1">
          <p className="text-sm font-bold text-navy">Ready to see it for yourself?</p>
          <p className="mt-1 text-xs text-muted">Visit one of our four showrooms or shop online today.</p>
        </div>
        <div className="flex flex-wrap gap-3">
          <Link href="/locations" className="btn btn-outline">
            Find a Store
          </Link>
          <Link href="/in-stock" className="btn btn-primary">
            Shop In Stock
          </Link>
        </div>
      </div>
    </PageContainer>
  );
}
