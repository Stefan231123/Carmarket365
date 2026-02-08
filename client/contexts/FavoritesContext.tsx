import { createContext, useContext, useEffect, useState } from "react";
import { apiClient } from '@shared/api-client';

interface FavoriteCar {
  id: string;
  make: string;
  model: string;
  year: number;
  price: number;
  image?: string;
  images?: string[];
  dateAdded: string;
}

interface FavoritesContextType {
  favorites: FavoriteCar[];
  isFavorite: (carId: string) => boolean;
  addToFavorites: (car: Omit<FavoriteCar, 'dateAdded'>) => void;
  removeFromFavorites: (carId: string) => void;
  toggleFavorite: (car: Omit<FavoriteCar, 'dateAdded'>) => void;
  clearFavorites: () => void;
}

const FavoritesContext = createContext<FavoritesContextType | undefined>(undefined);

const FAVORITES_STORAGE_KEY = "car_market_favorites";

interface FavoritesProviderProps {
  children: React.ReactNode;
}

export function FavoritesProvider({ children }: FavoritesProviderProps) {
  const [favorites, setFavorites] = useState<FavoriteCar[]>([]);
  const [isLoaded, setIsLoaded] = useState(false);

  // Load favorites from localStorage on mount, then try to sync with backend
  useEffect(() => {
    try {
      const stored = localStorage.getItem(FAVORITES_STORAGE_KEY);
      if (stored) {
        const parsedFavorites = JSON.parse(stored);
        setFavorites(parsedFavorites);
      }
    } catch (error) {
      console.error("Failed to load favorites from localStorage:", error);
    } finally {
      setIsLoaded(true);
    }

    // Try to load from backend if user is authenticated
    if (apiClient.isAuthenticated()) {
      apiClient.getUserSavedCars().then((savedCars) => {
        if (savedCars && savedCars.length > 0) {
          const backendFavorites: FavoriteCar[] = savedCars.map((sc: any) => ({
            id: sc.car?.id || sc.id,
            make: sc.car?.make || '',
            model: sc.car?.model || '',
            year: sc.car?.year || 0,
            price: sc.car?.price || 0,
            image: sc.car?.images?.[0]?.url || sc.car?.images?.[0]?.thumbnailUrl || '',
            images: sc.car?.images?.map((img: any) => img.url) || [],
            dateAdded: sc.createdAt || new Date().toISOString(),
          }));
          setFavorites(backendFavorites);
          localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(backendFavorites));
        }
      }).catch(() => {
        // Silently fall back to localStorage data
      });
    }
  }, []);

  // Save favorites to localStorage whenever favorites change
  useEffect(() => {
    if (isLoaded) {
      try {
        localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(favorites));
      } catch (error) {
        console.error("Failed to save favorites to localStorage:", error);
      }
    }
  }, [favorites, isLoaded]);

  const isFavorite = (carId: string): boolean => {
    return favorites.some(fav => fav.id === carId);
  };

  const addToFavorites = (car: Omit<FavoriteCar, 'dateAdded'>) => {
    setFavorites(prev => {
      if (prev.some(fav => fav.id === car.id)) {
        return prev;
      }
      const newFavorite: FavoriteCar = {
        ...car,
        dateAdded: new Date().toISOString(),
      };
      return [newFavorite, ...prev];
    });

    // Sync with backend if authenticated
    if (apiClient.isAuthenticated()) {
      apiClient.saveCar(car.id).catch(() => {
        // Silently fail — localStorage is the source of truth
      });
    }
  };

  const removeFromFavorites = (carId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== carId));

    // Sync with backend if authenticated
    if (apiClient.isAuthenticated()) {
      apiClient.unsaveCar(carId).catch(() => {
        // Silently fail
      });
    }
  };

  const toggleFavorite = (car: Omit<FavoriteCar, 'dateAdded'>) => {
    if (isFavorite(car.id)) {
      removeFromFavorites(car.id);
    } else {
      addToFavorites(car);
    }
  };

  const clearFavorites = () => {
    setFavorites([]);
  };

  const value: FavoritesContextType = {
    favorites,
    isFavorite,
    addToFavorites,
    removeFromFavorites,
    toggleFavorite,
    clearFavorites,
  };

  return (
    <FavoritesContext.Provider value={value}>
      {children}
    </FavoritesContext.Provider>
  );
}

export function useFavorites() {
  const context = useContext(FavoritesContext);
  if (context === undefined) {
    throw new Error("useFavorites must be used within a FavoritesProvider");
  }
  return context;
}
