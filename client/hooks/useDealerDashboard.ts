// client/hooks/useDealerDashboard.ts
import { useQuery, useMutation } from '@apollo/client';
import {
  GET_DEALER_LISTINGS,
  GET_DEALER_STATS,
  GET_DEALER_PERFORMANCE,
  GET_DEALER_INQUIRIES,
  GET_RECENT_DEALER_INQUIRIES,
  GET_DEALER_POPULAR_LISTINGS,
  GET_EXPRESS_SALE_OPPORTUNITIES,
  UPDATE_INQUIRY_STATUS,
  DealerStats,
  DealerPerformance,
  CarListing,
  CarInquiry,
  ExpressSaleListing,
} from '../lib/graphql/dealer-operations';

// Hook for getting dealer's listings
export const useDealerListings = (status?: string, searchTerm?: string) => {
  return useQuery<{ getDealerListings: CarListing[] }>(GET_DEALER_LISTINGS, {
    variables: { status, searchTerm },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });
};

// Hook for getting dealer dashboard stats
export const useDealerStats = () => {
  return useQuery<{ getDealerStats: DealerStats }>(GET_DEALER_STATS, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });
};

// Hook for getting dealer performance metrics
export const useDealerPerformance = () => {
  return useQuery<{ getDealerPerformance: DealerPerformance }>(GET_DEALER_PERFORMANCE, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });
};

// Hook for getting dealer inquiries
export const useDealerInquiries = () => {
  return useQuery<{ getDealerInquiries: CarInquiry[] }>(GET_DEALER_INQUIRIES, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });
};

// Hook for getting recent inquiries (for overview)
export const useRecentDealerInquiries = (limit: number = 5) => {
  return useQuery<{ getRecentDealerInquiries: CarInquiry[] }>(GET_RECENT_DEALER_INQUIRIES, {
    variables: { limit },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });
};

// Hook for getting popular listings
export const useDealerPopularListings = (limit: number = 3) => {
  return useQuery<{ getDealerPopularListings: CarListing[] }>(GET_DEALER_POPULAR_LISTINGS, {
    variables: { limit },
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });
};

// Hook for getting express sale opportunities
export const useExpressSaleOpportunities = () => {
  return useQuery<{ getExpressSaleOpportunities: ExpressSaleListing[] }>(GET_EXPRESS_SALE_OPPORTUNITIES, {
    fetchPolicy: 'cache-and-network',
    errorPolicy: 'all',
  });
};

// Hook for updating inquiry status
export const useUpdateInquiryStatus = () => {
  return useMutation(UPDATE_INQUIRY_STATUS, {
    refetchQueries: [
      { query: GET_DEALER_INQUIRIES },
      { query: GET_RECENT_DEALER_INQUIRIES, variables: { limit: 5 } },
      { query: GET_DEALER_STATS },
    ],
  });
};

// Custom hook that combines all dealer dashboard data
export const useDealerDashboardData = () => {
  const statsQuery = useDealerStats();
  const performanceQuery = useDealerPerformance();
  const recentInquiriesQuery = useRecentDealerInquiries(5);
  const popularListingsQuery = useDealerPopularListings(3);

  const loading = statsQuery.loading || performanceQuery.loading || recentInquiriesQuery.loading || popularListingsQuery.loading;
  const error = statsQuery.error || performanceQuery.error || recentInquiriesQuery.error || popularListingsQuery.error;

  return {
    stats: statsQuery.data?.getDealerStats,
    performance: performanceQuery.data?.getDealerPerformance,
    recentInquiries: recentInquiriesQuery.data?.getRecentDealerInquiries || [],
    popularListings: popularListingsQuery.data?.getDealerPopularListings || [],
    loading,
    error,
    refetchStats: statsQuery.refetch,
    refetchPerformance: performanceQuery.refetch,
    refetchRecentInquiries: recentInquiriesQuery.refetch,
    refetchPopularListings: popularListingsQuery.refetch,
  };
};