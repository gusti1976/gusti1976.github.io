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

| Release | Type | Date | Tracks | Lyric Pages | Notes |
|---|---|---|---|---|---|
| The Unseen Chorus | Gay Musical | Oct 6, 2025 | 27 | 27 | Full album pages; 3-act narrative |
| Swipe Me to the Moon | Gay Musical | Jul 18, 2025 | 22 | 16 | and-i-had-him, is-there-a-guidebook, is-this-real, just-an-advisory, maybe-its-me, next-time-i-see-him, so-what-do-we-do, the-awakening, the-fairys-waltz, the-first-argument, the-grindr-carol, the-spiral-extended/original, were-not-just-friends, what-app-though, what-do-we-do-with-forever |
| Cowboys | EP | Sep 2, 2025 | 5 | 5 | Queer country-pop; broken-spurs, fuck-this-shit, playing-with-my-ding-dong, two-steers-in-love, yall-means-all |
| Pride Month 2025 | EP | Jul 16, 2025 | 5 | 0 | Album landing page only |
| The Gay Mormon Musical | Musical | — | — | 0 | Album landing page only |
| Gay and Proud / Gay y Orgulloso | Single | — | 1 | 2 | Bilingual en/es (gay-and-proud + gay-y-orgulloso); 540K+ TikTok views |
| Out and Proud | Single | — | 1 | 1 | |
| My Fire | Single | — | 1 | 1 | Bilingual en/es |
| Feel Alive | Single | — | 1 | 1 | EDM dance anthem |
| Bless This Mess | Single | Aug 15, 2025 | 1 | 1 | |
| Peach and Purple | Release | — | — | 1 | Special page |
| Pride on the Seas | Release | — | — | 1 | Special page |
| Pride Around the World | Release | — | — | 1 | Special page |
| Yogurt | Release | — | — | 1 | Special page |

**Hub pages (not releases, but catalog navigation):**

| Page | Role |
|---|---|
| `discography.html` | Full catalog: every album, EP, single, special. Created 2026-04-14. |
| `contact.html` | Contact hub for press, bookings, general enquiries. Replaces mailto-only nav item. Created 2026-04-14. |
| `lyrics.html` | A–Z lyric archive grouped by album. |
| `press.html` | Press coverage and milestones. |

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
