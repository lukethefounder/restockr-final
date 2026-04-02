import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { getOpenAIClient } from "@/lib/openai";

export const runtime = "nodejs";

const budSchema = z.object({
  command: z.string().min(5),
  organizationName: z.string().optional(),
  role: z.enum(["FOUNDER", "BUYER", "DISTRIBUTOR"]).default("FOUNDER"),
  context: z
    .object({
      currentPage: z.string().optional(),
      selectedOrganizationId: z.string().optional(),
      notes: z.string().optional(),
    })
    .optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = budSchema.parse(body);

    const client = getOpenAIClient();

    const systemPrompt = `
You are Bud, the founder's high-agency operations AI for Restockr.
Your job is to suggest safe, premium-quality improvements for a restaurant ordering platform.

Rules:
- Prioritize clarity, beauty, and operational usefulness.
- Never suggest exposing secrets on the client.
- For destructive or billing-sensitive actions, recommend approval first.
- Prefer concrete product language over vague hype.
`;

    const response = await client.responses.create({
      model: process.env.OPENAI_MODEL || "gpt-5",
      input: [
        {
          role: "system",
          content: [{ type: "input_text", text: systemPrompt }],
        },
        {
          role: "user",
          content: [
            {
              type: "input_text",
              text: JSON.stringify(parsed, null, 2),
            },
          ],
        },
      ],
    });

    return NextResponse.json({
      ok: true,
      text: response.output_text ?? "",
    });
  } catch (error) {
    console.error("Bud route error:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Failed to process Bud request",
      },
      { status: 400 },
    );
  }
}