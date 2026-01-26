/**
 * Dynamic Translation Loader for CarMarket365
 * Reduces initial bundle size by loading translations on-demand
 */

import { SupportedLanguage, TranslationStrings } from '../../shared/translations';

interface TranslationCache {
  [language: string]: TranslationStrings;
}

interface LoadingState {
  [language: string]: Promise<TranslationStrings>;
}

class DynamicTranslationLoader {
  private static instance: DynamicTranslationLoader;
  private cache: TranslationCache = {};
  private loading: LoadingState = {};
  private preloadedLanguages: Set<string> = new Set();

  private constructor() {
    // Preload English as default
    this.preloadLanguage('en');
  }

  public static getInstance(): DynamicTranslationLoader {
    if (!DynamicTranslationLoader.instance) {
      DynamicTranslationLoader.instance = new DynamicTranslationLoader();
    }
    return DynamicTranslationLoader.instance;
  }

  /**
   * Load translation for specific language
   */
  public async loadTranslation(language: SupportedLanguage): Promise<TranslationStrings> {
    // Return from cache if already loaded
    if (this.cache[language]) {
      return this.cache[language];
    }

    // Return existing loading promise if already in progress
    if (this.loading[language]) {
      return this.loading[language];
    }

    // Start loading
    this.loading[language] = this.loadTranslationFile(language);
    
    try {
      const translations = await this.loading[language];
      this.cache[language] = translations;
      delete this.loading[language];
      return translations;
    } catch (error) {
      delete this.loading[language];
      throw error;
    }
  }

  /**
   * Preload translation for faster access
   */
  public async preloadLanguage(language: SupportedLanguage): Promise<void> {
    if (this.preloadedLanguages.has(language)) {
      return;
    }

    this.preloadedLanguages.add(language);
    
    try {
      await this.loadTranslation(language);
    } catch (error) {
      console.warn(`Failed to preload ${language} translations:`, error);
      this.preloadedLanguages.delete(language);
    }
  }

  /**
   * Get translation synchronously (returns null if not loaded)
   */
  public getTranslationSync(language: SupportedLanguage): TranslationStrings | null {
    return this.cache[language] || null;
  }

  /**
   * Check if translation is already loaded
   */
  public isLoaded(language: SupportedLanguage): boolean {
    return !!this.cache[language];
  }

  /**
   * Preload multiple languages for better UX
   */
  public async preloadMultipleLanguages(languages: SupportedLanguage[]): Promise<void> {
    const loadPromises = languages.map(lang => this.preloadLanguage(lang));
    await Promise.allSettled(loadPromises);
  }

  /**
   * Get cache statistics for debugging
   */
  public getCacheStats(): {
    loaded: string[];
    loading: string[];
    cacheSize: number;
  } {
    return {
      loaded: Object.keys(this.cache),
      loading: Object.keys(this.loading),
      cacheSize: Object.keys(this.cache).length,
    };
  }

  /**
   * Clear cache to free memory (use carefully)
   */
  public clearCache(exceptLanguages: SupportedLanguage[] = ['en']): void {
    const keysToDelete = Object.keys(this.cache).filter(
      lang => !exceptLanguages.includes(lang as SupportedLanguage)
    );

    keysToDelete.forEach(lang => {
      delete this.cache[lang];
      this.preloadedLanguages.delete(lang);
    });
  }

  /**
   * Load translation file with dynamic import
   */
  private async loadTranslationFile(language: SupportedLanguage): Promise<TranslationStrings> {
    try {
      let translations: TranslationStrings;
      
      switch (language) {
        case 'en':
          const enModule = await import('../../shared/translations/en');
          translations = enModule.enTranslations;
          break;
          
        case 'mk':
          const mkModule = await import('../../shared/translations/mk');
          translations = mkModule.mkTranslations;
          break;
          
        case 'sq':
          const sqModule = await import('../../shared/translations/sq');
          translations = sqModule.sqTranslations;
          break;
          
        case 'sl':
          const slModule = await import('../../shared/translations/sl');
          translations = slModule.slTranslations;
          break;
          
        case 'lv':
          const lvModule = await import('../../shared/translations/lv');
          translations = lvModule.lvTranslations;
          break;
          
        case 'ru':
          const ruModule = await import('../../shared/translations/ru');
          translations = ruModule.ruTranslations;
          break;
          
        default:
          throw new Error(`Unsupported language: ${language}`);
      }

      if (!translations) {
        throw new Error(`Translation module for ${language} did not export translations`);
      }

      console.log(`✅ Loaded ${language} translations (${JSON.stringify(translations).length} bytes)`);
      return translations;
      
    } catch (error) {
      console.error(`❌ Failed to load ${language} translations:`, error);
      
      // Fallback to English if not already loading English
      if (language !== 'en') {
        console.log(`🔄 Falling back to English translations`);
        return this.loadTranslation('en');
      }
      
      // If English also fails, return minimal fallback
      return this.getFallbackTranslations() as TranslationStrings;
    }
  }

  /**
   * Minimal fallback translations for emergency cases
   */
  private getFallbackTranslations(): TranslationStrings {
    return {
      common: {
        loading: 'Loading...',
        error: 'Error',
        retry: 'Try Again',
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
        processing: 'Processing...',
        errorLoadingImage: 'Error loading image',
        option: 'Option'
      },
      // Add minimal structure for other required sections
      forms: {
        validation: {
          required: 'This field is required',
          emailRequired: 'Email is required',
          emailInvalid: 'Invalid email',
          phoneRequired: 'Phone is required',
          phoneInvalid: 'Invalid phone',
          passwordRequired: 'Password is required',
          passwordMinLength: 'Password must be at least 8 characters',
          confirmPasswordRequired: 'Confirm password',
          passwordsNotMatch: 'Passwords do not match',
          nameRequired: 'Name is required',
          lastNameRequired: 'Last name is required',
          fullNameRequired: 'Full name is required',
          annualIncomeRequired: 'Annual income is required',
          creditScoreRequired: 'Credit score is required',
          employmentStatusRequired: 'Employment status is required',
          yearsAtJobRequired: 'Years at job is required',
          monthlyExpensesRequired: 'Monthly expenses is required',
          makeRequired: 'Make is required',
          modelRequired: 'Model is required',
          yearRequired: 'Year is required',
          yearInvalid: 'Invalid year',
          mileageRequired: 'Mileage is required',
          mileageNegative: 'Mileage cannot be negative',
          dateRequired: 'Select date',
          timeRequired: 'Select time'
        },
        labels: {
          fullName: 'Full Name',
          email: 'Email',
          phone: 'Phone'
        },
        placeholders: {
          enterFullName: 'Enter your full name',
          enterEmail: 'Enter your email',
          enterPhone: 'Enter your phone number',
          contactMessage: 'Hello, I am interested in {year} {make} {model}. Please contact me for more details.'
        },
        actions: {
          submit: 'Submit',
          sendMessage: 'Send Message',
          scheduleTestDrive: 'Schedule Test Drive',
          requestFinancing: 'Request Financing'
        }
      }
    } as any;
  }
}

export const dynamicTranslationLoader = DynamicTranslationLoader.getInstance();