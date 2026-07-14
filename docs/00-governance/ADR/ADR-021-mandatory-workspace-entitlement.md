# ADR-021: Every Workspace Has a Mandatory Platform Entitlement

## Status

Accepted

## Context

Customers need Core Platform access to complete Business Architect, Recommendations, and Product Hub before selecting an Operating System.

## Decision

Every Workspace has a mandatory Workspace Entitlement that provides Core Platform access. It exists during onboarding before the first OS is selected. During MVP it is not independently billed and is included with any active OS Subscription.

## Consequences

- Core Platform can support the complete pre-OS journey.
- Workspace Entitlement and OS Subscription remain distinct concepts.
- Future commercial changes require a new approved decision.

## Alternatives Considered

- Require an OS Subscription before Business Architect or Product Hub.
- Treat Core Platform as an optional Marketplace asset.
- Bill the mandatory Workspace Entitlement independently during MVP.

## Related Documents

- [Genesis Customer Journey](../01-genesis/11-CUSTOMER-JOURNEY.md)
- [Genesis Subscription Model](../01-genesis/14-SUBSCRIPTION-MODEL.md)
- [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

