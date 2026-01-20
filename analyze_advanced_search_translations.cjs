#!/usr/bin/env node

/**
 * Advanced Search Translation Analysis Tool
 * Compares translation keys used in AdvancedSearch component vs available in mk.ts
 */

const fs = require('fs');
const path = require('path');

// Read the AdvancedSearch component
const advancedSearchPath = path.join(__dirname, 'client/components/AdvancedSearch.tsx');
const mkTranslationsPath = path.join(__dirname, 'shared/translations/mk.ts');
const enTranslationsPath = path.join(__dirname, 'shared/translations/en.ts');

console.log('🔍 ADVANCED SEARCH TRANSLATION ANALYSIS');
console.log('=' .repeat(60));

function extractTranslationKeys(content) {
  // Extract all t('...') patterns from the component
  const tFunctionPattern = /t\(['"](.*?)['"]/g;
  const keys = [];
  let match;
  
  while ((match = tFunctionPattern.exec(content)) !== null) {
    keys.push(match[1]);
  }
  
  return [...new Set(keys)]; // Remove duplicates
}

function checkKeyExistence(translationContent, key) {
  // Simple check for key existence in translation file
  const keyPattern = new RegExp(`['"]${key.replace(/\./g, '\\.')}['"]\\s*:`);
  return keyPattern.test(translationContent);
}

function getNestedValue(obj, path) {
  return path.split('.').reduce((current, key) => {
    return current && current[key] ? current[key] : undefined;
  }, obj);
}

try {
  // Read files
  const advancedSearchContent = fs.readFileSync(advancedSearchPath, 'utf8');
  const mkContent = fs.readFileSync(mkTranslationsPath, 'utf8');
  const enContent = fs.readFileSync(enTranslationsPath, 'utf8');
  
  console.log('✅ Files loaded successfully\n');
  
  // Extract translation keys from AdvancedSearch component
  const usedKeys = extractTranslationKeys(advancedSearchContent);
  
  console.log('📋 TRANSLATION KEYS USED IN ADVANCEDSEARCH COMPONENT:');
  console.log('-'.repeat(60));
  
  const missingInMk = [];
  const presentInMk = [];
  
  usedKeys.forEach(key => {
    const existsInMk = checkKeyExistence(mkContent, key);
    const existsInEn = checkKeyExistence(enContent, key);
    
    console.log(`${existsInMk ? '✅' : '❌'} ${key}`);
    
    if (!existsInMk) {
      missingInMk.push({
        key: key,
        existsInEn: existsInEn
      });
    } else {
      presentInMk.push(key);
    }
  });
  
  console.log('\n📊 ANALYSIS SUMMARY:');
  console.log('-'.repeat(60));
  console.log(`Total translation keys used: ${usedKeys.length}`);
  console.log(`Present in Macedonian: ${presentInMk.length}`);
  console.log(`Missing in Macedonian: ${missingInMk.length}`);
  
  if (missingInMk.length > 0) {
    console.log('\n🚨 MISSING TRANSLATION KEYS IN MACEDONIAN:');
    console.log('-'.repeat(60));
    
    missingInMk.forEach(item => {
      console.log(`❌ ${item.key} ${item.existsInEn ? '(exists in EN)' : '(missing in EN too!)'}`);
    });
    
    console.log('\n🔧 REQUIRED MACEDONIAN TRANSLATIONS:');
    console.log('-'.repeat(60));
    
    // Try to extract English values for missing keys
    console.log('Based on the English translation file, these keys need Macedonian translations:\n');
    
    missingInMk.forEach(item => {
      if (item.existsInEn) {
        // Try to find the English value (simplified extraction)
        const keyRegex = new RegExp(`['"]${item.key.replace(/\./g, '\\.')}['"]\\s*:\\s*['"]([^'"]*?)['"]`);
        const match = enContent.match(keyRegex);
        const englishValue = match ? match[1] : 'Not found';
        
        console.log(`${item.key}: '${englishValue}' → [NEEDS MACEDONIAN TRANSLATION]`);
      }
    });
  }
  
  console.log('\n🎯 PRIORITY ANALYSIS:');
  console.log('-'.repeat(60));
  
  // Group missing keys by priority
  const highPriority = missingInMk.filter(k => 
    k.key.includes('title') || 
    k.key.includes('searchCars') || 
    k.key.includes('clearAll') ||
    k.key.includes('placeholders.')
  );
  
  const mediumPriority = missingInMk.filter(k => 
    k.key.includes('fields.') || 
    k.key.includes('sections.')
  );
  
  const lowPriority = missingInMk.filter(k => 
    !highPriority.includes(k) && !mediumPriority.includes(k)
  );
  
  console.log(`🔴 HIGH PRIORITY (${highPriority.length}): Main UI elements`);
  highPriority.forEach(k => console.log(`   - ${k.key}`));
  
  console.log(`🟡 MEDIUM PRIORITY (${mediumPriority.length}): Form fields and sections`);
  mediumPriority.forEach(k => console.log(`   - ${k.key}`));
  
  console.log(`🟢 LOW PRIORITY (${lowPriority.length}): Secondary elements`);
  lowPriority.forEach(k => console.log(`   - ${k.key}`));
  
  // Try to provide structure analysis
  console.log('\n📐 MACEDONIAN TRANSLATION STRUCTURE ANALYSIS:');
  console.log('-'.repeat(60));
  
  const advancedSearchSection = mkContent.match(/advancedSearch:\s*{[\s\S]*?(?=^\s*}\s*,?\s*$)/m);
  if (advancedSearchSection) {
    console.log('✅ advancedSearch section found in mk.ts');
    
    // Check for key subsections
    const hasFields = /fields:\s*{/.test(advancedSearchSection[0]);
    const hasPlaceholders = /placeholders:\s*{/.test(advancedSearchSection[0]);
    const hasSections = /sections:\s*{/.test(advancedSearchSection[0]);
    const hasStaticData = /staticVehicleData:\s*{/.test(advancedSearchSection[0]);
    
    console.log(`   - fields section: ${hasFields ? '✅' : '❌'}`);
    console.log(`   - placeholders section: ${hasPlaceholders ? '✅' : '❌'}`);
    console.log(`   - sections section: ${hasSections ? '✅' : '❌'}`);
    console.log(`   - staticVehicleData section: ${hasStaticData ? '✅' : '❌'}`);
  } else {
    console.log('❌ advancedSearch section NOT found in mk.ts');
  }
  
} catch (error) {
  console.error('❌ Error:', error.message);
}