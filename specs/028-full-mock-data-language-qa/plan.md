# Implementation Plan: Full Mock Data Language QA

**Branch**: `029-mock-data-language-qa` | **Date**: 2026-05-15 | **Spec**: [spec.md](./spec.md)

## Summary

Pure text-substitution QA pass across `apps/shops-app` and `apps/core-platform`. All 12 changes are in JSX string literals — no logic, no state, no routing, no component structure. The changes replace developer-internal labels ("mock foundation", "mock data · foundation", "mock order · foundation", bare "mock data") with professional user-facing language ("Sample data", "Local preview", "Sample order"), update aria-labels for accessibility, and rename a misleading API key entry from "Production" / `nxs_live_` to "Sample" / `nxs_sample_`.

---

## Technical Context

**Language/Version**: TypeScript 5.x (strict mode)
**Primary Dependencies**: Next.js 16.x (App Router), React 19.x, TailwindCSS 4.x
**Change type**: JSX string literal substitution only — no imports, no state, no logic
**Testing**: None
**Target Platform**: Web
**Project Type**: QA language pass — 8 source files, all text-only edits
**Constraints**: No new packages; no API; no backend; no layout changes; chip styling unchanged

---

## Constitution Check

| Principle | Status | Notes |
|-----------|--------|-------|
| I — Modular Monolith | ✅ Pass | Shops changes in `apps/shops-app`; Core changes in `apps/core-platform` |
| II — Multi-Tenant Isolation | N/A | No database |
| III — App Boundary Enforcement | ✅ Pass | No cross-app imports introduced |
| IV — Type Safety | ✅ Pass | Only string literals change; TypeScript is unaffected |
| V — SDK-First | N/A | No API calls |
| VI — Spec-Driven | ✅ Pass | Spec written before plan |

---

## Project Structure

### Documentation (this feature)

```text
specs/028-full-mock-data-language-qa/
├── spec.md              ✅ written
├── plan.md              ✅ this file
├── research.md          ✅ written below
└── checklists/
    └── requirements.md  ✅ written
```

### Source Code Changes (all text substitutions)

```text
apps/shops-app/app/(app)/
├── dashboard/page.tsx           MODIFY line 159 — "mock foundation" → "Local preview"
├── products/page.tsx            MODIFY line 45  — aria-label; line 94 — chip text
├── orders/page.tsx              MODIFY line 42  — chip text; line 130 — inline label
├── customers/page.tsx           MODIFY line 43  — chip text
└── reports/page.tsx             MODIFY lines 66, 93, 110 — chip text

apps/shops-app/components/dashboard/
└── Topbar.tsx                   MODIFY line 59  — aria-label

apps/core-platform/app/dashboard/
├── page.tsx                     MODIFY line 40  — metric sub-label
└── settings/page.tsx            MODIFY line 167 — API key name + prefix

AGENTS.md                        MODIFY — update SPECKIT block to 028
```

---

## Detailed Implementation Notes

### Change Map (exact strings, file by file)

#### `apps/shops-app/app/(app)/dashboard/page.tsx` — line 159

```
Before: mock foundation
After:  Local preview
```

#### `apps/shops-app/app/(app)/products/page.tsx`

Line 45 (aria-label):
```
Before: aria-label="Mock search — not functional"
After:  aria-label="Search (preview only)"
```

Line 94 (chip text):
```
Before: mock data · foundation
After:  Sample data
```

#### `apps/shops-app/app/(app)/orders/page.tsx`

Line 42 (chip):
```
Before: mock data
After:  Sample data
```

Line 130 (inline label):
```
Before: mock order · foundation
After:  Sample order
```

#### `apps/shops-app/app/(app)/customers/page.tsx` — line 43

```
Before: mock data
After:  Sample data
```

#### `apps/shops-app/app/(app)/reports/page.tsx`

Line 66 (chip):
```
Before: mock data
After:  Sample data
```

Line 93 (chip):
```
Before: mock data · foundation
After:  Sample data
```

Line 110 (chip):
```
Before: mock data · foundation
After:  Sample data
```

#### `apps/shops-app/components/dashboard/Topbar.tsx` — line 59

```
Before: aria-label="Mock search — not functional"
After:  aria-label="Search (preview only)"
```

#### `apps/core-platform/app/dashboard/page.tsx` — line 40

```
Before: Commerce &amp; POS · mock data
After:  Commerce &amp; POS · Sample data
```

#### `apps/core-platform/app/dashboard/settings/page.tsx` — line 167

```
Before: { name: "Production", key: "nxs_live_••••••••••••4f2a", ... }
After:  { name: "Sample",     key: "nxs_sample_••••••••••4f2a", ... }
```

Note: the masked character count is adjusted from `nxs_live_` (9 chars) to `nxs_sample_` (11 chars) by reducing the dots slightly so the overall key string length remains visually similar. Exact replacement: `"nxs_live_••••••••••••4f2a"` → `"nxs_sample_••••••••4f2a"`.

---

## Complexity Tracking

No constitution violations. All 12 changes are string literal substitutions in JSX. TypeScript strict mode is not affected — no types change. ESLint is not affected — no linting rules apply to JSX string content. The chip/label styling (amber color, mono font, small size) is unchanged. This is the lowest-risk category of change in the codebase.
