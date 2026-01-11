# CarMarket365 Translation System - Detailed Test Cases

## Test Case Execution Guide

This document contains the comprehensive test cases for validating the CarMarket365 translation system across all 6 supported languages (English, Macedonian, Albanian, Slovenian, Latvian, Russian) and 33 pages.

## Test Environment Setup

### Prerequisites
- Node.js 18+ installed
- All project dependencies installed (`npm install`)
- Development server running (`npm run dev`)
- Access to all 6 language versions
- Test browsers installed (Chrome, Firefox, Safari, Edge)

### Test Data Requirements
- Sample car listings in all languages
- Test user accounts for each user type (admin, dealer, private)
- Mock form data for each supported language
- Test images and media files

## Section 1: Translation Key Coverage Test Cases

### TC-TKC-001: Hardcoded String Detection
**Objective**: Verify no hardcoded strings exist in production code
**Priority**: Critical
**Estimated Time**: 30 minutes

**Pre-conditions**:
- Access to codebase
- Translation validation script available

**Test Steps**:
1. Navigate to project root directory
2. Run hardcoded string detection script
3. Review all reported hardcoded strings
4. Verify each string is either:
   - Wrapped in t() function, or
   - Is a legitimate constant (URLs, IDs, etc.)
5. Document any violations

**Test Data**: All .tsx and .ts files in client directory

**Expected Results**:
- Zero hardcoded user-facing strings found
- All UI text uses t('translation.key') pattern
- Console output shows "0 hardcoded strings found"

**Pass Criteria**: 
- ✅ No hardcoded user-facing strings detected
- ✅ All strings use proper translation function calls

### TC-TKC-002: Translation Key Completeness Validation
**Objective**: Validate all translation keys exist across all languages
**Priority**: Critical  
**Estimated Time**: 45 minutes

**Pre-conditions**:
- All language files are available
- Translation validation script ready

**Test Steps**:
1. Load English translation file as reference
2. Extract all translation keys from English file
3. For each of the 5 other languages:
   a. Load language translation file
   b. Compare keys with English reference
   c. Identify missing keys
   d. Identify extra keys (not in English)
4. Generate completeness report
5. Document all discrepancies

**Test Data**: 
- /shared/translations/en.ts
- /shared/translations/mk.ts
- /shared/translations/sq.ts
- /shared/translations/sl.ts
- /shared/translations/lv.ts
- /shared/translations/ru.ts

**Expected Results**:
- 100% key parity across all language files
- Total of 2000+ keys in each language
- Zero missing keys in any language

**Pass Criteria**:
- ✅ All 6 languages have identical key structure
- ✅ No missing translations in any language file
- ✅ Key count matches across all files

### TC-TKC-003: TypeScript Interface Validation
**Objective**: Ensure TypeScript interfaces match translation structure
**Priority**: High
**Estimated Time**: 20 minutes

**Test Steps**:
1. Compile TypeScript project
2. Check for compilation errors related to translations
3. Verify TranslationStrings interface covers all sections
4. Test interface type safety with sample translations
5. Validate nested object structure matches interface

**Expected Results**:
- TypeScript compilation succeeds without errors
- Interface properly defines all translation sections
- Type safety enforced for translation keys

**Pass Criteria**:
- ✅ No TypeScript compilation errors
- ✅ Interface structure matches translation files
- ✅ Type safety properly enforced

## Section 2: Cross-Language Consistency Test Cases

### TC-CLC-001: Automotive Terminology Consistency
**Objective**: Verify consistent automotive terminology across languages
**Priority**: High
**Estimated Time**: 60 minutes

**Pre-conditions**:
- Access to all language files
- Automotive terminology reference list

**Test Steps**:
1. Create list of key automotive terms in English
2. For each term, find all instances across all languages
3. Verify consistency in translation choices
4. Check technical specification translations
5. Validate brand name handling
6. Review model name consistency

**Test Data**:
Key terms to validate:
- Make/Model terminology
- Fuel types (gasoline, diesel, electric, hybrid)
- Transmission types (manual, automatic, CVT)
- Body types (sedan, SUV, hatchback, etc.)
- Condition descriptors (excellent, good, fair, etc.)
- Technical specifications

**Expected Results**:
- Consistent terminology across all similar contexts
- Technical terms accurately translated
- Brand names handled consistently

**Pass Criteria**:
- ✅ Automotive terminology consistent within each language
- ✅ Technical specifications accurately translated
- ✅ No conflicting translations for same concepts

### TC-CLC-002: Currency and Units Localization
**Objective**: Validate proper currency and measurement unit handling
**Priority**: Medium
**Estimated Time**: 30 minutes

**Test Steps**:
1. Check currency symbols used in each language
2. Verify number formatting (decimal separators, thousands separators)
3. Validate measurement units (km vs miles, liters vs gallons)
4. Test date format localization
5. Check address format appropriateness

**Test Data**:
- Price displays across all pages
- Mileage/kilometer displays
- Date formats in listings
- Address formats in dealer profiles

**Expected Results**:
- Appropriate currency symbols for each market
- Correct number formatting conventions
- Proper measurement units for each region

**Pass Criteria**:
- ✅ Currency formatting matches regional standards
- ✅ Measurement units appropriate for each market
- ✅ Date/time formats localized correctly

### TC-CLC-003: Cultural Adaptation Validation
**Objective**: Ensure content is culturally appropriate for each market
**Priority**: Medium
**Estimated Time**: 45 minutes

**Test Steps**:
1. Review About page content for cultural relevance
2. Check FAQ examples and scenarios
3. Validate contact methods and business hours
4. Review legal page content for local compliance
5. Check imagery and example content appropriateness

**Expected Results**:
- Content culturally relevant for each market
- Examples and scenarios appropriate for local context
- Legal content meets local requirements

**Pass Criteria**:
- ✅ Content culturally appropriate for target markets
- ✅ Examples relevant to local contexts
- ✅ No cultural insensitivity detected

## Section 3: Functional Integration Test Cases

### TC-FIT-001: useTranslation Hook Functionality
**Objective**: Verify useTranslation hook works correctly
**Priority**: Critical
**Estimated Time**: 30 minutes

**Test Steps**:
1. Open browser developer tools
2. Navigate to any page with translations
3. Inspect React components using translation hook
4. Verify hook returns current language correctly
5. Test t() function returns proper translations
6. Validate error handling for missing context
7. Test hook behavior during language switches

**Test Data**: Any page component using useTranslation hook

**Expected Results**:
- Hook properly accesses CountryContext
- t() function returns correct translated strings
- currentLanguage reflects active language
- Proper error handling when context missing

**Pass Criteria**:
- ✅ Hook integrates properly with context
- ✅ Translation function returns correct values
- ✅ Error handling works for edge cases

### TC-FIT-002: Language Switching Functionality  
**Objective**: Test dynamic language switching works correctly
**Priority**: Critical
**Estimated Time**: 45 minutes

**Test Steps**:
1. Navigate to homepage
2. Note current language content
3. Open language selector/country switcher
4. Select different language
5. Verify immediate content update
6. Navigate to different pages
7. Confirm language persists across navigation
8. Test browser refresh maintains language choice
9. Verify URL or localStorage reflects language choice

**Test Data**: All major pages (Index, BrowseCars, SellCar, About, Contact, FAQ)

**Expected Results**:
- Content immediately updates to new language
- Language choice persists across page navigation
- Browser refresh maintains language selection
- All UI elements update synchronously

**Pass Criteria**:
- ✅ Language switching works immediately
- ✅ Choice persists across navigation
- ✅ No delays or inconsistencies in content updates

### TC-FIT-003: Component Re-rendering After Language Change
**Objective**: Verify components properly re-render with new language
**Priority**: High
**Estimated Time**: 60 minutes

**Test Steps**:
1. Open page in initial language
2. Take screenshot/note content
3. Switch language via selector
4. Verify each major component updated:
   - Header navigation
   - Main content area
   - Form labels and placeholders
   - Button text
   - Footer content
5. Test modal dialogs and popups
6. Check dropdown options and selections
7. Validate form error messages update

**Test Data**: 
- Header navigation items
- Hero section content
- Form components
- Modal dialogs
- Search filters
- Error messages

**Expected Results**:
- All components re-render with new language
- No stale content remains from previous language
- Dynamic content updates correctly

**Pass Criteria**:
- ✅ All components update to new language
- ✅ No mixed language content visible
- ✅ Dynamic elements properly updated

## Section 4: UI/UX Translation Test Cases

### TC-UXT-001: Responsive Design with Various Text Lengths
**Objective**: Test layout integrity with different language text lengths
**Priority**: High
**Estimated Time**: 90 minutes

**Test Steps**:
1. Test each page in all 6 languages on desktop (1920x1080)
2. Test each page in all 6 languages on tablet (768x1024)
3. Test each page in all 6 languages on mobile (375x812)
4. For each language/device combination, check:
   - Text overflow or truncation
   - Button sizing and spacing
   - Navigation menu layouts
   - Form field alignments
   - Modal dialog sizing
   - Footer content layout

**Test Data**: 
Pages to test:
- Index (Homepage)
- BrowseCars
- CarDetail
- SellCar/ExpressSell
- About
- Contact
- FAQ
- DealerDashboard
- AdminDashboard

**Expected Results**:
- No text overflow or cutoff
- Buttons accommodate all text lengths
- Layouts remain visually appealing
- Mobile responsiveness preserved

**Pass Criteria**:
- ✅ No layout breaking on any device/language combination
- ✅ All text visible and properly formatted
- ✅ Interactive elements remain functional

### TC-UXT-002: Form Interaction Testing
**Objective**: Validate form functionality across all languages
**Priority**: High
**Estimated Time**: 75 minutes

**Test Steps**:
1. For each language, test major forms:
   - Car search form (homepage)
   - Advanced search form
   - Contact form
   - Car listing form (sell car)
   - User registration form
   - Sign-in form

2. For each form, verify:
   - Field labels display correctly
   - Placeholders show appropriate text
   - Validation messages appear in correct language
   - Success messages display properly
   - Error handling works correctly
   - Form submission functions normally

**Test Data**:
- Valid form data in each language
- Invalid data to trigger validation
- Edge cases (empty fields, invalid formats)

**Expected Results**:
- All forms function correctly in every language
- Error messages display appropriate translations
- Form submission successful with localized data

**Pass Criteria**:
- ✅ All forms work correctly in all languages
- ✅ Validation messages properly localized
- ✅ No functionality lost due to translation

### TC-UXT-003: Search and Filter Functionality
**Objective**: Test search and filtering with localized content
**Priority**: High
**Estimated Time**: 60 minutes

**Test Steps**:
1. Test car search functionality:
   - Enter search terms in local language
   - Use dropdown filters with translated options
   - Verify search results display correctly
   - Check result counts and descriptions

2. Test advanced search:
   - Use all filter categories
   - Verify dropdown options translated
   - Test range selectors (price, year, mileage)
   - Validate search results accuracy

3. Test FAQ search:
   - Search for keywords in local language
   - Verify results relevance
   - Check result highlighting

**Test Data**:
- Search terms in each language
- Filter combinations
- Edge cases (no results, special characters)

**Expected Results**:
- Search works with localized input
- Filters display translated options
- Results accurate and properly formatted

**Pass Criteria**:
- ✅ Search functionality works with all languages
- ✅ Filters and options properly localized
- ✅ Results display correctly

## Section 5: Static Content Validation Test Cases

### TC-SCV-001: FAQ Content Accuracy and Completeness
**Objective**: Validate FAQ content translation quality and completeness
**Priority**: Medium
**Estimated Time**: 120 minutes

**Pre-conditions**:
- Native speaker reviewers available for quality check
- FAQ content structure documented

**Test Steps**:
1. Navigate to FAQ page in each language
2. Verify all FAQ categories are translated:
   - Buying
   - Selling  
   - Financing
   - Safety
   - Account

3. For each category, check:
   - Category name translation accuracy
   - Question translations are clear and natural
   - Answer translations are complete and accurate
   - Technical terminology is correct
   - Contact information is localized

4. Test FAQ search functionality with local terms
5. Verify help content relevance for each market

**Test Data**: FAQ page content across all 6 languages

**Expected Results**:
- All FAQ content fully translated
- Translations are accurate and natural
- Technical terms properly localized
- Help content relevant to each market

**Pass Criteria**:
- ✅ Complete FAQ coverage in all languages
- ✅ High quality, natural translations
- ✅ Technical accuracy maintained

### TC-SCV-002: About Page Content Validation
**Objective**: Verify About page translations for company information
**Priority**: Medium
**Estimated Time**: 60 minutes

**Test Steps**:
1. Navigate to About page in each language
2. Verify translation of:
   - Company mission and vision
   - Team member information
   - Company statistics
   - Values and principles
   - Company history/milestones
   - Awards and recognition

3. Check consistency of:
   - Company name handling
   - Team member names
   - Statistics and numbers
   - Contact information

4. Validate cultural appropriateness:
   - Mission statement relevance
   - Local market references
   - Cultural sensitivity

**Expected Results**:
- Complete About page content translated
- Company information consistent across languages
- Content culturally appropriate

**Pass Criteria**:
- ✅ All About page content fully translated
- ✅ Consistent company information
- ✅ Culturally appropriate messaging

### TC-SCV-003: Legal Pages Compliance Validation
**Objective**: Ensure legal page translations maintain compliance
**Priority**: Critical
**Estimated Time**: 90 minutes

**Pre-conditions**:
- Legal review available for compliance validation
- Understanding of local legal requirements

**Test Steps**:
1. Review Privacy Policy translations:
   - GDPR compliance for EU languages
   - Data handling descriptions
   - User rights explanations
   - Contact information for privacy requests

2. Validate Terms of Service translations:
   - Legal terminology accuracy
   - User obligation clarity
   - Dispute resolution procedures
   - Jurisdiction clauses

3. Check Cookie Policy translations:
   - Cookie categories properly explained
   - User consent mechanisms
   - Opt-out procedures
   - Third-party cookie disclosures

4. Verify Accessibility statements:
   - Accessibility feature descriptions
   - Contact information for accessibility requests
   - Compliance standard references

**Expected Results**:
- Legal translations maintain compliance
- Technical legal terms accurately translated
- User rights clearly explained

**Pass Criteria**:
- ✅ Legal compliance maintained across all languages
- ✅ Technical accuracy in legal terminology
- ✅ User rights clearly communicated

## Section 6: Performance Impact Test Cases

### TC-PIT-001: Page Load Performance Testing
**Objective**: Measure performance impact of translation system
**Priority**: Medium
**Estimated Time**: 60 minutes

**Test Setup**:
- Use browser developer tools
- Clear cache before each test
- Test on consistent network conditions
- Measure multiple iterations for accuracy

**Test Steps**:
1. Measure baseline performance (English):
   - Time to First Contentful Paint (FCP)
   - Time to Interactive (TTI)
   - Largest Contentful Paint (LCP)
   - Total page load time

2. Measure performance for each other language:
   - Same metrics as baseline
   - Compare against English baseline
   - Note any significant differences

3. Test language switching performance:
   - Time from selection to content update
   - Memory usage during switch
   - Network requests triggered

**Test Data**: 
Pages to test:
- Homepage
- Browse Cars (with results)
- Car Detail page
- Complex forms (Sell Car)

**Expected Results**:
- Performance impact <5% compared to baseline
- Language switching completes <200ms
- No memory leaks during language changes

**Pass Criteria**:
- ✅ Performance within acceptable thresholds
- ✅ Language switching is fast and smooth
- ✅ No significant resource consumption increase

### TC-PIT-002: Memory Usage Validation
**Objective**: Validate memory efficiency of translation system
**Priority**: Low
**Estimated Time**: 30 minutes

**Test Steps**:
1. Open browser with memory profiling tools
2. Load application in English
3. Record baseline memory usage
4. Switch between all 6 languages multiple times
5. Monitor memory usage patterns
6. Check for memory leaks
7. Record peak memory consumption

**Expected Results**:
- Memory usage remains stable
- No memory leaks detected
- Peak usage within reasonable limits

**Pass Criteria**:
- ✅ No memory leaks detected
- ✅ Memory usage stays within acceptable bounds
- ✅ Stable performance over time

## Section 7: Cross-Browser Compatibility Test Cases

### TC-CBC-001: Browser Compatibility Matrix Testing
**Objective**: Validate translation system works across all supported browsers
**Priority**: High
**Estimated Time**: 180 minutes

**Test Matrix**:
| Browser | Version | Desktop | Mobile | Tablet |
|---------|---------|---------|---------|---------|
| Chrome | Latest-2 | ✓ | ✓ | ✓ |
| Firefox | Latest-2 | ✓ | ✓ | ✓ |
| Safari | Latest-2 | ✓ | ✓ | ✓ |
| Edge | Latest-2 | ✓ | - | - |

**Test Steps**:
1. For each browser/device combination:
   - Test language switching functionality
   - Verify content renders correctly
   - Check form functionality
   - Test responsive design
   - Validate JavaScript functionality

2. For each language in each browser:
   - Load major pages
   - Test interactive elements
   - Verify font rendering
   - Check special character display

**Expected Results**:
- Consistent functionality across all browsers
- Proper font and character rendering
- No browser-specific issues

**Pass Criteria**:
- ✅ Full functionality in all tested browsers
- ✅ Consistent visual appearance
- ✅ No browser-specific translation issues

### TC-CBC-002: Mobile Device Testing
**Objective**: Validate translation system on mobile devices
**Priority**: High
**Estimated Time**: 120 minutes

**Test Steps**:
1. Test on iOS devices:
   - iPhone (Safari)
   - iPad (Safari)
   - Chrome for iOS

2. Test on Android devices:
   - Chrome for Android
   - Samsung Internet
   - Firefox for Android

3. For each device/browser:
   - Test language switching
   - Verify touch interactions
   - Check keyboard input in different languages
   - Test form submissions
   - Validate responsive layout

**Expected Results**:
- Full functionality on mobile devices
- Touch interactions work correctly
- Keyboard input handles all languages
- Responsive design maintained

**Pass Criteria**:
- ✅ Complete functionality on mobile platforms
- ✅ Touch interactions work properly
- ✅ Multi-language keyboard support functions

## Section 8: Accessibility Testing with Translations

### TC-ACC-001: Screen Reader Compatibility
**Objective**: Ensure translations work with screen reader technology
**Priority**: Medium
**Estimated Time**: 90 minutes

**Test Setup**:
- Screen reader software installed (NVDA, JAWS, VoiceOver)
- Test with each supported language

**Test Steps**:
1. For each language, test:
   - Page structure navigation
   - Form label reading
   - Button and link announcements
   - Error message announcements
   - Modal dialog reading

2. Verify screen reader handles:
   - Language switching announcements
   - Proper pronunciation of content
   - Navigation landmark reading
   - Alt text for images

**Expected Results**:
- Screen readers properly announce all content
- Language switching is announced
- Navigation remains logical
- Form interactions accessible

**Pass Criteria**:
- ✅ Screen readers work with all languages
- ✅ Content properly announced
- ✅ Navigation accessibility maintained

### TC-ACC-002: Keyboard Navigation Testing
**Objective**: Validate keyboard navigation works with all languages
**Priority**: Medium
**Estimated Time**: 60 minutes

**Test Steps**:
1. Test keyboard navigation in each language:
   - Tab order remains logical
   - Focus indicators visible
   - Skip links function properly
   - Form navigation works correctly

2. Test keyboard shortcuts:
   - Language switching via keyboard
   - Form submission shortcuts
   - Modal dialog controls

**Expected Results**:
- Keyboard navigation fully functional
- Tab order logical in all languages
- All interactive elements accessible

**Pass Criteria**:
- ✅ Full keyboard accessibility maintained
- ✅ Tab order logical across languages
- ✅ All functions accessible via keyboard

## Test Execution Summary Template

### Daily Test Execution Report
```
Date: [YYYY-MM-DD]
Tester: [Name]
Languages Tested: [List]
Browsers Tested: [List]

Test Cases Executed: X/X
Passed: X
Failed: X
Blocked: X
Pass Rate: X%

Critical Issues Found: X
High Priority Issues: X
Medium Priority Issues: X

Next Steps:
- [Action item 1]
- [Action item 2]
```

### Weekly Test Summary
```
Week Ending: [YYYY-MM-DD]
Total Test Cases: X
Cumulative Pass Rate: X%
Translation Coverage: X%

Top Issues by Category:
1. [Category]: X issues
2. [Category]: X issues

Completed This Week:
- [Achievement 1]
- [Achievement 2]

Planned for Next Week:
- [Plan 1]
- [Plan 2]
```

This comprehensive test case document provides the detailed testing procedures needed to validate the CarMarket365 translation system thoroughly. Each test case includes specific steps, expected results, and pass criteria to ensure consistent and complete testing across all supported languages and platforms.