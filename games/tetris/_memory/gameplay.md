# Tetris Flare — Gameplay

## Pieces

Standard: I, O, T, S, Z, J, L  
Secret: **W**

```js
PIECE_KEYS = ['I','O','T','S','Z','J','L']  // W excluded, injected separately
```

**Piece colors (literal rgba — Canvas cannot use CSS vars):**
| Piece | Color |
|---|---|
| I | `rgba(0,200,255,0.82)` — cyan |
| O | `rgba(255,210,0,0.82)` — yellow |
| T | `rgba(180,60,255,0.82)` — purple |
| S | `rgba(0,210,100,0.82)` — green |
| Z | `rgba(255,60,60,0.82)` — red |
| J | `rgba(40,100,255,0.82)` — blue |
| L | `rgba(255,140,0,0.82)` — orange |

---

## Scoring

| Lines cleared | Points |
|---|---|
| 1 line | 100 × level |
| 2 lines | 300 × level |
| 3 lines | 500 × level |
| 4 lines (Tetris!) | 800 × level |

- Soft drop: +1 pt per cell dropped
- Hard drop: +2 pts per cell dropped
- Level up every 10 lines
- Drop interval: `Math.max(100, 1000 − (level − 1) × 80)` ms

---

## Controls

| Key | Action |
|---|---|
| ← → | Move |
| ↑ | Rotate |
| ↓ | Soft drop |
| Space | Hard drop |
| C | Hold |
| P | Pause / unpause |
| M | Mute / unmute |
| L | Leaderboard modal |
| H | Help modal |

Touch gestures (mobile): swipe left/right = move, swipe down = soft drop, tap = rotate.

---

## The W Piece (Secret)

Never shown in the Next queue. Never spawns twice in a row.  
Spawn probability: ~10% when `lastWasSpecial === false`.

**Shape:** Wide T — 6 cells.
- Bar of 3 (top or bottom depending on rotation)
- Stem of 3
- Valid rotations: T-down (0/2) and T-up (1/3)

**Cell types:**
```js
cellTypes:  ['quad', null, 'quad', null, null, 'slot']
cellColors: [bronze, bronze, bronze, bronze, bronze, pink]
```
- `quad` cells (0, 2): rendered as 2×2 decorative sub-blocks
- `slot` cell (5): pink `rgba(235,100,155,0.90)` — ooze origin point

**On lock — Ooze animation:**
1. `isAnimating = true` — pauses drop timer
2. `getExpandCells()` — finds adjacent empty cells (can jump one occupied cell)
3. `animateOoze()` — fills them pearl-white wave by wave from the pink cell
4. Pearl colour: `rgba(245,240,255,0.94)`
5. Animation end: `clearLines()` → `spawnPiece()` → `scheduleDrop()`

**`boardMeta[][]`:** Parallel array to `board[][]`. Stores `'quad'`, `'slot'`, or `null` after lock so special rendering persists.

---

## Quad Power Easter Egg (W piece bonus)

When both `quad` cells of a W piece are cleared in a single `clearLines()` call:
- Score ×256
- Sound: `sndQuadPower`
- Label: `QUAD POWER ×256`

Triggered when `boardMeta[r]` contains `'quad'` during line clear check.

---

## Rainbow Board Clear Easter Egg

**Trigger:** Pause the game (P), then click board cells in this color sequence:
**Yellow (O piece) → Red (Z piece) → Green (S piece) → Blue (J piece)**

- Wrong click resets sequence; wrong click that is yellow restarts from step 1
- Each correct tap plays an ascending ping (440 → 880 Hz triangle wave)
- Sequence only works when `paused === true && easterAnimating === false`

**Color detection:**
```js
function easterCellColor(rgba) {
  if (rgba.startsWith('rgba(255,210'))  return 'yellow'; // O
  if (rgba.startsWith('rgba(255,60'))   return 'red';    // Z
  if (rgba.startsWith('rgba(0,2'))      return 'green';  // S
  if (rgba.startsWith('rgba(40,100'))   return 'blue';   // J
}
```

**Phase 1 — Row sweep (~1.3 s):**
- Rows 19 → 0, one row every 62 ms
- Each row fills with cycling pride colours: Red / Orange / Yellow / Green / Blue / Violet
- Each row plays an ascending harp-pluck note (C2 → C7 over 20 rows)

**Phase 2 — Particle explosion:**
- 200 particles (one per cell), each with random velocity, gravity, spin, fade
- Bass boom (80→30 Hz sine) + cymbal crash (noise burst) at trigger
- Particles drawn as rotating rounded squares

**Phase 3 — Clean slate:**
- `board[][]` and `boardMeta[][]` zeroed
- Board redrawn empty
- Game stays paused — player can unpause on a fresh board
- Triumphant C5→E5→G5 fanfare plays

**Pride colours used:**
```js
PRIDE_COLORS = [
  'rgba(228,3,3,0.94)',   // red
  'rgba(255,140,0,0.94)', // orange
  'rgba(255,237,0,0.94)', // yellow
  'rgba(0,128,38,0.94)',  // green
  'rgba(0,77,255,0.94)',  // blue
  'rgba(117,7,135,0.94)', // violet
]
```
