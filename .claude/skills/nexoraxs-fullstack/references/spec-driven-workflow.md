# Spec-Driven Workflow for NexoraXS

NexoraXS uses GitHub Spec Kit / Specify CLI to keep agent work controlled and understandable. Use this reference whenever guiding a feature from idea to implementation.

## Agent split

- Claude: thinking, architecture, specs, plans, tasks, review.
- Codex: implementation from exact task files, file edits, build fixes.
- User: product owner and usually final committer.

## Mandatory order

Use this sequence for any non-trivial feature:

```text
/speckit.specify
/speckit.plan
/speckit.tasks
Codex implements specs/<feature>/tasks.md
Claude reviews diff/QA
manual commit with explicit paths
```

Optional quality commands:

```text
/speckit.clarify
/speckit.checklist
/speckit.analyze
```

## If slash commands are unavailable

Spec Kit command files must exist in both locations:

```text
.agents/commands/*.md
.claude/commands/*.md
```

If `.claude/commands` is missing, repair:

```bash
mkdir -p .claude/commands
cp .agents/commands/*.md .claude/commands/
git add .claude/commands
git commit -m "fix: register speckit slash commands in claude"
```

Restart Claude Code and test `/speckit.specify`.

## Good feature spec shape

Every spec should include:

- Feature name and number.
- Goal.
- Work-only scope.
- Route behavior if applicable.
- Design rules.
- Architecture rules.
- Code rules.
- Explicit do-not list.
- Success criteria with build command.
- `Create spec only first` when prompting Claude.

## Codex implementation handoff

Give Codex an exact spec path:

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

Run lint/typecheck/build.
Do not commit.
```

For cross-app QA/routing features, allow only the exact apps needed and keep the feature outcome coherent.

## Safe commit pattern

Use explicit paths only:

```bash
git add AGENTS.md .specify/feature.json specs/<feature> apps/<allowed-app>
git commit -m "..."
git status
```

For intentional cross-app UI flow, include both app paths explicitly.

Recent cross-app commit examples used exact paths for:

- Landing CTA links to Core login.
- Core App Launcher `Open Shops` route.
- Shops `Back to Platform` route.
- Shops topbar/store display session fixes.

Never use:

```bash
git add .
```

## QA and manual testing rhythm

After Codex reports success:

1. Ask Claude to review changed files.
2. Run app-specific lint/build.
3. Manually test the user journey in browser.
4. If runtime routes 404 despite files existing, restart the relevant dev server and clear `.next` cache:

```bash
rm -rf apps/core-platform/.next
pnpm --filter core-platform dev
```

5. Commit only after the route/UX is confirmed.

## Scope guidance

Small features are good for foundations and QA. Medium-scope features are okay once workflow is stable, such as:

- Platform-to-Shops visual flow.
- Shops Onboarding business type flow.
- Core Workspace Onboarding flow.
- Products + Inventory module foundation.

Still keep one feature coherent, reversible, and bounded.
