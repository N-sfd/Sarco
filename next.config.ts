import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  turbopack: {
    root: path.resolve(__dirname),
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
  // The floating route-info badge is Next's own dev-mode overlay, not part
  // of this app — it never renders in production builds. Disabled here too
  // so it doesn't show up while developing against the footer/UI.
  devIndicators: false,
};

export default nextConfig;
