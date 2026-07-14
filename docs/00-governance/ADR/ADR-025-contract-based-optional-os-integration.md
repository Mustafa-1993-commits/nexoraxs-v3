# ADR-025: Operating System Integration Is Optional and Contract-Based

## Status

Accepted

## Context

Systems may create more value together, but direct or mandatory coupling would violate OS independence and tenant-safe ownership.

## Decision

Operating Systems and Core integrate through versioned platform APIs, events, and authorized contracts, never direct cross-OS database dependencies. Cross-OS integrations are optional. No OS may require another OS for its core workflow.

## Consequences

- Every integration declares ownership, scope, permissions, compatibility, and failure behavior.
- Source domains retain canonical data ownership.
- Consumers tolerate the absence, pause, or removal of another OS.

## Alternatives Considered

- Use shared mutable domain tables.
- Make integrations mandatory to unlock basic functionality.
- Let one OS call another's internal implementation or database.

## Related Documents

- [Genesis Constitution](../01-genesis/02-CONSTITUTION.md)
- [Genesis Operating System Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)
- [Approved Proposal — ADR-CP-009](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)

