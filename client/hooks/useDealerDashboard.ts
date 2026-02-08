// client/hooks/useDealerDashboard.ts
import { useState, useEffect, useCallback } from 'react';
import { apiClient } from '@shared/api-client';
import type {
  DealerStats,
  DealerPerformance,
  CarListing,
  CarInquiry,
  ExpressSaleListing,
} from '../lib/graphql/dealer-operations';

// Generic hook for fetching data with loading/error state
function useApiQuery<T>(fetcher: () => Promise<T>, deps: any[] = []) {
  const [data, setData] = useState<T | undefined>(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | undefined>(undefined);

  const refetch = useCallback(async () => {
    setLoading(true);
    setError(undefined);
    try {
      const result = await fetcher();
      setData(result);
    } catch (err) {
      setError(err instanceof Error ? err : new Error(String(err)));
    } finally {
      setLoading(false);
    }
  }, deps);

  useEffect(() => {
    refetch();
  }, [refetch]);

  return { data, loading, error, refetch };
}

// Hook for getting dealer's listings
export const useDealerListings = (_status?: string, _searchTerm?: string) => {
  return useApiQuery<{ getDealerListings: CarListing[] }>(async () => {
    const listings = await apiClient.getAllListings();
    const mapped: CarListing[] = (listings || []).map((l: any) => ({
      id: l.id,
      title: `${l.make || ''} ${l.model || ''}`.trim(),
      price: l.price || 0,
      status: l.isAvailable ? 'ACTIVE' : 'SOLD',
      imageUrls: l.images?.map((img: any) => typeof img === 'string' ? img : img.url) || [],
      year: l.year || 0,
      mileage: l.mileage || 0,
      createdAt: l.createdAt || new Date().toISOString(),
      updatedAt: l.updatedAt || new Date().toISOString(),
      carMake: { id: '', name: l.make || '' },
      carModel: { id: '', name: l.model || '' },
    }));
    return { getDealerListings: mapped };
  }, [_status, _searchTerm]);
};

// Hook for getting dealer dashboard stats
export const useDealerStats = () => {
  return useApiQuery<{ getDealerStats: DealerStats }>(async () => {
    const stats = await apiClient.getAdminStats();
    return {
      getDealerStats: {
        activeListings: stats.activeListings || 0,
        totalViews: stats.totalViews || 0,
        totalInquiries: stats.totalInquiries || 0,
        revenue: stats.totalRevenue || 0,
        newInquiriesThisWeek: 0,
        viewsThisMonth: stats.totalViews || 0,
        responseRate: 0,
      },
    };
  });
};

// Hook for getting dealer performance metrics
export const useDealerPerformance = () => {
  return useApiQuery<{ getDealerPerformance: DealerPerformance }>(async () => {
    return {
      getDealerPerformance: {
        salesThisMonth: 0,
        salesLastMonth: 0,
        averageTimeToSell: 0,
        conversionRate: 0,
        averageListingViews: 0,
        averageResponseTime: 0,
      },
    };
  });
};

// Hook for getting dealer inquiries — uses real getSellerInquiries query
export const useDealerInquiries = () => {
  return useApiQuery<{ getDealerInquiries: CarInquiry[] }>(async () => {
    const inquiries = await apiClient.getSellerInquiries();
    const mapped: CarInquiry[] = (inquiries || []).map((inq: any) => ({
      id: inq.id,
      type: inq.type || 'GENERAL',
      message: inq.message || '',
      customerName: inq.name || '',
      customerEmail: inq.email || '',
      customerPhone: inq.phone || '',
      status: inq.status === 'PENDING' ? 'NEW' : inq.status === 'REPLIED' ? 'RESPONDED' : 'CLOSED',
      dealerResponse: inq.sellerResponse,
      respondedAt: inq.repliedAt,
      createdAt: inq.createdAt || new Date().toISOString(),
      car: {
        id: inq.car?.id || '',
        title: `${inq.car?.make || ''} ${inq.car?.model || ''}`.trim(),
        carMake: { name: inq.car?.make || '' },
        carModel: { name: inq.car?.model || '' },
      },
      customer: inq.user ? {
        id: inq.user.id,
        name: inq.user.name,
        email: inq.user.email,
      } : undefined,
    }));
    return { getDealerInquiries: mapped };
  });
};

// Hook for express sale opportunities (no backend entity yet)
export const useExpressSaleOpportunities = () => {
  return useApiQuery<{ getExpressSaleOpportunities: ExpressSaleListing[] }>(async () => {
    return { getExpressSaleOpportunities: [] };
  });
};

// Custom hook that combines all dealer dashboard data
export const useDealerDashboardData = () => {
  const statsQuery = useDealerStats();
  const performanceQuery = useDealerPerformance();
  const inquiriesQuery = useDealerInquiries();

  const loading = statsQuery.loading || performanceQuery.loading;
  const error = statsQuery.error || performanceQuery.error;

  return {
    stats: statsQuery.data?.getDealerStats,
    performance: performanceQuery.data?.getDealerPerformance,
    recentInquiries: inquiriesQuery.data?.getDealerInquiries || ([] as CarInquiry[]),
    popularListings: [] as CarListing[],
    loading,
    error,
    refetchStats: statsQuery.refetch,
    refetchPerformance: performanceQuery.refetch,
    refetchRecentInquiries: inquiriesQuery.refetch,
    refetchPopularListings: async () => {},
  };
};
