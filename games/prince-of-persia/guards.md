# Guards

Source: `text-character.html`  
Sprites: rectangle-only pixel art, 100×240px canvas at 1×, drawn at scale 2

---

## The 8 Guard Types

| # | Name | Skin Tone | Speedo | Hairstyle | Personality |
|---|------|-----------|--------|-----------|-------------|
| 1 | Hot Pink | Light `#e8c898` | Hot pink `#f01890` | Mohawk (red-dyed) | Aggressive, fast striker |
| 2 | Electric Cyan | Brown `#c08848` | Electric cyan `#00d0f0` | Buzzcut | Relentless chaser |
| 3 | Lemon Yellow | Dark `#8a5028` | Lemon yellow `#f0d010` | Curly | Patrol-heavy, wide radius |
| 4 | Hot Orange | Tan `#d4a060` | Hot orange `#f06010` | Pompadour | Block-heavy, hard to hit |
| 5 | Royal Purple | Ebony `#60301a` | Royal purple `#8020d0` | Long flowing | Slow but high health (3 HP) |
| 6 | Neon Green | Medium `#b07840` | Neon green `#20d040` | Bald | Fast runner, cowardly (flees at 1 HP) |
| 7 | Scarlet Red | Light-brown `#c89058` | Scarlet red `#e01020` | Flat-top | High damage striker |
| 8 | Cobalt Blue | Pale `#e4c8a0` | Cobalt blue `#2050e8` | Undercut | Calls for backup (alerts nearby guards) |

---

## Shared Body Specs

All guards use the same `drawGuard(ctx, g, pose)` function.

- **Width:** 26px at shoulders (widest point)
- **Height:** ~110px from feet to top of tallest hairstyle
- **Torso:** V-taper — 26px chest → 18px waist → 18px belt
- **Legs:** Thick, 10px each, with quad/knee/calf definition
- **Abs:** 3 rows × 2 columns, shadow grooves + skin highlights
- **Speedo:** 18px wide brief, side panels darker, waistband + centre seam

---

## Palette Structure (per guard)

Each guard needs these 7 colour fields:

```js
{
  skin:    '',   // base body colour
  shadow:  '',   // muscle definition / recesses
  hi:      '',   // highlight on raised surfaces
  speedo:  '',   // main brief colour
  speedoDk:'',   // side panels + waistband
  hair:    '',   // hairstyle colour
  hairstyle: '', // 'mohawk'|'buzzcut'|'curly'|'pompadour'|'long'|'bald'|'flattop'|'undercut'
}
```

---

## Hairstyles

| Style | Description | Extra colours |
|-------|-------------|---------------|
| `mohawk` | Tall centre strip, shaved sides, dyed tips | Tips `#c02020` / `#e04020` |
| `buzzcut` | Short flat layer on top | — |
| `curly` | Clusters of small rects, dome shape | — |
| `pompadour` | Swept-back quiff, dark undercut sides | Undercut `#3a2010` |
| `long` | Side falls hang to shoulder level | — |
| `bald` | Shine highlight only | `hi` colour |
| `flattop` | Flat slab top with vertical side walls | — |
| `undercut` | Top swept forward, sides shaved | — |

---

## Poses

| Pose | Usage |
|------|-------|
| `idle` | Standing patrol / resting state |
| `run` | Chasing player (animated leg swing) |
| `strike` | Attack animation — right arm punches forward |

Additional states needed in-game (same as current):  
`patrol` → `fight` → `strike` → `hit` → `dead`

---

## AI Behaviour Plan (per type)

| Guard | patrol speed | fight speed | strike CD | HP | Notes |
|-------|-------------|-------------|-----------|-----|-------|
| Hot Pink | 0.55× | 0.70× | 1.2s | 2 | Rush attacks |
| Electric Cyan | 0.55× | 0.80× | 1.3s | 2 | Never retreats |
| Lemon Yellow | 0.40× | 0.60× | 1.5s | 2 | Wide patrol range |
| Hot Orange | 0.45× | 0.55× | 1.4s | 2 | Block chance 60% |
| Royal Purple | 0.30× | 0.45× | 1.8s | 3 | Tank |
| Neon Green | 0.60× | 0.75× | 1.0s | 1 | Flees when hurt |
| Scarlet Red | 0.50× | 0.65× | 1.0s | 2 | High damage |
| Cobalt Blue | 0.45× | 0.55× | 1.5s | 2 | Alerts radius 8 tiles |

---

## Notes for Implementation

- Current game uses a single guard appearance; replace `drawHuman(g.state, C.gSkin, C.gShirt, C.gPants, true)` with `drawGuard(ctx, guardType, g.state)`
- Each guard in level data gets a `type` field referencing one of the 8 configs above
- `dead` state fades out via `ctx.globalAlpha` over 1.6s (existing behaviour kept)
- HP bar shown above guard during `fight`/`strike` states (existing behaviour kept)
