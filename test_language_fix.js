// Quick test to verify language detection fix
// Run this in browser console at: http://localhost:8082/saved?country=mk&lang=mk

function testLanguageDetectionFix() {
  console.log('🧪 TESTING LANGUAGE DETECTION FIX');
  console.log('=================================');
  
  // Check URL parameters
  const urlParams = new URLSearchParams(window.location.search);
  const langParam = urlParams.get('lang');
  const countryParam = urlParams.get('country');
  
  console.log('URL Parameters:');
  console.log('  country:', countryParam);
  console.log('  lang:', langParam);
  
  // Check localStorage
  const storedLang = localStorage.getItem('selectedLanguage_mk');
  console.log('\nLocalStorage:');
  console.log('  selectedLanguage_mk:', storedLang);
  
  // Check page content after 2 seconds to allow React to render
  setTimeout(() => {
    const pageTitle = document.querySelector('h1')?.textContent;
    const backButton = document.querySelector('[data-testid="back-button"], button:contains("Назад"), button:contains("Mbrapa"), button:contains("Back")')?.textContent;
    
    console.log('\nPage Content:');
    console.log('  Title:', pageTitle);
    console.log('  Back button:', backButton);
    
    // Language detection
    if (pageTitle?.includes('Зачувани') || pageTitle?.includes('возила')) {
      console.log('✅ SUCCESS: Macedonian language detected!');
    } else if (pageTitle?.includes('Makinat') || pageTitle?.includes('ruajtura')) {
      console.log('❌ ISSUE: Albanian language detected (should be Macedonian)');
    } else if (pageTitle?.includes('Saved') || pageTitle?.includes('Cars')) {
      console.log('⚠️ WARNING: English language detected');
    } else {
      console.log('❓ UNKNOWN: Could not determine language from title:', pageTitle);
    }
    
    return {
      urlParams: { country: countryParam, lang: langParam },
      localStorage: { selectedLanguage_mk: storedLang },
      pageContent: { title: pageTitle, backButton }
    };
  }, 2000);
}

// Auto-run if on the saved page
if (window.location.pathname === '/saved') {
  testLanguageDetectionFix();
} else {
  console.log('Navigate to /saved?country=mk&lang=mk first, then run testLanguageDetectionFix()');
}