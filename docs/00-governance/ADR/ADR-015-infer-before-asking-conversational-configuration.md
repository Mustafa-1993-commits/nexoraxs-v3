# ADR-015: Infer Before Asking and Make Configuration Conversational

## Status

Accepted

## Context

Traditional setup asks customers to understand software and complete exhaustive forms. Nexoraxs must minimize unnecessary questions while preserving review and truth.

## Decision

Business understanding and configuration experiences infer reasonable candidate information from authorized context before asking. Questions are limited to information that remains necessary or uncertain. The customer experience feels like a conversation with an experienced business consultant rather than a technical wizard.

## Consequences

- Inference requires provenance, confidence, review, and correction.
- Question order can adapt to the selected Business.
- Simplicity cannot bypass deterministic validation or customer control.

## Alternatives Considered

- Use a fixed exhaustive questionnaire for every Business.
- Require customers to understand modules before describing their Business.
- Accept inferred facts silently without reviewability.

## Related Documents

- [Genesis Constitution](../01-genesis/02-CONSTITUTION.md)
- [Genesis Customer Journey](../01-genesis/11-CUSTOMER-JOURNEY.md)
- [Core Platform Vision](../02-core-platform/01-CORE-PLATFORM-VISION.md)

