# Bugs & Known Issues

Last audit: 2026-04-12. Run `python3 html_validator.py` to re-validate.

---

## HIGH Priority

### BUG-001: Malformed alt text — 30+ song pages
**Pattern:** `alt="Song Title" cover art"` (extra quote closes the attribute early; " cover art" becomes stray text)  
**Correct pattern:** `alt="Song Title cover art"` (no stray quote)  
**Affected:** All Unseen Chorus track pages that use `the-unseen-chorus-cover.webp`:
a-bar-in-my-pocket, broken-spurs, can-you-host, circle-of-chairs, come-out-of-the-dark,
could-this-be-it, dark-room-desire, ding-a-ling-a-ling, empty-mornings, endless-tabs,
every-day-is-a-wonder, every-single-day, first-session, fuck-this-shit, gaycation, he-left-me,
i-am-in-love, like-i-have-known-you, maybe-i-took-it-too-far, mirrors-in-the-mind,
not-broken-anymore, not-supposed-to, our-place-finally, phone-glow, playing-with-my-ding-dong,
pornhub-paradise, rock-bottom, signed-and-sealed, steam-and-shadows, table-for-two,
ten-years-strong, the-floor-is-mine, the-ramble, the-unseen-chorus-title-track, two-steers-in-love,
yall-means-all  
**Fix:** Search for `" cover art"` (with leading quote), replace with ` cover art"` across all files.

### BUG-002: Missing `#sr-announcements` on 76 pages
**Issue:** `dark-mode.js` calls `document.getElementById('sr-announcements')` to announce theme
changes to screen readers. Only `index.html` has this element. On all other pages, announcements
silently fail — breaking WCAG 4.1.3 (Status Messages).  
**Affected:** All pages except `index.html`  
**Fix:** Add to every page's `<body>` (already in index.html, add to all others):
```html
<div id="sr-announcements" role="status" aria-live="polite" aria-atomic="true" class="sr-only"></div>
```
The `.sr-only` class must visually hide the element while keeping it accessible.

### BUG-003: test.html in production root
**Issue:** `test.html` is publicly accessible at www.gusti.com/test.html with no purpose.  
**Fix:** Add `<meta name="robots" content="noindex, nofollow">` or delete the file.

---

## MEDIUM Priority

### BUG-004: CSS cache-busting version mismatch
**Issue:** Same stylesheets referenced with different `?v=` params across pages.
- `glass-site.css`: `?v=20260304e` on some pages, `?v=20260317a` on others
- `navigation.css`: sometimes with version param, sometimes without
**Fix:** Standardize all pages to use the latest version string. Search for each stylesheet
filename and ensure all references use the same `?v=` value.

### BUG-005: GLASS template files publicly accessible
**Files:** `GLASS_ALBUM_TEMPLATE.html`, `GLASS_LYRICS_TEMPLATE.html`  
**Issue:** Contain unparsed placeholder variables like `{{album_slug}}` and are publicly accessible.  
**Fix:** Move to `_templates/` directory (Jekyll-protected) or add:
```html
<meta name="robots" content="noindex, nofollow">
```

### BUG-006: Schema.org entity type inconsistency
**Issue:** `index.html` uses `Person` as the primary entity. `about.html` uses both `Person`
and `MusicGroup`. Inconsistent signals to search engines.  
**Fix:** Standardize: use `Person` as primary entity with `sameAs` links on all pages.
`MusicGroup` can be used in `byArtist` fields within MusicComposition/MusicRecording schemas.

### BUG-007: `NewsArticle` schema misused in press.html
**Issue:** Press release announcements tagged as `NewsArticle` — they are not time-sensitive news.  
**Fix:** Change schema type to `PressRelease` (a subtype of `Article`) or `CreativeWork`.

### BUG-008: Missing canonical, viewport, charset, lang on utility files
**Affected:** `navigation-template.html`, `google46e00271f9de7d83.html`  
**Impact:** Low (not public pages) but technically malformed.

---

## LOW Priority

### BUG-009: Missing JPG fallbacks for 2 WebP images
- `gay-and-proud-cover.webp` — no `.jpg` fallback
- `swipe-me-to-the-moon-cover.webp` — no `.jpg` fallback  
**Impact:** Very old browsers (<5% of users) won't load these images.  
**Fix:** Create JPG versions and add `<picture>` element with fallback.

### BUG-010: `--z-header: 1` defined but rarely used
CSS variable defined in `:root` but almost never referenced. Low impact, code smell only.

### BUG-011: games/prince-of-persia/ pages lack main site navigation and dark-mode.js
**Affected:** `games/prince-of-persia/*.html`  
**By design** — that game is a separate, self-contained experience. Noting here for awareness.

**Not a bug — Tetris:**
- `games/tetris/index.html` has its **own** dark mode (`tetris_dark` localStorage key, built
  entirely into the game file). It intentionally does not load `dark-mode.js`. Not missing.
- `tetris.html` at repo root is a `<meta http-equiv="refresh">` redirect stub to `games/tetris/`.
  It is not a real page and does not need `dark-mode.js`.

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

## Schema.org Warnings (67 total, low priority)

These are optional fields flagged by the validator, not errors:
- 13 standalone single pages missing `lyricist` field
- Singles missing `position` (not applicable to singles — ignore)
- Some pages missing `datePublished`

These do not affect site functionality or core SEO.

---

## Code Gotchas (Patterns to Avoid)

**No preprocessor:** CSS variables must be defined in `:root` in `style-optimized.css`
before use. Canvas API cannot read CSS vars — use literal `rgba()` strings (see tetris gotchas).

**Navigation duplication:** No server-side includes for main site pages. Nav HTML is manually
copy-pasted across all 35 pages. Always update `_includes/navigation.html` first to keep a
canonical reference, then apply the change to all pages.

**Jekyll `/_memory/` protection:** Works ONLY because there is no `.nojekyll` file in repo root.
If `.nojekyll` is ever added, all `_memory/` files become publicly readable. Do not add it.
