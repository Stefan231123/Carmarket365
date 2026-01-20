import { useContext, useState, useEffect, useCallback } from 'react';
import { CountryContext } from '../contexts/CountryContext';
import { dynamicTranslationLoader } from '../utils/dynamicTranslationLoader';
import { getTranslationWithFallback, translationDev } from '../utils/translationFallback';
import type { SupportedLanguage, TranslationStrings } from '../../shared/translations';

export interface UseTranslationReturn {
  t: (key: string, fallbackOrOptions?: string | { returnObjects?: boolean; [key: string]: any }, options?: { returnObjects?: boolean }) => string | any;
  currentLanguage: string;
  isLoading: boolean;
  isTranslationReady: boolean;
}

export function useTranslationDynamic(): UseTranslationReturn {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useTranslationDynamic must be used within a CountryProvider');
  }
  
  const { currentLanguage } = context;
  const [isLoading, setIsLoading] = useState(false);
  const [isTranslationReady, setIsTranslationReady] = useState(false);
  const [currentTranslations, setCurrentTranslations] = useState<TranslationStrings | null>(null);
  
  // Load translations when language changes
  useEffect(() => {
    let isMounted = true;
    
    const loadTranslations = async () => {
      const lang = currentLanguage as SupportedLanguage;
      
      // Check if already loaded
      if (dynamicTranslationLoader.isLoaded(lang)) {
        const translations = dynamicTranslationLoader.getTranslationSync(lang);
        if (isMounted && translations) {
          setCurrentTranslations(translations);
          setIsTranslationReady(true);
          setIsLoading(false);
          
          // Generate coverage report in development
          translationDev.generateCoverageReport(translations);
        }
        return;
      }

      // Load dynamically
      setIsLoading(true);
      setIsTranslationReady(false);
      
      try {
        const translations = await dynamicTranslationLoader.loadTranslation(lang);
        if (isMounted) {
          setCurrentTranslations(translations);
          setIsTranslationReady(true);
          
          // Generate coverage report in development
          translationDev.generateCoverageReport(translations);
        }
      } catch (error) {
        console.error(`Failed to load translations for ${lang}:`, error);
        // Try to load fallback English
        try {
          const fallbackTranslations = await dynamicTranslationLoader.loadTranslation('en');
          if (isMounted) {
            setCurrentTranslations(fallbackTranslations);
            setIsTranslationReady(true);
            
            console.warn(`Using English fallback for language: ${lang}`);
          }
        } catch (fallbackError) {
          console.error('Failed to load fallback English translations:', fallbackError);
          if (isMounted) {
            setIsTranslationReady(false);
          }
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadTranslations();
    
    return () => {
      isMounted = false;
    };
  }, [currentLanguage]);

  // Preload common languages on mount
  useEffect(() => {
    // Preload English and current browser language
    const browserLang = navigator.language.split('-')[0] as SupportedLanguage;
    const languagesToPreload: SupportedLanguage[] = ['en'];
    
    if (browserLang !== 'en' && ['mk', 'sq', 'sl', 'lv', 'ru'].includes(browserLang)) {
      languagesToPreload.push(browserLang);
    }
    
    dynamicTranslationLoader.preloadMultipleLanguages(languagesToPreload).catch(console.warn);
  }, []);

  // Translation function with enhanced fallback support
  const t = useCallback((
    key: string, 
    fallbackOrOptions?: string | { returnObjects?: boolean; [key: string]: any }, 
    options?: { returnObjects?: boolean }
  ): string | any => {
    // Handle overloaded function signature
    let actualOptions: { returnObjects?: boolean; [key: string]: any } | undefined;
    let fallback: string | undefined;
    
    if (typeof fallbackOrOptions === 'string') {
      fallback = fallbackOrOptions;
      actualOptions = options || {};
    } else {
      actualOptions = fallbackOrOptions || {};
    }

    // If translations are not ready, use fallback system
    if (!currentTranslations) {
      translationDev.logMissingKey(key);
      return fallback || getTranslationWithFallback(null, key, fallback);
    }

    // Use the enhanced translation lookup with fallback support
    try {
      // First try the standard lookup
      const keys = key.split('.');
      let current: any = currentTranslations;
      
      for (const k of keys) {
        if (current && typeof current === 'object' && k in current) {
          current = current[k];
        } else {
          current = undefined;
          break;
        }
      }

      // If we found a valid translation
      if (current !== undefined) {
        // If we want to return objects (for complex structures)
        if (actualOptions?.returnObjects && typeof current === 'object') {
          return current;
        }

        // Handle string interpolation
        if (actualOptions && typeof current === 'string') {
          let result = current;
          Object.entries(actualOptions).forEach(([varKey, value]) => {
            if (varKey !== 'returnObjects' && (typeof value === 'string' || typeof value === 'number')) {
              result = result.replace(new RegExp(`\\{${varKey}\\}`, 'g'), String(value));
            }
          });
          return result;
        }

        return current;
      }

      // Translation not found, use fallback system
      translationDev.logMissingKey(key);
      return getTranslationWithFallback(currentTranslations, key, fallback);

    } catch (error) {
      console.error('Translation error:', error);
      translationDev.logMissingKey(key);
      return getTranslationWithFallback(currentTranslations, key, fallback);
    }
  }, [currentTranslations]);

  return { 
    t, 
    currentLanguage, 
    isLoading,
    isTranslationReady
  };
}

// Backward compatibility alias
export const useTranslation = useTranslationDynamic;