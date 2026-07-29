"use client";

import Link from "next/link";
import { Mail, MapPin, Phone, Wrench } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { PageContainer } from "@/components/layout/page-container";
import { siteConfig } from "@/config/site";
import { businessConfig } from "@/config/business";
import { companyLinks } from "@/config/navigation";
import { useUiStore } from "@/stores/wishlist";

const shop = [
  { label: "Refrigeration", href: "/refrigeration" },
  { label: "Laundry", href: "/laundry" },
  { label: "Dishwashers", href: "/dishwashers" },
  { label: "Cooking", href: "/cooking" },
  { label: "Grills", href: "/grills" },
  { label: "Kitchen Packages", href: "/kitchen-packages" },
  { label: "Small Appliances", href: "/small-appliances" },
  { label: "Clearance", href: "/clearance" },
];

const services = [
  { label: "Appliance Repair", href: "/repair" },
  { label: "Delivery and Installation", href: "/services/delivery-installation" },
  { label: "Haul Away", href: "/services/haul-away" },
  { label: "Protection Plans", href: "/services/protection-plans" },
  { label: "Parts", href: "/parts" },
  { label: "Track Delivery", href: "/track-delivery" },
  { label: "Builder Sales", href: "/builders" },
];

const help = [
  { label: "In Stock", href: "/in-stock" },
  { label: "Sales", href: "/sales" },
  { label: "Promotions and Rebates", href: "/promotions" },
  { label: "Financing", href: "/financing" },
  { label: "Product Comparison", href: "/compare" },
  { label: "Order Status", href: "/track-delivery" },
  { label: "Return Policy", href: "/returns" },
];

export function SiteFooter() {
  const setServiceModalOpen = useUiStore((s) => s.setServiceModalOpen);

  return (
    <footer className="border-t border-navy-800 bg-navy text-white">
      <PageContainer className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <FooterCol title="Shop" links={shop} />
        <FooterCol title="Services" links={services} />
        <FooterCol title="Shopping Help" links={help} />
        <FooterCol title="Company" links={companyLinks} />

        <div>
          <p className="mb-4 text-[13px] font-bold uppercase tracking-wide text-white/70">
            Contact &amp; Service Area
          </p>
          <div className="space-y-5 text-[13px] leading-relaxed text-white/80">
            <div>
              <p className="font-semibold text-white">{businessConfig.primaryContact.label}</p>
              <a href={businessConfig.primaryContact.phoneHref} className="flex items-center gap-1.5 hover:text-white">
                <Phone className="h-3.5 w-3.5 shrink-0" /> {businessConfig.primaryContact.phoneDisplay}
              </a>
              <a href={businessConfig.primaryContact.emailHref} className="flex items-center gap-1.5 hover:text-white">
                <Mail className="h-3.5 w-3.5 shrink-0" /> {businessConfig.primaryContact.email}
              </a>
              <p className="flex items-start gap-1.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {businessConfig.primaryContact.addressLines.join(", ")}
              </p>
              <button
                type="button"
                onClick={() => setServiceModalOpen(true)}
                className="mt-1 inline-block text-accent-400 hover:underline"
              >
                Check Service Availability
              </button>
              <Link href="/repair/schedule" className="mt-1 flex items-center gap-1.5 text-accent-400 hover:underline">
                <Wrench className="h-3.5 w-3.5 shrink-0" /> Schedule Repair
              </Link>
            </div>

            <div>
              <p className="font-semibold text-white">{businessConfig.ashburnOffice.label}</p>
              <a href={businessConfig.ashburnOffice.phoneHref} className="flex items-center gap-1.5 hover:text-white">
                <Phone className="h-3.5 w-3.5 shrink-0" /> {businessConfig.ashburnOffice.phoneDisplay}
              </a>
              <a href={businessConfig.ashburnOffice.emailHref} className="flex items-center gap-1.5 hover:text-white">
                <Mail className="h-3.5 w-3.5 shrink-0" /> {businessConfig.ashburnOffice.email}
              </a>
              <p className="flex items-start gap-1.5">
                <MapPin className="mt-0.5 h-3.5 w-3.5 shrink-0" />
                {businessConfig.ashburnOffice.addressLines.join(", ")}
              </p>
            </div>

            <p className="text-white/60">
              Sarco Appliances is currently an online sales and scheduled service business. We do not operate
              a public walk-in showroom at this time.
            </p>
          </div>
        </div>
      </PageContainer>

      <div className="border-t border-white/10">
        <PageContainer className="flex flex-col gap-4 py-6 md:flex-row md:items-center md:justify-between">
          <Logo light />
          <div className="flex flex-wrap gap-4 text-[13px]">
            <Link href={siteConfig.socials.facebook} className="hover:text-accent-400">
              Facebook
            </Link>
            <Link href={siteConfig.socials.instagram} className="hover:text-accent-400">
              Instagram
            </Link>
            <Link href={siteConfig.socials.youtube} className="hover:text-accent-400">
              YouTube
            </Link>
          </div>
        </PageContainer>
      </div>

      <div className="border-t border-white/10">
        <PageContainer className="flex flex-col gap-3 py-4 text-[12px] text-white/60 md:flex-row md:items-center md:justify-between">
          <p>
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <p>We accept Visa, Mastercard, Amex, Discover · Special financing available</p>
          <div className="flex flex-wrap gap-3">
            <Link href="/privacy" className="hover:text-white">
              Privacy
            </Link>
            <Link href="/terms" className="hover:text-white">
              Terms
            </Link>
            <Link href="/accessibility" className="hover:text-white">
              Accessibility
            </Link>
          </div>
        </PageContainer>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: { label: string; href: string }[] }) {
  return (
    <div>
      <p className="mb-4 text-[13px] font-bold uppercase tracking-wide text-white/70">{title}</p>
      <ul className="space-y-2">
        {links.map((link) => (
          <li key={link.href}>
            <Link href={link.href} className="text-[14px] text-white/80 hover:text-white">
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
