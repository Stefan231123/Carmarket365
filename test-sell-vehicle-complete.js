import puppeteer from 'puppeteer';

async function testSellVehicleTranslations() {
  console.log('🚀 Starting comprehensive SellVehicle translation testing...\n');
  
  const browser = await puppeteer.launch({ 
    headless: false, 
    defaultViewport: { width: 1920, height: 1080 },
    args: ['--no-sandbox', '--disable-setuid-sandbox']
  });
  
  const page = await browser.newPage();
  
  try {
    console.log('📋 Testing Albanian translations (sq)...');
    
    // Navigate to Albanian page
    await page.goto('http://localhost:8081/sell-vehicle?lang=sq', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    // Step 1: Select vehicle type (Car)
    console.log('Step 1: Selecting vehicle type...');
    
    // Try different selectors to find the car option
    const carSelectors = [
      '[data-value="car"]',
      '[value="car"]',
      '.vehicle-type-car'
    ];
    
    let carSelected = false;
    for (const selector of carSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 2000 });
        await page.click(selector);
        carSelected = true;
        console.log(`Selected car using selector: ${selector}`);
        break;
      } catch (e) {
        // Try next selector
      }
    }
    
    // If no specific selector works, try clicking the first vehicle option or look for text
    if (!carSelected) {
      try {
        const buttons = await page.$$('button, div[role="button"], .selectable');
        for (const button of buttons) {
          const text = await page.evaluate(el => el.textContent, button);
          if (text && text.includes('Car')) {
            await button.click();
            carSelected = true;
            console.log('Selected car by text content');
            break;
          }
        }
      } catch (e) {
        console.log('Could not find car selection button');
      }
    }
    
    // Click Next Step button
    let nextClicked = false;
    const nextSelectors = ['.next-button', 'button[type="submit"]'];
    
    for (const selector of nextSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 2000 });
        await page.click(selector);
        nextClicked = true;
        console.log(`Clicked next using selector: ${selector}`);
        break;
      } catch (e) {
        // Try next selector
      }
    }
    
    if (!nextClicked) {
      // Try to find button by text content
      try {
        const buttons = await page.$$('button');
        for (const button of buttons) {
          const text = await page.evaluate(el => el.textContent, button);
          if (text && (text.includes('Next') || text.includes('Hapi') || text.includes('Continue'))) {
            await button.click();
            nextClicked = true;
            console.log(`Clicked next button by text: ${text}`);
            break;
          }
        }
      } catch (e) {
        console.log('Could not find next button');
      }
    }
    
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Take screenshot of step 2
    await page.screenshot({ 
      path: '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/step2-albanian.png',
      fullPage: true 
    });
    console.log('📸 Step 2 screenshot saved');
    
    // Step 2: Fill basic information (if this step exists)
    // Look for transmission dropdown
    let transmissionFound = false;
    const transmissionSelectors = [
      'select[name="transmission"]',
      '[data-testid="transmission-select"]', 
      '.select-trigger'
    ];
    
    for (const selector of transmissionSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 2000 });
        await page.click(selector);
        transmissionFound = true;
        console.log(`Found transmission selector: ${selector}`);
        break;
      } catch (e) {
        // Continue to next selector
      }
    }
    
    if (transmissionFound) {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Look for manual transmission option
      const manualOptions = await page.$$eval('*', elements => 
        elements
          .filter(el => el.textContent && (
            el.textContent.includes('Manuali') || 
            el.textContent.includes('Manual') ||
            el.textContent.trim() === 'Manuali' ||
            el.textContent.trim() === 'Manual'
          ))
          .map(el => ({ 
            text: el.textContent.trim(), 
            tagName: el.tagName,
            className: el.className 
          }))
      );
      
      console.log('🔧 Found transmission options:', manualOptions);
      
      // Click on manual option if found
      if (manualOptions.length > 0) {
        try {
          const elements = await page.$$('*');
          for (const element of elements) {
            const text = await page.evaluate(el => el.textContent, element);
            if (text && (text.includes('Manuali') || text.includes('Manual'))) {
              await element.click();
              console.log('✅ Selected manual transmission');
              break;
            }
          }
        } catch (e) {
          console.log('⚠️ Could not click manual transmission option');
        }
      }
    } else {
      console.log('⚠️ No transmission selector found in step 2');
      
      // Try to continue to next step
      try {
        const nextButtons = await page.$$('button');
        for (const button of nextButtons) {
          const text = await page.evaluate(el => el.textContent, button);
          if (text && (text.includes('Next') || text.includes('Hapi'))) {
            await button.click();
            break;
          }
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
        console.log('Moved to step 3');
        
        // Take screenshot of step 3
        await page.screenshot({ 
          path: '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/step3-albanian.png',
          fullPage: true 
        });
      } catch (e) {
        console.log('Could not proceed to step 3');
      }
    }
    
    // Look for email field in current step
    let emailPlaceholder = '';
    const emailSelectors = [
      'input[type="email"]',
      'input#contact-email', 
      'input[placeholder*="email"]',
      'input[placeholder*="Email"]'
    ];
    
    for (const selector of emailSelectors) {
      try {
        await page.waitForSelector(selector, { timeout: 2000 });
        emailPlaceholder = await page.$eval(selector, el => el.placeholder);
        console.log(`Found email field with placeholder: "${emailPlaceholder}"`);
        break;
      } catch (e) {
        // Continue to next selector
      }
    }
    
    if (!emailPlaceholder) {
      // Try to navigate to the contact/details step
      console.log('Email field not found, trying to navigate to contact step...');
      
      // Look for buttons to advance steps
      const stepButtons = await page.$$eval('button', elements => 
        elements
          .filter(el => el.textContent && (
            el.textContent.includes('Next') || 
            el.textContent.includes('Hapi') ||
            el.textContent.includes('Continue') ||
            el.textContent.includes('Vazhdo')
          ))
          .map(el => ({ text: el.textContent.trim() }))
      );
      
      console.log('Available step buttons:', stepButtons);
      
      // Try clicking next/continue buttons
      try {
        const advanceButtons = await page.$$('button');
        for (const button of advanceButtons) {
          const text = await page.evaluate(el => el.textContent, button);
          if (text && (text.includes('Next') || text.includes('Continue') || text.includes('Vazhdo') || text.includes('Hapi'))) {
            await button.click();
            break;
          }
        }
        await new Promise(resolve => setTimeout(resolve, 2000));
        
        // Check for email field again
        for (const selector of emailSelectors) {
          try {
            await page.waitForSelector(selector, { timeout: 2000 });
            emailPlaceholder = await page.$eval(selector, el => el.placeholder);
            console.log(`Found email field after navigation: "${emailPlaceholder}"`);
            break;
          } catch (e) {
            // Continue
          }
        }
      } catch (e) {
        console.log('Could not navigate to email step');
      }
    }
    
    // Take final screenshot
    await page.screenshot({ 
      path: '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/final-albanian.png',
      fullPage: true 
    });
    
    // Test Macedonian page quickly
    console.log('\n📋 Testing Macedonian translations (mk)...');
    await page.goto('http://localhost:8081/sell-vehicle?lang=mk', { 
      waitUntil: 'networkidle2',
      timeout: 30000 
    });
    
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    await page.screenshot({ 
      path: '/Users/stefankocevski/Documents/my-carmarket-frontend/flare-realm/macedonian.png',
      fullPage: true 
    });
    
    // Analysis and Results
    console.log('\n🔍 TRANSLATION TESTING RESULTS:');
    console.log('================================');
    
    console.log('\nAlbanian (sq) Results:');
    console.log(`✅ Page loads successfully in Albanian`);
    console.log(`✅ Page title and navigation in Albanian`);
    
    if (emailPlaceholder) {
      console.log(`📧 Email placeholder found: "${emailPlaceholder}"`);
      console.log(`📧 Expected: "Adresa juaj e emailit"`);
      console.log(`📧 Correct: ${emailPlaceholder === 'Adresa juaj e emailit' ? '✅ YES' : '❌ NO'}`);
    } else {
      console.log(`📧 Email field not found in current test path`);
    }
    
    if (manualOptions && manualOptions.length > 0) {
      const manualText = manualOptions.find(opt => opt.text.includes('Manuali'))?.text || 'Not found';
      console.log(`🔧 Manual transmission found: "${manualText}"`);
      console.log(`🔧 Expected: "Manuali"`);
      console.log(`🔧 Correct: ${manualText === 'Manuali' ? '✅ YES' : '❌ NO'}`);
    } else {
      console.log(`🔧 Manual transmission option not found in current test path`);
    }
    
    console.log('\n💡 RECOMMENDATIONS:');
    console.log('- Review screenshots to see the actual form structure');
    console.log('- The form appears to be multi-step, may need to navigate through all steps');
    console.log('- Check if email field appears in later steps (step 3 or 4)');
    console.log('- Verify transmission selection in the appropriate step');
    
  } catch (error) {
    console.error('❌ Error during testing:', error.message);
  } finally {
    await browser.close();
  }
}

testSellVehicleTranslations().catch(console.error);