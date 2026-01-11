import { useState } from 'react';
import { useMutation, useQuery } from '@apollo/client/react';
import { 
  LOGIN_MUTATION, 
  REGISTER_MUTATION, 
  GET_CURRENT_USER,
  LoginParams,
  RegisterParams,
  AuthResponse,
  User
} from '@/lib/graphql/operations';

interface UseAuthReturn {
  // State
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
  
  // Actions
  login: (params: LoginParams) => Promise<void>;
  register: (params: RegisterParams) => Promise<void>;
  logout: () => void;
  clearError: () => void;
}

export function useAuth(): UseAuthReturn {
  const [error, setError] = useState<string | null>(null);
  
  // Get current user
  const { data: currentUserData, loading: userLoading, refetch: refetchUser } = useQuery(GET_CURRENT_USER, {
    errorPolicy: 'ignore', // Don't show errors for unauthenticated users
    skip: !localStorage.getItem('authToken'),
    fetchPolicy: 'cache-and-network'
  });
  
  // Login mutation
  const [loginMutation, { loading: loginLoading }] = useMutation(LOGIN_MUTATION, {
    errorPolicy: 'all',
    onCompleted: (data: { login: AuthResponse }) => {
      localStorage.setItem('authToken', data.login.access_token);
      setError(null);
      refetchUser(); // Refresh user data
    },
    onError: (err) => {
      setError(err.message || 'Login failed');
    }
  });
  
  // Register mutation
  const [registerMutation, { loading: registerLoading }] = useMutation(REGISTER_MUTATION, {
    errorPolicy: 'all',
    onCompleted: (data: { register: AuthResponse }) => {
      localStorage.setItem('authToken', data.register.access_token);
      setError(null);
      refetchUser(); // Refresh user data
    },
    onError: (err) => {
      setError(err.message || 'Registration failed');
    }
  });
  
  const login = async (params: LoginParams) => {
    try {
      setError(null);
      await loginMutation({ variables: params });
    } catch (err) {
      // Error handled in onError callback
    }
  };
  
  const register = async (params: RegisterParams) => {
    try {
      setError(null);
      await registerMutation({ variables: params });
    } catch (err) {
      // Error handled in onError callback
    }
  };
  
  const logout = () => {
    localStorage.removeItem('authToken');
    setError(null);
    // Clear Apollo cache for user queries
    refetchUser();
  };
  
  const clearError = () => {
    setError(null);
  };
  
  const user = currentUserData?.me || null;
  const isAuthenticated = !!user && !!localStorage.getItem('authToken');
  const isLoading = userLoading || loginLoading || registerLoading;
  
  return {
    user,
    isAuthenticated,
    isLoading,
    error,
    login,
    register,
    logout,
    clearError
  };
}