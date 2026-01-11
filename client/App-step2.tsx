import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";

// Test step 2: Add ErrorBoundary
function App() {
  console.log("🟢 App step 2: Adding ErrorBoundary...");
  
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <div className="min-h-screen">
          <h1>Step 2: ErrorBoundary Added</h1>
          <Routes>
            <Route path="/" element={<div>Home page</div>} />
            <Route path="*" element={<div>404</div>} />
          </Routes>
        </div>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;