# Change Log

**Version:** 0.1

**Status:** Active

**Owner:** NexoraXS Product Governance

**Scope:** Governance artifact changes; not implementation or release completion

---

## Purpose

This log records changes to the product-governance baseline without rewriting historical decisions,
Accepted ADRs, Genesis, or Architecture Freezes. Dates are recorded only when an authoritative source
provides them.

## Foundation Baseline v0.1

**Status:** Active — Approved Architecture Snapshot

**Approval scope:** Architecture Sessions 1–4

**Approval date:** Not recorded

**Implementation status:** Not asserted

### Added

- [Foundation Baseline v0.1](./FOUNDATION-BASELINE-v0.1.md), consolidating the approved Sessions 1–4
  product-foundation architecture without superseding Genesis or the Architecture Freezes.
- [Session Decision Register](./SESSION-DECISION-REGISTER.md), recording Sessions 1–4 as Approved and
  Locked with stable local identifiers.
- [RFC Register](./RFC-REGISTER.md), registering deferred architecture questions without opening an
  RFC or starting Session 5.
- Foundation Domain Lexicon entries in the
  [Canonical Glossary](./glossary/GLOSSARY.md) using the approved canonical-name governance model.

### Updated

- [Product Constitution](../01-genesis/02-CONSTITUTION.md) to separate durable Doctrine, Laws, and
  Principles and to clarify that Business Discovery is method-independent. The v1.1 amendment
  crosswalk now records the original and replacement wording for Principles 1, 11, 16, and 19,
  including the material supersession of Principle 11 under PD-012 and ADR-042, and records the
  addition of Doctrine and Product Laws.
- Canonical glossary governance to distinguish the full Foundation Domain Lexicon from the broader
  retained architecture glossary. Duplicate compact definitions for Workspace, Business, Business
  DNA, Business Architect, Capability, Recommendation, Recommendation Engine, Implementation Option,
  Product Hub, Operating System, OS-Specific Setup, Core Workspace Ready, and Operating System Ready
  were consolidated into their complete canonical Domain entries; compact locations retain explicit
  provenance references only.
- Foundation Domain Lexicon lifecycle and state fields to retain only exact states enumerated by an
  Accepted ADR or Genesis source. Unsupported state machines were removed and deferred to an
  approved UX or owning-domain specification without opening new RFCs.
- Business Blueprint terminology to state consistently that it is a governed authenticated
  customer-facing projection of Business DNA and governed owner outputs, never the canonical data
  store.

### Decisions consolidated

- value before registration;
- Business Discovery as a goal-driven Capability rather than a conversation;
- plural Knowledge Acquisition Methods with Guided Business Conversation as Experience v1;
- Candidate Business Understanding as temporary, pre-canonical, provenance-aware, confidence-aware,
  reviewable, and correctable;
- authenticated conversion and publication of approved Business DNA v1;
- Guided Activation after registration without replacing OS-Specific Setup;
- conceptual separation of Business Understanding, Business Insight, Recommendation, and Report
  Projection responsibilities;
- separation of Observed Fact, Inference, Business Assessment, Business Need, Desired Outcome, and
  Recommendation;
- the Product Ethics Law and business benefit before product adoption;
- Decision Lineage from Recommendation to Original Source, required from MVP;
- distinction between Decision Lineage and Explainability;
- minimum Recommendation version evidence; and
- governance of canonical names, immutable identifiers, replacement metadata, and historical
  integrity.

### Deferred without resolution

- physical extraction of Business Insight Engine;
- full Decision Traceability UI;
- Discovery Session retention duration;
- Candidate conversion token implementation;
- backend persistence contracts;
- Knowledge Acquisition integrations;
- Recommendation review workflow;
- cross-Business Workspace aggregation rules;
- Business DNA revision and rollback policy;
- Explainability presentation policy; and
- Recommendation lifecycle and invalidation policy.

### Explicit non-effects

- No application, package, test, CI, build, dependency, configuration, or runtime behavior changed.
- No backend contract, endpoint, DTO, schema, persistence model, event, or token mechanism was
  introduced.
- No Accepted ADR or Architecture Freeze was modified.
- No implementation completion is claimed.
- Session 5 and Feature 056 were not started.
