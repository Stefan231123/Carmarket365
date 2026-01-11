import { useState, useEffect, useCallback, useRef } from 'react';
import { 
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

// Simplified advanced search hook without GraphQL dependencies
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
  const [searchResults, setSearchResults] = useState<SearchResult | null>(null);
  const [isSearching, setIsSearching] = useState(false);
  const [searchError, setSearchError] = useState<string | null>(null);
  const [searchHistory, setSearchHistory] = useState<AdvancedSearchFiltersInput[]>([]);
  
  // Debounce the filters to avoid excessive API calls
  const debouncedFilters = useDebounce(filters, 300);
  
  // Cache for storing search results to improve performance
  const resultsCache = useRef<Map<string, SearchResult>>(new Map());
  
  // Generate cache key from filters, sort, and pagination
  const generateCacheKey = useCallback((
    filters: AdvancedSearchFiltersInput, 
    sort: SortOptionsInput, 
    pagination: PaginationInput
  ): string => {
    return JSON.stringify({ filters, sort, pagination });
  }, []);

  // Mock search execution for now (replace with actual GraphQL when backend is ready)
  const executeSearch = useCallback(async (
    searchFilters: AdvancedSearchFiltersInput = filters,
    searchSort: SortOptionsInput = sortOptions,
    searchPagination: PaginationInput = pagination,
    useCache: boolean = true
  ) => {
    setIsSearching(true);
    setSearchError(null);

    try {
      const cacheKey = generateCacheKey(searchFilters, searchSort, searchPagination);
      
      // Check cache first
      if (useCache && resultsCache.current.has(cacheKey)) {
        const cachedResult = resultsCache.current.get(cacheKey)!;
        setSearchResults(cachedResult);
        setIsSearching(false);
        return cachedResult;
      }

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 200));
      
      // Mock search results based on filters
      const mockResults: SearchResult = {
        cars: [
          {
            id: '1',
            make: searchFilters.make || 'BMW',
            model: searchFilters.model || '3 Series',
            year: 2020,
            price: 25000,
            mileage: 45000,
            fuelType: searchFilters.fuelType || 'Gasoline',
            transmission: 'Automatic',
            bodyType: searchFilters.bodyType || 'Sedan',
            color: 'Black',
            engineSize: 2.0,
            images: ['https://images.unsplash.com/photo-1555215695-3004980ad54e?w=400'],
            location: 'Berlin, Germany',
            description: 'Well-maintained BMW 3 Series in excellent condition.',
            seller: {
              id: '1',
              name: 'Premium Motors',
              type: 'DEALER',
              rating: 4.8,
              responseTime: 'within 2 hours'
            },
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          }
        ],
        totalCount: 1,
        hasNextPage: false,
        hasPreviousPage: false,
        currentPage: searchPagination.page || 1,
        totalPages: 1
      };

      // Cache the result
      if (useCache) {
        resultsCache.current.set(cacheKey, mockResults);
      }
      
      setSearchResults(mockResults);
      
      // Add to search history
      if (Object.keys(searchFilters).length > 0) {
        setSearchHistory(prev => {
          const newHistory = [searchFilters, ...prev.slice(0, 9)]; // Keep last 10 searches
          return newHistory;
        });
      }

      return mockResults;
      
    } catch (error) {
      console.error('Search error:', error);
      setSearchError(error instanceof Error ? error.message : 'Search failed');
      return null;
    } finally {
      setIsSearching(false);
    }
  }, [filters, sortOptions, pagination, generateCacheKey]);

  // Update filters
  const updateFilters = useCallback((newFilters: AdvancedSearchFiltersInput) => {
    setFilters(newFilters);
  }, []);

  // Update sort options
  const updateSortOptions = useCallback((newSort: SortOptionsInput) => {
    setSortOptions(newSort);
  }, []);

  // Clear all filters
  const clearFilters = useCallback(() => {
    setFilters({});
    setSearchResults(null);
    setSearchError(null);
  }, []);

  // Load more results (pagination)
  const loadMore = useCallback(async () => {
    if (searchResults?.hasNextPage && !isSearching) {
      const nextPagePagination = {
        ...pagination,
        page: (pagination.page || 1) + 1
      };
      setPagination(nextPagePagination);
      
      const moreResults = await executeSearch(filters, sortOptions, nextPagePagination, true);
      
      if (moreResults && searchResults) {
        // Append new results to existing ones
        setSearchResults(prev => prev ? {
          ...moreResults,
          cars: [...prev.cars, ...moreResults.cars],
          currentPage: moreResults.currentPage
        } : moreResults);
      }
    }
  }, [searchResults, isSearching, pagination, filters, sortOptions, executeSearch]);

  // Get active filter count
  const getActiveFilterCount = useCallback(() => {
    return Object.values(filters).filter(value => {
      if (Array.isArray(value)) {
        return value.length > 0;
      }
      return value !== undefined && value !== '' && value !== null;
    }).length;
  }, [filters]);

  // Auto-execute search when debounced filters change
  useEffect(() => {
    if (Object.keys(debouncedFilters).length > 0) {
      executeSearch(debouncedFilters, sortOptions, { page: 1, limit: pagination.limit || 20 });
    }
  }, [debouncedFilters, sortOptions, pagination.limit, executeSearch]);

  return {
    // State
    filters,
    sortOptions,
    searchResults,
    isSearching,
    searchError,
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
    // Mock analytics tracking
    console.log('🔍 Search Analytics:', {
      filters,
      resultCount,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent,
      viewport: `${window.innerWidth}x${window.innerHeight}`
    });
    
    // In production, send to analytics service
    // analytics.track('advanced_search', { filters, resultCount });
  }, []);

  const trackFilterUsage = useCallback((filterType: string, value: any) => {
    console.log('📊 Filter Usage:', {
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