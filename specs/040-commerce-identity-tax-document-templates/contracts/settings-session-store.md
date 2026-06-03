# Contract: Settings Session Store

**Feature**: 040-commerce-identity-tax-document-templates
**Date**: 2026-06-03
**Location**: `apps/shops-app/lib/settings-store.ts`

---

## Purpose

Defines the typed interface for all Commerce settings stored in the browser session. This contract governs how session data is written, read, and subscribed to by settings components and the document preview renderer.

---

## Storage Keys

| Entity | Session Key | Event Name |
|--------|-------------|------------|
| BusinessIdentity | `commerce:identity` | `nexoraxs:identity-change` |
| TaxSettings | `commerce:tax` | `nexoraxs:tax-change` |
| InvoiceNumbering | `commerce:invoicing` | `nexoraxs:invoicing-change` |
| DocumentTemplatePreference (per type) | `commerce:template:{type}` | `nexoraxs:template-change` |

---

## Function Signatures

```ts
// Business Identity
getIdentity(): BusinessIdentity | null
setIdentity(value: BusinessIdentity): void
subscribeToIdentity(cb: () => void): () => void  // returns unsubscribe

// Tax Settings
getTaxSettings(): TaxSettings | null
setTaxSettings(value: TaxSettings): void
subscribeToTaxSettings(cb: () => void): () => void

// Invoice Numbering
getInvoiceNumbering(): InvoiceNumbering | null
setInvoiceNumbering(value: InvoiceNumbering): void
subscribeToInvoiceNumbering(cb: () => void): () => void

// Template Preferences
getTemplatePreference(type: TemplateType): DocumentTemplatePreference | null
setTemplatePreference(type: TemplateType, value: DocumentTemplatePreference): void
subscribeToTemplatePreference(cb: () => void): () => void
```

---

## Behavioral Rules

1. All `getX()` functions MUST return `null` when the key does not exist in sessionStorage or when parsing fails — never throw.
2. All `setX()` functions MUST write the value and dispatch the corresponding DOM event synchronously.
3. All `subscribeToX()` functions MUST add the event listener and return a cleanup function that removes it.
4. All functions MUST guard against SSR (no `window` access during server-side rendering) by returning `null` / no-op.
5. Template preference keys are per-type: `getTemplatePreference("receipt-58")` reads `commerce:template:receipt-58`.

---

## Usage Pattern (mirrors lib/locale.ts)

```ts
// Reading with React hook
function useIdentity() {
  return useSyncExternalStore(
    subscribeToIdentity,
    () => getIdentity(),
    () => null,
  );
}
```

---

## Constraints

- This store is session-only. Values do not persist across browser restarts.
- No encryption or validation is applied to stored values — they are trusted as coming from the settings UI.
- This store MUST NOT be imported by any file outside `apps/shops-app`.
- Future backend integration will replace this store without changing the function signatures visible to consumers.
