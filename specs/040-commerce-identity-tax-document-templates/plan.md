# Implementation Plan: Commerce Identity, Tax & Document Templates

**Branch**: `040-commerce-identity-tax-document-templates` | **Date**: 2026-06-03 | **Spec**: [spec.md](spec.md)
**Input**: Feature specification from `specs/040-commerce-identity-tax-document-templates/spec.md`

## Summary

Add four Commerce Core settings areas to the Commerce OS (`apps/shops-app`): Business Identity, Tax Settings, Invoice Numbering, and Document Templates with live preview. All work is UI/mock-first using session-based persistence — no backend, no database. A shared settings sub-navigation wrapper is added to the existing `/settings` route group. The sidebar "Taxes" nav item is enabled. Document template preview renders as HTML/CSS (no PDF engine). All forms use the locale system from spec 038 for i18n-readiness and logical CSS properties for RTL support.

---

## Technical Context

**Language/Version**: TypeScript (Next.js 16+, App Router)
**Primary Dependencies**: Next.js, React, TailwindCSS, @nexoraxs/ui (ShadCN-based), Lucide React, existing locale.ts pattern
**Storage**: sessionStorage — same pattern as existing `lib/locale.ts`; namespaced keys (`commerce:identity`, `commerce:tax`, `commerce:invoicing`, `commerce:template:*`)
**Testing**: Manual visual verification; no automated tests required
**Target Platform**: Web browser — Commerce OS at shops.nexoraxs.com (`apps/shops-app`)
**Project Type**: Web application (Commerce OS settings module)
**Performance Goals**: Document template preview updates within 1 second of style selection change
**Constraints**: UI/mock only; no backend calls; no PDF engine; sessionStorage persistence only; existing settings page content preserved; shops-app code label unchanged
**Scale/Scope**: `apps/shops-app` — new `/settings/layout.tsx` + 4 new sub-pages + 6–8 new components + 1 settings store lib + locale string additions

---

## Constitution Check

| Gate | Status | Notes |
|------|--------|-------|
| Belongs to Commerce OS boundary | ✅ Pass | All changes in `apps/shops-app` only |
| Commerce Core ownership | ✅ Pass | Business Identity, Tax, Invoicing, and Document Templates are explicitly Commerce Core per AGENTS.md Section 11 |
| No Core Platform business logic added | ✅ Pass | No auth, workspace, or billing logic touched |
| No cross-OS dependency created | ✅ Pass | All data is Commerce-scoped |
| No backend / real persistence | ✅ Pass | sessionStorage only; no API calls; no database |
| Localization compliance | ✅ Pass | Locale system from spec 038 used; new strings added through locale files; logical CSS properties for RTL |
| MVP scope | ✅ Pass | Commerce Identity + Tax + Invoicing + Templates are explicitly in MVP build order per constitution |
| No premature backend work | ✅ Pass | Explicitly deferred; POS will consume these settings in a later spec |
| Multi-tenant isolation | ✅ N/A | Session-only mock; no tenant data persisted |
| shops-app code label unchanged | ✅ Pass | No renaming or restructuring of app directory |

**Post-design re-check**: All gates remain passing after Phase 1 design.

---

## Project Structure

### Documentation (this feature)

```text
specs/040-commerce-identity-tax-document-templates/
├── plan.md              ← This file
├── research.md          ← Phase 0 output
├── data-model.md        ← Phase 1 output
├── quickstart.md        ← Phase 1 output
├── contracts/
│   ├── settings-session-store.md   ← Phase 1 output
│   └── document-preview.md         ← Phase 1 output
└── tasks.md             ← Phase 2 output (created by /speckit.tasks)
```

### Source Code (new/modified files)

```text
apps/shops-app/
├── app/(app)/
│   └── settings/
│       ├── layout.tsx              NEW — SettingsNav tabs wrapper for all settings sub-routes
│       ├── page.tsx                EXISTING — general settings; no content changes
│       ├── identity/
│       │   └── page.tsx            NEW — Business Identity settings page
│       ├── tax/
│       │   └── page.tsx            NEW — Tax Settings page
│       ├── invoicing/
│       │   └── page.tsx            NEW — Invoice Numbering page
│       └── templates/
│           └── page.tsx            NEW — Document Templates + live preview page
│
├── components/
│   └── settings/
│       ├── SettingsNav.tsx         NEW — horizontal tab navigation for settings sub-sections
│       ├── BusinessIdentityForm.tsx NEW — form with validation and save to session store
│       ├── TaxSettingsForm.tsx     NEW — toggle + rate + price mode form
│       ├── InvoiceNumberingForm.tsx NEW — prefix + starting number + live example output
│       ├── DocumentTemplatesPanel.tsx NEW — template type selector + style picker
│       └── DocumentPreview.tsx     NEW — HTML/CSS preview renderer for all 4 template types × 3 styles
│
├── lib/
│   ├── settings-store.ts           NEW — typed sessionStorage get/set/subscribe helpers
│   └── mock-data/
│       └── preview-cart.ts         NEW — mock cart/order data for document preview
│
└── components/dashboard/
    └── Sidebar.tsx                 MODIFIED — enable "Taxes" nav item → /settings/tax
```

**Structure Decision**: Settings sub-route group under `app/(app)/settings/` with a shared `layout.tsx` that renders `SettingsNav` tabs. This mirrors Next.js App Router conventions, keeps all settings under `/settings/*`, and adds the sub-nav without modifying the existing `page.tsx` content.

---

## Complexity Tracking

> No constitution violations — this section is N/A.
