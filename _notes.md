# _notes.md — Active Scratchpad

_This file is ephemeral. Update it each session. For permanent reference, see `_memory/`._

---

## Active Tasks

### CSS Migration (in progress — started 2026-03-17)

Pending inline `<style>` extractions (these pages still have styles embedded in HTML):

- ✅ `lyrics.html` → already extracted to `lyrics-archive.css` (done in earlier session)
- ✅ `agust-islandia-gay-and-proud-press-release.html` → extracted to `press-release.css` (2026-04-12)

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

_No open HIGH or MEDIUM bugs. See `_memory/bugs.md` for full tracker._

LOW (not urgent):
- [ ] **BUG-009: Missing JPG fallbacks** — `gay-and-proud-cover.webp`, `swipe-me-to-the-moon-cover.webp`
- [ ] **BUG-010: `--z-header: 1` unused CSS var** — low impact, code smell only

---

## Completed

- ✅ Phase 4 deep HTML sweep — JS version params fixed (15 pages), zero structural issues
  found (2026-04-12).
- ✅ Phase 3 CSS extraction — `press-release.css` extracted (2026-04-12).
- ✅ Phase 2 Schema.org — position, inLanguage, genre added to 36 lyric pages (2026-04-12).
- ✅ BUG-004 CSS version mismatch — standardised navigation.css, glass-site.css,
  glass-lyrics-template.css across all pages (2026-04-12).
- ✅ BUG-005 GLASS templates — added noindex to GLASS_ALBUM_TEMPLATE.html and
  GLASS_LYRICS_TEMPLATE.html (2026-04-12).
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
- What was done: Phases 2–4 complete. Schema fields added (position/inLanguage/genre), CSS extracted
  (press-release.css), JS version params fixed (15 pages), all MEDIUM bugs resolved.
  Validator: 76 files, 0 errors, 3 warnings (acceptable).
- What's next: Push branch → PR → merge to main. Then address Phase 6 if defined.
