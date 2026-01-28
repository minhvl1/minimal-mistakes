#!/usr/bin/env python3
"""
Script to remove YAML front matter from markdown files in assets/files/source_notebook/
This allows Jekyll to treat them as static files for download instead of processing them.
"""

import os
import re
from pathlib import Path

def remove_frontmatter(file_path):
    """Remove YAML front matter from a markdown file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Pattern to match YAML front matter: ---\n...\n---
    # Using DOTALL flag to match across multiple lines
    pattern = r'^---\s*\n.*?\n---\s*\n'
    
    # Remove front matter
    new_content = re.sub(pattern, '', content, count=1, flags=re.DOTALL)
    
    # Check if anything was removed
    if new_content != content:
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(new_content)
        return True
    return False

def main():
    base_dir = Path('/Users/minhvu/Documents/minimal-mistakes/assets/files/source_notebook')
    
    # Find all .md files recursively
    md_files = list(base_dir.rglob('*.md'))
    
    print(f"Found {len(md_files)} markdown files in {base_dir}")
    print("-" * 60)
    
    modified_count = 0
    for md_file in md_files:
        print(f"Processing: {md_file.relative_to(base_dir)}")
        if remove_frontmatter(md_file):
            print(f"  ✅ Removed front matter")
            modified_count += 1
        else:
            print(f"  ⏭️  No front matter found")
    
    print("-" * 60)
    print(f"✨ Done! Modified {modified_count}/{len(md_files)} files")

if __name__ == '__main__':
    main()
