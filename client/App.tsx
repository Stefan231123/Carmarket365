import { BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import { Suspense, lazy } from "react";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LanguageSelector } from "@/components/LanguageSelector";
import { SafeAuthProvider } from "@/contexts/AuthContextSafe";
import { CountryProvider } from "@/contexts/CountryContext";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { ProtectedRoute } from "@/components/ProtectedRoute";
import { LoadingSpinner } from "@/components/LoadingSpinner";
import { DevSubdomainTester } from "@/components/DevSubdomainTester";
import { AutoRedirectDialog } from "@/components/RedirectDialog";
import { useTranslation } from "@/hooks/useTranslation";

// Critical pages loaded immediately
import Index from "@/pages/Index";
import SignIn from "@/pages/SignIn";
import NotFound from "@/pages/NotFound";

// Lazy load non-critical pages
const BrowseCars = lazy(() => import("@/pages/BrowseCars"));
const SellCar = lazy(() => import("@/pages/SellCar"));
const SellVehicle = lazy(() => import("@/pages/SellVehicle"));
const SavedCars = lazy(() => import("@/pages/SavedCars"));
const RegisteredDealers = lazy(() => import("@/pages/RegisteredDealers"));
const DealerProfile = lazy(() => import("@/pages/DealerProfile"));
const Financing = lazy(() => import("@/pages/Financing"));
const About = lazy(() => import("@/pages/About"));
const CarDetail = lazy(() => import("@/pages/CarDetail"));
const ContactUs = lazy(() => import("@/pages/ContactUs"));
const FAQ = lazy(() => import("@/pages/FAQ"));
const PlaceholderPage = lazy(() => import("@/pages/PlaceholderPage"));
const UIDemo = lazy(() => import("@/pages/UIDemo"));
const AdvancedSearch = lazy(() => import("@/pages/AdvancedSearch"));
const ExpressSell = lazy(() => import("@/pages/ExpressSell"));
const DealerSignUp = lazy(() => import("@/pages/DealerSignUp"));
const UserSignUp = lazy(() => import("@/pages/UserSignUp"));
const DealerDashboard = lazy(() => import("@/pages/DealerDashboard"));
const AdminDashboard = lazy(() => import("@/pages/AdminDashboard"));
const PrivateDashboard = lazy(() => import("@/pages/PrivateDashboard"));
const CarReviews = lazy(() => import("@/pages/CarReviews"));
const SafetyTips = lazy(() => import("@/pages/SafetyTips"));
const DealerSupport = lazy(() => import("@/pages/DealerSupport"));
const PrivacyPolicy = lazy(() => import("@/pages/PrivacyPolicy"));
const TermsOfService = lazy(() => import("@/pages/TermsOfService"));
const CookiePolicy = lazy(() => import("@/pages/CookiePolicy"));
const Imprint = lazy(() => import("@/pages/Imprint"));
const Accessibility = lazy(() => import("@/pages/Accessibility"));
const CountryTestPage = lazy(() => import("@/pages/CountryTestPage"));
const TranslationReview = lazy(() => import("@/pages/TranslationReview"));

function AppContent() {
  const navigate = useNavigate();
  const { t } = useTranslation();

  const handleSignInClick = () => navigate('/signin');
  const handleHomeClick = () => navigate('/');
  const handleSellClick = () => navigate('/sell-vehicle');
  const handleSavedClick = () => navigate('/saved');
  const handleExpressSellClick = () => navigate('/express-sell');
  const handleAdvancedSearchClick = () => navigate('/advanced-search');
  const handleContactUsClick = () => navigate('/contact');
  const handleRegisteredDealersClick = () => navigate('/registered-dealers');

  return (
    <div className="flex flex-col min-h-screen">
      <LanguageSelector />
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
            <Route path="/" element={<Index onAdvancedSearchClick={handleAdvancedSearchClick} />} />
            <Route path="/cars" element={<BrowseCars />} />
            <Route path="/advanced-search" element={<AdvancedSearch />} />
            <Route path="/cars/:id" element={<CarDetail />} />
            <Route path="/sell" element={<SellCar />} />
            <Route path="/sell-vehicle" element={<SellVehicle />} />
            <Route path="/express-sell" element={<ExpressSell />} />
            <Route path="/saved" element={<SavedCars />} />
            <Route path="/registered-dealers" element={<RegisteredDealers />} />
            <Route path="/dealers" element={<Navigate to="/registered-dealers" replace />} />
            <Route path="/dealer/:id" element={<DealerProfile />} />
            <Route path="/financing" element={<Financing />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<ContactUs />} />
            <Route path="/signin" element={<SignIn />} />
            <Route path="/signup" element={<UserSignUp />} />
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
              path="/private-dashboard" 
              element={
                <ProtectedRoute requiredRole="USER">
                  <PrivateDashboard />
                </ProtectedRoute>
              } 
            />
            <Route path="/ui-demo" element={<UIDemo />} />
            <Route path="/country-test" element={<CountryTestPage />} />
            <Route path="/translation-review" element={<TranslationReview />} />
            <Route path="/help" element={<PlaceholderPage title={t('pages.help.title')} />} />
            <Route path="/faq" element={<FAQ />} />
            <Route path="/feedback" element={<PlaceholderPage title={t('pages.feedback.title')} />} />
            <Route path="/disclaimer" element={<PlaceholderPage title={t('pages.disclaimer.title')} />} />
            <Route path="/insurance" element={<PlaceholderPage title={t('pages.insurance.title')} />} />
            
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
      <DevSubdomainTester />
      <AutoRedirectDialog />
    </div>
  );
}

function App() {
  return (
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
  );
}

export default App;