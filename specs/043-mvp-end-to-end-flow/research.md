# Phase 0 Research: MVP End-to-End Flow Stabilization with Storage Quota

All items below were resolvable from the existing codebase and constitution — no [NEEDS CLARIFICATION] markers remained from the Technical Context.

## 1. Where should `MediaAsset` / `WorkspaceStorageUsage` live?

- **Decision**: Add both as shared types in `packages/types/src/core.ts` (alongside `Workspace`, `BusinessUnit`, `Branch`, `OSSubscription` — platform-level entities) and back them with new collections in `packages/shared/src/mock-db` (`STORAGE_KEYS.mediaAssets`, `STORAGE_KEYS.workspaceStorageUsage`), with selectors/actions in the existing `selectors.ts`/`actions.ts`.
- **Rationale**: The constitution treats audit logs, notifications, and document templates as "platform patterns" owned by shared infrastructure with OS-specific producers (Article XIII, XII). Storage quota follows the same shape — it is a *workspace-level* concern (Article VII: "Core Platform … workspace-level plan limits") that Commerce *consumes*. Placing the model in shared types/mock-db keeps Core Platform able to *display* it (FR-009, FR-045) without owning Commerce's media-producing logic, and keeps Commerce able to *produce* media assets (FR-011, FR-017, FR-030) without duplicating the quota model — mirroring the existing `CommerceSetup`/`CommerceProduct` pattern where shared types are produced by one app and consumed elsewhere through `@nexoraxs/types` + `@nexoraxs/shared`.
- **Alternatives considered**:
  - *Put MediaAsset fully inside Commerce (`packages/types/src/commerce.ts`)*: rejected — future producers (business logo is technically workspace identity, future OS document branding assets per Article XII) would force Commerce-only types to be imported by Core or other OSes, creating the cross-domain coupling the constitution forbids.
  - *Duplicate a lightweight usage counter inside each app's local state only*: rejected — quota must be workspace-wide and consistent across the handoff boundary; a duplicated, app-local counter would drift and violates the single-source-of-truth expectation already established by `STORAGE_KEYS`.

## 2. How should image compression be implemented for the local/demo layer?

- **Decision**: Implement a small client-side compression helper in `packages/shared` (e.g., `compressImageToThumbnail(file): Promise<{ dataUrl: string; sizeBytes: number; width: number; height: number } | null>`) using the Canvas API (`<canvas>` + `toDataURL`/`toBlob`) already available in the browser runtime — no new dependency required. Target output: max dimension ~160–240px, quality ~0.6–0.75, reject (return `null`) if the resulting estimated byte size exceeds a safe ceiling (e.g., ~60KB).
- **Rationale**: The existing `isPersistableProductImage()` in `apps/commerce/lib/store/AppProvider.tsx` currently *strips all* `data:`/`blob:` images before persisting — meaning no product images survive a save today. The spec requires keeping *small* compressed thumbnails while still preventing `QuotaExceededError` (FR-030, FR-013). The Canvas API is zero-dependency, works fully client-side (SSR-safe when guarded by `typeof window !== "undefined"`, consistent with existing `storage.ts` guards), and is the standard browser-native approach for this kind of demo-grade compression — no external image library is justified for a feature this scoped.
- **Alternatives considered**:
  - *Add an external compression library (e.g., browser-image-compression)*: rejected — introduces a new dependency for a capability the Canvas API already provides; conflicts with "no overengineering for MVP" (Article XVI) for a feature whose own spec calls the persistence layer "demo only".
  - *Store the original file as a Blob URL and only reference it*: rejected — Blob URLs do not survive page reloads/`localStorage` serialization, and the spec explicitly forbids relying on transient blob/file objects in stored records (FR-048, "strip raw file objects, blob objects … oversized data URLs").

## 3. How should the pre-save storage-quota check be wired in?

- **Decision**: Add a single shared helper, e.g. `tryAttachMedia({ workspaceId, ownerType, file, ... }) → { asset: MediaAsset, usage: WorkspaceStorageUsage } | { blocked: true, reason }`, exposed through `AppProvider` actions (`addProduct`, `saveCommerceSetup` for logo, future banner/category-image flows). The helper: compresses → estimates `sizeBytes` → reads current `WorkspaceStorageUsage` → compares against the workspace's plan `storageLimitBytes` → on success, persists the `MediaAsset`, increments usage, and returns a lightweight reference (`mediaAssetId` + `thumbnailUrl`); on failure, returns a "blocked" result so the calling screen can save the parent record without the image and show the prescribed toast.
- **Rationale**: This mirrors the existing `addProduct`/`createOrder` pattern in `AppProvider.tsx` — actions encapsulate read-check-write sequences and call `showToast` on the relevant outcome, keeping pages thin (consistent with "no business logic in pages/components"). It also satisfies the "save main record even if image is blocked" requirement (FR-013, FR-030) by separating the media-attach step from the parent-record-save step, so a blocked image never blocks the product/setup save.
- **Alternatives considered**:
  - *Check quota inside each page before calling `addProduct`*: rejected — duplicates the check across Products, Setup Wizard logo, and any future banner/category-image screens, and risks pages reaching into mock-db state directly (forbidden by FR-048 / Article XVI shared-package rule).
  - *Block the parent save entirely when quota is exceeded*: rejected — explicitly contradicts FR-013/FR-030 ("save product without image … keep main record creation possible").

## 4. How should cashier identity be captured and propagated?

- **Decision**: Resolve `cashierId`/`cashierName` inside the existing `createOrder` action in `apps/commerce/lib/store/AppProvider.tsx` from `state.currentUser` (using the already-available `getUserDisplayName` helper from `@nexoraxs/shared`, with fallback literal `"Cashier"`), store both fields directly on `CommerceOrder`, and copy them onto `CommerceInvoice` inside `createInvoice` (mirroring how `customerId` is already copied from order to invoice). The POS Checkout UI reads `currentUserDisplayName` (already exposed by `AppProvider`) to render the "Cashier: …" row without any new input.
- **Rationale**: `currentUser` and `currentUserDisplayName` already exist on the `AppContextType` in both apps; `createOrder`/`createInvoice` already follow an order→invoice field-copy pattern for `customerId`/totals. Adding two fields to existing interfaces and populating them inside the existing action functions is the smallest change that satisfies FR-033/FR-036/FR-039/FR-040 without inventing a new capture mechanism or requiring manual entry (which the spec explicitly forbids).
- **Alternatives considered**:
  - *Ask the cashier to confirm/select their name at checkout*: rejected — spec explicitly states "Do not ask user to type cashier manually in MVP."
  - *Derive cashier name at render time from a separate staff/session lookup*: rejected — adds an indirection the spec does not require ("cashierId comes from currentUser.id … Do not ask…"), and risks showing a different name later if the user's profile changes; capturing at creation time preserves a faithful historical record, which is the standard pattern for `createdAt`/totals already on these records.

## 5. How should existing `sanitizeProductForStorage` change without breaking quota safety?

- **Decision**: Replace the current "always strip any `data:`/`blob:` image" rule with: keep the image *only if* it is a `mediaAssetId`-style reference or a thumbnail `dataUrl` known to be small (produced by the new compression helper and already accounted for in `WorkspaceStorageUsage`); continue stripping raw files/blobs/oversized data URLs/`imagePreview`/`businessLogo`/`logo` fields exactly as the spec requires (FR-048).
- **Rationale**: The current implementation satisfies "never store full-size base64" but over-corrects by deleting *every* data-URL image, which silently defeats "Add Product with image" — a core MVP acceptance scenario (#10–12 in spec.md). Narrowing the predicate from "is it a data:/blob: URL" to "is it a *small, already-quota-checked* thumbnail reference" keeps the original safety guarantee (no large/raw payloads ever reach `localStorage`) while finally allowing the feature to work end-to-end.
- **Alternatives considered**:
  - *Leave `sanitizeProductForStorage` untouched and store images elsewhere only*: rejected — the spec requires products/POS/Inventory to render the thumbnail directly (FR-029), and the simplest, most consistent reference is the same lightweight thumbnail/`mediaAssetId` already validated and counted by the quota helper.

## 6. How should the demo "reset" be extended?

- **Decision**: Add `STORAGE_KEYS.mediaAssets` and `STORAGE_KEYS.workspaceStorageUsage` to the array already iterated by `clearAllStorage()` in `packages/shared/src/mock-db/storage.ts` (and to whatever seed/reset action re-creates baseline records), so reset clears them along with every other collection.
- **Rationale**: `clearAllStorage` already iterates `Object.values(STORAGE_KEYS)`, so simply registering the new keys in `STORAGE_KEYS` (schema.ts) makes reset "just work" — zero new logic, satisfying FR-049 with the smallest possible change and matching the existing single-source-of-truth key registry pattern.
- **Alternatives considered**: *Write bespoke clearing logic for the new collections*: rejected — redundant given `clearAllStorage` is already generic over `STORAGE_KEYS`.

## 7. How should plan storage limits be represented alongside existing `PLAN_CATALOG`?

- **Decision**: Extend each entry's `limits` object in `PLAN_CATALOG` (schema.ts) with `storageLimitBytes` (e.g., Starter `500 * 1024 * 1024`, Pro `5 * 1024 * 1024 * 1024`, Business `50 * 1024 * 1024 * 1024`), matching the spec's draft numbers, and surface a small `bytesToReadable()`/usage-percentage selector in `selectors.ts` for display.
- **Rationale**: `PLAN_CATALOG` already centralizes `{ businessUnits, branches, users }` limits consumed by `COMMERCE_PLAN`/`CommercePlanInfo` in `AppProvider`; adding one more numeric field is the minimal, idiomatic extension and keeps "plan limits" as a single source of truth (Article VII), avoiding a parallel storage-plan concept.
- **Alternatives considered**: *Create a separate `STORAGE_PLAN_CATALOG`*: rejected — would fragment plan-limit data the constitution describes as one concern, and would require keeping two catalogs in sync.

---

**Output**: All Technical Context items resolved; no remaining unknowns. Proceeding to Phase 1.
