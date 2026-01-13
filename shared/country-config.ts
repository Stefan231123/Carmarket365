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
}

// Language definitions
export const LANGUAGES: Record<string, Language> = {
  mk: { code: 'mk', name: 'Македонски', flag: '🇲🇰' },
  sq: { code: 'sq', name: 'Shqip', flag: '🇦🇱' },
  sl: { code: 'sl', name: 'Slovenščina', flag: '🇸🇮' },
  lv: { code: 'lv', name: 'Latviešu', flag: '🇱🇻' },
  ru: { code: 'ru', name: 'Русский', flag: '🇷🇺' },
  en: { code: 'en', name: 'English', flag: '🇬🇧' }, // Fallback language
};

// Country configurations
export const COUNTRIES: Record<string, CountryConfig> = {
  mk: {
    code: 'mk',
    name: 'Macedonia',
    flag: '🇲🇰',
    domain: 'mk.carmarket365.com',
    languages: [LANGUAGES.mk, LANGUAGES.sq],
    defaultLanguage: 'mk',
    hasMultipleLanguages: true,
  },
  al: {
    code: 'al',
    name: 'Albania',
    flag: '🇦🇱',
    domain: 'al.carmarket365.com',
    languages: [LANGUAGES.sq],
    defaultLanguage: 'sq',
    hasMultipleLanguages: false,
  },
  xk: {
    code: 'xk',
    name: 'Kosovo',
    flag: '🇽🇰',
    domain: 'xk.carmarket365.com',
    languages: [LANGUAGES.sq],
    defaultLanguage: 'sq',
    hasMultipleLanguages: false,
  },
  si: {
    code: 'si',
    name: 'Slovenia',
    flag: '🇸🇮',
    domain: 'si.carmarket365.com',
    languages: [LANGUAGES.sl],
    defaultLanguage: 'sl',
    hasMultipleLanguages: false,
  },
  lv: {
    code: 'lv',
    name: 'Latvia',
    flag: '🇱🇻',
    domain: 'lv.carmarket365.com',
    languages: [LANGUAGES.lv, LANGUAGES.ru],
    defaultLanguage: 'lv',
    hasMultipleLanguages: true,
  },
};

// Utility functions
export function getCountryFromDomain(hostname: string): CountryConfig | null {
  // Extract subdomain from hostname (e.g., 'mk' from 'mk.carmarket365.com' or 'mk.localhost')
  const subdomain = hostname.split('.')[0];
  return COUNTRIES[subdomain] || null;
}

export function getCountryFromSubdomain(subdomain: string): CountryConfig | null {
  return COUNTRIES[subdomain] || null;
}

export function getCurrentCountry(): CountryConfig | null {
  if (typeof window !== 'undefined') {
    const isVercel = window.location.hostname.includes('vercel.app');
    
    if (isVercel) {
      // For Vercel deployment, check URL parameters
      const urlParams = new URLSearchParams(window.location.search);
      const countryCode = urlParams.get('country');
      if (countryCode && COUNTRIES[countryCode]) {
        return COUNTRIES[countryCode];
      }
      return null; // No country specified on Vercel
    } else {
      // For other deployments, use subdomain detection
      return getCountryFromDomain(window.location.hostname);
    }
  }
  return null;
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
  return country?.defaultLanguage || 'en';
}

export function hasMultipleLanguages(): boolean {
  const country = getCurrentCountry();
  return country?.hasMultipleLanguages || false;
}

export function getAvailableCountries(): CountryConfig[] {
  return Object.values(COUNTRIES);
}