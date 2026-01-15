// Test script to verify SellVehicle page translations
import { translate } from './shared/translations.js';

// All translation keys used in SellVehicle component
const sellVehicleKeys = [
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
];

function testTranslations(language) {
    console.log(`\\n=== Testing ${language.toUpperCase()} translations ===`);
    const issues = [];
    
    sellVehicleKeys.forEach(key => {
        try {
            const translation = translate(language, key);
            if (translation.startsWith('Missing:')) {
                issues.push({
                    severity: 'CRITICAL',
                    key: key,
                    issue: 'Missing translation key',
                    translation: translation
                });
            } else if (translation === key) {
                issues.push({
                    severity: 'HIGH',
                    key: key,
                    issue: 'Translation returned untranslated key',
                    translation: translation
                });
            } else if (translation.includes('undefined') || translation.includes('null')) {
                issues.push({
                    severity: 'HIGH',
                    key: key,
                    issue: 'Translation contains undefined/null values',
                    translation: translation
                });
            } else if (/[a-zA-Z]/.test(translation) && language !== 'en') {
                // Check if contains English characters (potential untranslated content)
                const englishCharCount = (translation.match(/[a-zA-Z]/g) || []).length;
                const totalCharCount = translation.length;
                const englishRatio = englishCharCount / totalCharCount;
                
                if (englishRatio > 0.7) { // More than 70% English characters
                    issues.push({
                        severity: 'MEDIUM',
                        key: key,
                        issue: 'Translation contains mostly English characters',
                        translation: translation
                    });
                }
            }
            console.log(`✓ ${key}: "${translation}"`);
        } catch (error) {
            issues.push({
                severity: 'CRITICAL',
                key: key,
                issue: 'Translation function error',
                translation: error.message
            });
        }
    });
    
    return issues;
}

// Test both languages
const mkIssues = testTranslations('mk');
const sqIssues = testTranslations('sq');

// Report results
console.log(`\\n\\n=== TRANSLATION QUALITY REPORT ===`);
console.log(`Total keys tested: ${sellVehicleKeys.length}`);
console.log(`Macedonian issues: ${mkIssues.length}`);
console.log(`Albanian issues: ${sqIssues.length}`);

if (mkIssues.length > 0) {
    console.log(`\\nMACEDONIAN ISSUES:`);
    mkIssues.forEach(issue => {
        console.log(`  [${issue.severity}] ${issue.key}: ${issue.issue} - "${issue.translation}"`);
    });
}

if (sqIssues.length > 0) {
    console.log(`\\nALBANIAN ISSUES:`);
    sqIssues.forEach(issue => {
        console.log(`  [${issue.severity}] ${issue.key}: ${issue.issue} - "${issue.translation}"`);
    });
}

if (mkIssues.length === 0 && sqIssues.length === 0) {
    console.log(`\\n✅ All translations are properly configured!`);
}