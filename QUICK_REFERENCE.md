# Quick Reference Guide

## 🎨 Common CSS Customizations

### Change Brand Color
Edit in `style-optimized.css`:
```css
:root {
  --color-primary-purple: #732982;  /* change me */
  --color-primary-blue: #0048E0;    /* or me */
  --color-primary-teal: #008080;    /* or me */
}
```

### Change All Spacing
Edit spacing variables:
```css
--spacing-xs: 4px;
--spacing-sm: 8px;
--spacing-md: 16px;      /* change here */
--spacing-lg: 20px;
--spacing-xl: 30px;
--spacing-2xl: 40px;
```

### Speed Up/Slow Down All Animations
Edit transition variables:
```css
--transition-fast: 0.3s ease;      /* buttons, hovers */
--transition-normal: 0.4s ease;    /* main animations */
--transition-slow: 0.6s ease;      /* entrance animations */
```

### Change Font
Edit in `style-optimized.css`:
```css
--font-stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                       /* Change this line to use your font */
```

---

## 📱 Key CSS Classes

| Class | Purpose | Use Case |
|-------|---------|----------|
| `.page` | Main container | Styling page background |
| `.discography` | Release list | Styling all releases at once |
| `.btn-icon` | Platform buttons | Spotify/Apple Music buttons |
| `.info-bubble` | Info button | The "i" button with tooltip |
| `.mobile-info-content` | Mobile only content | What shows on mobile |
| `.skip-link` | Accessibility link | Skip to main content |

---

## 🔧 JavaScript Key Functions

Located in `script.js`:

| Function | Purpose |
|----------|---------|
| `toggleContent()` | Opens/closes info bubbles |
| `announceToScreenReader()` | Accessibility notifications |
| Event listeners | Keyboard, click, touch handling |

**All well-documented with JSDoc comments!**

---

## 📝 File Quick Lookup

### Need to edit **colors**?
→ `style-optimized.css` (top of file in `:root`)

### Need to edit **spacing/sizing**?
→ `style-optimized.css` (`:root` variables)

### Need to edit **animations**?
→ `style-optimized.css` (search for `@keyframes`)

### Need to edit **HTML content**?
→ `index.html` (the same as before)

### Need to edit **interactive behavior**?
→ `script.js` (well-commented functions)

### Need to understand **how it all works**?
→ `OPTIMIZATION.md` or `MIGRATION_GUIDE.md`

---

## ⚡ Quick Tasks

### Add Dark Mode
```css
/* At bottom of style-optimized.css */
@media (prefers-color-scheme: dark) {
  :root {
    --color-text-primary: #ffffff;
    --color-bg-light: #1a1a1a;
    /* ... more overrides ... */
  }
}
```

### Change Button Colors
```css
.btn-icon.spotify { background: #1db954; }
.btn-icon.apple { background: #fc3c44; }
/* Edit these hex codes */
```

### Add New Color Variable
```css
:root {
  /* ... existing variables ... */
  --color-custom: #yourcolorhere;
}
```

### Adjust Container Width
```css
:root {
  --max-width: 820px;  /* change this */
}
```

---

## 🧪 Testing Quick Checklist

**Visual Check:**
- [ ] Colors look right
- [ ] Spacing looks even
- [ ] Animations are smooth
- [ ] Images load

**Functional Check:**
- [ ] Info bubbles work (desktop)
- [ ] Info bubbles expand (mobile)
- [ ] Links are clickable
- [ ] No console errors (F12 → Console)

**Responsive Check:**
- [ ] Mobile (< 640px): good layout
- [ ] Tablet (640-1024px): looks good
- [ ] Desktop (> 1024px): looks good

---

## 🔗 CSS Variable Reference

### Colors
```
--color-primary-blue: #0048E0
--color-primary-purple: #732982
--color-primary-teal: #008080
--color-spotify: #1db954
--color-apple: #fc3c44
--color-text-primary: #333333
--color-bg-light: #ffffff
--color-gold: #FFD700
```

### Spacing
```
--spacing-xs: 4px
--spacing-sm: 8px
--spacing-md: 16px
--spacing-lg: 20px
--spacing-xl: 30px
--spacing-2xl: 40px
```

### Sizing
```
--radius-sm: 4px
--radius-md: 8px
--radius-lg: 12px
--radius-xl: 20px
--max-width: 820px
```

### Typography
```
--font-stack: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif
--line-height-normal: 1.6
--line-height-tight: 1.25
--line-height-relaxed: 1.5
```

### Animations
```
--transition-fast: 0.3s ease
--transition-normal: 0.4s ease
--transition-slow: 0.6s ease
--transition-cubic: cubic-bezier(...)
```

### Z-Index (Layering)
```
--z-tooltip: 999999 (topmost)
--z-tooltip-bubble: 999998
--z-bubble: 100
--z-skip-link: 9999
--z-header: 1
```

---

## 📊 File Sizes

| File | Size | Minified | Gzipped |
|------|------|----------|---------|
| `script.js` | 6.5 KB | ~3 KB | ~1.5 KB |
| `style-optimized.css` | 15 KB | ~9 KB | ~2.5 KB |
| `index.html` | 37 KB | ~32 KB | ~8 KB |
| **Total** | ~58 KB | ~44 KB | ~12 KB |

---

## 🚀 Pro Tips

1. **Use CSS variables** for everything new - don't hardcode colors/sizes
2. **Hard refresh** (Cmd+Shift+R) after CSS changes
3. **Check console** (F12) for errors before asking for help
4. **Mobile-first** - test on small screens first
5. **Keep animation timing consistent** - use the variables

---

## 🆘 Troubleshooting

| Problem | Solution |
|---------|----------|
| Styles not changing | Hard refresh (Cmd+Shift+R) |
| JavaScript not working | Check console (F12) for errors |
| Mobile looks broken | Check if `--spacing-md` is too big |
| Colors look wrong | Verify CSS variable values |
| Info bubbles not responding | Check that `script.js` is loading |

---

## 📞 Questions About...

**Changing colors?** → See "CSS Variable Reference" above

**Adding a release?** → Open `index.html` and copy one release block, change content

**Making it faster?** → Already optimized! Check OPTIMIZATION.md for details

**Dark mode?** → See "Add Dark Mode" section above

**Build process?** → See OPTIMIZATION.md "Next Steps (Phase 3)"

---

## ✅ Before & After

### Before Optimization
- 175 lines of JavaScript in HTML ❌
- Colors scattered throughout CSS ❌
- Hard to add features ❌
- Not ready for minification ❌

### After Optimization
- Clean `script.js` file ✅
- CSS variables for everything ✅
- Easy to add new features ✅
- Production-ready ✅

---

**Last Updated:** November 5, 2024
**Quick Ref Version:** 1.0
