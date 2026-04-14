# Bugs & Known Issues

Last audit: 2026-04-12. Run `python3 html_validator.py` to re-validate.

---

## HIGH Priority

_No open HIGH issues._

---

## MEDIUM Priority

_No open MEDIUM issues._

---

## LOW Priority

### BUG-009: Missing JPG fallbacks for 2 WebP images
- `gay-and-proud-cover.webp` — no `.jpg` fallback
- `swipe-me-to-the-moon-cover.webp` — no `.jpg` fallback  
**Impact:** Very old browsers (<5% of users) won't load these images.  
**Fix:** Create JPG versions and add `<picture>` element with fallback.

### BUG-011: games/prince-of-persia/ pages lack main site navigation and dark-mode.js
**Affected:** `games/prince-of-persia/*.html`  
**By design** — that game is a separate, self-contained experience. Noting here for awareness.

**Not a bug — Tetris:**
- `games/tetris/index.html` has its **own** dark mode (`tetris_dark` localStorage key, built
  entirely into the game file). It intentionally does not load `dark-mode.js`. Not missing.
- `tetris.html` at repo root is a `<meta http-equiv="refresh">` redirect stub to `games/tetris/`.
  It is not a real page and does not need `dark-mode.js`.

---

## RESOLVED (2026-04-14)

### ✅ BUG-012: Jekyll Liquid-parse error in CLAUDE.md silently halted Pages build — FIXED

**Symptom:** After pushing the nav restructure (commit `b6c828a`), the live
site kept serving the OLD nav and `/discography.html` returned 404 despite
the file being on `origin/main` at github.com. Hard-refresh did not help.

**Root cause:** `CLAUDE.md` contained `` `{% include %}` `` inside a
Markdown code span. On Jekyll, Liquid runs BEFORE the Markdown renderer,
so the include tag was parsed even inside backticks. With no filename
argument, Liquid raised a fatal parse error. GitHub Pages then kept
serving the last good build — which is why the old nav persisted and
the new pages 404'd. The build log would show this but the live site
gives no visible signal.

**Fix (commit `e0e0532`):** Added a minimal `_config.yml` with an
`exclude:` list: `CLAUDE.md`, `_notes.md`, `README.md`,
`html_validator.py`, `ALBUM_PAGE_TEMPLATE.md`, `validation_report.txt`,
`schema_validation_detailed.txt`, `.claude/`, `.github/`. Those files
now never enter the Jekyll build, so no amount of Liquid-looking syntax
in them can break Pages again.

**Lesson:** Any Markdown file at repo root that the site does not need
to serve must be in the `_config.yml` exclude list. Backticks are NOT
enough to escape Liquid tags — use the exclude list or
`{% raw %}...{% endraw %}` blocks.

---

## RESOLVED (2026-04-12 second pass)

### ✅ BUG-008: Missing head elements on utility files — CLOSED (not a bug)
- `navigation-template.html` — fully rewritten in Phase 1 with proper `<head>`, charset,
  viewport, robots noindex. Fixed.
- `google46e00271f9de7d83.html` — contains only the literal text
  `google-site-verification: google46e00271f9de7d83.html`. This is the exact format Google
  Search Console requires for HTML file verification. It cannot have head elements added.
  Not a bug — by design.

### ✅ BUG-010: `--z-header: 1` unused — CLOSED (false positive)
The variable is used on `style-optimized.css:361` and `:558`. It was never unused.

---

## RESOLVED (2026-04-12 Phase 2–4 sweep)

### ✅ BUG-004: CSS cache-busting version mismatch — FIXED
All stylesheet `?v=` params standardised across all pages:
- `navigation.css`: `?v=20260304d` everywhere (was missing on 15 pages)
- `glass-site.css`: `?v=20260317a` everywhere (3 pages had `?v=20260304e`)
- `glass-lyrics-template.css`: `?v=20260304f` everywhere (58 pages had `?v=20260304e`)

### ✅ BUG-005: GLASS template files publicly accessible — FIXED
Added `<meta name="robots" content="noindex, nofollow">` to both:
- `GLASS_ALBUM_TEMPLATE.html`
- `GLASS_LYRICS_TEMPLATE.html`

### ✅ Schema: Missing position/inLanguage/genre on lyric pages — FIXED
Added to 36 MusicComposition schemas across lyric pages:
- `position`: track number within album (1–27 for Unseen Chorus, 1–5 Cowboys EP, etc.)
- `inLanguage`: "en" for all English tracks, "es" for gay-y-orgulloso
- `genre`: ["Pop", "LGBTQ+ Pride"] for out-and-proud and gay-y-orgulloso

### ✅ JS version params missing — FIXED (Phase 4)
15 pages were loading `navigation.js` and `dark-mode.js` without `?v=` cache-busting params.
All now use `src="navigation.js?v=20260304d"` and `src="dark-mode.js?v=20260304d"`.

### ✅ CSS extraction: agust-islandia-gay-and-proud-press-release.html — FIXED
Inline `<style>` block (1,663 chars) extracted to `press-release.css?v=20260412a`.

---

## RESOLVED (2026-04-12 bug fixes + schema audit)

### ✅ BUG-001: Malformed alt text — 53 pages — FIXED
`alt="Song Title" cover art"` → `alt="Song Title cover art"` across all 53 affected files.

### ✅ BUG-002: Missing `#sr-announcements` — 76 pages — FIXED
Added `<div id="sr-announcements" class="sr-only" aria-live="polite" aria-atomic="true"></div>`
to all 76 pages that load `dark-mode.js` but lacked the element. All 78 pages now have it.

### ✅ BUG-003: test.html in production root — FIXED
Added `<meta name="robots" content="noindex, nofollow">`.

### ✅ BUG-006: Schema.org Person entity inconsistency — FIXED
Standardised Person schema across `index.html` and `about.html`:
- `index.html`: jobTitle changed from string to array, description added, ISNI kept
- `about.html`: ISNI identifier added, Wikidata sameAs added
- Both now use identical jobTitle array and description.

### ✅ BUG-007: `NewsArticle` schema misused — FIXED
Changed `NewsArticle` → `Article` on `press.html` (3 entries) and
`agust-islandia-gay-and-proud-press-release.html` (1 entry).

### ✅ Schema: Relative @id references in index.html — FIXED
All `@id` values in `index.html` changed from relative (`#agust-person`) to full URL
(`https://www.gusti.com/#agust-person`). Consistent with about.html and press.html.

### ✅ Schema: Redundant nested @context in @graph — FIXED (67 pages)
Removed duplicate `"@context": "https://schema.org"` from inside `@graph` items on 67 pages.
Root-level `@context` applies to all `@graph` items; nested declarations were redundant.

### ✅ Schema: byArtist standardised on album pages — FIXED
`gay-and-proud.html` and `swipe-me-to-the-moon.html` both now use inline `MusicGroup` for
`byArtist` (consistent with all 48 lyric pages). Inline definitions are required because
Google processes each page's JSON-LD independently — cross-page `@id` references don't resolve.

---

## RESOLVED (2026-04-12 audit fixes)

### ✅ NEW-001: Heading hierarchy on index.html — FIXED
`h1 → h3` (skipping h2). Three glass-grid `<h3>` headings changed to `<h2>`.

### ✅ NEW-002: `document.write()` email obfuscation — FIXED
`about.html` and `press.html`. Replaced pre-2010 obfuscation script with plain
`<a href="mailto:agust@arcticsea.com">agust@arcticsea.com</a>`.

### ✅ NEW-003: Album cover images missing width/height — FIXED
`index.html` and `glass/index.html`. Added intrinsic dimensions to `.album-cover` images
to prevent CLS (Cumulative Layout Shift).

### ✅ NEW-004: Hardcoded `z-index: 10000` on `.theme-toggle` — FIXED
`style-optimized.css`. Added `--z-fixed-ui: 10000` variable; `.theme-toggle` now uses it.

### ✅ NEW-006: Missing `:focus-visible` on `.nav-collapsible-trigger` — FIXED
`navigation.css`. Added `outline: 2px solid var(--color-primary-blue)` on focus.

### ✅ NEW-007: Anonymous event listeners in `script.js` — FIXED
Named `closeOutsideTooltips` and `handleInfoBubbleResize` for clarity and future removeability.

### ✅ NEW-008: `console.warn` in production `navigation.js` — FIXED
Removed from `navigation.js:22`.

### ✅ NEW-009: Skip-link positioned incorrectly in nav include — FIXED
`_includes/navigation.html`. Skip link moved to be first element (before nav-toggle button)
so keyboard Tab order is correct: skip-link → nav-toggle → nav links → content.

### ✅ NEW-010: Hardcoded light-mode nav colors in navigation.css — FIXED
`style-optimized.css` now defines 17 `--nav-light-*` CSS variables. `navigation.css`
updated to use them instead of hardcoded hex/rgba values.

### ✅ NEW-011: No preload for hero images on index.html — FIXED
Added `<link rel="preload">` for both album cover WebPs in `index.html` `<head>`.

### ✅ NEW-012: `willExpand.toString()` in `script.js` — FIXED
Changed to `willExpand ? 'true' : 'false'` in both occurrences.

### ✅ Validator hardcoded macOS path — FIXED
`html_validator.py` had `Path("/Users/gusti/...")` on lines 22 and 340.
Changed to `Path(__file__).parent`. Validator now correctly finds all 76 HTML files.

### ✅ `tetris.html` missing viewport meta tag — FIXED
Added `<meta name="viewport" content="width=device-width, initial-scale=1">`.

### ⚠️ NEW-005: `!important` overuse in CSS — PARTIALLY ADDRESSED
`navigation.css` lines 7-8: removed redundant `!important` (cascade order was sufficient).
Lines 242-243 (`content: none !important` in nav-drawer): kept intentionally — needed to
override higher-specificity `a:not(.btn-icon):hover::after` rule from style-optimized.css.
Other files (press.css, glass-site.css, etc.) not yet reviewed.

---

## Validated OK

- All 74 sitemap URLs → existing files (no broken sitemap entries)
- All internal links functional (no 404s detected)
- WebP/JPG strategy solid for main images
- Navigation consistent across all pages via `{% include navigation.html %}`
- Validator (`html_validator.py`) fixed — was using hardcoded macOS path, now uses `Path(__file__).parent`

---

## Schema.org Warnings (optional fields, low priority)

These are optional fields flagged by the validator, not errors:
- Some standalone single pages missing `lyricist` field
- Singles missing `position` (not applicable to singles — ignore)
- Some pages missing `datePublished`

These do not affect site functionality or core SEO.

**Schema patterns now standardised (2026-04-12):**
- Person entity: consistent jobTitle array, description, ISNI across index + about
- All @id references use full URLs (no relative `#fragment` refs)
- No redundant nested `@context` in `@graph` blocks
- Press items use `Article` type (not `NewsArticle`)
- `byArtist` uses inline `MusicGroup` on pages that don't define the entity in @graph

---

## Code Gotchas (Patterns to Avoid)

**No preprocessor:** CSS variables must be defined in `:root` in `style-optimized.css`
before use. Canvas API cannot read CSS vars — use literal `rgba()` strings (see tetris gotchas).

**Navigation duplication:** No server-side includes for main site pages. Nav HTML is manually
copy-pasted across all 35 pages. Always update `_includes/navigation.html` first to keep a
canonical reference, then apply the change to all pages.

**Jekyll `/_memory/` protection:** Works ONLY because there is no `.nojekyll` file in repo root.
If `.nojekyll` is ever added, all `_memory/` files become publicly readable. Do not add it.
