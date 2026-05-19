# Feature Task Template

Task:
Implement [feature name] for NexoraXS.

Scope:
- [specific allowed scope]
- [specific app/layer affected]

Out of scope:
- no unrelated refactors
- no large product features
- do not touch `nexoraxs-old`
- do not change auth/session unless required

Architecture boundaries:
- core-app remains platform shell
- admin-app remains platform admin
- app-specific business logic belongs inside the relevant app
- backend APIs should be workspace-aware where needed

Implementation steps:
1. Inspect current files and architecture.
2. Identify affected backend/frontend areas.
3. Implement the smallest safe change.
4. Add or update tests.
5. Run relevant lint/build/tests.
6. Report exact results and changed files.

Acceptance criteria:
- [criterion 1]
- [criterion 2]
- [criterion 3]
