// Direct browser test for saved page language detection
// This script will be run in the browser console to debug the issue

console.log('🔧 DEBUGGING SAVED PAGE LANGUAGE DETECTION');
console.log('============================================');

// 1. Check current URL and parameters
const currentUrl = window.location.href;
const urlParams = new URLSearchParams(window.location.search);
const countryParam = urlParams.get('country');
const langParam = urlParams.get('lang');

console.log('📍 Current URL:', currentUrl);
console.log('📍 Country param:', countryParam);
console.log('📍 Language param:', langParam);

// 2. Check hostname detection
const hostname = window.location.hostname;
const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('localhost:');
const isVercel = hostname.includes('vercel.app');

console.log('🌐 Hostname:', hostname);
console.log('🌐 Is localhost:', isLocalhost);
console.log('🌐 Is Vercel:', isVercel);

// 3. Check localStorage
const storedLangMK = localStorage.getItem('selectedLanguage_mk');
const storedLang = localStorage.getItem('selectedLanguage');
const storedCountry = localStorage.getItem('dev_selectedCountry');

console.log('💾 LocalStorage selectedLanguage_mk:', storedLangMK);
console.log('💾 LocalStorage selectedLanguage:', storedLang);
console.log('💾 LocalStorage dev_selectedCountry:', storedCountry);

// 4. Check if React Context is available
setTimeout(() => {
    console.log('\n🔍 CHECKING REACT CONTEXT STATE');
    console.log('===============================');
    
    // Try to access the CountryContext if it's available
    const countryContextElements = document.querySelectorAll('[data-country-context]');
    if (countryContextElements.length > 0) {
        console.log('✅ Country context elements found:', countryContextElements.length);
    } else {
        console.log('❌ No country context elements found');
    }
    
    // Check for any console messages that might indicate language detection
    console.log('\n📝 Please check the browser console for any messages starting with "🌍 CountryContext:"');
    console.log('These messages will show the actual language detection process in the React app.');
    
    // Check for translation text on the page
    const titleElement = document.querySelector('h1');
    if (titleElement) {
        console.log('📄 Page title text:', titleElement.textContent);
        
        // Check if it's in Macedonian or Albanian
        if (titleElement.textContent.includes('Зачувани')) {
            console.log('✅ Title is in Macedonian (Зачувани возила)');
        } else if (titleElement.textContent.includes('Makinat e')) {
            console.log('❌ Title is in Albanian (Makinat e ruajtura) - THIS IS THE BUG!');
        } else {
            console.log('⚠️ Title is in unknown language:', titleElement.textContent);
        }
    }
    
    // Check for other text elements that might reveal the language
    const backButton = document.querySelector('button');
    if (backButton && backButton.textContent) {
        console.log('🔙 Back button text:', backButton.textContent);
        
        if (backButton.textContent.includes('Назад')) {
            console.log('✅ Back button is in Macedonian (Назад)');
        } else if (backButton.textContent.includes('Kthehu') || backButton.textContent.includes('Mbrapa')) {
            console.log('❌ Back button is in Albanian - THIS CONFIRMS THE BUG!');
        }
    }
    
}, 2000); // Wait 2 seconds for React to render

// 5. Test the country-config getCurrentCountry function
console.log('\n🧪 TESTING COUNTRY DETECTION LOGIC');
console.log('==================================');

// Simulate the getCurrentCountry function logic
function testGetCurrentCountry() {
    const hostname = window.location.hostname;
    const isVercel = hostname.includes('vercel.app');
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('localhost:');
    
    console.log('🧪 Testing getCurrentCountry logic...');
    console.log('🧪 Hostname:', hostname);
    console.log('🧪 Is Vercel:', isVercel);
    console.log('🧪 Is localhost:', isLocalhost);
    
    if (isVercel || isLocalhost) {
        const urlParams = new URLSearchParams(window.location.search);
        const countryCode = urlParams.get('country');
        console.log('🧪 Country code from URL:', countryCode);
        
        if (countryCode && countryCode === 'mk') {
            console.log('✅ Should return Macedonia country config');
            return { code: 'mk', defaultLanguage: 'mk' };
        } else {
            console.log('⚠️ No country param, defaulting to Macedonia');
            return { code: 'mk', defaultLanguage: 'mk' };
        }
    }
    
    return { code: 'mk', defaultLanguage: 'mk' };
}

const testCountry = testGetCurrentCountry();
console.log('🧪 Test country result:', testCountry);

console.log('\n📋 SUMMARY');
console.log('==========');
console.log('Expected: Macedonian language (mk) with "Зачувани возила" title');
console.log('URL parameters: country=mk, lang=mk');
console.log('Check the console output above and the page content to see what\'s actually happening.');