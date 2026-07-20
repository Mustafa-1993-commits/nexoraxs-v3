# UI Copy Guidelines

| Field | Value |
|---|---|
| Version | 1.0 reconciliation candidate |
| Status | Canonical UI copy authority candidate |
| Owner | Product Content and Localization |

## 1. Purpose

Define reusable language rules for accurate, respectful, accessible, and bilingual NexoraXS
experiences without prescribing every final string.

## 2. Scope

Labels, instructions, calls to action, confidence/provenance explanations, approval and correction
language, loading/empty/error/success/warning messages, and customer-facing canonical terminology.

## 3. Out of Scope

Marketing campaigns, canonical renaming, translation implementation, user-data translation,
complete screen copy, domain decisions, or permission/contract definitions.

## 4. Product Voice

Copy is clear, calm, specific, respectful, and evidence-aware. It states what is known, inferred,
unavailable, or required. It does not exaggerate automation, certainty, readiness, benefit, or
product necessity.

Use short direct sentences and concrete actions. Explain consequences before consequential actions.
Avoid blame, urgency manipulation, opaque “smart” language, and claims that the platform “decided”
for the customer.

## 5. Confidence, Evidence, and AI

- Distinguish Observed Fact, Inference, Business Assessment, Business Need, Desired Outcome, and
  Recommendation in customer-appropriate language without collapsing their meaning.
- State confidence in understandable terms and provide accessible detail where material.
- Describe evidence or Original Source and its freshness/provenance where available.
- Say when information is insufficient or contradictory.
- Disclose AI-assisted explanation or suggestion where applicable; never imply AI owns a canonical
  fact, authorization, or consequential action.
- Do not label deterministic owner output as AI merely to add marketing appeal.

## 6. Recommendation Language

Recommendation copy starts with the Business Need or Desired Outcome, then capability, options,
evidence, assumptions, alternatives, risk, confidence, and expected benefit. A NexoraXS product is
identified as a NexoraXS option, not as the inevitable answer.

Allowed patterns include:

- “Based on the reviewed information, this may help with …”
- “You can keep your current tool, compare another option, or explore this capability.”
- “We do not have enough evidence to recommend a change yet.”

Avoid “You must buy”, “The platform has decided”, “Guaranteed result”, or copy that hides a no-product
outcome.

## 7. Explicit Approval and Correction

- Approval labels name the canonical consequence, for example “Approve and publish Business DNA
  v1” when that exact action is later specified and authorized.
- “Next”, “Continue”, “Done”, account creation, or review completion must not stand in for publication
  approval.
- Correction copy explains whether the customer is correcting temporary candidate material,
  requesting an owner-governed revision, or only changing presentation preferences.
- A failed publication action must not be worded as success; preserve the reviewed candidate and
  explain the next valid action.

## 8. State Copy

| State | Copy rule |
|---|---|
| Loading | Name the content/action and avoid fake precision or indefinite silent activity |
| Empty | Explain why no item exists, whether that is valid, and the next permitted action |
| Error | State what failed, the effect, what was preserved, and a safe recovery action |
| Validation | Identify the field or prerequisite, the issue, and how to correct it |
| Permission | State that access is unavailable without revealing protected details |
| Success | Name the completed owner-confirmed outcome; do not overclaim downstream readiness |
| Warning | Name the risk and consequence before the action; do not rely on color |
| Stale/conflict | Explain that information changed and requires refresh/review |
| Offline/degraded | Explain unavailable behavior and never promise a queued write unless authorized |

## 9. Destructive and Consequential Actions

Use specific verbs and objects, state scope and reversibility, identify consequences, and require
confirmation where risk demands it. Avoid vague labels such as “Yes”, “Proceed”, or “Confirm” when a
more specific action can be named. Undo is offered only when the owner guarantees it.

## 10. Canonical Terminology Rules

| Concept | Required UI meaning | Forbidden ambiguity |
|---|---|---|
| Workspace | Customer/tenant boundary containing Businesses | Synonym for Business or typed industry workspace |
| Business | Legal/operational organization inside one Workspace | Synonym for Business Unit |
| Business DNA | Canonical, Business-scoped, governed, versioned understanding | Report, account profile, Blueprint, or form answers |
| Business Discovery | Method-independent capability for knowledge gaps | Chatbot, questionnaire, or mandatory route |
| Business Architect | Governed authenticated selected-Business pipeline | Public Discovery, registration, Product Hub, or OS setup |
| Guided Activation | Post-publication continuation of the governed pipeline | OS onboarding or Business Architect replacement |
| Business Blueprint | Governed authenticated customer-facing projection | “Canonical Blueprint”, database, source of truth, or owner |
| Business Insight | Conceptual responsibility inside Business Brain Decision | Separate service/write model/owner |
| Recommendation | Optional capability-first advice | Requirement, auto-action, or guaranteed outcome |
| Product Hub | Core composition and handoff destination | Subscription owner, OS setup, or operational system |
| Core Workspace Ready | Core owner-reported readiness | Operating System Ready |
| Operating System Ready | OS owner-reported readiness | Subscription, installation, or Core readiness |

Use the canonical glossary spelling/capitalization in governance-sensitive contexts. Customer-facing
plain language may differ only when traceably mapped and not misleading.

## 11. Arabic and English Parity

- Write for meaning, not word-for-word symmetry; both locales must preserve consequence, confidence,
  evidence, permission, and customer choice.
- Avoid idioms, gender assumptions, culture-specific metaphors, concatenated fragments, and layouts
  that require equal string length.
- Arabic strings use appropriate grammar and RTL context; embedded identifiers, numbers, URLs, and
  user-entered content retain appropriate direction.
- Accessible names, status announcements, validation, and alternative text receive the same parity
  as visible labels.
- Translation fallback must never turn a consequential action into a vague or misleading label.

## 12. Examples

| Avoid | Prefer |
|---|---|
| “AI completed your business profile.” | “Review the information inferred from the available evidence.” |
| “Your Blueprint is now the source of truth.” | “Your Business Blueprint presents governed information derived from Business DNA and owner outputs.” |
| “Activate Commerce.” | “Continue to Commerce setup” or “Open Commerce”, according to owner-reported state |
| “Success!” | “Business DNA v1 was published for this Business.” when owner-confirmed |
| “No results.” | “No recommendation is available for the reviewed need. You can keep your current approach or return later.” |

## 13. Relationships

This authority depends on the [Glossary](../00-governance/glossary/GLOSSARY.md), [Platform
Experience](./01-PLATFORM-EXPERIENCE.md), [Accessibility](./09-ACCESSIBILITY.md),
[Localization](./10-LOCALIZATION.md), and [Interaction Patterns](../04-design-system/05-INTERACTION-PATTERNS.md).

## 14. Open Questions

The final bilingual terminology review, formal Arabic style guide, support-tone escalation, and
legal copy ownership remain future content-governance work.

## 15. Verified Against and Cross References

- `docs/99-architecture-freeze/CORE-PLATFORM-v1.1-FREEZE.md`
- `docs/01-genesis/02-CONSTITUTION.md`
- `docs/00-governance/glossary/GLOSSARY.md`
- `docs/00-governance/ADR/ADR-013-capability-first-explainable-recommendations.md`
- `docs/00-governance/ADR/ADR-014-human-control-over-recommendations-and-ai.md`
- `docs/00-governance/ADR/ADR-041-global-localization-internationalized-representation.md`
