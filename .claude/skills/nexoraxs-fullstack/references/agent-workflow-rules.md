# NexoraXS Agent Workflow Rules

Use this reference whenever the user asks how to work with Claude, Codex, Spec Kit, branches, commits, or when a new chat needs to continue the same workflow.

## Fixed agent roles

- Claude = planning brain: spec, plan, tasks, architecture review, QA review, and prompts for design/code agents.
- Codex = implementation worker: read exact `specs/<number>-<slug>/tasks.md`, edit only allowed paths, run lint/typecheck/build, and report changes.
- User = product owner and final committer unless they explicitly asks an agent to commit.

## Default response style

- Speak Arabic when the user writes Arabic.
- Be short, practical, and step-by-step.
- Do not overload the user with theory.
- Give one next action at a time unless the user asks for a full plan.
- Treat the user as founder/non-coder; explain what to run and why.

## Safe Spec Kit flow

Use the sequence:

```text
/speckit.specify
/speckit.plan
/speckit.tasks
Codex implements exact tasks.md
Claude reviews diff/QA
manual git add exact paths
manual git commit
```

If slash commands fail:

1. Confirm `.specify/` exists.
2. Confirm `.agents/commands/*.md` exists.
3. Confirm `.claude/commands/*.md` exists.
4. If `.claude/commands/` is missing, repair with:

```bash
mkdir -p .claude/commands
cp .agents/commands/*.md .claude/commands/
git add .claude/commands
git commit -m "fix: register speckit slash commands in claude"
```

Then restart Claude Code and test `/speckit.specify`.

## Branch and scope rules

- One numbered feature per branch/spec.
- Use names like `023-core-auth-workspace-routing-qa`.
- Do not mix unrelated apps in one feature unless the feature explicitly requires it.
- Cross-app routing QA may intentionally touch `landing`, `core-platform`, and `shops-app`, but only for navigation links and only with explicit scope.
- Before work: run `git status`, `git branch --show-current`, inspect `specs/`, inspect `AGENTS.md` active feature block.
- If branch, AGENTS.md, and spec directory disagree, stop and ask which is authoritative.
- If docs folders like `docs/branding/` or `docs/magicpatterns/` are untracked, do not add them unless the user explicitly asks to commit design references.

## Commit rules

Prefer manual commits with explicit paths:

```bash
git add AGENTS.md .specify/feature.json specs/<feature> apps/<allowed-app>
git commit -m "..."
```

Never recommend `git add .` for feature work.

Common commit path examples:

```bash
# core-platform only
git add AGENTS.md .specify/feature.json specs/023-core-auth-workspace-routing-qa apps/core-platform

# shops-app only
git add AGENTS.md .specify/feature.json specs/019-shops-onboarding-business-type-flow apps/shops-app

# intentional landing + core + shops navigation QA
git add AGENTS.md .specify/feature.json specs/<feature> apps/landing apps/core-platform apps/shops-app
```

For highly targeted late QA fixes, list exact files instead of app directories.

## Claude prompt pattern

When the user wants a new feature, give Claude a prompt with:

- Feature name and number.
- Goal.
- Work-only scope.
- Do-not list.
- Exact routes/components.
- Success criteria.
- `Create spec only first.`

Then ask them to run:

```text
/speckit.plan
/speckit.tasks
```

## Codex prompt pattern

Always tell Codex the exact spec path and allowed paths:

```text
Implement exactly:
specs/<number>-<slug>/tasks.md

Allowed paths:
- apps/<app>
- specs/<number>-<slug>
- AGENTS.md
- .specify/feature.json

Forbidden:
- unrelated apps
- backend unless explicitly in scope
- packages unless explicitly in scope
- git add .
- commits unless explicitly requested

Run the relevant lint/typecheck/build.
Do not commit.
```

For small QA follow-ups inside an existing feature, give Codex a focused patch prompt and still say `Do not commit`.

## Build commands

Use the app-specific build gate:

```bash
pnpm --filter landing build
pnpm --filter core-platform build
pnpm --filter shops-app build
```

Use lint/typecheck from the app folder or pnpm filter when available:

```bash
pnpm --filter landing lint
pnpm --filter core-platform lint
pnpm --filter shops-app lint
pnpm --filter core-platform build
pnpm --filter shops-app build
```

If `pnpm --filter <app> tsc --noEmit` says no script exists, use `pnpm exec tsc --noEmit` from the app folder only if needed.

## Recent routing decisions

- `/register` Create Account routes to `/login`.
- `/login` Sign In routes to:
  - `/onboarding` if `core_workspace_onboarding_done` is missing.
  - `/workspaces` if `core_workspace_onboarding_done` exists.
- `/onboarding` Finish routes to `/dashboard/apps`.
- `/dashboard/apps` Open Shops routes to Shops app entry, local dev typically `http://localhost:3002/onboarding` or `/dashboard` depending on Shops session.
- Shops `Back to Platform` routes to Core dashboard, local dev `http://localhost:3001/dashboard`.
- Landing Get Started routes to Core login, local dev `http://localhost:3001/login`.

## Scope expansion guidance

Small steps were used during foundation to stabilize workflow. Medium-scope features are now allowed if coherent, such as:

- A whole page foundation, such as Products.
- Products + Inventory module foundation.
- A full onboarding/dashboard polish pass.

Still keep one feature = one coherent product outcome.
