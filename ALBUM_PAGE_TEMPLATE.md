# Song Lyric Page Template - Standard Format

This document defines the standard format for all individual song/lyric pages on www.gusti.com.

**Reference page:** `/just-an-advisory.html`

---

## Head Section

```html
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <meta name="robots" content="max-image-preview:large">
  <meta name="theme-color" content="#ffffff">
  <meta name="color-scheme" content="light dark">

  <title>[Song Title] Lyrics - Agust Islandia | [Album Name]</title>
  <link rel="canonical" href="https://www.gusti.com/[filename].html">

  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="icon" type="image/png" sizes="192x192" href="/android-chrome-192x192.png">

  <meta name="description" content="Full lyrics to '[Song Title]' from [Album Name] by Agust Islandia. [Brief description.]">

  <meta property="og:title" content="[Song Title] Lyrics - [Album Name]">
  <meta property="og:site_name" content="Agust Islandia">
  <meta property="og:description" content="[Brief description for social sharing.]">
  <meta property="og:type" content="music.song">
  <meta property="og:url" content="https://www.gusti.com/[filename].html">
  <meta property="og:image" content="https://www.gusti.com/[album-cover].webp">
  <meta property="music:musician" content="https://www.gusti.com/">
  <meta property="music:release_date" content="YYYY-MM-DD">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="[Song Title] Lyrics - [Album Name]">
  <meta name="twitter:description" content="[One-line lyric or description.]">
  <meta name="twitter:image" content="https://www.gusti.com/[album-cover].webp">

  <link rel="stylesheet" href="style-optimized.css">

  <!-- Schema.org Structured Data - see Schema section below -->
  <script type="application/ld+json">...</script>

  <link rel="stylesheet" href="navigation.css">
</head>
```

---

## Body Structure (In Order)

```html
<body>
<!-- 1. Hamburger nav toggle -->
<button class="nav-toggle" id="nav-toggle" aria-label="Toggle navigation menu" aria-expanded="false">
  <span></span><span></span><span></span>
</button>

<!-- 2. Navigation drawer (full nav here) -->
<nav class="nav-drawer" id="nav-drawer" aria-label="Main navigation">
  ...
</nav>

<!-- 3. Overlay -->
<div class="nav-overlay" id="nav-overlay"></div>

<!-- 4. Skip link (after overlay, before .page) -->
<a href="#main-content" class="skip-link">Skip to main content</a>

<div class="page">
  <!-- 5. Theme toggle (sun + moon SVG) -->
  <button class="theme-toggle" id="theme-toggle" aria-label="Toggle dark mode" title="Toggle dark/light mode">
    <svg class="theme-icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <!-- Sun icon (shown in dark mode) -->
      <circle cx="12" cy="12" r="5" stroke="currentColor" stroke-width="2" fill="none" id="sun-icon" style="display: none;"/>
      <line x1="12" y1="1" x2="12" y2="3" stroke="currentColor" stroke-width="2" style="display: none;"/>
      <line x1="12" y1="21" x2="12" y2="23" stroke="currentColor" stroke-width="2" style="display: none;"/>
      <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" stroke="currentColor" stroke-width="2" style="display: none;"/>
      <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" stroke="currentColor" stroke-width="2" style="display: none;"/>
      <line x1="1" y1="12" x2="3" y2="12" stroke="currentColor" stroke-width="2" style="display: none;"/>
      <line x1="21" y1="12" x2="23" y2="12" stroke="currentColor" stroke-width="2" style="display: none;"/>
      <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" stroke="currentColor" stroke-width="2" style="display: none;"/>
      <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" stroke="currentColor" stroke-width="2" style="display: none;"/>
      <!-- Moon icon (shown in light mode) -->
      <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" stroke="currentColor" stroke-width="2" fill="none" id="moon-icon"/>
    </svg>
  </button>

  <!-- 6. Header -->
  <header style="text-align: center; padding: var(--spacing-2xl) var(--spacing-lg);">
    <nav style="margin-bottom: var(--spacing-lg);">
      <a href="/[album-filename].html" style="font-weight: 600;">← Back to [Album Name]</a>
    </nav>
    <h1>[Song Title]</h1>
    <p class="subtitle">Track [N] from <strong>[Album Name]</strong></p>
    <p class="subtitle">Written and Composed by <strong>Agust Smari Bjarkarson</strong> (Agust Islandia)</p>
    <div class="hero-cta" style="margin-top: var(--spacing-xl);">
      <a href="[SPOTIFY_ALBUM_URL]" class="btn-primary" target="_blank" rel="noopener noreferrer">Listen on Spotify</a>
      <a href="[APPLE_MUSIC_ALBUM_URL]" class="btn-secondary" target="_blank" rel="noopener noreferrer">Listen on Apple Music</a>
    </div>
  </header>

  <main id="main-content">

    <!-- Section 1: Lyrics -->
    <section>
      <h2>Lyrics</h2>
      <div class="lyrics">
        <p>Verse line<br>Verse line<br>Verse line<br>Verse line</p>
        <p><strong>Chorus line<br>Chorus line</strong></p>
        <p><em>Spoken/stage direction line</em></p>
      </div>
    </section>

    <!-- Section 2: About the Song -->
    <section>
      <h2>About the Song</h2>
      <p>[Description of the song, its context, and significance.]</p>
    </section>

    <!-- Section 3: Song Details (6 fields) -->
    <section>
      <h2>Song Details</h2>
      <ul style="line-height: 1.8;">
        <li><strong>Album:</strong> <a href="/[album-filename].html">[Album Name]</a></li>
        <li><strong>Track Number:</strong> [N] of [Total]</li>
        <li><strong>Duration:</strong> M:SS</li>
        <li><strong>Release Date:</strong> [Month Day, Year]</li>
        <li><strong>Genre:</strong> Musical Theatre, LGBTQ+ Music</li>
        <li><strong>Writer/Composer:</strong> Agust Smari Bjarkarson (Agust Islandia)</li>
      </ul>
    </section>

    <!-- Section 4: Themes -->
    <section>
      <h2>Themes</h2>
      <ul style="line-height: 1.8;">
        <li><strong>Theme Name:</strong> Description</li>
        <li><strong>Theme Name:</strong> Description</li>
      </ul>
    </section>

    <!-- Section 5: More Songs from [Album] -->
    <section>
      <h2>More Songs from [Album Name]</h2>
      <ul style="line-height: 1.8;">
        <li><strong><a href="/[song].html">[Song Title]</a></strong> - Track [N]: [Brief description]</li>
        <li><strong><a href="/[song].html">[Song Title]</a></strong> - Track [N]: [Brief description]</li>
        <li><strong><a href="/[song].html">[Song Title]</a></strong> - Track [N]: [Brief description]</li>
      </ul>
      <p><a href="/[album-filename].html">← View complete tracklist</a></p>
    </section>

  </main>

  <footer>© 2026 <strong>Agust Smari Bjarkarson</strong></footer>
</div>

<script src="dark-mode.js"></script>
<script src="navigation.js"></script>
</body>
```

---

## Lyrics Formatting Rules

Use `<div class="lyrics">` with `<p>` tags — never `<pre>`.

| Element | Use for |
|---|---|
| `<p>plain text</p>` | Regular verses |
| `<p><strong>text</strong></p>` | Chorus lines |
| `<p><em>text</em></p>` | Spoken lines / stage directions |
| `<br>` inside `<p>` | Line breaks within a stanza |
| Blank `<p>` between stanzas | Stanza breaks |

Guardrail:
- Never leave a literal `\n` after `<br>` in rendered HTML. Use `<br>` only, followed by the next lyric line text or normal indentation whitespace. A visible `\n` on the page means the lyric HTML was escaped incorrectly during generation or paste cleanup.

---

## Song Details Fields (All 6 Required)

1. **Album:** linked to album overview page
2. **Track Number:** `N of Total` (e.g., `1 of 27`)
3. **Duration:** `M:SS` format (e.g., `3:05` not `3:5`)
4. **Release Date:** written out (e.g., `October 6, 2025`)
5. **Genre:** `Musical Theatre, LGBTQ+ Music`
6. **Writer/Composer:** `Agust Smari Bjarkarson (Agust Islandia)`

---

## Schema.org JSON-LD Template

```json
{
  "@context": "https://schema.org",
  "@type": "MusicComposition",
  "name": "[Song Title]",
  "image": "https://www.gusti.com/[album-cover].webp",
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
  "lyrics": {
    "@type": "CreativeWork",
    "text": "[Full lyrics as plain text]",
    "inLanguage": "en-US"
  },
  "inLanguage": "en",
  "datePublished": "YYYY-MM-DD",
  "genre": ["Musical Theatre", "LGBTQ+ Music", "Gay Musical", "Theatrical Pop"],
  "keywords": "[relevant keywords]",
  "isPartOf": {
    "@type": "MusicAlbum",
    "name": "[Album Name]",
    "image": "https://www.gusti.com/[album-cover].webp",
    "byArtist": {
      "@type": "MusicGroup",
      "name": "Agust Islandia",
      "url": "https://www.gusti.com/",
      "sameAs": [
        "https://open.spotify.com/artist/3vCWdArvNjajk3eCmfExNG",
        "https://music.apple.com/us/artist/agust-smari-bjarkarson/1827272561"
      ]
    }
  },
  "recordedAs": {
    "@type": "MusicRecording",
    "name": "[Song Title]",
    "image": "https://www.gusti.com/[album-cover].webp",
    "position": "[track number]",
    "duration": "PT[M]M[SS]S",
    "byArtist": {
      "@type": "MusicGroup",
      "name": "Agust Islandia",
      "url": "https://www.gusti.com/",
      "sameAs": [
        "https://open.spotify.com/artist/3vCWdArvNjajk3eCmfExNG",
        "https://music.apple.com/us/artist/agust-smari-bjarkarson/1827272561"
      ]
    },
    "inAlbum": {
      "@type": "MusicAlbum",
      "name": "[Album Name]",
      "url": "https://www.gusti.com/[album-filename].html",
      "datePublished": "YYYY-MM-DD"
    },
    "url": "[SPOTIFY_ALBUM_URL]"
  }
}
```

**Duration format:** ISO 8601 — `PT2M42S` = 2:42, `PT1M32S` = 1:32

---

## Reference Pages

- **Primary reference:** `/just-an-advisory.html` — The Unseen Chorus, Track 1
- **The Unseen Chorus album covers:** `the-unseen-chorus-cover.webp`
- **Swipe Me to the Moon album covers:** `swipe-me-to-the-moon-cover.webp` *(check actual filename)*

### Album URLs
- The Unseen Chorus Spotify: `https://open.spotify.com/album/0hMwFUq63zUjMyYBKvnq9p`
- The Unseen Chorus Apple Music: `https://music.apple.com/album/the-unseen-chorus-a-gay-musical/1844179786`
- The Unseen Chorus release date: `2025-10-06`
- Swipe Me to the Moon release date: `2025-07-18`

---

## Do's

✅ Use `just-an-advisory.html` as the reference for all new song pages
✅ Include both Spotify (btn-primary) and Apple Music (btn-secondary) buttons in header
✅ Include "Written and Composed by" subtitle in header
✅ Use `<div class="lyrics">` with `<p>` tags, never `<pre>`
✅ Use `<strong>` for chorus lines, `<em>` for spoken/stage direction lines
✅ Include all 6 fields in Song Details
✅ Include Themes section
✅ Include "More Songs from..." section with 3 specific tracks + link to full tracklist
✅ Use M:SS duration format (e.g., `3:05` not `3:5`)
✅ Include full Schema.org JSON-LD with lyricist, recordedAs, position, inLanguage
✅ Include all meta tags: robots, theme-color, color-scheme, Twitter cards, og:type=music.song

## Don'ts

❌ Don't use `<pre>` for lyrics
❌ Don't omit the Apple Music button
❌ Don't omit "Written and Composed by" subtitle
❌ Don't use only 3 fields in Song Details — always use all 6
❌ Don't skip the Themes section
❌ Don't skip the "More Songs from..." section
❌ Don't use the simple moon-only theme toggle — use the full sun+moon SVG

---

**Last Updated:** 2026-03-02
**Standard Version:** 2.0
**Reference Page:** `/just-an-advisory.html`
