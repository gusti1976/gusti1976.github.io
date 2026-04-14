# `.claude/` — Session Resilience System

This folder holds the session-resilience system for Claude Code working on
this repo. The goal: if a Claude Code session dies mid-work — Anthropic API
outage, network drop, process crash, anything — the next session can pick up
without the user restating context.

## How it works

Claude Code fires **hooks** at lifecycle events (`SessionStart`,
`UserPromptSubmit`, `PostToolUse`, `Stop`). Every hook runs
`.claude/log-event.sh`, which:

1. Appends a one-line entry to [`session-log.md`](./session-log.md) (append-only
   audit trail).
2. Rewrites [`resume-state.md`](./resume-state.md) with a fresh snapshot:
   current branch, `git status --short`, origin ahead/behind, last user
   prompt, last five tool uses.
3. On `SessionStart`, emits the **previous** session's `resume-state.md` as
   `additionalContext` so the new session sees where the old one left off.

All of this runs **locally**, from shell and disk only. No network. No API
dependency. A dying session cannot stop the hook that records its own death
— the hook runs before Claude is asked anything.

## File map

| File | Role | Tracked in git? | Overwritten? |
|---|---|---|---|
| `settings.json` | Claude Code hook wiring. | yes | Hand-edited only. |
| `log-event.sh` | The logger. | yes | Hand-edited only. |
| `README.md` | This file. | yes | Hand-edited only. |
| `session-log.md` | Append-only event trail. | no (gitignored) | Never — always grows. |
| `resume-state.md` | Single-page state snapshot. | no (gitignored) | Yes, on every hook. |
| `hook-errors.log` | Stderr from hook runs. Normally empty. | no (gitignored) | Appended on errors. |
| `.log.lock` | flock sentinel. | no (gitignored) | — |

The three structural files (settings, logger, README) are committed so a fresh
clone inherits the system. The runtime files are per-machine local state —
`log-event.sh` creates them on the first hook event after a clone.

## Why `.claude/` (not `_memory/`)

- The folder is Claude-Code-specific tooling, not site content.
- Dot-prefixed folders are ignored by Jekyll, so nothing in `.claude/` is
  ever served by GitHub Pages. Logs can contain branch names, file paths,
  and prompt text — worth not broadcasting.
- Runtime state is gitignored, so the event log and prompt summaries never
  leave the local machine.

## Reading the log after a crash

```
cat .claude/resume-state.md     # single-page summary
tail -40 .claude/session-log.md # last ~40 events
cat .claude/hook-errors.log     # empty unless something is wrong
```

Combine with `_notes.md` (curated, human-maintained active task list) for
the full picture.

## Disabling

Remove or blank the `hooks` block in `.claude/settings.json`. The helper
script and log files remain harmless without the hook wiring.

## Troubleshooting

- **Hook seems silent.** Check `.claude/hook-errors.log`. The script swallows
  stderr so it never interrupts a tool call — the error log is the only
  surface.
- **`jq` or `flock` not found.** Both ship with most Linux/macOS dev
  environments. On the GitHub Pages side they are irrelevant (no CI).
- **Log is growing unbounded.** Expected. The file is append-only by design.
  Rotate manually by moving the old file aside; the script recreates its
  header on the next event.
