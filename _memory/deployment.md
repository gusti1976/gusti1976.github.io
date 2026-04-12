# Deployment & Workflow

## Stack

Pure static files. No build step. No CI/CD pipeline.
GitHub Pages serves files directly from `main` branch.
Custom domain: `www.gusti.com` → configured via `CNAME` file at repo root.
**Deploy = `git push origin main`** — GitHub Pages auto-builds in ~30 seconds to 2 minutes.

## Pre-Commit Checklist

- [ ] **Update `_memory/` files** to reflect any changes made (see CLAUDE.md Memory Maintenance table)
- [ ] **Update `_notes.md`** — mark completed tasks done, add new pending ones
- [ ] Hard refresh browser (Ctrl+Shift+R) and check for visual regressions
- [ ] Open F12 console — 0 JS errors, 0 404s
- [ ] Run `python3 html_validator.py` — must exit with 0 content errors
- [ ] Test navigation hamburger menu on mobile viewport
- [ ] (Optional) Google Rich Results Test for Schema.org on changed pages

## Deployment Workflow

```
1. Edit files
2. python3 html_validator.py      # fix any errors
3. git add [specific files]       # never 'git add .' to avoid accidental commits
4. git commit -m "brief message"
5. git push origin main
6. Wait ~1 minute
7. Verify at www.gusti.com
```

## HTML Validator

**Run:** `python3 html_validator.py` (from repo root)

What it checks:
- HTML structure (required tags, charset, viewport, title)
- Schema.org JSON-LD (type, required fields, format)
- Internal links (no 404s)
- Accessibility basics (alt text, ARIA, skip links)
- Duplicate IDs within pages
- Duration format (ISO 8601 for Schema.org)

**Output:** Console summary + `validation_report.txt` + `schema_validation_detailed.txt`

**Exit 0** = all checks pass  
**Exit 1** = errors found (content errors block deploy; warnings are acceptable)

**Expected clean baseline:** 82 HTML files, 0 content errors  
**Files that intentionally differ:**
- `google46e00271f9de7d83.html` — Google verification file, minimal HTML
- `navigation-template.html` — utility template, incomplete `<head>`

## Sitemap Maintenance

After adding a new page, add to `sitemap.xml`:

```xml
<url>
  <loc>https://www.gusti.com/new-page.html</loc>
  <lastmod>YYYY-MM-DD</lastmod>
  <changefreq>monthly</changefreq>
  <priority>0.9</priority>
</url>
```

Priority guide: `1.0` core pages, `0.9` song/lyric pages, `0.8` album pages, `0.7` utility pages.

## robots.txt & SEO Files

- `robots.txt` — controls crawler access
- `sitemap.xml` — submit to Google Search Console after major updates
- `llms.txt` — AI crawler data; update when adding songs (see seo.md)

## Branch Strategy

- `main` — production; every push deploys live
- Feature work on `claude/` prefixed branches; merge to main when ready
- No staging environment — use `test.html` at root for local scratch (noindex)
