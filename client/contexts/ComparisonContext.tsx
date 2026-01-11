import React, { createContext, useContext, useState, ReactNode } from 'react';

interface CarForComparison {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  mileage: number;
  fuelType: string;
  transmission: string;
  bodyType?: string;
  exteriorColor?: string;
  interiorColor?: string;
  drivetrain?: string;
  images?: string[];
  location: string;
  dealer?: string;
  condition?: string;
}

interface ComparisonContextType {
  comparisonCars: CarForComparison[];
  isComparisonOpen: boolean;
  addToComparison: (car: CarForComparison) => boolean;
  removeFromComparison: (carId: string) => void;
  clearComparison: () => void;
  openComparison: () => void;
  closeComparison: () => void;
  isInComparison: (carId: string) => boolean;
  canAddMore: boolean;
}

const ComparisonContext = createContext<ComparisonContextType | undefined>(undefined);

export function ComparisonProvider({ children }: { children: ReactNode }) {
  const [comparisonCars, setComparisonCars] = useState<CarForComparison[]>([]);
  const [isComparisonOpen, setIsComparisonOpen] = useState(false);
  
  const MAX_COMPARISON_CARS = 3;

  const addToComparison = (car: CarForComparison): boolean => {
    if (comparisonCars.length >= MAX_COMPARISON_CARS) {
      return false; // Cannot add more cars
    }
    
    if (comparisonCars.some(c => c.id === car.id)) {
      return false; // Car already in comparison
    }

    setComparisonCars(prev => [...prev, car]);
    return true;
  };

  const removeFromComparison = (carId: string) => {
    setComparisonCars(prev => prev.filter(car => car.id !== carId));
  };

  const clearComparison = () => {
    setComparisonCars([]);
    setIsComparisonOpen(false);
  };

  const openComparison = () => {
    if (comparisonCars.length > 0) {
      setIsComparisonOpen(true);
    }
  };

  const closeComparison = () => {
    setIsComparisonOpen(false);
  };

  const isInComparison = (carId: string): boolean => {
    return comparisonCars.some(car => car.id === carId);
  };

  const canAddMore = comparisonCars.length < MAX_COMPARISON_CARS;

  return (
    <ComparisonContext.Provider value={{
      comparisonCars,
      isComparisonOpen,
      addToComparison,
      removeFromComparison,
      clearComparison,
      openComparison,
      closeComparison,
      isInComparison,
      canAddMore
    }}>
      {children}
    </ComparisonContext.Provider>
  );
}

export function useComparison() {
  const context = useContext(ComparisonContext);
  if (context === undefined) {
    throw new Error('useComparison must be used within a ComparisonProvider');
  }
  return context;
}