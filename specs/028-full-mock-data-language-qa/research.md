# Research: Full Mock Data Language QA

**Feature**: 028-full-mock-data-language-qa
**Date**: 2026-05-15

No external research needed. All decisions derived from auditing current app state against the spec language rules.

---

## Full Audit: All Occurrences Requiring Change

| # | File | Line | Current text | Replacement | Type |
|---|---|---|---|---|---|
| 1 | `shops-app/app/(app)/dashboard/page.tsx` | 159 | `mock foundation` | `Local preview` | Chip text |
| 2 | `shops-app/app/(app)/products/page.tsx` | 45 | `aria-label="Mock search — not functional"` | `aria-label="Search (preview only)"` | Aria-label |
| 3 | `shops-app/app/(app)/products/page.tsx` | 94 | `mock data · foundation` | `Sample data` | Chip text |
| 4 | `shops-app/app/(app)/orders/page.tsx` | 42 | `mock data` | `Sample data` | Chip text |
| 5 | `shops-app/app/(app)/orders/page.tsx` | 130 | `mock order · foundation` | `Sample order` | Inline label |
| 6 | `shops-app/app/(app)/customers/page.tsx` | 43 | `mock data` | `Sample data` | Chip text |
| 7 | `shops-app/app/(app)/reports/page.tsx` | 66 | `mock data` | `Sample data` | Chip text |
| 8 | `shops-app/app/(app)/reports/page.tsx` | 93 | `mock data · foundation` | `Sample data` | Chip text |
| 9 | `shops-app/app/(app)/reports/page.tsx` | 110 | `mock data · foundation` | `Sample data` | Chip text |
| 10 | `shops-app/components/dashboard/Topbar.tsx` | 59 | `aria-label="Mock search — not functional"` | `aria-label="Search (preview only)"` | Aria-label |
| 11 | `core-platform/app/dashboard/page.tsx` | 40 | `Commerce & POS · mock data` | `Commerce & POS · Sample data` | Metric label |
| 12 | `core-platform/app/dashboard/settings/page.tsx` | 167 | `"Production"` / `"nxs_live_…"` | `"Sample"` / `"nxs_sample_…"` | API key entry |

---

## Decision 1: "mock foundation" → "Local preview" (dashboard chip)

**Decision**: Use "Local preview" for the Shops dashboard chip rather than "Sample data".

**Rationale**: The dashboard chip appears next to what looks like live metric numbers and activity feed. "Local preview" signals that this is a simulated environment (not broken, not real) without sounding like "the data is fake." "Sample data" is also acceptable but "Local preview" is warmer and more product-like in context.

**Alternatives considered**: "Demo mode" — rejected (contradicts the rule to avoid "DEMO"). "Mock workspace" — rejected (still contains "mock"). "Preview" alone — too terse, not enough context.

---

## Decision 2: "mock data" → "Sample data" (operational pages)

**Decision**: All amber chips on Products, Orders, Customers, and Reports pages use "Sample data".

**Rationale**: Consistent use of "Sample data" across all operational pages creates a uniform language standard. The amber chip color already signals the placeholder state visually; the text only needs to confirm it non-technically. "Sample data" is universally understood by non-technical users as "example content, not real records."

---

## Decision 3: "mock order · foundation" → "Sample order" (orders inline label)

**Decision**: The inline label in the orders list that reads "mock order · foundation" becomes "Sample order".

**Rationale**: The `· foundation` suffix is purely developer vocabulary. It refers to the scaffolded placeholder state but means nothing to users. Dropping it and prefixing with "Sample" produces a professional, self-explanatory label.

---

## Decision 4: aria-labels → "Search (preview only)"

**Decision**: Both `aria-label="Mock search — not functional"` instances (Products page and Topbar) become `aria-label="Search (preview only)"`.

**Rationale**: The phrase "not functional" is a developer note, not a user-facing description. Screen reader users hearing "Mock search — not functional" would be confused. "Search (preview only)" is clear, brief, and accessible.

---

## Decision 5: API key "Production" + `nxs_live_` → "Sample" + `nxs_sample_`

**Decision**: Rename the Production API key entry to "Sample" and change the key prefix from `nxs_live_` to `nxs_sample_`.

**Rationale**: The "Sandbox" entry already communicates a test/non-production key. Having both "Production" and "Sandbox" implies a real production key exists. Renaming to "Sample" removes the implication of a real credential. The `nxs_live_` prefix reinforces the confusion — `nxs_sample_` is consistent with the language standard.

**Key string adjustment**: `nxs_live_••••••••••••4f2a` (26 chars) → `nxs_sample_••••••••4f2a` (24 chars). Two fewer masked dots to absorb the longer prefix. The visual result is nearly identical.

---

## Items Confirmed As Intentional (No Change)

| File | Text | Reason |
|---|---|---|
| `shops-app/components/onboarding/StepStoreSetup.tsx:203` | `{"// live preview"}` | Standard UI term for real-time form preview, not a data claim |
| `core-platform/app/dashboard/billing/page.tsx:118` | `"once public pricing goes live"` | Contextual launch language, not a data claim |
| All files | Import names like `mockMetrics`, `mockActivity`, `getMockUserName` | Code identifiers, not user-visible |
| All files | HTML `placeholder` attributes | Standard input placeholders, not status labels |
