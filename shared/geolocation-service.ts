import { COUNTRIES, CountryConfig } from './country-config';

export interface GeolocationResult {
  countryCode: string;
  country: string;
  region?: string;
  city?: string;
  ip?: string;
  confidence: number; // 0-1, how confident we are in the result
}

export interface GeolocationProvider {
  name: string;
  detect(): Promise<GeolocationResult | null>;
}

// IP-API.com service (free, no API key required, 1000 requests/month)
class IPAPIProvider implements GeolocationProvider {
  name = 'IP-API';

  async detect(): Promise<GeolocationResult | null> {
    try {
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const response = await fetch('http://ip-api.com/json/?fields=status,country,countryCode,region,city,query', {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.status !== 'success') {
        throw new Error('IP-API returned failure status');
      }

      return {
        countryCode: data.countryCode?.toLowerCase() || '',
        country: data.country || '',
        region: data.region,
        city: data.city,
        ip: data.query,
        confidence: 0.8, // Generally reliable
      };
    } catch (error) {
      console.warn('IP-API geolocation failed:', error);
      return null;
    }
  }
}

// IPify + IPStack fallback (requires API key for production)
class IPifyProvider implements GeolocationProvider {
  name = 'IPify';

  async detect(): Promise<GeolocationResult | null> {
    try {
      // First get the IP
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 5000);
      
      const ipResponse = await fetch('https://api.ipify.org?format=json', {
        signal: controller.signal,
      });
      
      clearTimeout(timeoutId);
      const ipData = await ipResponse.json();
      
      // For demo, we'll use a mock geolocation based on IP pattern
      // In production, you'd use a service like IPStack, MaxMind, etc.
      const mockLocation = this.getMockLocationFromIP(ipData.ip);
      
      return {
        countryCode: mockLocation.countryCode,
        country: mockLocation.country,
        ip: ipData.ip,
        confidence: 0.6, // Lower confidence for mock data
      };
    } catch (error) {
      console.warn('IPify geolocation failed:', error);
      return null;
    }
  }

  private getMockLocationFromIP(ip: string): { countryCode: string; country: string } {
    // Mock geolocation based on IP patterns (for development/demo)
    // In production, replace with actual geolocation service
    const lastOctet = parseInt(ip.split('.').pop() || '0');
    
    if (lastOctet < 50) return { countryCode: 'mk', country: 'North Macedonia' };
    if (lastOctet < 100) return { countryCode: 'al', country: 'Albania' };
    if (lastOctet < 150) return { countryCode: 'xk', country: 'Kosovo' };
    if (lastOctet < 200) return { countryCode: 'si', country: 'Slovenia' };
    if (lastOctet < 250) return { countryCode: 'lv', country: 'Latvia' };
    
    return { countryCode: 'mk', country: 'North Macedonia' }; // Default
  }
}

// Browser-based timezone detection (backup method)
class TimezoneProvider implements GeolocationProvider {
  name = 'Timezone';

  async detect(): Promise<GeolocationResult | null> {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone;
      const locale = navigator.language || navigator.languages[0] || 'en';
      
      // Map timezones and locales to our supported countries
      const countryMapping = this.getCountryFromTimezoneAndLocale(timezone, locale);
      
      if (countryMapping) {
        return {
          countryCode: countryMapping.code,
          country: countryMapping.name,
          confidence: 0.3, // Low confidence, timezone isn't very specific
        };
      }
    } catch (error) {
      console.warn('Timezone geolocation failed:', error);
    }
    
    return null;
  }

  private getCountryFromTimezoneAndLocale(timezone: string, locale: string): { code: string; name: string } | null {
    // Map common timezones and locales to our countries
    const mapping: Record<string, { code: string; name: string }> = {
      // Timezone patterns
      'Europe/Skopje': { code: 'mk', name: 'North Macedonia' },
      'Europe/Tirane': { code: 'al', name: 'Albania' },
      'Europe/Ljubljana': { code: 'si', name: 'Slovenia' },
      'Europe/Riga': { code: 'lv', name: 'Latvia' },
      
      // Locale patterns
      'mk': { code: 'mk', name: 'North Macedonia' },
      'mk-MK': { code: 'mk', name: 'North Macedonia' },
      'sq': { code: 'al', name: 'Albania' },
      'sq-AL': { code: 'al', name: 'Albania' },
      'sl': { code: 'si', name: 'Slovenia' },
      'sl-SI': { code: 'si', name: 'Slovenia' },
      'lv': { code: 'lv', name: 'Latvia' },
      'lv-LV': { code: 'lv', name: 'Latvia' },
      'ru': { code: 'lv', name: 'Latvia' }, // Russian speakers might be in Latvia
    };

    return mapping[timezone] || mapping[locale] || mapping[locale.split('-')[0]] || null;
  }
}

// Main geolocation service
export class GeolocationService {
  private providers: GeolocationProvider[] = [
    new IPAPIProvider(),
    new IPifyProvider(),
    new TimezoneProvider(),
  ];

  private cache: { result: GeolocationResult; timestamp: number } | null = null;
  private readonly CACHE_DURATION = 30 * 60 * 1000; // 30 minutes

  async detectCountry(): Promise<GeolocationResult | null> {
    // Check cache first
    if (this.cache && Date.now() - this.cache.timestamp < this.CACHE_DURATION) {
      return this.cache.result;
    }

    // Try providers in order of preference
    for (const provider of this.providers) {
      try {
        console.log(`Trying geolocation provider: ${provider.name}`);
        const result = await provider.detect();
        
        if (result && result.countryCode) {
          // Cache successful result
          this.cache = { result, timestamp: Date.now() };
          console.log(`Geolocation success with ${provider.name}:`, result);
          return result;
        }
      } catch (error) {
        console.warn(`Provider ${provider.name} failed:`, error);
        continue;
      }
    }

    console.warn('All geolocation providers failed');
    return null;
  }

  getSupportedCountryFromDetection(detection: GeolocationResult): CountryConfig | null {
    const countryCode = detection.countryCode.toLowerCase();
    
    // Direct match with our supported countries
    if (COUNTRIES[countryCode]) {
      return COUNTRIES[countryCode];
    }

    // Handle special cases and regional mappings
    const regionMapping: Record<string, string> = {
      'xk': 'xk', // Kosovo
      'rs': 'mk', // Serbia -> North Macedonia (regional fallback)
      'bg': 'mk', // Bulgaria -> North Macedonia (regional fallback)
      'hr': 'si', // Croatia -> Slovenia (regional fallback)
      'hu': 'si', // Hungary -> Slovenia (regional fallback)
      'ee': 'lv', // Estonia -> Latvia (Baltic region)
      'lt': 'lv', // Lithuania -> Latvia (Baltic region)
    };

    const mappedCode = regionMapping[countryCode];
    if (mappedCode && COUNTRIES[mappedCode]) {
      return COUNTRIES[mappedCode];
    }

    return null;
  }

  async getRecommendedCountry(): Promise<CountryConfig | null> {
    const detection = await this.detectCountry();
    
    if (!detection) {
      return null;
    }

    return this.getSupportedCountryFromDetection(detection);
  }

  // Clear cache (useful for testing)
  clearCache(): void {
    this.cache = null;
  }
}

// Singleton instance
export const geolocationService = new GeolocationService();