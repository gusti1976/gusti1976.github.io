# _notes.md — Active Scratchpad

_This file is ephemeral. Update it each session. For permanent reference, see `_memory/`._

---

## Active Tasks

### CSS Migration (in progress — started 2026-03-17)

Pending inline `<style>` extractions (these pages still have styles embedded in HTML):

- ✅ `lyrics.html` → already extracted to `lyrics-archive.css` (done in earlier session)
- ✅ `agust-islandia-gay-and-proud-press-release.html` → extracted to `press-release.css` (2026-04-12)

Deferred (bigger scope):
- ✅ 60 song/lyrics pages → `glass-lyrics-template.css` (confirmed: no inline styles remain)
- ✅ Album/release pages (`cowboys.html`, `swipe-me-to-the-moon.html`, etc.) → `glass-site.css` (confirmed: album layout styles already there, no inline styles)
- ✅ Special pages (`peach-and-purple.html`, `pride-on-the-seas.html`, `yogurt.html`) → confirmed clean: all link to `glass-site.css`, no inline styles

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
- [ ] **BUG-009: Missing JPG fallbacks** — `gay-and-proud-cover.webp` (3 pages), `swipe-me-to-the-moon-cover.webp` (17 pages). Requires image conversion tools (`dwebp`, `convert`, or PIL) to create `.jpg` files — none available in current environment.

---

## Completed

- ✅ Album cover aspect ratio fix — height attributes corrected to 16:9 values; `--glass-strong`
  CSS variable defined; glass card copy rewritten with real SEO terms (2026-04-12).
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
- ✅ Comprehensive code audit — 13 issues fixed (2026-04-12).
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

- Date: 2026-04-14 (later session)
- Branch: `claude/test-and-deploy-website-e4BZZ`
- What was done: **Navigation restructure.** Rebuilt `_includes/navigation.html` from
  9 flat-ish items into 4 intentional sections: Releases (collapsible, 6 featured
  releases + Full discography →), Lyrics (flat top-level link), About the musician
  (collapsible: Biography, Press, Contact), Listen (collapsible: Apple Music, Spotify,
  TikTok). Removed the duplicate Apple Music link at top level and the buried mailto.
  Added two new hub pages: `discography.html` (full catalog of every release by
  category) and `contact.html` (press, bookings, identifiers). Patched
  `navigation.js` `setActiveLink()` with a lyric-page fallback: if current page loads
  `glass-lyrics-template.css`, the top-level Lyrics link activates automatically.
  Bumped `navigation.js?v=20260414a` across 78 pages. Updated the 3 template files
  (`GLASS_ALBUM_TEMPLATE`, `GLASS_LYRICS_TEMPLATE`, `navigation-template`) to use
  the Jekyll include pattern instead of hard-coded nav stubs. Added discography and
  contact to `sitemap.xml`. Validator: 78 files, 0 errors, 3 baseline warnings,
  0 broken internal links.
- What's next: BUG-009 (needs image tools for JPG fallbacks — LOW priority).

### Earlier session (2026-04-14)

- (1) Ran full site audit — validator reports 0 errors, 3 expected warnings;
  all CSS/JS references intact; sitemap matches. Site health: excellent, no fixes needed.
- (2) Built session resilience system in `.claude/`: hook-driven logger writes an append-only
  event trail (`session-log.md`) and a single-page resume snapshot (`resume-state.md`) on
  every `SessionStart` / `UserPromptSubmit` / `PostToolUse` / `Stop`. Purpose: survive API
  outages so the next session picks up without user restating context. File-based, no
  network. Dot-prefixed so Jekyll never serves it.
- (3) Added the Deployment Rule to `CLAUDE.md`: every change to a public-site file
  must be merged to `main` and pushed before the task is complete.

### Previous session (2026-04-13)

- Branch: `claude/fix-api-memory-errors-BZjTC`
- Audited all deferred CSS migration items — confirmed complete. All 60 lyrics pages use
  `glass-lyrics-template.css`; all album/special pages use `glass-site.css`. Zero inline
  `<style>` blocks remain on any main-site page. Notes updated to reflect reality.

---

_Previous session (2026-04-12): Branch `claude/improve-memory-architecture-Rp6qw` → merged to `main`.
Phases 2–4 complete + album cover fix + glass card copy + bug tracker cleanup.
Validator: 76 files, 0 errors, 3 warnings (acceptable)._
