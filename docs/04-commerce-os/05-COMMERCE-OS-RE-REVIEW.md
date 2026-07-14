# Commerce OS Proposal Baseline v0.1.1 — Independent Architecture Re-Review

**Review status:** Complete
**Review date:** 2026-07-13
**Reviewed baseline:** Commerce OS Proposal Baseline v0.1.1
**Review authority:** Independent Architecture Review Board
**Final verdict:** **APPROVED WITH EDITORIAL NOTES**

## 1. Executive Summary

The Independent Architecture Review Board reviewed the merged Commerce OS Proposal Baseline v0.1.1, consisting of:

1. `02-COMMERCE-OS-PROPOSAL.md`; and
2. `04-COMMERCE-OS-PROPOSAL-PATCH-v0.1.1.md`.

The Board did not review Proposal v0.1 in isolation. Every conflicting or incomplete Proposal statement was evaluated under the Patch interpretation rules.

All eleven substantive findings from the original Architecture Review are resolved. The Patch restores explicit Business context, removes competing Setup ownership, classifies Commerce Operational Reports as projections, closes the Commerce Access boundary, normalizes Draft ADR candidates, makes aggregate owners explicit, assigns Product Identifier responsibility, aligns Event taxonomy, establishes logical Contract governance ownership, assigns one accountable home to all capabilities, and traces all forty Capability Map questions.

No remaining Blocking, Major, or Minor finding was identified. One previously recorded capitalization observation remains editorial and has no architectural effect.

| Remaining classification | Count |
|---|---:|
| Blocking | 0 |
| Major | 0 |
| Minor | 0 |
| Editorial | 1 |

Proposal Baseline v0.1.1 is approved as the authoritative Proposal input for Commerce OS Documentation Waves, subject to the approved Milestone Lifecycle and continued preservation of all deferred decisions.

## 2. Review Authority and Scope

### 2.1 Authorities reviewed

The Board reviewed the complete authority set under:

- `docs/00-governance/`;
- `docs/01-genesis/`;
- `docs/02-core-platform/`;
- `docs/03-business-brain/`;
- `docs/04-commerce-os/`; and
- `docs/99-architecture-freeze/`.

This includes Governance and Accepted ADR-001 through ADR-040, Genesis v1.1, the frozen Core Platform baseline, the frozen Business Brain baseline, Commerce OS Discovery, Commerce OS Capability Map, the original Proposal, the original Architecture Review, and the Freeze Alignment Patch.

### 2.2 Baseline merge rule

For this re-review:

```text
Commerce OS Proposal v0.1
  + Commerce OS Proposal Freeze Alignment Patch v0.1.1
  = Commerce OS Proposal Baseline v0.1.1
```

The Patch controls only where it explicitly corrects or completes the Proposal. All unaffected Proposal content remains authoritative within the merged baseline.

### 2.3 Review limits

This re-review does not:

- redesign Commerce OS;
- alter Discovery or the Capability Map;
- answer DD-01 through DD-40;
- create or accept an ADR;
- select implementation technology;
- define a database, API endpoint, Event payload, messaging mechanism, or deployment topology; or
- approve any architecture beyond the merged Proposal baseline.

## 3. Re-Review Method

The Board performed the following validations:

1. re-tested all twelve original findings against the merged baseline;
2. validated each of the ten authorized Patch alignments;
3. re-audited canonical fact, write-model, aggregate, lifecycle, read-model, and projection ownership;
4. re-audited explicit context and frozen organization ownership;
5. verified one governance owner for logical Contracts;
6. verified logical Event classification and source ownership;
7. verified one accountable logical home for all eighteen capabilities;
8. verified all forty deferred decisions remain preserved;
9. verified all twenty-two Draft ADR candidates are normalized without creating new ADR authority;
10. re-ran the negative-boundary audit for Core Platform, Business Brain, Product Hub, Marketplace, Recommendation Engine, Configuration Engine, AI Coordinator, and other Operating Systems; and
11. re-ran the forbidden-design audit for technology, databases, APIs, Event payloads, messaging, and deployment.

## 4. Original Architecture Review Findings

### 4.1 Finding resolution results

| Finding | Original classification | Patch resolution | Re-review result |
|---|---|---|---|
| B-01 Applicable Business context absent | Blocking | Alignment 1 | **Resolved** |
| B-02 Setup claims competing target ownership | Blocking | Alignment 2 | **Resolved** |
| M-01 Two capabilities lack one accountable home | Major | Alignment 10 | **Resolved** |
| M-02 Reports are canonical fact and projection | Major | Alignment 3 | **Resolved** |
| M-03 Commerce Access state boundary incomplete | Major | Alignment 4 | **Resolved** |
| M-04 Draft ADR candidates duplicate Accepted authority | Major | Alignment 5 | **Resolved** |
| m-01 Aggregate owners implicit | Minor | Alignment 6 | **Resolved** |
| m-02 Product Identifier implicit | Minor | Alignment 7 | **Resolved** |
| m-03 Event taxonomy not mapped | Minor | Alignment 8 | **Resolved** |
| m-04 Contract governance owner absent | Minor | Alignment 9 | **Resolved** |
| m-05 Capability Map question traceability absent | Minor | Alignment 10 | **Resolved** |
| e-01 Heading capitalization | Editorial | Intentionally outside substantive Patch scope | **Remains editorial only** |

### 4.2 Resolution completeness

Every finding marked `Resolved` is corrected consistently across the merged baseline. No correction creates a new contradiction, transfers a frozen responsibility, changes capability count, changes domain count, or decides an implementation mechanism.

## 5. Patch Resolution Validation

| Patch alignment | Validation | Result |
|---|---|---|
| 1. Explicit Business Context preservation | Business is distinct from Business Unit; context ownership and Contracts identify the applicable Core owner | **Pass** |
| 2. Setup versus target-domain ownership | Setup collects or coordinates owner-directed input; each target domain alone writes its facts | **Pass** |
| 3. Commerce Operational Reports classification | Reports are non-canonical read models and projections; source facts retain their owners | **Pass** |
| 4. Commerce Access ownership | Core grants remain Core-owned; Commerce owns permission semantics and enforcement without hidden mutable state | **Pass** |
| 5. ADR candidate normalization | Existing Accepted ADRs are referenced, potential new subjects are distinguished, and combined candidates are narrowed or deferred | **Pass** |
| 6. Aggregate explicit owner attribution | All eighteen aggregate candidates name exactly one owner | **Pass** |
| 7. Product Identifier responsibility | Product Catalog owns Product Identifier within the Product boundary; detailed semantics remain deferred | **Pass** |
| 8. Event taxonomy alignment | Domain Events, Integration Events, shared-service inputs, intelligence feedback, and projection signals are distinct | **Pass** |
| 9. Logical Contract governance ownership | Each Contract or source-specific Contract family has one derivable governance owner | **Pass** |
| 10. Capability Map accountability and traceability | All eighteen capabilities have one accountable home and all forty questions map to a decision or deferral | **Pass** |

## 6. Context Validation

### 6.1 Canonical organization context

The merged baseline now preserves:

```text
Workspace
  → Business
    → Business Unit
      → applicable Department
      → applicable Branch
```

Business and Business Unit are never synonyms. Commerce operates on an authorized Business Unit within explicit selected Business context. Ancestry does not substitute for authorization.

### 6.2 Context ownership

| Context | Owner | Commerce authority |
|---|---|---|
| User and authenticated actor | Core Identity and Access | Consume verified identity |
| Workspace | Core Workspace Management | Consume tenant context |
| Business and selected Business | Core Business Registry | Consume selected Business context |
| Business Unit, Department, Branch, ancestry | Core Organization Registry | Consume operational scope references |
| Entitlement, OS Subscription, Installation, Activation, Core grants | applicable Core owner | Consume eligibility and authorization context |
| Commerce resource and domain invariant | applicable Commerce owner | Validate the target action |

No Core organization responsibility is moved into Commerce.

### 6.3 Protected-operation context

The merged baseline requires actor plus applicable Workspace, Business, Business Unit, Department, Branch, OS, Module, resource, Permission, Entitlement, and lifecycle context. This satisfies Genesis, ADR-004, ADR-019, ADR-034, ADR-037, ADR-040, Core Platform Principles, Permission Model, and Freeze guarantees.

### 6.4 Context verdict

**PASS**

## 7. Ownership Validation

### 7.1 Canonical ownership

All required Commerce operational facts have one owner. The Patch clarifies previously hidden in-scope facts:

- Product Catalog owns Product Identifier alongside Product and Variant responsibility;
- Taxes owns Commerce Tax Configuration and Tax Application;
- Invoices and Documents owns numbering and Commerce Document Template configuration;
- Setup and Configuration owns Commerce Setup, Preset selection, Module Configuration, and Commerce Readiness contribution only; and
- Reporting owns report projection definition and lifecycle without owning source business facts.

No optional module, extension, Marketplace Asset, AI artifact, Product Hub projection, read model, or integration acquires canonical Commerce ownership.

### 7.2 Canonical write models

The baseline retains eighteen logical canonical write models. Each has one owner.

The Patch does not add a nineteenth write model. CWM-15 remains one Taxes-owned logical write boundary covering Commerce Tax Configuration and Tax Application, with final subdivision deferred. CWM-16 remains the Invoices and Documents boundary for Commerce Documents, numbering, and template configuration.

Commerce Operational Reports remain outside the canonical write-model inventory.

### 7.3 Aggregate ownership

All eighteen aggregate candidates have one explicit owner:

| Owner | Aggregate candidates |
|---|---|
| Setup and Configuration | Commerce Setup; Commerce Readiness Assessment |
| Product Catalog | Product; Category; Commerce Unit |
| Pricing | Commerce Pricing |
| Inventory | Inventory Position; Inventory Movement |
| Transfers | Inventory Transfer |
| Orders | Commerce Order |
| POS | POS Transaction |
| Transactional Customers | Transactional Customer |
| Payments and Refunds | Commerce Payment; Commerce Refund |
| Taxes | Tax Application |
| Invoices and Documents | Commerce Document |
| Returns and Adjustments | Commerce Return; Commercial Adjustment |

Product Identifier is included within Product and does not create a parallel aggregate.

### 7.4 Lifecycle ownership

Every canonical lifecycle listed in the Proposal retains one owner. The Commerce Operational Report lifecycle is correctly classified as a Reporting-owned projection lifecycle, not a canonical business lifecycle.

Module Configuration is included in the Commerce Setup lifecycle. Extensions own no independent target configuration lifecycle under this baseline. Commerce Access introduces no separate mutable record lifecycle; Core owns grants and assignments, and Commerce evaluates them using Commerce-owned semantics.

### 7.5 Read-model ownership

Each Commerce read model has one projection owner. Read models remain rebuildable, authorization-filtered, and non-authoritative for writes. External Product Hub, Audit, Notification, Search, and Analytics projections retain their frozen owners.

### 7.6 Duplicate, hidden, and circular ownership

| Validation | Result |
|---|---|
| Duplicate canonical ownership | None found |
| Hidden canonical ownership | None found |
| Circular ownership | None found |
| Domain leakage | None found after Patch interpretation |
| Capability leakage | None found after accountability clarification |
| Projection treated as write authority | None found |

### 7.7 Ownership verdict

**PASS**

## 8. Setup and Target-Domain Validation

The merged baseline establishes an owner-directed setup rule:

```text
Setup collects or recommends an input
  → exact target owner is resolved
  → target owner validates context, authorization, version, and invariants
  → target owner alone changes canonical state
  → target owner reports the result
```

This rule is applied consistently to Product Catalog, Pricing, Inventory, Taxes, Invoices and Documents, Commerce Access, Marketplace, Extensions, and Configuration Proposal application.

Configuration Engine retains Configuration Proposal ownership. Setup applies only a proposal targeting Setup-owned state. Another Commerce domain applies only a proposal targeting its own state. DD-31 remains deferred.

**Result: PASS**

## 9. Contract Clarification Validation

### 9.1 Governance rule

The Patch establishes one Contract-governance rule:

- canonical context or fact provider governs its context or fact Contract;
- canonical target owner governs an operation or effect-request Contract;
- result producer governs its result Contract; and
- a source-family row represents separately governed source Contracts, not shared ownership.

### 9.2 Context Contracts

Workspace Context, Selected Business Context, and Organization Scope Context have separate Core governance owners. This removes the previous grouped-owner ambiguity.

### 9.3 Internal Commerce Contracts

The eleven internal Contract families have explicit governance owners or an explicit source-specific rule. Inventory Effect Request is governed by Inventory even when Orders, Returns, Transfers, Setup, or Extensions originates the request. The same target-owner rule applies to Order, monetary, tax, document, return, adjustment, and transfer operations.

### 9.4 External and shared Contracts

Core, Business Brain, Recommendation Engine, Configuration Engine, Marketplace, AI Coordinator, Product Hub, and applying Commerce target owners retain their appropriate Contract authority. Rows using “applicable owner” are explicitly defined as Contract families and do not create joint ownership.

### 9.5 Contract limitations preserved

DD-29 remains deferred. No endpoint, method, resource shape, field, error code, payload, transport, or compatibility duration is defined.

### 9.6 Contract verdict

**PASS**

## 10. Event Clarification Validation

### 10.1 Taxonomy

The merged baseline distinguishes:

1. Commerce Domain Events;
2. Commerce Integration Events;
3. Commerce Notification Inputs;
4. Commerce Audit Inputs;
5. Commerce Intelligence Feedback; and
6. projection or observability signals.

### 10.2 Ownership

Every canonical Event responsibility is assigned to the owner of the completed source transition. External derivation does not transfer ownership. Product Identifier and Commerce Tax Configuration are included in the correct owner Event families.

The Commerce Operational Report projection-changed signal is explicitly not a Domain Event.

### 10.3 Deferred detail preserved

DD-30 remains deferred for exact Event names, schemas, publication criteria, versions, ordering, retention, replay, and delivery behavior.

### 10.4 Event verdict

**PASS**

## 11. Capability Accountability Validation

### 11.1 Capability count and identity

All eighteen proposed capabilities remain unchanged. No capability was added, removed, renamed, split, or merged.

### 11.2 One accountable logical home

| Capability group | Accountable domains |
|---|---|
| Setup and Preset capabilities | PD-01 Setup and Configuration |
| Catalog | PD-02 Product Catalog |
| Pricing | PD-03 Pricing |
| Inventory | PD-04 Inventory |
| Orders | PD-05 Orders |
| POS | PD-06 Point of Sale |
| Transactional Customers | PD-07 Transactional Customers |
| Payments and Refunds | PD-08 Payments and Refunds |
| Taxes | PD-09 Taxes |
| Documents | PD-10 Invoices and Documents |
| Returns and Adjustments | PD-11 Returns and Adjustments |
| Transfers | PD-12 Transfers |
| Reporting and shared-service participation | PD-13 Reporting |
| Access | PD-14 Access |
| Branch Commerce Operations | PD-15 Operational Scope |
| Optional extension and integration | PD-16 Extensions |

PC-06 owns context interpretation through PD-15, not operational facts. PC-17 is accountable to PD-13 for participation coordination, while originating domains retain source facts and Core services retain their records. No capability leakage remains.

### 11.3 Capability Map traceability

All forty Capability Map open questions have one explicit outcome in the Patch:

- decided at Proposal ownership or boundary level;
- partially decided with exact semantics retained under an identified DD item; or
- fully deferred to an identified DD item or frozen policy.

The trace does not convert a deferral into a decision.

### 11.4 Capability verdict

**PASS**

## 12. Deferred Decision Preservation

### 12.1 Register integrity

DD-01 through DD-40 remain present and deferred. No identifier is removed, renumbered, marked resolved, or silently answered.

### 12.2 Clarification versus decision

The Patch resolves ownership and classification only. It does not decide:

- aggregate subdivision or physical transaction consistency;
- exact lifecycle states or transition rules;
- Product Identifier format or uniqueness;
- pricing, inventory, Order, POS, payment, refund, tax, document, Return, Exchange, Transfer, or reporting policy;
- Access templates, delegation, approvals, or field-level policy;
- Marketplace extension behavior;
- Contract fields or Event payloads;
- security classifications, SLOs, recovery targets, or runbooks; or
- any implementation or technology choice.

### 12.3 Capability Map question preservation

Questions that remain unresolved point to explicit DD items. Equal question and deferral counts are no longer used as proof; direct traceability is available.

### 12.4 Deferred-decision verdict

**PASS**

## 13. Draft ADR Normalization Validation

### 13.1 Accepted ADR preservation

The Patch correctly treats independent OS behavior, readiness separation, organization references, Marketplace, AI, cross-OS integration, shared Contract rules, and shared Event rules as applications of existing Accepted ADRs rather than new authority.

### 13.2 Potential new Commerce subjects

Commerce-specific ownership and boundary subjects remain only potential Draft ADR candidates. No number is reserved and no status becomes Accepted.

### 13.3 Combined candidate correction

DADR-14, DADR-19, and DADR-22 are explicitly marked for split, narrowing, or rejection as a single candidate where decisions may change independently. This satisfies the one-principal-decision ADR rule.

### 13.4 ADR impact

| Validation | Result |
|---|---|
| New ADR files created | 0 |
| Accepted ADRs modified | 0 |
| Accepted decisions superseded | 0 |
| Duplicate ADR authority remaining | 0 |
| Deferred ADR assessment preserved | Yes |

### 13.5 ADR verdict

**PASS**

## 14. Frozen Boundary Validation

| Frozen owner or boundary | Re-review result |
|---|---|
| Core identity, organization, commercial lifecycle, Permissions foundation, and shared services | Preserved |
| Product Hub journey, lifecycle composition, projection, and handoff | Preserved |
| Business DNA | Preserved and software-independent |
| Knowledge, Rules, and Capabilities | Preserved |
| Business Brain Decision | Preserved; Commerce consumes completed Decision only |
| Recommendation Engine | Preserved; Recommendation remains advisory |
| Configuration Engine | Preserved; Configuration Proposal remains external to Commerce target state |
| Marketplace | Preserved; Assets and scoped lifecycle remain Marketplace-owned |
| AI Coordinator | Preserved; AI artifacts remain advisory and AI-owned |
| Other Operating Systems | Preserved; all integration remains optional |
| Commerce independent operation | Preserved |

No frozen predecessor responsibility is moved, duplicated, narrowed, or redefined.

## 15. Forbidden-Design Validation

| Prohibited content | Result |
|---|---|
| Technology selection | None found |
| Framework selection | None found |
| Database or physical schema design | None found |
| API endpoint or resource design | None found |
| Event payload schema | None found |
| Messaging or transport technology | None found |
| Deployment topology | None found |
| Cloud or vendor selection | None found |
| Implementation task plan | None found |

## 16. Remaining Editorial Note

### e-01 — Section 7.2 heading capitalization

- **Classification:** Editorial
- **Location:** `02-COMMERCE-OS-PROPOSAL.md`, Section 7.2
- **Observation:** The heading begins with lowercase `context` while adjacent category headings use initial capitalization.
- **Architecture impact:** None
- **Ownership impact:** None
- **Compatibility impact:** None
- **Wave readiness impact:** None
- **Required before approval:** No

The Proposal was intentionally not modified. This note may be corrected only through a future authorized documentation edit and does not require another Proposal Patch.

## 17. Final Readiness Assessment

| Validation target | Result |
|---|---|
| Every original Architecture Review finding | Pass; one editorial note remains |
| Every Patch resolution | Pass |
| Every ownership rule | Pass |
| Every Contract clarification | Pass |
| Every Event clarification | Pass |
| Every Context clarification | Pass |
| Every Capability accountability rule | Pass |
| Every Aggregate ownership | Pass |
| Every Deferred Decision preservation rule | Pass |
| Every ADR normalization | Pass |
| Frozen baseline alignment | Pass |
| Technology independence | Pass |

Proposal Baseline v0.1.1 is internally consistent, traceable, owner-safe, aligned with frozen predecessors, and ready to serve as the authoritative Proposal for Commerce OS Documentation Waves.

## 18. Final Verdict

# APPROVED WITH EDITORIAL NOTES

The remaining editorial note is non-blocking and does not require a Proposal Patch or another re-review.

## References

- `docs/00-governance/`
- `docs/01-genesis/`
- `docs/02-core-platform/`
- `docs/03-business-brain/`
- `docs/04-commerce-os/00-COMMERCE-OS-DISCOVERY.md`
- `docs/04-commerce-os/01-COMMERCE-OS-CAPABILITY-MAP.md`
- `docs/04-commerce-os/02-COMMERCE-OS-PROPOSAL.md`
- `docs/04-commerce-os/03-COMMERCE-OS-ARCHITECTURE-REVIEW.md`
- `docs/04-commerce-os/04-COMMERCE-OS-PROPOSAL-PATCH-v0.1.1.md`
- `docs/99-architecture-freeze/`
