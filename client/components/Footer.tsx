import { Car, Phone, Mail, MapPin, User, Building2, Settings } from "lucide-react";
import { useSafeAuth } from "@/contexts/AuthContextSafe";
import { useNavigate } from "react-router-dom";
import { useTranslation } from "@/hooks/useTranslation";

interface FooterProps {
  onAdvancedSearchClick?: () => void;
  onSellClick?: () => void;
  onContactUsClick?: () => void;
  onRegisteredDealersClick?: () => void;
}

export function Footer({ onAdvancedSearchClick, onSellClick, onContactUsClick, onRegisteredDealersClick }: FooterProps) {
  const navigate = useNavigate();
  const { user, isAuthenticated } = useSafeAuth();
  const { t } = useTranslation();
  const currentYear = new Date().getFullYear();

  // Dashboard redirect logic based on user role
  const handleDashboardClick = () => {
    if (!isAuthenticated || !user) {
      navigate('/signin');
      return;
    }
    
    // Use React Router navigation for better SPA experience
    switch (user.role) {
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
  return (
    <footer className="bg-black text-white pt-16 pb-12">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-5 gap-8 justify-items-center text-center">
          {/* Company Info */}
          <div>
            <div className="flex items-center justify-center space-x-2 mb-4">
              <Car className="h-6 w-6" />
              <span className="text-lg font-bold">CarMarket365</span>
            </div>
            <p className="text-white/80 mb-4">
              {t('footer.aboutUs')}
            </p>
            <div className="space-y-2 text-sm">
              <div className="flex items-center justify-center text-white/80">
                <Phone className="h-4 w-4 mr-2" />
                +49 (0) 30 12345678
              </div>
              <div className="flex items-center justify-center text-white/80">
                <Mail className="h-4 w-4 mr-2" />
                info@carmarket365.com
              </div>
              <div className="flex items-center justify-center text-white/80">
                <MapPin className="h-4 w-4 mr-2" />
                Berlin, Germany
              </div>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.quickLinks')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={onAdvancedSearchClick}
                  className="text-white/80 hover:text-white transition-colors text-center w-full"
                >
                  {t('footer.searchCars')}
                </button>
              </li>
              <li>
                <button 
                  onClick={onSellClick}
                  className="text-white/80 hover:text-white transition-colors text-center w-full"
                >
                  {t('footer.sellYourCar')}
                </button>
              </li>
              <li>
                <button 
                  onClick={onRegisteredDealersClick}
                  className="text-white/80 hover:text-white transition-colors text-center w-full"
                >
                  {t('footer.registeredDealers')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/car-reviews')}
                  className="text-white/80 hover:text-white transition-colors text-center w-full"
                >
                  {t('footer.carReviews')}
                </button>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.support')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={onContactUsClick}
                  className="text-white/80 hover:text-white transition-colors text-center w-full"
                >
                  {t('footer.contactUs')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/safety-tips')}
                  className="text-white/80 hover:text-white transition-colors text-center w-full"
                >
                  {t('footer.safetyTips')}
                </button>
              </li>
              {isAuthenticated && user?.role === 'DEALER' && (
                <li>
                  <button 
                    onClick={() => navigate('/dealer-support')}
                    className="text-white/80 hover:text-white transition-colors text-center w-full"
                  >
                    {t('footer.dealerSupport')}
                  </button>
                </li>
              )}
              <li>
                <button 
                  onClick={() => navigate('/faq')}
                  className="text-white/80 hover:text-white transition-colors text-center w-full"
                >
                  {t('footer.faq')}
                </button>
              </li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.legal')}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <button 
                  onClick={() => navigate('/privacy-policy')}
                  className="text-white/80 hover:text-white transition-colors text-center w-full"
                >
                  {t('footer.privacyPolicy')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/terms-of-service')}
                  className="text-white/80 hover:text-white transition-colors text-center w-full"
                >
                  {t('footer.termsOfService')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/cookie-policy')}
                  className="text-white/80 hover:text-white transition-colors text-center w-full"
                >
                  {t('footer.cookiePolicy')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/imprint')}
                  className="text-white/80 hover:text-white transition-colors text-center w-full"
                >
                  {t('footer.imprint')}
                </button>
              </li>
              <li>
                <button 
                  onClick={() => navigate('/accessibility')}
                  className="text-white/80 hover:text-white transition-colors text-center w-full"
                >
                  {t('footer.accessibility')}
                </button>
              </li>
            </ul>
          </div>

          {/* Dashboard Access */}
          <div>
            <h3 className="font-semibold mb-4">{t('footer.dashboard')}</h3>
            <div className="space-y-3">
              {isAuthenticated && user ? (
                <button 
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-4 py-2 text-sm transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                  onClick={handleDashboardClick}
                >
                  {user.role === 'ADMIN' && <Settings className="h-4 w-4" />}
                  {user.role === 'DEALER' && <Building2 className="h-4 w-4" />}
                  {user.role === 'USER' && <User className="h-4 w-4" />}
                  {user.role === 'ADMIN' && t('footer.adminPanel')}
                  {user.role === 'DEALER' && t('footer.dealerDashboard')}
                  {user.role === 'USER' && t('footer.myDashboard')}
                </button>
              ) : (
                <button 
                  className="w-full bg-white/10 hover:bg-white/20 text-white border border-white/20 rounded-full px-4 py-2 text-sm transition-all duration-200 hover:scale-105 flex items-center justify-center gap-2"
                  onClick={() => navigate('/signin')}
                >
                  <User className="h-4 w-4" />
                  {t('footer.signInToAccess')}
                </button>
              )}
            </div>
          </div>
          </div>

          <div className="border-t border-white/10 mt-10 pt-6 text-center text-sm text-white/60">
            <p>&copy; {currentYear} CarMarket365. {t('footer.allRightsReserved')}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
