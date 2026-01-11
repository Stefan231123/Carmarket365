#!/usr/bin/env python3
"""
Comprehensive Translation Validation Script
Validates translation key consistency across all 6 language files.
"""

import json
import re
from typing import Dict, Set, List, Any
import os

def extract_keys_from_object(obj: Any, prefix: str = "") -> Set[str]:
    """Extract all nested keys from a JavaScript object."""
    keys = set()
    
    if isinstance(obj, dict):
        for key, value in obj.items():
            full_key = f"{prefix}.{key}" if prefix else key
            keys.add(full_key)
            keys.update(extract_keys_from_object(value, full_key))
    
    return keys

def parse_ts_file(file_path: str) -> Set[str]:
    """Parse a TypeScript translation file and extract all keys."""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Remove import statements and export declarations
        content = re.sub(r'^import.*?;$', '', content, flags=re.MULTILINE)
        content = re.sub(r'^export.*?=\s*', '', content, flags=re.MULTILINE)
        content = content.strip().rstrip(';')
        
        # Extract the object content
        # Find the main object starting with '{'
        start_idx = content.find('{')
        if start_idx == -1:
            print(f"Warning: Could not find object start in {file_path}")
            return set()
        
        # Count braces to find matching closing brace
        brace_count = 0
        end_idx = start_idx
        for i, char in enumerate(content[start_idx:], start_idx):
            if char == '{':
                brace_count += 1
            elif char == '}':
                brace_count -= 1
                if brace_count == 0:
                    end_idx = i
                    break
        
        obj_content = content[start_idx:end_idx + 1]
        
        # Convert to JSON-like format for parsing
        # Replace single quotes with double quotes
        obj_content = re.sub(r"'([^']*)':", r'"\1":', obj_content)
        obj_content = re.sub(r"'([^']*)'", r'"\1"', obj_content)
        
        # Remove trailing commas
        obj_content = re.sub(r',\s*}', '}', obj_content)
        obj_content = re.sub(r',\s*]', ']', obj_content)
        
        # Parse as JSON
        try:
            obj = json.loads(obj_content)
            return extract_keys_from_object(obj)
        except json.JSONDecodeError as e:
            print(f"Warning: Could not parse JSON in {file_path}: {e}")
            # Fall back to manual key extraction
            return extract_keys_manually(obj_content)
    
    except Exception as e:
        print(f"Error processing {file_path}: {e}")
        return set()

def extract_keys_manually(content: str) -> Set[str]:
    """Manually extract keys when JSON parsing fails."""
    keys = set()
    
    # Find key patterns
    key_pattern = r'([a-zA-Z_][a-zA-Z0-9_]*)\s*:'
    matches = re.findall(key_pattern, content)
    
    for match in matches:
        keys.add(match)
    
    return keys

def get_all_translation_keys() -> Dict[str, Set[str]]:
    """Get all translation keys from all language files."""
    base_path = "/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/shared/translations"
    languages = ['en', 'mk', 'sq', 'sl', 'ru', 'lv']
    
    all_keys = {}
    
    for lang in languages:
        file_path = os.path.join(base_path, f"{lang}.ts")
        if os.path.exists(file_path):
            keys = parse_ts_file(file_path)
            all_keys[lang] = keys
            print(f"✓ {lang}.ts: {len(keys)} keys found")
        else:
            print(f"✗ {file_path} not found")
    
    return all_keys

def validate_key_consistency(all_keys: Dict[str, Set[str]]) -> Dict[str, Any]:
    """Validate that all language files have the same keys."""
    if not all_keys:
        return {"status": "error", "message": "No translation files found"}
    
    # Get reference keys (use English as reference)
    if 'en' not in all_keys:
        print("Warning: English translation file not found, using first available as reference")
        reference_lang = list(all_keys.keys())[0]
    else:
        reference_lang = 'en'
    
    reference_keys = all_keys[reference_lang]
    print(f"Using {reference_lang} as reference with {len(reference_keys)} keys")
    
    results = {
        "status": "success",
        "reference_language": reference_lang,
        "reference_key_count": len(reference_keys),
        "language_results": {},
        "missing_keys": {},
        "extra_keys": {},
        "consistency_score": 0
    }
    
    total_matches = 0
    total_languages = len(all_keys) - 1  # Exclude reference language
    
    for lang, keys in all_keys.items():
        if lang == reference_lang:
            continue
        
        missing = reference_keys - keys
        extra = keys - reference_keys
        matching = len(reference_keys & keys)
        
        coverage = (matching / len(reference_keys)) * 100 if reference_keys else 100
        
        results["language_results"][lang] = {
            "total_keys": len(keys),
            "matching_keys": matching,
            "missing_count": len(missing),
            "extra_count": len(extra),
            "coverage_percentage": round(coverage, 2)
        }
        
        if missing:
            results["missing_keys"][lang] = sorted(list(missing))
        
        if extra:
            results["extra_keys"][lang] = sorted(list(extra))
        
        total_matches += coverage
    
    if total_languages > 0:
        results["consistency_score"] = round(total_matches / total_languages, 2)
    
    return results

def main():
    """Main validation function."""
    print("🔍 CarMarket365 Translation Validation")
    print("=" * 50)
    
    # Get all translation keys
    all_keys = get_all_translation_keys()
    
    if not all_keys:
        print("❌ No translation files found")
        return
    
    print("\n📊 Key Consistency Analysis")
    print("-" * 30)
    
    # Validate consistency
    results = validate_key_consistency(all_keys)
    
    if results["status"] == "error":
        print(f"❌ {results['message']}")
        return
    
    # Print summary
    print(f"Reference: {results['reference_language']} ({results['reference_key_count']} keys)")
    print(f"Overall Consistency Score: {results['consistency_score']}%")
    print()
    
    # Print detailed results
    perfect_languages = []
    for lang, stats in results["language_results"].items():
        status = "✅" if stats["coverage_percentage"] == 100 else "⚠️" if stats["coverage_percentage"] > 95 else "❌"
        print(f"{status} {lang.upper()}: {stats['coverage_percentage']}% coverage ({stats['matching_keys']}/{results['reference_key_count']} keys)")
        
        if stats["missing_count"] > 0:
            print(f"   Missing: {stats['missing_count']} keys")
        
        if stats["extra_count"] > 0:
            print(f"   Extra: {stats['extra_count']} keys")
        
        if stats["coverage_percentage"] == 100 and stats["extra_count"] == 0:
            perfect_languages.append(lang.upper())
    
    print()
    
    # Final assessment
    if results["consistency_score"] >= 100:
        print("🎉 PERFECT! All translation files have 100% key consistency!")
    elif results["consistency_score"] >= 95:
        print("✅ EXCELLENT! Translation files have very high consistency.")
    elif results["consistency_score"] >= 85:
        print("✅ GOOD! Most translation keys are consistent.")
    else:
        print("⚠️ NEEDS WORK! Significant key inconsistencies found.")
    
    if perfect_languages:
        print(f"Perfect languages: {', '.join(perfect_languages)}")
    
    # Show missing keys if any
    if results["missing_keys"]:
        print("\n❌ Missing Keys by Language:")
        for lang, missing in results["missing_keys"].items():
            if missing:
                print(f"\n{lang.upper()} missing {len(missing)} keys:")
                for key in missing[:10]:  # Show first 10 only
                    print(f"  - {key}")
                if len(missing) > 10:
                    print(f"  ... and {len(missing) - 10} more")

if __name__ == "__main__":
    main()