import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import SimpleApp from "./App-simple";

console.log('🚀 Loading Car Market Platform (Step 2: Simple App)...');
const root = createRoot(document.getElementById("root")!);

try {
  root.render(
    <StrictMode>
      <SimpleApp />
    </StrictMode>
  );
  console.log('✅ Step 2: Simple car marketplace loaded successfully!');
} catch (error) {
  console.error('❌ Step 2 failed:', error);
  root.render(
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial', 
      backgroundColor: '#fee2e2',
      border: '2px solid #dc2626',
      borderRadius: '8px',
      margin: '20px'
    }}>
      <h1 style={{ color: '#dc2626' }}>🚫 Step 2 Failed: Simple App Error</h1>
      <p><strong>Error:</strong> {String(error)}</p>
      <p>Even the simple app failed. This indicates a deeper issue.</p>
    </div>
  );
}