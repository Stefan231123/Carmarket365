import { useState, useEffect, useCallback } from 'react';
import { useQuery } from '@apollo/client/react';
import {
  GET_CARS,
  Car,
  AdvancedSearchFiltersInput,
  SortOptionsInput,
  PaginationInput,
  SearchResult
} from '../lib/graphql/operations';
// Debounce hook for search input
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

// Vehicle type display strings → backend enum
const BODY_TYPE_MAP: Record<string, string> = {
  // MK
  'Мал автомобил': 'HATCHBACK', 'Комби': 'VAN', 'SUV/Теренски/Пикап': 'SUV',
  'Купе': 'COUPE', 'Кабрио': 'CONVERTIBLE', 'Седан': 'SEDAN',
  'Хечбек': 'HATCHBACK', 'Караван': 'WAGON', 'Минивен': 'VAN',
  'Пикап камион': 'TRUCK', 'Друго': 'CAR',
  // SQ
  'Makinë e vogël': 'HATCHBACK', 'Karroceri': 'VAN', 'SUV/Terren/Pickup': 'SUV',
  'Kupe': 'COUPE', 'Kabriolet': 'CONVERTIBLE', 'Sedan': 'SEDAN',
  'Hatchback': 'HATCHBACK', 'Karavan': 'WAGON', 'Minivan': 'VAN',
  'Kamion pickup': 'TRUCK', 'Tjetër': 'CAR',
  // EN / passthrough
  'Small Car': 'HATCHBACK', 'Coupe': 'COUPE', 'Convertible': 'CONVERTIBLE', 'Wagon': 'WAGON',
  // Already enum values (includes VAN, SUV, TRUCK which cover EN display strings too)
  'CAR': 'CAR', 'MOTORCYCLE': 'MOTORCYCLE', 'TRUCK': 'TRUCK', 'VAN': 'VAN',
  'SUV': 'SUV', 'COUPE': 'COUPE', 'CONVERTIBLE': 'CONVERTIBLE',
  'WAGON': 'WAGON', 'HATCHBACK': 'HATCHBACK', 'SEDAN': 'SEDAN',
};

// Fuel type display strings → backend enum
const FUEL_TYPE_MAP: Record<string, string> = {
  // MK
  'Бензин': 'GASOLINE', 'Дизел': 'DIESEL', 'Електричен': 'ELECTRIC',
  'Хибрид (Бензин/Електричен)': 'HYBRID', 'Хибрид (Дизел/Електричен)': 'PLUGIN_HYBRID',
  'Природен гас (CNG)': 'CNG', 'Течен гас (LPG)': 'LPG',
  'Етанол': 'GASOLINE', 'Водород': 'HYDROGEN',
  // SQ
  'Benzinë': 'GASOLINE', 'Dizel': 'DIESEL', 'Elektrik': 'ELECTRIC',
  'Hibrid (Benzinë/Elektrik)': 'HYBRID', 'Hibrid (Dizel/Elektrik)': 'PLUGIN_HYBRID',
  'Gaz natyror (CNG)': 'CNG', 'Gaz i lëngshëm (LPG)': 'LPG',
  'Etanol': 'GASOLINE', 'Hidrogjen': 'HYDROGEN',
  // EN / passthrough
  'Gasoline': 'GASOLINE', 'Petrol': 'GASOLINE', 'Diesel': 'DIESEL',
  'Electric': 'ELECTRIC', 'Hybrid': 'HYBRID', 'Plug-in Hybrid': 'PLUGIN_HYBRID',
  'Natural Gas (CNG)': 'CNG', 'Liquid Gas (LPG)': 'LPG', 'Hydrogen': 'HYDROGEN',
  // Already enum values
  'GASOLINE': 'GASOLINE', 'DIESEL': 'DIESEL', 'ELECTRIC': 'ELECTRIC',
  'HYBRID': 'HYBRID', 'PLUGIN_HYBRID': 'PLUGIN_HYBRID',
  'LPG': 'LPG', 'CNG': 'CNG', 'HYDROGEN': 'HYDROGEN',
};

// Transmission display strings → backend enum
const GEAR_MAP: Record<string, string> = {
  // MK
  'Мануелна': 'MANUAL', 'Автоматска': 'AUTOMATIC',
  'Полу-автоматска': 'SEMI_AUTOMATIC', 'CVT': 'CVT',
  // SQ (fallback to MK in current code so not strictly needed, but safe)
  'Manuale': 'MANUAL', 'Automatike': 'AUTOMATIC', 'Semi-automatike': 'SEMI_AUTOMATIC',
  // EN
  'Manual': 'MANUAL', 'Automatic': 'AUTOMATIC', 'Semi-automatic': 'SEMI_AUTOMATIC',
  // Already enum values
  'MANUAL': 'MANUAL', 'AUTOMATIC': 'AUTOMATIC',
  'SEMI_AUTOMATIC': 'SEMI_AUTOMATIC',
};

// Seller type display strings → backend 'private' | 'dealer'
const SELLER_TYPE_MAP: Record<string, string> = {
  // MK
  'Приватен продавач': 'private', 'Дилер': 'dealer',
  'Сертифициран дилер': 'dealer', 'Флота/Лизинг': 'dealer',
  // SQ
  'Shitës privat': 'private', 'Dealer': 'dealer',
  'Dealer i certifikuar': 'dealer', 'Flotë/Qira': 'dealer',
  // EN
  'Private Seller': 'private', 'Certified Dealer': 'dealer', 'Fleet/Leasing': 'dealer',
  // passthrough
  'private': 'private', 'dealer': 'dealer',
};

// Condition display strings → backend enum
const CONDITION_MAP: Record<string, string> = {
  // MK
  'Нов': 'NEW', 'Користен': 'USED', 'Предрегистриран': 'CERTIFIED',
  'Демонстрационо возило': 'CERTIFIED', 'Класик/Винтиџ': 'USED',
  // SQ
  'E re': 'NEW', 'I përdorur': 'USED', 'E para-regjistruar': 'CERTIFIED',
  'Mjet demonstrimi': 'CERTIFIED', 'Klasike/Vintage': 'USED',
  // EN
  'New': 'NEW', 'Used': 'USED', 'Certified': 'CERTIFIED',
  'Pre-registered': 'CERTIFIED', 'Demo Vehicle': 'CERTIFIED',
  'Classic/Vintage': 'USED', 'Damaged': 'DAMAGED',
  // Already enum values
  'NEW': 'NEW', 'USED': 'USED', 'CERTIFIED': 'CERTIFIED', 'DAMAGED': 'DAMAGED',
};

// Map frontend advanced search filters to backend CarFilterInput fields
function mapFiltersToBackend(filters: AdvancedSearchFiltersInput): Record<string, any> {
  const backendFilters: Record<string, any> = {};

  if (filters.make) backendFilters.make = filters.make;
  if (filters.model) backendFilters.model = filters.model;

  // Body type → vehicleType enum
  if (filters.bodyType && filters.bodyType !== 'any') {
    backendFilters.vehicleType = BODY_TYPE_MAP[filters.bodyType] || filters.bodyType;
  }

  // Fuel type → enum
  if (filters.fuelType) {
    backendFilters.fuelType = FUEL_TYPE_MAP[filters.fuelType] || filters.fuelType;
  }

  // Transmission: prefer explicit transmissionType, fall back to gear
  if (filters.transmissionType) {
    backendFilters.transmission = GEAR_MAP[filters.transmissionType] || filters.transmissionType;
  } else if (filters.gear) {
    const mapped = GEAR_MAP[filters.gear];
    if (mapped) backendFilters.transmission = mapped;
  }

  // Condition → enum
  if (filters.vehicleCondition && filters.vehicleCondition !== 'any') {
    backendFilters.condition = CONDITION_MAP[filters.vehicleCondition] || filters.vehicleCondition;
  }

  // Color (exteriorColor takes precedence over bodyColor)
  if (filters.exteriorColor && filters.exteriorColor !== 'any') backendFilters.color = filters.exteriorColor;
  else if (filters.bodyColor && filters.bodyColor !== 'any') backendFilters.color = filters.bodyColor;

  // Year range
  if (filters.firstRegistrationFrom) backendFilters.minYear = filters.firstRegistrationFrom;
  else if (filters.yearMin) backendFilters.minYear = filters.yearMin;

  if (filters.firstRegistrationTo) backendFilters.maxYear = filters.firstRegistrationTo;
  else if (filters.yearMax) backendFilters.maxYear = filters.yearMax;

  // Price range
  if (filters.priceMin) backendFilters.minPrice = filters.priceMin;
  if (filters.priceMax) backendFilters.maxPrice = filters.priceMax;

  // Mileage
  if (filters.mileageMin) backendFilters.minMileage = filters.mileageMin;
  if (filters.mileageMax) backendFilters.maxMileage = filters.mileageMax;

  // Location (cityZipCode takes precedence)
  if (filters.cityZipCode) backendFilters.location = filters.cityZipCode;
  else if (filters.location) backendFilters.location = filters.location;

  // Country code
  if (filters.countryCode) backendFilters.countryCode = filters.countryCode;

  // Power (PS takes precedence over kW if both set; PS ≈ HP)
  if (filters.powerMinPS) backendFilters.minHorsePower = Math.round(filters.powerMinPS);
  else if (filters.powerMinKW) backendFilters.minHorsePower = Math.round(filters.powerMinKW * 1.36);

  if (filters.powerMaxPS) backendFilters.maxHorsePower = Math.round(filters.powerMaxPS);
  else if (filters.powerMaxKW) backendFilters.maxHorsePower = Math.round(filters.powerMaxKW * 1.36);

  // Engine displacement (cc, already converted from L in sync useEffect)
  if (filters.engineDisplacementMin) backendFilters.minEngineSize = filters.engineDisplacementMin;
  if (filters.engineDisplacementMax) backendFilters.maxEngineSize = filters.engineDisplacementMax;

  // Fuel consumption (L/100km)
  if (filters.fuelConsumptionMin) backendFilters.minFuelConsumption = filters.fuelConsumptionMin;
  if (filters.fuelConsumptionMax) backendFilters.maxFuelConsumption = filters.fuelConsumptionMax;

  // Warranty / guarantee
  const g = filters.guarantee;
  if (g && g !== 'any') {
    if (g === 'no' || g === 'No Guarantee') backendFilters.hasWarranty = false;
    else backendFilters.hasWarranty = true; // any non-"no" guarantee type = has warranty
  }

  // Full service history (handle 'yes'/'no', MK 'Да'/'Не', EN 'Yes'/'No', and serviceBookAvailable)
  const fsh = filters.serviceBookAvailable || filters.fullServiceHistory;
  if (fsh && fsh !== 'any') {
    const truthy = ['yes', 'Yes', 'Да', 'Po', 'Digital'];
    const falsy  = ['no',  'No',  'Не', 'Jo'];
    if (truthy.includes(String(fsh))) backendFilters.fullServiceHistory = true;
    else if (falsy.includes(String(fsh))) backendFilters.fullServiceHistory = false;
    else if (fsh === true) backendFilters.fullServiceHistory = true;
  }

  // Non-smoking vehicle (handle MK/SQ/EN yes-like strings)
  const ns = filters.nonSmokingVehicle;
  if (ns && ns !== 'any') {
    if (['yes', 'Yes', 'Да', 'Po'].includes(String(ns))) backendFilters.nonSmokingVehicle = true;
    else if (['no', 'No', 'Не', 'Jo'].includes(String(ns))) backendFilters.nonSmokingVehicle = false;
  }

  // Accident history (hadAccident is a string in DB — 'yes'/'no'/'unknown')
  if (filters.hadAccident && filters.hadAccident !== 'any') {
    const ha = filters.hadAccident;
    if (['Да', 'Po', 'Yes'].includes(ha)) backendFilters.hadAccident = 'yes';
    else if (['Не', 'Jo', 'No'].includes(ha)) backendFilters.hadAccident = 'no';
    else if (['Непознато', 'E panjohur', 'Unknown'].includes(ha)) backendFilters.hadAccident = 'unknown';
    else backendFilters.hadAccident = ha; // already 'yes'/'no'/'unknown'
  }

  // Test drive, trade-in, price negotiable (booleans — direct pass-through)
  if (filters.allowTestDrive !== undefined) backendFilters.allowTestDrive = filters.allowTestDrive;
  if (filters.acceptsTradeIn !== undefined) backendFilters.acceptsTradeIn = filters.acceptsTradeIn;
  if (filters.priceNegotiable !== undefined) backendFilters.priceNegotiable = filters.priceNegotiable;

  // quickSale
  if (filters.quickSale !== undefined) backendFilters.quickSale = filters.quickSale;

  // Optional equipment → features array
  if (filters.features?.length) backendFilters.features = filters.features;

  // Seller type (private vs dealer)
  const seller = (filters as any).sellerType;
  if (seller && seller !== 'any') {
    backendFilters.sellerType = SELLER_TYPE_MAP[seller] || undefined;
  }

  // Seats and doors
  if (filters.numberOfSeats) backendFilters.seats = parseInt(String(filters.numberOfSeats));
  if ((filters as any).numberOfDoors) backendFilters.doors = parseInt(String((filters as any).numberOfDoors));

  // Interior color
  if (filters.interiorColor && filters.interiorColor !== 'any') backendFilters.interiorColor = filters.interiorColor;

  // Upholstery
  if (filters.upholstery && filters.upholstery !== 'any') backendFilters.upholsteryType = filters.upholstery;

  // Paint work
  if (filters.paintWork && filters.paintWork !== 'any') backendFilters.paintWorkType = filters.paintWork;

  // Previous owners
  if (filters.previousOwners) backendFilters.maxPreviousOwners = parseInt(String(filters.previousOwners));

  // Emission class
  if (filters.euroEmissionClass && filters.euroEmissionClass !== 'any') backendFilters.emissionClass = filters.euroEmissionClass;

  // Drivetrain type (already enum values in UI)
  if (filters.drivetrain) backendFilters.drivetrain = filters.drivetrain;

  return backendFilters;
}

// Advanced search hook connected to real GraphQL backend
export function useAdvancedSearch() {
  const [filters, setFilters] = useState<AdvancedSearchFiltersInput>({});
  const [sortOptions, setSortOptions] = useState<SortOptionsInput>({
    field: 'createdAt',
    direction: 'DESC'
  });
  const [pagination, setPagination] = useState<PaginationInput>({
    page: 1,
    limit: 20
  });
  const [searchHistory, setSearchHistory] = useState<AdvancedSearchFiltersInput[]>([]);

  // Debounce the filters to avoid excessive API calls
  const debouncedFilters = useDebounce(filters, 300);

  // Build the backend-compatible filters
  const backendFilters = mapFiltersToBackend(debouncedFilters);

  const { data, loading, error, refetch } = useQuery<{ getCars: Car[] }>(GET_CARS, {
    variables: { filters: backendFilters },
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network',
  });

  const cars = data?.getCars || [];

  // Build search result object
  const searchResults: SearchResult | null = cars.length > 0 || !loading ? {
    cars,
    totalCount: cars.length,
    hasNextPage: false,
    totalPages: 1,
    currentPage: pagination.page || 1,
  } : null;

  // Track search history
  useEffect(() => {
    if (Object.keys(debouncedFilters).length > 0 && cars.length > 0) {
      setSearchHistory(prev => {
        const newHistory = [debouncedFilters, ...prev.slice(0, 9)];
        return newHistory;
      });
    }
  }, [debouncedFilters, cars.length]);

  // Update filters
  const updateFilters = useCallback((newFilters: AdvancedSearchFiltersInput) => {
    setFilters(newFilters);
    setPagination(prev => ({ ...prev, page: 1 }));
  }, []);

  // Update sort options
  const updateSortOptions = useCallback((newSort: SortOptionsInput) => {
    setSortOptions(newSort);
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({});
  }, []);

  // Execute search (triggers refetch)
  const executeSearch = useCallback(async (
    searchFilters?: AdvancedSearchFiltersInput,
    _searchSort?: SortOptionsInput,
    _searchPagination?: PaginationInput,
  ) => {
    if (searchFilters) {
      setFilters(searchFilters);
    }
    const result = await refetch();
    const resultCars = result.data?.getCars || [];
    return {
      cars: resultCars,
      totalCount: resultCars.length,
      hasNextPage: false,
      totalPages: 1,
      currentPage: 1,
    } as SearchResult;
  }, [refetch]);

  // Load more (no-op for now since backend doesn't support pagination on getCars)
  const loadMore = useCallback(async () => {
    // Backend doesn't currently support offset/limit on getCars
  }, []);

  // Get active filter count
  const getActiveFilterCount = useCallback(() => {
    return Object.values(filters).filter(value => {
      if (Array.isArray(value)) return value.length > 0;
      return value !== undefined && value !== '' && value !== null;
    }).length;
  }, [filters]);

  return {
    // State
    filters,
    sortOptions,
    searchResults,
    isSearching: loading,
    searchError: error?.message || null,
    searchHistory,

    // Actions
    updateFilters,
    updateSortOptions,
    clearFilters,
    executeSearch,
    loadMore,
    getActiveFilterCount
  };
}

// Search analytics hook for tracking user behavior
export function useSearchAnalytics() {
  const trackSearch = useCallback((
    filters: AdvancedSearchFiltersInput,
    resultCount: number
  ) => {
    console.log('Search Analytics:', {
      filters,
      resultCount,
      timestamp: new Date().toISOString(),
    });
  }, []);

  const trackFilterUsage = useCallback((filterType: string, value: any) => {
    console.log('Filter Usage:', {
      filterType,
      value,
      timestamp: new Date().toISOString()
    });
  }, []);

  return {
    trackSearch,
    trackFilterUsage
  };
}
