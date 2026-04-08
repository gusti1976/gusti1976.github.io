# Prince of Persia — Browser Game: Knowledge Base

## Project Overview
Self-contained HTML5 Canvas platformer recreation of Prince of Persia, hosted at `/games/prince-of-persia/index.html` on gusti1976.github.io. Visually independent from the rest of the site (dark dungeon aesthetic). No build step, no external dependencies except Firebase CDN.

---

## File Structure
```
games/prince-of-persia/
├── index.html       # ~2500–3500 line self-contained game
└── knowledge.md     # This file — architecture reference for future sessions
```

---

## Firebase Integration

### SDK
- Firebase Compat v10.14.1 (same as tetris.html)
- CDN: `https://www.gstatic.com/firebasejs/10.14.1/`
  - `firebase-app-compat.js`
  - `firebase-auth-compat.js`
  - `firebase-firestore-compat.js`

### Project
- **Firebase project**: `agust-islandia-tetris` (shared with Tetris game)
- **Firestore collection**: `pop_scores/{uid}`

### Auth
- Google Sign-In via `auth.signInWithPopup(googleProvider)`
- `auth.onAuthStateChanged()` listener manages `fbUser` global
- `pendingScoreSave` flag: if game ends while signed out, save fires on next sign-in

### Score Document Structure
```js
{
  displayName: string,     // First name only (split on space)
  photoURL: string,
  bestTime: number,        // Completion time in ms (lower = better)
  level: number,           // Highest level completed
  updatedAt: ServerTimestamp
}
```

### Leaderboard
- **Top 20 by fastest time**: `db.collection('pop_scores').orderBy('bestTime', 'asc').limit(20).get()`
- Mini leaderboard (top 5) always visible in sidebar
- Full modal (20) toggled with `L` key

---

## Canvas & Layout

```
Total canvas:  640 × 400 px
HUD strip:     640 × 16 px  (top — health, level, timer)
Play field:    640 × 384 px (20 cols × 12 rows × 32 px tiles)
```

Responsive: `max-width: 100%` CSS on canvas wrapper, `image-rendering: pixelated`.

---

## Tile System

| ID | Name           | Behavior                                    |
|----|----------------|---------------------------------------------|
| 0  | air            | No collision                                |
| 1  | stone-floor    | Solid (top surface only — floor)            |
| 2  | stone-wall     | Solid all sides                             |
| 3  | ceiling        | Solid (bottom surface — ceiling)            |
| 4  | spikes         | Floor tile — instant kill on contact        |
| 5  | loose-tile     | Floor tile — falls after 800ms of standing  |
| 6  | gate-closed    | Blocks passage (wall-like)                  |
| 7  | gate-open      | Passable                                    |
| 8  | exit-door      | Interact (↑) to advance level               |
| 9  | pressure-plate | Floor tile — activates linked gate on step  |
| 10 | torch          | Decorative — no collision, flicker effect   |

Tile size: **32 px**. Level grid: **20 cols × 12 rows**.

---

## Physics Constants
```js
const GRAVITY   = 900;   // px/s²
const JUMP_VY   = -520;  // px/s (initial jump velocity)
const RUN_VX    = 140;   // px/s
const WALK_VX   = 70;    // px/s (careful mode / Shift held)
const MAX_FALL  = 800;   // px/s (terminal velocity)
```

Physics: Euler integration with dt cap at 50ms.
Collision: AABB against tile grid (test top/bottom/left/right).
Ledge-grab: detected when player's "hand" position aligns with a tile edge while falling.

---

## Player State Machine

```
IDLE ──→ RUN ──→ JUMP ──→ FALL ──→ GRAB_LEDGE ──→ CLIMB_UP
 │                │                                    │
 │                └──→ FALL ──→ LAND                   └──→ IDLE
 │
 ├──→ CROUCH (↓)
 │
 ├──→ SWORD_READY (Space) ──→ STRIKE (Space)
 │                        ──→ BLOCK (← when guard strikes)
 │
 └──→ DIE ──→ [game over]
```

### Key State Notes
- **GRAB_LEDGE**: `↑` = CLIMB_UP (pulls self to tile above); `↓` = DROP (to FALL)
- **CAREFUL mode** (Shift held): `WALK_VX` speed; stops at tile edges (edge detection: no floor tile ahead)
- **SWORD_READY**: entered when Space pressed while guard is present on same row within 6 tiles
- **STRIKE**: 400ms animation; damages guard if within 1.5 tile distance and guard not blocking

### Player Hitbox
```js
width:  20px   // narrower than tile (32px) for ledge precision
height: 44px   // ~1.375 tiles tall
```

---

## Sprite System

No external images. All sprites drawn programmatically via `ctx.fillRect()`.

### Palette
```js
const PAL = [
  null,          // 0 = transparent (skip)
  '#c8b88a',     // 1 = skin
  '#e8e0c0',     // 2 = shirt/pants
  '#3a2a1a',     // 3 = hair/boots/shadow
  '#5a4a3a',     // 4 = stone dark
  '#8a7a6a',     // 5 = stone mid
  '#b0a090',     // 6 = stone light
  '#d04010',     // 7 = torch/health/blood
  '#f0b020',     // 8 = torch glow/gold
  '#202020',     // 9 = deep shadow
  '#ffffff',     // 10 = highlight
  '#6090d0',     // 11 = gate/magic
];
```

### Sprite Format
```js
// Each frame: array of rows, each row: array of palette indices
// Cell size: 8×8px, sprite drawn at scale
const PRINCE_IDLE = [
  [0,0,3,3,3,0,0,0],  // row 0 (head)
  [0,3,1,1,1,3,0,0],
  // ...
];
function drawSprite(ctx, frame, x, y, scale, flipX) { ... }
```

---

## Enemy Guard AI

### States
```
PATROL ──→ ALERT ──→ FIGHT ──→ DEAD
  ↑___________↓
```

- **PATROL**: walks between `patrol[0]` and `patrol[1]` x-bounds, turns at edges
- **ALERT**: triggered when player within 6 tiles on same row; advances toward player
- **FIGHT**: 1-tile gap maintained; cycles between ADVANCE, STRIKE, RETREAT, DEFEND
  - Strikes every 1.5s if player not blocking; blocks 60% of player strikes
- **DEAD**: collapse animation (800ms), body stays

### Guard Hitbox
Same as player: 20×44px.

---

## Level Data Format
```js
const LEVELS = [
  {
    name: 'Level 1',
    tiles: [          // 12 rows × 20 cols, row 0 = top
      [2,2,2,...],    // row 0
      // ...
    ],
    guards: [
      { col: 14, row: 10, patrol: [10, 18], facingLeft: true }
    ],
    items: [
      { type: 'sword',      col: 4,  row: 10 },
      { type: 'redPotion',  col: 12, row: 10 },
    ],
    pressurePlates: [
      { col: 7, row: 10, gateCol: 10, gateRow: 5 }
    ],
    playerStart: { col: 1, row: 10 },
    exit:        { col: 19, row: 10 },
    timeLimit:   90000,  // ms; 0 = no limit
  },
  // ...
];
```

5 levels: dungeon escape, increasing difficulty.

---

## Game Loop

```js
let running = false;
let lastTs  = 0;

function loop(ts) {
  const dt = Math.min((ts - lastTs) / 1000, 0.05);
  lastTs = ts;
  update(dt);
  render();
  if (running) requestAnimationFrame(loop);
}

function startLoop() {
  running = true;
  lastTs = performance.now();
  requestAnimationFrame(loop);
}
```

---

## Controls

| Key           | Action                              |
|---------------|-------------------------------------|
| `←` / `→`    | Walk/run (or advance/retreat in combat) |
| `↑`           | Jump / climb up / interact (exit)   |
| `↓`           | Crouch / climb down / drop from ledge |
| `Shift`       | Careful mode (edge-aware slow walk) |
| `Space`       | Draw sword / strike                 |
| `P`           | Pause                               |
| `L`           | Toggle leaderboard modal            |
| `M`           | Mute/unmute audio                   |

---

## Audio

Web Audio API — synthesized sounds, no external files.
- Jump: short sine chirp
- Land: low thud (noise burst)
- Sword clash: metallic FM tone
- Death: descending tone
- Level complete: ascending arpeggio
- Torch flicker: very quiet noise (optional ambient)

Same unlock pattern as tetris.html: `audioCtx.resume()` on first user gesture.

---

## HUD Elements

```
[ ♥♥♥○○ ]   Level 2    01:23.4    [ Sign In ]
```

- Health: up to 5 heart icons (filled/empty)
- Level number
- Elapsed timer (mm:ss.t)
- Auth button (top right)

---

## UI Overlays

| Overlay ID           | Shown when                  |
|----------------------|-----------------------------|
| `#startOverlay`      | Before game starts          |
| `#gameOverOverlay`   | Player dies                 |
| `#levelCompleteOverlay` | Exit reached             |
| `#victoryOverlay`    | All 5 levels complete       |
| `#lbModal`           | `L` key pressed             |
| `#pauseOverlay`      | `P` key pressed             |

---

## Known Gotchas

1. **Canvas colors**: Must use literal `rgba()` strings — CSS variables don't work with Canvas 2D `fillStyle`.
2. **dt cap**: Cap `dt` at `0.05` (50ms) to prevent tunneling through tiles after tab switch.
3. **Ledge grab timing**: Only attempt ledge-grab within first 300ms of a fall — prevents mid-fall grabs.
4. **Loose tiles**: Track a `looseTiles` Map keyed by `col,row`; store trigger time; remove from level tile array when fallen.
5. **Pressure plates**: Reset gate to closed if player steps off (original PoP behavior).
6. **Guard strikes**: Guard cannot strike while player is blocking; player cannot block while striking.
7. **Firebase forEach**: No index parameter — use a manual counter variable.
8. **Audio unlock**: Call `audioCtx.resume()` in first `keydown` or `touchstart` handler.

---

## Theming

No connection to main site CSS. Standalone palette:
- Background: `#0a0a0a`
- Stone: `#5a4a3a` / `#8a7a6a`
- Torch glow: `#f0b020` with radial gradient
- Text: `#e8e0c0`
- Health: `#d04010`
- UI panels: `rgba(10,10,10,0.85)` with `1px solid #3a2a1a` border
