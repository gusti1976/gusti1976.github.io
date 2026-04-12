# Lyrics — Workflow & Patterns

## When to Create a Lyric Page

**Always create** a dedicated `/song-name.html` page for:
- Single releases
- Bilingual / multi-language songs
- Viral or culturally significant tracks
- Songs with complex themes worth deep analysis

**Do NOT create** for:
- Routine album/musical tracks with no special significance (list in album tracklist only)
- Instrumental / interlude tracks
- Duplicate / remix versions (note on original page instead)

### Release Type Matrix

| Type | Strategy |
|---|---|
| Single | Dedicated page always |
| EP (3-6 tracks) | 1-2 standout tracks |
| Album (7-15 tracks) | Lead single + standout tracks |
| Musical (15-30+ tracks) | 2-4 thematically important tracks |
| Bilingual single | Always dedicated (show both languages) |

## Checklist: Adding a New Single

1. **Verify info** — title (exact spelling), release date (YYYY-MM-DD), duration (PT3M44S format),
   Spotify URL, Apple Music URL, genre tags, bilingual yes/no
2. **Get full lyrics** — complete, accurate, all verses/chorus/bridge. Listen while reading.
3. **Create HTML file** — `song-name.html` (lowercase, hyphens). Copy from `gay-and-proud.html`.
4. **Update `index.html`** — add to discography section.
5. **Update cross-links** — add to "More Songs" section on 3 existing song pages.
6. **Update `llms.txt`** — Notable Works + Keywords + Last Updated date.
7. **Update nav** — if the song warrants a nav link, edit `_includes/navigation.html` and all pages.
8. **Update `sitemap.xml`** — add `<url>` entry with `<priority>0.9</priority>`.
9. **Validate** — run `python3 html_validator.py`, fix any errors.

## Song Page Structure

Every song page has these 5 sections in order:

1. **`<head>`** — charset, viewport, title, description, canonical, OG/Twitter, Schema.org JSON-LD,
   links to `style-optimized.css` and `navigation.css`
2. **Body nav** — skip link, `#nav-toggle`, `#nav-drawer`, `#nav-overlay`, scripts at bottom
3. **Header** — H1 (song title), H2 `.subtitle-large` (type), artist credit, streaming CTA buttons
4. **Main content** — Song info list, About the Song, full lyrics in `<pre>` with border, Themes &
   Meaning, Listen & Follow links, More Songs (3 cross-links)
5. **Footer** — copyright year, artist name

## Lyrics Border Color

Each song has a unique `border-left` color on its lyrics `<pre>` block. Choose from:

```html
<div style="border-left: 4px solid var(--color-primary-blue);">   <!-- #0048E0 -->
<div style="border-left: 4px solid var(--color-primary-purple);"> <!-- #732982 -->
<div style="border-left: 4px solid var(--color-primary-teal);">   <!-- #008080 -->
<div style="border-left: 4px solid var(--color-spotify);">        <!-- #1db954 -->
<div style="border-left: 4px solid var(--color-apple);">          <!-- #fc3c44 -->
<div style="border-left: 4px solid var(--color-gold);">           <!-- #FFD700 -->
```

Pick a color not already used by the nearest related song.

## Album Landing Pages

Create when a release has 10+ tracks. Reference `the-unseen-chorus.html` as template.
For full HTML scaffold, see `ALBUM_PAGE_TEMPLATE.md` at repo root.

## llms.txt Entry Format

```
- [Song Title](https://www.gusti.com/song-name.html): One-sentence description. Language, key themes.
```

Add under "Notable Works". Update "Last Updated" date at bottom of file.
