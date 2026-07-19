# RFC Register

**Version:** 0.1

**Status:** Active Register — No Foundation RFC Open

**Owner:** NexoraXS Product Governance

---

## 1. Purpose

This register names architectural questions deliberately deferred beyond Foundation Baseline v0.1.
It prevents unresolved work from being answered silently in implementation or lower-authority
documentation.

An entry records a future RFC topic; it is not an RFC, an approved decision, a feature, or permission
to implement. Session 5 has not started.

## 2. Identifier and status rules

- RFC identifiers use `RFC-NNN` and are permanent.
- The next RFC uses the highest assigned number plus one.
- An identifier is never reused, including after rejection or supersession.
- **Registered — Deferred** means the topic is known but no RFC is open.
- **Open** means a scoped RFC has entered approved review.
- **Accepted**, **Rejected**, or **Superseded** may be recorded only after the applicable governance
  decision.
- Opening an RFC requires a separate document and does not by itself authorize implementation.

Repository search found no pre-existing `RFC-NNN` identifiers before this register; numbering begins
at RFC-001.

## 3. RFC summary

| ID | Title | Status | Trigger for opening | Scope boundary |
|---|---|---|---|---|
| RFC-001 | Physical Extraction of Business Insight Engine | Registered — Deferred | Measured ownership, scaling, release, security, or operational evidence requires physical separation | Physical boundary only; conceptual separation is already approved |
| RFC-002 | Full Decision Traceability UI | Registered — Deferred | Lineage foundation exists and customer/reviewer traceability needs are validated | Presentation and navigation; does not defer lineage capture |
| RFC-003 | Discovery Session Retention Duration | Registered — Deferred | Production privacy, legal, security, recovery, and abuse requirements are ready for approval | Duration, expiry, deletion, recovery; no persistence schema |
| RFC-004 | Candidate Conversion Token Implementation | Registered — Deferred | Authenticated conversion enters backend design | Token properties and consumption policy; no token technology selected here |
| RFC-005 | Backend Persistence Contracts | Registered — Deferred | A frontend slice passes UI maturity and backend integration entry gates | Technology-independent ownership and compatibility; no schema in this register |
| RFC-006 | Knowledge Acquisition Integrations | Registered — Deferred | A method beyond Guided Business Conversation is product-prioritized | Integration eligibility and governance; Business Discovery remains method-independent |
| RFC-007 | Recommendation Review Workflow | Registered — Deferred | Governed Recommendation review requires lifecycle detail | Review authority and disposition; no UI or persistence design |
| RFC-008 | Cross-Business Workspace Aggregation Rules | Registered — Deferred | Workspace-level intelligence becomes a prioritized customer need | Explicit aggregation only; individual Business DNA remains canonical |
| RFC-009 | Business DNA Revision and Rollback Policy | Registered — Deferred | Revision management or rollback becomes required beyond initial publication | Governance of revisions; no database or implementation mechanism |
| RFC-010 | Explainability Presentation Policy | Registered — Deferred | Customer and reviewer explanation surfaces enter design | Presentation policy; Decision Lineage remains separately mandatory |
| RFC-011 | Recommendation Lifecycle and Invalidation Policy | Registered — Deferred | Recommendation freshness, supersession, or invalidation is required for an approved slice | Lifecycle semantics; no implementation state machine |

## 4. Registered topics

### RFC-001 — Physical Extraction of Business Insight Engine

- **Status:** Registered — Deferred
- **Reason deferred:** Conceptual separation is sufficient for the approved foundation. No measured
  evidence justifies a physical service or module boundary.
- **Trigger for opening:** Demonstrated scaling, security, ownership, release, failure-isolation, or
  operational need that cannot be satisfied within the current modular boundary.
- **Related approved decisions:** S03-D01; S03-D03; PD-017; ADR-033; ADR-042
- **Scope boundary:** May evaluate package, module, service, contract, and migration boundaries. It
  must not redefine the approved knowledge types or transfer unrelated Core ownership.

### RFC-002 — Full Decision Traceability UI

- **Status:** Registered — Deferred
- **Reason deferred:** Decision Lineage is mandatory from MVP, but the complete customer/reviewer UI
  has not been approved.
- **Trigger for opening:** The lineage foundation exists and validated use cases identify the
  required audiences, detail levels, navigation, accessibility, and disclosure behavior.
- **Related approved decisions:** S04-D01; S04-D02; PD-017; ADR-042
- **Scope boundary:** UI and presentation only. It cannot weaken lineage capture or change canonical
  ownership.

### RFC-003 — Discovery Session Retention Duration

- **Status:** Registered — Deferred
- **Reason deferred:** Privacy, legal, security, abuse-prevention, recovery, and product-continuity
  requirements have not established an approved duration.
- **Trigger for opening:** Production discovery retention must be selected and accountable Privacy,
  Security, Product, and Operations owners are available.
- **Related approved decisions:** S01-D01; S02-D01; PD-012; ADR-042
- **Scope boundary:** Retention, expiration, deletion, invalid-session recovery, and evidence needs.
  It does not approve a persistence mechanism.

### RFC-004 — Candidate Conversion Token Implementation

- **Status:** Registered — Deferred
- **Reason deferred:** Sessions 1–4 approve safe authenticated conversion but intentionally leave the
  token technology and persistence mechanism undecided.
- **Trigger for opening:** A mature frontend conversion slice enters backend contract design.
- **Related approved decisions:** S02-D04; PD-015; ADR-042
- **Scope boundary:** Opaqueness, expiry, replay protection, single-consumption semantics, retry,
  recovery, and correlation. It cannot create anonymous Workspace or Business authority.

### RFC-005 — Backend Persistence Contracts

- **Status:** Registered — Deferred
- **Reason deferred:** Frontend First remains the active delivery policy; approved product concepts
  do not imply backend DTOs, schemas, endpoints, or storage.
- **Trigger for opening:** The applicable vertical slice passes frontend maturity and UI Freeze gates.
- **Related approved decisions:** PD-001; PD-006; PD-008; ADR-035; ADR-042
- **Scope boundary:** Technology-independent owner and consumer contracts, compatibility, migration,
  privacy, and authorization. Database and framework detail require their own approved design.

### RFC-006 — Knowledge Acquisition Integrations

- **Status:** Registered — Deferred
- **Reason deferred:** Guided Business Conversation is Discovery Experience v1; no additional method
  is yet prioritized for implementation.
- **Trigger for opening:** A validated need selects document, website, voice, ERP, system, or external
  integration acquisition for a bounded slice.
- **Related approved decisions:** S01-D02–S01-D05; PD-012; ADR-042
- **Scope boundary:** Method eligibility, source trust, consent, provenance, error handling, and
  correction. It cannot redefine Business Discovery.

### RFC-007 — Recommendation Review Workflow

- **Status:** Registered — Deferred
- **Reason deferred:** The foundation requires optional, explainable, governed Recommendations but
  does not approve the complete review and disposition workflow.
- **Trigger for opening:** A Recommendation review surface enters approved product scope.
- **Related approved decisions:** S03-D04; S04-D03; PD-017; PD-018; ADR-013; ADR-014
- **Scope boundary:** Reviewer roles, review status, correction, acceptance, rejection, and Audit
  obligations. It cannot grant execution authority to a Recommendation.

### RFC-008 — Cross-Business Workspace Aggregation Rules

- **Status:** Registered — Deferred
- **Reason deferred:** Explicit aggregation is approved, but selection, completeness, comparison,
  permission, and presentation rules remain unresolved.
- **Trigger for opening:** A Workspace-level multi-Business insight use case is prioritized.
- **Related approved decisions:** ADR-003; ADR-005; ADR-006; ADR-034
- **Scope boundary:** Explicit authorized aggregation over selected Businesses. It cannot create
  Workspace DNA or merge individual Business DNA.

### RFC-009 — Business DNA Revision and Rollback Policy

- **Status:** Registered — Deferred
- **Reason deferred:** Sessions 1–4 approve Business DNA v1 publication and governed revisions, but
  not complete revision approval, supersession, correction, or rollback semantics.
- **Trigger for opening:** Guided Activation or another approved flow needs revision comparison,
  correction, rollback, or historical restoration.
- **Related approved decisions:** S02-D04; S02-D05; ADR-005; ADR-016; ADR-042
- **Scope boundary:** Revision governance and customer authority. Business DNA remains one
  Business-scoped identity and software-independent.

### RFC-010 — Explainability Presentation Policy

- **Status:** Registered — Deferred
- **Reason deferred:** Explainability is mandatory, but audience-specific detail, progressive
  disclosure, uncertainty presentation, and accessibility policy are not yet approved.
- **Trigger for opening:** Business Report Preview, Business Blueprint, or Recommendation explanation
  surfaces need a shared presentation policy.
- **Related approved decisions:** S03-D02; S04-D02; ADR-013; ADR-042
- **Scope boundary:** Customer and reviewer presentation. It cannot alter the underlying lineage,
  evidence, confidence, or knowledge-type distinctions.

### RFC-011 — Recommendation Lifecycle and Invalidation Policy

- **Status:** Registered — Deferred
- **Reason deferred:** Genesis defines a high-level Recommendation lifecycle, while exact version
  currency, supersession, staleness, invalidation, regeneration, and historical visibility remain
  unresolved.
- **Trigger for opening:** An approved Recommendation slice requires freshness or lifecycle behavior.
- **Related approved decisions:** S04-D03; PD-017; ADR-013; ADR-038; ADR-042
- **Scope boundary:** Lifecycle semantics and governance. It cannot make Recommendations mandatory or
  allow them to execute target-domain changes.

## 5. Change control

New entries receive the next unused identifier. Status changes require the applicable review evidence
and are recorded in the [Change Log](./CHANGELOG.md). A registered topic may not be
silently answered by a feature specification, implementation, framework default, or lower-authority
document.

## 6. References

- [Foundation Baseline v0.1](./FOUNDATION-BASELINE-v0.1.md)
- [Session Decision Register](./SESSION-DECISION-REGISTER.md)
- [Product Decision Register](./PRODUCT-DECISIONS.md)
- [ADR-042](./ADR/ADR-042-pre-registration-business-discovery.md)
- [Core Platform Freeze deferred decisions](../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md#4-deferred-decisions)
- [Business Brain Freeze deferred decisions](../99-architecture-freeze/BUSINESS-BRAIN-FREEZE-v1.0.md#13-deferred-decisions)
