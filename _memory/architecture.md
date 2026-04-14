# Architecture — www.gusti.com

## Tech Stack

Pure HTML5 / CSS3 / Vanilla JavaScript. No npm. No build step. No framework.
Hosted on GitHub Pages. Custom domain via `CNAME` file (`www.gusti.com`).
76 public pages in sitemap; 84 HTML files total (includes templates/utilities). Deploy = `git push origin main` (auto-builds in ~1 min).

**Jekyll processing is live** on GitHub Pages: all 74 main pages load the nav via
`{% include navigation.html %}`, so editing `_includes/navigation.html` cascades
to every page at build time. Earlier notes claiming "no server-side includes"
are obsolete.

## File Map

| File | Type | Purpose | Notes |
|---|---|---|---|
| `style-optimized.css` | CSS | Main stylesheet, all `:root` CSS variables | Source of truth for design tokens |
| `navigation.css` | CSS | Global hamburger nav styles (268 lines) | Linked on every page |
| `about.css` | CSS | About page styles | Extracted from about.html |
| `press.css` | CSS | Press page styles | Extracted from press.html |
| `press-release.css` | CSS | Press release page styles | Extracted from agust-islandia-gay-and-proud-press-release.html |
| `hub.css` | CSS | Shared "hub page" styles: hero + summary card + grid of panels | Used by `discography.html`, `contact.html`. Mirrors press.css visual language. |
| `glass-site.css` | CSS | Glass morphism variant | Used by glass/ and some main pages |
| `glass-lyrics-template.css` | CSS | Glass variant for lyrics | Template use |
| `lyrics-archive.css` | CSS | Lyrics hub styles | lyrics.html |
| `style.css` | CSS | Legacy — can be deleted when safe | |
| `navigation.js` | JS | Hamburger toggle, collapsibles, active state | Linked on every page |
| `dark-mode.js` | JS | Theme toggle (light/dark) | Linked on every page |
| `script.js` | JS | Homepage-only: info bubbles, screen reader | index.html only |
| `navigation-template.html` | HTML | Canonical nav structure — edit this first | Not a public page |
| `_includes/navigation.html` | HTML | Jekyll include — the nav HTML fragment | Edit this when updating nav |
| `html_validator.py` | Python | Local HTML + Schema.org validator | Run from repo root |
| `sitemap.xml` | XML | SEO sitemap (74 URLs) | Update when adding pages |
| `llms.txt` | Text | AI crawler optimization data | Update with new songs |
| `robots.txt` | Text | Search engine crawl rules | |
| `CNAME` | Text | Custom domain: `www.gusti.com` | Do not delete |
| `_config.yml` | YAML | Jekyll build config — `exclude:` list keeps internal docs out of the public build | Prevents Liquid-in-code-spans in CLAUDE.md from failing the Pages build. See bugs.md BUG-012. |
| `discography.html` | HTML | Full catalogue hub page | Created 2026-04-14 |
| `contact.html` | HTML | Contact hub page (press, bookings, identifiers) | Created 2026-04-14 |
| `.claude/settings.json` | JSON | Claude Code hook wiring (SessionStart, UserPromptSubmit, PostToolUse, Stop) | Dot-prefixed, ignored by Jekyll |
| `.claude/log-event.sh` | Bash | Session resilience logger — appends to session-log.md, rewrites resume-state.md | Runs on every hook event |
| `.claude/session-log.md` | Markdown | Append-only event trail | Auto-written |
| `.claude/resume-state.md` | Markdown | Single-page state snapshot | Auto-overwritten |
| `.claude/README.md` | Markdown | Documentation for the resilience system | |

## CSS Variables (`:root` in style-optimized.css)

**Layout:** `--max-width`, `--spacing-xs/sm/md/lg/xl/2xl`

**Colors — Primary:** `--color-primary-blue` (#0048E0), `--color-primary-purple` (#732982),
`--color-primary-teal` (#008080)

**Colors — Platforms:** `--color-spotify` (#1db954), `--color-spotify-hover`, `--color-apple`
(#fc3c44), `--color-apple-hover`

**Colors — BG/Text:** `--color-bg-light`, `--color-bg-overlay`, `--bg-a/b/c` (radial orbs),
`--color-text-primary/secondary/tertiary`, `--color-border-light/subtle`

**Colors — Decorative:** `--color-gold` (#FFD700), `--color-shadow`, `--color-shadow-dark`,
`--color-shadow-tooltip`

**Gradients:** `--gradient-bg`, `--gradient-pride`, `--gradient-pride-animated`,
`--gradient-underline`, `--gradient-accent`, `--gradient-platform-border`

**Shape:** `--radius-sm/md/lg/xl`

**Motion:** `--transition-fast` (0.3s), `--transition-normal` (0.4s), `--transition-slow` (0.6s),
`--transition-cubic`

**Typography:** `--font-stack` (system font stack), `--line-height-normal/tight/relaxed`

**Z-index:** `--z-tooltip` (999999), `--z-tooltip-bubble` (999998), `--z-fixed-ui` (10000),
`--z-skip-link` (9999), `--z-bubble` (100), `--z-header` (1, rarely used)

**Navigation — Light Mode Colors:** `--nav-light-text`, `--nav-light-text-hover`,
`--nav-light-text-active`, `--nav-light-bg`, `--nav-light-bg-hover`, `--nav-light-bg-active`,
`--nav-light-border`, `--nav-light-border-hover`, `--nav-light-border-active`,
`--nav-light-sub-text`, `--nav-light-sub-text-hover`, `--nav-light-sub-bg`,
`--nav-light-sub-bg-hover`, `--nav-light-sub-border`, `--nav-light-sub-border-hover`,
`--nav-light-section-header`, `--nav-light-overlay`, `--nav-light-hamburger`
(All 18 used exclusively by `navigation.css` light-mode overrides)

Dark mode overrides defined in `@media (prefers-color-scheme: dark)` block and
`html[data-theme="dark"]` block, both in `style-optimized.css`.

## JS Functions

### script.js (index.html only)
| Function | Purpose |
|---|---|
| `toggleContent()` | Opens/closes info bubbles |
| `announceToScreenReader()` | Accessibility notifications |

### navigation.js (all pages)
| Function | Purpose |
|---|---|
| `initNavigation()` | Sets up all nav event listeners |
| `openNav()` | Opens hamburger drawer, locks body scroll |
| `closeNav()` | Closes drawer, restores scroll |
| `toggleCollapsible(trigger)` | Expands/collapses a nav section |
| `setActiveLink()` | Highlights current page; auto-expands its section |

### dark-mode.js (all pages)
| Function | Purpose |
|---|---|
| `ensureThemeIcons()` | Injects missing SVG sun/moon nodes into toggle button |
| `initTheme()` | Reads localStorage or system pref, applies theme |
| `setTheme(theme)` | Applies 'light' or 'dark'; saves to localStorage |
| `toggleTheme()` | Flips current theme |
| `listenToSystemTheme()` | Watches `prefers-color-scheme` for system changes |

## Page Families (CSS Migration Status)

| Family | Files | CSS Target | Status |
|---|---|---|---|
| Homepage | `index.html` | `index-glass.css` | Partially extracted |
| About/Profile | `about.html` | `about.css` | ✅ Extracted |
| Press Hub | `press.html` | `press.css` | ✅ Extracted |
| Lyrics Archive | `lyrics.html` | `lyrics-archive.css` | ✅ Extracted |
| Press Release | `agust-islandia-gay-and-proud-press-release.html` | `press-release.css` | ✅ Extracted |
| Song/Lyrics Pages | 27+ track pages | `lyrics-page.css` | Pending |
| Album/Release Pages | `cowboys.html`, `swipe-me-to-the-moon.html`, etc. | `album-page.css` | Pending |
| Special/One-off | `peach-and-purple.html`, `pride-on-the-seas.html`, `yogurt.html` | TBD | Review later |

## Site Structure

```
74 public pages (sitemap), 82 HTML files total:

  Core (4):          index, about, press, lyrics
  Glass variant (1): glass/index.html (Glass Edition frontpage)

  Album/EP pages (5):
    the-unseen-chorus.html, swipe-me-to-the-moon.html, cowboys.html,
    the-gay-mormon-musical.html, pride-month-2025.html

  Press release (1): agust-islandia-gay-and-proud-press-release.html

  Singles (6):       gay-and-proud, gay-y-orgulloso, out-and-proud,
                     my-fire, feel-alive, bless-this-mess

  Special pages (4): peach-and-purple, pride-on-the-seas, yogurt,
                     pride-around-the-world

  Lyric pages (~54):
    Unseen Chorus (27 tracks): a-bar-in-my-pocket → yall-means-all
    Swipe Me to the Moon (16 pages): and-i-had-him, is-there-a-guidebook,
      is-this-real, just-an-advisory, maybe-its-me, next-time-i-see-him,
      so-what-do-we-do, the-awakening, the-fairys-waltz, the-first-argument,
      the-grindr-carol, the-spiral-extended, the-spiral-original,
      were-not-just-friends, what-app-though, what-do-we-do-with-forever
    Cowboys EP (5 tracks): broken-spurs, fuck-this-shit,
      playing-with-my-ding-dong, two-steers-in-love, yall-means-all
    Shared/cross-listed: some songs appear on multiple releases

  Utility (not in sitemap):
    test.html, google46e00271f9de7d83.html, navigation-template.html,
    tetris.html (redirect stub), GLASS_ALBUM_TEMPLATE.html,
    GLASS_LYRICS_TEMPLATE.html, _includes/navigation.html

  Games (separate): games/tetris/index.html, games/prince-of-persia/*.html
```
