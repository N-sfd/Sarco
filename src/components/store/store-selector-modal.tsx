"use client";

import { useMemo, useState } from "react";
import { MapPin, X } from "lucide-react";
import { stores, distanceToStore } from "@/data/stores";
import { useStorePreference } from "@/stores/store-preference";
import { useUiStore } from "@/stores/wishlist";

export function StoreSelectorModal() {
  const open = useUiStore((s) => s.storeModalOpen);
  const setOpen = useUiStore((s) => s.setStoreModalOpen);
  const preferredStore = useStorePreference((s) => s.preferredStore);
  const setPreferredStore = useStorePreference((s) => s.setPreferredStore);
  const zipCode = useStorePreference((s) => s.zipCode);
  const [zip, setZip] = useState(zipCode ?? "");

  const ranked = useMemo(() => {
    const z = zip.trim() || preferredStore?.zip || "21740";
    return [...stores]
      .map((store) => ({ store, distance: distanceToStore(z, store) }))
      .sort((a, b) => a.distance - b.distance);
  }, [zip, preferredStore]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[80] flex items-start justify-center bg-navy/50 px-4 py-10">
      <div
        className="absolute inset-0"
        onClick={() => setOpen(false)}
        aria-hidden
      />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="store-modal-title"
        className="relative z-10 w-full max-w-2xl border border-border bg-white shadow-xl"
      >
        <div className="flex items-center justify-between border-b border-border px-4 py-3">
          <h2 id="store-modal-title" className="text-base font-bold text-navy">
            Find Your Store
          </h2>
          <button
            type="button"
            className="grid h-8 w-8 place-items-center hover:bg-surface"
            aria-label="Close"
            onClick={() => setOpen(false)}
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <div className="space-y-4 p-4">
          <div>
            <label htmlFor="store-zip" className="mb-1 block text-xs font-semibold text-navy">
              Enter ZIP Code
            </label>
            <div className="flex gap-2">
              <input
                id="store-zip"
                value={zip}
                onChange={(e) => setZip(e.target.value)}
                placeholder="e.g. 21740"
                className="input-retail"
                maxLength={10}
              />
              <button type="button" className="btn btn-primary" onClick={() => setZip(zip.trim())}>
                Search
              </button>
            </div>
          </div>

          <ul className="max-h-[420px] space-y-2 overflow-y-auto">
            {ranked.map(({ store, distance }) => {
              const selected = preferredStore?.id === store.id;
              return (
                <li
                  key={store.id}
                  className={`border p-3 ${selected ? "border-navy bg-surface" : "border-border"}`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div>
                      <p className="flex items-center gap-1.5 text-sm font-bold text-navy">
                        <MapPin className="h-3.5 w-3.5 text-accent" />
                        {store.name}
                      </p>
                      <p className="mt-1 text-xs text-muted">
                        {store.address}, {store.city}, {store.state} {store.zip}
                      </p>
                      <p className="mt-1 text-xs text-muted">{store.hours}</p>
                      <p className="mt-1 text-xs font-semibold text-navy">
                        {distance} miles · {store.phone}
                      </p>
                    </div>
                    <button
                      type="button"
                      className={`btn btn-sm ${selected ? "btn-accent" : "btn-outline"}`}
                      onClick={() => {
                        setPreferredStore(store, zip.trim() || store.zip);
                        setOpen(false);
                      }}
                    >
                      {selected ? "Selected" : "Select Store"}
                    </button>
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
}
