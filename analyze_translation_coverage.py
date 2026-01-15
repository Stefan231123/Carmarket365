#!/usr/bin/env python3
"""
Analyze translation coverage for CarMarket365 application
"""
import re
import os
import json
from pathlib import Path

def count_translation_keys(file_path):
    """Count number of translation keys in a translation file"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Count colons which typically indicate key-value pairs
        # This is a rough estimate but gives us a good baseline
        colon_count = content.count(':')
        
        # Also count lines that look like key definitions
        key_pattern = r'^\s*[a-zA-Z_][a-zA-Z0-9_]*\s*:'
        key_matches = re.findall(key_pattern, content, re.MULTILINE)
        
        return colon_count, len(key_matches)
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return 0, 0

def find_hardcoded_strings_in_file(file_path):
    """Find potential hardcoded English strings in a React component"""
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Look for useTranslation usage
        has_use_translation = 't(' in content or 'useTranslation' in content
        
        # Look for hardcoded English strings (simple pattern)
        # String literals that are 4+ characters and contain English words
        string_pattern = r'"([A-Za-z][A-Za-z\s]{3,})"'
        hardcoded_strings = re.findall(string_pattern, content)
        
        # Filter out common non-translatable strings
        non_translatable = ['className', 'href', 'src', 'alt', 'id', 'type', 'name', 'value', 'placeholder']
        filtered_strings = [s for s in hardcoded_strings if not any(nt in s.lower() for nt in non_translatable)]
        
        # Look for JSX text content that might need translation
        jsx_text_pattern = r'>\s*([A-Za-z][A-Za-z\s]{3,})\s*<'
        jsx_texts = re.findall(jsx_text_pattern, content)
        
        return has_use_translation, len(filtered_strings), len(jsx_texts), filtered_strings[:5]  # Return first 5 examples
        
    except Exception as e:
        print(f"Error reading {file_path}: {e}")
        return False, 0, 0, []

def analyze_directory(directory_path, file_extensions=['.tsx', '.ts']):
    """Analyze translation usage in a directory"""
    results = {
        'total_files': 0,
        'files_with_translation': 0,
        'files_with_hardcoded': 0,
        'total_hardcoded_strings': 0,
        'total_jsx_text': 0,
        'examples': []
    }
    
    for root, dirs, files in os.walk(directory_path):
        for file in files:
            if any(file.endswith(ext) for ext in file_extensions):
                file_path = os.path.join(root, file)
                has_translation, hardcoded_count, jsx_count, examples = find_hardcoded_strings_in_file(file_path)
                
                results['total_files'] += 1
                if has_translation:
                    results['files_with_translation'] += 1
                if hardcoded_count > 0 or jsx_count > 0:
                    results['files_with_hardcoded'] += 1
                    results['examples'].append({
                        'file': file_path,
                        'hardcoded_count': hardcoded_count,
                        'jsx_count': jsx_count,
                        'examples': examples
                    })
                
                results['total_hardcoded_strings'] += hardcoded_count
                results['total_jsx_text'] += jsx_count
    
    return results

def main():
    base_path = '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm'
    
    # Analyze translation files
    print("=== TRANSLATION FILE ANALYSIS ===")
    translation_files = {
        'en': os.path.join(base_path, 'shared/translations/en.ts'),
        'mk': os.path.join(base_path, 'shared/translations/mk.ts'),
        'sq': os.path.join(base_path, 'shared/translations/sq.ts')
    }
    
    translation_stats = {}
    for lang, file_path in translation_files.items():
        if os.path.exists(file_path):
            colon_count, key_count = count_translation_keys(file_path)
            translation_stats[lang] = {'colon_count': colon_count, 'key_count': key_count}
            print(f"{lang.upper()}: ~{colon_count} keys (estimated)")
        else:
            print(f"{lang.upper()}: File not found")
    
    # Calculate coverage based on English as baseline
    if 'en' in translation_stats and 'mk' in translation_stats and 'sq' in translation_stats:
        en_keys = translation_stats['en']['colon_count']
        mk_keys = translation_stats['mk']['colon_count']
        sq_keys = translation_stats['sq']['colon_count']
        
        mk_coverage = (mk_keys / en_keys * 100) if en_keys > 0 else 0
        sq_coverage = (sq_keys / en_keys * 100) if en_keys > 0 else 0
        
        print(f"\nMacedonian coverage: {mk_coverage:.1f}% ({mk_keys}/{en_keys} keys)")
        print(f"Albanian coverage: {sq_coverage:.1f}% ({sq_keys}/{en_keys} keys)")
    
    # Analyze components
    print("\n=== COMPONENT ANALYSIS ===")
    components_path = os.path.join(base_path, 'client/components')
    components_results = analyze_directory(components_path)
    
    print(f"Components analyzed: {components_results['total_files']}")
    print(f"Components using translations: {components_results['files_with_translation']}")
    print(f"Components with hardcoded strings: {components_results['files_with_hardcoded']}")
    
    translation_usage_components = (components_results['files_with_translation'] / components_results['total_files'] * 100) if components_results['total_files'] > 0 else 0
    print(f"Translation usage in components: {translation_usage_components:.1f}%")
    
    # Analyze pages
    print("\n=== PAGE ANALYSIS ===")
    pages_path = os.path.join(base_path, 'client/pages')
    pages_results = analyze_directory(pages_path)
    
    print(f"Pages analyzed: {pages_results['total_files']}")
    print(f"Pages using translations: {pages_results['files_with_translation']}")
    print(f"Pages with hardcoded strings: {pages_results['files_with_hardcoded']}")
    
    translation_usage_pages = (pages_results['files_with_translation'] / pages_results['total_files'] * 100) if pages_results['total_files'] > 0 else 0
    print(f"Translation usage in pages: {translation_usage_pages:.1f}%")
    
    # Overall analysis
    total_files = components_results['total_files'] + pages_results['total_files']
    total_with_translation = components_results['files_with_translation'] + pages_results['files_with_translation']
    total_with_hardcoded = components_results['files_with_hardcoded'] + pages_results['files_with_hardcoded']
    
    overall_translation_usage = (total_with_translation / total_files * 100) if total_files > 0 else 0
    
    print("\n=== OVERALL SUMMARY ===")
    print(f"Total files analyzed: {total_files}")
    print(f"Files using translations: {total_with_translation} ({overall_translation_usage:.1f}%)")
    print(f"Files with potential hardcoded strings: {total_with_hardcoded}")
    
    # Show examples of files with hardcoded strings
    print("\n=== FILES NEEDING ATTENTION (Top 10) ===")
    all_examples = components_results['examples'] + pages_results['examples']
    sorted_examples = sorted(all_examples, key=lambda x: x['hardcoded_count'] + x['jsx_count'], reverse=True)
    
    for i, example in enumerate(sorted_examples[:10]):
        file_name = os.path.basename(example['file'])
        print(f"{i+1}. {file_name}")
        print(f"   Hardcoded strings: {example['hardcoded_count']}, JSX text: {example['jsx_count']}")
        if example['examples']:
            print(f"   Examples: {', '.join(example['examples'][:3])}")
        print()
    
    # Estimate overall translation coverage
    print("=== TRANSLATION COVERAGE ESTIMATE ===")
    
    # Base coverage on translation file completeness and component usage
    translation_file_coverage = min(mk_coverage, sq_coverage) if 'mk_coverage' in locals() else 0
    component_translation_usage = overall_translation_usage
    
    # Weight the factors
    estimated_coverage = (translation_file_coverage * 0.6) + (component_translation_usage * 0.4)
    
    print(f"Translation file completeness: {translation_file_coverage:.1f}%")
    print(f"Component translation adoption: {component_translation_usage:.1f}%")
    print(f"Estimated overall coverage: {estimated_coverage:.1f}%")
    
    # Coverage by major sections
    print("\n=== COVERAGE BY SECTIONS ===")
    
    # Analyze specific important components
    important_files = [
        'client/components/Header.tsx',
        'client/components/Footer.tsx',
        'client/components/HeroSection.tsx',
        'client/components/AdvancedSearch.tsx',
        'client/pages/Index.tsx',
        'client/pages/SignIn.tsx',
        'client/pages/CarDetail.tsx',
        'client/pages/BrowseCars.tsx'
    ]
    
    for file_rel_path in important_files:
        file_path = os.path.join(base_path, file_rel_path)
        if os.path.exists(file_path):
            has_translation, hardcoded_count, jsx_count, examples = find_hardcoded_strings_in_file(file_path)
            total_strings = hardcoded_count + jsx_count
            status = "✅ Good" if has_translation and total_strings < 5 else "⚠️ Needs attention" if has_translation else "❌ No translation"
            print(f"{os.path.basename(file_path)}: {status} (HC: {hardcoded_count}, JSX: {jsx_count})")

if __name__ == "__main__":
    main()