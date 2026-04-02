import { normalizeItemName } from "@/lib/utils";

export type OptimizationMode = "BEST_PRICE" | "BALANCED" | "BUYER_PREFERENCE";
export type MinimumOrderType = "NONE" | "MOQ" | "MIN_SPEND";

export type RequestedItem = {
  itemName: string;
  quantity: number;
  preferredDistributorId?: string;
  hardLock?: boolean;
  notes?: string;
};

export type Offer = {
  productId?: string;
  itemName: string;
  distributorId: string;
  distributorName: string;
  unitPrice: number;
  packSize?: number;
  leadTimeDays?: number;
};

export type Threshold = {
  distributorId: string;
  distributorName: string;
  minimumOrderType: MinimumOrderType;
  minimumOrderQuantity?: number;
  minimumOrderSpend?: number;
};

type RankedOffer = Offer & {
  score: number;
};

type Assignment = {
  request: RequestedItem;
  selectedOffer: RankedOffer;
  alternatives: RankedOffer[];
};

type Basket = {
  distributorId: string;
  distributorName: string;
  subtotal: number;
  totalUnits: number;
  threshold: {
    passes: boolean;
    message?: string;
  };
  lines: {
    requestedItemName: string;
    quantity: number;
    unitPrice: number;
    lineSubtotal: number;
    hardLocked: boolean;
    selectedProductId?: string;
  }[];
};

export type OptimizationResult = {
  baskets: Basket[];
  unmatchedItems: string[];
  warnings: string[];
  optimizedTotal: number;
  bestPriceTotal: number;
};

function scoreOffer(
  request: RequestedItem,
  offer: Offer,
  mode: OptimizationMode,
  usedDistributors: Set<string>,
) {
  let score = offer.unitPrice * request.quantity;

  if (request.preferredDistributorId === offer.distributorId) {
    score -= mode === "BUYER_PREFERENCE" ? 60 : 20;
  }

  if (
    request.preferredDistributorId &&
    request.preferredDistributorId !== offer.distributorId &&
    mode === "BUYER_PREFERENCE"
  ) {
    score += 25;
  }

  if (usedDistributors.has(offer.distributorId) && mode === "BALANCED") {
    score -= 10;
  }

  if (offer.leadTimeDays && offer.leadTimeDays > 3) {
    score += offer.leadTimeDays * 2;
  }

  return score;
}

function buildBaskets(
  assignments: Assignment[],
  thresholds: Threshold[],
): Map<string, Basket> {
  const thresholdMap = new Map(
    thresholds.map((threshold) => [threshold.distributorId, threshold]),
  );

  const baskets = new Map<string, Basket>();

  for (const assignment of assignments) {
    const { selectedOffer, request } = assignment;

    const existing =
      baskets.get(selectedOffer.distributorId) ??
      ({
        distributorId: selectedOffer.distributorId,
        distributorName: selectedOffer.distributorName,
        subtotal: 0,
        totalUnits: 0,
        threshold: { passes: true },
        lines: [],
      } satisfies Basket);

    const lineSubtotal = selectedOffer.unitPrice * request.quantity;

    existing.subtotal += lineSubtotal;
    existing.totalUnits += request.quantity;
    existing.lines.push({
      requestedItemName: request.itemName,
      quantity: request.quantity,
      unitPrice: selectedOffer.unitPrice,
      lineSubtotal,
      hardLocked: !!request.hardLock,
      selectedProductId: selectedOffer.productId,
    });

    baskets.set(selectedOffer.distributorId, existing);
  }

  for (const basket of baskets.values()) {
    const threshold = thresholdMap.get(basket.distributorId);

    if (!threshold || threshold.minimumOrderType === "NONE") {
      basket.threshold = { passes: true };
      continue;
    }

    if (
      threshold.minimumOrderType === "MIN_SPEND" &&
      threshold.minimumOrderSpend &&
      basket.subtotal < threshold.minimumOrderSpend
    ) {
      basket.threshold = {
        passes: false,
        message: `${basket.distributorName} requires at least $${threshold.minimumOrderSpend.toFixed(
          2,
        )}.`,
      };
      continue;
    }

    if (
      threshold.minimumOrderType === "MOQ" &&
      threshold.minimumOrderQuantity &&
      basket.totalUnits < threshold.minimumOrderQuantity
    ) {
      basket.threshold = {
        passes: false,
        message: `${basket.distributorName} requires at least ${threshold.minimumOrderQuantity} units.`,
      };
      continue;
    }

    basket.threshold = { passes: true };
  }

  return baskets;
}

export function optimizeOrder(input: {
  items: RequestedItem[];
  offers: Offer[];
  thresholds?: Threshold[];
  mode?: OptimizationMode;
}): OptimizationResult {
  const mode = input.mode ?? "BALANCED";
  const thresholds = input.thresholds ?? [];
  const warnings: string[] = [];
  const unmatchedItems: string[] = [];
  const usedDistributors = new Set<string>();

  const assignments: Assignment[] = [];

  for (const request of input.items) {
    const normalized = normalizeItemName(request.itemName);

    const candidates = input.offers
      .filter((offer) => normalizeItemName(offer.itemName) === normalized)
      .map((offer) => ({
        ...offer,
        score: scoreOffer(request, offer, mode, usedDistributors),
      }))
      .sort((a, b) => a.score - b.score);

    if (request.hardLock && request.preferredDistributorId) {
      const locked = candidates.find(
        (candidate) => candidate.distributorId === request.preferredDistributorId,
      );

      if (!locked) {
        unmatchedItems.push(
          `${request.itemName} (preferred distributor not available)`,
        );
        continue;
      }

      assignments.push({
        request,
        selectedOffer: locked,
        alternatives: candidates.filter(
          (candidate) => candidate.distributorId !== locked.distributorId,
        ),
      });

      usedDistributors.add(locked.distributorId);
      continue;
    }

    if (candidates.length === 0) {
      unmatchedItems.push(request.itemName);
      continue;
    }

    const selectedOffer = candidates[0];
    assignments.push({
      request,
      selectedOffer,
      alternatives: candidates.slice(1),
    });

    usedDistributors.add(selectedOffer.distributorId);
  }

  let baskets = buildBaskets(assignments, thresholds);

  for (const [distributorId, basket] of [...baskets.entries()]) {
    if (basket.threshold.passes) continue;

    const failingAssignments = assignments.filter(
      (assignment) => assignment.selectedOffer.distributorId === distributorId,
    );

    const movable = failingAssignments.filter(
      (assignment) => !assignment.request.hardLock,
    );

    for (const assignment of movable) {
      const alternative = assignment.alternatives.find(
        (candidate) => candidate.distributorId !== distributorId,
      );

      if (!alternative) continue;

      assignment.selectedOffer = alternative;
      assignment.alternatives = assignment.alternatives.filter(
        (candidate) => candidate.distributorId !== alternative.distributorId,
      );

      baskets = buildBaskets(assignments, thresholds);

      const updatedBasket = baskets.get(distributorId);
      if (!updatedBasket || updatedBasket.threshold.passes) {
        break;
      }
    }

    const finalBasket = baskets.get(distributorId);
    if (finalBasket && !finalBasket.threshold.passes) {
      warnings.push(
        finalBasket.threshold.message ??
          `${finalBasket.distributorName} threshold not satisfied.`,
      );
    }
  }

  const basketList = [...baskets.values()].sort((a, b) => b.subtotal - a.subtotal);

  const optimizedTotal = basketList.reduce((sum, basket) => sum + basket.subtotal, 0);

  const bestPriceTotal = input.items.reduce((sum, request) => {
    const normalized = normalizeItemName(request.itemName);
    const cheapest = input.offers
      .filter((offer) => normalizeItemName(offer.itemName) === normalized)
      .sort((a, b) => a.unitPrice - b.unitPrice)[0];

    return sum + (cheapest ? cheapest.unitPrice * request.quantity : 0);
  }, 0);

  return {
    baskets: basketList,
    unmatchedItems,
    warnings,
    optimizedTotal,
    bestPriceTotal,
  };
}