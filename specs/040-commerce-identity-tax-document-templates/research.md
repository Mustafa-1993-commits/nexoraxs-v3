# Research: Commerce Identity, Tax & Document Templates

**Feature**: 040-commerce-identity-tax-document-templates
**Date**: 2026-06-03
**Status**: Complete — all decisions resolved

---

## Decision 1: Settings navigation pattern

**Decision**: Sub-route group under `/settings/` with a shared `layout.tsx` that renders a `SettingsNav` horizontal tab component.

**Rationale**: The existing settings page lives at `app/(app)/settings/page.tsx`. Adding `layout.tsx` at `app/(app)/settings/layout.tsx` wraps all settings routes (`/settings`, `/settings/identity`, `/settings/tax`, etc.) with the tab navigation without touching the existing page content. This is idiomatic Next.js App Router; no existing route is broken.

**Alternatives considered**:
- Single long scrolling `/settings` page with anchor links — rejected because Document Templates needs a full-height split-pane layout (selector + preview) that does not work well on a long scroll page.
- New top-level pages (`/identity`, `/tax`, `/invoicing`, `/templates`) — rejected because they have no shared layout context and would require duplicating the settings heading pattern.

---

## Decision 2: Session storage key scheme

**Decision**: Namespaced keys following the existing `lib/locale.ts` pattern:
```
commerce:identity      → BusinessIdentity object (JSON)
commerce:tax           → TaxSettings object (JSON)
commerce:invoicing     → InvoiceNumbering object (JSON)
commerce:template:{type} → DocumentTemplatePreference per type (JSON)
```
Custom DOM events for reactive updates:
```
nexoraxs:identity-change
nexoraxs:tax-change
nexoraxs:invoicing-change
nexoraxs:template-change
```

**Rationale**: The existing `lib/locale.ts` uses sessionStorage + custom events and works reliably across the app. Replicating the same `getX() / setX() / subscribeToX()` pattern in a new `lib/settings-store.ts` keeps the codebase consistent and avoids introducing a state management library.

**Alternatives considered**:
- React Context / Zustand — rejected; adds a dependency for a mock-phase feature; sessionStorage pattern already proven in the codebase.
- URL search params — rejected; settings values are too large and private for URL encoding.

---

## Decision 3: Document template preview rendering

**Decision**: HTML/CSS div-based rendering inside a fixed-width scrollable container that simulates the document dimensions. No PDF engine, no canvas, no iframe.

**Rationale**: The spec explicitly says "do not build a full PDF engine yet." A div-based preview with Tailwind classes is sufficient to show the owner what their document will look like. The `DocumentPreview` component receives props (business identity snapshot, template type, style, mock cart) and renders a styled div tree.

**Template dimension simulation:**
- 58mm receipt: max-width ~220px, small font, compact spacing
- 80mm receipt: max-width ~302px, medium font
- A4 invoice: max-width ~794px (A4 at 96 dpi), full invoice layout
- Refund receipt: same as 80mm but with refund-specific copy

**Alternatives considered**:
- Using `react-pdf` — rejected; premature; spec explicitly defers PDF generation.
- `<iframe>` with HTML string — rejected; adds complexity and CSP concerns without benefit at mock stage.

---

## Decision 4: Live preview update mechanism

**Decision**: `DocumentTemplatesPanel` holds the selected template type and style in local React state. `DocumentPreview` is a pure component receiving these as props plus a `businessIdentity` snapshot read from the session store. Style changes update state immediately; no debounce needed.

**Rationale**: The preview needs to update within 1 second (SC-004). Local React state updates are synchronous and re-render within a frame. Reading from sessionStorage on the same tick is acceptable at this scale.

---

## Decision 5: Sidebar "Taxes" nav item

**Decision**: Enable the existing "Taxes" entry in `configure` nav array in `Sidebar.tsx` by changing `href: "#", disabled: true` to `href: "/settings/tax", disabled: false`.

**Rationale**: The Taxes nav item already exists as a disabled placeholder. Enabling it to point to `/settings/tax` is the minimal change that gives users a direct path to tax configuration from the sidebar.

---

## Decision 6: SettingsNav tab design

**Decision**: Horizontal tab bar rendered in the `settings/layout.tsx` with five tabs:

| Tab | Route | Icon |
|-----|-------|------|
| General | /settings | settings |
| Identity | /settings/identity | building-2 |
| Tax | /settings/tax | percent |
| Invoicing | /settings/invoicing | hash |
| Templates | /settings/templates | file-text |

Active tab is determined by the current pathname (`usePathname()`). The tab bar sits between the page header and the page content area.

---

## Decision 7: Business Identity form validation

**Decision**: Required fields: Display Name, Phone, Email, Address. All others optional. Client-side validation only (no server). Email validated with a basic format check. Save is blocked if required fields are empty. Inline error messages per field.

**Form state**: Controlled React state; on save, writes to session store and shows a success toast/badge.

---

## Decision 8: Tax rate input constraints

**Decision**: Number input with `min=0`, `max=100`, `step=0.01`. Displays as a percentage. If Tax Registered is OFF, the field is rendered but disabled (not hidden) so users can see the rate that will be used when they re-enable it.

**Rationale**: The spec says "disabled or hidden." Disabling is preferred because hiding loses context; a re-enabled business may wonder what rate is set.

---

## Decision 9: Invoice numbering example format

**Decision**: Zero-padded to 4 digits, separated by a dash: `{PREFIX}-{NUMBER:04d}`. Examples:
- Prefix "RCP", starting 1 → "RCP-0001"
- Prefix "INV", starting 100 → "INV-0100"
- If prefix is empty: "-0001" (shows the number alone with dash)

The example updates on every keystroke using React controlled state (no debounce).

---

## Decision 10: Document template mock cart data

**Decision**: Fixed mock data defined in `lib/mock-data/preview-cart.ts`:
```
Line 1: Product A × 2  @ 50.00  = 100.00
Line 2: Product B × 1  @ 30.00  =  30.00
Line 3: Product C × 3  @ 15.00  =  45.00
Subtotal:  175.00
Discount:  10% off = 17.50
After discount: 157.50
Tax: saved tax rate (or 15% default) on 157.50
Total: calculated
```

Discount is always applied before tax (per spec FR-014 / architecture rule).

---

## Decision 11: RTL readiness approach

**Decision**: Use Tailwind CSS logical properties throughout all new settings components:
- `ps-*` / `pe-*` instead of `pl-*` / `pr-*`
- `ms-*` / `me-*` instead of `ml-*` / `mr-*`
- `text-start` / `text-end` instead of `text-left` / `text-right`
- `border-s-*` / `border-e-*` for directional borders

The document preview container gets `dir={locale === "ar" ? "rtl" : "ltr"}` set on its wrapper so the preview renders correctly for the active language.

**Rationale**: The locale system from spec 038 already tracks the active locale. Reading it in the preview component enables RTL switching without a separate stylesheet.

---

## Decision 12: Logo upload UX

**Decision**: A dashed placeholder box with an upload icon and "Upload Logo" label. Clicking opens a file picker (native `<input type="file" accept="image/*">`). When a file is selected, the file name is shown as a badge and a placeholder div displays the initials of the business display name as a visual stand-in. No file is actually stored (mock state only). The document preview uses the initials placeholder when no logo is present.

---

## Decision 13: i18n string pattern

**Decision**: All new user-facing strings are added to the locale structure following the pattern established in spec 038 (English + Arabic key-value pairs). Locale keys for this feature are namespaced under `settings.*`:
```
settings.identity.title
settings.identity.displayName
settings.tax.title
settings.tax.registered
settings.invoicing.title
settings.templates.title
...
```
Components read locale via the existing `getLocale()` and subscribe via `subscribeToLocale()`.

---

## Decision 14: Template style visual differences

**Decision**:
- **Minimal**: Business name + logo only, item list with no separators, plain total line. Minimal whitespace. Mono font for amounts.
- **Classic**: Business name + logo + address, item list with divider lines, subtotal/tax/total in a table. Receipt-style layout.
- **Detailed**: Full header (name + address + tax number + CR number), itemized list with quantity/unit price/total columns, discount line, tax line, total, footer note. Tax invoice ready.

The 58mm and 80mm receipts use the Minimal/Classic/Detailed distinction. The A4 Tax Invoice and Refund Receipt always use the Detailed layout by default (their business use case demands it), but still allow style selection for visual density.

---

## Summary of Files Touching

| File | Action | Reason |
|------|--------|--------|
| `app/(app)/settings/layout.tsx` | Create | Settings sub-nav wrapper |
| `app/(app)/settings/identity/page.tsx` | Create | Business Identity page |
| `app/(app)/settings/tax/page.tsx` | Create | Tax Settings page |
| `app/(app)/settings/invoicing/page.tsx` | Create | Invoice Numbering page |
| `app/(app)/settings/templates/page.tsx` | Create | Document Templates + preview |
| `components/settings/SettingsNav.tsx` | Create | Tab navigation |
| `components/settings/BusinessIdentityForm.tsx` | Create | Form component |
| `components/settings/TaxSettingsForm.tsx` | Create | Form component |
| `components/settings/InvoiceNumberingForm.tsx` | Create | Form + live example |
| `components/settings/DocumentTemplatesPanel.tsx` | Create | Selector component |
| `components/settings/DocumentPreview.tsx` | Create | Preview renderer |
| `lib/settings-store.ts` | Create | Session persistence helpers |
| `lib/mock-data/preview-cart.ts` | Create | Mock cart for preview |
| `components/dashboard/Sidebar.tsx` | Modify | Enable Taxes nav item |
