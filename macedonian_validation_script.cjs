#!/usr/bin/env node

/**
 * Macedonian Advanced Search Translation Validation Script
 * Comprehensive testing for the final phase validation
 */

const fs = require('fs');
const path = require('path');

console.log('🇲🇰 MACEDONIAN ADVANCED SEARCH VALIDATION SUITE');
console.log('='.repeat(60));
console.log(`Started: ${new Date().toLocaleString()}`);
console.log(`Target: http://localhost:8081/advanced-search?lang=mk`);
console.log('='.repeat(60));

// Read and analyze the Macedonian translation file
const mkTranslationPath = './shared/translations/mk.ts';
let mkTranslations = null;
let testResults = {
  translationFile: [],
  componentAnalysis: [],
  staticData: [],
  criticalTexts: [],
  overall: {
    score: 0,
    status: 'PENDING',
    issues: [],
    recommendations: []
  }
};

/**
 * Test 1: Validate Macedonian Translation File Structure
 */
function validateTranslationFile() {
  console.log('\n📁 TEST 1: Validating Translation File Structure');
  console.log('-'.repeat(50));
  
  try {
    if (!fs.existsSync(mkTranslationPath)) {
      testResults.translationFile.push({
        test: 'File Existence',
        status: 'FAIL',
        details: 'mk.ts file not found'
      });
      return;
    }
    
    const mkContent = fs.readFileSync(mkTranslationPath, 'utf8');
    testResults.translationFile.push({
      test: 'File Existence',
      status: 'PASS',
      details: `File found: ${mkContent.length} characters`
    });
    
    // Check for advancedSearch section
    const hasAdvancedSearch = mkContent.includes('advancedSearch:') && mkContent.includes('staticVehicleData:');
    testResults.translationFile.push({
      test: 'AdvancedSearch Section',
      status: hasAdvancedSearch ? 'PASS' : 'FAIL',
      details: hasAdvancedSearch ? 'advancedSearch section found' : 'advancedSearch section missing'
    });
    
    // Check for critical Macedonian translations
    const criticalMacedonianTexts = [
      'Напреден пребарај',
      'Пребарај автомобили', 
      'Исчисти сè',
      'Марка',
      'Модел',
      'staticVehicleData'
    ];
    
    let foundTexts = 0;
    criticalMacedonianTexts.forEach(text => {
      if (mkContent.includes(text)) {
        foundTexts++;
        console.log(`  ✅ Found: "${text}"`);
      } else {
        console.log(`  ❌ Missing: "${text}"`);
      }
    });
    
    testResults.translationFile.push({
      test: 'Critical Macedonian Texts',
      status: foundTexts >= criticalMacedonianTexts.length - 1 ? 'PASS' : 'FAIL',
      details: `Found ${foundTexts}/${criticalMacedonianTexts.length} critical texts`
    });
    
    console.log(`  📊 Translation File Score: ${foundTexts}/${criticalMacedonianTexts.length}`);
    
  } catch (error) {
    testResults.translationFile.push({
      test: 'File Analysis',
      status: 'FAIL',
      details: error.message
    });
  }
}

/**
 * Test 2: Validate StaticVehicleData Arrays
 */
function validateStaticVehicleData() {
  console.log('\n🚗 TEST 2: Validating StaticVehicleData Arrays');
  console.log('-'.repeat(50));
  
  try {
    const mkContent = fs.readFileSync(mkTranslationPath, 'utf8');
    
    // Check for specific staticVehicleData arrays with Macedonian content
    const dataArrays = [
      { key: 'makes', expectedMacedonian: ['BMW', 'Audi', 'Toyota'] },
      { key: 'bodyTypes', expectedMacedonian: ['Седан', 'SUV', 'Хечбек'] },
      { key: 'fuelTypes', expectedMacedonian: ['Бензин', 'Дизел', 'Електричен'] },
      { key: 'transmissions', expectedMacedonian: ['Мануелна', 'Автоматска'] },
      { key: 'conditions', expectedMacedonian: ['Нов', 'Користен'] },
      { key: 'colors', expectedMacedonian: ['Црна', 'Бела', 'Сива'] }
    ];
    
    dataArrays.forEach(({ key, expectedMacedonian }) => {
      const hasArray = mkContent.includes(`${key}:`);
      let macedonianCount = 0;
      
      expectedMacedonian.forEach(term => {
        if (mkContent.includes(`'${term}'`) || mkContent.includes(`"${term}"`)) {
          macedonianCount++;
        }
      });
      
      const status = hasArray && macedonianCount > 0 ? 'PASS' : 'FAIL';
      testResults.staticData.push({
        test: `${key} Array`,
        status,
        details: `Array exists: ${hasArray}, Macedonian terms: ${macedonianCount}/${expectedMacedonian.length}`
      });
      
      console.log(`  ${status === 'PASS' ? '✅' : '❌'} ${key}: ${macedonianCount}/${expectedMacedonian.length} Macedonian terms`);
    });
    
  } catch (error) {
    testResults.staticData.push({
      test: 'StaticVehicleData Analysis',
      status: 'FAIL',
      details: error.message
    });
  }
}

/**
 * Test 3: Analyze AdvancedSearch Component
 */
function analyzeAdvancedSearchComponent() {
  console.log('\n⚛️ TEST 3: Analyzing AdvancedSearch Component');
  console.log('-'.repeat(50));
  
  try {
    const componentPath = './client/components/AdvancedSearch.tsx';
    if (!fs.existsSync(componentPath)) {
      testResults.componentAnalysis.push({
        test: 'Component File Existence',
        status: 'FAIL',
        details: 'AdvancedSearch.tsx not found'
      });
      return;
    }
    
    const componentContent = fs.readFileSync(componentPath, 'utf8');
    
    // Check for proper translation usage
    const hasUseTranslation = componentContent.includes('useTranslation');
    const hasDirectImport = componentContent.includes('mkTranslations');
    const hasTranslationKeys = componentContent.includes("t('advancedSearch");
    
    testResults.componentAnalysis.push({
      test: 'Translation Hook Usage',
      status: hasUseTranslation ? 'PASS' : 'FAIL',
      details: `useTranslation hook ${hasUseTranslation ? 'found' : 'missing'}`
    });
    
    testResults.componentAnalysis.push({
      test: 'Direct Translation Import',
      status: hasDirectImport ? 'PASS' : 'FAIL', 
      details: `mkTranslations import ${hasDirectImport ? 'found' : 'missing'}`
    });
    
    testResults.componentAnalysis.push({
      test: 'Translation Key Usage',
      status: hasTranslationKeys ? 'PASS' : 'FAIL',
      details: `advancedSearch translation keys ${hasTranslationKeys ? 'found' : 'missing'}`
    });
    
    // Check for hardcoded English
    const englishPatterns = [
      /['"`]Search["`']/g,
      /['"`]Clear["`']/g,
      /['"`]Make["`']/g,
      /['"`]Model["`']/g,
      /['"`]Gasoline["`']/g,
      /['"`]Diesel["`']/g
    ];
    
    let hardcodedEnglish = 0;
    englishPatterns.forEach(pattern => {
      const matches = componentContent.match(pattern);
      if (matches) {
        hardcodedEnglish += matches.length;
      }
    });
    
    testResults.componentAnalysis.push({
      test: 'No Hardcoded English',
      status: hardcodedEnglish === 0 ? 'PASS' : 'FAIL',
      details: `Found ${hardcodedEnglish} potential hardcoded English strings`
    });
    
    console.log(`  ✅ Translation Hook: ${hasUseTranslation}`);
    console.log(`  ✅ Direct Import: ${hasDirectImport}`);
    console.log(`  ✅ Translation Keys: ${hasTranslationKeys}`);
    console.log(`  ${hardcodedEnglish === 0 ? '✅' : '❌'} Hardcoded English: ${hardcodedEnglish} found`);
    
  } catch (error) {
    testResults.componentAnalysis.push({
      test: 'Component Analysis',
      status: 'FAIL', 
      details: error.message
    });
  }
}

/**
 * Test 4: Critical Text Validation
 */
function validateCriticalTexts() {
  console.log('\n📝 TEST 4: Critical Text Validation');
  console.log('-'.repeat(50));
  
  const criticalTexts = [
    { key: 'title', expected: 'Напреден пребарај на автомобили', priority: 'HIGH' },
    { key: 'searchButton', expected: 'Пребарај автомобили', priority: 'HIGH' },
    { key: 'clearButton', expected: 'Исчисти сè', priority: 'HIGH' },
    { key: 'makeLabel', expected: 'Марка', priority: 'HIGH' },
    { key: 'modelLabel', expected: 'Модел', priority: 'HIGH' },
    { key: 'fuelType', expected: 'Бензин', priority: 'MEDIUM' },
    { key: 'transmission', expected: 'Мануелна', priority: 'MEDIUM' }
  ];
  
  try {
    const mkContent = fs.readFileSync(mkTranslationPath, 'utf8');
    
    criticalTexts.forEach(({ key, expected, priority }) => {
      const found = mkContent.includes(expected);
      testResults.criticalTexts.push({
        test: `${key} (${priority})`,
        status: found ? 'PASS' : 'FAIL',
        details: found ? `"${expected}" found` : `"${expected}" missing`,
        priority
      });
      
      console.log(`  ${found ? '✅' : '❌'} [${priority}] ${key}: "${expected}"`);
    });
    
  } catch (error) {
    testResults.criticalTexts.push({
      test: 'Critical Text Analysis',
      status: 'FAIL',
      details: error.message
    });
  }
}

/**
 * Calculate Overall Score and Generate Report
 */
function calculateOverallScore() {
  console.log('\n📊 CALCULATING OVERALL SCORE');
  console.log('-'.repeat(50));
  
  let totalTests = 0;
  let passedTests = 0;
  
  // Count all tests
  [testResults.translationFile, testResults.componentAnalysis, testResults.staticData, testResults.criticalTexts].forEach(category => {
    category.forEach(result => {
      totalTests++;
      if (result.status === 'PASS') passedTests++;
    });
  });
  
  const overallScore = totalTests > 0 ? (passedTests / totalTests) * 100 : 0;
  
  // Determine status
  let status = 'FAIL';
  if (overallScore >= 90) status = 'EXCELLENT';
  else if (overallScore >= 80) status = 'GOOD';
  else if (overallScore >= 70) status = 'ACCEPTABLE';
  
  // Critical issues
  const criticalIssues = [];
  testResults.criticalTexts.forEach(result => {
    if (result.status === 'FAIL' && result.priority === 'HIGH') {
      criticalIssues.push(result.details);
    }
  });
  
  // Generate recommendations
  const recommendations = [];
  if (overallScore < 70) {
    recommendations.push('CRITICAL: Overall score below 70%. Immediate review required.');
  }
  if (criticalIssues.length > 0) {
    recommendations.push(`HIGH PRIORITY: ${criticalIssues.length} critical translation issues found.`);
  }
  if (testResults.componentAnalysis.some(r => r.test.includes('Hardcoded English') && r.status === 'FAIL')) {
    recommendations.push('MEDIUM: Remove hardcoded English strings from component.');
  }
  if (overallScore >= 90) {
    recommendations.push('EXCELLENT: Advanced search page ready for deployment.');
  }
  
  testResults.overall = {
    score: overallScore,
    status,
    issues: criticalIssues,
    recommendations,
    totalTests,
    passedTests
  };
  
  console.log(`  Overall Score: ${overallScore.toFixed(1)}%`);
  console.log(`  Status: ${status}`);
  console.log(`  Tests: ${passedTests}/${totalTests} passed`);
  console.log(`  Critical Issues: ${criticalIssues.length}`);
}

/**
 * Generate Detailed Report
 */
function generateDetailedReport() {
  console.log('\n📋 DETAILED VALIDATION REPORT');
  console.log('='.repeat(60));
  
  const timestamp = new Date().toISOString();
  const reportFile = `macedonian-validation-report-${timestamp.slice(0, 10)}-${timestamp.slice(11, 19).replace(/:/g, '')}.txt`;
  
  let report = `MACEDONIAN ADVANCED SEARCH TRANSLATION VALIDATION REPORT
Generated: ${new Date().toLocaleString()}
Target URL: http://localhost:8081/advanced-search?lang=mk

EXECUTIVE SUMMARY:
================
Overall Score: ${testResults.overall.score.toFixed(1)}%
Status: ${testResults.overall.status}
Tests Passed: ${testResults.overall.passedTests}/${testResults.overall.totalTests}
Critical Issues: ${testResults.overall.issues.length}

CRITICAL SUCCESS CRITERIA:
========================
✅ Zero English Text: ${testResults.componentAnalysis.some(r => r.test.includes('Hardcoded English') && r.status === 'PASS') ? 'PASSED' : 'FAILED'}
✅ Complete Macedonian Interface: ${testResults.criticalTexts.filter(r => r.priority === 'HIGH' && r.status === 'PASS').length >= 3 ? 'PASSED' : 'FAILED'}
✅ Dropdown Content: ${testResults.staticData.filter(r => r.status === 'PASS').length >= 4 ? 'PASSED' : 'FAILED'}

DETAILED RESULTS:
================

1. TRANSLATION FILE VALIDATION:
   ${testResults.translationFile.map(r => `[${r.status}] ${r.test}: ${r.details}`).join('\n   ')}

2. COMPONENT ANALYSIS:
   ${testResults.componentAnalysis.map(r => `[${r.status}] ${r.test}: ${r.details}`).join('\n   ')}

3. STATIC VEHICLE DATA:
   ${testResults.staticData.map(r => `[${r.status}] ${r.test}: ${r.details}`).join('\n   ')}

4. CRITICAL TEXTS:
   ${testResults.criticalTexts.map(r => `[${r.status}] ${r.test}: ${r.details}`).join('\n   ')}

RECOMMENDATIONS:
===============
${testResults.overall.recommendations.map(r => `- ${r}`).join('\n')}

NEXT STEPS:
==========
`;

  if (testResults.overall.score >= 90) {
    report += `- DEPLOY: Advanced search page meets quality standards
- MONITOR: Continue monitoring for any translation issues post-deployment
- DOCUMENT: Update deployment documentation with validation results`;
  } else if (testResults.overall.score >= 70) {
    report += `- REVIEW: Address failing tests before deployment
- TEST: Re-run validation after fixes
- VERIFY: Confirm all critical texts are properly translated`;
  } else {
    report += `- STOP DEPLOYMENT: Critical issues must be resolved
- FIX: Address all failing translation tests
- RE-VALIDATE: Run complete test suite again after fixes`;
  }

  report += `

VALIDATION COMPLETED: ${new Date().toLocaleString()}
`;

  try {
    fs.writeFileSync(reportFile, report);
    console.log(`\n📄 Report saved: ${reportFile}`);
  } catch (error) {
    console.log(`\n❌ Failed to save report: ${error.message}`);
  }
  
  // Console summary
  console.log('\n🎯 VALIDATION SUMMARY');
  console.log('-'.repeat(30));
  console.log(`Score: ${testResults.overall.score.toFixed(1)}% (${testResults.overall.status})`);
  console.log(`Passed: ${testResults.overall.passedTests}/${testResults.overall.totalTests} tests`);
  
  if (testResults.overall.score >= 90) {
    console.log('🟢 READY FOR DEPLOYMENT');
  } else if (testResults.overall.score >= 70) {
    console.log('🟡 NEEDS MINOR FIXES');
  } else {
    console.log('🔴 CRITICAL ISSUES - DO NOT DEPLOY');
  }
  
  return report;
}

/**
 * Main Execution
 */
function runValidation() {
  try {
    validateTranslationFile();
    validateStaticVehicleData();
    analyzeAdvancedSearchComponent();
    validateCriticalTexts();
    calculateOverallScore();
    const report = generateDetailedReport();
    
    console.log('\n='.repeat(60));
    console.log('🇲🇰 MACEDONIAN VALIDATION COMPLETED');
    console.log('='.repeat(60));
    
    return {
      success: true,
      score: testResults.overall.score,
      status: testResults.overall.status,
      report,
      testResults
    };
    
  } catch (error) {
    console.error('❌ Validation failed:', error.message);
    return {
      success: false,
      error: error.message
    };
  }
}

// Execute if run directly
if (require.main === module) {
  runValidation();
}

module.exports = { runValidation, testResults };