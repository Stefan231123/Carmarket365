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
  
  const t = (key: string, options?: { returnObjects?: boolean }): string | any => {
    if (options?.returnObjects) {
      return translateWithObjects(currentLanguage as SupportedLanguage, key);
    }
    return translate(currentLanguage as SupportedLanguage, key);
  };

  return { t, currentLanguage };
}