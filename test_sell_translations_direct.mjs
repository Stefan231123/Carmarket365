// Direct translation testing for SellVehicle component
import fs from 'fs';
import path from 'path';

// Parse TypeScript translation files
function parseTranslationFile(filePath) {
    try {
        const content = fs.readFileSync(filePath, 'utf8');
        
        // Remove TypeScript-specific syntax and comments
        const cleaned = content
            .replace(/^import.*$/gm, '')
            .replace(/^export.*$/gm, '')
            .replace(/\/\*[\s\S]*?\*\//g, '')
            .replace(/\/\/.*$/gm, '')
            .replace(/as const/g, '')
            .replace(/;\s*$/, '');
        
        // Extract the main object
        const objectMatch = cleaned.match(/=\s*({[\s\S]*})/);
        if (objectMatch) {
            // Use eval to parse the object (unsafe but ok for testing)
            try {
                return eval(`(${objectMatch[1]})`);
            } catch (e) {
                console.warn(`Failed to parse ${filePath}:`, e.message);
                return null;
            }
        }
        return null;
    } catch (error) {
        console.error(`Error reading ${filePath}:`, error.message);
        return null;
    }
}

// Translation key lookup function
function getNestedValue(obj, keyPath) {
    return keyPath.split('.').reduce((current, key) => {
        return current && current[key] !== undefined ? current[key] : undefined;
    }, obj);
}

// Test translation function
function testTranslation(translations, key, language) {
    const value = getNestedValue(translations, key);
    
    if (value === undefined || value === null) {
        return {
            status: 'MISSING',
            value: null,
            issue: `Missing translation key: ${key}`,
            severity: 'CRITICAL'
        };
    }
    
    if (typeof value !== 'string') {
        return {
            status: 'INVALID',
            value: value,
            issue: `Translation key returns non-string value: ${typeof value}`,
            severity: 'HIGH'
        };
    }
    
    if (value.trim().length === 0) {
        return {
            status: 'EMPTY',
            value: value,
            issue: 'Translation key returns empty string',
            severity: 'HIGH'
        };
    }
    
    // Check for potential English content in non-English languages
    if (language !== 'en') {
        const englishWords = [
            'what', 'type', 'vehicle', 'selling', 'basic', 'information', 'details',
            'photos', 'contact', 'upload', 'choose', 'next', 'step', 'previous',
            'create', 'listing', 'make', 'model', 'year', 'mileage', 'fuel',
            'transmission', 'condition', 'price', 'description', 'name', 'phone',
            'email', 'location', 'select', 'enter', 'your', 'city', 'country'
        ];
        
        const lowerValue = value.toLowerCase();
        const foundEnglish = englishWords.filter(word => 
            lowerValue.includes(word.toLowerCase())
        );
        
        if (foundEnglish.length > 0) {
            return {
                status: 'SUSPICIOUS',
                value: value,
                issue: `Contains potential English words: ${foundEnglish.join(', ')}`,
                severity: 'MEDIUM'
            };
        }
    }
    
    return {
        status: 'OK',
        value: value,
        issue: null,
        severity: null
    };
}

// Main test function
function runTranslationTests() {
    console.log('=== SellVehicle Translation Quality Test ===\\n');
    
    // Load translation files
    const mkTranslations = parseTranslationFile('shared/translations/mk.ts');
    const sqTranslations = parseTranslationFile('shared/translations/sq.ts');
    const enTranslations = parseTranslationFile('shared/translations/en.ts');
    
    if (!mkTranslations || !sqTranslations) {
        console.error('Failed to load translation files');
        return;
    }
    
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
    
    const results = {
        macedonian: { issues: [], passed: 0, failed: 0 },
        albanian: { issues: [], passed: 0, failed: 0 },
        summary: { totalKeys: sellVehicleKeys.length, languages: 2 }
    };
    
    // Test each language
    function testLanguage(translations, language, languageName) {
        console.log(`Testing ${languageName} translations...`);
        const langResults = { issues: [], passed: 0, failed: 0 };
        
        sellVehicleKeys.forEach(key => {
            const result = testTranslation(translations, key, language);
            
            if (result.status === 'OK') {
                langResults.passed++;
                console.log(`✓ ${key}: "${result.value}"`);
            } else {
                langResults.failed++;
                langResults.issues.push({
                    key: key,
                    ...result
                });
                console.log(`✗ ${key}: ${result.issue} (${result.status})`);
                if (result.value) {
                    console.log(`  Current value: "${result.value}"`);
                }
            }
        });
        
        return langResults;
    }
    
    // Run tests
    results.macedonian = testLanguage(mkTranslations, 'mk', 'Macedonian');
    console.log('\\n');
    results.albanian = testLanguage(sqTranslations, 'sq', 'Albanian');
    
    // Generate report
    console.log('\\n\\n=== COMPREHENSIVE QUALITY REPORT ===\\n');
    
    console.log('Overall Statistics:');
    console.log(`- Total translation keys tested: ${results.summary.totalKeys}`);
    console.log(`- Languages tested: ${results.summary.languages}`);
    
    console.log('\\nMacedonian (mk) Results:');
    console.log(`- Passed: ${results.macedonian.passed}/${results.summary.totalKeys}`);
    console.log(`- Failed: ${results.macedonian.failed}/${results.summary.totalKeys}`);
    console.log(`- Success rate: ${((results.macedonian.passed / results.summary.totalKeys) * 100).toFixed(1)}%`);
    
    console.log('\\nAlbanian (sq) Results:');
    console.log(`- Passed: ${results.albanian.passed}/${results.summary.totalKeys}`);
    console.log(`- Failed: ${results.albanian.failed}/${results.summary.totalKeys}`);
    console.log(`- Success rate: ${((results.albanian.passed / results.summary.totalKeys) * 100).toFixed(1)}%`);
    
    // Report issues by severity
    const allIssues = [...results.macedonian.issues, ...results.albanian.issues];
    const criticalIssues = allIssues.filter(i => i.severity === 'CRITICAL');
    const highIssues = allIssues.filter(i => i.severity === 'HIGH');
    const mediumIssues = allIssues.filter(i => i.severity === 'MEDIUM');
    
    console.log('\\nIssues by Severity:');
    console.log(`- Critical: ${criticalIssues.length}`);
    console.log(`- High: ${highIssues.length}`);
    console.log(`- Medium: ${mediumIssues.length}`);
    
    if (criticalIssues.length > 0) {
        console.log('\\n🚨 CRITICAL ISSUES (Missing translations):');
        criticalIssues.forEach((issue, index) => {
            console.log(`${index + 1}. ${issue.key}: ${issue.issue}`);
        });
    }
    
    if (highIssues.length > 0) {
        console.log('\\n⚠️  HIGH ISSUES (Invalid translations):');
        highIssues.forEach((issue, index) => {
            console.log(`${index + 1}. ${issue.key}: ${issue.issue}`);
        });
    }
    
    if (mediumIssues.length > 0) {
        console.log('\\n💡 MEDIUM ISSUES (Potential improvements):');
        mediumIssues.forEach((issue, index) => {
            console.log(`${index + 1}. ${issue.key}: ${issue.issue}`);
            console.log(`   Current: "${issue.value}"`);
        });
    }
    
    // Overall assessment
    console.log('\\n=== QUALITY ASSESSMENT ===');
    const totalPassed = results.macedonian.passed + results.albanian.passed;
    const totalTests = results.summary.totalKeys * results.summary.languages;
    const overallSuccessRate = (totalPassed / totalTests) * 100;
    
    if (overallSuccessRate >= 95) {
        console.log('🟢 EXCELLENT: Translation quality is excellent');
    } else if (overallSuccessRate >= 85) {
        console.log('🟡 GOOD: Translation quality is good with minor issues');
    } else if (overallSuccessRate >= 70) {
        console.log('🟠 FAIR: Translation quality needs improvement');
    } else {
        console.log('🔴 POOR: Translation quality needs significant work');
    }
    
    console.log(`Overall success rate: ${overallSuccessRate.toFixed(1)}%`);
    
    // Recommendations
    console.log('\\n=== RECOMMENDATIONS ===');
    if (criticalIssues.length > 0) {
        console.log('1. Fix all missing translation keys before deployment');
    }
    if (highIssues.length > 0) {
        console.log('2. Address invalid translation values');
    }
    if (mediumIssues.length > 0) {
        console.log('3. Review potential English content in translated strings');
    }
    if (allIssues.length === 0) {
        console.log('✅ All SellVehicle translations are properly configured!');
        console.log('💡 Consider testing the page in browser to verify UI rendering');
    }
    
    return results;
}

// Run the test
runTranslationTests();