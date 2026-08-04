export type ServiceType =
  | "delivery"
  | "installation"
  | "repair"
  | "haulAway";

export const serviceTypeLabels: Record<ServiceType, string> = {
  delivery: "Appliance Delivery",
  installation: "Installation",
  repair: "Appliance Repair",
  haulAway: "Haul Away",
};

export type AvailabilityStatus =
  | "invalid"
  | "available"
  | "unavailable";

export type AvailabilityResult = {
  zip: string;
  serviceType: ServiceType;
  valid: boolean;
  available: boolean;
  status: AvailabilityStatus;
};

/**
 * ZIP codes currently covered by Sarco Appliances.
 *
 * Keep this list centralized so coverage can be updated without
 * modifying service forms or UI components.
 */
const coreZips = [
  // Hagerstown
  "21740",
  "21741",
  "21742",
  "21746",

  // Washington County and nearby Maryland areas
  "21713",
  "21714",
  "21716",
  "21717",
  "21719",
  "21722",
  "21727",
  "21733",
  "21738",
  "21750",
  "21762",
  "21766",
  "21769",
  "21774",
  "21780",
  "21782",
  "21793",

  // Pennsylvania
  "17201",
  "17202",
  "17225",

  // West Virginia
  "25401",
  "25404",

  // Virginia
  "22601",
  "22602",
] as const;

/**
 * Sets provide fast ZIP-code lookup and prevent accidental duplicates.
 */
const coreZipSet = new Set<string>(coreZips);

export const serviceAreas: Record<
  ServiceType,
  ReadonlySet<string>
> = {
  delivery: coreZipSet,
  installation: coreZipSet,
  repair: coreZipSet,
  haulAway: coreZipSet,
};

/**
 * Removes non-numeric characters and limits the value to five digits.
 */
export function normalizeZip(zip: string): string {
  return zip.replace(/\D/g, "").slice(0, 5);
}

/**
 * Returns true when the supplied value is a complete five-digit US ZIP code.
 */
export function isValidUsZip(zip: string): boolean {
  return /^\d{5}$/.test(normalizeZip(zip));
}

/**
 * Checks whether Sarco currently supports the selected service in the
 * supplied ZIP code.
 */
export function checkServiceAvailability(
  zip: string,
  serviceType: ServiceType,
): AvailabilityResult {
  const normalizedZip = normalizeZip(zip);
  const valid = isValidUsZip(normalizedZip);

  if (!valid) {
    return {
      zip: normalizedZip,
      serviceType,
      valid: false,
      available: false,
      status: "invalid",
    };
  }

  const available = serviceAreas[serviceType].has(normalizedZip);

  return {
    zip: normalizedZip,
    serviceType,
    valid: true,
    available,
    status: available ? "available" : "unavailable",
  };
}
