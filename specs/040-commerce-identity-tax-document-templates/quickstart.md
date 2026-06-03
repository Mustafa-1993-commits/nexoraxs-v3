# Quickstart: Commerce Identity, Tax & Document Templates

**Feature**: 040-commerce-identity-tax-document-templates
**Date**: 2026-06-03

---

## What This Builds

4 new settings sub-pages + 6 new components + 1 session store module, all within `apps/shops-app`. The existing settings page and sidebar are lightly modified.

---

## Implementation Order

1. **lib/settings-store.ts** — session store (foundation for all other work)
2. **lib/mock-data/preview-cart.ts** — mock cart data for preview
3. **components/settings/SettingsNav.tsx** — tab navigation
4. **app/(app)/settings/layout.tsx** — wraps all settings routes with SettingsNav
5. **Business Identity** — form + page
6. **Tax Settings** — form + page
7. **Invoice Numbering** — form + page
8. **Document Templates** — panel + preview + page (most complex; build last)
9. **Sidebar.tsx** — enable Taxes nav item (1 line change)

---

## File-by-File Guide

### 1. `lib/settings-store.ts` (NEW)

Mirror the exact pattern from `lib/locale.ts`. Four entity groups, each with get/set/subscribe:

```ts
const IDENTITY_KEY = "commerce:identity";
const IDENTITY_EVENT = "nexoraxs:identity-change";

export function getIdentity(): BusinessIdentity | null {
  if (typeof window === "undefined") return null;
  try {
    const raw = sessionStorage.getItem(IDENTITY_KEY);
    return raw ? (JSON.parse(raw) as BusinessIdentity) : null;
  } catch { return null; }
}

export function setIdentity(value: BusinessIdentity): void {
  if (typeof window === "undefined") return;
  sessionStorage.setItem(IDENTITY_KEY, JSON.stringify(value));
  window.dispatchEvent(new Event(IDENTITY_EVENT));
}

export function subscribeToIdentity(cb: () => void): () => void {
  window.addEventListener(IDENTITY_EVENT, cb);
  return () => window.removeEventListener(IDENTITY_EVENT, cb);
}
// Repeat pattern for TaxSettings (commerce:tax / nexoraxs:tax-change)
// Repeat for InvoiceNumbering (commerce:invoicing / nexoraxs:invoicing-change)
// Repeat for TemplatePreference with type parameter (commerce:template:{type} / nexoraxs:template-change)
```

Import type interfaces from a new `lib/settings-types.ts` or co-locate them in `settings-store.ts`.

---

### 2. `lib/mock-data/preview-cart.ts` (NEW)

```ts
export const MOCK_PREVIEW_ITEMS = [
  { name: "Product A",  quantity: 2, unitPrice: 50.00, lineTotal: 100.00 },
  { name: "Product B",  quantity: 1, unitPrice: 30.00, lineTotal:  30.00 },
  { name: "Product C",  quantity: 3, unitPrice: 15.00, lineTotal:  45.00 },
];

export const MOCK_IDENTITY = {
  displayName: "Your Business Name",
  address: "123 Main Street, City",
  phone: "+20 10 0000 0000",
  email: "info@yourbusiness.com",
  taxNumber: "TAX-123456",
};

export const MOCK_DISCOUNT_RATE = 0.10; // 10%
```

---

### 3. `components/settings/SettingsNav.tsx` (NEW)

Active tab determined by `usePathname()`. Five tabs: General (`/settings`), Identity (`/settings/identity`), Tax (`/settings/tax`), Invoicing (`/settings/invoicing`), Templates (`/settings/templates`).

Use `Link` from `next/link`. Apply active styling when `pathname === tab.href` or `pathname.startsWith(tab.href)` for sub-routes.

---

### 4. `app/(app)/settings/layout.tsx` (NEW)

```tsx
import { SettingsNav } from "@/components/settings/SettingsNav";

export default function SettingsLayout({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <div className="mb-6">
        <p className="chip mb-2 text-gray-500">{"// settings"}</p>
        <h1 className="text-3xl font-bold tracking-tight text-white">Settings</h1>
        <p className="mt-2 text-sm text-gray-400">
          Configure your Commerce OS preferences.
        </p>
      </div>
      <SettingsNav />
      <div className="mt-6">{children}</div>
    </div>
  );
}
```

**IMPORTANT**: Remove the duplicated header (`// settings` chip + h1 + p) from the existing `app/(app)/settings/page.tsx` so it doesn't render twice. The layout now owns it.

---

### 5. `app/(app)/settings/identity/page.tsx` (NEW)

```tsx
import { BusinessIdentityForm } from "@/components/settings/BusinessIdentityForm";
export default function IdentityPage() {
  return <BusinessIdentityForm />;
}
```

---

### 6. `components/settings/BusinessIdentityForm.tsx` (NEW)

- `"use client"` directive
- Read initial state from `getIdentity()` via `useSyncExternalStore(subscribeToIdentity, getIdentity, () => null)`
- Controlled form state (local `useState` for all fields)
- On save: validate required fields, call `setIdentity(formState)`, show success indicator
- Logo area: dashed border div with upload icon; `<input type="file" accept="image/*" className="hidden" ref={fileInputRef} />`; on change → set logoState: "mock", logoFileName: file.name
- All labels use `text-start` alignment

---

### 7. `components/settings/TaxSettingsForm.tsx` (NEW)

- Toggle: custom styled `<button role="switch" aria-checked={registered}>` or a checkbox-styled toggle
- When `registered` is false: `taxRate` input and `priceMode` select are `disabled`
- Informational note: "Discounts are applied before tax in all POS calculations"
- On save: call `setTaxSettings(formState)`

---

### 8. `components/settings/InvoiceNumberingForm.tsx` (NEW)

- Three inputs: receipt prefix, invoice prefix, starting number
- Derived display (not stored): update on every change
- Example output:
  ```tsx
  <code>
    {`${receiptPrefix || "PREFIX"}-${String(Math.max(1, startingNumber)).padStart(4, "0")}`}
  </code>
  ```
- Starting number validation: if blank or 0, show inline message "Minimum value is 1"

---

### 9. `components/settings/DocumentTemplatesPanel.tsx` (NEW)

- Left side: 4 template type buttons (TemplateType selector)
- Below selector: 3 style buttons (Minimal / Classic / Detailed)
- Right side: `<DocumentPreview />` component
- State: `selectedType` and `selectedStyle` in local `useState`; initial values read from session store
- On style change: update local state immediately (preview re-renders); save to session store
- Layout: `grid grid-cols-1 lg:grid-cols-[300px_1fr]` for side-by-side on desktop

---

### 10. `components/settings/DocumentPreview.tsx` (NEW)

Pure component (no hooks except `useMemo` for calculations).

```tsx
export function DocumentPreview({ templateType, style, previewData, locale }: DocumentPreviewProps) {
  const isRTL = locale === "ar";

  // Calculate totals from previewData
  const { subtotal, discountAmount, afterDiscount, taxAmount, total } = useMemo(() => {
    const sub = previewData.items.reduce((s, i) => s + i.lineTotal, 0);
    const disc = previewData.taxRegistered ? sub * previewData.discountRate : sub * previewData.discountRate;
    const after = sub - disc;
    const tax = previewData.taxRegistered ? after * (previewData.taxRate / 100) : 0;
    return { subtotal: sub, discountAmount: disc, afterDiscount: after, taxAmount: tax, total: after + tax };
  }, [previewData]);

  return (
    <div
      dir={isRTL ? "rtl" : "ltr"}
      className={`bg-white text-black rounded-lg overflow-auto ${widthClass(templateType)}`}
    >
      {/* Render based on templateType and style */}
    </div>
  );
}
```

**Width classes**: receipt-58 → `max-w-[220px]`, receipt-80 → `max-w-[302px]`, invoice-a4 → `max-w-[794px]`, refund → `max-w-[302px]`

**Tax invoice notice** (when templateType === "invoice-a4" && !previewData.taxRegistered):
```tsx
<div className="rounded border border-amber-200 bg-amber-50 p-3 text-sm text-amber-800">
  Tax invoices require tax registration to be enabled in Tax Settings.
</div>
```

---

### 11. `components/dashboard/Sidebar.tsx` (MODIFY)

In the `configure` array, change the Taxes entry:
```ts
// Before
{ label: "Taxes", href: "#", icon: "percent", disabled: true },

// After
{ label: "Taxes", href: "/settings/tax", icon: "percent" },
```

---

## Verification Checklist

After implementation:

- [ ] Navigate to `/settings` — SettingsNav tabs visible with 5 tabs; existing content still renders
- [ ] Navigate to `/settings/identity` — Business Identity form visible; all 8 fields present
- [ ] Fill required fields, save — return to page, values persist; refresh clears (session only)
- [ ] Navigate to `/settings/tax` — Tax Settings form visible; toggle, rate, price mode present
- [ ] Toggle "Tax Registered" OFF — rate and price mode fields become disabled
- [ ] Navigate to `/settings/invoicing` — Invoice Numbering form; type in prefix → example updates in real time
- [ ] Navigate to `/settings/templates` — DocumentTemplatesPanel visible; switch template types
- [ ] Select different style — preview panel updates immediately without page reload
- [ ] A4 Tax Invoice + Tax Registered OFF — amber notice visible in preview
- [ ] Sidebar "Taxes" link enabled — clicking it navigates to `/settings/tax`
- [ ] Switch locale to Arabic — settings labels change; document preview renders RTL
- [ ] `pnpm --filter shops-app build` — zero TypeScript errors
