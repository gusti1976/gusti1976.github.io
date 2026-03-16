#!/usr/bin/env python3
"""
Comprehensive HTML validation script - token-optimized error reporting
Validates all HTML pages for common issues
"""
import os
import json
import re
from pathlib import Path
from html.parser import HTMLParser
from collections import defaultdict

class HTMLValidator(HTMLParser):
    def __init__(self, filepath):
        super().__init__()
        self.filepath = filepath
        self.errors = []
        self.warnings = []
        self.ids = set()
        self.links = []
        self.images = []
        self.schemas = []
        self.meta_tags = {}
        self.has_h1 = False
        self.has_title = False
        self.has_lang = False
        self.has_viewport = False
        self.has_charset = False
        self.navigation_found = False

    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)

        # Check for duplicate IDs
        if 'id' in attrs_dict:
            id_val = attrs_dict['id']
            if id_val in self.ids:
                self.errors.append(f"Duplicate ID: {id_val}")
            self.ids.add(id_val)

        # Check for h1
        if tag == 'h1':
            self.has_h1 = True

        # Check title
        if tag == 'title':
            self.has_title = True

        # Check html lang
        if tag == 'html' and 'lang' in attrs_dict:
            self.has_lang = True

        # Check meta tags
        if tag == 'meta':
            if 'charset' in attrs_dict:
                self.has_charset = True
            if 'name' in attrs_dict:
                if attrs_dict['name'] == 'viewport':
                    self.has_viewport = True
                self.meta_tags[attrs_dict['name']] = attrs_dict.get('content', '')

        # Check images for alt text
        if tag == 'img':
            src = attrs_dict.get('src', '')
            if 'alt' not in attrs_dict:
                self.errors.append(f"Missing alt text: {src}")
            self.images.append(src)

        # Collect links
        if tag == 'a' and 'href' in attrs_dict:
            self.links.append(attrs_dict['href'])

        # Check for navigation
        if tag == 'nav' or (tag == 'div' and attrs_dict.get('class') == 'mobile-nav'):
            self.navigation_found = True

        # Check script for Schema.org
        if tag == 'script' and attrs_dict.get('type') == 'application/ld+json':
            self.current_schema = []

    def handle_data(self, data):
        if hasattr(self, 'current_schema'):
            self.current_schema.append(data)

    def handle_endtag(self, tag):
        if tag == 'script' and hasattr(self, 'current_schema'):
            schema_text = ''.join(self.current_schema)
            try:
                schema_obj = json.loads(schema_text)
                self.schemas.append(schema_obj)
            except json.JSONDecodeError as e:
                self.errors.append(f"Invalid JSON-LD: {str(e)[:50]}")
            delattr(self, 'current_schema')

    def validate(self, content):
        try:
            self.feed(content)
        except Exception as e:
            self.errors.append(f"HTML parse error: {str(e)[:50]}")

        # Check required elements
        if not self.has_title:
            self.errors.append("Missing <title>")
        if not self.has_h1:
            self.warnings.append("Missing <h1>")
        if not self.has_lang:
            self.errors.append("Missing lang attribute on <html>")
        if not self.has_charset:
            self.errors.append("Missing charset meta tag")
        if not self.has_viewport:
            self.errors.append("Missing viewport meta tag")
        if not self.navigation_found:
            self.warnings.append("No navigation found")

        # Validate Schema.org
        self.validate_schemas()

        # Check track duration formatting
        self.validate_duration_format(content)

        # Check for rendered lyric escape artifacts
        self.validate_lyric_rendering(content)

        return self.errors, self.warnings

    def validate_duration_format(self, content):
        """Check for improperly formatted track durations (X:X should be X:XX)"""
        # Find duration patterns in visible text and attributes
        # Patterns: "2:9", "Duration: 3:4", "(1:8)", etc.
        # Match: word boundary or common prefix, then M:S format
        duration_pattern = r'(?:Duration[:\s]*|Track[:\s]*|\()?(\d{1,2}):(\d{1})(?:\)|,|\s|<|$)'

        matches = re.finditer(duration_pattern, content)
        found_errors = set()  # Avoid duplicates

        for match in matches:
            minutes = match.group(1)
            seconds = match.group(2)
            incorrect = f"{minutes}:{seconds}"
            correct = f"{minutes}:{seconds.zfill(2)}"

            # Avoid false positives (like time of day, ratios, etc.)
            # Only flag if it looks like a duration (minutes < 60, seconds < 10)
            if int(minutes) < 60 and int(seconds) < 10:
                error_msg = f"Incorrect duration format: {incorrect} (should be {correct})"
                if error_msg not in found_errors:
                    self.errors.append(error_msg)
                    found_errors.add(error_msg)

    def validate_lyric_rendering(self, content):
        """Check for literal escape sequences accidentally rendered in lyric HTML."""
        if '<div class="lyric-lines">' in content and re.search(r'<br>\\n', content):
            self.errors.append("Rendered lyric artifact: literal \\n appears after <br> in lyric HTML")

    def validate_schemas(self):
        """Validate Schema.org JSON-LD"""
        for schema in self.schemas:
            # Check required @context
            if '@context' not in schema:
                self.errors.append("Schema missing @context")

            # Handle @graph (array of schemas)
            if '@graph' in schema:
                for item in schema['@graph']:
                    self.validate_single_schema(item)
                continue

            # Single schema must have @type
            if '@type' not in schema:
                self.errors.append("Schema missing @type")

            self.validate_single_schema(schema)

    def validate_single_schema(self, schema):
        """Validate a single schema object"""
        # Validate based on type
        schema_type = schema.get('@type', '')

        if schema_type == 'MusicComposition':
            if 'name' not in schema:
                self.errors.append("MusicComposition missing 'name'")
            if 'lyrics' in schema:
                lyrics = schema['lyrics']
                if isinstance(lyrics, dict) and 'text' not in lyrics:
                    self.errors.append("MusicComposition lyrics missing 'text'")
            if 'recordedAs' in schema:
                recorded = schema['recordedAs']
                if isinstance(recorded, dict):
                    if 'duration' in recorded:
                        # Validate ISO 8601 duration format (allow empty as optional)
                        duration = recorded['duration']
                        if duration and not re.match(r'^PT\d+M\d+S$', duration):
                            self.errors.append(f"Invalid duration format: {duration}")

        elif schema_type == 'MusicAlbum':
            if 'name' not in schema:
                self.errors.append("MusicAlbum missing 'name'")
            if 'byArtist' not in schema:
                self.warnings.append("MusicAlbum missing 'byArtist'")

        elif schema_type == 'Person':
            if 'name' not in schema:
                self.errors.append("Person schema missing 'name'")

def validate_internal_links(base_dir, all_files):
    """Check if internal links point to existing files"""
    broken_links = defaultdict(list)

    for filepath in all_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        # Find all href links
        links = re.findall(r'href=["\'](/[^"\']+\.html)["\']', content)

        for link in links:
            # Remove leading slash for path check
            target = link.lstrip('/')
            target_path = base_dir / target

            if not target_path.exists():
                broken_links[filepath.name].append(link)

    return broken_links

def main():
    base_dir = Path("/Users/gusti/gusti1976.github.io")
    excluded_files = {
        "google46e00271f9de7d83.html",  # Google site verification token file
        "navigation-template.html",     # Reusable snippet/template, not a standalone page
    }
    html_files = sorted(
        filepath for filepath in base_dir.glob("*.html")
        if filepath.name not in excluded_files
    )

    print(f"🔍 Validating {len(html_files)} HTML files...\n")

    # Statistics
    total_errors = 0
    total_warnings = 0
    files_with_errors = 0
    files_with_warnings = 0

    # Collect errors by type for summary
    error_summary = defaultdict(int)
    warning_summary = defaultdict(int)

    # Per-file validation
    file_errors = {}
    file_warnings = {}

    for filepath in html_files:
        with open(filepath, 'r', encoding='utf-8') as f:
            content = f.read()

        validator = HTMLValidator(filepath)
        errors, warnings = validator.validate(content)

        if errors:
            file_errors[filepath.name] = errors
            files_with_errors += 1
            total_errors += len(errors)
            for err in errors:
                # Categorize error
                if "Duplicate ID" in err:
                    error_summary["Duplicate IDs"] += 1
                elif "Missing alt" in err:
                    error_summary["Missing alt text"] += 1
                elif "Schema" in err or "JSON-LD" in err:
                    error_summary["Schema.org errors"] += 1
                elif "Incorrect duration format" in err:
                    error_summary["Incorrect duration format"] += 1
                elif "Missing" in err:
                    error_summary["Missing required elements"] += 1
                else:
                    error_summary["Other errors"] += 1

        if warnings:
            file_warnings[filepath.name] = warnings
            files_with_warnings += 1
            total_warnings += len(warnings)
            for warn in warnings:
                if "Missing <h1>" in warn:
                    warning_summary["Missing h1"] += 1
                elif "navigation" in warn:
                    warning_summary["No navigation"] += 1
                else:
                    warning_summary["Other warnings"] += 1

    # Validate internal links
    print("🔗 Checking internal links...")
    broken_links = validate_internal_links(base_dir, html_files)

    # REPORT OUTPUT (Token-optimized)
    print("\n" + "="*60)
    print("📊 VALIDATION SUMMARY")
    print("="*60)
    print(f"Total files: {len(html_files)}")
    print(f"Files with errors: {files_with_errors}")
    print(f"Files with warnings: {files_with_warnings}")
    print(f"Total errors: {total_errors}")
    print(f"Total warnings: {total_warnings}")
    print(f"Broken internal links: {sum(len(v) for v in broken_links.values())}")

    # Error summary by type
    if error_summary:
        print("\n" + "-"*60)
        print("❌ ERRORS BY TYPE")
        print("-"*60)
        for error_type, count in sorted(error_summary.items(), key=lambda x: -x[1]):
            print(f"  {error_type}: {count}")

    # Warning summary by type
    if warning_summary:
        print("\n" + "-"*60)
        print("⚠️  WARNINGS BY TYPE")
        print("-"*60)
        for warn_type, count in sorted(warning_summary.items(), key=lambda x: -x[1]):
            print(f"  {warn_type}: {count}")

    # Detailed errors (only if present)
    if file_errors:
        print("\n" + "="*60)
        print("❌ DETAILED ERRORS")
        print("="*60)
        for filename, errors in sorted(file_errors.items()):
            print(f"\n{filename}:")
            for err in errors:
                print(f"  • {err}")

    # Broken links (only if present)
    if broken_links:
        print("\n" + "="*60)
        print("🔗 BROKEN INTERNAL LINKS")
        print("="*60)
        for filename, links in sorted(broken_links.items()):
            print(f"\n{filename}:")
            for link in links:
                print(f"  • {link}")

    # Success message
    if total_errors == 0 and not broken_links:
        print("\n✅ All pages passed validation!")

    # Save detailed report to file
    report_path = base_dir / "validation_report.txt"
    with open(report_path, 'w') as f:
        f.write("HTML VALIDATION REPORT\n")
        f.write(f"Generated: 2026-03-01\n")
        f.write(f"Total files: {len(html_files)}\n")
        f.write(f"Errors: {total_errors}\n")
        f.write(f"Warnings: {total_warnings}\n\n")

        if file_errors:
            f.write("ERRORS:\n")
            for filename, errors in sorted(file_errors.items()):
                f.write(f"\n{filename}:\n")
                for err in errors:
                    f.write(f"  • {err}\n")

        if file_warnings:
            f.write("\nWARNINGS:\n")
            for filename, warnings in sorted(file_warnings.items()):
                f.write(f"\n{filename}:\n")
                for warn in warnings:
                    f.write(f"  • {warn}\n")

        if broken_links:
            f.write("\nBROKEN LINKS:\n")
            for filename, links in sorted(broken_links.items()):
                f.write(f"\n{filename}:\n")
                for link in links:
                    f.write(f"  • {link}\n")

    print(f"\n📝 Detailed report saved to: validation_report.txt")

    return total_errors

if __name__ == "__main__":
    exit_code = main()
    exit(0 if exit_code == 0 else 1)
