# Business Brain Domain Model

Version: 1.0  
Status: Wave 1 — Approved Proposal Expansion  
Milestone: Business Brain  
Architecture baseline: Core Platform v1.0  
Documentation baseline: Core Platform v1.0.1  
Proposal baseline: Business Brain Proposal v0.1 + Freeze Alignment Patch v0.1.1  
Owner: Nexoraxs

---

## 1. Purpose

This document defines the logical Business Brain Domain Model approved for Wave 1.

It identifies the canonical Business Brain entity, aggregate, nested domain concepts, candidate value objects, external references, relationships, invariants, and history rules. It does not define database schemas, field types, persistence mapping, API payloads, Event payloads, or implementation technology.

## 2. Scope

This document covers:

- Business Brain Decision as the canonical entity and aggregate root;
- Decision scope and exact input references;
- Business analysis, Capability, health, growth, risk, and explanation content;
- Decision-owned recommendation candidate and configuration input content;
- Decision history and supersession;
- value-object candidates;
- references to external canonical entities;
- canonical and non-canonical model boundaries; and
- unresolved domain decisions.

It does not create additional aggregates for evaluation operations, insights, candidates, learning, AI, Recommendations, Configuration Proposals, Product Hub, Marketplace, or Operating Systems.

## 3. Domain Principles

1. One canonical Business Brain entity: Business Brain Decision.
2. One canonical Business Brain aggregate: Business Brain Decision aggregate.
3. One Business is the default Decision scope.
4. Workspace aggregation is explicit and preserves constituent Businesses.
5. Source facts remain external references.
6. Derived reasoning is distinguishable from source facts.
7. Completed Decisions are immutable.
8. Reanalysis creates a new Decision.
9. Insight content remains within the Decision aggregate for this milestone.
10. Recommendation candidate is not a Recommendation.
11. Configuration input is not a Configuration Proposal.
12. AI output is never part of the Decision aggregate.
13. Read models do not become entities or aggregates.
14. Physical storage and operational evaluation state remain deferred.

## 4. Domain Context

```text
Workspace
  └── Business
      └── published Business DNA Snapshot
            + applicable Knowledge and Knowledge Pack versions
            + deterministic Rule outcomes
            + Capability definitions
            + approved analytics and context
                              ↓
                  Business Brain Decision
                    ├── Business analysis
                    ├── Capability reasoning
                    ├── Health insight
                    ├── Growth insight
                    ├── Risk insight
                    ├── Explanation
                    ├── Recommendation candidate content
                    └── Configuration input content

Completed Business Brain Decision
  └── may be consumed downstream by AI Coordinator
      without AI content entering the Decision
```

## 5. Canonical Entity

### 5.1 Business Brain Decision

Business Brain Decision is the only canonical Business Brain entity introduced by the approved Proposal baseline.

It represents completed, governed reasoning for:

- one Business; or
- an explicit authorized Workspace Intelligence Aggregation that identifies every included Business and Business DNA version.

A Business Brain Decision has stable identity and history across time. It is version-pinned, immutable after completion, and separate from every source fact and downstream artifact.

### 5.2 Entity identity

The entity requires, conceptually:

- stable Decision identity;
- Decision version or equivalent historical identity;
- one Workspace reference;
- one Business reference by default, or explicit aggregation scope;
- analysis purpose;
- source input manifest;
- correlation and causation context; and
- prior Decision reference when superseding earlier reasoning.

Exact identifier format, version syntax, field names, and uniqueness mechanism remain deferred.

### 5.3 Entity non-equivalence

Business Brain Decision is not equivalent to:

- Business DNA Snapshot;
- Rule outcome;
- Recommendation;
- Recommendation candidate;
- Implementation Option;
- Configuration input;
- Configuration Proposal;
- Readiness Assessment;
- Product Hub projection;
- Marketplace Asset or state;
- AI Interaction or AI Action Proposal;
- OS operational record; or
- Audit Record.

## 6. Aggregate Model

### 6.1 Aggregate root

**Aggregate root:** Business Brain Decision

The aggregate is the consistency boundary for completed Business Brain reasoning. It validates scope, exact source references, required reasoning contributions, explanation, history, and candidate-output relationships before completion.

### 6.2 Aggregate composition

```text
Business Brain Decision
├── Decision Scope
├── Analysis Purpose
├── Input Manifest
│   └── Source References
├── Business Analysis Contribution
├── Capability Selection Reasoning
├── Health Insight, when applicable
├── Growth Insight, when applicable
├── Risk Insight, when applicable
├── Decision Explanation
│   ├── Evidence References
│   ├── Confidence
│   ├── Assumptions
│   ├── Alternatives
│   ├── Conflicts
│   └── Uncertainty
├── Recommendation Candidate Content, when produced
├── Configuration Input Content, when produced
├── Supersession Reference, when applicable
└── Governance Context
```

This is a logical composition. It does not prescribe documents, tables, columns, nested storage, transactions, or serialized shape.

### 6.3 Aggregate ownership

| Aggregate concern | Logical component responsible | Canonical domain owner |
|---|---|---|
| Base analysis content | Business Analyzer | Business Brain |
| Capability reasoning | Capability Selector | Business Brain |
| Health insight content | Health Analyzer | Business Brain |
| Growth insight content | Growth Advisor | Business Brain |
| Risk insight content | Risk Analyzer | Business Brain |
| Input manifest, validation, explanation, identity, history, completion | Decision Orchestrator | Business Brain |
| Recommendation candidate content | Recommendation Candidate Builder | Business Brain until downstream contract acceptance |
| Configuration input content | Configuration Input Builder | Business Brain as non-executing input |

The logical component responsible for a section does not become an independent aggregate owner.

### 6.4 Aggregate invariants

1. A completed Decision has exactly one Workspace.
2. A Business-scoped Decision has exactly one Business.
3. An aggregation Decision explicitly identifies included Businesses and their source Business DNA versions.
4. Aggregation never creates or mutates Business DNA.
5. Required source references are present and owner-identifiable.
6. Versioned inputs retain the exact version used.
7. Derived reasoning is separate from source references.
8. Required analysis contributions for the approved purpose are present.
9. Missing optional insight is distinguishable from a successful empty insight.
10. Conflicts and uncertainty are not silently discarded.
11. Explanation contains the applicable rationale, evidence, assumptions, alternatives, risks, and confidence.
12. Capability reasoning precedes any software-related downstream mapping.
13. Recommendation candidate cannot become a Recommendation inside this aggregate.
14. Configuration input cannot become a Configuration Proposal or target mutation inside this aggregate.
15. Completed Decision contains no AI-generated or AI-assisted content.
16. Completed Decision is immutable.
17. Reanalysis creates a new aggregate instance.
18. Supersession preserves rather than deletes prior history.
19. Decision has no customer disposition or execution authority.
20. Decision completion and material access are auditable through Audit Service.

## 7. Candidate Nested Domain Concepts

The following concepts are part of the approved logical composition. Their final entity-versus-value-object classification and physical representation remain deferred unless explicitly stated.

### 7.1 Business Analysis Contribution

Captures interpreted needs, conditions, gaps, assumptions, conflicts, uncertainty, and source references produced by Business Analyzer.

It is Decision-owned reasoning, not a Business fact or independent aggregate.

### 7.2 Capability Selection Reasoning

Captures candidate Capability references and rationale.

It never owns Capability identity, definition, dependency, applicability, or lifecycle.

### 7.3 Health Insight

Captures health reasoning, evidence, confidence, assumptions, and uncertainty when applicable.

It is a section of the Decision aggregate, not a separate canonical aggregate. Exact health semantics remain deferred.

### 7.4 Growth Insight

Captures growth reasoning and candidate improvement themes.

It does not own goals, Growth Plan facts, Recommendations, or execution. Exact horizon and measures remain deferred.

### 7.5 Risk Insight

Captures Business risk reasoning, evidence, candidate severity, confidence, assumptions, and uncertainty.

It does not own official Rules, compliance policy, Business DNA risks, Security incidents, OS incidents, or actions. Exact taxonomy remains deferred.

### 7.6 Decision Explanation

Captures Business Brain's explanation of the completed Decision.

It is composed from non-AI reasoning contributions and source references. It remains distinct from any downstream AI Coordinator-owned explanation or narrative.

### 7.7 Recommendation Candidate Content

Captures a potential business improvement and Capability need for Recommendation Engine evaluation.

It is derived from a completed Decision and has no Recommendation lifecycle or customer disposition. Candidate identity, deduplication, acknowledgement, and physical delivery remain deferred.

### 7.8 Configuration Input Content

Captures Decision-linked information that may assist Configuration Engine after applicable Recommendation context exists.

It has no Configuration Proposal identity, review policy, compatibility authority, target validation, or application status. Exact structure and timing remain deferred.

## 8. Value Objects

The following are logical value-object candidates. They are immutable descriptions within the Decision aggregate and do not have independent canonical ownership.

| Value object candidate | Purpose | Key invariant |
|---|---|---|
| Decision Scope | Identifies Workspace, Business default, or explicit aggregation. | Cannot mix Workspaces; aggregation lists constituent Businesses. |
| Analysis Purpose | Identifies why analysis was requested. | Must be approved and scope-compatible. |
| Input Manifest | Collects exact source references used. | Immutable after Decision completion. |
| Source Reference | Identifies owner, source, subject, and version where applicable. | Reference never transfers ownership. |
| Evidence Reference | Links reasoning to approved evidence. | Cannot embed unauthorized source content. |
| Confidence | Expresses governed confidence or confidence category. | Exact scale remains deferred; uncertainty is not hidden. |
| Assumption | Records a material assumption. | Must remain distinguishable from fact. |
| Alternative | Records an alternative considered. | Cannot masquerade as selected Decision outcome. |
| Conflict | Records incompatible inputs or reasoning. | Cannot be silently removed. |
| Uncertainty | Records unresolved uncertainty. | Cannot be silently upgraded into confidence. |
| Capability Reference | Points to canonical Capability. | Cannot redefine Capability meaning. |
| Insight Contribution | Describes health, growth, or risk reasoning. | Remains Decision-owned, not source truth. |
| Candidate Output Reference | Links candidate content or downstream acknowledgement. | Does not prove downstream canonical creation. |
| Supersession Reference | Links a new Decision to prior reasoning. | Prior Decision remains immutable. |
| Governance Context | Preserves actor/service, contract, correlation, causation, policy, and Audit references. | Does not embed Permission authority permanently. |

Exact value-object boundaries, names, fields, validation, and serialization remain deferred to later approved documentation.

## 9. External Entity References

| External entity or concept | Owner | Decision relationship |
|---|---|---|
| Workspace | Workspace Management | Mandatory tenant scope reference. |
| Business | Business Registry | Default analysis subject. |
| Business Unit, Department, Branch | Organization Registry | Optional context references when applicable; never Decision ownership. |
| Business DNA Snapshot | Business DNA Registry | Exact published source version. |
| Workspace Intelligence Aggregation | Core intelligence projection | Explicit multi-Business source with preserved identities. |
| Capability | Capability Registry | Candidate business need reference. |
| Knowledge Object/Version | Knowledge Engine | Applicable evidence and expertise reference. |
| Knowledge Pack Version | Knowledge Engine | Applicable additive Knowledge reference. |
| Rule outcome | Rules domain | Deterministic outcome and evidence reference. |
| Analytics projection | Analytics Intake/source owner | Purpose-bound contextual reference. |
| OS Subscription/Plan | Core commercial control | Approved context only. |
| Recommendation | Recommendation Engine | Downstream artifact and possible feedback source. |
| Implementation Option | Core intelligence mapping | Downstream OS, Plan, or Marketplace Asset mapping. |
| Configuration Proposal | Configuration Engine | Downstream proposal. |
| Product Hub projection | Product Hub | Downstream presentation. |
| Marketplace Asset/State | Marketplace | Downstream or contextual reference only. |
| AI artifact | AI Coordinator | Downstream artifact citing completed Decision; never an input. |
| OS operational record | Owning OS | Approved contextual projection only. |
| Audit Record | Audit Service | External append-only governance record. |

## 10. Relationships and Cardinality

### 10.1 Workspace and Business

- one Workspace may have many Business Brain Decisions over time;
- one Business may have many Business Brain Decisions over time;
- one Business-scoped Decision references one Business;
- an explicit aggregation Decision references the Workspace and every included Business; and
- no Decision changes the Workspace or Business hierarchy.

### 10.2 Business DNA

- one Decision references one published Business DNA Snapshot for its Business-scoped analysis;
- an aggregation Decision references the applicable published Snapshot for every included Business;
- one Business DNA Snapshot may be referenced by multiple Decisions; and
- Decision history never becomes Business DNA history.

### 10.3 Knowledge, Rules, and Capabilities

- one Decision may reference multiple applicable Knowledge and Knowledge Pack versions;
- one Decision may reference multiple deterministic Rule outcomes;
- one Decision may identify multiple candidate Capabilities;
- source assets may support many Decisions; and
- no relationship transfers source lifecycle ownership.

### 10.4 Decision history

- one new Decision may supersede one prior Decision for the same approved purpose and scope;
- a prior Decision remains immutable and queryable under policy;
- exact branching, concurrent reanalysis, current selection, and chain rules remain deferred.

### 10.5 Downstream artifacts

- one Decision may produce zero or more recommendation candidates under future detailed rules;
- one Decision may produce configuration input under future detailed rules;
- Recommendation Engine may create Recommendations referencing Decision candidates;
- Configuration Engine may create a Configuration Proposal only under its accepted Recommendation and owner rules;
- Product Hub may display authorized projections; and
- AI Coordinator may create separate AI artifacts referencing the completed Decision.

Exact candidate cardinality remains deferred.

## 11. Decision Completion and History

### 11.1 Completion

A canonical Business Brain Decision exists only after Decision Orchestrator validates the aggregate and completes it.

Requested, evaluating, failed, cancelled, retry, timeout, and recovery are operational concerns and do not represent completed Decision states in Wave 1.

### 11.2 Immutability

After completion:

- content does not change;
- source references do not change;
- explanation does not change;
- AI output cannot be added;
- customer or downstream disposition does not mutate the Decision; and
- corrections occur through new analysis and a new Decision, not an in-place edit.

### 11.3 Reanalysis

Reanalysis:

- resolves current authorized inputs;
- creates a new input manifest;
- creates a new Decision identity/version;
- may link the new Decision to the prior Decision it supersedes; and
- preserves the prior Decision for traceability.

Automatic reanalysis, freshness triggers, concurrency, and current-Decision policy remain deferred.

## 12. Read Model Concepts

Read models are not domain entities.

| Read model | Source | Owner |
|---|---|---|
| Business Brain Decision View | Completed Decision aggregate | Business Brain read side |
| Current Decision View | Decision history under future selection policy | Business Brain read side |
| Workspace Decision Aggregation View | Multiple authorized Business Decisions | Core/Business Brain projection boundary; exact ownership detail deferred |
| Business Health and Growth View | Permitted Decision and intelligence projections | Product Hub |
| Recommendation Feed | Recommendation Engine output | Product Hub |
| Search/analytics/governance view | Authorized projections | Applicable Core coordinating owner |
| Audit view | Audit Records | Audit Service |
| AI view | AI artifacts linked to completed Decision | AI Coordinator |

No read model accepts canonical Decision changes or proves current Permission.

## 13. Non-Entities and Excluded Aggregates

Wave 1 does not introduce:

- Business Brain Evaluation aggregate;
- Analysis Session aggregate;
- independent Health aggregate;
- independent Growth aggregate;
- independent Risk aggregate;
- Recommendation aggregate inside Business Brain;
- Configuration Proposal aggregate inside Business Brain;
- Learning aggregate;
- AI aggregate inside Business Brain;
- Product Hub or Marketplace aggregate; or
- OS operational aggregate.

Their absence is intentional. Evaluation operation and persisted learning models remain deferred; all other concepts already have external owners.

## 14. Domain Invariants

1. Business Brain Decision is the only canonical Business Brain entity and aggregate in Wave 1.
2. One write model owns the aggregate.
3. A Decision cannot contain unpinned versioned sources.
4. A Decision cannot mix Workspaces.
5. Business aggregation cannot become Business DNA.
6. A Decision cannot own a Capability definition.
7. A Decision cannot own Knowledge or Rule outcomes.
8. A Decision cannot become a Recommendation or Implementation Option.
9. Configuration input cannot become a Configuration Proposal.
10. A Decision cannot execute or authorize target action.
11. Completed Decision cannot contain AI content.
12. AI artifacts cannot mutate Decision history.
13. Reanalysis cannot rewrite an older Decision.
14. Projections cannot accept canonical writes.
15. External references cannot transfer ownership.

## 15. Remaining Deferred Decisions

- exact Decision schema, identity, version, and uniqueness mechanism;
- operational evaluation model;
- Decision purpose catalog;
- minimum DNA and required contribution rules by purpose;
- source applicability and changing-input behavior;
- exact insight semantics and value-object structures;
- confidence, severity, conflict, and partial-result models;
- recommendation candidate identity, cardinality, deduplication, and acknowledgement;
- configuration input structure and timing;
- supersession branching, concurrency, and current selection;
- data classification, retention, deletion, and residency;
- persisted learning state;
- physical aggregate representation and transaction boundaries; and
- API, Event, storage, cache, queue, and technology choices.

## 16. References

- `docs/03-BUSINESS-BRAIN-PROPOSAL.md`
- `docs/03-business-brain/03-BUSINESS-BRAIN-PROPOSAL-PATCH-v0.1.1.md`
- `docs/03-BUSINESS-BRAIN-ARCHITECTURE-REREVIEW.md`
- `docs/03-business-brain/02-BUSINESS-BRAIN-ARCHITECTURE.md`
- `docs/02-core-platform/03-DOMAIN-MODEL.md`
- `docs/02-core-platform/04-DATA-OWNERSHIP.md`
- `docs/00-governance/ADR/ADR-012-business-brain-decision-engine.md`
- `docs/00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md`
