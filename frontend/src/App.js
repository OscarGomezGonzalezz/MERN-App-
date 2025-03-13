import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./LoginPage";
import TODOPage from "./TODOPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LoginPage />} />
        <Route path="/todo" element={<TODOPage />} />
      </Routes>
    </Router>
  );
}

export default App;
