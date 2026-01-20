#!/usr/bin/env python3

import re
import json

def extract_translation_keys(file_path, is_typescript=True):
    """Extract all translation keys from a file"""
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    keys = set()
    
    # Remove comments and extract string keys
    if is_typescript:
        # Remove single-line comments
        content = re.sub(r'//.*$', '', content, flags=re.MULTILINE)
        # Remove multi-line comments
        content = re.sub(r'/\*.*?\*/', '', content, flags=re.DOTALL)
    
    # Find all key: value patterns
    key_patterns = re.findall(r'(\w+)\s*:\s*[\'"`]', content)
    keys.update(key_patterns)
    
    # Find nested object keys
    nested_patterns = re.findall(r'(\w+)\s*:\s*\{', content)
    keys.update(nested_patterns)
    
    return keys

def analyze_missing_translations():
    """Analyze missing Macedonian translations"""
    
    print("🔍 MACEDONIAN TRANSLATION COVERAGE ANALYSIS")
    print("=" * 60)
    
    # Extract keys from both files
    en_keys = extract_translation_keys('shared/translations/en.ts')
    mk_keys = extract_translation_keys('shared/translations/mk.ts')
    
    missing_keys = en_keys - mk_keys
    
    print(f"📊 COVERAGE STATISTICS:")
    print(f"English keys: {len(en_keys)}")
    print(f"Macedonian keys: {len(mk_keys)}")
    print(f"Missing keys: {len(missing_keys)}")
    print(f"Coverage: {((len(mk_keys) / len(en_keys)) * 100):.1f}%")
    print()
    
    if missing_keys:
        print("❌ MISSING MACEDONIAN TRANSLATIONS:")
        print("-" * 40)
        for key in sorted(missing_keys):
            print(f"  - {key}")
        print()
    
    # Analyze major sections
    print("📋 MAJOR SECTIONS ANALYSIS:")
    print("-" * 40)
    
    major_sections = [
        'business', 'redirect', 'dealer', 'dealerDashboard', 
        'adminDashboard', 'privateDashboard', 'savedCars', 
        'sellVehicle', 'indexPage', 'dealerProfilee', 'dealerSupport',
        'carReviews', 'safetyTips', 'expressSell', 'financing',
        'registeredDealers', 'hardcodedFixes', 'finalFixes',
        'navigation'
    ]
    
    for section in major_sections:
        if section in en_keys and section not in mk_keys:
            print(f"  ❌ MISSING: {section}")
        elif section in mk_keys:
            print(f"  ✅ PRESENT: {section}")
    
    print()
    print("🎯 PRIORITY RECOMMENDATIONS:")
    print("-" * 40)
    print("1. HIGH PRIORITY (User-facing pages):")
    print("   - indexPage, browseCars, carDetail")
    print("   - auth, savedCars, sellVehicle")
    print()
    print("2. MEDIUM PRIORITY (Business features):")
    print("   - dealerDashboard, financing, expressSell") 
    print("   - carReviews, safetyTips")
    print()
    print("3. LOW PRIORITY (Admin/System):")
    print("   - adminDashboard, hardcodedFixes")
    print("   - navigation, finalFixes")

if __name__ == "__main__":
    analyze_missing_translations()