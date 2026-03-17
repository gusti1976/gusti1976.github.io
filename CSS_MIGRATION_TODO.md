# CSS Migration TODO

Last updated: 2026-03-17

## Principles

- Migrate by page family, not one file at a time without structure.
- Keep shared tokens and primitives in shared CSS.
- Move page-specific composition into dedicated page or family CSS files.
- Validate after each extraction.
- Do not commit preview files or temporary review files.

## Current State

Already extracted:
- `about.html` -> `about.css`
- `index.html` lower-half/homepage styling -> `index-glass.css`

Still using inline `<style>` in public pages:
- `press.html`
- `lyrics.html`
- `agust-islandia-gay-and-proud-press-release.html`

## Page Families

1. Homepage
- Files:
  - `index.html`
- Status:
  - Partially extracted

2. About/Profile
- Files:
  - `about.html`
- Status:
  - Extracted

3. Press Hub
- Files:
  - `press.html`
- Status:
  - Pending extraction to `press.css`

4. Lyrics Archive
- Files:
  - `lyrics.html`
- Status:
  - Pending extraction to `lyrics-archive.css`

5. Press Release
- Files:
  - `agust-islandia-gay-and-proud-press-release.html`
- Status:
  - Pending extraction to `press-release.css`

6. Song/Lyrics Pages
- Files:
  - `59` pages using `song-layout`
- Status:
  - Shared-family extraction pending
- Target:
  - `lyrics-page.css`

7. Album/Release Pages
- Files:
  - `cowboys.html`
  - `swipe-me-to-the-moon.html`
  - `the-unseen-chorus.html`
  - `gay-and-proud.html`
  - `pride-month-2025.html`
  - `the-gay-mormon-musical.html`
  - `bless-this-mess.html`
- Status:
  - Shared-family extraction pending
- Target:
  - `album-page.css`

8. Special/One-off Pages
- Files needing later review:
  - `peach-and-purple.html`
  - `pride-on-the-seas.html`
  - `yogurt.html`
- Status:
  - Review later

## Migration Order

1. `press.html` -> `press.css`
2. `lyrics.html` -> `lyrics-archive.css`
3. `agust-islandia-gay-and-proud-press-release.html` -> `press-release.css`
4. `song-layout` family -> `lyrics-page.css`
5. album/release family -> `album-page.css`
6. special pages as needed

## Validation Checklist Per Step

- Extract CSS without changing intended visuals
- Rebuild local preview if applicable
- Run `python3 html_validator.py`
- Check target page in Safari/local HTTP preview if needed
- Commit only the intended migration files
