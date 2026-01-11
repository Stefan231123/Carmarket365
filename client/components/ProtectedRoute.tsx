import { useEffect } from 'react';
import { useSafeAuth } from '@/contexts/AuthContextSafe';
import { useNavigate } from 'react-router-dom';
import { useTranslation } from '@/hooks/useTranslation';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requiredRole?: 'USER' | 'DEALER' | 'ADMIN';
  allowedRoles?: ('USER' | 'DEALER' | 'ADMIN')[];
}

export function ProtectedRoute({ children, requiredRole, allowedRoles }: ProtectedRouteProps) {
  const navigate = useNavigate();
  const { user, isAuthenticated, isLoading } = useSafeAuth();
  const { t } = useTranslation();

  useEffect(() => {
    // If still loading auth state, don't redirect yet
    if (isLoading) return;

    // If not authenticated, redirect to sign in
    if (!isAuthenticated || !user) {
      navigate('/signin');
      return;
    }

    // Check role-based access
    if (requiredRole && user.role !== requiredRole) {
      // Redirect to appropriate dashboard based on user's actual role
      redirectToUserDashboard(user.role);
      return;
    }

    // Check if user role is in allowed roles list
    if (allowedRoles && !allowedRoles.includes(user.role)) {
      // Redirect to appropriate dashboard based on user's actual role
      redirectToUserDashboard(user.role);
      return;
    }
  }, [isAuthenticated, user, isLoading, requiredRole, allowedRoles, navigate]);

  // Helper function to redirect to user's appropriate dashboard
  const redirectToUserDashboard = (userRole: 'USER' | 'DEALER' | 'ADMIN') => {
    switch (userRole) {
      case 'ADMIN':
        navigate('/admin-dashboard');
        break;
      case 'DEALER':
        navigate('/dealer-dashboard');
        break;
      case 'USER':
      default:
        navigate('/private-dashboard');
        break;
    }
  };

  // Show loading state while checking authentication
  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  // Show unauthorized message if user doesn't have access
  if (!isAuthenticated || !user) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.accessDenied.title')}</h1>
          <p className="text-gray-600">{t('auth.accessDenied.signInRequired')}</p>
        </div>
      </div>
    );
  }

  // Check role access
  if (requiredRole && user.role !== requiredRole) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">{t('auth.accessDenied.title')}</h1>
          <p className="text-gray-600">{t('auth.accessDenied.insufficientPermissions')}</p>
          <p className="text-sm text-gray-500 mt-2">
            Redirecting to your dashboard...
          </p>
        </div>
      </div>
    );
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Access Denied</h1>
          <p className="text-gray-600">You don't have permission to access this page.</p>
          <p className="text-sm text-gray-500 mt-2">
            Redirecting to your dashboard...
          </p>
        </div>
      </div>
    );
  }

  return <>{children}</>;
}