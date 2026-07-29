export const businessConfig = {
  name: "Sarco Appliances",
  tagline: "Sales • Delivery • Installation • Repair",

  primaryContact: {
    label: "Customer Service & Repair",
    phoneDisplay: "(240) 576-0397",
    phoneHref: "tel:+12405760397",
    email: "service@sarco.co",
    emailHref: "mailto:service@sarco.co",
    addressLines: [
      "1101 Opal Ct",
      "Hagerstown, MD 21740"
    ]
  },

  ashburnOffice: {
    label: "Administrative Office",
    phoneDisplay: "(703) 496-7858",
    phoneHref: "tel:+17034967858",
    email: "Rome@consultamerica.net",
    emailHref: "mailto:Rome@consultamerica.net",
    addressLines: [
      "20130 Lakeview Center Plaza",
      "Suite 400",
      "Ashburn, VA 20147"
    ]
  }
} as const;

export type BusinessConfig = typeof businessConfig;
