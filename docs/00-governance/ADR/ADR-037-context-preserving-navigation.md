# ADR-037: Navigation Preserves Explicit Context and Route Ownership

## Status

Accepted

## Context

A unified platform journey crosses Core, Marketplace, OS setup, and OS operational applications. Silent context changes or one global menu would hide ownership and create authorization risk.

## Decision

Core owns navigation through authentication, Workspace and Business context, Business Architect, Product Hub, and Core governance. Marketplace owns its governed surface, and each OS owns setup and operational navigation. Context switches and deep links reauthorize. Cross-application movement uses signed, short-lived handoffs and route guards.

## Consequences

- Workspace and selected Business context remain visible where material.
- Business Unit and Branch context appear when operational scope requires them.
- Failed guards route to an explainable recovery state.
- Localization and RTL/LTR behavior are shared navigation requirements.

## Alternatives Considered

- Use one hardcoded global menu for every product.
- Place permanent authorization or sensitive context in URLs.
- Let an OS reproduce Core governance screens.

## Related Documents

- [Approved Proposal — ADR-CP-019](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

