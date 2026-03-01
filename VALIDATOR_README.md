# HTML Validation Script

Comprehensive, token-optimized error checking for all HTML pages.

## Features

- ✅ **HTML Structure Validation** - Validates proper HTML syntax and parsing
- ✅ **Schema.org Validation** - Checks JSON-LD structured data including:
  - MusicComposition schemas (with lyrics, duration, metadata)
  - MusicAlbum schemas
  - Person schemas
  - @graph support for multiple schemas
- ✅ **Internal Link Checking** - Verifies all internal links point to existing files
- ✅ **Accessibility Checks** - Validates:
  - Alt text on images
  - lang attribute on html tag
  - h1 headings
  - Navigation presence
- ✅ **Required Elements** - Checks for:
  - `<title>` tags
  - Charset meta tag
  - Viewport meta tag
  - Proper meta tags
- ✅ **Duplicate ID Detection** - Finds duplicate ID attributes
- ✅ **Track Duration Format** - Validates track lengths are X:XX not X:X (e.g., 3:02 not 3:2)
- ✅ **Token-Optimized Reporting** - Concise error grouping and summaries

## Usage

```bash
python3 html_validator.py
```

## Output

The script provides:

1. **Console Summary** - Token-optimized overview:
   - Total files validated
   - Files with errors/warnings
   - Errors grouped by type
   - Detailed error list (only if errors found)
   - Broken links (only if found)

2. **Detailed Report** - Saved to `validation_report.txt`:
   - Complete error list per file
   - All warnings
   - All broken links

## Example Output

```
🔍 Validating 60 HTML files...
🔗 Checking internal links...

============================================================
📊 VALIDATION SUMMARY
============================================================
Total files: 60
Files with errors: 0
Files with warnings: 0
Total errors: 0
Total warnings: 0
Broken internal links: 0

✅ All pages passed validation!
```

## Validation Rules

### Critical Errors (Must Fix)
- Missing required HTML elements (`<title>`, charset, viewport)
- Invalid Schema.org JSON-LD
- Broken internal links
- Duplicate IDs
- Missing alt text on images
- Invalid duration formats:
  - Schema.org: Must be ISO 8601 format (PT2M39S)
  - Display text: Must be M:SS format (3:02 not 3:2)

### Warnings (Should Fix)
- Missing `<h1>` heading
- Missing navigation
- MusicAlbum without byArtist

## Ignored Files

The validator automatically validates all `.html` files. Some files may show errors but can be ignored:

- `google*.html` - Google verification files (not real pages)
- `navigation-template.html` - Template file (not a full page)

## Schema.org Validation

The validator checks:

### MusicComposition
- Required: `name`
- Optional but validated: `lyrics.text`, `recordedAs.duration`
- Duration format: ISO 8601 (e.g., `PT2M39S` for 2:39)

### MusicAlbum
- Required: `name`
- Recommended: `byArtist`

### Person
- Required: `name`

### @graph Support
Properly handles Schema.org `@graph` arrays with multiple schemas.

## Exit Codes

- `0` - All validations passed
- `1` - Errors found (check output)

## Running Periodically

Add to your workflow to check for errors after updates:

```bash
# Before committing
python3 html_validator.py

# Or add to git pre-commit hook
```

## Token Optimization

The validator is designed to provide maximum information with minimal output:
- Only shows errors/warnings that exist (no "0 errors" spam)
- Groups errors by type for quick scanning
- Detailed per-file errors only when needed
- Saves full report to file for deep investigation
