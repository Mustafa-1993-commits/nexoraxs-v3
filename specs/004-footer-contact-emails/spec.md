# Feature Specification: Footer Contact Emails

**Feature Branch**: `004-footer-contact-emails`
**Created**: 2026-05-12
**Status**: Draft
**Scope**: `apps/landing/src/sections/footer/footer.tsx` only — no backend, no packages, no other files

---

## User Scenarios & Testing

### User Story 1 — Visitor Finds Contact Information in the Footer (Priority: P1)

A visitor who has reached the bottom of the landing page and wants to get in
touch with NexoraXS can immediately see the contact email addresses without
navigating away from the page. They can tap or click any address to open
their email client.

**Why this priority**: Contact information in the footer is the primary
self-service path for pre-sales, support, and billing enquiries. Its absence
means lost leads and unresolved support requests.

**Independent Test**: Scroll to the footer on any device. A "Contact" column
or section is visible with three labelled email addresses. Clicking or tapping
any address opens the system email client with the address pre-filled.

**Acceptance Scenarios**:

1. **Given** a visitor reaches the footer, **When** they look for contact
   information, **Then** they see three email addresses — `info@nexoraxs.com`,
   `support@nexoraxs.com`, and `billing@nexoraxs.com` — clearly labelled and
   visually distinct.

2. **Given** a visitor taps `info@nexoraxs.com`, **When** the tap registers,
   **Then** their device opens the default email client with the address
   `info@nexoraxs.com` pre-filled in the "To" field.

3. **Given** a visitor is on a mobile device, **When** they view the footer,
   **Then** the contact emails are readable and tappable without horizontal
   overflow or layout breakage.

4. **Given** a visitor is on desktop, **When** they hover over an email link,
   **Then** the link shows a hover state consistent with the existing footer
   link style.

---

### Edge Cases

- What if the visitor's device has no email client configured? The `mailto:`
  link will have no visible effect — this is acceptable browser-native
  behaviour.
- What if the email addresses are very long on a small screen? The footer
  layout must not overflow horizontally; email text may wrap if needed.

---

## Requirements

### Functional Requirements

- **FR-001**: The footer MUST display the email address `info@nexoraxs.com`
  as a clickable `mailto:` link.

- **FR-002**: The footer MUST display the email address `support@nexoraxs.com`
  as a clickable `mailto:` link.

- **FR-003**: The footer MUST display the email address `billing@nexoraxs.com`
  as a clickable `mailto:` link.

- **FR-004**: The three email addresses MUST be grouped under a clearly
  labelled heading (e.g. "Contact") within the footer's existing link-group
  structure.

- **FR-005**: The visual style of the email links MUST be consistent with
  the existing footer navigation links (same font size, colour, and hover
  behaviour).

- **FR-006**: The footer layout MUST remain correct on mobile (≥ 375px) and
  desktop (≥ 1280px) after the change.

- **FR-007**: No new packages MAY be installed. No other files MAY be
  modified. No backend or API calls are involved.

### Key Entities

- **Contact email link**: An `<a href="mailto:address">` element rendered
  within the footer's existing link-group grid.

---

## Success Criteria

### Measurable Outcomes

- **SC-001**: All three email addresses are visible in the footer on both
  mobile and desktop.

- **SC-002**: Each email address is a working `mailto:` hyperlink.

- **SC-003**: The footer layout shows no horizontal overflow at 375px width.

- **SC-004**: A production build (`pnpm build`) completes with zero
  TypeScript errors and zero ESLint errors.

---

## Assumptions

- The existing footer uses a link-group grid pattern. The contact emails will
  be added as a new group within that same structure.
- The "Company" link group in the existing footer already contains an "About"
  and "Contact" placeholder — the new group will be distinctly named (e.g.
  "Contact Us" or replace/extend the existing Company group) to avoid
  duplication. The exact label is an implementation decision.
- No email validation, form, or submission logic is required — raw `mailto:`
  links only.
- The existing desktop layout has three link-group columns; adding a fourth
  group or extending an existing one is acceptable as long as the layout
  remains clean.
