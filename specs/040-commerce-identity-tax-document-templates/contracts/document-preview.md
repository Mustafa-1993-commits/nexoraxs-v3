# Contract: Document Preview Component

**Feature**: 040-commerce-identity-tax-document-templates
**Date**: 2026-06-03
**Location**: `apps/shops-app/components/settings/DocumentPreview.tsx`

---

## Purpose

Defines the rendering contract for the `DocumentPreview` component — the live preview panel in the Document Templates settings page. The component is a pure visual renderer; it holds no state and makes no session store calls.

---

## Component Props

```ts
interface DocumentPreviewProps {
  templateType: TemplateType;       // "receipt-58" | "receipt-80" | "invoice-a4" | "refund"
  style: TemplateStyle;             // "minimal" | "classic" | "detailed"
  previewData: TemplatePreviewData; // assembled by parent from session store + mock cart
  locale: "en" | "ar";             // current language — controls dir attribute and text
}
```

---

## Rendering Rules

### Container

- The preview container sets `dir={locale === "ar" ? "rtl" : "ltr"}` on its root element.
- Width is fixed per template type:
  - `receipt-58`: max-width 220px
  - `receipt-80`: max-width 302px
  - `invoice-a4`: max-width 794px (scrollable)
  - `refund`: max-width 302px

### Required Content Blocks (by template type)

**All templates MUST include**:
- Business display name
- Date of document
- Document number (from previewData.invoiceNumber)
- Line items table (name, qty, unit price, line total)
- Subtotal
- Total

**When `previewData.taxRegistered` is true**:
- Tax rate label and amount (e.g., "VAT 15%: 23.63")

**When `previewData.taxRegistered` is false**:
- Tax line is hidden
- When `templateType === "invoice-a4"`: show notice banner "Tax invoices require tax registration"

**When discount > 0**:
- Discount line (e.g., "Discount 10%: -17.50")

**A4 Tax Invoice additionally MUST include**:
- Legal name (if present)
- Tax registration number (if present)
- Commercial registration number (if present)
- Address
- Full itemized table with unit price column

### Style Variations

| Style | Header | Item list | Amounts | Footer |
|-------|--------|-----------|---------|--------|
| Minimal | Name only | Plain list, no borders | Total only | None |
| Classic | Name + address | Lines between items | Subtotal + Tax + Total | Thank you note |
| Detailed | Full identity block | Grid with qty/price/total cols | Subtotal + Discount + Tax + Total | Tax invoice note |

### Logo / Initials

- If `previewData.business.logoState === "mock"`: show a colored initials block (first 2 chars of displayName, uppercase)
- If `logoState === "none"`: show the same initials block as placeholder

### Missing Business Identity

- If `previewData.business` is the mock fallback (displayName is "Your Business Name"): render normally — the mock data provides all required fields.

---

## Immutability Constraint

`DocumentPreview` is a **pure component** — it MUST NOT:
- Read from sessionStorage
- Write to sessionStorage
- Dispatch DOM events
- Use `useEffect` for data fetching

All data is passed via props. The parent (`DocumentTemplatesPanel`) is responsible for reading from the session store and passing assembled `TemplatePreviewData`.

---

## RTL Compliance

- All margin/padding/border utilities MUST use logical properties: `ps-*`, `pe-*`, `ms-*`, `me-*`, `border-s-*`, `border-e-*`, `text-start`, `text-end`.
- The `dir` attribute on the root element is sufficient for Tailwind logical properties to flip automatically.
- No `dir`-specific class variants needed.
