#!/usr/bin/env python3

import re
import json

def count_keys_in_object(obj, prefix=''):
    """Recursively count keys in a nested object"""
    count = 0
    
    if isinstance(obj, dict):
        for key, value in obj.items():
            if isinstance(value, (dict, list)):
                count += count_keys_in_object(value, f"{prefix}.{key}" if prefix else key)
            else:
                count += 1
    elif isinstance(obj, list):
        for i, item in enumerate(obj):
            count += count_keys_in_object(item, f"{prefix}[{i}]")
    
    return count

def parse_translation_file(content):
    """Parse TypeScript translation file and extract the object"""
    
    # Find the export statement
    export_match = re.search(r'export const \w+Translations: TranslationStrings = ({.*});', content, re.DOTALL)
    if not export_match:
        raise ValueError("Could not find translation object")
    
    object_content = export_match.group(1)
    
    # This is a simplified parser - for production use, consider using a proper JS/TS parser
    # Convert TypeScript object to JSON-like format for parsing
    
    # Remove comments
    object_content = re.sub(r'//.*?\n', '\n', object_content)
    object_content = re.sub(r'/\*.*?\*/', '', object_content, flags=re.DOTALL)
    
    # Replace single quotes with double quotes
    object_content = re.sub(r"'([^'\\]*(\\.[^'\\]*)*)'", r'"\1"', object_content)
    
    # Fix trailing commas
    object_content = re.sub(r',(\s*[}\]])', r'\1', object_content)
    
    # Handle object keys without quotes
    object_content = re.sub(r'(\w+):\s*', r'"\1": ', object_content)
    
    try:
        # Attempt to parse as JSON (this may not work perfectly due to TS syntax)
        parsed_obj = json.loads(object_content)
        return parsed_obj
    except json.JSONDecodeError as e:
        # If JSON parsing fails, count keys manually using regex
        print(f"JSON parsing failed: {e}")
        print("Falling back to regex-based counting...")
        return count_keys_regex(content)

def count_keys_regex(content):
    """Count keys using regex patterns"""
    
    # Pattern to match key-value pairs
    # This matches: key: 'value' or key: "value"
    key_pattern = r'^\s*\w+:\s*[\'"][^\'"]*[\'"]'
    
    matches = re.findall(key_pattern, content, re.MULTILINE)
    
    # Also count array items and nested objects
    array_items = re.findall(r'^\s*\{[^}]*\}', content, re.MULTILINE)
    
    print(f"Found {len(matches)} string key-value pairs")
    print(f"Found {len(array_items)} object structures")
    
    return len(matches)

def main():
    en_file = '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/en.ts'
    mk_file = '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations/mk.ts'
    
    print("Analyzing translation files...")
    
    # Read files
    with open(en_file, 'r', encoding='utf-8') as f:
        en_content = f.read()
    
    with open(mk_file, 'r', encoding='utf-8') as f:
        mk_content = f.read()
    
    # Count keys using a simpler method
    # Count all lines that look like key: 'value'
    en_key_pattern = r'^\s*\w+:\s*[\'"][^\'"]*[\'"],?'
    mk_key_pattern = r'^\s*\w+:\s*[\'"][^\'"]*[\'"],?'
    
    en_keys = re.findall(en_key_pattern, en_content, re.MULTILINE)
    mk_keys = re.findall(mk_key_pattern, mk_content, re.MULTILINE)
    
    print(f"\nString key count analysis:")
    print(f"English (en.ts): {len(en_keys)} string keys")
    print(f"Macedonian (mk.ts): {len(mk_keys)} string keys")
    
    # More comprehensive counting - count all property assignments
    en_all_props = re.findall(r'^\s*\w+:\s*[^,\n]*,?', en_content, re.MULTILINE)
    mk_all_props = re.findall(r'^\s*\w+:\s*[^,\n]*,?', mk_content, re.MULTILINE)
    
    print(f"\nAll property count analysis:")
    print(f"English (en.ts): {len(en_all_props)} total properties")
    print(f"Macedonian (mk.ts): {len(mk_all_props)} total properties")
    
    if len(en_all_props) > 0:
        coverage = (len(mk_all_props) / len(en_all_props)) * 100
        print(f"\nCoverage: {coverage:.1f}%")
        
        if coverage == 100.0:
            print("✅ Perfect parity achieved!")
        elif coverage > 100.0:
            extra = len(mk_all_props) - len(en_all_props)
            print(f"⚠️  Macedonian has {extra} extra properties")
        else:
            missing = len(en_all_props) - len(mk_all_props)
            print(f"⚠️  Macedonian is missing {missing} properties")

if __name__ == "__main__":
    main()