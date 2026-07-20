# NexoraXS UI/UX Authority

| Field | Value |
|---|---|
| Version | 1.1 reconciliation candidate index |
| Status | UI/UX authority candidate; final approval pending |
| Owner | Product and Design Governance |
| Controlling architecture | Core Platform Architecture v1.1 Freeze |

## 1. Purpose

`docs/03-ui-ux/` is the single active workspace for NexoraXS product experience, information
architecture, journeys, presentation flows/states, screen evidence, wireframe governance,
accessibility, localization, UI copy, gaps, and design intake.

Architecture defines canonical ownership and boundaries. UI/UX defines customer experience inside
those boundaries. The Design System defines reusable presentation semantics. Feature specifications
define bounded requirements. Implementation evidence shows what exists; it does not create target
authority.

## 2. Scope

This package owns:

- public and authenticated experience progression;
- semantic navigation and context continuity;
- customer journeys and presentation flows;
- classification of domain, Session, and presentation states;
- current screen/route evidence and target semantic destinations;
- wireframe-governance, accessibility, localization, and UI-copy authority; and
- UX gap and feature-intake evidence.

It does not own architecture, canonical domain state, routes, APIs, persistence, permissions,
feature approval, or implementation.

## 3. Authority Model

### 3.1 Controlling inputs

1. [Core Platform Architecture v1.1 Freeze](../99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md)
2. Accepted ADRs, especially [ADR-015](../00-governance/ADR/ADR-015-infer-before-asking-conversational-configuration.md),
   [ADR-016](../00-governance/ADR/ADR-016-business-architect-governed-pipeline.md),
   [ADR-042](../00-governance/ADR/ADR-042-pre-registration-business-discovery.md), and
   [ADR-043](../00-governance/ADR/ADR-043-foundation-discovery-and-business-architect-composition.md)
3. [Foundation Journey Successor Addendum](../01-genesis/21-FOUNDATION-JOURNEY-SUCCESSOR-ADDENDUM-v1.0.md)
4. [Business Brain Foundation Compatibility](../03-business-brain/13-BUSINESS-BRAIN-FOUNDATION-COMPATIBILITY-v1.0.md)
5. [Canonical Glossary](../00-governance/glossary/GLOSSARY.md)

The active Genesis tree is `docs/01-genesis/`. `docs/genesis/` is historical/non-authoritative and
has an explicit [authority marker](../genesis/README.md).

### 3.2 Canonical UI/UX authority candidates

These documents are reconciled candidates awaiting independent review and approval:

| Order | Document | Authority concern |
|---|---|---|
| 1 | [Platform Experience](./01-PLATFORM-EXPERIENCE.md) | Experience principles and architecture-aligned progression |
| 2 | [Information Architecture](./04-INFORMATION-ARCHITECTURE.md) | Semantic destinations, context, navigation, and safe return |
| 3 | [User Journeys](./05-USER-JOURNEYS.md) | Actor goals, control, recovery, and outcomes |
| 4 | [User Flows](./06-USER-FLOWS.md) | Presentation interactions using semantic nodes |
| 5 | [Presentation State Authority](./07-STATE-MACHINES.md) | Separation of domain, Session, presentation, loading, error, and recovery states |
| 6 | [Wireframe Authority Boundary](./08-WIREFRAMES.md) | What future wireframes may and may not decide |
| 7 | [Accessibility Authority](./09-ACCESSIBILITY.md) | WCAG 2.2 AA cross-experience outcomes |
| 8 | [Localization](./10-LOCALIZATION.md) | Locale independence, English/Arabic launch parity, LTR/RTL |
| 9 | [UI Copy Guidelines](./11-UI-COPY-GUIDELINES.md) | Accurate customer language and canonical terminology |

No candidate is final until the reconciliation gate and independent review succeed.

### 3.3 Design System authority

[Design System](../04-design-system/README.md) owns reusable visual/interaction foundations, token
semantics, component roles, templates, and patterns. It does not decide journeys, routes, domain
states, or owners. [Design Intelligence](../10-design-intelligence/08-NEXORAXS-DESIGN-LAYER.md)
governs how material design proposals are researched and reviewed; advisory outputs are not
automatic authority.

### 3.4 Evidence only

| Document | Evidence role |
|---|---|
| [Screen Map](./02-SCREEN-MAP.md) | Current route inventory plus separately labelled semantic destinations |
| [Frontend Gap Analysis](./03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md) | Current-to-target findings |
| [Screen Status Matrix](./12-SCREEN-STATUS-MATRIX.md) | Dated route/surface quality snapshot |
| [UX Gaps](./13-UX-GAPS.md) | Gap and gate register |

### 3.5 Planning only

[Frontend Backlog](./14-FRONTEND-BACKLOG.md) is a feature-intake register. It does not authorize a
specification, plan, task, Feature 056, frontend, backend, or implementation.

### 3.6 Indexes and decision records

- [UX Flow Index](./15-UX-FLOW-INDEX.md) maps journeys, flows, states, destinations, and evidence.
- [UI/UX Authority Reconciliation](./UI-UX-AUTHORITY-RECONCILIATION-v1.0.md) records this package’s
  candidate disposition and gate verdict.
- `UI-UX-AUTHORITY-REVIEW-v1.0.md` and `UI-UX-AUTHORITY-APPROVAL-v1.0.md` may exist only if their
  prior gates authorize creation.

### 3.7 Historical/supporting

[UI/UX Documentation Consolidation Report](./UI-UX-DOCUMENTATION-CONSOLIDATION-REPORT.md) records
past documentation reorganization. It is provenance, not current product authority.

## 4. Reading Order

1. Read the controlling Freeze, ADR-043, Journey Addendum, Business Brain compatibility, and Glossary.
2. Read Platform Experience.
3. Read Information Architecture.
4. Read User Journeys, then User Flows, then Presentation State Authority.
5. Read Accessibility, Localization, and UI Copy.
6. Read the Design System.
7. Use Screen Map/Status and gap documents only as evidence.
8. Use the backlog only for future authorized intake.
9. Read the Reconciliation Decision before treating the package as review-ready.

## 5. Current, Planned, Approved, and Implemented

| Label | Meaning |
|---|---|
| Current evidence | Observed in repository source; not necessarily aligned or production-ready |
| Reconciled candidate | Updated to v1.1 boundaries; awaiting independent review/approval |
| Approved UI/UX authority | May be claimed only by a valid UI/UX approval record |
| Planned/intake | Possible future work; not authorized |
| Implemented | Verified code behavior; cannot by itself amend authority |
| Historical/superseded | Preserved provenance; not active guidance |

## 6. Maintenance Rules

- Put all active product-experience and UX authority under `docs/03-ui-ux/`.
- Keep reusable Design System semantics under `docs/04-design-system/`.
- Reference architecture; never replace or reinterpret it silently.
- Use canonical glossary terms and map any customer-facing alternative explicitly.
- Keep route/code inventories labelled evidence-only.
- Keep backlog/intake documents labelled planning-only.
- Never infer an exact lifecycle from a presentation label.
- Never allow a UI document to create a canonical owner, contract, schema, service, permission, or
  implementation authorization.
- Update affected UX, Design System, specification, evidence, and index links together after an
  approved change.
- Preserve historical documents and add successor/authority notices instead of concealing evolution.

## 7. Open Questions

The blocking Genesis provenance issue and other deferred decisions are recorded in the
[Reconciliation Decision](./UI-UX-AUTHORITY-RECONCILIATION-v1.0.md). This index does not resolve them.

## 8. Verified Against

- all files under `docs/03-ui-ux/` and applicable files under `docs/04-design-system/`;
- Core Platform v1.1/v1.0 and Business Brain Freezes;
- Accepted ADRs 015, 016, 042, and 043;
- Foundation Journey Successor Addendum, Business Brain compatibility, and canonical Glossary;
- applicable Genesis, Governance, Design Intelligence, execution, and readiness documents; and
- current route/screen sources under `apps/landing/`, `apps/core-platform/`, and `apps/commerce/`
  as implementation evidence only.
