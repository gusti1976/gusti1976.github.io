# Lyrics Management Checklist - Agust Islandia Website

## Overview

This document provides comprehensive guidelines for managing lyrics on www.gusti.com, covering single songs, multi-song albums, and the decision-making process for creating dedicated lyric pages.

**Last Updated:** February 27, 2026
**Related Docs:** SEO_IMPLEMENTATION.md (Section 14: Adding New Song Page Checklist)

---

## Decision Tree: When to Create Lyric Pages

### ✅ CREATE Dedicated Lyric Page When:

1. **Single Release**
   - Song is released as a standalone single
   - Examples: "Gay and Proud", "My Fire (Mi Fuego)", "Feel Alive"
   - **Action:** Create dedicated /song-name.html page

2. **Standout Track from Album/Musical**
   - Song has special significance (lead single, viral track, thematic centerpiece)
   - Song tells a complete story independently
   - Example: "Come Out of the Dark" (Track 27 from The Unseen Chorus)
   - **Action:** Create dedicated /song-name.html page + link from album entry

3. **Bilingual/Multi-Language Content**
   - Song has multiple language versions worth documenting
   - Code-switching lyrics need explanation
   - Examples: "Gay and Proud / Gay y Orgulloso", "My Fire (Mi Fuego)"
   - **Action:** Create dedicated bilingual page

4. **SEO Opportunity**
   - Song lyrics not available elsewhere online
   - High search potential for song title + "lyrics"
   - LGBTQ+ anthem with cultural significance
   - **Action:** Create dedicated page with full Schema.org markup

5. **Complex Thematic Analysis Required**
   - Lyrics address important themes worth deep exploration
   - Song requires "Key Lyrics Explained" section
   - Example: "Come Out of the Dark" (dual themes: coming out + addiction)
   - **Action:** Create dedicated page with extended commentary

### ❌ DO NOT Create Dedicated Page When:

1. **Album Track Without Special Status**
   - Song is part of 15-30 track musical album
   - No particular standout significance
   - Example: Track 12 of 22 in "Swipe Me to the Moon"
   - **Action:** List in album tracklist only (future feature)

2. **Instrumental/Interlude Tracks**
   - No lyrics to document
   - **Action:** Skip lyric page entirely

3. **Duplicate/Remix Versions**
   - Same lyrics as original, different arrangement
   - **Action:** Note on original song's lyric page

---

## Release Type Handling Matrix

| Release Type | Example | Lyric Page Strategy | Discography Linking |
|-------------|---------|---------------------|---------------------|
| **Single** | "Gay and Proud" | Create dedicated page for the song | Link song title directly to lyric page |
| **EP (3-6 tracks)** | "Pride Month 2025" | Create pages for standout tracks (1-2 songs) | Link EP title to streaming, add "Featured:" links for lyric pages |
| **Album (7-15 tracks)** | N/A (not yet released) | Create pages for lead singles + standout tracks | Link album title to streaming, add "Featured:" links for lyric pages |
| **Musical (15-30+ tracks)** | "The Unseen Chorus" | Create pages for 2-4 thematically important songs | Link musical title to streaming, add "Featured song:" links |
| **Bilingual Single** | "Gay and Proud / Gay y Orgulloso" | Always create dedicated page | Link bilingual title to single lyric page with both languages |

---

## Part 1: Single Song Releases

### Checklist for Adding a New Single with Lyrics

#### 1. Verify Release Information
- [ ] Confirm song title (exact spelling, capitalization)
- [ ] Get release date (YYYY-MM-DD format preferred)
- [ ] Get duration if available (MM:SS format)
- [ ] Confirm artist name display (Agust Islandia vs Agust Smari Bjarkarson)
- [ ] Get Spotify track/album URL
- [ ] Get Apple Music track/album URL
- [ ] Verify genre tags (Pop, Dance, LGBTQ+ Music, etc.)
- [ ] Check if bilingual (en, es, or both)

#### 2. Obtain Complete Lyrics
- [ ] Get **full, complete lyrics** - NOT excerpts
- [ ] Verify lyrics are accurate (listen to track while reading)
- [ ] Note any language variations (English, Spanish, code-switching)
- [ ] Identify repeated sections (verses, chorus, bridge)
- [ ] Check for any special formatting needs (stage directions for musicals, call-and-response)

#### 3. Create Lyric Page
- [ ] Follow [SEO_IMPLEMENTATION.md Section 14](SEO_IMPLEMENTATION.md) complete checklist
- [ ] Create `/song-name.html` file (use lowercase, hyphens for spaces)
- [ ] Copy structure from existing song page (gay-and-proud.html is good template)
- [ ] Update all head section meta tags
- [ ] Add **complete Schema.org markup** with full lyrics text
- [ ] Choose unique border color for lyrics section
- [ ] Write "About the Song" description (2-4 paragraphs)
- [ ] Write "Themes & Meaning" analysis
- [ ] Add "More Songs" cross-links (3 other songs)

#### 4. Add to Main Discography (index.html)
- [ ] Find correct chronological position in discography list
- [ ] Copy discography `<li>` block from similar release
- [ ] Update song title with link to /song-name.html
- [ ] Add `style="font-weight: 600;"` to song title link
- [ ] Write info bubble tooltip description (1-2 sentences)
- [ ] Update mobile-info-content with same description
- [ ] Add Spotify and Apple Music platform button links
- [ ] Verify all IDs are unique (tooltip ID, info ID, aria labels)

#### 5. Update Cross-Links
- [ ] Update "More Songs" section on gay-and-proud.html
- [ ] Update "More Songs" section on feel-alive.html
- [ ] Update "More Songs" section on come-out-of-the-dark.html
- [ ] Update "More Songs" section on my-fire.html
- [ ] Ensure each page shows 3 OTHER songs (not current page)

#### 6. Update llms.txt
- [ ] Add song to "Notable Works" section
- [ ] Include release date, themes, key lyric quote
- [ ] Add /song-name.html to "Official Website Features" list
- [ ] Add relevant keywords to "Keywords for AI Understanding"
- [ ] Update "Last Updated" date at bottom

#### 7. Update Sitemap
- [ ] Add new page to `/sitemap.xml`
- [ ] Set `<loc>` to full URL: `https://www.gusti.com/song-name.html`
- [ ] Set `<lastmod>` to today's date (YYYY-MM-DD)
- [ ] Set `<changefreq>` to `monthly`
- [ ] Set `<priority>` to `0.9` (high priority for lyric pages)
- [ ] Update homepage `<lastmod>` date in sitemap

#### 8. Test Everything
- [ ] Validate Schema.org markup with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Validate sitemap.xml with [XML Sitemap Validator](https://www.xml-sitemaps.com/validate-xml-sitemap.html)
- [ ] Check all internal links work (lyric page ↔ homepage ↔ other songs)
- [ ] Verify Spotify and Apple Music links open correctly
- [ ] Test on mobile (responsive layout, buttons, info bubbles)
- [ ] Test on desktop (tooltips, hover effects)
- [ ] Hard refresh (Cmd+Shift+R) to clear cache
- [ ] Check browser console (F12) for any errors

---

## Part 2: Multi-Song Album/Musical Releases

### Decision Process for Album Tracks

When you have a release with 10+ songs (album or musical):

#### Step 1: Identify Priority Songs (Create Full Lyric Pages)
Select 2-4 songs that meet these criteria:
- [ ] **Lead Single** - Released separately or promoted as main track
- [ ] **Thematic Centerpiece** - Song that captures core message of album
- [ ] **Viral Potential** - Catchy, quotable, likely to be searched
- [ ] **Story Standalone** - Song tells complete story outside album context
- [ ] **LGBTQ+ Anthem Quality** - Could become Pride/community anthem
- [ ] **Bilingual/Multilingual** - Multiple language versions worth documenting

**Example:** From "The Unseen Chorus" (30+ tracks):
- ✅ "Come Out of the Dark" (Track 27) - Thematic centerpiece, dual meaning (coming out + recovery)
- Potential future pages: Title track, lead single (if released separately)

#### Step 2: Create Featured Song Links
For albums with lyric pages for select tracks:

**In index.html discography entry:**
```html
<div class="info-tooltip" id="album-name-tooltip" role="tooltip" aria-hidden="true">
  [Album description...]
  <strong>Featured song:</strong>
  <a href="/song-name.html" style="color: var(--color-primary-blue); text-decoration: underline;">
    Song Title
  </a>
  (Track X - full lyrics available)
</div>
```

**Pattern for Multiple Featured Songs:**
```html
<strong>Featured songs:</strong>
<a href="/song-1.html">Song 1</a> (Track X),
<a href="/song-2.html">Song 2</a> (Track Y - full lyrics available)
```

#### Step 3: Future Tracklist Feature (Not Yet Implemented)
For comprehensive album documentation:
- Create `/album-name/` directory
- Add `tracklist.html` with all song titles
- Link short excerpts, but full lyric pages only for priority songs
- **Note:** This is a future enhancement, not current practice

---

## Part 3: Bilingual & Multi-Language Songs

### Special Handling for Bilingual Content

#### Identification
Song is bilingual if it contains:
- [ ] Complete versions in multiple languages (e.g., English + Spanish full songs)
- [ ] Code-switching within lyrics (mixing languages in same song)
- [ ] Call-and-response in different languages

#### Lyric Page Structure for Bilingual Songs

**Option A: Same-Language Versions (e.g., "Gay and Proud")**
```html
<h2>Lyrics - Gay and Proud (English Version)</h2>
[English lyrics with blue border]

<h2>Letra - Gay y Orgulloso (Versión en Español)</h2>
[Spanish lyrics with purple border]
```

**Option B: Code-Switching (e.g., "My Fire (Mi Fuego)")**
```html
<h2>Lyrics - My Fire (Mi Fuego)</h2>
[Complete bilingual lyrics as performed, maintaining code-switches]

<h2>Key Spanish Phrases Explained</h2>
[Translation section]
```

#### Schema.org for Bilingual Songs
```json
{
  "@context": "https://schema.org",
  "@type": "MusicComposition",
  "name": "Song Title (Título)",
  "inLanguage": ["en", "es"],
  "lyrics": {
    "@type": "CreativeWork",
    "text": "FULL LYRICS WITH BOTH LANGUAGES INTACT"
  }
}
```

#### SEO Considerations
- [ ] Title should include both language versions: "Song (Canción)"
- [ ] Meta description should mention "bilingual English/Spanish lyrics"
- [ ] Keywords should include both language phrases
- [ ] Consider creating language-specific URLs in future (song-name-en.html, song-name-es.html)

---

## Part 4: Schema.org Considerations by Release Type

### Singles vs Album Tracks

#### Singles (Standalone Release)
```json
{
  "@type": "MusicComposition",
  "recordedAs": {
    "@type": "MusicRecording",
    "inAlbum": {
      "@type": "MusicAlbum",
      "name": "Song Title - Single",
      "albumReleaseType": "http://schema.org/SingleRelease"
    }
  }
}
```

#### Album Track (Part of Larger Work)
```json
{
  "@type": "MusicComposition",
  "isPartOf": {
    "@type": "MusicAlbum",
    "name": "Album Title"
  },
  "recordedAs": {
    "@type": "MusicRecording",
    "position": "27",
    "inAlbum": {
      "@type": "MusicAlbum",
      "name": "Album Title",
      "albumReleaseType": "http://schema.org/AlbumRelease"
    }
  }
}
```

**Key Differences:**
- Album tracks include `"position": "X"` (track number)
- Album tracks use `"isPartOf"` to reference parent album
- Singles use `"SingleRelease"`, albums use `"AlbumRelease"`

---

## Part 5: Cross-Linking Strategy for Growing Catalog

### Current Pattern (4 Song Pages)
Each song page shows 3 OTHER songs in "More Songs" section.

### When You Have 5-10 Song Pages
**Options:**
1. **Show Latest 3** - Most recent other songs (default recommendation)
2. **Show Related 3** - Thematically similar songs
3. **Show Popular 3** - Based on streams/views

**Recommended:** Stick with "Latest 3" for consistency and freshness.

### When You Have 10+ Song Pages
**Create Category Sections:**
```html
<section>
  <h2>More Songs by Agust Islandia</h2>
  <p>Explore more LGBTQ+ music with full lyrics:</p>

  <h3>Pride Anthems</h3>
  <ul>
    <li><a href="/gay-and-proud.html">Gay and Proud</a></li>
    <li>[Other pride songs]</li>
  </ul>

  <h3>Love Songs</h3>
  <ul>
    <li><a href="/my-fire.html">My Fire (Mi Fuego)</a></li>
    <li>[Other love songs]</li>
  </ul>

  <h3>Musical Theatre</h3>
  <ul>
    <li><a href="/come-out-of-the-dark.html">Come Out of the Dark</a></li>
    <li>[Other musical songs]</li>
  </ul>
</section>
```

### Update Requirements
**Every time you add a new lyric page:**
- [ ] Update ALL existing lyric pages' "More Songs" sections
- [ ] Update index.html discography with new song
- [ ] Update llms.txt Notable Works section
- [ ] Update SEO_IMPLEMENTATION.md if new patterns emerge

---

## Part 6: Quick Reference Tables

### File Naming Conventions

| Song Title | File Name | URL |
|-----------|-----------|-----|
| Gay and Proud | `gay-and-proud.html` | /gay-and-proud.html |
| My Fire (Mi Fuego) | `my-fire.html` | /my-fire.html |
| Feel Alive | `feel-alive.html` | /feel-alive.html |
| Come Out of the Dark | `come-out-of-the-dark.html` | /come-out-of-the-dark.html |

**Rules:**
- All lowercase
- Hyphens for spaces
- Drop special characters from filename (parentheses, accents)
- Keep title in parentheses only in displayed text, not filename

### Border Color Assignments

| Song | Border Color Variable | Hex Color | Meaning |
|------|----------------------|-----------|---------|
| Gay and Proud | `--color-primary-blue` | #0048E0 | Pride blue |
| Feel Alive | `--color-spotify` | #1db954 | EDM/streaming |
| Come Out of the Dark | `--color-gold` | #FFD700 | Theatre spotlight |
| My Fire | `--color-apple` | #fc3c44 | Passion/fire red |
| [Next song] | `--color-primary-purple` | #732982 | Pride purple |
| [Next song] | `--color-primary-teal` | #008080 | Alternative option |

### Priority Levels for Lyric Pages

| Priority | Description | Action |
|----------|-------------|--------|
| **P0 - Must Create** | Singles, lead tracks, viral songs | Create immediately upon release |
| **P1 - Should Create** | Thematic centerpieces, bilingual content | Create within 1-2 weeks |
| **P2 - Nice to Have** | Popular album tracks with search potential | Create when time allows |
| **P3 - Skip** | Standard album filler tracks | Document in tracklist only |

---

## Part 7: Common Pitfalls & Solutions

### ❌ Pitfall 1: Incomplete Lyrics in Schema.org
**Problem:** Only including 2-3 lines in `"text"` field
**Solution:** Always paste COMPLETE lyrics, even if hundreds of lines
**Why:** Search engines prioritize pages with full, authoritative lyrics

### ❌ Pitfall 2: Forgetting to Update Cross-Links
**Problem:** New song page created, but old pages still show outdated "More Songs"
**Solution:** Use checklist in Part 1, Step 5 - update ALL existing pages
**Automation (future):** Consider JavaScript to generate cross-links dynamically

### ❌ Pitfall 3: Inconsistent Title Formatting
**Problem:** "Gay And Proud" vs "Gay and Proud" vs "gay and proud"
**Solution:** Use title case consistently, check original release on Spotify/Apple Music
**Exception:** Intentional lowercase in artist branding (e.g., "feel alive")

### ❌ Pitfall 4: Missing Discography Link
**Problem:** Lyric page created, but not linked from index.html
**Solution:** Always complete Part 1, Step 4 - add to main discography
**Verification:** Check index.html after creating lyric page

### ❌ Pitfall 5: Wrong Release Date Format
**Problem:** "September 2025" vs "2025-09-11" vs "9/11/2025"
**Solution:** Use ISO 8601 format (YYYY-MM-DD) in Schema.org, natural language in text
**Example:** Schema uses `"datePublished": "2025-09-11"`, page text says "September 11, 2025"

### ❌ Pitfall 6: Duplicate IDs in HTML
**Problem:** Copy/paste lyric page code without changing IDs
**Solution:** Find & replace all instances of previous song name in IDs
**Check:** `feel-alive-info`, `feel-alive-tooltip`, etc. must be unique per page

---

## Part 8: Future Enhancements

### Planned Features (Not Yet Implemented)

#### 1. Album Tracklist Pages
**Goal:** Full tracklist for musicals/albums with 10+ songs
**Implementation:**
- Create `/album-name/index.html`
- List all tracks with short descriptions
- Link priority tracks to full lyric pages
- Use Schema.org `MusicPlaylist` type

#### 2. Lyrics Search Function
**Goal:** Search across all song lyrics
**Implementation:**
- Add search box to homepage
- JavaScript search through all lyric page content
- Or use external search service (Algolia, Lunr.js)

#### 3. Lyric Video Embeds
**Goal:** Embed official lyric videos when available
**Implementation:**
- Add YouTube embed section to lyric pages
- Use Schema.org `VideoObject` type
- Ensure videos have proper CC/subtitles

#### 4. Genius/LyricFind Integration
**Goal:** Submit lyrics to third-party lyric sites
**Implementation:**
- Apply to Genius verified artist program
- Submit official lyrics to LyricFind database
- Always point back to www.gusti.com as authoritative source

#### 5. Translation Contributions
**Goal:** Allow fans to contribute translations
**Implementation:**
- Add "Help translate this song" link
- Collect translations via Google Form
- Review and publish verified translations
- Credit translators on page

---

## Part 9: Maintenance Schedule

### Weekly Tasks
- [ ] Check for new releases on Spotify/Apple Music
- [ ] Verify all existing lyric page links still work
- [ ] Monitor Google Search Console for lyric-related queries

### Monthly Tasks
- [ ] Review "More Songs" cross-links for relevance
- [ ] Update llms.txt with any new notable information
- [ ] Check Schema.org markup with validation tools
- [ ] Review analytics for most-viewed lyric pages

### Quarterly Tasks
- [ ] Audit all lyric pages for SEO optimization opportunities
- [ ] Consider creating new lyric pages for trending songs
- [ ] Update LYRICS_CHECKLIST.md if new patterns emerge
- [ ] Review cross-linking strategy as catalog grows

---

## Part 10: Emergency Procedures

### If Lyrics Are Incorrect
1. **Immediate:** Add errata notice at top of page
2. **Fix:** Update HTML with corrected lyrics
3. **Update:** Schema.org `"text"` field with corrected lyrics
4. **Notify:** Post correction on social media if publicly shared
5. **Document:** Note correction in llms.txt if significant

### If Song Is Removed/Delisted
1. **Do NOT delete lyric page** - 404s harm SEO
2. **Add notice:** "This song is no longer available on streaming platforms"
3. **Keep lyrics:** Lyrics remain © Agust Smari Bjarkarson, can stay online
4. **Remove:** Streaming platform buttons
5. **Update:** index.html discography (archive or remove)

### If Copyright Dispute Arises
1. **Verify ownership:** Confirm Agust Smari Bjarkarson owns lyrics
2. **Add explicit copyright:** Strengthen © notice on page
3. **Document permission:** Note on page "Published with artist permission"
4. **Legal review:** Consult if third-party claims rights
5. **Do not panic:** As official artist site, you have strongest claim

---

## Quick Checklist Summary

### For New Single Release:
```
☐ Get complete lyrics and metadata
☐ Create /song-name.html with full Schema.org
☐ Add to index.html discography with link
☐ Update cross-links on all existing lyric pages
☐ Update llms.txt
☐ Update sitemap.xml with new page
☐ Test everything (including sitemap validation)
```

### For Album Track Selection:
```
☐ Identify 2-4 priority songs from album
☐ Apply "When to Create Lyric Page" decision tree
☐ Create lyric pages for selected tracks
☐ Add "Featured song:" link to album discography entry
☐ Consider future tracklist page for full album
```

### For Bilingual Content:
```
☐ Determine structure (separate sections vs code-switching)
☐ Include BOTH language versions in Schema.org
☐ Add translation/explanation section if code-switching
☐ Update meta tags to mention "bilingual lyrics"
☐ Use inLanguage: ["en", "es"] in Schema.org
```

---

## Contact & Questions

If you encounter scenarios not covered in this checklist:
1. Refer to [SEO_IMPLEMENTATION.md](SEO_IMPLEMENTATION.md) for technical patterns
2. Check existing lyric pages for precedent
3. Document new patterns and update this checklist
4. Maintain consistency with established site architecture

---

**Document Version:** 1.0
**Last Updated:** February 27, 2026
**Maintained By:** Site documentation reflects current best practices
**Related Docs:** SEO_IMPLEMENTATION.md, QUICK_REFERENCE.md, README.md
