import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LaptopsPage from './pages/LaptopsPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/laptops" element={<LaptopsPage />} />
      </Routes>
    </Router>
  );
}

export default App;