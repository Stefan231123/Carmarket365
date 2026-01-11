import { HeroSection, SearchFormData } from "@/components/HeroSection";
import { LastSearch } from "@/components/LastSearch";
import { InterestingSuggestions } from "@/components/InterestingSuggestions";
import { PopularBrands } from "@/components/PopularBrands";
import { useNavigate } from "react-router-dom";
import { useTranslation } from '@/hooks/useTranslation';

interface IndexProps {
  onAdvancedSearchClick?: () => void;
}

export default function Index({ onAdvancedSearchClick }: IndexProps) {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleCarClick = () => {
    navigate('/cars/1'); // Navigate to a sample car detail page
  };

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
      <HeroSection
        onAdvancedSearchClick={handleAdvancedSearchClick}
        onSearchCarsClick={handleSearchCarsClick}
      />
      <LastSearch onCarClick={handleCarClick} />
      <InterestingSuggestions onCarClick={handleCarClick} />
      <PopularBrands />
    </div>
  );
}
