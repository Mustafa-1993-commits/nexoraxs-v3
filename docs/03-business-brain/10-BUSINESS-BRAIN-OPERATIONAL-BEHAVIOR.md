# Business Brain Operational Behavior

**Document Type:** Business Brain Wave 3  
**Status:** Approved-baseline expansion  
**Architecture Baseline:** Business Brain Proposal v0.1.1  
**Core Platform Baseline:** Core Platform Architecture v1.0 / documentation baseline v1.0.1

## 1. Purpose

This document defines the logical operational behavior of Business Brain from an authorized analysis request through immutable Decision completion and downstream handoff. It defines responsibility sequencing, failure containment, retry and timeout philosophy, recovery behavior, and ownership-preserving operations.

## 2. Scope

This document covers logical phases, preconditions, completion behavior, concurrency, idempotency, failure handling, retries, timeouts, cancellation, recovery, projection refresh, and downstream isolation.

The phases are explanatory behavior only. They are not approved lifecycle statuses, a state machine, an evaluation-operation aggregate, a write model, an Event catalog extension, or an implementation design. Evaluation-operation ownership and persistence remain deferred.

## 3. Operational Principles

1. Business Brain begins work only with explicit verified context.
2. Canonical source owners remain authoritative throughout analysis.
3. Component contributions are internal Decision inputs, not independent records of truth.
4. Decision Orchestrator alone completes the canonical Decision.
5. Completion is deterministic, reproducible, provider-independent, and independent of AI.
6. A completed Decision is immutable and is the recovery anchor for downstream work.
7. Reanalysis creates a new Decision; it never edits a completed one.
8. Failures before completion and failures after completion are handled separately.
9. Retry must preserve idempotency, source intent, authorization, and ownership.
10. Timeouts contain waiting; they do not transfer ownership or silently weaken invariants.
11. Projections and downstream consumers may degrade independently.
12. Human approval and target-owner authorization remain required where consequential action is proposed or applied.

## 4. Preconditions

Before logical analysis begins, Business Brain requires:

- BB-C-10 Verified Authorization Context;
- BB-C-11 Analysis Request with explicit purpose and scope;
- one Business scope, or an explicitly authorized Workspace aggregation reference;
- accessible published Business DNA reference where required;
- applicable Capability, Knowledge, and deterministic Rule references;
- available Core Platform settings and commercial context where applicable; and
- compatible logical Contract versions.

Missing or conflicting required preconditions prevent Decision completion. Business Brain does not invent missing business facts or substitute an unauthorized projection.

## 5. Logical Operational Flow

```text
Request and Authorization
→ Canonical Source Resolution and Version Pinning
→ Component Analysis and Contribution
→ Decision Validation
→ Immutable Decision Completion
→ Candidate Formation and Handoff
→ Domain Event Publication and Projection Refresh
→ Optional Downstream AI Consumption
→ Approved Feedback for a Future Analysis
```

This flow describes collaboration. It does not establish persistent operational statuses such as requested, evaluating, failed, cancelled, retried, or timed out.

## 6. Phase Responsibilities

### 6.1 Request and authorization

Core Platform verifies identity and authorization. Business Brain validates explicit Workspace, Business, purpose, operation, and resource context. Rejected requests do not enter canonical Decision formation.

### 6.2 Canonical source resolution and version pinning

Business Brain resolves approved references from Business DNA, Capability Registry, Knowledge Engine, Rules Engine, Analytics, Core Platform settings and commercial context, and approved feedback. Each source owner validates access and retains ownership. Selected source versions and applicability are preserved for reproducibility.

### 6.3 Component analysis and contribution

Business Analyzer interprets business needs and conditions. Capability Selector reasons about applicable Capabilities. Health Analyzer, Growth Advisor, and Risk Analyzer produce their scoped insights. Learning Interpreter provides approved feedback interpretation when applicable. Contributions use logical Contracts and remain Decision-owned content during formation.

### 6.4 Decision validation

Decision Orchestrator checks required contributions, evidence references, deterministic Rule outcomes, scope, conflicts, assumptions, uncertainty, ownership, source versions, and aggregate invariants. AI output is prohibited from this phase.

### 6.5 Immutable Decision completion

Decision Orchestrator completes exactly one immutable Business Brain Decision for the accepted completion intent. Completion establishes canonical Decision identity, scope, version, evidence references, reasoning, outcomes, candidate content, and history relationship. The Business Brain Decision Completed Domain Event may then state that owned fact.

### 6.6 Candidate formation and handoff

Recommendation Candidate Builder derives Recommendation candidate content from the completed Decision and submits it to Recommendation Engine. Configuration Input Builder derives Configuration input and supplies it to Configuration Engine. These outputs remain Decision-owned content; their consumers own subsequent lifecycles.

### 6.7 Domain Event publication and projection refresh

Business Brain publishes only its three approved Domain Events. Authorized projection owners update purpose-specific read models. Projection delay or failure does not change the completed Decision.

### 6.8 Optional downstream AI consumption

After Decision completion, AI Coordinator may consume minimized authorized Decision context and produce AI-owned explanations, narratives, suggestions, Action Proposals, or advisory outputs. No AI output returns into the completed Decision or its canonical formation path.

### 6.9 Approved feedback for future analysis

Feedback owners preserve their source records. Learning Interpreter may consume approved feedback during a later analysis. Feedback never mutates the Decision that prompted it; new understanding requires a new Decision.

## 7. Ownership Across the Flow

| Operational responsibility | Sole owner | Boundary rule |
|---|---|---|
| Identity, authentication, Permission context | Core Platform | Business Brain consumes verified context |
| Business facts | Business DNA | Business Brain references published versions |
| Knowledge, Rules, Capabilities | Respective engines or registry | Business Brain consumes applicable owner results |
| Component contributions | Business Brain during Decision formation | Not independent aggregates or external truth |
| Decision completion and history | Business Brain / Decision Orchestrator | Sole canonical write path |
| Recommendation evaluation and disposition | Recommendation Engine | Candidate submission only |
| Configuration Proposal lifecycle | Configuration Engine | Configuration input only |
| Application of approved configuration | Target owner | Business Brain never applies configuration |
| Product Hub presentation | Product Hub | Authorized projection consumption only |
| AI output | AI Coordinator | Completed Decision context only |
| Audit Records | Audit Service | Business Brain emits auditable activity |
| OS operational workflows | Each Operating System | No cross-OS hard dependency |

## 8. Completion and Idempotency

An accepted completion intent must not produce duplicate Decisions through retry, concurrent delivery, Event replay, or repeated acknowledgment. Idempotency applies at each boundary under that boundary's owner.

- Before completion, equivalent repeated work may converge on the same completion intent only when authorization, scope, purpose, and pinned source versions remain equivalent.
- If authoritative source selection or analysis purpose changes, the work is a new analysis intent and may produce a new Decision.
- After completion, retry may re-deliver an owned Domain Event, candidate, configuration input, or projection update without creating or mutating the Decision.
- Consumers deduplicate according to stable Decision, Event, Contract, and causation references.
- Idempotency metadata does not become business identity or authorization evidence.

Exact idempotency keys and persistence mechanisms remain deferred.

## 9. Concurrency and Reanalysis

Concurrent analysis must preserve explicit scope, purpose, source versions, and causation. Business Brain must not merge incompatible contributions or overwrite one Decision with another.

Where a newer analysis supersedes an earlier completed Decision, a new immutable Decision records the history relationship and Business Brain Decision Superseded states the owned fact. “Current” is a read-model concern derived from canonical history. Exact concurrency-control and supersession-selection mechanisms remain deferred.

## 10. Failure Boundaries

| Failure boundary | Behavior | Canonical effect |
|---|---|---|
| Identity or authorization | Reject and Audit as required | No Decision |
| Scope or tenant mismatch | Fail closed | No Decision |
| Required source unavailable or inapplicable | Stop completion; expose owner-specific failure | No Decision |
| Source version changes before completion | Revalidate or begin a new analysis intent | No silent mixed-version Decision |
| Required component contribution fails | Stop completion | No partial Decision |
| Aggregate invariant fails | Reject completion | No Decision |
| Completion outcome is uncertain | Reconcile by canonical identity before retry | Never assume absent or duplicate |
| Domain Event publication or consumer fails after completion | Retry or replay safely | Decision remains complete |
| Candidate handoff fails after completion | Retry under logical Contract | Decision remains complete |
| Projection update fails | Mark view stale and rebuild | Decision remains complete |
| AI Coordinator fails | Isolate and report downstream degradation | Decision remains complete and valid |
| Recommendation, Configuration, Product Hub, or OS consumer fails | Consumer owner recovers its responsibility | No Decision mutation |

Business Brain does not define a new canonical failure Event because evaluation-operation state and its owner remain deferred.

## 11. Retry Philosophy

Retry is appropriate only when the failure is plausibly transient, the operation remains authorized, its intent is unchanged, and repetition is safe.

1. Revalidate current identity, authorization, tenant, and Contract compatibility where required.
2. Preserve the original causal and idempotency context.
3. Never retry by weakening Decision invariants or omitting required contributions.
4. Do not reuse pinned sources when their owner declares them invalid or inapplicable.
5. Resolve uncertain completion before attempting another completion.
6. Retry post-completion publication, handoff, and projection work independently.
7. Require target-owner idempotency before retrying a consequential downstream action.
8. Bound retries and surface persistent failure for authorized recovery.

Retry counts, schedules, backoff, and terminal-failure representation remain deferred.

## 12. Timeout Philosophy

Timeouts bound waiting at source, component, Contract, Event, projection, and downstream boundaries. They do not prove that remote work failed, authorize duplication, or convert optional data into required data.

- A timeout before confirmed completion produces no assumed completed Decision.
- An uncertain completion result is reconciled against the canonical Decision owner before retry.
- A timeout after completion cannot invalidate the Decision.
- Candidate delivery, projection refresh, and optional AI time out independently.
- Timeout policy must reflect owner responsibility and avoid cascading across independent Operating Systems.

Exact timeout values and mechanisms remain deferred.

## 13. Cancellation and Interruption

Cancellation before completion may stop noncanonical work when safe and authorized; no completed Decision is produced. Once a Decision is completed, it cannot be cancelled, rolled back, or deleted through operational control. Changed business conditions require reanalysis and a new Decision, with supersession where applicable.

Whether cancellation is supported, who may request it, and how an in-progress operation is represented remain deferred with evaluation-operation state.

## 14. Partial and Degraded Behavior

A completed Decision cannot omit a contribution required by its approved analysis purpose. The exact required-versus-optional contribution policy remains deferred. Any future policy must be explicit, deterministic, versioned, reproducible, and reflected in Decision evidence, assumptions, conflicts, and uncertainty.

Post-completion degradation is isolated:

- Product Hub may show an authorized stale indicator rather than invent current data;
- projections may rebuild from canonical Decisions and owned Events;
- Recommendation or Configuration intake may be retried without Decision mutation;
- AI output may be unavailable without affecting Decision validity; and
- one Operating System's failure cannot block another OS or Core Platform's canonical responsibilities.

## 15. Recovery Behavior

Recovery proceeds from canonical ownership:

1. restore verified context and canonical source access;
2. determine whether a Decision was completed;
3. preserve the immutable Decision if present;
4. re-deliver owned Events and candidate outputs idempotently;
5. rebuild disposable projections from canonical facts;
6. let each downstream owner reconcile its own write model; and
7. resume optional AI consumption only after the completed Decision boundary is intact.

Recovery never reconstructs a Decision from Product Hub, AI output, Recommendation disposition, Configuration Proposal, or a projection.

## 16. Administrative Operations

Replay, rebuild, redelivery, diagnostic access, and recovery are privileged, purpose-bound, tenant-scoped, observable, and auditable. Administrative operations cannot rewrite a Decision, change ownership, bypass human approval, apply Configuration, or execute an OS action.

## 17. Operational Invariants

1. No protected work begins without verified explicit context.
2. No mixed-tenant or implicit cross-Business analysis is allowed.
3. No required source or contribution is silently replaced.
4. Only Decision Orchestrator completes a Decision.
5. AI never contributes to Decision formation.
6. Completed Decisions are immutable.
7. Reanalysis is additive and may supersede; it never overwrites.
8. Post-completion failure does not revert Decision completion.
9. Retry and replay cannot create duplicate canonical facts.
10. Projections are disposable and never become write authority.
11. Downstream owners recover their own write models.
12. No operational behavior creates a cross-OS hard dependency.

## 18. Remaining Deferred Decisions

The following remain unresolved:

- evaluation-operation entity, owner, lifecycle state, persistence, and failure Event;
- required-versus-optional contribution policy by analysis purpose;
- exact idempotency and concurrency-control mechanisms;
- source freshness and version-change policy during analysis;
- retry counts, schedules, backoff, and terminal outcomes;
- timeout values and per-boundary enforcement;
- cancellation support and authority;
- acknowledgment and delivery-completion semantics;
- recovery roles and administrative controls; and
- physical runtime, queue, storage, and deployment behavior.

## 19. References

- `docs/00-governance/`
- `docs/01-genesis/`
- `docs/02-core-platform/`
- `docs/99-architecture-freeze/`
- `docs/03-BUSINESS-BRAIN-PROPOSAL.md`
- `docs/03-business-brain/03-BUSINESS-BRAIN-PROPOSAL-PATCH-v0.1.1.md`
- `docs/03-BUSINESS-BRAIN-ARCHITECTURE-REREVIEW.md`
- `docs/03-business-brain/02-BUSINESS-BRAIN-ARCHITECTURE.md`
- `docs/03-business-brain/03-BUSINESS-BRAIN-DOMAIN-MODEL.md`
- `docs/03-business-brain/04-BUSINESS-BRAIN-DATA-OWNERSHIP.md`
- `docs/03-business-brain/05-BUSINESS-BRAIN-CONTRACTS.md`
- `docs/03-business-brain/06-BUSINESS-BRAIN-EVENTS.md`
- `docs/03-business-brain/07-BUSINESS-BRAIN-READ-MODELS.md`
