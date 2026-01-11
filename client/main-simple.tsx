import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

// Simple test component
function SimpleApp() {
  console.log('SimpleApp rendered');
  return (
    <div style={{ padding: '20px', background: 'lightblue' }}>
      <h1>Simple Test App</h1>
      <p>If you can see this, React is working!</p>
      <p>Time: {new Date().toLocaleTimeString()}</p>
    </div>
  );
}

console.log('Simple main script executing');
const root = createRoot(document.getElementById("root")!);
console.log('Root created, about to render');
root.render(
  <StrictMode>
    <SimpleApp />
  </StrictMode>
);
console.log('Render called');