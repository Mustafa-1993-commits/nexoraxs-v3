# ADR-033: Begin With an Enforced Modular Monolith

## Status

Accepted

## Context

Core requires clear bounded contexts and potential future extraction, but premature distributed deployment would add operational complexity without proven value.

## Decision

Core Platform begins as a modular monolith with enforced dependency direction, module contracts, isolated data access, and contract tests. Physical extraction occurs only for demonstrated scaling, security, release, or ownership needs and must preserve the same boundaries.

## Consequences

- Logical boundaries are required immediately.
- Co-deployment does not permit arbitrary cross-module table access.
- Marketplace or other modules may be extracted later without an architecture redesign.

## Alternatives Considered

- Deploy every component as a microservice immediately.
- Use an unstructured monolith with shared ownership.
- Let deployment topology define domain boundaries.

## Related Documents

- [Approved Proposal — ADR-CP-011](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

