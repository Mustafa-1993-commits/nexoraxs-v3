# Core Platform Permission Model

Version: 1.0  
Status: Milestone 1 — Wave 2  
Authority: Genesis v1.1, Governance Foundation, approved Core Platform Architecture Proposal v0.2, and Core Platform Wave 1  
Owner: Nexoraxs

---

## 1. Purpose

This document defines the Core Platform permission architecture for human Users, service identities, APIs, Marketplace, AI Coordinator, and independent Operating Systems.

The model separates Authentication from Authorization, uses roles to organize Permissions, evaluates contextual attributes and lifecycle constraints, and requires explicit Workspace and resource scope for every protected operation.

The organizational hierarchy is structural, not an authorization shortcut. Access is never granted merely because a User can name a Workspace, Business, Business Unit, Department, Branch, OS, route, or resource.

## 2. Scope

This document covers:

- Authentication.
- Authorization.
- Role-Based Access Control (RBAC).
- Attribute-Based Access Control (ABAC) where required by approved contextual rules.
- Workspace, Business, Business Unit, Department, Branch, OS, and resource scope.
- API and service authorization.
- AI authorization.
- Delegation boundaries.
- Permission inheritance.
- Permission evaluation order.
- Security invariants.
- Ownership of identity, Permission definitions, assignments, and domain decisions.

This document does not create a complete role catalog, Permission naming catalog, direct-grant model, explicit-deny model, delegation feature, emergency-access process, credential format, token format, or authorization policy language. Those are deferred because the authoritative sources do not approve them yet.

## 3. Principles

### 3.1 Authentication is not Authorization

Authentication proves an actor or service identity. Authorization decides whether that identity may perform one action against one resource in one resolved context.

### 3.2 Default to no access

A protected operation is allowed only when every required identity, membership, Permission, scope, entitlement, lifecycle, and owning-domain check succeeds. Missing, invalid, expired, inconsistent, or unresolved context does not create access.

### 3.3 Scope is explicit

Every protected operation resolves Workspace and every applicable Business, Business Unit, Department, Branch, OS, and resource scope. Client-provided scope is an authorization input, not evidence of authority.

### 3.4 Hierarchy is not inheritance

Workspace → Business → Business Unit → Department/Branch defines organization. It does not automatically grant descendant access.

### 3.5 Roles organize Permissions

RBAC groups approved Permissions into roles and assigns those roles within an explicit scope. A role name alone does not bypass scope or contextual checks.

### 3.6 Attributes constrain role grants

ABAC applies approved attributes such as Workspace Membership state, scope ancestry, resource ownership, OS context, Workspace Entitlement, OS Subscription, lifecycle state, and Permission requirements. ABAC constrains an RBAC result; it does not let arbitrary AI output create policy.

### 3.7 Owning domains make final resource decisions

API Gateway and Core Identity and Access perform boundary checks, but the canonical owner of a resource validates resource-level Permission and domain invariants.

### 3.8 OS independence is preserved

Core provides identity, Workspace Membership, shared authorization primitives, and stable context contracts. Each OS owns its operational Permission definitions and domain authorization decisions without requiring another OS.

### 3.9 AI has no implicit privilege

AI Coordinator and AI Experts operate only within the authorized context of the request and the narrower permissions of approved AI Tool APIs. AI cannot modify Permissions or execute critical actions directly.

### 3.10 Critical access changes are auditable

Invitation, role assignment, access assignment, Permission change, service access, and consequential authorization outcomes use the shared append-only Audit pattern according to later detailed audit policy.

## 4. Responsibilities

### 4.1 Core Identity and Access

Core Identity and Access owns:

- User identity.
- Authentication and sessions.
- Workspace Membership.
- invitation and membership lifecycle foundations.
- shared role and Permission assignment foundations.
- Authorization Context resolution primitives.
- service identity foundations.
- shared policy contracts used across Core, Marketplace, and OSs.

### 4.2 Workspace Management and Organization Registry

These owners provide canonical Workspace, Business, Business Unit, Department, and Branch identity, ancestry, and lifecycle information used during authorization. They do not grant access simply by returning the hierarchy.

### 4.3 Entitlement and subscription owners

Core commercial control owns Workspace Entitlement, OS Subscription, and Plan state used to determine whether a product or capability is commercially available. Entitlement is necessary where required but never replaces Permission.

### 4.4 Resource-owning domains

Every Core module, Marketplace, and OS:

- declares the Permissions required for its resources and actions;
- validates resource scope and domain invariants;
- does not trust only gateway or UI checks;
- returns an authorization decision without exposing unauthorized data;
- records critical decisions through Audit Service.

### 4.5 API Gateway

API Gateway authenticates the boundary, validates coarse policy and declared context, applies rate and abuse controls, routes requests, and records boundary telemetry. It does not own resource-level Authorization.

### 4.6 AI Coordinator

AI Coordinator resolves the requesting User's Authorization Context, builds the minimum authorized context, applies Policy and Safety Engine rules, invokes only approved AI Tool APIs, and emits AI Action Proposals rather than bypassing owning-service authorization.

## 5. Architecture

### 5.1 Authentication

Authentication establishes an authenticated principal for a User or service identity.

```text
Credentials or approved identity proof
  → Identity validation
  → Session or service context
  → Authenticated principal
  → Authorization evaluation for each protected operation
```

Authentication must not embed permanent assumptions that the principal may access every Workspace or product. A valid session can coexist with no authorized Workspace context.

Authentication responsibilities include identity verification, session validity, account or service status, and secure recovery foundations. Specific mechanisms and credential formats remain deferred.

### 5.2 Authorization

Authorization evaluates a requested action against:

- authenticated principal;
- active Workspace Membership or approved service identity relationship;
- requested Workspace;
- requested Business and verified Workspace ancestry where applicable;
- requested Business Unit and verified Business ancestry where applicable;
- requested Department or Branch and verified Business Unit ancestry where applicable;
- OS and resource context where applicable;
- role and Permission assignment;
- Workspace Entitlement, OS Subscription, Plan, and lifecycle where required;
- resource-owning domain policy and invariants;
- AI, Marketplace, or integration restrictions where applicable.

The result applies to one operation in one resolved context. A prior decision is not permanent proof for a later request.

### 5.3 RBAC

RBAC is applicable because the approved architecture establishes roles, Permissions, Workspace Membership, and scoped access assignments.

The model is:

```text
User or service identity
  → Workspace Membership or approved service relationship
  → Role assignment at an explicit scope
  → Permissions contained by that role
  → contextual constraints and resource authorization
```

RBAC rules:

1. A role groups approved Permissions; it does not create new resource ownership.
2. A role assignment identifies its Workspace and any narrower Business, Business Unit, Department, Branch, OS, or resource scope.
3. Workspace roles govern Workspace concerns only according to their Permission definitions.
4. OS roles govern operational actions inside their OS scope and remain OS-owned.
5. A Core role does not automatically grant OS domain Permissions.
6. An OS role does not grant Core billing, team, Workspace, Marketplace, or other OS Permissions.
7. A role assignment remains subject to membership, entitlement, lifecycle, and owning-domain checks.

The authoritative sources do not approve canonical role names, role contents, direct User Permission grants, or role composition. Those details remain deferred.

### 5.4 ABAC

ABAC is applicable as a constraint layer because authorization must evaluate attributes beyond role membership.

Approved attribute categories include:

| Attribute category | Examples from approved architecture | Authority |
|---|---|---|
| Principal | User or service identity; Workspace Membership status | Core Identity and Access |
| Tenant | Workspace identifier and lifecycle | Workspace Management |
| Organization | Business, Business Unit, Department, Branch identifiers and verified ancestry | Business Registry and Organization Registry |
| Product | OS identifier, Workspace Entitlement, OS Subscription, Plan, installation, activation, readiness | Core commercial and lifecycle owners; selected OS for OS state |
| Resource | Canonical owner, resource identifier, resource scope, required Permission | Owning domain |
| Action | Requested operation and whether it is critical or read-only | Owning domain and policy |
| Context | locale, time semantics, API or AI channel when relevant to policy | Approved context owner |
| Marketplace | Workspace purchase, installation, activation, Business applicability, declared required Permissions | Marketplace bounded context |
| AI | request scope, approved context, AI Tool API Permission, Policy and Safety Engine outcome | AI Coordinator and owning tool service |

ABAC does not mean unrestricted dynamic policy. Only approved, versioned policy and canonical attributes may affect an Authorization decision.

### 5.5 Scope model

```text
Workspace
  └── Business
      └── Business Unit
          ├── Department
          └── Branch

Orthogonal context where applicable:
  ├── Operating System
  └── Resource
```

OS and resource are not new organization levels. They constrain access to a product and owned resource within the applicable organization context.

#### 5.5.1 Workspace scope

Workspace scope applies to Workspace-owned concerns such as membership, billing, Workspace Entitlement, subscriptions, settings, Marketplace purchase state, and Workspace-wide governance according to Permission.

A Workspace-scoped role does not automatically grant access to every Business or OS operational resource. Descendant applicability must be part of the Permission contract or an explicit narrower assignment.

#### 5.5.2 Business scope

Business scope applies to one Business and Business-owned concerns such as Business DNA and Business-context Recommendations.

Access to one Business never grants another Business in the same Workspace. Business scope does not automatically grant every Business Unit, Department, Branch, or OS resource.

#### 5.5.3 Business Unit scope

Business Unit scope applies to one logical operating division inside a Business and to OS operational data anchored there.

The evaluator verifies Workspace → Business → Business Unit ancestry. Business Unit access does not automatically imply access to every Department, Branch, Module, or resource unless the Permission explicitly declares that descendant applicability.

#### 5.5.4 Department scope

Department scope applies to one Department inside one Business Unit. The evaluator verifies full ancestry and the owning domain's resource relationship.

Department is not a substitute for Business Unit and is not interchangeable with Branch.

#### 5.5.5 Branch scope

Branch scope applies to one physical or virtual operating location inside one Business Unit. The evaluator verifies full ancestry and OS context.

Access to one Branch does not imply access to sibling Branches or the entire Business Unit.

#### 5.5.6 Resource scope

Resource scope applies to a specific owned resource or bounded collection within its canonical domain. It always resolves the applicable tenant and organization ancestry.

A resource identifier does not grant access by existence. The canonical owner evaluates the requested action, Permission, resource state, and relationship to the resolved context.

### 5.6 Permission inheritance

The organization hierarchy does not create implicit Permission inheritance.

The approved rule is:

- a Permission applies at the explicit assignment scope;
- descendant applicability exists only when the Permission contract explicitly defines it and the assignment authorizes that scope;
- narrower scope never expands to a parent or sibling;
- OS or resource restrictions continue to apply even when organizational descendant applicability is allowed;
- changing organization ancestry triggers re-evaluation and cannot silently preserve an invalid inherited result;
- a read-model or navigation hierarchy cannot define inheritance.

No general role inheritance, nested role, direct Permission override, or explicit-deny precedence model is approved. Those mechanisms remain deferred.

### 5.7 Delegation

The approved architecture includes invitation and access-assignment foundations but does not approve a general User-to-User Delegation model.

For Wave 2:

- an authorized administrative access assignment is not treated as Delegation;
- a User cannot transfer or lend an Authorization decision to another User;
- a service cannot act with a User's authority unless an approved service authorization contract establishes that relationship;
- AI cannot receive delegated authority; it uses the request's authorized context and narrower AI Tool API access;
- no transitive, implicit, or permanent Delegation is recognized.

A future Delegation capability requires an accepted ADR defining grantor authority, delegate identity, maximum scope, duration, revocation, re-delegation, consent, critical-action limits, and Audit Records. Until then, Delegation is deferred rather than inferred.

### 5.8 Permission evaluation order

Every protected operation follows this logical order:

```text
1. Authenticate principal
2. Validate session or service identity state
3. Resolve requested Workspace
4. Validate Workspace Membership or approved service relationship
5. Resolve Business → Business Unit → Department/Branch ancestry as applicable
6. Resolve OS and resource owner as applicable
7. Resolve role assignments and required Permission at the requested scope
8. Apply approved contextual attributes
9. Validate Workspace Entitlement, OS Subscription, Plan and lifecycle as applicable
10. Apply owning-domain resource policy and invariants
11. Allow or deny the one requested operation
12. Record required Audit and telemetry
```

Every required step must succeed. A boundary component may perform an early rejection, but a successful early check cannot skip the owning-domain decision.

### 5.9 API authorization

Every protected API request carries or resolves:

- actor or service identity;
- correlation and trace identifiers;
- Workspace;
- Business where applicable;
- Business Unit, Department, Branch, OS, and resource scope where applicable;
- requested action and required Permission;
- contract version;
- entitlement and lifecycle context where required.

API Gateway handles Authentication, coarse policy, rate limits, routing, and telemetry. The owning domain:

- revalidates the relevant Authorization Context;
- loads the current canonical resource state;
- enforces Permission and invariants;
- prevents over-broad field or collection access;
- audits critical changes.

First-Party Experience API, OS Integration API, Marketplace API, Public Platform API, Administrative API, Event and Webhook API, and AI Tool API follow the same ownership rule with surface-specific restrictions.

### 5.10 Service authorization

A service identity is a non-human authenticated principal. It receives only explicitly approved access required for its responsibility.

Service authorization rules:

1. Service identity is distinct from a User.
2. The calling service and target service are identifiable.
3. Workspace and resource scope remain explicit when tenant data is accessed.
4. A service cannot infer all-Workspace access from being an internal component.
5. The target owner authorizes the service action.
6. Service-to-service calls preserve correlation and causation.
7. Service permissions do not become User permissions, and User permissions do not automatically become service permissions.
8. Critical service actions are auditable.

Specific service credential, rotation, audience, and workload-identity mechanisms remain deferred.

### 5.11 AI authorization

```text
User request
  → Authentication
  → Authorization Context Resolver
  → minimum authorized Context Builder input
  → Policy and Safety Engine
  → approved Expert and AI Tool API
  → Evidence and Claim validation
  → response or AI Action Proposal
  → owning service reauthorizes any requested action
```

AI authorization rules:

- AI Coordinator receives only data the requesting principal may access for the requested purpose.
- AI Expert selection never broadens scope.
- Conversation Context Manager cannot mix Workspaces or Businesses without explicit authorized aggregation.
- AI Tool API exposes narrow reads or Action Proposals, not unrestricted database access.
- AI cannot modify Permissions, Workspace Membership, subscription, financial records, compliance policy, Business DNA, official Knowledge, Rules, or OS data directly.
- An AI Action Proposal contains no durable authority. The owning service evaluates the action as a new protected operation.
- AI Interactions preserve versions, context references, policy outcomes, evidence, and Audit information under future retention policy.

### 5.12 Marketplace authorization

Marketplace Assets declare required Permissions and never bypass tenant isolation.

Marketplace access evaluates:

- Workspace Membership or approved service identity;
- Workspace scope;
- Marketplace Purchase, Installation, Activation, and Applicability;
- selected Business where applicability is Business-scoped;
- required Permission and Plan compatibility;
- asset version and lifecycle;
- target OS access when the asset extends an OS.

Activation of a Marketplace Asset does not grant its required Permissions automatically. Permission assignment remains a separate authorized decision.

### 5.13 Cross-OS authorization

Cross-OS integration is optional and contract-based.

- The source OS authorizes access to the source fact.
- The platform integration boundary verifies tenant and integration context.
- The consuming OS authorizes its local response or projection.
- No OS role or Permission is automatically valid in another OS.
- Shared identifiers support correlation, not authorization transfer.
- Removal or pause of one OS invalidates access dependent on its current lifecycle without damaging another OS's canonical state.

### 5.14 Caching and projections

Authorization-critical decisions use current canonical identity, membership, entitlement, lifecycle, and resource policy or an approved cache whose invalidation behavior is defined later.

Product Hub Projection, search, analytics, navigation state, or Event-derived read models cannot independently prove current Permission. A consumer must re-evaluate before a protected write or sensitive read when current authority is required.

### 5.15 Security invariants

1. Authentication never implies Authorization.
2. Every protected operation resolves one authenticated principal.
3. Every tenant operation resolves one Workspace.
4. Business, Business Unit, Department, Branch, OS, and resource ancestry is verified when applicable.
5. Client-provided scope is never trusted without canonical validation.
6. Workspace Membership alone does not grant every Workspace resource.
7. Organization hierarchy alone does not grant descendant access.
8. A role never bypasses entitlement, lifecycle, or resource policy.
9. A Permission from one OS does not authorize another OS.
10. A projection or navigation route never becomes an authorization source of truth.
11. API Gateway approval never replaces owning-domain authorization.
12. Service identity never implies platform-wide tenant access.
13. AI has no implicit or delegated privilege.
14. Marketplace activation never grants Permission automatically.
15. Cross-OS integration never transfers source ownership or authority.
16. Missing or unresolved required context results in no access.
17. Permission changes and critical access actions are auditable.
18. Authorization failure does not disclose unauthorized resource existence or data.

## 6. Ownership

| Permission concern | Canonical owner | Consumer responsibility |
|---|---|---|
| User Authentication and session | Core Identity and Access | Present authenticated principal; never infer resource access |
| Workspace Membership | Core Identity and Access | Revalidate current membership for Workspace operations |
| Shared role and Permission assignment foundation | Core Identity and Access | Use approved assignments and scopes |
| Workspace, Business, Business Unit, Department, Branch ancestry | Corresponding Core registry | Verify references through canonical contracts |
| Workspace Entitlement and OS Subscription | Core commercial control | Apply commercial constraints without treating them as Permission |
| Core resource Permission definition and decision | Owning Core module under shared policy | Declare and enforce required action and scope |
| Marketplace resource Permission decision | Marketplace bounded context | Enforce Marketplace state and declared permissions |
| OS operational Permission definition and decision | Owning OS | Enforce its domain and operational context independently |
| API boundary policy | API Architecture and API Gateway | Owning domain performs final resource authorization |
| AI context and tool authorization | AI Coordinator and owning tool services | Preserve requesting context; reauthorize every action |
| Audit history | Audit Service | Producers supply actor, scope, action, subject and result context |

No presentation surface, read model, AI Expert, external client, or consuming OS becomes the owner of a Permission decision merely because it requests or displays data.

## 7. Relationships

### 7.1 Identity and scope relationship

```text
User
  → Workspace Membership
  → Role assignment
  → Permission
  → explicit organization and OS scope
  → contextual attributes
  → owning resource policy
  → Authorization decision
```

### 7.2 Commercial relationship

```text
Permission
  + Workspace Entitlement
  + OS Subscription and Plan when required
  + installation, activation and readiness when required
  = eligible authorization input
```

No individual input is sufficient by itself.

### 7.3 AI relationship

The requesting User's Authorization Context bounds Context Builder. AI Tool API may be narrower. AI Action Proposal returns to the owning service, which performs the full evaluation again.

### 7.4 Event relationship

An Event carries source identity and tenant scope but does not carry permanent authority. Every consumer authorizes access to its local write model and verifies the Event contract and source before acting.

## 8. Future Extension Points

Future approved documentation may define:

- canonical role catalogs and role contents;
- Permission naming and registration rules;
- direct Permission grants, if any;
- explicit deny and conflict precedence, if any;
- role composition or role inheritance, if any;
- descendant-scope applicability declarations;
- full Delegation, revocation, expiry, re-delegation, and approval model;
- emergency access and break-glass controls;
- service identity, credential, rotation, and audience mechanisms;
- Authentication methods, session controls, step-up requirements, and recovery;
- authorization policy versioning and evaluation infrastructure;
- Permission caching, invalidation, and consistency objectives;
- field-level and collection-level access rules;
- country, privacy, residency, and data-purpose policies;
- audit retention, access review, certification, and anomaly detection.

No extension may weaken tenant isolation, create implicit cross-OS access, permit AI to modify Permissions, or make organizational hierarchy an automatic authorization shortcut.

## 9. References to Genesis

- [Constitution](../01-genesis/02-CONSTITUTION.md)
- [Business DNA](../01-genesis/03-BUSINESS-DNA.md)
- [AI Strategy](../01-genesis/08-AI-STRATEGY.md)
- [Platform Blueprint](../01-genesis/09-PLATFORM-BLUEPRINT.md)
- [Nexoraxs Ontology](../01-genesis/10-NEXORAXS-ONTOLOGY.md)
- [Workspace Lifecycle](../01-genesis/12-WORKSPACE-LIFECYCLE.md)
- [Product Hub](../01-genesis/13-PRODUCT-HUB.md)
- [Subscription Model](../01-genesis/14-SUBSCRIPTION-MODEL.md)
- [Operating System Lifecycle](../01-genesis/16-OPERATING-SYSTEM-LIFECYCLE.md)
- [Marketplace Architecture](../01-genesis/17-MARKETPLACE-ARCHITECTURE.md)
- [AI Expert Network](../01-genesis/19-AI-EXPERT-NETWORK.md)
- [Platform Ecosystem](../01-genesis/20-PLATFORM-ECOSYSTEM.md)

## 10. References to Governance

- [Canonical Glossary](../00-governance/glossary/GLOSSARY.md)
- [ADR-003 — Workspace Boundary](../00-governance/ADR/ADR-003-workspace-customer-multi-business-boundary.md)
- [ADR-004 — Organization Hierarchy](../00-governance/ADR/ADR-004-genesis-organization-hierarchy.md)
- [ADR-014 — Human Control](../00-governance/ADR/ADR-014-human-control-over-recommendations-and-ai.md)
- [ADR-023 — Subscription and Operation Scope](../00-governance/ADR/ADR-023-workspace-subscription-business-unit-operation.md)
- [ADR-024 — OS Domain Ownership](../00-governance/ADR/ADR-024-independent-operating-system-domain-ownership.md)
- [ADR-025 — Optional Contract-Based Integration](../00-governance/ADR/ADR-025-contract-based-optional-os-integration.md)
- [ADR-029 — AI Downstream of Authorization](../00-governance/ADR/ADR-029-ai-downstream-of-knowledge-rules-authorization.md)
- [ADR-030 — AI Coordinator Separation](../00-governance/ADR/ADR-030-ai-coordinator-separated-orchestration.md)
- [ADR-034 — Explicit Tenant and Resource Scope](../00-governance/ADR/ADR-034-explicit-tenant-and-resource-scope.md)
- [ADR-036 — Contract-First API Architecture](../00-governance/ADR/ADR-036-contract-first-api-architecture.md)
- [ADR-037 — Context-Preserving Navigation](../00-governance/ADR/ADR-037-context-preserving-navigation.md)

## 11. References to the Approved Proposal

- [Core Platform Architecture Proposal v0.2](../02-CORE-PLATFORM-ARCHITECTURE-PROPOSAL.md)
- Identity and Access component: proposal section 5.
- Authorization Context and API contracts: proposal section 5.4.
- Navigation route guards: proposal Navigation Architecture.
- Mandatory ownership and scope rules: proposal section 7.
- Governing decisions: ADR-CP-009, ADR-CP-010, ADR-CP-013, ADR-CP-018, ADR-CP-019, and ADR-CP-020.

## 12. References to Wave 1

- [Wave 1 README](README.md)
- [Core Platform Vision](01-CORE-PLATFORM-VISION.md)
- [Core Platform Architecture](02-CORE-PLATFORM-ARCHITECTURE.md)
- [Core Platform Domain Model](03-DOMAIN-MODEL.md)
- [Wave 2 Data Ownership](04-DATA-OWNERSHIP.md)
