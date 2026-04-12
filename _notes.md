# _notes.md — Active Scratchpad

_This file is ephemeral. Update it each session. For permanent reference, see `_memory/`._

---

## Active Tasks

### CSS Migration (in progress — started 2026-03-17)

Pending inline `<style>` extractions (these pages still have styles embedded in HTML):

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

## Bug Fixes Needed

### MEDIUM — address when convenient
- [ ] **BUG-004: CSS `?v=` version mismatch** — standardise cache-busting params across all pages.
- [ ] **BUG-005: GLASS template files publicly accessible** — move to `_templates/` or add noindex.

---

## Completed

- ✅ Bug fixes + Schema.org audit — BUG-001 (alt text, 53 pages), BUG-002 (sr-announcements,
  76 pages), BUG-003 (test.html noindex), BUG-006 (Person schema standardised), BUG-007
  (NewsArticle→Article), redundant @context removed (67 pages), @id refs standardised (2026-04-12).
- ✅ Comprehensive code audit — 13 issues fixed, pushed live to main (2026-04-12).
- ✅ Memory architecture corrected — page counts updated (35→74 public/82 total),
  catalog updated with Cowboys EP, SMTTM lyric pages, Gay Mormon Musical (2026-04-12).
- ✅ Memory maintenance rules added to `CLAUDE.md` and `_memory/deployment.md` (2026-04-12).
- ✅ LYRICS_TEMPLATE_CONVERSION_TODO — all 51 song pages converted. File deleted.
- ✅ Memory architecture created — `/_memory/` with 9 files, `CLAUDE.md`, `_notes.md` (this file).
  Old root markdown files (15) consolidated and deleted (2026-04-12).
- ✅ `about.html` → `about.css` CSS extraction done.
- ✅ Global hamburger navigation deployed to all 35 pages (2026-02-28).
- ✅ All 27 Unseen Chorus lyric pages created (2026-02-27).

---

## Last Session Notes

- Date: 2026-04-12
- Branch: `claude/improve-memory-architecture-Rp6qw`
- What was done: Fixed BUG-001/002/003/006/007 + full Schema.org audit (redundant @context, @id format, byArtist consistency)
- What's next: BUG-004 (CSS version mismatch), BUG-005 (GLASS templates), CSS migration tasks
