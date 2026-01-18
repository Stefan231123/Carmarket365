#!/usr/bin/env python3
"""
Script to analyze duplicate keys in translation files and merge their content.
"""

import re
import json
from typing import Dict, List, Any

def extract_object_content(file_path: str, object_name: str, line_number: int) -> tuple[str, int]:
    """Extract the full content of an object starting from a given line."""
    with open(file_path, 'r', encoding='utf-8') as f:
        lines = f.readlines()
    
    # Start from the specified line (line_number is 1-indexed)
    start_idx = line_number - 1
    content_lines = []
    brace_count = 0
    started = False
    
    for i in range(start_idx, len(lines)):
        line = lines[i]
        if not started and '{' in line:
            started = True
            content_lines.append(line)
            brace_count += line.count('{') - line.count('}')
        elif started:
            content_lines.append(line)
            brace_count += line.count('{') - line.count('}')
            if brace_count <= 0:
                break
    
    return ''.join(content_lines), i + 1

def find_duplicates(file_path: str) -> Dict[str, List[tuple[int, str]]]:
    """Find all duplicate top-level keys and their line numbers."""
    duplicates = {}
    
    with open(file_path, 'r', encoding='utf-8') as f:
        for i, line in enumerate(f, 1):
            # Match top-level object keys
            match = re.match(r'^  ([a-zA-Z_][a-zA-Z0-9_]*): \{', line)
            if match:
                key_name = match.group(1)
                if key_name not in duplicates:
                    duplicates[key_name] = []
                duplicates[key_name].append((i, line.strip()))
    
    # Filter to only include actual duplicates
    return {k: v for k, v in duplicates.items() if len(v) > 1}

def analyze_file(file_path: str):
    """Analyze a file for duplicates and show what content would be lost."""
    print(f"\n=== Analyzing {file_path} ===")
    
    duplicates = find_duplicates(file_path)
    
    if not duplicates:
        print("No duplicate top-level keys found.")
        return
    
    print(f"Found {len(duplicates)} duplicate key groups:")
    
    for key, occurrences in duplicates.items():
        print(f"\n  Key '{key}' appears {len(occurrences)} times:")
        for i, (line_num, line_content) in enumerate(occurrences):
            print(f"    Occurrence {i+1}: Line {line_num}")
            content, _ = extract_object_content(file_path, key, line_num)
            # Show just the first few lines to give an idea of content
            content_lines = content.split('\n')[:5]
            for content_line in content_lines:
                if content_line.strip():
                    print(f"      {content_line}")
            content_line_count = len(content.split('\n'))
            if content_line_count > 5:
                print(f"      ... ({content_line_count} total lines)")
    
    return duplicates

if __name__ == "__main__":
    mk_file = "/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/mk.ts"
    sq_file = "/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/sq.ts"
    
    print("Translation File Duplicate Analysis")
    print("==================================")
    
    mk_dups = analyze_file(mk_file)
    sq_dups = analyze_file(sq_file)
    
    print("\n=== Summary ===")
    print(f"mk.ts has {len(mk_dups) if mk_dups else 0} duplicate key groups")
    print(f"sq.ts has {len(sq_dups) if sq_dups else 0} duplicate key groups")