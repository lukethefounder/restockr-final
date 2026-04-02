import { NextRequest, NextResponse } from "next/server";
import { z } from "zod";
import { writeInvoiceToMintsy } from "@/lib/mintsy";

export const runtime = "nodejs";

const invoiceSchema = z.object({
  invoiceNumber: z.string().min(1),
  orderId: z.string().min(1),
  buyerOrgId: z.string().min(1),
  distributorOrgId: z.string().min(1),
  amountTotal: z.number().positive(),
  issuedAt: z.string().min(1),
  fileUrl: z.string().url().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = invoiceSchema.parse(body);

    const result = await writeInvoiceToMintsy(parsed);

    return NextResponse.json({
      ok: result.ok,
      verificationStatus: result.status,
      mintsyHash: result.hash,
      mintsyTxId: result.txId,
    });
  } catch (error) {
    console.error("Mintsy verify route error:", error);

    return NextResponse.json(
      {
        ok: false,
        error:
          error instanceof Error
            ? error.message
            : "Failed to verify invoice with Mintsy",
      },
      { status: 400 },
    );
  }
}