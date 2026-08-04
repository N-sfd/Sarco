// Phone/email fields below mirror businessConfig.primaryContact in
// src/config/business.ts — keep both in sync if these change.
export const siteConfig = {
  name: "Sarco Appliances",
  shortName: "Sarco",
  tagline: "Sales, Delivery, Installation & Repair",
  headerTagline: "Sales • Delivery • Installation • Repair",
  phone: "(240) 576-0397",
  phoneTel: "+12405760397",
  supportPhone: "(240) 576-0397",
  supportPhoneTel: "+12405760397",
  email: "service@sarco.co",
  url: "https://sarco.co",
  socials: {
    // Only set real profile paths (e.g. https://facebook.com/SarcoAppliances).
    // Bare platform roots are ignored by the footer.
    facebook: "",
    instagram: "",
    youtube: "",
  },
  features: {
    smartHomeEnabled: true,
  },
  copyrightYear: new Date().getFullYear(),
} as const;

export type SiteConfig = typeof siteConfig;
