# Contract: Onboarding Stepper Component

**Feature**: 041-core-platform-ux-alignment
**Date**: 2026-06-03
**Location**: `apps/core-platform/components/onboarding/OnboardingStepper.tsx`

---

## Props

```ts
interface OnboardingStepperProps {
  currentStep: 1 | 2 | 3 | 4;
}
```

## Visual Requirements

- Renders a single horizontal row
- 4 step nodes connected by 3 lines
- Each node: 40×40 circle + step label below

### Step node states

| State | Condition | Circle style | Icon |
|-------|-----------|-------------|------|
| Completed | `step < currentStep` | `bg-blue-600/30 text-blue-400` | `<Check>` lucide icon (16×16) |
| Active | `step === currentStep` | `bg-blue-600 text-white` | Step number |
| Upcoming | `step > currentStep` | `border border-white/20 text-white/30` | Step number |

### Connecting line states

| State | Condition | Style |
|-------|-----------|-------|
| Active/completed | `step <= currentStep` | `bg-blue-500/40 h-px flex-1` |
| Upcoming | `step > currentStep` | `bg-white/10 h-px flex-1` |

Lines render **between** nodes (not before the first or after the last).

### Step labels

Small monospaced text below each circle:
- Active: `text-white`
- Completed: `text-blue-400`
- Upcoming: `text-white/30`

Labels: "Language", "Workspace", "Business Unit", "Main Branch"

## Immutability

The stepper is a **pure display component** — it MUST NOT read sessionStorage or own any state. All state is passed via `currentStep` prop from the parent `OnboardingPage`.

## RTL compliance

The stepper row MUST use logical CSS properties so connecting lines and node order flow correctly in both LTR and RTL. Alternatively, since numbers are fixed (1→4), the order does not visually reverse — but margin/padding MUST use logical properties.
