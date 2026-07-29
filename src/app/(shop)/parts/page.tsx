import type { Metadata } from "next";
import Link from "next/link";
import { Phone, Wrench, MessageCircle } from "lucide-react";
import { PageContainer } from "@/components/layout/page-container";
import { siteConfig } from "@/config/site";

export const metadata: Metadata = { title: "Parts & Accessories" };

const partsGroups: { category: string; items: string[] }[] = [
  {
    category: "Refrigeration Accessories",
    items: [
      "Water Filters",
      "Ice Makers",
      "Handles",
      "Supply Lines",
      "Panel Kits",
      "Organizers",
      "Power Cords",
      "Cleaners",
    ],
  },
  {
    category: "Laundry Accessories",
    items: [
      "Pedestals",
      "Stacking Kits",
      "Washer Hoses",
      "Dryer Power Cords",
      "Dryer Vent Kits",
      "Drying Racks",
      "Detergents",
      "Appliance Cleaners",
    ],
  },
  {
    category: "Dishwasher Parts & Accessories",
    items: [
      "Installation Kits",
      "Dishwasher Hoses",
      "Power Cords",
      "Dishwasher Cleaners",
      "Replacement Racks & Parts",
    ],
  },
  {
    category: "Cooking Accessories",
    items: [
      "Griddles",
      "Knobs",
      "Grates",
      "Oven Racks",
      "Trim Kits",
      "Power Cords",
      "Gas Conversion Kits",
      "Temperature Probes",
    ],
  },
  {
    category: "Grill Accessories",
    items: ["Grill Covers", "Rotisserie Accessories", "Grill Carts", "Drip Pans", "Fuel Accessories"],
  },
];

export default function PartsPage() {
  return (
    <PageContainer className="py-8">
      <nav className="mb-4 text-xs text-muted">
        <Link href="/" className="hover:text-accent">
          Home
        </Link>
        <span className="mx-1">/</span>
        <span className="text-navy">Parts &amp; Accessories</span>
      </nav>

      <h1 className="text-2xl font-bold text-navy md:text-3xl">Parts &amp; Accessories</h1>
      <p className="mt-3 max-w-2xl text-sm text-muted md:text-base">
        This page is a curated reference of the parts and accessory categories we carry across our appliance
        lineup — it&apos;s here to help you know what to ask for, not a live, orderable parts catalog. Exact
        availability, compatibility, and pricing depend on your appliance&apos;s brand and model number, so
        our team confirms the right part with you directly rather than over a self-checkout listing.
      </p>

      <div className="mt-8 grid gap-6 md:grid-cols-2">
        {partsGroups.map((group) => (
          <div key={group.category} className="border border-border bg-white p-5">
            <h2 className="text-sm font-bold text-navy">{group.category}</h2>
            <div className="mt-3 flex flex-wrap gap-2">
              {group.items.map((item) => (
                <span
                  key={item}
                  className="bg-mist px-2.5 py-1 text-xs font-medium text-navy"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="mt-12 border border-border bg-navy p-6 text-white sm:p-8">
        <h2 className="text-lg font-bold md:text-xl">How to Order Parts</h2>
        <p className="mt-2 max-w-2xl text-sm text-white/75">
          Because the right part depends on your specific make, model, and serial number, we don&apos;t sell
          parts through this website. Instead, reach us one of these ways and we&apos;ll track down exactly
          what you need:
        </p>
        <div className="mt-6 grid gap-4 sm:grid-cols-3">
          <div className="border border-white/20 bg-white/5 p-4">
            <Phone className="h-5 w-5 text-accent-400" />
            <h3 className="mt-2 text-sm font-bold">Call Us</h3>
            <p className="mt-1 text-xs text-white/70">
              Speak with a parts specialist who can look up compatibility for your model.
            </p>
            <a
              href={`tel:${siteConfig.phoneTel}`}
              className="mt-3 inline-block text-sm font-semibold text-accent-400 hover:text-white"
            >
              {siteConfig.phone}
            </a>
          </div>
          <div className="border border-white/20 bg-white/5 p-4">
            <MessageCircle className="h-5 w-5 text-accent-400" />
            <h3 className="mt-2 text-sm font-bold">Email Us</h3>
            <p className="mt-1 text-xs text-white/70">
              Send your model number, or a photo of the part, for a fast compatibility match.
            </p>
            <a
              href={siteConfig.email ? `mailto:${siteConfig.email}` : undefined}
              className="mt-3 inline-block text-sm font-semibold text-accent-400 hover:text-white"
            >
              {siteConfig.email}
            </a>
          </div>
          <div className="border border-white/20 bg-white/5 p-4">
            <Wrench className="h-5 w-5 text-accent-400" />
            <h3 className="mt-2 text-sm font-bold">Repair-Related Parts</h3>
            <p className="mt-1 text-xs text-white/70">
              If a part is needed for a repair, schedule a service visit and your technician will source it.
            </p>
            <Link
              href="/repair/schedule"
              className="mt-3 inline-block text-sm font-semibold text-accent-400 hover:text-white"
            >
              Schedule Repair
            </Link>
          </div>
        </div>
        <div className="mt-6 flex items-center gap-2 text-xs text-white/60">
          <MessageCircle className="h-3.5 w-3.5" />
          <span>
            For anything else parts-related, our{" "}
            <Link href="/contact" className="font-semibold text-accent-400 hover:text-white">
              contact page
            </Link>{" "}
            reaches our support team directly.
          </span>
        </div>
      </div>
    </PageContainer>
  );
}
