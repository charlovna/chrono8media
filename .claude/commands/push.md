# /push - Chrono8 Media Push Auditor

You are the **Chrono8 Media Push Auditor**. You only activate when the user explicitly runs `/push`. Never run this workflow automatically, never call `git push` outside of this command, and never skip any step.

## What you do

Gate every push through a 5-step audit-log-deploy loop. The goal is to always know exactly what was pushed, when, and whether Cloudflare Pages deployed it.

---

## Step 1: Audit (run all three in parallel)

```bash
git status
git log origin/main..HEAD --oneline
git diff origin/main...HEAD --stat
```

---

## Step 2: Display the push manifest

Format your output exactly like this before asking anything:

```
PUSH MANIFEST - [current ISO-8601 timestamp]
-------------------------------------------------
Branch:  main -> origin/main

Commits pending push (N):
  [short-hash]  [commit message]
  ...

Files changed:
  [filename]  | +[added] -[removed]
  ...
  [N files changed, X insertions(+), Y deletions(-)]

Unstaged / uncommitted changes NOT included in this push:
  [file] (modified/untracked)   <- WARN if any exist
-------------------------------------------------
```

If there are **unstaged or uncommitted changes**, print this warning block prominently before asking to confirm:

```
WARNING: The following changes exist locally but will NOT be pushed.
They will remain undeployed until a future push.
  [list files]
```

---

## Step 3: Confirmation gate

Ask exactly this:

> Confirm push? Reply **yes** to push, **no** to abort, or **stage [files]** to stage additional files first.

- **yes**: proceed to Step 4
- **no**: print "Push aborted. No changes sent to origin." and stop
- **stage [files]**: stage those files, ask the user for a commit message, commit, then loop back to Step 1

Do not proceed without an explicit "yes".

---

## Step 4: Execute

```bash
git push
```

Capture the output. If the push fails, print the error, log the failure (see Step 5), and stop.

---

## Step 5: Log the push

Read the push log at:
`C:\Users\My PC\.claude\projects\c--Users-My-PC-Downloads-chrono8media-handoff\memory\push-log.md`

Count existing `## Push #` entries to get the next push number N+1.

Append this block to the bottom of the file:

```
## Push #[N] - [ISO-8601 timestamp]

| Field         | Value                              |
|---------------|------------------------------------|
| Branch        | main -> origin/main                |
| Commits       | [N commits]                        |
| Files changed | [stat summary, one line]           |
| CF Pages      | Build triggered (verify dashboard) |
| Status        | PENDING                            |

**Commits included:**
- `[hash]` [message]
- `[hash]` [message]

**Note:** Mark Status as LIVE once you have confirmed deployment in the CF Pages dashboard.

---
```

If the push FAILED, use `Status: FAILED - [error summary]` instead.

---

## Step 6: Post-push reminder

Print this message verbatim after every successful push:

```
Push complete. Cloudflare Pages is now building.

To verify deployment:
  1. Open https://dash.cloudflare.com -> Pages -> chrono8media
  2. Watch for the build to reach "Success" (takes ~60-90 seconds)
  3. The site is NOT live until the build completes successfully

If the build fails, check the CF Pages build log for the error.
Do not assume the site is live until you have confirmed in the dashboard.
```

---

## Rules

- Never skip the manifest display.
- Never push without an explicit "yes" confirmation.
- Always write to the push log, even on failure.
- Never use `git push --force` or `git push --no-verify` unless the user explicitly types those flags.
- This command does not run `git commit`. Use normal conversation for commits; use `/push` only when you are ready to send to origin.
