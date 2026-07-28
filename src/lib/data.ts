import type { LucideIcon } from "lucide-react";
import {
  Refrigerator,
  WashingMachine,
  Microwave,
  CookingPot,
  Wind,
  Wrench,
  Snowflake,
  Flame,
  Utensils,
  Building2,
  Package,
  ShieldCheck,
  BadgeCheck,
  Clock,
  Cog,
  BadgeDollarSign,
  Truck,
  Star,
  Zap,
  ThermometerSnowflake,
  Fan,
  Droplets,
} from "lucide-react";

/* ---------------- Featured categories ---------------- */
export type Category = {
  name: string;
  icon: LucideIcon;
  count: string;
  accent: string;
  image: string;
};

export const categories: Category[] = [
  { name: "Kitchen Appliances", icon: CookingPot, count: "480+ models", accent: "from-royal to-navy", image: "/images/cat-kitchen.jpg" },
  { name: "Laundry", icon: WashingMachine, count: "210+ models", accent: "from-accent to-accent-600", image: "/images/cat-laundry.jpg" },
  { name: "Refrigeration", icon: Refrigerator, count: "320+ models", accent: "from-royal-400 to-royal-600", image: "/images/cat-refrigeration.jpg" },
  { name: "Cooking", icon: Flame, count: "260+ models", accent: "from-accent-400 to-accent-600", image: "/images/cat-cooking.jpg" },
  { name: "Dishwashers", icon: Droplets, count: "140+ models", accent: "from-royal to-royal-600", image: "/images/cat-dishwasher.jpg" },
  { name: "Small Appliances", icon: Microwave, count: "390+ models", accent: "from-navy to-royal", image: "/images/cat-small.jpg" },
  { name: "Commercial Equipment", icon: Building2, count: "120+ models", accent: "from-navy-700 to-navy", image: "/images/cat-commercial.jpg" },
  { name: "Parts & Accessories", icon: Package, count: "5,000+ parts", accent: "from-accent to-accent-600", image: "/images/cat-parts.jpg" },
];

/* ---------------- Brands ---------------- */
export const brands: string[] = [
  "KitchenAid",
  "Whirlpool",
  "LG",
  "Samsung",
  "Bosch",
  "GE",
  "Maytag",
  "Frigidaire",
  "Electrolux",
  "Speed Queen",
  "Miele",
  "Sub-Zero",
  "Wolf",
  "Viking",
  "Café",
  "Thermador",
];

/* ---------------- Products ---------------- */
export type Product = {
  id: string;
  name: string;
  brand: string;
  category: string;
  price: number;
  compareAt?: number;
  rating: number;
  reviews: number;
  icon: LucideIcon;
  gradient: string;
  image: string;
  energyStar: boolean;
  financing: number; // per month
  badge?: string;
  warranty: string;
};

export const products: Product[] = [
  {
    id: "p1",
    name: "36\" Counter-Depth French Door Refrigerator",
    brand: "Bosch",
    category: "Refrigeration",
    price: 2699,
    compareAt: 3199,
    rating: 4.9,
    reviews: 412,
    icon: Refrigerator,
    gradient: "from-royal/15 to-navy/10",
    image: "/images/cat-refrigeration.jpg",
    energyStar: true,
    financing: 75,
    badge: "Save $500",
    warranty: "2-Yr Warranty",
  },
  {
    id: "p2",
    name: "Front Load Steam Washer 5.0 cu. ft.",
    brand: "LG",
    category: "Laundry",
    price: 1099,
    compareAt: 1349,
    rating: 4.8,
    reviews: 986,
    icon: WashingMachine,
    gradient: "from-accent/15 to-accent-600/10",
    image: "/images/product-washer.jpg",
    energyStar: true,
    financing: 46,
    badge: "Best Seller",
    warranty: "1-Yr Warranty",
  },
  {
    id: "p3",
    name: "Smart Slide-In Induction Range",
    brand: "Samsung",
    category: "Cooking",
    price: 1849,
    compareAt: 2199,
    rating: 4.9,
    reviews: 328,
    icon: Flame,
    gradient: "from-royal-400/15 to-royal-600/10",
    image: "/images/product-range.jpg",
    energyStar: true,
    financing: 62,
    badge: "New",
    warranty: "2-Yr Warranty",
  },
  {
    id: "p4",
    name: "44 dBA Panel-Ready Dishwasher",
    brand: "KitchenAid",
    category: "Dishwashers",
    price: 1249,
    compareAt: 1499,
    rating: 4.7,
    reviews: 254,
    icon: Droplets,
    gradient: "from-navy/12 to-royal/10",
    image: "/images/product-dishwasher.jpg",
    energyStar: true,
    financing: 52,
    badge: "Quiet Series",
    warranty: "2-Yr Warranty",
  },
  {
    id: "p5",
    name: "Over-the-Range Convection Microwave",
    brand: "GE",
    category: "Kitchen",
    price: 549,
    compareAt: 699,
    rating: 4.6,
    reviews: 611,
    icon: Microwave,
    gradient: "from-accent-400/15 to-accent-600/10",
    image: "/images/product-microwave.jpg",
    energyStar: false,
    financing: 24,
    badge: "Save $150",
    warranty: "1-Yr Warranty",
  },
  {
    id: "p6",
    name: "Pro 48\" Dual-Fuel Range",
    brand: "Wolf",
    category: "Cooking",
    price: 9999,
    compareAt: 11499,
    rating: 5.0,
    reviews: 88,
    icon: CookingPot,
    gradient: "from-navy-700/12 to-navy/10",
    image: "/images/product-pro-range.jpg",
    energyStar: false,
    financing: 289,
    badge: "Luxury",
    warranty: "5-Yr Warranty",
  },
  {
    id: "p7",
    name: "Top Load Commercial Washer",
    brand: "Speed Queen",
    category: "Laundry",
    price: 1399,
    rating: 4.9,
    reviews: 173,
    icon: WashingMachine,
    gradient: "from-royal/15 to-royal-600/10",
    image: "/images/product-commercial-washer.jpg",
    energyStar: true,
    financing: 58,
    badge: "10-Yr Build",
    warranty: "3-Yr Warranty",
  },
  {
    id: "p8",
    name: "Built-In 30\" Column Freezer",
    brand: "Sub-Zero",
    category: "Refrigeration",
    price: 7499,
    compareAt: 8299,
    rating: 4.9,
    reviews: 64,
    icon: ThermometerSnowflake,
    gradient: "from-royal-400/15 to-navy/10",
    image: "/images/product-freezer.jpg",
    energyStar: true,
    financing: 216,
    badge: "Save $800",
    warranty: "3-Yr Warranty",
  },
];

/* ---------------- Repair services ---------------- */
export type Service = {
  name: string;
  icon: LucideIcon;
  desc: string;
  from: number;
};

export const services: Service[] = [
  { name: "Refrigerator Repair", icon: Refrigerator, desc: "Cooling, compressors, ice buildup & leaks.", from: 89 },
  { name: "Dishwasher Repair", icon: Droplets, desc: "Drainage, spray arms, pumps & controls.", from: 79 },
  { name: "Washer Repair", icon: WashingMachine, desc: "Spin, balance, drainage & error codes.", from: 89 },
  { name: "Dryer Repair", icon: Wind, desc: "Heating elements, belts & venting.", from: 79 },
  { name: "Microwave Repair", icon: Microwave, desc: "Magnetrons, panels & turntables.", from: 69 },
  { name: "Range Repair", icon: Flame, desc: "Burners, igniters & temperature control.", from: 89 },
  { name: "Oven Repair", icon: CookingPot, desc: "Heating, sensors & self-clean cycles.", from: 89 },
  { name: "Cooktop Repair", icon: Utensils, desc: "Induction, gas & electric elements.", from: 89 },
  { name: "Ice Maker Repair", icon: Snowflake, desc: "Jams, water lines & production issues.", from: 79 },
  { name: "Garbage Disposal", icon: Cog, desc: "Jams, leaks & motor replacement.", from: 59 },
  { name: "Wine Cooler", icon: ThermometerSnowflake, desc: "Temperature zones & compressors.", from: 99 },
  { name: "Commercial Appliances", icon: Building2, desc: "Restaurant-grade equipment service.", from: 149 },
];

/* ---------------- Why choose us ---------------- */
export const whyChooseUs: { title: string; icon: LucideIcon; desc: string }[] = [
  { title: "Factory Authorized", icon: BadgeCheck, desc: "Authorized service for 30+ major brands." },
  { title: "Certified Technicians", icon: Wrench, desc: "EPA & NASTeC certified professionals." },
  { title: "Licensed & Insured", icon: ShieldCheck, desc: "Fully bonded for your protection." },
  { title: "Same-Day Service", icon: Clock, desc: "Book before noon, fixed today." },
  { title: "Genuine Parts", icon: Cog, desc: "OEM parts with manufacturer warranty." },
  { title: "Warranty Included", icon: ShieldCheck, desc: "90-day labor & parts guarantee." },
  { title: "Flexible Financing", icon: BadgeDollarSign, desc: "0% APR plans available." },
  { title: "Emergency Repairs", icon: Zap, desc: "24/7 urgent appliance response." },
  { title: "Transparent Pricing", icon: BadgeDollarSign, desc: "Upfront quotes, no surprises." },
  { title: "5-Star Reviews", icon: Star, desc: "2,100+ verified happy customers." },
];

/* ---------------- Repair process ---------------- */
export const processSteps: { step: string; title: string; desc: string; icon: LucideIcon }[] = [
  { step: "01", title: "Schedule Appointment", desc: "Book online in 60 seconds with real-time availability.", icon: Clock },
  { step: "02", title: "Diagnosis", desc: "Certified tech inspects and identifies the root cause.", icon: Wrench },
  { step: "03", title: "Quote Approval", desc: "Transparent, upfront pricing before any work begins.", icon: BadgeDollarSign },
  { step: "04", title: "Repair", desc: "Fast, expert repair using genuine OEM parts.", icon: Cog },
  { step: "05", title: "Testing", desc: "Full performance test to confirm the fix.", icon: ShieldCheck },
  { step: "06", title: "Warranty", desc: "90-day parts & labor guarantee on every job.", icon: BadgeCheck },
];

/* ---------------- Promotions ---------------- */
export const promotions: { title: string; desc: string; tag: string; icon: LucideIcon }[] = [
  { title: "Seasonal Discounts", desc: "Up to 30% off select kitchen packages.", tag: "Save 30%", icon: BadgeDollarSign },
  { title: "Trade-In Program", desc: "Get credit for your old appliance.", tag: "Up to $400", icon: Truck },
  { title: "Manufacturer Rebates", desc: "Stackable rebates on top brands.", tag: "Instant", icon: BadgeCheck },
  { title: "Extended Warranty", desc: "5-year protection plans, 50% off.", tag: "Half Off", icon: ShieldCheck },
  { title: "Financing Options", desc: "0% APR for up to 24 months.", tag: "0% APR", icon: BadgeDollarSign },
  { title: "Military Discount", desc: "Thank-you savings for service members.", tag: "10% Off", icon: ShieldCheck },
  { title: "Senior Discount", desc: "Exclusive pricing for 65+.", tag: "10% Off", icon: BadgeCheck },
  { title: "Student Discount", desc: "Verified student savings.", tag: "12% Off", icon: Star },
];

/* ---------------- Reviews ---------------- */
export type Review = {
  name: string;
  location: string;
  rating: number;
  text: string;
  source: "Google" | "Yelp" | "Facebook";
  verified: boolean;
  initials: string;
};

export const reviews: Review[] = [
  {
    name: "Marcus Reyes",
    location: "Bethesda, MD",
    rating: 5,
    text: "Same-day fridge repair and the tech explained everything. Fair price, genuine parts, and it's been running perfectly for months. Truly professional.",
    source: "Google",
    verified: true,
    initials: "MR",
  },
  {
    name: "Priya Sharma",
    location: "Arlington, VA",
    rating: 5,
    text: "Bought a full kitchen suite and the financing was effortless. Delivery and installation were seamless. Best appliance experience I've had.",
    source: "Yelp",
    verified: true,
    initials: "PS",
  },
  {
    name: "David Chen",
    location: "Washington, DC",
    rating: 5,
    text: "Our commercial dishwasher went down during dinner rush. Emergency tech had us back up in under two hours. Lifesavers.",
    source: "Google",
    verified: true,
    initials: "DC",
  },
  {
    name: "Emily Novak",
    location: "Rockville, MD",
    rating: 5,
    text: "Transparent quote, no upsells, and they registered my warranty for me. The booking portal is honestly nicer than the big-box stores.",
    source: "Facebook",
    verified: true,
    initials: "EN",
  },
  {
    name: "James Whitfield",
    location: "Alexandria, VA",
    rating: 5,
    text: "Washer was leaking everywhere. Tech diagnosed it in minutes, showed me the worn part, and fixed it same visit. Highly recommend.",
    source: "Google",
    verified: true,
    initials: "JW",
  },
  {
    name: "Sofia Martinez",
    location: "Silver Spring, MD",
    rating: 5,
    text: "Loved the real-time technician tracking. Knew exactly when they'd arrive. Clean, courteous, and my oven works like new.",
    source: "Yelp",
    verified: true,
    initials: "SM",
  },
];

/* ---------------- Service areas ---------------- */
export const serviceAreas: string[] = [
  "Washington, DC",
  "Bethesda",
  "Silver Spring",
  "Rockville",
  "Gaithersburg",
  "Frederick",
  "Arlington",
  "Alexandria",
  "Fairfax",
  "Columbia",
  "Annapolis",
  "Baltimore",
];

/* ---------------- FAQ ---------------- */
export const faqs: { q: string; a: string }[] = [
  {
    q: "Do your repairs come with a warranty?",
    a: "Yes. Every repair includes our 90-day parts and labor guarantee. If the same issue returns within the window, we'll come back at no charge.",
  },
  {
    q: "How much does a typical repair cost?",
    a: "Diagnostic visits start at $59 and are applied toward the repair if you proceed. You'll always receive an upfront, transparent quote before any work begins.",
  },
  {
    q: "Do you offer same-day service?",
    a: "Absolutely. Book before noon and we'll do our best to have a certified technician at your door the same day, subject to availability in your area.",
  },
  {
    q: "Do you handle delivery and installation?",
    a: "Yes. We deliver, install, level, and test every appliance we sell — plus haul away your old unit and register your warranty.",
  },
  {
    q: "Do you use genuine manufacturer parts?",
    a: "Always. As a factory-authorized service center, we use genuine OEM parts backed by the manufacturer's warranty.",
  },
  {
    q: "Do you offer emergency repair service?",
    a: "We provide 24/7 emergency response for critical residential and commercial appliance failures. Call our priority line anytime.",
  },
  {
    q: "What financing options are available?",
    a: "We offer 0% APR plans for up to 24 months on qualifying purchases, with fast approval and no hidden fees.",
  },
];

/* ---------------- Blog ---------------- */
export const posts: { title: string; category: string; excerpt: string; readTime: string; gradient: string; image: string }[] = [
  {
    title: "10 Simple Habits to Extend Your Refrigerator's Lifespan",
    category: "Maintenance",
    excerpt: "Small routines that keep your fridge running efficiently for years — and slash your energy bill.",
    readTime: "5 min read",
    gradient: "from-royal/20 to-navy/10",
    image: "/images/blog-1.jpg",
  },
  {
    title: "The 2026 Appliance Buying Guide: What Actually Matters",
    category: "Buying Guide",
    excerpt: "Cut through the spec sheets. Here's what to prioritize when investing in premium appliances.",
    readTime: "8 min read",
    gradient: "from-accent/20 to-accent-600/10",
    image: "/images/blog-3.jpg",
  },
  {
    title: "Energy Star Explained: How Much Will You Really Save?",
    category: "Energy Savings",
    excerpt: "We break down the real-world numbers behind energy-efficient appliances.",
    readTime: "6 min read",
    gradient: "from-success/20 to-royal/10",
    image: "/images/blog-2.jpg",
  },
  {
    title: "5 Dishwasher Problems You Can Fix in 10 Minutes",
    category: "Repair Tips",
    excerpt: "Before you call a tech, try these quick, safe troubleshooting steps.",
    readTime: "4 min read",
    gradient: "from-royal-400/20 to-navy/10",
    image: "/images/blog-4.jpg",
  },
];

/* ---------------- Stats ---------------- */
export const stats: { value: number; suffix: string; label: string; icon: LucideIcon }[] = [
  { value: 25, suffix: "+", label: "Years in Business", icon: BadgeCheck },
  { value: 120, suffix: "K+", label: "Repairs Completed", icon: Wrench },
  { value: 4.9, suffix: "★", label: "Average Rating", icon: Star },
  { value: 30, suffix: "+", label: "Brands Serviced", icon: Fan },
];

/* ---------------- Kitchen packages (Spicher's-style bundles) ---------------- */
export type KitchenPackage = {
  brand: string;
  name: string;
  pieces: string;
  save: string;
  from: number;
  gradient: string;
  image: string;
  popular?: boolean;
};

export const kitchenPackages: KitchenPackage[] = [
  {
    brand: "KitchenAid",
    name: "Pro Kitchen Suite",
    pieces: "Fridge · Range · Dishwasher · Microwave",
    save: "Save up to $1,200",
    from: 5499,
    gradient: "from-navy via-navy-600 to-royal",
    image: "/images/package-1.jpg",
    popular: true,
  },
  {
    brand: "GE Profile",
    name: "Smart Kitchen Bundle",
    pieces: "French Door · Slide-In Range · Dishwasher",
    save: "Save up to $900",
    from: 4299,
    gradient: "from-royal to-royal-600",
    image: "/images/kitchenaid.jpg",
  },
  {
    brand: "Bosch",
    name: "Quiet & Efficient Pack",
    pieces: "Counter-Depth Fridge · Induction · 44 dBA DW",
    save: "Save up to $800",
    from: 6199,
    gradient: "from-steel-600 to-navy",
    image: "/images/promo-bundle.jpg",
  },
  {
    brand: "LG",
    name: "Connected Home Bundle",
    pieces: "InstaView Fridge · Dual Oven · ThinQ Washer Pair",
    save: "Save up to $1,000",
    from: 4999,
    gradient: "from-navy-700 to-royal",
    image: "/images/cat-kitchen.jpg",
  },
  {
    brand: "Samsung",
    name: "Bespoke Kitchen Set",
    pieces: "Bespoke Fridge · Induction Range · DW",
    save: "Save up to $750",
    from: 4599,
    gradient: "from-royal-600 to-navy-600",
    image: "/images/hero-kitchen.jpg",
  },
  {
    brand: "Whirlpool",
    name: "Everyday Essentials",
    pieces: "Top Freezer · Electric Range · Dishwasher",
    save: "Save up to $400",
    from: 2199,
    gradient: "from-steel to-steel-600",
    image: "/images/package-6.jpg",
  },
];

/* ---------------- Rebate Center (Spicher's-style manufacturer rebates) ---------------- */
export type Rebate = {
  id: string;
  brand: string;
  title: string;
  amount: string;
  category: string;
  expires: string;
  method: "Mail-In" | "Instant" | "Online";
  qualifying: string;
};

export const rebates: Rebate[] = [
  {
    id: "RB-4000",
    brand: "Multiple Brands",
    title: "Kitchen Package Rebate",
    amount: "Up to $4,000",
    category: "Kitchen Packages",
    expires: "Sep 30, 2026",
    method: "Mail-In",
    qualifying: "Purchase 4+ qualifying kitchen appliances from participating brands in a single order.",
  },
  {
    id: "RB-800B",
    brand: "Bosch",
    title: "Delivery & Install Rebate",
    amount: "Up to $800",
    category: "Delivery & Installation",
    expires: "Aug 31, 2026",
    method: "Mail-In",
    qualifying: "Toward delivery or installation on qualifying Bosch appliance purchases.",
  },
  {
    id: "RB-LG150",
    brand: "LG",
    title: "InstaView Instant Savings",
    amount: "$150 Instant",
    category: "Refrigeration",
    expires: "Aug 15, 2026",
    method: "Instant",
    qualifying: "Applied at checkout on select LG InstaView refrigerators — no paperwork required.",
  },
  {
    id: "RB-WP400",
    brand: "Whirlpool",
    title: "Trade-In Rebate",
    amount: "Up to $400",
    category: "Laundry",
    expires: "Oct 15, 2026",
    method: "Mail-In",
    qualifying: "Trade in any working washer or dryer toward a new qualifying Whirlpool laundry pair.",
  },
  {
    id: "RB-SS250",
    brand: "Samsung",
    title: "Bespoke Suite Rebate",
    amount: "Up to $250",
    category: "Kitchen Packages",
    expires: "Sep 1, 2026",
    method: "Online",
    qualifying: "Register online within 30 days of purchasing 3+ Samsung Bespoke kitchen appliances.",
  },
  {
    id: "RB-GE100",
    brand: "GE Profile",
    title: "Energy Star Rebate",
    amount: "$100 Instant",
    category: "Dishwashers",
    expires: "Dec 31, 2026",
    method: "Instant",
    qualifying: "Applied at checkout on any Energy Star certified GE Profile dishwasher.",
  },
];

/* ---------------- Value props (delivery, haul-away, service, warranty) ---------------- */
export const valueProps: { title: string; desc: string; icon: LucideIcon; href: string; image: string }[] = [
  {
    title: "Delivery & Installation",
    desc: "Professional delivery so your appliances arrive safely and are installed correctly.",
    icon: Truck,
    href: "#contact",
    image: "/images/value-delivery.jpg",
  },
  {
    title: "Haul Away",
    desc: "We safely remove and recycle your old appliance when we deliver your new one.",
    icon: Package,
    href: "#contact",
    image: "/images/value-haul.jpg",
  },
  {
    title: "Appliance Repairs",
    desc: "We service what we sell. Factory-trained techs get you back up and running fast.",
    icon: Wrench,
    href: "#services",
    image: "/images/value-repair.jpg",
  },
  {
    title: "Extended Warranties",
    desc: "Protect your purchase beyond the manufacturer warranty with plans you can trust.",
    icon: ShieldCheck,
    href: "#promotions",
    image: "/images/value-warranty.jpg",
  },
];

/* ---------------- Site imagery ---------------- */
export const siteImages = {
  hero: "/images/hero-kitchen.jpg",
  heroSide: "/images/hero-appliances.jpg",
  builders: "/images/builders.jpg",
  before: "/images/before-fridge.jpg",
  after: "/images/after-fridge.jpg",
  kitchenaid: "/images/kitchenaid.jpg",
  promoStock: "/images/promo-stock.jpg",
  promoBundle: "/images/promo-bundle.jpg",
  promoFinance: "/images/promo-finance.jpg",
} as const;
