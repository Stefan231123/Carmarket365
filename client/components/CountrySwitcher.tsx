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
      Change Country
    </button>
  ) : (
    <Button variant="outline" size="sm" className={className}>
      <Globe className="h-4 w-4 mr-2" />
      {country?.name || 'Global'}
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
            Choose Your Country
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {/* Current Status */}
          <div className="bg-muted/30 rounded-2xl p-4">
            <div className="flex items-center justify-between mb-3">
              <h4 className="font-semibold text-sm">Current Site</h4>
              {country && (
                <Badge variant="secondary">
                  {country.code === 'global' ? 'Global' : 'Country-Specific'}
                </Badge>
              )}
            </div>
            <div className="flex items-center gap-3">
              <span className="text-2xl">{country?.flag || '🌍'}</span>
              <div>
                <div className="font-medium">{country?.name || 'Loading...'}</div>
                <div className="text-xs text-muted-foreground">
                  {country 
                    ? (country.code === 'global' 
                        ? 'Admin/Testing Mode' 
                        : `Languages: ${country.languages.map(l => l.name).join(', ')}`
                      )
                    : 'Detecting your location...'
                  }
                </div>
              </div>
            </div>
          </div>

          {/* Detected Country (if different) */}
          {detectedCountry && detectedCountry.code !== country?.code && (
            <div className="bg-blue-50 border border-blue-200 rounded-2xl p-4">
              <div className="flex items-center gap-2 mb-2">
                <MapPin className="h-4 w-4 text-blue-600" />
                <span className="font-semibold text-sm text-blue-900">Detected Location</span>
                {isGeolocationLoading && (
                  <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />
                )}
              </div>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-xl">{detectedCountry.flag}</span>
                  <div>
                    <div className="font-medium text-blue-900">{detectedCountry.name}</div>
                    <div className="text-xs text-blue-700">Based on your location</div>
                  </div>
                </div>
                <Button 
                  size="sm" 
                  onClick={() => handleCountrySelect(detectedCountry)}
                  className="bg-blue-600 hover:bg-blue-700 text-white"
                >
                  Switch
                </Button>
              </div>
            </div>
          )}

          {/* Available Countries */}
          <div>
            <h4 className="font-semibold text-sm mb-3">Available Country Sites</h4>
            <div className="grid grid-cols-1 gap-3">
              {availableCountries.map((countryOption) => (
                <button
                  key={countryOption.code}
                  onClick={() => handleCountrySelect(countryOption)}
                  className="flex items-center justify-between p-3 rounded-2xl border border-zinc-200 hover:border-zinc-300 hover:bg-zinc-50 transition-colors text-left"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-xl">{countryOption.flag}</span>
                    <div>
                      <div className="font-medium">{countryOption.name}</div>
                      <div className="text-xs text-muted-foreground">
                        {countryOption.languages.map(l => l.name).join(', ')}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {countryOption.hasMultipleLanguages && (
                      <Badge variant="outline" className="text-xs">
                        Multi-Lang
                      </Badge>
                    )}
                    <ExternalLink className="h-4 w-4 text-muted-foreground" />
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
          
          {/* Note about country-specific sites */}
          {!isAdminMode && (
            <div className="pt-4 border-t border-zinc-200">
              <div className="text-center p-3 bg-muted/30 rounded-2xl">
                <div className="flex items-center justify-center gap-2 mb-2">
                  <Globe className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm font-medium">Country-Specific Experience</span>
                </div>
                <p className="text-xs text-muted-foreground">
                  Each country site offers localized content, pricing, and language options for the best experience.
                </p>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}