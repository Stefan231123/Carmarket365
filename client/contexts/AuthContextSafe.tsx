import React, { createContext, useContext, useReducer, useEffect } from 'react';

// Safe types that don't rely on shared API client
interface SafeUser {
  id: string;
  email: string;
  name?: string;
  role: 'USER' | 'DEALER' | 'ADMIN';
  dealerName?: string;
  dealerLogoUrl?: string;
  dealerAddress?: string;
  dealerCity?: string;
  dealerPhoneNumber?: string;
  savedListingIds: string[];
}

interface AuthState {
  user: SafeUser | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: SafeUser }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: false, // Changed to false to prevent startup API calls
  error: null,
};

function authReducer(state: AuthState, action: AuthAction): AuthState {
  switch (action.type) {
    case 'AUTH_START':
      return { ...state, isLoading: true, error: null };
    case 'AUTH_SUCCESS':
      return {
        ...state,
        user: action.payload,
        isAuthenticated: true,
        isLoading: false,
        error: null,
      };
    case 'AUTH_FAILURE':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: action.payload,
      };
    case 'AUTH_LOGOUT':
      return {
        ...state,
        user: null,
        isAuthenticated: false,
        isLoading: false,
        error: null,
      };
    case 'CLEAR_ERROR':
      return { ...state, error: null };
    default:
      return state;
  }
}

interface AuthContextType extends AuthState {
  login: (credentials: { email: string; password: string }) => Promise<void>;
  register: (userData: { email: string; password: string; name?: string; role?: 'USER' | 'DEALER' }) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function SafeAuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Removed automatic auth check on mount that was causing issues
  // Check for existing token but don't make API calls immediately
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      // Just log that we found a token, don't validate it immediately
      console.log('Found existing auth token, ready for API calls');
    }
  }, []);

  const login = async (credentials: { email: string; password: string }) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // TODO: Replace with actual API call when ready
      console.log('Login attempt:', credentials.email);
      
      // Mock users for testing different roles
      const mockUsers: Record<string, SafeUser> = {
        'admin@test.com': {
          id: '1',
          email: 'admin@test.com',
          name: 'Admin User',
          role: 'ADMIN',
          savedListingIds: []
        },
        'dealer@test.com': {
          id: '2', 
          email: 'dealer@test.com',
          name: 'Dealer User',
          role: 'DEALER',
          dealerName: 'Premium Motors',
          dealerCity: 'Berlin',
          dealerPhoneNumber: '+49 30 12345678',
          savedListingIds: []
        },
        'user@test.com': {
          id: '3',
          email: 'user@test.com', 
          name: 'Regular User',
          role: 'USER',
          savedListingIds: []
        }
      };
      
      // Use mock user if email matches, otherwise create a default USER
      const mockUser = mockUsers[credentials.email] || {
        id: '4',
        email: credentials.email,
        name: 'Test User',
        role: 'USER',
        savedListingIds: []
      };
      
      dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const register = async (userData: { email: string; password: string; name?: string; role?: 'USER' | 'DEALER' }) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // TODO: Replace with actual API call when ready
      console.log('Register attempt:', userData.email);
      
      // Simulate successful registration for testing
      const mockUser: SafeUser = {
        id: '2',
        email: userData.email,
        name: userData.name || 'New User',
        role: userData.role || 'USER',
        savedListingIds: []
      };
      
      dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Clear token from localStorage
      localStorage.removeItem('authToken');
      dispatch({ type: 'AUTH_LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local state
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useSafeAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSafeAuth must be used within a SafeAuthProvider');
  }
  return context;
}