# Accessibility Authority

| Field | Value |
|---|---|
| Version | 1.0 reconciliation candidate |
| Status | Canonical cross-experience accessibility authority candidate |
| Owner | Product Design and Accessibility; each application owns conformance in its UI |
| Target | WCAG 2.2 Level AA, as already stated by Design DNA and the accessibility checklist |

## 1. Purpose

Define testable accessibility outcomes for every NexoraXS user-facing experience without selecting
component implementations or changing domain behavior.

## 2. Scope

Public, authentication, Core, Business Architect, Guided Activation, Business Blueprint, Insight,
Recommendation, Product Hub, and OS handoff experiences, plus reusable Design System behavior.

## 3. Out of Scope

Component code, testing libraries, assistive-technology product selection, exceptions not approved
through Governance, or Operating System domain behavior.

## 4. Conformance Baseline

The target is WCAG 2.2 Level AA. A future specification must identify applicable success criteria,
manual and automated evidence, and any stricter legal or market requirement. An exception requires
explicit owner review and cannot be created by a mock, wireframe, or backlog entry.

## 5. Perceivable Requirements

- Text and controls meet applicable contrast requirements in all themes and states.
- Color is never the only carrier of status, confidence, provenance, validation, risk, readiness,
  selection, or Recommendation meaning.
- Content remains readable and operable at browser zoom and responsive reflow required by WCAG.
- Images and informative icons have appropriate text alternatives; decorative media is hidden from
  assistive technology.
- Charts, readiness indicators, Insight surfaces, and comparisons provide equivalent summaries,
  values, relationships, and access to supporting detail.
- Language and direction are declared for page and inline language changes.

## 6. Operable Requirements

- All actions are keyboard-operable without timing-dependent pointer gestures.
- Focus order follows semantic reading and action order in both LTR and RTL.
- Focus is clearly visible and not obscured by sticky headers, dialogs, banners, or navigation.
- Dialogs and drawers move focus intentionally, contain it when modal, support an expected close
  action, and return focus to the logical origin.
- Skip navigation or equivalent bypass is available where repeated blocks exist.
- Motion respects reduced-motion preference and is never required to understand progress.
- Drag, swipe, or spatial actions have non-gesture alternatives.

## 7. Understandable Requirements

- Headings and landmarks describe the page hierarchy and context.
- Every field has a persistent label; placeholders do not replace labels.
- Instructions appear before the affected action and identify required format or consequence.
- Validation identifies the field, problem, and recovery; a summary links to affected fields for
  multi-error submission.
- Status changes use appropriate live-region treatment without excessive interruption.
- Destructive or consequential actions explain impact, require explicit confirmation where needed,
  and never use ambiguous “Continue” as Business DNA publication approval.
- Timeout/session-expiry warnings provide sufficient notice and a safe extension or recovery path
  when permitted; expired work is explained without promising retention that is not governed.

## 8. Robust Requirements

- Controls expose correct names, roles, values, states, relationships, and disabled reasons.
- Semantic elements are preferred over visual imitations.
- Dynamic content, errors, loading completion, and asynchronous results are announced appropriately.
- Localization and RTL changes do not alter semantic order or accessible names incorrectly.
- Permission-denied content does not leak protected names, evidence, or context.

## 9. Foundation-Specific Communication

### Confidence and provenance

Confidence must use text or an accessible value, not color alone. Evidence/source access must have a
descriptive name and preserve the distinction among Observed Fact, Inference, Assessment, Need,
Desired Outcome, and Recommendation.

### Candidate review and publication

Review regions must be navigable by heading, corrections must identify what changes, and explicit
approval must be distinguishable from ordinary navigation. Validation or permission failure returns
focus to an understandable summary or affected control.

### Blueprint and Recommendation

Blueprint sections expose their projection status and source context. Recommendation reasoning,
alternatives, uncertainty, and “no product” outcomes are available to screen readers. Charts and
visual priority/risk cues include textual equivalents.

## 10. Responsive and Directional Requirements

- Content reflows without two-dimensional scrolling except where the content itself requires it and
  an accessible alternative is provided.
- Touch targets and spacing remain usable without removing keyboard behavior.
- RTL mirrors layout and directional affordances where meaning changes; timelines, numbers, logos,
  media controls, and inherently directional data are reviewed rather than blindly mirrored.
- Focus and DOM order remain logical independent of CSS visual reordering.

## 11. Evidence Required by Future Specifications

- keyboard-only critical-flow walkthrough;
- focus order, visibility, trap, and return checks;
- semantic/accessible-name inspection;
- screen-reader checks for critical flows and dynamic status;
- zoom/reflow and mobile viewport checks;
- English/LTR and Arabic/RTL checks;
- contrast and non-color meaning checks;
- reduced-motion check;
- automated accessibility scan plus documented manual verification; and
- recovery/timeout/permission behavior for applicable critical flows.

## 12. Relationships

Accessibility requirements apply to [Platform Experience](./01-PLATFORM-EXPERIENCE.md), [User
Flows](./06-USER-FLOWS.md), [Wireframes](./08-WIREFRAMES.md), [Localization](./10-LOCALIZATION.md),
and every [Design System](../04-design-system/README.md) foundation, component, template, and pattern.

## 13. Open Questions

Market-specific legal standards, supported assistive-technology test matrix, and exception approval
workflow require future Governance/quality definition. They do not reduce WCAG 2.2 AA now.

## 14. Verified Against and Cross References

- `docs/10-design-intelligence/02-DESIGN-DNA.md` (WCAG 2.2 AA target)
- `docs/10-design-intelligence/06-ACCESSIBILITY-CHECKLIST.md`
- `AGENTS.md` section 12
- [Design Foundations](../04-design-system/01-DESIGN-FOUNDATIONS.md)
- [Interaction Patterns](../04-design-system/05-INTERACTION-PATTERNS.md)
