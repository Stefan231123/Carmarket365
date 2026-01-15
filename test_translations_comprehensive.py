#!/usr/bin/env python3
"""
Comprehensive translation testing for SellVehicle component.
Tests both Macedonian and Albanian translations for completeness and quality.
"""

import re
import json
from typing import Dict, List, Any, Optional

# All translation keys used in SellVehicle component
SELL_VEHICLE_KEYS = [
    'common.back',
    'sellVehicle.title',
    'sell.vehicleTypes.car.name',
    'sell.vehicleTypes.truck.name',
    'sell.vehicleTypes.motorbike.name',
    'sell.steps.vehicleType',
    'sell.steps.basicInfo',
    'sell.steps.details',
    'sell.steps.photosAndContact',
    'sell.headers.vehicleTypeQuestion',
    'sell.headers.basicInformation',
    'sell.headers.vehicleDetails',
    'sell.headers.photosAndContactInfo',
    'sell.headers.uploadVehiclePhotos',
    'sell.headers.addUpToTenPhotos',
    'sell.fields.make',
    'sell.fields.model',
    'sell.fields.year',
    'sell.fields.mileage',
    'sell.fields.fuelType',
    'sell.fields.transmission',
    'sell.fields.condition',
    'sell.fields.askingPrice',
    'sell.fields.description',
    'sell.fields.contactName',
    'sell.fields.phoneNumber',
    'sell.fields.emailAddress',
    'sell.fields.location',
    'sell.placeholders.selectMake',
    'sell.placeholders.enterModel',
    'sell.placeholders.selectYear',
    'sell.placeholders.enterMileage',
    'sell.placeholders.selectFuelType',
    'sell.placeholders.selectTransmission',
    'sell.placeholders.selectCondition',
    'sell.placeholders.enterAskingPrice',
    'sell.placeholders.describeYourVehicle',
    'sell.placeholders.choosePhotos',
    'sell.placeholders.yourName',
    'sell.placeholders.yourPhoneNumber',
    'sell.placeholders.yourEmail',
    'sell.placeholders.cityCountry',
    'sell.buttons.nextStep',
    'sell.buttons.previous',
    'sell.buttons.createListing',
    'sell.fuelTypes.gasoline',
    'sell.fuelTypes.diesel',
    'sell.fuelTypes.electric',
    'sell.fuelTypes.hybrid',
    'sell.transmissions.manual',
    'sell.transmissions.automatic',
    'sell.conditions.excellent',
    'sell.conditions.veryGood',
    'sell.conditions.good',
    'sell.conditions.fair',
]

# English words that shouldn't appear in translated content
ENGLISH_WORDS = [
    'what', 'type', 'vehicle', 'selling', 'basic', 'information', 'details',
    'photos', 'contact', 'upload', 'choose', 'next', 'step', 'previous',
    'create', 'listing', 'make', 'model', 'year', 'mileage', 'fuel',
    'transmission', 'condition', 'price', 'description', 'name', 'phone',
    'email', 'location', 'select', 'enter', 'your', 'city', 'country',
    'car', 'truck', 'motorbike', 'excellent', 'good', 'fair', 'manual',
    'automatic', 'gasoline', 'diesel', 'electric', 'hybrid', 'back'
]

class TranslationTester:
    def __init__(self):
        self.results = {
            'macedonian': {'issues': [], 'passed': 0, 'failed': 0},
            'albanian': {'issues': [], 'passed': 0, 'failed': 0},
            'summary': {'total_keys': len(SELL_VEHICLE_KEYS), 'languages': 2}
        }

    def find_translation_value(self, content: str, key: str) -> Optional[str]:
        """Find the translation value for a given key in the file content."""
        # Split the key into parts
        key_parts = key.split('.')
        
        # Build regex pattern to find the nested key
        pattern = self._build_nested_pattern(key_parts)
        
        # Search for the pattern
        match = re.search(pattern, content, re.MULTILINE | re.DOTALL)
        if match:
            value = match.group(1)
            # Clean up the value (remove quotes, trim)
            value = re.sub(r"^['\"]|['\"]$", '', value.strip())
            return value if value else None
        return None

    def _build_nested_pattern(self, key_parts: List[str]) -> str:
        """Build a regex pattern for nested keys."""
        if len(key_parts) == 1:
            # Simple key: value pattern
            return rf"{key_parts[0]}:\s*['\"]([^'\"]+)['\"]"
        
        # For nested keys, we need to match the structure
        # This is a simplified approach that looks for the final key
        final_key = key_parts[-1]
        return rf"{final_key}:\s*['\"]([^'\"]+)['\"]"

    def test_translation_value(self, value: str, key: str, language: str) -> Dict[str, Any]:
        """Test a translation value for quality issues."""
        if not value:
            return {
                'status': 'MISSING',
                'issue': f'Missing translation for key: {key}',
                'severity': 'CRITICAL',
                'value': None
            }
        
        if len(value.strip()) == 0:
            return {
                'status': 'EMPTY',
                'issue': 'Translation is empty',
                'severity': 'HIGH',
                'value': value
            }
        
        # Check for English words in non-English languages
        if language != 'en':
            found_english = []
            value_lower = value.lower()
            for word in ENGLISH_WORDS:
                if re.search(rf'\b{word.lower()}\b', value_lower):
                    found_english.append(word)
            
            if found_english:
                return {
                    'status': 'SUSPICIOUS',
                    'issue': f'Contains English words: {", ".join(found_english)}',
                    'severity': 'MEDIUM',
                    'value': value
                }
        
        return {
            'status': 'OK',
            'issue': None,
            'severity': None,
            'value': value
        }

    def test_language_file(self, file_path: str, language: str, language_name: str):
        """Test a translation file for all SellVehicle keys."""
        print(f"\n=== Testing {language_name} translations ===")
        
        try:
            with open(file_path, 'r', encoding='utf-8') as f:
                content = f.read()
        except FileNotFoundError:
            print(f"Error: Could not find translation file: {file_path}")
            return
        except Exception as e:
            print(f"Error reading file {file_path}: {e}")
            return

        lang_results = {'issues': [], 'passed': 0, 'failed': 0}
        
        for key in SELL_VEHICLE_KEYS:
            value = self.find_translation_value(content, key)
            result = self.test_translation_value(value, key, language)
            
            if result['status'] == 'OK':
                lang_results['passed'] += 1
                print(f"✓ {key}: \"{result['value']}\"")
            else:
                lang_results['failed'] += 1
                lang_results['issues'].append({
                    'key': key,
                    **result
                })
                print(f"✗ {key}: {result['issue']} ({result['status']})")
                if result['value']:
                    print(f"  Current value: \"{result['value']}\"")
        
        # Store results
        if language == 'mk':
            self.results['macedonian'] = lang_results
        elif language == 'sq':
            self.results['albanian'] = lang_results

    def generate_report(self):
        """Generate a comprehensive quality report."""
        print('\n\n=== COMPREHENSIVE TRANSLATION QUALITY REPORT ===\n')
        
        # Overall statistics
        total_keys = self.results['summary']['total_keys']
        mk_results = self.results['macedonian']
        sq_results = self.results['albanian']
        
        print('Overall Statistics:')
        print(f"- Total translation keys tested: {total_keys}")
        print(f"- Languages tested: {self.results['summary']['languages']}")
        
        print('\nMacedonian (mk) Results:')
        print(f"- Passed: {mk_results['passed']}/{total_keys}")
        print(f"- Failed: {mk_results['failed']}/{total_keys}")
        print(f"- Success rate: {(mk_results['passed'] / total_keys * 100):.1f}%")
        
        print('\nAlbanian (sq) Results:')
        print(f"- Passed: {sq_results['passed']}/{total_keys}")
        print(f"- Failed: {sq_results['failed']}/{total_keys}")
        print(f"- Success rate: {(sq_results['passed'] / total_keys * 100):.1f}%")
        
        # Collect all issues
        all_issues = mk_results['issues'] + sq_results['issues']
        critical_issues = [i for i in all_issues if i['severity'] == 'CRITICAL']
        high_issues = [i for i in all_issues if i['severity'] == 'HIGH']
        medium_issues = [i for i in all_issues if i['severity'] == 'MEDIUM']
        
        print('\nIssues by Severity:')
        print(f"- Critical (Missing): {len(critical_issues)}")
        print(f"- High (Invalid): {len(high_issues)}")
        print(f"- Medium (Suspicious): {len(medium_issues)}")
        
        # Report critical issues
        if critical_issues:
            print('\n🚨 CRITICAL ISSUES (Missing translations):')
            for i, issue in enumerate(critical_issues, 1):
                lang = 'Macedonian' if issue in mk_results['issues'] else 'Albanian'
                print(f"{i}. [{lang}] {issue['key']}: {issue['issue']}")
        
        # Report high issues
        if high_issues:
            print('\n⚠️  HIGH ISSUES (Invalid translations):')
            for i, issue in enumerate(high_issues, 1):
                lang = 'Macedonian' if issue in mk_results['issues'] else 'Albanian'
                print(f"{i}. [{lang}] {issue['key']}: {issue['issue']}")
        
        # Report medium issues
        if medium_issues:
            print('\n💡 MEDIUM ISSUES (Potential improvements):')
            for i, issue in enumerate(medium_issues, 1):
                lang = 'Macedonian' if issue in mk_results['issues'] else 'Albanian'
                print(f"{i}. [{lang}] {issue['key']}: {issue['issue']}")
                print(f"   Current: \"{issue['value']}\"")
        
        # Overall assessment
        total_passed = mk_results['passed'] + sq_results['passed']
        total_tests = total_keys * 2
        overall_success_rate = (total_passed / total_tests) * 100
        
        print('\n=== QUALITY ASSESSMENT ===')
        if overall_success_rate >= 95:
            print('🟢 EXCELLENT: Translation quality is excellent')
        elif overall_success_rate >= 85:
            print('🟡 GOOD: Translation quality is good with minor issues')
        elif overall_success_rate >= 70:
            print('🟠 FAIR: Translation quality needs improvement')
        else:
            print('🔴 POOR: Translation quality needs significant work')
        
        print(f"Overall success rate: {overall_success_rate:.1f}%")
        
        # Browser testing recommendations
        print('\n=== BROWSER TESTING RECOMMENDATIONS ===')
        print('To complete the translation testing:')
        print('1. Open the SellVehicle page: http://localhost:8082/sell-vehicle')
        print('2. Test with Macedonian: http://localhost:8082/sell-vehicle?lang=mk')
        print('3. Test with Albanian: http://localhost:8082/sell-vehicle?lang=sq')
        print('4. Verify that:')
        print('   - All step labels are translated correctly')
        print('   - Form field labels and placeholders show in the selected language')
        print('   - Button text changes to the selected language')
        print('   - No English text remains visible')
        print('   - Language switching works properly')
        
        # Recommendations
        print('\n=== NEXT STEPS ===')
        if critical_issues:
            print('❗ URGENT: Fix missing translations before deployment')
        if high_issues:
            print('⚠️  Address invalid translation values')
        if medium_issues:
            print('💡 Review and improve potentially problematic translations')
        if not all_issues:
            print('✅ All translations found! Proceed with browser testing')
        
        return {
            'overall_success_rate': overall_success_rate,
            'total_issues': len(all_issues),
            'critical_issues': len(critical_issues),
            'high_issues': len(high_issues),
            'medium_issues': len(medium_issues)
        }

def main():
    """Main testing function."""
    tester = TranslationTester()
    
    print("=== SellVehicle Translation Quality Testing ===")
    print(f"Testing {len(SELL_VEHICLE_KEYS)} translation keys across 2 languages")
    
    # Test Macedonian
    tester.test_language_file('shared/translations/mk.ts', 'mk', 'Macedonian')
    
    # Test Albanian
    tester.test_language_file('shared/translations/sq.ts', 'sq', 'Albanian')
    
    # Generate comprehensive report
    report = tester.generate_report()
    
    # Return summary for CI/CD systems
    if report['critical_issues'] > 0:
        exit(1)  # Fail if there are critical issues
    elif report['high_issues'] > 0:
        exit(2)  # Warning if there are high issues
    else:
        exit(0)  # Success

if __name__ == '__main__':
    main()