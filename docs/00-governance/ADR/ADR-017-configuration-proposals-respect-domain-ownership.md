# ADR-017: Configuration Is Proposed Across Domain Boundaries

## Status

Accepted

## Context

Business Brain must help configure software, but Core cannot safely own or silently mutate an Operating System's domain state.

## Decision

Configuration Engine emits versioned, traceable Configuration Proposals derived from accepted Recommendations. The owning target validates and applies its configuration idempotently under approved automatic or customer-review policy. An OS owns its domain configuration application.

## Consequences

- Configuration retains source Recommendation, Knowledge and Rule versions, scope, compatibility, status, and audit data.
- Core coordination does not transfer OS domain ownership.
- Automatic application boundaries require later approved policy.

## Alternatives Considered

- Let Core write directly into OS domain tables.
- Allow AI to apply configuration without owning-service validation.
- Store configuration inside Business DNA.

## Related Documents

- [Genesis Business Brain](../01-genesis/06-BUSINESS-BRAIN.md)
- [Approved Proposal — ADR-CP-012](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

