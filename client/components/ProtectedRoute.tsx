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

    // Admin users have unlimited access to all dashboards - bypass all role checks
    if (user.role === 'ADMIN') {
      // Admins can access everything, so skip all role restrictions
      return;
    }

    // Check role-based access for non-admin users
    if (requiredRole && user.role !== requiredRole) {
      // Redirect to appropriate dashboard based on user's actual role
      redirectToUserDashboard(user.role);
      return;
    }

    // Check if user role is in allowed roles list for non-admin users
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

  // Check role access - Admin users bypass all restrictions
  if (user.role !== 'ADMIN' && requiredRole && user.role !== requiredRole) {
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

  if (user.role !== 'ADMIN' && allowedRoles && !allowedRoles.includes(user.role)) {
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