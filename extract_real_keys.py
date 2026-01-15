#!/usr/bin/env python3

import os
import re
import json
from pathlib import Path
from typing import Set, Dict, List, Any

def extract_used_translation_keys(root_dir: str) -> Set[str]:
    """Extract translation keys actually used in components"""
    used_keys = set()
    
    # Pattern to match t() calls with quoted keys
    pattern = r"t\(['\"`]([a-zA-Z0-9_.]+)['\"`]\)"
    
    # Search in client components and pages
    client_dir = os.path.join(root_dir, 'client')
    if not os.path.exists(client_dir):
        return used_keys
    
    for root, dirs, files in os.walk(client_dir):
        for file in files:
            if file.endswith(('.tsx', '.ts', '.jsx', '.js')):
                file_path = os.path.join(root, file)
                try:
                    with open(file_path, 'r', encoding='utf-8') as f:
                        content = f.read()
                    
                    # Find all t() function calls
                    matches = re.findall(pattern, content)
                    for match in matches:
                        if '.' in match:  # Only include dotted keys (exclude single words)
                            used_keys.add(match)
                            
                except Exception as e:
                    print(f"Error reading {file_path}: {e}")
    
    return used_keys

def extract_available_keys_from_ts_file(file_path: str) -> Set[str]:
    """Extract available keys from TypeScript translation files"""
    available_keys = set()
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Split content into lines for processing
        lines = content.split('\n')
        current_path = []
        
        for line in lines:
            stripped = line.strip()
            
            # Skip comments and empty lines
            if not stripped or stripped.startswith('//') or stripped.startswith('/*') or stripped.startswith('*'):
                continue
                
            # Calculate indentation level
            indent_level = (len(line) - len(line.lstrip())) // 2
            
            # Adjust current path based on indentation
            if indent_level < len(current_path):
                current_path = current_path[:indent_level]
            
            # Look for key definitions
            if ':' in stripped and not stripped.endswith('{') and not stripped.startswith('}'):
                # Extract key name
                key_match = re.search(r'^([a-zA-Z_][a-zA-Z0-9_]*)\s*:', stripped)
                if key_match:
                    key = key_match.group(1)
                    full_key = '.'.join(current_path + [key])
                    available_keys.add(full_key)
            
            # Handle object opening
            if stripped.endswith('{') and ':' in stripped:
                # Object definition
                obj_match = re.search(r'^([a-zA-Z_][a-zA-Z0-9_]*)\s*:\s*{', stripped)
                if obj_match:
                    key = obj_match.group(1)
                    current_path = current_path[:indent_level] + [key]
            elif stripped == '},' or stripped == '}':
                # Object closing - adjust path
                if current_path and indent_level < len(current_path):
                    current_path = current_path[:indent_level]
    
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
    
    return available_keys

def main():
    root_dir = "/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm"
    
    print("🔍 Extracting translation keys used in code...")
    used_keys = extract_used_translation_keys(root_dir)
    print(f"Found {len(used_keys)} translation keys in use")
    
    # Sample of used keys
    print("\n📋 Sample of used keys:")
    for i, key in enumerate(sorted(used_keys)):
        if i < 20:
            print(f"   - {key}")
    if len(used_keys) > 20:
        print(f"   ... and {len(used_keys) - 20} more")
    
    # Load translation files
    translation_files = {
        'mk': os.path.join(root_dir, 'shared/translations/mk.ts'),
        'sq': os.path.join(root_dir, 'shared/translations/sq.ts'),
        'en': os.path.join(root_dir, 'shared/translations/en.ts'),
    }
    
    results = {}
    
    for lang, file_path in translation_files.items():
        if os.path.exists(file_path):
            print(f"\n📖 Analyzing {lang.upper()} translations...")
            available_keys = extract_available_keys_from_ts_file(file_path)
            missing_keys = used_keys - available_keys
            
            results[lang] = {
                'available': len(available_keys),
                'missing': len(missing_keys),
                'missing_keys': sorted(missing_keys)
            }
            
            print(f"   Available: {len(available_keys)}")
            print(f"   Missing: {len(missing_keys)}")
            
            if missing_keys:
                print(f"\n❌ Top 10 missing keys in {lang.upper()}:")
                for i, key in enumerate(sorted(missing_keys)):
                    if i < 10:
                        print(f"   - {key}")
                if len(missing_keys) > 10:
                    print(f"   ... and {len(missing_keys) - 10} more")
    
    # Generate summary report
    print(f"\n" + "="*80)
    print("📊 TRANSLATION COVERAGE SUMMARY")
    print("="*80)
    
    for lang, data in results.items():
        coverage = ((len(used_keys) - data['missing']) / len(used_keys) * 100) if used_keys else 0
        print(f"\n{lang.upper()}: {coverage:.1f}% coverage ({data['missing']} missing keys)")
    
    # Save detailed report
    report = {
        'analysis_date': '2025-01-13',
        'total_keys_used': len(used_keys),
        'used_keys': sorted(used_keys),
        'languages': results
    }
    
    report_file = os.path.join(root_dir, 'translation_analysis_report.json')
    with open(report_file, 'w', encoding='utf-8') as f:
        json.dump(report, f, indent=2, ensure_ascii=False)
    
    print(f"\n📄 Full report saved to: {report_file}")

if __name__ == "__main__":
    main()