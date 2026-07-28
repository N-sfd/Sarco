import Link from "next/link";
import { Logo } from "@/components/layout/logo";
import { PageContainer } from "@/components/layout/page-container";
import { siteConfig } from "@/config/site";
import { businessConfig } from "@/config/business";
import { stores } from "@/data/stores";

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

const company = [
  { label: "About Us", href: "/about" },
  { label: "Our Story", href: "/about/story" },
  { label: "Locations", href: "/locations" },
  { label: "Contact Us", href: "/contact" },
  { label: "Careers", href: "/careers" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Terms and Conditions", href: "/terms" },
  { label: "Accessibility", href: "/accessibility" },
];

export function SiteFooter() {
  return (
    <footer className="border-t border-navy-800 bg-navy text-white">
      <PageContainer className="grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-5">
        <FooterCol title="Shop" links={shop} />
        <FooterCol title="Services" links={services} />
        <FooterCol title="Shopping Help" links={help} />
        <FooterCol title="Company" links={company} />

        <div>
          <p className="mb-4 text-[13px] font-bold uppercase tracking-wide text-white/70">Locations</p>
          <ul className="space-y-5">
            {stores.map((store) => (
              <li key={store.id} className="text-[13px] leading-relaxed text-white/80">
                <p className="font-semibold text-white">
                  {store.city}, {store.state}
                </p>
                <p>{store.address}</p>
                <p>{store.phone}</p>
                <p>{store.hours}</p>
                <a
                  href={`https://maps.google.com/?q=${encodeURIComponent(`${store.address}, ${store.city}, ${store.state} ${store.zip}`)}`}
                  className="mt-1 inline-block text-accent-400 hover:underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Get Directions
                </a>
              </li>
            ))}
            <li className="text-[13px] leading-relaxed text-white/80">
              <p className="font-semibold text-white">{businessConfig.ashburnOffice.label}</p>
              {businessConfig.ashburnOffice.addressLines.map((line) => (
                <p key={line}>{line}</p>
              ))}
              <a href={businessConfig.ashburnOffice.phoneHref} className="block hover:text-white">
                {businessConfig.ashburnOffice.phoneDisplay}
              </a>
              <a href={businessConfig.ashburnOffice.emailHref} className="block hover:text-white">
                {businessConfig.ashburnOffice.email}
              </a>
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(businessConfig.ashburnOffice.addressLines.join(", "))}`}
                className="mt-1 inline-block text-accent-400 hover:underline"
                target="_blank"
                rel="noreferrer"
              >
                Get Directions
              </a>
            </li>
          </ul>
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
