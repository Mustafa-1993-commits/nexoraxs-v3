# Architecture Decision Records

## Purpose

This repository preserves the approved architectural decisions that govern Nexoraxs.

An Architecture Decision Record (ADR) captures one durable decision, the context that required it, the selected direction, its consequences, rejected alternatives, and authoritative source documents. ADRs make architecture reviewable without requiring readers to reconstruct decisions from multiple foundation documents.

Genesis v1.1 remains the ultimate authority. The approved Core Platform Architecture Proposal v0.2 and approved Core Platform Wave 1 expand Genesis within their stated boundaries. ADRs record those approved decisions; they do not amend, reinterpret, or supersede their sources.

## ADR Lifecycle

```text
Proposed
  ├── Accepted
  └── Rejected

Accepted
  ├── Deprecated
  └── Superseded by a later Accepted ADR
```

- A new decision begins as **Proposed** during review.
- It becomes **Accepted** only through the project's architecture approval process.
- A proposal that is not selected becomes **Rejected** and remains in the repository as decision history.
- An accepted decision that is no longer recommended but has no direct replacement becomes **Deprecated**.
- An accepted decision replaced by another accepted decision becomes **Superseded** and links to its successor.
- Accepted ADR content is historical. Clarifying editorial corrections may not change the decision. A material change requires a new ADR.

The ADRs extracted in this foundation are **Accepted** because their decisions are already approved by Genesis v1.1, the approved Core Platform Architecture Proposal v0.2, or Core Platform Wave 1.

## ADR Numbering Rules

- ADR numbers use three digits: `ADR-001`, `ADR-002`, and so on.
- Numbers are assigned sequentially across the repository.
- A number is permanent and is never reused, even when its ADR is rejected, deprecated, or superseded.
- File names use `ADR-NNN-<short-name>.md`.
- `<short-name>` uses lowercase kebab-case and describes the decision without changing canonical terminology.
- Numbering does not encode milestone, domain, priority, or status.
- The next ADR uses the highest existing number plus one.
- One ADR records one principal architectural decision. Closely related consequences remain in that ADR; an independently changeable decision receives its own number.

## ADR Status Values

The permitted status values are:

- **Proposed** — under architecture review and not authoritative.
- **Accepted** — approved and authoritative within its source hierarchy.
- **Rejected** — reviewed but not approved.
- **Deprecated** — retained for history but no longer recommended.
- **Superseded** — replaced by a later accepted ADR, which must be linked.

No additional status synonym may be introduced without an approved governance change.

## Review Workflow

1. Confirm the question is architectural and cannot be handled as an implementation detail.
2. Read Genesis and every approved document that owns the affected boundary.
3. Search existing ADRs to avoid duplication or conflict.
4. Draft one ADR with status **Proposed** using the repository format.
5. State context, decision, consequences, alternatives, and source relationships without silently expanding scope.
6. Review for Genesis conformance, canonical terminology, ownership, tenant scope, OS independence, versioning, explainability, and future compatibility.
7. Identify affected ADRs and documents.
8. Obtain explicit architecture approval.
9. Change the status to **Accepted** or **Rejected**.
10. If accepted, update affected documentation through the authorized workflow. Never rewrite an older accepted ADR to conceal the change.

If a proposed decision conflicts with Genesis, work stops until Genesis is changed through its own approved process. If it conflicts with an accepted ADR, the new ADR must explicitly supersede that ADR after approval.

## How Future ADRs Are Added

1. Determine the next unused number from this folder.
2. Copy the required structure:

   ```markdown
   # ADR-NNN: Title

   ## Status

   Proposed

   ## Context

   ## Decision

   ## Consequences

   ## Alternatives Considered

   ## Related Documents
   ```

3. Use only canonical terms from the approved glossary.
4. Link all affected Genesis, proposal, milestone, and earlier ADR documents.
5. Keep the ADR **Proposed** until explicit approval.
6. Add it in numeric order and never renumber existing records.
7. When superseding a decision, mark the old ADR **Superseded** and add reciprocal links in both ADRs.

## Repository Rules

- ADRs do not replace Genesis or milestone architecture documentation.
- ADRs may not resolve an approved open question without a new review and acceptance decision.
- ADRs may not introduce synonyms or redefine ontology.
- An implementation choice becomes an ADR only when it constrains architecture or future implementations materially.
- Rejected and superseded ADRs remain available as historical evidence.

## Current Decision Set

This foundation contains ADR-001 through ADR-040. It includes the twenty approved decisions from the Core Platform proposal and distinct permanent decisions already established by Genesis and Wave 1.

## Authoritative Sources

- [Genesis v1.1](../01-genesis/)
- [Approved Core Platform Architecture Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Core Platform Wave 1](../02-core-platform/README.md)
