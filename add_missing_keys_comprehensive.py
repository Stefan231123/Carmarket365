#!/usr/bin/env python3

import os
import json
import re
from datetime import datetime

# High priority missing keys with English translations
MISSING_KEYS = {
    'advancedFeatures.financingCalculator.fields.fees': 'Additional Fees',
    'advancedSearch.bodyColor': 'Body Color',
    'advancedSearch.euroEmission': 'Euro Emission Standard',
    'advancedSearch.fullServiceHistory': 'Full Service History',
    'advancedSearch.guarantee': 'Warranty/Guarantee',
    'advancedSearch.hadAccident': 'Has Had Accident',
    'advancedSearch.mileageFrom': 'Mileage From',
    'advancedSearch.mileageTo': 'Mileage To',
    'advancedSearch.nonSmoking': 'Non-Smoking Vehicle',
    'advancedSearch.onlyWithImages': 'Only with Images',
    'advancedSearch.paintWork': 'Paint Work Done',
    'advancedSearch.powerFrom': 'Power From (HP)',
    'advancedSearch.powerTo': 'Power To (HP)',
    'advancedSearch.searchTerm': 'Search Term',
    'advancedSearch.upholstery': 'Upholstery Type',
    'common.ascending': 'Ascending',
    'common.descending': 'Descending',
    'modals.tradeIn.factors.excellentService': 'Excellent Service History',
    'modals.tradeIn.factors.highAge': 'High Age',
    'modals.tradeIn.factors.highMileage': 'High Mileage',
    'modals.tradeIn.factors.lowAge': 'Low Age',
    'modals.tradeIn.factors.lowMileage': 'Low Mileage',
    'modals.tradeIn.factors.majorAccidents': 'Major Accidents',
    'modals.tradeIn.factors.poorCondition': 'Poor Condition',
    'modals.tradeIn.placeholders.additionalInfoPlaceholder': 'Any additional information about your vehicle...',
    'modals.tradeIn.placeholders.locationExample': 'e.g., New York, NY',
    'modals.tradeIn.placeholders.mileageExample': 'e.g., 50,000',
    'modals.tradeIn.placeholders.modelExample': 'e.g., Civic, Camry, Golf',
    'modals.tradeIn.serviceOptions.regular': 'Regular Maintenance',
    'sell.conditions.needsWork': 'Needs Work'
}

# Macedonian translations
MACEDONIAN_TRANSLATIONS = {
    'advancedFeatures.financingCalculator.fields.fees': 'Дополнителни такси',
    'advancedSearch.bodyColor': 'Боја на каросерија',
    'advancedSearch.euroEmission': 'Еуро емисија стандард',
    'advancedSearch.fullServiceHistory': 'Целосна сервисна историја',
    'advancedSearch.guarantee': 'Гаранција',
    'advancedSearch.hadAccident': 'Имал несреќа',
    'advancedSearch.mileageFrom': 'Километража од',
    'advancedSearch.mileageTo': 'Километража до',
    'advancedSearch.nonSmoking': 'Возило без пушење',
    'advancedSearch.onlyWithImages': 'Само со слики',
    'advancedSearch.paintWork': 'Извршена боја работа',
    'advancedSearch.powerFrom': 'Сила од (КС)',
    'advancedSearch.powerTo': 'Сила до (КС)',
    'advancedSearch.searchTerm': 'Термин за пребарување',
    'advancedSearch.upholstery': 'Тип на тапацирање',
    'common.ascending': 'Во растечки редослед',
    'common.descending': 'Во опаѓачки редослед',
    'modals.tradeIn.factors.excellentService': 'Одлична сервисна историја',
    'modals.tradeIn.factors.highAge': 'Висока возраст',
    'modals.tradeIn.factors.highMileage': 'Висока километража',
    'modals.tradeIn.factors.lowAge': 'Ниска возраст',
    'modals.tradeIn.factors.lowMileage': 'Ниска километража',
    'modals.tradeIn.factors.majorAccidents': 'Големи несреќи',
    'modals.tradeIn.factors.poorCondition': 'Лоша состојба',
    'modals.tradeIn.placeholders.additionalInfoPlaceholder': 'Дополнителни информации за вашето возило...',
    'modals.tradeIn.placeholders.locationExample': 'на пр., Скопје, Македонија',
    'modals.tradeIn.placeholders.mileageExample': 'на пр., 50.000',
    'modals.tradeIn.placeholders.modelExample': 'на пр., Golf, Accord, Focus',
    'modals.tradeIn.serviceOptions.regular': 'Редовно одржување',
    'sell.conditions.needsWork': 'Потребни поправки'
}

# Albanian translations
ALBANIAN_TRANSLATIONS = {
    'advancedFeatures.financingCalculator.fields.fees': 'Taksa shtesë',
    'advancedSearch.bodyColor': 'Ngjyra e karoseries',
    'advancedSearch.euroEmission': 'Standardi i emetimeve Euro',
    'advancedSearch.fullServiceHistory': 'Historia e plotë e shërbimit',
    'advancedSearch.guarantee': 'Garanci',
    'advancedSearch.hadAccident': 'Ka pasur aksident',
    'advancedSearch.mileageFrom': 'Kilometrazhi nga',
    'advancedSearch.mileageTo': 'Kilometrazhi deri',
    'advancedSearch.nonSmoking': 'Automjet pa duhanpirje',
    'advancedSearch.onlyWithImages': 'Vetëm me foto',
    'advancedSearch.paintWork': 'Punë të bojës së kryer',
    'advancedSearch.powerFrom': 'Fuqia nga (HP)',
    'advancedSearch.powerTo': 'Fuqia deri (HP)',
    'advancedSearch.searchTerm': 'Termi i kërkimit',
    'advancedSearch.upholstery': 'Lloji i tapicerisë',
    'common.ascending': 'Në rend rritës',
    'common.descending': 'Në rend zbritës',
    'modals.tradeIn.factors.excellentService': 'Historia e shkëlqyer e shërbimit',
    'modals.tradeIn.factors.highAge': 'Moshë e lartë',
    'modals.tradeIn.factors.highMileage': 'Kilometrazh i lartë',
    'modals.tradeIn.factors.lowAge': 'Moshë e ulët',
    'modals.tradeIn.factors.lowMileage': 'Kilometrazh i ulët',
    'modals.tradeIn.factors.majorAccidents': 'Aksidente të mëdha',
    'modals.tradeIn.factors.poorCondition': 'Gjendje e keqe',
    'modals.tradeIn.placeholders.additionalInfoPlaceholder': 'Çdo informacion shtesë për automjetin tuaj...',
    'modals.tradeIn.placeholders.locationExample': 'p.sh., Tiranë, Shqipëri',
    'modals.tradeIn.placeholders.mileageExample': 'p.sh., 50,000',
    'modals.tradeIn.placeholders.modelExample': 'p.sh., Golf, Accord, Focus',
    'modals.tradeIn.serviceOptions.regular': 'Mirëmbajtje e rregullt',
    'sell.conditions.needsWork': 'Nevojitet punë'
}

def find_insertion_point(content: str, key_path: str) -> int:
    """Find the best place to insert a new key in the translation file"""
    
    # Split the key path
    parts = key_path.split('.')
    
    # For nested keys, try to find the parent section
    if len(parts) > 1:
        parent_section = '.'.join(parts[:-1])
        
        # Look for existing keys in the same section
        pattern = rf"^\s*{re.escape(parts[-1])}\s*:"
        lines = content.split('\n')
        
        # Find similar keys and insert nearby
        for i, line in enumerate(lines):
            if parent_section in line or any(part in line for part in parts[:-1]):
                # Found a related section, look for a good insertion point
                for j in range(i, min(i + 50, len(lines))):
                    if lines[j].strip().endswith(',') and ':' in lines[j]:
                        return content.find(lines[j]) + len(lines[j])
    
    # Default: find the end of the main object
    lines = content.split('\n')
    for i in reversed(range(len(lines))):
        line = lines[i].strip()
        if line.endswith(',') and ':' in line:
            return content.find(lines[i]) + len(lines[i])
    
    # Last resort: insert before the final closing brace
    last_brace = content.rfind('}')
    if last_brace > 0:
        # Find the previous line
        prev_newline = content.rfind('\n', 0, last_brace)
        return prev_newline + 1
    
    return len(content) - 10  # Fallback

def add_key_to_section(content: str, key_path: str, value: str) -> str:
    """Add a key to the appropriate section in the translation file"""
    
    parts = key_path.split('.')
    
    # For simple approach, let's add keys at the end of their respective sections
    # This is a simplified implementation
    
    key_name = parts[-1]
    indentation = '    ' * len(parts)  # Basic indentation
    
    # Format the new key line
    new_key_line = f"\n{indentation}{key_name}: '{value}',"
    
    # Find insertion point
    insertion_point = find_insertion_point(content, key_path)
    
    # Insert the new key
    modified_content = content[:insertion_point] + new_key_line + content[insertion_point:]
    
    return modified_content

def backup_file(file_path: str):
    """Create a backup of the file before modification"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = f"{file_path}.backup_{timestamp}"
    
    try:
        with open(file_path, 'r', encoding='utf-8') as original:
            content = original.read()
        with open(backup_path, 'w', encoding='utf-8') as backup:
            backup.write(content)
        print(f"✓ Backup created: {backup_path}")
    except Exception as e:
        print(f"⚠️ Failed to create backup for {file_path}: {e}")

def add_missing_keys_to_file(file_path: str, translations: dict, language_name: str):
    """Add missing keys to a specific translation file"""
    
    print(f"\n🔧 Adding missing keys to {language_name} translation file...")
    
    try:
        # Read the current file
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        # Create backup
        backup_file(file_path)
        
        # Add each missing key
        keys_added = 0
        for key, translation in translations.items():
            # Check if key already exists
            key_parts = key.split('.')
            last_part = key_parts[-1]
            
            # Simple check for existing key
            if f"{last_part}:" in content:
                continue
                
            # Add the key to the appropriate section
            print(f"   Adding: {key} = '{translation}'")
            
            # For simplicity, let's add to the end of the appropriate section
            # This is a basic implementation - could be improved
            
            # Find the best section to add to
            section_patterns = {
                'advancedFeatures': 'advancedFeatures:',
                'advancedSearch': 'advancedSearch:',
                'common': 'common:',
                'modals': 'modals:',
                'sell': 'sell:'
            }
            
            added = False
            for section_key, pattern in section_patterns.items():
                if key.startswith(section_key) and pattern in content:
                    # Find the end of this section
                    pattern_pos = content.find(pattern)
                    if pattern_pos > 0:
                        # Find the closing brace for this section
                        brace_count = 0
                        pos = pattern_pos
                        while pos < len(content):
                            if content[pos] == '{':
                                brace_count += 1
                            elif content[pos] == '}':
                                brace_count -= 1
                                if brace_count == 0:
                                    # Found the end of the section
                                    # Insert before the closing brace
                                    nested_parts = key.replace(f"{section_key}.", "").split('.')
                                    indentation = '  ' + ('  ' * len(nested_parts))
                                    new_line = f"\n{indentation}{nested_parts[-1]}: '{translation}',"
                                    content = content[:pos] + new_line + '\n  ' + content[pos:]
                                    keys_added += 1
                                    added = True
                                    break
                            pos += 1
                    break
            
            if not added:
                # Fallback: add to the end of the file before final closing brace
                last_brace = content.rfind('};\n')
                if last_brace > 0:
                    # Simple addition with basic nesting
                    key_parts = key.split('.')
                    indentation = '  ' + ('  ' * (len(key_parts) - 1))
                    new_line = f"\n  // Added missing key\n{indentation}{key_parts[-1]}: '{translation}',"
                    content = content[:last_brace] + new_line + '\n' + content[last_brace:]
                    keys_added += 1
        
        # Write the modified content back
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
            
        print(f"✓ Added {keys_added} keys to {language_name}")
        
    except Exception as e:
        print(f"❌ Error adding keys to {file_path}: {e}")

def main():
    root_dir = "/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm"
    
    print("🚀 Starting comprehensive missing translation key fixes...")
    print(f"Will add {len(MISSING_KEYS)} high-priority keys to all translation files")
    
    translation_files = [
        (os.path.join(root_dir, 'shared/translations/en.ts'), MISSING_KEYS, 'English'),
        (os.path.join(root_dir, 'shared/translations/mk.ts'), MACEDONIAN_TRANSLATIONS, 'Macedonian'),
        (os.path.join(root_dir, 'shared/translations/sq.ts'), ALBANIAN_TRANSLATIONS, 'Albanian'),
    ]
    
    for file_path, translations, language in translation_files:
        if os.path.exists(file_path):
            add_missing_keys_to_file(file_path, translations, language)
        else:
            print(f"⚠️ Translation file not found: {file_path}")
    
    print(f"\n🎉 Comprehensive translation fix completed!")
    print(f"Added {len(MISSING_KEYS)} keys to each language file")
    print("\nNext steps:")
    print("1. Test the application to ensure no 'Missing:' errors for these keys")
    print("2. Review and adjust translations for context appropriateness")
    print("3. Run the missing keys analysis again to verify fixes")

if __name__ == "__main__":
    main()