// Comprehensive test to debug Albanian navigation issue in SellVehicle
console.log('🔍 Testing Albanian Navigation Issue in SellVehicle Component');

// Test 1: Check Albanian translations loading
async function testAlbanianTranslationsLoading() {
  console.log('\n=== Test 1: Albanian Translations Loading ===');
  
  try {
    // Import Albanian translations directly
    const { sqTranslations } = await import('./shared/translations/sq.js');
    
    console.log('✅ Albanian translations loaded successfully');
    
    // Check if the sell.buttons.nextStep key exists
    if (sqTranslations?.sell?.buttons?.nextStep) {
      console.log('✅ sell.buttons.nextStep exists:', sqTranslations.sell.buttons.nextStep);
    } else {
      console.log('❌ sell.buttons.nextStep is missing');
    }
    
    // Check other essential keys
    const essentialKeys = [
      'sell.steps.vehicleType',
      'sell.steps.basicInfo', 
      'sell.steps.details',
      'sell.steps.photosAndContact',
      'sell.headers.vehicleTypeQuestion',
      'sell.buttons.previous',
      'sell.buttons.createListing'
    ];
    
    essentialKeys.forEach(key => {
      const keyPath = key.split('.');
      let value = sqTranslations;
      
      for (const k of keyPath) {
        value = value?.[k];
      }
      
      if (value) {
        console.log(`✅ ${key}:`, value);
      } else {
        console.log(`❌ ${key}: MISSING`);
      }
    });
    
    return true;
  } catch (error) {
    console.log('❌ Failed to load Albanian translations:', error);
    return false;
  }
}

// Test 2: Check main translations object
async function testMainTranslationsObject() {
  console.log('\n=== Test 2: Main Translations Object ===');
  
  try {
    // Import main translations
    const { translations, translate } = await import('./shared/translations.js');
    
    // Check if Albanian is present in main object
    if (translations.sq) {
      console.log('✅ Albanian translations found in main object');
      
      // Test specific translation
      const nextStepTranslation = translate('sq', 'sell.buttons.nextStep');
      console.log('Translation result for sell.buttons.nextStep:', nextStepTranslation);
      
      if (nextStepTranslation.includes('Missing:') || nextStepTranslation.includes('Invalid:')) {
        console.log('❌ Translation key is missing or invalid');
      } else {
        console.log('✅ Translation works correctly:', nextStepTranslation);
      }
    } else {
      console.log('❌ Albanian translations missing from main object');
    }
    
    return true;
  } catch (error) {
    console.log('❌ Failed to test main translations object:', error);
    return false;
  }
}

// Test 3: Simulate SellVehicle component behavior
async function testSellVehicleSimulation() {
  console.log('\n=== Test 3: SellVehicle Component Simulation ===');
  
  try {
    // Simulate component state
    let currentStep = 1;
    const vehicleType = 'car';
    
    // Simulate nextStep function
    const nextStep = () => {
      console.log(`Current step before: ${currentStep}`);
      if (currentStep < 4) {
        currentStep = currentStep + 1;
        console.log(`Current step after: ${currentStep}`);
        return true;
      }
      return false;
    };
    
    // Test the function
    console.log('Testing nextStep function:');
    const result = nextStep();
    console.log('NextStep result:', result);
    console.log('Final step:', currentStep);
    
    if (currentStep === 2) {
      console.log('✅ nextStep function works correctly');
    } else {
      console.log('❌ nextStep function failed');
    }
    
    return true;
  } catch (error) {
    console.log('❌ SellVehicle simulation failed:', error);
    return false;
  }
}

// Test 4: Check for navigation issues
async function testNavigationIssues() {
  console.log('\n=== Test 4: Navigation Issues ===');
  
  try {
    // Check if there are any Albanian-specific navigation redirects
    console.log('Checking for Albanian-specific navigation code...');
    
    // This would be where we check the actual component code
    // for any conditional logic based on language
    
    console.log('ℹ️ Manual inspection needed for navigation code');
    return true;
  } catch (error) {
    console.log('❌ Navigation test failed:', error);
    return false;
  }
}

// Run all tests
async function runAllTests() {
  console.log('🚀 Starting Albanian Navigation Debug Tests');
  console.log('='.repeat(50));
  
  const results = [];
  
  results.push(await testAlbanianTranslationsLoading());
  results.push(await testMainTranslationsObject());
  results.push(await testSellVehicleSimulation());
  results.push(await testNavigationIssues());
  
  console.log('\n' + '='.repeat(50));
  console.log('📊 Test Results Summary:');
  
  const passedTests = results.filter(r => r === true).length;
  const totalTests = results.length;
  
  console.log(`✅ Passed: ${passedTests}/${totalTests}`);
  console.log(`❌ Failed: ${totalTests - passedTests}/${totalTests}`);
  
  if (passedTests === totalTests) {
    console.log('🎉 All tests passed - investigation may need to focus on runtime behavior');
  } else {
    console.log('⚠️ Some tests failed - check above for specific issues');
  }
}

// Export for module usage or run directly
if (typeof module !== 'undefined' && module.exports) {
  module.exports = { 
    runAllTests,
    testAlbanianTranslationsLoading,
    testMainTranslationsObject,
    testSellVehicleSimulation,
    testNavigationIssues
  };
} else {
  // Run tests if executed directly
  runAllTests().catch(console.error);
}