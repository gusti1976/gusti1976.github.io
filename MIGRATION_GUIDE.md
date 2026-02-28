# Migration Guide: Old vs New Codebase

## What Changed and How to Work With It

### Quick Summary
The website code has been reorganized for better maintainability. **The website looks and works exactly the same**, but the code is now cleaner and easier to modify.

---

## File Structure

### Before (Original)
```
├── index.html (with embedded CSS and JavaScript)
├── style.css (original, can now be removed)
└── Other assets (images, favicons, etc.)
```

### After (Optimized)
```
├── index.html (cleaner, references external files)
├── style-optimized.css (new, modular stylesheet)
├── script.js (new, extracted JavaScript)
├── icons.svg (reference file for icons)
├── style.css (old, can be safely deleted)
├── OPTIMIZATION.md (this documentation)
├── MIGRATION_GUIDE.md (this file)
└── Other assets (unchanged)
```

---

## How to Edit Different Elements

### 🎨 Changing Colors

**Old Way:** Search through CSS for hex codes scattered everywhere
```css
background: #732982;  /* purple in h1 */
--pride-purple: #732982;  /* wait, there's also a variable */
color: #0048E0;  /* blue somewhere else */
```

**New Way:** Edit CSS variables at the top of `style-optimized.css`
```css
:root {
  --color-primary-purple: #732982;
  --color-primary-blue: #0048E0;
  /* ... all other colors here */
}
```
✅ Change once, applies everywhere automatically!

### 📝 Adding a New Release

**File:** `index.html` - Section with class `discography`

Still the same process, but now the code is more organized:
```html
<li>
  <div class="release-header">
    <span class="release">
      Release Name, Type, Year
      <button class="info-bubble"
              aria-label="Show release information for Release Name"
              aria-expanded="false"
              aria-describedby="release-name-info"
              role="button"
              tabindex="0">i
        <div class="info-tooltip" id="release-name-tooltip" role="tooltip" aria-hidden="true">
          Release description here
        </div>
      </button>
    </span>
    <span class="platforms">
      <a class="btn-icon apple" href="..." target="_blank" rel="noopener">
        <svg class="icon-svg" fill="white"><use href="#apple-icon"/></svg>
      </a>
      <a class="btn-icon spotify" href="..." target="_blank" rel="noopener">
        <svg class="icon-svg" fill="white"><use href="#spotify-icon"/></svg>
      </a>
    </span>
  </div>
  <div class="mobile-info-content"
       id="release-name-info"
       role="region"
       aria-label="Release Name release information"
       aria-hidden="true">
    Release description here
  </div>
</li>
```

### ⚙️ Modifying Spacing/Layout

**Old Way:** Find the specific selector and change the value
```css
padding: 16px 20px;
margin: 30px 0;
```

**New Way:** Use spacing variables
```css
padding: var(--spacing-md) var(--spacing-lg);
margin: var(--spacing-xl) 0;
```

**Available spacing variables:**
- `--spacing-xs` = 4px
- `--spacing-sm` = 8px
- `--spacing-md` = 16px
- `--spacing-lg` = 20px
- `--spacing-xl` = 30px
- `--spacing-2xl` = 40px

### 🎭 Adjusting Animations

**File:** `style-optimized.css` - Look for `--transition-*` variables

```css
:root {
  --transition-fast: 0.3s ease;      /* quick feedback (buttons, links) */
  --transition-normal: 0.4s ease;    /* standard transitions */
  --transition-slow: 0.6s ease;      /* slow, deliberate animations */
  --transition-cubic: cubic-bezier(...);  /* bounce/pop effect */
}
```

**Use them in your CSS:**
```css
.element {
  transition: all var(--transition-normal) ease;
}
```

### 🔧 JavaScript Changes

**File:** `script.js` - Standalone JavaScript file

Old approach: Inline in HTML (175 lines embedded)
New approach: Separate file that loads at end of HTML

**Benefits:**
- Easier to debug (see errors in console pointing to `script.js`)
- Browser can cache the file
- Can minify separately in production
- Easier to test

**If you need to modify JavaScript:**
1. Open `script.js`
2. Find the function you need (they're well-commented)
3. Make your changes
4. Test in browser (check console for errors)

---

## Common Tasks

### ✨ Task: Add Dark Mode Support

**Current state:** Light mode only

**Steps to add dark mode:**

1. At the bottom of `style-optimized.css`, add:
```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-text-primary: #ffffff;
    --color-text-secondary: #cccccc;
    --color-bg-light: #1a1a1a;
    --color-bg-overlay: rgba(26, 26, 26, 0.95);
    /* ... override other colors for dark mode */
  }
}
```

2. (Optional) Add toggle button in HTML if you want manual toggle

That's it! CSS variables handle everything.

### ✨ Task: Speed Up All Animations

**Current:** Using variable transition times

**To speed up everything:**
Simply change the transition variables:
```css
:root {
  --transition-fast: 0.15s ease;     /* was 0.3s */
  --transition-normal: 0.2s ease;    /* was 0.4s */
  --transition-slow: 0.3s ease;      /* was 0.6s */
}
```

### ✨ Task: Change Primary Brand Color

**Current:** Purple/Blue/Teal gradient

**To change brand colors:**
Edit these in `style-optimized.css`:
```css
:root {
  --color-primary-purple: #732982;  /* change this */
  --color-primary-blue: #0048E0;    /* change this */
  --color-primary-teal: #008080;    /* change this */
}
```

All gradients and uses automatically update!

---

## CSS Variable Categories

### Colors
```
--color-primary-* (brand colors)
--color-spotify, --color-apple (platforms)
--color-bg-*, --color-text-* (UI)
--color-border-*, --color-shadow-* (decorative)
```

### Spacing
```
--spacing-xs/sm/md/lg/xl/2xl
--max-width
```

### Typography
```
--font-stack
--line-height-normal/tight/relaxed
```

### Visual Effects
```
--radius-sm/md/lg/xl
--transition-fast/normal/slow
--transition-cubic
--gradient-* (pre-made gradients)
```

### Z-index (Layering)
```
--z-tooltip (999999)
--z-tooltip-bubble (999998)
--z-bubble (100)
--z-header (1)
--z-skip-link (9999)
```

---

## Cleanup (When Ready)

Once you've tested everything and are confident:

```bash
# Delete the old CSS file
rm style.css
```

**Before doing this:**
1. Test the site thoroughly with `style-optimized.css`
2. Make sure all styling is correct
3. Test on mobile, tablet, desktop
4. Test all interactive features

---

## Troubleshooting

### Issue: Styles not loading
**Solution:** Make sure `style-optimized.css` is linked in `index.html` head:
```html
<link rel="stylesheet" href="style-optimized.css">
```

### Issue: JavaScript not working
**Solution:** Make sure `script.js` is loaded at end of HTML body:
```html
<script src="script.js"></script>
```

### Issue: Info bubbles not responding
**Solution:**
1. Check browser console for JavaScript errors
2. Make sure `script.js` is loading (check Network tab)
3. Verify `index.html` has all the required ARIA attributes

### Issue: Colors look wrong
**Solution:** Check if you're looking at cache. Hard refresh:
- Chrome/Windows: `Ctrl + Shift + R`
- Mac: `Cmd + Shift + R`
- Firefox: `Ctrl + Shift + Delete` then hard refresh

---

## Best Practices Going Forward

1. **Always use CSS variables** for new styles
2. **Don't hardcode colors** - use existing variables or add new ones
3. **Use consistent spacing** - stick to the `--spacing-*` scale
4. **Keep animations smooth** - use the transition variables
5. **Add comments** when making non-obvious changes
6. **Test on mobile** before committing changes

---

## Questions?

Refer to `OPTIMIZATION.md` for more detailed technical information about the refactoring.

---

**Last Updated:** November 5, 2024
