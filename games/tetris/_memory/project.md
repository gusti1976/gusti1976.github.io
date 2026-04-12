# Tetris Flare — Project Overview

**Full title:** Tetris Flare: Snap, Stack & Slay  
**Author:** Agust Smari Bjarkarson / Agust Islandia  
**Live URL:** https://www.gusti.com/games/tetris/  
**Source file:** `gusti1976.github.io` → `games/tetris/index.html`  
**Old URL (redirects):** https://www.gusti.com/tetris.html → meta-refresh to new URL  
**Current version:** 0.192 (increment by 0.001 each release — visible in footer)

---

## File Structure

```
games/tetris/
  index.html          The entire game — HTML + CSS + JS in one file, no build step
  _memory/            Notes & docs (Jekyll blocks web access to _ prefixed paths)
    project.md        This file — overview, URLs, versioning
    architecture.md   Tech stack, rendering, audio, Firebase, i18n, dark mode
    gameplay.md       Pieces, scoring, controls, W piece, Easter eggs
    gotchas.md        Bugs, traps, and hard-won lessons

test.html             Scratch/preview page at repo root — safe to overwrite
favicon-*.png         Shared favicons used by whole site (root level)
Tetris.md             DEPRECATED — replaced by this _memory/ folder (delete when safe)
```

---

## Versioning

Version constant at the top of the game `<script>`:
```js
const VERSION = '0.192';
```
- Increment by `0.001` on every push
- Displayed in the page footer — verify against this to confirm live deploy is current
- Footer format: `© Agust Islandia · All rights reserved · v0.192`

## Version Log (recent)

| Version | Change |
|---|---|
| 0.192 | Easter egg: Rainbow Board Clear (pause + click Yellow→Red→Green→Blue) |
| 0.191 | Controls list: div rows with flex gap (was line-height + br) |
| 0.190 | Fix TDZ crash: setDark() calling updateBodyTheme() at page load |
| 0.189 | kbd breathing room: margin-right + dark mode chip style |
| 0.188 | Fix level background tint staying light in dark mode |
| 0.187 | Mobile layout: responsive design, dynamic CELL, touch hint |
| 0.186 | Dark mode: fix Game Over overlay readability |
| 0.185 | Dark mode: darken background orbs |
| 0.184 | Fix TDZ: darkCb/darkLabel declared before applyLang |
| 0.183 | Dark mode: white subtitle + brighter lang trigger |
| 0.182 | Dark mode toggle: replace emoji with translated Light/Dark |
| 0.181 | Dark mode toggle (Apple-style) |
| 0.180 | Version number + copyright footer |
| 0.179 | Initial versioned release |

---

## SEO / Meta

- **Canonical:** `https://www.gusti.com/games/tetris/`
- **og:url:** same
- **JSON-LD schema type:** `VideoGame`
- **Favicons:** shared with main site — `/favicon-32x32.png`, `/favicon-16x16.png`, `/apple-touch-icon.png`, `/android-chrome-192x192.png`
- Languages declared: `en`, `pt`, `pt-BR`, `es`
