import puppeteer from 'puppeteer';

async function testSellVehicleTranslations() {
    console.log('Starting SellVehicle page translation tests...\n');
    
    const browser = await puppeteer.launch({
        headless: 'new',
        args: ['--no-sandbox', '--disable-setuid-sandbox']
    });

    try {
        // Test 1: Default language (should be Macedonian)
        console.log('=== TEST 1: Default Language (Expected: Macedonian) ===');
        const page1 = await browser.newPage();
        await page1.setViewport({ width: 1280, height: 800 });
        
        console.log('Loading: http://localhost:8081/sell-vehicle');
        await page1.goto('http://localhost:8081/sell-vehicle', { 
            waitUntil: 'networkidle2', 
            timeout: 10000 
        });
        
        // Wait for page to fully load
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // Take screenshot
        await page1.screenshot({ 
            path: '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/test-results-default.png',
            fullPage: true 
        });
        
        // Extract text content
        const pageContent = await page1.evaluate(() => {
            const extractTextFromElements = (selectors) => {
                const results = {};
                selectors.forEach(({ name, selector }) => {
                    const elements = document.querySelectorAll(selector);
                    results[name] = Array.from(elements).map(el => el.textContent.trim()).filter(text => text);
                });
                return results;
            };
            
            return {
                // Get all text content
                allText: document.body.innerText,
                // Specific selectors for different UI elements
                specificElements: extractTextFromElements([
                    { name: 'stepTitles', selector: '.step, .step-title, [data-testid*="step"], .stepper li, .breadcrumb li' },
                    { name: 'headings', selector: 'h1, h2, h3, h4, h5, h6' },
                    { name: 'buttons', selector: 'button' },
                    { name: 'vehicleOptions', selector: '.vehicle-option, .option, [data-testid*="vehicle"]' },
                    { name: 'labels', selector: 'label' },
                    { name: 'spans', selector: 'span' },
                    { name: 'divs', selector: 'div' }
                ])
            };
        });
        
        console.log('Page loaded successfully');
        console.log('Full page text content:');
        console.log(pageContent.allText);
        console.log('\n--- Specific Elements ---');
        Object.entries(pageContent.specificElements).forEach(([key, values]) => {
            if (values.length > 0) {
                console.log(`${key}:`, values);
            }
        });
        
        // Check for expected Macedonian translations
        const macedonianTexts = {
            'Тип на возило': pageContent.allText.includes('Тип на возило'),
            'Основни информации': pageContent.allText.includes('Основни информации'),
            'Детали': pageContent.allText.includes('Детали'),
            'Фотографии и контакт': pageContent.allText.includes('Фотографии и контакт'),
            'Каков тип на возило го продавате?': pageContent.allText.includes('Каков тип на возило го продавате?'),
            'Автомобил': pageContent.allText.includes('Автомобил'),
            'Камион': pageContent.allText.includes('Камион'),
            'Мотоцикл': pageContent.allText.includes('Мотоцикл'),
            'Следен чекор': pageContent.allText.includes('Следен чекор')
        };
        
        console.log('\n--- Macedonian Translation Check ---');
        Object.entries(macedonianTexts).forEach(([text, found]) => {
            console.log(`✓ "${text}": ${found ? 'FOUND' : 'NOT FOUND'}`);
        });
        
        await page1.close();
        
        // Test 2: Albanian language parameter
        console.log('\n\n=== TEST 2: Albanian Language Parameter ===');
        const page2 = await browser.newPage();
        await page2.setViewport({ width: 1280, height: 800 });
        
        console.log('Loading: http://localhost:8081/sell-vehicle?lang=sq');
        await page2.goto('http://localhost:8081/sell-vehicle?lang=sq', { 
            waitUntil: 'networkidle2', 
            timeout: 10000 
        });
        
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        await page2.screenshot({ 
            path: '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/test-results-albanian.png',
            fullPage: true 
        });
        
        const albanianPageContent = await page2.evaluate(() => {
            return {
                allText: document.body.innerText,
                url: window.location.href,
                language: document.documentElement.lang || 'not set'
            };
        });
        
        console.log('Albanian page loaded successfully');
        console.log('URL:', albanianPageContent.url);
        console.log('Document language:', albanianPageContent.language);
        console.log('Full page text content:');
        console.log(albanianPageContent.allText);
        
        await page2.close();
        
        // Generate test summary
        console.log('\n\n=== TEST SUMMARY ===');
        const macedonianFound = Object.values(macedonianTexts).filter(Boolean).length;
        const macedonianTotal = Object.keys(macedonianTexts).length;
        
        console.log(`Macedonian translations found: ${macedonianFound}/${macedonianTotal}`);
        console.log(`Translation coverage: ${Math.round((macedonianFound / macedonianTotal) * 100)}%`);
        
        if (macedonianFound === macedonianTotal) {
            console.log('🎉 SUCCESS: All expected Macedonian translations are working!');
        } else {
            console.log('⚠️  PARTIAL SUCCESS: Some translations may be missing or not loaded yet');
        }
        
        console.log('\nScreenshots saved:');
        console.log('- Default (Macedonian): test-results-default.png');
        console.log('- Albanian: test-results-albanian.png');
        
    } catch (error) {
        console.error('Error during testing:', error);
        throw error;
    } finally {
        await browser.close();
    }
}

// Run the test
testSellVehicleTranslations().catch(console.error);