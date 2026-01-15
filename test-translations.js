import puppeteer from 'puppeteer';

async function testTranslations() {
  console.log('🚀 Starting translation testing...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false, 
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  try {
    console.log('📋 Testing Albanian translations (sq)...');
    
    // Test Albanian page
    await page.goto('http://localhost:8081/sell-vehicle?lang=sq', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    // Wait a bit for the page to render
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // First, let's see what's actually on the page
    const pageContent = await page.content();
    console.log('Page title:', await page.title());
    
    // Look for any input fields
    const inputs = await page.$$eval('input', elements => 
      elements.map(el => ({ 
        type: el.type, 
        id: el.id, 
        placeholder: el.placeholder,
        name: el.name 
      }))
    );
    console.log('Found input fields:', inputs);
    
    // Try to find email input with different selectors
    let emailInput = null;
    const selectors = ['input[type="email"]', 'input#contact-email', 'input[placeholder*="email"]', 'input[placeholder*="Email"]'];
    
    for (const selector of selectors) {
      try {
        await page.waitForSelector(selector, { timeout: 2000 });
        emailInput = selector;
        break;
      } catch (e) {
        // Continue to next selector
      }
    }
    
    if (!emailInput) {
      console.log('⚠️ No email input found, taking screenshot for debugging');
      await page.screenshot({ 
        path: '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/debug-screenshot.png',
        fullPage: true 
      });
      return;
    }
    
    // Get the email placeholder
    const emailPlaceholder = await page.$eval(emailInput, el => el.placeholder);
    console.log(`📧 Email placeholder: "${emailPlaceholder}"`);
    
    // Get transmission options by clicking the select
    await page.click('[data-testid="transmission-select"], select[name="transmission"], .select-trigger');
    await new Promise(resolve => setTimeout(resolve, 500)); // Wait for dropdown to open
    
    // Try to find manual transmission option
    let manualText = '';
    try {
      const manualOptions = await page.$$eval('*', elements => 
        elements
          .filter(el => el.textContent && (el.textContent.includes('Manuali') || el.textContent.includes('Manual')))
          .map(el => ({ text: el.textContent.trim(), tagName: el.tagName }))
      );
      console.log(`🔧 Found transmission options:`, manualOptions);
      manualText = manualOptions.find(opt => opt.text.includes('Manuali') || opt.text.includes('Manual'))?.text || 'Not found';
    } catch (error) {
      console.log('⚠️ Could not find transmission options:', error.message);
    }
    
    console.log(`🔧 Manual transmission text: "${manualText}"`);
    
    // Take a screenshot
    await page.screenshot({ 
      path: '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/screenshot-albanian.png',
      fullPage: true 
    });
    console.log('📸 Screenshot saved: screenshot-albanian.png\n');
    
    // Test Macedonian page
    console.log('📋 Testing Macedonian translations (mk)...');
    await page.goto('http://localhost:8081/sell-vehicle?lang=mk', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    await page.waitForSelector('input[type="email"]', { timeout: 10000 });
    
    const emailPlaceholderMK = await page.$eval('input[type="email"]', el => el.placeholder);
    console.log(`📧 Email placeholder (MK): "${emailPlaceholderMK}"`);
    
    // Get transmission options
    await page.click('[data-testid="transmission-select"], select[name="transmission"], .select-trigger');
    await new Promise(resolve => setTimeout(resolve, 500));
    
    let manualTextMK = '';
    try {
      const manualOptionsMK = await page.$$eval('*', elements => 
        elements
          .filter(el => el.textContent && (el.textContent.includes('Мануелен') || el.textContent.includes('Manual')))
          .map(el => ({ text: el.textContent.trim(), tagName: el.tagName }))
      );
      console.log(`🔧 Found transmission options (MK):`, manualOptionsMK);
      manualTextMK = manualOptionsMK.find(opt => opt.text.includes('Мануелен') || opt.text.includes('Manual'))?.text || 'Not found';
    } catch (error) {
      console.log('⚠️ Could not find transmission options (MK):', error.message);
    }
    
    console.log(`🔧 Manual transmission text (MK): "${manualTextMK}"`);
    
    await page.screenshot({ 
      path: '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/screenshot-macedonian.png',
      fullPage: true 
    });
    console.log('📸 Screenshot saved: screenshot-macedonian.png\n');
    
    // Analysis
    console.log('🔍 ANALYSIS:');
    console.log('===========');
    
    console.log('\nAlbanian (sq) Results:');
    console.log(`Expected email placeholder: "Adresa juaj e emailit"`);
    console.log(`Actual email placeholder:   "${emailPlaceholder}"`);
    console.log(`Email translation correct:   ${emailPlaceholder === 'Adresa juaj e emailit' ? '✅ YES' : '❌ NO'}`);
    
    console.log(`Expected manual transmission: "Manuali"`);
    console.log(`Actual manual transmission:   "${manualText}"`);
    console.log(`Manual translation correct:    ${manualText === 'Manuali' ? '✅ YES' : '❌ NO'}`);
    
    console.log('\nMacedonian (mk) Results:');
    console.log(`Email placeholder (MK): "${emailPlaceholderMK}"`);
    console.log(`Manual transmission (MK): "${manualTextMK}"`);
    
    // Determine issue type
    console.log('\n🎯 CONCLUSION:');
    if (emailPlaceholder !== 'Adresa juaj e emailit' || manualText !== 'Manuali') {
      console.log('❌ Translation issues detected locally');
      console.log('This indicates: (A) Translations not working locally (code issue)');
    } else {
      console.log('✅ Translations working correctly locally');
      console.log('If production shows different results, this indicates: (B) Deployment issue');
    }
    
  } catch (error) {
    console.error('❌ Error during testing:', error.message);
  } finally {
    await browser.close();
  }
}

testTranslations().catch(console.error);