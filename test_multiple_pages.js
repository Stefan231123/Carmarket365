// Test script to compare language detection across multiple pages
// This will help identify if the issue is specific to SavedCars or affects all pages

const testUrls = [
    'http://localhost:8082/saved?country=mk&lang=mk',
    'http://localhost:8082/express-sell?lang=mk',
    'http://localhost:8082/?country=mk&lang=mk',
    'http://localhost:8082/sell-vehicle?country=mk&lang=mk'
];

console.log('🧪 MULTI-PAGE LANGUAGE DETECTION TEST');
console.log('=====================================');

function testLanguageDetection(url) {
    console.log(`\n🔗 Testing URL: ${url}`);
    
    // Extract expected parameters
    const urlObj = new URL(url);
    const params = new URLSearchParams(urlObj.search);
    const expectedCountry = params.get('country') || 'mk';
    const expectedLang = params.get('lang') || 'mk';
    
    console.log(`Expected: country=${expectedCountry}, lang=${expectedLang}`);
    console.log(`Page: ${urlObj.pathname}`);
    
    return {
        url,
        expectedCountry,
        expectedLang,
        pathname: urlObj.pathname
    };
}

// Test all URLs
const testResults = testUrls.map(url => testLanguageDetection(url));

console.log('\n📊 TEST SUMMARY');
console.log('===============');
testResults.forEach((result, index) => {
    console.log(`${index + 1}. ${result.pathname} - Should show Macedonian (mk)`);
});

console.log('\n📝 MANUAL TESTING INSTRUCTIONS');
console.log('==============================');
console.log('Visit each URL above and check:');
console.log('1. Page title language (should be in Macedonian)');
console.log('2. Navigation elements language');
console.log('3. Console messages from CountryContext');
console.log('4. Any Albanian text appearing (indicates bug)');

console.log('\n🎯 SPECIFIC THINGS TO LOOK FOR');
console.log('==============================');
console.log('SavedCars page:');
console.log('  ✅ Correct: "Зачувани возила" (Macedonian)');
console.log('  ❌ Bug: "Makinat e ruajtura" (Albanian)');
console.log('');
console.log('ExpressSell page:');
console.log('  ✅ Correct: Macedonian text in form labels');
console.log('  ❌ Bug: Albanian text in form labels');
console.log('');
console.log('Home page:');
console.log('  ✅ Correct: "Најдете го вашето совршено возило" (Macedonian)');
console.log('  ❌ Bug: "Gjeni Makinën Tuaj të Përsosur" (Albanian)');

console.log('\n🔧 DEBUGGING TIPS');
console.log('=================');
console.log('1. Open browser console before visiting each URL');
console.log('2. Look for messages starting with "🌍 CountryContext:"');
console.log('3. Note the order of language detection messages');
console.log('4. Check if URL parameters are being processed correctly');
console.log('5. Verify localStorage doesn\'t interfere with URL params');

// Helper function to be run in browser console
console.log('\n📋 BROWSER CONSOLE HELPER');
console.log('=========================');
console.log('Copy and paste this into browser console on each page:');
console.log(`
function quickLanguageCheck() {
    const url = window.location.href;
    const title = document.querySelector('h1')?.textContent || 'No title found';
    const langParam = new URLSearchParams(window.location.search).get('lang');
    const storedLang = localStorage.getItem('selectedLanguage_mk');
    
    console.log('=== QUICK LANGUAGE CHECK ===');
    console.log('URL:', url);
    console.log('Title:', title);
    console.log('Lang param:', langParam);
    console.log('Stored lang:', storedLang);
    
    // Detect language from title
    if (title.includes('Зачувани') || title.includes('возило') || title.includes('Продај')) {
        console.log('✅ MACEDONIAN detected');
    } else if (title.includes('Makinat') || title.includes('automjet') || title.includes('Shit')) {
        console.log('❌ ALBANIAN detected - BUG!');
    } else if (title.includes('Find') || title.includes('Car') || title.includes('Sell')) {
        console.log('⚠️ ENGLISH detected');
    } else {
        console.log('❓ UNKNOWN language');
    }
    
    return { url, title, langParam, storedLang };
}

// Run the check
quickLanguageCheck();
`);