import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { MapPin, Globe, RefreshCw } from 'lucide-react';
import { getAvailableCountries } from '@shared/country-config';
import { geolocationService, GeolocationResult } from '@shared/geolocation-service';
import { useCountry } from '@/contexts/CountryContext';
import { useTranslation } from '@/hooks/useTranslation';

export function DevSubdomainTester() {
  const { t } = useTranslation();
  const [selectedCountry, setSelectedCountry] = useState('');
  const [geoData, setGeoData] = useState<GeolocationResult | null>(null);
  const [isTestingGeo, setIsTestingGeo] = useState(false);
  const countries = getAvailableCountries();
  const { detectedCountry, isGeolocationLoading } = useCountry();

  const simulateSubdomain = (countryCode: string) => {
    if (countryCode) {
      const newUrl = `http://${countryCode}.localhost:5173${window.location.pathname}${window.location.search}`;
      window.location.href = newUrl;
    }
  };

  const testGeolocation = async () => {
    setIsTestingGeo(true);
    try {
      geolocationService.clearCache(); // Clear cache for fresh test
      const result = await geolocationService.detectCountry();
      setGeoData(result);
    } catch (error) {
      console.error('Geolocation test failed:', error);
    } finally {
      setIsTestingGeo(false);
    }
  };

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <Card className="fixed top-20 right-4 z-50 w-80 bg-white shadow-lg border-2 border-blue-200">
      <CardHeader className="pb-3">
        <CardTitle className="text-sm flex items-center gap-2">
          🧪 Dev: Subdomain Tester
          <Badge variant="secondary" className="text-xs">
            DEV ONLY
          </Badge>
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground block mb-2">
            Test Country Subdomain
          </label>
          <Select value={selectedCountry} onValueChange={setSelectedCountry}>
            <SelectTrigger className="h-8 text-xs">
              <SelectValue placeholder={t('countryTest.selectCountryPlaceholder')} />
            </SelectTrigger>
            <SelectContent>
              {countries.map((country) => (
                <SelectItem key={country.code} value={country.code}>
                  <div className="flex items-center gap-2">
                    <span>{country.flag}</span>
                    <span>{country.name}</span>
                    <Badge variant="outline" className="text-xs ml-auto">
                      {country.hasMultipleLanguages ? 'Multi-Lang' : 'Single'}
                    </Badge>
                  </div>
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        
        <div className="space-y-2">
          <Button 
            size="sm" 
            className="w-full h-8 text-xs" 
            onClick={() => simulateSubdomain(selectedCountry)}
            disabled={!selectedCountry}
          >
            Switch to {selectedCountry ? `${selectedCountry}.localhost:5173` : 'subdomain'}
          </Button>
          
          <div className="text-xs text-muted-foreground space-y-1">
            <p>Current: <code>{window.location.hostname}</code></p>
            <p className="text-yellow-600">
              ⚠️ This simulates subdomain switching in development
            </p>
          </div>
        </div>

        <Separator />
        
        {/* Geolocation Testing */}
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <label className="text-xs font-medium text-muted-foreground">
              <MapPin className="h-3 w-3 inline mr-1" />
              IP Geolocation Test
            </label>
            <Button 
              size="sm" 
              variant="ghost"
              className="h-6 text-xs px-2" 
              onClick={testGeolocation}
              disabled={isTestingGeo || isGeolocationLoading}
            >
              {isTestingGeo ? (
                <RefreshCw className="h-3 w-3 animate-spin" />
              ) : (
                <RefreshCw className="h-3 w-3" />
              )}
            </Button>
          </div>
          
          {/* Detected Country Display */}
          {detectedCountry && (
            <div className="bg-green-50 border border-green-200 rounded-lg p-2">
              <div className="flex items-center gap-2 text-xs">
                <span>{detectedCountry.flag}</span>
                <span className="font-medium">{detectedCountry.name}</span>
                <Badge variant="secondary" className="text-xs">
                  Detected
                </Badge>
              </div>
            </div>
          )}
          
          {/* Raw Geolocation Data */}
          {geoData && (
            <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-2 text-xs">
              <div className="font-medium mb-1">Raw IP Data:</div>
              <div className="space-y-0.5 text-muted-foreground">
                <div>Country: {geoData.country} ({geoData.countryCode})</div>
                <div>IP: {geoData.ip}</div>
                <div>Confidence: {Math.round(geoData.confidence * 100)}%</div>
                {geoData.city && <div>City: {geoData.city}</div>}
              </div>
            </div>
          )}
        </div>

        <Separator />
        
        {/* Quick Links */}
        <div>
          <p className="text-xs text-muted-foreground mb-2">Quick Links:</p>
          <div className="grid grid-cols-2 gap-1">
            {countries.slice(0, 4).map((country) => (
              <Button
                key={country.code}
                variant="outline"
                size="sm"
                className="h-7 text-xs px-2"
                onClick={() => simulateSubdomain(country.code)}
              >
                {country.flag} {country.code.toUpperCase()}
              </Button>
            ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}