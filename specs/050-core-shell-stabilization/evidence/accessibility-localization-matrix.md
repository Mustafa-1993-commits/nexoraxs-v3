# Feature 050 Accessibility and Localization Matrix

**Execution date**: 2026-07-14  
**Automated reviewer**: Implementation agent  
**Automated environment**: Linux 6.6.114.1-microsoft-standard-WSL2 x64; Chromium 149.0.7827.55; Playwright 1.61.0; Core production build; one worker  
**Required manual environment**: Windows, current-stable NVDA, and current-stable Google Chrome, with exact versions recorded at execution time

This record covers the bounded Core Platform shell only. It does not claim production
authorization, backend availability, or canonical Business migration. Automated role, Axe,
keyboard, direction, theme, motion, geometry, and storage checks supplement but do not replace the
manual screen-reader gate.

## Base locale, theme, and viewport matrix

Command:

```bash
pnpm exec playwright test --config=playwright.core.config.ts --grep 'shell at [0-9]+px'
```

Each row used the valid legacy-compatible fixture, the same mixed Arabic/Latin Workspace,
BusinessUnit, and Branch display names, and verified language/direction/theme effects, one banner,
one named primary navigation, one main, preserved organization text, no horizontal page overflow,
visible focus, primary topbar targets of at least 44 by 44 CSS pixels, and zero critical/serious Axe
findings in the rendered Core shell journey.

| Locale | Direction | Theme | Width | Result | Evidence |
|---|---|---|---:|---|---|
| English | LTR | Light | 375 | PASS | `T041-T044 … en light shell at 375px` |
| English | LTR | Light | 768 | PASS | `T041-T044 … en light shell at 768px` |
| English | LTR | Light | 1024 | PASS | `T041-T044 … en light shell at 1024px` |
| English | LTR | Light | 1440 | PASS | `T041-T044 … en light shell at 1440px` |
| English | LTR | Dark | 375 | PASS | `T041-T044 … en dark shell at 375px` |
| English | LTR | Dark | 768 | PASS | `T041-T044 … en dark shell at 768px` |
| English | LTR | Dark | 1024 | PASS | `T041-T044 … en dark shell at 1024px` |
| English | LTR | Dark | 1440 | PASS | `T041-T044 … en dark shell at 1440px` |
| Arabic | RTL | Light | 375 | PASS | `T041-T044 … ar light shell at 375px` |
| Arabic | RTL | Light | 768 | PASS | `T041-T044 … ar light shell at 768px` |
| Arabic | RTL | Light | 1024 | PASS | `T041-T044 … ar light shell at 1024px` |
| Arabic | RTL | Light | 1440 | PASS | `T041-T044 … ar light shell at 1440px` |
| Arabic | RTL | Dark | 375 | PASS | `T041-T044 … ar dark shell at 375px` |
| Arabic | RTL | Dark | 768 | PASS | `T041-T044 … ar dark shell at 768px` |
| Arabic | RTL | Dark | 1024 | PASS | `T041-T044 … ar dark shell at 1024px` |
| Arabic | RTL | Dark | 1440 | PASS | `T041-T044 … ar dark shell at 1440px` |

Result: **PASS — 16/16 automated rows**. The first run exposed insufficient existing Core token
contrast. Scoped overrides of the existing `--text-3`, `--pos`, and dark `--accent` tokens were
applied only at `.nx-core-shell`; the complete rerun then passed. No new palette, theme key, or
Commerce style override was introduced.

## Supplemental interaction and presentation rows

| Concern | Locale/direction/theme/viewport | Scripted journey and expected outcome | Result | Observed evidence |
|---|---|---|---|---|
| Translation-key parity | EN and AR | Resolve every changed shell string through the existing dictionary; no key fallback | PASS | `has English and Arabic copy for every changed shell key` |
| User-entered text | EN/LTR and AR/RTL; mixed names | Preserve mixed Arabic/Latin Workspace, legacy BusinessUnit, and Branch text exactly; use `dir="auto"` | PASS | Base matrix plus four long-name boundary rows |
| Drawer breakpoint | EN/LTR and AR/RTL; 879 and 881 | Drawer at 879; persistent sidebar at 881; logical start, bounded Workspace menu, no overflow | PASS | 4/4 `long mixed-direction context…` rows; earlier T017 boundary suite |
| Keyboard only | EN/LTR and AR/RTL | Skip to main; current route; drawer containment/release; popup Escape/restore; search arrows/Enter/Escape; toggles retain focus | PASS | T010, T011, T017, T028 suites |
| Touch targets | EN/AR; light/dark; 375 and 768 | Every primary topbar target at least 44 by 44 CSS pixels | PASS | Base matrix geometry assertions |
| Screen-reader semantics (automated) | EN/AR; compact and desktop | One main, named banner/navigation, named controls, current/expanded/busy states, one state announcement | PASS | T010, T011, T036, and all Axe matrix rows |
| Presentation states | EN/AR; light/dark; 375 and 1440 | Named loading; distinct empty/unavailable/mock-session mismatch/recovering; zero-write retry; no foreign records | PASS | T036 10/10 checkpoint |
| Reduced motion | EN/LTR; 375 | Drawer, search, and status remain immediate; non-essential transitions/spinner reduced without hiding state | PASS | `keeps critical shell feedback immediate with reduced motion` |
| 200% CSS zoom | EN/LTR; 768 | One main/scroll owner, visible route heading, no horizontal document overflow | PASS | T039 zoom row and earlier T017 zoom row |
| Light/dark focus and contrast | EN/AR; all required widths | Visible focus; shell/content text, badges, boundaries, overlays, and statuses meet automated critical/serious Axe gate | PASS | 16/16 base matrix rows |
| Manual current-stable NVDA/current-stable Chrome | Required EN and AR; one compact and one desktop pass spanning light/dark | Verify landmark navigation, control names/states, mixed-direction names, loading/recovery announcement exactly once, and focus order | **BLOCKED** | No Windows/NVDA environment is available in this Linux/WSL execution. Exact NVDA/Chrome/Windows versions and human observations cannot be fabricated. Owned by T047. |

## Known limitation and release effect

The automated Phase G matrix is complete and reproducible. The manual assistive-technology row is
**Blocked by Environment — Waiting for Windows Validation**, not passed, failed, N/A, or waived.
The required manual handoff is `docs/12-release/WINDOWS-VALIDATION.md`. T047 must be executed on the
specified Windows/NVDA/Chrome environment before Feature 050 can be declared release-ready or the
post-implementation Constitution Check can pass without a BLOCKED item.
