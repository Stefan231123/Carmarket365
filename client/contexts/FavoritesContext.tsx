import { createContext, useContext, useEffect, useState } from "react";

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

  // Load favorites from localStorage on component mount
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
      // Check if car is already in favorites
      if (prev.some(fav => fav.id === car.id)) {
        return prev;
      }
      
      const newFavorite: FavoriteCar = {
        ...car,
        dateAdded: new Date().toISOString(),
      };
      
      return [newFavorite, ...prev]; // Add to beginning of list
    });
  };

  const removeFromFavorites = (carId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== carId));
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