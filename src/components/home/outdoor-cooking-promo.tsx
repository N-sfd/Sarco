import Image from "next/image";
import Link from "next/link";

export function OutdoorCookingPromo() {
  return (
    <section className="border-b border-border bg-white">
      <div className="container-retail grid md:grid-cols-2">
        <div className="relative min-h-[260px]">
          <Image src="/images/package-3.jpg" alt="Outdoor grill and cooking area" fill className="object-cover" sizes="50vw" />
        </div>
        <div className="flex flex-col justify-center border-t border-border p-6 md:border-l md:border-t-0 md:p-10">
          <h2 className="text-2xl font-bold text-navy md:text-3xl">Outdoor Cooking</h2>
          <p className="mt-3 text-sm leading-relaxed text-muted md:text-base">
            Build a better outdoor space with premium grills, smokers, outdoor refrigeration, and cooking accessories.
          </p>
          <Link href="/grills" className="btn btn-primary mt-5 w-fit">
            Shop Grills
          </Link>
        </div>
      </div>
    </section>
  );
}
