# ADR-034: Tenant and Resource Scope Are Explicit in Every Protected Operation

## Status

Accepted

## Context

Authentication identifies an actor but does not prove authority over a Workspace, Business, Business Unit, Branch, OS, or resource.

## Decision

Every protected read, write, event, search, analytics query, navigation decision, and AI context build resolves identity plus the applicable Workspace, Business, Business Unit, Department, Branch, OS, and resource scope. Client-provided identifiers are inputs to authorization, not proof.

## Consequences

- Authorization is evaluated by owning domains as well as boundary controls.
- Context switching and deep links require reauthorization.
- Tenant-isolation and scope tests are platform requirements.

## Alternatives Considered

- Authorize only at login.
- Trust route parameters or UI context selectors.
- Assume Workspace membership grants all Business and OS access.

## Related Documents

- [Genesis AI Strategy](../01-genesis/08-AI-STRATEGY.md)
- [Approved Proposal — ADR-CP-013](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

