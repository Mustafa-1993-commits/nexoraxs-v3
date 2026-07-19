# Customer Journey

**Version:** 1.2  
**Status:** Foundation  
**Owner:** NexoraXS  
**Last Updated:** 2026-07-19

---

## Purpose

This document defines the complete customer journey inside NexoraXS.

Every screen, workflow, recommendation, Business, Workspace, and Operating System must support this
journey without changing canonical ownership boundaries.

The customer journey is the primary UX blueprint of the platform.

---

## Core philosophy

Customers should never feel they are configuring software.

Customers should feel they are understanding and building their business.

The platform must demonstrate useful, reviewable business understanding before asking a new visitor
to create an account.

---

## Journey overview

```text
Visitor
↓
Marketing Website
↓
Business Discovery
↓
Business Mapping
↓
Understanding Reflection
↓
Did We Miss Anything Important?
↓
Business Report Preview
↓
Create Workspace Intent
↓
Sign Up / Login
↓
Verify Identity when required
↓
Create or Resolve Workspace
↓
Create or Select Business
↓
Convert Candidate Business Understanding
↓
Publish approved Business DNA v1
↓
Guided Activation / Business Architect
↓
Canonical Business Blueprint
↓
Governed Recommendations
↓
Platform Dashboard / Product Hub
↓
Select Operating System and Plan
↓
OS-Specific Setup
↓
Operational Dashboard
↓
Daily Operations
↓
Growth and Marketplace
```

Returning customers may enter through Login and resume their authenticated Workspace, Business,
Guided Activation, Product Hub, or Operating System journey.

---

## Phase 1 — Discover

The customer visits NexoraXS.

The goal is trust and curiosity. The customer should understand:

- what NexoraXS is;
- why it is different;
- how it understands a business before recommending software; and
- that starting Business Discovery does not require immediate registration.

The primary call to action begins Business Discovery. Login remains visible for returning users.

---

## Phase 2 — Business Discovery

The visitor starts a temporary, pre-registration Discovery Session.

Business Discovery is goal-oriented. The platform identifies what it already knows, what it still
needs to know, and the next most valuable missing fact required to achieve the current discovery goal.
It stops when the applicable completion criteria are met.

The initial experience is a **Guided Business Conversation**, but conversation is not the definition
of Business Discovery. The same lifecycle may later acquire knowledge through documents,
integrations, voice, websites, APIs, or other governed sources.

The experience may ask or acquire information such as:

- what the business does;
- what the customer wants to improve;
- how key work is currently managed;
- what creates the most friction;
- which outcomes matter now; and
- which facts remain uncertain or contradictory.

The platform carries the complexity of understanding. It uses clear language, contextual interaction
patterns, semantic skip states, lightweight acknowledgement, and meaningful reflection rather than a
long technical wizard or an unbounded chatbot.

The session is temporary, privacy-aware, resumable through an opaque token, and subject to expiration.
It does not create a Workspace, Business, membership, subscription, entitlement, or Operating System.

---

## Phase 3 — Business Mapping

The platform normalizes acquired information into Candidate Business Understanding.

Candidate information may contain:

- raw input and imported source material;
- Observed Facts;
- Inferences;
- Business Assessments;
- business activities and operating model;
- goals, challenges, priorities, and desired outcomes;
- confidence and uncertainty;
- provenance, evidence, and lineage;
- semantic knowledge states such as unknown, not applicable, or withheld;
- visitor corrections; and
- unresolved contradictions or questions.

Candidate Business Understanding is temporary and non-canonical. It is not Business DNA and cannot
authorize actions, configure an Operating System, or create operational records.

---

## Phase 4 — Understanding Reflection

Before producing the report, the platform reflects material understanding back to the visitor.

The reflection combines:

- a human-readable summary;
- structured, editable facts;
- meaningful Inferences and Assessments;
- visible uncertainty where useful; and
- clear correction controls.

The visitor can:

- confirm the general understanding;
- correct a fact;
- correct an interpretation;
- distinguish supplied facts from platform Inferences and Assessments; and
- understand where confidence or evidence is limited.

Confirmation is selective. Clear direct facts do not require repetitive confirmation, while inferred,
consequential, conflicting, or low-confidence knowledge does.

Corrections preserve provenance and may trigger recalculation of affected insights and recommendations.

---

## Phase 5 — Did We Miss Anything Important?

Before finalizing the report projection, NexoraXS gives the visitor a clear chance to add or correct
material context.

This step is not a generic open-ended form. It focuses on knowledge that could materially change the
current assessment, recommendation, or completion decision.

---

## Phase 6 — Business Report Preview

The platform presents an interactive, useful pre-registration Business Report Preview.

The report is a projection of knowledge, not the source of truth.

The report narrative presents, where relevant:

1. Business Understanding Statement;
2. Business Snapshot;
3. how the business currently operates;
4. what appears to be working;
5. what may need attention;
6. Business Foundation Snapshot;
7. current priorities;
8. Recommended Outcomes;
9. Required Capabilities;
10. why each recommendation appears;
11. Implementation Options and initial Operating System suggestions where appropriate;
12. what NexoraXS still needs to learn; and
13. actions to correct, continue, or save.

The knowledge-to-advice sequence remains explicit:

```text
Observed Fact
→ Inference
→ Business Assessment
→ Business Need or Priority
→ Desired Outcome
→ Recommended Capability
→ Implementation Option
→ Suggested NexoraXS product only when appropriate
```

The report provides real, usable value before registration. It does not hide the first meaningful
insight behind an account wall.

Registration unlocks durable saving, cross-device continuation, deeper reasoning, comparison,
sharing, export, recommendation tracking, Guided Activation, and publication of Business DNA.

The report remains a temporary projection and is not the canonical Business Blueprint, Business DNA,
governed Recommendation lifecycle, entitlement decision, or implementation commitment.

---

## Phase 7 — Create Workspace Intent and Authentication

After reviewing the report, the visitor chooses to save and continue.

The preferred sequence is:

```text
Create Free Workspace to Save and Continue
→ Sign Up or Login
→ Verify Identity or Email when required
→ Create or Resolve Workspace
```

Authentication is introduced as preservation and continuation of the understanding already built, not
as the beginning of an unrelated setup journey.

Expired, invalid, or already-consumed Discovery Sessions must have clear recovery behavior.

---

## Phase 8 — Create or Select Business

The authenticated customer creates or selects the Business that will own canonical Business DNA.

Workspace remains the tenant boundary. Business remains the owner of Business DNA.

OS-specific legal, billing, tax, document, or operational identity remains part of the selected
Operating System setup where that Operating System owns it.

---

## Phase 9 — Convert Candidate Business Understanding

The platform displays the candidate understanding in the authenticated Business context and asks the
customer to approve its conversion.

Conversion must:

- preserve raw input, provenance, corrections, confidence, and lineage;
- avoid asking again for confirmed information unless stale, conflicting, materially uncertain, or
  required by policy;
- be safe to retry;
- prevent unintended repeated consumption; and
- clearly separate candidate information from canonical publication.

Only approved information is published into the selected Business's canonical understanding.

---

## Phase 10 — Publish approved Business DNA v1

Approved information becomes the first Business-scoped **Business DNA v1** through the governed Core
Platform pipeline.

Business DNA remains software-independent and contains the minimum canonical knowledge required for
analysis and initial recommendations.

Each additional Business owns separate Business DNA and follows its own review and activation state.

---

## Phase 11 — Guided Activation / Business Architect

Business Architect continues after registration as Guided Activation.

It completes missing knowledge, resolves uncertainty, validates material facts, publishes governed
Business DNA revisions, and prepares the Business for platform use.

Guided Activation is adaptive, resumable, explainable, and governed. It preserves:

- source input and imported evidence;
- Inferences and Assessments;
- provenance and decision lineage;
- validation and customer review;
- pause and resume;
- safe failure and recovery; and
- distinctions between temporary, reviewed, and canonical information.

Guided Activation is a Core Platform experience. It does not replace OS-specific setup.

---

## Phase 12 — Canonical Business Blueprint

The main authenticated onboarding outcome is the Business Blueprint.

```text
Business Blueprint =
Business DNA
+ Business Analysis
+ Identified Needs and Risks
+ Recommended Capabilities
+ Suggested Implementation Roadmap
+ Readiness Summary
```

The Business Blueprint is a customer-facing projection of canonical analysis. It is distinct from the
pre-registration Business Report Preview.

---

## Phase 13 — Governed Recommendations

The conceptual responsibility chain is:

```text
Business Understanding Engine
→ Business Insight Engine
→ Recommendation Engine
→ Projection
```

Every consequential recommendation explains its evidence, rationale, assumptions, alternatives, risk,
confidence, expected benefit, dependencies, and validation signal at an appropriate level of detail.

Capabilities come before product or plan promotion. Not every recommendation ends in a NexoraXS
product.

NexoraXS follows the Product Ethics Law:

> NexoraXS exists to improve businesses, not merely to increase product adoption.

Advice must remain credible even when the best advice does not generate a sale.

Recommendation lineage to supporting knowledge is preserved from the MVP, even when the complete
Decision Traceability UI is delivered later.

At this point the Workspace may become Core Workspace Ready. It is not automatically Operating System
Ready.

---

## Phase 14 — Platform Dashboard and Product Hub

Product Hub opens in the context of the selected Business.

An explicitly identified Workspace view may aggregate recommendations across Businesses without
replacing their individual Business DNA.

Only relevant Operating Systems and implementation options are highlighted. Product Hub does not own
Operating System setup or operational data.

---

## Phase 15 — Select Operating System and Plan

The customer may select an Operating System and an available plan.

Commercial prompts must not interrupt Business Discovery unnecessarily. Product and plan selection
must be contextual and supported by reviewed Business understanding and Recommendations.

---

## Phase 16 — OS-Specific Setup

The selected Operating System owns its setup experience, operational configuration, data, commands,
and readiness.

It collects only the information required by that Operating System and configures its modules,
workflows, permissions, and operational defaults.

When setup, configuration, activation, and readiness requirements are complete, the Operating System
is Operating System Ready.

---

## Phase 17 — Operational Dashboard and Daily Operations

The customer enters the selected Operating System dashboard.

Daily operations begin only after Operating System Ready.

Business Brain may observe permitted usage and improve recommendations without transferring ownership
of Operating System operational data to Core.

---

## Phase 18 — Growth and Marketplace

Business Brain detects growth, risks, expansion, automation opportunities, and new capability needs.

Customers may purchase, install, and activate relevant Marketplace assets.

Knowledge Pack content remains shared and immutable while activation and applicability remain scoped
to the Workspace and optionally the selected Business.

---

## Customer feelings

```text
Discover → Curiosity
Business Discovery → Engagement
Understanding Reflection → Recognition
Business Report Preview → Confidence
Registration and Workspace Creation → Continuity
Guided Activation → Understanding
Business Blueprint → Clarity
Recommendations → Trust
Core Workspace Ready → Relief
Operating System Ready → Productivity
Growth → Excitement
Marketplace → Expansion
```

---

## Journey guardrails

- Business Discovery is goal-oriented and interface-independent.
- Guided Business Conversation is an Experience Pattern, not a Core Capability.
- The pre-registration journey may demonstrate value but may not create canonical tenant or Business
  state.
- Workspace remains the tenant boundary.
- Business remains the owner of Business DNA.
- Candidate Business Understanding is temporary and must be explicitly converted.
- Business DNA v1 is first published during authenticated conversion.
- Guided Activation publishes governed revisions, not an ambiguous duplicate first publication.
- Business Report Preview and canonical Business Blueprint are distinct projections.
- Observed Fact, Inference, Business Assessment, Business Need, Recommendation, and Implementation
  Option are distinct knowledge types.
- Recommendation lineage to evidence and original sources is required from the MVP.
- Not every recommendation ends in a NexoraXS product.
- Core Platform and Operating System ownership boundaries remain unchanged.
- Existing Login and Register routes remain available for returning users and conversion.
- Arabic/RTL, English/LTR, accessibility, loading, error, recovery, and success states are required
  from the first frontend implementation.

---

## Golden rule

The customer should never think:

> I am configuring software.

The customer should always feel:

> NexoraXS understands my business, and I am building it with confidence.