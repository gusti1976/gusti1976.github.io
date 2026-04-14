# Deployment & Workflow

## Stack

Pure static files. No build step. No CI/CD pipeline.
GitHub Pages serves files directly from `main` branch.
Custom domain: `www.gusti.com` → configured via `CNAME` file at repo root.
**Deploy = `git push origin main`** — GitHub Pages auto-builds in ~30 seconds to 2 minutes.

## Pre-Commit Checklist

- [ ] **Update `_memory/` files** to reflect any changes made (see CLAUDE.md Memory Maintenance table)
- [ ] **Update `_notes.md`** — mark completed tasks done, add new pending ones
- [ ] Hard refresh browser (Ctrl+Shift+R) and check for visual regressions
- [ ] Open F12 console — 0 JS errors, 0 404s
- [ ] Run `python3 html_validator.py` — must exit with 0 content errors
- [ ] Test navigation hamburger menu on mobile viewport
- [ ] (Optional) Google Rich Results Test for Schema.org on changed pages

## Deployment Workflow

```
1. Edit files
2. python3 html_validator.py      # fix any errors
3. git add [specific files]       # never 'git add .' to avoid accidental commits
4. git commit -m "brief message"
5. git push origin main
6. Wait ~1 minute
7. Verify at www.gusti.com
```

## HTML Validator

**Run:** `python3 html_validator.py` (from repo root)

What it checks:
- HTML structure (required tags, charset, viewport, title)
- Schema.org JSON-LD (type, required fields, format)
- Internal links (no 404s)
- Accessibility basics (alt text, ARIA, skip links)
- Duplicate IDs within pages
- Duration format (ISO 8601 for Schema.org)

**Output:** Console summary + `validation_report.txt` + `schema_validation_detailed.txt`

**Exit 0** = all checks pass  
**Exit 1** = errors found (content errors block deploy; warnings are acceptable)

**Expected clean baseline:** 82 HTML files, 0 content errors  
**Files that intentionally differ:**
- `google46e00271f9de7d83.html` — Google verification file, minimal HTML
- `navigation-template.html` — utility template, incomplete `<head>`

## Sitemap Maintenance

After adding a new page, add to `sitemap.xml`:

```xml
<url>
  <loc>https://www.gusti.com/new-page.html</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
```

Priority guide: `1.0` core pages, `0.9` song/lyric pages, `0.8` album pages, `0.7` utility pages.

## robots.txt & SEO Files

- `robots.txt` — controls crawler access
- `sitemap.xml` — submit to Google Search Console after major updates
- `llms.txt` — AI crawler data; update when adding songs (see seo.md)

## Branch Strategy

- `main` — production; every push deploys live to www.gusti.com
- Feature work on `claude/` prefixed branches when the session harness requires it
- No staging environment — use `test.html` at root for local scratch (noindex)

### User standing order: site changes must go live

See the **Deployment Rule** block at the top of `CLAUDE.md`. The short version:
**any change to a file the public site loads must be merged to `main` and pushed
before the task is reported complete.** A change that only lives on a feature
branch is invisible to the user and therefore incomplete. Internal files
(`.claude/`, `_memory/`, `_notes.md`, `CLAUDE.md`) are exempt but usually merge
anyway.

End-of-task flow (copy from `CLAUDE.md`):

```
python3 html_validator.py
git add <specific files>
git commit -m "..."
git checkout main
git merge --ff-only <feature-branch>
git push origin main               # goes live ~1 min later
git checkout <feature-branch>
git push origin <feature-branch>
```

## Session Resilience (`.claude/`)

Claude Code hooks write a session event log + resume snapshot to `.claude/` on every
lifecycle event (`SessionStart`, `UserPromptSubmit`, `PostToolUse` on Write/Edit/Bash,
`Stop`). Purpose: if a session crashes mid-work — Anthropic API outage, network drop,
process kill — the next session picks up without the user restating context.

Files:

- `.claude/settings.json` — hook wiring (tracked in git).
- `.claude/log-event.sh` — the logger helper (tracked).
- `.claude/session-log.md` — append-only trail, one line per event.
- `.claude/resume-state.md` — overwritten on every event; read this first after a crash.
- `.claude/hook-errors.log` — stray stderr from hook runs, normally empty.

All file-based, no network. See `.claude/README.md` for the full schema, how to read the
logs, and how to disable. The `.claude/` folder is dot-prefixed so Jekyll never serves it
— none of this is publicly visible on `www.gusti.com`.
