import { useNavigate } from 'react-router-dom';
import { ChevronLeft, Home, Crown } from 'lucide-react';
import { Button } from './ui/button';
import { useSafeAuth } from '../contexts/AuthContextSafe';

interface AdminBreadcrumbProps {
  currentPage: string;
  showHomeLink?: boolean;
}

export function AdminBreadcrumb({ currentPage, showHomeLink = true }: AdminBreadcrumbProps) {
  const navigate = useNavigate();
  const { user } = useSafeAuth();

  // Only show breadcrumbs for admin users
  if (!user || user.role !== 'ADMIN') {
    return null;
  }

  const handleBackToDashboard = () => {
    navigate('/dashboard');
  };

  const handleHome = () => {
    navigate('/');
  };

  return (
    <div className="bg-white border-b border-zinc-200 py-4">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            {showHomeLink && (
              <>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleHome}
                  className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full px-3"
                >
                  <Home className="h-4 w-4 mr-2" />
                  Home
                </Button>
                <span className="text-gray-400">/</span>
              </>
            )}
            <Button
              variant="ghost"
              size="sm"
              onClick={handleBackToDashboard}
              className="text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full px-3"
            >
              <Crown className="h-4 w-4 mr-2" />
              Admin Center
            </Button>
            <span className="text-gray-400">/</span>
            <span className="font-medium text-gray-900">{currentPage}</span>
          </div>
          
          <Button
            variant="outline"
            size="sm"
            onClick={handleBackToDashboard}
            className="hidden sm:flex items-center border-zinc-300 hover:bg-zinc-50 rounded-full px-4"
          >
            <ChevronLeft className="h-4 w-4 mr-2" />
            Back to Admin Center
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBackToDashboard}
            className="sm:hidden text-gray-600 hover:text-gray-900 hover:bg-gray-100 rounded-full p-2"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}