import { createContext, useContext, useState, ReactNode } from "react";

export interface ActiveListing {
  carId: string;
  sellerId?: string;
  sellerName?: string;
  title: string;
}

interface ActiveListingContextValue {
  activeListing: ActiveListing | null;
  setActiveListing: (listing: ActiveListing | null) => void;
}

const ActiveListingContext = createContext<ActiveListingContextValue>({
  activeListing: null,
  setActiveListing: () => {},
});

/**
 * Tracks the listing the user is currently viewing, so the floating messenger
 * can default to composing a message to that listing's seller.
 */
export function ActiveListingProvider({ children }: { children: ReactNode }) {
  const [activeListing, setActiveListing] = useState<ActiveListing | null>(null);
  return (
    <ActiveListingContext.Provider value={{ activeListing, setActiveListing }}>
      {children}
    </ActiveListingContext.Provider>
  );
}

export const useActiveListing = () => useContext(ActiveListingContext);
