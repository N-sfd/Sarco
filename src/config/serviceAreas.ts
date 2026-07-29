export type ServiceType = "delivery" | "installation" | "repair" | "haulAway";

export const serviceTypeLabels: Record<ServiceType, string> = {
  delivery: "Appliance Delivery",
  installation: "Installation",
  repair: "Appliance Repair",
  haulAway: "Haul Away",
};

/**
 * ZIP codes covered per service type. Hagerstown MD (21740) and the
 * surrounding Cumberland Valley / tri-state region. Delivery and repair
 * currently share the widest coverage; installation and haul-away ride
 * along with delivery/repair visits so they match those ZIP sets.
 */
const coreZips = [
  "21740", "21742", "21741", // Hagerstown
  "21713", "21714", // Boonsboro
  "21716", // Cascade
  "21717", // Cavetown
  "21719", // Clear Spring
  "21722", // Fairplay
  "21727", // Hagerstown area
  "21733", // Highfield-Cascade
  "21738", // Leitersburg
  "21746", // Hagerstown
  "21750", // Hancock
  "21762", // Maugansville
  "21766", // Rohrersville
  "21769", // Smithsburg
  "21774", // Union Bridge (outer)
  "21780", // Williamsport
  "21782", // Big Pool
  "21793", // Chewsville
  "17201", "17202", "17225", // Chambersburg / Waynesboro, PA
  "25401", "25404", // Martinsburg, WV
  "22601", "22602", // Winchester, VA
];

export const serviceAreas: Record<ServiceType, string[]> = {
  delivery: coreZips,
  installation: coreZips,
  repair: coreZips,
  haulAway: coreZips,
};

/** Strip non-digits and keep at most 5 characters. */
export function normalizeZip(zip: string): string {
  return zip.replace(/\D/g, "").slice(0, 5);
}

/** True when the value is a complete US ZIP (exactly 5 digits). */
export function isValidUsZip(zip: string): boolean {
  return /^\d{5}$/.test(normalizeZip(zip));
}

export type AvailabilityStatus = "invalid" | "available" | "unavailable";

export type AvailabilityResult = {
  zip: string;
  serviceType: ServiceType;
  /** Whether the ZIP format is valid (5 digits). */
  valid: boolean;
  /** Whether Sarco currently services this ZIP for the selected type. */
  available: boolean;
  status: AvailabilityStatus;
};

export function checkServiceAvailability(zip: string, serviceType: ServiceType): AvailabilityResult {
  const cleanZip = normalizeZip(zip);
  const valid = isValidUsZip(cleanZip);

  if (!valid) {
    return { zip: cleanZip, serviceType, valid: false, available: false, status: "invalid" };
  }

  const available = serviceAreas[serviceType].includes(cleanZip);
  return {
    zip: cleanZip,
    serviceType,
    valid: true,
    available,
    status: available ? "available" : "unavailable",
  };
}
