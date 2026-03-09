import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import LaptopsPage from './pages/LaptopsPage';
import AccessoriesPage from './pages/AccessoriesPage';
import './App.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/laptops" element={<LaptopsPage />} />
        <Route path="/accessories" element={<AccessoriesPage />} />
      </Routes>
    </Router>
  );
}

export default App;