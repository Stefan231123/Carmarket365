import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";

console.log('🔍 DIAGNOSTIC TEST - Testing App imports step by step...');

const root = createRoot(document.getElementById("root")!);

// Step-by-step diagnostic function
async function diagnosticTest() {
  try {
    // Test 1: Basic React Router
    console.log('STEP 1: Testing React Router...');
    const { BrowserRouter } = await import("react-router-dom");
    console.log('✅ React Router imported successfully');
    
    // Test 2: Error Boundary
    console.log('STEP 2: Testing ErrorBoundary...');
    const { ErrorBoundary } = await import("@/components/ErrorBoundary");
    console.log('✅ ErrorBoundary imported successfully');
    
    // Test 3: CountryProvider
    console.log('STEP 3: Testing CountryProvider...');
    const { CountryProvider } = await import("@/contexts/CountryContext");
    console.log('✅ CountryProvider imported successfully');
    
    // Test 4: SafeAuthProvider
    console.log('STEP 4: Testing SafeAuthProvider...');
    const { SafeAuthProvider } = await import("@/contexts/AuthContextSafe");
    console.log('✅ SafeAuthProvider imported successfully');
    
    // Test 5: FavoritesProvider
    console.log('STEP 5: Testing FavoritesProvider...');
    const { FavoritesProvider } = await import("@/contexts/FavoritesContext");
    console.log('✅ FavoritesProvider imported successfully');
    
    // Test 6: Header component
    console.log('STEP 6: Testing Header component...');
    const { Header } = await import("@/components/Header");
    console.log('✅ Header imported successfully');
    
    // Test 7: Footer component
    console.log('STEP 7: Testing Footer component...');
    const { Footer } = await import("@/components/Footer");
    console.log('✅ Footer imported successfully');
    
    // Test 8: Index page
    console.log('STEP 8: Testing Index page...');
    const IndexComponent = await import("@/pages/Index");
    console.log('✅ Index page imported successfully');
    
    // Test 9: SignIn page  
    console.log('STEP 9: Testing SignIn page...');
    const SignInComponent = await import("@/pages/SignIn");
    console.log('✅ SignIn page imported successfully');
    
    // If all tests pass, try to render a minimal version
    console.log('🎉 ALL IMPORTS SUCCESSFUL! Creating minimal app...');
    
    function MinimalApp() {
      return (
        <ErrorBoundary>
          <BrowserRouter>
            <CountryProvider>
              <SafeAuthProvider>
                <FavoritesProvider>
                  <div style={{ padding: '20px', fontFamily: 'Arial' }}>
                    <h1 style={{ color: '#2563eb' }}>🎉 MINIMAL APP WORKING!</h1>
                    <p>All providers loaded successfully!</p>
                    <p>The issue must be in a specific component or route.</p>
                  </div>
                </FavoritesProvider>
              </SafeAuthProvider>
            </CountryProvider>
          </BrowserRouter>
        </ErrorBoundary>
      );
    }
    
    root.render(
      <StrictMode>
        <MinimalApp />
      </StrictMode>
    );
    
  } catch (error) {
    console.error('❌ DIAGNOSTIC FAILED AT:', error);
    console.error('Error details:', error);
    
    // Show where exactly it failed
    root.render(
      <div style={{ 
        padding: '20px', 
        backgroundColor: '#fee', 
        border: '2px solid #f00', 
        margin: '20px',
        borderRadius: '8px',
        fontFamily: 'monospace'
      }}>
        <h1 style={{ color: '#c00' }}>🚫 DIAGNOSTIC FAILED</h1>
        <p><strong>Failed at:</strong> {String(error)}</p>
        {error instanceof Error && (
          <div>
            <p><strong>Stack:</strong></p>
            <pre style={{ background: '#f9f9f9', padding: '10px', fontSize: '12px' }}>
              {error.stack}
            </pre>
          </div>
        )}
        <p>Check the browser console for the exact step where it failed.</p>
      </div>
    );
  }
}

// Run the diagnostic
diagnosticTest();