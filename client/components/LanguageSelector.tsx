import { useCountry } from "@/contexts/CountryContext";
import { useTranslation } from "@/hooks/useTranslation";
import { Select, SelectContent, SelectItem, SelectTrigger } from "@/components/ui/select";
import { CountrySwitcher } from "@/components/CountrySwitcher";
import { COUNTRIES } from "@shared/country-config";

interface LanguageSelectorProps {
  selectedLanguage?: string;
  onLanguageChange?: (language: string) => void;
}

export function LanguageSelector({ 
  selectedLanguage, 
  onLanguageChange
}: LanguageSelectorProps) {
  const { 
    currentLanguage, 
    availableLanguages, 
    hasMultipleLanguages, 
    setLanguage, 
    setCountry,
    country,
    isDevelopment
  } = useCountry();
  const { t } = useTranslation();

  const handleLanguageChange = (languageCode: string) => {
    setLanguage(languageCode);
    onLanguageChange?.(languageCode);
  };

  const handleCountryChange = (countryCode: string) => {
    setCountry(countryCode);
  };

  const getCurrentLanguage = () => {
    return availableLanguages.find(lang => lang.code === currentLanguage) || availableLanguages[0];
  };

  return (
    <div className="bg-muted/50 border-b">
      <div className="container mx-auto px-4 py-2">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <span>{t('header.welcome')}</span>
          </div>
          
          <div className="flex items-center gap-4">
            {/* Country Switcher */}
            <CountrySwitcher variant="link" />
            
            {/* Development Country Switcher */}
            {isDevelopment && (
              <Select value={country?.code || ''} onValueChange={handleCountryChange}>
                <SelectTrigger className="w-auto min-w-32 h-8 border-0 bg-transparent text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{country?.flag}</span>
                    <span className="hidden sm:inline">{country?.name}</span>
                    <span className="sm:hidden">{country?.code?.toUpperCase()}</span>
                  </div>
                </SelectTrigger>
                <SelectContent align="end">
                  {Object.values(COUNTRIES).map((c) => (
                    <SelectItem key={c.code} value={c.code}>
                      <div className="flex items-center gap-3">
                        <span className="text-base">{c.flag}</span>
                        <span>{c.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            {/* Country Info (non-development mode) */}
            {!isDevelopment && (
              <span className="text-sm text-muted-foreground">
                {country?.flag} {country?.name}
              </span>
            )}
            
            {/* Language Selector - only show if multiple languages */}
            {hasMultipleLanguages && (
              <Select value={currentLanguage} onValueChange={handleLanguageChange}>
                <SelectTrigger className="w-auto min-w-28 h-8 border-0 bg-transparent text-sm">
                  <div className="flex items-center gap-2">
                    <span className="text-base">{getCurrentLanguage().flag}</span>
                    <span className="hidden sm:inline">{getCurrentLanguage().name}</span>
                    <span className="sm:hidden">{getCurrentLanguage().code.toUpperCase()}</span>
                  </div>
                </SelectTrigger>
                <SelectContent align="end">
                  {availableLanguages.map((language) => (
                    <SelectItem key={language.code} value={language.code}>
                      <div className="flex items-center gap-3">
                        <span className="text-base">{language.flag}</span>
                        <span>{language.name}</span>
                      </div>
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            )}
            
            {/* For single language countries, just show the language */}
            {!hasMultipleLanguages && (
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <span className="text-base">{getCurrentLanguage().flag}</span>
                <span className="hidden sm:inline">{getCurrentLanguage().name}</span>
                <span className="sm:hidden">{getCurrentLanguage().code.toUpperCase()}</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
