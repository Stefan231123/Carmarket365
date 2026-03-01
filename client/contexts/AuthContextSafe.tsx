import React, { createContext, useContext, useReducer, useEffect } from 'react';
import { apiClient } from '@shared/api-client';

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

const AUTH_USER_KEY = 'cm365_user';

function getCachedUser(): SafeUser | null {
  try {
    const cached = localStorage.getItem(AUTH_USER_KEY);
    if (cached) return JSON.parse(cached);
  } catch {}
  return null;
}

function setCachedUser(user: SafeUser | null) {
  try {
    if (user) {
      localStorage.setItem(AUTH_USER_KEY, JSON.stringify(user));
    } else {
      localStorage.removeItem(AUTH_USER_KEY);
    }
  } catch {}
}

const cachedUser = getCachedUser();

const initialState: AuthState = {
  user: cachedUser,
  isAuthenticated: !!cachedUser,
  isLoading: !cachedUser, // Only show loading if no cached user
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
  login: (credentials: { email: string; password: string }, captchaToken?: string) => Promise<void>;
  register: (userData: { email: string; password: string; name?: string; dealerName?: string; dealerAddress?: string; dealerCity?: string; dealerPhoneNumber?: string }, captchaToken?: string) => Promise<void>;
  loginWithOAuth: (input: { provider: 'google' | 'facebook'; token: string; email?: string; name?: string }) => Promise<void>;
  logout: () => Promise<void>;
  clearError: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

async function fetchCurrentUserWithRetry(maxRetries = 2): Promise<SafeUser | null> {
  for (let attempt = 0; attempt <= maxRetries; attempt++) {
    try {
      const user = await apiClient.getCurrentUser();
      if (user) return user as SafeUser;
      // Server returned null/no user — cookie invalid or not logged in
      return null;
    } catch {
      // Network or server error — retry after delay
      if (attempt < maxRetries) {
        await new Promise(r => setTimeout(r, 1000 * (attempt + 1)));
      }
    }
  }
  // All retries failed — return undefined to signal transient error
  return undefined as any;
}

export function SafeAuthProvider({ children }: { children: React.ReactNode }) {
  const [state, dispatch] = useReducer(authReducer, initialState);

  // Check for existing authentication on mount via httpOnly cookie
  useEffect(() => {
    const initAuth = async () => {
      const user = await fetchCurrentUserWithRetry();

      if (user) {
        // Server confirmed our identity
        setCachedUser(user);
        dispatch({ type: 'AUTH_SUCCESS', payload: user });
      } else if (user === null) {
        // Server explicitly said: no valid session (not a network error)
        setCachedUser(null);
        dispatch({ type: 'AUTH_FAILURE', payload: '' });
      } else {
        // All retries failed (transient error) — keep cached user if we have one
        const cached = getCachedUser();
        if (cached) {
          // Stay logged in with cached data; will re-validate on next navigation
          dispatch({ type: 'AUTH_SUCCESS', payload: cached });
        } else {
          dispatch({ type: 'AUTH_FAILURE', payload: '' });
        }
      }
    };

    initAuth();
  }, []);

  const login = async (credentials: { email: string; password: string }, captchaToken?: string) => {
    dispatch({ type: 'AUTH_START' });

    try {
      const result = await apiClient.login({
        email: credentials.email,
        password: credentials.password,
      }, captchaToken);

      const user: SafeUser = {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role,
        dealerName: result.user.dealerName,
        dealerLogoUrl: result.user.dealerLogoUrl,
        dealerAddress: result.user.dealerAddress,
        dealerCity: result.user.dealerCity,
        dealerPhoneNumber: result.user.dealerPhoneNumber,
      };

      // Cookie is set automatically by the backend response
      setCachedUser(user);
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const register = async (userData: { email: string; password: string; name?: string; dealerName?: string; dealerAddress?: string; dealerCity?: string; dealerPhoneNumber?: string }, captchaToken?: string) => {
    dispatch({ type: 'AUTH_START' });

    try {
      const result = await apiClient.register({
        email: userData.email,
        password: userData.password,
        name: userData.name,
      }, captchaToken);

      const user: SafeUser = {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role,
        dealerName: result.user.dealerName,
        dealerLogoUrl: result.user.dealerLogoUrl,
        dealerAddress: result.user.dealerAddress,
        dealerCity: result.user.dealerCity,
        dealerPhoneNumber: result.user.dealerPhoneNumber,
      };

      // Cookie is set automatically by the backend response
      setCachedUser(user);
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'Registration failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const loginWithOAuth = async (input: { provider: 'google' | 'facebook'; token: string; email?: string; name?: string }) => {
    dispatch({ type: 'AUTH_START' });

    try {
      const result = await apiClient.loginWithOAuth(input);

      const user: SafeUser = {
        id: result.user.id,
        email: result.user.email,
        name: result.user.name,
        role: result.user.role,
        dealerName: result.user.dealerName,
        dealerLogoUrl: result.user.dealerLogoUrl,
        dealerAddress: result.user.dealerAddress,
        dealerCity: result.user.dealerCity,
        dealerPhoneNumber: result.user.dealerPhoneNumber,
      };

      // Cookie is set automatically by the backend response
      setCachedUser(user);
      dispatch({ type: 'AUTH_SUCCESS', payload: user });
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : 'OAuth login failed';
      dispatch({ type: 'AUTH_FAILURE', payload: errorMessage });
      throw error;
    }
  };

  const logout = async () => {
    try {
      // Backend clears the httpOnly cookie
      await apiClient.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      setCachedUser(null);
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

export function useSafeAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useSafeAuth must be used within a SafeAuthProvider');
  }
  return context;
}
