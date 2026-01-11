import { useState, useEffect } from 'react';
import { CountryConfig } from '@shared/country-config';
import { GeolocationResult, geolocationService } from '@shared/geolocation-service';
import { redirectService } from '@shared/redirect-service';

export interface UseGeolocationResult {
  isLoading: boolean;
  detectedCountry: CountryConfig | null;
  geolocationData: GeolocationResult | null;
  error: string | null;
  recommendedRedirect: CountryConfig | null;
  shouldShowRedirectDialog: boolean;
  acceptRedirect: () => void;
  declineRedirect: () => void;
  retryDetection: () => Promise<void>;
}

export function useGeolocation(): UseGeolocationResult {
  const [isLoading, setIsLoading] = useState(false);
  const [detectedCountry, setDetectedCountry] = useState<CountryConfig | null>(null);
  const [geolocationData, setGeolocationData] = useState<GeolocationResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [recommendedRedirect, setRecommendedRedirect] = useState<CountryConfig | null>(null);
  const [shouldShowRedirectDialog, setShouldShowRedirectDialog] = useState(false);

  const detectLocation = async () => {
    setIsLoading(true);
    setError(null);

    try {
      // Get geolocation data
      const geoData = await geolocationService.detectCountry();
      setGeolocationData(geoData);

      if (geoData) {
        // Get recommended country for our platform
        const recommendedCountry = geolocationService.getSupportedCountryFromDetection(geoData);
        setDetectedCountry(recommendedCountry);

        // Check if we should show redirect dialog
        const { shouldRedirect, targetCountry } = await redirectService.shouldRedirect();
        if (shouldRedirect && targetCountry) {
          setRecommendedRedirect(targetCountry);
          setShouldShowRedirectDialog(true);
        }
      }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Failed to detect location';
      setError(errorMessage);
      console.warn('Geolocation detection failed:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const acceptRedirect = () => {
    if (recommendedRedirect) {
      redirectService.redirectToCountry(recommendedRedirect);
    }
    setShouldShowRedirectDialog(false);
  };

  const declineRedirect = () => {
    // User chose to stay on current site
    redirectService.setUserPreference('global');
    setShouldShowRedirectDialog(false);
    setRecommendedRedirect(null);
  };

  const retryDetection = async () => {
    // Clear cache and retry
    geolocationService.clearCache();
    await detectLocation();
  };

  // Auto-detect on mount
  useEffect(() => {
    detectLocation();
  }, []);

  return {
    isLoading,
    detectedCountry,
    geolocationData,
    error,
    recommendedRedirect,
    shouldShowRedirectDialog,
    acceptRedirect,
    declineRedirect,
    retryDetection,
  };
}