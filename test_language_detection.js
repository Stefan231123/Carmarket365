// Simple test script to debug language detection
// Run this in browser console when on http://localhost:8081/sell-vehicle

console.log('=== Language Detection Test ===');

// Check current URL parameters
const urlParams = new URLSearchParams(window.location.search);
console.log('URL search params:', window.location.search);
console.log('lang parameter:', urlParams.get('lang'));

// Check localStorage
console.log('localStorage keys:', Object.keys(localStorage));
Object.keys(localStorage).filter(key => key.includes('Language')).forEach(key => {
    console.log(`${key}: ${localStorage.getItem(key)}`);
});

// Check if React context is available
setTimeout(() => {
    console.log('Checking page content...');
    
    // Look for specific translated text
    const bodyText = document.body.textContent;
    
    console.log('Contains "Каков тип на возило го продавате?":', bodyText.includes('Каков тип на возило го продавате?'));
    console.log('Contains "What type of vehicle are you selling?":', bodyText.includes('What type of vehicle are you selling?'));
    console.log('Contains "Автомобил":', bodyText.includes('Автомобил'));
    console.log('Contains "Car" (but not "Автомобил"):', bodyText.includes('Car') && !bodyText.includes('Автомобил'));
    console.log('Contains "Тип на возило":', bodyText.includes('Тип на возило'));
    console.log('Contains "Vehicle Type":', bodyText.includes('Vehicle Type'));
    
    // Check for React dev tools
    if (window.__REACT_DEVTOOLS_GLOBAL_HOOK__) {
        console.log('React DevTools detected');
    }
}, 3000);