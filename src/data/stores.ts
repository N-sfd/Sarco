import type { StoreLocation } from "@/stores/store-preference";

export const stores: StoreLocation[] = [
  {
    id: "store-hagerstown",
    name: "Sarco Appliances — Hagerstown",
    city: "Hagerstown",
    state: "MD",
    address: "1101 Opal Ct",
    zip: "21740",
    phone: "(240) 576-0397",
    hours: "Mon–Fri 9–7 · Sat 9–6 · Sun 11–5",
    lat: 39.6418,
    lng: -77.72,
  },
  {
    id: "store-frederick",
    name: "Sarco Appliances — Frederick",
    city: "Frederick",
    state: "MD",
    address: "520 Market Street",
    zip: "21701",
    phone: "(301) 555-0162",
    hours: "Mon–Fri 9–7 · Sat 9–6 · Sun 12–5",
    lat: 39.4143,
    lng: -77.4105,
  },
  {
    id: "store-martinsburg",
    name: "Sarco Appliances — Martinsburg",
    city: "Martinsburg",
    state: "WV",
    address: "910 Foxcroft Avenue",
    zip: "25401",
    phone: "(304) 555-0188",
    hours: "Mon–Fri 9–6 · Sat 9–5 · Sun Closed",
    lat: 39.4562,
    lng: -77.9639,
  },
  {
    id: "store-winchester",
    name: "Sarco Appliances — Winchester",
    city: "Winchester",
    state: "VA",
    address: "2100 S Pleasant Valley Rd",
    zip: "22601",
    phone: "(540) 555-0133",
    hours: "Mon–Fri 9–7 · Sat 9–6 · Sun 12–5",
    lat: 39.1857,
    lng: -78.1633,
  },
];

/** Rough distance in miles from a ZIP centroid approximation for demo purposes. */
export function distanceToStore(zip: string, store: StoreLocation): number {
  const zipNum = parseInt(zip.replace(/\D/g, "").slice(0, 5), 10) || 21740;
  const storeZip = parseInt(store.zip, 10);
  const base = Math.abs(zipNum - storeZip) / 120;
  return Math.round((base + Math.abs(store.lat % 1) * 8) * 10) / 10;
}
