import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";
import { CountryProvider } from "@/contexts/CountryContext";
import { SafeAuthProvider } from "@/contexts/AuthContextSafe";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

// Try importing the actual components one by one
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// Import pages directly first (no lazy loading)
import Index from "@/pages/Index";
import SignIn from "@/pages/SignIn";
import NotFound from "@/pages/NotFound";

function AppContent() {
  console.log('🔍 Progressive AppContent rendering...');
  
  try {
    return (
      <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <Header
          onSignInClick={() => console.log('Sign in clicked')}
          onHomeClick={() => console.log('Home clicked')}
          onSellClick={() => console.log('Sell clicked')}
          onSavedClick={() => console.log('Saved clicked')}
          onExpressSellClick={() => console.log('Express sell clicked')}
        />
        <main style={{ flex: 1 }}>
          <Suspense fallback={
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center', 
              minHeight: '50vh' 
            }}>
              <LoadingSpinner />
            </div>
          }>
            <Routes>
              <Route path="/" element={
                <Index onAdvancedSearchClick={() => console.log('Advanced search clicked')} />
              } />
              <Route path="/signin" element={<SignIn />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </main>
        <Footer
          onAdvancedSearchClick={() => console.log('Footer advanced search clicked')}
          onSellClick={() => console.log('Footer sell clicked')}
          onContactUsClick={() => console.log('Footer contact clicked')}
          onRegisteredDealersClick={() => console.log('Footer dealers clicked')}
        />
      </div>
    );
  } catch (error) {
    console.error('❌ Error in AppContent:', error);
    return (
      <div style={{
        padding: '40px',
        backgroundColor: '#fee2e2',
        border: '2px solid #dc2626',
        margin: '20px',
        borderRadius: '8px'
      }}>
        <h1 style={{ color: '#dc2626' }}>AppContent Error</h1>
        <p>Error in AppContent: {error instanceof Error ? error.message : String(error)}</p>
      </div>
    );
  }
}

function App() {
  console.log('🔍 Progressive App component rendering...');
  
  try {
    return (
      <BrowserRouter>
        <CountryProvider>
          <SafeAuthProvider>
            <FavoritesProvider>
              <AppContent />
            </FavoritesProvider>
          </SafeAuthProvider>
        </CountryProvider>
      </BrowserRouter>
    );
  } catch (error) {
    console.error('❌ Error in Progressive App component:', error);
    return (
      <div style={{
        padding: '40px',
        backgroundColor: '#fee2e2',
        border: '2px solid #dc2626',
        margin: '20px',
        borderRadius: '8px'
      }}>
        <h1 style={{ color: '#dc2626' }}>Progressive App Rendering Error</h1>
        <p>Error: {error instanceof Error ? error.message : String(error)}</p>
        {error instanceof Error && error.stack && (
          <pre style={{ 
            background: '#f9f9f9', 
            padding: '10px', 
            fontSize: '12px',
            overflow: 'auto',
            maxHeight: '300px'
          }}>
            {error.stack}
          </pre>
        )}
      </div>
    );
  }
}

export default App;