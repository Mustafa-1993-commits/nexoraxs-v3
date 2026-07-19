# Product Decision Register

**Status:** Current product decision register  
**Register date:** 2026-07-19  
**Owner:** Product  
**Scope:** Confirmed product direction for the current NexoraXS Core Platform and Commerce delivery horizon

## Purpose and authority

This register records confirmed product-level decisions. It does not replace Accepted ADRs,
architecture freezes, the Constitution, or owner-domain specifications. Product decisions establish
experience direction and delivery sequence; architecture sources continue to define canonical
ownership, boundaries, lifecycles, security constraints, and contract rules.

The date on each entry is the date the decision was recorded in this register. It does not imply
that an architecture source was approved or amended on that date.

## Decision summary

| ID | Title | Status | Date |
|---|---|---|---|
| PD-001 | Frontend First is the active delivery strategy | Confirmed | 2026-07-19 |
| PD-002 | Customers experience value before registration | Confirmed | 2026-07-19 |
| PD-003 | Business Discovery begins before Workspace creation | Confirmed | 2026-07-19 |
| PD-004 | Candidate Business Understanding precedes canonical Business DNA | Confirmed | 2026-07-19 |
| PD-005 | Business Report Preview is the pre-registration outcome | Confirmed | 2026-07-19 |
| PD-006 | Workspace creation converts an approved discovery session | Confirmed | 2026-07-19 |
| PD-007 | Business Architect continues after registration as Guided Activation | Confirmed | 2026-07-19 |
| PD-008 | Recommendations follow reviewed business understanding | Confirmed | 2026-07-19 |
| PD-009 | Laravel/backend integration follows frontend maturity | Confirmed | 2026-07-19 |
| PD-010 | Global localization and RTL/LTR are product requirements | Confirmed | 2026-07-19 |
| PD-011 | Delivery uses incremental reconciliation, not a rewrite | Confirmed | 2026-07-19 |
| PD-012 | Core Platform and Commerce separation is established | Confirmed | 2026-07-19 |
| PD-013 | Production-level UI includes all material states | Confirmed | 2026-07-19 |
| PD-014 | Small visual changes may use a lightweight process | Confirmed | 2026-07-19 |
| PD-015 | EasyCar is outside the current product scope | Confirmed | 2026-07-19 |

## PD-001 — Frontend First is the active delivery strategy

- **Decision:** User-facing Core Platform and Commerce features mature through approved UX,
  deterministic frontend behavior, validation, and UI Freeze before feature-specific backend
  implementation begins.
- **Implications:** Frontend slices must cover primary, loading, empty, error, unauthorized,
  recovery, and success behavior; Arabic/RTL and English/LTR; accessibility; stable page-facing
  boundaries; and explicit ownership.
- **Guardrail:** Frontend state remains temporary and must not be presented as production
  authorization or canonical truth.
- **Related references:** [Frontend-First Policy](../11-execution/05-FRONTEND-FIRST-POLICY.md),
  [Mock Data Standard](../11-execution/06-MOCK-DATA-STANDARD.md), and
  [ADR-035](./ADR/ADR-035-technology-independent-compatible-contracts.md).

## PD-002 — Customers experience value before registration

- **Decision:** The primary new-customer journey demonstrates meaningful business understanding
  before requiring account registration or Workspace creation.
- **Implications:** The Landing primary CTA opens Business Discovery. Login and registration remain
  available for returning users and for conversion after the report preview.
- **Guardrail:** Pre-registration access does not create a tenant, membership, entitlement,
  subscription, canonical Business, or Operating System context.
- **Rationale:** Registration should follow demonstrated value rather than block the customer from
  understanding the platform promise.

## PD-003 — Business Discovery begins before Workspace creation

- **Decision:** A visitor may start a guided, resumable Business Discovery session without being
  authenticated. The experience gathers the minimum useful information needed to understand the
  business and its current challenges.
- **Implications:** The experience is structured and conversational, but must not be presented as an
  unbounded chatbot or a long technical setup wizard.
- **Guardrail:** Anonymous discovery sessions are temporary, privacy-aware, scoped by an opaque
  session token, and expire according to the lifecycle defined by ADR-042.
- **Related references:** [ADR-015](./ADR/ADR-015-infer-before-asking-conversational-configuration.md),
  [ADR-016](./ADR/ADR-016-business-architect-governed-pipeline.md), and
  [ADR-042](./ADR/ADR-042-pre-registration-business-discovery.md).

## PD-004 — Candidate Business Understanding precedes canonical Business DNA

- **Decision:** Information collected before registration is a **Candidate Business Understanding**,
  not canonical Business DNA.
- **Implications:** Candidate facts may include raw answers, inferred facts, confidence, provenance,
  assumptions, knowledge state, and customer corrections. The customer must be able to confirm or
  correct material understanding.
- **Guardrail:** A candidate understanding cannot authorize actions, configure an Operating System,
  create operational records, or silently become canonical. Business DNA is created or updated only
  after authenticated conversion into a selected Business context.
- **Related references:** [ADR-005](./ADR/ADR-005-business-dna-business-scoped-software-independent.md),
  [ADR-014](./ADR/ADR-014-human-control-over-recommendations-and-ai.md), and
  [ADR-042](./ADR/ADR-042-pre-registration-business-discovery.md).

## PD-005 — Business Report Preview is the pre-registration outcome

- **Decision:** The primary pre-registration output is a **Business Report Preview** that reflects
  the platform's current understanding and demonstrates useful direction before account creation.
- **Minimum content:** Business Snapshot, Observed Facts, Challenges, Desired Outcomes, Recommended
  Capabilities, explanation of why each recommendation fits, assumptions or uncertainty, and a clear
  invitation to create a Workspace.
- **Implications:** The report is understandable, explainable, reviewable, localizable, and
  accessible. It distinguishes observed facts, inferred understanding, and recommendations.
- **Guardrail:** The preview is a temporary projection, not the canonical Business Blueprint,
  Business DNA, Recommendation lifecycle, entitlement decision, or implementation commitment.

## PD-006 — Workspace creation converts an approved discovery session

- **Decision:** After the visitor reviews the Business Report Preview and chooses to continue, the
  product creates or resolves the account and Workspace, then converts the approved candidate
  understanding into the authenticated onboarding context.
- **Preferred sequence:** Create Workspace intent → Register or Login → Verify Identity when required
  → Create or select Business → Review conversion → Publish approved Business DNA.
- **Implications:** Conversion must preserve provenance and customer corrections, detect expired or
  already-consumed sessions, and be safe to retry.
- **Guardrail:** Workspace remains the tenant boundary. Business remains the owner of Business DNA.
  Conversion must not move ownership to the discovery session or report projection.

## PD-007 — Business Architect continues after registration as Guided Activation

- **Decision:** Business Architect is not removed. It continues after conversion as a Guided
  Activation experience that completes missing knowledge, validates material facts, prepares the
  canonical Business Blueprint, and guides the customer toward Core Workspace Ready.
- **Implications:** The system should not ask again for information already confirmed during
  discovery unless it is stale, conflicting, materially uncertain, or required by policy.
- **Guardrail:** Guided Activation remains separate from OS-specific setup. Each Operating System
  owns its operational configuration and readiness.

## PD-008 — Recommendations follow reviewed business understanding

- **Decision:** Recommendations arise from reviewed Business understanding. Before registration they
  are preview recommendations; after canonical Business DNA is published they may enter the governed
  Recommendation lifecycle.
- **Implications:** Recommendations identify evidence, rationale, assumptions, alternatives, risk,
  confidence, and expected benefit. Capabilities come before product, plan, or Marketplace promotion.
- **Guardrail:** AI cannot bypass deterministic decisions, authorization, customer review, owner
  validation, or human control.
- **Related references:** [ADR-012](./ADR/ADR-012-business-brain-decision-engine.md),
  [ADR-013](./ADR/ADR-013-capability-first-explainable-recommendations.md), and
  [ADR-014](./ADR/ADR-014-human-control-over-recommendations-and-ai.md).

## PD-009 — Laravel/backend integration follows frontend maturity

- **Decision:** Laravel/backend integration begins only after the applicable frontend vertical slice
  satisfies documented maturity and UI Freeze gates. Integration proceeds per approved slice, not
  as one final big-bang phase.
- **Guardrail:** This sequence does not approve endpoints, DTOs, database schemas, queues, or
  infrastructure by implication.

## PD-010 — Global localization and RTL/LTR are product requirements

- **Decision:** Every user-facing slice provides a translation path, English/LTR and Arabic/RTL
  behavior, logical-direction layout, locale-aware representation, and accessible interaction.
- **Guardrail:** User-entered Business data remains as entered unless a governed translation
  workflow exists. Presentation context cannot change authorization, canonical facts, money, time,
  document meaning, or ownership.

## PD-011 — Delivery uses incremental reconciliation, not a rewrite

- **Decision:** Preserve working routes, visible behavior, compatibility keys, and validated slices
  while reconciling implementation incrementally. A repository-wide rewrite is not the strategy.
- **Implications:** New discovery routes are added without removing the existing login/register path.
  Legacy behavior is removed only after replacement and consumer evidence exists.

## PD-012 — Core Platform and Commerce separation is established

- **Decision:** Core Platform and Commerce are separate applications and domain owners. Core owns
  platform identity, Workspace and organization context, memberships, Business understanding,
  recommendations, Product Hub, and approved projections. Commerce owns Commerce setup, operations,
  UI, and persistence.
- **Guardrail:** Pre-registration Business Discovery belongs to the Core Platform experience and may
  not write Commerce operational data.

## PD-013 — Production-level UI includes all material states

Every applicable screen or flow defines loading, empty, first-use guidance, validation, recoverable
error and retry, unavailable or permission-denied, pending or processing, success and confirmation,
responsive behavior, keyboard and assistive-technology behavior, and localized LTR/RTL behavior.

## PD-014 — Small visual changes may use a lightweight process

Small visual corrections that do not change behavior, ownership, contracts, routes, persistence,
authorization, or workflow may use a lightweight implementation and review path. Any uncertain or
material change uses the full governed lifecycle.

## PD-015 — EasyCar is outside the current product scope

EasyCar is excluded from the current NexoraXS Core Platform and Commerce decisions, experience maps,
implementation slices, and delivery roadmap. Its future architecture requires a separately governed
program.

## Current priority journey

```text
Landing
→ Business Discovery
→ Business Mapping
→ Understanding Reflection
→ Business Report Preview
→ Create Workspace Intent
→ Register or Login
→ Verify Identity when required
→ Create or Select Business
→ Convert Candidate Understanding
→ Publish approved Business DNA
→ Guided Activation
→ Canonical Business Blueprint
→ Governed Recommendations
→ Platform Dashboard / Product Hub
→ Select Operating System and Plan
→ OS-Specific Setup
→ Operational Dashboard
```

The first frontend vertical slice is the pre-registration path from Landing through Business Report
Preview. Existing authentication routes remain available and are reused during conversion.

## Explicitly deferred decisions

The following remain outside this baseline until separately approved:

- canonical Laravel HTTP endpoints, DTOs, persistence models, and token implementation;
- final anonymous-session retention duration and deletion mechanism;
- final identity verification provider and anti-abuse controls;
- final commercial package names and prices;
- backend synchronization and offline policy;
- redesign of the established Core Platform–Commerce boundary; and
- the future product position or architecture of EasyCar.

## Change control

A product decision in this register may be changed only through explicit product review. A proposed
change must identify the decision being replaced, the user or business problem, affected journeys,
architecture and implementation impact, migration and compatibility impact, and the approved
replacement decision. Implementation convenience alone is not sufficient reason.
