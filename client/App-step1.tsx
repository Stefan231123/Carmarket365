import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Test step 1: Basic React Router setup
function App() {
  console.log("🟢 App component mounting...");
  
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <h1>Step 1: Basic Router Works</h1>
        <Routes>
          <Route path="/" element={<div>Home page</div>} />
          <Route path="*" element={<div>404</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;