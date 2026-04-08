# Game Theme

**Working title:** Hercules Unleashed  
**Base engine:** existing `games/prince-of-persia/index.html` (v0.004+)  
**Target:** adults-only browser game, self-contained HTML5 Canvas

---

## Concept

A gay adult re-skin of the Prince of Persia platformer engine.  
Same tile-based levels, same physics, same guard AI — entirely new visual identity.

Hercules escapes a series of increasingly wild underground venues,  
collecting power-ups and defeating muscular guards in Speedos.

---

## Visual Identity

| Element | Style |
|---------|-------|
| Background | Deep dark purple `#0a0612` / near-black |
| Walls | Dark stone with purple-tinted mortar |
| Floors | Dark slate |
| Lighting | Torch glow — warm amber + cool neon accents |
| Palette mood | Dark dungeon base + vivid neon accents (pink, cyan, purple) |
| Sprites | Rectangle pixel art — no external images |
| Font | Courier New monospace throughout |

### Colour Palette

```
Background:  #0a0612   (deep purple-black)
Wall:        #1a0828   (dark purple stone)
Wall light:  #2e1040
Wall dark:   #0e0418
Floor:       #1e1030
Floor light: #2e1848
Spike:       #6020a0   (purple metal)
Spike tip:   #e040f0   (neon pink)
Gate:        #0e1840
Gate bar:    #2040c0
Exit:        #101830   + neon green pulse (unchanged)
Torch:       #d020a0   (pink flame)
Torch glow:  #f040e0
HUD bg:      #060210
Heart:       #e03080
Heart empty: #3a1030
Timer:       #b060d0
```

---

## Level Themes

| Level | Name | Setting | Vibe |
|-------|------|---------|------|
| 1 | The Locker Room | Underground gym locker room | Intro — one guard, easy |
| 2 | The Sauna Tower | Multi-floor steam room | Vertical climb through heat haze |
| 3 | The Club Floor | Dance club basement | Strobe effect, 3 guards |
| 4 | The Labyrinth | Dark leather bar back-rooms | Confusing layout, 2 guards |
| 5 | The Escape | Back alley / exit route | Final sprint, 4 guards |

---

## Guards

8 distinct types (see `guards.md`).  
Each level selects from the roster — earlier levels use slower types.

| Level | Guards used |
|-------|-------------|
| 1 | Lemon Yellow (slow, easy) |
| 2 | Electric Cyan |
| 3 | Hot Pink, Cobalt Blue, Lemon Yellow |
| 4 | Hot Orange, Royal Purple |
| 5 | Hot Pink, Scarlet Red, Electric Cyan, Neon Green |

---

## Items

20 items total (see `items.md`).  
Placed in levels as pickups — curated per level for balance.

### Suggested per-level loadout

| Level | Items |
|-------|-------|
| 1 | Club (required), Rainbow Flask |
| 2 | Lube Bottle, Poppers |
| 3 | Blindfold, Ball Gag, Nipple Clamps |
| 4 | Leather Harness, Bear Paw Mitts, Handcuffs |
| 5 | Strap-On, Vibrator Wand, Trophy Cup |

---

## HUD Changes

| Element | Change |
|---------|--------|
| Hearts | Pink `#e03080` hearts (same mechanic) |
| Active item slot | New — small icon showing equipped weapon/armor |
| Effect timer bar | Thin bar below hearts, drains as timed effects expire |
| Level name | Themed name replaces "Level N: ..." |

---

## Audio (future)

| Event | Sound idea |
|-------|-----------|
| Pick up item | Upbeat pop chime |
| Hit guard | Slap SFX |
| Guard dies | Camp gasp |
| Player hit | Oof |
| Level complete | Fanfare |
| Victory | Full camp anthem |

---

## Implementation Order

1. **Theme colours** — update `C` palette object in `index.html`
2. **Hercules sprite** — replace `drawHuman()` for player with `drawHercules()`
3. **Guard sprites** — replace `drawHuman()` for guards with `drawGuard()` + type system
4. **Items** — extend item type list, add `drawItem()` per type, wire up effects
5. **Level names** — update all 5 level `name:` fields to themed names
6. **HUD** — add item slot + effect timer bar
7. **Polish** — torch colour, spike colour, level backgrounds

---

## Files

| File | Purpose |
|------|---------|
| `index.html` | Main game (engine + levels) |
| `hercules-concept.html` | Hercules sprite reference |
| `text-character.html` | Guard sprite reference (all 8) |
| `items.html` | Item sprite reference (all 20) |
| `hercules.md` | Hercules spec |
| `guards.md` | Guards spec |
| `items.md` | Items spec |
| `theme.md` | This file — overall design direction |
| `knowledge.md` | Engine architecture reference |
