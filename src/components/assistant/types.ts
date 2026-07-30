export type AssistantRole = "user" | "assistant" | "system";

export type AssistantMessage = {
  id: string;
  role: AssistantRole;
  content: string;
  createdAt: string;
  metadata?: {
    action?: "product-results" | "escalation";
    productIds?: string[];
    route?: string;
  };
};

export const ASSISTANT_QUICK_ACTIONS = [
  "Find an Appliance",
  "Compare Products",
  "Troubleshoot a Problem",
  "Schedule Repair",
  "Check Service Availability",
  "Order and Delivery Help",
] as const;

export const APPLIANCE_TYPES = [
  "Refrigerator",
  "Washer and Dryer",
  "Dishwasher",
  "Range or Oven",
  "Grill",
  "Small Appliance",
] as const;

// Maps each label to a substring that should match real category/subcategory
// values in src/data/products.ts — verify against your actual catalog and adjust.
export const APPLIANCE_SEARCH_TERMS: Record<string, string> = {
  Refrigerator: "refrigerat",
  "Washer and Dryer": "laundry",
  Dishwasher: "dishwasher",
  "Range or Oven": "cooking",
  Grill: "grill",
  "Small Appliance": "small appliance",
};

export const ORDER_DELIVERY_OPTIONS = [
  "Track Delivery",
  "Installation Help",
  "Haul-Away Information",
  "Contact Customer Service",
] as const;

export const TROUBLESHOOT_QUESTIONS = [
  "What type of appliance is having the issue?",
  "What brand is it?",
  "What is the model number, if you have it? (You can say \u201cnot sure.\u201d)",
  "What symptom are you noticing?",
  "Is there an error code displayed?",
  "When did the issue begin?",
] as const;

export type FlowId = "find-appliance" | "compare-products" | "troubleshoot" | "order-delivery";
export type ActiveFlow = { id: FlowId; step: number } | null;
