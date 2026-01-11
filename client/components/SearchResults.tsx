import React, { useEffect, useRef, useCallback } from 'react';
import { Loader2, Grid, List, ArrowUpDown, SortAsc, SortDesc, Car, Search, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Card, CardContent } from '@/components/ui/card';
import { CarCard } from './CarCard';
import { CarCardSkeleton } from './CarCardSkeleton';
import { SearchResult, SortOptionsInput } from '../lib/graphql/operations';
import { useTranslation } from '../hooks/useTranslation';

interface SearchResultsProps {
  searchResults: SearchResult | null;
  isLoading: boolean;
  error: string | null;
  sortOptions: SortOptionsInput;
  onSortChange: (sort: SortOptionsInput) => void;
  onLoadMore: () => void;
  className?: string;
  viewMode?: 'grid' | 'list';
  onViewModeChange?: (mode: 'grid' | 'list') => void;
}

export function SearchResults({
  searchResults,
  isLoading,
  error,
  sortOptions,
  onSortChange,
  onLoadMore,
  className = '',
  viewMode = 'grid',
  onViewModeChange
}: SearchResultsProps) {
  const { t } = useTranslation();
  const loadMoreRef = useRef<HTMLDivElement>(null);
  const isLoadingMore = useRef(false);

  // Infinite scroll intersection observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (
          entry.isIntersecting && 
          searchResults?.hasNextPage && 
          !isLoading && 
          !isLoadingMore.current
        ) {
          isLoadingMore.current = true;
          onLoadMore();
          setTimeout(() => {
            isLoadingMore.current = false;
          }, 1000);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '100px'
      }
    );

    if (loadMoreRef.current) {
      observer.observe(loadMoreRef.current);
    }

    return () => {
      if (loadMoreRef.current) {
        observer.unobserve(loadMoreRef.current);
      }
    };
  }, [searchResults, isLoading, onLoadMore]);

  const handleSortFieldChange = useCallback((field: string) => {
    onSortChange({
      field: field as SortOptionsInput['field'],
      direction: sortOptions.direction
    });
  }, [sortOptions.direction, onSortChange]);

  const handleSortDirectionChange = useCallback(() => {
    onSortChange({
      field: sortOptions.field,
      direction: sortOptions.direction === 'ASC' ? 'DESC' : 'ASC'
    });
  }, [sortOptions, onSortChange]);

  const getSortFieldLabel = (field: string) => {
    switch (field) {
      case 'price': return t('advancedSearch.sortByPrice', 'Price');
      case 'year': return t('advancedSearch.sortByYear', 'Year');
      case 'mileage': return t('advancedSearch.sortByMileage', 'Mileage');
      case 'createdAt': return t('advancedSearch.sortByDate', 'Date Added');
      default: return field;
    }
  };

  // Error state
  if (error) {
    return (
      <Card className={`border-red-200 ${className}`}>
        <CardContent className="p-8 text-center">
          <AlertCircle className="h-12 w-12 text-red-500 mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {t('advancedSearch.searchError', 'Search Error')}
          </h3>
          <p className="text-muted-foreground mb-4">{error}</p>
          <Button 
            variant="outline" 
            onClick={() => window.location.reload()}
          >
            {t('common.tryAgain', 'Try Again')}
          </Button>
        </CardContent>
      </Card>
    );
  }

  // No results state
  if (!isLoading && searchResults && searchResults.totalCount === 0) {
    return (
      <Card className={className}>
        <CardContent className="p-8 text-center">
          <Search className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold text-foreground mb-2">
            {t('advancedSearch.noResults', 'No cars found')}
          </h3>
          <p className="text-muted-foreground mb-4">
            {t('advancedSearch.noResultsDescription', 'Try adjusting your search filters or expand your search criteria.')}
          </p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-muted-foreground max-w-md mx-auto">
            <div className="text-left">
              <h4 className="font-medium text-foreground mb-2">
                {t('advancedSearch.suggestions', 'Suggestions:')}
              </h4>
              <ul className="space-y-1">
                <li>• {t('advancedSearch.suggestion1', 'Remove some filters')}</li>
                <li>• {t('advancedSearch.suggestion2', 'Increase price range')}</li>
                <li>• {t('advancedSearch.suggestion3', 'Expand location radius')}</li>
              </ul>
            </div>
            <div className="text-left">
              <h4 className="font-medium text-foreground mb-2">
                {t('advancedSearch.popularSearches', 'Popular:')}
              </h4>
              <ul className="space-y-1">
                <li>• BMW, Audi, Mercedes</li>
                <li>• SUV, Electric cars</li>
                <li>• Under €30,000</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className={className}>
      {/* Results Header */}
      <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-6">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Car className="h-5 w-5 text-muted-foreground" />
            <span className="text-lg font-semibold text-foreground">
              {searchResults ? (
                <>
                  {searchResults.totalCount.toLocaleString()} {' '}
                  {searchResults.totalCount === 1 
                    ? t('advancedSearch.carFound', 'car found')
                    : t('advancedSearch.carsFound', 'cars found')
                  }
                </>
              ) : (
                t('advancedSearch.searching', 'Searching...')
              )}
            </span>
          </div>
          
          {searchResults && searchResults.totalPages > 1 && (
            <Badge variant="outline" className="text-xs">
              {t('advancedSearch.page', 'Page')} {searchResults.currentPage} / {searchResults.totalPages}
            </Badge>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          {onViewModeChange && (
            <div className="flex border rounded-lg">
              <Button
                variant={viewMode === 'grid' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('grid')}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === 'list' ? 'default' : 'ghost'}
                size="sm"
                onClick={() => onViewModeChange('list')}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          )}

          {/* Sort Controls */}
          <div className="flex items-center gap-2">
            <Select value={sortOptions.field} onValueChange={handleSortFieldChange}>
              <SelectTrigger className="w-[140px] h-9">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="createdAt">{getSortFieldLabel('createdAt')}</SelectItem>
                <SelectItem value="price">{getSortFieldLabel('price')}</SelectItem>
                <SelectItem value="year">{getSortFieldLabel('year')}</SelectItem>
                <SelectItem value="mileage">{getSortFieldLabel('mileage')}</SelectItem>
              </SelectContent>
            </Select>

            <Button
              variant="outline"
              size="sm"
              onClick={handleSortDirectionChange}
              className="px-3"
              title={sortOptions.direction === 'ASC' ? t('common.ascending') : t('common.descending')}
            >
              {sortOptions.direction === 'ASC' ? (
                <SortAsc className="h-4 w-4" />
              ) : (
                <SortDesc className="h-4 w-4" />
              )}
            </Button>
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading && !searchResults && (
        <div className={`grid gap-6 ${viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
        }`}>
          {[...Array(6)].map((_, index) => (
            <CarCardSkeleton key={index} />
          ))}
        </div>
      )}

      {/* Results Grid/List */}
      {searchResults && searchResults.cars.length > 0 && (
        <div className={`grid gap-6 ${viewMode === 'grid' 
          ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
          : 'grid-cols-1'
        }`}>
          {searchResults.cars.map((car) => (
            <CarCard 
              key={car.id} 
              car={car} 
              layout={viewMode}
            />
          ))}
        </div>
      )}

      {/* Load More Trigger */}
      <div ref={loadMoreRef} className="mt-8">
        {searchResults?.hasNextPage && (
          <div className="text-center">
            {isLoading ? (
              <div className="flex items-center justify-center gap-2 py-4">
                <Loader2 className="h-5 w-5 animate-spin" />
                <span className="text-muted-foreground">
                  {t('advancedSearch.loadingMore', 'Loading more cars...')}
                </span>
              </div>
            ) : (
              <Button
                variant="outline"
                onClick={onLoadMore}
                className="px-8"
              >
                {t('advancedSearch.loadMore', 'Load More Cars')}
              </Button>
            )}
          </div>
        )}
      </div>

      {/* End of Results */}
      {searchResults && !searchResults.hasNextPage && searchResults.cars.length > 0 && (
        <div className="text-center py-8">
          <p className="text-muted-foreground">
            {t('advancedSearch.endOfResults', 'You\'ve seen all available cars')}
          </p>
        </div>
      )}
    </div>
  );
}

export default SearchResults;