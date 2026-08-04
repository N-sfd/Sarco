"use client";

import { useState } from "react";
import Link from "next/link";
import { ChevronDown, Mail, MapPin, Phone, Wrench } from "lucide-react";
import { Logo } from "@/components/layout/logo";
import { FacebookIcon, InstagramIcon, YoutubeIcon } from "@/components/layout/social-icons";
import { siteConfig } from "@/config/site";
import { businessConfig } from "@/config/business";
import { companyLinks, type NavLink } from "@/config/navigation";
import { useUiStore } from "@/stores/wishlist";

const shop: NavLink[] = [
  { label: "Refrigeration", href: "/refrigeration" },
  { label: "Laundry", href: "/laundry" },
  { label: "Dishwashers", href: "/dishwashers" },
  { label: "Cooking", href: "/cooking" },
  { label: "Grills", href: "/grills" },
  { label: "Kitchen Packages", href: "/kitchen-packages" },
  { label: "Small Appliances", href: "/small-appliances" },
  { label: "Clearance", href: "/clearance" },
];

const services: NavLink[] = [
  { label: "Appliance Repair", href: "/repair" },
  { label: "Delivery and Installation", href: "/services/delivery-installation" },
  { label: "Haul Away", href: "/services/haul-away" },
  { label: "Protection Plans", href: "/services/protection-plans" },
  { label: "Parts", href: "/parts" },
  { label: "Track Delivery", href: "/track-delivery" },
  { label: "Builder Sales", href: "/builders" },
];

const help: NavLink[] = [
  { label: "In Stock", href: "/in-stock" },
  { label: "Sales", href: "/sales" },
  { label: "Promotions and Rebates", href: "/promotions" },
  { label: "Financing", href: "/financing" },
  { label: "Product Comparison", href: "/compare" },
  { label: "Order Status", href: "/track-delivery" },
  { label: "Return Policy", href: "/returns" },
];

const columns = [
  { id: "shop", title: "Shop", links: shop },
  { id: "services", title: "Services", links: services },
  { id: "help", title: "Shopping Help", links: help },
  { id: "company", title: "Company", links: companyLinks },
];

/** True only for a real profile path — not bare facebook.com / youtube.com roots. */
function isRealSocialProfile(url: string | undefined | null): url is string {
  if (!url?.trim()) return false;
  try {
    const parsed = new URL(url);
    const path = parsed.pathname.replace(/\/+$/, "");
    return path.length > 0;
  } catch {
    return false;
  }
}

const socialItems = [
  {
    key: "facebook",
    href: siteConfig.socials.facebook,
    label: "Sarco Appliances on Facebook",
    Icon: FacebookIcon,
  },
  {
    key: "instagram",
    href: siteConfig.socials.instagram,
    label: "Sarco Appliances on Instagram",
    Icon: InstagramIcon,
  },
  {
    key: "youtube",
    href: siteConfig.socials.youtube,
    label: "Sarco Appliances on YouTube",
    Icon: YoutubeIcon,
  },
].filter((item) => isRealSocialProfile(item.href));

export function SiteFooter() {
  const setServiceModalOpen = useUiStore((s) => s.setServiceModalOpen);
  const [openColumn, setOpenColumn] = useState<string | null>(null);

  return (
    <footer className="border-t border-navy-800 bg-navy text-white">
      <div className="footer-main-inner">
        <div className="footer-grid">
          {columns.map((col) => {
            const isOpen = openColumn === col.id;
            return (
              <div key={col.id} className="footer-column">
                <button
                  type="button"
                  className="footer-column-trigger"
                  aria-expanded={isOpen}
                  aria-controls={`footer-panel-${col.id}`}
                  onClick={() => setOpenColumn((cur) => (cur === col.id ? null : col.id))}
                >
                  <span className="footer-column-title">{col.title}</span>
                  <ChevronDown
                    className="footer-column-chevron"
                    data-open={isOpen ? "true" : "false"}
                    size={16}
                    aria-hidden
                  />
                </button>
                <div
                  id={`footer-panel-${col.id}`}
                  className="footer-column-panel"
                  data-open={isOpen ? "true" : "false"}
                >
                  <ul className="footer-link-list">
                    {col.links.map((link) => (
                      <li key={link.href}>
                        <Link href={link.href} className="footer-link">
                          {link.label}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            );
          })}

          <div className="footer-col-contact footer-customer-service">
            <p className="footer-column-title">Contact &amp; Service Area</p>

            <div className="footer-contact-group">
              <p className="footer-contact-heading">{businessConfig.primaryContact.label}</p>
              <a href={businessConfig.primaryContact.phoneHref} className="footer-contact-row">
                <Phone className="footer-contact-icon h-4 w-4 shrink-0" aria-hidden />
                <span>{businessConfig.primaryContact.phoneDisplay}</span>
              </a>
              <a href={businessConfig.primaryContact.emailHref} className="footer-contact-row">
                <Mail className="footer-contact-icon h-4 w-4 shrink-0" aria-hidden />
                <span>{businessConfig.primaryContact.email}</span>
              </a>
              <div className="footer-contact-row">
                <MapPin className="footer-contact-icon h-4 w-4 shrink-0" aria-hidden />
                <address className="footer-address not-italic">
                  {businessConfig.primaryContact.addressLines.map((line) => (
                    <span key={line} className="block">
                      {line}
                    </span>
                  ))}
                </address>
              </div>
              <div className="footer-service-actions">
                <button
                  type="button"
                  onClick={() => setServiceModalOpen(true)}
                  className="footer-service-action"
                >
                  Check Service Availability
                </button>
                <Link href="/repair/schedule" className="footer-service-action">
                  <Wrench className="h-3.5 w-3.5 shrink-0" aria-hidden /> Schedule Repair
                </Link>
              </div>
            </div>
          </div>

          <div className="footer-col-contact footer-administrative-office">
            <p className="footer-column-title">Office &amp; Business Information</p>

            <div className="footer-contact-group footer-office-compact">
              <h3>{businessConfig.ashburnOffice.label}</h3>
              <a href={businessConfig.ashburnOffice.phoneHref} className="footer-office-line">
                {businessConfig.ashburnOffice.phoneDisplay}
              </a>
              <a href={businessConfig.ashburnOffice.emailHref} className="footer-office-line">
                {businessConfig.ashburnOffice.email}
              </a>
              <address className="footer-office-address not-italic">
                <span className="block">20130 Lakeview Center Plaza</span>
                <span className="block">Suite 400 · Ashburn, VA 20147</span>
              </address>
            </div>

            <p className="footer-business-note">
              Sarco Appliances is an online sales and scheduled-service business. We do not operate a public
              walk-in showroom.
            </p>
          </div>
        </div>
      </div>

      <div className="footer-brand-row">
        <div className="footer-brand-row-inner">
          <div className="footer-brand">
            <Logo variant="footer" />
            <p className="footer-tagline">Sales • Delivery • Installation • Repair</p>
          </div>
          {socialItems.length > 0 ? (
            <div className="social-links" aria-label="Social media">
              {socialItems.map(({ key, href, label, Icon }) => (
                <a
                  key={key}
                  href={href}
                  className="social-link"
                  aria-label={label}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      <div className="footer-legal">
        <div className="footer-legal-inner">
          <p className="footer-legal-copyright">
            © {siteConfig.copyrightYear} {siteConfig.name}. All rights reserved.
          </p>
          <p className="footer-legal-payment">
            We accept Visa, Mastercard, American Express, and Discover. Financing options available.
          </p>
          <div className="footer-legal-links">
            <Link href="/privacy">Privacy</Link>
            <span aria-hidden className="footer-legal-sep">
              ·
            </span>
            <Link href="/terms">Terms</Link>
            <span aria-hidden className="footer-legal-sep">
              ·
            </span>
            <Link href="/accessibility">Accessibility</Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
