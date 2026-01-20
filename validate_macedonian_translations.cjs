/**
 * Comprehensive Macedonian Translation Validation Script
 * Validates that all translation keys used in components exist in the Macedonian translation file
 */

const fs = require('fs');
const path = require('path');

// Configuration
const config = {
    translationFile: './shared/translations/mk.ts',
    pagesDirectory: './client/pages',
    componentsDirectory: './client/components',
    sectionsToTest: [
        {
            name: 'SellVehicle Section',
            files: ['./client/pages/SellVehicle.tsx'],
            expectedKeyPrefix: 'sell',
            criticalKeys: [
                'sell.title',
                'sell.steps.vehicleType',
                'sell.steps.basicInfo',
                'sell.headers.vehicleTypeQuestion',
                'sell.fields.make',
                'sell.fields.model',
                'sell.fields.year',
                'sell.placeholders.selectMake'
            ]
        },
        {
            name: 'ExpressSell Section',
            files: ['./client/pages/ExpressSell.tsx'],
            expectedKeyPrefix: 'expressSell',
            criticalKeys: [
                'expressSell.title',
                'expressSell.carDetails',
                'expressSell.carDetailsDescription',
                'expressSell.makeRequired',
                'expressSell.selectMake'
            ]
        },
        {
            name: 'PrivateDashboard Section',
            files: ['./client/pages/PrivateDashboard.tsx'],
            expectedKeyPrefix: 'privateDashboard',
            criticalKeys: [
                'privateDashboard.title',
                'privateDashboard.subtitle',
                'privateDashboard.savedCars',
                'privateDashboard.yourListings'
            ]
        },
        {
            name: 'Navigation Section',
            files: ['./client/components/Header.tsx', './client/components/Footer.tsx'],
            expectedKeyPrefix: 'navigation',
            criticalKeys: [
                'navigation.backToHome'
            ]
        },
        {
            name: 'Business Section',
            files: ['./client/pages/DealerSignUp.tsx', './client/pages/DealerDashboard.tsx'],
            expectedKeyPrefix: 'business',
            criticalKeys: [
                'business.qualityUsedCars',
                'business.registeredDealers'
            ]
        }
    ]
};

class TranslationValidator {
    constructor() {
        this.translations = null;
        this.allTranslationKeys = new Set();
        this.results = {
            timestamp: new Date().toISOString(),
            sections: [],
            summary: {
                totalSections: 0,
                passedSections: 0,
                overallScore: 0,
                issues: []
            }
        };
    }

    async loadTranslations() {
        try {
            console.log('📖 Loading Macedonian translation file...');
            const translationContent = fs.readFileSync(config.translationFile, 'utf8');
            
            // Extract translation keys from the file
            this.extractTranslationKeys(translationContent);
            
            console.log(`✅ Loaded ${this.allTranslationKeys.size} translation keys`);
            return true;
        } catch (error) {
            console.error(`❌ Failed to load translations: ${error.message}`);
            return false;
        }
    }

    extractTranslationKeys(content) {
        // This is a simplified key extraction - in practice you'd want more robust parsing
        const lines = content.split('\n');
        let currentPath = [];
        
        for (const line of lines) {
            const trimmed = line.trim();
            
            // Track nesting level by counting braces
            if (trimmed.includes(': {')) {
                const keyMatch = trimmed.match(/(\w+):\s*{/);
                if (keyMatch) {
                    currentPath.push(keyMatch[1]);
                }
            } else if (trimmed === '},') {
                currentPath.pop();
            } else if (trimmed.includes(':') && !trimmed.includes('{')) {
                // This is a key-value pair
                const keyMatch = trimmed.match(/(\w+):\s*['"]/);
                if (keyMatch) {
                    const fullKey = [...currentPath, keyMatch[1]].join('.');
                    this.allTranslationKeys.add(fullKey);
                }
            }
        }
    }

    extractTranslationKeysFromFile(filePath) {
        if (!fs.existsSync(filePath)) {
            console.log(`   ⚠️  File not found: ${filePath}`);
            return [];
        }

        try {
            const content = fs.readFileSync(filePath, 'utf8');
            const keys = [];
            
            // Match t('key') and t("key") patterns
            const regex = /t\(['"`]([^'"`]+)['"`]\)/g;
            let match;
            
            while ((match = regex.exec(content)) !== null) {
                keys.push(match[1]);
            }
            
            return [...new Set(keys)]; // Remove duplicates
        } catch (error) {
            console.error(`   ❌ Error reading file ${filePath}: ${error.message}`);
            return [];
        }
    }

    validateSection(section) {
        console.log(`\n🧪 Validating: ${section.name}`);
        
        const sectionResult = {
            name: section.name,
            files: section.files,
            keysFound: [],
            keysMissing: [],
            criticalKeysMissing: [],
            translationCoverage: 0,
            criticalCoverage: 0,
            errors: []
        };

        // Extract keys from all files in this section
        const allUsedKeys = [];
        for (const filePath of section.files) {
            console.log(`   📄 Analyzing: ${filePath}`);
            const keys = this.extractTranslationKeysFromFile(filePath);
            allUsedKeys.push(...keys);
            console.log(`      Found ${keys.length} translation keys`);
        }

        const uniqueUsedKeys = [...new Set(allUsedKeys)];
        console.log(`   📊 Total unique keys used: ${uniqueUsedKeys.length}`);

        // Validate each key exists in translations
        for (const key of uniqueUsedKeys) {
            if (this.allTranslationKeys.has(key)) {
                sectionResult.keysFound.push(key);
                console.log(`      ✅ ${key}`);
            } else {
                sectionResult.keysMissing.push(key);
                console.log(`      ❌ ${key}`);
            }
        }

        // Check critical keys specifically
        for (const criticalKey of section.criticalKeys) {
            if (!this.allTranslationKeys.has(criticalKey)) {
                sectionResult.criticalKeysMissing.push(criticalKey);
                sectionResult.errors.push(`Critical key missing: ${criticalKey}`);
            }
        }

        // Calculate coverage scores
        if (uniqueUsedKeys.length > 0) {
            sectionResult.translationCoverage = Math.round((sectionResult.keysFound.length / uniqueUsedKeys.length) * 100);
        }

        if (section.criticalKeys.length > 0) {
            const criticalFound = section.criticalKeys.length - sectionResult.criticalKeysMissing.length;
            sectionResult.criticalCoverage = Math.round((criticalFound / section.criticalKeys.length) * 100);
        }

        console.log(`   📈 Translation Coverage: ${sectionResult.translationCoverage}%`);
        console.log(`   🎯 Critical Keys Coverage: ${sectionResult.criticalCoverage}%`);

        return sectionResult;
    }

    async runValidation() {
        console.log('🚀 Starting Comprehensive Macedonian Translation Validation');
        console.log('='.repeat(70));

        // Load translations
        const loaded = await this.loadTranslations();
        if (!loaded) {
            console.error('❌ Cannot proceed without loading translations');
            return;
        }

        // Validate each section
        this.results.summary.totalSections = config.sectionsToTest.length;
        
        for (const section of config.sectionsToTest) {
            const sectionResult = this.validateSection(section);
            this.results.sections.push(sectionResult);
            
            // Count as passed if translation coverage >= 80% and critical coverage = 100%
            if (sectionResult.translationCoverage >= 80 && sectionResult.criticalCoverage === 100) {
                this.results.summary.passedSections++;
            }
        }

        this.generateReport();
    }

    generateReport() {
        console.log('\n📊 COMPREHENSIVE VALIDATION REPORT');
        console.log('='.repeat(70));

        // Calculate overall score
        const overallScore = Math.round(
            (this.results.summary.passedSections / this.results.summary.totalSections) * 100
        );
        this.results.summary.overallScore = overallScore;

        console.log(`📈 Overall Results: ${this.results.summary.passedSections}/${this.results.summary.totalSections} sections passed`);
        console.log(`🎯 Overall Quality Score: ${overallScore}%`);

        // Section breakdown
        console.log('\n📋 Detailed Results by Section:');
        this.results.sections.forEach(section => {
            const status = (section.translationCoverage >= 80 && section.criticalCoverage === 100) ? '✅' : '❌';
            console.log(`\n${status} ${section.name.toUpperCase()}`);
            console.log(`   🌍 Translation Coverage: ${section.translationCoverage}%`);
            console.log(`   🎯 Critical Keys Coverage: ${section.criticalCoverage}%`);
            console.log(`   📄 Files Analyzed: ${section.files.length}`);
            
            if (section.keysMissing.length > 0) {
                console.log(`   🚨 Missing Keys (${section.keysMissing.length}):`);
                section.keysMissing.slice(0, 5).forEach(key => {
                    console.log(`      - ${key}`);
                });
                if (section.keysMissing.length > 5) {
                    console.log(`      ... and ${section.keysMissing.length - 5} more`);
                }
            }
            
            if (section.criticalKeysMissing.length > 0) {
                console.log(`   💥 CRITICAL MISSING KEYS:`);
                section.criticalKeysMissing.forEach(key => {
                    console.log(`      - ${key}`);
                });
            }
        });

        this.generateRecommendations();
        this.saveReport();
    }

    generateRecommendations() {
        console.log('\n💡 RECOMMENDATIONS & NEXT STEPS:');
        console.log('='.repeat(70));

        const overallScore = this.results.summary.overallScore;

        if (overallScore >= 90) {
            console.log('🎉 EXCELLENT: Macedonian translations are production-ready!');
            console.log('✅ All critical functionality properly translated');
            console.log('✅ High coverage across all sections');
        } else if (overallScore >= 75) {
            console.log('⚠️  GOOD: Minor translation gaps, recommend fixes before production');
            console.log('🔍 Address missing translation keys identified above');
        } else if (overallScore >= 50) {
            console.log('🚨 NEEDS WORK: Significant translation gaps found');
            console.log('🛠️  Critical missing keys must be added');
        } else {
            console.log('🚨 CRITICAL: Major translation gaps, DO NOT deploy');
            console.log('🛑 Immediate action required to add missing translations');
        }

        console.log('\n🎯 Immediate Action Items:');
        console.log('1. Add any critical missing translation keys identified above');
        console.log('2. Complete missing translations in sections with <80% coverage');
        console.log('3. Test actual page rendering with browser automation');
        console.log('4. Verify responsive layouts with Macedonian text');
        console.log('5. Conduct cross-browser compatibility testing');
        console.log('6. Get native Macedonian speaker feedback');

        // Section-specific recommendations
        const failingSections = this.results.sections.filter(s => 
            s.translationCoverage < 80 || s.criticalCoverage < 100
        );
        
        if (failingSections.length > 0) {
            console.log('\n🚨 PRIORITY FIXES NEEDED:');
            failingSections.forEach(section => {
                console.log(`   ❌ ${section.name}:`);
                if (section.criticalKeysMissing.length > 0) {
                    console.log(`      🔥 Add critical keys: ${section.criticalKeysMissing.join(', ')}`);
                }
                if (section.translationCoverage < 80) {
                    console.log(`      📝 Complete ${section.keysMissing.length} missing translations`);
                }
            });
        }
    }

    saveReport() {
        const reportPath = `./macedonian_translation_validation_report_${Date.now()}.json`;
        try {
            fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
            console.log(`\n💾 Detailed validation report saved to: ${reportPath}`);
        } catch (error) {
            console.error(`❌ Failed to save report: ${error.message}`);
        }
    }
}

// Run the validation
async function main() {
    const validator = new TranslationValidator();
    await validator.runValidation();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { TranslationValidator, config };
} else {
    main().catch(console.error);
}