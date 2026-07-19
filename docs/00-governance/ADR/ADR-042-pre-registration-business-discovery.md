# ADR-042: Pre-Registration Business Discovery

## Status

Proposed

## Context

NexoraXS promises to understand a customer's business before recommending software. The previous
primary journey required registration, Workspace creation, and Business creation before the customer
could experience Business Architect or receive a useful business outcome.

That sequence creates a product-experience problem: the visitor must commit before seeing evidence of
the platform's value. Product direction now requires a bounded Business Discovery experience before
registration, followed by a Business Report Preview and an explicit conversion into the canonical
Core Platform context.

The change must preserve the accepted architecture:

- Workspace is the tenant boundary.
- Business owns Business DNA.
- Business DNA is canonical, Business-scoped, and software-independent.
- Recommendations remain explainable, capability-first, and subject to human control.
- Core Platform and Operating Systems remain independent owners.
- Frontend-first delivery does not authorize temporary browser state to become canonical truth.

A pre-registration experience therefore needs a temporary architectural boundary that can collect,
review, and present candidate understanding without silently creating canonical platform state.

## Decision

NexoraXS introduces a **Pre-Registration Business Discovery** lifecycle owned by the Core Platform
experience.

### 1. Anonymous Discovery Session

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

### 2. Candidate Business Understanding

Information produced before registration is modeled conceptually as **Candidate Business
Understanding**.

It may contain:

- raw visitor answers;
- observed candidate facts;
- inferred candidate facts;
- goals, challenges, activities, and desired outcomes;
- evidence and provenance;
- confidence and uncertainty;
- knowledge state;
- visitor corrections; and
- unanswered or conflicting questions.

Candidate Business Understanding is temporary and non-canonical. It is not Business DNA, cannot be
used as an authorization fact, cannot configure an Operating System, and cannot create operational
records.

### 3. Understanding Reflection

Before conversion, material understanding is reflected to the visitor for confirmation or
correction.

The experience must distinguish:

- facts directly supplied by the visitor;
- inferences made by the platform;
- assumptions or uncertainty; and
- recommendations derived from the candidate understanding.

Corrections preserve provenance and do not erase the historical distinction between supplied and
inferred information.

### 4. Business Report Preview

The pre-registration output is a **Business Report Preview**.

The preview may present:

- Business Snapshot;
- Observed Facts;
- Challenges;
- Desired Outcomes;
- Recommended Capabilities;
- explanation and confidence; and
- an invitation to create a Workspace and continue.

The Business Report Preview is a temporary projection. It is not the canonical Business Blueprint,
Business DNA, Recommendation aggregate, commercial entitlement decision, or implementation plan.

### 5. Authenticated Conversion

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
→ Publish approved Business DNA
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

### 6. Guided Activation

Business Architect continues after conversion as **Guided Activation**.

Guided Activation completes missing knowledge, resolves uncertainty, validates material facts,
publishes canonical Business DNA through the existing governed pipeline, and prepares the canonical
Business Blueprint and Recommendations.

Previously confirmed information should not be asked again unless it is stale, conflicting,
materially uncertain, or required by policy.

### 7. Ownership and boundaries

- Core Platform owns the discovery experience, candidate-understanding lifecycle, conversion
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
- Registration becomes a conversion step after trust and clarity are established.
- Candidate information can be reviewed and corrected before canonical publication.
- Existing Workspace, Business, Business DNA, Recommendation, and Operating System boundaries remain
  intact.
- Frontend work can begin with a bounded vertical slice while backend contracts remain deferred.

### Costs and constraints

- The product must support temporary session lifecycle, expiration, recovery, and privacy behavior.
- The UI must clearly distinguish candidate, reviewed, and canonical information.
- Conversion requires idempotency, provenance preservation, and protection against duplicate or
  unintended consumption.
- Business Report Preview and canonical Business Blueprint must remain visibly and semantically
  distinct.
- Future backend implementation will require retention, security, abuse-prevention, observability,
  and deletion policies.

### Compatibility

Existing Login and Register routes remain available. Existing authenticated onboarding is not
removed immediately. The new journey is introduced incrementally, and legacy entry behavior may be
retired only after replacement, migration, and consumer evidence are approved.

## Alternatives Considered

### Require registration before any Business Discovery

Rejected as the primary journey because it asks the visitor to commit before experiencing the
platform's core value. It remains available as a compatibility path for returning users and direct
registration.

### Create a Workspace and Business anonymously

Rejected because it weakens the tenant, identity, membership, retention, and ownership boundaries and
would create canonical-looking state without an accountable owner.

### Write pre-registration answers directly into Business DNA

Rejected because Business DNA is canonical and Business-scoped. Anonymous candidate information must
be reviewed and converted after an authenticated Business context exists.

### Present a generic marketing report without governed candidate understanding

Rejected because it would not preserve evidence, provenance, correction, explainability, or safe
conversion into the canonical onboarding pipeline.

### Replace Business Architect with the pre-registration flow

Rejected. Business Discovery is the early part of the experience; Business Architect continues after
registration as Guided Activation and canonical onboarding.

## Related Documents

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
