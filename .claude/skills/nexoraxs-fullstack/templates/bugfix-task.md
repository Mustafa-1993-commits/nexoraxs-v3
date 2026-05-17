# Bugfix Task Template

Bug:
[Describe the bug]

Expected behavior:
[Describe expected behavior]

Current behavior:
[Describe current behavior]

Constraints:
- fix only the smallest necessary issue
- do not add new scope
- do not refactor unrelated code
- do not touch `nexoraxs-old`
- preserve Docker/auth/session stability

Steps:
1. Reproduce or inspect the failure.
2. Identify root cause.
3. Apply minimal fix.
4. Add regression test if practical.
5. Rerun affected command/test.
6. Report exact result.

Final report must include:
- root cause
- changed files
- commands run
- pass/fail status
