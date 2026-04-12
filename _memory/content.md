# Content — Artist & Catalog

## Artist

| Field | Value |
|---|---|
| Real name | Agust Smari Bjarkarson |
| Stage name | Agust Islandia |
| Origin | Reykjavík, Iceland |
| Genre | Icelandic queer pop, dance, LGBTQ+ music |
| Identity | Openly gay; music celebrates LGBTQ+ identity and queer love |
| SEO goal | Always co-locate both names on pages — search engines learn the relationship |

**Co-occurrence pattern** (use on every page):
```html
<h1>Agust Islandia</h1>
<h2 class="subtitle-large">Icelandic Queer Pop Artist & LGBTQ+ Musician</h2>
<p class="subtitle"><strong>Agust Smari Bjarkarson</strong> | Reykjavik, Iceland</p>
```

## Music Catalog

| Release | Type | Date | Tracks | Notes |
|---|---|---|---|---|
| The Unseen Chorus | Gay Musical | Oct 6, 2025 | 27 | All 27 have lyric pages; 3-act narrative |
| Swipe Me to the Moon | Album | Jul 18, 2025 | 22 | No individual lyric pages yet |
| Gay and Proud / Gay y Orgulloso | Single | — | 1 | Bilingual en/es; 540K+ TikTok views |
| My Fire (Mi Fuego) | Single | — | 1 | Bilingual en/es |
| Feel Alive | Single | — | 1 | EDM dance anthem |
| Pride Month 2025 | EP | 2025 | 3-6 | Standout tracks only |
| Cowboys | Album/EP | — | — | |
| Bless This Mess | Release | — | — | |
| Peach and Purple | Release | — | — | |
| Pride on the Seas | Release | — | — | |
| Yogurt | Release | — | — | |
| The Gay Mormon Musical | Release | — | — | |

## Contact & Profiles

| Platform | URL / Value |
|---|---|
| Email | agust@arcticsea.com (obfuscated via JS — see seo.md) |
| Website | https://www.gusti.com/ |
| Spotify | https://open.spotify.com/artist/3vCWdArvNjajk3eCmfExNG |
| Apple Music | https://music.apple.com/us/artist/agust-smari-bjarkarson/1827272561 |
| TikTok | https://www.tiktok.com/@gusticeland |
| MusicBrainz | https://musicbrainz.org/artist/fca2294b-5bbb-4711-881a-aa61e90346f5 |

These URLs appear in Schema.org `sameAs` arrays — keep them accurate.

## Naming Conventions

**HTML files:** lowercase, hyphenated (`just-an-advisory.html`, `gay-and-proud.html`)

**Image files:** `[album-slug]-cover.webp` + `.jpg` fallback
- `the-unseen-chorus-cover.webp/.jpg`
- `gay-and-proud-cover.webp` (no JPG — bug: add fallback)
- `agust_islandia.webp/.jpg` (artist photo — uses underscore)

**CSS files:** per page family (e.g. `press.css`, `about.css`, `lyrics-archive.css`)

**Alt text pattern:** `alt="Song Title cover art"` — no extra quotes
(Bug: 30+ pages have `alt="Song Title" cover art"` — see bugs.md)
