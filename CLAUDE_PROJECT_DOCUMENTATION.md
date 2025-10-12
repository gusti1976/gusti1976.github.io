# Claude Code Assistant - Complete Project Documentation

## Overview
This documentation covers two main projects managed by Claude Code Assistant:
1. **Personal Website** (gusti.com) - Static website with GDPR compliance
2. **BeatLeaps** - TikTok-style video effects system with audio-driven animations

---

## Project 1: Personal Website (gusti.com)

### Project Location
- **Main Directory**: `/Users/gusti/Websites/gusti1976.github.io/`
- **Website URL**: https://www.gusti.com
- **GitHub Repository**: https://github.com/gusti1976/gusti1976.github.io (public)

### GitHub Authentication
- **GitHub Token**: Stored in `.env` file (not committed to repository)
- **Token Location**: `.env` file in project root
- **Deployment Script**: `push_to_github.sh`
- **Deployment Command**: `./push_to_github.sh`

### Recent Major Issues Resolved

#### 1. Website Redirect Loop (Fixed)
- **Problem**: Site was "flashing and not usable" due to conflicting redirect mechanisms
- **Root Cause**: Both JavaScript redirect and meta refresh redirect trying to redirect /index.html to /
- **Solution**: Removed meta refresh redirect, simplified JavaScript redirect logic
- **Files Modified**: `index.html`

#### 2. GDPR Cookie Consent Implementation
- **Problem**: Needed GDPR compliance without third-party dependencies
- **Solution**: Implemented custom floating cookie consent banner
- **Features**:
  - Accept/Reject cookies functionality
  - Detailed cookie policy modal
  - localStorage-based preference storage
  - Conditional Google Analytics loading
- **Files Modified**: `index.html`

#### 3. Google Consent Mode v2 Integration (Latest)
- **Problem**: Google Analytics showing "Analytics cookie consent signals inactive" warning
- **Solution**: Implemented Google Consent Mode v2 signals while maintaining custom banner
- **Technical Implementation**:
  ```javascript
  // Default consent state (denied for GDPR compliance)
  gtag('consent', 'default', {
    'analytics_storage': 'denied',
    'ad_storage': 'denied',
    'functionality_storage': 'denied',
    'personalization_storage': 'denied',
    'security_storage': 'granted',
    'wait_for_update': 500
  });

  // Consent update on user action
  gtag('consent', 'update', {
    'analytics_storage': 'granted',
    'functionality_storage': 'granted'
  });
  ```

### Key Files
- `index.html` - Main website file with GDPR consent system and Google Analytics
- `sitemap.xml` - SEO sitemap
- `push_to_github.sh` - Automated deployment script
- `.env` - GitHub authentication token
- `CLAUDE_PROJECT_DOCUMENTATION.md` - This documentation file

### Google Analytics Setup
- **Google Analytics ID**: Properly configured in index.html
- **Consent Mode**: v2 implementation with proper consent signals
- **GDPR Compliance**: Default consent denied, updates on user acceptance

### Deployment Process
1. Make changes to files
2. Run `./push_to_github.sh`
3. Changes automatically pushed to GitHub
4. Website updates at www.gusti.com within 1-10 minutes (GitHub Pages)

---

## Project 2: BeatLeaps - TikTok Video Effects System

### Project Location
- **Main Directory**: `/Users/gusti/Websites/BeatLeaps/backend/`
- **GitHub Repository**: https://github.com/gusti1976/BeatLeaps-backend (private)
- **Documentation**: `CLAUDE.md` in project directory

### System Architecture

#### Core Components
1. **Audio Analysis** (`audio_analysis.py`)
   - Beat detection using librosa
   - Bass event detection (20-250Hz frequency analysis)
   - RMS intensity analysis for effect scaling
   - STFT-based spectral analysis with Gaussian smoothing

2. **Effects Engine** (`opencv_effects_engine.py`)
   - OpenCV-based video processing
   - Smooth zoom algorithms with exponential smoothing (0.85 factor)
   - Ken Burns motion effects
   - Color effects (HSV, RGB, black flash)

3. **Preset System** (`effect_presets.py`)
   - Bass-driven zoom capabilities
   - Multiple preset configurations (A, Clean, Basic)
   - Automatic mode selection based on audio analysis

4. **Video Generation** (`preset_video_generator.py`)
   - High-level video generation interface
   - Resolution management (1080p, 4K support)
   - Duration and aspect ratio handling

#### Key Technical Achievements

##### Bass-Driven Zoom System
- **Bass Event Detection**: Analyzes 20-250Hz frequencies using STFT
- **Natural Timing**: Zoom duration matches bass event duration + 50ms
- **Intensity Matching**: Zoom scales 50%-200% based on bass intensity
- **Smart Selection**: Automatically chooses bass events when available
- **Fallback**: Uses RMS intensity when bass events unavailable

##### Audio Analysis Capabilities
- **Beat Detection**: 319 beats detected from sample audio
- **Bass Events**: 233 bass events detected (more selective)
- **Spectral Analysis**: Bass frequency isolation and energy calculation
- **Peak Detection**: Prominence-based filtering

##### Effects Processing
- **Smooth Zoom**: Single affine transform with jitter elimination
- **Ken Burns**: Professional gradual zoom with aspect ratio preservation
- **Color Effects**: HSV hue shifts, RGB cycling, dramatic effects
- **Timeline Management**: Event-based system with precise timing

#### Preset Configurations

##### Preset A (preset_a)
- Full effects: scale, flash, hue, RGB
- Black flash emphasis for dramatic impact
- Bass-driven zoom when bass events available

##### Preset Clean (preset_clean)
- Ken Burns + bass-driven zoom only
- Cleaner, more professional results
- Reduced visual noise

##### Basic Mode
- Fixed effects without intensity variation
- Fallback when audio analysis unavailable

#### Recent Development Sessions

##### Session 1: Beat Intensity Enhancement
- Enhanced zoom effects with RMS audio intensity scaling
- Implemented smooth zoom algorithms
- Fixed intensity calculation (50%-150% scaling)

##### Session 2: Bass-Driven Implementation (Current)
- Added `detect_bass_events()` method
- Created bass-driven timeline system
- Natural timing with bass event duration matching
- Intensity scaling based on actual bass frequency analysis

#### Usage Examples

```python
# Generate video with bass-driven zoom
from preset_video_generator import generate_video_with_preset

generate_video_with_preset(
    preset_name='preset_clean',  # Uses bass-driven zoom
    image_path='/path/to/image.png',
    audio_path='/path/to/audio.wav',
    output_path='/path/to/output.mp4',
    duration=30.0,  # or None for full length
    resolution='1080p'
)
```

#### Auto-Commit System
- **Script**: `auto_commit.sh`
- **Command**: `./auto_commit.sh`
- **Authentication**: GitHub CLI token-based
- **Repository**: Private GitHub backup

#### Test Results
- **Sample Audio**: Feel Alive (175.1 seconds)
- **Beat Detection**: 319 beats detected
- **Bass Events**: 233 bass events (more selective)
- **Video Output**: 1174x1762 resolution, aspect ratio preserved
- **Processing**: Successful FFmpeg encoding with audio sync

---

## Development Environment

### System Information
- **Platform**: macOS (Darwin 24.6.0)
- **Working Directory**: Multiple project locations
- **Temporary Directory**: `/tmp/claude/` for sandbox operations

### Key Dependencies
- **Python 3**: Main development language
- **OpenCV**: Video processing and effects
- **librosa**: Audio analysis and beat detection
- **FFmpeg**: Video encoding and processing
- **NumPy**: Numerical computations
- **scipy**: Signal processing for audio analysis

### Git Configuration
- Both projects use GitHub for version control
- Automated deployment/backup scripts
- Token-based authentication for security

---

## Important Notes for Claude Code Assistant

### Security Considerations
- GitHub tokens stored in `.env` files
- Never commit sensitive information
- Use sandbox mode for temporary operations
- Respect file permissions and access controls

### Development Workflow
1. **Website Changes**: Edit → Test → Deploy via `push_to_github.sh`
2. **BeatLeaps Changes**: Develop → Test → Backup via `auto_commit.sh`
3. **Documentation**: Update this file when making significant changes

### Common Commands
```bash
# Website deployment
cd /Users/gusti/Websites/gusti1976.github.io/
./push_to_github.sh

# BeatLeaps backup
cd /Users/gusti/Websites/BeatLeaps/backend/
./auto_commit.sh

# Video generation (BeatLeaps)
python3 preset_video_generator.py
```

### File Locations to Remember
- **Website**: `/Users/gusti/Websites/gusti1976.github.io/`
- **BeatLeaps**: `/Users/gusti/Websites/BeatLeaps/backend/`
- **Media Files**: `/Users/gusti/Downloads/`
- **Temp Directory**: `/tmp/claude/`

### Recent Accomplishments
- ✅ Fixed website redirect loop and flashing issue
- ✅ Implemented GDPR-compliant cookie consent system
- ✅ Integrated Google Consent Mode v2 for Analytics compliance
- ✅ Improved schema.org structured data with proper entity relationships
- ✅ Added complete MusicAlbum schema for all 11 discography releases
- ✅ Developed bass-driven zoom system for BeatLeaps
- ✅ Created smooth video effects with natural timing
- ✅ Established automated deployment workflows

---

## Adding New Releases to Discography

### CRITICAL: Two Locations Must Be Updated

When adding a new release, you **MUST update BOTH locations** to keep the discography and structured data in sync:

#### Location 1: HTML Discography List (Body Section)
**File:** `index.html`
**Section:** `<section><h2>Selected Discography</h2><ul class="discography">`
**Line Range:** Approximately lines 281-529

**Add new release at the TOP of the `<ul>` list:**

```html
<li>
  <span class="release">
    [Release Name], [Single/EP/Album], [Year]
    <!-- Only add info bubble if there's a description -->
    <button class="info-bubble" type="button" aria-describedby="tooltip-[unique-id]" aria-expanded="false" aria-label="More information about [Release Name] release">
      <span aria-hidden="true">i</span>
    </button>
    <div class="info-tooltip" role="tooltip" id="tooltip-[unique-id]" aria-hidden="true">
      [Description text here]
    </div>
  </span>
  <span class="platforms">
    <a class="btn-icon apple" href="[Apple Music URL]" target="_blank" rel="noopener" title="Listen on Apple Music">
      <svg class="icon-svg" fill="white">
        <use href="#apple-icon"/>
      </svg>
    </a>
    <a class="btn-icon spotify" href="[Spotify URL]" target="_blank" rel="noopener noreferrer" title="Listen on Spotify">
      <svg class="icon-svg" fill="white">
        <use href="#spotify-icon"/>
      </svg>
    </a>
  </span>
</li>
```

**Important HTML Notes:**
- If no description exists, SKIP the entire `<button class="info-bubble">` and `<div class="info-tooltip">` elements
- Each release needs a unique `id="tooltip-[something]"` that matches `aria-describedby="tooltip-[something]"`
- Always add new releases at the **TOP** of the list (most recent first)

#### Location 2: Schema.org Structured Data (Head Section)
**File:** `index.html`
**Section:** `<script type="application/ld+json">` in `<head>`
**Line Range:** Approximately lines 52-353

**Add new MusicAlbum to the `@graph` array (after Organization, before existing albums):**

```json
{
  "@type": "MusicAlbum",
  "@id": "https://www.gusti.com/#[single/ep/album]-[url-safe-name]",
  "name": "[Release Name]",
  "albumReleaseType": "http://schema.org/[SingleRelease/EPRelease/AlbumRelease]",
  "datePublished": "[YYYY or YYYY-MM]",
  "byArtist": {
    "@id": "https://www.gusti.com/#agust-islandia"
  },
  "genre": ["Genre1", "Genre2"],
  "description": "[Description text - OPTIONAL, skip if no info bubble]",
  "url": [
    "[Apple Music URL]",
    "[Spotify URL]"
  ]
},
```

**Important Schema Notes:**
- Use correct `albumReleaseType`:
  - **Single:** `"http://schema.org/SingleRelease"`
  - **EP:** `"http://schema.org/EPRelease"`
  - **Album:** `"http://schema.org/AlbumRelease"`
- For EPs and Albums, add: `"albumProductionType": "http://schema.org/StudioAlbum"`
- If no description exists, **omit the entire "description" property** (don't include empty string)
- Always reference artist with: `"@id": "https://www.gusti.com/#agust-islandia"`
- Use unique `@id` format: `#single-feel-alive`, `#ep-cowboys`, `#album-swipe-me-to-the-moon`

### Example: Adding a New Single

**Scenario:** New single "Summer Nights" released in June 2025, with description.

**1. Add to HTML Discography (at top of `<ul>`):**
```html
<li>
  <span class="release">
    Summer Nights, Single, 2025
    <button class="info-bubble" type="button" aria-describedby="tooltip-summer-nights" aria-expanded="false" aria-label="More information about Summer Nights release">
      <span aria-hidden="true">i</span>
    </button>
    <div class="info-tooltip" role="tooltip" id="tooltip-summer-nights" aria-hidden="true">
      A tropical house anthem celebrating warm nights and summer romance.
    </div>
  </span>
  <span class="platforms">
    <a class="btn-icon apple" href="https://music.apple.com/album/summer-nights-single/1234567890" target="_blank" rel="noopener" title="Listen on Apple Music">
      <svg class="icon-svg" fill="white">
        <use href="#apple-icon"/>
      </svg>
    </a>
    <a class="btn-icon spotify" href="https://open.spotify.com/album/ABC123XYZ" target="_blank" rel="noopener noreferrer" title="Listen on Spotify">
      <svg class="icon-svg" fill="white">
        <use href="#spotify-icon"/>
      </svg>
    </a>
  </span>
</li>
```

**2. Add to Schema @graph (in `<head>`, after Organization entity):**
```json
{
  "@type": "MusicAlbum",
  "@id": "https://www.gusti.com/#single-summer-nights",
  "name": "Summer Nights",
  "albumReleaseType": "http://schema.org/SingleRelease",
  "datePublished": "2025-06",
  "byArtist": {
    "@id": "https://www.gusti.com/#agust-islandia"
  },
  "genre": ["Pop", "Tropical House"],
  "description": "A tropical house anthem celebrating warm nights and summer romance.",
  "url": [
    "https://music.apple.com/album/summer-nights-single/1234567890",
    "https://open.spotify.com/album/ABC123XYZ"
  ]
},
```

### Validation Checklist

After adding a new release, verify:

- [ ] Release name matches exactly in both locations
- [ ] URLs match between HTML and schema
- [ ] Description matches between info bubble and schema (or both omitted)
- [ ] Correct release type: SingleRelease, EPRelease, or AlbumRelease
- [ ] Unique `@id` in schema (no duplicates)
- [ ] Unique `id="tooltip-[name]"` in HTML (no duplicates)
- [ ] Artist reference: `"@id": "https://www.gusti.com/#agust-islandia"`
- [ ] New release is at the **TOP** of both lists
- [ ] JSON syntax is valid (no missing commas or brackets)
- [ ] Update `sitemap.xml` with current date
- [ ] Commit and push changes via `./push_to_github.sh`

### Quick Validation Command

After making changes, ask Claude to:
> "Validate the schema.org structured data and verify it matches the discography"

This will ensure both locations are in sync and error-free.

---

## Future Considerations

### Website Enhancements
- Monitor Google Analytics consent signals effectiveness
- Consider additional SEO optimizations
- Potential mobile responsiveness improvements

### BeatLeaps Development
- Explore additional audio frequencies for effects
- Implement video input processing (not just images)
- Consider real-time preview capabilities
- Expand preset library based on different music genres

---

*Last Updated: October 11, 2025*
*Created by: Claude Code Assistant*