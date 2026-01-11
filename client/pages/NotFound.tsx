import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Home, ArrowLeft } from "lucide-react";
import { useTranslation } from '../hooks/useTranslation';

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { t } = useTranslation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname,
    );
  }, [location.pathname]);

  const handleGoHome = () => {
    navigate('/');
  };

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center max-w-md mx-auto px-4">
        <div className="mb-8">
          <h1 className="text-6xl font-bold text-gray-900 mb-2">{t('errors.notFound.title')}</h1>
          <h2 className="text-2xl font-semibold text-gray-700 mb-4">{t('errors.notFound.heading')}</h2>
          <p className="text-gray-600 mb-8">
{t('errors.notFound.message')}
          </p>
        </div>
        
        <div className="space-y-4">
          <Button 
            onClick={handleGoHome}
            className="w-full"
            size="lg"
          >
            <Home className="h-4 w-4 mr-2" />
{t('errors.notFound.goHome')}
          </Button>
          
          <Button 
            onClick={handleGoBack}
            variant="outline"
            className="w-full"
            size="lg"
          >
            <ArrowLeft className="h-4 w-4 mr-2" />
{t('errors.notFound.goBack')}
          </Button>
        </div>
        
        <p className="text-sm text-gray-500 mt-8">
{t('errors.notFound.supportMessage')}
        </p>
      </div>
    </div>
  );
};

export default NotFound;
