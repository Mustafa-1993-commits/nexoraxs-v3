import type {
  MediaAsset, MediaOwnerType, WorkspaceStorageUsage,
  CommerceProduct, BranchInventory, StockMovement, StockMovementReason,
  StockTransfer, CommerceReturn, CommerceReturnItem, RefundMethod,
} from "@nexoraxs/types";

let __idseq = 0;

export function uid(prefix: string): string {
  __idseq += 1;
  return `${prefix}_${Date.now().toString(36)}${__idseq.toString(36)}`;
}

export const nowISO = (): string => new Date().toISOString();

export function normalizeEmail(email: string): string {
  return (email || "").trim().toLowerCase();
}

export function getUserDisplayName(
  user: { fullName?: string; name?: string; email?: string } | null,
): string {
  if (!user) return "";
  const fullName = (user.fullName || user.name || "").trim();
  if (fullName) return fullName;
  return normalizeEmail(user.email || "")
    .split("@")[0]
    .replace(/[._-]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export interface CompressedImage {
  dataUrl: string;
  mimeType: string;
  sizeBytes: number;
  width: number;
  height: number;
}

export async function compressImageToThumbnail(
  file: File,
  opts?: { maxDimension?: number; quality?: number; maxBytes?: number },
): Promise<CompressedImage | null> {
  if (typeof document === "undefined" || typeof Image === "undefined") return null;
  const maxDimension = opts?.maxDimension ?? 200;
  const quality = opts?.quality ?? 0.7;
  const maxBytes = opts?.maxBytes ?? 60 * 1024;

  try {
    const objectUrl = URL.createObjectURL(file);
    try {
      const img = await new Promise<HTMLImageElement>((resolve, reject) => {
        const el = new Image();
        el.onload = () => resolve(el);
        el.onerror = () => reject(new Error("image_load_failed"));
        el.src = objectUrl;
      });

      const ratio = Math.min(1, maxDimension / Math.max(img.width, img.height));
      const width = Math.max(1, Math.round(img.width * ratio));
      const height = Math.max(1, Math.round(img.height * ratio));

      const canvas = document.createElement("canvas");
      canvas.width = width;
      canvas.height = height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return null;
      ctx.drawImage(img, 0, 0, width, height);

      const mimeType = "image/jpeg";
      const dataUrl = canvas.toDataURL(mimeType, quality);
      const sizeBytes = Math.round((dataUrl.length * 3) / 4);
      if (sizeBytes > maxBytes) return null;

      return { dataUrl, mimeType, sizeBytes, width, height };
    } finally {
      URL.revokeObjectURL(objectUrl);
    }
  } catch {
    return null;
  }
}

export function canAttachMedia(usage: WorkspaceStorageUsage | null, candidateBytes: number): boolean {
  if (!usage) return true;
  return usage.usedBytes + candidateBytes <= usage.limitBytes;
}

export function buildMediaAsset(input: {
  workspaceId: string;
  businessUnitId?: string | null;
  branchId?: string | null;
  ownerType: MediaOwnerType;
  ownerId?: string | null;
  fileName: string;
  compressed: CompressedImage;
}): MediaAsset {
  const now = nowISO();
  return {
    id: uid("media"),
    workspaceId: input.workspaceId,
    businessUnitId: input.businessUnitId ?? null,
    branchId: input.branchId ?? null,
    ownerType: input.ownerType,
    ownerId: input.ownerId ?? null,
    fileName: input.fileName,
    mimeType: input.compressed.mimeType,
    sizeBytes: input.compressed.sizeBytes,
    width: input.compressed.width,
    height: input.compressed.height,
    url: input.compressed.dataUrl,
    thumbnailUrl: input.compressed.dataUrl,
    createdAt: now,
    updatedAt: now,
  };
}

export function applyUsageDelta(usage: WorkspaceStorageUsage, deltaBytes: number): WorkspaceStorageUsage {
  return {
    ...usage,
    usedBytes: Math.max(0, usage.usedBytes + deltaBytes),
    updatedAt: nowISO(),
  };
}

// ---- branch inventory / stock movements / transfers / returns ----

/**
 * Read-side merge: returns the BranchInventory record for (product.id, branchId) if one
 * exists (hasRecord: true), otherwise a virtual record derived from the Product's legacy
 * `stock`/`lowStockThreshold` fields (hasRecord: false). Pure — never persists anything.
 */
export function effectiveStockFor(
  product: CommerceProduct,
  branchId: string,
  branchInventory: BranchInventory[],
): { qty: number; lowStockThreshold: number; updatedAt: string; hasRecord: boolean } {
  const record = (branchInventory || []).find(
    (bi) => bi.productId === product.id && bi.branchId === branchId,
  );
  if (record) {
    return { qty: record.qty, lowStockThreshold: record.lowStockThreshold, updatedAt: record.updatedAt, hasRecord: true };
  }
  return {
    qty: product.stock ?? 0,
    lowStockThreshold: product.lowStockThreshold ?? 0,
    updatedAt: product.updatedAt,
    hasRecord: false,
  };
}

export function buildStockMovement(input: {
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  productId: string;
  qtyChange: number;
  reason: StockMovementReason;
  reference: { type: "order" | "return" | "transfer" | "adjustment"; id: string };
  performedBy: string;
  performedByName: string;
}): StockMovement {
  return {
    id: uid("sm"),
    ...input,
    createdAt: nowISO(),
  };
}

export function buildStockTransfer(input: {
  transferNumber: string;
  workspaceId: string;
  businessUnitId: string;
  fromBranchId: string;
  toBranchId: string;
  items: { productId: string; name: string; qty: number }[];
  performedBy: string;
  performedByName: string;
  note?: string;
}): StockTransfer {
  return {
    id: uid("st"),
    ...input,
    status: "completed",
    createdAt: nowISO(),
  };
}

export function buildCommerceReturn(input: {
  returnNumber: string;
  workspaceId: string;
  businessUnitId: string;
  branchId: string;
  orderId: string;
  invoiceId: string | null;
  items: CommerceReturnItem[];
  reason: string;
  refundMethod: RefundMethod;
  restock: boolean;
  totals: { subtotal: number; vat: number; total: number };
  cashierId: string;
  cashierName: string;
}): CommerceReturn {
  const { totals, ...rest } = input;
  return {
    id: uid("ret"),
    ...rest,
    subtotal: totals.subtotal,
    vat: totals.vat,
    total: totals.total,
    createdAt: nowISO(),
  };
}
