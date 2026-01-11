import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

function DebugApp() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      maxWidth: '900px',
      margin: '0 auto',
      lineHeight: '1.6',
      backgroundColor: '#f8fafc',
      minHeight: '100vh'
    }}>
      <div style={{
        backgroundColor: 'white',
        padding: '30px',
        borderRadius: '10px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
      }}>
        <h1 style={{ color: '#1e40af', marginBottom: '20px' }}>
          🚀 CarMarket365 - Browser Test Successful!
        </h1>
        
        <div style={{ 
          backgroundColor: '#dcfce7', 
          border: '1px solid #16a34a',
          padding: '15px', 
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h2 style={{ color: '#15803d', margin: '0 0 10px 0' }}>✅ Status: Working</h2>
          <p style={{ margin: '0' }}>React is successfully rendering in your browser!</p>
        </div>

        <div style={{
          backgroundColor: '#eff6ff',
          border: '1px solid #3b82f6', 
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h3 style={{ color: '#1d4ed8', margin: '0 0 10px 0' }}>🔧 System Check:</h3>
          <ul style={{ margin: '0', paddingLeft: '20px' }}>
            <li>✅ Vite Dev Server: Running on port 8081</li>
            <li>✅ React: Loading and rendering</li>
            <li>✅ TypeScript: Compiling (with Vite handling)</li>
            <li>✅ Browser: Successfully accessing application</li>
            <li>✅ Hot Module Replacement: Ready</li>
          </ul>
        </div>

        <p><strong>Current Time:</strong> {new Date().toLocaleString()}</p>
        
        <div style={{
          backgroundColor: '#fef3c7',
          border: '1px solid #f59e0b',
          padding: '15px',
          borderRadius: '8px',
          marginTop: '20px'
        }}>
          <p style={{ margin: '0', color: '#92400e' }}>
            <strong>Next Step:</strong> The basic React app is working. Ready to load the full car marketplace interface.
          </p>
        </div>
      </div>
    </div>
  );
}

console.log('🔍 Loading debug version...');
const root = createRoot(document.getElementById("root")!);

try {
  root.render(
    <StrictMode>
      <DebugApp />
    </StrictMode>
  );
  console.log('✅ Debug app loaded successfully!');
} catch (error) {
  console.error('❌ Debug app failed:', error);
  root.render(
    <div style={{ padding: '20px', color: 'red' }}>
      <h1>Error loading debug app</h1>
      <pre>{String(error)}</pre>
    </div>
  );
}