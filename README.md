# Agust Smari Bjarkarson (Agust Islandia)

Icelandic queer pop artist from Reykjavík, also known as **Agust Islandia**.
His music blends humor, heart, and bold storytelling with dance energy, celebrating LGBTQ+ identity, queer love, and Pride.

👉 Visit the official site: [www.gusti.com](https://www.gusti.com/)

## Official Website Features

### Complete Musical with Full Lyrics
- **[The Unseen Chorus](https://www.gusti.com/the-unseen-chorus.html)** - A Gay Musical
  - **All 27 tracks** have dedicated lyric pages with full Schema.org markup
  - Complete 3-act narrative: Infidelity → Addiction → Recovery → Love
  - Album landing page with tracklist, story arc, and themes
  - Release date: October 6, 2025

### Pride Anthems & Singles
- **[Gay and Proud / Gay y Orgulloso](https://www.gusti.com/gay-and-proud.html)** - Viral bilingual Pride anthem (540K+ TikTok views)
- **[My Fire (Mi Fuego)](https://www.gusti.com/my-fire.html)** - Bilingual Spanish/English love song
- **[Feel Alive](https://www.gusti.com/feel-alive.html)** - High-energy EDM dance anthem

### New Pages & Navigation
- **[Meet Agust Islandia](https://www.gusti.com/about.html)** - Full bio, influences, career highlights
- **[Lyrics & Stories](https://www.gusti.com/lyrics.html)** - Central hub for all 30+ lyric pages
- **[Press & News](https://www.gusti.com/press.html)** - Milestones, releases, press contact
- **Global Navigation** - Hamburger menu on all 35 pages with collapsible sections

### Technical Features
- **Enhanced SEO**: Complete Schema.org markup on 30+ pages (MusicComposition, MusicRecording, MusicAlbum)
- **AI Optimization**: Comprehensive llms.txt file for AI crawlers
- **Bilingual Support**: Spanish/English content with proper language markup
- **Accessibility**: WCAG 2.1 AA compliant, dark mode, keyboard navigation, skip links
- **Performance**: WebP images, optimized CSS/JS, fast loading

## Site Structure

```
www.gusti.com/
├── index.html                          # Homepage
├── about.html                          # Bio & background (NEW)
├── press.html                          # Press & milestones (NEW)
├── lyrics.html                         # Lyrics hub (NEW)
│
├── Singles/
│   ├── gay-and-proud.html
│   ├── my-fire.html
│   └── feel-alive.html
│
├── The Unseen Chorus Musical/
│   ├── the-unseen-chorus.html          # Album page
│   ├── just-an-advisory.html           # Track 1
│   ├── two-of-us.html                  # Track 2
│   ├── phone-glow.html                 # Track 3
│   ├── ... (tracks 4-26)
│   └── come-out-of-the-dark.html       # Track 27 (finale)
│
└── Assets/
    ├── navigation.css                  # Global nav styles (NEW)
    ├── navigation.js                   # Nav functionality (NEW)
    ├── style-optimized.css             # Main styles
    ├── dark-mode.js                    # Theme toggle
    ├── llms.txt                        # AI crawler data
    └── sitemap.xml                     # SEO sitemap
```

## Documentation

### For Developers
- **[NAVIGATION.md](NAVIGATION.md)** - Navigation system architecture and usage
- **[SEO_IMPLEMENTATION.md](SEO_IMPLEMENTATION.md)** - Complete SEO strategy, Schema.org patterns
- **[OPTIMIZATION.md](OPTIMIZATION.md)** - Code optimization and performance
- **[QUICK_REFERENCE.md](QUICK_REFERENCE.md)** - Quick reference for common tasks
- **[DARK_MODE_IMPLEMENTATION.md](DARK_MODE_IMPLEMENTATION.md)** - Dark mode details

### For Content Updates
- **[LYRICS_CHECKLIST.md](LYRICS_CHECKLIST.md)** - Step-by-step workflow for adding songs
- **Adding New Songs**: Complete checklist with Schema.org patterns
- **Updating Navigation**: Edit `navigation-template.html`, then apply to all pages
- **Schema.org Markup**: Full patterns in SEO_IMPLEMENTATION.md Section 5

## Technical Stack

- **Frontend**: Semantic HTML5, CSS3 with CSS variables, Vanilla JavaScript
- **Navigation**: Responsive hamburger menu with collapsible sections
- **SEO**: Schema.org (MusicComposition, MusicRecording, MusicAlbum, Person)
- **Meta Tags**: OpenGraph, Twitter Cards, music-specific properties
- **Accessibility**: WCAG 2.1 AA, ARIA labels, keyboard navigation, skip links
- **Images**: WebP format with fallbacks, optimized album artwork
- **Hosting**: GitHub Pages with custom domain
- **Analytics**: Privacy-respecting (Google Analytics with consent mode)

## Key Files & Their Purpose

### HTML Pages (35 total)
- `index.html` - Homepage with discography
- `about.html` - Artist bio and background
- `press.html` - Press, news, and milestones
- `lyrics.html` - Central lyrics hub
- `the-unseen-chorus.html` - Album landing page
- 27 individual track pages for The Unseen Chorus
- 3 singles pages (Gay and Proud, My Fire, Feel Alive)

### CSS & JavaScript
- `style-optimized.css` - Main stylesheet (CSS variables, responsive)
- `navigation.css` - Global navigation styles
- `dark-mode.js` - Theme toggle functionality
- `navigation.js` - Menu toggle, collapsible sections, active states

### SEO & Metadata
- `llms.txt` - AI crawler optimization (detailed artist/work descriptions)
- `sitemap.xml` - XML sitemap for search engines (all 35 pages)
- Schema.org JSON-LD on every page

### Assets
- `the-unseen-chorus-cover.webp` - Album artwork (optimized, 1200x1200)
- `agust_islandia.jpg` - Artist photo
- `favicon-*.png` - Favicon variants

## Recent Major Updates

### February 28, 2026
- ✅ Added global hamburger navigation to all 35 pages
- ✅ Created about.html, press.html, lyrics.html
- ✅ Updated llms.txt with complete musical information
- ✅ Integrated album artwork across all musical pages

### February 27-28, 2026
- ✅ Created all 27 lyric pages for The Unseen Chorus
- ✅ Updated album page with accurate 3-act story arc
- ✅ Revised themes based on actual lyrics content
- ✅ Updated sitemap.xml with all pages
- ✅ Full Schema.org markup on 30+ pages

## Navigation System

The site features a **global hamburger menu** (☰) in the top-left corner on all pages:

**Structure:**
- 🏠 Home
- 👤 Meet Agust Islandia (About)
- 🎵 Music (collapsible sections)
  - Singles & Pride Anthems
  - The Unseen Chorus (27 tracks - expandable)
- 📝 Lyrics & Stories
- 📰 Press & News
- 🔗 Listen / Links (Spotify, Apple Music, TikTok, Contact)

**Features:**
- Responsive slide-out drawer
- Auto-expands sections containing current page
- Keyboard accessible (Escape to close)
- Dark mode aware
- Click-outside-to-close overlay

## Statistics

- **35 HTML pages** across the site
- **30+ song pages** with full lyrics
- **27 tracks** in The Unseen Chorus musical
- **540,000+ TikTok views** on Gay and Proud
- **60,000 daily streams** milestone achieved
- **100% Schema.org compliant** - all music pages fully enriched

## Contact

- **Website**: [www.gusti.com](https://www.gusti.com/)
- **Email**: agust@arcticsea.com
- **Spotify**: [Agust Islandia](https://open.spotify.com/artist/3vCWdArvNjajk3eCmfExNG)
- **Apple Music**: [Agust Smari Bjarkarson](https://music.apple.com/us/artist/agust-smari-bjarkarson/1827272561)
- **TikTok**: [@gusticeland](https://www.tiktok.com/@gusticeland)
- **MusicBrainz**: [Artist Profile](https://musicbrainz.org/artist/fca2294b-5bbb-4711-881a-aa61e90346f5)

---

**Last Updated**: February 28, 2026
**License**: All lyrics © 2025 Agust Smari Bjarkarson. All rights reserved.
**Built with**: HTML5, CSS3, Vanilla JavaScript - No frameworks, fully semantic, accessible, and optimized for search.
