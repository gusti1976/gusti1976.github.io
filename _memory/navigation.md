# Navigation System

## Files

| File | Role |
|---|---|
| `navigation.css` | Hamburger drawer styles — linked on every page |
| `navigation.js` | Toggle, collapsible sections, active state, lyric-page fallback |
| `_includes/navigation.html` | The canonical nav HTML fragment — **edit this first** |
| `navigation-template.html` | Reference mirror of the include. Not copy-pasted into pages. |

## How pages load the nav

All 74 public pages use the Jekyll include — GitHub Pages processes it at build time:

```html
<body>
  {% include navigation.html %}
  ...
</body>
```

**Editing `_includes/navigation.html` updates every page at once.** The earlier
CLAUDE.md note about "no server-side includes" was outdated; the include is live.

Template files that are not rendered through Jekyll (none currently — the `GLASS_*`
templates now also use the include) would need the raw HTML instead.

## Menu Hierarchy (as of 2026-04-14)

```
Home  (/)

Releases  [collapsible]
  The Unseen Chorus         (/the-unseen-chorus.html)
  Swipe Me to the Moon      (/swipe-me-to-the-moon.html)
  Cowboys EP                (/cowboys.html)
  The Gay Mormon Musical    (/the-gay-mormon-musical.html)
  Pride Month 2025          (/pride-month-2025.html)
  Gay and Proud             (/gay-and-proud.html)
  Full discography →        (/discography.html)

Lyrics  (/lyrics.html)

About the musician  [collapsible]
  Biography                 (/about.html)
  Press                     (/press.html)
  Contact                   (/contact.html)

Listen  [collapsible]
  Apple Music               (external)
  Spotify                   (external)
  TikTok                    (external)
```

Four sections matching the user's mental model: Releases, Lyrics, About, Listen.
Ten top-level items total; long lists live on hub pages (`discography.html`,
`lyrics.html`), not inside the drawer.

## Adding a page to the nav

1. Edit `_includes/navigation.html` — that's the only file.
2. Validate: `python3 html_validator.py` (0 errors required).
3. Deploy per CLAUDE.md Deployment Rule (merge to `main`, push).

## CSS Classes

| Class | Purpose |
|---|---|
| `.nav-toggle` | Hamburger button (3 `<span>` children become bars) |
| `.nav-drawer` | Slide-out panel; `.open` class toggles visibility |
| `.nav-overlay` | Full-screen click-catcher behind open drawer |
| `.nav-link` | Top-level drawer link |
| `.nav-collapsible` | Wrapper for expandable section |
| `.nav-collapsible-trigger` | Button that expands/collapses a section |
| `.nav-collapsible-content` | Collapsible content pane |
| `.arrow` | Rotating chevron on trigger buttons |
| `.skip-link` | Accessibility skip-to-content link |

## Active State

`setActiveLink()` in `navigation.js` does the following in order:

1. Reads `window.location.pathname`.
2. Adds `.active` to any nav link whose `href` matches, and expands that link's
   parent collapsible if there is one.
3. **Fallback for lyric pages:** if no nav link matched AND the page loads
   `glass-lyrics-template.css`, the top-level `Lyrics` link is activated. This
   keeps ~50 lyric pages visually anchored to their section even though they are
   not individually listed in the drawer.

No manual configuration needed for new lyric pages — the stylesheet check catches
them automatically.

## Cache-busting versions

When `navigation.js` changes, bump `?v=...` on the `<script src="navigation.js?v=...">`
line across all pages. Current version: `v=20260414a`. Same pattern for
`navigation.css` (`v=20260304d`).

## Keyboard Access

- **Escape**: closes open drawer
- **Click outside** (overlay): closes drawer
- Body scroll is locked while drawer is open
