# Frontend Experience Gap Analysis

| Field | Value |
|---|---|
| Version | 1.1 reconciliation evidence snapshot |
| Status | Evidence only; not target authority or implementation authorization |
| Snapshot | 2026-07-20 |
| Scope | `apps/landing/`, `apps/core-platform/`, and `apps/commerce/` |

## 1. Purpose

Compare verified frontend evidence with the reconciled UI/UX target. Current code proves only what
exists now; the v1.1 Freeze and reconciled authority define what downstream design must preserve.
No row is an implementation task, route decision, API proposal, or completion claim.

## 2. Status Vocabulary

- **Aligned evidence:** Present behavior supports the approved boundary for its current mock scope.
- **Partial evidence:** Some presentation exists but the target outcome is incomplete.
- **Conflicting evidence:** Current presentation communicates an incompatible sequence or meaning.
- **Missing:** No supporting frontend surface was verified.
- **Deferred:** Target detail belongs to a later approved milestone.

## 3. Traceable Gap Matrix

| Journey stage / destination | Current implementation and path | Status | UX gap | Architecture / localization / accessibility gap | Required future artifact | Priority |
|---|---|---|---|---|---|---|
| Public Entry | Landing page at `apps/landing/src/app/page.tsx` | Partial evidence | Product entry exists but no value-before-registration Discovery path | Discovery choice absent; strings not fully localized; RTL/accessibility parity unverified | Wireframes + Foundation successor feature spec | P0 |
| Business Discovery | None verified | Missing | No method-independent public or authenticated acquisition experience | Must not be reduced to chatbot/form; privacy, confidence, provenance, Arabic/English and accessible method switching need specification | UX design + feature spec | P0 |
| Candidate Reflection | None verified | Missing | Temporary understanding cannot be reviewed/corrected | Candidate/canonical distinction and provenance absent; accessible uncertainty presentation missing | UX design + feature spec | P0 |
| Value Preview | None verified | Missing | No credible pre-registration customer value | Must remain non-canonical and non-authorizing; bilingual/accessible projection design absent | UX design + feature spec | P0 |
| Register/Login | `apps/core-platform/app/register/page.tsx`, `login/page.tsx` | Partial aligned evidence | Direct entry exists but cannot converge on v1.1 publication path | Current browser mock/redirect does not prove production identity, scope, locale, or accessible recovery | Identity + Foundation feature specs | P0 |
| Email recovery/verification | `forgot-password`, `reset-password`, `verify-email`, `verify` routes | Partial evidence | Duplicate recovery presentation and incomplete state/localization coverage | Exact identity behavior deferred; many hard-coded strings | Identity UX/specification | P1 |
| Workspace resolution | `welcome`, `/onboarding` step, ContextSwitcher | Partial/conflicting evidence | Creation exists but selection/creation and context recovery are incomplete | Workspace is mixed with company/group copy; current onboarding immediately selects OS/plan; permission and a11y evidence incomplete | Core organization UX/spec | P0 |
| Business resolution | Legacy BusinessUnit-as-Business presentation in shared mock context | Conflicting evidence | No canonical Business create/select destination verified | Must not promote legacy model; selected Business is required before authenticated pipeline | Organization reconciliation spec | P0 |
| Business Architect entry/resume | None verified | Missing | No governed selected-Business pipeline UI | Inherited Session lifecycle absent; must not be conflated with Discovery or Guided Activation | UX design + feature spec | P0 |
| Candidate review/correction | None verified | Missing | No material review, provenance, correction, or contradiction treatment | Explicit review/correction boundary absent; bilingual accessible comparison needed | UX design + feature spec | P0 |
| Publication approval | None verified | Missing | No dedicated explicit first-publication action | Current “Next”/completion patterns cannot authorize DNA; permission/error/focus treatment absent | UX design + feature spec | P0 |
| Guided Activation | None verified | Missing | No post-publication adaptive continuation | Must begin after publication and remain distinct from OS setup; new states deferred | UX design + feature spec | P0 |
| Business Blueprint | None verified | Missing | No customer-facing governed projection | Must be non-writing/non-canonical; section/lineage/partial/a11y design absent | Projection UX + feature spec | P0 |
| Business Insight | None verified | Missing | No governed Insight presentation | Must remain conceptual inside Business Brain Decision; confidence/chart alternatives absent | Projection UX + feature spec | P1 |
| Optional Recommendations | None verified | Missing | No capability-first, explainable customer-choice surface | No-product/retain-current-tools outcome and evidence/alternatives absent; lifecycle remains deferred | Recommendation UX/spec | P1 |
| Platform Dashboard | `apps/core-platform/app/dashboard/page.tsx` and layout | Conflicting/partial evidence | UI exists but current guard can require Commerce mock completion | Delays Core value and collapses readiness; page localization/responsive coverage partial | Core shell reconciliation spec | P0 |
| Product Hub | `apps/core-platform/app/dashboard/apps/page.tsx` | Partial aligned evidence | Composition/handoff exists but lifecycle/context are compatibility data | Must separate availability, subscription, setup, readiness, permission; strings/a11y incomplete | Product Hub feature spec | P1 |
| Workspace admin | Settings/team pages and shell menus | Partial evidence | Missing complete permission, empty, error, invitation, profile, notification states | Hard-coded roles are not authority; localization/a11y incomplete | Core admin specs | P1 |
| OS handoff | Core/Commerce handoff seams from Feature 054 | Aligned evidence for boundary; partial for target | Explicit handoff exists, production trust/readiness not established | Core/Commerce ownership correctly separated; current browser context is not contract/authorization | Later OS/Core feature specs | P1 |
| Commerce setup | `apps/commerce/app/setup/page.tsx` | Aligned owner evidence; partial quality | Owner is correct; locale, permissions, and production states incomplete | Must stay OS-owned; Arabic/RTL and error/resume evidence uneven | Commerce feature spec | P1 |
| Commerce operations | Products, Inventory, Transfers, Customers, Orders, Invoices, POS, Reports, Settings routes | Substantial current evidence | Uneven responsive, locale, role, error, empty, document, and Returns/Movements coverage | Browser repositories are temporary; no backend/API semantics inferred; a11y coverage varies | Separate Commerce specs | P1–P2 |
| Locale change | Core locale controls and partial Commerce messages | Partial evidence | Many hard-coded strings; cross-app behavior uneven | English/Arabic parity incomplete; preference precedence deferred | Localization design/spec | P0 |
| Cross-flow recovery | Scattered current states | Partial evidence | No consistent safe interruption/resume/permission/stale model | Recovery must not invent domain states or retry consequential actions silently | Per-feature UX/spec | P0 |

## 4. Confirmed Architecture-Aligned Evidence

- Core Platform and Commerce are separate applications; Feature 054 evidence shows Core read-only
  composition/handoff and Commerce-owned operational writes. This is not a gap.
- Direct Register/Login routes exist, preserving an allowed architecture entry.
- Platform Dashboard and Product Hub surfaces exist as current Core candidates, though their guards
  and meaning require reconciliation.
- Commerce owns its setup and daily operational surfaces.
- Current frontend accessibility/localization seams provide evidence, not full authority or parity.

## 5. Stale Assumptions Removed

- The target no longer begins Landing → Register → Workspace → Business Architect.
- “Guided interview” is not the definition of Business Discovery.
- Product/plan selection does not automatically follow Recommendations and is not a Foundation
  successor sequence requirement.
- Exact proposed onboarding URLs are not target authority.
- A Business Blueprint is not a canonical store.
- Business Analysis is not authorized as a new separate engine/service UI owner.
- FE backlog readiness statements do not authorize specification or implementation.

## 6. Blocking Interpretation

Missing implementation does not block approval of a precise UI/UX authority package. It blocks
implementation readiness until wireframes, feature specifications, plans, tasks, and Constitution
Checks exist. The separate Genesis hygiene issue is assessed in the reconciliation decision record.

## 7. Relationships and Verified Against

- [Screen Map](./02-SCREEN-MAP.md)
- [Screen Status Matrix](./12-SCREEN-STATUS-MATRIX.md)
- [UX Gaps](./13-UX-GAPS.md)
- [Frontend Backlog](./14-FRONTEND-BACKLOG.md)
- `docs/99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md`
- `docs/00-governance/ADR/ADR-043-foundation-discovery-and-business-architect-composition.md`
- `apps/landing/`, `apps/core-platform/`, `apps/commerce/`, `packages/contracts/`, and
  `packages/sdk/` (current implementation evidence only)
