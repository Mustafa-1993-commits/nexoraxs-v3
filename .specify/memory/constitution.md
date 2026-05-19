<!--
SYNC IMPACT REPORT
==================
Version change: 1.0.0 → 1.1.0 (MINOR — new technology addition)

Modified sections:
  Technology & Infrastructure Standards → Approved Stack table: added Framer Motion row

Added:
  - Row: | Animation | Framer Motion | latest | Landing + future apps |

Removed sections:
  - None

Modified principles:
  - None — this is a pure addition; no existing principle was changed or redefined

Templates requiring updates:
  - .specify/templates/plan-template.md       ✅ Compatible — no structural changes to constitution
  - .specify/templates/spec-template.md       ✅ Compatible — no structural changes
  - .specify/templates/tasks-template.md      ✅ Compatible — no structural changes

Follow-up TODOs:
  - When adding Framer Motion to core-platform or shops-app: file another MINOR amendment

---
PREVIOUS SYNC IMPACT REPORT (v1.0.0 — initial ratification)
==================
Version change: [blank template] → 1.0.0 (initial ratification)

Modified principles:
  All placeholders replaced — first-time fill, no prior named principles.

Added sections:
  - Core Principles (I–VI)
  - Technology & Infrastructure Standards
  - Development Workflow & Git Governance
  - Governance

Removed sections:
  - None (template placeholders cleared)

Templates requiring updates:
  - .specify/templates/plan-template.md       ✅ Compatible — Constitution Check section already generic; gates derive from principles at plan time
  - .specify/templates/spec-template.md       ✅ Compatible — FR/acceptance structure aligns with multi-tenancy and type-safety principles
  - .specify/templates/tasks-template.md      ✅ Compatible — Monorepo path conventions (backend/, apps/, packages/) match NexoraXS structure

Follow-up TODOs:
  - None — all placeholders resolved. Ratification date set to first commit date; update RATIFICATION_DATE if an earlier governance decision existed.
-->

# NexoraXS Constitution

## Core Principles

### I. Modular Monolith — One Platform, Many Apps

NexoraXS MUST be built as a modular monolith: a single deployable codebase
organized into independently scoped modules. Each app (`shops-app`,
`clinics-app`, etc.) is a self-contained Next.js application inside the
monorepo. Apps share infrastructure (auth, DB, Redis) but MUST NOT share
business logic or import directly from one another.

Microservices and Kubernetes are explicitly out of scope for this platform.
Complexity MUST be justified against this constraint before any new module
is introduced.

### II. Multi-Tenant Data Isolation (NON-NEGOTIABLE)

Every database table that holds business data MUST include a `workspace_id`
column. Every query against such a table MUST filter by `workspace_id`.
Cross-tenant data access is unconditionally forbidden — not gated on role,
not permissible as an admin shortcut.

Example:
```sql
SELECT * FROM products WHERE workspace_id = :workspace_id
```

Violation of this principle constitutes a critical security defect and MUST
block the PR regardless of other quality gates.

### III. App Boundary Enforcement

Business logic MUST live exclusively inside its owning app:

- `core-platform` handles auth, workspace, billing, and notifications only.
  It MUST NOT contain products, inventory, orders, customers, or any
  domain-specific logic.
- Apps MUST import from `packages/*` only — never from another app.
- Shared code lives in `packages/ui`, `packages/sdk`, `packages/types`,
  `packages/auth`, or `packages/shared` with a single declared purpose.
  No package may mix concerns.

### IV. Type Safety & Component Discipline

All frontend code MUST be TypeScript with `"strict": true`. `any` is
forbidden; use proper interfaces from `packages/types`. Function parameters
and return values MUST be typed explicitly.

React components MUST use the Next.js App Router (`app/` directory). Server
Components are the default; `"use client"` MUST only appear when browser
APIs or interactive state are strictly required. Components MUST be small,
focused, and co-located with their styles, types, and tests.

### V. SDK-First API Access

Components MUST NOT call `api.nexoraxs.com` directly. All HTTP calls MUST
go through the SDK in `packages/sdk`. Every data-fetching component MUST
render distinct loading and error states with user-friendly messages. API
errors MUST be handled gracefully — silent failures are forbidden.

### VI. Spec-Driven Development

All features begin with a written specification before any implementation
code is written. The mandatory workflow order is:

```
/speckit.constitution  → Establish project principles
/speckit.specify       → Create baseline spec
/speckit.clarify       → Resolve ambiguities (optional)
/speckit.plan          → Create implementation plan
/speckit.checklist     → Validate requirements (optional)
/speckit.tasks         → Generate actionable tasks
/speckit.analyze       → Cross-check consistency (optional)
/speckit.implement     → Execute implementation
```

Skipping steps or implementing without a spec requires explicit owner
approval and MUST be documented in the PR description.

## Technology & Infrastructure Standards

### Approved Stack

| Layer       | Technology           | Version   | Notes                          |
|-------------|----------------------|-----------|--------------------------------|
| Frontend    | Next.js              | 16.x      | App Router only                |
| UI          | React                | 19.x      | Server Components default      |
| Language    | TypeScript           | 5.x       | Strict mode, all apps          |
| Styling     | TailwindCSS          | 4.x       | No inline styles               |
| Components  | ShadCN UI            | latest    | Via `packages/ui`              |
| Monorepo    | Turborepo + pnpm     | 2.x / 9.x | `pnpm` only, no npm/yarn       |
| Backend     | Laravel + Sanctum    | latest    | Session-based, subdomain auth  |
| Database    | PostgreSQL           | —         | Primary store                  |
| Cache/Queue | Redis                | —         | Sessions, queues, cache        |
| Infra       | Docker Compose       | —         | Local + production             |
| Animation   | Framer Motion        | latest    | Landing + future apps          |

No technology outside this stack may be introduced without a constitution
amendment.

### Cross-Domain Authentication

Sessions MUST be shared across subdomains via:

```env
SESSION_DOMAIN=.nexoraxs.com
SANCTUM_STATEFUL_DOMAINS=app.nexoraxs.com,shops.nexoraxs.com,...
```

Breaking the session/auth flow constitutes a critical defect and MUST be
resolved before any other work proceeds.

### API Response Contract

All backend responses MUST conform to:
```json
{
  "success": true,
  "data": {},
  "message": "Operation successful",
  "errors": null
}
```

Deviations from this contract require an explicit deprecation path.

## Development Workflow & Git Governance

### Branch Strategy

```
main        → production-ready code only; direct commits forbidden
develop     → integration branch
feature/*   → new features (e.g., feature/workspace-creation)
hotfix/*    → urgent production fixes
```

### Commit Convention

Conventional Commits format is mandatory:

```
feat(core-platform): add workspace creation flow
fix(shops-app): resolve inventory pagination bug
chore(packages/ui): update Button component variants
docs: update AGENTS.md with new package rules
```

### Quality Gates (all MUST pass before merge)

- `pnpm lint` — zero errors
- TypeScript compilation — zero errors
- No `.next/` build output committed
- No `node_modules/` committed
- No `.env` or secret files committed (`.env.example` permitted)
- Multi-tenancy check: any new business table includes `workspace_id`
- App boundary check: no cross-app imports introduced

## Governance

This constitution supersedes all other guidance documents, including
`AGENTS.md`, inline comments, and verbal conventions. Where conflicts arise,
the constitution takes precedence and the conflicting document MUST be
updated to match.

### Amendment Procedure

1. Open a PR proposing the amendment with rationale.
2. The amendment MUST update `CONSTITUTION_VERSION` per semantic versioning:
   - MAJOR: principle removal, redefinition, or backward-incompatible change
   - MINOR: new principle, section, or materially expanded guidance
   - PATCH: clarifications, wording fixes, non-semantic refinements
3. PR description MUST include a Sync Impact Report listing all affected
   templates and documents.
4. Owner approval is required before merge.
5. Affected templates and `AGENTS.md` MUST be updated in the same PR.

### Compliance Review

All PRs and code reviews MUST verify compliance with:
- Principle II (Multi-Tenant Isolation) on any database migration
- Principle III (App Boundary Enforcement) on any import change
- Principle IV (Type Safety) on any TypeScript file
- Principle V (SDK-First) on any API call

---

**Version**: 1.1.0 | **Ratified**: 2026-05-11 | **Last Amended**: 2026-05-17
