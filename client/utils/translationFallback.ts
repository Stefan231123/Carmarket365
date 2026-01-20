/**
 * Translation Fallback System
 * 
 * This module provides a robust fallback mechanism for translation keys
 * that handles missing translations gracefully and provides meaningful defaults.
 */

import type { TranslationStrings } from '../../shared/translations';

/**
 * Fallback translation data for critical application strings
 */
export const fallbackTranslations: Partial<TranslationStrings> = {
  common: {
    loading: 'Loading...',
    error: 'Error',
    retry: 'Retry',
    close: 'Close',
    cancel: 'Cancel',
    confirm: 'Confirm',
    continue: 'Continue',
    back: 'Back',
    next: 'Next',
    previous: 'Previous',
    search: 'Search',
    filter: 'Filter',
    clear: 'Clear',
    save: 'Save',
    edit: 'Edit',
    delete: 'Delete',
    add: 'Add',
    view: 'View',
    contact: 'Contact',
    phone: 'Phone',
    email: 'Email',
    address: 'Address',
    location: 'Location',
    price: 'Price',
    currency: 'USD',
    year: 'Year',
    make: 'Make',
    model: 'Model',
    mileage: 'Mileage',
    condition: 'Condition',
    features: 'Features',
    description: 'Description',
    images: 'Images',
    seller: 'Seller',
    dealer: 'Dealer',
    private: 'Private',
    yes: 'Yes',
    no: 'No',
    menu: 'Menu',
    new: 'New',
    certified: 'Certified',
    vehicle: 'Vehicle',
    sending: 'Sending...',
    outline: 'Outline',
    ghost: 'Ghost',
    link: 'Link',
    destructive: 'Destructive',
    small: 'Small',
    large: 'Large',
    option: 'Option',
  },
  
  header: {
    welcome: 'Welcome',
    signIn: 'Sign In',
    signOut: 'Sign Out',
    myAccount: 'My Account',
    dashboard: 'Dashboard',
    home: 'Home',
    browseCars: 'Browse Cars',
    sellCar: 'Sell Car',
    savedCars: 'Saved Cars',
    financing: 'Financing',
    about: 'About',
    contact: 'Contact',
    faq: 'FAQ',
    help: 'Help',
  },
  
  hero: {
    title: 'Find Your Perfect Car',
    subtitle: 'Browse thousands of quality vehicles from trusted dealers',
    searchButton: 'Search Cars',
    advancedSearch: 'Advanced Search',
    availableCars: 'Available Cars',
    vehicleTypes: {
      cars: 'Cars',
      motorbikes: 'Motorbikes', 
      trucks: 'Trucks',
    },
    searchForm: {
      make: 'Make',
      model: 'Model',
      priceFrom: 'Price From',
      priceTo: 'Price To',
      yearFrom: 'Year From',
      mileage: 'Max Mileage',
      location: 'Location',
      anyMake: 'Any Make',
      anyModel: 'Any Model',
      minPrice: 'Min Price',
      maxPrice: 'Max Price',
      minYear: 'Min Year',
      anyYear: 'Any Year',
      anyMileage: 'Any Mileage',
      maxMileage: 'Max Mileage',
      noMin: 'No Min',
      noMax: 'No Max',
      enterLocation: 'Enter location',
    },
  },
  
  pages: {
    notFound: {
      title: 'Page Not Found',
      description: 'The page you are looking for does not exist',
      backToHome: 'Back to Home',
    },
    error: {
      title: 'Something Went Wrong',
      description: 'An unexpected error occurred',
      tryAgain: 'Try Again',
      backToHome: 'Back to Home',
    },
  },
};

/**
 * Get a translation value with fallback support
 */
export function getTranslationWithFallback(
  translations: any,
  key: string,
  fallback?: string
): string {
  try {
    // Split the key by dots to navigate nested objects
    const keys = key.split('.');
    let value = translations;
    
    // Navigate through the nested structure
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        value = undefined;
        break;
      }
    }
    
    // If we found a string value, return it
    if (typeof value === 'string') {
      return value;
    }
    
    // Try to get from fallback translations
    const fallbackValue = getFallbackValue(key);
    if (fallbackValue) {
      return fallbackValue;
    }
    
    // Use provided fallback
    if (fallback) {
      return fallback;
    }
    
    // Last resort: generate a readable key
    return generateReadableKey(key);
    
  } catch (error) {
    console.warn('Translation lookup failed for key:', key, error);
    return fallback || generateReadableKey(key);
  }
}

/**
 * Get fallback value from the fallback translations
 */
function getFallbackValue(key: string): string | undefined {
  try {
    const keys = key.split('.');
    let value: any = fallbackTranslations;
    
    for (const k of keys) {
      if (value && typeof value === 'object' && k in value) {
        value = value[k];
      } else {
        return undefined;
      }
    }
    
    return typeof value === 'string' ? value : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Generate a human-readable string from a translation key
 */
function generateReadableKey(key: string): string {
  const lastPart = key.split('.').pop() || key;
  
  // Convert camelCase to readable text
  return lastPart
    .replace(/([A-Z])/g, ' $1')
    .replace(/^./, str => str.toUpperCase())
    .trim();
}

/**
 * Validate translation completeness
 */
export function validateTranslations(translations: any): {
  isValid: boolean;
  missingKeys: string[];
  coverage: number;
} {
  const requiredKeys = [
    'common.loading',
    'common.error', 
    'common.search',
    'header.home',
    'header.browseCars',
    'hero.title',
    'hero.subtitle',
  ];
  
  const missingKeys: string[] = [];
  
  for (const key of requiredKeys) {
    const value = getTranslationWithFallback(translations, key);
    if (value === generateReadableKey(key)) {
      // If we got the generated readable key, it means the translation is missing
      missingKeys.push(key);
    }
  }
  
  const coverage = ((requiredKeys.length - missingKeys.length) / requiredKeys.length) * 100;
  
  return {
    isValid: missingKeys.length === 0,
    missingKeys,
    coverage,
  };
}

/**
 * Enhanced translation hook with fallback support
 */
export function createTranslationHook(translations: any) {
  return {
    t: (key: string, fallback?: string) => getTranslationWithFallback(translations, key, fallback),
    validate: () => validateTranslations(translations),
  };
}

/**
 * Development mode helpers
 */
export const translationDev = {
  /**
   * Log missing translation keys in development
   */
  logMissingKey(key: string) {
    if (process.env.NODE_ENV === 'development') {
      console.warn(`[Translation] Missing key: ${key}`);
    }
  },
  
  /**
   * Generate a report of translation coverage
   */
  generateCoverageReport(translations: any) {
    if (process.env.NODE_ENV === 'development') {
      const validation = validateTranslations(translations);
      console.table({
        'Translation Coverage': `${validation.coverage.toFixed(1)}%`,
        'Valid': validation.isValid ? '✅' : '❌',
        'Missing Keys': validation.missingKeys.length,
      });
      
      if (validation.missingKeys.length > 0) {
        console.warn('Missing translation keys:', validation.missingKeys);
      }
    }
  }
};