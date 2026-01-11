import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ErrorBoundary } from "@/components/ErrorBoundary";
import { CountryProvider } from "@/contexts/CountryContext";
import { SafeAuthProvider } from "@/contexts/AuthContextSafe";

// Test with a safe auth context (if it exists) or create a mock one
function MockAuthProvider({ children }: { children: React.ReactNode }) {
  console.log("🟡 Using mock auth provider");
  return <>{children}</>;
}

// Try to use safer auth or fallback to mock
const AuthProvider = SafeAuthProvider || MockAuthProvider;

function App() {
  console.log("🟢 App safe auth test: Loading...");
  
  return (
    <ErrorBoundary>
      <BrowserRouter>
        <CountryProvider>
          <AuthProvider>
            <div className="min-h-screen">
              <h1>Safe Auth Test</h1>
              <Routes>
                <Route path="/" element={<div>Home page - Auth context bypassed</div>} />
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