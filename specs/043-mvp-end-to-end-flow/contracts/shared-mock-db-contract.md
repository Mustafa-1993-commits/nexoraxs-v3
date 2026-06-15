# Contract: Shared Mock-DB Surface (`@nexoraxs/shared`, `@nexoraxs/types`)

This feature has no external/network API. Its "interfaces" are the **internal package contracts** that `apps/core-platform` and `apps/commerce` consume from `@nexoraxs/shared` and `@nexoraxs/types`, and the **`AppProvider` context contracts** each app exposes to its own pages/components (per the constitutional rule that pages must never touch storage directly). This document is the source of truth both apps' providers must implement against, and what `/speckit.tasks` should generate granular tasks from.

---

## A. New/changed exports from `@nexoraxs/types`

```ts
// core.ts
export interface WorkspaceStorageUsage {
  workspaceId: string;
  usedBytes: number;
  limitBytes: number;
  updatedAt: string;
}

export type MediaOwnerType =
  | "business_logo"
  | "product_image"
  | "category_image"
  | "store_banner"
  | "document_asset"
  | "other";

export interface MediaAsset {
  id: string;
  workspaceId: string;
  businessUnitId: string | null;
  branchId: string | null;
  ownerType: MediaOwnerType;
  ownerId: string | null;
  fileName: string;
  mimeType: string;
  sizeBytes: number;
  width: number | null;
  height: number | null;
  url: string;
  thumbnailUrl: string | null;
  createdAt: string;
  updatedAt: string;
}

// commerce.ts — additive fields only (existing fields unchanged)
export interface CommerceOrder {
  // ...existing fields
  cashierId: string;
  cashierName: string;
}
export interface CommerceInvoice {
  // ...existing fields
  cashierId: string;
  cashierName: string;
}
```

`index.ts` re-exports `WorkspaceStorageUsage`, `MediaAsset`, `MediaOwnerType`.

**Backward compatibility**: All additions are new optional-at-the-margin fields on existing interfaces (required, but always populated by the actions that create these records — there is no path that creates a `CommerceOrder`/`CommerceInvoice` outside `AppProvider.createOrder`/`createInvoice`) or brand-new interfaces. No existing field is renamed, removed, or retyped.

---

## B. New/changed exports from `@nexoraxs/shared`

### `mock-db/schema.ts`
- `STORAGE_KEYS.mediaAssets: "nexoraxs.db.mediaAssets"`
- `STORAGE_KEYS.workspaceStorageUsage: "nexoraxs.db.workspaceStorageUsage"`
- `PLAN_CATALOG[*].limits.storageLimitBytes: number` added to all three tiers
- New `t()` dictionary keys (both `en`/`ar`) for: storage-usage labels (e.g., `storage_used`, `media_storage_used`), quota toasts (`image_too_large`, `storage_limit_reached`), cashier label (`cashier`)

### `mock-db/selectors.ts`
```ts
export function storageUsagePercent(usage: WorkspaceStorageUsage | null): number; // 0–100, clamped
export function formatBytes(bytes: number, lang?: Lang): string; // e.g. "12 MB", "500 MB"
export function remainingBytes(usage: WorkspaceStorageUsage | null): number; // max(0, limit - used)
```
Pure, side-effect-free — same shape as existing `money`, `taxBreak`, `nxOrderTotal`.

### `mock-db/actions.ts`
```ts
// Compression — Canvas-based, SSR-safe (returns null on the server or on failure)
export async function compressImageToThumbnail(
  file: File,
  opts?: { maxDimension?: number; quality?: number; maxBytes?: number },
): Promise<{ dataUrl: string; mimeType: string; sizeBytes: number; width: number; height: number } | null>;

// Quota check — pure given current usage + candidate size
export function canAttachMedia(
  usage: WorkspaceStorageUsage | null,
  candidateBytes: number,
): boolean;

// MediaAsset record construction (id/timestamps) — pure factory, no storage I/O
export function buildMediaAsset(input: {
  workspaceId: string;
  businessUnitId?: string | null;
  branchId?: string | null;
  ownerType: MediaOwnerType;
  ownerId?: string | null;
  fileName: string;
  compressed: { dataUrl: string; mimeType: string; sizeBytes: number; width: number; height: number };
}): MediaAsset;

// Usage delta application — pure transform, returns the next WorkspaceStorageUsage
export function applyUsageDelta(
  usage: WorkspaceStorageUsage,
  deltaBytes: number,
): WorkspaceStorageUsage; // clamps usedBytes at >= 0, sets updatedAt
```

These are **pure helpers** (no `localStorage` access) — consistent with `taxBreak`/`computeDoc`/`uid`/`nowISO`. The actual read-check-write-and-`showToast` orchestration stays inside each app's `AppProvider`, exactly like `addProduct`/`createOrder` do today — shared packages provide the building blocks; apps own the side effects and user feedback (Article XVI: "Shared packages must not contain business logic" — these helpers are calculation/formatting/factory utilities, not orchestration).

### `mock-db/storage.ts`
- No signature changes. `clearAllStorage()` automatically covers the two new `STORAGE_KEYS` entries (it iterates `Object.values(STORAGE_KEYS)`).

### `mock-db/seed.ts`
- `seedDB(...)` gains creation of one zeroed `WorkspaceStorageUsage` row per seeded workspace (limit sourced from the seeded subscription's plan).

---

## C. `AppProvider` contract additions (each app, same shape)

Both `apps/core-platform/lib/store/AppProvider.tsx` and `apps/commerce/lib/store/AppProvider.tsx` already mirror large parts of `AppContextType`. This feature adds the following to **both**, since storage usage must be visible from Core (Billing/Settings, FR-045) and from Commerce (Settings/Dashboard, FR-015/FR-027/FR-044):

```ts
interface AppContextType {
  // ...existing members unchanged

  // storage quota (new)
  workspaceStorageUsage: WorkspaceStorageUsage | null;
  storageUsagePercent: number;          // derived via shared selector
  storageUsageLabel: string;            // e.g. "12 MB / 500 MB" via shared formatBytes
}
```

### Commerce-only additions (media producers live here)

```ts
interface AppContextType {
  // media
  mediaAssets: MediaAsset[];

  // attach helper — encapsulates compress → quota-check → persist-or-block → toast
  // Returns the created asset+reference on success, or null if the image was not kept
  // (the caller proceeds to save its parent record either way — image is optional)
  attachMedia: (input: {
    file: File;
    ownerType: MediaOwnerType;
    ownerId?: string | null;
    fileName: string;
  }) => Promise<{ asset: MediaAsset; reference: { mediaAssetId: string; thumbnailUrl: string } } | null>;
}
```

`attachMedia`:
1. Calls `compressImageToThumbnail`. If it returns `null` → show `t("image_too_large")` toast, return `null`.
2. Calls `canAttachMedia(workspaceStorageUsage, sizeBytes)`. If `false` → show `t("storage_limit_reached")` toast, return `null`.
3. Builds the `MediaAsset` via `buildMediaAsset`, persists it to `STORAGE_KEYS.mediaAssets`, applies `applyUsageDelta` and persists the updated `WorkspaceStorageUsage`, updates state, and returns the reference.

`addProduct` and `saveCommerceSetup` (logo path) call `attachMedia` first (when an image/file is provided), then proceed to save the parent record using whatever reference (or `null`) came back — guaranteeing the parent record is **always** saved (FR-013/FR-030), with the image attached only on success.

### Cashier capture (Commerce-only, inside existing actions)

```ts
// createOrder — no signature change visible to callers; internally:
//   cashierId = state.currentUser?.id ?? ""
//   cashierName = getUserDisplayName(state.currentUser) || "Cashier"
// createInvoice — copies order.cashierId / order.cashierName onto the invoice
```

No new action is added for this — it is folded into the existing `createOrder`/`createInvoice` implementations, preserving their current call signatures (no breaking change to `pos/page.tsx`).

---

## D. Consumer obligations (pages/components)

- Pages MUST continue to access all of the above only through `useApp()` (the existing `AppProvider` hook) — never importing `@nexoraxs/shared` storage primitives directly (existing rule, FR-048).
- Any screen that uploads an image (Add/Edit Product, Setup Wizard Step 1 logo, future banner/category screens) MUST go through `attachMedia` and handle the `null` (not-kept) result by proceeding with the save and surfacing the toast already raised by the helper — screens must not duplicate the compress/quota/toast logic.
- Storage-usage display surfaces (Core Billing/Settings, Commerce Settings/Dashboard) read `workspaceStorageUsage`, `storageUsagePercent`, `storageUsageLabel` from `useApp()` and render with existing card components/styles — no new calculation in the component tree.
