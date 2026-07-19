# Design Foundations

- **Status:** Canonical design-system foundation
- **Date:** 2026-07-19
- **Owner:** Design System
- **Authority:** Reusable presentation guidance subordinate to Design Intelligence and product/architecture authority

## 1. Purpose

This document translates the principles in
[NexoraXS Design Philosophy](../10-design-intelligence/01-DESIGN-PHILOSOPHY.md) and
[Design DNA](../10-design-intelligence/02-DESIGN-DNA.md) into a compact foundation for reusable
design-system work. It defines the expected character and quality of NexoraXS interfaces without
setting visual values or approving a redesign.

## 2. Scope

The foundation governs shared presentation behavior across Landing, Core Platform, Commerce, and
later approved product surfaces. It covers philosophy, visual principles, consistency,
accessibility, motion, responsiveness, scalability, localization, light/dark modes, and LTR/RTL.

## 3. Out of Scope

This document does not:

- define token values, palettes, typography metrics, spacing measurements, layout breakpoints, or classes;
- approve components, page routes, workflows, backend behavior, or architecture changes;
- replace owner-specific product personality or domain design;
- require current app-local presentation code to move into `packages/ui`; or
- duplicate journey, screen, or navigation definitions from Product Experience.

## 4. Relationships

| Source | Relationship |
|---|---|
| [Platform Experience](../03-ui-ux/01-PLATFORM-EXPERIENCE.md) | Supplies the customer outcomes and required states that these foundations must support. |
| [Screen Map](../03-ui-ux/02-SCREEN-MAP.md) | Identifies the current and planned surfaces where the foundations apply. |
| [Frontend Experience Gap Analysis](../03-ui-ux/03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md) | Identifies current localization, accessibility, and state gaps. |
| [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md) | Defines navigation ownership and structure; this document defines its design quality. |
| [Design Philosophy](../10-design-intelligence/01-DESIGN-PHILOSOPHY.md) | Higher-level design-governance principles. |
| [Product and OS Personalities](../10-design-intelligence/03-OS-PERSONALITIES.md) | Permitted owner-specific emphasis within the shared foundation. |
| [Design Tokens](./02-DESIGN-TOKENS.md) | Semantic roles through which the foundation is expressed. |
| [Component Catalog](./03-COMPONENT-CATALOG.md) | Components responsible for applying the foundation. |

## 5. Design Philosophy

NexoraXS design is business-first, human-controlled, context-aware, and owner-legible. Interfaces
help people understand their Business, operate within the correct scope, and make accountable
decisions. They do not use visual novelty to hide ownership, uncertainty, permissions, or the
consequences of an action.

The shared experience should feel calm, precise, trustworthy, and capable. Core Platform may be
more guided and administrative; Commerce may be denser and more operational. Both use one
interaction grammar and quality baseline while retaining separate product composition ownership.

## 6. Visual Principles

| Principle | Foundation rule |
|---|---|
| Clear hierarchy | Product/context, page purpose, primary action, work surface, and supporting detail are distinguishable without competing emphasis. |
| Semantic presentation | Color roles, typography roles, elevation, and borders communicate consistent meaning rather than local decoration. |
| Restrained surfaces | Containers group meaningful content; every region does not become a card or elevated panel. |
| Legible state | Status includes text or another non-color cue and identifies scope/source when material. |
| Deliberate density | Guided, standard, and operational density respond to task frequency and consequence while preserving readability and target access. |
| Visible ownership | A projection, recommendation, integrated view, or shared shell never visually implies that it owns another domain's facts. |
| Explainable intelligence | Facts, deterministic Decisions, Recommendations, and generated assistance remain distinguishable. |
| Progressive disclosure | Common work is direct; advanced or risky controls remain discoverable and are revealed with context. |

## 7. Consistency

Consistency means the same semantic intent behaves predictably, not that every product page looks
identical. NexoraXS maintains consistency through:

- one shared vocabulary for control roles, states, feedback, focus, direction, and responsive behavior;
- stable page anatomy and action hierarchy;
- owner-specific compositions built from shared semantics;
- identical meaning for success, warning, danger, disabled, selected, busy, and unavailable states;
- compatible evolution rather than silent relocation or visual rewriting; and
- documentation that distinguishes reusable rules from feature-specific behavior.

An owner-specific divergence is valid when domain task, density, risk, or environment requires it
and the divergence passes Design Intelligence review. Visual difference alone is not evidence for
a separate component or pattern.

## 8. Accessibility

Accessibility is a component and page contract, not an optional audit phase. Every applicable
experience provides:

- semantic structure and programmatic names/relationships;
- full keyboard operation with visible, unobscured focus;
- predictable focus movement and restoration across navigation, validation, dialogs, and drawers;
- text and structural alternatives for color, charts, icons, motion, and visual status;
- error identification, association, summary, and recovery;
- status announcements that are timely without becoming disruptive;
- zoom, text resizing, reflow, and supported assistive-technology behavior;
- adequate interaction targets and separation;
- reduced-motion and high-contrast-compatible behavior; and
- language/direction changes that assistive technology can understand.

Shared accessibility behavior cannot be removed by an app-local variant. Owner-specific complex
interactions provide an equivalent accessible method when their visual interaction cannot be used
directly.

## 9. Motion

Motion is used only to explain spatial change, preserve orientation, confirm causality, or draw
attention to a newly changed state. It must:

- be brief, interruptible where appropriate, and proportional to the task;
- honor reduced-motion preference and provide an equivalent non-motion signal;
- avoid delaying access to content or hiding the final state;
- never represent unmeasured progress as measured progress;
- avoid continuous ambient movement in operational work; and
- preserve focus, reading order, and screen-reader behavior.

Landing may use more expressive motion than operational products, but it remains subordinate to
readability, reduced-motion behavior, performance, and access to primary actions.

## 10. Responsiveness

Responsive design preserves task priority and meaning across supported viewports. It does not
merely shrink desktop composition. The system must:

- keep the active owner, context, page purpose, and primary action discoverable;
- transform sidebars into accessible navigation drawers where appropriate;
- reflow groups according to semantic order;
- preserve consequential data through priority, horizontal access, or structured alternatives;
- avoid hiding required actions behind hover or pointer-only interaction;
- maintain usable forms, tables, charts, dialogs, and drawers under zoom and reflow; and
- test long Arabic and English labels, mixed-script data, and empty/error content at each layout mode.

Operational density may adapt differently from guided onboarding, but neither may sacrifice
context, permission meaning, accessibility, or recovery.

## 11. Scalability

The design system scales through semantic roles, stable component responsibilities, owner-specific
composition, and controlled lifecycle—not through a single universal component containing every
domain behavior.

Scalability rules:

1. shared primitives remain presentation-only;
2. domain components remain with their canonical UI owner;
3. new variants express proven reusable intent rather than one-screen exceptions;
4. large datasets use appropriate list/table virtualization or pagination only after task and
   accessibility behavior are defined;
5. expensive secondary visuals do not block primary work;
6. component and token changes inventory consumers and provide compatible migration; and
7. later Operating Systems inherit foundations without inheriting Commerce workflows or Core governance.

## 12. Localization

Arabic and English are first-class presentation languages. Every user-facing string has an
owner-qualified translation path. Localization includes more than text replacement:

- message length and grammar are supported without truncating meaning;
- plural, number, date, time, currency, and unit presentation follows approved locale policy;
- user-entered Business and operational content remains as entered;
- source/owner terminology remains stable across languages;
- validation, empty, error, permission, success, and recovery states are translated;
- search labels and keywords account for the active language where supported; and
- content language changes are exposed semantically to assistive technology.

Localization does not alter canonical values, authorization, tax meaning, document meaning, or
data ownership.

## 13. Light Mode

Light mode expresses the shared hierarchy and semantic roles on light surfaces. It must preserve
readability, state distinctions, focus, borders, elevation, charts, disabled states, images,
documents, and print behavior. It is not a reduced-accessibility fallback or a separate product
personality.

## 14. Dark Mode

Dark mode expresses the same information and action hierarchy as light mode. It must not rely on
simple value inversion. Surface separation, state roles, focus, disabled controls, charts, media,
logos, and elevation are reviewed independently. Theme changes should not flash the wrong mode or
discard user work.

Exact theme preference precedence and durability remain governed by the applicable settings and
localization decision; this document defines presentation equivalence only.

## 15. LTR

LTR is a native composition for English and other approved left-to-right languages. Logical start
and end placement, not hard-coded physical direction, determines layout. Directional icons and
progress cues follow semantic direction; fixed symbols and brand assets do not mirror.

## 16. RTL

RTL is a native composition, not a post-implementation mirror. The system must:

- use logical reading and layout order;
- mirror only direction-dependent navigation, disclosure, and spatial indicators;
- preserve fixed symbols, media controls, mathematical meaning, and brand assets;
- handle mixed Arabic/Latin content, identifiers, email, phone, values, documents, and charts;
- preserve equivalent task order and information priority; and
- validate focus order, keyboard navigation, scroll behavior, overlays, and responsive transitions.

## 17. Foundation Compliance Questions

A reusable design-system artifact is foundation-aligned when:

- its owner and purpose are explicit;
- it works in Arabic/RTL and English/LTR;
- light and dark modes preserve semantic equivalence;
- keyboard, focus, screen-reader, zoom, responsive, and reduced-motion behavior are defined;
- loading, empty, partial, error, permission, success, and recovery states are covered where applicable;
- it does not acquire domain state or authorization responsibility; and
- any material change follows proposal, compatibility, validation, and documentation governance.

## 18. Open Questions

1. Which exact combinations of browser, device, assistive technology, language, and direction form
   the supported validation matrix for the first frontend maturity gate?
2. What is the approved scope and precedence of personal, Workspace, and session-level theme and
   locale preferences?
3. Which operational surfaces require a formally approved compact-density variant, and which can
   remain on the standard density?
4. Which current Landing motion patterns remain compatible with reduced-motion and performance
   expectations after full bilingual validation?

## 19. Verified Against

This document was verified against:

- [Platform Experience](../03-ui-ux/01-PLATFORM-EXPERIENCE.md),
  [Screen Map](../03-ui-ux/02-SCREEN-MAP.md),
  [Frontend Experience Gap Analysis](../03-ui-ux/03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md),
  and [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md);
- `docs/10-design-intelligence/01-DESIGN-PHILOSOPHY.md`, `02-DESIGN-DNA.md`,
  `03-OS-PERSONALITIES.md`, `05-DESIGN-PATTERNS.md`, and `DESIGN-QUALITY-CHECKLIST.md`;
- `docs/11-execution/05-FRONTEND-FIRST-POLICY.md` and `11-DESIGN-MEMORY.md`;
- current Landing, Core, and Commerce layouts, shells, locale/theme controls, responsive behavior,
  and state components; and
- current shared theme and primitive sources under `packages/ui/`.

## 20. Cross References

- [Design System index](./README.md)
- [Design Tokens](./02-DESIGN-TOKENS.md)
- [Component Catalog](./03-COMPONENT-CATALOG.md)
- [Page Templates](./04-PAGE-TEMPLATES.md)
- [Interaction Patterns](./05-INTERACTION-PATTERNS.md)
- [Product Experience index](../03-ui-ux/README.md)
- [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md)
- [Design Philosophy](../10-design-intelligence/01-DESIGN-PHILOSOPHY.md)
- [Design DNA](../10-design-intelligence/02-DESIGN-DNA.md)
