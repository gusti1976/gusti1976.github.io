# Tetris Flare — Project Notes

**Full title:** Tetris Flare: Snap, Stack & Slay  
**Author:** Agust Smari Bjarkarson / Agust Islandia  
**Live URL:** https://www.gusti.com/tetris.html  
**Source:** `gusti1976.github.io` → `tetris.html` (single file, no build step)  
**Current version:** 0.187 (increment by 0.001 each release — visible in footer)

---

## Architecture

Everything lives in one self-contained HTML file (`tetris.html`). No npm, no bundler, no external JS except Firebase SDKs loaded from CDN.

- **Rendering:** HTML Canvas API. Colors must be literal `rgba()` strings — Canvas cannot resolve CSS variables.
- **Audio:** Web Audio API, fully synthesized (no audio files). All sounds are built from oscillators, noise buffers, and gain nodes.
- **Storage:** Firebase Firestore (scores) + Firebase Auth (Google Sign-In). One Firestore document per user, keyed by `uid`, updated only on new personal best.
- **i18n:** Four languages — `en`, `pt`, `pt-br`, `es`. Translation object `TRANSLATIONS` in script. `applyLang()` applies on load and on language change.

---

## File Structure

```
tetris.html        Main game (everything in one file)
test.html          Scratch/preview page (safe to overwrite)
Tetris.md          This file
favicon-*.png      Shared favicons used by the whole site
```

---

## Firebase

**Project:** `agust-islandia-tetris`  
**Auth domain:** `agust-islandia-tetris.firebaseapp.com`  
**Authorized domains:** `gusti1976.github.io`, `gusti.com`, `www.gusti.com`

**Firestore collection:** `scores/{uid}`  
Each document stores: `displayName` (first name only), `photoURL`, `score`, `level`, `lines`, `updatedAt`

Sign-in method: Google (popup). No Apple Sign-In at this time.

**Score save logic:**
- If signed in at game over → save immediately via `maybeSaveScore()`
- If not signed in at game over → `pendingScoreSave = true`
- When user signs in from the game-over overlay → score saves automatically via `auth.onAuthStateChanged`

---

## Game Mechanics

### Pieces
Standard pieces: I, O, T, S, Z, J, L  
Secret piece: **W** (see below)

`PIECE_KEYS = ['I','O','T','S','Z','J','L']` — W is excluded and injected separately.

### Scoring
| Lines cleared | Points |
|---|---|
| 1 line | 100 × level |
| 2 lines | 300 × level |
| 3 lines | 500 × level |
| 4 lines (Tetris) | 800 × level |

- Soft drop: +1 pt per cell
- Hard drop: +2 pts per cell
- Level increases every 10 lines
- Drop interval: `Math.max(100, 1000 - (level - 1) * 80)` ms

### Controls
| Key | Action |
|---|---|
| ← → | Move |
| ↑ | Rotate |
| ↓ | Soft drop |
| Space | Hard drop |
| C | Hold |
| P | Pause |
| M | Mute |
| L | Leaderboard modal |
| H | Help modal |

---

## The W Piece (Secret Piece)

The rarest piece. Never shown in the "Next" queue. Never spawns twice in a row.  
Spawn probability: ~10% when `lastWasSpecial` is false.

**Shape:** Wide T-shape, 6 cells.  
- 3-cell horizontal bar on top (rot 0) or bottom (rot 1)
- 3-cell vertical stem
- Only 2 valid rotations: T (0) and ∩ (1), mapped as `[down, up, down, up]`

**Cell types:**
- `cellTypes: ['quad', null, 'quad', null, null, 'slot']`
- `quad` cells (positions 0 and 2): rendered as 2×2 sub-block decorative squares
- `slot` cell (position 5): pink (`rgba(235,100,155,0.90)`), has a groove — this is the ooze origin

**On lock — Ooze animation:**
1. `isAnimating = true` — pauses the drop timer
2. `getExpandCells()` finds adjacent empty cells (jumps over one occupied cell)
3. `animateOoze()` fills them pearl-white wave by wave, originating from the pink cell
4. Pearl colour: `rgba(245, 240, 255, 0.94)`
5. On animation end: `clearLines()` → `spawnPiece()` → `scheduleDrop()`

**Quad Power Easter egg:**  
If both `quad` cells are cleared in a single line-clear event → score ×256.  
Triggered when `boardMeta[r]` contains `'quad'` during `clearLines()`.  
Sound: `sndQuadPower`. Label: `QUAD POWER ×256`.

**`boardMeta[][]`:** Parallel array to `board[][]`. Stores cell types (`'quad'`, `'slot'`, or `null`) after lock so special rendering persists on the board.

---

## Audio (Web Audio API)

All sounds synthesized — no audio files.

**Safari quirks:**
- `unlockAudio()` plays a silent 1-frame buffer on first gesture (iOS requirement)
- `audioNow()` adds `+0.008s` offset to `ctx.currentTime` — Safari returns 0 immediately after resume, dropping notes scheduled at exactly 0
- `playSound()` handles `'interrupted'` state (Safari pauses audio on phone calls / tab switches)

**Key functions:**
```js
getACtx()      // lazy AudioContext init
unlockAudio()  // call on first user gesture, returns Promise
audioNow()     // ctx.currentTime + 0.008
playSound(id)  // safe dispatcher — handles suspended/interrupted states
```

---

## Drop Timer Architecture

**Critical rule:** `scheduleDrop()` must be called exactly once per piece lifecycle.

```
scheduleDrop()
  └─ setTimeout fires
       ├─ tryMove(1,0) succeeds → draw → scheduleDrop()   [loop]
       └─ tryMove fails → lockPiece() → scheduleDrop()    [new piece]
```

`lockPiece()` always calls `clearTimeout(dropTimer)` at the top.  
After normal lock, the **caller** is responsible for `scheduleDrop()`:
- Timer callback: calls it unconditionally after `lockPiece()` returns
- `softDrop()`: calls it after `lockPiece()`
- `hardDrop()`: calls it after `lockPiece()`
- W piece: animation callback calls it when done (`isAnimating` guards prevent double-scheduling)

**Common bug pattern:** If `scheduleDrop()` is called both inside `lockPiece()` AND in the caller, timers double each tick → exponential speedup.

---

## Translation System

`TRANSLATIONS` object with keys: `en`, `pt`, `pt-br`, `es`

`applyLang()` runs on page load and on language change. It:
1. Updates all `[data-i18n]` elements via `textContent`
2. Updates label elements directly by ID
3. Sets `ctrl-text` innerHTML (has `<kbd>` tags)
4. Re-translates game-over overlay strings if visible (uses `lastEndGame` state)

**`lastEndGame`** must be declared **before** `applyLang()` is defined, because `applyLang()` references it and is called at page load. Declaring it after with `let` causes a temporal dead zone crash.

**Dynamic game-over strings** (not data-i18n, set by JS):
- `finalScore` — rendered by `finalTpl(score, level, lines)`
- `go-save-hint` — `saveHint`
- `go-lb-btn` — `viewLb`
- `go-saved-msg` — `personalBest` or `yourBest(n)`

---

## Leaderboard

- **Mini (sidebar):** Top 5, always visible. Format: `1. Name / X,XXX,XXX points` (two lines per entry).
- **Full modal (L key):** Top 20. Format: rank | name | score.

Both use a manual counter (`let i = 0; i++`) instead of `forEach((doc, i) =>` because Firestore's `QuerySnapshot.forEach` does not pass an index.

NaN-proofing: `Math.floor(Number(d.score) || 0)` and `(d.displayName || d.name || 'Anon').split(' ')[0]`

---

## Dark Mode

Toggled by an Apple-style pill switch next to the language selector. Preference saved to `localStorage` key `tetris_dark`. Falls back to `prefers-color-scheme` on first visit.

**Implementation:** `body.dark` class on `<body>` overrides CSS variables defined in `:root`. All glass panels, backgrounds, ink colours, and borders are driven by vars so dark mode is a single class toggle.

**Key dark mode vars:**
```css
body.dark {
  --bg-a/b/c: deep navy/purple tones
  --bg-base: dark gradient
  --ink: #dce8ff  (light text)
  --ink-soft: #8ea8d8
  --glass: rgba(20,32,70,0.72)
  --glass-strong: rgba(18,28,60,0.88)
  --glass-border: rgba(80,110,200,0.28)
}
```

**Translation keys:** `darkLight` / `darkDark` in all 4 languages. Label re-translates via `updateDarkLabel()` called from `applyLang()`.

**Gotcha:** `darkCb` and `darkLabel` must be declared before `applyLang()` runs (same temporal dead zone rule as `lastEndGame`).

---

## Known Gotchas

- **Canvas colors:** Must be literal `rgba()` — no CSS variables, no named colors.
- **`applyLang()` runs at page load** — any variable it references must be declared before it runs, even if the code path is gated behind a condition. `let` has a temporal dead zone.
- **Firebase `forEach` has no index** — use a manual counter.
- **Safari AudioContext:** `resume()` alone is not enough on iOS. Must play a silent buffer in the gesture handler. See `unlockAudio()`.
- **`handleStart` must never throw** — it's the gate to the entire game. Wrap everything in try/catch and always call `startGame()` as fallback.
- **Timer accumulation:** Every extra `scheduleDrop()` call creates an additional parallel timer. At 60fps this doubles each tick and produces runaway speedup within seconds.

---

## Versioning

Version is a constant at the top of the game script:
```js
const VERSION = '0.179';
```
Increment by `0.001` on each push. Displayed in the page footer so you can verify the live site is up to date.

---

## SEO / Meta

- Canonical: `https://www.gusti.com/tetris.html`
- `og:url`: same
- JSON-LD schema type: `VideoGame`
- Favicons: shared with main site (`/favicon-32x32.png`, `/favicon-16x16.png`, `/apple-touch-icon.png`, `/android-chrome-192x192.png`)
