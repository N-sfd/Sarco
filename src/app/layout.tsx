import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { siteConfig } from "@/config/site";
import { businessConfig } from "@/config/business";
import "./globals.css";
import { AiAssistant } from "@/components/assistant/AiAssistant";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.url),
  title: {
    default: `${siteConfig.name} | ${siteConfig.tagline}`,
    template: `%s | ${siteConfig.name}`,
  },
  description:
    "Regional appliance retailer for sales, delivery, installation, haul-away, financing, parts, and factory-trained repair. Shop in-stock appliances and kitchen packages near you.",
  keywords: [
    "appliance sales",
    "appliance repair",
    "kitchen packages",
    "appliance delivery",
    "appliance installation",
    "financing",
    "refrigerators",
    "washers",
    "dryers",
  ],
  authors: [{ name: siteConfig.name }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: siteConfig.url,
    siteName: siteConfig.name,
    title: `${siteConfig.name} | ${siteConfig.tagline}`,
    description:
      "Shop appliances, schedule delivery and installation, and book factory-trained repair — all from one local retailer.",
  },
  robots: { index: true, follow: true },
  alternates: { canonical: siteConfig.url },
};

export const viewport: Viewport = {
  themeColor: "#0f172a",
  width: "device-width",
  initialScale: 1,
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "HomeAndConstructionBusiness",
  name: siteConfig.name,
  url: siteConfig.url,
  telephone: businessConfig.primaryContact.phoneDisplay,
  email: businessConfig.primaryContact.email,
  slogan: siteConfig.tagline,
  priceRange: "$$",
  address: {
    "@type": "PostalAddress",
    streetAddress: businessConfig.primaryContact.addressLines[0],
    addressLocality: "Hagerstown",
    addressRegion: "MD",
    postalCode: "21740",
    addressCountry: "US",
  },
  areaServed: ["Maryland", "Virginia", "West Virginia", "Pennsylvania"],
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`} data-scroll-behavior="smooth">
      <body className="flex min-h-full flex-col bg-white text-ink">
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-navy focus:px-4 focus:py-2 focus:text-white"
        >
          Skip to main content
        </a>
        {children}
        <AiAssistant/>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </body>
    </html>
  );
}
