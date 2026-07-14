# ADR-014: Humans Retain Authority Over Consequential Decisions

## Status

Accepted

## Context

AI and automation can improve speed but cannot safely replace customer authority, permissions, compliance, or domain ownership.

## Decision

AI recommends and humans decide. Recommendations remain optional. AI cannot approve transactions, change financial records, modify permissions, override compliance or business policy, or execute critical actions without a separately authorized, validated, and auditable action workflow.

## Consequences

- Customer confirmation remains part of material Business DNA, product, configuration, and action decisions.
- Consequential execution belongs to authorized owning services.
- Low-confidence output prompts human verification.

## Alternatives Considered

- Permit autonomous AI authority over critical records.
- Force recommendations or upgrades.
- Treat AI confidence as authorization.

## Related Documents

- [Genesis Constitution](../01-genesis/02-CONSTITUTION.md)
- [Genesis AI Strategy](../01-genesis/08-AI-STRATEGY.md)
- [Approved Proposal — ADR-CP-010](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)

