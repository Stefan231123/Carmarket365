# CarMarket365 Translation Review System - User Guide

## 🔐 Secure Access Information

### Access URL
```
http://localhost:8083/translation-review
```
*Note: In production, this will be a secure HTTPS domain*

### Demo Access Credentials
- **Master Token**: `CARMARKET365_REVIEW_2024`
- **Language-Specific Tokens**:
  - Macedonian: `MK_REVIEWER_2024`
  - Albanian: `SQ_REVIEWER_2024`
  - Slovenian: `SL_REVIEWER_2024`
  - Russian: `RU_REVIEWER_2024`
  - Latvian: `LV_REVIEWER_2024`

## 👥 Reviewer Information

### Authorized Native Speaker Reviewers Needed:

1. **🇲🇰 Macedonian Reviewer**
   - Email: `macedonian@reviewer.com`
   - Expertise: Automotive & Business terminology
   - Coverage: 97% (4,674 translations to review)

2. **🇦🇱 Albanian Reviewer**
   - Email: `albanian@reviewer.com`
   - Expertise: Automotive & Legal terminology
   - Coverage: 95% (4,576 translations to review)

3. **🇸🇮 Slovenian Reviewer**
   - Email: `slovenian@reviewer.com`
   - Expertise: Technical & Business terminology
   - Coverage: 96% (4,606 translations to review)

4. **🇷🇺 Russian Reviewer**
   - Email: `russian@reviewer.com`
   - Expertise: Automotive & Technical terminology
   - Coverage: 96% (4,593 translations to review)

5. **🇱🇻 Latvian Reviewer**
   - Email: `latvian@reviewer.com`
   - Expertise: Legal & Business terminology
   - Coverage: 95% (4,584 translations to review)

## 🎯 Review Objectives

### Primary Goals:
1. **Language Purity**: Ensure no English words appear in native translations
2. **Cultural Appropriateness**: Verify translations fit local automotive culture
3. **Technical Accuracy**: Confirm automotive terminology is correct
4. **User Experience**: Ensure translations work well in UI context

### Review Priorities:
1. **Critical**: Authentication, payment, legal terms
2. **High**: Car specifications, safety features, pricing
3. **Medium**: General UI elements, navigation
4. **Low**: Marketing content, testimonials

## 🚀 Getting Started

### Step 1: Access the System
1. Open your web browser
2. Navigate to: `http://localhost:8083/translation-review`
3. Enter your access token
4. Enter your reviewer email address
5. Click "Enter Review Environment"

### Step 2: Select Your Language
1. Use the "Review Language" dropdown
2. Select your native language
3. Choose a section to start with (recommended: "Authentication" for critical terms)

### Step 3: Begin Review
1. Each translation shows:
   - **English Reference** (original text)
   - **Current Translation** (what needs review)
   - **Translation Key** (technical identifier)
2. Click "Expand" to see full details
3. Click "Suggest" to provide feedback

## 📝 Providing Feedback

### Feedback Types:

#### 1. **Comment Only**
- Use when translation is mostly correct but needs notes
- Example: "Good translation, but consider more formal tone for business context"

#### 2. **Suggested Change**
- Use when you have a better translation
- Provide your suggested text in the "Suggested Translation" field
- Example: Replace "автомобил" with "возило" for consistency

#### 3. **Priority Levels**
- **Low**: Minor improvements, style preferences
- **Medium**: Noticeable issues that should be fixed
- **High**: Incorrect translations that confuse users
- **Critical**: Errors that could cause legal/safety issues

### Best Practices:

#### ✅ **DO:**
- Focus on accuracy and cultural appropriateness
- Consider context (UI buttons vs. legal text)
- Maintain consistency with automotive terminology
- Explain your reasoning in comments
- Use appropriate formality level for business context

#### ❌ **DON'T:**
- Make changes just for personal preference
- Use overly regional dialects
- Ignore existing terminology patterns
- Suggest translations that are too long for UI elements

## 🔍 Review Sections Guide

### **1. Authentication** (Start here - Critical)
- Login, registration, password reset
- User types (Private, Dealer, Admin)
- Error messages and validation

### **2. Car Browsing & Search**
- Vehicle specifications and features
- Search filters and sorting options
- Car conditions and descriptions

### **3. Business Terms**
- Dealer-related content
- Financing and payment terms
- Legal disclaimers and policies

### **4. User Interface**
- Navigation elements
- Form labels and buttons
- Status messages and notifications

### **5. Marketing Content**
- Homepage hero text
- Feature descriptions
- Call-to-action messages

## 🛠️ Technical Features

### Search Functionality
- **Search bar**: Find specific translations quickly
- **Section filter**: Focus on specific areas
- **Keyword search**: Search in English, current translation, or keys

### Export Features
- **Export button**: Download all your feedback as JSON
- **Session tracking**: Your progress is automatically saved
- **Backup system**: All feedback is securely stored

### Security Features
- **Session timeout**: 2-hour automatic logout for security
- **Access logging**: All activities are logged
- **Secure tokens**: Each reviewer has unique access

## 📊 Progress Tracking

### Individual Progress:
- **Feedback counter**: Shows how many suggestions you've made
- **Section completion**: Track which areas you've reviewed
- **Time tracking**: Monitor your session duration

### Team Progress:
- **Language coverage**: Overall completion percentage
- **Review status**: Track which translations have feedback
- **Priority completion**: Focus on critical items first

## 🚨 Common Issues & Solutions

### **Issue**: Can't access the system
- **Solution**: Check your token and email address
- **Note**: Tokens are case-sensitive

### **Issue**: Translations seem too long for UI
- **Solution**: Suggest shorter alternatives in your feedback
- **Note**: Consider abbreviations or restructuring

### **Issue**: Technical terms are unclear
- **Solution**: Refer to automotive glossaries in your language
- **Note**: When in doubt, ask for clarification

### **Issue**: Inconsistent terminology
- **Solution**: Note the inconsistency and suggest standardization
- **Note**: Search for similar terms to see patterns

## 💬 Communication Channels

### For Questions:
- **Email**: admin@carmarket365.com
- **Technical Issues**: Include your session ID and error details
- **Translation Questions**: Provide the translation key and context

### Feedback Collection:
- **In-system**: Use the built-in feedback forms
- **Export**: Download your feedback as JSON for record-keeping
- **Session notes**: Add general comments about your review experience

## ⏱️ Estimated Time Requirements

### Per Language (based on coverage):
- **Macedonian**: 8-12 hours (4,674 translations)
- **Albanian**: 8-12 hours (4,576 translations)
- **Slovenian**: 8-12 hours (4,606 translations)
- **Russian**: 8-12 hours (4,593 translations)
- **Latvian**: 8-12 hours (4,584 translations)

### Recommended Schedule:
- **Day 1**: Authentication & Critical terms (2-3 hours)
- **Day 2**: Car specifications & Search (3-4 hours)
- **Day 3**: Business & Legal terms (2-3 hours)
- **Day 4**: UI & Marketing content (2-3 hours)
- **Day 5**: Final review & cleanup (1-2 hours)

## 🎯 Success Metrics

### Quality Goals:
- **100% language purity** (no English in native translations)
- **95%+ reviewer satisfaction** with translation accuracy
- **Zero critical errors** in authentication/payment flows
- **Consistent terminology** across all sections

### Completion Targets:
- **Phase 1**: Authentication & Critical terms (100%)
- **Phase 2**: Core functionality (95%)
- **Phase 3**: UI & Navigation (90%)
- **Phase 4**: Marketing content (85%)

## 🔒 Security & Confidentiality

### Data Protection:
- All translations are proprietary to CarMarket365
- Do not share access tokens with others
- Do not screenshot or distribute translations outside this system
- Log out properly when finished

### Access Guidelines:
- Use only your assigned language(s)
- Review only during your authorized access period
- Report any suspicious activity immediately
- Keep your reviewer credentials secure

---

## 📞 Support Contact Information

**Technical Support**: admin@carmarket365.com
**Translation Coordinator**: translations@carmarket365.com
**Emergency Contact**: +1-XXX-XXX-XXXX (business hours)

**Thank you for helping make CarMarket365 accessible to native speakers worldwide!** 🌍🚗