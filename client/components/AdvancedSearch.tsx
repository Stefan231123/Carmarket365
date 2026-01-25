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
import { sqTranslations } from "../../shared/translations/sq";

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

  // Helper function to get nested value from object using dot notation
  const getNestedValue = (obj: any, key: string): string | undefined => {
    return key.split('.').reduce((currentObj, keyPart) => {
      return currentObj && currentObj[keyPart];
    }, obj);
  };

  // Translation helper function with Macedonian and Albanian fallback
  const getAdvancedSearchText = (key: string, fallback: string) => {
    // Try Macedonian first
    if (currentLanguage === 'mk' && mkTranslations?.advancedSearch) {
      const value = getNestedValue(mkTranslations.advancedSearch, key);
      if (value && typeof value === 'string') {
        return value;
      }
    }
    
    // Try Albanian second
    if (currentLanguage === 'sq' && sqTranslations?.advancedSearch) {
      const value = getNestedValue(sqTranslations.advancedSearch, key);
      if (value && typeof value === 'string') {
        return value;
      }
    }
    
    // Try dynamic translation system third
    const translated = t(`advancedSearch.${key}`);
    if (translated && translated !== `advancedSearch.${key}`) {
      return translated;
    }
    
    // Return English fallback last
    return fallback;
  };

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
    
    // If dynamic system fails, try direct imports for Macedonian and Albanian
    if (currentLanguage === 'mk' && mkTranslations?.advancedSearch?.staticVehicleData) {
      try {
        const staticData = mkTranslations.advancedSearch.staticVehicleData;
        console.log(`[AdvancedSearch] Available Macedonian static data keys:`, Object.keys(staticData));
        
        const data = staticData[key as keyof typeof staticData];
        console.log(`[AdvancedSearch] Macedonian direct import result for ${key}:`, data);
        
        if (Array.isArray(data) && data.length > 0) {
          console.log(`[AdvancedSearch] Successfully using Macedonian direct import for ${key}:`, data);
          return data as string[];
        }
      } catch (error) {
        console.warn(`[AdvancedSearch] Macedonian direct import failed for ${key}:`, error);
      }
    }
    
    // Try Albanian direct import
    if (currentLanguage === 'sq' && sqTranslations?.advancedSearch?.staticVehicleData) {
      try {
        const staticData = sqTranslations.advancedSearch.staticVehicleData;
        console.log(`[AdvancedSearch] Available Albanian static data keys:`, Object.keys(staticData));
        
        const data = staticData[key as keyof typeof staticData];
        console.log(`[AdvancedSearch] Albanian direct import result for ${key}:`, data);
        
        if (Array.isArray(data) && data.length > 0) {
          console.log(`[AdvancedSearch] Successfully using Albanian direct import for ${key}:`, data);
          return data as string[];
        }
      } catch (error) {
        console.warn(`[AdvancedSearch] Albanian direct import failed for ${key}:`, error);
      }
    }
    
    // Smart fallback based on key with proper Albanian and Macedonian support
    const getMinimalFallback = (dataKey: string): string[] => {
      switch(dataKey) {
        case 'makes':
          return ['Audi', 'BMW', 'Toyota', 'Volkswagen', 'Mercedes-Benz', 'Ford'];
        case 'bodyTypes':
          if (currentLanguage === 'mk') return ['Седан', 'SUV', 'Хечбек', 'Караван', 'Купе'];
          if (currentLanguage === 'sq') return ['Sedan', 'SUV', 'Hatchback', 'Karavan', 'Kupé'];
          return ['Sedan', 'SUV', 'Hatchback', 'Wagon', 'Coupe'];
        case 'fuelTypes':
          if (currentLanguage === 'mk') return ['Бензин', 'Дизел', 'Електричен', 'Хибриден'];
          if (currentLanguage === 'sq') return ['Benzinë', 'Diesel', 'Elektrike', 'Hibride'];
          return ['Gasoline', 'Diesel', 'Electric', 'Hybrid'];
        case 'transmissions':
          if (currentLanguage === 'mk') return ['Мануелна', 'Автоматска', 'CVT'];
          if (currentLanguage === 'sq') return ['Manuale', 'Automatike', 'CVT'];
          return ['Manual', 'Automatic', 'CVT'];
        case 'drivetrains':
          if (currentLanguage === 'mk') return ['Предни тркала', 'Задни тркала', 'Сите тркала'];
          if (currentLanguage === 'sq') return ['Traktim përpara', 'Traktim prapa', 'Katër rrota'];
          return ['Front Wheel Drive', 'Rear Wheel Drive', 'All Wheel Drive'];
        case 'conditions':
          if (currentLanguage === 'mk') return ['Нов', 'Користен', 'Сертифициран'];
          if (currentLanguage === 'sq') return ['I ri', 'I përdorur', 'I certifikuar'];
          return ['New', 'Used', 'Certified'];
        case 'colors':
        case 'interiorColors':
          if (currentLanguage === 'mk') return ['Црна', 'Бела', 'Сива', 'Сребрена', 'Црвена'];
          if (currentLanguage === 'sq') return ['E zezë', 'E bardhë', 'Gri', 'Argjendtë', 'E kuqe'];
          return ['Black', 'White', 'Gray', 'Silver', 'Red'];
        case 'sellerTypes':
          if (currentLanguage === 'mk') return ['Дилер', 'Приватен продавач', 'Сертифициран дилер'];
          if (currentLanguage === 'sq') return ['Shitës', 'Shitës privat', 'Shitës i certifikuar'];
          return ['Dealer', 'Private Seller', 'Certified Dealer'];
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
<h2 className="text-xl font-bold text-foreground">{getAdvancedSearchText('title', 'Advanced Search')}</h2>
          {getActiveFiltersCount() > 0 && (
<Badge variant="secondary">{getActiveFiltersCount()} {getAdvancedSearchText('active', 'active')}</Badge>
          )}
        </div>
        <div className="flex items-center gap-2">
          <Button variant="ghost" onClick={clearAllFilters} size="sm">
{getAdvancedSearchText('clearAll', 'Clear All')}
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
{getAdvancedSearchText('sections.vehicleDetails.title', 'Vehicle Details')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Make & Model */}
            <div className="grid grid-cols-2 gap-4">
              <div>
<label className="text-sm font-medium text-foreground mb-2 block">{getAdvancedSearchText('fields.make', 'Make')}</label>
                <Select value={filters.make} onValueChange={(value) => setFilters({...filters, make: value})}>
                  <SelectTrigger>
<SelectValue placeholder={getAdvancedSearchText('placeholders.anyMake', 'Any Make')} />
                  </SelectTrigger>
                  <SelectContent>
<SelectItem value="any-make">{getAdvancedSearchText('placeholders.anyMake', 'Any Make')}</SelectItem>
                    {carMakes.length > 0 ? carMakes.map((make) => (
                      <SelectItem key={make} value={make}>{make}</SelectItem>
                    )) : (
                      <SelectItem value="" disabled>No makes available</SelectItem>
                    )}
                  </SelectContent>
                </Select>
              </div>
              <div>
<label className="text-sm font-medium text-foreground mb-2 block">{getAdvancedSearchText('fields.model', 'Model')}</label>
                <Input
placeholder={getAdvancedSearchText('placeholders.anyModel', 'Any Model')}
                  value={filters.model}
                  onChange={(e) => setFilters({...filters, model: e.target.value})}
                />
              </div>
            </div>

            {/* Year Range */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{getAdvancedSearchText('fields.minYear', 'Min Year')}</label>
                <Select value={filters.yearMin} onValueChange={(value) => setFilters({...filters, yearMin: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                    {years.map((year) => (
                      <SelectItem key={year} value={year}>{year}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{getAdvancedSearchText('fields.maxYear', 'Max Year')}</label>
                <Select value={filters.yearMax} onValueChange={(value) => setFilters({...filters, yearMax: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
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
                <label className="text-sm font-medium text-foreground mb-2 block">{getAdvancedSearchText('fields.bodyType', 'Body Type')}</label>
                <Select value={filters.bodyTypes[0] || ""} onValueChange={(value) => setFilters({...filters, bodyTypes: value ? [value] : []})}>
                  <SelectTrigger>
                    <SelectValue placeholder={getAdvancedSearchText('placeholders.anyType', 'Any Type')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any-type">{getAdvancedSearchText('placeholders.anyType', 'Any Type')}</SelectItem>
                    {bodyTypes.map((type) => (
                      <SelectItem key={type} value={type}>{type}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{getAdvancedSearchText('fields.drivetrain', 'Drivetrain')}</label>
                <Select value={filters.drivetrain} onValueChange={(value) => setFilters({...filters, drivetrain: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
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
                <label className="text-sm font-medium text-foreground mb-2 block">{getAdvancedSearchText('fields.fuelType', 'Fuel Type')}</label>
                <Select value={filters.fuelTypes[0] || ""} onValueChange={(value) => setFilters({...filters, fuelTypes: value ? [value] : []})}>
                  <SelectTrigger>
                    <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
                    {fuelTypes.map((fuel) => (
                      <SelectItem key={fuel} value={fuel}>{fuel}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{getAdvancedSearchText('fields.transmission', 'Transmission')}</label>
                <Select value={filters.transmissions[0] || ""} onValueChange={(value) => setFilters({...filters, transmissions: value ? [value] : []})}>
                  <SelectTrigger>
                    <SelectValue placeholder={getAdvancedSearchText('placeholders.any', 'Any')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any">{getAdvancedSearchText('placeholders.any', 'Any')}</SelectItem>
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
                <label className="text-sm font-medium text-foreground mb-2 block">{getAdvancedSearchText('fields.exteriorColor', 'Exterior Color')}</label>
                <Select value={filters.exteriorColors[0] || ""} onValueChange={(value) => setFilters({...filters, exteriorColors: value ? [value] : []})}>
                  <SelectTrigger>
                    <SelectValue placeholder={getAdvancedSearchText('placeholders.anyColor', 'Any Color')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any-color">{getAdvancedSearchText('placeholders.anyColor', 'Any Color')}</SelectItem>
                    {exteriorColors.map((color) => (
                      <SelectItem key={color} value={color}>{color}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{getAdvancedSearchText('fields.interiorColor', 'Interior Color')}</label>
                <Select value={filters.interiorColors[0] || ""} onValueChange={(value) => setFilters({...filters, interiorColors: value ? [value] : []})}>
                  <SelectTrigger>
                    <SelectValue placeholder={getAdvancedSearchText('placeholders.anyColor', 'Any Color')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any-color">{getAdvancedSearchText('placeholders.anyColor', 'Any Color')}</SelectItem>
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
{getAdvancedSearchText('sections.priceLocation.title', 'Price & Location')}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {/* Price Range */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">
                {getAdvancedSearchText('priceRange', 'Price Range')}: ${filters.priceMin.toLocaleString()} - ${filters.priceMax.toLocaleString()}
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
              <label className="text-sm font-medium text-foreground mb-2 block">{getAdvancedSearchText('fields.maxMileage', 'Max Mileage')}</label>
              <Select value={filters.mileageMax.toString()} onValueChange={(value) => setFilters({...filters, mileageMax: parseInt(value) || 300000})}>
                <SelectTrigger>
                  <SelectValue placeholder={getAdvancedSearchText('placeholders.anyMileage', 'Any Mileage')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any-mileage">{getAdvancedSearchText('placeholders.anyMileage', 'Any Mileage')}</SelectItem>
                  <SelectItem value="10000">{getAdvancedSearchText('mileage.under10k', 'Under 10k miles')}</SelectItem>
                  <SelectItem value="25000">{getAdvancedSearchText('mileage.under25k', 'Under 25k miles')}</SelectItem>
                  <SelectItem value="50000">{getAdvancedSearchText('mileage.under50k', 'Under 50k miles')}</SelectItem>
                  <SelectItem value="75000">{getAdvancedSearchText('mileage.under75k', 'Under 75k miles')}</SelectItem>
                  <SelectItem value="100000">{getAdvancedSearchText('mileage.under100k', 'Under 100k miles')}</SelectItem>
                  <SelectItem value="150000">{getAdvancedSearchText('mileage.under150k', 'Under 150k miles')}</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Condition */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">{getAdvancedSearchText('fields.condition', 'Condition')}</label>
              <Select value={filters.conditions[0] || ""} onValueChange={(value) => setFilters({...filters, conditions: value ? [value] : []})}>
                <SelectTrigger>
                  <SelectValue placeholder={getAdvancedSearchText('placeholders.anyCondition', 'Any Condition')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="any-condition">{getAdvancedSearchText('placeholders.anyCondition', 'Any Condition')}</SelectItem>
                  {conditions.map((condition) => (
                    <SelectItem key={condition} value={condition}>{condition}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Location */}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{getAdvancedSearchText('fields.location', 'Location')}</label>
                <Input
                  placeholder={getAdvancedSearchText('placeholders.cityStateOrZip', 'City, State or ZIP')}
                  value={filters.location}
                  onChange={(e) => setFilters({...filters, location: e.target.value})}
                />
              </div>
              <div>
                <label className="text-sm font-medium text-foreground mb-2 block">{getAdvancedSearchText('fields.radius', 'Distance')}</label>
                <Select value={filters.radius} onValueChange={(value) => setFilters({...filters, radius: value})}>
                  <SelectTrigger>
                    <SelectValue placeholder={getAdvancedSearchText('placeholders.anyDistance', 'Any Distance')} />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="any-distance">{getAdvancedSearchText('placeholders.anyDistance', 'Any Distance')}</SelectItem>
                    <SelectItem value="25">{getAdvancedSearchText('distances.25', '25 miles')}</SelectItem>
                    <SelectItem value="50">{getAdvancedSearchText('distances.50', '50 miles')}</SelectItem>
                    <SelectItem value="100">{getAdvancedSearchText('distances.100', '100 miles')}</SelectItem>
                    <SelectItem value="250">{getAdvancedSearchText('distances.250', '250 miles')}</SelectItem>
                    <SelectItem value="500">{getAdvancedSearchText('distances.500', '500 miles')}</SelectItem>
                    <SelectItem value="nationwide">{getAdvancedSearchText('distances.nationwide', 'Nationwide')}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Dealer Type */}
            <div>
              <label className="text-sm font-medium text-foreground mb-2 block">{getAdvancedSearchText('fields.sellerType', 'Seller Type')}</label>
              <Select value={filters.sellerTypes[0] || ""} onValueChange={(value) => setFilters({...filters, sellerTypes: value ? [value] : []})}>
                <SelectTrigger>
                  <SelectValue placeholder={getAdvancedSearchText('placeholders.allSellers', 'All Sellers')} />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all-sellers">{getAdvancedSearchText('placeholders.allSellers', 'All Sellers')}</SelectItem>
                  <SelectItem value="dealer">{getAdvancedSearchText('sellerTypes.dealersOnly', 'Dealers Only')}</SelectItem>
                  <SelectItem value="private">{getAdvancedSearchText('sellerTypes.privateOnly', 'Private Sellers Only')}</SelectItem>
                  <SelectItem value="certified">{getAdvancedSearchText('sellerTypes.certifiedOnly', 'Certified Only')}</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Features */}
      <Card>
        <CardHeader>
<CardTitle>{getAdvancedSearchText('sections.featuresOptions.title', 'Features & Options')}</CardTitle>
          <CardDescription>{getAdvancedSearchText('sections.featuresOptions.description', 'Additional features and equipment options')}</CardDescription>
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
{getActiveFiltersCount()} {getActiveFiltersCount() !== 1 ? getAdvancedSearchText('filters', 'filters') : getAdvancedSearchText('filter', 'filter')} {getAdvancedSearchText('active', 'active')}
        </div>
        <Button onClick={() => onSearch(filters)} size="lg" className="px-8">
          <Search className="h-4 w-4 mr-2" />
{getAdvancedSearchText('searchCars', 'Search Cars')}
        </Button>
      </div>
    </div>
  );
}
