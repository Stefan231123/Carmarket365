import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryProvider } from "@/contexts/CountryContext";
import { SafeAuthProvider } from "@/contexts/AuthContextSafe";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

// Minimal components to avoid complex dependencies
function MinimalHeader() {
  return (
    <header style={{
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      color: 'white',
      padding: '1rem',
      textAlign: 'center'
    }}>
      <h1 style={{ margin: 0, fontSize: '1.8rem' }}>🚗 CarMarket365</h1>
    </header>
  );
}

function MinimalHomePage() {
  return (
    <div style={{ 
      padding: '40px', 
      textAlign: 'center',
      minHeight: '60vh'
    }}>
      <h1 style={{ fontSize: '2.5rem', color: '#1f2937', marginBottom: '1rem' }}>
        Find Your Perfect Car
      </h1>
      <p style={{ fontSize: '1.2rem', color: '#6b7280', marginBottom: '2rem' }}>
        Browse thousands of quality vehicles from trusted dealers
      </p>
      
      <div style={{
        background: 'white',
        padding: '2rem',
        borderRadius: '12px',
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
        maxWidth: '600px',
        margin: '0 auto'
      }}>
        <input
          type="text"
          placeholder="Search for make, model..."
          style={{
            width: '100%',
            padding: '12px 16px',
            border: '2px solid #e5e7eb',
            borderRadius: '8px',
            fontSize: '1rem',
            boxSizing: 'border-box'
          }}
        />
        <button style={{
          width: '100%',
          marginTop: '1rem',
          padding: '12px',
          background: 'linear-gradient(135deg, #10b981 0%, #059669 100%)',
          color: 'white',
          border: 'none',
          borderRadius: '8px',
          fontSize: '1rem',
          fontWeight: 'bold',
          cursor: 'pointer'
        }}>
          🔍 Search Cars
        </button>
      </div>
    </div>
  );
}

function MinimalFooter() {
  return (
    <footer style={{
      backgroundColor: '#1f2937',
      color: 'white',
      padding: '2rem',
      textAlign: 'center',
      marginTop: 'auto'
    }}>
      <p style={{ margin: 0 }}>© 2024 CarMarket365. All rights reserved.</p>
    </footer>
  );
}

function AppContent() {
  console.log('🔍 AppContent rendering...');
  
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      minHeight: '100vh' 
    }}>
      <MinimalHeader />
      <main style={{ flex: 1, backgroundColor: '#f8fafc' }}>
        <Routes>
          <Route path="/" element={<MinimalHomePage />} />
          <Route path="*" element={
            <div style={{ 
              padding: '40px', 
              textAlign: 'center',
              minHeight: '60vh'
            }}>
              <h1 style={{ color: '#dc2626' }}>404 - Page Not Found</h1>
              <p>The page you're looking for doesn't exist.</p>
            </div>
          } />
        </Routes>
      </main>
      <MinimalFooter />
    </div>
  );
}

function App() {
  console.log('🔍 Minimal App component rendering...');
  
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
    console.error('❌ Error in App component:', error);
    return (
      <div style={{
        padding: '40px',
        backgroundColor: '#fee2e2',
        border: '2px solid #dc2626',
        margin: '20px',
        borderRadius: '8px'
      }}>
        <h1 style={{ color: '#dc2626' }}>App Rendering Error</h1>
        <p>Error: {error instanceof Error ? error.message : String(error)}</p>
      </div>
    );
  }
}

export default App;