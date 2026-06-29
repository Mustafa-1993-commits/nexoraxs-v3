# Implementation Plan: Business-Level Commerce Setup, Address Separation, and Business Resources

**Branch**: `048-business-commerce-setup-addresses` | **Date**: 2026-06-25 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/048-business-commerce-setup-addresses/spec.md`

## Summary

Align the current Core Platform + Commerce OS MVP with Spec 048 by documenting and applying the business-level Commerce setup model introduced by Spec 047. The plan preserves the existing `BusinessUnit` internal model while making product language and data flow clear: Commerce setup belongs to Business, Billing Address is separate from Branch Address, Industry Type suggests but does not force Commerce Preset, Business Resources map to scoped media assets where safe, and OSEnablement remains the bridge from workspace-level subscription to actual OS usage. This is a frontend/shared mock-store/documentation alignment only: no backend APIs, no microservices, no storage wipe, and no UI redesign beyond necessary label/data-flow alignment.

## Technical Context

**Language/Version**: TypeScript strict mode in Next.js App Router apps  
**Primary Dependencies**: Existing monorepo packages: `@nexoraxs/types`, `@nexoraxs/shared`, Core Platform app, Commerce app, shared UI/styles  
**Storage**: Existing shared local/session mock data layer in `packages/shared/src/mock-db`; no backend persistence  
**Testing**: `pnpm --filter core-platform exec tsc --noEmit`, `pnpm --filter core-platform lint`, `pnpm --filter core-platform build`, `pnpm --filter commerce exec tsc --noEmit`, `pnpm --filter commerce lint`, `pnpm --filter commerce build`, `pnpm build`, `pnpm lint`, `git diff --check`  
**Target Platform**: Browser-based Core Platform and Commerce OS MVP  
**Project Type**: Modular monolith web application with shared packages  
**Performance Goals**: No measurable runtime performance regression; setup hydration and dashboard rendering remain equivalent to current MVP behavior  
**Constraints**: Preserve existing mock/local/session storage data; no direct browser-storage reads from pages/components; no imports from `docs/claude.aidesign`; no backend APIs; no microservices; no Commerce business logic in Core; no broad `BusinessUnit` rename; no branch-owned Commerce setup  
**Scale/Scope**: Shared type/mock-store compatibility, Commerce setup and document address semantics, existing Core/Product Hub handoff compatibility, implementation documentation, and validation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Business Operating Platform**: PASS. The plan preserves Core Platform + independent Commerce OS and does not turn NexoraXS into a single Commerce/POS app.
- **Core Platform Boundary**: PASS. Core remains responsible for Workspace, OS subscription, Product Hub, billing/team/access shells; Commerce setup details stay in Commerce OS/shared contracts.
- **Independent Operating Systems**: PASS. OSEnablement clarifies usage scope without making Commerce depend on HR, CRM, Healthcare, Gym, or Maintenance.
- **Workspace / Business Unit / Branch Model**: PASS WITH SPEC OVERRIDE. Constitution allows Business Unit UI exposure only when a spec explicitly expands it. Spec 047 and Spec 048 use Business as product language while retaining `BusinessUnit` internally where safe.
- **Multi-Tenant Data Isolation**: PASS. All aligned entities remain workspace-scoped and Business/Branch-scoped where appropriate.
- **OS Subscription and Access Model**: PASS. OSSubscription remains a workspace license; OSEnablement represents actual workspace/business/branch usage.
- **Commerce OS Boundary**: PASS. Commerce Preset, tax, templates, categories, units, and selling mode remain Commerce-owned.
- **Localization / UI Copy**: PASS. Touched user-facing labels must avoid Business Unit/Default Business Unit/BU and use Business, Store, Activity, Branch, Location, Billing Address, and Branch Address.
- **MVP Discipline**: PASS. No backend, no warehouse UI, no HR employee UI, no full Business Settings UI, no microservices, and no architecture redesign.
- **Storage and Runtime Discipline**: PASS. Pages/components continue to use existing providers/shared helpers rather than direct localStorage/sessionStorage access.

## Project Structure

### Documentation (this feature)

```text
specs/048-business-commerce-setup-addresses/
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── business-commerce-setup-contract.md
└── tasks.md              # Created by /speckit-tasks, not by /speckit-plan
```

### Source Code (repository root)

```text
packages/
├── types/
│   └── src/
│       ├── core.ts       # BusinessUnit, Branch, OSEnablement, MediaAsset shape alignment
│       └── commerce.ts   # CommerceSetup billing-address compatibility fields
└── shared/
    └── src/
        ├── mock-db/
        │   ├── schema.ts
        │   ├── seed.ts
        │   ├── selectors.ts
        │   ├── actions.ts
        │   └── index.ts
        └── commerce/
            └── documents.ts

apps/
├── core-platform/
│   ├── app/dashboard/apps/page.tsx
│   ├── app/onboarding/page.tsx
│   ├── components/onboarding/
│   └── lib/store/AppProvider.tsx
└── commerce/
    ├── app/setup/page.tsx
    ├── app/(commerce)/
    │   ├── dashboard/page.tsx
    │   ├── invoices/[id]/document/page.tsx
    │   ├── returns/[id]/document/page.tsx
    │   ├── settings/page.tsx
    │   └── settings/documents/page.tsx
    ├── components/shell/
    └── lib/store/AppProvider.tsx

docs/
└── implementation/
    └── business-commerce-setup-addresses.md
```

**Structure Decision**: Use the existing modular monolith structure. Shared domain shapes and compatibility helpers live in `packages/types` and `packages/shared`; Core and Commerce apps consume those through existing providers; Spec 048 architecture notes live under `docs/implementation/`. No backend, new app, service boundary, or direct docs runtime import is added.

## Complexity Tracking

No constitution violations requiring complexity exceptions.

## Phase 0: Research Summary

See [research.md](./research.md).

## Phase 1: Design Summary

See [data-model.md](./data-model.md), [contracts/business-commerce-setup-contract.md](./contracts/business-commerce-setup-contract.md), and [quickstart.md](./quickstart.md).

## Post-Design Constitution Check

- **Core/Commerce ownership**: PASS. Core keeps subscription/Product Hub/workspace responsibilities; Commerce owns setup, presets, tax, categories, templates, and document semantics.
- **Business-level setup**: PASS. The design keeps CommerceSetup scoped to Workspace + Business/BusinessUnit and documents BranchCommerceSettings only as future overrides.
- **No backend / no microservices**: PASS. All design artifacts target existing frontend and shared mock-store flows.
- **Business language compatibility**: PASS. Internal `BusinessUnit` remains allowed; touched UI and docs use Business/Store/Activity/Branch language.
- **Address separation**: PASS. Workspace Address, Business Billing Address, and Branch Address have separate ownership and fallback rules.
- **Storage/access discipline**: PASS. The contract keeps pages/components behind providers/shared helpers and forbids direct localStorage/sessionStorage reads.
