import { createContext, useContext, useEffect, useState } from "react";
import { toast } from "sonner";
import { apiClient } from '@shared/api-client';

// One-shot per session: after showing the "sign in to keep favorites" nudge
// once, don't nag the user again on subsequent hearts.
const NUDGE_KEY = "cm365_fav_signin_nudge_shown";

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

    // Try to sync with backend (only succeeds for logged-in users).
    // A successful response is authoritative — including an empty list, which
    // means every previously-saved car has been deleted/hidden/sold. Overwrite
    // localStorage in that case too, otherwise stale entries pointing at gone
    // listings keep rendering as broken cards.
    apiClient.getUserSavedCars().then((savedCars) => {
      const list = Array.isArray(savedCars) ? savedCars : [];
      const backendFavorites: FavoriteCar[] = list.map((sc: any) => ({
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
    }).catch((err) => {
      // Not logged in or network error — localStorage data is used as fallback
      if (err?.message && !err.message.includes('401') && !err.message.includes('Unauthorized')) {
        console.warn('Favorites backend sync failed:', err.message);
      }
    });
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

    // Sync with backend — silent for 401 (not logged in), log real errors
    apiClient.saveCar(car.id).catch((err) => {
      const isUnauth = err?.message?.includes('401') || err?.message?.includes('Unauthorized');
      if (isUnauth) {
        // Anonymous save — favorites live in localStorage. Nudge them to sign
        // in once per session so they know these won't follow them to
        // another device / a cleared browser.
        try {
          if (!sessionStorage.getItem(NUDGE_KEY)) {
            sessionStorage.setItem(NUDGE_KEY, "1");
            toast("Зачувано локално", {
              description: "Најави се за да ги задржиш омилените на сите уреди.",
              action: {
                label: "Најави се",
                onClick: () => { window.location.href = "/signin"; },
              },
              duration: 6000,
            });
          }
        } catch { /* private-mode / disabled storage — fail quietly */ }
      } else if (err?.message) {
        console.warn('Failed to sync saved car to backend:', err.message);
      }
    });
  };

  const removeFromFavorites = (carId: string) => {
    setFavorites(prev => prev.filter(fav => fav.id !== carId));

    // Sync with backend — silent for 401 (not logged in), log real errors
    apiClient.unsaveCar(carId).catch((err) => {
      if (err?.message && !err.message.includes('401') && !err.message.includes('Unauthorized')) {
        console.warn('Failed to sync removed car from backend:', err.message);
      }
    });
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
