#!/usr/bin/env python3

import os
import re
import json
from pathlib import Path
from typing import Set, Dict, List, Any

def extract_used_translation_keys(root_dir: str) -> Set[str]:
    """Extract translation keys used in React components"""
    used_keys = set()
    
    # Pattern to match t() calls
    patterns = [
        r"t\(['\"`]([a-zA-Z0-9_.]+)['\"`]\)",  # t('key.path')
        r"t\(['\"`]([^'\"`\{\}]+)['\"`]\)",     # More general pattern
    ]
    
    # Search in client directory
    client_dir = os.path.join(root_dir, 'client')
    if not os.path.exists(client_dir):
        return used_keys
    
    for root, dirs, files in os.walk(client_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Find all t() function calls
                    for pattern in patterns:
                        matches = re.findall(pattern, content)
                        for match in matches:
                            # Filter out obvious non-translation keys
                            if (
                                '.' in match and 
                                not match.startswith('http') and 
                                not match.startswith('@') and
                                not match.startswith('./') and
                                len(match.split('.')) <= 6 and  # Reasonable nesting depth
                                not any(char in match for char in ['/', '\\', '(', ')', '[', ']'])
                            ):
                                used_keys.add(match)
                        
                except Exception as e:
                    print(f"Warning: Error reading {file_path}: {e}")
    
    return used_keys

def check_key_exists_in_translation(file_path: str, key: str) -> bool:
    """Check if a specific key exists in a translation file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Split key into parts
        key_parts = key.split('.')
        
        # Create a regex pattern to find the key
        # This is a simplified approach
        for i, part in enumerate(key_parts):
            if i == len(key_parts) - 1:
                # Last part - look for the actual value assignment
                pattern = rf"^\s*{re.escape(part)}\s*:"
                if re.search(pattern, content, re.MULTILINE):
                    return True
        
        return False
        
    except Exception as e:
        print(f"Error checking key {key} in {file_path}: {e}")
        return False

def extract_missing_keys_comprehensive(root_dir: str) -> Dict[str, List[str]]:
    """Find missing keys by actually testing each key in each language file"""
    
    print("🔍 Extracting used translation keys from components...")
    used_keys = extract_used_translation_keys(root_dir)
    print(f"Found {len(used_keys)} potential translation keys")
    
    # Filter out obviously invalid keys
    valid_keys = set()
    for key in used_keys:
        parts = key.split('.')
        if (len(parts) >= 2 and 
            all(part.replace('_', '').replace('-', '').isalnum() for part in parts) and
            len(key) < 100):
            valid_keys.add(key)
    
    print(f"Filtered to {len(valid_keys)} valid keys")
    
    translation_files = {
        'mk': os.path.join(root_dir, 'shared/translations/mk.ts'),
        'sq': os.path.join(root_dir, 'shared/translations/sq.ts'),
        'en': os.path.join(root_dir, 'shared/translations/en.ts'),
    }
    
    missing_keys = {}
    
    for lang, file_path in translation_files.items():
        if not os.path.exists(file_path):
            print(f"⚠️ Translation file not found: {file_path}")
            continue
            
        print(f"📖 Checking {lang.upper()} translations...")
        lang_missing = []
        
        # Read the file content once
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                file_content = f.read()
        except Exception as e:
            print(f"Error reading {file_path}: {e}")
            continue
        
        # Check each key
        for key in sorted(valid_keys):
            # Simple check: look for the key pattern in file
            key_parts = key.split('.')
            last_part = key_parts[-1]
            
            # Look for the key pattern
            patterns = [
                rf"^\s*{re.escape(last_part)}\s*:",  # Simple key
                rf"'{re.escape(last_part)}'\s*:",    # Quoted key
                rf'"{re.escape(last_part)}"\s*:',    # Double quoted key
            ]
            
            found = False
            for pattern in patterns:
                if re.search(pattern, file_content, re.MULTILINE):
                    found = True
                    break
            
            if not found:
                lang_missing.append(key)
        
        missing_keys[lang] = lang_missing
        print(f"   Missing: {len(lang_missing)} keys")
    
    return missing_keys, valid_keys

def main():
    root_dir = "/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm"
    
    missing_keys, all_used_keys = extract_missing_keys_comprehensive(root_dir)
    
    print(f"\n" + "="*80)
    print("🎯 TRANSLATION ANALYSIS RESULTS")
    print("="*80)
    
    # Show high-level stats
    for lang, missing_list in missing_keys.items():
        total_used = len(all_used_keys)
        missing_count = len(missing_list)
        coverage = ((total_used - missing_count) / total_used * 100) if total_used > 0 else 0
        
        print(f"\n📊 {lang.upper()} Translation Coverage:")
        print(f"   Total keys used: {total_used}")
        print(f"   Missing keys: {missing_count}")
        print(f"   Coverage: {coverage:.1f}%")
    
    # Show top missing keys across languages
    common_missing = set(missing_keys.get('mk', [])) & set(missing_keys.get('sq', [])) & set(missing_keys.get('en', []))
    
    if common_missing:
        print(f"\n🔴 Keys missing in ALL languages ({len(common_missing)}):")
        for key in sorted(common_missing)[:20]:
            print(f"   - {key}")
        if len(common_missing) > 20:
            print(f"   ... and {len(common_missing) - 20} more")
    
    # Show language-specific missing keys
    for lang, missing_list in missing_keys.items():
        if missing_list:
            unique_missing = set(missing_list) - common_missing
            if unique_missing:
                print(f"\n🔶 Keys missing only in {lang.upper()} ({len(unique_missing)}):")
                for key in sorted(unique_missing)[:15]:
                    print(f"   - {key}")
                if len(unique_missing) > 15:
                    print(f"   ... and {len(unique_missing) - 15} more")
    
    # Save detailed report
    report = {
        'analysis_date': '2025-01-13',
        'total_keys_analyzed': len(all_used_keys),
        'all_used_keys': sorted(all_used_keys),
        'missing_by_language': missing_keys,
        'common_missing': sorted(common_missing),
        'priority_fixes': {
            'high_priority': sorted(common_missing)[:50],  # Missing in all languages
            'medium_priority': [],
            'low_priority': []
        }
    }
    
    # Calculate medium and low priority
    mk_only = set(missing_keys.get('mk', [])) - common_missing
    sq_only = set(missing_keys.get('sq', [])) - common_missing
    
    report['priority_fixes']['medium_priority'] = sorted(mk_only | sq_only)[:30]
    
    report_file = os.path.join(root_dir, 'missing_translations_analysis.json')
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print(f"\n📄 Full analysis saved to: {report_file}")
    
    # Generate fix recommendations
    print(f"\n" + "="*80)
    print("💡 RECOMMENDED ACTIONS")
    print("="*80)
    
    if common_missing:
        print(f"\n🔥 HIGH PRIORITY - Fix {len(common_missing)} keys missing in ALL languages")
        print("   These are causing 'Missing:' errors across all language versions")
    
    for lang in ['mk', 'sq']:
        lang_specific = set(missing_keys.get(lang, [])) - common_missing
        if lang_specific:
            print(f"\n⚡ MEDIUM PRIORITY - Fix {len(lang_specific)} keys missing in {lang.upper()}")
            print(f"   These cause 'Missing:' errors only in {lang.upper()} version")

if __name__ == "__main__":
    main()