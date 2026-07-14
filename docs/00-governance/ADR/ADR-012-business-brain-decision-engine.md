# ADR-012: Business Brain Is the Platform Decision Engine

## Status

Accepted

## Context

Nexoraxs needs a shared component that interprets each Business using Business DNA and Knowledge without duplicating either source or owning software.

## Decision

Business Brain is the platform decision engine. It consumes Business-scoped Business DNA, explicit Workspace aggregation when requested, Knowledge, Rules, analytics, goals, country, stage, and subscription context. It produces decisions, recommendations, configuration inputs, health, growth, and risk insights. It owns neither Knowledge nor Operating System software.

## Consequences

- Business decisions use shared governed inputs.
- OSs and AI consume Business Brain outcomes instead of creating competing intelligence.
- Decision records require explainability, traceability, configurability, auditability, and business rationale.

## Alternatives Considered

- Place a separate Business Brain in every OS.
- Let Business Brain store duplicated Knowledge.
- Make Business Brain directly own and execute OS workflows.

## Related Documents

- [Genesis Business Brain](../01-genesis/06-BUSINESS-BRAIN.md)
- [Genesis Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md)
- [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)

