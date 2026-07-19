# Product Decision Register

**Status:** Current product decision register  
**Register date:** 2026-07-19  
**Owner:** Product  
**Scope:** Confirmed product direction for the current NexoraXS Core Platform and Commerce delivery horizon

## Purpose and authority

This register records confirmed product-level decisions. Decision identifiers are permanent: an ID is
never reused for a different meaning. When a decision changes, the original entry remains recorded and
links to the decision that supersedes or amends it.

This register does not replace Accepted ADRs, architecture freezes, the Constitution, or owner-domain
specifications. Product decisions establish experience direction and delivery sequence; architecture
sources define canonical ownership, boundaries, lifecycles, security constraints, and contract rules.

## Decision summary

| ID | Title | Status | Date | Relationship |
|---|---|---|---|---|
| PD-001 | Frontend First is the active delivery strategy | Confirmed | 2026-07-19 | — |
| PD-002 | Customers enter the Platform before an Operating System | Confirmed | 2026-07-19 | Amended by PD-011 |
| PD-003 | Business Architect is the primary onboarding experience | Superseded | 2026-07-19 | Superseded by PD-012 and PD-016 |
| PD-004 | Business Blueprint is the main onboarding output | Amended | 2026-07-19 | Amended by PD-014 |
| PD-005 | Recommendations follow business analysis and the Business Blueprint | Amended | 2026-07-19 | Amended by PD-017 and PD-018 |
| PD-006 | Laravel/backend integration follows frontend maturity | Confirmed | 2026-07-19 | — |
| PD-007 | Global localization and RTL/LTR are product requirements | Confirmed | 2026-07-19 | — |
| PD-008 | Delivery uses incremental reconciliation, not a rewrite | Confirmed | 2026-07-19 | — |
| PD-009 | Core Platform and Commerce separation is established | Confirmed | 2026-07-19 | — |
| PD-010 | EasyCar is outside the current product scope | Confirmed | 2026-07-19 | — |
| PD-011 | Customers experience value before registration | Confirmed | 2026-07-19 | Amends PD-002 |
| PD-012 | Business Discovery begins before Workspace creation | Confirmed | 2026-07-19 | Supersedes the pre-registration part of PD-003 |
| PD-013 | Candidate Business Understanding precedes canonical Business DNA | Confirmed | 2026-07-19 | — |
| PD-014 | Business Report Preview is the pre-registration outcome | Confirmed | 2026-07-19 | Amends PD-004 |
| PD-015 | Workspace creation converts an approved Discovery Session | Confirmed | 2026-07-19 | — |
| PD-016 | Business Architect continues after registration as Guided Activation | Confirmed | 2026-07-19 | Supersedes the authenticated part of PD-003 |
| PD-017 | Recommendations follow reviewed business understanding | Confirmed | 2026-07-19 | Amends PD-005 |
| PD-018 | Business Benefit comes before Product Adoption | Confirmed | 2026-07-19 | Amends PD-005 |
| PD-019 | Production-level UI includes all material states | Confirmed | 2026-07-19 | — |
| PD-020 | Small visual changes may use a lightweight process | Confirmed | 2026-07-19 | — |

## PD-001 — Frontend First is the active delivery strategy

- **Decision:** User-facing Core Platform and Commerce features mature through approved UX,
  deterministic frontend behavior, validation, and UI Freeze before feature-specific backend
  implementation begins.
- **Guardrail:** Frontend state remains temporary and must not be presented as production
  authorization or canonical truth.
- **Related references:** [Frontend-First Policy](../11-execution/05-FRONTEND-FIRST-POLICY.md),
  [Mock Data Standard](../11-execution/06-MOCK-DATA-STANDARD.md), and
  [ADR-035](./ADR/ADR-035-technology-independent-compatible-contracts.md).

## PD-002 — Customers enter the Platform before an Operating System

- **Decision:** Core Platform remains the customer's platform entry and canonical account context.
- **Amendment:** PD-011 allows new visitors to experience bounded Core-owned Business Discovery before
  registration without creating a Workspace, Business, or Operating System context.
- **Guardrail:** An Operating System is never the anonymous or canonical tenant boundary.

## PD-003 — Business Architect is the primary onboarding experience

- **Status:** Superseded.
- **Historical decision:** Business Architect was the primary onboarding experience after Workspace
  and Business creation.
- **Replacement:** PD-012 introduces pre-registration Business Discovery, while PD-016 preserves
  Business Architect after registration as Guided Activation.

## PD-004 — Business Blueprint is the main onboarding output

- **Decision:** The canonical authenticated onboarding output remains the Business Blueprint.
- **Amendment:** PD-014 introduces a distinct, temporary Business Report Preview before registration.
- **Guardrail:** The Preview and the canonical Blueprint are different projections with different
  authority and lifecycle.

## PD-005 — Recommendations follow business analysis and the Business Blueprint

- **Decision:** Governed recommendations follow reviewed and canonical business analysis.
- **Amendment:** PD-017 permits clearly identified preview recommendations before registration, and
  PD-018 requires advice to remain independent from sales incentives.

## PD-006 — Laravel/backend integration follows frontend maturity

- **Decision:** Laravel/backend integration begins only after the applicable frontend vertical slice
  satisfies documented maturity and UI Freeze gates. Integration proceeds per approved slice.
- **Guardrail:** This sequence does not approve endpoints, DTOs, database schemas, queues, or
  infrastructure by implication.

## PD-007 — Global localization and RTL/LTR are product requirements

- **Decision:** Every user-facing slice provides a translation path, English/LTR and Arabic/RTL
  behavior, logical-direction layout, locale-aware representation, and accessible interaction.
- **Guardrail:** Presentation context cannot change authorization, canonical facts, money, time,
  document meaning, or ownership.

## PD-008 — Delivery uses incremental reconciliation, not a rewrite

- **Decision:** Preserve working routes, visible behavior, compatibility keys, and validated slices
  while reconciling implementation incrementally.
- **Implication:** New discovery routes are added without removing existing login/register behavior.

## PD-009 — Core Platform and Commerce separation is established

- **Decision:** Core Platform and Commerce are separate applications and domain owners. Core owns
  platform identity, Workspace context, Business understanding, recommendations, Product Hub, and
  approved projections. Commerce owns Commerce setup, operations, UI, and persistence.
- **Guardrail:** Pre-registration Business Discovery may not write Commerce operational data.

## PD-010 — EasyCar is outside the current product scope

EasyCar is excluded from the current NexoraXS Core Platform and Commerce decisions, experience maps,
implementation slices, and delivery roadmap.

## PD-011 — Customers experience value before registration

- **Decision:** The primary new-customer journey demonstrates meaningful business understanding before
  requiring account registration or Workspace creation.
- **Implications:** The Landing primary CTA opens Business Discovery. Login remains available for
  returning users and for conversion after the report.
- **Guardrail:** Pre-registration access creates no tenant, membership, entitlement, subscription,
  canonical Business, or Operating System context.

## PD-012 — Business Discovery begins before Workspace creation

- **Decision:** A visitor may begin a temporary, goal-oriented Business Discovery Session without
  authentication.
- **Implications:** Discovery acquires only the knowledge needed for the current understanding goal.
  Guided Business Conversation is the initial experience pattern, not the definition of the
  capability; future sources may include documents, integrations, voice, websites, and APIs.
- **Guardrail:** Discovery Sessions are temporary, privacy-aware, opaque-token scoped, and governed by
  ADR-042.
- **Related references:** [ADR-042](./ADR/ADR-042-pre-registration-business-discovery.md).

## PD-013 — Candidate Business Understanding precedes canonical Business DNA

- **Decision:** Information acquired before registration is Candidate Business Understanding, not
  canonical Business DNA.
- **Implications:** It may include input, Observed Facts, Inferences, Assessments, confidence,
  provenance, semantic knowledge states, and corrections.
- **Guardrail:** Candidate knowledge cannot authorize actions, configure an Operating System, create
  operational records, or silently become canonical.

## PD-014 — Business Report Preview is the pre-registration outcome

- **Decision:** The primary pre-registration output is an interactive Business Report Preview that
  reflects current understanding and provides real, usable insight.
- **Minimum content:** Business Understanding Statement, Business Snapshot, material Observed Facts and
  Inferences, Assessments, Needs, Priorities, Desired Outcomes, Recommended Capabilities,
  Implementation Options, reasoning, uncertainty, and what remains to be learned.
- **Guardrail:** The Preview is a temporary projection, not Business DNA, the canonical Business
  Blueprint, a governed Recommendation aggregate, an entitlement decision, or an implementation
  commitment.

## PD-015 — Workspace creation converts an approved Discovery Session

- **Decision:** After the visitor chooses to save and continue, authentication, Workspace resolution,
  and Business selection occur before approved candidate knowledge is published as Business DNA v1.
- **Implications:** Conversion preserves provenance, corrections, confidence, and lineage; detects
  expired or consumed sessions; and is safe to retry.
- **Guardrail:** Workspace remains the tenant boundary and Business remains the owner of Business DNA.

## PD-016 — Business Architect continues after registration as Guided Activation

- **Decision:** Business Architect continues after conversion as Guided Activation. It completes
  missing knowledge, resolves uncertainty, validates material facts, publishes governed Business DNA
  revisions, and prepares the canonical Business Blueprint.
- **Guardrail:** Information already confirmed is not asked again unless stale, conflicting,
  materially uncertain, or required by policy. Guided Activation remains separate from OS setup.

## PD-017 — Recommendations follow reviewed business understanding

- **Decision:** Recommendations arise through the distinct sequence:

```text
Observed Fact
→ Inference
→ Business Assessment
→ Business Need or Priority
→ Desired Outcome
→ Recommended Capability
→ Implementation Option
```

- **Implications:** Business Understanding, Business Insight, Recommendation, and Projection are
  separate conceptual responsibilities. Recommendation lineage to supporting knowledge is required
  from the MVP even if the full traceability UI is deferred.
- **Guardrail:** AI cannot bypass deterministic decisions, authorization, customer review, owner
  validation, or human control.

## PD-018 — Business Benefit comes before Product Adoption

- **Decision:** NexoraXS exists to improve businesses, not merely to increase product adoption.
- **Law:** Advice must remain credible even when the best advice does not generate a sale.
- **Implications:** The platform may recommend process improvements, existing tools, additional
  discovery, no new capability, or non-NexoraXS alternatives. NexoraXS products are suggested only
  when appropriate and are disclosed as such.
- **Guardrail:** Recommendations must not be ranked by NexoraXS commercial return.

## PD-019 — Production-level UI includes all material states

Every applicable screen or flow defines loading, empty, first-use guidance, validation, recoverable
error and retry, unavailable or permission-denied, pending or processing, success and confirmation,
responsive behavior, keyboard and assistive-technology behavior, and localized LTR/RTL behavior.

## PD-020 — Small visual changes may use a lightweight process

Small visual corrections that do not change behavior, ownership, contracts, routes, persistence,
authorization, or workflow may use a lightweight implementation and review path. Any uncertain or
material change uses the full governed lifecycle.

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
→ Create or Resolve Workspace
→ Create or Select Business
→ Convert Candidate Understanding
→ Publish approved Business DNA v1
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

- canonical Laravel HTTP endpoints, DTOs, persistence models, and token implementation;
- final anonymous-session retention duration and deletion mechanism;
- final identity verification provider and anti-abuse controls;
- physical extraction of the Business Insight Engine into a separate deployable module;
- the complete Decision Traceability experience;
- final commercial package names and prices;
- backend synchronization and offline policy; and
- the future product position or architecture of EasyCar.

## Change control

A product decision may be changed only through explicit product review. A proposed change must identify
the decision being replaced, the user or business problem, affected journeys, architecture and
implementation impact, migration and compatibility impact, and the approved replacement decision.
Implementation convenience alone is not sufficient reason.