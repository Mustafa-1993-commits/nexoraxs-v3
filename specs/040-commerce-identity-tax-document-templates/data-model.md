# Data Model: Commerce Identity, Tax & Document Templates

**Feature**: 040-commerce-identity-tax-document-templates
**Date**: 2026-06-03

---

## Overview

All data models are stored in sessionStorage (no backend). Each entity is serialized as JSON under a namespaced key. The types below define the shape of the stored data and the props passed between components.

---

## BusinessIdentity

Stored at session key: `commerce:identity`

```ts
interface BusinessIdentity {
  displayName: string;          // required; shown on all documents
  legalName?: string;           // optional; used on A4 tax invoice
  logoState: "none" | "mock";   // "mock" when a file has been selected (name stored in logoFileName)
  logoFileName?: string;        // filename of selected file (mock only; not processed)
  phone: string;                // required
  email: string;                // required
  address: string;              // required; multiline
  taxNumber?: string;           // optional; tax registration number
  commercialReg?: string;       // optional; commercial registration number
}
```

**Validation rules** (client-side only):
- `displayName`: non-empty, max 100 chars
- `phone`: non-empty, min 7 chars
- `email`: non-empty, basic email format (`@` present, domain has `.`)
- `address`: non-empty, max 500 chars
- `taxNumber`: optional; if present, max 30 chars
- `commercialReg`: optional; if present, max 30 chars

**Default (empty) state**:
```ts
{
  displayName: "",
  legalName: undefined,
  logoState: "none",
  phone: "",
  email: "",
  address: "",
  taxNumber: undefined,
  commercialReg: undefined,
}
```

---

## TaxSettings

Stored at session key: `commerce:tax`

```ts
interface TaxSettings {
  registered: boolean;          // true = tax registered; false = no tax invoices
  taxRate: number;              // 0–100 with up to 2 decimal places (e.g., 15.00)
  priceMode: "inclusive" | "exclusive"; // tax-inclusive or tax-exclusive pricing
}
```

**Validation rules**:
- `taxRate`: number in range [0, 100], max 2 decimal places
- When `registered` is false: `taxRate` and `priceMode` retain their values but are disabled in the UI

**Default state**:
```ts
{
  registered: false,
  taxRate: 15,
  priceMode: "exclusive",
}
```

**Business rules**:
- Discount is always applied before tax (calculation order: subtotal → subtract discount → apply tax)
- When `registered` is false: tax amount is 0 on all document previews; tax line is hidden

---

## InvoiceNumbering

Stored at session key: `commerce:invoicing`

```ts
interface InvoiceNumbering {
  receiptPrefix: string;  // max 10 chars; e.g., "RCP"
  invoicePrefix: string;  // max 10 chars; e.g., "INV"
  startingNumber: number; // integer ≥ 1
}
```

**Validation rules**:
- `receiptPrefix`: max 10 chars; alphanumeric + hyphens only
- `invoicePrefix`: max 10 chars; alphanumeric + hyphens only
- `startingNumber`: integer ≥ 1; defaults to 1 if blank or 0

**Derived display** (not stored):
```ts
function formatDocNumber(prefix: string, num: number): string {
  return `${prefix}-${String(num).padStart(4, "0")}`;
  // "RCP" + 1  → "RCP-0001"
  // "INV" + 100 → "INV-0100"
}
```

**Default state**:
```ts
{
  receiptPrefix: "RCP",
  invoicePrefix: "INV",
  startingNumber: 1,
}
```

---

## DocumentTemplatePreference

Stored per template type at: `commerce:template:{type}` (4 keys total)

```ts
type TemplateType = "receipt-58" | "receipt-80" | "invoice-a4" | "refund";
type TemplateStyle = "minimal" | "classic" | "detailed";

interface DocumentTemplatePreference {
  type: TemplateType;
  style: TemplateStyle;
}
```

**Default state** (per type):
```ts
{ type: "receipt-58",  style: "minimal"  }
{ type: "receipt-80",  style: "classic"  }
{ type: "invoice-a4",  style: "detailed" }
{ type: "refund",      style: "classic"  }
```

---

## TemplatePreviewData (in-memory only, not persisted)

Constructed at render time from live session store + mock cart.

```ts
interface PreviewLineItem {
  name: string;
  quantity: number;
  unitPrice: number;
  lineTotal: number;
}

interface TemplatePreviewData {
  business: BusinessIdentity | MockBusinessIdentity; // live or fallback
  items: PreviewLineItem[];
  subtotal: number;
  discountRate: number;      // 10% fixed for mock
  discountAmount: number;
  afterDiscount: number;
  taxRate: number;           // from TaxSettings or 15% default
  taxAmount: number;
  total: number;
  invoiceNumber: string;     // from InvoiceNumbering or "INV-0001" default
  date: string;              // ISO date string (current date)
  taxRegistered: boolean;    // from TaxSettings
}
```

**Mock business identity** (used when BusinessIdentity is not filled in):
```ts
const MOCK_IDENTITY: MockBusinessIdentity = {
  displayName: "Your Business Name",
  address: "123 Main Street, City",
  phone: "+20 10 0000 0000",
  email: "info@yourbusiness.com",
  taxNumber: "TAX-123456",
}
```

**Mock cart** (defined in `lib/mock-data/preview-cart.ts`):
```ts
const MOCK_ITEMS: PreviewLineItem[] = [
  { name: "Product A",  quantity: 2, unitPrice: 50.00, lineTotal: 100.00 },
  { name: "Product B",  quantity: 1, unitPrice: 30.00, lineTotal:  30.00 },
  { name: "Product C",  quantity: 3, unitPrice: 15.00, lineTotal:  45.00 },
];
// subtotal: 175.00
// discount: 10% = 17.50
// after discount: 157.50
// tax (15% default): 23.63
// total: 181.13
```

---

## State Transitions

### TaxSettings.registered

```
OFF → ON: taxRate and priceMode fields become enabled; tax line appears in preview
ON → OFF: taxRate and priceMode fields become disabled; tax line hidden in preview; tax invoices unavailable
```

### BusinessIdentity.logoState

```
"none" → "mock": file picker opened and file selected → shows initials placeholder + filename badge
"mock" → "none": user clicks remove → reverts to placeholder
```

### DocumentTemplatePreference.style

```
Any style → Any style: immediate re-render of DocumentPreview with new style; no page reload
```

---

## Settings Store API (lib/settings-store.ts)

```ts
// Business Identity
getIdentity(): BusinessIdentity | null
setIdentity(value: BusinessIdentity): void
subscribeToIdentity(cb: () => void): () => void

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

All functions follow the exact pattern from `lib/locale.ts`:
- `getX()` reads from `sessionStorage.getItem(KEY)` and JSON parses, returning `null` on miss/error
- `setX()` writes `JSON.stringify(value)` and dispatches a custom DOM event
- `subscribeToX()` adds/removes the event listener and returns the unsubscribe function
