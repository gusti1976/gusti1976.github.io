# Navigation System

## Files

| File | Role |
|---|---|
| `navigation.css` | All hamburger nav styles (268 lines) — linked on every page |
| `navigation.js` | Toggle, collapsible sections, active state — linked on every page |
| `_includes/navigation.html` | The canonical nav HTML fragment — **edit this first** |
| `navigation-template.html` | Full page template showing nav in context |

## HTML Snippet (copy into every page)

```html
<!-- In <head>: -->
<link rel="stylesheet" href="navigation.css">

<!-- At top of <body>: -->
<a href="#main-content" class="skip-link">Skip to main content</a>
<button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
  <span></span><span></span><span></span>
</button>
<nav class="nav-drawer" id="nav-drawer" aria-label="Main navigation">
  <!-- full nav content from _includes/navigation.html -->
</nav>
<div class="nav-overlay" id="nav-overlay"></div>

<!-- Before </body>: -->
<script src="dark-mode.js"></script>
<script src="navigation.js"></script>
```

Note: `{% include navigation.html %}` is a Jekyll syntax — GitHub Pages processes it.
For non-Jekyll-processed pages, paste the raw HTML from `_includes/navigation.html`.

## Menu Hierarchy

```
Home  (/)
Music  [collapsible]
  The Unseen Chorus  (/the-unseen-chorus.html)
  Swipe Me to the Moon  (/swipe-me-to-the-moon.html)
  Gay and Proud  (/gay-and-proud.html)
  My Fire (Mi Fuego)  (/my-fire.html)
  Feel Alive  (/feel-alive.html)
Lyrics  (/lyrics.html)
About  (/about.html)
Press  (/press.html)
Listen & Links  [collapsible]
  Apple Music  (external)
  Spotify  (external)
  TikTok  (external)
  Contact  (mailto)
```

## Adding a Page to Nav

1. Edit `_includes/navigation.html` (or `navigation-template.html` for context)
2. Apply the same change to all 35 main HTML pages manually — there are no server-side
   includes for non-Jekyll paths. Use find-and-replace across files.

## CSS Classes

| Class | Purpose |
|---|---|
| `.nav-toggle` | Hamburger button (3 `<span>` children become bars) |
| `.nav-drawer` | Slide-out panel; `.open` class toggles visibility |
| `.nav-overlay` | Full-screen click-catcher behind open drawer |
| `.nav-collapsible` | Wrapper for expandable section |
| `.nav-collapsible-trigger` | Button that expands/collapses a section |
| `.nav-collapsible-content` | Collapsible content pane |
| `.arrow` | Rotating chevron on trigger buttons |
| `.skip-link` | Accessibility skip-to-content link |

## Active State

`setActiveLink()` in `navigation.js` reads `window.location.pathname` and adds `active`
class to the matching nav link, then auto-expands any `.nav-collapsible` that contains it.
No manual configuration needed.

## Keyboard Access

- **Escape**: closes open drawer
- **Click outside** (overlay): closes drawer
- Body scroll is locked while drawer is open
