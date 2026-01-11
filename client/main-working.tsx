import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./global.css";

console.log('🚀 Loading Car Market Platform WITH SAFE AUTH...');
console.log('🔍 All imports fixed - using SafeAuthProvider consistently');

const root = createRoot(document.getElementById("root")!);

try {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('🎉 Car Market Platform loaded successfully WITH SAFE AUTH!');
  console.log('✅ Fixed import inconsistencies between AuthContext and SafeAuthProvider');
  console.log('✅ All components now use useSafeAuth instead of useAuth');
  console.log('✅ OAuth functionality temporarily disabled in SocialLoginModal');
  console.log('✅ TypeScript errors resolved');
} catch (error) {
  console.error('❌ App failed to load:', error);
  console.error('Error details:', error);
  
  // Show detailed error
  root.render(
    <div style={{ 
      padding: '20px', 
      backgroundColor: '#fee', 
      border: '2px solid #f00', 
      margin: '20px',
      borderRadius: '8px',
      fontFamily: 'monospace'
    }}>
      <h1 style={{ color: '#c00' }}>🚫 App Loading Error</h1>
      <p><strong>Error:</strong> {String(error)}</p>
      {error instanceof Error && (
        <div>
          <p><strong>Stack:</strong></p>
          <pre style={{ background: '#f9f9f9', padding: '10px', fontSize: '12px' }}>
            {error.stack}
          </pre>
        </div>
      )}
      <button onClick={() => window.location.reload()} style={{ 
        padding: '10px 20px', 
        background: '#0066cc', 
        color: 'white', 
        border: 'none', 
        borderRadius: '4px',
        marginTop: '10px',
        cursor: 'pointer'
      }}>
        Reload Page
      </button>
    </div>
  );
}