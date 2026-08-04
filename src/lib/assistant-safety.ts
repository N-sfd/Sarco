import { businessConfig } from "@/config/business";
import type { AssistantResponse } from "@/app/api/assistant/route";

const SAFETY_KEYWORDS = [
  "gas smell",
  "smell gas",
  "smell of gas",
  "smoke",
  "sparking",
  "spark",
  "burning smell",
  "electrical burning",
  "exposed wire",
  "exposed wiring",
  "water near electrical",
  "overheating",
  "overheat",
  "carbon monoxide",
  "co alarm",
  "co detector",
];

export function detectSafetyRisk(text: string): boolean {
  const t = text.toLowerCase();
  return SAFETY_KEYWORDS.some((keyword) => t.includes(keyword));
}

export const SAFETY_RESPONSE_TEXT = [
  "For your safety, please:",
  "1. Stop using the appliance.",
  "2. Disconnect power only if it is safe to do so.",
  "3. Leave the area for gas or carbon-monoxide concerns.",
  "4. Contact emergency services when appropriate.",
  "5. Contact Sarco Appliances for professional service.",
].join("\n");

export function buildEscalationActions(): NonNullable<AssistantResponse["actions"]> {
  return [
    {
      type: "call",
      label: `Call ${businessConfig.primaryContact.phoneDisplay}`,
      value: businessConfig.primaryContact.phoneHref,
    },
    {
      type: "email",
      label: `Email ${businessConfig.primaryContact.email}`,
      value: businessConfig.primaryContact.emailHref,
    },
    {
      type: "open-service-checker",
      label: "Check Service Availability",
      value: "",
    },
  ];
}
