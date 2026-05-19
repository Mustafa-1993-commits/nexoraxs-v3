# Research: packages/ui — Shared Component Library

**Phase**: 0 | **Branch**: `032-shared-ui-library` | **Date**: 2026-05-17

---

## Package Setup — Source-First, No Build Step

**Decision**: `packages/ui` ships TypeScript source directly. No compilation step. Each consuming Next.js app uses `transpilePackages: ['@nexoraxs/ui']` in `next.config.ts`.

**Rationale**: For an internal monorepo package consumed only by Next.js apps, `transpilePackages` is the standard pattern (documented in Next.js docs). It avoids maintaining a separate build pipeline for the package, removes the need for declaration file generation, and means changes in packages/ui are immediately reflected in consuming apps without a rebuild step.

**Alternatives considered**:
- `tsc --declaration` build step — adds CI complexity, requires re-build after every change; unnecessary for internal use.
- `tsup` bundler — same overhead; no benefit for internal packages.
- Path alias in each app's tsconfig — fragile, requires duplicating the alias in every app.

**package.json shape**:
```json
{
  "name": "@nexoraxs/ui",
  "version": "0.1.0",
  "private": true,
  "main": "src/index.ts",
  "types": "src/index.ts",
  "peerDependencies": {
    "react": "^19.0.0",
    "react-dom": "^19.0.0"
  }
}
```

---

## Icon Set Merge — Union of Both Apps

**Decision**: The shared `Icon` component contains the **union** of all icons from `apps/core-platform` and `apps/shops-app`. No icon from either app is dropped. Duplicates (same name, same path) are deduplicated; where names conflict, the shops-app version takes precedence (it is newer and richer).

**Core-platform icons** (from `lib/types.ts` `IconName`):
`dashboard`, `apps`, `settings`, `users`, `menu`, `x`, `chevron-right`, `credit-card`, `search`, `bell`, `chevron-down`, `trending-up`, `check`, `building`, `globe`, `zap`

**Shops-app icons** (from `components/ui/Icon.tsx`):
`dashboard`, `package`, `users`, `chart-bar`, `settings`, `shopping-bag`, `scan-line`, `bell`, `search`, `chevron-down`, `chevron-left`, `chevron-right`, `chevrons-up-down`, `map-pin`, `arrow-up-right`, `credit-card`, `banknote`, `plus`, `download`, `package-plus`, `receipt`, `user-plus`, `package-search`, `file-text`, `alert-triangle`, `trending-up`, `menu`, `x`, `boxes`, `tag`, `percent`, `smartphone`, `watch`, `shirt`, `shopping-cart`, `cpu`, `sparkles`, `store-front`, `layers`, `minus`, `wallet`, `check-circle`

**Shared-only icons** (in core-platform, not in shops-app):
`apps`, `check`, `building`, `globe`, `zap`

**Merged set** (48 unique names): All shops-app icons + `apps`, `check`, `building`, `globe`, `zap` from core-platform.

**Impact on core-platform**: The `IconName` type in `lib/types.ts` is currently the canonical type for core-platform's Icon. After migration, `IconName` should be re-exported from `@nexoraxs/ui` so core-platform can still type icon names without importing from `lib/types`.

**Alternatives considered**:
- Keep both apps' icon sets separate with different types — defeats the purpose of a shared package; apps would still diverge.
- Use Lucide directly — would require all apps to adopt Lucide's API; breaking change for existing usage patterns.

---

## Badge Variant Naming — Semantic over Color Names

**Decision**: The shared `Badge` uses semantic variant names: `default`, `success`, `warning`, `error`, `info`, `purple`. The shops-app Badge uses color names (`emerald`, `amber`, `rose`, `blue`, `purple`, `gray`, `cyan`). The migration maps old color names to new semantic names.

**Mapping**:
| Shops-app color | Shared variant |
|-----------------|---------------|
| `emerald`       | `success`     |
| `amber`         | `warning`     |
| `rose`          | `error`       |
| `blue`          | `info`        |
| `cyan`          | `info`        |
| `purple`        | `purple`      |
| `gray`          | `default`     |

**Rationale**: Semantic names communicate intent (what the badge means) rather than implementation (what color it is). This makes future palette changes easier. The `cyan` → `info` mapping is intentional — both serve the same informational purpose; if a distinct cyan badge is needed, it can be added later.

**Migration effort**: Every `<Badge color="emerald">` in shops-app becomes `<Badge variant="success">`. Mechanical find-and-replace.

---

## Logo — Single Component with `app` Prop

**Decision**: One `Logo` component with `app?: "core" | "shops"` prop. Default is `"core"` (NexoraXS wordmark). Each variant is hard-coded inside the component.

**Core variant**: NexoraXS wordmark from `apps/core-platform/components/ui/Logo.tsx` — gradient box + "NexoraXS" text.

**Shops variant**: Shops brandmark from `apps/shops-app/components/ui/Logo.tsx` — shopping-bag icon + "Shops" text. Also supports existing `size` prop (`"sm"` | `"md"`).

**Alternatives considered**:
- Two separate components (`NexoraLogo`, `ShopsLogo`) — clean but doubles import surface; single component is more ergonomic.
- Render prop / slot pattern — unnecessary complexity for two static variants.

---

## Import Migration Strategy — Per-File Replacement

**Decision**: For each file that imports from a local `@/components/ui/Icon`, `@/components/ui/Logo`, `@/components/ui/Button`, `@/components/ui/Input`, or `@/components/dashboard/Badge`, replace the import path with `@nexoraxs/ui`. The rest of each file is unchanged.

**Core-platform files to update**:
- `components/dashboard/Sidebar.tsx` — Icon, Logo
- `app/register/page.tsx` — Button, Input
- `app/login/page.tsx` — Button, Input
- Any other files referencing Icon (confirmed via grep: Topbar, AppCard, etc.)

**Shops-app files to update**:
- `components/dashboard/Sidebar.tsx` — Icon, Logo
- `components/dashboard/Topbar.tsx` — Icon
- `components/dashboard/StatCard.tsx` — Icon
- `components/dashboard/Badge.tsx` — (the file itself is deleted; all Badge consumers updated)
- `components/pos/POSHeader.tsx` — Icon, Logo
- `components/pos/CartPanel.tsx` — Icon
- `components/pos/CartItemRow.tsx` — Icon
- `components/pos/ProductCard.tsx` — (no Icon import, but Badge from dashboard/Badge)
- `components/pos/PaymentSection.tsx` — Icon
- `components/pos/SaleSuccessModal.tsx` — Icon
- All onboarding components importing Icon
- `components/dashboard/NextSteps.tsx` — Icon
- `components/dashboard/PlaceholderPage.tsx` — Icon
- `lib/mock-data/products.ts` — (no Icon import)

**Additional note**: `core-platform/lib/types.ts` currently exports `IconName`. After migration, this type comes from `@nexoraxs/ui`. The `IconName` export can either be kept as a re-export in `lib/types.ts` for backward compatibility, or all consumers updated to import from `@nexoraxs/ui` directly. The simpler approach: add a re-export in `lib/types.ts` so no other file needs changing.

---

## Design Tokens — CSS Custom Properties in tokens.css

**Decision**: Publish tokens as a `tokens.css` file inside the package. Apps can import it in their `globals.css` via `@import "@nexoraxs/ui/src/tokens.css"` or reference the variables directly since the values are also inlined in Tailwind config.

**Token values**:
```css
:root {
  --color-bg:           #0a0a0f;
  --color-purple:       #7C3AED;
  --color-purple-light: #8B5CF6;
  --color-blue:         #3B82F6;
  --color-cyan:         #06B6D4;
  --color-cyan-light:   #00D4FF;
  --color-white:        #FFFFFF;
  --color-muted:        #94A3B8;
}
```

**Rationale**: CSS variables are framework-agnostic and work alongside Tailwind 4's native variable support. They serve as the authoritative palette reference for anyone building new apps or components.

---

## transpilePackages Config

**Decision**: Add `transpilePackages: ['@nexoraxs/ui']` to both `apps/core-platform/next.config.ts` and `apps/shops-app/next.config.ts`. The landing app is verified to not import from `@nexoraxs/ui` — its `next.config.ts` is left unchanged unless the landing app later adopts the package.

**Rationale**: Without `transpilePackages`, Next.js will fail to process the TypeScript source from the package because it only transpiles files in the app's own directory by default.

---

## AGENTS.md Update

**Decision**: Add a `packages/ui` entry to the "Monorepo Structure" section of AGENTS.md documenting: package name `@nexoraxs/ui`, exported components list, and the constraint that this package contains UI components only (enforcing Principle III).

---

## Constitution Re-check (post-design)

All Phase 1 design decisions maintain compliance:
- Principle III: `packages/ui` is the UI-only shared package; no business logic introduced.
- Principle IV: All components typed in strict TypeScript; zero `any`.
- Principle I: One new internal package; no microservices or new deployable added.

**Gate result**: PASS
