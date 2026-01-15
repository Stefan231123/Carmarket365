import puppeteer from 'puppeteer';

async function testTranslationSystem() {
  console.log('🧪 Testing Translation System Directly...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false, 
    defaultViewport: { width: 1920, height: 1080 }
  });
  
  const page = await browser.newPage();
  
  try {
    // Test Albanian page initial load
    console.log('📋 Testing Albanian (sq) page load...');
    await page.goto('http://localhost:8081/sell-vehicle?lang=sq', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Check basic page elements and translations
    const pageTitle = await page.title();
    console.log(`✅ Page Title: "${pageTitle}"`);
    
    // Get the current step text (should be step 1)
    const stepTexts = await page.$$eval('*', elements => 
      elements
        .filter(el => el.textContent && el.textContent.includes('Vehicle Type'))
        .map(el => ({ text: el.textContent.trim(), tag: el.tagName }))
    );
    console.log('🔍 Found Vehicle Type elements:', stepTexts);
    
    // Look for Albanian text in the page
    const albanianTexts = await page.$$eval('*', elements => 
      elements
        .filter(el => el.textContent && (
          el.textContent.includes('automjetin') ||
          el.textContent.includes('Shis') ||
          el.textContent.includes('Ktheheu') ||
          el.textContent.includes('Hapi')
        ))
        .map(el => ({ text: el.textContent.trim(), tag: el.tagName }))
    );
    console.log('🇦🇱 Albanian text elements found:', albanianTexts);
    
    // Check navigation breadcrumb
    const breadcrumbText = await page.$eval('body', el => {
      const backButton = el.querySelector('button, a, [role="button"]');
      return backButton ? backButton.textContent : 'No back button found';
    }).catch(() => 'Could not find breadcrumb');
    console.log(`🧭 Navigation element: "${breadcrumbText}"`);
    
    // Check Next Step button text
    const nextButtons = await page.$$eval('button', elements => 
      elements
        .filter(el => el.textContent && (
          el.textContent.includes('Next') || 
          el.textContent.includes('Hapi') ||
          el.textContent.includes('tjetër')
        ))
        .map(el => ({ text: el.textContent.trim(), enabled: !el.disabled }))
    );
    console.log('⏭️ Next button translations:', nextButtons);
    
    // Test step indicator translations
    const stepIndicators = await page.$$eval('*', elements => 
      elements
        .filter(el => el.textContent && (
          el.textContent.includes('Vehicle Type') ||
          el.textContent.includes('Basic Information') ||
          el.textContent.includes('Details') ||
          el.textContent.includes('Photos')
        ))
        .map(el => ({ text: el.textContent.trim(), tag: el.tagName }))
    );
    console.log('📊 Step indicators:', stepIndicators);
    
    // Take screenshot of Albanian version
    await page.screenshot({ 
      path: '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/translation-test-albanian.png',
      fullPage: true 
    });
    
    // Now test Macedonian for comparison
    console.log('\n📋 Testing Macedonian (mk) page load...');
    await page.goto('http://localhost:8081/sell-vehicle?lang=mk', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    const mkPageTitle = await page.title();
    console.log(`✅ MK Page Title: "${mkPageTitle}"`);
    
    const macedonianTexts = await page.$$eval('*', elements => 
      elements
        .filter(el => el.textContent && (
          el.textContent.includes('возило') ||
          el.textContent.includes('Продај') ||
          el.textContent.includes('Назад')
        ))
        .map(el => ({ text: el.textContent.trim(), tag: el.tagName }))
    );
    console.log('🇲🇰 Macedonian text elements found:', macedonianTexts);
    
    await page.screenshot({ 
      path: '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/translation-test-macedonian.png',
      fullPage: true 
    });
    
    // Test specific translation keys by injecting JavaScript
    console.log('\n🔧 Testing translation function directly...');
    
    // Inject test to check if translation keys work
    const translationTest = await page.evaluate(() => {
      // Check if translation hook is available
      if (window.t || window.useTranslation) {
        return 'Translation function available';
      }
      return 'Translation function not accessible from window';
    });
    console.log('🔧 Translation system status:', translationTest);
    
    console.log('\n📊 ANALYSIS:');
    console.log('=============');
    
    console.log('\n🇦🇱 ALBANIAN RESULTS:');
    console.log(`✅ Page loads: ${pageTitle ? 'YES' : 'NO'}`);
    console.log(`✅ Albanian text present: ${albanianTexts.length > 0 ? 'YES' : 'NO'}`);
    console.log(`✅ Navigation translated: ${breadcrumbText.includes('Ktheheu') ? 'YES' : 'NO'}`);
    console.log(`✅ Buttons translated: ${nextButtons.some(btn => btn.text.includes('Hapi')) ? 'YES' : 'NO'}`);
    
    console.log('\n🇲🇰 MACEDONIAN RESULTS:');
    console.log(`✅ Page loads: ${mkPageTitle ? 'YES' : 'NO'}`);
    console.log(`✅ Macedonian text present: ${macedonianTexts.length > 0 ? 'YES' : 'NO'}`);
    
    console.log('\n💡 CONCLUSIONS:');
    if (albanianTexts.length > 0 && nextButtons.some(btn => btn.text.includes('Hapi'))) {
      console.log('✅ Albanian translations appear to be working correctly');
      console.log('❗ The navigation issue may be a separate form logic problem, not a translation issue');
    } else {
      console.log('❌ Albanian translations may have issues');
    }
    
    console.log('\n🎯 RECOMMENDATION:');
    console.log('Since we cannot easily test the email and transmission fields due to navigation issues,');
    console.log('we should check the translation files directly and verify the keys exist.');
    
  } catch (error) {
    console.error('❌ Error during translation testing:', error.message);
  } finally {
    await browser.close();
  }
}

testTranslationSystem().catch(console.error);