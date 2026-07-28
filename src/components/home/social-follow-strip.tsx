import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SocialFollowStrip() {
  return (
    <section className="border-b border-border bg-surface">
      <div className="container-retail flex flex-wrap items-center justify-between gap-3 py-4 text-sm">
        <p className="font-semibold text-navy">
          Follow {siteConfig.shortName} on Facebook and Instagram for local deals and project inspiration.
        </p>
        <div className="flex gap-3">
          <Link href={siteConfig.socials.facebook} className="btn btn-outline btn-sm">
            Facebook
          </Link>
          <Link href={siteConfig.socials.instagram} className="btn btn-outline btn-sm">
            Instagram
          </Link>
        </div>
      </div>
    </section>
  );
}
