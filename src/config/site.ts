// Phone/email fields below mirror businessConfig.primaryContact in
// src/config/business.ts — keep both in sync if these change.
export const siteConfig = {
  name: "Sarco Appliances",
  shortName: "Sarco",
  tagline: "Appliances, Delivery, Installation & Repair",
  headerTagline: "Sales • Delivery • Installation • Repair",
  phone: "(240) 576-0397",
  phoneTel: "+12405760397",
  supportPhone: "(240) 576-0397",
  supportPhoneTel: "+12405760397",
  email: "service@sarco.co",
  url: "https://sarco.co",
  socials: {
    facebook: "https://facebook.com/",
    instagram: "https://instagram.com/",
    youtube: "https://youtube.com/",
  },
  features: {
    smartHomeEnabled: true,
  },
  copyrightYear: new Date().getFullYear(),
} as const;

export type SiteConfig = typeof siteConfig;
