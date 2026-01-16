import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  CountryConfig, 
  Language, 
  getCurrentCountry, 
  getDefaultLanguage, 
  getCurrentLanguages,
  hasMultipleLanguages,
  COUNTRIES,
  LANGUAGES
} from '@shared/country-config';
import { geolocationService } from '@shared/geolocation-service';
import { redirectService } from '@shared/redirect-service';

interface CountryContextType {
  country: CountryConfig | null;
  currentLanguage: string;
  availableLanguages: Language[];
  hasMultipleLanguages: boolean;
  setLanguage: (languageCode: string) => void;
  setCountry: (countryCode: string) => void; // Add development country switcher
  isValidCountry: boolean;
  detectedCountry: CountryConfig | null;
  isGeolocationLoading: boolean;
  geolocationError: string | null;
  isDevelopment: boolean;
}

export const CountryContext = createContext<CountryContextType | undefined>(undefined);

interface CountryProviderProps {
  children: ReactNode;
}

export function CountryProvider({ children }: CountryProviderProps) {
  const [country, setCountryState] = useState<CountryConfig | null>(null);
  const [currentLanguage, setCurrentLanguage] = useState<string>('mk');
  const [isValidCountry, setIsValidCountry] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<CountryConfig | null>(null);
  const [isGeolocationLoading, setIsGeolocationLoading] = useState(false);
  const [geolocationError, setGeolocationError] = useState<string | null>(null);
  const [isDevelopment, setIsDevelopment] = useState(false);

  // Listen for URL changes to update language
  useEffect(() => {
    const handleLanguageFromURL = () => {
      if (typeof window !== 'undefined' && country) {
        const urlParams = new URLSearchParams(window.location.search);
        const langParam = urlParams.get('lang');
        
        if (langParam && country.languages.some(lang => lang.code === langParam)) {
          if (currentLanguage !== langParam) {
            console.log('🌍 CountryContext: Setting language from URL param:', langParam);
            setCurrentLanguage(langParam);
            localStorage.setItem(`selectedLanguage_${country.code}`, langParam);
          }
        }
      }
    };

    // Check URL on mount and when country is available
    if (country) {
      handleLanguageFromURL();
    }

    // Listen for popstate events (browser back/forward)
    const handlePopState = () => handleLanguageFromURL();
    window.addEventListener('popstate', handlePopState);

    return () => {
      window.removeEventListener('popstate', handlePopState);
    };
  }, [country, currentLanguage]);

  useEffect(() => {
    const initializeCountryDetection = async () => {
      // First, detect country from domain
      const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
      const domainCountry = getCurrentCountry();
    
      if (domainCountry) {
        setCountryState(domainCountry);
        setIsValidCountry(true);
      
        // Try to get language from localStorage first, then use default
        const storedLanguage = localStorage.getItem(`selectedLanguage_${domainCountry.code}`);
        const validLanguages = domainCountry.languages.map(lang => lang.code);
        
        console.log('🌍 CountryContext: Domain country detected:', domainCountry.name, domainCountry.code);
        console.log('🌍 CountryContext: Stored language:', storedLanguage);
        console.log('🌍 CountryContext: Valid languages:', validLanguages);
        console.log('🌍 CountryContext: Default language:', domainCountry.defaultLanguage);
        
        if (storedLanguage && validLanguages.includes(storedLanguage)) {
          console.log('🌍 CountryContext: Using stored language:', storedLanguage);
          setCurrentLanguage(storedLanguage);
        } else {
          console.log('🌍 CountryContext: Using default language:', domainCountry.defaultLanguage);
          setCurrentLanguage(domainCountry.defaultLanguage);
        }
      } else {
        // No domain country detected - try geolocation
        setIsGeolocationLoading(true);
        setGeolocationError(null);
        
        try {
          const geoCountry = await geolocationService.getRecommendedCountry();
          setDetectedCountry(geoCountry);
          
          // Development mode - handle localhost and subdomains differently
          const hostname = typeof window !== 'undefined' ? window.location.hostname : '';
          console.log('🌍 Detected hostname:', hostname);
          
          if (hostname === 'localhost' || hostname === '127.0.0.1') {
            // Development mode - use Macedonia as default country
            setIsDevelopment(true);
            
            // Check URL parameters for country/language
            const urlParams = new URLSearchParams(window.location.search);
            const countryParam = urlParams.get('country');
            const langParam = urlParams.get('lang');
            
            // Use Macedonia as default for localhost development
            const defaultCountry = COUNTRIES.mk;
            setCountryState(defaultCountry);
            
            // Set language based on URL parameter or default to Macedonian
            console.log('🌍 CountryContext (localhost): URL lang param:', langParam);
            console.log('🌍 CountryContext (localhost): Default country:', defaultCountry.name);
            console.log('🌍 CountryContext (localhost): Available languages:', defaultCountry.languages.map(l => l.code));
            
            if (langParam && defaultCountry.languages.some(lang => lang.code === langParam)) {
              console.log('🌍 CountryContext (localhost): Using URL language:', langParam);
              setCurrentLanguage(langParam);
            } else {
              console.log('🌍 CountryContext (localhost): Using default language:', defaultCountry.defaultLanguage);
              setCurrentLanguage(defaultCountry.defaultLanguage);
            }
            setIsValidCountry(true);
            
          } else {
            // Production domains - use Macedonia as default with full multilingual support
            console.log('🌐 Production domain detected - enabling multilingual support');
            
            // Check URL parameters for language preference
            const urlParams = new URLSearchParams(window.location.search);
            const langParam = urlParams.get('lang');
            
            // Use Macedonia as default country for production with full language support
            const defaultCountry = COUNTRIES.mk;
            setCountryState(defaultCountry);
            
            // Set language based on URL parameter or default to Macedonian
            if (langParam && defaultCountry.languages.some(lang => lang.code === langParam)) {
              setCurrentLanguage(langParam);
            } else {
              setCurrentLanguage(defaultCountry.defaultLanguage);
            }
            setIsValidCountry(true);
          }
        } catch (error) {
          setGeolocationError(error instanceof Error ? error.message : 'Geolocation failed');
          console.warn('Geolocation failed:', error);
        } finally {
          setIsGeolocationLoading(false);
        }
      }
    };

    initializeCountryDetection();
  }, []);

  const setLanguage = (languageCode: string) => {
    if (country) {
      const validLanguages = country.languages.map(lang => lang.code);
      if (validLanguages.includes(languageCode)) {
        setCurrentLanguage(languageCode);
        
        // Store language preference
        const storageKey = isValidCountry 
          ? `selectedLanguage_${country.code}` 
          : 'selectedLanguage';
        localStorage.setItem(storageKey, languageCode);
      }
    }
  };

  const setCountry = (countryCode: string) => {
    if (isDevelopment && COUNTRIES[countryCode]) {
      const newCountry = COUNTRIES[countryCode];
      setCountryState(newCountry);
      
      // Store country preference for development
      localStorage.setItem('dev_selectedCountry', countryCode);
      
      // Reset language to default for the new country
      setCurrentLanguage(newCountry.defaultLanguage);
      localStorage.setItem('selectedLanguage', newCountry.defaultLanguage);
    }
  };

  const availableLanguages = country?.languages || [LANGUAGES.en];
  const multipleLanguages = country?.hasMultipleLanguages || false;

  return (
    <CountryContext.Provider
      value={{
        country,
        currentLanguage,
        availableLanguages,
        hasMultipleLanguages: multipleLanguages,
        setLanguage,
        setCountry,
        isValidCountry,
        detectedCountry,
        isGeolocationLoading,
        geolocationError,
        isDevelopment,
      }}
    >
      {children}
    </CountryContext.Provider>
  );
}

export function useCountry() {
  const context = useContext(CountryContext);
  if (context === undefined) {
    throw new Error('useCountry must be used within a CountryProvider');
  }
  return context;
}