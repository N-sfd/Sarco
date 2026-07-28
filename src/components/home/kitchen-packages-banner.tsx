import Image from "next/image";
import Link from "next/link";

export function KitchenPackagesBanner() {
  return (
    <section className="border-b border-border">
      <div className="relative min-h-[280px] md:min-h-[340px]">
        <Image
          src="/images/package-1.jpg"
          alt="Complete kitchen appliance package"
          fill
          className="object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-navy/60" />
        <div className="absolute inset-0 flex items-center">
          <div className="container-retail max-w-xl text-white">
            <h2 className="text-3xl font-bold text-white md:text-4xl">Kitchen Packages</h2>
            <p className="mt-3 text-sm text-white/85 md:text-base">
              Coordinate refrigerators, cooking appliances, dishwashers, and ventilation from leading brands.
            </p>
            <Link href="/kitchen-packages" className="btn btn-accent btn-lg mt-5">
              Shop Kitchen Packages
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
