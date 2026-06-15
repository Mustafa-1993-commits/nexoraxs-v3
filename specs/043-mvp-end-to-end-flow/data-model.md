# Phase 1 Data Model: MVP End-to-End Flow Stabilization with Storage Quota

Scope: only **new** entities and **field-level extensions** to existing entities required by spec.md. Entities not listed here (`User`, `Workspace`, `BusinessUnit`, `Branch`, `OSSubscription`, `WorkspaceMember`, `CommerceSetup`, `CommerceProduct`, `CommerceCustomer`) are unchanged — see `packages/types/src/core.ts` and `packages/types/src/commerce.ts` for their current shapes.

All new/extended records follow the existing tenant-scoping convention already present on `CommerceProduct`/`CommerceOrder` (`workspaceId`, `businessUnitId`, `branchId`).

---

## New Entity: `WorkspaceStorageUsage`

Tracks how much of a workspace's plan storage allowance is currently used. One record per workspace.

| Field | Type | Notes |
|---|---|---|
| `workspaceId` | `string` | Primary scoping key; one record per workspace (acts as the record's identity — no separate `id` needed, mirroring how `CommerceSetup` is keyed by `workspaceId`+`businessUnitId`) |
| `usedBytes` | `number` | Running total of estimated bytes consumed by all `MediaAsset` records belonging to this workspace |
| `limitBytes` | `number` | Snapshot of the workspace's current plan storage allowance (sourced from `PLAN_CATALOG[...].limits.storageLimitBytes`); kept on the record so usage displays remain consistent even if plan catalog values change later |
| `updatedAt` | `string` (ISO datetime) | Set whenever `usedBytes` changes |

**Validation / invariants**:
- `usedBytes >= 0`; never negative even after deletions (clamped at zero).
- `usedBytes` is the sum of `sizeBytes` across all non-deleted `MediaAsset` rows for the workspace — maintained incrementally by the media-attach/detach helpers (FR-010, research.md §3), not recomputed from scratch on every read (consistent with the existing incremental `writeCollection` pattern).
- Drives FR-009 / FR-013 / FR-015 / FR-045 displays and the pre-save quota check.

**Lifecycle**: created (zeroed, with the workspace's plan limit) at workspace/onboarding creation time (mirrors `seedDB`'s creation of baseline records); incremented when a `MediaAsset` is successfully attached; decremented if a `MediaAsset` is removed/replaced (e.g., logo re-upload); cleared by demo reset (research.md §6).

---

## New Entity: `MediaAsset`

Represents one uploaded (and compressed) media item, referenced — not duplicated — by the records that display it.

| Field | Type | Notes |
|---|---|---|
| `id` | `string` | `uid("media")`-style identifier, consistent with existing `uid(prefix)` helper |
| `workspaceId` | `string` | Required — every asset is scoped to a workspace (storage quota owner) |
| `businessUnitId` | `string \| null` | Present for Commerce-produced assets (product/category images, store banners); `null` for assets not tied to a specific business unit |
| `branchId` | `string \| null` | Present where relevant (e.g., branch-specific banners in future); optional for MVP-era assets such as the business logo |
| `ownerType` | `"business_logo" \| "product_image" \| "category_image" \| "store_banner" \| "document_asset" \| "other"` | Discriminates the asset's purpose; drives where it may legally be referenced from |
| `ownerId` | `string \| null` | ID of the record that owns this asset (e.g., `productId`, `commerceSetupId`); may be `null` momentarily during create-then-link flows (e.g., product image chosen before the product itself has an id) |
| `fileName` | `string` | Original file name, for display/debugging only |
| `mimeType` | `string` | Compressed-output MIME type (e.g., `image/webp`, `image/jpeg`) |
| `sizeBytes` | `number` | Estimated size of the **compressed** thumbnail (never the original) — this is what counts toward `WorkspaceStorageUsage.usedBytes` |
| `width` | `number \| null` | Compressed thumbnail pixel width, when known |
| `height` | `number \| null` | Compressed thumbnail pixel height, when known |
| `url` | `string` | Reference to the displayable asset; in MVP this is the compressed thumbnail data URL itself (no real object storage) |
| `thumbnailUrl` | `string \| null` | Optional smaller preview reference; in MVP may equal `url` or be omitted |
| `createdAt` | `string` (ISO datetime) | |
| `updatedAt` | `string` (ISO datetime) | |

**Validation / invariants**:
- `sizeBytes` MUST reflect the compressed output only — never an estimate of an original full-size file (FR-012).
- Creating a `MediaAsset` is always paired, in the same action, with incrementing `WorkspaceStorageUsage.usedBytes` by `sizeBytes` (no orphaned usage or assets).
- `ownerType = "business_logo"` assets are referenced from `CommerceSetup` (and, by lookup, from sidebar/POS/receipt/invoice rendering) — never copied into product/order/invoice records (FR-014, FR-017, FR-037).
- `ownerType = "product_image"` assets are referenced from `CommerceProduct` only — never copied into `OrderItem`/`CommerceOrder`/`CommerceInvoice` (FR-030, FR-037, "do not store product images inside order/invoice items").
- `ownerType` values `"category_image" | "store_banner"` are modeled now for forward-compatibility with the (not-yet-built) Online Store, per FR-019/FR-011 — no screens create them in this MVP.

**Lifecycle**: created via the shared `tryAttachMedia`-style helper (research.md §3) only after the compression + quota check both succeed; replaced (e.g., re-uploading a logo) decrements the old asset's contribution and creates a new one; removed on demo reset.

---

## Extended Entity: `CommerceOrder` (existing — `packages/types/src/commerce.ts`)

Add two fields to capture cashier identity at the moment of sale (FR-033, FR-036):

| New field | Type | Notes |
|---|---|---|
| `cashierId` | `string` | Copied from `currentUser.id` at order-creation time inside `createOrder` |
| `cashierName` | `string` | Copied from `getUserDisplayName(currentUser)` at order-creation time; falls back to the literal `"Cashier"` if unavailable |

No other fields change. `items: OrderItem[]` remains image-free — `OrderItem` is **not** extended with any image/media reference (FR-037).

---

## Extended Entity: `CommerceInvoice` (existing — `packages/types/src/commerce.ts`)

Add the same two fields, copied from the linked order at invoice-creation time (mirrors how `customerId`/totals are already copied order→invoice):

| New field | Type | Notes |
|---|---|---|
| `cashierId` | `string` | Copied from `order.cashierId` inside `createInvoice` |
| `cashierName` | `string` | Copied from `order.cashierName` inside `createInvoice`; the invoice document may also re-derive display name from the linked order at render time as a fallback (per spec.md §11, "Invoice may derive cashierName from linked order when rendering") |

---

## Extended Entity: `CommerceProduct` (existing — `packages/types/src/commerce.ts`)

No new required fields — `image?: string | null` already exists and is the field used for the lightweight thumbnail reference. Clarify (documentation-level, not a type change) that:
- `image`, when present after sanitization, MUST be either a `mediaAssetId` reference or a small compressed-thumbnail data URL already counted in `WorkspaceStorageUsage` (research.md §5) — never a raw file/blob/oversized data URL.
- A corresponding `MediaAsset` (`ownerType = "product_image"`, `ownerId = product.id`) is created alongside any persisted product image.

---

## Extended Entity: `CommerceSetup` (existing — `packages/types/src/commerce.ts`)

No new required fields — `logo: string | null` already exists. Clarify that:
- A non-null `logo` corresponds to a `MediaAsset` (`ownerType = "business_logo"`, `ownerId = setup.id`) created/updated through the same `tryAttachMedia` helper used by products, ensuring the logo counts toward `WorkspaceStorageUsage` exactly once (FR-017) and is referenced — not copied — by the shell, POS badge, receipts, and invoices (FR-014, FR-026).

---

## Extended Catalog: `PLAN_CATALOG` (existing — `packages/shared/src/mock-db/schema.ts`)

Add `storageLimitBytes` to each tier's `limits` object (research.md §7):

| Plan | `storageLimitBytes` (draft) |
|---|---|
| `commerce_starter` | `500 * 1024 * 1024` (500 MB) |
| `commerce_pro` | `5 * 1024 * 1024 * 1024` (5 GB) |
| `commerce_business` | `50 * 1024 * 1024 * 1024` (50 GB, "or custom") |

`CommercePlanInfo.limits` (in both `AppProvider`s) gains the same field so `COMMERCE_PLAN.limits.storageLimitBytes` is available wherever plan limits are already surfaced.

---

## New Storage Keys (existing registry — `STORAGE_KEYS` in schema.ts)

| Key constant | Storage | Purpose |
|---|---|---|
| `mediaAssets` | `localStorage` (`nexoraxs.db.mediaAssets`) | Collection of `MediaAsset` records, read/written via existing `readCollection`/`writeCollection` |
| `workspaceStorageUsage` | `localStorage` (`nexoraxs.db.workspaceStorageUsage`) | Collection of `WorkspaceStorageUsage` records (one per workspace), same access pattern |

Both keys are added to the array `clearAllStorage()` already iterates (research.md §6) — no bespoke reset code.

---

## Relationships Summary

```text
Workspace ──1:1── WorkspaceStorageUsage
Workspace ──1:N── MediaAsset
MediaAsset ──(by ownerType+ownerId, lookup only — no FK copy)──> CommerceSetup.logo
                                                              ──> CommerceProduct.image
                                                              ──> (future) store_banner / category_image owners
CommerceOrder ──1:1── CommerceInvoice   (cashierId/cashierName copied at creation, as customerId already is)
CommerceOrder.items[] = OrderItem[]      (unchanged — no image/media fields)
```

No new relationships are introduced between `MediaAsset`/`WorkspaceStorageUsage` and `BusinessUnit`/`Branch`/`OSSubscription` beyond the existing scoping fields already present on comparable Commerce records.
