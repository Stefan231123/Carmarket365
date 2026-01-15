#!/usr/bin/env python3

import os
import re
import json
from pathlib import Path
from typing import Set, Dict, List, Any

# Find all translation keys used in components
def extract_translation_keys_from_code(root_dir: str) -> Set[str]:
    """Extract all translation keys from t() function calls in the codebase"""
    translation_keys = set()
    
    # Patterns to match t() function calls
    patterns = [
        r"t\(['\"`]([a-zA-Z0-9_.]+)['\"`]\)",  # t('key') or t("key") or t(`key`)
        r"t\(['\"`]([^'\"`]+)['\"`]\)",        # t('key.with.dots')
    ]
    
    # File extensions to search
    extensions = {'.tsx', '.ts', '.jsx', '.js'}
    
    # Directories to search
    search_dirs = ['client', 'shared']
    
    for search_dir in search_dirs:
        search_path = os.path.join(root_dir, search_dir)
        if not os.path.exists(search_path):
            continue
            
        for root, dirs, files in os.walk(search_path):
            for file in files:
                if any(file.endswith(ext) for ext in extensions):
                    file_path = os.path.join(root, file)
                    try:
                        with open(file_path, 'r', encoding='utf-8') as f:
                            content = f.read()
                            
                        for pattern in patterns:
                            matches = re.findall(pattern, content)
                            for match in matches:
                                if match and not match.startswith('http'):  # Exclude URLs
                                    translation_keys.add(match)
                                    
                    except Exception as e:
                        print(f"Error reading {file_path}: {e}")
                        
    return translation_keys

def extract_keys_from_translation_object(obj: Any, prefix: str = '') -> Set[str]:
    """Recursively extract all keys from a translation object"""
    keys = set()
    
    if isinstance(obj, dict):
        for key, value in obj.items():
            current_key = f"{prefix}.{key}" if prefix else key
            keys.add(current_key)
            
            if isinstance(value, dict):
                keys.update(extract_keys_from_translation_object(value, current_key))
                
    return keys

def load_translation_keys_from_file(file_path: str) -> Set[str]:
    """Load translation keys from a TypeScript translation file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
            
        # Remove TypeScript syntax and extract the object
        # This is a simplified approach - for production use, consider using a proper TS parser
        
        # Find the main export object
        start_match = re.search(r'export\s+const\s+\w+Translations[^{]*{', content)
        if not start_match:
            print(f"Could not find main translation object in {file_path}")
            return set()
            
        # Extract the object content
        start_pos = start_match.end() - 1
        brace_count = 1
        pos = start_pos + 1
        
        while pos < len(content) and brace_count > 0:
            if content[pos] == '{':
                brace_count += 1
            elif content[pos] == '}':
                brace_count -= 1
            pos += 1
            
        if brace_count == 0:
            object_content = content[start_pos:pos]
            
            # Extract keys using regex
            keys = set()
            
            # Find all key declarations (simple approach)
            key_patterns = [
                r"([a-zA-Z_][a-zA-Z0-9_]*)\s*:",  # Simple keys
                r"'([^']+)'\s*:",                   # Quoted keys
                r'"([^"]+)"\s*:',                   # Double quoted keys
            ]
            
            lines = object_content.split('\n')
            current_path = []
            
            for line in lines:
                stripped = line.strip()
                
                # Count indentation to track nesting
                indent = len(line) - len(line.lstrip())
                
                # Adjust current path based on indentation
                # This is a simplified approach
                if ':' in stripped and not stripped.endswith(','):
                    for pattern in key_patterns:
                        match = re.search(pattern, stripped)
                        if match:
                            key = match.group(1)
                            # Build full key path
                            full_key = '.'.join(current_path + [key])
                            keys.add(full_key)
                            break
                            
            return keys
        
    except Exception as e:
        print(f"Error loading translation file {file_path}: {e}")
        
    return set()

def main():
    root_dir = "/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm"
    
    print("🔍 Extracting translation keys from code...")
    used_keys = extract_translation_keys_from_code(root_dir)
    print(f"Found {len(used_keys)} translation keys in use")
    
    # Load keys from translation files
    translation_files = {
        'mk': os.path.join(root_dir, 'shared/translations/mk.ts'),
        'sq': os.path.join(root_dir, 'shared/translations/sq.ts'),
        'en': os.path.join(root_dir, 'shared/translations/en.ts'),
    }
    
    translation_keys = {}
    
    for lang, file_path in translation_files.items():
        if os.path.exists(file_path):
            print(f"📖 Loading {lang} translations from {file_path}")
            keys = load_translation_keys_from_file(file_path)
            translation_keys[lang] = keys
            print(f"Found {len(keys)} keys in {lang} translation file")
        else:
            print(f"⚠️ Translation file not found: {file_path}")
            translation_keys[lang] = set()
    
    # Find missing keys
    print("\n" + "="*80)
    print("🔍 MISSING TRANSLATION ANALYSIS")
    print("="*80)
    
    for lang, available_keys in translation_keys.items():
        missing_keys = used_keys - available_keys
        
        print(f"\n📝 {lang.upper()} Translation Status:")
        print(f"   Total keys in file: {len(available_keys)}")
        print(f"   Keys used in code: {len(used_keys)}")
        print(f"   Missing keys: {len(missing_keys)}")
        
        if missing_keys:
            print(f"\n❌ Missing keys in {lang}:")
            for key in sorted(missing_keys):
                print(f"   - {key}")
    
    # Show most commonly used keys
    print(f"\n📊 All translation keys being used in code ({len(used_keys)}):")
    for key in sorted(used_keys):
        print(f"   - {key}")
    
    # Save detailed report
    report = {
        'summary': {
            'total_keys_in_use': len(used_keys),
            'analysis_timestamp': '2025-01-13'
        },
        'used_keys': list(sorted(used_keys)),
        'translation_files': {}
    }
    
    for lang, available_keys in translation_keys.items():
        missing_keys = used_keys - available_keys
        extra_keys = available_keys - used_keys
        
        report['translation_files'][lang] = {
            'total_keys': len(available_keys),
            'missing_keys': list(sorted(missing_keys)),
            'extra_keys': list(sorted(extra_keys)),
            'coverage_percentage': round((len(available_keys - missing_keys) / len(used_keys) * 100), 2) if used_keys else 0
        }
    
    report_file = os.path.join(root_dir, 'missing_translations_report.json')
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print(f"\n📄 Detailed report saved to: {report_file}")

if __name__ == "__main__":
    main()