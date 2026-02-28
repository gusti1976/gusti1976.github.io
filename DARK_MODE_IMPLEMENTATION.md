# Dark Mode/Light Mode Toggle - Implementation Guide

## 🎨 Best Practices Summary

Based on research from web.dev, MDN, and industry standards, here are the best practices:

### Core Principles

1. **Respect System Preferences First** (prefers-color-scheme)
   - Automatically use user's OS dark mode setting
   - Don't force dark/light mode

2. **Allow User Override**
   - Let users toggle even if OS is set differently
   - Store their choice in localStorage

3. **Use CSS Variables** (which you already have!)
   - Easy to manage colors in one place
   - Simple to switch between themes

4. **Smooth Transitions**
   - Animate color changes for better UX
   - Don't be jarring

5. **Optimize Performance**
   - Load colors immediately (no flashing)
   - Prevent FOUC (Flash of Unstyled Content)

---

## 📋 Implementation Strategy

### What We'll Implement

```
┌─────────────────────────────────┐
│   User's Operating System       │
│   (Light/Dark preference)       │
└────────────┬────────────────────┘
             │
    ┌────────▼─────────┐
    │ Remember choice? │
    │ (localStorage)   │
    └────────┬─────────┘
             │
    ┌────────▼──────────────────┐
    │ Apply theme via CSS vars  │
    │ + Toggle button available │
    └───────────────────────────┘
```

### The Three-Layer Approach

**Layer 1: System Preference** (Default)
- Read user's OS dark mode setting
- No action needed from user
- Automatic, respects accessibility

**Layer 2: User Toggle** (Override)
- Button to manually switch themes
- Takes precedence over OS setting
- Saved to localStorage

**Layer 3: CSS Implementation** (Safe Fallback)
- CSS variables provide colors
- Media query applies system preference
- JavaScript adds toggle capability

---

## 🛠️ Technical Implementation

### Option 1: System Preference Only (Simplest)

**Pros:** Minimal code, respects OS settings, instant
**Cons:** No manual toggle button

```css
@media (prefers-color-scheme: dark) {
  :root {
    --color-text-primary: #ffffff;
    --color-bg-light: #1a1a1a;
    --color-primary-blue: #4a8fff;
    /* ... other dark colors ... */
  }
}
```

**That's it!** Browser automatically uses dark colors when OS is in dark mode.

---

### Option 2: System Preference + Manual Toggle (Recommended)

**Pros:** Best UX, respects OS but allows override, professional
**Cons:** Requires JavaScript + localStorage

**How it works:**
1. Check localStorage for saved preference
2. If found, use saved preference
3. If not found, use OS preference
4. Add toggle button to switch between themes
5. Save choice to localStorage

---

## 🎯 Implementation Plan

### Step 1: Add Color Variables for Dark Mode

Edit `style-optimized.css` and add at the bottom:

```css
/* Dark Mode Color Overrides */
@media (prefers-color-scheme: dark) {
  :root {
    /* Backgrounds */
    --color-bg-light: #1a1a1a;
    --color-bg-overlay: rgba(26, 26, 26, 0.95);

    /* Text */
    --color-text-primary: #f5f5f5;
    --color-text-secondary: #cccccc;
    --color-text-tertiary: #999999;

    /* Borders */
    --color-border-light: #333333;
    --color-border-subtle: rgba(255, 255, 255, 0.1);

    /* Adjust gradients for dark mode */
    --color-gold: #FFD700; /* stays same */

    /* Background gradient (darker) */
    --gradient-bg: linear-gradient(135deg, #1a1a2e 0%, #16213e 100%);
  }
}

/* Optional: data-theme attribute for manual control */
html[data-theme="dark"] {
  color-scheme: dark;
  --color-bg-light: #1a1a1a;
  /* ... override colors ... */
}

html[data-theme="light"] {
  color-scheme: light;
  /* Use original colors */
}
```

### Step 2: Add color-scheme Property

Add to top of `style-optimized.css`:

```css
:root {
  color-scheme: light dark; /* Support both themes */
  /* ... existing variables ... */
}
```

**What this does:**
- Tells browser you support both themes
- Browser auto-adjusts scrollbars, form fields, etc.
- Better UX automatically

### Step 3: Create Toggle Button (HTML)

Add to `index.html` in the header section:

```html
<header>
  <div class="theme-toggle-container">
    <button
      id="theme-toggle"
      class="theme-toggle"
      aria-label="Toggle dark mode"
      title="Toggle dark/light mode">
      <svg class="theme-icon" viewBox="0 0 24 24" aria-hidden="true">
        <!-- Sun icon (shown in dark mode) -->
        <circle id="sun-circle" cx="12" cy="12" r="5" style="display: none;"/>
        <path id="sun-rays" d="M12 1v6m0 6v6M4.22 4.22l4.24 4.24m5.08 5.08l4.24 4.24M1 12h6m6 0h6M4.22 19.78l4.24-4.24m5.08-5.08l4.24-4.24"
              style="display: none;" stroke="currentColor" stroke-width="2" fill="none"/>

        <!-- Moon icon (shown in light mode) -->
        <path id="moon-path" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
              fill="currentColor"/>
      </svg>
    </button>
  </div>
  <h1>...</h1>
  <!-- rest of header -->
</header>
```

### Step 4: Add JavaScript for Toggle

Create `dark-mode.js` or add to `script.js`:

```javascript
/**
 * Dark Mode / Light Mode Toggle
 *
 * Features:
 * - Respects system preference on first visit
 * - Allows manual toggle
 * - Saves preference to localStorage
 * - Smooth transitions between themes
 */

(function() {
  const THEME_KEY = 'agust-islandia-theme';
  const DARK_MODE_CLASS = 'dark-mode';
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  /**
   * Initialize theme on page load
   */
  function initTheme() {
    // Check for saved preference
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme) {
      // Use saved preference
      setTheme(savedTheme);
    } else {
      // Use system preference
      if (window.matchMedia('(prefers-color-scheme: dark)').matches) {
        setTheme('dark');
      } else {
        setTheme('light');
      }
    }
  }

  /**
   * Set theme and update UI
   * @param {string} theme - 'light' or 'dark'
   */
  function setTheme(theme) {
    if (theme === 'dark') {
      html.classList.add(DARK_MODE_CLASS);
      html.setAttribute('data-theme', 'dark');
      updateToggleIcon(true);
    } else {
      html.classList.remove(DARK_MODE_CLASS);
      html.setAttribute('data-theme', 'light');
      updateToggleIcon(false);
    }

    // Save preference
    localStorage.setItem(THEME_KEY, theme);
  }

  /**
   * Update toggle button icon
   * @param {boolean} isDarkMode - Is dark mode active
   */
  function updateToggleIcon(isDarkMode) {
    const moonIcon = document.getElementById('moon-path');
    const sunCircle = document.getElementById('sun-circle');
    const sunRays = document.getElementById('sun-rays');

    if (isDarkMode) {
      // Show sun icon (to click = switch to light)
      if (moonIcon) moonIcon.style.display = 'none';
      if (sunCircle) sunCircle.style.display = 'block';
      if (sunRays) sunRays.style.display = 'block';
    } else {
      // Show moon icon (to click = switch to dark)
      if (moonIcon) moonIcon.style.display = 'block';
      if (sunCircle) sunCircle.style.display = 'none';
      if (sunRays) sunRays.style.display = 'none';
    }
  }

  /**
   * Toggle between light and dark mode
   */
  function toggleTheme() {
    const isDarkMode = html.classList.contains(DARK_MODE_CLASS);
    setTheme(isDarkMode ? 'light' : 'dark');
  }

  /**
   * Listen for system theme changes
   */
  function listenToSystemTheme() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Modern browsers
    if (darkModeQuery.addEventListener) {
      darkModeQuery.addEventListener('change', (e) => {
        // Only update if user hasn't manually set a preference
        if (!localStorage.getItem(THEME_KEY)) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  // Initialize on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }

  // Add toggle button listener
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }

  // Listen for system theme changes
  listenToSystemTheme();
})();
```

### Step 5: Style the Toggle Button

Add to `style-optimized.css`:

```css
/* Theme Toggle Button */
.theme-toggle-container {
  position: absolute;
  top: var(--spacing-lg);
  right: var(--spacing-lg);
  z-index: var(--z-header);
}

.theme-toggle {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 44px;
  height: 44px;
  border-radius: var(--radius-lg);
  background: var(--color-primary-blue);
  border: none;
  cursor: pointer;
  padding: 0;
  color: white;
  transition: all var(--transition-normal) ease;
  box-shadow: 0 4px 12px var(--color-shadow);
}

.theme-toggle:hover {
  transform: scale(1.1);
  background: var(--color-primary-purple);
  box-shadow: 0 6px 20px var(--color-shadow-dark);
}

.theme-toggle:focus {
  outline: 2px solid var(--color-gold);
  outline-offset: 2px;
}

.theme-icon {
  width: 24px;
  height: 24px;
  display: block;
}

/* Dark mode styles */
html.dark-mode {
  color-scheme: dark;
}

/* Smooth theme transitions */
html {
  transition: background-color var(--transition-normal) ease;
}

html.dark-mode .page {
  background: var(--color-bg-overlay);
}
```

---

## 📊 Implementation Options

### Option A: Simple (System Preference Only)
```
Effort: 5 minutes
Code: CSS only (3 lines)
Result: Respects OS setting, no toggle button
Best for: Users who follow OS settings
```

### Option B: Full Featured (System + Manual Toggle)
```
Effort: 30 minutes
Code: CSS + HTML + JavaScript
Result: OS default + manual toggle + localStorage
Best for: Professional UX, maximum control
```

### Option C: Advanced (Custom Themes)
```
Effort: 1 hour
Code: CSS + HTML + JavaScript + Data
Result: Multiple theme options (3+ themes)
Best for: Brand flexibility
```

---

## 🎨 Color Palette for Dark Mode

### Recommended Dark Mode Colors

**Backgrounds:**
- Page background: `#1a1a1a` (very dark, not pure black)
- Overlay: `rgba(26, 26, 26, 0.95)`
- Cards/sections: `#2a2a2a`

**Text:**
- Primary: `#f5f5f5` (off-white, not pure white)
- Secondary: `#cccccc`
- Tertiary: `#999999`

**Why not pure black/white?**
- Pure black/white causes eye strain
- Slightly muted colors are easier on eyes
- Research shows better user satisfaction

**Gradients:**
- Darken existing gradients
- Reduce saturation slightly
- Keep contrast ratios (WCAG AA minimum)

---

## ✨ Advanced Tips

### Smooth Transitions
```css
html {
  transition:
    background-color var(--transition-normal) ease,
    color var(--transition-normal) ease;
}
```

### Fade Out Flash of Wrong Theme
```javascript
// Load theme before paint (in <head>, before CSS)
<script>
  const theme = localStorage.getItem('theme') ||
    (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
  document.documentElement.classList.toggle('dark-mode', theme === 'dark');
</script>
```

### Images in Dark Mode
```css
/* Slightly reduce image brightness */
@media (prefers-color-scheme: dark) {
  header img {
    opacity: 0.9;
    filter: brightness(0.95);
  }
}
```

---

## 🧪 Testing Checklist

### Desktop Testing
- [ ] Light mode looks good
- [ ] Dark mode looks good
- [ ] Toggle button works
- [ ] Saved preference persists (refresh page)
- [ ] Toggle icon changes correctly
- [ ] Smooth transition between themes

### Mobile Testing
- [ ] Toggle button visible and tappable
- [ ] Light mode responsive
- [ ] Dark mode responsive
- [ ] Works in portrait and landscape

### Browser Testing
- [ ] Chrome/Edge (Chromium)
- [ ] Firefox
- [ ] Safari (iOS & Mac)
- [ ] Mobile browsers

### Accessibility Testing
- [ ] Button has accessible label
- [ ] Sufficient color contrast (WCAG AA)
- [ ] Keyboard navigation works
- [ ] Screen readers announce toggle

---

## 📈 Implementation Difficulty

```
System Preference Only        ████░░░░░░ (20% effort)
System + Toggle              ██████████ (100% effort)
3+ Custom Themes             ████████████████░░ (160% effort)
```

---

## 🚀 Recommendation for Your Site

I recommend **Option B (System + Manual Toggle)** because:

✅ Professional UX
✅ Respects user's OS preference
✅ Allows manual override
✅ Saves preference
✅ Not overly complex
✅ Your CSS variables make it easy
✅ ~30 minutes to implement

---

## 📚 Further Resources

- MDN: prefers-color-scheme
  https://developer.mozilla.org/en-US/docs/Web/CSS/@media/prefers-color-scheme

- Google Web.dev: Dark mode
  https://web.dev/articles/prefers-color-scheme

- W3C: CSS Color Module Level 4
  https://www.w3.org/TR/css-color-4/

- Accessibility: Contrast requirements (WCAG)
  https://www.w3.org/WAI/WCAG21/Understanding/contrast-minimum

---

**Ready to implement? Let me know and I'll add dark mode to your site!**

---

*Last Updated: November 5, 2024*
*Research Based On: Web.dev, MDN, WCAG Guidelines*
