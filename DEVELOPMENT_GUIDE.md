# CarMarket365 Development Guidance

## Project Architecture Overview

### Frontend Stack
- **Framework**: React 18 with TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS + Shadcn/ui components
- **Routing**: React Router DOM
- **State Management**: React Context API + Custom hooks
- **Deployment**: Vercel (connected to GitHub for auto-deployment)
- **Development Server**: Runs on localhost:8084

### Backend Stack
- **Framework**: Node.js with Express
- **Database**: PostgreSQL hosted on Railway.ai
- **ORM**: Prisma (for database schema and queries)
- **Deployment**: Railway.ai (connected to GitHub)
- **Development Server**: Runs on localhost:3001

### Translation System Architecture
- **Location**: `/shared/translations/` directory
- **Files**: `en.ts`, `mk.ts`, `sq.ts`, `sl.ts`, `ru.ts`, `lv.ts`
- **Hook**: `useTranslation()` in `/client/hooks/useTranslation.ts`
- **Structure**: Nested objects with dot notation (e.g., `advancedSearch.fields.make`)

---

## Critical Development Rules

### 1. Translation System Protocol

🔴 **CRITICAL**: Never hardcode user-facing strings - this breaks multi-language support

**ALWAYS follow this exact pattern for translations:**

```typescript
// ✅ CORRECT: Use translation helper function
const getAdvancedSearchText = (key: string, fallback: string) => {
  if (currentLanguage === 'mk' && mkTranslations?.advancedSearch) {
    const value = getNestedValue(mkTranslations.advancedSearch, key);
    if (value) return value;
  }

  if (currentLanguage === 'sq' && sqTranslations?.advancedSearch) {
    const value = getNestedValue(sqTranslations.advancedSearch, key);
    if (value) return value;
  }

  const translated = t(`advancedSearch.${key}`);
  if (translated && translated !== `advancedSearch.${key}`) return translated;

  return fallback;
};

// ✅ CORRECT: Use in component
<label>{getAdvancedSearchText('fields.make', 'Make')}</label>

// ❌ NEVER: Hardcode strings
<label>Make</label>

// ❌ NEVER: Direct translation calls without fallback
<label>{t('advancedSearch.fields.make')}</label>
```

**Translation Key Structure Rules:**
- 🟡 **IMPORTANT** - Use nested objects: `advancedSearch.fields.make` not `advancedSearchFieldsMake`
- 🟡 **IMPORTANT** - Always provide English fallback as second parameter
- 🟢 **PREFERRED** - Create helper functions for each page/component section
- 🟢 **PREFERRED** - Add `getNestedValue()` utility for dot notation navigation

---

### 2. Database Schema Planning

**Always consider these entities when writing backend code:**
- Users (accounts, profiles, authentication)
- Listings (car details, images, pricing)
- Dealers (business profiles, inventory management)
- SavedListings (user favorites)
- ExpressSale (quick sale listings)
- SearchFilters (advanced search criteria)
- Images (file storage, metadata)

**Database Integration Rules:**
- 🔴 **CRITICAL** - Use Prisma schema definitions
- 🟡 **IMPORTANT** - Always include proper TypeScript interfaces
- 🟡 **IMPORTANT** - Consider foreign key relationships
- 🟢 **PREFERRED** - Plan for Railway.ai PostgreSQL deployment

---

### 3. Frontend-Backend Connection Protocol

**API Integration Rules:**

```typescript
// ✅ CORRECT: Use environment variables
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3001';

// ✅ CORRECT: Proper error handling
try {
  const response = await fetch(`${API_BASE_URL}/api/cars`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    }
  });
  if (!response.ok) throw new Error(`HTTP ${response.status}`);
  const data = await response.json();
} catch (error) {
  console.error('API Error:', error);
  // Handle error appropriately
}
```

**Environment Configuration:**
- Frontend `.env`: `VITE_API_BASE_URL=https://your-railway-backend.com`
- Backend `.env`: `DATABASE_URL`, `JWT_SECRET`, `CORS_ORIGIN`

---

### 4. Deployment & Version Control Rules

**Vercel Deployment Checklist:**
1. Ensure all environment variables are set in Vercel dashboard
2. Check build succeeds locally: `npm run build`
3. Verify TypeScript compilation: `npx tsc --noEmit`
4. Test critical functionality before pushing
5. Monitor Vercel deployment logs for errors

**Git Workflow:**
```bash
# Commit related changes together
git add shared/translations/*.ts client/pages/AdvancedSearch.tsx
git commit -m "feat: add Macedonian translations for advanced search"
# or
git commit -m "fix: resolve translation fallback issue"
# or
git commit -m "chore: update database schema"

git push origin main
```

**Commit Message Format:**
- `feat:` New feature
- `fix:` Bug fix
- `chore:` Maintenance tasks
- `refactor:` Code restructuring
- `docs:` Documentation updates

---

### 5. Code Quality & Efficiency Rules

**Before Making Changes:**
1. Read existing code to understand patterns and conventions
2. Search for similar implementations in the codebase
3. Check translation files for existing keys before adding new ones
4. Test locally before committing

**Problem-Solving Approach:**
- 🟡 **IMPORTANT** - Identify root cause - don't just fix symptoms
- 🟡 **IMPORTANT** - Minimal changes - modify only what's necessary
- 🔴 **CRITICAL** - Preserve existing functionality - never break working features
- 🟢 **PREFERRED** - Use existing patterns - follow established code conventions

**Resource Optimization:**
- 🟢 **PREFERRED** - Use TodoWrite tool for complex multi-step tasks
- 🟢 **PREFERRED** - Batch file operations when possible
- 🟢 **PREFERRED** - Read files once and cache content for multiple operations
- 🟢 **PREFERRED** - Use specific line ranges when reading large files

---

### 6. When to Ask for Clarification

**ALWAYS ask before proceeding when:**
- 🔴 **CRITICAL** - Translation content needed (never guess translations)
- 🔴 **CRITICAL** - Database schema changes (confirm before creating migrations)
- 🔴 **CRITICAL** - Breaking changes to existing features
- 🟡 **IMPORTANT** - Unclear business requirements or user flow
- 🟡 **IMPORTANT** - Multiple valid implementation approaches exist
- 🟢 **PREFERRED** - Naming conventions for new files/components

---

### 7. Error Handling & Debugging

**Common Issues & Solutions:**

**Translation Not Working:**
- Check translation key exists in target language file
- Verify nested object structure matches usage
- Ensure fallback mechanism is implemented
- Clear browser cache and restart dev server

**Build/Deployment Failures:**
- Run `npx tsc --noEmit` to check TypeScript errors
- Verify all imports and exports
- Check environment variables are set
- Review Vercel/Railway deployment logs

**Backend Connection Issues:**
- Verify Railway.ai backend is deployed and running
- Check CORS configuration for frontend domain
- Ensure API endpoints match frontend calls
- Test API endpoints independently (Postman/Thunder Client)

---

### 8. File Structure & Organization

**Frontend Structure:**
```
/client
  /components     # Reusable UI components
  /pages         # Route components
  /hooks         # Custom React hooks
  /lib           # Utility functions
/shared
  /translations  # Translation files
  /types         # TypeScript interfaces
```

**Critical Files to Always Consider:**
- `/shared/translations/*.ts` - All translation files
- `/client/hooks/useTranslation.ts` - Translation hook
- `/client/App.tsx` - Main app component and routing
- `package.json` - Dependencies and scripts
- `.env` files - Environment configuration

---

## Implementation Protocol

**When implementing new features or fixing issues:**

1. **PLAN**: Use TodoWrite to break down complex tasks
2. **RESEARCH**: Read existing similar code in the codebase
3. **IMPLEMENT**: Follow established patterns and conventions
4. **TEST**: Verify functionality locally before deployment
5. **DEPLOY**: Push to GitHub for automatic Vercel/Railway deployment
6. **VERIFY**: Test deployed version on Vercel preview/production

---

## Priority Legend

- 🔴 **CRITICAL**: Must be followed - violations will break core functionality
- 🟡 **IMPORTANT**: Should be followed - maintains code quality and consistency
- 🟢 **PREFERRED**: Best practices - improves efficiency and maintainability

---

## Always Remember

- This is a multilingual car marketplace platform
- Users need seamless experience across all supported languages (English, Macedonian, Albanian, Slovenian, Russian, Latvian)
- Frontend and backend must work together seamlessly
- Every change should move us toward a production-ready application
- Test in multiple languages when working on UI changes
- Consider mobile responsiveness for all new components

---

**This guidance should be referenced for every development decision and code change to ensure consistency, quality, and efficiency in the CarMarket365 project.**