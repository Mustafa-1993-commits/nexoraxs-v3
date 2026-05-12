# Feature Specification: Landing Page Mobile Polish

**Feature Branch**: `002-mobile-polish`
**Created**: 2026-05-12
**Status**: Draft
**Scope**: `apps/landing` only — responsiveness fixes only, no redesign, no new packages, no colour changes

---

## User Scenarios & Testing

### User Story 1 — Mobile Visitor Navigates the Page (Priority: P1)

A visitor opens nexoraxs.com on a smartphone (375px–428px wide). They can
read the navbar, open the mobile menu, tap any link, and reach the hero
content without encountering horizontal scroll or broken layouts.

**Why this priority**: Navigation is the first interaction on every page visit.
A broken navbar on mobile blocks everything else.

**Independent Test**: Open the page at 375px width. Verify the navbar logo is
appropriately sized, the hamburger menu opens and closes smoothly, all menu
links and the "Get Started" button are tappable (minimum 44px touch target),
and no horizontal scrollbar appears.

**Acceptance Scenarios**:

1. **Given** a visitor opens the page on a 375px screen, **When** the page
   loads, **Then** the navbar logo is visible and not oversized, and the
   hamburger icon is visible on the right.

2. **Given** a visitor taps the hamburger icon, **When** the menu opens,
   **Then** all nav links (Features, Apps, Pricing, FAQ) and the "Get Started"
   button are visible, each at least 44px tall and full-width.

3. **Given** the mobile menu is open, **When** a visitor taps any nav link,
   **Then** the menu closes and the page scrolls to the correct section.

4. **Given** any screen width from 375px to 1280px, **When** the page loads,
   **Then** no horizontal scrollbar appears on any section.

---

### User Story 2 — Mobile Visitor Reads the Hero Section (Priority: P1)

A visitor on a mobile device sees the hero content in a single readable
column without the illustration overflowing or the headline being too large
to fit comfortably.

**Why this priority**: The hero is the primary value-proposition section.
Layout breakage here kills first impressions.

**Independent Test**: At 375px width, the hero renders as a single column —
headline, subheadline, then buttons stacked vertically. The headline text is
large but fully contained with no overflow. The illustration appears below
the text or is hidden on the smallest screens.

**Acceptance Scenarios**:

1. **Given** a visitor views the hero at 375px width, **When** they read it,
   **Then** the headline is a single column at a comfortable size (approximately
   `text-4xl` / 36px), fully readable without horizontal overflow.

2. **Given** a visitor views the CTA buttons on mobile, **When** they look at
   them, **Then** the buttons stack vertically and are each easy to tap.

3. **Given** a visitor views the page at any viewport from 375px to 767px,
   **When** the hero renders, **Then** no two-column grid is applied and the
   content does not overflow its container.

---

### User Story 3 — Mobile Visitor Browses Feature and App Cards (Priority: P2)

A visitor scrolling through Features and Apps sections on mobile sees cards
stacked in a single column, with comfortable padding, readable text, and no
horizontal overflow.

**Why this priority**: These sections are the product proof. Unreadable cards
reduce confidence in the product.

**Independent Test**: At 375px width, Features shows 1 card per row and Apps
shows 1–2 cards per row, all with readable text, no cropped content, and no
horizontal scrollbar.

**Acceptance Scenarios**:

1. **Given** a mobile visitor reaches the Features section, **When** they
   scroll through it, **Then** each card occupies the full column width,
   icons and text are fully visible, and padding feels comfortable.

2. **Given** a mobile visitor reaches the Apps section, **When** they scroll,
   **Then** cards stack with no content cropped, badges are visible and
   readable, and no card overflows the screen edge.

---

### User Story 4 — Mobile Visitor Reviews Pricing, FAQ, and Footer (Priority: P3)

A visitor reaches the bottom sections on mobile. The Pricing card is centred
and readable, FAQ items are tappable and expand cleanly, and the Footer links
stack vertically.

**Why this priority**: These sections close the conversion funnel. Broken
layouts here break trust just before the decision point.

**Independent Test**: At 375px width — Pricing card fits within the screen
with no overflow; FAQ chevron and text are tappable; Footer logo and links
stack vertically and are readable.

**Acceptance Scenarios**:

1. **Given** a mobile visitor views the Pricing section, **When** they see
   the card, **Then** it fits within the viewport, the "Get Started Free"
   button spans the full card width, and all text is readable.

2. **Given** a mobile visitor taps a FAQ question, **When** the accordion
   expands, **Then** the answer text is fully readable within the screen
   width with no overflow.

3. **Given** a mobile visitor reaches the Footer, **When** they view it,
   **Then** the logo is visible, link groups stack vertically or in a
   2-column grid, and the copyright line is readable.

---

### Edge Cases

- What happens on a 320px screen (smallest common mobile width)? All content
  must remain readable with no horizontal scroll.
- What happens when a very long FAQ answer is expanded on mobile? Text wraps
  cleanly within the container.
- What happens when the viewport is between 640px and 768px (large phones /
  small tablets)? Layouts must transition gracefully between mobile and
  tablet breakpoints.

---

## Requirements

### Functional Requirements

- **FR-001**: The navbar MUST NOT produce horizontal scroll at any viewport
  width from 320px upward.

- **FR-002**: The mobile menu MUST display all nav links and the "Get Started"
  button with a minimum tap target height of 44px per item.

- **FR-003**: The "Get Started" button in the mobile menu MUST span the full
  available width.

- **FR-004**: The hero section MUST render as a single column at viewport
  widths below 768px, with the headline font no larger than `text-4xl` on
  mobile.

- **FR-005**: Hero CTA buttons MUST stack vertically on mobile viewports.

- **FR-006**: Feature cards MUST stack to a single column on mobile
  (viewport < 640px).

- **FR-007**: App cards MUST stack with no horizontal overflow at 375px width.
  "Coming Soon" badges MUST remain fully visible.

- **FR-008**: The Pricing card MUST be centred, fit within the viewport at
  375px, and its CTA button MUST be full-width on mobile.

- **FR-009**: FAQ items MUST have a minimum tap target height of 44px and
  their answers MUST wrap within the viewport with no horizontal overflow.

- **FR-010**: The Footer MUST stack its link groups vertically or in a
  2-column grid on mobile with no horizontal overflow.

- **FR-011**: All sections MUST use responsive horizontal padding: `px-4`
  on mobile, `px-6` on tablet (md), and at least `px-6` on desktop.

- **FR-012**: No section MUST produce a horizontal scrollbar on a 375px
  viewport.

- **FR-013**: All interactive elements (nav links, buttons, FAQ toggles)
  MUST have a minimum touch target of 44×44px on mobile.

### Key Entities

- **Section**: Each of the 7 page sections (Navbar, Hero, Features, Apps,
  Pricing, FAQ, Footer) — each gets independent responsiveness fixes.
- **Touch Target**: Any tappable element; MUST meet the 44px minimum height
  or width on mobile.
- **Breakpoint**: Mobile < 640px, Tablet 640px–1024px, Desktop > 1024px.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: At 375px viewport width, no horizontal scrollbar appears on
  any section of the page.

- **SC-002**: At 320px viewport width, all text content remains readable
  and fully contained within the viewport.

- **SC-003**: The navbar mobile menu opens and closes correctly, with all
  interactive items meeting the 44px touch target minimum.

- **SC-004**: The hero section renders as a single column at 375px with
  no layout overflow.

- **SC-005**: All card sections (Features, Apps) display in a single column
  at 375px with no cropped or overflowing content.

- **SC-006**: The Pricing CTA button is full-width on mobile.

- **SC-007**: All FAQ items expand and collapse with no overflow at 375px.

- **SC-008**: A production build (`pnpm build`) completes with zero
  TypeScript errors and zero ESLint errors.

---

## Assumptions

- The existing desktop layout (≥ 1024px) is correct and MUST NOT be changed.
- No new npm packages will be installed; all fixes use existing TailwindCSS
  utility classes already in the project.
- Colors, branding, and visual identity are out of scope — only layout and
  spacing are adjusted.
- The CoreIllustration component may be hidden on the smallest mobile screens
  if it causes overflow, since the text content is the primary value on mobile.
- The SplashScreen component is already responsive (full-screen fixed overlay)
  and requires no changes.
- Section background colors and border styles are out of scope.
