# Customer Journey

**Version:** 1.1  
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

## Core Philosophy

Customers should never feel they are configuring software.

Customers should feel they are building and understanding their business.

The platform must demonstrate useful business understanding before asking a new visitor to create an
account.

---

## Journey Overview

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
Publish approved Business DNA
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

The experience asks the minimum useful questions needed to understand the business, for example:

- What does your business do?
- What would you like to improve?
- How do you currently manage sales, projects, inventory, people, or customers?
- What is creating the most friction today?
- What outcomes matter most over the next stage?

The experience must feel like a guided business consultation, not a technical configuration wizard
and not an unbounded chatbot.

The session is temporary, privacy-aware, resumable through an opaque token, and subject to expiration.
It does not create a Workspace, Business, membership, subscription, entitlement, or Operating System.

---

## Phase 3 — Business Mapping

The platform organizes the visitor's answers into a Candidate Business Understanding.

Candidate information may contain:

- raw answers;
- observed facts;
- inferred candidate facts;
- business activities and operating model;
- goals, challenges, and desired outcomes;
- confidence and uncertainty;
- provenance and supporting evidence; and
- questions that still require confirmation.

Candidate Business Understanding is temporary and non-canonical. It is not Business DNA and cannot
authorize actions or configure an Operating System.

---

## Phase 4 — Understanding Reflection

Before producing a report, the platform reflects its material understanding back to the visitor.

The visitor must be able to:

- confirm that the understanding is accurate;
- correct inaccurate or incomplete information;
- distinguish supplied facts from platform inferences; and
- understand where confidence is limited.

The primary responses are conceptually:

```text
Accurate
Needs correction
```

Corrections preserve provenance rather than silently replacing the history of how the understanding
was produced.

---

## Phase 5 — Business Report Preview

The platform presents a useful pre-registration Business Report Preview.

The preview contains, at minimum:

- Business Snapshot;
- Observed Facts;
- Challenges and friction points;
- Desired Outcomes;
- Recommended Capabilities;
- explanation of why each capability may help;
- assumptions, uncertainty, or missing information; and
- a clear invitation to create a Workspace and continue.

The report demonstrates value before registration. It remains a temporary projection and is not the
canonical Business Blueprint, Business DNA, Recommendation lifecycle, entitlement decision, or
implementation commitment.

---

## Phase 6 — Create Workspace Intent and Authentication

After reviewing the report, the visitor chooses to continue.

The preferred conversion sequence is:

```text
Create Workspace Intent
→ Sign Up or Login
→ Verify Identity or Email when required
→ Create or Resolve Workspace
```

Authentication is introduced at the point where the customer asks NexoraXS to preserve and activate
the discovered understanding.

Expired, invalid, or already-consumed Discovery Sessions must have clear recovery behavior.

---

## Phase 7 — Create or Select Business

The authenticated customer creates or selects the Business that will own canonical Business DNA.

The Business establishes the platform business identity and operating context.

OS-specific legal, billing, tax, document, or operational identity remains part of the selected
Operating System setup where that Operating System owns it.

Workspace remains the tenant boundary. Business remains the owner of Business DNA.

---

## Phase 8 — Convert Candidate Business Understanding

The platform displays the candidate understanding in the authenticated Business context and asks the
customer to approve its conversion.

Conversion must:

- preserve raw answers, provenance, corrections, and material confidence;
- avoid asking again for information already confirmed unless it is stale, conflicting, uncertain,
  or required by policy;
- be safe to retry;
- prevent a Discovery Session from being consumed into multiple unintended Businesses; and
- clearly separate candidate information from canonical publication.

Only approved information is published into the selected Business's canonical understanding.

---

## Phase 9 — Publish approved Business DNA

Approved information becomes Business-scoped Business DNA through the governed Core Platform
pipeline.

Business DNA remains software-independent and contains the minimum canonical knowledge required for
analysis and initial recommendations.

Each additional Business owns separate Business DNA and follows its own review and activation state.

---

## Phase 10 — Guided Activation / Business Architect

Business Architect continues after registration as Guided Activation.

It completes missing knowledge, resolves uncertainty, validates material facts, and helps the
customer prepare the Business for platform use.

The experience is conversational, resumable, explainable, and governed. It must preserve:

- raw answers;
- inferred candidate information;
- provenance;
- validation and customer review;
- pause and resume;
- safe failure and recovery; and
- distinctions between temporary, reviewed, and canonical information.

Guided Activation is a Core Platform experience. It does not replace OS-specific setup.

---

## Phase 11 — Canonical Business Blueprint

The main authenticated onboarding outcome is the Business Blueprint.

For product experience purposes:

```text
Business Blueprint =
Business DNA
+ Business Analysis
+ Identified Needs and Risks
+ Recommended Capabilities
+ Suggested Implementation Roadmap
+ Readiness Summary
```

The Business Blueprint is the understandable, visual, customer-facing presentation of the canonical
analysis. It is distinct from the earlier Business Report Preview.

---

## Phase 12 — Governed Recommendations

Business Brain analyzes the selected Business DNA, Knowledge, Rules, Country, Goals, and Business
Stage.

The platform may recommend:

- business improvements;
- capabilities;
- automations;
- dashboards;
- reports; and
- Operating Systems, plans, or Marketplace assets as optional implementation choices.

Every recommendation explains its evidence, rationale, assumptions, alternatives, risk, confidence,
and expected benefit.

Capabilities come before product or plan promotion. The customer remains free to accept, reject,
defer, or continue with access already held.

At this point the Workspace may become Core Workspace Ready. It is not automatically Operating
System Ready.

---

## Phase 13 — Platform Dashboard and Product Hub

Product Hub opens in the context of the selected Business.

An explicitly identified Workspace view may aggregate recommendations across Businesses without
replacing their individual Business DNA.

Only relevant Operating Systems and implementation options are highlighted.

Product Hub does not own Operating System setup or operational data.

---

## Phase 14 — Select Operating System and Plan

The customer may select an Operating System and an available plan.

Commercial prompts must not interrupt Business Discovery unnecessarily. Product and plan selection
must be contextual and supported by the Business understanding and recommendations.

Selection creates the applicable Operating System subscription or installation lifecycle according
to its canonical owner and approved commercial rules.

---

## Phase 15 — OS-Specific Setup

The selected Operating System owns its setup experience.

Setup selects or creates the operational Business Unit inside the Business where applicable, then
collects only the information required by that Operating System and configures its modules,
workflows, permissions, and operational defaults.

When setup, configuration, activation, and readiness requirements are complete, the Operating System
is Operating System Ready.

---

## Phase 16 — Operational Dashboard and Daily Operations

The customer enters the selected Operating System dashboard.

Daily operations begin only after Operating System Ready.

Business Brain may continuously observe permitted usage and improve recommendations without
transferring ownership of Operating System operational data to Core.

---

## Phase 17 — Growth and Marketplace

Business Brain detects growth, risks, expansion, automation opportunities, and new capability needs.

Customers may purchase, install, and activate relevant Marketplace assets.

Knowledge Pack content remains shared and immutable while its activation and applicability remain
scoped to the Workspace and optionally the selected Business.

---

## Customer Feelings

```text
Discover → Curiosity
Business Discovery → Engagement
Understanding Reflection → Recognition
Business Report Preview → Confidence
Registration and Workspace Creation → Commitment
Guided Activation → Understanding
Business Blueprint → Clarity
Recommendations → Trust
Core Workspace Ready → Relief
Operating System Ready → Productivity
Growth → Excitement
Marketplace → Expansion
```

---

## Journey Guardrails

- The pre-registration journey may demonstrate value but may not create canonical tenant or Business
  state.
- Workspace remains the tenant boundary.
- Business remains the owner of Business DNA.
- Candidate Business Understanding is temporary and must be explicitly converted.
- Business Report Preview and canonical Business Blueprint are distinct outputs.
- Core Platform and Operating System ownership boundaries remain unchanged.
- Existing Login and Register routes remain available for returning users and conversion.
- Arabic/RTL, English/LTR, accessibility, loading, error, recovery, and success states are required
  from the first frontend implementation.

---

## Golden Rule

The customer should never think:

> I am configuring software.

The customer should always feel:

> NexoraXS understands my business, and I am building it with confidence.
