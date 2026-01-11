#!/usr/bin/env python3

import re
import json
from pathlib import Path

def extract_translation_keys(file_path):
    """Extract all translation keys from a TypeScript translation file."""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Remove comments and imports
    content = re.sub(r'//.*$', '', content, flags=re.MULTILINE)
    content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    content = re.sub(r'import.*?;', '', content, flags=re.DOTALL)
    content = re.sub(r'export.*?=\s*{', '{', content)
    
    # Find the main object
    match = re.search(r'{\s*(.*)\s*};\s*$', content, flags=re.DOTALL)
    if not match:
        return set()
    
    obj_content = match.group(1)
    
    keys = set()
    
    def extract_keys_recursive(text, prefix=''):
        # Find key-value pairs and nested objects
        pattern = r"(\w+):\s*(?:('(?:[^'\\]|\\.)*'|\"(?:[^\"\\\\]|\\.)*\"|`(?:[^`\\\\]|\\.)*`)|{)"
        
        pos = 0
        brace_count = 0
        
        while pos < len(text):
            match = re.search(pattern, text[pos:])
            if not match:
                break
                
            key = match.group(1)
            value = match.group(2)
            
            full_key = f"{prefix}.{key}" if prefix else key
            
            if value and not value.startswith('{'):
                # It's a simple key-value pair
                keys.add(full_key)
                pos += match.end()
            else:
                # It's a nested object
                start_pos = pos + match.start() + match.end() - 1  # Position of opening brace
                brace_count = 1
                search_pos = start_pos + 1
                
                while search_pos < len(text) and brace_count > 0:
                    if text[search_pos] == '{':
                        brace_count += 1
                    elif text[search_pos] == '}':
                        brace_count -= 1
                    search_pos += 1
                
                if brace_count == 0:
                    # Found the matching closing brace
                    nested_content = text[start_pos + 1:search_pos - 1]
                    extract_keys_recursive(nested_content, full_key)
                    pos = search_pos
                else:
                    # Unmatched braces, move forward
                    pos += match.end()
    
    extract_keys_recursive(obj_content)
    return keys

def main():
    en_file = Path('/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/en.ts')
    lv_file = Path('/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/lv.ts')
    
    print("Extracting English keys...")
    en_keys = extract_translation_keys(en_file)
    print(f"Found {len(en_keys)} English keys")
    
    print("Extracting Latvian keys...")
    lv_keys = extract_translation_keys(lv_file)
    print(f"Found {len(lv_keys)} Latvian keys")
    
    missing_keys = en_keys - lv_keys
    print(f"\nMissing keys in Latvian: {len(missing_keys)}")
    
    # Group missing keys by top-level sections
    sections = {}
    for key in missing_keys:
        parts = key.split('.')
        section = parts[0]
        if section not in sections:
            sections[section] = []
        sections[section].append(key)
    
    print("\nMissing keys by section:")
    for section, keys in sorted(sections.items()):
        print(f"\n{section}: {len(keys)} missing keys")
        for key in sorted(keys)[:10]:  # Show first 10 keys
            print(f"  - {key}")
        if len(keys) > 10:
            print(f"  ... and {len(keys) - 10} more")
    
    # Save missing keys to file
    with open('missing_lv_keys.txt', 'w', encoding='utf-8') as f:
        for key in sorted(missing_keys):
            f.write(f"{key}\n")
    
    print(f"\nAll missing keys saved to missing_lv_keys.txt")
    
    # Calculate coverage
    total_keys = len(en_keys)
    covered_keys = len(lv_keys)
    coverage = (covered_keys / total_keys) * 100
    print(f"\nCurrent coverage: {coverage:.1f}% ({covered_keys}/{total_keys})")
    
    target_95_keys = int(total_keys * 0.95)
    keys_needed = target_95_keys - covered_keys
    print(f"Keys needed for 95% coverage: {keys_needed}")

if __name__ == "__main__":
    main()