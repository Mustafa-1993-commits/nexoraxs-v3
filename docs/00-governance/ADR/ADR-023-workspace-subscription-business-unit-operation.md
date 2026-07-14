# ADR-023: OS Subscription Is Workspace-Scoped and Operation Is Business Unit-Scoped

## Status

Accepted

## Context

Commercial purchase and operational use have different scopes. Conflating them would make entitlement and readiness unreliable.

## Decision

An OS Subscription belongs to a Workspace and OS. Installation, setup, configuration, activation, and operational access additionally reference the selected Business and operational Business Unit as their lifecycle requires. Entitlement evaluation combines commercial state, operational scope, permissions, and readiness.

## Consequences

- One Workspace subscription may support applicable Business Units subject to Plan limits.
- An active subscription alone does not grant every user or Business Unit operational access.
- The exact successor to legacy `OSEnablement` semantics remains unresolved and is not defined by this ADR.

## Alternatives Considered

- Scope every OS Subscription directly to one Branch or Business Unit.
- Treat Workspace subscription as global operational authorization.
- Collapse subscription and activation into one record.

## Related Documents

- [Genesis Subscription Model](../01-genesis/14-SUBSCRIPTION-MODEL.md)
- [Genesis Operating System Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)
- [Approved Proposal — ADR-CP-008](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)

