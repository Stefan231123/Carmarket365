import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { CountryProvider } from "@/contexts/CountryContext";

// Test step 3: Add CountryProvider
function App() {
  console.log("🟢 App step 3: Adding CountryProvider...");
  
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <CountryProvider>
          <div className="min-h-screen">
            <h1>Step 3: CountryProvider Added</h1>
            <Routes>
              <Route path="/" element={<div>Home page</div>} />
              <Route path="*" element={<div>404</div>} />
            </Routes>
          </div>
        </CountryProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;