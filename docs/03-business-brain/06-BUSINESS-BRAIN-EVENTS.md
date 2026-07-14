# Business Brain Domain Events

Version: 1.0  
Status: Wave 2 — Approved Baseline Expansion  
Milestone: Business Brain  
Architecture baseline: Core Platform v1.0  
Business Brain baseline: Approved Proposal v0.1.1 and Wave 1  
Owner: Nexoraxs

---

## 1. Purpose

This document defines Business Brain Domain Event responsibilities for Wave 2.

It identifies the canonical facts Business Brain owns, the component responsible for producing each fact, logical Event content, ownership boundaries, lifecycle, ordering, idempotency, replay, Security, and projection relationships.

It does not define messaging technology, transport, broker, queue, Event schema, envelope, serialization, delivery guarantee, retry mechanism, dead-letter handling, storage, retention duration, or Webhook behavior.

## 2. Scope

This document covers:

- Business Brain Event philosophy;
- Domain Event taxonomy;
- three canonical Business Brain Domain Events;
- Event ownership and producing component responsibility;
- external Event categories Business Brain may observe;
- Event lifecycle and consumer rules;
- ordering, idempotency, replay, Security, Audit, and observability; and
- deferred Event decisions.

Only Domain Events are defined. Mapping a Domain Event to an Integration Event remains a separate, deferred contract-governance decision.

## 3. Event Philosophy

1. An Event states a committed fact that already occurred.
2. An Event is not a command, analysis request, Recommendation, Configuration Proposal, AI Action Proposal, or retry instruction.
3. The canonical state-changing domain owns the Event.
4. Each Event has exactly one owner.
5. A logical component may produce an Event on behalf of Business Brain; the component does not become a separate domain owner.
6. Event payload meaning is smaller than the aggregate and exposes only stable facts needed by approved consumers.
7. No Event transfers source ownership.
8. No global ordering is assumed.
9. Consumers tolerate duplicate delivery and late arrival under future infrastructure.
10. Replay never rewrites source history or blindly repeats consequential side effects.
11. Event transport owns no Business fact.
12. AI Events remain owned by AI Coordinator and occur only after a completed Business Brain Decision.

## 4. Event Taxonomy

### 4.1 Decision lifecycle facts

Facts about completed Business Brain Decision state:

- Business Brain Decision Completed;
- Business Brain Decision Superseded.

**Owner:** Business Brain  
**Producing component:** Decision Orchestrator

### 4.2 Candidate availability facts

Facts about Decision-owned downstream candidate content:

- Recommendation Candidate Available.

**Owner:** Business Brain  
**Producing component:** Recommendation Candidate Builder

### 4.3 External facts observed by Business Brain

Business Brain may observe approved external Events concerning:

- Business DNA publication;
- Knowledge or Knowledge Pack publication/deprecation;
- Rule or Capability publication/deprecation;
- approved analytics availability;
- Recommendation disposition;
- approved Business outcome, adoption, usage, or feedback;
- relevant commercial context; and
- approved OS operational facts.

These are not Business Brain Events. Their source domains remain the sole owners. Observation does not require automatic reanalysis.

### 4.4 Deferred candidate Event

Operational evaluation failure was identified in the Proposal as a possible future recovery fact. It is not canonical in Wave 2 because evaluation-operation ownership and committed failure state remain deferred.

No `Evaluation Failed` Domain Event is approved by this document.

## 5. Canonical Event Catalog

### BB-E-01 — Business Brain Decision Completed

**Owner:** Business Brain  
**Producing component:** Decision Orchestrator  
**Source aggregate:** Business Brain Decision  
**Fact:** One canonical Business Brain Decision has satisfied required invariants and is complete and immutable.

#### Logical information

- Event identity;
- Event contract version;
- source owner;
- Workspace;
- Business or explicit aggregation classification;
- completed Decision identifier and Decision version;
- analysis purpose reference;
- completion time;
- prior Decision reference when applicable;
- safe input-version summary or references where approved;
- correlation and causation; and
- Security classification.

This is not a schema. Exact fields remain deferred.

#### Approved logical consumers

- Business Brain read-model projectors;
- Recommendation Candidate Builder;
- Configuration Input Builder under applicable downstream context;
- Product Hub projection path under approved contract;
- Audit and observability correlation; and
- AI Coordinator only through a separate completed-Decision read/context contract after completion.

#### Invariants

- Event exists only after Decision completion.
- Decision contains no AI-generated or AI-assisted content.
- Event cannot carry an AI artifact.
- Event cannot be used as target execution authority.
- Duplicate consumption cannot create duplicate canonical Decisions.

### BB-E-02 — Business Brain Decision Superseded

**Owner:** Business Brain  
**Producing component:** Decision Orchestrator  
**Source aggregate:** New Business Brain Decision containing the supersession reference  
**Fact:** A new completed Decision identifies an earlier Decision whose reasoning it supersedes for the applicable purpose and scope.

#### Logical information

- Event identity and contract version;
- Workspace;
- Business or explicit aggregation classification;
- new Decision identifier and version;
- prior Decision identifier and version;
- applicable purpose reference;
- supersession time;
- correlation and causation; and
- Security classification.

#### Approved logical consumers

- Current Decision View projector;
- Decision History View projector;
- authorized Product Hub and governance projections; and
- Audit and observability correlation.

#### Invariants

- new Decision is completed before this fact exists;
- prior Decision remains immutable;
- Event does not delete or edit history;
- Event does not declare source Business DNA invalid;
- exact branching and current-selection rules remain deferred.

### BB-E-03 — Recommendation Candidate Available

**Owner:** Business Brain  
**Producing component:** Recommendation Candidate Builder  
**Source boundary:** Completed Business Brain Decision and Decision-owned recommendation candidate content  
**Fact:** Recommendation candidate content derived from a completed Decision is available for Recommendation Engine evaluation.

#### Logical information

- Event identity and contract version;
- Workspace and Business/aggregation scope;
- source Decision identifier and version;
- candidate reference under future identity policy;
- business improvement and Capability references sufficient for routing;
- availability time;
- correlation and causation; and
- Security classification.

#### Approved logical consumers

- Recommendation Engine through its approved boundary;
- Candidate Output View projector; and
- Audit and observability correlation.

#### Invariants

- candidate derives from a completed Decision;
- candidate is not a Recommendation;
- Event does not create Recommendation lifecycle or disposition;
- Event contains no Implementation Option ownership;
- Recommendation Engine revalidates its own creation rules;
- candidate identity, acknowledgement, and retry remain deferred.

## 6. Event Ownership Matrix

| Event | Sole domain owner | Producing component | State owner that remains external |
|---|---|---|---|
| Business Brain Decision Completed | Business Brain | Decision Orchestrator | Source-input owners retain their facts |
| Business Brain Decision Superseded | Business Brain | Decision Orchestrator | Prior Decision remains Business Brain-owned and immutable |
| Recommendation Candidate Available | Business Brain | Recommendation Candidate Builder | Recommendation Engine owns any resulting Recommendation |

No Event has joint ownership.

## 7. Events Business Brain Does Not Own

Business Brain does not own:

- Business DNA published or corrected Events;
- Workspace or Business lifecycle Events;
- Knowledge, Knowledge Pack, Rule, or Capability Events;
- analytics source Events;
- Recommendation created, prioritized, accepted, rejected, or learned Events;
- Implementation Option Events;
- Configuration Proposal or target-application Events;
- Product Hub lifecycle Events;
- Marketplace Events;
- AI Interaction, explanation, advisory output, or AI Action Proposal Events;
- OS setup, readiness, or operational Events;
- Notification delivery Events; or
- Audit Records.

Consuming an external Event never makes Business Brain its owner.

## 8. Event Lifecycle

The logical Event lifecycle is:

```text
Owning component validates its Business Brain state change
  → canonical Business Brain fact is committed
  → corresponding Domain Event becomes valid
  → approved consumers validate owner, scope, and contract version
  → consumers apply idempotent local reaction or projection
  → Event remains historical under future retention/replay policy
```

Lifecycle rules:

1. Event never precedes its source fact.
2. Event meaning is immutable.
3. Delivery status is not the Business fact.
4. Consumer failure does not roll back the completed Decision automatically.
5. Re-delivery does not create a new logical Event.
6. Replay preserves original identity, source, occurred time, version, correlation, and causation.
7. Exact publication atomicity and storage mechanism remain deferred.

## 9. Event Contract Rules

Every Event logically identifies:

- unique Event identity;
- canonical Event meaning;
- contract version;
- sole source owner;
- occurred time;
- Workspace;
- Business or explicit aggregation when applicable;
- subject identifier and version;
- correlation and causation;
- minimum stable fact content;
- ordering boundary when any exists;
- replay and retention classification references; and
- Security classification.

Exact envelope, naming convention, schema, registry, and field representation remain deferred.

## 10. Ordering

- no global ordering exists;
- unrelated Workspaces, Businesses, Decisions, and source domains are unordered;
- Decision Completed precedes Decision Superseded only according to the new Decision's committed supersession relationship;
- Candidate Available follows its source Decision completion;
- consumers use subject version or source reference when future contracts supply it;
- published time alone is not canonical business order; and
- out-of-order infrastructure handling remains a consumer responsibility under future policy.

Exact partition or ordering technology remains deferred.

## 11. Idempotency

Every Event consumer must converge under duplicate delivery.

- Event identity distinguishes one logical Event;
- repeated Decision Completed cannot create another Decision;
- repeated supersession projection cannot erase history;
- repeated Candidate Available cannot create duplicate Recommendations without Recommendation Engine's own guard;
- projection updates must reject older source versions where applicable; and
- external side effects require separate owner-approved safeguards.

Idempotency storage, retention, concurrency, and response behavior remain deferred.

## 12. Replay

Replay may rebuild an approved projection or consumer state. It cannot change the historical Business Brain fact.

Replay:

- preserves original Event identity and meaning;
- requires explicit authorization and scope;
- uses original contract version unless an approved transformation exists;
- applies current tenant, Security, contract, idempotency, and ordering checks;
- never rewrites Decision aggregate;
- never invokes AI and writes AI output into Decision;
- never repeats Recommendation, Configuration, Notification, billing, or OS action blindly; and
- is auditable.

Retained Event types, time ranges, transformation support, and tooling remain deferred.

## 13. Event Security

- verify producer identity and source ownership;
- validate Workspace and Business/aggregation scope;
- reject a component claiming another domain's fact;
- minimize Event content;
- exclude credentials, secrets, raw Business DNA, Knowledge content, unnecessary analytics, and AI payloads;
- authorize consumers and projection scopes;
- validate contract version before consumption;
- prevent cross-Workspace delivery and projection leakage;
- apply future classification, encryption, retention, and residency policy; and
- Audit critical publication, replay, administration, and Security failure.

Exact identity, signing, encryption, and consumer-subscription mechanisms remain deferred.

## 14. Event-to-Projection Relationships

| Domain Event | Logical projection reaction | Projection owner |
|---|---|---|
| Decision Completed | Create/update Decision View and history; make completed source visible | Business Brain read side |
| Decision Completed | Supply permitted Decision/insight input | Product Hub under its projection contract |
| Decision Completed | Make completed Decision eligible for downstream AI context | AI Coordinator through read contract, not Event ownership transfer |
| Decision Superseded | Update current/history relationship | Business Brain read side |
| Decision Superseded | Refresh permitted current summary | Product Hub or approved consumer projection |
| Recommendation Candidate Available | Update candidate availability view | Business Brain read side |
| Recommendation Candidate Available | Evaluate candidate under Recommendation rules | Recommendation Engine |

Projection failure never changes Event ownership or source aggregate.

## 15. Observability and Audit

Event observability may record safe information about:

- Event type and contract version;
- source component and domain owner;
- Workspace-safe scope classification;
- subject version;
- publication outcome;
- consumer validation and idempotency outcome;
- processing latency and failure;
- projection lag;
- unsupported version or out-of-order handling; and
- replay authorization and progress.

Audit Service owns Audit Records. Observability owns telemetry only. Neither owns the Event's business fact.

## 16. Prohibited Event Behavior

Business Brain Events cannot:

- command analysis or reanalysis implicitly;
- contain a Recommendation, Configuration Proposal, or AI Action Proposal as if it were a fact;
- transfer Business DNA, Knowledge, Rule, Capability, Recommendation, Configuration, Marketplace, AI, or OS ownership;
- authorize target action;
- include AI output in Decision Event content;
- rely on global ordering;
- expose secrets or unbounded tenant data; or
- use Event delivery success as proof of consumer success.

## 17. Remaining Deferred Decisions

- complete Event catalog beyond the three approved Domain Events;
- whether and how each Domain Event maps to an Integration Event;
- evaluation-operation owner and possible failure Event;
- exact Event names and schemas;
- envelope and registry;
- delivery guarantee and publication atomicity;
- ordering boundary implementation;
- idempotency storage and retention;
- retry, dead-letter, pause, and recovery;
- replay eligibility, retention, and transformation;
- consumer acknowledgement;
- Event Security and encryption mechanisms;
- Event observability thresholds; and
- all messaging and transport technology.

## 18. Event Count

| Canonical Business Brain Domain Event | Count |
|---|---:|
| Business Brain Decision Completed | 1 |
| Business Brain Decision Superseded | 1 |
| Recommendation Candidate Available | 1 |
| **Total** | **3** |

## 19. References

- `docs/03-BUSINESS-BRAIN-PROPOSAL.md`
- `docs/03-business-brain/03-BUSINESS-BRAIN-PROPOSAL-PATCH-v0.1.1.md`
- `docs/03-BUSINESS-BRAIN-ARCHITECTURE-REREVIEW.md`
- `docs/03-business-brain/02-BUSINESS-BRAIN-ARCHITECTURE.md`
- `docs/03-business-brain/04-BUSINESS-BRAIN-DATA-OWNERSHIP.md`
- `docs/03-business-brain/05-BUSINESS-BRAIN-CONTRACTS.md`
- `docs/02-core-platform/06-EVENT-ARCHITECTURE.md`
- `docs/00-governance/ADR/ADR-012-business-brain-decision-engine.md`
- `docs/00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md`
