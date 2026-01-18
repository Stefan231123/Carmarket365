#!/usr/bin/env node

// Simple test script to validate ExpressSell translations
const fs = require('fs');
const path = require('path');

console.log('Testing ExpressSell Page Translation Coverage\n');
console.log('============================================\n');

// Define expected keys from the ExpressSell component
const expectedKeys = [
  'finalFixes.expressSell.title',
  'finalFixes.expressSell.listMyCarQuickly',
  'finalFixes.expressSell.carDetailsStep', 
  'finalFixes.expressSell.photosStep',
  'finalFixes.expressSell.priceDescriptionStep',
  'finalFixes.expressSell.contactInfoStep',
  'finalFixes.expressSell.backToHome',
  'finalFixes.expressSell.previous',
  'finalFixes.expressSell.next',
  'finalFixes.expressSell.listMyCar',
  'expressSell.carDetails',
  'expressSell.carDetailsDescription',
  'expressSell.makeRequired',
  'expressSell.selectMake',
  'expressSell.modelRequired', 
  'expressSell.selectModel',
  'expressSell.yearRequired',
  'expressSell.selectYear',
  'expressSell.mileageRequired',
  'expressSell.fuelTypeRequired',
  'expressSell.selectFuelType',
  'expressSell.transmissionRequired',
  'expressSell.selectTransmission',
  'finalFixes.expressSell.conditionLabel',
  'finalFixes.expressSell.conditionPlaceholder',
  'finalFixes.expressSell.uploadPhotos',
  'finalFixes.expressSell.uploadPhotosDescription',
  'finalFixes.expressSell.uploadCarPhotos',
  'finalFixes.expressSell.addUpToTenPhotos',
  'finalFixes.expressSell.choosePhotos',
  'finalFixes.expressSell.mainPhoto',
  'finalFixes.expressSell.priceAndDescription',
  'finalFixes.expressSell.setPriceAndDescription',
  'finalFixes.expressSell.askingPriceEuros',
  'finalFixes.expressSell.priceExample',
  'finalFixes.expressSell.descriptionPlaceholder',
  'finalFixes.expressSell.contactInformation',
  'finalFixes.expressSell.howShouldBuyersContact',
  'finalFixes.expressSell.fullNameRequired',
  'finalFixes.expressSell.namePlaceholder',
  'finalFixes.expressSell.phoneNumberRequired',
  'finalFixes.expressSell.phonePlaceholder',
  'finalFixes.expressSell.emailAddressRequired',
  'finalFixes.expressSell.yourEmail',
  'finalFixes.expressSell.locationRequired',
  'finalFixes.expressSell.locationPlaceholder'
];

// Function to get nested value from object using dot notation
function getNestedValue(obj, key) {
  return key.split('.').reduce((currentObj, keyPart) => {
    return currentObj && currentObj[keyPart];
  }, obj);
}

// Test function for a specific language
function testLanguage(langCode, langName) {
  console.log(`\n${langName} (${langCode}) Translation Test:`);
  console.log('='.repeat(40));
  
  let translationsPath, translations;
  
  try {
    // Try to load the translation file
    translationsPath = path.join(__dirname, 'shared', 'translations', `${langCode}.ts`);
    const content = fs.readFileSync(translationsPath, 'utf8');
    
    // Parse the content to extract the default export object
    // This is a simplified parser - assumes the structure is consistent
    const startIndex = content.indexOf('export const');
    const objStartIndex = content.indexOf('{', startIndex);
    const objEndIndex = content.lastIndexOf('};');
    
    if (objStartIndex === -1 || objEndIndex === -1) {
      throw new Error('Could not parse translation object');
    }
    
    // Extract the object content
    const objContent = content.substring(objStartIndex, objEndIndex + 1);
    console.log(`✓ Translation file loaded: ${translationsPath}`);
    
    // Check for specific keys
    let missingKeys = [];
    let foundKeys = [];
    
    expectedKeys.forEach(key => {
      // Simple check if the key pattern exists in the file
      const keyParts = key.split('.');
      const lastPart = keyParts[keyParts.length - 1];
      
      // Look for the key pattern in the content
      if (content.includes(`${lastPart}:`)) {
        foundKeys.push(key);
      } else {
        missingKeys.push(key);
      }
    });
    
    console.log(`✓ Found ${foundKeys.length} of ${expectedKeys.length} expected keys`);
    
    if (missingKeys.length > 0) {
      console.log('\n❌ Missing keys:');
      missingKeys.forEach(key => console.log(`  - ${key}`));
    } else {
      console.log('\n✅ All required keys found!');
    }
    
    // Check for specific title translations
    const titleChecks = [
      { pattern: 'title:', expected: langCode === 'mk' ? 'Експресна продажба' : 'Shitje ekspres' },
      { pattern: 'carDetailsStep:', expected: langCode === 'mk' ? 'Детали за возилото' : 'Detajet e automjetit' },
      { pattern: 'photosStep:', expected: langCode === 'mk' ? 'Фотографии' : 'Fotot' },
      { pattern: 'priceDescriptionStep:', expected: langCode === 'mk' ? 'Цена и опис' : 'Çmimi dhe përshkrimi' },
      { pattern: 'contactInfoStep:', expected: langCode === 'mk' ? 'Контакт информации' : 'Informacionet e kontaktit' }
    ];
    
    console.log('\n🔍 Step title validation:');
    titleChecks.forEach(check => {
      if (content.includes(check.expected)) {
        console.log(`  ✓ ${check.pattern} "${check.expected}"`);
      } else {
        console.log(`  ❌ ${check.pattern} translation not found or incorrect`);
      }
    });
    
  } catch (error) {
    console.log(`❌ Error loading ${langName} translations:`, error.message);
  }
}

// Test both languages
testLanguage('mk', 'Macedonian');
testLanguage('sq', 'Albanian');

console.log('\n' + '='.repeat(50));
console.log('Translation Test Complete');
console.log('='.repeat(50));