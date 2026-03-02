/**
 * Dark Mode / Light Mode Toggle
 *
 * Features:
 * - Respects system preference on first visit
 * - Allows manual toggle via button
 * - Saves preference to localStorage
 * - Smooth transitions between themes
 * - Fully accessible (keyboard, ARIA labels)
 *
 * Implementation:
 * 1. Check localStorage for saved preference
 * 2. If found, use saved preference
 * 3. If not found, check system preference via prefers-color-scheme
 * 4. Apply theme via CSS variables
 * 5. Listen for button clicks to toggle
 * 6. Listen for system preference changes
 */

(function() {
  const THEME_KEY = 'agust-islandia-theme';
  const DARK_MODE_CLASS = 'dark-mode';
  const SVG_NS = 'http://www.w3.org/2000/svg';
  const themeToggle = document.getElementById('theme-toggle');
  const html = document.documentElement;

  /**
   * Ensure theme icon has both moon and sun variants.
   * Some pages only ship with a moon icon, so we inject missing nodes.
   */
  function ensureThemeIcons() {
    if (!themeToggle) return;

    const iconRoot = themeToggle.querySelector('.theme-icon');
    if (!iconRoot) return;

    let moonIcon = iconRoot.querySelector('#moon-path, #moon-icon');
    let sunCore = iconRoot.querySelector('#sun-circle, #sun-icon');
    let sunRays = iconRoot.querySelector('#sun-rays');

    if (!moonIcon) {
      moonIcon = document.createElementNS(SVG_NS, 'path');
      moonIcon.setAttribute('id', 'moon-path');
      moonIcon.setAttribute('d', 'M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z');
      moonIcon.setAttribute('stroke', 'currentColor');
      moonIcon.setAttribute('stroke-width', '2');
      moonIcon.setAttribute('fill', 'none');
      iconRoot.appendChild(moonIcon);
    }

    if (!sunCore) {
      sunCore = document.createElementNS(SVG_NS, 'circle');
      sunCore.setAttribute('id', 'sun-circle');
      sunCore.setAttribute('cx', '12');
      sunCore.setAttribute('cy', '12');
      sunCore.setAttribute('r', '5');
      sunCore.setAttribute('stroke', 'currentColor');
      sunCore.setAttribute('stroke-width', '2');
      sunCore.setAttribute('fill', 'none');
      sunCore.style.display = 'none';
      iconRoot.appendChild(sunCore);
    }

    if (!sunRays) {
      sunRays = document.createElementNS(SVG_NS, 'path');
      sunRays.setAttribute('id', 'sun-rays');
      sunRays.setAttribute('d', 'M12 1v2m0 18v2M1 12h2m18 0h2M4.22 4.22l1.42 1.42m12.72 12.72l1.42 1.42M4.22 19.78l1.42-1.42m12.72-12.72l1.42-1.42');
      sunRays.setAttribute('stroke', 'currentColor');
      sunRays.setAttribute('stroke-width', '2');
      sunRays.setAttribute('fill', 'none');
      sunRays.style.display = 'none';
      iconRoot.appendChild(sunRays);
    }
  }

  /**
   * Detect if system prefers dark mode
   * @returns {boolean} True if dark mode is preferred
   */
  function getSystemThemePreference() {
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  /**
   * Initialize theme on page load
   */
  function initTheme() {
    // Check for saved preference first
    const savedTheme = localStorage.getItem(THEME_KEY);

    if (savedTheme) {
      // Use saved preference (user previously toggled)
      setTheme(savedTheme);
    } else {
      // Use system preference (first visit)
      const prefersDark = getSystemThemePreference();
      setTheme(prefersDark ? 'dark' : 'light');
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

    // Save preference to localStorage
    localStorage.setItem(THEME_KEY, theme);

    // Announce to screen readers
    announceThemeChange(theme);
  }

  /**
   * Update toggle button icon and text
   * @param {boolean} isDarkMode - Is dark mode active
   */
  function updateToggleIcon(isDarkMode) {
    const toggleButton = document.getElementById('theme-toggle');
    const moonIcon = toggleButton ? toggleButton.querySelector('#moon-path, #moon-icon') : null;
    const sunElements = toggleButton
      ? toggleButton.querySelectorAll('#sun-circle, #sun-icon, #sun-rays, line[style*="display"]')
      : [];

    if (!toggleButton) return;

    if (isDarkMode) {
      // Dark mode is ON, show sun icon (to click = switch to light)
      if (moonIcon) moonIcon.style.display = 'none';
      if (sunElements.length > 0) {
        sunElements.forEach((el) => { el.style.display = 'block'; });
      }
      toggleButton.setAttribute('title', 'Switch to light mode');
    } else {
      // Light mode is ON, show moon icon (to click = switch to dark)
      if (moonIcon) moonIcon.style.display = 'block';
      if (sunElements.length > 0) {
        sunElements.forEach((el) => { el.style.display = 'none'; });
      }
      toggleButton.setAttribute('title', 'Switch to dark mode');
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
   * Announce theme change to screen readers
   * @param {string} theme - 'light' or 'dark'
   */
  function announceThemeChange(theme) {
    const announcement = theme === 'dark' ? 'Dark mode enabled' : 'Light mode enabled';
    const srAnnouncements = document.getElementById('sr-announcements');

    if (srAnnouncements) {
      srAnnouncements.textContent = announcement;
      // Clear after a moment
      setTimeout(() => {
        srAnnouncements.textContent = '';
      }, 1000);
    }
  }

  /**
   * Listen for system theme changes
   * Only apply if user hasn't manually set a preference
   */
  function listenToSystemTheme() {
    const darkModeQuery = window.matchMedia('(prefers-color-scheme: dark)');

    // Modern browsers support addEventListener
    if (darkModeQuery.addEventListener) {
      darkModeQuery.addEventListener('change', (e) => {
        // Only update if user hasn't manually set a preference
        if (!localStorage.getItem(THEME_KEY)) {
          setTheme(e.matches ? 'dark' : 'light');
        }
      });
    }
  }

  /**
   * Add keyboard support for toggle button
   */
  function addKeyboardSupport() {
    if (!themeToggle) return;

    themeToggle.addEventListener('keydown', function(e) {
      // Space or Enter key to toggle
      if (e.key === ' ' || e.key === 'Enter') {
        e.preventDefault();
        toggleTheme();
      }
    });
  }

  ensureThemeIcons();

  // Initialize theme on page load
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    // DOM already loaded
    initTheme();
  }

  // Add toggle button click listener
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
    addKeyboardSupport();
  }

  // Listen for system theme changes
  listenToSystemTheme();
})();
