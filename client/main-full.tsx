import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ApolloProvider } from "@apollo/client/react";
import { apolloClient } from "./lib/apollo-client";
import App from "./App";
import "./global.css";

console.log('🚀 Loading FULL Car Market Platform...');
const root = createRoot(document.getElementById("root")!);

try {
  root.render(
    <StrictMode>
      <ApolloProvider client={apolloClient}>
        <App />
      </ApolloProvider>
    </StrictMode>
  );
  console.log('🎉 FULL Car Market Platform with Apollo Client loaded successfully!');
} catch (error) {
  console.error('❌ Full app failed to load:', error);
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
