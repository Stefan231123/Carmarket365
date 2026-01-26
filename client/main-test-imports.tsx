import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Test each import one by one
try {
  console.log('Testing imports...');
  
  // Test 1: Basic React Router
  console.log('1. Testing React Router...');
  const { BrowserRouter } = await import("react-router-dom");
  console.log('✅ React Router OK');

  // Test 2: Global CSS
  console.log('2. Testing Global CSS...');
  await import("./global.css");
  console.log('✅ Global CSS OK');

  // Test 3: Translation hook
  console.log('3. Testing translation hook...');
  const { useTranslation } = await import("./hooks/useTranslation");
  console.log('✅ Translation hook OK');

  // Test 4: Components one by one
  console.log('4. Testing Header component...');
  const { Header } = await import("@/components/Header");
  console.log('✅ Header component OK');

  console.log('5. Testing Index page...');
  const Index = await import("@/pages/Index");
  console.log('✅ Index page OK');

  // If we get here, create a simple working version
  function TestApp() {
    return (
      <div style={{ padding: '40px', fontFamily: 'Arial' }}>
        <h1 style={{ color: '#2563eb' }}>🔍 Import Test Results</h1>
        <div style={{ background: '#dcfce7', padding: '20px', borderRadius: '8px' }}>
          <h2>✅ All imports working!</h2>
          <p>The issue is not with the imports. Something else is causing the blank page.</p>
          <p>Check your browser's Developer Console (F12) for JavaScript errors.</p>
        </div>
      </div>
    );
  }

  const root = createRoot(document.getElementById("root")!);
  root.render(
    <StrictMode>
      <TestApp />
    </StrictMode>
  );

} catch (error) {
  console.error('❌ Import failed:', error);
  
  const root = createRoot(document.getElementById("root")!);
  root.render(
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial',
      backgroundColor: '#fee2e2',
      border: '2px solid #dc2626',
      borderRadius: '8px'
    }}>
      <h1 style={{ color: '#dc2626' }}>🚫 Import Error Detected!</h1>
      <p><strong>Failed Import:</strong></p>
      <pre style={{ 
        background: '#f9f9f9', 
        padding: '10px', 
        fontSize: '12px',
        whiteSpace: 'pre-wrap'
      }}>
        {String(error)}
      </pre>
      <p>This tells us exactly which import is failing.</p>
    </div>
  );
}