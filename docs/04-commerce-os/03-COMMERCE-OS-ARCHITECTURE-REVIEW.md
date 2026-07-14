# Commerce OS Proposal v0.1 — Independent Architecture Review

**Review status:** Complete
**Review date:** 2026-07-13
**Reviewed proposal:** Commerce OS Architecture Proposal v0.1
**Review authority:** Independent Architecture Review Board
**Final verdict:** **MAJOR PATCH REQUIRED**

## 1. Executive Summary

The Commerce OS Proposal provides a strong proposed operational decomposition, preserves the principal Core Platform, Business Brain, Marketplace, Product Hub, Recommendation, Configuration, and AI boundaries, and remains technology-independent. Its separation of Order, POS Transaction, Stock, Inventory Movement, Transfer, Payment, Refund, Return, Tax Application, and Commerce Document responsibilities is generally coherent.

The Proposal is not ready for Documentation Waves or architecture freeze.

Two blocking ownership and baseline-alignment defects remain:

1. the Proposal repeatedly omits the canonical Business context from protected operations, contracts, projections, and security validation even though the frozen hierarchy keeps Business and Business Unit distinct; and
2. the detailed Setup and Configuration boundary claims ownership or application authority over facts also assigned to Product Catalog, Taxes, Invoices and Documents, Extensions, or the applicable target owner.

Four major, five minor, and one editorial issue also remain. These findings do not require redesign of Commerce OS, but they require an authorized Proposal Patch and independent re-review. The Review Board has not selected owners, rewritten boundaries, or resolved deferred decisions in this review.

| Classification | Count |
|---|---:|
| Blocking | 2 |
| Major | 4 |
| Minor | 5 |
| Editorial | 1 |
| Total | 12 |

## 2. Review Authority and Scope

The review treated the Proposal as a submission from an independent architecture team. No authorship assumptions or prior drafting intent were used to excuse ambiguous text.

### 2.1 Approved authorities reviewed

The complete authority set under the following paths was reviewed:

- `docs/00-governance/`, including ADR-001 through ADR-040, the Governance Glossary, ADR lifecycle, and Milestone Lifecycle;
- `docs/01-genesis/`, including all Genesis v1.1 artifacts;
- `docs/02-core-platform/`, including Principles, Waves 1–4, the v1.0.1 alignment patch, and the Core Platform Architecture Review;
- `docs/03-business-brain/`, including Discovery, Capability Map, Proposal Patch, Waves 1–3, and Final Architecture Review;
- `docs/99-architecture-freeze/`, including the Core Platform and Business Brain Freeze and readiness artifacts; and
- `docs/04-commerce-os/`, containing the three submitted Commerce OS artifacts.

### 2.2 Commerce artifacts reviewed specifically

1. `00-COMMERCE-OS-DISCOVERY.md`
2. `01-COMMERCE-OS-CAPABILITY-MAP.md`
3. `02-COMMERCE-OS-PROPOSAL.md`

### 2.3 Review exclusions

This review does not:

- approve or redesign Commerce OS;
- resolve any deferred decision;
- select a technology, database, API shape, event payload, or deployment design;
- create or accept an ADR;
- improve or patch the submitted Proposal; or
- authorize Documentation Waves.

## 3. Review Method

The Board performed five validation passes:

1. **Authority trace:** traced Proposal statements to Genesis, Accepted ADRs, Core Platform Freeze, and Business Brain Freeze.
2. **Discovery trace:** compared all 18 capabilities, 16 domains, open-question categories, boundaries, and Proposal exit conditions with the Proposal.
3. **Ownership audit:** examined the 25 mandatory fact assignments, 18 canonical write models, 18 aggregate candidates, 23 listed lifecycles, read models, contracts, and events.
4. **Negative-boundary audit:** searched for transfer of Core, Business Brain, Marketplace, AI Coordinator, Product Hub, Recommendation Engine, Configuration Engine, or another OS responsibility.
5. **Forbidden-design audit:** checked for implementation technology, database, endpoint, payload, messaging, and deployment decisions.

A clean table assignment was not treated as sufficient when detailed prose created a competing or hidden owner.

## 4. Review Area Results

| # | Review area | Result | Review conclusion |
|---:|---|---|---|
| 1 | Alignment with Genesis | **Fail** | The operational Commerce mission aligns, but the omission of distinct Business context conflicts with the canonical organization hierarchy. See B-01. |
| 2 | Alignment with Governance | **Fail** | Canonical ownership and ADR non-duplication rules are not fully satisfied. See B-01, B-02, and M-04. |
| 3 | Alignment with Core Platform | **Fail** | Most boundaries are preserved, but explicit context and unique target ownership are violated in detailed sections. See B-01 and B-02. |
| 4 | Alignment with Business Brain | **Pass** | Business Brain retains completed Decision ownership; Commerce consumes only authorized downstream information and outcome-feedback contracts. |
| 5 | Consistency with Capability Map | **Fail** | The 18 capabilities and 16 domains are represented, but two capability homes remain distributed and Product Identifier responsibility is implicit. See M-01 and m-02. |
| 6 | Internal consistency | **Fail** | Summary ownership tables conflict with detailed setup and reporting statements. See B-02 and M-02. |
| 7 | Domain boundaries | **Fail** | Most operational boundaries are clear, but Setup crosses Catalog, Document, target-configuration, and extension boundaries. See B-02. |
| 8 | Ownership model | **Fail** | The primary matrix is strong, but detailed prose creates duplicated and hidden ownership. |
| 9 | Canonical fact ownership | **Fail** | The 25 required rows have one named owner syntactically; report classification and hidden configuration facts prevent a substantive pass. See B-02 and M-02. |
| 10 | Canonical write ownership | **Fail** | All 18 declared write models name one owner, but Access and configuration behavior reveal write responsibilities not cleanly represented. See B-02 and M-03. |
| 11 | Aggregate ownership | **Pass with minor finding** | All 18 aggregate candidates align by name with owned write models, but owner attribution is inferred rather than stated. See m-01. |
| 12 | Read model ownership | **Fail** | Individual read models have owners, but Commerce Operational Reports are also classified as a canonical fact. See M-02. |
| 13 | Commerce Core definition | **Pass** | The minimum coherent Commerce truth and channel-convergence invariants are defined without another OS dependency. |
| 14 | Optional Modules | **Fail** | The no-parallel-truth rule passes, but module and extension configuration ownership overlaps. See B-02. |
| 15 | Marketplace boundaries | **Pass** | Marketplace retains Asset, immutable version, entitlement, acquisition, installation, and scoped activation ownership. |
| 16 | AI boundaries | **Pass** | AI Coordinator retains AI artifacts; AI remains downstream and cannot write canonical Commerce state. |
| 17 | Cross-OS boundaries | **Pass** | Integrations remain optional, contract-based, owner-preserving, and non-essential to Commerce Core. |
| 18 | Logical contracts | **Pass with minor finding** | Contracts remain logical and technology-independent, but contract governance ownership is not explicit. See m-04. |
| 19 | Logical events | **Pass with minor finding** | Event fact owners are named, but event taxonomy assignment and the read-projection event remain ambiguous. See m-03. |
| 20 | Security responsibilities | **Fail** | Tenant isolation and least privilege are stated, but protected context repeatedly omits applicable Business. See B-01. |
| 21 | Operational responsibilities | **Pass** | Owner-local transitions, explicit partial state, bounded retry, and projection isolation are coherent. |
| 22 | Reliability principles | **Pass** | The principles preserve ownership, idempotency, honest timeout semantics, optional-dependency isolation, and independent operation. |
| 23 | Deferred Decisions | **Pass with minor finding** | Forty deferrals are visible and no deferred choice is silently implemented, but traceability to the Capability Map questions is absent. See m-05. |
| 24 | Draft ADR candidates | **Fail** | Several candidates restate Accepted ADRs and one combines independently changeable decisions. See M-04. |
| 25 | Risks | **Pass with qualification** | The 22 risks cover the principal operational hazards, but a patch must add or update risk treatment for the ownership findings in this review. |
| 26 | Success Criteria completeness | **Fail** | The criteria are broad, but the Proposal does not currently satisfy its own unique-owner, capability-home, context, and unambiguous-boundary claims. |

## 5. Mandatory Validation Results

| Mandatory validation | Result | Evidence |
|---|---|---|
| Every Canonical Fact has exactly one owner | **Fail** | The primary table assigns one owner to each required row, but detailed configuration ownership and report classification conflict with it. |
| Every Write Model has exactly one owner | **Fail** | Each of the 18 declared models has one named owner, but undeclared or overlapping configuration and Access write responsibilities remain. |
| Every Lifecycle has exactly one owner | **Fail** | The 23 listed lifecycles name one owner, but module/extension state and Commerce role-mapping lifecycles remain outside the lifecycle audit. |
| No duplicated ownership exists | **Fail** | Setup claims responsibilities assigned elsewhere. See B-02. |
| No hidden ownership exists | **Fail** | Access role mapping, Product Identifier, and extension configuration require inference. See M-03, m-02, and B-02. |
| No circular ownership exists | **Pass** | Bidirectional collaboration exists, but canonical write ownership does not form a circular ownership chain. |
| No Domain leaks into another Domain | **Fail** | Setup crosses Catalog, Document, target-configuration, and extension responsibilities. |
| No Capability leaks into another Capability | **Fail** | PC-06 and PC-17 retain distributed accountability rather than a decided logical home. |
| No Core responsibility moved into Commerce | **Pass** | Core identity, organization, commercial lifecycle, shared services, and Product Hub ownership remain external. The missing Business context is an omission, not an ownership transfer. |
| No Business Brain responsibility moved into Commerce | **Pass** | Commerce does not form or own Business Brain Decisions or candidate content. |
| No Marketplace ownership moved into Commerce | **Pass** | Marketplace lifecycle and Asset ownership remain external. |
| No AI ownership moved into Commerce | **Pass** | AI Coordinator retains orchestration and AI artifacts. |
| No Product Hub ownership moved into Commerce | **Pass** | Product Hub retains discovery, journey composition, lifecycle projection, and handoff. |
| No Recommendation ownership moved into Commerce | **Pass** | Recommendation Engine retains Recommendation ownership and disposition. |
| No Configuration ownership moved into Commerce | **Pass with finding** | Configuration Engine retains Configuration Proposal ownership, but Commerce target-application ownership is internally ambiguous. See B-02. |
| No Technology decisions exist | **Pass** | Technology categories occur only as exclusions or deferrals; no selection is made. |
| No Database design exists | **Pass** | No schema, table, index, database, or physical persistence design is defined. |
| No API design exists | **Pass** | Logical contracts are defined without endpoints, resources, methods, or payloads. |
| No Deployment design exists | **Pass** | Logical layers explicitly avoid physical deployment meaning. |

## 6. Ownership Audit

### 6.1 Canonical facts

The Proposal lists 25 mandatory Commerce facts. Each row in Section 13 has one named proposed owner:

- Product Catalog: Product, Category, Variant, and Unit;
- Pricing: Price, Discount, and Promotion;
- Inventory: Stock and Inventory Movement;
- Transfers: Transfer;
- Orders: Order;
- POS: POS Transaction;
- Transactional Customers: Transactional Customer;
- Payments and Refunds: Payment and Refund;
- Taxes: Tax Application;
- Invoices and Documents: Invoice, Receipt, and Commerce Document;
- Returns and Adjustments: Return, Exchange, and Commercial Adjustment;
- Setup and Configuration: Commerce Setup and Commerce Readiness; and
- Reporting: Commerce Operational Reports.

This table passes a syntactic one-owner test. It fails the substantive test because Sections 19, 20, 28, and 33 introduce competing configuration responsibility, while Sections 15, 17, and 31 classify Commerce Operational Reports as projections rather than canonical facts.

### 6.2 Canonical write models

All 18 declared canonical write models name one owner. No row contains two owners. However, a closed write-model inventory cannot be validated while:

- Setup claims application over facts owned by other target domains;
- Commerce role mapping and Access policy may be mutable Commerce facts without a declared write model; and
- module versus extension configuration ownership is unresolved.

### 6.3 Aggregate candidates

The 18 aggregate candidates correspond to the 18 canonical write models. The Proposal does not assign a second owner. Owner attribution is nevertheless indirect because the aggregate table omits an explicit owner column.

### 6.4 Lifecycles

The 23 listed Commerce lifecycles each name one owner. Their owner assignments are internally coherent for the facts explicitly listed. The lifecycle inventory is not closed because module/extension state and any mutable Commerce role-mapping state are discussed elsewhere without inclusion or explicit exclusion.

### 6.5 Circular ownership

No circular ownership was found. Orders may coordinate Payments, Taxes, Documents, Inventory, and Returns, but each requested fact remains written by its own owner. References back to an Order do not transfer Order ownership. The same conclusion applies to Transfer–Inventory and Return–Refund collaboration.

## 7. Boundary Validation

### 7.1 Frozen external owners retained

The Proposal correctly retains:

- Core identity, authentication, organization, Entitlement, OS Subscription, Installation, Activation, billing, shared services, and permission foundations;
- Product Hub discovery, composition, handoff, launch, and projection responsibility;
- Business DNA, Knowledge, Rule, and Capability ownership;
- Business Brain Decision ownership;
- Recommendation Engine ownership of Recommendations;
- Configuration Engine ownership of Configuration Proposals;
- Marketplace ownership of Marketplace Assets and scoped lifecycle state;
- AI Coordinator ownership of AI orchestration and AI artifacts; and
- every other Operating System's operational ownership.

### 7.2 Commerce Core

Commerce Core is coherently defined as a mandatory set of owner boundaries rather than one service or aggregate. POS and optional channels converge on canonical Orders. Stock effects converge on Inventory. Monetary effects converge on Payments and Refunds. Tax and Document facts remain separate. No other OS is required.

### 7.3 Optional extensions

The Proposal correctly prohibits parallel Commerce truth and prevents Marketplace Assets, presets, modules, or integrations from becoming alternative owners. The remaining defect is not the extension principle; it is the unresolved line between Setup-owned module configuration and Extensions-owned extension configuration.

### 7.4 AI and Business Brain

The Proposal is aligned with ADR-029 and the Business Brain Freeze:

- Business Brain completes a deterministic Decision independently;
- AI Coordinator acts only downstream;
- AI artifacts remain AI-owned;
- Commerce independently validates and authorizes any target action; and
- the owning Commerce domain performs the canonical write.

No C-01 recurrence from the Business Brain Proposal review was found.

## 8. Detailed Issue Register

### B-01 — Applicable Business context is absent from the Commerce context model

- **Classification:** Blocking
- **Section:** Sections 2, 7.2, 9, 13.1, 14, 17, 22, 27, 34, 36.1, 38, 43.2, and 44
- **Description:** The Proposal repeatedly defines explicit operational or protected context as Workspace, Business Unit, Branch, OS, and resource context while omitting the applicable Business. The Organization Scope Context contract also assigns one Core Organization Registry provider for Workspace, Business Unit, Department, and Branch without including the Core Business Registry or selected Business context. The Draft ADR candidate for organization references repeats the omission.
- **Why it matters:** Genesis, ADR-004, ADR-019, ADR-037, Core Platform Principles P-28, the Permission Model, and the Core Platform Freeze preserve Business and Business Unit as distinct concepts. Product Hub operates in selected Business context; Operating System Ready requires selected Business plus operational Business Unit; every protected action resolves applicable Business context. Omitting Business makes scope implicit, weakens authorization and tenant traceability, and risks reintroducing the prohibited Business/Business Unit conflation.
- **Recommended action:** Patch the Proposal so every relevant context, handoff, contract, projection, security rule, and draft decision preserves applicable Business separately from Business Unit and attributes Core context to the correct frozen owners. Do not collapse or rename either concept.
- **Requires Proposal Patch?** YES

### B-02 — Setup and Configuration claims competing target-domain ownership

- **Classification:** Blocking
- **Section:** Sections 8, 9, 12, 13, 15, 19, 20, 27, 28, 33, and 36
- **Description:** Section 19 says Setup and Configuration owns Commerce categories, units, tax configuration inputs, numbering, document-template configuration, and idempotent application of an authorized Configuration Proposal. Elsewhere Product Catalog exclusively owns Category and Unit; Invoices and Documents owns templates and document configuration; Taxes owns its domain boundary; Section 36 says the applicable target domain validates and applies Configuration Proposals. Setup owns module configuration, while Extensions also owns Commerce-owned extension configuration and state. The Proposal does not distinguish orchestration, seed intent, configuration input, and canonical target writes consistently.
- **Why it matters:** The Proposal's central invariant is one owner per fact, write model, and lifecycle. These statements let Setup write or own facts assigned to other domains and create an unresolved overlap between Setup and Extensions. They also weaken ADR-017, which requires the owning target to validate and apply its own state.
- **Recommended action:** Patch the Proposal to inventory each setup-produced or extension-produced configuration fact and state exactly one canonical target owner. Distinguish coordination or seed requests from canonical application, then align capability, domain, write-model, aggregate, lifecycle, contract, event, and detailed-boundary sections. The Review Board does not select those owners.
- **Requires Proposal Patch?** YES

### M-01 — Two capabilities lack one accountable logical home

- **Classification:** Major
- **Section:** Sections 8 and 9
- **Description:** PC-06 names “Operational Scope boundary with relevant domain owner” as its primary logical owner, and PC-17 uses “Originating Commerce domain; external projection owner remains Core.” These are distributed responsibility descriptions rather than one accountable logical home. The domain map separately treats Operational Scope as cross-cutting and maps shared-service participation partly to Reporting.
- **Why it matters:** The Capability Map explicitly required the Proposal to decide whether each candidate responsibility is a capability, a cross-cutting responsibility, or part of another capability. Leaving PC-06 and PC-17 distributed permits capability leakage and prevents responsibility and future ADR traceability.
- **Recommended action:** Patch the Proposal to classify each of PC-06 and PC-17 unambiguously and identify one accountable logical home without transferring the underlying canonical fact or external projection ownership.
- **Requires Proposal Patch?** YES

### M-02 — Commerce Operational Reports are both canonical fact and disposable projection

- **Classification:** Major
- **Section:** Sections 13, 15, 17, 18, 31, and 37
- **Description:** Section 13 includes Commerce Operational Reports in a canonical-fact ownership matrix. Section 15 explicitly excludes them from canonical write models and calls them logical read models. Sections 17 and 31 define them as disposable projections, while Section 18 gives them a lifecycle and Section 37 proposes a projection-changed event.
- **Why it matters:** “Projection is never ownership” and “Read Models are disposable” require a precise distinction between a canonical report definition or generated artifact and a rebuildable report projection. The current text cannot establish whether a report is authoritative, disposable, replayable, or a source of events.
- **Recommended action:** Patch the Proposal to classify each report-related concept once, align its owner and lifecycle with that classification, and remove the competing canonical-fact/read-model statements. Do not resolve deferred export or snapshot policy unless separately authorized.
- **Requires Proposal Patch?** YES

### M-03 — Commerce Access has an incomplete canonical-state boundary

- **Classification:** Major
- **Section:** Sections 8, 9, 13, 15, 18, and 32
- **Description:** Access is said to own Commerce role mapping and enforcement policy and to map operational roles, but the Proposal identifies no corresponding canonical fact, write model, aggregate candidate, or lifecycle. It is unclear whether these are mutable Commerce-owned records, immutable policy definitions, configuration within Commerce Setup, or projections of Core grants.
- **Why it matters:** The gap creates hidden ownership in a security-critical domain. It prevents verification that Core grants remain Core-owned, Commerce-specific role state has one owner, and every consequential permission change is auditable and lifecycle-governed.
- **Recommended action:** Patch the Proposal to state the classification and ownership of Commerce role mapping and enforcement policy, then align the write-model and lifecycle inventories or explicitly explain why no Commerce write model exists. Do not redefine Core Permission ownership.
- **Requires Proposal Patch?** YES

### M-04 — Draft ADR candidates duplicate Accepted ADR authority

- **Classification:** Major
- **Section:** Section 44
- **Description:** Several Draft ADR candidates restate decisions already Accepted: independent OS ownership and cross-OS independence (ADR-024 and ADR-025), readiness separation and lifecycle (ADR-018, ADR-023, ADR-026), canonical organization references (ADR-004 and ADR-040), Marketplace boundaries (ADR-027 and ADR-028), AI boundaries (ADR-014, ADR-029, ADR-030), and general contract/event rules (ADR-035, ADR-036, ADR-038). DADR-22 also combines contract, event, and reliability subjects that may change independently.
- **Why it matters:** Governance requires searching existing ADRs to avoid duplication and requires one ADR per principal independently changeable decision. Parallel ADRs could appear to reopen, replace, or compete with frozen authority without explicit supersession.
- **Recommended action:** Patch the candidate register to distinguish existing Accepted ADR application from genuinely new Commerce decisions, and separate independently changeable new decisions where Governance requires it. Do not create or accept ADRs through the patch.
- **Requires Proposal Patch?** YES

### m-01 — Aggregate owner attribution is implicit

- **Classification:** Minor
- **Section:** Section 16
- **Description:** The aggregate-candidate table names aggregate, root, included responsibility, and excluded responsibility but no owner. Ownership can be inferred from the matching canonical write model.
- **Why it matters:** Mandatory validation prohibits hidden ownership. Reviewers and later Wave documents should not have to infer aggregate ownership by name matching.
- **Recommended action:** Patch the aggregate inventory to state its proposed owner explicitly and verify one-to-one alignment with the write-model owner.
- **Requires Proposal Patch?** YES

### m-02 — Product Identifier responsibility from the Capability Map is implicit

- **Classification:** Minor
- **Section:** Sections 8, 13, 15, 20, and 43
- **Description:** The approved Capability Map states that Product and Category Management produces product, service, category, variant, unit, and identifier meaning. The Proposal covers Product, service interpretation, Category, Variant, and Unit, but does not explicitly assign Product Identifier responsibility or defer it. DD-02 mentions identity but does not establish whether operational identifiers are included.
- **Why it matters:** Identifier ownership affects catalog uniqueness, barcode/SKU references, POS, inventory, orders, integrations, and historic traceability. Leaving it implicit creates a hidden boundary.
- **Recommended action:** Patch the Proposal to classify and assign or explicitly defer Product Identifier responsibility while preserving Product Catalog and external Knowledge boundaries.
- **Requires Proposal Patch?** YES

### m-03 — Event responsibilities are not mapped to the declared taxonomy

- **Classification:** Minor
- **Section:** Section 37
- **Description:** The Proposal declares Domain, Integration, Notification Input, Audit Input, and Intelligence Feedback event categories, but the owner-event table does not identify which category each responsibility belongs to. It also includes “Commerce Operational Report projection changed” without resolving whether this is a domain fact, integration fact, or non-domain projection signal.
- **Why it matters:** Owner, compatibility, publication, replay, and consumer authority differ by event category. Exact payloads may remain deferred, but logical classification is required to prevent a projection signal from being treated as canonical fact.
- **Recommended action:** Patch the logical event inventory to map event responsibilities to the existing taxonomy and align the report event with the corrected report classification. Keep names and payloads deferred as stated.
- **Requires Proposal Patch?** YES

### m-04 — Logical contract governance ownership is not explicit

- **Classification:** Minor
- **Section:** Section 36
- **Description:** Contract tables identify provider and consumer but not the owner accountable for contract semantics and evolution. Request contracts sometimes identify the request originator as provider, while operation contracts identify the canonical target owner as provider.
- **Why it matters:** Provider direction alone does not prove who governs compatibility, versions, deprecation, and invariant-preserving change. This is especially material for multi-origin requests such as Inventory Effect Request.
- **Recommended action:** Patch the logical contract inventory to state governance ownership or define one consistent rule that derives it without changing the provider/consumer behavior.
- **Requires Proposal Patch?** YES

### m-05 — Capability Map questions are not traceable to Proposal outcomes

- **Classification:** Minor
- **Section:** Sections 42–45
- **Description:** The Capability Map records 40 open questions, and the Proposal records 40 deferred decisions, but no cross-reference shows which question was decided, transformed into risk, or deferred. Equal counts do not establish traceability.
- **Why it matters:** Capability Map Proposal condition 10 requires every unresolved question to remain visible as a decision, risk, or explicit deferral. Without a crosswalk, the Board cannot prove that no question disappeared silently.
- **Recommended action:** Add Proposal-level traceability from each Capability Map open question to its proposed decision, risk, or deferral without answering any still-deferred question.
- **Requires Proposal Patch?** YES

### e-01 — One principles heading uses inconsistent capitalization

- **Classification:** Editorial
- **Section:** Section 7.2
- **Description:** “context and isolation principles” is the only category heading whose first word is not capitalized consistently with adjacent headings.
- **Why it matters:** It does not affect architecture, but consistent heading treatment improves formal baseline quality.
- **Recommended action:** Correct the heading during any otherwise authorized Proposal Patch.
- **Requires Proposal Patch?** NO

## 9. Deferred Decision Review

The Proposal records 40 deferred decisions in six groups. No database, API endpoint, event payload, messaging, deployment, framework, cloud, or vendor choice is silently selected.

### 9.1 Appropriate deferrals

The following types are appropriately deferred from this Proposal:

- detailed aggregate subdivision and physical consistency boundaries;
- exact lifecycle state vocabularies and transition guards;
- pricing, tax, payment, refund, return, transfer, and document policy detail;
- exact contract fields and event schemas;
- security classification and operational target values; and
- all physical implementation and deployment choices.

### 9.2 Deferral limits

A deferred decision cannot be used to excuse an ownership contradiction. B-01, B-02, M-01, M-02, and M-03 require Proposal-level clarity before Waves. Their correction must not resolve the detailed policy questions intentionally retained in DD-01 through DD-40.

### 9.3 Traceability qualification

The deferral register is substantial but cannot be proven complete until m-05 is addressed.

## 10. Draft ADR Review

Twenty-two Draft ADR candidates are listed. None is marked Accepted, which is correct.

The candidates fall into three review classes:

1. **Potentially new Commerce decisions:** proposed Commerce capability/domain map, catalog/pricing/inventory separation, Order/POS distinction, customer/CRM boundary, payment/refund/return separation, and Commerce report architecture.
2. **Application of existing Accepted ADRs:** independent OS behavior, organization references, readiness separation, Marketplace boundary, AI boundary, and cross-OS optional integration.
3. **Candidates requiring separation or narrowing:** combined contract, event, and reliability governance and any candidate containing several independently changeable owner decisions.

The current register does not make these classes explicit. No ADR should be created from the list until M-04 is corrected and the Proposal passes re-review.

## 11. Risk Review

The Proposal's 22 risks cover major operational threats, including parallel truth, partial cross-domain completion, inventory reconciliation, Return/Refund confusion, unsafe AI or Marketplace action, sensitive-data exposure, and broad milestone scope.

### 11.1 Additional review exposure

The patch must make the following already-present exposure explicit in the risk treatment:

- Business and Business Unit conflation through omitted context;
- setup-driven duplicate writes across Commerce owners;
- ambiguous canonical status of operational reports;
- hidden Access configuration ownership; and
- duplicate ADR authority.

These are review findings, not newly proposed architecture.

### 11.2 Residual risk posture

After a conforming patch, significant non-blocking risks will remain because pricing, tax, payment, document, inventory, return, transfer, security, and reliability semantics are intentionally deferred. Those risks are acceptable only if later work preserves this Proposal's approved boundaries and closes affected decisions through Governance before implementation depends on them.

## 12. Success Criteria Assessment

| Proposal success criterion group | Assessment |
|---|---|
| Frozen Core Platform and Business Brain extension | **Partially satisfied** — owner boundaries are generally preserved; Business context is not. |
| 18 capabilities and 16 domains represented | **Satisfied numerically; not satisfied accountably** — PC-06 and PC-17 lack one logical home. |
| One owner for mandatory facts, writes, and lifecycles | **Not satisfied** — summary matrices are contradicted or incomplete in detailed sections. |
| Setup and readiness separated from Core lifecycle | **Satisfied** |
| Commerce Product separated from Core OS Product and Marketplace Asset | **Satisfied** |
| POS, modules, Marketplace, AI, and integration cannot create parallel truth | **Satisfied as a principle; module configuration ownership remains ambiguous** |
| Core workflow independent from another OS | **Satisfied** |
| External frozen owners retained | **Satisfied** |
| Logical contract and event boundaries | **Partially satisfied** — technology independence passes; governance and taxonomy findings remain. |
| Read models non-canonical | **Not satisfied consistently** — Commerce Operational Reports conflict. |
| Security and explicit context | **Not satisfied** — applicable Business is omitted. |
| Risks and unresolved decisions visible | **Partially satisfied** — register exists; question traceability is missing. |
| No forbidden implementation design | **Satisfied** |

The Success Criteria section is structurally complete, but several assertions describe a desired result that the submitted Proposal does not yet achieve.

## 13. Required Patch Boundary

An authorized Proposal Patch is required. It must be limited to the findings in this review and must not redesign the accepted Discovery or Capability Map.

The patch must:

1. restore explicit Business context alongside Business Unit wherever applicable;
2. eliminate Setup, target-domain, and extension ownership overlap;
3. assign one accountable home to PC-06 and PC-17;
4. resolve the canonical-fact versus projection classification of Commerce Operational Reports;
5. make Commerce Access state classification explicit;
6. align Draft ADR candidates with existing Accepted ADRs;
7. make aggregate ownership explicit;
8. classify Product Identifier responsibility;
9. align event responsibilities with event taxonomy;
10. state logical contract governance ownership; and
11. provide Capability Map question traceability.

The patch must not:

- select implementation technology;
- define physical storage, API endpoints, event payloads, or deployment topology;
- resolve DD-01 through DD-40 beyond what is strictly necessary to remove an ownership contradiction;
- change a frozen predecessor milestone;
- create or accept ADRs; or
- authorize Documentation Waves.

## 14. Final Verdict

The Proposal has a viable architectural direction and does not require rejection or wholesale redesign. It does require correction of frozen-context alignment, canonical ownership, capability accountability, report classification, and governance traceability before it can become authoritative.

# MAJOR PATCH REQUIRED

Documentation Waves are not authorized. A patched Proposal baseline must undergo independent architecture re-review.

## References

- `docs/00-governance/`
- `docs/01-genesis/`
- `docs/02-core-platform/`
- `docs/03-business-brain/`
- `docs/04-commerce-os/00-COMMERCE-OS-DISCOVERY.md`
- `docs/04-commerce-os/01-COMMERCE-OS-CAPABILITY-MAP.md`
- `docs/04-commerce-os/02-COMMERCE-OS-PROPOSAL.md`
- `docs/99-architecture-freeze/`
