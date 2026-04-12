# Dark Mode Implementation

## Summary

Three-layer approach:
1. **System preference** — reads `prefers-color-scheme` on first visit
2. **User toggle** — button saves preference to localStorage
3. **CSS** — variables override via `html[data-theme="dark"]` selector

## Critical Facts

| Item | Value |
|---|---|
| localStorage key | `agust-islandia-theme` |
| Values | `"light"` or `"dark"` |
| HTML class | `dark-mode` on `<html>` (`document.documentElement`) |
| HTML attribute | `data-theme="dark"` or `data-theme="light"` on `<html>` |
| **Tetris uses a different key** | `tetris_dark` — do NOT confuse the two |

## dark-mode.js Functions

| Function | Purpose |
|---|---|
| `ensureThemeIcons()` | Injects missing SVG moon/sun nodes into the toggle button |
| `initTheme()` | Reads localStorage or system pref, applies theme on load |
| `setTheme(theme)` | Applies class + attribute + saves to localStorage + announces |
| `toggleTheme()` | Flips current theme (light ↔ dark) |
| `listenToSystemTheme()` | Watches `prefers-color-scheme`; only applies if no saved preference |

The IIFE runs synchronously. `ensureThemeIcons()` fires immediately; `initTheme()` fires on
`DOMContentLoaded` (or immediately if DOM is already ready).

## HTML Structure Required

Every page needs:
```html
<!-- Toggle button (in body) -->
<button id="theme-toggle" class="theme-toggle" aria-label="Toggle dark mode">
  <svg class="theme-icon" viewBox="0 0 24 24" width="20" height="20">
    <path id="moon-path" d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"
          stroke="currentColor" stroke-width="2" fill="none"/>
    <!-- sun-circle and sun-rays injected by ensureThemeIcons() if missing -->
  </svg>
</button>

<!-- Screen reader announcements (in body) -->
<div id="sr-announcements" role="status" aria-live="polite" aria-atomic="true"
     class="sr-only"></div>
```

Bug: only `index.html` currently has `#sr-announcements` — all other pages are missing it
(see bugs.md). The toggle still works; screen reader announcement just silently fails.

## CSS Override Pattern

```css
/* In style-optimized.css */
html[data-theme="dark"] {
  --color-bg-light: #252525;
  --color-bg-overlay: rgba(37, 37, 37, 0.95);
  --bg-a: #16233f;
  --bg-b: #1e2742;
  --bg-c: #122936;
  --color-text-primary: #f5f5f5;
  --color-text-secondary: #d4d4d4;
  /* ... other overrides */
}

@media (prefers-color-scheme: dark) {
  :root { /* same overrides as above, for system-level detection */ }
}
```

## Troubleshooting

| Symptom | Fix |
|---|---|
| Toggle does nothing | Check `<script src="dark-mode.js">` is on the page |
| Colors wrong in dark mode | Check `html[data-theme="dark"]` selector in `style-optimized.css` |
| Preference not saved across pages | Check localStorage key is exactly `agust-islandia-theme` |
| Button not visible | Check `.theme-toggle` CSS in `style-optimized.css` |
| Screen reader not announcing | Add `#sr-announcements` div to page (see above) |
