# ADR-013: Recommendations Are Capability-First, Explainable, and Optional

## Status

Accepted

## Context

Software-first or opaque recommendations would contradict the platform promise and reduce customer trust.

## Decision

Every Recommendation identifies a business improvement and Capability need before mapping an Operating System, Plan, or Marketplace Asset as an Implementation Option. It explains reason, problem, expected benefit, risks, assumptions, alternatives, confidence, evidence, and the consequence of ignoring it. Customers may accept or reject it.

## Consequences

- Product cards and upgrades require a business reason.
- Recommendation records remain separate from Business DNA.
- Customer disposition can inform approved learning without forcing a decision.

## Alternatives Considered

- Recommend products or plans without a prior business need.
- Hide evidence or reasoning behind an AI score.
- Apply every recommendation automatically.

## Related Documents

- [Genesis Recommendation Engine](../01-genesis/07-RECOMMENDATION-ENGINE.md)
- [Genesis Product Hub](../01-genesis/13-PRODUCT-HUB.md)
- [Approved Proposal — ADR-CP-005](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)

