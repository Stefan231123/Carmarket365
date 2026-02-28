import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { HelmetProvider } from "react-helmet-async";
import { GoogleReCaptchaProvider } from "react-google-recaptcha-v3";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SafeAuthProvider } from "@/contexts/AuthContextSafe";
import { CountryProvider } from "@/contexts/CountryContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { AutoRedirectDialog } from "@/components/RedirectDialog";
import { CookieConsent } from "@/components/CookieConsent";
import { Analytics } from "@/components/Analytics";
import { useTranslation } from "@/hooks/useTranslation";

// Critical page loaded immediately (homepage)
import Index from "@/pages/Index";

// Lazy load all non-critical pages
const SignIn = lazy(() => import("@/pages/SignIn"));
const NotFound = lazy(() => import("@/pages/NotFound"));
const BrowseCars = lazy(() => import("@/pages/BrowseCars"));
const SellCar = lazy(() => import("@/pages/SellCar"));
const ExpressSell = lazy(() => import("@/pages/ExpressSell"));
const SavedCars = lazy(() => import("@/pages/SavedCars"));
const RegisteredDealers = lazy(() => import("@/pages/RegisteredDealers"));
const DealerProfile = lazy(() => import("@/pages/DealerProfile"));

const About = lazy(() => import("@/pages/About"));
const CarDetail = lazy(() => import("@/pages/CarDetail"));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const AdvancedSearch = lazy(() => import("@/pages/AdvancedSearch"));
const DealerSignUp = lazy(() => import("@/pages/DealerSignUp"));
const UserSignUp = lazy(() => import("@/pages/UserSignUp"));
const DealerDashboard = lazy(() => import("@/pages/DealerDashboard"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const AdminSEODashboard = lazy(() => import("@/pages/AdminSEODashboard"));
const PrivateDashboard = lazy(() => import("@/pages/PrivateDashboard"));
const CarReviews = lazy(() => import("@/pages/CarReviews"));
const SafetyTips = lazy(() => import("@/pages/SafetyTips"));
const DealerSupport = lazy(() => import("@/pages/DealerSupport"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));
const Imprint = lazy(() => import("@/pages/Imprint"));
const Accessibility = lazy(() => import("@/pages/Accessibility"));
const DashboardSelector = lazy(() => import("@/pages/DashboardSelector"));
const ResetPassword = lazy(() => import("@/pages/ResetPassword"));

function AppContent() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignInClick = () => navigate('/signin');
  const handleHomeClick = () => navigate('/');
  const handleSellClick = () => navigate('/sell');
  const handleSavedClick = () => navigate('/saved');
  const handleExpressSellClick = () => navigate('/express-sell');
  const handleContactUsClick = () => navigate('/contact');
  const handleRegisteredDealersClick = () => navigate('/registered-dealers');
  const handleAdvancedSearchClick = () => navigate('/advanced-search');

  return (
    <div className="flex flex-col min-h-screen overflow-x-hidden">
      <Header
        onSignInClick={handleSignInClick}
        onHomeClick={handleHomeClick}
        onSellClick={handleSellClick}
        onSavedClick={handleSavedClick}
        onExpressSellClick={handleExpressSellClick}
      />
      <main className="flex-1">
        <Suspense fallback={
          <div className="flex items-center justify-center min-h-screen">
            <LoadingSpinner />
          </div>
        }>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/cars" element={<BrowseCars />} />
            <Route path="/advanced-search" element={<AdvancedSearch />} />
            <Route path="/cars/:id" element={<CarDetail />} />
            <Route path="/sell" element={<ProtectedRoute><SellCar /></ProtectedRoute>} />
            <Route path="/sell-vehicle" element={<Navigate to="/sell" replace />} />
            <Route path="/express-sell" element={<ProtectedRoute><ExpressSell /></ProtectedRoute>} />
            <Route path="/saved" element={<SavedCars />} />
            <Route path="/registered-dealers" element={<RegisteredDealers />} />
            <Route path="/dealers" element={<Navigate to="/registered-dealers" replace />} />
            <Route path="/dealer/:id" element={<DealerProfile />} />
            <Route path="/financing" element={<Navigate to="/" replace />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<UserSignUp />} />
            <Route path="/reset-password" element={<ResetPassword />} />
            <Route path="/dealer-signup" element={<DealerSignUp />} />
            <Route 
              path="/dealer-dashboard" 
              element={
                <ProtectedRoute requiredRole="DEALER">
                  <DealerDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin-dashboard" 
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/admin/seo" 
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminSEODashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/private-dashboard" 
              element={
                <ProtectedRoute requiredRole="USER">
                  <PrivateDashboard />
                </ProtectedRoute>
              } 
            />
            <Route 
              path="/dashboard" 
              element={
                <ProtectedRoute>
                  <DashboardSelector />
                </ProtectedRoute>
              } 
            />
            <Route path="/help" element={<Navigate to="/faq" replace />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/feedback" element={<Navigate to="/contact" replace />} />
            <Route path="/disclaimer" element={<Navigate to="/terms-of-service" replace />} />
            <Route path="/insurance" element={<Navigate to="/" replace />} />
            
            {/* New Footer Pages */}
            <Route path="/car-reviews" element={<CarReviews />} />
            <Route path="/safety-tips" element={<SafetyTips />} />
            <Route path="/dealer-support" element={<DealerSupport />} />
            <Route path="/privacy-policy" element={<PrivacyPolicy />} />
            <Route path="/terms-of-service" element={<TermsOfService />} />
            <Route path="/cookie-policy" element={<CookiePolicy />} />
            <Route path="/imprint" element={<Imprint />} />
            <Route path="/accessibility" element={<Accessibility />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </main>
      <Footer
        onAdvancedSearchClick={handleAdvancedSearchClick}
        onSellClick={handleSellClick}
        onContactUsClick={handleContactUsClick}
        onRegisteredDealersClick={handleRegisteredDealersClick}
      />
      <AutoRedirectDialog />
      <CookieConsent />
      <Analytics />
    </div>
  );
}

const recaptchaSiteKey = import.meta.env.VITE_RECAPTCHA_SITE_KEY || '';

function App() {
  return (
    <HelmetProvider>
      <GoogleReCaptchaProvider
        reCaptchaKey={recaptchaSiteKey}
        scriptProps={{ async: true, defer: true }}
      >
        <BrowserRouter>
          <CountryProvider>
            <SafeAuthProvider>
              <FavoritesProvider>
                <ErrorBoundary>
                  <AppContent />
                </ErrorBoundary>
              </FavoritesProvider>
            </SafeAuthProvider>
          </CountryProvider>
        </BrowserRouter>
      </GoogleReCaptchaProvider>
    </HelmetProvider>
  );
}

export default App;