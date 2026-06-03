---
description: "Task list for Commerce Identity, Tax & Document Templates — 15 new files + 3 modifications in apps/shops-app"
---

# Tasks: Commerce Identity, Tax & Document Templates

**Input**: Design documents from `specs/040-commerce-identity-tax-document-templates/`
**Prerequisites**: plan.md ✅ · spec.md ✅ · research.md ✅ · data-model.md ✅ · contracts/ ✅ · quickstart.md ✅

**Tests**: Not requested. Verification is manual via browser + TypeScript build (see quickstart.md).

**Organization**: Tasks grouped by user story. Foundation (session store + nav) must complete before any story work begins. US1 and US2 can proceed in parallel after foundation. US3 and US4 can proceed after US1/US2 foundation is stable. US5 (RTL/i18n) finalizes cross-cutting concerns.

## Format: `[ID] [P?] [Story?] Description`

- **[P]**: Can run in parallel (different files, no state dependencies)
- **[Story]**: Which user story this task belongs to
- **No [P]**: Same file or blocked by prior task

---

## Phase 1: Setup

**Purpose**: Create the two foundation library files that all settings components depend on. No UI yet.

- [x] T001 Create `apps/shops-app/lib/settings-store.ts` — implement typed sessionStorage get/set/subscribe helpers for all 4 entities (BusinessIdentity, TaxSettings, InvoiceNumbering, DocumentTemplatePreference) following the exact pattern of `lib/locale.ts`; session keys: `commerce:identity`, `commerce:tax`, `commerce:invoicing`, `commerce:template:{type}`; custom events: `nexoraxs:identity-change`, `nexoraxs:tax-change`, `nexoraxs:invoicing-change`, `nexoraxs:template-change`; include type definitions for all 4 entities (BusinessIdentity, TaxSettings, InvoiceNumbering, TemplateType, TemplateStyle, DocumentTemplatePreference) inline or in a co-located types block
- [x] T002 [P] Create `apps/shops-app/lib/mock-data/preview-cart.ts` — export `MOCK_PREVIEW_ITEMS` (3 line items: Product A ×2 @50, Product B ×1 @30, Product C ×3 @15), `MOCK_IDENTITY` (placeholder business name/address/phone/email/taxNumber), and `MOCK_DISCOUNT_RATE = 0.10`

T001 and T002 are parallelizable (different files).

**Checkpoint**: Session store and mock data ready — foundation for all components

---

## Phase 2: Foundational (Blocking Prerequisites)

**Purpose**: Settings navigation wrapper and sidebar update — MUST complete before any user story page can be accessed

**⚠️ CRITICAL**: T003→T004→T005 are sequential (shared route group). T006 is independent.

- [x] T003 Create `apps/shops-app/components/settings/SettingsNav.tsx` — `"use client"` component; horizontal tab bar with 5 tabs using `usePathname()` for active state; tabs: General (`/settings`, icon: settings), Identity (`/settings/identity`, icon: building-2), Tax (`/settings/tax`, icon: percent), Invoicing (`/settings/invoicing`, icon: hash), Templates (`/settings/templates`, icon: file-text); active tab highlighted; use `Link` from `next/link`; use Tailwind logical properties (`ps-*`, `pe-*`, `text-start`)
- [x] T004 Create `apps/shops-app/app/(app)/settings/layout.tsx` — settings sub-route layout; renders a page header section (`// settings` chip + h1 "Settings" + description paragraph) followed by `<SettingsNav />` tabs followed by `{children}`; import SettingsNav from `@/components/settings/SettingsNav`
- [x] T005 Update `apps/shops-app/app/(app)/settings/page.tsx` — remove the existing page-level header (the `// settings` chip, the `<h1>Settings</h1>`, and the description paragraph) since these are now rendered by the layout; preserve all other content (Store Profile, Shop Mode, Team, Advanced sections) unchanged
- [x] T006 [P] Update `apps/shops-app/components/dashboard/Sidebar.tsx` — in the `configure` nav array, change the Taxes entry from `{ label: "Taxes", href: "#", icon: "percent", disabled: true }` to `{ label: "Taxes", href: "/settings/tax", icon: "percent" }` (remove the disabled flag and set the correct href)

T006 can run in parallel with T003 (different files).

**Checkpoint**: Navigate to `/settings` → SettingsNav tabs visible; click "Taxes" in sidebar → navigates to `/settings/tax` (404 is expected until US2 page is created)

---

## Phase 3: User Story 1 — Owner Configures Business Identity (Priority: P1) 🎯 MVP

**Goal**: Business Identity form with all 8 fields, client-side validation, and session persistence

**Independent Test**: Navigate to `/settings/identity`. Form shows 8 fields (Display Name required, Legal Name optional, Logo area, Phone required, Email required, Address required, Tax Number optional, Commercial Reg optional). Fill all required fields, click Save — success indicator appears. Navigate to another settings tab and return — values still present. Attempt to save with Display Name empty — inline validation error appears and save is blocked.

### Implementation for User Story 1

- [x] T007 [US1] Create `apps/shops-app/components/settings/BusinessIdentityForm.tsx` — `"use client"` component; controlled form state with `useState` for all fields; read initial state via `useSyncExternalStore(subscribeToIdentity, getIdentity, () => null)` from `lib/settings-store`; fields: displayName (required, text input), legalName (optional, text input), logo area (dashed border placeholder div + hidden `<input type="file" accept="image/*">` triggered by a button; on file select: update logoState to "mock" and store logoFileName), phone (required, text input), email (required, text input with basic format validation), address (required, textarea), taxNumber (optional, text input), commercialReg (optional, text input); Save button: validates required fields inline, calls `setIdentity(formState)` on success, shows a brief success badge; all layout uses Tailwind logical properties (`ps-*`, `pe-*`, `text-start`)
- [x] T008 [US1] Create `apps/shops-app/app/(app)/settings/identity/page.tsx` — server component wrapper that renders `<BusinessIdentityForm />`; add `"use client"` only if needed by the import chain

**Checkpoint**: `/settings/identity` is fully functional — US1 independently testable

---

## Phase 4: User Story 2 — Owner Configures Tax Settings (Priority: P1) 🎯 MVP

**Goal**: Tax Settings form with registered toggle, tax rate, price mode, and conditional field disabling

**Independent Test**: Navigate to `/settings/tax`. Toggle "Tax Registered" shows ON/OFF states. When OFF: Default Tax Rate and Price Mode fields are visually disabled. When ON: both fields are editable. Set rate to 15%, mode to "Tax Exclusive", save. Return to page — values persist. Toggle OFF, save — tax fields appear disabled.

### Implementation for User Story 2

- [x] T009 [P] [US2] Create `apps/shops-app/components/settings/TaxSettingsForm.tsx` — `"use client"` component; read initial state via `useSyncExternalStore(subscribeToTaxSettings, getTaxSettings, () => null)`; default state: `{ registered: false, taxRate: 15, priceMode: "exclusive" }`; toggle button with `role="switch"` and `aria-checked` for "Tax Registered" field; number input for Default Tax Rate (min=0, max=100, step=0.01) — `disabled` when `registered` is false; select/button group for Price Mode ("Tax Inclusive" | "Tax Exclusive") — `disabled` when `registered` is false; informational note: "Discounts are applied before tax in all POS calculations"; Save button calls `setTaxSettings(formState)`
- [x] T010 [US2] Create `apps/shops-app/app/(app)/settings/tax/page.tsx` — server component wrapper that renders `<TaxSettingsForm />`

T009 can run in parallel with T007 (different files).

**Checkpoint**: `/settings/tax` functional — toggle disables/enables rate and price mode; US2 independently testable

---

## Phase 5: User Story 3 — Owner Configures Invoice Numbering (Priority: P2)

**Goal**: Invoice Numbering form with 3 inputs and a real-time formatted example output

**Independent Test**: Navigate to `/settings/invoicing`. Three inputs visible: Receipt Prefix, Invoice Prefix, Starting Number. Type "RCP" in Receipt Prefix and "1" in Starting Number — example output immediately shows "RCP-0001". Change Starting Number to 100 — example immediately shows "RCP-0100". Leave Starting Number at 0 — inline message "Minimum value is 1" appears. Save — return to page, values persist.

### Implementation for User Story 3

- [x] T011 [P] [US3] Create `apps/shops-app/components/settings/InvoiceNumberingForm.tsx` — `"use client"` component; read initial state via `useSyncExternalStore(subscribeToInvoiceNumbering, getInvoiceNumbering, () => null)`; default state: `{ receiptPrefix: "RCP", invoicePrefix: "INV", startingNumber: 1 }`; three controlled inputs; `formatDocNumber(prefix, num)` pure function: `${prefix || "PREFIX"}-${String(Math.max(1, num || 1)).padStart(4, "0")}`; two example output lines (receipt and invoice) update on every keystroke with no debounce; inline validation: if startingNumber ≤ 0 or blank, show "Minimum value is 1" and set effective value to 1 for the example; Save button calls `setInvoiceNumbering(formState)` with `startingNumber` clamped to minimum 1
- [x] T012 [US3] Create `apps/shops-app/app/(app)/settings/invoicing/page.tsx` — server component wrapper that renders `<InvoiceNumberingForm />`

T011 can run in parallel with T009 (different files, different stories).

**Checkpoint**: `/settings/invoicing` functional — live example updates on every keystroke; US3 independently testable

---

## Phase 6: User Story 4 — Owner Configures Document Templates with Live Preview (Priority: P2)

**Goal**: Template type selector + style picker + live preview panel that updates immediately on style change

**Independent Test**: Navigate to `/settings/templates`. Left side shows 4 template type buttons. Below shows 3 style buttons. Right side shows a preview panel. Select "POS Receipt 80mm" → preview shows receipt layout at ~302px width. Click "Classic" → preview shows divider lines between items. Switch to "Minimal" → preview immediately simplifies without page reload. Select "A4 Tax Invoice" with Tax Registered OFF → amber notice appears in preview. Preview always shows: business name (from session or placeholder), 3 sample line items, subtotal, tax, total.

### Implementation for User Story 4

- [x] T013 [US4] Create `apps/shops-app/components/settings/DocumentPreview.tsx` — pure component (no session store calls; no useEffect for data); props: `{ templateType: TemplateType; style: TemplateStyle; previewData: TemplatePreviewData; locale: "en" | "ar" }`; root div sets `dir={locale === "ar" ? "rtl" : "ltr"}`; width class based on templateType (220px/302px/794px/302px); `useMemo` for tax/discount calculation: subtotal from items sum → discount = subtotal × discountRate → afterDiscount → tax = previewData.taxRegistered ? afterDiscount × (taxRate/100) : 0 → total = afterDiscount + tax; render varies by templateType + style combination (Minimal: name + list + total; Classic: name + address + dividers + subtotal/tax/total; Detailed: full identity block + grid table + all financial lines); when templateType === "invoice-a4" && !previewData.taxRegistered: show amber notice `"Tax invoices require tax registration to be enabled in Tax Settings."`; logo: if logoState === "mock" or "none", show a `<div>` with first 2 uppercase chars of displayName; all padding/margin uses logical properties; import types from `lib/settings-store`; import mock data from `lib/mock-data/preview-cart`
- [x] T014 [US4] Create `apps/shops-app/components/settings/DocumentTemplatesPanel.tsx` — `"use client"` component; local state: `selectedType: TemplateType` (default "receipt-80") and `selectedStyle: TemplateStyle` (default from session store or "classic"); reads BusinessIdentity and TaxSettings from session store via useSyncExternalStore; assembles `TemplatePreviewData` from session store values + MOCK_PREVIEW_ITEMS; on style change: update local state immediately + call `setTemplatePreference(type, { type, style })`; layout: `grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-6`; left panel: 4 template type buttons (receipt-58, receipt-80, invoice-a4, refund) + 3 style buttons (minimal, classic, detailed); right panel: scrollable preview area wrapping `<DocumentPreview />`; passes locale from `getLocale()` to DocumentPreview
- [x] T015 [US4] Create `apps/shops-app/app/(app)/settings/templates/page.tsx` — server component wrapper that renders `<DocumentTemplatesPanel />`

T013 must complete before T014 (import dependency). T015 depends on T014.

**Checkpoint**: `/settings/templates` functional — 4×3=12 preview combinations render; live update on style switch; amber notice on A4+no-tax; US4 independently testable

---

## Phase 7: User Story 5 — Bilingual and RTL-Ready Settings (Priority: P3)

**Goal**: All 4 settings areas use i18n-ready labels and the document preview renders RTL-correct when Arabic is active

**Independent Test**: Switch locale to Arabic using the existing language switcher. Navigate through all 4 settings areas — labels appear in Arabic (or show the locale key if translations are not yet loaded — no hardcoded English strings). Open Document Templates — switch to Arabic locale — preview container direction flips to RTL and amounts align to the left side.

### Implementation for User Story 5

- [x] T016 [US5] Add settings locale string keys to `apps/shops-app/lib/locale.ts` (or the locale translation module established in spec 038) — add English and Arabic key-value pairs for all settings labels: `settings.identity.title`, `settings.identity.displayName`, `settings.identity.legalName`, `settings.identity.logo`, `settings.identity.phone`, `settings.identity.email`, `settings.identity.address`, `settings.identity.taxNumber`, `settings.identity.commercialReg`, `settings.tax.title`, `settings.tax.registered`, `settings.tax.rate`, `settings.tax.priceMode`, `settings.tax.discountNote`, `settings.invoicing.title`, `settings.invoicing.receiptPrefix`, `settings.invoicing.invoicePrefix`, `settings.invoicing.startingNumber`, `settings.invoicing.example`, `settings.templates.title`, `settings.templates.style.minimal`, `settings.templates.style.classic`, `settings.templates.style.detailed`, `settings.templates.taxNotice`, `settings.common.save`, `settings.common.saved`
- [x] T017 [US5] Update `apps/shops-app/components/settings/BusinessIdentityForm.tsx`, `TaxSettingsForm.tsx`, `InvoiceNumberingForm.tsx`, and `DocumentTemplatesPanel.tsx` to read locale from `getLocale()` and use locale keys for all user-facing labels (form field labels, button text, section headings, placeholder text, validation messages); confirm all Tailwind utility classes in the 4 form components and DocumentPreview use logical properties (`ps-*`, `pe-*`, `ms-*`, `me-*`, `text-start`, `text-end`, `border-s-*`, `border-e-*`) with no raw `pl-*`, `pr-*`, `ml-*`, `mr-*`, `text-left`, `text-right` utilities remaining

T016 must complete before T017 (T017 imports the locale keys added in T016).

**Checkpoint**: Switching locale to Arabic causes all 4 settings pages to render Arabic labels and DocumentPreview to flip to RTL layout; US5 independently testable

---

## Phase 8: Polish & Cross-Cutting Concerns

**Purpose**: TypeScript build verification and end-to-end checklist

- [x] T018 Run verification checklist from `specs/040-commerce-identity-tax-document-templates/quickstart.md` — manually verify all 15 checklist items in the browser; run `pnpm --filter shops-app build` to confirm zero TypeScript errors; fix any type errors discovered

---

## Dependencies & Execution Order

### Phase Dependencies

```
Phase 1 (Setup): T001, T002 — parallel, no dependencies
    └── Phase 2 (Foundational): T003→T004→T005 (sequential); T006 (parallel with T003)
            ├── US1 (Phase 3): T007→T008 — depends on Phase 2
            ├── US2 (Phase 4): T009→T010 — depends on Phase 2; parallel with US1
            ├── US3 (Phase 5): T011→T012 — depends on Phase 2; parallel with US1+US2
            └── US4 (Phase 6): T013→T014→T015 — depends on T001+T002 (types+mock); best after US1+US2 (reads their session data in preview)
            US5 (Phase 7): T016→T017 — depends on all US1–US4 components existing
Phase 8 (Polish): T018 — after all user stories complete
```

### User Story Dependencies

- **US1 + US2**: Both P1; can be built in parallel after Phase 2 (different files)
- **US3**: Can be built in parallel with US1+US2 (different files)
- **US4**: Depends on T001 (types) and T002 (mock data); reads US1+US2 session values in preview — best built after US1+US2 are done so the preview shows real data
- **US5**: Depends on all components from US1–US4 existing (adds locale wiring to all of them)

### Within Each User Story

- Form component before page component (page imports the form)
- `DocumentPreview` (T013) before `DocumentTemplatesPanel` (T014) — panel imports preview
- T016 (locale keys) before T017 (locale usage in components)

### Parallel Opportunities

| Parallel Group | Tasks |
|----------------|-------|
| Phase 1 | T001 + T002 |
| Phase 2 | T003 (with T006) |
| Phase 3 + Phase 4 | T007 + T009 (forms; different files) |
| Phase 3 + Phase 5 | T007 + T011 (forms; different files) |
| Phase 4 + Phase 5 | T009 + T011 (forms; different files) |

---

## Parallel Example: After Phase 2

```text
# Developer A — Business Identity (US1):
T007 (BusinessIdentityForm.tsx) → T008 (identity/page.tsx)

# Developer B — Tax Settings (US2):
T009 (TaxSettingsForm.tsx) → T010 (tax/page.tsx)

# Developer C — Invoice Numbering (US3):
T011 (InvoiceNumberingForm.tsx) → T012 (invoicing/page.tsx)

# Developer D — Document Templates (US4, after T001+T002):
T013 (DocumentPreview.tsx) → T014 (DocumentTemplatesPanel.tsx) → T015 (templates/page.tsx)
```

---

## Implementation Strategy

### MVP First (US1 + US2 Only — P1 Stories)

1. Complete Phase 1: T001 + T002 (setup)
2. Complete Phase 2: T003 → T004 → T005 + T006 (foundation)
3. Complete Phase 3: T007 → T008 (Business Identity)
4. Complete Phase 4: T009 → T010 (Tax Settings)
5. **STOP and VALIDATE**: Both `/settings/identity` and `/settings/tax` work; settings persist in session; Sidebar Taxes link works
6. Demo to stakeholder: "Business identity and tax configuration are live"

### Incremental Delivery

1. Phase 1+2 → Foundation and nav working
2. US1 → Business Identity ✅
3. US2 → Tax Settings ✅
4. US3 → Invoice Numbering ✅
5. US4 → Document Templates with live preview ✅
6. US5 → Full bilingual/RTL readiness ✅
7. Polish → Clean build ✅

### Single-Developer Order

T001 → T002 → T003 → T004 → T005 → T006 → T007 → T008 → T009 → T010 → T011 → T012 → T013 → T014 → T015 → T016 → T017 → T018

---

## Notes

- T001 (`settings-store.ts`) is the most critical dependency — block all other work until it types correctly
- T013 (`DocumentPreview.tsx`) is the most complex component — pure renderer for 12 template/style combinations; allow extra time
- All new components MUST use Tailwind logical properties from the first line of code (prevents needing a retroactive RTL audit in T017)
- `shops-app` code label remains unchanged throughout all tasks
- If US4 preview data seems stale, verify that `useSyncExternalStore` subscriptions to identity and tax changes are wired correctly in DocumentTemplatesPanel
- Commit after each phase checkpoint for clean git history
- Run TypeScript check early: `pnpm --filter shops-app tsc --noEmit` after T001 is done to catch type errors before they multiply
