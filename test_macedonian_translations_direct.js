/**
 * Direct Macedonian Translation Testing
 * Tests the actual running application for translation verification
 */

const puppeteer = require('puppeteer');
const fs = require('fs');

const testConfig = {
    baseUrl: 'http://localhost:8084',
    language: 'mk',
    timeout: 15000,
    slowMo: 100 // Slow down for debugging
};

const testSections = [
    {
        name: 'SellVehicle Section',
        url: '/sell-vehicle',
        translationKeys: [
            'Продај го вашето возило',
            'Основни информации', 
            'Детали за возилото',
            'Прикачи слики',
            'Ценообразување',
            'марка',
            'модел', 
            'година',
            'пробег'
        ],
        formElements: ['input[name="make"]', 'input[name="model"]', 'input[name="year"]'],
        expectedButtons: ['button', 'input[type="submit"]']
    },
    {
        name: 'ExpressSell Section',
        url: '/express-sell',
        translationKeys: [
            'Продајте го вашиот автомобил брзо',
            'Детали за автомобилот',
            'Фотографии и контакт',
            'Марка',
            'Модел',
            'Цена',
            'внесете',
            'изберете'
        ],
        formElements: ['select', 'input[type="text"]', 'input[type="number"]'],
        expectedButtons: ['button[type="submit"]', 'button[type="button"]']
    },
    {
        name: 'PrivateDashboard Section',
        url: '/private-dashboard', 
        translationKeys: [
            'Мој контролен панел',
            'Зачувани автомобили',
            'Вашите огласи',
            'Експресна продажба',
            'Поставки',
            'Погледни детали'
        ],
        navigationElements: ['nav', '.dashboard-menu', '.tab'],
        expectedButtons: ['button', 'a[role="button"]']
    },
    {
        name: 'Navigation Section',
        url: '/',
        translationKeys: [
            'Назад на почетна'
        ],
        navigationElements: ['header', 'nav', '.navbar'],
        expectedButtons: ['button', 'a']
    },
    {
        name: 'Business Section',
        url: '/dealer-signup',
        translationKeys: [
            'регистрирани дилери',
            'Квалитетни употребувани автомобили'
        ],
        formElements: ['input', 'select', 'textarea'],
        expectedButtons: ['button[type="submit"]']
    }
];

class DirectMacedonianTester {
    constructor() {
        this.browser = null;
        this.page = null;
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

    async initialize() {
        console.log('🚀 Starting Direct Macedonian Translation Testing');
        console.log(`📍 Base URL: ${testConfig.baseUrl}`);
        console.log(`🌍 Language: ${testConfig.language}`);
        console.log('='.repeat(60));

        try {
            this.browser = await puppeteer.launch({
                headless: false, // Set to true for automated testing
                slowMo: testConfig.slowMo,
                args: ['--no-sandbox', '--disable-setuid-sandbox']
            });
            this.page = await this.browser.newPage();
            await this.page.setViewport({ width: 1920, height: 1080 });
            
            // Set user agent to avoid bot detection
            await this.page.setUserAgent('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36');
            
            return true;
        } catch (error) {
            console.error('❌ Failed to initialize browser:', error.message);
            return false;
        }
    }

    async testSection(section) {
        console.log(`\n🧪 Testing: ${section.name}`);
        
        const sectionResult = {
            name: section.name,
            url: section.url,
            accessible: false,
            translationScore: 0,
            functionalityScore: 0,
            layoutScore: 0,
            foundTranslations: [],
            missingTranslations: [],
            functionalElements: {
                found: [],
                missing: []
            },
            errors: [],
            screenshots: []
        };

        try {
            const fullUrl = `${testConfig.baseUrl}${section.url}?lang=${testConfig.language}`;
            console.log(`  📄 Loading: ${fullUrl}`);
            
            // Navigate to page
            await this.page.goto(fullUrl, { 
                waitUntil: 'networkidle0',
                timeout: testConfig.timeout 
            });
            
            sectionResult.accessible = true;
            
            // Wait for content to load
            await this.page.waitForTimeout(2000);
            
            // Take screenshot
            const screenshotPath = `/tmp/test_${section.name.replace(/\s+/g, '_')}_${Date.now()}.png`;
            await this.page.screenshot({ 
                path: screenshotPath,
                fullPage: true 
            });
            sectionResult.screenshots.push(screenshotPath);
            
            // Test translations
            await this.testTranslations(section, sectionResult);
            
            // Test functionality
            await this.testFunctionality(section, sectionResult);
            
            // Test layout
            await this.testLayout(sectionResult);
            
            // Calculate scores
            this.calculateSectionScores(section, sectionResult);
            
            console.log(`  ✅ Completed testing ${section.name}`);
            console.log(`     Translation: ${sectionResult.translationScore}%`);
            console.log(`     Functionality: ${sectionResult.functionalityScore}%`);
            console.log(`     Layout: ${sectionResult.layoutScore}%`);
            
        } catch (error) {
            console.error(`  ❌ Error testing ${section.name}:`, error.message);
            sectionResult.errors.push(error.message);
        }
        
        this.results.sections.push(sectionResult);
        return sectionResult;
    }

    async testTranslations(section, result) {
        console.log('    🔍 Checking translations...');
        
        try {
            // Get page content
            const pageContent = await this.page.content();
            
            // Check for expected Macedonian translations
            for (const translationKey of section.translationKeys) {
                if (pageContent.includes(translationKey)) {
                    result.foundTranslations.push(translationKey);
                    console.log(`      ✅ Found: "${translationKey}"`);
                } else {
                    result.missingTranslations.push(translationKey);
                    console.log(`      ❌ Missing: "${translationKey}"`);
                }
            }
            
            // Check for remaining English text (fallbacks)
            const englishPatterns = [
                /\b(Car|Vehicle|Sell|Buy|Make|Model|Year|Price|Contact|Submit)\b/g,
                /\b(Dashboard|Settings|Profile|Save|Edit|Delete)\b/g
            ];
            
            let englishFallbackCount = 0;
            for (const pattern of englishPatterns) {
                const matches = pageContent.match(pattern);
                if (matches) {
                    englishFallbackCount += matches.length;
                    console.log(`      ⚠️  English fallbacks found: ${matches.slice(0, 3).join(', ')}${matches.length > 3 ? '...' : ''}`);
                }
            }
            
            if (englishFallbackCount > 5) {
                result.errors.push(`Too many English fallbacks detected (${englishFallbackCount})`);
            }
            
        } catch (error) {
            console.error('    ❌ Translation check failed:', error.message);
            result.errors.push(`Translation check failed: ${error.message}`);
        }
    }

    async testFunctionality(section, result) {
        console.log('    🔧 Testing functionality...');
        
        try {
            // Test form elements if present
            if (section.formElements) {
                for (const selector of section.formElements) {
                    try {
                        const elements = await this.page.$$(selector);
                        if (elements.length > 0) {
                            result.functionalElements.found.push(selector);
                            console.log(`      ✅ Found functional element: ${selector} (${elements.length})`);
                        } else {
                            result.functionalElements.missing.push(selector);
                            console.log(`      ❌ Missing functional element: ${selector}`);
                        }
                    } catch (error) {
                        result.functionalElements.missing.push(selector);
                    }
                }
            }
            
            // Test buttons
            if (section.expectedButtons) {
                for (const buttonSelector of section.expectedButtons) {
                    try {
                        const buttons = await this.page.$$(buttonSelector);
                        if (buttons.length > 0) {
                            result.functionalElements.found.push(buttonSelector);
                            // Test if button is clickable
                            const firstButton = buttons[0];
                            const isClickable = await this.page.evaluate((btn) => {
                                return !btn.disabled && btn.offsetHeight > 0;
                            }, firstButton);
                            
                            if (isClickable) {
                                console.log(`      ✅ Button functional: ${buttonSelector}`);
                            } else {
                                console.log(`      ⚠️  Button present but not clickable: ${buttonSelector}`);
                            }
                        }
                    } catch (error) {
                        result.functionalElements.missing.push(buttonSelector);
                    }
                }
            }
            
        } catch (error) {
            console.error('    ❌ Functionality test failed:', error.message);
            result.errors.push(`Functionality test failed: ${error.message}`);
        }
    }

    async testLayout(result) {
        console.log('    📱 Testing layout integrity...');
        
        try {
            // Check for common layout issues
            const layoutChecks = await this.page.evaluate(() => {
                const issues = [];
                
                // Check for overflow
                const elements = document.querySelectorAll('*');
                let overflowCount = 0;
                elements.forEach(el => {
                    if (el.scrollWidth > el.clientWidth) {
                        overflowCount++;
                    }
                });
                
                if (overflowCount > 3) {
                    issues.push(`Text overflow detected in ${overflowCount} elements`);
                }
                
                // Check for invisible text
                const textElements = document.querySelectorAll('p, span, div, h1, h2, h3, h4, h5, h6');
                let invisibleCount = 0;
                textElements.forEach(el => {
                    if (el.textContent.trim() && window.getComputedStyle(el).visibility === 'hidden') {
                        invisibleCount++;
                    }
                });
                
                if (invisibleCount > 0) {
                    issues.push(`${invisibleCount} text elements are invisible`);
                }
                
                return issues;
            });
            
            if (layoutChecks.length > 0) {
                result.errors.push(...layoutChecks);
                console.log(`      ⚠️  Layout issues: ${layoutChecks.join(', ')}`);
            } else {
                console.log('      ✅ Layout integrity good');
            }
            
        } catch (error) {
            console.error('    ❌ Layout test failed:', error.message);
            result.errors.push(`Layout test failed: ${error.message}`);
        }
    }

    calculateSectionScores(section, result) {
        // Translation Score
        const foundCount = result.foundTranslations.length;
        const totalCount = section.translationKeys.length;
        result.translationScore = Math.round((foundCount / totalCount) * 100);
        
        // Functionality Score
        const functionalFound = result.functionalElements.found.length;
        const functionalTotal = (section.formElements?.length || 0) + (section.expectedButtons?.length || 0);
        result.functionalityScore = functionalTotal > 0 ? Math.round((functionalFound / functionalTotal) * 100) : 100;
        
        // Layout Score (penalize for errors)
        result.layoutScore = Math.max(0, 100 - (result.errors.filter(e => e.includes('overflow') || e.includes('invisible')).length * 20));
        
        // Overall section score
        result.overallScore = Math.round((result.translationScore + result.functionalityScore + result.layoutScore) / 3);
    }

    async runAllTests() {
        const initialized = await this.initialize();
        if (!initialized) {
            console.error('❌ Failed to initialize testing environment');
            return;
        }

        try {
            this.results.summary.totalSections = testSections.length;
            
            for (const section of testSections) {
                await this.testSection(section);
                
                // Brief pause between tests
                await this.page.waitForTimeout(1000);
            }
            
            this.generateFinalReport();
            
        } catch (error) {
            console.error('❌ Testing failed:', error.message);
        } finally {
            if (this.browser) {
                await this.browser.close();
            }
        }
    }

    generateFinalReport() {
        console.log('\n📊 COMPREHENSIVE TEST REPORT');
        console.log('='.repeat(60));
        
        // Calculate overall statistics
        const passedSections = this.results.sections.filter(s => s.overallScore >= 80).length;
        const overallScore = Math.round(
            this.results.sections.reduce((sum, s) => sum + s.overallScore, 0) / this.results.sections.length
        );
        
        this.results.summary.passedSections = passedSections;
        this.results.summary.overallScore = overallScore;
        
        console.log(`📈 Overall Results: ${passedSections}/${this.results.summary.totalSections} sections passed`);
        console.log(`🎯 Overall Quality Score: ${overallScore}%`);
        
        // Section breakdown
        console.log('\n📋 Section-by-Section Results:');
        this.results.sections.forEach(section => {
            const status = section.overallScore >= 80 ? '✅' : section.overallScore >= 60 ? '⚠️' : '❌';
            console.log(`\n${status} ${section.name.toUpperCase()} (${section.overallScore}%)`);
            console.log(`   🌍 Translation Coverage: ${section.translationScore}%`);
            console.log(`   🔧 Functionality: ${section.functionalityScore}%`);
            console.log(`   📱 Layout Integrity: ${section.layoutScore}%`);
            
            if (section.missingTranslations.length > 0) {
                console.log(`   🚨 Missing Translations: ${section.missingTranslations.slice(0, 3).join(', ')}${section.missingTranslations.length > 3 ? '...' : ''}`);
            }
            
            if (section.errors.length > 0) {
                console.log(`   ⚠️  Issues: ${section.errors.slice(0, 2).join(', ')}${section.errors.length > 2 ? '...' : ''}`);
            }
        });
        
        // Generate recommendations
        this.generateRecommendations(overallScore);
        
        // Save results to file
        const reportPath = `/tmp/macedonian_translation_test_report_${Date.now()}.json`;
        fs.writeFileSync(reportPath, JSON.stringify(this.results, null, 2));
        console.log(`\n💾 Detailed results saved to: ${reportPath}`);
    }

    generateRecommendations(overallScore) {
        console.log('\n💡 RECOMMENDATIONS & NEXT STEPS:');
        console.log('='.repeat(60));
        
        if (overallScore >= 90) {
            console.log('🎉 EXCELLENT: Macedonian translations are production-ready!');
            console.log('✅ High translation coverage across all sections');
            console.log('✅ Functionality working correctly');
            console.log('✅ Layout integrity maintained');
        } else if (overallScore >= 75) {
            console.log('⚠️  GOOD: Minor issues found, recommend fixes before production');
            console.log('🔍 Address missing translations and functionality issues');
        } else if (overallScore >= 60) {
            console.log('🚨 NEEDS WORK: Several issues found, significant fixes required');
            console.log('🛠️  Critical issues must be resolved before deployment');
        } else {
            console.log('🚨 CRITICAL: Major issues found, DO NOT deploy to production');
            console.log('🛑 Immediate action required on all fronts');
        }
        
        console.log('\n🎯 Immediate Action Items:');
        console.log('1. Review and fix missing translations in failing sections');
        console.log('2. Test form submissions and user interactions manually');
        console.log('3. Verify responsive design on mobile devices');
        console.log('4. Conduct cross-browser testing (Chrome, Firefox, Safari, Edge)');
        console.log('5. Run accessibility testing for WCAG compliance');
        console.log('6. Perform user acceptance testing with native Macedonian speakers');
        
        // Critical issues summary
        const criticalIssues = this.results.sections.filter(s => s.overallScore < 60);
        if (criticalIssues.length > 0) {
            console.log('\n🚨 CRITICAL ISSUES REQUIRING IMMEDIATE ATTENTION:');
            criticalIssues.forEach(section => {
                console.log(`   ❌ ${section.name}: Score ${section.overallScore}% - ${section.errors.length} errors`);
            });
        }
    }
}

// Run the tests
async function main() {
    const tester = new DirectMacedonianTester();
    await tester.runAllTests();
}

// Export for module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { DirectMacedonianTester, testConfig, testSections };
} else {
    // Run directly
    main().catch(console.error);
}