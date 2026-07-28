import Image from "next/image";
import Link from "next/link";
import { siteImages } from "@/data/site-images";

export function LaundryPromoBanner() {
  return (
    <section className="border-b border-border">
      <div className="relative min-h-[240px] md:min-h-[300px]">
        <Image src={siteImages.promoLaundry} alt="Modern laundry room" fill className="object-cover" sizes="100vw" />
        <div className="absolute inset-0 bg-navy/55" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-retail max-w-xl text-white">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Lighten Your Workload</h2>
            <p className="mt-3 text-sm text-white/85 md:text-base">
              Explore washers, dryers, laundry pairs, and smart laundry appliances designed to simplify every load.
            </p>
            <Link href="/laundry" className="btn btn-accent btn-lg mt-5">
              Shop Laundry
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
