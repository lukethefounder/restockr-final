import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { optimizeOrder } from "@/lib/optimizer";

export const runtime = "nodejs";

const requestSchema = z.object({
  items: z.array(
    z.object({
      itemName: z.string().min(1),
      quantity: z.number().positive(),
      preferredDistributorId: z.string().optional(),
      hardLock: z.boolean().optional(),
      notes: z.string().optional(),
    }),
  ),
  offers: z.array(
    z.object({
      productId: z.string().optional(),
      itemName: z.string().min(1),
      distributorId: z.string().min(1),
      distributorName: z.string().min(1),
      unitPrice: z.number().nonnegative(),
      packSize: z.number().positive().optional(),
      leadTimeDays: z.number().int().nonnegative().optional(),
    }),
  ),
  thresholds: z
    .array(
      z.object({
        distributorId: z.string().min(1),
        distributorName: z.string().min(1),
        minimumOrderType: z.enum(["NONE", "MOQ", "MIN_SPEND"]),
        minimumOrderQuantity: z.number().int().positive().optional(),
        minimumOrderSpend: z.number().positive().optional(),
      }),
    )
    .optional(),
  mode: z.enum(["BEST_PRICE", "BALANCED", "BUYER_PREFERENCE"]).optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = requestSchema.parse(body);

    const result = optimizeOrder(parsed);

    return NextResponse.json({
      ok: true,
      result,
    });
  } catch (error) {
    console.error("Optimize route error:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error ? error.message : "Failed to optimize order",
      },
      { status: 400 },
    );
  }
}