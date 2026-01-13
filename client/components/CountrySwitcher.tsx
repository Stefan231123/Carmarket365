import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Globe, MapPin, ExternalLink } from 'lucide-react';
import { useCountry } from '@/contexts/CountryContext';
import { getAvailableCountries, CountryConfig } from '@shared/country-config';
import { redirectService } from '@shared/redirect-service';

interface CountrySwitcherProps {
  className?: string;
  variant?: 'button' | 'link';
}

export function CountrySwitcher({ className, variant = 'button' }: CountrySwitcherProps) {
  const { country, detectedCountry, isGeolocationLoading } = useCountry();
  const [isOpen, setIsOpen] = useState(false);
  const availableCountries = getAvailableCountries();
  
  // Check if admin mode is enabled via URL params
  const isAdminMode = typeof window !== 'undefined' && 
    (new URLSearchParams(window.location.search).has('admin') || 
     new URLSearchParams(window.location.search).has('no-redirect'));

  const handleCountrySelect = (targetCountry: CountryConfig) => {
    // Set user preference and redirect
    redirectService.setUserPreference(targetCountry.code);
    redirectService.redirectToCountry(targetCountry, { preservePath: true, preserveQuery: true });
    setIsOpen(false);
  };

  const handleStayGlobal = () => {
    redirectService.setUserPreference('global');
    setIsOpen(false);
  };

  const TriggerComponent = variant === 'link' ? (
    <button className={`text-sm text-muted-foreground hover:text-foreground transition-colors ${className}`}>
      <Globe className="h-4 w-4 inline mr-1" />
      Change Language
    </button>
  ) : (
    <Button variant="outline" size="sm" className={className}>
      <Globe className="h-4 w-4 mr-2" />
      Language
    </Button>
  );

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        {TriggerComponent}
      </DialogTrigger>
      
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Globe className="h-5 w-5" />
            Choose Your Language
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Status */}
          <div className="bg-muted/30 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm">Current Language</h4>
              <Badge variant="secondary">
                Macedonia
              </Badge>
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">🇲🇰</span>
              <div>
                <div className="font-medium">Macedonia</div>
                <div className="text-xs text-muted-foreground">
                  Available languages: Macedonian, Albanian
                </div>
              </div>
            </div>
          </div>


          {/* Language Selection */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Select Language</h4>
            <div className="grid grid-cols-1 gap-3">
              {country?.languages.map((language) => (
                <button
                  key={language.code}
                  onClick={() => {
                    if (language.code === 'mk') {
                      window.location.href = window.location.pathname + '?country=mk&lang=mk';
                    } else if (language.code === 'sq') {
                      window.location.href = window.location.pathname + '?country=mk&lang=sq';
                    }
                    setIsOpen(false);
                  }}
                  className="flex items-center justify-between p-3 rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{language.flag}</span>
                    <div>
                      <div className="font-medium">{language.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {language.code === 'mk' ? 'Македонски јазик' : 'Gjuha shqipe'}
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Global Option (Admin Only) */}
          {isAdminMode && (
            <div className="pt-4 border-t border-zinc-200">
              <button
                onClick={handleStayGlobal}
                className="w-full flex items-center justify-center gap-2 p-3 rounded-2xl border border-orange-200 bg-orange-50 hover:bg-orange-100 transition-colors"
              >
                <Globe className="h-4 w-4 text-orange-600" />
                <span className="text-orange-800">Stay on Global Site (Admin)</span>
              </button>
              <p className="text-xs text-orange-600 text-center mt-2">
                Admin/testing mode - not available to customers
              </p>
            </div>
          )}
          
          {/* Note about language options */}
          {!isAdminMode && (
            <div className="pt-4 border-t border-zinc-200">
              <div className="text-center p-3 bg-muted/30 rounded-2xl">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">CarMarket365 Macedonia</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Choose your preferred language: Macedonian or Albanian for the best experience.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}