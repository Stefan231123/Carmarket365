import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { apiClient, User, LoginInput, RegisterInput, OAuthLoginInput } from '@shared/api-client';

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

type AuthAction =
  | { type: 'AUTH_START' }
  | { type: 'AUTH_SUCCESS'; payload: User }
  | { type: 'AUTH_FAILURE'; payload: string }
  | { type: 'AUTH_LOGOUT' }
  | { type: 'CLEAR_ERROR' };

const initialState: AuthState = {
  user: null,
  isAuthenticated: false,
  isLoading: true,
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
  login: (credentials: LoginInput) => Promise<void>;
  register: (userData: RegisterInput) => Promise<void>;
  loginWithOAuth: (oauthData: OAuthLoginInput) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing authentication on mount (fixed to not crash on startup)
  useEffect(() => {
    const checkAuth = async () => {
      try {
        const token = localStorage.getItem('authToken');
        if (!token) {
          // No token, just set as not authenticated without making API calls
          dispatch({ type: 'AUTH_FAILURE', payload: 'No token found' });
          return;
        }

        // Only make API call if we have a token
        dispatch({ type: 'AUTH_START' });
        const user = await apiClient.getCurrentUser();
        if (user) {
          dispatch({ type: 'AUTH_SUCCESS', payload: user });
        } else {
          dispatch({ type: 'AUTH_FAILURE', payload: 'Not authenticated' });
        }
      } catch (error) {
        console.warn('Auth check failed, proceeding without authentication:', error);
        dispatch({ type: 'AUTH_FAILURE', payload: 'Authentication check failed' });
      }
    };

    // Delay auth check to prevent blocking app startup
    setTimeout(checkAuth, 100);
  }, []);

  const login = async (credentials: LoginInput) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const { user } = await apiClient.login(credentials);
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const register = async (userData: RegisterInput) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const { user } = await apiClient.register(userData);
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const logout = async () => {
    try {
      await apiClient.logout();
      dispatch({ type: 'AUTH_LOGOUT' });
    } catch (error) {
      console.error('Logout error:', error);
      // Even if logout fails, clear local state
      dispatch({ type: 'AUTH_LOGOUT' });
    }
  };

  const loginWithOAuth = async (oauthData: OAuthLoginInput) => {
    dispatch({ type: 'AUTH_START' });
    
    try {
      const { user } = await apiClient.loginWithOAuth(oauthData);
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'OAuth login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const clearError = () => {
    dispatch({ type: 'CLEAR_ERROR' });
  };

  const contextValue: AuthContextType = {
    ...state,
    login,
    register,
    loginWithOAuth,
    logout,
    clearError,
  };

  return (
    <AuthContext.Provider value={contextValue}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}

// Additional hooks for specific use cases
export function useRequireAuth() {
  const auth = useAuth();
  
  useEffect(() => {
    if (!auth.isLoading && !auth.isAuthenticated) {
      // Redirect to login or show error
      window.location.href = '/signin';
    }
  }, [auth.isLoading, auth.isAuthenticated]);
  
  return auth;
}

export function useRequireRole(requiredRole: 'DEALER' | 'ADMIN') {
  const auth = useAuth();
  
  const hasRequiredRole = auth.user?.role === requiredRole || auth.user?.role === 'ADMIN';
  
  useEffect(() => {
    if (!auth.isLoading && auth.isAuthenticated && !hasRequiredRole) {
      // Redirect or show unauthorized
      window.location.href = '/';
    }
  }, [auth.isLoading, auth.isAuthenticated, hasRequiredRole]);
  
  return { ...auth, hasRequiredRole };
}