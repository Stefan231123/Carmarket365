import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { CountryProvider } from "@/contexts/CountryContext";
import { AuthProvider } from "@/contexts/AuthContext";

// Test step 4: Add AuthProvider (this is likely where it fails)
function App() {
  console.log("🟢 App step 4: Adding AuthProvider...");
  
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <CountryProvider>
          <AuthProvider>
            <div className="min-h-screen">
              <h1>Step 4: AuthProvider Added</h1>
              <Routes>
                <Route path="/" element={<div>Home page</div>} />
                <Route path="*" element={<div>404</div>} />
              </Routes>
            </div>
          </AuthProvider>
        </CountryProvider>
      </BrowserRouter>
    </ErrorBoundary>
  );
}

export default App;