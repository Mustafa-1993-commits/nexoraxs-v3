# ADR-042: Pre-Registration Business Discovery

## Status

Accepted

## Decision date

2026-07-19

## Context

NexoraXS promises to understand a customer's business before recommending software. The previous
primary journey required registration, Workspace creation, and Business creation before the customer
could experience Business Architect or receive a useful business outcome.

That sequence asks the visitor to commit before seeing evidence of value. Product direction therefore
requires a bounded Business Discovery lifecycle before registration, followed by a useful Business
Report Preview and an explicit conversion into the canonical Core Platform context.

The change must preserve the accepted architecture:

- Workspace is the tenant boundary.
- Business owns Business DNA.
- Business DNA is canonical, Business-scoped, and software-independent.
- Recommendations remain explainable, capability-first, and subject to human control.
- Core Platform and Operating Systems remain independent owners.
- Frontend-first delivery does not authorize temporary browser state to become canonical truth.
- Business Discovery is a capability and lifecycle, not a synonym for one interaction style.

## Decision

NexoraXS introduces a **Pre-Registration Business Discovery** lifecycle owned by the Core Platform.
The lifecycle is goal-oriented, adaptive, explainable, and independent from any single acquisition
interface.

### 1. Discovery goal and strategy

Every Discovery Session has a current business-understanding goal. The Discovery Strategy determines:

- which Knowledge Domains are relevant to that goal;
- which facts are already known;
- which knowledge gaps remain material;
- the next most valuable missing fact;
- the best available way to acquire it; and
- when enough understanding exists to stop.

The lifecycle acquires only the knowledge necessary to achieve the current goal. It does not collect
all possible business information.

Guided Business Conversation is the initial Discovery Experience pattern. It is not the definition of
Business Discovery. Future acquisition methods may include document import, ERP integration, website
analysis, voice, APIs, or other governed interfaces.

### 2. Anonymous Discovery Session

A visitor may begin a temporary Discovery Session without an authenticated account.

The session:

- is identified by an opaque, non-guessable token;
- contains no Workspace, membership, entitlement, subscription, or Operating System authority;
- is resumable only within its permitted lifecycle;
- expires and becomes unusable according to approved retention policy;
- must be protected against enumeration, replay, unintended sharing, and abuse; and
- must provide explicit recovery for invalid, expired, or already-consumed sessions.

The exact token technology, retention duration, persistence mechanism, and anti-abuse controls remain
implementation decisions until separately approved.

### 3. Candidate Business Understanding

Information produced before registration is modeled as **Candidate Business Understanding**.

It may contain:

- raw visitor input and imported source material;
- Observed Facts;
- Inferences;
- goals, challenges, activities, and desired outcomes;
- evidence and provenance;
- confidence and uncertainty;
- semantic knowledge states;
- visitor corrections; and
- unanswered or conflicting questions.

Candidate Business Understanding is temporary and non-canonical. It is not Business DNA, cannot be
used as an authorization fact, cannot configure an Operating System, and cannot create operational
records.

### 4. Understanding Reflection

Material understanding is reflected to the visitor for confirmation or correction before conversion.

The experience must distinguish:

- facts directly supplied by the visitor or another source;
- inferences made by the platform;
- assessments and assumptions;
- uncertainty or contradictions; and
- recommendations derived from the candidate understanding.

Confirmation is selective and policy-driven. Clear, direct, low-risk facts may update Candidate
Business Understanding without repeated confirmation. Inferred, consequential, conflicting, or
low-confidence information requires explicit review.

Corrections preserve provenance and do not erase the historical distinction between supplied,
inferred, assessed, and corrected information.

### 5. Knowledge-to-advice pipeline

The conceptual responsibility chain is:

```text
Business Understanding Engine
→ Business Insight Engine
→ Recommendation Engine
→ Report Projection
```

The knowledge-to-advice sequence is:

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

These knowledge types are not interchangeable. A Business Assessment is not a direct fact, and a
Recommendation is not a Business Assessment.

The Business Insight Engine is a distinct conceptual responsibility from the Business Understanding
Engine and Recommendation Engine. Physical extraction into a separate service or deployable module is
a future implementation decision.

### 6. Product ethics

NexoraXS follows **Business Benefit Before Product Adoption**:

> NexoraXS exists to improve businesses, not merely to increase product adoption.

Advice must remain credible even when the best advice does not generate a sale.

Therefore:

- not every recommendation ends in a NexoraXS product;
- the platform may recommend a process improvement, an existing tool, additional discovery, or no new
  capability;
- reasonable alternatives must not be hidden solely because they are outside NexoraXS;
- recommendation order must not be determined by NexoraXS commercial return; and
- the experience must disclose when an implementation option is a NexoraXS product.

### 7. Business Report Preview

The pre-registration output is a **Business Report Preview**.

The preview may present:

- Business Understanding Statement;
- Business Snapshot;
- Observed Facts and material Inferences;
- Business Assessments, Needs, and Priorities;
- Desired Outcomes;
- Recommended Capabilities;
- Implementation Options and initial Operating System suggestions where appropriate;
- explanation, evidence, assumptions, and contextual confidence; and
- what the platform still needs to learn.

The preview provides real, usable business insight before registration. Registration unlocks durable
saving, continuation, deeper reasoning, sharing, export, governed activation, and publication of
Business DNA; it does not unlock the first meaningful value.

The Business Report Preview is a temporary projection. It is not the canonical Business Blueprint,
Business DNA, governed Recommendation aggregate, commercial entitlement decision, or implementation
plan.

### 8. Authenticated conversion and Business DNA v1

When the visitor chooses to continue, authentication and Workspace resolution occur before canonical
publication.

The preferred conceptual sequence is:

```text
Discovery Session
→ Business Report Preview
→ Create Workspace Intent
→ Register or Login
→ Verify Identity when required
→ Create or Resolve Workspace
→ Create or Select Business
→ Review Candidate Understanding
→ Publish approved Business DNA v1
→ Guided Activation
```

Conversion:

- targets exactly one authenticated Business context at a time;
- requires explicit customer confirmation of material information;
- preserves provenance, corrections, and material confidence;
- must be idempotent or otherwise safe to retry;
- prevents unintended repeated consumption;
- records whether the session is active, expired, converted, or abandoned; and
- does not transfer tenant ownership to the Discovery Session.

Authenticated conversion publishes the first governed **Business DNA v1** from approved candidate
knowledge. Guided Activation may later publish governed revisions; it does not ambiguously own the
first publication.

### 9. Guided Activation

Business Architect continues after conversion as **Guided Activation**.

Guided Activation completes missing knowledge, resolves uncertainty, validates material facts,
publishes governed revisions to Business DNA, and prepares the canonical Business Blueprint and
Recommendations.

Previously confirmed information should not be asked again unless it is stale, conflicting,
materially uncertain, or required by policy.

### 10. Decision lineage foundation

Decision lineage is required from the MVP even when the complete Decision Traceability UI is deferred.
Recommendations and other derived knowledge must preserve links to the knowledge that produced them.

The conceptual trail is:

```text
Recommendation
→ Recommended Capability
→ Business Need
→ Business Assessment
→ Inference
→ Observed Facts
→ Evidence
→ Original Sources
```

Reverse impact traversal must also be possible from a Source to affected facts, inferences,
assessments, and recommendations.

The minimum lineage foundation records equivalent information to:

- entity type and identifier;
- derived-from type and identifier;
- derivation type;
- rule or model version;
- confidence;
- review status; and
- creation time.

Each recommendation also preserves its version, reasoning snapshot, input knowledge version,
generation time, and generator identity so historical decisions can be explained using the context in
which they were issued.

### 11. Ownership and boundaries

- Core Platform owns the discovery lifecycle, candidate-understanding lifecycle, conversion
  orchestration, Business DNA publication, Business Blueprint, and Recommendations.
- Workspace remains the tenant boundary after authentication.
- Business remains the owner of canonical Business DNA.
- Operating Systems own their setup, operational data, commands, and readiness.
- Pre-registration discovery may recommend capabilities but may not write Operating System data.
- Temporary frontend implementations are compatibility implementations only and are not production
  persistence or authorization.

## Consequences

### Positive

- Visitors experience meaningful value before registration.
- The platform promise is demonstrated through business understanding rather than software setup.
- Registration becomes a save-and-continue conversion step after trust and clarity are established.
- Candidate information can be reviewed and corrected before canonical publication.
- Discovery can evolve beyond conversation without changing its core strategy.
- Knowledge-to-advice responsibilities and decision lineage are preserved from the beginning.
- Existing Workspace, Business, Business DNA, Recommendation, and Operating System boundaries remain
  intact.

### Costs and constraints

- The product must support temporary session lifecycle, expiration, recovery, and privacy behavior.
- The UI must clearly distinguish candidate, reviewed, and canonical information.
- Conversion requires idempotency, provenance preservation, and protection against duplicate or
  unintended consumption.
- Business Report Preview and canonical Business Blueprint must remain visibly and semantically
  distinct.
- Future backend implementation will require retention, security, abuse-prevention, observability,
  deletion, and lineage persistence policies.

### Compatibility

Existing Login and Register routes remain available. Existing authenticated onboarding is not removed
immediately. The new journey is introduced incrementally, and legacy entry behavior may be retired only
after replacement, migration, and consumer evidence are approved.

## Alternatives considered

### Require registration before any Business Discovery

Rejected as the primary journey because it asks the visitor to commit before experiencing the
platform's core value.

### Create a Workspace and Business anonymously

Rejected because it weakens tenant, identity, membership, retention, and ownership boundaries.

### Write pre-registration information directly into Business DNA

Rejected because Business DNA is canonical and Business-scoped. Anonymous candidate information must
be reviewed and converted after an authenticated Business context exists.

### Define Business Discovery as a conversation engine

Rejected because conversation is one acquisition interface and would constrain future import,
integration, voice, document, website, and API experiences.

### Present a generic marketing report without governed candidate understanding

Rejected because it would not preserve evidence, provenance, correction, explainability, lineage, or
safe conversion into the canonical onboarding pipeline.

### Replace Business Architect with the pre-registration flow

Rejected. Business Discovery is the early part of the experience; Business Architect continues after
registration as Guided Activation and canonical onboarding.

## Related documents

- [Product Decision Register](../PRODUCT-DECISIONS.md)
- [Customer Journey](../../01-genesis/11-CUSTOMER-JOURNEY.md)
- [Frontend-First Policy](../../11-execution/05-FRONTEND-FIRST-POLICY.md)
- [ADR-005: Business DNA is Business-scoped and software-independent](./ADR-005-business-dna-business-scoped-software-independent.md)
- [ADR-012: Business Brain decision engine](./ADR-012-business-brain-decision-engine.md)
- [ADR-013: Capability-first explainable recommendations](./ADR-013-capability-first-explainable-recommendations.md)
- [ADR-014: Human control over recommendations and AI](./ADR-014-human-control-over-recommendations-and-ai.md)
- [ADR-015: Infer before asking](./ADR-015-infer-before-asking-conversational-configuration.md)
- [ADR-016: Business Architect governed pipeline](./ADR-016-business-architect-governed-pipeline.md)
- [ADR-024: Independent Operating System domain ownership](./ADR-024-independent-operating-system-domain-ownership.md)
- [ADR-035: Technology-independent compatible contracts](./ADR-035-technology-independent-compatible-contracts.md)
- [ADR-040: Core organization identity and OS operational data](./ADR-040-core-organization-identity-os-operational-data.md)