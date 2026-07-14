# ADR-018: Core Workspace Ready and Operating System Ready Are Separate

## Status

Accepted

## Context

Finishing Business understanding and being ready for daily operations are different outcomes with different owners and requirements.

## Decision

Core Workspace Ready requires Workspace creation, selected Business identity, sufficient reviewed Core Business DNA, and initial Recommendations. It permits Product Hub entry. Operating System Ready additionally requires an eligible subscription, installation, operational Business Unit, OS-specific setup, configuration, activation, and access. It permits the OS Operational Dashboard.

## Consequences

- A generic onboarding-complete flag is prohibited.
- Product Hub can be available before any OS is operational.
- Readiness projections preserve the underlying lifecycle states.

## Alternatives Considered

- Use one readiness or onboarding flag for the entire platform.
- Treat an active subscription as proof of operational readiness.
- Allow daily operation before OS-owned setup and activation complete.

## Related Documents

- [Genesis Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md)
- [Genesis Customer Journey](../01-genesis/11-CUSTOMER-JOURNEY.md)
- [Approved Proposal — ADR-CP-006](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)

