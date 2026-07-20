# NexoraXS Design System

- **Status:** Canonical Design System documentation index
- **Version:** 1.1 UI/UX reconciliation alignment
- **Owner:** Design System, with Core Platform and Commerce retaining product-surface ownership
- **Authority:** Canonical reusable presentation semantics, subordinate to architecture, product decisions, and Design Intelligence governance

## 1. Purpose

This directory documents the shared presentation language used to make NexoraXS experiences
consistent, accessible, localizable, and incrementally maintainable. It defines semantic
foundations, token categories, component responsibilities, page templates, and interaction
patterns without defining implementation values or approving code changes.

The Design System answers **how reusable experience semantics should be expressed**. The
[UI/UX documentation](../03-ui-ux/README.md) answers **which journey, flow, screen, route, state,
and navigation outcome the product requires**. The
[Design Intelligence Layer](../10-design-intelligence/08-NEXORAXS-DESIGN-LAYER.md) governs how a
material design change is researched, proposed, approved, and remembered.

## 2. Scope

This package covers:

- shared visual and interaction principles;
- semantic token ownership and usage categories;
- presentation primitives and reusable pattern components;
- Core-owned, Commerce-owned, and future owner-specific composition boundaries;
- reusable page-template anatomy;
- loading, error, validation, search, selection, overlay, responsive, and offline patterns; and
- Arabic/RTL, English/LTR, accessibility, light/dark, and motion requirements across all of them.

## 3. Out of Scope

This package does not:

- define concrete token values, colors, type sizes, spacing measurements, breakpoints, or utility classes;
- create or modify components, CSS, routes, tests, frontend clients, backend contracts, or schemas;
- approve a redesign, visual migration, component extraction, or shared-package admission;
- move domain behavior or owner state into `packages/ui`;
- replace Product Experience, Architecture, Accepted ADRs, Design Intelligence, or feature specifications; or
- make current app-local components canonical merely because they are listed as implementation evidence.

## 4. Documents and Authority

| Document | Contains | Authoritative for | Not authoritative for |
|---|---|---|---|
| [01-DESIGN-FOUNDATIONS.md](./01-DESIGN-FOUNDATIONS.md) | Philosophy-to-system foundation rules for consistency, accessibility, motion, responsiveness, scalability, localization, themes, and direction | Shared design-foundation semantics | Architecture, visual values, feature approval, or redesign approval |
| [02-DESIGN-TOKENS.md](./02-DESIGN-TOKENS.md) | Semantic token categories, ownership, intended usage, and change boundaries | Token roles and responsibility | Current or future concrete token values |
| [03-COMPONENT-CATALOG.md](./03-COMPONENT-CATALOG.md) | Canonical component-role catalog, variants, states, accessibility, localization, dependencies, and ownership | Component taxonomy and owner placement | A claim that every component is implemented or belongs in `packages/ui` |
| [04-PAGE-TEMPLATES.md](./04-PAGE-TEMPLATES.md) | Reusable page composition types and required regions/states | Page-template semantics | Routes, screens, domain workflows, or layout measurements |
| [05-INTERACTION-PATTERNS.md](./05-INTERACTION-PATTERNS.md) | Cross-cutting behavior for loading, errors, validation, search, data operations, overlays, responsive and offline states | Reusable interaction behavior | Owner business rules, API semantics, or persistence design |

## 5. Relationships

The Design System is one layer in the governed documentation estate. Its principal relationships
are defined below.

### 5.1 Relationship with Product Experience

Product Experience remains the source for customer journey and information placement:

- [Platform Experience](../03-ui-ux/01-PLATFORM-EXPERIENCE.md) defines stage outcomes and user-visible states.
- [Screen Map](../03-ui-ux/02-SCREEN-MAP.md) distinguishes current routes from planned screens.
- [Frontend Experience Gap Analysis](../03-ui-ux/03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md) identifies verified experience gaps and bounded frontend slices.
- [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md) is the navigation source of truth.

The Design System provides reusable ways to present those outcomes. It does not duplicate the
journey tables, route inventory, gap findings, or navigation tree.

User Flows remain under `docs/03-ui-ux/`. Reusable interaction behavior remains in
[Interaction Patterns](./05-INTERACTION-PATTERNS.md). A product flow may reference a reusable
pattern, but neither document acquires the other's authority.

### 5.2 Relationship with Design Intelligence

[Design Intelligence](../10-design-intelligence/08-NEXORAXS-DESIGN-LAYER.md) governs the process
for researching, evaluating, proposing, approving, and remembering material design changes. This
package records the reusable semantics that survive that process. It does not treat advisory
design-engine output, a proposal, or a one-feature exception as a canonical Design System rule.

### 5.3 Relationship with Frontend

The current frontend is implementation evidence and a compatibility baseline:

- `apps/landing/` owns the public marketing experience;
- `apps/core-platform/` owns Core routes and Core-specific compositions;
- `apps/commerce/` owns Commerce setup and operational compositions; and
- `packages/ui/` contains shared presentation primitives only.

Documentation in this directory does not make the current frontend complete or fully compliant.
Current shared primitives, app-local shells, duplicated presentational controls, theme sources,
and route-level patterns are inputs to later bounded specifications. Frontend-first delivery must
preserve working behavior and pass UI maturity before later integration, as defined by the
[Frontend-First Policy](../11-execution/05-FRONTEND-FIRST-POLICY.md).

Current code, tests, screenshots, and feature evidence show what is implemented. They do not
silently create or amend this canonical documentation. Conversely, a catalog entry documents a
responsibility; it does not claim that the component or state is implemented.

### 5.4 Component Ownership

Component ownership follows
[Component Governance](../10-design-intelligence/06-COMPONENT-GOVERNANCE.md):

| Component class | Intended owner |
|---|---|
| Domain-neutral accessible primitive | `packages/ui` only after the shared-admission test passes |
| Reusable domain-neutral pattern component | `packages/ui` only when semantics are proven across valid consumers |
| Core composition | `apps/core-platform/` or its approved Core feature boundary |
| Commerce composition | `apps/commerce/` or its approved Commerce feature boundary |
| Route/feature-specific composition | The owning feature until stable reuse is demonstrated |

Visual similarity is not sufficient for extraction. Shared components accept presentation data
and callbacks; they do not own permissions, tenant context, business rules, transport, or domain
state.

### 5.5 Token Ownership

[Design Tokens](./02-DESIGN-TOKENS.md) owns semantic token categories and intended usage. It does
not define concrete values. A future approved token baseline must name its implementation owner,
consumer impact, compatibility, and validation evidence. Current theme files remain implementation
evidence until that approval occurs.

## 6. UI/UX-to-Design-System Traceability

| UI/UX need | Design System authority | Boundary |
|---|---|---|
| Method-independent Discovery and candidate reflection | Foundations, Catalog sections 12–13, Templates 6.12–6.13 | Reusable semantics do not select a method, route, or lifecycle |
| Explicit review/correction/publication approval | Catalog review/confirmation roles; Interaction confirmation/validation patterns | Owner supplies authority, consequence, and result |
| Business Blueprint | Catalog section 14; Template 6.14 | Non-writing projection; source owners remain canonical |
| Insight/Recommendation confidence and provenance | Foundations; Catalog sections 14–15; Interaction disclosure/error patterns | No separate Insight owner or Recommendation lifecycle |
| Product Hub and OS handoff | Catalog section 16; Product Hub/Commerce templates | Core composes; OS owns setup and operation |
| Loading, empty, error, permission, recovery | Catalog feedback; Interaction Patterns | Presentation behavior does not create domain state |
| Accessibility | Foundations plus UI/UX Accessibility authority | WCAG 2.2 AA target; feature evidence still required |
| Localization and direction | Foundations/tokens/components/templates/patterns plus UI/UX Localization | English/Arabic parity; no fixed locale ceiling or hard-coded copy |

## 7. Reading Order

1. Read [Product Experience](../03-ui-ux/README.md) and
   [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md) for the
   required customer journey and navigation.
2. Read [Design Foundations](./01-DESIGN-FOUNDATIONS.md) for the common quality model.
3. Read [Design Tokens](./02-DESIGN-TOKENS.md) for semantic presentation roles.
4. Read [Component Catalog](./03-COMPONENT-CATALOG.md) for reusable and owner-specific component
   responsibilities.
5. Read [Page Templates](./04-PAGE-TEMPLATES.md) for composition structure.
6. Read [Interaction Patterns](./05-INTERACTION-PATTERNS.md) for state and behavior rules.
7. Before implementation, follow Design Intelligence, Design Memory, the applicable feature
   specification, and the Constitution Checks.

## 8. Maintenance Rules

- Keep semantic responsibilities separate from implementation values.
- Record whether a component or pattern is **documented**, **current implementation evidence**,
  **proposed**, or **approved for a feature**; do not treat these as synonyms.
- Preserve Core and Commerce composition ownership.
- Update Product Experience when a journey, route, or navigation outcome changes; update this
  package only when reusable presentation semantics change.
- Keep user journeys, user flows, user-visible state models, wireframes, accessibility application
  guidance, localization UX, and UI copy under `docs/03-ui-ux/`.
- Route material design changes through a design proposal and
  [Design Memory](../11-execution/11-DESIGN-MEMORY.md).
- Add exact implementation values only in an approved, separately scoped token baseline; this
  documentation package intentionally contains none.

## 9. Open Questions

1. Which current app-local primitives have proven identical interaction semantics across Core and
   Commerce and therefore qualify for a future shared-admission proposal?
2. Where should the reviewed concrete token baseline live after current theme sources are
   characterized and their consumer impact is known?
3. Which documentation or preview environment should demonstrate shared components across
   Arabic/RTL, English/LTR, light/dark, responsive, keyboard, and assistive-technology states?
4. Which design-system owner and review cadence will be named for component lifecycle and
   deprecation decisions?

## 10. Verified Against

This index was verified against:

- all documents under `docs/03-ui-ux/`;
- `docs/10-design-intelligence/01-DESIGN-PHILOSOPHY.md`, `02-DESIGN-DNA.md`,
  `05-DESIGN-PATTERNS.md`, `06-COMPONENT-GOVERNANCE.md`,
  `08-NEXORAXS-DESIGN-LAYER.md`, and `DESIGN-QUALITY-CHECKLIST.md`;
- `docs/11-execution/05-FRONTEND-FIRST-POLICY.md`, `09-DOCUMENTATION-POLICY.md`, and
  `11-DESIGN-MEMORY.md`;
- current routes, shells, and components under `apps/landing/`, `apps/core-platform/`, and
  `apps/commerce/`;
- current exports and theme sources under `packages/ui/`; and
- relevant repository findings in `docs/90-architecture-audit/`.

## 11. Cross References

- [Product Experience index](../03-ui-ux/README.md)
- [Platform Experience](../03-ui-ux/01-PLATFORM-EXPERIENCE.md)
- [Screen Map](../03-ui-ux/02-SCREEN-MAP.md)
- [Frontend Experience Gap Analysis](../03-ui-ux/03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md)
- [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md)
- [Design Philosophy](../10-design-intelligence/01-DESIGN-PHILOSOPHY.md)
- [Design DNA](../10-design-intelligence/02-DESIGN-DNA.md)
- [Component Governance](../10-design-intelligence/06-COMPONENT-GOVERNANCE.md)
- [Design Quality Checklist](../10-design-intelligence/DESIGN-QUALITY-CHECKLIST.md)
