#!/usr/bin/env python3

import os
import json
from datetime import datetime

# Priority missing keys for Albanian (most critical ones)
ALBANIAN_PRIORITY_KEYS = {
    'advancedSearch.previousOwners': 'Pronarë të mëparshëm',
    'auth.accessDenied.insufficientPermissions': 'Të drejta të pamjaftueshme',
    'auth.accessDenied.signInRequired': 'Kërkohet identifikimi',
    'auth.checkEmailInbox': 'Kontrollo kutinë e postës së emailit',
    'auth.checkYourEmail': 'Kontrollo emailin tuaj',
    'auth.clickResetLink': 'Kliko lidhjen e rivendosjes në email',
    'auth.createNewPassword': 'Krijo fjalëkalim të ri',
    'auth.nextSteps': 'Hapat vijues',
    'auth.passwordStrength.levels.medium': 'Mesatar',
    'auth.passwordStrength.levels.strong': 'I fortë',
    'auth.passwordStrength.levels.weak': 'I dobët',
    'auth.passwordStrength.requirements.length': 'Të paktën 8 karaktere',
    'auth.passwordStrength.requirements.lowercase': 'Shkronja të vogla',
    'auth.passwordStrength.requirements.number': 'Numra',
    'auth.passwordStrength.requirements.special': 'Karaktere speciale',
    'auth.passwordStrength.requirements.uppercase': 'Shkronja të mëdha',
    'auth.resetLinkSent': 'Lidhja e rivendosjes u dërgua',
    'auth.resetPasswordDescription': 'Shkruani email-in tuaj për të marrë lidhjen e rivendosjes',
    'auth.sendResetLink': 'Dërgo lidhjen e rivendosjes',
    'auth.tryAnotherEmail': 'Provo email tjetër',
    'common.default': 'I paracaktuar',
    'common.errorLoadingImage': 'Gabim në ngarkimin e figurës',
    'common.processing': 'Duke procesuar...',
    'common.secondary': 'Dytësor',
    'countryTest.selectCountryPlaceholder': 'Zgjidhni vendin për testim',
    'dealer.information': 'Informacion mbi shitësin',
    'dealer.vehicleInventory': 'Inventari i automjeteve',
    'dealerDashboard.expressListings.actions.viewContact': 'Shiko kontaktin',
    'dealerDashboard.expressListings.expressBadge': 'Express',
    'dealerDashboard.expressListings.newListings': 'Listime të reja',
    'header.advancedSearch': 'Kërkimi i avancuar'
}

# Priority missing keys for Macedonian (most critical ones)
MACEDONIAN_PRIORITY_KEYS = {
    'advancedFeatures.financingCalculator.labels.aprPercent': 'ГПК проценти',
    'advancedFeatures.financingCalculator.labels.feesDescription': 'Дополнителни такси и провизии',
    'advancedFeatures.financingCalculator.labels.forMonths': 'за месеци',
    'advancedFeatures.financingCalculator.labels.oneYear': '1 година',
    'advancedFeatures.financingCalculator.labels.sevenYears': '7 години',
    'advancedFeatures.financingCalculator.notes.considerPreApproval': 'Размислете за претходно одобрение',
    'advancedFeatures.financingCalculator.notes.ratesSubject': 'Стапките подлежат на промена',
    'advancedSearch.yearTo': 'Година до',
    'auth.accessDenied.insufficientPermissions': 'Недоволни дозволи',
    'countryTest.selectCountryPlaceholder': 'Изберете земја за тестирање',
    'modals.tradeIn.actions.calculateAnother': 'Пресметај друго',
    'modals.tradeIn.actions.done': 'Завршено',
    'modals.tradeIn.actions.getEstimate': 'Добиј проценка',
    'modals.tradeIn.historyCondition': 'Историја и состојба',
    'modals.tradeIn.results.disclaimerText': 'Ова е проценка и не претставува обврзувачка понуда',
    'modals.tradeIn.results.finalEstimate': 'Финална проценка',
    'modals.tradeIn.results.marketValueRange': 'Пазарен опсег на вредност',
    'modals.tradeIn.results.yourVehicleWorth': 'Вашето возило вреди',
    'modals.tradeIn.serviceHistory': 'Сервисна историја',
    'modals.tradeIn.steps.additionalInfo': 'Дополнителни информации',
    'modals.tradeIn.steps.vehicleInfo': 'Информации за возилото',
    'modals.tradeIn.title': 'Оценка за размена',
    'modals.tradeIn.vehicleLocation': 'Локација на возилото',
    'sell.vehicleSpecifications.engine': 'Мотор',
    'sell.vehicleSpecifications.fuelType': 'Тип на гориво',
    'sell.vehicleSpecifications.transmission': 'Менувач'
}

def backup_file(file_path: str):
    """Create a backup of the file before modification"""
    timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
    backup_path = f"{file_path}.backup_remaining_{timestamp}"
    
    try:
        with open(file_path, 'r', encoding='utf-8') as original:
            content = original.read()
        with open(backup_path, 'w', encoding='utf-8') as backup:
            backup.write(content)
        print(f"✓ Backup created: {backup_path}")
        return True
    except Exception as e:
        print(f"⚠️ Failed to create backup for {file_path}: {e}")
        return False

def find_section_end(content: str, section_name: str) -> int:
    """Find the end of a specific section in the translation file"""
    
    # Look for the section
    pattern = f"{section_name}:"
    section_start = content.find(pattern)
    
    if section_start == -1:
        return -1
    
    # Find the opening brace
    brace_start = content.find('{', section_start)
    if brace_start == -1:
        return -1
    
    # Count braces to find the end
    brace_count = 1
    pos = brace_start + 1
    
    while pos < len(content) and brace_count > 0:
        if content[pos] == '{':
            brace_count += 1
        elif content[pos] == '}':
            brace_count -= 1
        pos += 1
    
    return pos - 1 if brace_count == 0 else -1

def add_key_to_nested_section(content: str, key: str, value: str) -> str:
    """Add a key to the appropriate nested section"""
    
    parts = key.split('.')
    
    # Handle nested structures
    if len(parts) >= 2:
        main_section = parts[0]
        
        # Find the main section
        section_end = find_section_end(content, main_section)
        
        if section_end != -1:
            # Calculate proper indentation
            indentation = '  ' * len(parts)  # 2 spaces per nesting level
            new_line = f"\n{indentation}{parts[-1]}: '{value}',"
            
            # Insert before the closing brace
            modified_content = content[:section_end] + new_line + '\n  ' + content[section_end:]
            return modified_content
    
    # Fallback: add at the end of the file
    last_brace = content.rfind('};')
    if last_brace > 0:
        # Simple addition
        new_line = f"\n  // Added missing key\n  '{key}': '{value}',"
        content = content[:last_brace] + new_line + '\n' + content[last_brace:]
    
    return content

def add_keys_to_file(file_path: str, keys_dict: dict, language_name: str) -> int:
    """Add missing keys to a translation file"""
    
    if not os.path.exists(file_path):
        print(f"⚠️ File not found: {file_path}")
        return 0
    
    print(f"\n🔧 Adding {len(keys_dict)} priority keys to {language_name}...")
    
    # Create backup
    if not backup_file(file_path):
        return 0
    
    try:
        # Read the file
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        keys_added = 0
        
        for key, translation in keys_dict.items():
            # Check if key already exists (simple check)
            if f"{key.split('.')[-1]}:" in content:
                print(f"   ⚡ Skipping existing key: {key}")
                continue
            
            print(f"   ➕ Adding: {key}")
            content = add_key_to_nested_section(content, key, translation)
            keys_added += 1
        
        # Write the modified content
        with open(file_path, 'w', encoding='utf-8') as f:
            f.write(content)
        
        print(f"✅ Successfully added {keys_added} keys to {language_name}")
        return keys_added
        
    except Exception as e:
        print(f"❌ Error modifying {file_path}: {e}")
        return 0

def main():
    root_dir = "/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm"
    
    print("🎯 FIXING REMAINING HIGH-PRIORITY MISSING TRANSLATION KEYS")
    print("=" * 70)
    
    translation_files = [
        (
            os.path.join(root_dir, 'shared/translations/sq.ts'),
            ALBANIAN_PRIORITY_KEYS,
            'Albanian'
        ),
        (
            os.path.join(root_dir, 'shared/translations/mk.ts'),
            MACEDONIAN_PRIORITY_KEYS,
            'Macedonian'
        )
    ]
    
    total_added = 0
    
    for file_path, keys_dict, language in translation_files:
        added = add_keys_to_file(file_path, keys_dict, language)
        total_added += added
    
    print(f"\n🎉 SUMMARY")
    print("=" * 40)
    print(f"Total keys added: {total_added}")
    print(f"Albanian priority keys: {len(ALBANIAN_PRIORITY_KEYS)}")
    print(f"Macedonian priority keys: {len(MACEDONIAN_PRIORITY_KEYS)}")
    
    print(f"\n📈 EXPECTED IMPROVEMENTS:")
    print(f"Albanian coverage should improve by ~{len(ALBANIAN_PRIORITY_KEYS)} keys")
    print(f"Macedonian coverage should improve by ~{len(MACEDONIAN_PRIORITY_KEYS)} keys")
    
    print(f"\n✨ NEXT STEPS:")
    print("1. Run translation analysis again to verify improvements")
    print("2. Test the application for 'Missing:' error reduction")
    print("3. Review translations for context accuracy")
    print("4. Consider adding the remaining lower-priority keys")

if __name__ == "__main__":
    main()