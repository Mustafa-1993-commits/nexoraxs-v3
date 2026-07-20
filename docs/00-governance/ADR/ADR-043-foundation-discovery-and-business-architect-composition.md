# ADR-043: Compose Foundation Discovery With the Governed Business Architect Pipeline

**Version:** 0.1

**Owner:** NexoraXS Architecture Governance

**Authority:** Accepted ADR under the repository ADR lifecycle

**Predecessor relationship:** Explicit relationship record for Accepted ADR-015, ADR-016, and ADR-042; none is edited by this proposal

**Successor relationship:** Accepted relationship decision incorporated into Core Platform Architecture v1.1 Freeze

**Approval state:** Accepted by Foundation Governance Approval v2.0 after Architecture Review v2

## Status

Accepted

## Context

[ADR-015](./ADR-015-infer-before-asking-conversational-configuration.md) requires infer-before-ask
behavior and describes business-understanding and configuration experiences as conversational.
[ADR-016](./ADR-016-business-architect-governed-pipeline.md) requires a resumable, governed pipeline
for one selected Business and places reviewed Business DNA publication inside that pipeline.
[ADR-042](./ADR-042-pre-registration-business-discovery.md) adds method-independent
Pre-Registration Business Discovery, temporary Candidate Business Understanding, authenticated
conversion, first Business DNA v1 publication, and post-publication Guided Activation.

All three ADRs are historically valid, but their relationship was not explicit. The Foundation
successor must also preserve direct Register/Login entry without allowing it to bypass candidate
review, authenticated ownership, explicit approval, or first canonical publication controls.

## Decision

ADR-042 **composes with and narrows ADR-015**, and **extends while partially superseding one
sequencing implication of ADR-016**, as follows.

### ADR-015 relationship

- Infer-before-asking remains fully authoritative for every Discovery and Business Architect
  experience.
- Provenance, confidence, review, correction, and deterministic validation remain mandatory.
- ADR-042 narrows the statement that the experience must always feel like a conversation. Business
  Discovery is method-independent; Guided Business Conversation is Discovery Experience v1 and one
  permitted Knowledge Acquisition Method.
- Conversation remains an approved experience. It is not the durable capability boundary or a
  mandatory interface for every Discovery goal.

ADR-015 is not superseded as a whole.

### ADR-016 relationship

- The authenticated, selected-Business Business Architect pipeline remains governed, resumable,
  retry-safe where applicable, provenance-aware, validated, reviewed, and separate from published
  Business DNA.
- Its context resolution, evidence collection, inference, question planning, capture,
  normalization, provenance, validation, review, analysis, and readiness responsibilities remain.
- ADR-042 extends that architecture with a temporary pre-registration Discovery lifecycle that may
  hand approved candidate knowledge into the authenticated pipeline.
- ADR-042 partially supersedes only the implication that first Business DNA publication must always
  occur at the end of the post-registration Business Architect experience. First publication occurs
  after authenticated Workspace and Business resolution, material candidate review, and explicit
  approval. The retained pipeline may publish later governed Business DNA revisions.
- Guided Activation names the post-first-publication continuation of the retained pipeline. It does
  not replace the pipeline.

ADR-016 is not superseded as a whole.

### Direct-registration compatibility

Pre-registration Discovery is the primary value path, not a mandatory UI prerequisite.

A new customer who enters through direct Register/Login follows this architecture-consistent path:

```text
Register or Login
→ authenticated Workspace resolution or creation
→ authenticated Business resolution or creation
→ authenticated candidate-understanding and review path
→ explicit approval
→ first governed Business DNA v1 publication
→ retained Business Architect pipeline as Guided Activation
```

The authenticated candidate path uses the same method-independent Discovery, Business Mapping,
candidate/canonical separation, provenance, confidence, correction, and review responsibilities. Its
candidate material may be authorization-scoped to the selected Business as the intended conversion
target, but it remains temporary and non-canonical until owner-validated publication.

Direct registration does not:

- create canonical facts from registration data;
- bypass candidate review or explicit approval;
- create a second Business DNA owner;
- begin Guided Activation before first Business DNA publication; or
- require a particular screen, route, API, service, database, token, or persistence mechanism.

Returning customers may enter their existing authorized context without repeating Discovery when
the required canonical understanding already exists.

## Preserved Guarantees

- Workspace remains the customer and tenant boundary.
- Business remains the sole owner context for Business DNA.
- No anonymous Workspace or Business is created.
- Candidate Business Understanding remains temporary, non-canonical, reviewable, correctable, and
  unable to authorize action or configure an Operating System.
- Business DNA remains Business-scoped, versioned, governed, explicitly approved, and
  software-independent.
- Business Brain Decision and Recommendation ownership remain unchanged.
- Business Blueprint remains a governed authenticated projection, never a canonical store.
- Product Hub and Operating System ownership remain unchanged.
- Core Workspace Ready remains distinct from Operating System Ready.

## Backward Compatibility

Existing Register/Login and authenticated onboarding entry remain available. Their internal
architecture is reconciled through the authenticated candidate/review path rather than removed.
Existing Business Architect pipeline responsibilities remain available before and after first
publication; only the first-publication relationship and the name Guided Activation for the
post-publication continuation are clarified.

No existing canonical record, owner, Contract, route, or implementation is replaced by this ADR.
Implementation and migration require separately approved specifications.

## Consequences

- The primary new-customer path may provide value before registration.
- Direct-registration customers receive the same publication safeguards without being forced
  through an anonymous UI experience.
- Business Architect remains one governed pipeline while Guided Activation has an unambiguous
  post-publication boundary.
- Future architecture must distinguish public temporary candidate context from authenticated
  candidate context without promoting either to canonical truth.
- A successor Core Platform Freeze must record this relationship and preserve ADR-015 and ADR-016
  as historical Accepted decisions.

## Alternatives Considered

### Require pre-registration Discovery UI for every new customer

Rejected because ADR-042 preserves Register/Login compatibility and architecture must not mandate a
specific interface.

### Let direct registration bypass candidate review and publish Business DNA from account data

Rejected because authentication and registration data do not prove canonical Business truth.

### Keep first publication only at the end of Guided Activation

Rejected because ADR-042 explicitly places first governed Business DNA v1 publication before Guided
Activation.

### Replace ADR-015 or ADR-016 completely

Rejected because infer-before-ask and the governed selected-Business pipeline remain required and
compatible.

## Authority Relationship

This Accepted ADR does not modify the text or historical status of ADR-015, ADR-016, or ADR-042. It
is the explicit relationship decision used by the Core Platform Foundation successor. Core Platform
Freeze v1.0 remains controlling until a successor Freeze is approved.

## Approval Record

Architecture Review v2 returned **APPROVED**. The Architecture Governance Board accepted this ADR
through [Foundation Governance Approval v2.0](../FOUNDATION-GOVERNANCE-APPROVAL-v2.0.md). The
reviewed decision content is unchanged; only its formal status and approval record were applied.

## Related Documents

- [ADR governance](./README.md)
- [ADR-015](./ADR-015-infer-before-asking-conversational-configuration.md)
- [ADR-016](./ADR-016-business-architect-governed-pipeline.md)
- [ADR-042](./ADR-042-pre-registration-business-discovery.md)
- [Foundation Baseline v0.1](../FOUNDATION-BASELINE-v0.1.md)
- [Governance Disposition v0.1](../CORE-PLATFORM-FOUNDATION-GOVERNANCE-DISPOSITION-v0.1.md)
- [Core Platform Foundation Successor Architecture v0.1](../../02-core-platform/14-CORE-FOUNDATION-SUCCESSOR-ARCHITECTURE-v0.1.md)
- [Core Platform Freeze v1.0](../../99-architecture-freeze/CORE-PLATFORM-v1.0-FREEZE.md)
