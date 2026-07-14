# ADR-016: Business Architect Is a Resumable Governed Pipeline

## Status

Accepted

## Context

A conversational interface alone cannot guarantee structured Business DNA, provenance, validation, readiness, or reliable recovery.

## Decision

Business Architect operates as explicit context resolution, evidence collection, inference, question planning, capture, normalization, provenance, validation, review, publication, analysis, and readiness stages for one selected Business. The pipeline is resumable, idempotent where retried, and separate from published Business DNA.

## Consequences

- Conversation UI and AI providers may change without changing pipeline semantics.
- Raw input, Candidate Facts, inferred facts, and published facts remain distinguishable.
- Each Business has a separate pipeline and DNA publication path.

## Alternatives Considered

- Implement Business Architect as an unstructured chatbot.
- Use a non-resumable fixed wizard.
- Write every answer directly into published Business DNA.

## Related Documents

- [Approved Proposal — ADR-CP-015](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)
- [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

