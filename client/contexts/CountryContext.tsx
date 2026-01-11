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
  const [currentLanguage, setCurrentLanguage] = useState<string>('en');
  const [isValidCountry, setIsValidCountry] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<CountryConfig | null>(null);
  const [isGeolocationLoading, setIsGeolocationLoading] = useState(false);
  const [geolocationError, setGeolocationError] = useState<string | null>(null);
  const [isDevelopment, setIsDevelopment] = useState(false);

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
        
        if (storedLanguage && validLanguages.includes(storedLanguage)) {
          setCurrentLanguage(storedLanguage);
        } else {
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
            // Development mode for GLOBAL site only (localhost without subdomain)
            setIsDevelopment(true);
            
            // Global site - should always be English
            setCountryState({
              code: 'global',
              name: 'Global',
              flag: '🌍',
              domain: 'localhost',
              languages: [LANGUAGES.en],
              defaultLanguage: 'en',
              hasMultipleLanguages: false,
            });
            setCurrentLanguage('en');
            setIsValidCountry(true);
            
            console.log('🌍 Global localhost detected - using English');
          } else {
            // Production domains or other development scenarios
            // This should not happen in development with localhost subdomains
            console.log('🌐 Production or unknown domain detected');
            setCountryState({
              code: 'global',
              name: 'Global',
              flag: '🌍',
              domain: 'carmarket365.com',
              languages: [LANGUAGES.en],
              defaultLanguage: 'en',
              hasMultipleLanguages: false,
            });
            setCurrentLanguage('en');
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