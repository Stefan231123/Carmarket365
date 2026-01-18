// Quick translation system test to verify key resolution
// This script will help identify the exact issue with translation keys

// Import the translation system directly
const { translate, translateWithObjects, translations } = require('./shared/translations.ts');

// Test data - keys that are causing issues
const testKeys = [
  'pages.cookiePolicy.title',
  'pages.accessibility.title',
  'pages.imprint.title',
  'pages.termsOfService.title'
];

// Test languages
const testLanguages = ['mk', 'sq', 'en'];

console.log('🔍 CarMarket365 Translation Testing Report');
console.log('='.repeat(50));

// Test each language and key combination
testLanguages.forEach(language => {
  console.log(`\n📍 Testing language: ${language.toUpperCase()}`);
  console.log('-'.repeat(30));
  
  // Check if translation object exists
  const translationObj = translations[language];
  if (!translationObj) {
    console.log(`❌ No translation object found for ${language}`);
    return;
  }
  
  console.log(`✅ Translation object loaded for ${language}`);
  
  // Test each key
  testKeys.forEach(key => {
    try {
      const result = translate(language, key);
      console.log(`📝 ${key}: "${result}"`);
      
      // Check if it's a fallback or error message
      if (result.includes('Missing:') || result.includes('Invalid:')) {
        console.log(`⚠️  Error detected for key: ${key}`);
        
        // Let's manually check the path
        const keys = key.split('.');
        let current = translationObj;
        let path = '';
        
        for (let i = 0; i < keys.length; i++) {
          const k = keys[i];
          path += (path ? '.' : '') + k;
          
          if (current && typeof current === 'object' && k in current) {
            current = current[k];
            console.log(`  ✓ Found: ${path} = ${typeof current === 'object' ? '[object]' : current}`);
          } else {
            console.log(`  ❌ Missing: ${path}`);
            break;
          }
        }
      }
    } catch (error) {
      console.log(`❌ Error translating ${key}: ${error.message}`);
    }
  });
  
  // Test with objects to see if nested objects work
  console.log('\n🔍 Testing object resolution:');
  testKeys.forEach(key => {
    try {
      const parentKey = key.substring(0, key.lastIndexOf('.'));
      const objectResult = translateWithObjects(language, parentKey);
      console.log(`📦 ${parentKey}: ${typeof objectResult} (${Array.isArray(objectResult) ? 'array' : typeof objectResult})`);
      
      if (typeof objectResult === 'object' && !Array.isArray(objectResult)) {
        const childKey = key.substring(key.lastIndexOf('.') + 1);
        if (objectResult && childKey in objectResult) {
          console.log(`  ✓ Child ${childKey}: "${objectResult[childKey]}"`);
        } else {
          console.log(`  ❌ Child ${childKey}: not found in object`);
        }
      }
    } catch (error) {
      console.log(`❌ Error getting object for ${key}: ${error.message}`);
    }
  });
});

console.log('\n🔍 Quick Direct Access Test:');
console.log('-'.repeat(30));

// Test direct access to see what the structure really looks like
testLanguages.forEach(language => {
  const trans = translations[language];
  if (trans && trans.pages) {
    console.log(`\n${language.toUpperCase()} pages structure:`);
    console.log(`- cookiePolicy type: ${typeof trans.pages.cookiePolicy}`);
    console.log(`- accessibility type: ${typeof trans.pages.accessibility}`);
    console.log(`- imprint type: ${typeof trans.pages.imprint}`);
    
    if (typeof trans.pages.cookiePolicy === 'object') {
      console.log(`- cookiePolicy.title: "${trans.pages.cookiePolicy.title || 'undefined'}"`);
    }
    if (typeof trans.pages.accessibility === 'object') {
      console.log(`- accessibility.title: "${trans.pages.accessibility.title || 'undefined'}"`);
    }
  } else {
    console.log(`${language.toUpperCase()}: pages object not found`);
  }
});

console.log('\n✅ Translation Test Complete');