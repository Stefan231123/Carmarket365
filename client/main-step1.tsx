import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";

console.log('🚀 Loading Car Market Platform (Step 1: Without Apollo)...');
const root = createRoot(document.getElementById("root")!);

try {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  console.log('✅ Step 1: App component loaded successfully!');
} catch (error) {
  console.error('❌ Step 1 failed:', error);
  root.render(
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial', 
      backgroundColor: '#fee2e2',
      border: '2px solid #dc2626',
      borderRadius: '8px',
      margin: '20px'
    }}>
      <h1 style={{ color: '#dc2626' }}>🚫 Step 1 Failed: App Component Error</h1>
      <p><strong>Error:</strong> {String(error)}</p>
      <p>The App component has an issue. Let's fix this...</p>
    </div>
  );
}