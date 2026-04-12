# _notes.md — Active Scratchpad

_This file is ephemeral. Update it each session. For permanent reference, see `_memory/`._

---

## Active Tasks

### CSS Migration (in progress — started 2026-03-17)

Pending inline `<style>` extractions (these pages still have styles embedded in HTML):

- [ ] `press.html` → extract to `press.css`
- [ ] `lyrics.html` → extract to `lyrics-archive.css`
- [ ] `agust-islandia-gay-and-proud-press-release.html` → extract to `press-release.css`

Deferred (bigger scope):
- [ ] 27+ song/lyrics pages → shared `lyrics-page.css`
- [ ] Album/release pages (`cowboys.html`, `swipe-me-to-the-moon.html`, etc.) → `album-page.css`
- [ ] Special pages (`peach-and-purple.html`, `pride-on-the-seas.html`, `yogurt.html`) → review later

**Migration principles:**
- Migrate by page family, not one file at a time without structure
- Keep shared tokens and primitives in shared CSS (`style-optimized.css`)
- Move page-specific composition into dedicated page or family CSS files
- Validate after each extraction (`python3 html_validator.py`)
- Do not commit preview files or temporary review files

---

## Bug Fixes Needed (from 2026-04-12 audit)

### HIGH — fix soon
- [ ] **BUG-001: Malformed alt text** — 30+ Unseen Chorus track pages have `alt="Song Name" cover art"`.
  Fix: search-replace `" cover art"` → ` cover art"` across all affected files. See `_memory/bugs.md`.
- [ ] **BUG-002: Missing `#sr-announcements`** — 76 pages missing the screen-reader announcement div.
  Add `<div id="sr-announcements" role="status" aria-live="polite" aria-atomic="true" class="sr-only"></div>`
  to all pages. Check `index.html` for the reference implementation.
- [ ] **BUG-003: test.html in production** — add `<meta name="robots" content="noindex, nofollow">` or delete.

### MEDIUM — address when convenient
- [ ] **BUG-004: CSS `?v=` version mismatch** — standardize cache-busting params across all pages.
- [ ] **BUG-005: GLASS template files publicly accessible** — move to `_templates/` or add noindex.
- [ ] **BUG-006: Schema.org entity inconsistency** — standardize `Person` entity across index/about.
- [ ] **BUG-007: `NewsArticle` in press.html** — change to `PressRelease` or `CreativeWork`.

---

## Completed

- ✅ LYRICS_TEMPLATE_CONVERSION_TODO — all 51 song pages converted. File deleted.
- ✅ Memory architecture created — `/_memory/` with 9 files, `CLAUDE.md`, `_notes.md` (this file).
  Old root markdown files (15) consolidated and deleted (2026-04-12).
- ✅ `about.html` → `about.css` CSS extraction done.
- ✅ Global hamburger navigation deployed to all 35 pages (2026-02-28).
- ✅ All 27 Unseen Chorus lyric pages created (2026-02-27).

---

## Last Session Notes

_Fill in at start of each working session._

- Date:
- Branch:
- What was done:
- What's next:
