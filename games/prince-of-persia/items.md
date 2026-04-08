# Items

Source: `items.html`  
Sprites: rectangle-only pixel art, 32×32px canvas displayed at 3×

---

## Full Item List

| # | Name | Type | Game Effect |
|---|------|------|-------------|
| 01 | Poppers | consumable | Speed ×2 for 8s, guards appear slower |
| 02 | Lube Bottle | consumable | Slide past guards, immune to pressure plates |
| 03 | Leather Paddle | weapon | Stuns guard 2s, extra knockback |
| 04 | Butt Plug | armor | +1 defence, absorbs one hit |
| 05 | Cock Ring | powerup | Strength +2, attack damage doubled |
| 06 | Whip | weapon | Long-range attack, 3-tile reach |
| 07 | Handcuffs | trap | Throw to freeze a guard for 4s |
| 08 | Leather Collar | special | Charm nearest guard — fights for you 6s |
| 09 | Blindfold | stealth | Invisible to guards for 5s |
| 10 | Ball Gag | stealth | Silences guard — no alert radius for 5s |
| 11 | Nipple Clamps | armor | Pain resistance — take half damage for 8s |
| 12 | Flogger | weapon | Hits all guards in 2-tile arc |
| 13 | Leather Harness | armor | Absorb 2 hits, chest guard |
| 14 | Rainbow Flask | consumable | Full health restore + shield for 3s |
| 15 | Jockstrap | powerup | Sprint speed +50%, permanent until hit |
| 16 | Bear Paw Mitts | powerup | Wall grip + climb ladders 2× faster |
| 17 | Strap-On | powerup | Double jump — launch off walls |
| 18 | Vibrator Wand | weapon | Stun blast — immobilise all on-screen guards 3s |
| 19 | Chaps | armor | Immune to spikes and fire traps |
| 20 | Trophy Cup | bonus | Score multiplier ×10 at end of level |

---

## Types

- **consumable** — single-use, picked up automatically on contact
- **weapon** — replaces current weapon or adds ranged attack
- **armor** — passive, auto-equips, shown in HUD
- **powerup** — stat boost, timed or permanent until hit
- **stealth** — timed invisibility or silence effect
- **trap** — throwable, affects enemy
- **special** — unique behaviour (charm/control)
- **bonus** — score modifier, no combat effect

---

## Palette Reference

| Item | Primary | Dark | Accent |
|------|---------|------|--------|
| Poppers | `#8a4010` | `#6a2808` | `#e84040` |
| Lube Bottle | `#206080` | `#1a4860` | `#40c8f0` |
| Leather Paddle | `#6a3010` | `#4a2010` | — |
| Butt Plug | `#9030c0` | `#6820a0` | `#d060f0` |
| Cock Ring | `#c07010` | `#a06010` | `#f0c040` |
| Whip | `#3a1808` | `#2a1008` | `#c0a020` |
| Handcuffs | `#909090` | `#606060` | — |
| Leather Collar | `#2a1408` | `#1a0c04` | `#d0a020` |
| Blindfold | `#1a0830` | `#0a0418` | `rgba(160,80,255,0.3)` |
| Ball Gag | `#c02020` | `#801010` | `#3a1808` |
| Nipple Clamps | `#909090` | `#606060` | `#e03060` |
| Flogger | `#3a1008` | `#2a0e06` | `#c0a020` |
| Leather Harness | `#2a1008` | — | `#c0a020` |
| Rainbow Flask | `#1a1060` | `#2a2080` | rainbow layers |
| Jockstrap | `#d0c8b8` | `#b0a898` | rainbow stripe |
| Bear Paw Mitts | `#6a3820` | `#5a3018` | `#c07050` |
| Strap-On | `#c050b0` | `#8030d0` | `#d060c0` |
| Vibrator Wand | `#6020b0` | `#4010a0` | `#f040f0` |
| Chaps | `#3a1808` | `#2a1006` | `#c0a020` |
| Trophy Cup | `#c09010` | `#a07010` | `#f0c020` |

---

## Notes for Implementation

- Items placed in level data same as existing `sword`/`redPotion`/`bluePotion` format
- Pick-up detection: `Math.abs(it.x-player.x)<TILE*0.7 && Math.abs(it.y-player.y)<TILE*0.7`
- Timed effects need a `player.effects[]` array with `{type, remaining}` entries, decremented each frame
- Armor items stack in HUD as small icons below the health hearts
- Weapon items replace current weapon slot (one at a time)
