# Tetris Flare — Gotchas & Hard-Won Lessons

## Temporal Dead Zone (TDZ) — Most Common Bug

`let` / `const` variables are in the temporal dead zone until their declaration line is reached. Even `typeof x` throws `ReferenceError` for a TDZ `let` — unlike `var`.

**Rule:** Any variable referenced inside `applyLang()` or `setDark()` — both of which run at page load — MUST be declared BEFORE those functions run (~line 1038 in the script).

**Variables that bit us (now fixed):**
| Variable | Where declared | Fix |
|---|---|---|
| `lastEndGame` | After `applyLang()` | Moved declaration to before `applyLang()` |
| `darkCb` | After `applyLang()` | Moved to before `applyLang()` |
| `darkLabel` | After `applyLang()` | Moved to before `applyLang()` |
| `level` | In game engine (far below) | `setDark()` wraps call in `try/catch` |

**Pattern for safe late references:**
```js
// If you must call something that may reference TDZ vars:
try { maybeCallThing(); } catch(e) {}
```

---

## Canvas Colors Must Be Literal rgba() Strings

The Canvas API resolves colors at draw time using its own color parser — it cannot read CSS custom properties.

```js
// WRONG — canvas ignores this
ctx.fillStyle = 'var(--c-i)';

// RIGHT
ctx.fillStyle = 'rgba(0,200,255,0.82)';
```

This applies to ALL canvas drawing: piece colors, ghost cells, grid lines, W piece cell types, particle colors in the Easter egg.

---

## Drop Timer Accumulation Bug

Every extra `scheduleDrop()` call spawns a parallel timer. Two timers double per tick → exponential speedup. Symptoms: game visibly speeds up after a few pieces, gets uncontrollable within seconds.

**Rule:** `scheduleDrop()` is called exactly once per piece lifecycle.  
**Rule:** `lockPiece()` always starts with `clearTimeout(dropTimer)`.  
**Rule:** the CALLER (not `lockPiece()`) schedules the next drop.

---

## Firestore forEach Has No Index

```js
// WRONG — second arg is undefined, rank becomes NaN
snapshot.forEach((doc, i) => { rank = i + 1; });

// RIGHT
let i = 0;
snapshot.forEach(doc => { const rank = ++i; });
```

---

## Safari AudioContext

- `ctx.resume()` alone does NOT unlock audio on iOS Safari
- Must play a silent 1-frame buffer synchronously inside the user gesture handler
- `ctx.currentTime` can return 0 immediately after `resume()` — schedule notes at `ctx.currentTime + 0.008` (see `audioNow()`)
- Safari can enter `'interrupted'` state (not just `'suspended'`) on phone calls / tab switches — `playSound()` handles this

---

## Start Button Must Never Silently Fail

`unlockAudio().then(startGame)` with no `.catch()` → if AudioContext is rejected, `startGame` never runs. The button appears to do nothing.

```js
// Pattern used:
unlockAudio()
  .then(() => { try { startGame(); } catch(e) {...} })
  .catch(e  => { try { startGame(); } catch(e2) {...} });
```

---

## applyLang() Uses innerHTML for Controls

`ctrl-text` is set via `.innerHTML` (not `.textContent`) because it contains `<div>` rows with `<kbd>` tags. All other `[data-i18n]` elements use `.textContent`.

---

## Hold Piece Swap Loses W Piece Cell Data

When swapping hold and the incoming piece is W, the reconstructed `current` object must include:
```js
cellColors: PIECES[temp].cellColors || null,
cellTypes:  PIECES[temp].cellTypes  || null,
```
Without these, the W piece renders as a plain colored block and the ooze animation breaks.

---

## setDark() Calls updateBodyTheme() at Page Load

`setDark()` is called during page load to restore the saved dark preference. At that point `level` (declared later with `let`) is in the TDZ. `typeof level` also throws for TDZ variables.

Fix: wrap the call in try/catch.
```js
try { updateBodyTheme(); } catch(e) {}
```
Once the game is running, `level` is initialized and the call works correctly.

---

## Level Background Tint Resets to Light Mode in Dark Mode

`updateBodyTheme()` was using hardcoded light HSL values (`78%`, `82%` lightness) for all radial gradients, regardless of dark mode. After the first line clear, the background snapped back to light.

Fix: check `document.body.classList.contains('dark')` and branch to dark palette (8–12% lightness) vs light palette (68–82%).

---

## br Tags Give Poor Vertical Spacing in Controls List

`ctrl-text` innerHTML was using `<br>` between control rows. `line-height` adjustments were unreliable and looked cramped in dark mode.

Fix: wrap each control row in `<div>`, make `ctrl-text` a `flex-column` container with `gap: 4px`.

---

## Jekyll _memory Folder Access

Files in paths starting with `_` are excluded by Jekyll (GitHub Pages default processor). Direct browser requests to `www.gusti.com/games/tetris/_memory/` return 404.

This only works because there is NO `.nojekyll` file in the repo root. If `.nojekyll` is ever added, these files would become publicly accessible.
