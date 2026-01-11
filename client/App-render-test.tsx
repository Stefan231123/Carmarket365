import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryProvider } from "@/contexts/CountryContext";
import { SafeAuthProvider } from "@/contexts/AuthContextSafe";
import { FavoritesProvider } from "@/contexts/FavoritesContext";
import { LoadingSpinner } from "@/components/LoadingSpinner";

// Test actual rendering (not just imports)
function RenderTest() {
  console.log('🔍 Starting render tests...');
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#dc2626' }}>🔍 COMPONENT RENDER TEST</h1>
      
      {/* Test 1: LoadingSpinner */}
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f9ff', borderRadius: '8px' }}>
        <h3>Test 1: LoadingSpinner Render</h3>
        <TestLoadingSpinnerRender />
      </div>
      
      {/* Test 2: Header */}
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f9ff', borderRadius: '8px' }}>
        <h3>Test 2: Header Render</h3>
        <TestHeaderRender />
      </div>
      
      {/* Test 3: Footer */}
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f9ff', borderRadius: '8px' }}>
        <h3>Test 3: Footer Render</h3>
        <TestFooterRender />
      </div>
      
      {/* Test 4: Index Page */}
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f9ff', borderRadius: '8px' }}>
        <h3>Test 4: Index Page Render</h3>
        <TestIndexPageRender />
      </div>
    </div>
  );
}

function TestLoadingSpinnerRender() {
  try {
    console.log('🔍 Rendering LoadingSpinner...');
    return (
      <div>
        <p style={{ color: 'green' }}>✅ LoadingSpinner renders:</p>
        <LoadingSpinner />
      </div>
    );
  } catch (error) {
    console.error('❌ LoadingSpinner render failed:', error);
    return <div style={{ color: 'red' }}>❌ LoadingSpinner render failed: {String(error)}</div>;
  }
}

function TestHeaderRender() {
  try {
    console.log('🔍 Rendering Header...');
    const { Header } = require("@/components/Header");
    return (
      <div>
        <p style={{ color: 'green' }}>✅ Header renders:</p>
        <div style={{ border: '1px solid #ccc', marginTop: '10px' }}>
          <Header
            onSignInClick={() => console.log('Sign in clicked')}
            onHomeClick={() => console.log('Home clicked')}
            onSellClick={() => console.log('Sell clicked')}
            onSavedClick={() => console.log('Saved clicked')}
            onExpressSellClick={() => console.log('Express sell clicked')}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error('❌ Header render failed:', error);
    return <div style={{ color: 'red' }}>❌ Header render failed: {String(error)}</div>;
  }
}

function TestFooterRender() {
  try {
    console.log('🔍 Rendering Footer...');
    const { Footer } = require("@/components/Footer");
    return (
      <div>
        <p style={{ color: 'green' }}>✅ Footer renders:</p>
        <div style={{ border: '1px solid #ccc', marginTop: '10px' }}>
          <Footer
            onAdvancedSearchClick={() => console.log('Footer advanced search clicked')}
            onSellClick={() => console.log('Footer sell clicked')}
            onContactUsClick={() => console.log('Footer contact clicked')}
            onRegisteredDealersClick={() => console.log('Footer dealers clicked')}
          />
        </div>
      </div>
    );
  } catch (error) {
    console.error('❌ Footer render failed:', error);
    return <div style={{ color: 'red' }}>❌ Footer render failed: {String(error)}</div>;
  }
}

function TestIndexPageRender() {
  try {
    console.log('🔍 Rendering Index page...');
    const IndexModule = require("@/pages/Index");
    const Index = IndexModule.default;
    return (
      <div>
        <p style={{ color: 'green' }}>✅ Index page renders:</p>
        <div style={{ border: '1px solid #ccc', marginTop: '10px', maxHeight: '200px', overflow: 'auto' }}>
          <Index onAdvancedSearchClick={() => console.log('Advanced search clicked')} />
        </div>
      </div>
    );
  } catch (error) {
    console.error('❌ Index page render failed:', error);
    return <div style={{ color: 'red' }}>❌ Index page render failed: {String(error)}</div>;
  }
}

function App() {
  console.log('🔍 Render test App component rendering...');
  
  try {
    return (
      <BrowserRouter>
        <CountryProvider>
          <SafeAuthProvider>
            <FavoritesProvider>
              <RenderTest />
            </FavoritesProvider>
          </SafeAuthProvider>
        </CountryProvider>
      </BrowserRouter>
    );
  } catch (error) {
    console.error('❌ Error in Render test App component:', error);
    return (
      <div style={{
        padding: '40px',
        backgroundColor: '#fee2e2',
        border: '2px solid #dc2626',
        margin: '20px',
        borderRadius: '8px'
      }}>
        <h1 style={{ color: '#dc2626' }}>Render Test App Error</h1>
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