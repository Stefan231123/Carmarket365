import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Search, 
  SlidersHorizontal, 
  X, 
  DollarSign,
  Car
} from "lucide-react";
import { useTranslation } from "@/hooks/useTranslation";
import { mkTranslations } from "../../shared/translations/mk";

interface AdvancedSearchProps {
  onSearch: (filters: SearchFilters) => void;
  onClose?: () => void;
}

interface SearchFilters {
  // Basic Specifications
  make: string;
  model: string;
  bodyTypes: string[];
  
  // Powertrain & Performance
  fuelTypes: string[];
  yearMin: string;
  yearMax: string;
  priceMin: number;
  priceMax: number;
  mileageMin: number;
  mileageMax: number;
  powerMin: number; // kW
  powerMax: number; // kW
  transmissions: string[];
  drivetrain: string;
  
  // Vehicle Configuration
  doorsMin: number;
  doorsMax: number;
  seatsMin: number;
  seatsMax: number;
  
  // Seller & Condition
  sellerTypes: string[];
  conditions: string[];
  
  // Equipment & Features
  features: string[];
  
  // Exterior & Interior
  exteriorColors: string[];
  paintworkTypes: string[];
  interiorColors: string[];
  upholsteryTypes: string[];
  
  // Additional
  previousOwnersMax: number;
  hasAccidentHistory: boolean | null;
  guaranteeOptions: string[];
  emissionClass: string;
  emissionLabel: string;
  
  // Location
  location: string;
  radius: string;
  countries: string[];
  
  // Sorting
  sortBy: string;
}

export function AdvancedSearch({ onSearch, onClose }: AdvancedSearchProps) {
  const { t, currentLanguage } = useTranslation();
  const [filters, setFilters] = useState<SearchFilters>({
    // Basic Specifications
    make: "",
    model: "",
    bodyTypes: [],
    
    // Powertrain & Performance
    fuelTypes: [],
    yearMin: "",
    yearMax: "",
    priceMin: 0,
    priceMax: 200000,
    mileageMin: 0,
    mileageMax: 300000,
    powerMin: 0,
    powerMax: 1000,
    transmissions: [],
    drivetrain: "",
    
    // Vehicle Configuration
    doorsMin: 2,
    doorsMax: 5,
    seatsMin: 2,
    seatsMax: 9,
    
    // Seller & Condition
    sellerTypes: [],
    conditions: [],
    
    // Equipment & Features
    features: [],
    
    // Exterior & Interior
    exteriorColors: [],
    paintworkTypes: [],
    interiorColors: [],
    upholsteryTypes: [],
    
    // Additional
    previousOwnersMax: 10,
    hasAccidentHistory: null,
    guaranteeOptions: [],
    emissionClass: "",
    emissionLabel: "",
    
    // Location
    location: "",
    radius: "",
    countries: [],
    
    // Sorting
    sortBy: "standard"
  });

  // Enhanced translation function with comprehensive debug logging and proper fallback
  const getTranslatedData = (key: string): string[] => {
    // Debug logging to understand translation behavior
    console.log(`[AdvancedSearch] Getting translated data for key: ${key}`);
    console.log(`[AdvancedSearch] Current language: ${currentLanguage}`);
    
    // Always try the dynamic translation system first
    try {
      const translationKey = `advancedSearch.staticVehicleData.${key}`;
      const translated = t(translationKey, { returnObjects: true });
      
      console.log(`[AdvancedSearch] Translation result for ${translationKey}:`, translated);
      
      if (Array.isArray(translated) && translated.length > 0) {
        console.log(`[AdvancedSearch] Successfully using dynamic translation for ${key}:`, translated);
        return translated as string[];
      }
    } catch (error) {
      console.warn(`[AdvancedSearch] Dynamic translation failed for ${key}:`, error);
    }
    
    // If dynamic system fails and language is Macedonian, try direct import
    if (currentLanguage === 'mk' && mkTranslations?.advancedSearch?.staticVehicleData) {
      try {
        const staticData = mkTranslations.advancedSearch.staticVehicleData;
        console.log(`[AdvancedSearch] Available static data keys:`, Object.keys(staticData));
        
        const data = staticData[key as keyof typeof staticData];
        console.log(`[AdvancedSearch] Direct import result for ${key}:`, data);
        
        if (Array.isArray(data) && data.length > 0) {
          console.log(`[AdvancedSearch] Successfully using direct import for ${key}:`, data);
          return data as string[];
        }
      } catch (error) {
        console.warn(`[AdvancedSearch] Direct import failed for ${key}:`, error);
      }
    }
    
    // Smart fallback based on key - return minimal essential options instead of empty array
    const getMinimalFallback = (dataKey: string): string[] => {
      switch(dataKey) {
        case 'makes':
          return currentLanguage === 'mk' ? ['Audi', 'BMW', 'Toyota', 'Volkswagen'] : ['Audi', 'BMW', 'Toyota', 'Volkswagen'];
        case 'bodyTypes':
          return currentLanguage === 'mk' ? ['Седан', 'SUV', 'Хечбек'] : ['Sedan', 'SUV', 'Hatchback'];
        case 'fuelTypes':
          return currentLanguage === 'mk' ? ['Бензин', 'Дизел', 'Електричен'] : ['Gasoline', 'Diesel', 'Electric'];
        case 'transmissions':
          return currentLanguage === 'mk' ? ['Мануелна', 'Автоматска'] : ['Manual', 'Automatic'];
        case 'conditions':
          return currentLanguage === 'mk' ? ['Нов', 'Користен'] : ['New', 'Used'];
        case 'colors':
          return currentLanguage === 'mk' ? ['Црна', 'Бела', 'Сива'] : ['Black', 'White', 'Gray'];
        default:
          return [];
      }
    };
    
    const fallbackData = getMinimalFallback(key);
    console.warn(`[AdvancedSearch] Using minimal fallback for ${key}:`, fallbackData);
    return fallbackData;
  };
  
  const carMakes = getTranslatedData('makes');

  const bodyTypes = getTranslatedData('bodyTypes');

  const fuelTypes = getTranslatedData('fuelTypes');

  const transmissions = getTranslatedData('transmissions');

  const drivetrains = getTranslatedData('drivetrains');

  const sellerTypes = getTranslatedData('sellerTypes');

  const conditions = getTranslatedData('conditions');

  const exteriorColors = getTranslatedData('colors');

  const paintworkTypes = getTranslatedData('paintworkTypes');

  const interiorColors = getTranslatedData('interiorColors');

  const upholsteryTypes = getTranslatedData('upholsteryTypes');

  const countries = getTranslatedData('countries');

  const emissionClasses = getTranslatedData('emissionClasses');

  const emissionLabels = getTranslatedData('emissionLabels');

  const guaranteeOptions = getTranslatedData('guaranteeOptions');

  // Feature handling functions
  const handleFeatureChange = (feature: string, checked: boolean) => {
    if (checked) {
      setFilters({...filters, features: [...filters.features, feature]});
    } else {
      setFilters({...filters, features: filters.features.filter(f => f !== feature)});
    }
  };

  const getActiveFiltersCount = () => {
    let count = 0;
    if (filters.make && filters.make !== "") count++;
    if (filters.model && filters.model !== "") count++;
    if (filters.bodyTypes.length > 0) count++;
    if (filters.fuelTypes.length > 0) count++;
    if (filters.transmissions.length > 0) count++;
    if (filters.sellerTypes.length > 0) count++;
    if (filters.conditions.length > 0) count++;
    if (filters.features.length > 0) count++;
    if (filters.exteriorColors.length > 0) count++;
    if (filters.interiorColors.length > 0) count++;
    if (filters.countries.length > 0) count++;
    return count;
  };
  
  // Get features from translation data
  const features = getTranslatedData('features');

  const currentYear = new Date().getFullYear();
  const years = Array.from({ length: 30 }, (_, i) => (currentYear - i).toString());

  // Debug logging to see what we got from translations
  console.log('[AdvancedSearch] All translated data loaded:', {
    carMakes: carMakes.length,
    bodyTypes: bodyTypes.length,
    fuelTypes: fuelTypes.length,
    transmissions: transmissions.length,
    drivetrains: drivetrains.length,
    sellerTypes: sellerTypes.length,
    conditions: conditions.length,
    exteriorColors: exteriorColors.length,
    features: features.length,
    currentLanguage
  });

  // Handler functions for multi-select filters
  const handleMultiSelectChange = (
    filterKey: keyof Pick<SearchFilters, 'bodyTypes' | 'fuelTypes' | 'transmissions' | 'sellerTypes' | 'conditions' | 'features' | 'exteriorColors' | 'paintworkTypes' | 'interiorColors' | 'upholsteryTypes' | 'guaranteeOptions' | 'countries'>,
    value: string,
    checked: boolean
  ) => {
    setFilters(prev => {
      const currentArray = prev[filterKey] as string[];
      if (checked) {
        return { ...prev, [filterKey]: [...currentArray, value] };
      } else {
        return { ...prev, [filterKey]: currentArray.filter(item => item !== value) };
      }
    });
  };

  const handleRangeChange = (
    minKey: keyof SearchFilters,
    maxKey: keyof SearchFilters,
    values: number[]
  ) => {
    setFilters(prev => ({
      ...prev,
      [minKey]: values[0],
      [maxKey]: values[1]
    }));
  };

  const clearAllFilters = () => {
    setFilters({
      make: "",
      model: "",
      bodyTypes: [],
      fuelTypes: [],
      yearMin: "",
      yearMax: "",
      priceMin: 0,
      priceMax: 200000,
      mileageMin: 0,
      mileageMax: 300000,
      powerMin: 0,
      powerMax: 1000,
      transmissions: [],
      drivetrain: "",
      doorsMin: 2,
      doorsMax: 5,
      seatsMin: 2,
      seatsMax: 9,
      sellerTypes: [],
      conditions: [],
      features: [],
      exteriorColors: [],
      paintworkTypes: [],
      interiorColors: [],
      upholsteryTypes: [],
      previousOwnersMax: 10,
      hasAccidentHistory: null,
      guaranteeOptions: [],
      emissionClass: "",
      emissionLabel: "",
      location: "",
      radius: "",
      countries: [],
      sortBy: "standard"
    });
  };

  // Removed duplicate clearAllFilters function


  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <SlidersHorizontal className="h-5 w-5 text-primary" />
<h2 className="text-xl font-bold text-foreground">{t('advancedSearch.title')}</h2>
          {getActiveFiltersCount() > 0 && (
<Badge variant="secondary">{getActiveFiltersCount()} {t('advancedSearch.active')}</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={clearAllFilters} size="sm">
{t('advancedSearch.clearAll')}
          </Button>
          {onClose && (
            <Button variant="ghost" onClick={onClose} size="icon">
              <X className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Vehicle Details */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Car className="h-5 w-5" />
{t('advancedSearch.sections.vehicleDetails.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Make & Model */}
            <div className="grid grid-cols-2 gap-4">
              <div>
<label className="text-sm font-medium text-foreground mb-2 block">{t('advancedSearch.fields.make')}</label>
                <Select value={filters.make} onValueChange={(value) => setFilters({...filters, make: value})}>
                  <SelectTrigger>
<SelectValue placeholder={t('advancedSearch.placeholders.anyMake')} />
                  </SelectTrigger>
                  <SelectContent>
<SelectItem value="any-make">{t('advancedSearch.placeholders.anyMake')}</SelectItem>
                    {carMakes.length > 0 ? carMakes.map((make) => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    )) : (
                      <SelectItem value="" disabled>No makes available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
<label className="text-sm font-medium text-foreground mb-2 block">{t('advancedSearch.fields.model')}</label>
                <Input
placeholder={t('advancedSearch.placeholders.anyModel')}
                  value={filters.model}
                  onChange={(e) => setFilters({...filters, model: e.target.value})}
                />
              </div>
            </div>

            {/* Year Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{t('advancedSearch.fields.minYear')}</label>
                <Select value={filters.yearMin} onValueChange={(value) => setFilters({...filters, yearMin: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('advancedSearch.placeholders.any')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t('advancedSearch.placeholders.any')}</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{t('advancedSearch.fields.maxYear')}</label>
                <Select value={filters.yearMax} onValueChange={(value) => setFilters({...filters, yearMax: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('advancedSearch.placeholders.any')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t('advancedSearch.placeholders.any')}</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Body Type & Drivetrain */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{t('advancedSearch.fields.bodyType')}</label>
                <Select value={filters.bodyTypes[0] || ""} onValueChange={(value) => setFilters({...filters, bodyTypes: value ? [value] : []})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('advancedSearch.placeholders.anyType')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any-type">{t('advancedSearch.placeholders.anyType')}</SelectItem>
                    {bodyTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{t('advancedSearch.fields.drivetrain')}</label>
                <Select value={filters.drivetrain} onValueChange={(value) => setFilters({...filters, drivetrain: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('advancedSearch.placeholders.any')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t('advancedSearch.placeholders.any')}</SelectItem>
                    {drivetrains.map((drivetrain) => (
                      <SelectItem key={drivetrain} value={drivetrain}>{drivetrain}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Fuel Type & Transmission */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{t('advancedSearch.fields.fuelType')}</label>
                <Select value={filters.fuelTypes[0] || ""} onValueChange={(value) => setFilters({...filters, fuelTypes: value ? [value] : []})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('advancedSearch.placeholders.any')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t('advancedSearch.placeholders.any')}</SelectItem>
                    {fuelTypes.map((fuel) => (
                      <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{t('advancedSearch.fields.transmission')}</label>
                <Select value={filters.transmissions[0] || ""} onValueChange={(value) => setFilters({...filters, transmissions: value ? [value] : []})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('advancedSearch.placeholders.any')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{t('advancedSearch.placeholders.any')}</SelectItem>
                    {transmissions.map((trans) => (
                      <SelectItem key={trans} value={trans}>{trans}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Colors */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{t('advancedSearch.fields.exteriorColor')}</label>
                <Select value={filters.exteriorColors[0] || ""} onValueChange={(value) => setFilters({...filters, exteriorColors: value ? [value] : []})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('advancedSearch.placeholders.anyColor')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any-color">{t('advancedSearch.placeholders.anyColor')}</SelectItem>
                    {exteriorColors.map((color) => (
                      <SelectItem key={color} value={color}>{color}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{t('advancedSearch.fields.interiorColor')}</label>
                <Select value={filters.interiorColors[0] || ""} onValueChange={(value) => setFilters({...filters, interiorColors: value ? [value] : []})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('advancedSearch.placeholders.anyColor')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any-color">{t('advancedSearch.placeholders.anyColor')}</SelectItem>
                    {interiorColors.map((color) => (
                      <SelectItem key={color} value={color}>{color}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Price & Location */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <DollarSign className="h-5 w-5" />
{t('advancedSearch.sections.priceLocation.title')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Price Range */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                {t('advancedSearch.priceRange')}: ${filters.priceMin.toLocaleString()} - ${filters.priceMax.toLocaleString()}
              </label>
              <Slider
                value={[filters.priceMin, filters.priceMax]}
                onValueChange={([min, max]) => setFilters({...filters, priceMin: min, priceMax: max})}
                max={200000}
                min={0}
                step={5000}
                className="w-full"
              />
              <div className="flex justify-between text-xs text-muted-foreground mt-1">
                <span>$0</span>
                <span>$200,000+</span>
              </div>
            </div>

            {/* Mileage */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">{t('advancedSearch.fields.maxMileage')}</label>
              <Select value={filters.mileageMax.toString()} onValueChange={(value) => setFilters({...filters, mileageMax: parseInt(value) || 300000})}>
                <SelectTrigger>
                  <SelectValue placeholder={t('advancedSearch.placeholders.anyMileage')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any-mileage">{t('advancedSearch.placeholders.anyMileage')}</SelectItem>
                  <SelectItem value="10000">{t('advancedSearch.mileage.under10k')}</SelectItem>
                  <SelectItem value="25000">{t('advancedSearch.mileage.under25k')}</SelectItem>
                  <SelectItem value="50000">{t('advancedSearch.mileage.under50k')}</SelectItem>
                  <SelectItem value="75000">{t('advancedSearch.mileage.under75k')}</SelectItem>
                  <SelectItem value="100000">{t('advancedSearch.mileage.under100k')}</SelectItem>
                  <SelectItem value="150000">{t('advancedSearch.mileage.under150k')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Condition */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">{t('advancedSearch.fields.condition')}</label>
              <Select value={filters.conditions[0] || ""} onValueChange={(value) => setFilters({...filters, conditions: value ? [value] : []})}>
                <SelectTrigger>
                  <SelectValue placeholder={t('advancedSearch.placeholders.anyCondition')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any-condition">{t('advancedSearch.placeholders.anyCondition')}</SelectItem>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{t('advancedSearch.fields.location')}</label>
                <Input
                  placeholder={t('advancedSearch.placeholders.cityStateOrZip')}
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{t('advancedSearch.fields.radius')}</label>
                <Select value={filters.radius} onValueChange={(value) => setFilters({...filters, radius: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={t('advancedSearch.placeholders.anyDistance')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any-distance">{t('advancedSearch.placeholders.anyDistance')}</SelectItem>
                    <SelectItem value="25">{t('advancedSearch.distances.25')}</SelectItem>
                    <SelectItem value="50">{t('advancedSearch.distances.50')}</SelectItem>
                    <SelectItem value="100">{t('advancedSearch.distances.100')}</SelectItem>
                    <SelectItem value="250">{t('advancedSearch.distances.250')}</SelectItem>
                    <SelectItem value="500">{t('advancedSearch.distances.500')}</SelectItem>
                    <SelectItem value="nationwide">{t('advancedSearch.distances.nationwide')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dealer Type */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">{t('advancedSearch.fields.sellerType')}</label>
              <Select value={filters.sellerTypes[0] || ""} onValueChange={(value) => setFilters({...filters, sellerTypes: value ? [value] : []})}>
                <SelectTrigger>
                  <SelectValue placeholder={t('advancedSearch.placeholders.allSellers')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-sellers">{t('advancedSearch.placeholders.allSellers')}</SelectItem>
                  <SelectItem value="dealer">{t('advancedSearch.sellerTypes.dealersOnly')}</SelectItem>
                  <SelectItem value="private">{t('advancedSearch.sellerTypes.privateOnly')}</SelectItem>
                  <SelectItem value="certified">{t('advancedSearch.sellerTypes.certifiedOnly')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <Card>
        <CardHeader>
<CardTitle>{t('advancedSearch.sections.featuresOptions.title')}</CardTitle>
          <CardDescription>{t('advancedSearch.sections.featuresOptions.description')}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-3">
            {features.map((feature) => (
              <div key={feature} className="flex items-center space-x-2">
                <Checkbox
                  id={feature}
                  checked={filters.features.includes(feature)}
                  onCheckedChange={(checked) => handleFeatureChange(feature, checked as boolean)}
                />
                <label htmlFor={feature} className="text-sm text-foreground">
                  {feature}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Search Button */}
      <div className="flex items-center justify-between pt-4">
        <div className="text-sm text-muted-foreground">
{getActiveFiltersCount()} {getActiveFiltersCount() !== 1 ? t('advancedSearch.filters') : t('advancedSearch.filter')} {t('advancedSearch.active')}
        </div>
        <Button onClick={() => onSearch(filters)} size="lg" className="px-8">
          <Search className="h-4 w-4 mr-2" />
{t('advancedSearch.searchCars')}
        </Button>
      </div>
    </div>
  );
}
