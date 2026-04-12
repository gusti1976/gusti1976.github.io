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

### BUG-011: games/ pages lack main site navigation and dark-mode.js
**Affected:** `games/prince-of-persia/*.html`, `games/tetris/index.html`  
**By design** — games are separate experiences. Noting here for awareness.

---

## Validated OK

- All 50 sitemap URLs → existing files (no broken sitemap entries)
- All internal links functional (no 404s detected)
- WebP/JPG strategy solid for main images
- Navigation consistent across all 35 main pages
- 0 content errors from `python3 html_validator.py` (as of 2026-03-01)

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
