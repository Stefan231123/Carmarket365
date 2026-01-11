import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

// Minimal test component to verify basic rendering
function TestComponent() {
  return <div>App is loading successfully!</div>;
}

function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen">
        <TestComponent />
        <Routes>
          <Route path="/" element={<div>Home page works!</div>} />
          <Route path="*" element={<div>404 - Page not found</div>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;