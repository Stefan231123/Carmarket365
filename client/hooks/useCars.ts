import { useState, useEffect } from 'react';
import { useQuery } from '@apollo/client/react';
import { 
  GET_CARS, 
  GET_CAR_BY_ID, 
  GET_CAR_MAKES, 
  GET_CAR_MODELS,
  Car,
  CarMake,
  CarModel,
  FilterCarsInput
} from '@/lib/graphql/operations';
import { useCountry } from '@/contexts/CountryContext';

// Use the backend-compatible filter interface
type CarFilterInput = FilterCarsInput;

interface UseCarsState {
  cars: Car[];
  isLoading: boolean;
  error: string | null;
  refetch: () => Promise<void>;
}

export function useCars(filters?: CarFilterInput): UseCarsState {
  const { country } = useCountry();
  
  // Add location filter based on country context
  const enhancedFilters = {
    ...filters,
    ...(country && country.code !== 'global' ? { location: country.name } : {})
  };
  
  const { data, loading, error, refetch } = useQuery(GET_CARS, {
    variables: { filters: enhancedFilters },
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network'
  });

  const cars = data?.cars || [];

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
  const { country } = useCountry();
  
  const { data, loading, error, refetch } = useQuery(GET_CAR_BY_ID, {
    variables: { id },
    skip: !id,
    errorPolicy: 'all',
    notifyOnNetworkStatusChange: true,
    fetchPolicy: 'cache-and-network'
  });

  const car = data?.car || null;
  let processedError = error?.message || null;
  
  // Check if the car belongs to the current country (unless global)
  if (car && country && country.code !== 'global') {
    if (car.location && !car.location.toLowerCase().includes(country.name.toLowerCase())) {
      console.warn(`🚫 Car ${id} is not available in ${country.code} (location: ${car.location})`);
      processedError = 'This car listing is not available in your region';
    }
  }

  return {
    car: processedError === 'This car listing is not available in your region' ? null : car,
    isLoading: loading,
    error: processedError,
    refetch: async () => {
      await refetch();
    },
  };
}

interface UseCarMakesState {
  makes: CarMake[];
  isLoading: boolean;
  error: string | null;
}

export function useCarMakes(): UseCarMakesState {
  const { data, loading, error } = useQuery(GET_CAR_MAKES, {
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  return { 
    makes: data?.carMakes || [], 
    isLoading: loading, 
    error: error?.message || null 
  };
}

interface UseCarModelsState {
  models: CarModel[];
  isLoading: boolean;
  error: string | null;
}

export function useCarModels(carMakeId: string): UseCarModelsState {
  const { data, loading, error } = useQuery(GET_CAR_MODELS, {
    variables: { carMakeId },
    skip: !carMakeId,
    errorPolicy: 'all',
    fetchPolicy: 'cache-first'
  });

  return { 
    models: data?.carModelsByMake || [], 
    isLoading: loading, 
    error: error?.message || null 
  };
}