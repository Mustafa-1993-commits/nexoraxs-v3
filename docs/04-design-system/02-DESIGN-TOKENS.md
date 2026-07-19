# Design Tokens

- **Status:** Semantic token documentation; concrete values not defined
- **Date:** 2026-07-19
- **Owner:** Design System
- **Authority:** Token role and usage semantics only

## 1. Purpose

This document defines the ownership, intended meaning, and usage categories of NexoraXS design
tokens. It gives components and product compositions a shared semantic vocabulary while
deliberately leaving concrete values to a later approved, evidence-based token baseline.

## 2. Scope

The token model covers spacing, sizing, radius, elevation, typography, color roles, borders,
opacity, shadows, animation timing, transitions, breakpoints, grid behavior, and container-width
roles across Landing, Core Platform, Commerce, and later approved product surfaces.

## 3. Out of Scope

This document does not:

- define actual colors, typefaces, font sizes, line heights, spacing measurements, radii, shadows,
  timings, breakpoint thresholds, grid measurements, or container widths;
- define CSS variables, utility classes, theme files, framework configuration, or component code;
- approve current duplicated theme sources as a final canonical token registry;
- authorize a visual refresh or migration; or
- allow a product to redefine shared state semantics through an accent or local theme.

## 4. Relationships

| Source | Relationship |
|---|---|
| [Platform Experience](../03-ui-ux/01-PLATFORM-EXPERIENCE.md) | Defines the state, localization, accessibility, and mode outcomes tokens must support. |
| [Screen Map](../03-ui-ux/02-SCREEN-MAP.md) | Identifies the current product surfaces and route types that consume token roles. |
| [Frontend Experience Gap Analysis](../03-ui-ux/03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md) | Records current token/theme inconsistency as implementation context, not token authority. |
| [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md) | Supplies shell and navigation semantics that token roles express. |
| [Design Foundations](./01-DESIGN-FOUNDATIONS.md) | Defines the shared quality principles behind token roles. |
| [Component Catalog](./03-COMPONENT-CATALOG.md) | Defines the components that consume semantic tokens. |
| [Component Governance](../10-design-intelligence/06-COMPONENT-GOVERNANCE.md) | Governs token consumption, change review, and product-personality limits. |

## 5. Ownership Model

| Responsibility | Owner |
|---|---|
| Define shared semantic roles and their intended meaning | Design System |
| Approve material visual direction or token change | Design governance through the applicable proposal and Design Memory process |
| Maintain the future reviewed implementation source | To be named by an approved token-baseline specification |
| Consume shared semantic roles in presentation primitives | `packages/ui` |
| Map approved product personality to bounded accent/emphasis roles | Owning product, within shared semantics |
| Compose tokens into Core-specific experiences | Core Platform frontend |
| Compose tokens into Commerce operational experiences | Commerce frontend |
| Define success, warning, danger, permission, or canonical business meaning | The applicable product/domain source; tokens only present the resolved meaning |

Current files under `packages/ui/src/` and app theme sources are implementation evidence. Their
presence does not make every current value, name, or duplication canonical.

## 6. Token Architecture

Tokens should be understood in three semantic layers:

1. **Foundation roles** describe general presentation qualities such as spacing rhythm,
   typography roles, surface hierarchy, motion timing, and layout mode.
2. **Component roles** apply those foundations to a control or pattern, such as input boundary,
   dialog elevation, focus indication, table density, or sidebar surface.
3. **Product mappings** select approved emphasis or density for Core, Commerce, or another approved
   surface without redefining shared state meaning.

Components consume semantic roles. They do not depend on raw visual values or encode one product's
identity as a shared primitive variant.

## 7. Token Category Register

| Category | Semantic roles | Intended usage | Ownership guardrail |
|---|---|---|---|
| Spacing | Inline relation, control inset, stack rhythm, group separation, section separation, page inset | Express proximity, grouping, hierarchy, and responsive rhythm | Apps may compose roles but do not create local values to repair one screen silently |
| Sizing | Interaction target, control, icon, avatar/mark, navigation region, content region, data visualization | Keep comparable controls and regions predictable while allowing task-appropriate density | Size never reduces keyboard, touch, zoom, or readability requirements |
| Radius | Control, small container, card/panel, overlay, rounded status/choice | Express component family and containment hierarchy | Radius is presentation only; it never communicates state or ownership by itself |
| Elevation | Base, raised content, sticky/floating navigation, overlay, modal interruption | Communicate layering and interaction priority | Product accents do not redefine overlay ordering or focus containment |
| Typography | Display, page title, section title, body, label, supporting text, data, identifier/code | Maintain one semantic hierarchy across Arabic and Latin scripts | Concrete families and metrics require bilingual validation before approval |
| Color roles | Canvas, surface, elevated surface, text hierarchy, border, action, focus, selection, information, positive, warning, critical, disabled, data series | Convey hierarchy and state consistently in light/dark and product contexts | Color is never the only state cue; product accents cannot replace shared semantic states |
| Borders | Subtle boundary, strong boundary, interactive boundary, focus boundary, divider, selected boundary | Separate surfaces, fields, groups, rows, and active interaction | Borders must remain legible in both themes and high-contrast modes |
| Opacity | De-emphasis, disabled presentation, backdrop, skeleton/content placeholder, non-interactive decoration | Adjust emphasis without removing semantic content | Opacity cannot be the only disabled, hidden, unavailable, or selected indication |
| Shadows | Low separation, raised content, floating control, overlay/dialog | Support elevation when surface contrast alone is insufficient | Shadows are optional by mode; dark mode may use boundary or tonal separation instead |
| Animation timing | Immediate feedback, standard transition, deliberate spatial change, progress/indeterminate motion | Keep feedback responsive and spatial changes understandable | No timing implies measurable progress; reduced-motion alternatives are mandatory |
| Transitions | State change, reveal/dismiss, reordering, theme change, focus/hover feedback | Preserve causality and orientation | Only properties safe for performance, readability, and reduced motion participate |
| Breakpoints | Compact, intermediate, wide task layout | Switch composition based on content and task needs | Thresholds are implementation values to be approved later; product shells preserve the same semantic modes |
| Grid | Page grid, section grid, card/list grid, data grid alignment, responsive flow | Align content and preserve semantic order across modes | Grid adaptation never reorders reading/focus meaning or hides consequential data |
| Container widths | Focused flow, standard content, wide data/analytics, edge-to-edge operational workspace | Match content measure to task type | Width roles do not authorize arbitrary per-page measurements or constrain necessary reflow |

## 8. Spacing

Spacing communicates relationship:

- **inline relation** joins an icon, label, value, or action that belongs together;
- **control inset** protects content inside a control or bounded surface;
- **stack rhythm** separates items in a repeated vertical or horizontal sequence;
- **group separation** distinguishes related field, action, or metadata groups;
- **section separation** separates different tasks or information regions; and
- **page inset** keeps content clear of the shell and viewport boundary.

Operational density may select a denser approved mapping, but semantic relationships and
interaction access remain unchanged in Arabic/RTL, English/LTR, and responsive layouts.

## 9. Sizing

Sizing roles create predictable control families without turning a value into product semantics.
The system distinguishes interaction targets, controls, icons, identity marks, navigation regions,
content regions, and visualizations. Compact presentation never reduces required accessible target
behavior. Content, translation length, zoom, and mixed-script data may expand a component beyond
its preferred role.

## 10. Radius

Radius roles establish a coherent containment family across controls, cards, overlays, and status
items. A component selects the role associated with its function and hierarchy. Radius does not
signal success, importance, ownership, product access, or recommendation confidence.

## 11. Elevation and Shadows

Elevation describes stacking responsibility; shadows are one optional way to express it. Base
content, raised content, sticky/floating navigation, overlays, and modal interruptions have
distinct roles. The implementation must combine elevation with focus order, modality, backdrop,
and semantic structure. Visual stacking never changes DOM reading order, owner, or permission.

## 12. Typography

Typography roles are semantic and script-independent:

- display for rare high-level public emphasis;
- page title for the current task or location;
- section title for a meaningful region;
- body for primary reading;
- label for controls and compact metadata;
- supporting text for explanation and recovery;
- data for comparable values; and
- identifier/code for canonical codes or technical identifiers that require distinction.

Arabic and Latin mappings must have comparable perceived hierarchy, legibility, wrapping, and
density. A concrete family or metric is not approved by this document.

## 13. Color Roles

Color roles describe meaning, never specific colors:

- canvas and surface hierarchy;
- primary, secondary, and muted text;
- default, strong, interactive, and focus boundaries;
- primary action and selected state;
- informational, positive/success, warning, and critical/danger state;
- disabled/unavailable presentation; and
- data-series distinction with accessible alternatives.

Core and Commerce may map approved accent emphasis, but both retain identical state semantics.
Recommendation confidence, analytics trend, owner, and selection always include a non-color signal.

## 14. Borders and Opacity

Borders provide structure where surface tone or elevation is insufficient. Opacity may reduce
emphasis for non-interactive decoration, backdrops, or visibly disabled presentation. Neither is
used to conceal required content or serve as the sole indicator of focus, availability,
authorization, or validation.

## 15. Animation Timing and Transitions

Timing roles distinguish immediate feedback, standard state transitions, deliberate spatial
change, and ongoing indeterminate activity. Components select the shortest role that preserves
comprehension. Transitions describe the state change, not decoration. Reduced-motion behavior
removes or simplifies motion while preserving the same outcome and feedback.

## 16. Breakpoints, Grid, and Container Widths

Layout tokens express semantic modes rather than device brands:

- **compact** prioritizes the current task and uses owner-safe drawers or stacked composition;
- **intermediate** balances navigation and content without losing context; and
- **wide** supports simultaneous context, data comparison, or master/detail work where useful.

Grid roles preserve source order, reading order, and focus order. Container roles match the task:
focused for authentication/guided flows, standard for most pages, wide for tables/analytics, and
edge-to-edge only for genuinely operational workspaces such as POS. Exact thresholds and widths
require later implementation evidence.

## 17. Token Change Rules

A token change requires:

- a documented problem and affected semantic role;
- current consumer inventory across Landing, Core, Commerce, and `packages/ui`;
- Arabic/RTL, English/LTR, light/dark, responsive, zoom, contrast, and reduced-motion impact;
- component and visual-regression evidence appropriate to the change;
- a compatible migration and rollback path;
- an approved design proposal when learned behavior or visual identity changes materially; and
- synchronized component and product documentation.

No current theme duplication is silently reconciled through this document.

## 18. Open Questions

1. Which file or package will become the reviewed concrete token source after a bounded token
   inventory and consumer migration plan are approved?
2. Which existing token names are semantic, which are raw or product-specific, and which are
   compatibility aliases?
3. Which density mappings are required for Commerce operational surfaces without creating a
   second component system?
4. What deprecation window and compatibility mechanism will apply when current app theme sources
   move to a reviewed shared baseline?

## 19. Verified Against

This document was verified against:

- [Platform Experience](../03-ui-ux/01-PLATFORM-EXPERIENCE.md),
  [Screen Map](../03-ui-ux/02-SCREEN-MAP.md),
  [Frontend Experience Gap Analysis](../03-ui-ux/03-FRONTEND-EXPERIENCE-GAP-ANALYSIS.md),
  and [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md);
- `docs/10-design-intelligence/01-DESIGN-PHILOSOPHY.md`, `02-DESIGN-DNA.md`,
  `03-OS-PERSONALITIES.md`, and `06-COMPONENT-GOVERNANCE.md`;
- `packages/ui/src/tokens.css`, `packages/ui/src/styles/nexoraxs-theme.css`,
  `packages/ui/src/styles/core-theme.css`, and `packages/ui/src/styles/commerce-theme.css` as
  current implementation evidence only;
- `apps/core-platform/app/globals.css`, `apps/commerce/app/globals.css`, and
  `apps/landing/src/app/globals.css` as current consumer evidence; and
- current shared and app-local components under `packages/ui/`, `apps/core-platform/`, and
  `apps/commerce/`.

## 20. Cross References

- [Design System index](./README.md)
- [Design Foundations](./01-DESIGN-FOUNDATIONS.md)
- [Component Catalog](./03-COMPONENT-CATALOG.md)
- [Page Templates](./04-PAGE-TEMPLATES.md)
- [Interaction Patterns](./05-INTERACTION-PATTERNS.md)
- [Product Experience index](../03-ui-ux/README.md)
- [Information Architecture](../03-ui-ux/04-INFORMATION-ARCHITECTURE.md)
- [Component Governance](../10-design-intelligence/06-COMPONENT-GOVERNANCE.md)
