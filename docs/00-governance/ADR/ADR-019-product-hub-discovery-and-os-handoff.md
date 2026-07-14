# ADR-019: Product Hub Owns Discovery and Handoff, Not OS Setup

## Status

Accepted

## Context

Customers need one intelligent place to understand what their Business should do next, while each OS must retain its setup and domain ownership.

## Decision

Product Hub operates in selected Business context, presents explainable Recommendations and eligible Implementation Options, supports OS and Plan selection, coordinates platform-side subscription and installation, shows lifecycle state, and routes through a governed handoff to OS-specific setup. Product Hub never owns OS setup or domain logic.

## Consequences

- Product Hub behaves as a business advisor rather than a static application catalog.
- The selected OS owns Business Unit selection or creation and domain setup.
- Core needs stable setup-handoff and readiness contracts.

## Alternatives Considered

- Move OS-specific setup into Core or Product Hub.
- Display every product without Business-context prioritization.
- Make users discover systems without recommendations.

## Related Documents

- [Genesis Product Hub](../01-genesis/13-PRODUCT-HUB.md)
- [Genesis Operating System Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)
- [Approved Proposal — ADR-CP-007](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)

