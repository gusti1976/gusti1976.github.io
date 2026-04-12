# Claude Code Context — www.gusti.com

## Site

Pure HTML5 / CSS3 / Vanilla JS static site. No npm. No build step. No framework.
Hosted on GitHub Pages (`gusti1976.github.io`), custom domain `www.gusti.com` via `CNAME`.
Deploy = `git push origin main` (auto-builds in ~1 minute).

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

35 HTML pages total. Navigation HTML is manually copy-pasted (no server-side includes).

## Memory System

Find detailed documentation in `_memory/` (Jekyll-protected, not publicly accessible):

| Topic | File |
|---|---|
| Tech stack, file map, CSS vars, JS functions | `_memory/architecture.md` |
| Artist bio, music catalog, naming conventions | `_memory/content.md` |
| SEO strategy, Schema.org templates, meta tags | `_memory/seo.md` |
| Navigation system, HTML snippet, CSS classes | `_memory/navigation.md` |
| Adding lyrics pages, workflow checklist | `_memory/lyrics.md` |
| Dark mode: localStorage key, CSS, functions | `_memory/dark-mode.md` |
| Audit findings, known bugs, code gotchas | `_memory/bugs.md` |
| GitHub Pages, git workflow, validator | `_memory/deployment.md` |

Game-specific memory: `games/tetris/_memory/` (separate system, do not modify).

## Active Work

See `_notes.md` for current tasks and pending decisions.

## Critical Constraints

- **No `.nojekyll`** — adding it would expose `_memory/` files to the public web. Do not add it.
- **No server-side includes** — nav HTML must be updated in all 35 pages manually when changed.
- **No npm / no build step** — never introduce build tooling without explicit agreement.
- **`README.md`** is the public GitHub repo README — do not delete or repurpose.
- **`ALBUM_PAGE_TEMPLATE.md`** is a live HTML scaffold — do not delete.
- **CSS vars only in `:root`** in `style-optimized.css` — never define new vars in page `<style>` blocks.
- **Canvas API** cannot read CSS vars — use literal `rgba()` strings (Tetris game only).
