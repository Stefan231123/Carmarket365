import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CountryProvider } from "@/contexts/CountryContext";
import { SafeAuthProvider } from "@/contexts/AuthContextSafe";
import { FavoritesProvider } from "@/contexts/FavoritesContext";

// Test each component individually
function StepByStepTest() {
  console.log('🔍 Step by step component testing...');
  
  return (
    <div style={{ padding: '20px', fontFamily: 'Arial' }}>
      <h1 style={{ color: '#dc2626' }}>🔍 STEP-BY-STEP COMPONENT TEST</h1>
      
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f9ff', borderRadius: '8px' }}>
        <h3>Testing LoadingSpinner...</h3>
        <TestLoadingSpinner />
      </div>
      
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f9ff', borderRadius: '8px' }}>
        <h3>Testing Header...</h3>
        <TestHeader />
      </div>
      
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f9ff', borderRadius: '8px' }}>
        <h3>Testing Footer...</h3>
        <TestFooter />
      </div>
      
      <div style={{ marginBottom: '20px', padding: '15px', background: '#f0f9ff', borderRadius: '8px' }}>
        <h3>Testing Index Page...</h3>
        <TestIndexPage />
      </div>
    </div>
  );
}

function TestLoadingSpinner() {
  try {
    console.log('🔍 Testing LoadingSpinner import...');
    // Dynamic import to catch errors
    import("@/components/LoadingSpinner").then(({ LoadingSpinner }) => {
      console.log('✅ LoadingSpinner import successful');
      const container = document.getElementById('loading-spinner-result');
      if (container) {
        container.innerHTML = '<div style="color: green;">✅ LoadingSpinner imported successfully</div>';
      }
    }).catch(error => {
      console.error('❌ LoadingSpinner import failed:', error);
      const container = document.getElementById('loading-spinner-result');
      if (container) {
        container.innerHTML = `<div style="color: red;">❌ LoadingSpinner failed: ${error.message}</div>`;
      }
    });
  } catch (error) {
    console.error('❌ LoadingSpinner sync error:', error);
    return <div style={{ color: 'red' }}>❌ LoadingSpinner sync error: {String(error)}</div>;
  }
  
  return <div id="loading-spinner-result" style={{ color: '#6b7280' }}>🔄 Testing LoadingSpinner...</div>;
}

function TestHeader() {
  try {
    console.log('🔍 Testing Header import...');
    import("@/components/Header").then(({ Header }) => {
      console.log('✅ Header import successful');
      const container = document.getElementById('header-result');
      if (container) {
        container.innerHTML = '<div style="color: green;">✅ Header imported successfully</div>';
      }
    }).catch(error => {
      console.error('❌ Header import failed:', error);
      const container = document.getElementById('header-result');
      if (container) {
        container.innerHTML = `<div style="color: red;">❌ Header failed: ${error.message}</div>`;
      }
    });
  } catch (error) {
    console.error('❌ Header sync error:', error);
    return <div style={{ color: 'red' }}>❌ Header sync error: {String(error)}</div>;
  }
  
  return <div id="header-result" style={{ color: '#6b7280' }}>🔄 Testing Header...</div>;
}

function TestFooter() {
  try {
    console.log('🔍 Testing Footer import...');
    import("@/components/Footer").then(({ Footer }) => {
      console.log('✅ Footer import successful');
      const container = document.getElementById('footer-result');
      if (container) {
        container.innerHTML = '<div style="color: green;">✅ Footer imported successfully</div>';
      }
    }).catch(error => {
      console.error('❌ Footer import failed:', error);
      const container = document.getElementById('footer-result');
      if (container) {
        container.innerHTML = `<div style="color: red;">❌ Footer failed: ${error.message}</div>`;
      }
    });
  } catch (error) {
    console.error('❌ Footer sync error:', error);
    return <div style={{ color: 'red' }}>❌ Footer sync error: {String(error)}</div>;
  }
  
  return <div id="footer-result" style={{ color: '#6b7280' }}>🔄 Testing Footer...</div>;
}

function TestIndexPage() {
  try {
    console.log('🔍 Testing Index page import...');
    import("@/pages/Index").then((IndexModule) => {
      console.log('✅ Index page import successful');
      const container = document.getElementById('index-result');
      if (container) {
        container.innerHTML = '<div style="color: green;">✅ Index page imported successfully</div>';
      }
    }).catch(error => {
      console.error('❌ Index page import failed:', error);
      const container = document.getElementById('index-result');
      if (container) {
        container.innerHTML = `<div style="color: red;">❌ Index page failed: ${error.message}</div>`;
      }
    });
  } catch (error) {
    console.error('❌ Index page sync error:', error);
    return <div style={{ color: 'red' }}>❌ Index page sync error: {String(error)}</div>;
  }
  
  return <div id="index-result" style={{ color: '#6b7280' }}>🔄 Testing Index page...</div>;
}

function App() {
  console.log('🔍 Step-by-step App component rendering...');
  
  try {
    return (
      <BrowserRouter>
        <CountryProvider>
          <SafeAuthProvider>
            <FavoritesProvider>
              <StepByStepTest />
            </FavoritesProvider>
          </SafeAuthProvider>
        </CountryProvider>
      </BrowserRouter>
    );
  } catch (error) {
    console.error('❌ Error in Step-by-step App component:', error);
    return (
      <div style={{
        padding: '40px',
        backgroundColor: '#fee2e2',
        border: '2px solid #dc2626',
        margin: '20px',
        borderRadius: '8px'
      }}>
        <h1 style={{ color: '#dc2626' }}>Step-by-step App Rendering Error</h1>
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