# Architecture Review Template

Review goal:
Check NexoraXS repo/app architecture without implementing large changes.

Focus areas:
- root folder clarity
- apps boundaries
- backend boundaries
- admin vs customer separation
- app-specific domain ownership
- shared code usage
- Docker/local setup safety
- env files
- test/build/lint scripts
- dead files or duplicated configs

Do not:
- perform large refactor
- move many files without approval
- touch `nexoraxs-old`

Output:
1. Current structure summary.
2. Good parts.
3. Risks.
4. Recommended small cleanup steps.
5. Future improvements.
6. Files that should not be touched.
