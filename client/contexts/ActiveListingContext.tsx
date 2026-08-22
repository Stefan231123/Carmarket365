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
  isMessengerOpen: boolean;
  setMessengerOpen: (open: boolean) => void;
}

const ActiveListingContext = createContext<ActiveListingContextValue>({
  activeListing: null,
  setActiveListing: () => {},
  isMessengerOpen: false,
  setMessengerOpen: () => {},
});

/**
 * Tracks the listing the user is currently viewing, so the floating messenger
 * can default to composing a message to that listing's seller. Also holds the
 * messenger panel's open/closed state, so "Message seller" buttons elsewhere
 * on the site can open the panel (letting the user edit before sending)
 * instead of sending a message directly.
 */
export function ActiveListingProvider({ children }: { children: ReactNode }) {
  const [activeListing, setActiveListing] = useState<ActiveListing | null>(null);
  const [isMessengerOpen, setMessengerOpen] = useState(false);
  return (
    <ActiveListingContext.Provider value={{ activeListing, setActiveListing, isMessengerOpen, setMessengerOpen }}>
      {children}
    </ActiveListingContext.Provider>
  );
}

export const useActiveListing = () => useContext(ActiveListingContext);
