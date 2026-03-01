import { useQuery } from '@apollo/client/react';
import {
  GET_CARS,
  GET_CAR_BY_ID,
  GET_CAR_MAKES,
  GET_CAR_MODELS,
  Car,
} from '@/lib/graphql/operations';
import { useCountry } from '@/contexts/CountryContext';

interface UseCarsState {
  cars: Car[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCars(filters?: Record<string, any>): UseCarsState {
  const { country } = useCountry();

  // Add country filter based on country context
  const enhancedFilters = {
    ...filters,
    ...(country && country.code !== 'global' ? { countryCode: country.code } : {})
  };

  const { data, loading, error, refetch } = useQuery<{ getCars: Car[] }>(GET_CARS, {
    variables: { filters: enhancedFilters },
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network'
  });

  const cars = data?.getCars || [];

  return {
    cars,
    isLoading: loading,
    error: error?.message || null,
    refetch: async () => {
      await refetch();
    },
  };
}

interface UseCarState {
  car: Car | null;
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCar(id: string): UseCarState {
  const { data, loading, error, refetch } = useQuery<{ getCarById: Car }>(GET_CAR_BY_ID, {
    variables: { id },
    skip: !id,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network'
  });

  const car = data?.getCarById || null;
  const processedError = error?.message || null;

  return {
    car,
    isLoading: loading,
    error: processedError,
    refetch: async () => {
      await refetch();
    },
  };
}

interface UseCarMakesState {
  makes: string[];
  isLoading: boolean;
  error: string | null;
}

export function useCarMakes(): UseCarMakesState {
  const { data, loading, error } = useQuery<{ getCarMakes: string[] }>(GET_CAR_MAKES, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  return {
    makes: data?.getCarMakes || [],
    isLoading: loading,
    error: error?.message || null
  };
}

interface UseCarModelsState {
  models: string[];
  isLoading: boolean;
  error: string | null;
}

export function useCarModels(make: string): UseCarModelsState {
  const { data, loading, error } = useQuery<{ getCarModels: string[] }>(GET_CAR_MODELS, {
    variables: { make },
    skip: !make,
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  return {
    models: data?.getCarModels || [],
    isLoading: loading,
    error: error?.message || null
  };
}
