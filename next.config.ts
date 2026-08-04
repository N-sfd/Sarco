import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
    // Next.js 16 requires every quality value used by an <Image> to be
    // allowlisted here. 75 is the site-wide default; 90 is used by the
    // homepage hero, which is large enough (near full-viewport) that the
    // default's compression is visibly softer.
    qualities: [75, 90],
  },
  // The floating route-info badge is Next's own dev-mode overlay, not part
  // of this app — it never renders in production builds. Disabled here too
  // so it doesn't show up while developing against the footer/UI.
  devIndicators: false,
};

export default nextConfig;
