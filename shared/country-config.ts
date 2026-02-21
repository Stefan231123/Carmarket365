export interface Language {
  code: string;
  name: string;
  flag: string;
}

export interface CountryConfig {
  code: string;
  name: string;
  flag: string;
  domain: string;
  languages: Language[];
  defaultLanguage: string;
  hasMultipleLanguages: boolean;
  currency: string;
  currencySymbol: string;
  phonePrefix: string;
}

// Language definitions
export const LANGUAGES: Record<string, Language> = {
  mk: { code: 'mk', name: 'Македонски', flag: '🇲🇰' },
  sq: { code: 'sq', name: 'Shqip', flag: '🇦🇱' },
  en: { code: 'en', name: 'English', flag: '🇬🇧' }, // Fallback language
};

// Country configurations
export const COUNTRIES: Record<string, CountryConfig> = {
  mk: {
    code: 'mk',
    name: 'Macedonia',
    flag: '🇲🇰',
    domain: 'mk.carmarket365.com',
    languages: [LANGUAGES.mk, LANGUAGES.sq, LANGUAGES.en],
    defaultLanguage: 'mk',
    hasMultipleLanguages: true,
    currency: 'MKD',
    currencySymbol: 'ден',
    phonePrefix: '+389',
  },
  al: {
    code: 'al',
    name: 'Albania',
    flag: '🇦🇱',
    domain: 'al.carmarket365.com',
    languages: [LANGUAGES.sq, LANGUAGES.en],
    defaultLanguage: 'sq',
    hasMultipleLanguages: true,
    currency: 'ALL',
    currencySymbol: 'L',
    phonePrefix: '+355',
  },
  xk: {
    code: 'xk',
    name: 'Kosovo',
    flag: '🇽🇰',
    domain: 'xk.carmarket365.com',
    languages: [LANGUAGES.sq, LANGUAGES.en],
    defaultLanguage: 'sq',
    hasMultipleLanguages: true,
    currency: 'EUR',
    currencySymbol: '€',
    phonePrefix: '+383',
  },
};

// Utility functions
export function getCountryFromDomain(hostname: string): CountryConfig | null {
  // Handle localhost development
  if (hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('localhost:')) {
    return COUNTRIES.mk; // Default to Macedonia for localhost
  }
  
  // Extract subdomain from hostname (e.g., 'mk' from 'mk.carmarket365.com')
  const subdomain = hostname.split('.')[0];
  return COUNTRIES[subdomain] || null;
}

export function getCountryFromSubdomain(subdomain: string): CountryConfig | null {
  return COUNTRIES[subdomain] || null;
}

export function getCurrentCountry(): CountryConfig | null {
  if (typeof window !== 'undefined') {
    const hostname = window.location.hostname;
    const isVercel = hostname.includes('vercel.app');
    const isLocalhost = hostname === 'localhost' || hostname === '127.0.0.1' || hostname.startsWith('localhost:');
    
    // Check URL parameters for both Vercel and localhost
    if (isVercel || isLocalhost) {
      const urlParams = new URLSearchParams(window.location.search);
      const countryCode = urlParams.get('country');
      if (countryCode && COUNTRIES[countryCode]) {
        return COUNTRIES[countryCode];
      }
      // Default to Macedonia for Vercel and localhost
      return COUNTRIES.mk;
    } else {
      // For other deployments, use subdomain detection or default to Macedonia
      return getCountryFromDomain(hostname) || COUNTRIES.mk;
    }
  }
  return COUNTRIES.mk; // Default to Macedonia
}

export function getCurrentLanguages(): Language[] {
  const country = getCurrentCountry();
  return country?.languages || [LANGUAGES.en];
}

export function getDefaultLanguage(): string {
  if (typeof window !== 'undefined') {
    const isVercel = window.location.hostname.includes('vercel.app');
    
    if (isVercel) {
      // For Vercel, check lang parameter first
      const urlParams = new URLSearchParams(window.location.search);
      const langCode = urlParams.get('lang');
      if (langCode && LANGUAGES[langCode]) {
        return langCode;
      }
    }
  }
  
  const country = getCurrentCountry();
  return country?.defaultLanguage || 'mk'; // Default to Macedonian
}

export function hasMultipleLanguages(): boolean {
  const country = getCurrentCountry();
  return country?.hasMultipleLanguages || false;
}

export function getAvailableCountries(): CountryConfig[] {
  return Object.values(COUNTRIES);
}