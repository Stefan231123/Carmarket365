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

// Hook for getting dealer dashboard stats — enriched with inquiry data
export const useDealerStats = () => {
  return useApiQuery<{ getDealerStats: DealerStats }>(async () => {
    const [stats, inquiries] = await Promise.all([
      apiClient.getAdminStats(),
      apiClient.getSellerInquiries(),
    ]);

    const now = new Date();
    const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    const allInquiries = inquiries || [];
    const newInquiriesThisWeek = allInquiries.filter(
      (inq: any) => new Date(inq.createdAt) >= oneWeekAgo
    ).length;

    const repliedCount = allInquiries.filter((inq: any) => inq.status === 'REPLIED').length;
    const responseRate = allInquiries.length > 0
      ? Math.round((repliedCount / allInquiries.length) * 100)
      : 0;

    return {
      getDealerStats: {
        activeListings: stats.activeListings || 0,
        totalViews: stats.totalViews || 0,
        totalInquiries: stats.totalInquiries || allInquiries.length,
        revenue: stats.totalRevenue || 0,
        newInquiriesThisWeek,
        viewsThisMonth: stats.totalViews || 0,
        responseRate,
      },
    };
  });
};

// Hook for getting dealer performance metrics — derived from real listings + inquiries
export const useDealerPerformance = () => {
  return useApiQuery<{ getDealerPerformance: DealerPerformance }>(async () => {
    const [listings, inquiries] = await Promise.all([
      apiClient.getAllListings(),
      apiClient.getSellerInquiries(),
    ]);

    const now = new Date();
    const thisMonthStart = new Date(now.getFullYear(), now.getMonth(), 1);
    const lastMonthStart = new Date(now.getFullYear(), now.getMonth() - 1, 1);

    // Count sold listings (isAvailable === false) by month
    const soldListings = (listings || []).filter((l: any) => !l.isAvailable);
    const salesThisMonth = soldListings.filter(
      (l: any) => new Date(l.updatedAt) >= thisMonthStart
    ).length;
    const salesLastMonth = soldListings.filter(
      (l: any) => new Date(l.updatedAt) >= lastMonthStart && new Date(l.updatedAt) < thisMonthStart
    ).length;

    // Average days from creation to sold (updatedAt - createdAt for sold items)
    const sellTimes = soldListings
      .map((l: any) => (new Date(l.updatedAt).getTime() - new Date(l.createdAt).getTime()) / (1000 * 60 * 60 * 24))
      .filter((d: number) => d > 0);
    const averageTimeToSell = sellTimes.length > 0
      ? Math.round(sellTimes.reduce((a: number, b: number) => a + b, 0) / sellTimes.length)
      : 0;

    // Conversion rate: sold / total listings
    const totalListings = (listings || []).length;
    const conversionRate = totalListings > 0
      ? Math.round((soldListings.length / totalListings) * 100)
      : 0;

    // Average response time from inquiries that were replied to (in hours)
    const repliedInquiries = (inquiries || [])
      .filter((inq: any) => inq.repliedAt && inq.createdAt)
      .map((inq: any) => (new Date(inq.repliedAt).getTime() - new Date(inq.createdAt).getTime()) / (1000 * 60 * 60));
    const averageResponseTime = repliedInquiries.length > 0
      ? Math.round(repliedInquiries.reduce((a: number, b: number) => a + b, 0) / repliedInquiries.length)
      : 0;

    return {
      getDealerPerformance: {
        salesThisMonth,
        salesLastMonth,
        averageTimeToSell,
        conversionRate,
        averageListingViews: 0, // No per-listing view tracking yet
        averageResponseTime,
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
  const listingsQuery = useDealerListings();

  const loading = statsQuery.loading || performanceQuery.loading;
  const error = statsQuery.error || performanceQuery.error;

  // Show most recent active listings as "popular"
  const popularListings = (listingsQuery.data?.getDealerListings || [])
    .filter((l) => l.status === 'ACTIVE')
    .slice(0, 5);

  return {
    stats: statsQuery.data?.getDealerStats,
    performance: performanceQuery.data?.getDealerPerformance,
    recentInquiries: inquiriesQuery.data?.getDealerInquiries || ([] as CarInquiry[]),
    popularListings,
    loading,
    error,
    refetchStats: statsQuery.refetch,
    refetchPerformance: performanceQuery.refetch,
    refetchRecentInquiries: inquiriesQuery.refetch,
    refetchPopularListings: listingsQuery.refetch,
  };
};
