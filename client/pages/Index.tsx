import { HeroSection, SearchFormData } from "@/components/HeroSection";
import { SEO } from "@/components/SEO";
import { useNavigate } from "react-router-dom";
import { useTranslation } from '@/hooks/useTranslation';
import { useEffect, lazy, Suspense } from 'react';
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Lazy load below-the-fold sections
const InterestingSuggestions = lazy(() => import("@/components/InterestingSuggestions").then(m => ({ default: m.InterestingSuggestions })));
const PopularBrands = lazy(() => import("@/components/PopularBrands").then(m => ({ default: m.PopularBrands })));
const MobileAppAnnouncement = lazy(() => import("@/components/MobileAppAnnouncement").then(m => ({ default: m.MobileAppAnnouncement })));

interface IndexProps {
  onAdvancedSearchClick?: () => void;
}

export default function Index({ onAdvancedSearchClick }: IndexProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  // Ensure Macedonia and Macedonian are set as defaults
  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const country = urlParams.get('country');
    const lang = urlParams.get('lang');
    
    // If no country/language parameters, set Macedonia as default
    if (!country && !lang) {
      const newUrl = `${window.location.pathname}?country=mk&lang=mk`;
      window.history.replaceState({}, '', newUrl);
    }
  }, []);

  const handleSearchCarsClick = (searchData: SearchFormData) => {
    const params = new URLSearchParams();
    
    // Add all search parameters to URL if they have values
    if (searchData.vehicleType && searchData.vehicleType !== 'cars') {
      params.set('type', searchData.vehicleType);
    }
    if (searchData.make && searchData.make !== "any-make") {
      params.set('make', searchData.make);
    }
    if (searchData.model && searchData.model !== "any-model") {
      params.set('model', searchData.model);
    }
    if (searchData.priceFrom && searchData.priceFrom !== "no-min") {
      params.set('priceFrom', searchData.priceFrom);
    }
    if (searchData.priceTo && searchData.priceTo !== "no-max") {
      params.set('priceTo', searchData.priceTo);
    }
    if (searchData.yearFrom && searchData.yearFrom !== "any-year") {
      params.set('yearFrom', searchData.yearFrom);
    }
    if (searchData.mileage && searchData.mileage !== "any-mileage") {
      params.set('mileage', searchData.mileage);
    }
    if (searchData.location) {
      params.set('location', searchData.location);
    }
    
    navigate(`/cars${params.toString() ? `?${params.toString()}` : ''}`);
  };

  const handleAdvancedSearchClick = () => {
    navigate('/advanced-search');
  };


  return (
    <div className="min-h-screen">
      <SEO
        canonical="/"
        jsonLd={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          "name": "CarMarket365",
          "url": "https://www.carmarket365.com",
          "potentialAction": {
            "@type": "SearchAction",
            "target": "https://www.carmarket365.com/cars?q={search_term_string}",
            "query-input": "required name=search_term_string"
          }
        }}
      />
      <HeroSection
        onSearchCarsClick={handleSearchCarsClick}
        onAdvancedSearchClick={handleAdvancedSearchClick}
      />
      <Suspense fallback={null}>
        <ErrorBoundary fallback={null}>
          <InterestingSuggestions />
        </ErrorBoundary>
        <MobileAppAnnouncement variant="section" />
        <PopularBrands />
      </Suspense>
    </div>
  );
}
