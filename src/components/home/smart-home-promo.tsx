import Image from "next/image";
import Link from "next/link";
import { siteConfig } from "@/config/site";

export function SmartHomePromo() {
  if (!siteConfig.features.smartHomeEnabled) return null;

  return (
    <section className="border-b border-border bg-white">
      <div className="container-retail grid items-center gap-6 py-8 md:grid-cols-2">
        <div>
          <h2 className="text-2xl font-bold text-navy md:text-3xl">Protect and Connect Your Home</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
            Explore smart-home monitoring, appliance protection, leak detection, cameras, and connected-home packages.
          </p>
          <Link href="/smart-home" className="btn btn-primary mt-5">
            Learn More
          </Link>
        </div>
        <div className="relative aspect-[16/10] overflow-hidden border border-border">
          <Image src="/images/hero-appliances.jpg" alt="Connected home appliances" fill className="object-cover" sizes="50vw" />
        </div>
      </div>
    </section>
  );
}
