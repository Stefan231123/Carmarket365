# Language Detection Issue Debug Report

## Issue Summary
The saved page (`/saved?country=mk&lang=mk`) is displaying Albanian text instead of Macedonian text despite the URL parameters clearly specifying `lang=mk` (Macedonian).

## Expected Behavior
- URL: `http://localhost:8082/saved?country=mk&lang=mk`
- Expected title: "Зачувани возила" (Macedonian)
- Expected back button: "Назад" (Macedonian)

## Actual Behavior
- Same URL shows Albanian text instead
- Title appears as "Makinat e ruajtura" (Albanian)
- Back button shows "Kthehu" or "Mbrapa" (Albanian)

## Root Cause Analysis

### 1. CountryContext Race Condition
The primary issue appears to be in `/client/contexts/CountryContext.tsx` lines 75-171. There are multiple initialization paths that could cause incorrect language selection:

**Problem Areas:**
- Lines 86-100: Language is set from localStorage or default BEFORE URL parameters are checked
- Lines 45-73: URL parameter handling runs in a separate useEffect that depends on `country` being set
- Lines 127-138: For localhost, language logic runs but may be overridden

### 2. Translation System Verification
The translation system itself appears correct:
- Macedonian translations exist in `/shared/translations/mk.ts`
- Albanian translations exist in `/shared/translations/sq.ts` 
- `finalFixes.savedCars.title` exists in both languages
- Translation function properly falls back to English if key missing

### 3. URL Parameter Processing Order
The issue is likely in the order of operations:
1. `initializeCountryDetection()` runs first (lines 75-171)
2. Sets country and language from localStorage/default
3. URL parameter handler runs second (lines 45-73)
4. But language may already be set incorrectly

## Debugging Steps Performed

### 1. Code Analysis ✅
- Reviewed CountryContext implementation
- Verified translation files contain correct keys
- Checked route configuration
- Analyzed useTranslation hook

### 2. Translation Content Verification ✅
- Confirmed Macedonian translations: `finalFixes.savedCars.title: 'Зачувани возила'`
- Confirmed Albanian translations: `finalFixes.savedCars.title: 'Makinat e ruajtura'`

### 3. Local Server Testing ✅
- Started development server on http://localhost:8082
- Created debug scripts to test language detection logic

## Recommended Testing Steps

### Manual Browser Testing
1. Visit: `http://localhost:8082/saved?country=mk&lang=mk`
2. Open browser console and run the debug script at `/language_debug_comprehensive.js`
3. Look for console messages starting with "🌍 CountryContext:"
4. Check what language is actually detected vs expected

### Test Variations
1. `http://localhost:8082/saved?lang=mk` (without country param)
2. `http://localhost:8082/saved?lang=sq` (should show Albanian)
3. `http://localhost:8082/saved?lang=en` (should show English)
4. `http://localhost:8082/express-sell?lang=mk` (compare with different page)

### Console Debug Commands
```javascript
// Run in browser console:
console.log('Current language:', document.querySelector('h1')?.textContent);
console.log('URL params:', new URLSearchParams(window.location.search));
console.log('LocalStorage:', localStorage.getItem('selectedLanguage_mk'));
```

## Recommended Fixes

### Fix 1: Prioritize URL Parameters (Recommended)
Modify `CountryContext.tsx` to check URL parameters BEFORE setting language from localStorage:

```typescript
// In initializeCountryDetection, line 85-100, change order:
const urlParams = new URLSearchParams(window.location.search);
const langParam = urlParams.get('lang');

// Check URL param first, then localStorage, then default
if (langParam && validLanguages.includes(langParam)) {
  console.log('🌍 CountryContext: Using URL language parameter:', langParam);
  setCurrentLanguage(langParam);
} else if (storedLanguage && validLanguages.includes(storedLanguage)) {
  console.log('🌍 CountryContext: Using stored language:', storedLanguage);
  setCurrentLanguage(storedLanguage);
} else {
  console.log('🌍 CountryContext: Using default language:', domainCountry.defaultLanguage);
  setCurrentLanguage(domainCountry.defaultLanguage);
}
```

### Fix 2: Add Debug Logging
Add more detailed logging to identify exactly when and why the language switches:

```typescript
// Add at the beginning of setCurrentLanguage calls:
console.log('🌍 CountryContext: Setting language to:', langParam, 'from source:', 'URL_PARAM');
```

### Fix 3: Clear localStorage for Testing
Clear any cached language preferences that might interfere:

```javascript
localStorage.removeItem('selectedLanguage_mk');
localStorage.removeItem('selectedLanguage');
localStorage.removeItem('dev_selectedCountry');
```

## Testing Checklist

### Pre-Fix Verification
- [ ] Confirm issue exists on `/saved?country=mk&lang=mk`
- [ ] Verify Macedonian translations are available
- [ ] Check console for CountryContext debug messages
- [ ] Test other pages with same URL params

### Post-Fix Verification  
- [ ] `/saved?country=mk&lang=mk` shows Macedonian
- [ ] `/saved?country=mk&lang=sq` shows Albanian
- [ ] Language switching works correctly
- [ ] No console errors
- [ ] localStorage preferences still work when no URL params

## Additional Notes

### LocalStorage Interference
Check if there are conflicting values in localStorage that override URL parameters:
- `selectedLanguage_mk`
- `selectedLanguage` 
- `dev_selectedCountry`

### Vercel Deployment Testing
The issue may behave differently on Vercel vs localhost due to different hostname detection logic in `getCurrentCountry()`.

### Browser Cache
Clear browser cache and cookies to ensure clean testing environment.

---

## Quick Debug Commands

Run these in the browser console when visiting the problematic URL:

```javascript
// Check current state
console.log('URL:', window.location.href);
console.log('Title:', document.querySelector('h1')?.textContent);
console.log('Lang param:', new URLSearchParams(window.location.search).get('lang'));

// Check translation system
console.log('Available languages:', ['mk', 'sq', 'sl', 'lv', 'ru', 'en']);

// Test specific translation
// (This would require accessing the translation functions)
```