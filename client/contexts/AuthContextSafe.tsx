import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { tokenManager } from '@/utils/secureTokenManager';

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

  // Check for existing authentication on mount
  useEffect(() => {
    const initAuth = async () => {
      dispatch({ type: 'AUTH_START' });
      
      try {
        // First, migrate any legacy tokens
        tokenManager.migrateLegacyTokens();
        
        // Try to get access token from secure storage
        const token = await tokenManager.getAccessToken();
        
        if (token) {
          // Token exists, try to get user data from localStorage (for mock data)
          const userData = localStorage.getItem('currentUser');
          if (userData) {
            const user = JSON.parse(userData);
            dispatch({ type: 'AUTH_SUCCESS', payload: user });
            return;
          }
        }
        
        // No valid session found
        dispatch({ type: 'AUTH_FAILURE', payload: 'No valid session' });
      } catch (error) {
        console.error('Auth initialization failed:', error);
        dispatch({ type: 'AUTH_FAILURE', payload: 'Authentication failed' });
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: { email: string; password: string; rememberMe?: boolean }) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      // TODO: Replace with actual API call when ready
      console.log('Login attempt:', credentials.email);
      
      // Define admin email addresses with unlimited access
      const adminEmails = [
        'kocevskistefan8@gmail.com',
        'ivanaasporova@gmail.com',
        'kocevskidarko@yahoo.com'
      ];
      
      // Check if the user is an admin
      const isAdmin = adminEmails.includes(credentials.email.toLowerCase());
      
      // Mock users for testing different roles
      const mockUsers: Record<string, SafeUser> = {
        // Admin users with unlimited access
        'kocevskistefan8@gmail.com': {
          id: 'admin1',
          email: 'kocevskistefan8@gmail.com',
          name: 'Stefan Kocevski',
          role: 'ADMIN',
          savedListingIds: []
        },
        'ivanaasporova@gmail.com': {
          id: 'admin2',
          email: 'ivanaasporova@gmail.com',
          name: 'Ivana Asporova',
          role: 'ADMIN',
          savedListingIds: []
        },
        'kocevskidarko@yahoo.com': {
          id: 'admin3',
          email: 'kocevskidarko@yahoo.com',
          name: 'Darko Kocevski',
          role: 'ADMIN',
          savedListingIds: []
        },
        // Test accounts for development
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
      
      // Use mock user if email matches
      let mockUser = mockUsers[credentials.email.toLowerCase()];
      
      // If no predefined user exists but it's an admin email, create admin user
      if (!mockUser && isAdmin) {
        mockUser = {
          id: 'admin_' + Date.now(),
          email: credentials.email,
          name: 'Admin User',
          role: 'ADMIN',
          savedListingIds: []
        };
      }
      
      // For non-admin emails, create default USER
      if (!mockUser) {
        mockUser = {
          id: '4',
          email: credentials.email,
          name: 'Test User',
          role: 'USER',
          savedListingIds: []
        };
      }
      
      // Generate a mock JWT token for persistence
      const mockToken = `mock_jwt_${Date.now()}_${mockUser.role}`;
      
      // Set expiry based on "Remember Me" option
      const expiresAt = credentials.rememberMe 
        ? Date.now() + (30 * 24 * 60 * 60 * 1000) // 30 days if remembered
        : Date.now() + (24 * 60 * 60 * 1000); // 1 day if not remembered
      
      // Store tokens securely for persistent login
      await tokenManager.setTokens({
        access_token: mockToken,
        refresh_token: `refresh_${mockToken}`,
        expires_at: expiresAt
      });
      
      // Store user data in localStorage for quick access
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      localStorage.setItem('authToken', mockToken); // Keep for backward compatibility
      
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
      
      // Generate a mock JWT token for persistence (default 7 days for new registrations)
      const mockToken = `mock_jwt_${Date.now()}_${mockUser.role}`;
      const expiresAt = Date.now() + (7 * 24 * 60 * 60 * 1000); // 7 days
      
      // Store tokens securely for persistent login
      await tokenManager.setTokens({
        access_token: mockToken,
        refresh_token: `refresh_${mockToken}`,
        expires_at: expiresAt
      });
      
      // Store user data in localStorage for quick access
      localStorage.setItem('currentUser', JSON.stringify(mockUser));
      localStorage.setItem('authToken', mockToken); // Keep for backward compatibility
      
      dispatch({ type: 'AUTH_SUCCESS', payload: mockUser });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Clear tokens from secure storage
      await tokenManager.clearTokens();
      
      // Clear all local storage data
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      
      dispatch({ type: 'AUTH_LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local state
      localStorage.removeItem('authToken');
      localStorage.removeItem('currentUser');
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  // Auto-refresh token every 23 hours to keep session alive
  useEffect(() => {
    if (!state.isAuthenticated) return;

    const refreshInterval = setInterval(async () => {
      try {
        const refreshedToken = await tokenManager.refreshToken();
        if (!refreshedToken) {
          // If refresh fails, logout user
          logout();
        }
      } catch (error) {
        console.error('Token refresh failed:', error);
        logout();
      }
    }, 23 * 60 * 60 * 1000); // 23 hours

    return () => clearInterval(refreshInterval);
  }, [state.isAuthenticated]);

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