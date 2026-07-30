import { z } from "zod";
import Anthropic from "@anthropic-ai/sdk";
import { zodOutputFormat } from "@anthropic-ai/sdk/helpers/zod";
import { detectSafetyRisk, SAFETY_RESPONSE_TEXT, buildEscalationActions } from "@/lib/assistant-safety";

export type AssistantRequest = {
  message: string;
  conversationId?: string;
  history: Array<{
    role: "user" | "assistant";
    content: string;
  }>;
  context?: {
    currentPath?: string;
    selectedProductIds?: string[];
    zipCode?: string;
  };
};

export type AssistantResponse = {
  message: string;
  intent:
    | "product-search"
    | "product-comparison"
    | "troubleshooting"
    | "repair-booking"
    | "service-availability"
    | "delivery-help"
    | "general";
  actions?: Array<{
    type: "navigate" | "call" | "email" | "open-service-checker";
    label: string;
    value: string;
  }>;
  productIds?: string[];
  requiresHuman?: boolean;
};

const requestSchema = z.object({
  message: z.string().min(1).max(2000),
  conversationId: z.string().max(200).optional(),
  history: z
    .array(
      z.object({
        role: z.enum(["user", "assistant"]),
        content: z.string().max(4000),
      }),
    )
    .max(40),
  context: z
    .object({
      currentPath: z.string().max(300).optional(),
      selectedProductIds: z.array(z.string()).max(20).optional(),
      zipCode: z.string().regex(/^\d{5}$/).optional(),
    })
    .optional(),
});

const responseSchema = z.object({
  message: z.string(),
  intent: z.enum([
    "product-search",
    "product-comparison",
    "troubleshooting",
    "repair-booking",
    "service-availability",
    "delivery-help",
    "general",
  ]),
  actions: z
    .array(
      z.object({
        type: z.enum(["navigate", "call", "email", "open-service-checker"]),
        label: z.string(),
        value: z.string(),
      }),
    )
    .optional(),
  productIds: z.array(z.string()).optional(),
  requiresHuman: z.boolean().optional(),
});

// Per-instance sliding-window limiter. This only limits requests hitting the
// SAME server process — on a multi-instance/multi-region deployment (e.g.
// Vercel), each instance has its own count, so the effective ceiling is
// (limit x instance count). Swap in Upstash/Redis before relying on this
// as your only defense at real production scale.
const RATE_LIMIT_WINDOW_MS = 60_000;
const RATE_LIMIT_MAX = 20;
const requestLog = new Map<string, number[]>();

function isRateLimited(key: string): boolean {
  const now = Date.now();
  const recent = (requestLog.get(key) ?? []).filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  recent.push(now);
  requestLog.set(key, recent);
  return recent.length > RATE_LIMIT_MAX;
}

const client = new Anthropic(); // reads ANTHROPIC_API_KEY from the environment — never exposed to the browser

const SYSTEM_PROMPT = `You are Sarco Smart Assist, the customer-facing assistant for Sarco Appliances — a regional appliance retailer offering sales, delivery, installation, financing, parts, and factory-trained repair.

Classify every reply with the single most specific "intent" that applies. Only set "requiresHuman": true when the request genuinely needs a person — a safety concern, a complaint, or something you cannot resolve.

You must NEVER give instructions for: opening sealed electrical components, working on live electrical circuits, gas-line repair, refrigerant handling, bypassing safety switches, defeating locks or control systems, or dangerous appliance disassembly. For those topics, keep "message" limited to directing the customer to professional service and set "requiresHuman": true.

Keep "message" concise (2-4 sentences), written for a retail customer, no technical jargon.`;

export async function POST(request: Request) {
  const ip = request.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";
  if (isRateLimited(ip)) {
    return Response.json(
      {
        message: "You're sending messages a little too fast — please wait a moment and try again.",
        intent: "general",
        requiresHuman: false,
      } satisfies AssistantResponse,
      { status: 429 },
    );
  }

  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return Response.json({ error: "Invalid JSON body" }, { status: 400 });
  }

  const parsed = requestSchema.safeParse(body);
  if (!parsed.success) {
    return Response.json({ error: "Invalid request", issues: parsed.error.issues }, { status: 400 });
  }

  const { message, history, context } = parsed.data;

  if (detectSafetyRisk(message)) {
    return Response.json(
      {
        message: SAFETY_RESPONSE_TEXT,
        intent: "troubleshooting",
        actions: buildEscalationActions(),
        requiresHuman: true,
      } satisfies AssistantResponse,
      { status: 200 },
    );
  }

  const contextNote =
    context?.currentPath || context?.zipCode || context?.selectedProductIds?.length
      ? `\n\n[context: path=${context?.currentPath ?? "n/a"}, zip=${context?.zipCode ?? "n/a"}, selectedProducts=${context?.selectedProductIds?.join(",") ?? "none"}]`
      : "";

  try {
    const completion = await client.messages.parse({
      model: "claude-opus-5",
      max_tokens: 1024,
      system: SYSTEM_PROMPT,
      output_config: {
        effort: "medium",
        format: zodOutputFormat(responseSchema),
      },
      messages: [
        ...history.map((h) => ({ role: h.role, content: h.content })),
        { role: "user" as const, content: `${message}${contextNote}` },
      ],
    });

    if (completion.stop_reason === "refusal") {
      return Response.json(
        {
          message: "I'm not able to help with that request directly — let's connect you with our team.",
          intent: "general",
          actions: buildEscalationActions(),
          requiresHuman: true,
        } satisfies AssistantResponse,
        { status: 200 },
      );
    }

    if (!completion.parsed_output) {
      return Response.json({ error: "Assistant did not return a valid response" }, { status: 502 });
    }

    return Response.json(completion.parsed_output satisfies AssistantResponse);
  } catch (error) {
    console.error("Assistant API error:", error);
    return Response.json(
      { error: "The assistant is temporarily unavailable. Please try again shortly." },
      { status: 502 },
    );
  }
}
