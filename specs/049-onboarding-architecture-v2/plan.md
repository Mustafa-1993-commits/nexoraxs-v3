# Implementation Plan: Onboarding Architecture v2

**Branch**: `051-onboarding-architecture-v2` | **Date**: 2026-07-02 | **Spec**: [spec.md](./spec.md)  
**Input**: Feature specification from `specs/049-onboarding-architecture-v2/spec.md`

## Summary

Redesign onboarding so Core Platform collects only shared platform context, then Product Hub becomes the single Operating System entry point. The plan keeps `BusinessUnit` as the internal Business entity, separates workspace-level `OSSubscription` from operational `OSEnablement`, moves Commerce-specific setup into Commerce OS, and documents a migration-safe path from the current onboarding/Product Hub behavior to the new multi-Business, multi-Branch, multi-OS architecture. This is a UI/mock/data-contract planning scope only: no backend APIs, no microservices, no global BusinessUnit rename, and no Commerce workflow ownership in Core.

## Technical Context

**Language/Version**: TypeScript strict mode in Next.js App Router apps  
**Primary Dependencies**: Existing monorepo packages: `@nexoraxs/types`, `@nexoraxs/shared`, Core Platform app, Commerce app, shared UI/styles  
**Storage**: Existing shared local/session mock data layer in `packages/shared/src/mock-db`; no backend persistence for this spec  
**Testing**: `pnpm --filter core-platform exec tsc --noEmit`, `pnpm --filter commerce exec tsc --noEmit`, `pnpm --filter core-platform lint`, `pnpm --filter commerce lint`, `pnpm --filter core-platform build`, `pnpm --filter commerce build`, `pnpm build`, `pnpm lint`, `git diff --check`, plus manual onboarding/Product Hub/Commerce walkthrough  
**Target Platform**: Browser-based Core Platform and Commerce OS MVP  
**Project Type**: Modular monolith web application with shared packages  
**Performance Goals**: Core onboarding remains completable in under 4 minutes; Product Hub and Commerce setup retain current MVP perceived responsiveness with no unnecessary blocking states  
**Constraints**: No backend APIs; no billing provider changes; no microservices; no global `BusinessUnit` rename; no user-facing BusinessUnit/BU/Default Business Unit wording; no Commerce setup logic in Core; no direct localStorage/sessionStorage access in pages/components; no runtime imports from `docs/claude.aidesign`; preserve existing Workspace/BusinessUnit/Branch/Commerce data  
**Scale/Scope**: Core onboarding, Product Hub OS launcher/status model, Commerce setup ownership, subscription/enablement handoff, migration-safe mock-store compatibility, documentation and validation

## Constitution Check

*GATE: Must pass before Phase 0 research. Re-check after Phase 1 design.*

- **Business Operating Platform**: PASS. The feature reinforces NexoraXS as a platform of independent Operating Systems rather than a Commerce-only or POS-only app.
- **Core Platform Boundary**: PASS. Core owns Welcome, Workspace, Business shell, Product Hub, OS subscription visibility, and OS launch handoff; Core does not own Commerce tax, preset, templates, products, inventory, POS, orders, invoices, or reports.
- **Independent Operating Systems**: PASS. Each OS owns its own subscription flow, setup, configuration, dashboard, modules, permissions, and workflows.
- **Workspace / Business Unit / Branch Model**: PASS WITH SPEC EXPANSION. The constitution allows Business Unit UI exposure when a spec explicitly expands it. Spec 049 exposes "Business" as product language while preserving `BusinessUnit` internally.
- **Multi-Tenant Scope**: PASS. All planned records remain Workspace-scoped, with BusinessUnit and Branch scope where the entity requires it.
- **OSSubscription / OSEnablement Separation**: PASS. Workspace license state and operational activation state are explicitly separate.
- **Commerce OS Boundary**: PASS. Commerce setup owns preset, billing identity, tax, templates, numbering, categories, and units.
- **CommerceSetup and Address Ownership**: PASS. CommerceSetup belongs to BusinessUnit, Branch owns operational address/scope, Billing Address remains distinct from Branch Address.
- **Localization First**: PASS. Welcome language must configure RTL/LTR and date/number formats; touched labels must remain Arabic/English ready.
- **MVP Discipline**: PASS. No backend, no HR/CRM/Gym/Healthcare/Maintenance implementations, no marketplace, no event bus, no deep Commerce dashboard redesign.
- **Engineering Rules**: PASS. Existing app/package boundaries remain; shared packages may carry types/helpers but not app-specific business workflows.

## Project Structure

### Documentation (this feature)

```text
specs/049-onboarding-architecture-v2/
├── spec.md
├── plan.md
├── research.md
├── data-model.md
├── quickstart.md
├── contracts/
│   └── onboarding-flow-contract.md
└── tasks.md              # Created by /speckit-tasks, not by /speckit-plan
```

### Source Code (repository root)

```text
packages/
├── types/
│   └── src/
│       ├── core.ts       # Workspace, BusinessUnit, Branch, OSSubscription, OSEnablement shape alignment
│       └── commerce.ts   # CommerceSetup identity/address/preset/tax shape alignment
└── shared/
    └── src/
        ├── mock-db/
        │   ├── schema.ts     # OS catalog, plan catalog, i18n labels, storage keys
        │   ├── selectors.ts  # subscription/enablement/business/branch selectors
        │   ├── seed.ts       # migration-safe seed defaults
        │   └── index.ts
        └── commerce/
            └── documents.ts

apps/
├── core-platform/
│   ├── app/
│   │   ├── onboarding/page.tsx
│   │   └── dashboard/
│   │       ├── apps/page.tsx
│   │       └── businesses/
│   ├── components/shell/
│   └── lib/
│       ├── commerce-url.ts
│       └── store/AppProvider.tsx
└── commerce/
    ├── app/
    │   ├── setup/page.tsx
    │   └── dashboard/page.tsx
    ├── components/shell/
    └── lib/store/AppProvider.tsx
```

**Structure Decision**: Use the existing modular monolith. Core Platform owns onboarding and Product Hub shell; Commerce owns Commerce setup and dashboard context; shared packages carry reusable types, mock-store selectors/actions, catalogs, and compatibility helpers. No backend, new service, new app, or runtime import from docs is introduced.

## Complexity Tracking

No constitution violations requiring complexity exceptions.

## Phase 0: Research Summary

See [research.md](./research.md).

## Phase 1: Design Summary

See [data-model.md](./data-model.md), [contracts/onboarding-flow-contract.md](./contracts/onboarding-flow-contract.md), and [quickstart.md](./quickstart.md).

## Post-Design Constitution Check

- **Core/OS ownership**: PASS. Core remains generic and Product Hub only launches OS-specific setup.
- **Business language**: PASS. The plan exposes Business in UI and retains BusinessUnit internally.
- **Subscription/Enablement separation**: PASS. Contracts document Workspace-level OSSubscription and operational OSEnablement as separate states.
- **Commerce setup ownership**: PASS. CommerceSetup belongs to BusinessUnit, not Branch.
- **Branch operational scope**: PASS. Branch owns operational address and operations context only.
- **Migration safety**: PASS. Existing records are preserved and reinterpreted with explicit relationship validation rather than destructive migration.
- **MVP discipline**: PASS. Design artifacts do not add backend work, microservices, or future OS implementations.
