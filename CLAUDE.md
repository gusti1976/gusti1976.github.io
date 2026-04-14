# Claude Code Context — www.gusti.com

## Site

Pure HTML5 / CSS3 / Vanilla JS static site. No npm. No build step. No framework.
Hosted on GitHub Pages (`gusti1976.github.io`), custom domain `www.gusti.com` via `CNAME`.
Deploy = `git push origin main` (auto-builds in ~1 minute).

## Deployment Rule (MANDATORY — USER STANDING ORDER)

**Every change to a file the public site loads — any `.html`, `.css`, `.js`,
image, `sitemap.xml`, `robots.txt`, `llms.txt`, `CNAME` — must end up on
`main` and be pushed to GitHub before the task is reported complete.** The
user needs to see changes live at www.gusti.com to review or debug. Leaving
site changes on a feature branch is not acceptable — it is invisible to the
user.

End-of-task flow for any site-file change:

```
1. python3 html_validator.py      # 0 errors required
2. git add <specific files>       # never 'git add .'
3. git commit -m "..."
4. git checkout main
5. git merge --ff-only <feature-branch>    # fast-forward when possible
6. git push origin main           # this is what puts it on www.gusti.com
7. git checkout <feature-branch>  # return to designated dev branch
8. git push origin <feature-branch>  # keep the feature branch in sync
```

Roughly one minute after step 6 the change is live. Confirm by visiting
www.gusti.com in a browser with a hard refresh (Ctrl+Shift+R).

Files the public site does **not** load are exempt: `.claude/`, `_memory/`,
`_notes.md`, `CLAUDE.md`, `html_validator.py`, `ALBUM_PAGE_TEMPLATE.md`.
These may stay on a feature branch — but if there is no reason to keep them
off `main`, prefer merging anyway to keep history linear.

## Artist

**Agust Smari Bjarkarson** (real name) = **Agust Islandia** (stage name).
Icelandic queer pop artist from Reykjavík. Always use both names together on pages for SEO.

## Key Files

| File | Role |
|---|---|
| `style-optimized.css` | All CSS variables in `:root` — edit here first for design changes |
| `navigation.css` | Hamburger nav styles — linked on every page |
| `navigation.js` | Nav toggle, collapsibles, active state — linked on every page |
| `dark-mode.js` | Theme toggle — localStorage key: `agust-islandia-theme` |
| `script.js` | Homepage only (info bubbles) |
| `_includes/navigation.html` | Canonical nav HTML — **edit this before updating nav on pages** |
| `navigation-template.html` | Full page template for reference |
| `ALBUM_PAGE_TEMPLATE.md` | HTML scaffold for new album pages — do not delete |
| `html_validator.py` | Run `python3 html_validator.py` before committing |

76 public pages in sitemap; 84 HTML files total (includes templates/utilities). The nav is a Jekyll include — editing `_includes/navigation.html` cascades to every page.

## Writing Rules (MANDATORY)

**All text written for this project must follow `_memory/writing-rules.md`.** This applies to
every page, lyric description, press copy, alt text, schema description, or any other
human-readable text. Read it before writing anything.

Key points:
- British English always
- No banned words, phrases, or sentence openers (long lists in the file)
- No em dashes except very rarely (max one per page)
- Active voice, simple verbs, short paragraphs
- No AI structural patterns: rule of three, hedging seesaw, corporate pep talk
- Get to the point first. Don't restate what you just said.

## Memory System

Find detailed documentation in `_memory/` (Jekyll-protected, not publicly accessible):

| Topic | File |
|---|---|
| **Writing style and tone rules** | **`_memory/writing-rules.md`** |
| Tech stack, file map, CSS vars, JS functions | `_memory/architecture.md` |
| Artist bio, music catalog, naming conventions | `_memory/content.md` |
| SEO strategy, Schema.org templates, meta tags | `_memory/seo.md` |
| Navigation system, HTML snippet, CSS classes | `_memory/navigation.md` |
| Adding lyrics pages, workflow checklist | `_memory/lyrics.md` |
| Dark mode: localStorage key, CSS, functions | `_memory/dark-mode.md` |
| Audit findings, known bugs, code gotchas | `_memory/bugs.md` |
| GitHub Pages, git workflow, validator | `_memory/deployment.md` |

Game-specific memory: `games/tetris/_memory/` (separate system, do not modify).

## Memory Maintenance (REQUIRED)

After **every** change to the site — adding a page, deleting a page, fixing a bug, extracting CSS, updating nav, adding a release — you **must** update the relevant memory file(s) before committing:

| Change type | Update |
|---|---|
| New HTML page | `_memory/content.md` catalog + `_memory/architecture.md` page count + `sitemap.xml` |
| Deleted page | Same as above |
| Bug found | Add to `_memory/bugs.md` |
| Bug fixed | Mark resolved in `_memory/bugs.md` |
| CSS extracted | Update `_memory/architecture.md` page families table |
| New CSS/JS file | Add to `_memory/architecture.md` file map |
| Nav changed | Update `_memory/navigation.md` |
| Active task added/done | Update `_notes.md` |
| New release/album | `_memory/content.md` catalog |

The memory is the source of truth. Keep it accurate — stale memory is worse than no memory.

## Active Work

See `_notes.md` for current tasks and pending decisions.

## Session Resilience

`.claude/` holds the logging + resume system. Hooks in `.claude/settings.json` write to
`.claude/session-log.md` (append-only trail) and refresh `.claude/resume-state.md`
(single-page snapshot) on every event. If a session dies mid-work — API outage, network
drop, crash — the next session's `SessionStart` hook surfaces the prior state. See
`.claude/README.md` for schema, file map, and troubleshooting. Folder is `.`-prefixed so
Jekyll never serves it.

## Critical Constraints

- **No `.nojekyll`** — adding it would expose `_memory/` files to the public web. Do not add it.
- **Jekyll processes `{% include %}` on GitHub Pages.** The nav is one file: `_includes/navigation.html`. Edit it once, every page picks it up on next build. Don't re-introduce hard-coded nav stubs.
- **No npm / no build step** — never introduce build tooling without explicit agreement.
- **`README.md`** is the public GitHub repo README — do not delete or repurpose.
- **`ALBUM_PAGE_TEMPLATE.md`** is a live HTML scaffold — do not delete.
- **CSS vars only in `:root`** in `style-optimized.css` — never define new vars in page `<style>` blocks.
- **Canvas API** cannot read CSS vars — use literal `rgba()` strings (Tetris game only).
