import crypto from "node:crypto";

export type MintsyInvoicePayload = {
  invoiceNumber: string;
  orderId: string;
  buyerOrgId: string;
  distributorOrgId: string;
  amountTotal: number;
  issuedAt: string;
  fileUrl?: string;
};

function deepSort(value: unknown): unknown {
  if (Array.isArray(value)) {
    return value.map(deepSort);
  }

  if (value && typeof value === "object") {
    return Object.keys(value as Record<string, unknown>)
      .sort()
      .reduce<Record<string, unknown>>((acc, key) => {
        acc[key] = deepSort((value as Record<string, unknown>)[key]);
        return acc;
      }, {});
  }

  return value;
}

export function createMintsyHash(payload: MintsyInvoicePayload) {
  return crypto
    .createHash("sha256")
    .update(JSON.stringify(deepSort(payload)))
    .digest("hex");
}

export async function writeInvoiceToMintsy(payload: MintsyInvoicePayload) {
  const hash = createMintsyHash(payload);

  if (!process.env.MINTSY_API_URL) {
    return {
      ok: true,
      status: "MOCK_VERIFIED" as const,
      hash,
      txId: `mock_${hash.slice(0, 16)}`,
    };
  }

  const response = await fetch(`${process.env.MINTSY_API_URL}/invoice-records`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.MINTSY_API_KEY ?? ""}`,
    },
    body: JSON.stringify({
      ...payload,
      hash,
    }),
    cache: "no-store",
  });

  if (!response.ok) {
    return {
      ok: false,
      status: "FAILED" as const,
      hash,
      txId: null,
    };
  }

  const data = (await response.json()) as { txId?: string };

  return {
    ok: true,
    status: "VERIFIED" as const,
    hash,
    txId: data.txId ?? null,
  };
}