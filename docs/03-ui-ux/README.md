# NexoraXS UI/UX Documentation

- **Status:** Canonical UI/UX workspace index
- **Owner:** Product and Design
- **Authority:** Product-experience and UX authority subordinate to frozen architecture, Governance, and approved product decisions
- **Scope:** Product experience, information architecture, journeys, flows, user-visible states, wireframes, accessibility application guidance, localization UX, and UI copy

## 1. Purpose

`docs/03-ui-ux/` is the single canonical workspace for NexoraXS product-experience and UX
documentation. It defines how customers enter, understand, navigate, and use approved Core
Platform and Commerce experiences.

Architecture defines ownership, boundaries, canonical facts, lifecycles, and allowed
dependencies. UI/UX defines the customer experience within those constraints. UI/UX documents
reference architecture; they do not replace it.

## 2. Scope

This workspace owns:

- the canonical Platform customer experience;
- verified and planned screen/route classification;
- current-to-target frontend experience findings;
- information architecture and navigation rules;
- target user journeys, user flows, and user-visible state models reconciled with current evidence;
- approved wireframe references;
- application-level accessibility and localization guidance; and
- interface terminology and copy guidance.

Reusable design foundations, token semantics, component taxonomy, page templates, and interaction
patterns belong to the separate [Design System](../04-design-system/README.md).

## 3. Out of Scope

This workspace does not:

- amend an Architecture Freeze, Accepted ADR, Genesis, or owning-domain baseline;
- create an architecture owner, domain concept, backend contract, schema, API, or permission model;
- make a planned or placeholder artifact implementation-ready;
- transfer Core Platform or Commerce responsibilities;
- duplicate reusable Design System documentation; or
- replace an approved feature specification, plan, tasks, or implementation evidence.

## 4. Authority

Repository authority remains:

1. [Architecture Freezes](../99-architecture-freeze/);
2. [Governance and Accepted ADRs](../00-governance/ADR/README.md), including the
   [Product Decision Register](../00-governance/PRODUCT-DECISIONS.md) for confirmed product-level
   decisions only;
3. [Genesis](../01-genesis/01-VISION.md);
4. approved architecture baselines, including
   [Core Platform](../02-core-platform/README.md) and Commerce OS;
5. the [Constitution](../../.specify/memory/constitution.md) and
   [Execution policy](../11-execution/01-DEVELOPMENT-LIFECYCLE.md);
6. this UI/UX workspace for the concerns explicitly assigned to it; and
7. approved feature specifications and their implementation evidence.

Within this workspace:

- [Platform Experience](./01-PLATFORM-EXPERIENCE.md) is authoritative for the canonical customer
  journey and stage-level product experience.
- [Screen Map](./02-SCREEN-MAP.md) is authoritative for the dated current-route inventory and
  current/planned screen classification.
- [Frontend Experience Gap Analysis](./03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md) is an evidence-based
  current-to-target analysis, not architecture authority.
- [Information Architecture](./04-INFORMATION-ARCHITECTURE.md) is authoritative for navigation
  structure within approved product and architecture boundaries.
- [Screen Status Matrix](./12-SCREEN-STATUS-MATRIX.md) is the dated route/screen completion
  assessment; it does not replace the Screen Map.
- [User Journeys](./05-USER-JOURNEYS.md), [User Flows](./06-USER-FLOWS.md), and
  [State Machines](./07-STATE-MACHINES.md) define target presentation behavior and explicitly
  separate it from canonical domain lifecycles.
- [Localization](./10-LOCALIZATION.md) defines the target open-ended frontend locale experience;
  unresolved persistence precedence remains a Governance dependency.
- [Frontend Backlog](./14-FRONTEND-BACKLOG.md) is implementation planning only and does not
  authorize code changes.

Any conflict with a higher authority stops work at the affected boundary and is routed through
Governance. It is not resolved in a UX document.

## 5. Current, Planned, and Approved

| Label | Meaning |
|---|---|
| Current | Verified repository behavior or a currently governing UX document, as stated and dated by that document |
| Planned | A documented target or reserved artifact whose implementation is not claimed |
| Approved | Explicitly accepted through the applicable product, design, architecture, or feature governance process |
| Placeholder | A distinct future documentation location with no approved detailed content |

“Current,” “planned,” and “approved” are not interchangeable. A proposed route in the Screen Map
does not exist until implementation evidence verifies it, and a placeholder does not authorize a
feature.

## 6. Final Document Index

| Order | Document | Status | Canonical responsibility |
|---:|---|---|---|
| 01 | [Platform Experience](./01-PLATFORM-EXPERIENCE.md) | Current | End-to-end customer journey and stage behavior |
| 02 | [Screen Map](./02-SCREEN-MAP.md) | Current snapshot | Verified routes/screens and target classification |
| 03 | [Frontend Experience Gap Analysis](./03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md) | Current analysis | Traceable target-versus-current UX findings |
| 04 | [Information Architecture](./04-INFORMATION-ARCHITECTURE.md) | Current | Navigation zones, trees, entry/exit, search, command, and safe-return rules |
| 05 | [User Journeys](./05-USER-JOURNEYS.md) | Current target | Role- and outcome-specific end-to-end journeys reconciled with current evidence |
| 06 | [User Flows](./06-USER-FLOWS.md) | Current target | Screen/action/data-source/state flows inside the journeys |
| 07 | [State Machines](./07-STATE-MACHINES.md) | Current target | User-visible presentation states mapped to owner-approved facts |
| 08 | [Wireframes](./08-WIREFRAMES.md) | Placeholder | Approved low-fidelity screen and interaction references |
| 09 | [Accessibility](./09-ACCESSIBILITY.md) | Placeholder | Application-level accessibility guidance and evidence model |
| 10 | [Localization](./10-LOCALIZATION.md) | Target specification | Open-ended locale engine, launch languages, formatting, fallback, and RTL/LTR requirements |
| 11 | [UI Copy Guidelines](./11-UI-COPY-GUIDELINES.md) | Placeholder | Bilingual interface terminology, tone, labels, and state messages |
| 12 | [Screen Status Matrix](./12-SCREEN-STATUS-MATRIX.md) | Current snapshot | Per-screen completion, data, responsive, localization, state, access, and action status |
| 13 | [UX Gaps](./13-UX-GAPS.md) | Current analysis | Consolidated user-visible gaps, impact, priority, solution direction, and complexity |
| 14 | [Frontend Backlog](./14-FRONTEND-BACKLOG.md) | Planning | Dependency-aware FE tasks and definition of done; no implementation authority |
| 15 | [UX Flow Index](./15-UX-FLOW-INDEX.md) | Current index | Relationship and status index for journeys, flows, states, wireframes, gaps, and backlog |
| — | [Documentation Consolidation Report](./UI-UX-DOCUMENTATION-CONSOLIDATION-REPORT.md) | Governance record | Evidence and validation for the documentation reorganization |

## 7. Reading Order

For product and frontend orientation:

1. [Product Decision Register](../00-governance/PRODUCT-DECISIONS.md)
2. [Platform Experience](./01-PLATFORM-EXPERIENCE.md)
3. [Screen Map](./02-SCREEN-MAP.md)
4. [Screen Status Matrix](./12-SCREEN-STATUS-MATRIX.md)
5. [Frontend Experience Gap Analysis](./03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md)
6. [Information Architecture](./04-INFORMATION-ARCHITECTURE.md)
7. [UX Flow Index](./15-UX-FLOW-INDEX.md)
8. [User Journeys](./05-USER-JOURNEYS.md), [User Flows](./06-USER-FLOWS.md), and
   [State Machines](./07-STATE-MACHINES.md)
9. [Localization](./10-LOCALIZATION.md), the applicable Accessibility/UI Copy document, and the
   applicable [Design System](../04-design-system/README.md) documents
10. [UX Gaps](./13-UX-GAPS.md) and [Frontend Backlog](./14-FRONTEND-BACKLOG.md)
11. the controlling feature specification, plan, tasks, and evidence

## 8. Relationships

### 8.1 Product Decisions

The [Product Decision Register](../00-governance/PRODUCT-DECISIONS.md) remains under Governance and
is the only register of confirmed product-level decisions. UI/UX documents consume those decisions
without duplicating the register or full ADR content.

### 8.2 Architecture and ADRs

[Architecture Freezes](../99-architecture-freeze/) and Accepted ADRs define owners, context,
lifecycles, boundaries, and constraints. UI/UX documents translate approved architecture into
customer-facing behavior and navigation without changing it. Core Platform and Commerce retain
separate application and domain ownership.

### 8.3 Design System

The [Design System](../04-design-system/README.md) owns reusable presentation semantics. UI/UX owns
product journeys and flows. A user flow may select a reusable interaction pattern, but it does not
redefine that pattern; a Design System pattern may describe behavior, but it does not create a
product journey.

### 8.4 Design Intelligence

[Design Intelligence](../10-design-intelligence/08-NEXORAXS-DESIGN-LAYER.md) governs how design
candidates are researched, evaluated, proposed, approved, and remembered. It does not replace this
workspace's canonical product-experience artifacts, and this workspace does not replace its design
governance.

### 8.5 Frontend Specifications

Feature specifications under `specs/` cite applicable UX and Design System sources, define bounded
acceptance behavior, and pass Constitution Checks. Current Features 052–055 remain implementation
and compatibility evidence; their frontend-internal contracts do not become product-experience or
Design System authority.

## 9. Maintenance Rules

1. All new product-experience, navigation, journey, flow, user-visible state, wireframe,
   accessibility-application, localization-UX, and UI-copy documentation belongs here.
2. Reusable foundations, token semantics, component taxonomy, page templates, and interaction
   patterns belong under `docs/04-design-system/`.
3. Product decisions remain only in `docs/00-governance/PRODUCT-DECISIONS.md`.
4. Architecture, ADRs, Genesis, Design Intelligence, Execution policy, audits, and specifications
   remain in their governed folders.
5. Distinguish current evidence, target experience, planned work, and approved decisions.
6. Do not copy canonical documents for compatibility. Update inbound links; retain a minimal
   relocation notice only when repository evidence requires one.
7. A retained placeholder must have a distinct purpose and must not contain speculative design or
   implementation details.
8. Validate relative links, titles, ownership terminology, and `git diff --check` whenever this
   workspace changes.

## 10. Cross References

- [Product Decision Register](../00-governance/PRODUCT-DECISIONS.md)
- [Core Platform Documentation](../02-core-platform/README.md)
- [Design System](../04-design-system/README.md)
- [Design Intelligence](../10-design-intelligence/08-NEXORAXS-DESIGN-LAYER.md)
- [Frontend-First Policy](../11-execution/05-FRONTEND-FIRST-POLICY.md)
- [Documentation Policy](../11-execution/09-DOCUMENTATION-POLICY.md)
- [Architecture Program Completion](../99-architecture-freeze/NEXORAXS-ARCHITECTURE-v1.x-COMPLETE.md)
