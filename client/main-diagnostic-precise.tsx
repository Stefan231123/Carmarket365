import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";

console.log('🔍 PRECISE DIAGNOSTIC: Starting...');

try {
  console.log('🔍 STEP 1: React imports OK');
  
  const root = createRoot(document.getElementById("root")!);
  console.log('🔍 STEP 2: Root created OK');

  // Test basic React rendering first
  function DiagnosticApp() {
    console.log('🔍 STEP 3: DiagnosticApp rendering...');
    
    return (
      <div style={{ 
        padding: '40px', 
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#f0f8ff',
        minHeight: '100vh'
      }}>
        <h1 style={{ color: '#2563eb', fontSize: '2rem' }}>
          🔍 PRECISE DIAGNOSTIC RESULTS
        </h1>
        
        <div style={{ 
          background: '#dcfce7', 
          padding: '20px', 
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <h2 style={{ color: '#059669' }}>✅ STEP 3: Basic React rendering works!</h2>
          <p>If you can see this, React is working fine.</p>
        </div>

        <div style={{ 
          background: '#fef3c7', 
          padding: '20px', 
          borderRadius: '8px',
          margin: '20px 0'
        }}>
          <h3>Testing App Import...</h3>
          <TestAppImport />
        </div>
      </div>
    );
  }

  function TestAppImport() {
    try {
      console.log('🔍 STEP 4: Testing App import...');
      // Dynamic import to catch the exact error
      import('./App').then((AppModule) => {
        console.log('✅ STEP 4: App import successful!', AppModule);
        document.getElementById('app-import-result')!.innerHTML = 
          '<div style="color: #059669;">✅ App.tsx imports successfully</div>';
      }).catch((error) => {
        console.error('❌ STEP 4: App import failed:', error);
        document.getElementById('app-import-result')!.innerHTML = 
          '<div style="color: #dc2626;">❌ App import failed: ' + error.message + '</div>';
      });
    } catch (error) {
      console.error('❌ STEP 4: Synchronous error testing App:', error);
      return <div style={{ color: '#dc2626' }}>❌ Synchronous App test error: {String(error)}</div>;
    }
    
    return (
      <div id="app-import-result" style={{ color: '#6b7280' }}>
        🔄 Testing App import...
      </div>
    );
  }

  console.log('🔍 STEP 2.5: About to render DiagnosticApp...');
  
  root.render(
    <StrictMode>
      <DiagnosticApp />
    </StrictMode>
  );
  
  console.log('✅ STEP 5: DiagnosticApp rendered successfully!');

} catch (error) {
  console.error('❌ CRITICAL ERROR in main.tsx:', error);
  console.error('❌ ERROR DETAILS:', {
    message: error instanceof Error ? error.message : String(error),
    stack: error instanceof Error ? error.stack : 'No stack trace',
    name: error instanceof Error ? error.name : 'Unknown error type'
  });

  // Try to show error even if root creation failed
  try {
    const root = createRoot(document.getElementById("root")!);
    root.render(
      <div style={{ 
        padding: '40px', 
        fontFamily: 'Arial, sans-serif',
        backgroundColor: '#fee2e2',
        border: '2px solid #dc2626',
        borderRadius: '8px',
        margin: '20px'
      }}>
        <h1 style={{ color: '#dc2626', fontSize: '2rem' }}>
          🚫 CRITICAL MAIN.TSX ERROR DETECTED
        </h1>
        <div style={{ 
          background: '#fef2f2', 
          padding: '15px', 
          borderRadius: '6px',
          marginTop: '20px'
        }}>
          <p><strong>Error Type:</strong> {error instanceof Error ? error.name : 'Unknown'}</p>
          <p><strong>Error Message:</strong> {error instanceof Error ? error.message : String(error)}</p>
          {error instanceof Error && error.stack && (
            <details style={{ marginTop: '10px' }}>
              <summary style={{ cursor: 'pointer', fontWeight: 'bold' }}>
                📋 Full Stack Trace
              </summary>
              <pre style={{ 
                background: '#f9fafb', 
                padding: '10px', 
                fontSize: '12px',
                overflow: 'auto',
                maxHeight: '300px',
                border: '1px solid #d1d5db',
                borderRadius: '4px',
                marginTop: '10px'
              }}>
                {error.stack}
              </pre>
            </details>
          )}
        </div>
        <button 
          onClick={() => window.location.reload()} 
          style={{ 
            padding: '12px 24px', 
            background: '#dc2626', 
            color: 'white', 
            border: 'none', 
            borderRadius: '6px',
            fontSize: '16px',
            cursor: 'pointer',
            marginTop: '20px'
          }}
        >
          🔄 Reload and Try Again
        </button>
      </div>
    );
  } catch (rootError) {
    console.error('❌ EVEN ROOT CREATION FAILED:', rootError);
    // Last resort - direct DOM manipulation
    const rootElement = document.getElementById("root");
    if (rootElement) {
      rootElement.innerHTML = `
        <div style="padding: 40px; font-family: Arial; background: #fee2e2; border: 2px solid #dc2626; margin: 20px; border-radius: 8px;">
          <h1 style="color: #dc2626;">🚫 CATASTROPHIC ERROR</h1>
          <p><strong>Main Error:</strong> ${error instanceof Error ? error.message : String(error)}</p>
          <p><strong>Root Creation Error:</strong> ${rootError instanceof Error ? rootError.message : String(rootError)}</p>
          <p>Check browser console for full details.</p>
          <button onclick="window.location.reload()" style="padding: 12px 24px; background: #dc2626; color: white; border: none; border-radius: 6px; cursor: pointer;">Reload</button>
        </div>
      `;
    }
  }
}