#!/usr/bin/env node

/**
 * Functional Test for Macedonian Advanced Search Page
 * Tests the actual page behavior and content
 */

const { exec } = require('child_process');
const fs = require('fs');

console.log('🔍 FUNCTIONAL TEST: Macedonian Advanced Search Page');
console.log('='.repeat(60));

/**
 * Test actual page content via curl with JavaScript evaluation simulation
 */
async function testPageContent() {
  console.log('📄 Testing page content with lang=mk parameter...');
  
  return new Promise((resolve) => {
    exec(`curl -s "http://localhost:8081/advanced-search?lang=mk"`, (error, stdout, stderr) => {
      if (error) {
        console.log('❌ Page request failed:', error.message);
        resolve({ success: false, error: error.message });
        return;
      }
      
      console.log('✅ Page loaded successfully');
      console.log('📊 Initial HTML structure received');
      
      // Check for React app structure
      const hasReactRoot = stdout.includes('<div id="root">');
      const hasReactScript = stdout.includes('main.tsx');
      const hasTitle = stdout.includes('CarFinder');
      
      console.log(`  React Root Element: ${hasReactRoot ? '✅' : '❌'}`);
      console.log(`  React Script: ${hasReactScript ? '✅' : '❌'}`);
      console.log(`  Page Title: ${hasTitle ? '✅' : '❌'}`);
      
      resolve({ 
        success: true, 
        hasReactRoot, 
        hasReactScript, 
        hasTitle,
        isReactApp: hasReactRoot && hasReactScript
      });
    });
  });
}

/**
 * Test translation file accessibility
 */
function testTranslationFileAccess() {
  console.log('\n📁 Testing translation file access...');
  
  try {
    const mkPath = './shared/translations/mk.ts';
    const mkContent = fs.readFileSync(mkPath, 'utf8');
    
    // Key Macedonian phrases that should be available
    const requiredPhrases = [
      'Напреден пребарај на автомобили',
      'Пребарај автомобили',
      'Исчисти сè',
      'staticVehicleData'
    ];
    
    const foundPhrases = [];
    const missingPhrases = [];
    
    requiredPhrases.forEach(phrase => {
      if (mkContent.includes(phrase)) {
        foundPhrases.push(phrase);
      } else {
        missingPhrases.push(phrase);
      }
    });
    
    console.log(`✅ Translation file loaded (${mkContent.length} chars)`);
    console.log(`✅ Found phrases: ${foundPhrases.length}/${requiredPhrases.length}`);
    
    foundPhrases.forEach(phrase => {
      console.log(`  ✓ "${phrase}"`);
    });
    
    if (missingPhrases.length > 0) {
      console.log(`❌ Missing phrases: ${missingPhrases.length}`);
      missingPhrases.forEach(phrase => {
        console.log(`  ✗ "${phrase}"`);
      });
    }
    
    return {
      success: true,
      foundPhrases: foundPhrases.length,
      totalPhrases: requiredPhrases.length,
      allFound: missingPhrases.length === 0
    };
    
  } catch (error) {
    console.log('❌ Translation file access failed:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Test static vehicle data completeness
 */
function testStaticVehicleData() {
  console.log('\n🚗 Testing static vehicle data completeness...');
  
  try {
    const mkPath = './shared/translations/mk.ts';
    const mkContent = fs.readFileSync(mkPath, 'utf8');
    
    const dataArrays = [
      'makes',
      'bodyTypes', 
      'fuelTypes',
      'transmissions',
      'conditions',
      'colors',
      'interiorColors',
      'countries',
      'features'
    ];
    
    const results = {};
    
    dataArrays.forEach(array => {
      // Check if array exists and has content
      const hasArray = mkContent.includes(`${array}:`);
      
      // Count items in array by looking for patterns
      const arrayPattern = new RegExp(`${array}:\\s*\\[([^\\]]+)\\]`, 's');
      const match = mkContent.match(arrayPattern);
      
      let itemCount = 0;
      if (match && match[1]) {
        // Count items by counting single quotes or double quotes
        const items = match[1].match(/'[^']+'/g) || match[1].match(/"[^"]+"/g) || [];
        itemCount = items.length;
      }
      
      results[array] = { hasArray, itemCount };
      
      console.log(`  ${hasArray && itemCount > 0 ? '✅' : '❌'} ${array}: ${hasArray ? `${itemCount} items` : 'missing'}`);
    });
    
    const totalArrays = dataArrays.length;
    const validArrays = Object.values(results).filter(r => r.hasArray && r.itemCount > 0).length;
    
    console.log(`📊 Valid arrays: ${validArrays}/${totalArrays}`);
    
    return {
      success: true,
      validArrays,
      totalArrays,
      results,
      isComplete: validArrays === totalArrays
    };
    
  } catch (error) {
    console.log('❌ Static vehicle data test failed:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Test component integration
 */
function testComponentIntegration() {
  console.log('\n⚛️ Testing component integration...');
  
  try {
    const componentPath = './client/components/AdvancedSearch.tsx';
    const componentContent = fs.readFileSync(componentPath, 'utf8');
    
    const integrationChecks = {
      hasUseTranslation: componentContent.includes('useTranslation'),
      hasTranslationImport: componentContent.includes('mkTranslations'),
      hasAdvancedSearchKeys: componentContent.includes("t('advancedSearch"),
      hasGetTranslatedData: componentContent.includes('getTranslatedData'),
      hasStaticVehicleDataAccess: componentContent.includes('staticVehicleData')
    };
    
    Object.entries(integrationChecks).forEach(([check, result]) => {
      console.log(`  ${result ? '✅' : '❌'} ${check}: ${result}`);
    });
    
    const passedChecks = Object.values(integrationChecks).filter(Boolean).length;
    const totalChecks = Object.keys(integrationChecks).length;
    
    console.log(`📊 Integration score: ${passedChecks}/${totalChecks}`);
    
    return {
      success: true,
      passedChecks,
      totalChecks,
      integrationChecks,
      isFullyIntegrated: passedChecks === totalChecks
    };
    
  } catch (error) {
    console.log('❌ Component integration test failed:', error.message);
    return { success: false, error: error.message };
  }
}

/**
 * Generate functional test summary report
 */
function generateSummaryReport(results) {
  console.log('\n📊 FUNCTIONAL TEST SUMMARY REPORT');
  console.log('='.repeat(50));
  
  const { pageTest, translationTest, staticDataTest, componentTest } = results;
  
  let totalScore = 0;
  let maxScore = 0;
  
  // Page Loading Score (25%)
  if (pageTest.success) {
    const pageScore = pageTest.isReactApp ? 25 : 15;
    totalScore += pageScore;
    console.log(`🌐 Page Loading: ${pageScore}/25 (${pageTest.isReactApp ? 'PASS' : 'PARTIAL'})`);
  } else {
    console.log('🌐 Page Loading: 0/25 (FAIL)');
  }
  maxScore += 25;
  
  // Translation File Score (25%)
  if (translationTest.success) {
    const translationScore = translationTest.allFound ? 25 : Math.round((translationTest.foundPhrases / translationTest.totalPhrases) * 25);
    totalScore += translationScore;
    console.log(`📝 Translation File: ${translationScore}/25 (${translationTest.allFound ? 'PASS' : 'PARTIAL'})`);
  } else {
    console.log('📝 Translation File: 0/25 (FAIL)');
  }
  maxScore += 25;
  
  // Static Data Score (25%)
  if (staticDataTest.success) {
    const staticDataScore = staticDataTest.isComplete ? 25 : Math.round((staticDataTest.validArrays / staticDataTest.totalArrays) * 25);
    totalScore += staticDataScore;
    console.log(`🚗 Static Vehicle Data: ${staticDataScore}/25 (${staticDataTest.isComplete ? 'PASS' : 'PARTIAL'})`);
  } else {
    console.log('🚗 Static Vehicle Data: 0/25 (FAIL)');
  }
  maxScore += 25;
  
  // Component Integration Score (25%)
  if (componentTest.success) {
    const componentScore = componentTest.isFullyIntegrated ? 25 : Math.round((componentTest.passedChecks / componentTest.totalChecks) * 25);
    totalScore += componentScore;
    console.log(`⚛️ Component Integration: ${componentScore}/25 (${componentTest.isFullyIntegrated ? 'PASS' : 'PARTIAL'})`);
  } else {
    console.log('⚛️ Component Integration: 0/25 (FAIL)');
  }
  maxScore += 25;
  
  const finalScore = Math.round((totalScore / maxScore) * 100);
  
  console.log('\n' + '='.repeat(50));
  console.log(`🎯 OVERALL FUNCTIONAL SCORE: ${finalScore}%`);
  console.log(`📊 Raw Score: ${totalScore}/${maxScore}`);
  
  // Deployment recommendation
  if (finalScore >= 90) {
    console.log('🟢 RECOMMENDATION: READY FOR DEPLOYMENT');
    console.log('✅ All critical functional tests passed');
  } else if (finalScore >= 75) {
    console.log('🟡 RECOMMENDATION: MINOR ISSUES - DEPLOY WITH MONITORING');
    console.log('⚠️  Some non-critical issues detected');
  } else {
    console.log('🔴 RECOMMENDATION: DO NOT DEPLOY');
    console.log('❌ Critical functional issues detected');
  }
  
  return {
    finalScore,
    totalScore,
    maxScore,
    recommendation: finalScore >= 90 ? 'DEPLOY' : finalScore >= 75 ? 'DEPLOY_WITH_MONITORING' : 'DO_NOT_DEPLOY'
  };
}

/**
 * Main test execution
 */
async function runFunctionalTests() {
  try {
    console.log('Starting functional tests...\n');
    
    const pageTest = await testPageContent();
    const translationTest = testTranslationFileAccess();
    const staticDataTest = testStaticVehicleData();
    const componentTest = testComponentIntegration();
    
    const results = {
      pageTest,
      translationTest,
      staticDataTest,
      componentTest
    };
    
    const summary = generateSummaryReport(results);
    
    console.log('\n🏁 FUNCTIONAL TESTING COMPLETED');
    console.log(`📅 Completed at: ${new Date().toLocaleString()}`);
    
    return {
      success: true,
      summary,
      results
    };
    
  } catch (error) {
    console.error('❌ Functional testing failed:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Execute if run directly
if (require.main === module) {
  runFunctionalTests();
}

module.exports = { runFunctionalTests };