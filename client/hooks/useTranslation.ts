import { useContext } from 'react';
import { CountryContext } from '../contexts/CountryContext';
import { translate, translateWithObjects } from '../../shared/translations';
import type { SupportedLanguage } from '../../shared/translations';

export function useTranslation() {
  const context = useContext(CountryContext);
  if (!context) {
    throw new Error('useTranslation must be used within a CountryProvider');
  }
  
  const { currentLanguage } = context;
  
  const t = (key: string, fallbackOrOptions?: string | { returnObjects?: boolean; [key: string]: any }, options?: { returnObjects?: boolean }): string | any => {
    // Handle overloaded function signature
    let actualOptions: { returnObjects?: boolean; [key: string]: any } | undefined;
    let fallback: string | undefined;
    
    if (typeof fallbackOrOptions === 'string') {
      fallback = fallbackOrOptions;
      actualOptions = options || {};
    } else {
      actualOptions = fallbackOrOptions || {};
    }
    
    if (actualOptions?.returnObjects) {
      return translateWithObjects(currentLanguage as SupportedLanguage, key);
    }
    
    let translated = translate(currentLanguage as SupportedLanguage, key);
    
    // Handle template variables (simple replacement for now)
    if (actualOptions && typeof translated === 'string') {
      Object.entries(actualOptions).forEach(([varKey, value]) => {
        if (varKey !== 'returnObjects' && typeof value === 'string') {
          translated = translated.replace(`{${varKey}}`, value);
        }
      });
    }
    
    // If translation failed and we have a fallback, use it
    if (translated === key && fallback) {
      return fallback;
    }
    
    return translated;
  };

  return { t, currentLanguage };
}