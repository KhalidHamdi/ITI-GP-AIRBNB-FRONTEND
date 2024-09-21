import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/home/Home';
import CategoryPage from './pages/category/CategoryPage';

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/category/:slug" element={<CategoryPage />} />
    </Routes>
  );
}

export default App;
