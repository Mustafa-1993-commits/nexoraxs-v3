# ADR-030: AI Coordinator Separates Orchestration From Expertise and Execution

## Status

Accepted

## Context

A monolithic AI assistant would obscure authorization, evidence, expert routing, provider boundaries, confidence, and action ownership.

## Decision

AI Coordinator is decomposed into request interpretation, authorization context, context building, policy and safety, Expert Registry and routing, instruction assembly, bounded expert execution, collaboration, evidence validation, response synthesis, confidence and explainability, action proposals, conversation context, and audit. Consequential execution remains with authorized owning services.

## Consequences

- Experts and model providers remain replaceable.
- One unified response can retain evidence and uncertainty.
- AI Action Proposals must pass a separate authorization and execution workflow.

## Alternatives Considered

- Create one opaque assistant with unrestricted tools.
- Let experts execute domain changes directly.
- Combine expert selection, policy, and domain ownership in one model prompt.

## Related Documents

- [Approved Proposal — ADR-CP-020](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- [Wave 1 Architecture](../02-core-platform/02-CORE-PLATFORM-ARCHITECTURE.md)
- [Wave 1 Domain Model](../02-core-platform/03-DOMAIN-MODEL.md)

