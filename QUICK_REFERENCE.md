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
| `.nav-toggle` | Hamburger button | Navigation menu toggle |
| `.nav-drawer` | Navigation drawer | Slide-out menu |
| `.nav-collapsible` | Collapsible section | Expandable menu sections |

---

## 🔧 JavaScript Key Functions

### script.js (Homepage)

| Function | Purpose |
|----------|---------|
| `toggleContent()` | Opens/closes info bubbles |
| `announceToScreenReader()` | Accessibility notifications |
| Event listeners | Keyboard, click, touch handling |

### navigation.js (All Pages)

| Function | Purpose |
|----------|---------|
| `initNavigation()` | Initialize all navigation event listeners |
| `openNav()` | Open navigation drawer |
| `closeNav()` | Close navigation drawer |
| `toggleCollapsible()` | Expand/collapse menu sections |
| `setActiveLink()` | Highlight current page link |

### dark-mode.js (All Pages)

| Function | Purpose |
|----------|---------|
| Theme detection | Detect system dark/light preference |
| Theme toggle | Manual dark/light mode switch |
| LocalStorage | Persist user theme preference |

**All well-documented with JSDoc comments!**

---

## 📝 File Quick Lookup

### Need to edit **colors**?
→ `style-optimized.css` (top of file in `:root`)

### Need to edit **spacing/sizing**?
→ `style-optimized.css` (`:root` variables)

### Need to edit **animations**?
→ `style-optimized.css` (search for `@keyframes`)

### Need to edit **navigation menu**?
→ `navigation-template.html` (update template first)
→ `navigation.css` (styles)
→ `navigation.js` (functionality)

### Need to edit **HTML content**?
→ `index.html` (homepage)
→ `about.html` (artist bio)
→ `press.html` (press/news)
→ `lyrics.html` (lyrics hub)
→ Individual lyric pages (30+ pages)

### Need to edit **interactive behavior**?
→ `script.js` (homepage functions)
→ `navigation.js` (navigation menu)
→ `dark-mode.js` (theme toggle)

### Need to understand **how it all works**?
→ `NAVIGATION.md` (navigation system)
→ `SEO_IMPLEMENTATION.md` (SEO patterns)
→ `LYRICS_CHECKLIST.md` (adding songs)
→ `OPTIMIZATION.md` (performance)

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

### Add New Song to Navigation
```html
<!-- In navigation-template.html, find Singles section -->
<div class="nav-collapsible-content">
  <a href="/gay-and-proud.html">Gay and Proud</a>
  <a href="/my-fire.html">My Fire (Mi Fuego)</a>
  <a href="/feel-alive.html">Feel Alive</a>
  <a href="/new-song.html">New Song Title</a> <!-- Add here -->
</div>
```
Then deploy to all pages (see NAVIGATION.md)

### Change Navigation Colors
```css
/* In navigation.css */
.nav-drawer a:hover {
  color: var(--color-primary-blue);  /* Change hover color */
}

.nav-drawer a.active {
  background: rgba(0, 170, 255, 0.1);  /* Change active highlight */
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
- [ ] Navigation menu opens/closes
- [ ] All navigation links work
- [ ] Collapsible sections expand/collapse
- [ ] Active link highlights correctly
- [ ] Info bubbles work (desktop)
- [ ] Info bubbles expand (mobile)
- [ ] Links are clickable
- [ ] No console errors (F12 → Console)

**Keyboard Check:**
- [ ] Tab through navigation works
- [ ] Escape key closes menu
- [ ] Enter/Space activates links

**Responsive Check:**
- [ ] Mobile (< 640px): navigation drawer responsive
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
| `navigation.js` | 2 KB | ~1 KB | ~0.5 KB |
| `dark-mode.js` | 1.5 KB | ~0.8 KB | ~0.4 KB |
| `style-optimized.css` | 15 KB | ~9 KB | ~2.5 KB |
| `navigation.css` | 6 KB | ~3.5 KB | ~1.2 KB |
| `index.html` | 37 KB | ~32 KB | ~8 KB |
| **Total (typical page)** | ~68 KB | ~49 KB | ~14 KB |

### Site Statistics
- **35 HTML pages** total
- **30+ song pages** with full lyrics
- **27 tracks** from The Unseen Chorus musical
- **3 singles** with individual pages
- **4 core pages** (about, press, lyrics hub, album page)
- **100% Schema.org compliant** across all music pages
- **Global navigation** on all pages

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

### Before Navigation System (Feb 27, 2026)
- No global navigation ❌
- Each page isolated ❌
- Manual cross-linking only ❌
- 4 song pages ❌

### After Navigation System (Feb 28, 2026)
- Global hamburger menu on all 35 pages ✅
- Collapsible sections for organization ✅
- Auto-highlights current page ✅
- 30+ song pages with full navigation ✅
- Keyboard accessible ✅
- Dark mode aware ✅

### Before Optimization (Nov 2024)
- 175 lines of JavaScript in HTML ❌
- Colors scattered throughout CSS ❌
- Hard to add features ❌
- Not ready for minification ❌

### After Optimization
- Clean `script.js` file ✅
- CSS variables for everything ✅
- Modular navigation system ✅
- Easy to add new features ✅
- Production-ready ✅

---

**Last Updated:** February 28, 2026
**Quick Ref Version:** 2.0
