import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./global.css";

console.log('🚨 EMERGENCY TEST - Loading minimal React app...');

function EmergencyApp() {
  return (
    <div style={{ 
      padding: '40px', 
      fontFamily: 'Arial, sans-serif',
      backgroundColor: '#f0f9ff',
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center'
    }}>
      <h1 style={{ 
        color: '#1e40af', 
        fontSize: '3rem', 
        marginBottom: '2rem',
        textAlign: 'center' 
      }}>
        🚗 CarMarket365 EMERGENCY TEST
      </h1>
      
      <div style={{ 
        backgroundColor: '#dcfce7', 
        padding: '2rem', 
        borderRadius: '12px',
        border: '2px solid #16a34a',
        maxWidth: '600px',
        textAlign: 'center'
      }}>
        <h2 style={{ color: '#15803d', marginBottom: '1rem' }}>
          ✅ REACT IS WORKING!
        </h2>
        <p style={{ fontSize: '1.2rem', lineHeight: '1.6', margin: '1rem 0' }}>
          If you can see this page, React is loading successfully.
        </p>
        <p style={{ fontSize: '1rem', color: '#374151' }}>
          This means the issue is in the App component or one of its imports.
        </p>
        
        <button 
          onClick={() => {
            console.log('Button clicked - JavaScript is working!');
            alert('JavaScript is working! The issue is not with React rendering.');
          }}
          style={{
            padding: '12px 24px',
            backgroundColor: '#2563eb',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            fontSize: '1rem',
            cursor: 'pointer',
            marginTop: '1rem'
          }}
        >
          Test JavaScript
        </button>
      </div>
      
      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem', 
        backgroundColor: '#fef3c7',
        borderRadius: '8px',
        border: '1px solid #f59e0b'
      }}>
        <p style={{ color: '#92400e', fontWeight: 'bold' }}>
          Next Steps: If you see this, the problem is in App.tsx or its dependencies.
        </p>
      </div>
    </div>
  );
}

const root = createRoot(document.getElementById("root")!);

try {
  root.render(
    <StrictMode>
      <EmergencyApp />
    </StrictMode>
  );
  console.log('🎉 EMERGENCY TEST - React app loaded successfully!');
} catch (error) {
  console.error('❌ EMERGENCY TEST FAILED:', error);
}