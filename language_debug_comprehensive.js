// Comprehensive Language Detection Debug Script
// Run this in browser console when visiting: http://localhost:8082/saved?country=mk&lang=mk

console.log('🚀 COMPREHENSIVE LANGUAGE DETECTION DEBUG');
console.log('==========================================');

// 1. Environment Detection
console.log('\n📍 ENVIRONMENT DETECTION');
const currentUrl = window.location.href;
const hostname = window.location.hostname;
const search = window.location.search;
const pathname = window.location.pathname;

console.log('URL:', currentUrl);
console.log('Hostname:', hostname);
console.log('Pathname:', pathname);
console.log('Search params:', search);

// 2. URL Parameter Analysis
console.log('\n🔍 URL PARAMETER ANALYSIS');
const urlParams = new URLSearchParams(window.location.search);
const countryParam = urlParams.get('country');
const langParam = urlParams.get('lang');

console.log('Country param:', countryParam);
console.log('Lang param:', langParam);
console.log('Expected: country=mk, lang=mk');

if (countryParam === 'mk' && langParam === 'mk') {
    console.log('✅ URL parameters are correct');
} else {
    console.log('❌ URL parameters are incorrect or missing');
}

// 3. LocalStorage Analysis
console.log('\n💾 LOCALSTORAGE ANALYSIS');
const allStorageKeys = Object.keys(localStorage);
const languageKeys = allStorageKeys.filter(key => key.includes('Language') || key.includes('Country'));

console.log('All storage keys:', allStorageKeys);
console.log('Language-related keys:', languageKeys);

languageKeys.forEach(key => {
    console.log(`${key}: ${localStorage.getItem(key)}`);
});

// Key storage items to check
const storedLangMK = localStorage.getItem('selectedLanguage_mk');
const storedLangGeneral = localStorage.getItem('selectedLanguage');
const storedCountry = localStorage.getItem('dev_selectedCountry');

console.log('\nKey storage items:');
console.log('selectedLanguage_mk:', storedLangMK);
console.log('selectedLanguage:', storedLangGeneral);
console.log('dev_selectedCountry:', storedCountry);

// 4. Page Content Analysis
console.log('\n📄 PAGE CONTENT ANALYSIS');

// Wait for React to render, then analyze content
setTimeout(() => {
    console.log('\n⏱️ ANALYZING RENDERED CONTENT (after 3 second delay)');
    
    // Check page title
    const h1Elements = document.querySelectorAll('h1');
    h1Elements.forEach((h1, index) => {
        const text = h1.textContent || h1.innerText;
        console.log(`H1 #${index + 1}: "${text}"`);
        
        if (text.includes('Зачувани')) {
            console.log('✅ Found Macedonian title: "Зачувани возила"');
        } else if (text.includes('Makinat e')) {
            console.log('❌ Found Albanian title: "Makinat e ruajtura" - BUG DETECTED!');
        } else if (text.includes('Saved')) {
            console.log('⚠️ Found English title - using fallback');
        } else {
            console.log('❓ Unknown language in title');
        }
    });
    
    // Check buttons
    const buttons = document.querySelectorAll('button');
    let backButtonFound = false;
    buttons.forEach((btn, index) => {
        const text = btn.textContent || btn.innerText;
        if (text.includes('Back') || text.includes('Назад') || text.includes('Kthehu') || text.includes('Mbrapa')) {
            console.log(`Back button #${index + 1}: "${text}"`);
            backButtonFound = true;
            
            if (text.includes('Назад')) {
                console.log('✅ Back button is in Macedonian');
            } else if (text.includes('Kthehu') || text.includes('Mbrapa')) {
                console.log('❌ Back button is in Albanian - BUG CONFIRMED!');
            } else {
                console.log('⚠️ Back button is in English');
            }
        }
    });
    
    if (!backButtonFound) {
        console.log('❓ No back button found');
    }
    
    // Check for any text that reveals the language
    const allText = document.body.textContent || document.body.innerText;
    
    if (allText.includes('Зачувани возила')) {
        console.log('✅ Page contains Macedonian text');
    } else if (allText.includes('Makinat e ruajtura')) {
        console.log('❌ Page contains Albanian text - LANGUAGE BUG CONFIRMED!');
    } else {
        console.log('⚠️ No definitive language indicators found in page text');
    }
    
}, 3000);

// 5. React Context Debugging
console.log('\n⚛️ REACT CONTEXT DEBUGGING');

// Try to access React DevTools or context
setTimeout(() => {
    console.log('\n🔧 ATTEMPTING TO ACCESS REACT CONTEXT');
    
    // Look for any exposed React context or state
    if (window.React || window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        console.log('✅ React detected on page');
    } else {
        console.log('❌ React not detected in global scope');
    }
    
    // Check for any exposed CountryContext or translation state
    const possibleContextElements = document.querySelectorAll('[data-*]');
    console.log('Elements with data attributes:', possibleContextElements.length);
    
}, 1000);

// 6. Console Message Monitoring
console.log('\n👂 MONITORING CONSOLE MESSAGES');
console.log('Looking for messages starting with "🌍 CountryContext:" or "🔧"');
console.log('These will show the actual language detection process...');

// Override console.log temporarily to capture CountryContext messages
const originalConsoleLog = console.log;
const contextMessages = [];

console.log = function(...args) {
    const message = args.join(' ');
    if (message.includes('🌍 CountryContext') || message.includes('CountryContext')) {
        contextMessages.push(message);
    }
    return originalConsoleLog.apply(console, args);
};

// Restore console.log after 5 seconds and show captured messages
setTimeout(() => {
    console.log = originalConsoleLog;
    
    console.log('\n📝 CAPTURED COUNTRYCONTEXT MESSAGES:');
    if (contextMessages.length > 0) {
        contextMessages.forEach(msg => console.log('💬', msg));
    } else {
        console.log('❌ No CountryContext messages captured');
    }
    
    // 7. Final Analysis
    console.log('\n📊 FINAL ANALYSIS');
    console.log('==================');
    console.log('URL:', window.location.href);
    console.log('Expected: Macedonian language (mk) should be detected');
    console.log('Expected text: "Зачувани возила" (Saved Vehicles in Macedonian)');
    console.log('Problematic text: "Makinat e ruajtura" (Saved Vehicles in Albanian)');
    
    console.log('\n🎯 DIAGNOSIS CHECKLIST:');
    console.log('1. ✓ URL has correct parameters: ?country=mk&lang=mk');
    console.log('2. ? CountryContext is processing URL parameters correctly');
    console.log('3. ? useTranslation is receiving correct language from context');
    console.log('4. ? Translation function is returning Macedonian instead of Albanian');
    
    console.log('\n💡 NEXT STEPS:');
    console.log('- Check browser console for 🌍 CountryContext messages');
    console.log('- Verify if currentLanguage in CountryContext matches URL param');
    console.log('- Test if changing URL to ?lang=sq shows Albanian (expected)');
    console.log('- Test if changing URL to ?lang=en shows English (expected)');
    
}, 5000);

// 8. Additional URL Parameter Test
console.log('\n🧪 TESTING URL PARAMETER VARIATIONS');
console.log('Current URL should have: ?country=mk&lang=mk');
console.log('Test these variations manually:');
console.log('1. ?lang=mk (should show Macedonian)');
console.log('2. ?lang=sq (should show Albanian)');
console.log('3. ?lang=en (should show English)');
console.log('4. No parameters (should default to Macedonian)');