# Tetris Flare — Architecture

## Single-File Design

Everything lives in `games/tetris/index.html`. Structure:
1. `<head>` — meta, favicons, Firebase CDN scripts, JSON-LD schema
2. `<style>` block (~lines 61–761) — all CSS, including dark mode vars and mobile media query
3. `<body>` — HTML layout (hero, wrapper, panels, board, overlays, footer)
4. `<script>` block (~lines 893–2400+) — VERSION constant, i18n, audio, game engine, event listeners
5. Second `<script>` block — Firebase init + auth/Firestore logic

No npm. No bundler. No build step.

---

## Rendering

- **Canvas API** — board is `<canvas id="board">`, sized `CELL*COLS × CELL*ROWS`
- **Colors must be literal `rgba()` strings** — Canvas cannot resolve CSS variables
- `drawCell(ctx, r, c, color)` — glass cell with gradient fill + specular highlight + border
- `drawCellQuad()` / `drawCellSlot()` — special renderers for W piece cells
- `draw()` — clears canvas, draws grid lines, draws board cells, draws ghost, draws current piece
- `drawNext()` / `drawHold()` — mini preview canvases

### Grid Lines (option D)
```js
ctx.strokeStyle = 'rgba(90,100,125,0.60)';
ctx.lineWidth = 0.5;
```

### Dynamic CELL size (mobile)
```js
let CELL = 30; // recalculated by initCellSize() on mobile
```
`initCellSize()` runs inside `startGame()` and on window resize (debounced 150ms).  
Mobile: `CELL = Math.min(floor(availW/COLS), floor(availH/ROWS), 30)`, min 16px.

---

## Audio (Web Audio API)

All sounds synthesized — no audio files.

**Key functions:**
```js
getACtx()      // lazy AudioContext init (window.AudioContext || window.webkitAudioContext)
unlockAudio()  // plays silent 1-frame buffer on first gesture (iOS WebKit requirement)
audioNow()     // ctx.currentTime + 0.008  (Safari returns 0 right after resume)
playSound(id)  // safe dispatcher — handles 'suspended' and 'interrupted' states
osc(ctx, type, freq, vol, t0, dur)        // oscillator helper
sweep(ctx, type, f0, f1, vol, t0, dur)   // frequency-sweep oscillator
noise(ctx, vol, t0, dur)                 // white noise burst
makeGain(ctx, vol, t0, decay)            // gain node with exponential decay
```

**Safari quirks:**
- `unlockAudio()` plays a silent buffer synchronously in the gesture handler — `resume()` alone is not enough on iOS
- `audioNow()` adds `+0.008s` — Safari's `currentTime` can be 0 immediately after resume; notes scheduled at 0 are silently dropped
- `playSound()` checks for `'interrupted'` state (Safari-specific, occurs on phone calls / tab-switch)
- `handleStart()` wraps `unlockAudio().then(startGame)` in try/catch — audio failure must never block game start

---

## Firebase

**Project:** `agust-islandia-tetris`  
**Auth domain:** `agust-islandia-tetris.firebaseapp.com`  
**SDK:** Firebase 10.x compat CDN (no bundler needed)  
**Authorized domains:** `gusti1976.github.io`, `gusti.com`, `www.gusti.com`

**Firestore collection:** `scores/{uid}`  
Each document: `displayName` (first name only), `photoURL`, `score`, `level`, `lines`, `updatedAt`

**Sign-in:** Google popup. No Apple Sign-In.

**Score save logic:**
- Signed in at game over → `maybeSaveScore()` saves immediately
- Not signed in at game over → `pendingScoreSave = true`
- Signs in from game-over overlay → `auth.onAuthStateChanged` fires and auto-saves

**Leaderboard query:**
- Mini sidebar: top 5, always visible. Format: `1. Name / X,XXX pts` (two lines per entry)
- Full modal (L key): top 20. Rank | Name | Score grid.
- **Firestore `forEach` has no index** — use `let i = 0; i++` manual counter, NOT `forEach((doc, i) =>` (second arg is undefined)

---

## Internationalisation (i18n)

Four languages: `en`, `pt`, `pt-br`, `es`

```js
TRANSLATIONS = { en: {...}, pt: {...}, 'pt-br': {...}, es: {...} }
```

`applyLang()` runs at page load and on language change. It:
1. Updates all `[data-i18n]` elements via `textContent`
2. Updates label elements directly by ID
3. Sets `#ctrl-text` innerHTML (contains `<div>` rows with `<kbd>` tags)
4. Calls `updateDarkLabel()` to re-translate the dark mode toggle label
5. Re-translates game-over overlay strings if overlay is visible (uses `lastEndGame` state object)

**Browser language detection:** `detectLang()` checks `navigator.languages` and maps to supported codes.

**Dynamic strings** (not `data-i18n`, set by JS at runtime):
- `finalScore` — `finalTpl(score, level, lines)`
- `go-save-hint` — `saveHint`
- `go-lb-btn` — `viewLb`
- `go-saved-msg` — `personalBest` or `yourBest(n)`

---

## Dark Mode

Toggled by Apple-style pill switch next to language selector.  
Saved to `localStorage` key `tetris_dark`. Falls back to `prefers-color-scheme` on first visit.

**Implementation:** `body.dark` class on `<body>` overrides CSS custom properties in `:root`.

```css
body.dark {
  --bg-a/b/c: deep navy/purple tones
  --bg-base:  dark gradient
  --ink:      #dce8ff
  --ink-soft: #8ea8d8
  --glass:    rgba(20,32,70,0.72)
  --glass-strong: rgba(18,28,60,0.88)
  --glass-border: rgba(80,110,200,0.28)
  --glass-shadow: rgba(0,10,60,0.45)
}
```

**Level background tint in dark mode:**
`updateBodyTheme()` checks `document.body.classList.contains('dark')` and applies dark HSL palette (8–12% lightness) vs light palette (68–82%). Called from `setDark()` (try/catch guard — `level` may be in TDZ at page load) and from `clearLines()`.

**Translation keys:** `darkLight` / `darkDark` in all 4 languages.

---

## Mobile Layout

Single breakpoint: `@media (max-width: 640px)`

- Left panel (Hold + Stats) → horizontal stats strip above board; Hold canvas hidden
- Right panel → compact strip below board; keyboard controls hidden
- Touch gestures: swipe left/right = move, swipe down = soft drop, tap = rotate
- Touch hint shown below board on mobile (hidden on desktop via `display:none`)
- `#touch-hint` uses `data-i18n="touchHint"` — translated in all 4 languages

---

## Drop Timer Architecture

**Rule:** `scheduleDrop()` must fire exactly once per piece lifecycle.

```
scheduleDrop()
  └─ setTimeout fires
       ├─ tryMove(1,0) succeeds → draw → scheduleDrop()  [loop]
       └─ tryMove fails → lockPiece() → caller calls scheduleDrop()
```

`lockPiece()` always calls `clearTimeout(dropTimer)` at entry.  
After lock, the **caller** schedules the next drop:
- Timer callback → always calls `scheduleDrop()` after `lockPiece()` returns
- `softDrop()` → calls `scheduleDrop()` after lock
- `hardDrop()` → calls `scheduleDrop()` after lock
- W piece animation → animation end callback calls `scheduleDrop()`; `isAnimating` flag blocks timer callback from double-scheduling

**Bug:** extra `scheduleDrop()` anywhere doubles the timers per tick → exponential speedup within seconds.
