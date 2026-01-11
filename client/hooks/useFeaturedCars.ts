import { useQuery } from '@apollo/client/react';
import { GET_FEATURED_CARS, Car } from '@/lib/graphql/operations';
import { useCountry } from '@/contexts/CountryContext';

interface UseFeaturedCarsState {
  cars: Car[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useFeaturedCars(): UseFeaturedCarsState {
  const { country } = useCountry();
  
  const { data, loading, error, refetch } = useQuery(GET_FEATURED_CARS, {
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network'
  });

  // Filter cars based on country
  const filteredCars = data?.findCarsForYou?.filter((car: Car) => {
    // Country filtering
    if (country && country.code !== 'global') {
      if (car.location && !car.location.toLowerCase().includes(country.name.toLowerCase())) {
        return false;
      }
    }
    return true;
  }) || [];

  return {
    cars: filteredCars,
    isLoading: loading,
    error: error?.message || null,
    refetch: async () => {
      await refetch();
    },
  };
}