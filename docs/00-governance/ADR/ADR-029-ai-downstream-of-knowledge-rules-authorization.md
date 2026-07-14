# ADR-029: AI Is Downstream of Knowledge, Rules, and Authorization

## Status

Accepted

## Context

AI can explain and amplify platform intelligence but is not an authoritative source of business rules or permission.

## Decision

AI operates after Knowledge, deterministic Rules, analytics, Business Brain, and authorization. It receives only permitted context, cites governed evidence, reports confidence and assumptions, and cannot bypass permissions, tenant isolation, customer decisions, or owning-service validation.

## Consequences

- AI output remains explainable and reviewable.
- Model or provider changes do not change source-of-truth ownership.
- Low-confidence results require verification guidance.

## Alternatives Considered

- Use AI as the first or only source of business logic.
- Send unrestricted Workspace or Business data to experts.
- Treat generated output as an authorized command.

## Related Documents

- [Genesis AI Strategy](../01-genesis/08-AI-STRATEGY.md)
- [Approved Proposal — ADR-CP-010](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

