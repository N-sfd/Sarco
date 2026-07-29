import { siteImages, checkForDuplicateImages } from "@/data/site-images";

export const heroSlides = [
  {
    id: "slide-1",
    title: "Top-Rated Appliances, Delivered & Installed Fast",
    text: "Upgrade your home with in-stock major appliances from leading brands. Enjoy local delivery, professional setup, and old unit haul-away.",
    cta: "Shop In-Stock Appliances",
    href: "/in-stock",
    image: siteImages.heroInStock,
  },
  {
    id: "slide-2",
    title: "Unlock Exclusive Rebates & Multi-Appliance Savings",
    text: "Save hundreds on premium refrigerators, laundry pairs, and kitchen packages with factory rebates and flexible financing options.",
    cta: "Shop Rebate Deals",
    href: "/rebates",
    image: siteImages.heroRefrigeration,
  },
  {
    id: "slide-3",
    title: "Your Local Appliance Experts — From Purchase to Repair",
    text: "Factory-trained technicians ready to install, service, and maintain your home appliances with reliable local care.",
    cta: "Schedule Repair Service",
    href: "/repair/schedule",
    image: siteImages.heroRepair,
  },
];

export const serviceCards = [
  {
    title: "Delivery & Installation",
    description: "Professional delivery, connection, testing, and installation.",
    href: "/services/delivery-installation",
    image: siteImages.serviceDelivery,
  },
  {
    title: "Haul Away",
    description: "Remove and responsibly dispose of the customer’s old appliance.",
    href: "/services/haul-away",
    image: siteImages.serviceHaulAway,
  },
  {
    title: "Appliance Repair",
    description: "Factory-trained technicians providing appliance diagnosis and repair.",
    href: "/repair",
    image: siteImages.serviceRepair,
  },
  {
    title: "Extended Protection",
    description: "Protection plans covering appliances beyond the manufacturer warranty.",
    href: "/services/protection-plans",
    image: siteImages.serviceProtection,
  },
];

export const shopCategories = [
  { title: "Refrigeration", href: "/refrigeration", image: siteImages.categoryRefrigeration },
  { title: "Cooking", href: "/cooking", image: siteImages.categoryCooking },
  { title: "Dishwashers", href: "/dishwashers", image: siteImages.categoryDishwashers },
  { title: "Laundry", href: "/laundry", image: siteImages.categoryLaundry },
  { title: "Kitchen Packages", href: "/kitchen-packages", image: siteImages.categoryKitchenPackages },
  { title: "Grills", href: "/grills", image: siteImages.categoryGrills },
  { title: "Small Appliances", href: "/small-appliances", image: siteImages.categorySmallAppliances },
  { title: "Clearance", href: "/clearance", image: siteImages.categoryClearance },
];

checkForDuplicateImages();

export const reviews = [
  {
    name: "Marcus R.",
    rating: 5,
    text: "Bought a French door fridge and had it delivered the next day. Install was clean and the team hauled away our old unit.",
    source: "Google",
    verified: true,
  },
  {
    name: "Priya S.",
    rating: 5,
    text: "Financing was straightforward and the laundry pair we chose was in stock and delivered within days.",
    source: "Google",
    verified: true,
  },
  {
    name: "David C.",
    rating: 5,
    text: "Same-week dishwasher repair. Technician explained the issue, fixed it on the first visit, and left everything spotless.",
    source: "Yelp",
    verified: true,
  },
  {
    name: "Emily N.",
    rating: 5,
    text: "Great kitchen package pricing and the builder desk helped us coordinate delivery for our remodel.",
    source: "Facebook",
    verified: true,
  },
  {
    name: "James W.",
    rating: 5,
    text: "Price match on a Bosch range and professional installation. Exactly what a local appliance store should be.",
    source: "Google",
    verified: true,
  },
  {
    name: "Sofia M.",
    rating: 5,
    text: "Delivery tracking made scheduling easy. Appliance arrived on time and worked perfectly.",
    source: "Google",
    verified: true,
  },
  {
    name: "Alan T.",
    rating: 4,
    text: "Solid selection of in-stock laundry. Staff knew the models and helped us compare features without pressure.",
    source: "Yelp",
    verified: true,
  },
  {
    name: "Rachel K.",
    rating: 5,
    text: "Scheduled oven repair online in minutes. Clear communication and fair diagnostic fee.",
    source: "Google",
    verified: true,
  },
];

export const promotions = [
  { title: "Manufacturer Rebates", desc: "Save hundreds with brand rebates on select packages.", href: "/rebates" },
  { title: "Kitchen Bundle Savings", desc: "Extra savings when you buy 3+ kitchen appliances.", href: "/kitchen-packages" },
  { title: "Laundry Event", desc: "Special pricing on washers, dryers, and pairs.", href: "/laundry" },
  { title: "0% Financing Promo", desc: "12-month special financing with approved credit.", href: "/financing" },
  { title: "Clearance Floor Models", desc: "Select floor models marked down for quick delivery.", href: "/clearance" },
  { title: "Protection Plan Bonus", desc: "Discounted extended protection with qualifying purchases.", href: "/services/protection-plans" },
];

export const repairServices = [
  "Refrigerator Repair",
  "Freezer Repair",
  "Washer Repair",
  "Dryer Repair",
  "Dishwasher Repair",
  "Range Repair",
  "Oven Repair",
  "Cooktop Repair",
  "Microwave Repair",
  "Ice Maker Repair",
  "Wine Cooler Repair",
  "Garbage Disposal Repair",
];

export const popularSearches = [
  "French door refrigerator",
  "Front load washer",
  "Gas range",
  "Dishwasher installation",
  "Kitchen packages",
  "Same-day repair",
];
