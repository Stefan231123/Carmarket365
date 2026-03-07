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

// Map frontend advanced search filters to backend CarFilterInput fields
function mapFiltersToBackend(filters: AdvancedSearchFiltersInput): Record<string, any> {
  const backendFilters: Record<string, any> = {};

  if (filters.make) backendFilters.make = filters.make;
  if (filters.model) backendFilters.model = filters.model;
  if (filters.bodyType && filters.bodyType !== 'any') backendFilters.vehicleType = filters.bodyType;
  if (filters.fuelType) backendFilters.fuelType = filters.fuelType;
  if (filters.transmissionType) backendFilters.transmission = filters.transmissionType;
  if (filters.vehicleCondition && filters.vehicleCondition !== 'any') backendFilters.condition = filters.vehicleCondition;
  if (filters.bodyColor) backendFilters.color = filters.bodyColor;
  if (filters.exteriorColor) backendFilters.color = filters.exteriorColor;

  // Year range
  if (filters.yearMin) backendFilters.minYear = filters.yearMin;
  if (filters.yearMax) backendFilters.maxYear = filters.yearMax;
  if (filters.firstRegistrationFrom) backendFilters.minYear = filters.firstRegistrationFrom;
  if (filters.firstRegistrationTo) backendFilters.maxYear = filters.firstRegistrationTo;

  // Price range
  if (filters.priceMin) backendFilters.minPrice = filters.priceMin;
  if (filters.priceMax) backendFilters.maxPrice = filters.priceMax;

  // Mileage
  if (filters.mileageMax) backendFilters.maxMileage = filters.mileageMax;

  // Location
  if (filters.location) backendFilters.location = filters.location;

  // Drivetrain
  if (filters.gear) {
    const gearMap: Record<string, string> = {
      'Manual': 'MANUAL', 'Automatic': 'AUTOMATIC',
      'Semi-automatic': 'SEMI_AUTOMATIC', 'CVT': 'CVT',
    };
    if (gearMap[filters.gear]) backendFilters.transmission = gearMap[filters.gear];
  }

  // Power (kW to HP conversion: 1 kW ≈ 1.36 HP)
  if (filters.powerMinKW) backendFilters.minHorsePower = Math.round(filters.powerMinKW * 1.36);
  if (filters.powerMaxKW) backendFilters.maxHorsePower = Math.round(filters.powerMaxKW * 1.36);

  // Seats
  if (filters.numberOfSeats) backendFilters.seats = parseInt(String(filters.numberOfSeats));

  // Interior color
  if (filters.interiorColor && filters.interiorColor !== 'any') backendFilters.interiorColor = filters.interiorColor;

  // Upholstery
  if (filters.upholstery && filters.upholstery !== 'any') backendFilters.upholsteryType = filters.upholstery;

  // Paint work
  if (filters.paintWork && filters.paintWork !== 'any') backendFilters.paintWorkType = filters.paintWork;

  // Previous owners
  if (filters.previousOwners) backendFilters.maxPreviousOwners = parseInt(String(filters.previousOwners));

  // Accident history
  if (filters.hadAccident && filters.hadAccident !== 'any') backendFilters.hadAccident = filters.hadAccident;

  // Non-smoking
  if (filters.nonSmokingVehicle === 'Yes') backendFilters.nonSmokingVehicle = true;

  // Full service history
  if (filters.fullServiceHistory === 'Yes' || filters.fullServiceHistory === true) backendFilters.fullServiceHistory = true;

  // Emission class
  if (filters.euroEmissionClass && filters.euroEmissionClass !== 'any') backendFilters.emissionClass = filters.euroEmissionClass;

  // Drivetrain type
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
