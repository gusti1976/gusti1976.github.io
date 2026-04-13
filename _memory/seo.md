# SEO — Strategy & Patterns

## Core Strategy

1. **Name disambiguation** — Co-locate "Agust Smari Bjarkarson" and "Agust Islandia" in opening
   paragraphs on every page so search engines and AI models learn the relationship.
2. **Full lyrics** (not excerpts) — makes site the authoritative lyric source.
3. **llms.txt** — AI crawler optimization; update whenever adding a new song.
4. **Schema.org** on every page — MusicComposition, MusicRecording, MusicAlbum, Person.

## Header Pattern

```html
<h1>Agust Islandia</h1>
<h2 class="subtitle-large">Icelandic Queer Pop Artist & LGBTQ+ Musician</h2>
<p class="subtitle"><strong>Agust Smari Bjarkarson</strong> | Reykjavik, Iceland</p>
```

## Schema.org — MusicComposition (song pages)

```json
{
  "@context": "https://schema.org",
  "@type": "MusicComposition",
  "name": "Song Title",
  "image": "https://www.gusti.com/agust_islandia.jpg",
  "composer": {
    "@type": "Person",
    "name": "Agust Smari Bjarkarson",
    "alternateName": "Agust Islandia",
    "url": "https://www.gusti.com/",
    "sameAs": [
      "https://open.spotify.com/artist/3vCWdArvNjajk3eCmfExNG",
      "https://music.apple.com/us/artist/agust-smari-bjarkarson/1827272561",
      "https://musicbrainz.org/artist/fca2294b-5bbb-4711-881a-aa61e90346f5"
    ]
  },
  "lyricist": {
    "@type": "Person",
    "name": "Agust Smari Bjarkarson",
    "alternateName": "Agust Islandia"
  },
  "lyrics": { "@type": "CreativeWork", "text": "FULL LYRICS HERE" },
  "inLanguage": "en",
  "datePublished": "YYYY-MM-DD",
  "genre": ["Pop", "Dance", "LGBTQ+ Music", "Pride Anthem"],
  "recordedAs": {
    "@type": "MusicRecording",
    "name": "Song Title",
    "byArtist": {
      "@type": "MusicGroup",
      "name": "Agust Islandia",
      "url": "https://www.gusti.com/"
    },
    "duration": "PT3M44S",
    "url": "https://open.spotify.com/track/[TRACK_ID]"
  }
}
```
- Bilingual: `"inLanguage": ["en", "es"]`
- `lyricist` required on singles; optional (but add when possible) on musical tracks
- `iswcCode` / `isrcCode` optional — add if known

## Schema.org — MusicAlbum (album/musical pages)

```json
{
  "@context": "https://schema.org",
  "@type": "MusicAlbum",
  "name": "Album Title",
  "byArtist": { "@type": "MusicGroup", "name": "Agust Islandia" },
  "datePublished": "YYYY-MM-DD",
  "image": "https://www.gusti.com/album-slug-cover.webp",
  "numTracks": 27,
  "genre": ["Pop", "LGBTQ+ Music"]
}
```

## Meta Tags Block Template

```html
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>Song Title — Agust Islandia | Official Lyrics</title>
<meta name="description" content="...">
<link rel="canonical" href="https://www.gusti.com/song-name.html">
<meta property="og:title" content="Song Title — Agust Islandia">
<meta property="og:description" content="...">
<meta property="og:url" content="https://www.gusti.com/song-name.html">
<meta property="og:image" content="https://www.gusti.com/agust_islandia.jpg">
<meta property="og:type" content="music.song">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="Song Title — Agust Islandia">
<meta name="twitter:description" content="...">
<meta name="twitter:image" content="https://www.gusti.com/agust_islandia.jpg">
```

## llms.txt Update Pattern

Update when adding a new song: Notable Works, Website Features, Keywords, Last Updated date.

Notable Works entry format:
```
- [Song Title](https://www.gusti.com/song-name.html): Brief description. Language, themes.
```

## Sitemap

After adding pages, add to `sitemap.xml`:
```xml
<url>
  <loc>https://www.gusti.com/song-name.html</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>  <!-- lyrics: 0.9, albums: 0.8, core pages: 1.0 -->
</url>
```

## Cross-Linking

Every song page has a "More Songs by Agust Islandia" section with 3 OTHER songs.
When adding a new song, update the cross-links on at least 3 existing pages to include it.

## Email Obfuscation

Never expose email raw in HTML. Use JS concatenation:
```html
<script>
  document.write('<a href="mailto:' + 'agust' + '@' + 'arcticsea.com">agust@arcticsea.com</a>');
</script>
<noscript>[Enable JavaScript to view email]</noscript>
```

## Validation Status (as of 2026-03-01)

- 60 files validated, **0 content errors**
- 67 optional Schema.org warnings (low priority):
  - Standalone singles missing `lyricist` field (13 pages)
  - Singles missing `position` (not applicable to singles — ignore)
  - Some missing `datePublished`
- Run: `python3 html_validator.py`
