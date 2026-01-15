const puppeteer = require('puppeteer');

async function testSellVehicleTranslations() {
    let browser;
    try {
        // Launch browser
        browser = await puppeteer.launch({ 
            headless: false,
            defaultViewport: { width: 1200, height: 800 },
            args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        
        const page = await browser.newPage();
        
        const testResults = {
            default: {},
            macedonian: {},
            albanian: {},
            summary: {
                totalTests: 0,
                passed: 0,
                failed: 0,
                issues: []
            }
        };
        
        // Test helper function
        async function testPageForLanguage(lang, langName) {
            const url = lang ? `http://localhost:8082/sell-vehicle?lang=${lang}` : 'http://localhost:8082/sell-vehicle';
            console.log(`\\n=== Testing ${langName} (${url}) ===`);
            
            await page.goto(url, { waitUntil: 'networkidle2', timeout: 30000 });
            
            // Wait for React to render
            await page.waitForSelector('[data-testid], .container, h1', { timeout: 10000 }).catch(() => {});
            await page.waitForTimeout(3000); // Additional wait for translations to load
            
            const results = {};
            
            // Test 1: Page Title
            results.pageTitle = await page.evaluate(() => {
                const titleElement = document.querySelector('h1');
                return titleElement ? titleElement.textContent.trim() : null;
            });
            
            // Test 2: Step Labels
            results.stepLabels = await page.evaluate(() => {
                const steps = [];
                // Look for step labels in various possible selectors
                const stepElements = document.querySelectorAll('.flex.justify-between span, [class*="step"] span, .steps span');
                stepElements.forEach(el => {
                    const text = el.textContent.trim();
                    if (text && text.length > 2) steps.push(text);
                });
                return steps;
            });
            
            // Test 3: Button Text
            results.buttons = await page.evaluate(() => {
                const buttons = [];
                const buttonElements = document.querySelectorAll('button');
                buttonElements.forEach(btn => {
                    const text = btn.textContent.trim();
                    if (text && text.length > 1 && !text.match(/^[\\s\\d]+$/)) buttons.push(text);
                });
                return buttons;
            });
            
            // Test 4: Form Labels
            results.formLabels = await page.evaluate(() => {
                const labels = [];
                const labelElements = document.querySelectorAll('label');
                labelElements.forEach(label => {
                    const text = label.textContent.trim();
                    if (text && text.length > 1) labels.push(text);
                });
                return labels;
            });
            
            // Test 5: Placeholder Text (visible)
            results.placeholders = await page.evaluate(() => {
                const placeholders = [];
                const inputs = document.querySelectorAll('input[placeholder], select[placeholder], textarea[placeholder]');
                inputs.forEach(input => {
                    const placeholder = input.getAttribute('placeholder');
                    if (placeholder && placeholder.trim().length > 1) placeholders.push(placeholder.trim());
                });
                return placeholders;
            });
            
            // Test 6: Card Titles and Headers
            results.headers = await page.evaluate(() => {
                const headers = [];
                const headerElements = document.querySelectorAll('h1, h2, h3, h4, h5, h6, [class*="title"], [class*="header"]');
                headerElements.forEach(header => {
                    const text = header.textContent.trim();
                    if (text && text.length > 2) headers.push(text);
                });
                return headers;
            });
            
            // Test 7: Check for English words in non-English languages
            if (lang && lang !== 'en') {
                results.suspiciousEnglish = await page.evaluate(() => {
                    const englishWords = [
                        'What', 'Type', 'Vehicle', 'Selling', 'Basic', 'Information', 'Details',
                        'Photos', 'Contact', 'Upload', 'Choose', 'Next', 'Step', 'Previous',
                        'Create', 'Listing', 'Make', 'Model', 'Year', 'Mileage', 'Fuel',
                        'Transmission', 'Condition', 'Price', 'Description', 'Name', 'Phone',
                        'Email', 'Location', 'Select', 'Enter', 'Your', 'City', 'Country'
                    ];
                    
                    const pageText = document.body.textContent;
                    const foundEnglish = [];
                    
                    englishWords.forEach(word => {
                        const regex = new RegExp('\\\\b' + word + '\\\\b', 'gi');
                        if (regex.test(pageText)) {
                            foundEnglish.push(word);
                        }
                    });
                    
                    return foundEnglish;
                });
            }
            
            // Test 8: Missing translation indicators
            results.missingTranslations = await page.evaluate(() => {
                const pageText = document.body.textContent;
                const missing = [];
                
                // Look for "Missing:" indicators
                const missingMatches = pageText.match(/Missing:[^\\s,]*/g);
                if (missingMatches) {
                    missing.push(...missingMatches);
                }
                
                // Look for untranslated keys (contain dots)
                const keyMatches = pageText.match(/[a-zA-Z]+\\.[a-zA-Z.]+/g);
                if (keyMatches) {
                    // Filter out common patterns that aren't translation keys
                    const suspiciousKeys = keyMatches.filter(key => 
                        key.includes('sell.') || 
                        key.includes('common.') || 
                        key.includes('sellVehicle.')
                    );
                    missing.push(...suspiciousKeys);
                }
                
                return missing;
            });
            
            console.log(`${langName} Results:`, JSON.stringify(results, null, 2));
            return results;
        }
        
        // Test default language (should be Macedonian based on CountryContext)
        testResults.default = await testPageForLanguage(null, 'Default Language');
        
        // Test explicit Macedonian
        testResults.macedonian = await testPageForLanguage('mk', 'Macedonian');
        
        // Test Albanian
        testResults.albanian = await testPageForLanguage('sq', 'Albanian');
        
        // Analyze results
        function analyzeResults(results, langName) {
            const issues = [];
            
            // Check for missing translations
            if (results.missingTranslations && results.missingTranslations.length > 0) {
                issues.push({
                    severity: 'CRITICAL',
                    type: 'Missing Translations',
                    details: results.missingTranslations,
                    language: langName
                });
            }
            
            // Check for suspicious English in non-English languages
            if (results.suspiciousEnglish && results.suspiciousEnglish.length > 0) {
                issues.push({
                    severity: 'HIGH',
                    type: 'Untranslated English Text',
                    details: results.suspiciousEnglish,
                    language: langName
                });
            }
            
            // Check if essential elements are present
            if (!results.pageTitle || results.pageTitle.length < 3) {
                issues.push({
                    severity: 'HIGH',
                    type: 'Missing or Invalid Page Title',
                    details: results.pageTitle || 'No title found',
                    language: langName
                });
            }
            
            if (!results.stepLabels || results.stepLabels.length < 3) {
                issues.push({
                    severity: 'MEDIUM',
                    type: 'Missing Step Labels',
                    details: `Found ${results.stepLabels?.length || 0} step labels`,
                    language: langName
                });
            }
            
            if (!results.buttons || results.buttons.length < 2) {
                issues.push({
                    severity: 'MEDIUM',
                    type: 'Missing Button Text',
                    details: `Found ${results.buttons?.length || 0} buttons`,
                    language: langName
                });
            }
            
            return issues;
        }
        
        // Analyze all results
        testResults.summary.issues.push(...analyzeResults(testResults.default, 'Default'));
        testResults.summary.issues.push(...analyzeResults(testResults.macedonian, 'Macedonian'));
        testResults.summary.issues.push(...analyzeResults(testResults.albanian, 'Albanian'));
        
        // Calculate summary stats
        testResults.summary.totalTests = testResults.summary.issues.length;
        testResults.summary.failed = testResults.summary.issues.filter(issue => 
            issue.severity === 'CRITICAL' || issue.severity === 'HIGH'
        ).length;
        testResults.summary.passed = testResults.summary.totalTests - testResults.summary.failed;
        
        return testResults;
        
    } catch (error) {
        console.error('Test failed:', error);
        return { error: error.message };
    } finally {
        if (browser) {
            await browser.close();
        }
    }
}

// Export for use in other scripts
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { testSellVehicleTranslations };
} else {
    // Run directly if this script is executed
    testSellVehicleTranslations().then(results => {
        console.log('\\n\\n=== COMPREHENSIVE TEST RESULTS ===');
        console.log(JSON.stringify(results, null, 2));
        
        if (results.summary) {
            console.log('\\n=== SUMMARY ===');
            console.log(`Total Issues Found: ${results.summary.totalTests}`);
            console.log(`Critical/High Issues: ${results.summary.failed}`);
            console.log(`Low/Medium Issues: ${results.summary.passed}`);
            
            if (results.summary.issues.length > 0) {
                console.log('\\n=== ISSUES BREAKDOWN ===');
                results.summary.issues.forEach((issue, index) => {
                    console.log(`${index + 1}. [${issue.severity}] ${issue.language} - ${issue.type}`);
                    console.log(`   Details: ${Array.isArray(issue.details) ? issue.details.join(', ') : issue.details}`);
                });
            }
        }
    });
}