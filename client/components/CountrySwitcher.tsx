import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useCountry } from '@/contexts/CountryContext';
import { getAvailableCountries, CountryConfig } from '@shared/country-config';
import { redirectService } from '@shared/redirect-service';

interface CountrySwitcherProps {
  className?: string;
}

export function CountrySwitcher({ className }: CountrySwitcherProps) {
  const { country } = useCountry();
  
  // Get current language from URL params
  const getCurrentLanguage = () => {
    if (typeof window !== 'undefined') {
      const urlParams = new URLSearchParams(window.location.search);
      const lang = urlParams.get('lang');
      return lang || 'mk'; // Default to Macedonian
    }
    return 'mk';
  };

  const currentLang = getCurrentLanguage();

  const handleLanguageChange = (languageCode: string) => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.set('country', 'mk');
      url.searchParams.set('lang', languageCode);
      window.location.href = url.toString();
    }
  };

  // Get current language details
  const currentLanguage = country?.languages.find(lang => lang.code === currentLang);
  
  return (
    <Select value={currentLang} onValueChange={handleLanguageChange}>
      <SelectTrigger className={`w-auto min-w-[40px] border-none hover:bg-white/10 ${className}`}>
        <SelectValue>
          <span className="text-lg">{currentLanguage?.flag}</span>
        </SelectValue>
      </SelectTrigger>
      <SelectContent>
        {country?.languages.map((language) => (
          <SelectItem key={language.code} value={language.code}>
            <div className="flex items-center gap-2">
              <span className="text-lg">{language.flag}</span>
              <div>
                <div className="font-medium">{language.name}</div>
                <div className="text-xs text-muted-foreground">
                  {language.code === 'mk' ? 'Македонски јазик' : 'Gjuha shqipe'}
                </div>
              </div>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
}