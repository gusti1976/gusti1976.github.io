# Hercules — Main Character

Source: `hercules-concept.html`  
Design: Option B (White Cloth)  
Sprites: rectangle-only pixel art, drawn at scale 2

---

## Appearance

| Feature | Value |
|---------|-------|
| Skin tone | Olive `#c09050` |
| Skirt | Short white linen chiton |
| Hair | Golden blonde `#c89820` |
| Eyes | Green `#4a6838` |
| Belt | Dark leather `#603818` with gold buckle `#c8a020` |
| Sandals | Dark leather `#503010` with toe strap |
| Weapon | Oak club (brown `#6a3a10` / dark `#4a2808`) |

---

## Palette

```js
const HERCULES = {
  skin:    '#c09050',   // olive
  shadow:  '#8a6828',   // muscle definition
  hi:      '#d8b070',   // highlights
  blush:   '#c07848',   // cheekbone flush
  skirt:   '#e8e0c0',   // white linen
  skirtDk: '#b8b090',   // fold shadows
  belt:    '#603818',   // dark leather
  sandal:  '#503010',
  hair:    '#c89820',   // golden blonde
  hairHi:  '#f0d060',   // blonde highlight
  lip:     '#a05838',   // full lips
  iris:    '#4a6838',   // green eyes
  white:   '#e8e4d8',   // eye whites
  lash:    '#0c0808',
};
```

---

## Body Specs

- **Width:** 24px at shoulders
- **Height:** ~90px from feet to top of hair
- **Torso:** Muscular, bare chest — pec definition, 3-row abs, obliques
- **Skirt length:** Short (6px visible below belt) — thighs fully exposed
- **Legs:** Bare, muscular — thigh/knee/calf shading
- **Sandals:** Ankle-height with straps and toe strap
- **Weapon:** Club held at side (idle/run) or raised overhead (strike)

---

## Face Details

Drawn at `hY = -86` (86px above feet origin):

| Feature | Technique |
|---------|-----------|
| Eyes | Large 5×3 with white, green iris, dark pupil, catchlight pixel |
| Lashes | 1px dark line top and bottom of eye |
| Brows | Clean arch — not frowning |
| Nose | Thin bridge highlight, subtle nostrils |
| Lips | Full — upper lip with cupid's bow, lower lip shadow |
| Cheeks | Subtle blush `#c07848` on cheekbones |
| Jaw | Slightly wider than skull rect for strong jaw look |

---

## Poses / States

| State | Description |
|-------|-------------|
| `idle` | Standing, club at side |
| `run` | Animated leg + arm swing (sin wave) |
| `jump` | Legs back, arms forward |
| `fall` | Legs down, arms out |
| `grab` | Arms raised, hanging from ledge |
| `climbUp` | Pulling up onto ledge |
| `crouch` | Body lowered 8px, legs bent |
| `sword` | Club raised, ready stance (replaces sword state) |
| `strike` | Club raised overhead, right arm extended |
| `hit` | Knockback |
| `die` | Horizontal sprawl |

---

## Weapon: Oak Club

- **Idle/run:** Held at right side, club head upward
- **Sword state:** Club raised to shoulder height
- **Strike:** Club overhead, angled forward — arc hitbox in front
- **Colours:** Handle `#6a3a10`, head `#4a2808`, knot highlight `#8a5020`
- **Range:** Same as existing sword (1.8 tiles forward)
- **Damage:** Same as existing sword

---

## Animation Notes

- Leg swing: `Math.sin(t * 8) * 9` pixels (slightly bigger swing than prince for bigger body feel)
- Arm swing: opposite phase `Math.sin(t * 8 + Math.PI) * 7`
- Skirt flap during run: bottom hem rects shift ±2px per leg swing phase

---

## Notes for Implementation

- Replace `drawHuman(player.state, C.pSkin, C.pShirt, C.pPants, player.hasSword)` with `drawHercules(ctx, player.state)`
- `hasSword` → `player.hasClub` (same pickup mechanic, different item name)
- All existing player states, physics and collision unchanged
- Starting without club: unarmed strikes do 0.5× damage (push only)
